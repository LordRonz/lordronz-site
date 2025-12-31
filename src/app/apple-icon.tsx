import { ImageResponse } from 'next/og';

import { WEBSITE_URL } from '@/constants/env';

import { imageMetadata } from './icon';

// Image metadata
export function generateImageMetadata() {
  return imageMetadata;
}

// Image generation
const AppleIcon = ({ id }: { id: string }) => {
  const size = generateImageMetadata().find((im) => im.id === id)?.size;
  return new ImageResponse(
    // ImageResponse JSX element
    <img
      alt='apple icon'
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

export default AppleIcon;
