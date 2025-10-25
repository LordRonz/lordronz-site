// .storybook/preview.tsx

import '../src/styles/globals.css';

import type { Parameters, Preview } from '@storybook/react';

const parameters: Parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  previewTabs: {
    'storybook/docs/panel': { index: -1 },
  },
};

const preview: Preview = {
  // ...
  parameters,
};

export default preview;
