import { GetStaticPaths, GetStaticProps } from 'next';

import SingleProductContentPage from '@/components/content/SingleProductContentPage';
import { getFileBySlug, getFiles, getRecommendations } from '@/lib/mdx';
import { BlogFrontmatter, BlogType } from '@/types/frontmatters';

type SingleProductContentPageProps = {
  recommendations: BlogFrontmatter[];
} & BlogType;

const NumberNinjaContentPage = ({
  code,
  frontmatter,
}: SingleProductContentPageProps) => {
  return <SingleProductContentPage code={code} frontmatter={frontmatter} />;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getFiles('product', 'number-ninja');

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
  const post = await getFileBySlug(
    'product',
    ('number-ninja/' + params?.slug) as string,
  );

  const recommendations = await getRecommendations(params?.slug as string);

  return {
    props: { ...post, recommendations },
  };
};

export default NumberNinjaContentPage;
