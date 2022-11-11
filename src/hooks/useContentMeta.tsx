import axios from 'axios';
import { useEffect, useRef } from 'react';

const incrementViews = async (slug: string) => {
  const res = await axios.post('/api/content/' + slug);

  return res.data;
};

const useContentMeta = (
  slug: string,
  { runIncrement = false }: { runIncrement?: boolean } = {}
) => {
  const ran = useRef(0);

  useEffect(() => {
    if (runIncrement && ran.current === 0) {
      ran.current = 1;
      incrementViews(slug);
    }
  }, [runIncrement, slug]);

  return {
    msg: 'kontol',
  };
};

export default useContentMeta;
