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
