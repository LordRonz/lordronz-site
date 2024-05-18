import { viewRef } from '@/lib/db';

export const GET = async (
  _: Request,
  { params }: { params: { slug: string } },
) => {
  const { slug } = params;
  const ref = viewRef().doc(slug);
  const result = (await ref.get()).data();
  return Response.json({ result });
};
