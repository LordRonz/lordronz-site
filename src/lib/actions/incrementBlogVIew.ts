'use server';

import { FieldValue } from 'firebase-admin/firestore';

import { db, viewRef } from '@/lib/db';

export const incrementBlogView = async (slug: string) => {
  const ref = viewRef().doc(slug);

  const result = await db().runTransaction(async (t) => {
    const doc = await t.get(ref);

    if (doc?.exists) {
      t.update(ref, { currentViews: FieldValue.increment(1) });
      return (doc.data()?.currentViews + 1) as number;
    } else {
      t.set(ref, { currentViews: 0 });
      return (doc.data()?.currentViews ?? 0) as number;
    }
  });

  return result;
};
