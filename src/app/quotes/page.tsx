import type { Metadata } from 'next';

import QuotesPage from '@/components/pages/QuotesPage';
import { generateSeoMetadata } from '@/lib/generateSeoMetadata';

export const generateMetadata = (): Metadata => {
  return generateSeoMetadata({
    templateTitle: 'Quotes',
    description: 'Random quotes fetched from an API I built',
  });
};

const Page = async ({
  searchParams,
}: {
  params: Promise<{ templateId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { tag } = await searchParams;
  return <QuotesPage tagParam={typeof tag === 'string' ? tag : undefined} />;
};

export default Page;
