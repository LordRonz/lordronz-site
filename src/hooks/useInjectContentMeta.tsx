import { useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';

import { contentMetaFlag } from '@/constants/env';
import { cleanBlogPrefix } from '@/lib/blog';
import { pickContentMeta } from '@/lib/contentMeta';
import {
  ContentType,
  InjectedMeta,
  PickFrontmatter,
} from '@/types/frontmatters';
import { ContentMeta } from '@/types/meta';

const useInjectContentMeta = <T extends ContentType>(
  type: T,
  frontmatter: Array<PickFrontmatter<T>>
) => {
  const { data, error } = useSWR<{ result: ContentMeta[] }>(
    contentMetaFlag ? '/api/content' : null
  );
  const contentMeta = data?.result;

  const isLoading = !error && !contentMeta;
  const meta = useMemo(
    () => pickContentMeta(contentMeta, type),
    [contentMeta, type]
  );

  type PopulatedContent = Array<PickFrontmatter<T> & InjectedMeta>;

  const [populatedContent, setPopulatedContent] = useState<PopulatedContent>(
    () => [...frontmatter] as PopulatedContent
  );

  useEffect(() => {
    if (meta) {
      const mapped = frontmatter.map((fm) => {
        const views = meta.find(
          (meta) => meta.slug === cleanBlogPrefix(fm.slug)
        )?.currentViews;
        const likes = meta.find(
          (meta) => meta.slug === cleanBlogPrefix(fm.slug)
        )?.likes;
        return { ...fm, views, likes };
      });

      setPopulatedContent(mapped);
    }
  }, [meta, isLoading, frontmatter]);

  return populatedContent;
};

export default useInjectContentMeta;
