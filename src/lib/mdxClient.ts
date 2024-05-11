import countBy from 'lodash-es/countBy';
import map from 'lodash-es/map';
import sortBy from 'lodash-es/sortBy';
import toPairs from 'lodash-es/toPairs';

import {
  Frontmatter,
  FrontmatterWithDate,
  FrontmatterWithTags,
} from '@/types/frontmatters';

export const sortDateFn = <T extends FrontmatterWithDate>(
  contentA: T,
  contentB: T,
) => {
  return (
    new Date(contentB.lastUpdated ?? contentB.publishedAt).valueOf() -
    new Date(contentA.lastUpdated ?? contentA.publishedAt).valueOf()
  );
};

export const sortDateFnAsc = <T extends FrontmatterWithDate>(
  contentA: T,
  contentB: T,
) => {
  return (
    new Date(contentA.lastUpdated ?? contentA.publishedAt).valueOf() -
    new Date(contentB.lastUpdated ?? contentB.publishedAt).valueOf()
  );
};

export const sortByDate = <T extends FrontmatterWithDate>(contents: T[]) => {
  return contents.sort(sortDateFn);
};

export const sortTitleFn = <T extends Frontmatter>(
  contentA: T,
  contentB: T,
) => {
  return contentA.title.localeCompare(contentB.title);
};

export const sortByTitle = <T extends Frontmatter[]>(contents: T): T => {
  return contents.sort((a, b) =>
    a.title > b.title ? 1 : b.title > a.title ? -1 : 0,
  );
};

/**
 * Get tags of each post and remove duplicates
 */
export const getTags = <T extends FrontmatterWithTags[]>(contents: T) => {
  const tags = contents.reduce(
    (accTags: string[], content) => [...accTags, ...content.tags.split(',')],
    [],
  );

  return map(sortBy(toPairs(countBy(tags)), 1), 0).reverse();
};
