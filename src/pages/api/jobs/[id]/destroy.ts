import { NextApiHandler } from 'next';
import { PrismaClient } from '@prisma/client';
import Authenticate from '@/lib/authenticate';

const prisma = new PrismaClient();

const handler: NextApiHandler = async (req, res) => {
  const id = parseInt(req.query.id as string);
  const {
    email,
    password,
  } = req.body;

  if (await Authenticate(id, email, password)) {
    await prisma.jobPosting.update({
      where: {
        id: id,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    res.status(201).json({ message: 'Your job has been deleted.' });
  } else {
    res.status(401).json({ message: 'Failed to delete your job...' });
  }
}

export default handler;