import type { User } from '@/generated/prisma/browser';
import { prisma } from '@/shared/database/prisma';

export const findById = async (id: number): Promise<User | null> => {
  const user = prisma.user.findUnique({
    where: { id },
  });

  return user;
};
