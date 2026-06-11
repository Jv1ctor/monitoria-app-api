import type { Class } from '@/generated/prisma/browser';
import { prisma } from '@/shared/database/prisma';

export const findAll = async (): Promise<
  (Class & {
    subject: { id: number; name: string; code: string };
    monitor: {
      user: { id: number; first_name: string; last_name: string };
    } | null;
  })[]
> => {
  return prisma.class.findMany({
    include: {
      subject: true,
      monitor: { include: { user: true } },
    },
  }) as unknown as Promise<
    (Class & {
      subject: { id: number; name: string; code: string };
      monitor: {
        user: { id: number; first_name: string; last_name: string };
      } | null;
    })[]
  >;
};
