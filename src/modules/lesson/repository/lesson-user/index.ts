import type { LessonUserRepositoryPort } from '../../interfaces/lesson-user-repository.port';
import { create as lessonUserCreate } from '../lesson-user/core/create.core';
import { findUnique as lessonUserFindUnique } from '../lesson-user/core/find.core';
import { remove as lessonUserRemove } from '../lesson-user/core/remove.core';
import { findStudentEnrolled } from './core/find-student-enrolled.core';
import { findStudentEnrollment } from './core/find-student-enrollment.core';
export const lessonUserRepository: LessonUserRepositoryPort = {
  create: lessonUserCreate,
  findUnique: lessonUserFindUnique,
  remove: lessonUserRemove,
  findStudentEnrollment: findStudentEnrollment,
  findStudentEnrolled,
};
