import type { NextPage } from 'next';

import SingleProductIndexPage from '@/components/content/SingleProductIndexPage';
import type { Project } from '@/components/ProjectCard';

const products: Project[] = [
  {
    title: 'Petto',
    content:
      'Risaikuru is a web service that can classify your trash to determine if it is organic or reusable',
    slug: 'petto',
    type: 'app',
    github: 'petto-app/petto',
    demo: 'https://risaikuru.vercel.app/',
    image: 'petto.png',
  },
].map((project, i) => ({ ...project, i }));

const Product: NextPage = () => {
  return <SingleProductIndexPage products={products} />;
};

export default Product;
