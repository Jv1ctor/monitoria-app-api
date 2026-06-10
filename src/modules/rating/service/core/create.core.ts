import type { LessonUserRepositoryPort } from '@/modules/lesson/interfaces/lesson-user-repository.port';
import type { AcademicProfileRepositoryPort } from '@/modules/user/interfaces/academic-profile-repository.port';
import { ConflictError } from '@/shared/handle-error/errors/conflict.error';
import { ForbiddenError } from '@/shared/handle-error/errors/forbidden.error';
import { NotFoundError } from '@/shared/handle-error/errors/not-found.error';

import type { RatingDto } from '../../dto/rating.dto';
import type { CreateRatingRequestDto } from '../../dto/request/create-rating-request.dto';
import type { RatingRepositoryPort } from '../../interfaces/rating-repository.port';

export const create =
  (deps: {
    ratingRepo: RatingRepositoryPort;
    profileRepo: AcademicProfileRepositoryPort;
    lessonUserRepo: LessonUserRepositoryPort;
  }) =>
  async (
    studentId: number,
    input: CreateRatingRequestDto,
  ): Promise<RatingDto> => {
    const { ratingRepo, lessonUserRepo, profileRepo } = deps;

    if (studentId === input.monitor_id) {
      throw new ConflictError({
        message: 'Não é possível avaliar a si mesmo',
      });
    }

    const monitorProfile = await profileRepo.findByUserId(input.monitor_id, {
      role: 'MONITOR',
    });

    if (!monitorProfile) {
      throw new NotFoundError({ message: 'Monitor não encontrado' });
    }

    const enrollment = await lessonUserRepo.findStudentEnrollment(
      studentId,
      input.monitor_id,
    );

    if (!enrollment) {
      throw new ForbiddenError({
        message: 'Aluno não está matriculado em turma do monitor',
      });
    }

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
