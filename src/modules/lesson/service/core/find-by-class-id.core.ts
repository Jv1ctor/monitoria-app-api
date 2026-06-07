import type { LessonDto } from '../../dto/lesson.dto';
import type { LessonRepositoryPort } from '../../interfaces/lesson-repository.port';

export const findByClassId =
  (deps: { lessonRepo: LessonRepositoryPort }) =>
  async (classId: number): Promise<LessonDto[]> => {
    const { lessonRepo } = deps;

    const lessons = await lessonRepo.findByClassId(classId);

    return lessons.map(lesson => ({
      id: lesson.id,
      modality: lesson.modality,
      date_time: lesson.date_time,
      description: lesson.description,
      class_id: lesson.class_id,
      createdAt: lesson.created_at,
    }));
  };
