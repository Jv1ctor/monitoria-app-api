import type { Documents, Prisma } from '@/generated/prisma/browser';
import type { DocumentsCreateInput } from '@/generated/prisma/models';

export type DocumentRepositoryPort = {
  create(document: DocumentsCreateInput): Promise<Documents>;
  findById(id: number): Promise<Documents | null>;
  findAllByClass(classId: number): Promise<Documents[]>;
  findByKey(key: string): Promise<Documents | null>;
  update(id: number, data: Prisma.DocumentsUpdateInput): Promise<Documents>;
  remove(id: number): Promise<Documents>;
};
