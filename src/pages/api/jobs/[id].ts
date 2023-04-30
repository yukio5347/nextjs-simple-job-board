import { NextApiRequest, NextApiResponse } from 'next';
import requestIp from 'request-ip';

import authenticate from '@/lib/authenticate';
import { __, getErrorMessage } from '@/lib/helpers';
import { prisma } from '@/lib/prisma';
import { formatJobPosting, getData } from '@/models/JobPosting';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const id = Number(req.query.id);
  const where = {
    id: id,
    closedAt: { gte: new Date() },
    deletedAt: null,
  };

  if (req.method === 'GET') {
    const data = await prisma.jobPosting.findFirst({ where });
    const jobPosting = data ? formatJobPosting(data) : null;

    if (jobPosting) {
      return res.status(200).json(jobPosting);
    }

    return res.status(404).json({ message: __('The job not found.') });
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
          message: __('Your job has been successfully updated!'),
        });
      } else {
        return res.status(403).json({
          type: 'error',
          message: __('Failed to authenticate. Confirm your email and password'),
        });
      }
    } catch (error) {
      return res.status(500).json({
        type: 'error',
        message: getErrorMessage(error),
      });
    }
  }

  if (req.method === 'DELETE') {
    const { email, password } = req.body;
    try {
      if (await authenticate(id, email, password)) {
        await prisma.jobPosting.update({
          where,
          data: {
            deletedAt: new Date(),
          },
        });
        return res.status(200).json({
          type: 'success',
          message: __('Your job has been deleted.'),
        });
      } else {
        return res.status(403).json({
          type: 'error',
          message: 'Failed to authenticate. Confirm your email and password',
        });
      }
    } catch (error) {
      return res.status(500).json({
        type: 'error',
        message: getErrorMessage(error),
      });
    }
  }

  // apply
  if (req.method === 'POST') {
    const { email } = req.body;
    try {
      const jobApplication = await prisma.jobApplication.findFirst({
        where: {
          jobPostingId: id,
          email: email,
        },
      });

      if (jobApplication) {
        return res.status(403).json({
          type: 'error',
          message: __('You have already applied for this job.'),
        });
      }

      await prisma.jobApplication.create({
        data: {
          name: req.body.name,
          email: req.body.email,
          telephone: req.body.telephone || null,
          address: req.body.address || null,
          birthday: req.body.birthday ? new Date(req.body.birthday) : null,
          gender: req.body.gender || null,
          summary: req.body.summary,
          education: req.body.education || null,
          workHistory: req.body.workHistory || null,
          certificates: req.body.certificates || null,
          ipAddress: requestIp.getClientIp(req),
          userAgent: req.headers['user-agent'],
          jobPosting: {
            connect: { id: id },
          },
        },
      });
      return res.status(200).json({
        type: 'success',
        message: __('Your application has been submitted'),
      });
    } catch (error) {
      return res.status(500).json({
        type: 'error',
        message: getErrorMessage(error),
      });
    }
  }
}
