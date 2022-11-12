import axios from 'axios';
import { useEffect, useRef } from 'react';
import useSWR from 'swr';

const incrementViews = async (slug: string) => {
  const { data: res } = await axios.post<{
    currentViews: number;
    message: string;
  }>('/api/content/' + slug);
  return res;
};

const useContentMeta = (
  slug: string,
  { runIncrement = false }: { runIncrement?: boolean } = {}
) => {
  const ran = useRef(0);

  const { data: allContentMeta, mutate } = useSWR<{
    result: { currentViews: number };
  }>(`/api/content/${slug}`);

  useEffect(() => {
    if (runIncrement && ran.current === 0) {
      ran.current = 1;
      incrementViews(slug).then((res) =>
        mutate({ result: { currentViews: res.currentViews } })
      );
    }
  }, [mutate, runIncrement, slug]);

  return allContentMeta?.result;
};

export default useContentMeta;
