import type { User } from '@/generated/prisma/browser';
import { prisma } from '@/shared/database/prisma';

export const findByEmail = async (email: string): Promise<User | null> => {
  const user = prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  return user;
};
