import type { AuthoredUser } from '../../interfaces/lesson-service.port';
import type { LessonUserRepositoryPort } from '../../interfaces/lesson-user-repository.port';

export const findEnrolled =
  (deps: { lessonUserRepo: LessonUserRepositoryPort }) =>
  async ({ id }: AuthoredUser) => {
    const { lessonUserRepo } = deps;

    const lessons = await lessonUserRepo.findStudentEnrolled(id);

    return lessons.map(lesson => ({
      id: lesson.id,
      modality: lesson.modality,
      date_time: lesson.date_time,
      description: lesson.description,
      class_id: lesson.class_id,
      createdAt: lesson.created_at,
    }));
  };
