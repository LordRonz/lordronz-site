// .storybook/main.ts

// Imports the Storybook's configuration API
import type { StorybookConfig } from '@storybook/nextjs';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],

  /** Expose public folder to storybook as static */
  staticDirs: ['../public'],

  framework: '@storybook/nextjs', // 👈 Add this

  addons: ['storybook-dark-mode'],

  core: {
    disableTelemetry: true, // 👈 Disables telemetry
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
          path.resolve(import.meta.dirname, '../src/'),
          path.resolve(import.meta.dirname, '../'),
        ],
      };
    }

    /**
     * Fixes font import with /
     * @see https://github.com/storybookjs/storybook/issues/12844#issuecomment-867544160
     */
    if (config.resolve?.roots) {
      config.resolve.roots = [
        path.resolve(import.meta.dirname, '../public'),
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

export default config;
