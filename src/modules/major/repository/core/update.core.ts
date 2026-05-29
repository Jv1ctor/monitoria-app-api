import type { Major, Prisma } from '@/generated/prisma/browser';
import { prisma } from '@/shared/database/prisma';

export const update = async (
  id: number,
  data: Prisma.MajorUpdateInput,
): Promise<Major> => {
  const major = prisma.major.update({
    where: {
      id: id,
    },
    data: data,
  });

  return major;
};
