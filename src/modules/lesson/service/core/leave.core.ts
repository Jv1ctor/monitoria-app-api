import { NotFoundError } from '@/shared/handle-error/errors/not-found.error';

import type { LessonRepositoryPort } from '../../interfaces/lesson-repository.port';
import type { LessonUserRepositoryPort } from '../../interfaces/lesson-user-repository.port';

export const leave =
  (deps: {
    lessonRepo: LessonRepositoryPort;
    lessonUserRepo: LessonUserRepositoryPort;
  }) =>
  async (
    lessonId: number,
    user: { id: number; role: 'STUDENT' | 'MONITOR' | 'ADMIN' },
  ): Promise<{ id: number }> => {
    const { lessonRepo, lessonUserRepo } = deps;

    const lesson = await lessonRepo.findById(lessonId);
    if (!lesson) {
      throw new NotFoundError({ message: 'Aula nao encontrada' });
    }

    const existing = await lessonUserRepo.findUnique(lesson.class_id, user.id);
    if (!existing) {
      throw new NotFoundError({ message: 'Aluno nao inscrito nesta aula' });
    }

    await lessonUserRepo.remove(existing.id);
    return { id: existing.id };
  };
