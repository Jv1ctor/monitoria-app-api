import type { ClassRepositoryPort } from '@/modules/class/interfaces/class-repository.port';

import type { SubjectRepositoryPort } from '../interfaces/subject-repository.port';
import type { SubjectServicePort } from '../interfaces/subject-service.port';
import { create } from './core/create.core';
import { findAll } from './core/find-all.core';
import { findByCode } from './core/find-by-code.core';
import { findById } from './core/find-by-id.core';
import { remove } from './core/remove.core';
import { update } from './core/update.core';

export const subjectService = (
  subjectRepo: SubjectRepositoryPort,
  classRepo: ClassRepositoryPort,
): SubjectServicePort => ({
  create: create({ repository: subjectRepo }),
  findAll: findAll({ repository: subjectRepo }),
  findById: findById({ repository: subjectRepo }),
  findByCode: findByCode({ repository: subjectRepo }),
  update: update({ repository: subjectRepo }),
  remove: remove({ subjectRepo, classRepo }),
});
