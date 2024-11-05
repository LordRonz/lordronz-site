import type { MetadataRoute } from 'next';

import { WEBSITE_URL } from '@/constants/env';

const robots = (): MetadataRoute.Robots => {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${WEBSITE_URL}/sitemap.xml`,
  };
};

export default robots;
