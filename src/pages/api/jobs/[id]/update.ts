import { NextApiHandler } from 'next';
import requestIp from 'request-ip';

import { DataProps } from '@/components/Form';
import Authenticate from '@/lib/authenticate';
import { prisma } from '@/lib/prisma';

const handler: NextApiHandler = async (req, res) => {
  const id = parseInt(req.query.id as string);
  const {
    title,
    description,
    closedAt,
    employmentType,
    isRemote,
    address,
    locality,
    region,
    postalCode,
    salaryMin,
    salaryMax,
    salaryUnit,
    companyName,
    companyDescription,
    email,
    password,
  }: DataProps = req.body;

  if (await Authenticate(id, email, password)) {
    await prisma.jobPosting.update({
      where: {
        id: id,
      },
      data: {
        title,
        description,
        closedAt: new Date(closedAt),
        employmentType,
        isRemote,
        address: address || null,
        locality: locality || null,
        region: region || null,
        postalCode: postalCode || null,
        salaryMin,
        salaryMax: salaryMax || null,
        salaryUnit,
        companyName,
        companyDescription,
        ipAddress: requestIp.getClientIp(req),
        userAgent: req.headers['user-agent'],
      },
    });

    res.status(201).json({ message: 'Your job has been updated!' });
  } else {
    res.status(401).json({ message: 'Failed to update your job...' });
  }
};

export default handler;
