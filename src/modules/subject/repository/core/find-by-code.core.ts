import type { Subject } from '@/generated/prisma/browser';
import { prisma } from '@/shared/database/prisma';

export const findByCode = async (code: string): Promise<Subject | null> => {
  return prisma.subject.findUnique({ where: { code } });
};
