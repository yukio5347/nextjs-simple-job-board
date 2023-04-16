import bcrypt from "bcrypt";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const authenticate = async (
  id: number,
  email: string,
  password: string
): Promise<boolean> => {

  const correctPassword = (plainText: string, hashedText: string): boolean => {
    return bcrypt.compareSync(plainText, hashedText);
  };

  const jobPosting = await prisma.jobPosting.findFirst({
    where: {
      id: id,
      closedAt: { gte: new Date() },
      deletedAt: null,
    },
  });

  return (
    jobPosting?.email === email && correctPassword(password, jobPosting.password)
  );
};

export default authenticate;
