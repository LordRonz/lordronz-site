import { useEffect, useRef } from 'react';
import useSWR from 'swr';

import { incrementBlogView } from '@/lib/actions/incrementBlogVIew';

const useContentMeta = (
  slug: string,
  { runIncrement = false }: { runIncrement?: boolean } = {},
) => {
  const ran = useRef(0);

  const { data: allContentMeta, mutate } = useSWR<{
    result: { currentViews: number };
  }>(`/api/content/${slug}`);

  useEffect(() => {
    if (runIncrement && ran.current === 0) {
      ran.current = 1;
      incrementBlogView(slug).then((currentViews) =>
        mutate({ result: { currentViews } }),
      );
    }
  }, [mutate, runIncrement, slug]);

  return allContentMeta?.result;
};

export default useContentMeta;
