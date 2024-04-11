// .storybook/preview.tsx

import '../src/styles/globals.css';
import { Preview, Parameters } from '@storybook/react';
import React from 'react';

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
