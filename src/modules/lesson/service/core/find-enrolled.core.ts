import type { LessonDto } from '../../dto/lesson.dto';
import type { AuthoredUser } from '../../interfaces/lesson-service.port';
import type { LessonUserRepositoryPort } from '../../interfaces/lesson-user-repository.port';

export const findEnrolled =
  (deps: { lessonUserRepo: LessonUserRepositoryPort }) =>
  async ({ id }: AuthoredUser): Promise<LessonDto[]> => {
    const { lessonUserRepo } = deps;

    const lessons = await lessonUserRepo.findStudentEnrolled(id);

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
            subject: lesson.class.subject
              ? { id: lesson.class.subject.id, name: lesson.class.subject.name }
              : undefined,
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
