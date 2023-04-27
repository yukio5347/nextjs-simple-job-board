import { NextApiHandler } from 'next';
import requestIp from 'request-ip';

import { prisma } from '@/lib/prisma';

interface DataProps {
  name: string;
  email: string;
  telephone: string;
  address: string;
  birthday: string;
  gender: string;
  summary: string;
  education: string;
  workHistory: string;
  certificates: string;
}

const handler: NextApiHandler = async (req, res) => {
  const id = parseInt(req.query.id as string);
  const {
    name,
    email,
    telephone,
    address,
    birthday,
    gender,
    summary,
    education,
    workHistory,
    certificates,
  }: DataProps = req.body;

  const jobPosting = await prisma.jobPosting.findFirst({
    where: {
      id: id,
      closedAt: { gte: new Date() },
      deletedAt: null,
    },
  });

  const jobApplication = await prisma.jobApplication.findFirst({
    where: {
      jobPostingId: id,
      email: email,
    },
  });

  if (jobPosting && !jobApplication) {
    await prisma.jobPosting.update({
      where: {
        id: id,
      },
      data: {
        jobApplications: {
          create: {
            name,
            email,
            telephone: telephone || null,
            address: address || null,
            birthday: birthday || null,
            gender: gender || null,
            summary,
            education: education || null,
            workHistory: workHistory || null,
            certificates: certificates || null,
            ipAddress: requestIp.getClientIp(req),
            userAgent: req.headers['user-agent'],
          },
        },
      },
    });

    res.status(201).json(jobPosting);
  } else {
    res.status(401).json(jobPosting);
  }
};

export default handler;
