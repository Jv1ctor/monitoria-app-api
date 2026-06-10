import type { LessonUserRepositoryPort } from '@/modules/lesson/interfaces/lesson-user-repository.port';
import type { AcademicProfileRepositoryPort } from '@/modules/user/interfaces/academic-profile-repository.port';

import type { RatingRepositoryPort } from '../interfaces/rating-repository.port';
import type { RatingServicePort } from '../interfaces/rating-service.port';
import { create } from './core/create.core';
import { listByMonitor } from './core/list-by-monitor.core';
import { listGiven } from './core/list-given.core';
import { listReceived } from './core/list-received.core';

export const ratingService = (deps: {
  ratingRepo: RatingRepositoryPort;
  profileRepo: AcademicProfileRepositoryPort;
  lessonUserRepo: LessonUserRepositoryPort;
}): RatingServicePort => ({
  create: create(deps),
  listGiven: listGiven(deps),
  listReceived: listReceived(deps),
  listByMonitor: listByMonitor(deps),
});
