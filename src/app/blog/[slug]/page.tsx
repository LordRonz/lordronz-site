import type { Metadata } from 'next';

import BlogPostNavigation from '@/components/content/blog/BlogPostNavigation';
import SingleBlogPage from '@/components/pages/BlogContent';
import { getAdjacentBlogPosts, getBlogTranslationSlug } from '@/lib/blog';
import { generateSeoMetadata } from '@/lib/generateSeoMetadata';
import { getAllFilesFrontmatter, getFileBySlug, getFiles } from '@/lib/mdx';

export const generateMetadata = async ({
  params,
}: {
  params: tParams;
}): Promise<Metadata> => {
  const { slug } = await params;

  const { frontmatter } = await getFileBySlug('blog', slug);

  return generateSeoMetadata({
    templateTitle: frontmatter.title,
    description: frontmatter.description,
  });
};

export const dynamicParams = false;

export const generateStaticParams = async () => {
  const posts = await getFiles('blog');

  return posts.map((p) => ({
    slug: p.replace(/\.mdx/, ''),
  }));
};

type tParams = Promise<{ slug: string }>;
const Page = async ({ params }: { params: tParams }) => {
  const { slug } = await params;
  const [{ code, frontmatter }, posts] = await Promise.all([
    getFileBySlug('blog', slug),
    getAllFilesFrontmatter('blog'),
  ]);
  const translationSlug = getBlogTranslationSlug(
    slug,
    posts.map((post) => post.slug),
  );

  return (
    <SingleBlogPage
      code={code}
      frontmatter={frontmatter}
      translationSlug={translationSlug}
      postNavigation={
        <BlogPostNavigation {...getAdjacentBlogPosts(slug, posts)} />
      }
    />
  );
};

export default Page;
