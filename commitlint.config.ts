/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import type { UserConfig } from '@commitlint/types';

export const Configuration: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // TODO Add Scope Enum Here
    // 'scope-enum': [2, 'always', ['yourscope', 'yourscope']],
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
        'vercel',
      ],
    ],
  },
};

export default Configuration;
