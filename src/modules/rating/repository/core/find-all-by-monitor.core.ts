import type { Rating } from '@/generated/prisma/browser';
import { prisma } from '@/shared/database/prisma';

export const findAllByMonitor = async (
  monitorId: number,
): Promise<Rating[]> => {
  return prisma.rating.findMany({
    where: { monitor_id: monitorId },
    orderBy: { created_at: 'desc' },
  });
};
