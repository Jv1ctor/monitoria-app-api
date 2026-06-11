import type { Frequencys } from '@/generated/prisma/browser';
import { prisma } from '@/shared/database/prisma';

export const findByStudent = async (
  studentId: number,
): Promise<
  (Frequencys & {
    lesson: {
      id: number;
      modality: string;
      date_time: Date;
      description: string | null;
      class_id: number;
      created_at: Date;
      class: {
        id: number;
        code: string;
        subject: { id: number; name: string } | null;
        monitor: {
          user: { id: number; first_name: string; last_name: string };
        } | null;
      } | null;
    };
  })[]
> => {
  return prisma.frequencys.findMany({
    where: { student_id: studentId },
    include: {
      lesson: {
        include: {
          class: {
            include: {
              subject: true,
              monitor: { include: { user: true } },
            },
          },
        },
      },
    },
  }) as Promise<
    (Frequencys & {
      lesson: {
        id: number;
        modality: string;
        date_time: Date;
        description: string | null;
        class_id: number;
        created_at: Date;
        class: {
          id: number;
          code: string;
          subject: { id: number; name: string } | null;
          monitor: {
            user: { id: number; first_name: string; last_name: string };
          } | null;
        } | null;
      };
    })[]
  >;
};
