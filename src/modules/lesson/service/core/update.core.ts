import type { ClassRepositoryPort } from '@/modules/class/interfaces/class-repository.port';
import { NotFoundError } from '@/shared/handle-error/errors/not-found.error';

import type { LessonDto } from '../../dto/lesson.dto';
import type { UpdateLessonDto } from '../../dto/update-lesson.dto';
import type { LessonRepositoryPort } from '../../interfaces/lesson-repository.port';

export const update =
  (deps: {
    lessonRepo: LessonRepositoryPort;
    classRepo: ClassRepositoryPort;
  }) =>
  async (id: number, input: UpdateLessonDto): Promise<LessonDto> => {
    const { lessonRepo, classRepo } = deps;

    const existing = await lessonRepo.findById(id);

    if (!existing) {
      throw new NotFoundError({ message: 'Aula nao encontrada' });
    }

    if (input.class_id) {
      const existClass = await classRepo.findById(input.class_id);

      if (!existClass) {
        throw new NotFoundError({ message: 'Turma nao encontrada' });
      }
    }

    const lesson = await lessonRepo.update(id, {
      ...(input.modality !== undefined && { modality: input.modality }),
      ...(input.date_time !== undefined && {
        date_time: new Date(input.date_time),
      }),
      ...(input.description !== undefined && {
        description: input.description,
      }),
      ...(input.class_id !== undefined && {
        class: { connect: { id: input.class_id } },
      }),
    });

    return {
      id: lesson.id,
      modality: lesson.modality,
      date_time: lesson.date_time,
      description: lesson.description,
      class_id: lesson.class_id,
      createdAt: lesson.created_at,
    };
  };
