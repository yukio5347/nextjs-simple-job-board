import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/lib/prisma';
import { orderBy, where } from '@/lib/queries';
import { formatJobPosting } from '@/models/JobPosting';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const page = req.query.page ?? 1;
      const limit = 20;
      const offset = (Number(page) - 1) * limit || 0;

      const data = await prisma.jobPosting.findMany({
        where,
        orderBy,
        take: limit,
        skip: offset,
      });
      const jobPostings = data.map((jobPosting) => formatJobPosting(jobPosting));
      res.status(200).json(jobPostings);
    } catch (error) {
      return res.status(500).json({
        type: 'error',
        // message: getErrorMessage(error),
      });
    }
  }
}
