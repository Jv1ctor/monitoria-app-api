import type { ClassRepositoryPort } from '@/modules/class/interfaces/class-repository.port';
import type { LessonRepositoryPort } from '@/modules/lesson/interfaces/lesson-repository.port';
import type { AcademicProfileRepositoryPort } from '@/modules/user/interfaces/academic-profile-repository.port';

import type { FrequencysRepositoryPort } from '../interfaces/frequencys-repository.port';
import type { FrequencysServicePort } from '../interfaces/frequencys-service.port';
import { findByClass } from './core/find-by-class.core';
import { findById } from './core/find-by-id.core';
import { findByLesson } from './core/find-by-lesson.core';
import { findByStudent } from './core/find-by-student.core';
import { remove } from './core/remove.core';
import { updateValue } from './core/update-value.core';

export const frequencysService = (deps: {
  frequencysRepo: FrequencysRepositoryPort;
  lessonRepo: LessonRepositoryPort;
  classRepo: ClassRepositoryPort;
  profileRepo: AcademicProfileRepositoryPort;
}): FrequencysServicePort => ({
  findById: findById(deps),
  findByLesson: findByLesson(deps),
  findByClass: findByClass(deps),
  findByStudent: findByStudent(deps),
  updateValue: updateValue(deps),
  remove: remove(deps),
});
