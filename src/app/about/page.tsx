import type { Metadata, NextPage } from 'next';

import AboutPage from '@/components/pages/AboutPage';
import { generateSeoMetadata } from '@/lib/generateSeoMetadata';

export const generateMetadata = (): Metadata => {
  return {
    ...generateSeoMetadata({ templateTitle: 'About' }),
    description: 'About Aaron Christopher',
  };
};

const Page: NextPage = () => {
  return <AboutPage />;
};

export default Page;
