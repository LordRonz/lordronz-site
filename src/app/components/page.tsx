import type { Metadata, NextPage } from 'next';

import ComponentsPage from '@/components/pages/ComponentsPage';
import { generateSeoMetadata } from '@/lib/generateSeoMetadata';

export const generateMetadata = (): Metadata => {
  return {
    ...generateSeoMetadata({ templateTitle: 'Components by Aaron' }),
    description: 'Component Collections By Aaron Christopher',
  };
};

const Page: NextPage = () => {
  return <ComponentsPage />;
};

export default Page;
