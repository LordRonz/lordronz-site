import type { Metadata } from 'next';

import SingleBlogPage from '@/components/pages/BlogContent';
import { generateSeoMetadata } from '@/lib/generateSeoMetadata';
import { getFileBySlug, getFiles, getRecommendations } from '@/lib/mdx';

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

const getPosts = async (slug: string) => {
  const post = await getFileBySlug('blog', slug);

  const recommendations = await getRecommendations(slug);

  return { ...post, recommendations };
};
type tParams = Promise<{ slug: string }>;
const Page = async ({ params }: { params: tParams }) => {
  const { code, frontmatter, recommendations } = await getPosts(
    (await params).slug,
  );

  return (
    <SingleBlogPage
      code={code}
      frontmatter={frontmatter}
      recommendations={recommendations}
    />
  );
};

export default Page;
