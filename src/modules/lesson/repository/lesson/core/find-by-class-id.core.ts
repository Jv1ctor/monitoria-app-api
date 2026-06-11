import type { LessonGetPayload } from '@/generated/prisma/models';
import { prisma } from '@/shared/database/prisma';

export const findByClassId = async (
  classId: number,
): Promise<
  LessonGetPayload<{
    include: { class: { include: { monitor: { include: { user: true } } } } };
  }>[]
> => {
  return prisma.lesson.findMany({
    where: { class_id: classId },
    include: {
      class: {
        include: {
          monitor: { include: { user: true } },
        },
      },
    },
  });
};
