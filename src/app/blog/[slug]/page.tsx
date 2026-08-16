import type { Metadata } from 'next';

import SingleBlogPage from '@/components/pages/BlogContent';
import { getBlogTranslationSlug } from '@/lib/blog';
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
  const [post, recommendations, files] = await Promise.all([
    getFileBySlug('blog', slug),
    getRecommendations(slug),
    getFiles('blog'),
  ]);
  const availableSlugs = files.map((file) => file.replace(/\.mdx$/, ''));
  const translationSlug = getBlogTranslationSlug(slug, availableSlugs);

  return { ...post, recommendations, translationSlug };
};
type tParams = Promise<{ slug: string }>;
const Page = async ({ params }: { params: tParams }) => {
  const { code, frontmatter, recommendations, translationSlug } =
    await getPosts((await params).slug);

  return (
    <SingleBlogPage
      code={code}
      frontmatter={frontmatter}
      recommendations={recommendations}
      translationSlug={translationSlug}
    />
  );
};

export default Page;
