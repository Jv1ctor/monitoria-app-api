import type { RatingRepositoryPort } from '../interfaces/rating-repository.port';
import { findAllByMonitor } from './core/find-all-by-monitor.core';
import { findAllByStudent } from './core/find-all-by-student.core';
import { upsert } from './core/upsert.core';

export const ratingRepository: RatingRepositoryPort = {
  upsert,
  findAllByStudent,
  findAllByMonitor,
};
