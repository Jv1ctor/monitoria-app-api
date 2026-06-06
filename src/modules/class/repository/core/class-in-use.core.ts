import { prisma } from '@/shared/database/prisma';

export const classInUse = async (classId: number): Promise<boolean> => {
  const count = await prisma.lesson.count({ where: { class_id: classId } });
  return count > 0;
};
