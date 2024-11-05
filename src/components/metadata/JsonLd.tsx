import type { Thing, WebSite, WithContext } from 'schema-dts';

import { WEBSITE_URL } from '@/constants/env';
import { MY_NAME } from '@/constants/metadata';

export type JsonLdProps = {
  children: React.ReactNode;
  jsonLd?: WithContext<Thing>;
};

export const defaultJsonLd: WithContext<WebSite> = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: MY_NAME,
  sameAs: [
    'https://www.linkedin.com/in/aaronchristopher69',
    'https://github.com/lordronz',
  ],
  url: WEBSITE_URL,
  description:
    'A software engineer with a passion for building scalable, efficient, and user-centric solutions. I specialize in full-stack development, combining expertise in modern frameworks and technologies to create impactful applications. With a focus on clean code and innovative problem-solving, my portfolio showcases projects across various industries, from web applications to mobile solutions. Explore my blog for insights on development best practices, tech trends, and coding tips.',
  publisher: {
    '@type': 'Person',
    name: MY_NAME,
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
