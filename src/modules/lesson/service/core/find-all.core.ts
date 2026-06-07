import type { LessonDto } from '../../dto/lesson.dto';
import type { LessonRepositoryPort } from '../../interfaces/lesson-repository.port';

export const findAll =
  (deps: { lessonRepo: LessonRepositoryPort }) =>
  async (): Promise<LessonDto[]> => {
    const { lessonRepo } = deps;

    const lessons = await lessonRepo.findAll();

    return lessons.map(lesson => ({
      id: lesson.id,
      modality: lesson.modality,
      date_time: lesson.date_time,
      description: lesson.description,
      class_id: lesson.class_id,
      createdAt: lesson.created_at,
    }));
  };
