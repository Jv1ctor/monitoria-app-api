import { Router } from 'express';

import { authenticatorMiddleware } from '../auth/middleware/authenticator.middleware';
import { authorizatorMiddleware } from '../auth/middleware/authorizator.middleawre';
import { classRepository } from '../class/repository';
import { frequencysRepository } from '../frequencys/repository';
import { userRepository } from '../user/repository/user';
import { lessonController } from './controller';
import { lessonRepository } from './repository/lesson';
import { lessonUserRepository } from './repository/lesson-user';
import { lessonService } from './service';

export const lessonRouter = Router();

const service = lessonService({
  lessonRepo: lessonRepository,
  classRepo: classRepository,
  lessonUserRepo: lessonUserRepository,
  frequencysRepo: frequencysRepository,
  userRepo: userRepository,
});
const authenticator = authenticatorMiddleware({ userRepo: userRepository });

const controller = lessonController({
  lessonService: service,
});

lessonRouter.post(
  '/',
  authenticator,
  authorizatorMiddleware(['MONITOR']),
  controller.create,
);
lessonRouter.get(
  '/',
  authenticator,
  authorizatorMiddleware(['ADMIN']),
  controller.findAll,
);
lessonRouter.get(
  '/by-class',
  authenticator,
  authorizatorMiddleware(['ADMIN', 'STUDENT', 'MONITOR']),
  controller.findByClassId,
);
lessonRouter.get(
  '/enrolled',
  authenticator,
  authorizatorMiddleware(['STUDENT']),
  controller.findEnrolled,
);
lessonRouter.get(
  '/:id',
  authenticator,
  authorizatorMiddleware(['ADMIN', 'STUDENT', 'MONITOR']),
  controller.findById,
);
lessonRouter.put(
  '/:id',
  authenticator,
  authorizatorMiddleware(['MONITOR']),
  controller.update,
);
lessonRouter.delete(
  '/:id',
  authenticator,
  authorizatorMiddleware(['MONITOR']),
  controller.remove,
);
lessonRouter.post(
  '/:id/enroll',
  authenticator,
  authorizatorMiddleware(['STUDENT']),
  controller.enroll,
);
lessonRouter.delete(
  '/:id/enroll',
  authenticator,
  authorizatorMiddleware(['STUDENT']),
  controller.leave,
);
