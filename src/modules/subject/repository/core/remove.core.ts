import type { Subject } from '@/generated/prisma/browser';
import { prisma } from '@/shared/database/prisma';

export const remove = async (id: number): Promise<Subject> => {
  return prisma.subject.delete({ where: { id } });
};
