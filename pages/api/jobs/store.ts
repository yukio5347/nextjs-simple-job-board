import { NextApiHandler } from 'next';
import bcrypt from 'bcrypt';
import requestIp from 'request-ip';
import { PrismaClient } from '@prisma/client';
import { DataProps } from '@/components/Form';

const prisma = new PrismaClient();

const handler: NextApiHandler = async (req, res) => {
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
    name,
    email,
    password,
  }: DataProps = req.body;

  const jobPosting = await prisma.jobPosting.create({
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
      name,
      email,
      password: bcrypt.hashSync(password, 10),
      ipAddress: requestIp.getClientIp(req),
      userAgent: req.headers['user-agent'],
    },
  });

  res.status(201).json(jobPosting);
}

export default handler;
