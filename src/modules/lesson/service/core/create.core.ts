import type { ClassRepositoryPort } from '@/modules/class/interfaces/class-repository.port';
import { NotFoundError } from '@/shared/handle-error/errors/not-found.error';

import type { CreateLessonDto } from '../../dto/create-lesson.dto';
import type { LessonDto } from '../../dto/lesson.dto';
import type { LessonRepositoryPort } from '../../interfaces/lesson-repository.port';

export const create =
  (deps: {
    lessonRepo: LessonRepositoryPort;
    classRepo: ClassRepositoryPort;
  }) =>
  async (input: CreateLessonDto): Promise<LessonDto> => {
    const { lessonRepo, classRepo } = deps;

    const existClass = await classRepo.findById(input.class_id);

    if (!existClass) {
      throw new NotFoundError({ message: 'Turma nao encontrada' });
    }

    const lesson = await lessonRepo.create({
      modality: input.modality,
      date_time: new Date(input.date_time),
      description: input.description,
      class: { connect: { id: input.class_id } },
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
