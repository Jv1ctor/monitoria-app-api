import type { RequestHandler } from 'express';

import type { RatingServicePort } from '../interfaces/rating-service.port';
import { create } from './core/create.core';
import { listByMonitor } from './core/list-by-monitor.core';
import { listGiven } from './core/list-given.core';
import { listReceived } from './core/list-received.core';

type RatingController = {
  create: RequestHandler;
  listGiven: RequestHandler;
  listReceived: RequestHandler;
  listByMonitor: RequestHandler;
};

export const ratingController = (deps: {
  ratingService: RatingServicePort;
}): RatingController => ({
  create: create(deps),
  listGiven: listGiven(deps),
  listReceived: listReceived(deps),
  listByMonitor: listByMonitor(deps),
});
