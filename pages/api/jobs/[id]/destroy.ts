import { NextApiHandler } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handler: NextApiHandler = async (req, res) => {
  const id = parseInt(req.query.id as string);
  const {
    email,
    password,
  } = req.body;

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
        deletedAt: new Date(),
      },
    });

    res.status(201).json(jobPosting);
  } else {
    res.status(401).json(jobPosting);
  }
}

export default handler;
