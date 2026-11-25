import type { BlogFrontmatter } from '@/types/frontmatters';

/**
 * Remove `id-` prefix
 */
export const cleanBlogPrefix = (slug: string) =>
  slug.startsWith('id-') ? slug.slice(3) : slug;

export const getBlogTranslationSlug = (
  slug: string,
  availableSlugs: readonly string[],
) => {
  const candidate = slug.startsWith('id-')
    ? cleanBlogPrefix(slug)
    : `id-${slug}`;

  return availableSlugs.includes(candidate) ? candidate : undefined;
};

type BlogPost = Pick<BlogFrontmatter, 'slug' | 'title' | 'publishedAt'>;

export const getAdjacentBlogPosts = (
  slug: string,
  posts: readonly BlogPost[],
) => {
  const isIndonesian = slug.startsWith('id-');
  const chronologicalPosts = posts
    .filter((post) => post.slug.startsWith('id-') === isIndonesian)
    .sort(
      (a, b) =>
        new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime() ||
        a.slug.localeCompare(b.slug),
    );
  const index = chronologicalPosts.findIndex((post) => post.slug === slug);

  if (index === -1) return {};

  return {
    older: chronologicalPosts[index - 1],
    newer: chronologicalPosts[index + 1],
  };
};
