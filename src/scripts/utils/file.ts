import fs from 'fs/promises';

export const isFileExist = async (path: string) =>
  await fs
    .access(path)
    .then(() => true)
    .catch(() => false);
