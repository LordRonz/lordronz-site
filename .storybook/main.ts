// .storybook/main.ts

// Imports the Storybook's configuration API
import type { StorybookConfig } from '@storybook/core-common';

const path = require('path');

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  /** Expose public folder to storybook as static */
  staticDirs: ['../public'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    {
      /**
       * Fix Storybook issue with PostCSS@8
       * @see https://github.com/storybookjs/storybook/issues/12668#issuecomment-773958085
       */
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
    'storybook-addon-next-router',
    'storybook-dark-mode',
  ],
  core: {
    builder: 'webpack5',
  },
  webpackFinal: (config) => {
    /**
     * Add support for alias-imports
     * @see https://github.com/storybookjs/storybook/issues/11989#issuecomment-715524391
     */
    if (config.resolve?.alias) {
      config.resolve.alias = {
        ...config.resolve?.alias,
        '@': [
          path.resolve(__dirname, '../src/'),
          path.resolve(__dirname, '../'),
        ],
      };
    }

    /**
     * Fixes font import with /
     * @see https://github.com/storybookjs/storybook/issues/12844#issuecomment-867544160
     */
    if (config.resolve?.roots) {
      config.resolve.roots = [
        path.resolve(__dirname, '../public'),
        'node_modules',
      ];
    }

    // if (config.module?.rules) {
    //   config.module.rules.push({
    //     test: /\.[jt]sx?$/,
    //     exclude: /(node_modules)/,
    //     use: {
    //       loader: 'babel-loader',
    //       options: {
    //         presets: ['@babel/preset-env', '@babel/preset-typescript']
    //       }
    //     }
    //   })
    // }

    return config;
  },
};

module.exports = config;
