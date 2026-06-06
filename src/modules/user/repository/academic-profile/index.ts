import type { AcademicProfileRepositoryPort } from '../../interfaces/academic-profile-repository.port';
import { create } from './core/create.core';
import { findByUserId } from './core/find-by-user-id.core';
import { majorInUse } from './core/major-in-use.core';

export const academicProfileRepository: AcademicProfileRepositoryPort = {
  create,
  majorInUse,
  findByUserId,
};
