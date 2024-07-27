import type { Metadata, NextPage } from 'next';

import QuotesPage from '@/components/pages/QuotesPage';
import { generateSeoMetadata } from '@/lib/generateSeoMetadata';

export const generateMetadata = (): Metadata => {
  return generateSeoMetadata({
    templateTitle: 'Quotes',
    description: 'Random quotes fetched from an API I built',
  });
};

const Page: NextPage = () => {
  return <QuotesPage />;
};

export default Page;
