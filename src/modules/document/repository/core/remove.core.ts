import type { Documents } from '@/generated/prisma/browser';
import { prisma } from '@/shared/database/prisma';

export const remove = async (id: number): Promise<Documents> => {
  return prisma.documents.delete({ where: { id } });
};
