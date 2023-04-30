import { NextApiRequest, NextApiResponse } from 'next';

import authenticate from '@/lib/authenticate';
import { getErrorMessage } from '@/lib/helpers';
import { prisma } from '@/lib/prisma';
import { formatJobPosting, getData } from '@/models/JobPosting';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const id = Number(req.query.id);
  const where = { id: id };

  if (req.method === 'GET') {
    const data = await prisma.jobPosting.findUnique({ where });
    const jobPosting = data ? formatJobPosting(data) : null;

    if (jobPosting) {
      return res.status(200).json(jobPosting);
    }

    return res.status(404).json({ error: 'Job not found' });
  }

  if (req.method === 'PUT') {
    const { email, password } = req.body;
    try {
      if (await authenticate(id, email, password)) {
        await prisma.jobPosting.update({
          where,
          data: getData(req),
        });
        return res.status(200).json({
          type: 'success',
          message: 'The job has been updated.',
        });
      } else {
        return res.status(403).json({
          type: 'error',
          message: 'Failed to authenticate. Confirm your email and password',
          id,
          email,
          password,
        });
      }
    } catch (error) {
      return res.status(500).json({
        type: 'error',
        message: getErrorMessage(error),
      });
    }
  }
}
