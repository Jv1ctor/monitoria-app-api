import { prisma } from '@/shared/database/prisma';

export const majorInUse = async (majorId: number) => {
  const relation = await prisma.academicProfile.count({
    where: { major_id: majorId },
  });

  return relation > 0;
};
