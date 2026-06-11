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
      class: lesson.class
        ? {
            id: lesson.class.id,
            code: lesson.class.code,
            monitor: lesson.class.monitor?.user
              ? {
                  id: lesson.class.monitor.user.id,
                  first_name: lesson.class.monitor.user.first_name,
                  last_name: lesson.class.monitor.user.last_name,
                }
              : undefined,
          }
        : undefined,
    }));
  };
