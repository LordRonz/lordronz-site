import type { NextPage } from 'next';

import SingleProductIndexPage from '@/components/content/SingleProductIndexPage';
import type { Project } from '@/components/ProjectCard';

const products: Project[] = [
  {
    title: 'Petto',
    content:
      'Petto Life provides users with relaxation activity reminder through game which is by taking care of a pet and compete through leaderboard.',
    slug: 'petto',
    type: 'app',
    github: 'petto-app/petto',
    demo: 'https://apps.apple.com/id/app/petto-life/id6450627184',
    image: 'petto.png',
  },
  {
    title: 'Number Ninja - The Game',
    content:
      'Risaikuru is a web service that can classify your trash to determine if it is organic or reusable',
    slug: 'number-ninja',
    type: 'app',
    github: 'LordRonz/number-ninja',
    demo: 'https://risaikuru.vercel.app/',
    image: 'number-ninja.png',
  },
].map((project, i) => ({ ...project, i }));

const Product: NextPage = () => {
  return <SingleProductIndexPage products={products} />;
};

export default Product;
