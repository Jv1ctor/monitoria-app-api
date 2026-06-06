import type { Subject } from '@/generated/prisma/browser';
import { prisma } from '@/shared/database/prisma';

export const findAll = async (): Promise<Subject[]> => {
  return prisma.subject.findMany();
};
