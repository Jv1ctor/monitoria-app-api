import type { Role } from '@/generated/prisma/enums';
import type { FrequencysResponseDto } from '@/modules/frequencys/dto/response/frequencys-response.dto';
import type { FrequencysRepositoryPort } from '@/modules/frequencys/interfaces/frequencys-repository.port';
import type { UserRepositoryPort } from '@/modules/user/interfaces/user-repository.port';
import { prisma } from '@/shared/database/prisma';
import { ConflictError } from '@/shared/handle-error/errors/conflict.error';
import { NotFoundError } from '@/shared/handle-error/errors/not-found.error';

import type { LessonRepositoryPort } from '../../interfaces/lesson-repository.port';
import type { LessonUserRepositoryPort } from '../../interfaces/lesson-user-repository.port';

export const enroll =
  (deps: {
    lessonRepo: LessonRepositoryPort;
    lessonUserRepo: LessonUserRepositoryPort;
    frequencysRepo: FrequencysRepositoryPort;
    userRepo: UserRepositoryPort;
  }) =>
  async (
    lessonId: number,
    user: { id: number; role: Role },
  ): Promise<{ lesson_user_id: number; frequencys: FrequencysResponseDto }> => {
    const { lessonRepo, lessonUserRepo, frequencysRepo } = deps;

    const lesson = await lessonRepo.findById(lessonId);
    if (!lesson) {
      throw new NotFoundError({ message: 'Aula nao encontrada' });
    }

    const existing = await lessonUserRepo.findUnique(
      lessonId,
      lesson.class_id,
      user.id,
    );
    if (existing) {
      throw new ConflictError({
        message: 'Aluno ja inscrito nesta aula',
      });
    }

    const existingFrequency = await frequencysRepo.findByStudentAndLesson(
      user.id,
      lessonId,
    );

    const result = await prisma.$transaction(async tx => {
      const lessonUser = await tx.lessonUser.create({
        data: {
          lesson_id: lesson.id,
          student_id: user.id,
        },
      });

      const frequencys = existingFrequency
        ? await tx.frequencys.update({
            where: { id: existingFrequency.id },
            data: {
              status: 'PENDING',
              value: false,
              unbound_at: undefined,
            },
          })
        : await tx.frequencys.create({
            data: {
              student_id: user.id,
              lesson_id: lessonId,
              status: 'PENDING',
              value: false,
            },
          });

      return { lessonUser, frequencys };
    });

    const enrolled = await frequencysRepo.isEnrolled(
      lesson.class_id,
      result.frequencys.student_id,
    );

    return {
      lesson_user_id: result.lessonUser.id,
      frequencys: {
        id: result.frequencys.id,
        status: result.frequencys.status,
        value: result.frequencys.value,
        student_id: result.frequencys.student_id,
        lesson_id: result.frequencys.lesson_id,
        createdAt: result.frequencys.created_at.toISOString(),
        unboundAt: result.frequencys.unbound_at?.toISOString() ?? undefined,
        enrolled,
      },
    };
  };
