import type { SubjectRepositoryPort } from '@/modules/subject/interfaces/subject-repository.port';
import type { AcademicProfileRepositoryPort } from '@/modules/user/interfaces/academic-profile-repository.port';

import type { ClassRepositoryPort } from '../interfaces/class-repository.port';
import type { ClassServicePort } from '../interfaces/class-service.port';
import { assignMonitor } from './core/assign-monitor.core';
import { create } from './core/create.core';
import { findAll } from './core/find-all.core';
import { findByCode } from './core/find-by-code.core';
import { findById } from './core/find-by-id.core';
import { remove } from './core/remove.core';
import { update } from './core/update.core';

export const classService = (deps: {
  classRepo: ClassRepositoryPort;
  profileRepo: AcademicProfileRepositoryPort;
  subjectRepo: SubjectRepositoryPort;
}): ClassServicePort => ({
  create: create(deps),
  findAll: findAll(deps),
  findById: findById(deps),
  findByCode: findByCode(deps),
  update: update(deps),
  remove: remove(deps),
  assignMonitor: assignMonitor(deps),
});
