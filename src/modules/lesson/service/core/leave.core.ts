import { ForbiddenError } from '@/shared/handle-error/errors/forbidden.error';
import { NotFoundError } from '@/shared/handle-error/errors/not-found.error';

import type { EnrollLessonRequestDto } from '../../dto/enroll-lesson-request.dto';
import type { LessonRepositoryPort } from '../../interfaces/lesson-repository.port';
import type { LessonUserRepositoryPort } from '../../interfaces/lesson-user-repository.port';

export const leave =
  (deps: {
    lessonRepo: LessonRepositoryPort;
    lessonUserRepo: LessonUserRepositoryPort;
  }) =>
  async (
    lessonId: number,
    input: EnrollLessonRequestDto,
    user: { id: number; role: 'STUDENT' | 'MONITOR' | 'ADMIN' },
  ): Promise<{ id: number }> => {
    const { lessonRepo, lessonUserRepo } = deps;

    const lesson = await lessonRepo.findById(lessonId);
    if (!lesson) {
      throw new NotFoundError({ message: 'Aula nao encontrada' });
    }

    if (user.role === 'STUDENT' && user.id !== input.student_id) {
      throw new ForbiddenError({
        message: 'Aluno so pode se desinscrever a si mesmo',
      });
    }

    const existing = await lessonUserRepo.findUnique(
      lesson.class_id,
      input.student_id,
    );
    if (!existing) {
      throw new NotFoundError({ message: 'Aluno nao inscrito nesta aula' });
    }

    await lessonUserRepo.remove(existing.id);

    return { id: existing.id };
  };
