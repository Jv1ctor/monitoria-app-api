import type { Prisma, Rating } from '@/generated/prisma/browser';

export type RatingRepositoryPort = {
  upsert: (data: {
    student_id: number;
    monitor_id: number;
    rate: number;
  }) => Promise<Rating>;
  findAllByStudent: (studentId: number) => Promise<Rating[]>;
  findAllByMonitor: (monitorId: number) => Promise<Rating[]>;
};

export type RatingUpsertInput = Prisma.RatingUpsertArgs['create'];
