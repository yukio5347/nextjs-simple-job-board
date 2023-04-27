import { NextApiHandler } from 'next';

import { prisma } from '@/lib/prisma';
import { orderBy, where } from '@/lib/queries';
import JobPosting from '@/models/JobPosting';

const handler: NextApiHandler = async (req, res) => {
  const { page = '1' } = req.query;
  const limit = 20;
  const offset = (parseInt(page.toString(), 10) - 1) * limit;

  const params = await prisma.jobPosting.findMany({
    where,
    orderBy,
    take: limit,
    skip: offset,
  });
  const jobPostings = params.map((param) => new JobPosting(param));
  const totalCount: number = await prisma.jobPosting.count({ where });

  res.setHeader('x-total-count', totalCount.toString());
  res.status(200).json(jobPostings);
};

export default handler;
