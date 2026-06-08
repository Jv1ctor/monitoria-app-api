import type { Rating } from '@/generated/prisma/browser';
import { prisma } from '@/shared/database/prisma';

export const upsert = async (data: {
  student_id: number;
  monitor_id: number;
  rate: number;
}): Promise<Rating> => {
  return prisma.rating.upsert({
    where: {
      student_id_monitor_id: {
        student_id: data.student_id,
        monitor_id: data.monitor_id,
      },
    },
    create: {
      student_id: data.student_id,
      monitor_id: data.monitor_id,
      rate: data.rate,
    },
    update: {
      rate: data.rate,
    },
  });
};
