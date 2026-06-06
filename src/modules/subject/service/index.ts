import type { ClassRepositoryPort } from '@/modules/class/interfaces/class-repository.port';
import type { MajorRepositoryPort } from '@/modules/major/interfaces/major-repository.port';

import type { SubjectRepositoryPort } from '../interfaces/subject-repository.port';
import type { SubjectServicePort } from '../interfaces/subject-service.port';
import { create } from './core/create.core';
import { findAll } from './core/find-all.core';
import { findByCode } from './core/find-by-code.core';
import { findById } from './core/find-by-id.core';
import { remove } from './core/remove.core';
import { update } from './core/update.core';

export const subjectService = (deps: {
  subjectRepo: SubjectRepositoryPort;
  classRepo: ClassRepositoryPort;
  majorRepo: MajorRepositoryPort;
}): SubjectServicePort => ({
  create: create(deps),
  findAll: findAll(deps),
  findById: findById(deps),
  findByCode: findByCode(deps),
  update: update(deps),
  remove: remove(deps),
});
