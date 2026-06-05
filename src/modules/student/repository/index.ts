import type { AcademicProfileRepositoryPort } from '../interfaces/academic-profile-repository.port';
import { create } from './core/create.core';
import { majorInUse } from './core/major-in-use.core';

export const academicProfileRepository: AcademicProfileRepositoryPort = {
  create,
  majorInUse,
};
