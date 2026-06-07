import type { Documents } from '@/generated/prisma/browser';
import { prisma } from '@/shared/database/prisma';

export const findById = async (id: number): Promise<Documents | null> => {
  return prisma.documents.findUnique({ where: { id } });
};
