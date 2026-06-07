import { NotFoundError } from '@/shared/handle-error/errors/not-found.error';

import type { LessonDto } from '../../dto/lesson.dto';
import type { LessonRepositoryPort } from '../../interfaces/lesson-repository.port';

export const findById =
  (deps: { lessonRepo: LessonRepositoryPort }) =>
  async (id: number): Promise<LessonDto> => {
    const { lessonRepo } = deps;

    const lesson = await lessonRepo.findById(id);

    if (!lesson) {
      throw new NotFoundError({ message: 'Aula nao encontrada' });
    }

    return {
      id: lesson.id,
      modality: lesson.modality,
      date_time: lesson.date_time,
      description: lesson.description,
      class_id: lesson.class_id,
      createdAt: lesson.created_at,
    };
  };
