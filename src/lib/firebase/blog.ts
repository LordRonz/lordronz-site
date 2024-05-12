import { viewRef } from '@/lib/db';

export const getBlogMeta = async () => {
  const ref = viewRef;
  const snapshot = await ref.get();
  const result: { slug: string; data?: FirebaseFirestore.DocumentData }[] = [];
  snapshot.forEach((e) => {
    result.push({
      slug: e.id,
      ...e.data(),
    });
  });

  return result;
};
