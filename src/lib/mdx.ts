import { readdir, readFile } from 'fs/promises';
import matter from 'gray-matter';
import { bundleMDX } from 'mdx-bundler';
import { join } from 'path';
import readingTime from 'reading-time';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrism from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

import {
  ContentType,
  Frontmatter,
  PickFrontmatter,
} from '@/types/frontmatters';

export const getFiles = async (type: ContentType, subfolders = '') =>
  await readdir(join(process.cwd(), 'src', 'contents', type, subfolders));

export const getFileBySlug = async (type: ContentType, slug: string) => {
  const source = slug
    ? await readFile(
        join(process.cwd(), 'src', 'contents', type, `${slug}.mdx`),
        'utf8',
      )
    : await readFile(
        join(process.cwd(), 'src', 'contents', `${type}.mdx`),
        'utf8',
      );

  const { code, frontmatter } = await bundleMDX({
    source,
    mdxOptions(options) {
      options.remarkPlugins = [...(options?.remarkPlugins ?? []), remarkGfm];
      options.rehypePlugins = [
        ...(options?.rehypePlugins ?? []),
        rehypeSlug,
        [rehypePrism, { showLineNumbers: true }],
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              className: ['hash-anchor'],
            },
          },
        ],
      ];
      return options;
    },
  });

  return {
    code,
    frontmatter: {
      wordCount: source.split(/\s+/gu).length,
      readingTime: readingTime(source),
      slug: slug || null,
      ...frontmatter,
    },
  };
};

export const getAllFilesFrontmatter = async <T extends ContentType>(
  type: T,
) => {
  const files = await readdir(join(process.cwd(), 'src', 'contents', type));

  return await files.reduce(
    async (allPosts: Promise<PickFrontmatter<T>[]>, postSlug) => {
      const source = await readFile(
        join(process.cwd(), 'src', 'contents', type, postSlug),
        'utf8',
      );
      const { data } = matter(source);

      const res = [
        {
          ...(data as PickFrontmatter<T>),
          slug: postSlug.replace('.mdx', ''),
          readingTime: readingTime(source),
        },
        ...(await allPosts),
      ];
      return res;
    },
    Promise.resolve([]),
  );
};

export const getRecommendations = async (currSlug: string) => {
  const frontmatters = await getAllFilesFrontmatter('blog');

  // Get current frontmatter
  const currentFm = frontmatters.find((fm) => fm.slug === currSlug);

  // Remove currentFm and Bahasa Posts, then randomize order
  const otherFms = frontmatters
    .filter((fm) => !fm.slug.startsWith('id-') && fm.slug !== currSlug)
    .sort(() => Math.random() - 0.5);

  // Find with similar tags
  const recommendations = otherFms.filter((op) =>
    op.tags.split(',').some((p) => currentFm?.tags.split(',').includes(p)),
  );

  // Populate with random recommendations if not enough
  const threeRecommendations =
    recommendations.length >= 3
      ? recommendations
      : [
          ...recommendations,
          ...otherFms.filter(
            (fm) => !recommendations.some((r) => r.slug === fm.slug),
          ),
        ];

  // Only return first three
  return threeRecommendations.slice(0, 3);
};

/**
 * Get and order frontmatters by specified array
 */
export const getFeatured = <T extends Frontmatter>(
  contents: T[],
  features: string[],
) => {
  // override as T because there is no typechecking on the features array
  return features.map(
    (feat) => contents.find((content) => content.slug === feat) as T,
  );
};
