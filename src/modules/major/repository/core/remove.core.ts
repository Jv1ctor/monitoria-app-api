import type { Major } from '@/generated/prisma/browser';
import { prisma } from '@/shared/database/prisma';

export const remove = async (id: number): Promise<Major> => {
  const major = prisma.major.delete({
    where: {
      id: id,
    },
  });

  return major;
};
