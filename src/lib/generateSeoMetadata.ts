import type { Metadata } from 'next';

import { WEBSITE_URL } from '@/constants/env';
import { MY_NAME } from '@/constants/metadata';

import { removeDuplicateSlashUrl } from './utils';

export type GenerateMetadataProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export const webUrl = process.env.NEXT_PUBLIC_HOSTNAME
  ? `https://${process.env.NEXT_PUBLIC_HOSTNAME}`
  : WEBSITE_URL;

export const defaultMeta = {
  title: MY_NAME,
  siteName: process.env.NEXT_PUBLIC_HOSTNAME || WEBSITE_URL,
  description: "Aaron christopher's online portfolio and blog website.",
  url: webUrl,
  image: '/vercel.svg',
  type: 'website',
  robots: 'follow, index',
  googlebot: 'follow, index',
  creator: MY_NAME,
  publisher: MY_NAME,
  authors: [{ name: MY_NAME, url: webUrl }],
  applicationName: MY_NAME,
  keywords: [MY_NAME, 'React', 'Next.js', 'Blog', 'Personal Website'],
};

const defaultMetaV2: Metadata = {
  ...defaultMeta,
  robots: {
    follow: true,
    index: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    ...defaultMeta,
    authors: [MY_NAME.split(' ')[0]],
  },
  manifest: removeDuplicateSlashUrl(webUrl + '/manifest.json'),
  twitter: {
    card: 'summary_large_image',
    title: defaultMeta.title,
  },
  category: 'technology',
  alternates: {
    canonical: webUrl,
    types: {
      'application/rss+xml': removeDuplicateSlashUrl(webUrl + '/rss.xml'),
    },
  },
  verification: {
    google: 'google',
    yandex: 'yandex',
    yahoo: 'yahoo',
    other: {
      me: ['me@aaronct.dev'],
    },
  },
};

export const generateSeoMetadata = () => {
  return defaultMetaV2;
};