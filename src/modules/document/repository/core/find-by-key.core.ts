import type { Documents } from '@/generated/prisma/browser';
import { prisma } from '@/shared/database/prisma';

export const findByKey = async (key: string): Promise<Documents | null> => {
  return prisma.documents.findUnique({ where: { key } });
};
