import fs from 'fs';
import { glob } from 'glob';
import path from 'path';

import log from './utils/log';

const BASE_DIR = process.cwd();
const SRC_DIR = path.join(BASE_DIR, 'src');

// Directories to scan
const DIRECTORIES = ['pages', 'components'];

// Ignore files or patterns
const IGNORE_PATTERNS = [
  '**/*.test.tsx',
  '**/*.spec.tsx',
  '**/*.stories.tsx',
  '**/index.tsx',
];

// Find all files in the specified directories
const getFilesInDirectories = async () => {
  const files = [];
  for (const dir of DIRECTORIES) {
    const dirPath = path.join(SRC_DIR, dir);
    const foundFiles = await glob(`${dirPath}/**/*.{ts,tsx,js,jsx}`, {
      ignore: IGNORE_PATTERNS.map((pattern) => path.join(dirPath, pattern)),
    });
    files.push(...foundFiles.map((file) => path.relative(SRC_DIR, file)));
  }
  return files;
};

// Scan for file imports
const findFileUsages = async (files: string[]) => {
  const usages = new Map<string, boolean>();

  for (const file of files) {
    usages.set(file, false); // Mark all files as unused initially
  }

  const allSourceFiles = await glob(`${SRC_DIR}/**/*.{ts,tsx,js,jsx}`, {
    ignore: IGNORE_PATTERNS,
  });

  for (const sourceFile of allSourceFiles) {
    const content = await fs.promises.readFile(sourceFile, 'utf-8');

    for (const file of files) {
      const importPath = file.replace(/\.tsx?$/, ''); // Remove extensions for matching
      if (content.includes(importPath)) {
        usages.set(file, true); // Mark the file as used
      }
    }
  }

  return usages;
};

const findUnusedFiles = async () => {
  log.info('Scanning for unused files...');
  const files = await getFilesInDirectories();
  const usages = await findFileUsages(files);

  const unusedFiles = Array.from(usages.entries())
    .filter(([, used]) => !used)
    .map(([file]) => file);

  if (unusedFiles.length > 0) {
    log.warn('Unused files found:');
    unusedFiles.forEach((file) => log.info(`- ${file}`));
  } else {
    log.info('No unused files found!');
  }
};

(async () => {
  try {
    await findUnusedFiles();
  } catch (error) {
    log.error('Error finding unused files:', error);
    process.exit(1);
  }
})();
