import type { Metadata, NextPage } from 'next';

import BlogPage from '@/components/pages/BlogPage';
import { getBlogs } from '@/lib/blogServer';
import { getBlogMeta } from '@/lib/firebase/blog';
import { generateSeoMetadata } from '@/lib/generateSeoMetadata';
import type { ContentMeta } from '@/types/meta';

export const generateMetadata = (): Metadata => {
  return generateSeoMetadata({
    templateTitle: "Aaron's Blog",
    description:
      'Random thoughts about my expertise and hobby. It should be informational for yall sussy bakas.',
  });
};

export const revalidate = 15;

const Page: NextPage = async () => {
  const [blogs, meta] = await Promise.all([
    getBlogs(),
    getBlogMeta() as Promise<ContentMeta[]>,
  ]);

  return <BlogPage posts={blogs.posts} tags={blogs.tags} meta={meta} />;
};

export default Page;
