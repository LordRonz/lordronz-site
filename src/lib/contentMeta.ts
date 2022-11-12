import { ContentType } from '@/types/frontmatters';
import { ContentMeta } from '@/types/meta';

export const pickContentMeta = <T extends ContentType>(
  data: ContentMeta[] | undefined,
  type: T
): ContentMeta[] => {
  return (
    data
      ?.filter((item) => item.slug.startsWith(type.slice(0, 1)))
      .map((item) => ({ ...item, slug: item.slug.slice(2) })) ?? []
  );
};
