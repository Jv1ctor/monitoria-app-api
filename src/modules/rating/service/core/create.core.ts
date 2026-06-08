import type { AcademicProfile, Role } from '@/generated/prisma/browser';
import { prisma } from '@/shared/database/prisma';
import { ConflictError } from '@/shared/handle-error/errors/conflict.error';
import { ForbiddenError } from '@/shared/handle-error/errors/forbidden.error';
import { NotFoundError } from '@/shared/handle-error/errors/not-found.error';

import type { RatingDto } from '../../dto/rating.dto';
import type { CreateRatingRequestDto } from '../../dto/request/create-rating-request.dto';
import type { RatingRepositoryPort } from '../../interfaces/rating-repository.port';

const findMonitorAcademicProfile = async (
  monitorId: number,
  role: Role,
): Promise<AcademicProfile | null> => {
  return prisma.academicProfile.findUnique({
    where: { user_id: monitorId, user: { role } },
  });
};

const ensureStudentEnrolledInMonitorClass = async (
  studentId: number,
  monitorId: number,
): Promise<void> => {
  const enrollment = await prisma.lessonUser.findFirst({
    where: {
      student_id: studentId,
      class: { monitor_id: monitorId },
    },
    select: { id: true },
  });

  if (!enrollment) {
    throw new ForbiddenError({
      message: 'Aluno não está matriculado em turma do monitor',
    });
  }
};

export const create =
  (deps: { ratingRepo: RatingRepositoryPort }) =>
  async (
    studentId: number,
    input: CreateRatingRequestDto,
  ): Promise<RatingDto> => {
    const { ratingRepo } = deps;

    if (studentId === input.monitor_id) {
      throw new ConflictError({
        message: 'Não é possível avaliar a si mesmo',
      });
    }

    const monitorProfile = await findMonitorAcademicProfile(
      input.monitor_id,
      'MONITOR',
    );

    if (!monitorProfile) {
      throw new NotFoundError({ message: 'Monitor não encontrado' });
    }

    await ensureStudentEnrolledInMonitorClass(studentId, input.monitor_id);

    const rating = await ratingRepo.upsert({
      student_id: studentId,
      monitor_id: input.monitor_id,
      rate: input.rate,
    });

    return {
      id: rating.id,
      rate: rating.rate,
      monitor_id: rating.monitor_id,
      createdAt: rating.created_at,
    };
  };
