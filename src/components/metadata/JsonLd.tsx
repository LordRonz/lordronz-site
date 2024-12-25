import type { ProfilePage, Thing, WithContext } from 'schema-dts';

import { WEBSITE_URL } from '@/constants/env';
import {
  ALT_NAME,
  FIRST_NAME,
  MY_NAME,
  SOCIAL_LINKS,
} from '@/constants/metadata';

export type JsonLdProps = {
  children: React.ReactNode;
  jsonLd?: WithContext<Thing>;
};

export const defaultJsonLd: WithContext<ProfilePage> = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  name: MY_NAME,
  sameAs: SOCIAL_LINKS,
  keywords: [
    MY_NAME,
    FIRST_NAME,
    ...MY_NAME.split(' '),
    `${FIRST_NAME}'s Portfolio Website`,
    `${FIRST_NAME}'s Website`,
    `${FIRST_NAME}'s Webpage`,
    `${FIRST_NAME}'s Blog`,
    ALT_NAME,
    'Personal Portfolio',
    'Software Engineer Portfolio',
    'Tech Portfolio',
    'Tech Blog',
  ],
  url: WEBSITE_URL,
  description:
    'A software engineer with a passion for building scalable, efficient, and user-centric solutions. I specialize in full-stack development, combining expertise in modern frameworks and technologies to create impactful applications. With a focus on clean code and innovative problem-solving, my portfolio showcases projects across various industries, from web applications to mobile solutions. Explore my blog for insights on development best practices, tech trends, and coding tips.',
  publisher: {
    '@type': 'Person',
    name: MY_NAME,
    alternateName: ALT_NAME,
    sameAs: SOCIAL_LINKS,
    url: `${WEBSITE_URL}/about`,
  },
  author: {
    '@type': 'Person',
    name: MY_NAME,
    alternateName: ALT_NAME,
    sameAs: SOCIAL_LINKS,
    url: `${WEBSITE_URL}/about`,
  },
};

const JsonLd = ({ children, jsonLd = defaultJsonLd }: JsonLdProps) => {
  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
};

export default JsonLd;
