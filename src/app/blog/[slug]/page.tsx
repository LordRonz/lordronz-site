import type { Metadata } from 'next';

import SingleBlogPage from '@/components/pages/BlogContent';
import { generateSeoMetadata } from '@/lib/generateSeoMetadata';
import { getFileBySlug, getFiles, getRecommendations } from '@/lib/mdx';

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> => {
  const slug = params.slug;

  const { frontmatter } = await getFileBySlug('blog', slug as string);

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
  const post = await getFileBySlug('blog', slug as string);

  const recommendations = await getRecommendations(slug as string);

  return { ...post, recommendations };
};

const Page = async ({ params }: { params: { slug: string } }) => {
  const { code, frontmatter, recommendations } = await getPosts(params.slug);

  return (
    <SingleBlogPage
      code={code}
      frontmatter={frontmatter}
      recommendations={recommendations}
    />
  );
};

export default Page;
