import type { Documents } from '@/generated/prisma/browser';
import { prisma } from '@/shared/database/prisma';

export const findAllByClass = async (classId: number): Promise<Documents[]> => {
  return prisma.documents.findMany({ where: { class_id: classId } });
};
