import type { NextApiRequest, NextApiResponse } from 'next';

import { viewRef } from '@/lib/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      const ref = viewRef();
      const snapshot = await ref.get();
      const result: { slug: string; data?: FirebaseFirestore.DocumentData }[] =
        [];
      snapshot.forEach((e) => {
        result.push({
          slug: e.id,
          ...e.data(),
        });
      });

      return res.json({ result });
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
