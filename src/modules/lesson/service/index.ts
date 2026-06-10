import type { ClassRepositoryPort } from '@/modules/class/interfaces/class-repository.port';
import type { FrequencysRepositoryPort } from '@/modules/frequencys/interfaces/frequencys-repository.port';
import type { UserRepositoryPort } from '@/modules/user/interfaces/user-repository.port';

import type { LessonRepositoryPort } from '../interfaces/lesson-repository.port';
import type { LessonServicePort } from '../interfaces/lesson-service.port';
import type { LessonUserRepositoryPort } from '../interfaces/lesson-user-repository.port';
import { create } from './core/create.core';
import { enroll } from './core/enroll.core';
import { findAll } from './core/find-all.core';
import { findByClassId } from './core/find-by-class-id.core';
import { findById } from './core/find-by-id.core';
import { findEnrolled } from './core/find-enrolled.core';
import { leave } from './core/leave.core';
import { remove } from './core/remove.core';
import { update } from './core/update.core';

export const lessonService = (deps: {
  lessonRepo: LessonRepositoryPort;
  classRepo: ClassRepositoryPort;
  lessonUserRepo: LessonUserRepositoryPort;
  frequencysRepo: FrequencysRepositoryPort;
  userRepo: UserRepositoryPort;
}): LessonServicePort => ({
  create: create(deps),
  findAll: findAll(deps),
  findById: findById(deps),
  findByClassId: findByClassId(deps),
  update: update(deps),
  remove: remove(deps),
  enroll: enroll(deps),
  leave: leave(deps),
  findEnrolled: findEnrolled(deps),
});
