import type { User } from '@/generated/prisma/browser';
import type { UserUpdateInput } from '@/generated/prisma/models';
import { prisma } from '@/shared/database/prisma';

export const update = async (
  id: number,
  data: UserUpdateInput,
): Promise<User> => {
  return prisma.user.update({ where: { id }, data });
};
