import type { FrequencysRepositoryPort } from '@/modules/frequencys/interfaces/frequencys-repository.port';
import { NotFoundError } from '@/shared/handle-error/errors/not-found.error';
import { prisma } from '@/shared/database/prisma';

import type { LessonRepositoryPort } from '../../interfaces/lesson-repository.port';
import type { LessonUserRepositoryPort } from '../../interfaces/lesson-user-repository.port';

export const leave =
  (deps: {
    lessonRepo: LessonRepositoryPort;
    lessonUserRepo: LessonUserRepositoryPort;
    frequencysRepo: FrequencysRepositoryPort;
  }) =>
  async (
    lessonId: number,
    user: { id: number; role: 'STUDENT' | 'MONITOR' | 'ADMIN' },
  ): Promise<{ id: number }> => {
    const { lessonRepo, lessonUserRepo, frequencysRepo } = deps;

    const lesson = await lessonRepo.findById(lessonId);
    if (!lesson) {
      throw new NotFoundError({ message: 'Aula nao encontrada' });
    }

    const existing = await lessonUserRepo.findUnique(lessonId, lesson.class_id, user.id);
    if (!existing) {
      throw new NotFoundError({ message: 'Aluno nao inscrito nesta aula' });
    }

    const frequencys = await frequencysRepo.findByStudentAndLesson(user.id, lessonId);

    await prisma.$transaction(async tx => {
      await tx.lessonUser.delete({ where: { id: existing.id } });
      if (frequencys) {
        await tx.frequencys.update({
          where: { id: frequencys.id },
          data: { unbound_at: new Date() },
        });
      }
    });

    return { id: existing.id };
  };
