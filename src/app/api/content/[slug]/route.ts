import { viewRef } from '@/lib/db';

export const GET = async (
  _: Request,
  { params }: { params: Promise<{ slug: string }> },
) => {
  const { slug } = await params;
  const ref = viewRef().doc(slug);
  const result = (await ref.get()).data();
  return Response.json({ result });
};
