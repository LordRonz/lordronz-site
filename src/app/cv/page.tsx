import type { Metadata, NextPage } from 'next';

import CVPage from '@/components/pages/CVPage';
import { generateSeoMetadata } from '@/lib/generateSeoMetadata';

export const generateMetadata = (): Metadata => {
  return {
    ...generateSeoMetadata({ templateTitle: "Aaron's CV" }),
    description: "Aaron Christopher's CV",
  };
};

const Page: NextPage = () => {
  return <CVPage />;
};

export default Page;
