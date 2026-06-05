import type { AcademicProfileRepositoryPort } from '../interfaces/academic-profile-repository.port';
import { create } from './core/create.core';

export const academicProfileRepository: AcademicProfileRepositoryPort = {
  create,
};
