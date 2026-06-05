import type { Documents } from '@/generated/prisma/browser';
import type { DocumentsCreateInput } from '@/generated/prisma/models';
import { prisma } from '@/shared/database/prisma';

export const create = async (
  data: DocumentsCreateInput,
): Promise<Documents> => {
  const document = await prisma.documents.create({
    data,
  });

  return document;
};
