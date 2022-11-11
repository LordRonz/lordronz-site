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
      return res.json(slug);
    } else if (req.method === 'POST') {
      const ref = viewRef.doc(slug);

      const result = await db.runTransaction(async (t) => {
        const doc = await t.get(ref);

        if (doc.exists) {
          t.update(ref, { currentViews: FieldValue.increment(1) });
        } else {
          t.set(ref, { currentViews: 0 });
        }
      });

      return res.status(200).json({
        result,
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
