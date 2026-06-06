import type { Subject } from '@/generated/prisma/browser';
import { prisma } from '@/shared/database/prisma';

export const findById = async (id: number): Promise<Subject | null> => {
  return prisma.subject.findUnique({ where: { id } });
};
