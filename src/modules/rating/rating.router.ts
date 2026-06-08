import { Router } from 'express';

import { authenticatorMiddleware } from '../auth/middleware/authenticator.middleware';
import { authorizatorMiddleware } from '../auth/middleware/authorizator.middleawre';
import { userRepository } from '../user/repository/user';
import { ratingController } from './controller';
import { ratingRepository } from './repository';
import { ratingService } from './service';

export const ratingRouter = Router();

const userRepo = userRepository;
const service = ratingService({ ratingRepo: ratingRepository });
const authenticator = authenticatorMiddleware({ userRepo });

const controller = ratingController({ ratingService: service });

ratingRouter.post(
  '/',
  authenticator,
  authorizatorMiddleware(['STUDENT']),
  controller.create,
);

ratingRouter.get(
  '/me/ratings',
  authenticator,
  authorizatorMiddleware(['STUDENT']),
  controller.listGiven,
);

ratingRouter.get(
  '/me/monitor/ratings',
  authenticator,
  authorizatorMiddleware(['MONITOR']),
  controller.listReceived,
);

ratingRouter.get(
  '/monitor/:monitor_id/ratings',
  authenticator,
  authorizatorMiddleware(['ADMIN']),
  controller.listByMonitor,
);
