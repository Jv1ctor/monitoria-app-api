import type { Documents, Prisma } from '@/generated/prisma/browser';
import { prisma } from '@/shared/database/prisma';

export const update = async (
  id: number,
  data: Prisma.DocumentsUpdateInput,
): Promise<Documents> => {
  return prisma.documents.update({ where: { id }, data });
};
