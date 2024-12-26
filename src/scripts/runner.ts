import { loadEnvConfig } from '@next/env';
import fs from 'fs';
import path from 'path';

import log from './utils/log';

export type IScriptParams = {
  env: NodeJS.ProcessEnv;
};

loadEnvConfig(process.cwd());

async function runPreBuildScripts(files: string[]) {
  // Helper to load and execute each script
  const executeScript = async (file: string) => {
    try {
      const {
        default: defaultFunc,
      }: { default: (params: IScriptParams) => Promise<void> } = await import(
        `./pre-build/${file}`
      );
      log.info(`Running pre-build script '${file}'`);
      await defaultFunc({ env: process.env });
    } catch (e) {
      log.error(`SCRIPT RUNNER: failed to execute pre-build script '${file}'`);
      log.error(e);
    }
  };

  // Map files to promises and wait for all scripts to finish
  await Promise.all(files.map(executeScript));
}

const getFiles = async (): Promise<string[]> => {
  const dirPath = path.join(__dirname, 'pre-build');
  const files = await fs.promises.readdir(dirPath);
  return files
    .filter((file) => file.endsWith('.ts'))
    .sort((a, b) => a.localeCompare(b));
};

const runAsync = async () => {
  log.info('Searching for pre-build scripts...');
  const files = await getFiles();

  if (files.length === 0) {
    log.warn('No pre-build scripts found.');
    return;
  }

  log.info(`Found ${files.length} script(s). Starting execution...`);
  await runPreBuildScripts(files);
  log.success('All scripts executed.');
};

// Self-invocation async function
(async () => {
  await runAsync();
})().catch((err) => {
  log.error(err);
  throw err;
});
