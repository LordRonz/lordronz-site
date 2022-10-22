/**
 * Remove `id-` prefix
 */
export const cleanBlogPrefix = (slug: string) =>
  slug.slice(0, 3) === 'id-' ? slug.slice(3) : slug;
