import type { Major, Prisma } from '@/generated/prisma/browser';
import { prisma } from '@/shared/database/prisma';

export const create = async (data: Prisma.MajorCreateInput): Promise<Major> => {
  const major = prisma.major.create({
    data: data,
  });

  return major;
};
