import type { MetadataRoute } from 'next';

import { MY_NAME, SITE_DESCRIPTION } from '@/constants/metadata';

const manifest = (): MetadataRoute.Manifest => {
  return {
    name: MY_NAME,
    short_name: MY_NAME.split(' ')[0],
    start_url: '/',
    display: 'standalone',
    background_color: '#111',
    theme_color: '#eb2754',
    lang: 'en',
    categories: ['Technology', 'Programming', 'Website'],
    description: SITE_DESCRIPTION,
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/favicon/android-icon-36x36.png',
        sizes: '36x36',
        type: 'image/png',
      },
      {
        src: '/favicon/android-icon-48x48.png',
        sizes: '48x48',
        type: 'image/png',
      },
      {
        src: '/favicon/android-icon-72x72.png',
        sizes: '72x72',
        type: 'image/png',
      },
      {
        src: '/favicon/android-icon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
      },
      {
        src: '/favicon/android-icon-144x144.png',
        sizes: '144x144',
        type: 'image/png',
      },
      {
        src: '/favicon/android-icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
  };
};

export default manifest;
