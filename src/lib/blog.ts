/**
 * Remove `id-` prefix
 */
export const cleanBlogPrefix = (slug: string) =>
  slug.startsWith('id-') ? slug.slice(3) : slug;
