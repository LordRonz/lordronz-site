/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og';

import { WEBSITE_URL } from '@/constants/env';

// Image metadata
export const size = {
  width: 96,
  height: 96,
};
export const contentType = 'image/png';

// Image generation
const Icon = () => {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <img
        alt='icon'
        src={WEBSITE_URL + '/favicon/favicon-96x96.png'}
        {...size}
      />
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported icons size metadata
      // config to also set the ImageResponse's width and height.
      ...size,
    },
  );
};

export default Icon;
