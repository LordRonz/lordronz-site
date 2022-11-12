// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { FieldValue } from '@google-cloud/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';

import db, { viewRef } from '@/lib/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const slug = req.query.slug as string;

  if (!slug) {
    res.status(500).json({ message: 'Slug is required' });
  }

  try {
    if (req.method === 'GET') {
      const ref = viewRef.doc(slug);
      const result = (await ref.get()).data();
      return res.json({ result });
    } else if (req.method === 'POST') {
      const ref = viewRef.doc(slug);

      const result = await db.runTransaction(async (t) => {
        const doc = await t.get(ref);

        if (doc && doc.exists) {
          t.update(ref, { currentViews: FieldValue.increment(1) });
          return (doc.data()?.currentViews + 1) as number;
        } else {
          t.set(ref, { currentViews: 0 });
          return (doc.data()?.currentViews ?? 0) as number;
        }
      });

      return res.status(200).json({
        message: 'Current views successfully updated',
        currentViews: result,
      });
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message ?? 'Internal Server Error' });
    } else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};

export default handler;
