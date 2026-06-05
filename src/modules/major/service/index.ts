import type { AcademicProfileRepositoryPort } from '@/modules/student/interfaces/academic-profile-repository.port';

import type { MajorRepositoryPort } from '../interfaces/major-repository.port';
import type { MajorServicePort } from '../interfaces/major-service.port';
import { create } from './core/create.core';
import { findAll } from './core/find-all.core';
import { findById } from './core/find-by-id.core';
import { findByName } from './core/find-by-name.core';
import { remove } from './core/remove.core';
import { update } from './core/update.core';

export const majorService = (
  majorRepo: MajorRepositoryPort,
  profileRepo: AcademicProfileRepositoryPort,
): MajorServicePort => ({
  create: create({ repository: majorRepo }),
  findAll: findAll({ repository: majorRepo }),
  findById: findById({ repository: majorRepo }),
  findByName: findByName({ repository: majorRepo }),
  remove: remove({ majorRepo, profileRepo }),
  update: update({ repository: majorRepo }),
});
