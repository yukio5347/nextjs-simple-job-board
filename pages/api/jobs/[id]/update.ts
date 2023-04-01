import { NextApiHandler } from 'next';
import requestIp from 'request-ip';
import { PrismaClient } from '@prisma/client';
import { DataProps } from '@/components/Form';

const prisma = new PrismaClient();

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

  const jobPosting = await prisma.jobPosting.findFirst({
    where: {
      id: id,
      closedAt: { gte: new Date() },
      deletedAt: null,
    },
  });

  if (jobPosting && jobPosting.email === email && jobPosting.password === password) {
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

    res.status(201).json(jobPosting);
  } else {
    res.status(401).json(jobPosting);
  }
}

export default handler;
