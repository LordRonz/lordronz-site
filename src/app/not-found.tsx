import type { Metadata, NextPage } from 'next';

import NotFound from '@/components/pages/NotFound';
import { generateSeoMetadata } from '@/lib/generateSeoMetadata';

export const generateMetadata = (): Metadata => {
  return {
    ...generateSeoMetadata({ templateTitle: 'Not Found' }),
  };
};

const Page: NextPage = () => {
  return <NotFound />;
};

export default Page;
