import type { Major } from '@/generated/prisma/browser';
import { prisma } from '@/shared/database/prisma';

export const findById = async (id: number): Promise<Major | null> => {
  const major = prisma.major.findUnique({
    where: {
      id: id,
    },
  });

  return major;
};
