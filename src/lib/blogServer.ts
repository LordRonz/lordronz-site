import { getAllFilesFrontmatter } from '@/lib/mdx';
import { getTags, sortByDate } from '@/lib/mdxClient';

export const getBlogs = async () => {
  const files = await getAllFilesFrontmatter('blog');
  const posts = sortByDate(files);

  // Accumulate tags and remove duplicate
  const tags = getTags(posts);

  return { posts, tags };
};
