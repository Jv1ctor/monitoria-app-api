import type { Prisma, User } from '@/generated/prisma/browser';
import { prisma } from '@/shared/database/prisma';

export const create = async (data: Prisma.UserCreateInput): Promise<User> => {
  const user = prisma.user.create({
    data: data,
  });

  return user;
};
