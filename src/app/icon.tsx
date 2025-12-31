import { ImageResponse } from 'next/og';

import { WEBSITE_URL } from '@/constants/env';

export const imageMetadata = [
  {
    contentType: 'image/png',
    size: { width: 32, height: 32 },
    id: 'tiny',
  },
  {
    contentType: 'image/png',
    size: { width: 48, height: 48 },
    id: 'small',
  },
  {
    contentType: 'image/png',
    size: { width: 72, height: 72 },
    id: 'medium',
  },
  {
    contentType: 'image/png',
    size: { width: 96, height: 96 },
    id: 'big',
  },
];

// Image metadata
export function generateImageMetadata() {
  return imageMetadata;
}

// Image generation
const Icon = ({ id }: { id: string }) => {
  const size = generateImageMetadata().find((im) => im.id === id)?.size;
  return new ImageResponse(
    // ImageResponse JSX element
    <img
      alt='icon'
      src={WEBSITE_URL + '/favicon/favicon-96x96.png'}
      {...size}
    />,
    // ImageResponse options
    {
      // For convenience, we can re-use the exported icons size metadata
      // config to also set the ImageResponse's width and height.
      ...size,
    },
  );
};

export default Icon;
