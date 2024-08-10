import { Command } from '@commander-js/extra-typings';
import { input } from '@inquirer/prompts';
import chalk from 'chalk';
import Table from 'cli-table3';
import { format } from 'date-fns';
import fs from 'fs';
import path from 'path';
import { read } from 'to-vfile';
import { matter } from 'vfile-matter';

import { type BlogFrontmatter } from '@/types/frontmatters';

import { isFileExist } from './utils/file';
import { log } from './utils/log';

const program = new Command()
  .name('blog-util')
  .version('1.0.0')
  .description('A CLI tool for blog utilities')
  .option('-l, --ls  [value]', 'List blog contents')
  .option('-m, --mkdir <value>', 'Create a directory')
  .option('-b, --blog  [value]', 'Create a blog template')
  .option('-t, --touch <value>', 'Create a file')
  .parse(process.argv);

const options = program.opts();

const listDirContents = async (filepath: string) => {
  try {
    const files = await fs.promises.readdir(filepath);
    const table = new Table({
      head: ['Title', 'CreatedAt', 'PublishedAt'],
    });
    const detailedFilesPromises = files.map(async (file: string) => {
      const fullPath = path.resolve(filepath, file);
      const fileDetails = await fs.promises.lstat(fullPath);
      const { birthtime } = fileDetails;
      const vfile = await read(fullPath);
      matter(vfile);
      const frontMatter = vfile.data.matter as Partial<BlogFrontmatter>;

      return [
        chalk.redBright(frontMatter.title),
        chalk.blueBright(frontMatter.banner),
        chalk.yellowBright(birthtime.toLocaleDateString('id')),
      ];
    });
    const detailedFiles = await Promise.all(detailedFilesPromises);
    table.push(...detailedFiles);
    console.log(table.toString());
  } catch (error) {
    log.error('Error occurred while reading the directory!', error);
  }
};

const createDir = (filepath: string) => {
  if (!fs.existsSync(filepath)) {
    fs.mkdirSync(filepath);
    log.info('The directory has been created successfully');
  }
};

const createFile = (filepath: string) => {
  fs.openSync(filepath, 'w');
  log.info('An empty file has been created');
};

const createBlog = async () => {
  let slug = '';
  let filepath = '';
  while (!slug) {
    slug = await input({
      message: 'Blog slug (used for file name)',
      transformer: (v) =>
        v.toLowerCase().trim().replaceAll(' ', '').replaceAll('.mdx', ''),
      required: true,
    });

    filepath =
      typeof options.ls === 'string'
        ? options.ls
        : path.join(__dirname, '../contents/blog', slug + '.mdx');

    if (await isFileExist(filepath)) {
      log.error(`${slug} already exist, please use another slug`);
      slug = '';
    }
  }

  createFile(filepath);

  const { title, tags, banner } = {
    title: await input({
      message: 'What is the title of this blog?',
      default: '',
    }),
    tags: await input({
      message: 'Tags of the blog? (comma-separated)',
      default: '',
    }),
    banner: await input({ message: 'Banner file name?', default: '' }),
  };

  const content = `---
title: '${title}'
publishedAt: '${format(new Date(), 'yyyy-MM-dd')}'
description: ''
banner: '${banner}'
tags: '${tags}'
---
`;
  await fs.promises.writeFile(filepath, content);

  log.info(`MDX Template created at ${filepath}`);
};

if (options.ls) {
  const filepath =
    typeof options.ls === 'string'
      ? options.ls
      : path.join(__dirname, '../contents/blog');
  listDirContents(filepath);
}
if (options.mkdir) {
  createDir(path.resolve(__dirname, options.mkdir));
}
if (options.touch) {
  createFile(path.resolve(__dirname, options.touch));
}
if (options.blog) {
  createBlog();
}
