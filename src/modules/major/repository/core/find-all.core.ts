import type { Major } from '@/generated/prisma/browser';
import { prisma } from '@/shared/database/prisma';

export const findAll = async (): Promise<Major[]> => {
  const majors = prisma.major.findMany();

  return majors;
};
