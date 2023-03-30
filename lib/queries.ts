import { Prisma } from "@prisma/client";

export const where: Prisma.JobPostingWhereInput = { closedAt: { gte: new Date() } }

export const orderBy: Prisma.JobPostingOrderByWithRelationInput = { id: 'desc' };
