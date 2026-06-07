import { Router } from 'express';

import { authenticatorMiddleware } from '../auth/middleware/authenticator.middleware';
import { authorizatorMiddleware } from '../auth/middleware/authorizator.middleawre';
import { classRepository } from '../class/repository';
import { userRepository } from '../user/repository/user';
import { lessonController } from './controller';
import { lessonRepository } from './repository';
import { lessonService } from './service';

export const lessonRouter = Router();

const userRepo = userRepository;
const service = lessonService({
  lessonRepo: lessonRepository,
  classRepo: classRepository,
});
const authenticator = authenticatorMiddleware({ userRepo });

const controller = lessonController({
  lessonService: service,
});

lessonRouter.post(
  '/',
  authenticator,
  authorizatorMiddleware(['MONITOR']),
  controller.create,
);
lessonRouter.get('/', authenticator, controller.findAll);
lessonRouter.get('/by-class', authenticator, controller.findByClassId);
lessonRouter.get('/:id', authenticator, controller.findById);
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
