import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/lib/prisma';
import { where } from '@/lib/queries';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const totalCount: number = await prisma.jobPosting.count({ where });
    res.status(200).json(totalCount);
  }
}
