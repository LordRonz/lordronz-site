import type { GetStaticPaths, GetStaticProps } from 'next';

import SingleProductContentPage from '@/components/content/SingleProductContentPage';
import { getFileBySlug, getFiles, getRecommendations } from '@/lib/mdx';
import type { BlogFrontmatter, BlogType } from '@/types/frontmatters';

type SingleProductContentPageProps = {
  recommendations: BlogFrontmatter[];
} & BlogType;

const SpiggerContentPage = ({
  code,
  frontmatter,
}: SingleProductContentPageProps) => {
  return <SingleProductContentPage code={code} frontmatter={frontmatter} />;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getFiles('product', 'spigger');

  return {
    paths: posts.map((p) => ({
      params: {
        slug: p.replace(/\.mdx/, ''),
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await getFileBySlug('product', 'spigger/' + params?.slug);

  const recommendations = await getRecommendations(params?.slug as string);

  return {
    props: { ...post, recommendations },
  };
};

export default SpiggerContentPage;
