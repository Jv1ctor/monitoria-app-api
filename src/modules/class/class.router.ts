import { Router } from 'express';

import { authenticatorMiddleware } from '../auth/middleware/authenticator.middleware';
import { authorizatorMiddleware } from '../auth/middleware/authorizator.middleawre';
import { subjectRepository } from '../subject/repository';
import { academicProfileRepository } from '../user/repository/academic-profile';
import { userRepository } from '../user/repository/user';
import { classController } from './controller';
import { classRepository } from './repository';
import { classService } from './service';

export const classRouter = Router();

const userRepo = userRepository;
const service = classService({
  classRepo: classRepository,
  subjectRepo: subjectRepository,
  profileRepo: academicProfileRepository,
});
const authenticator = authenticatorMiddleware({ userRepo });

const controller = classController({
  classService: service,
});

classRouter.post(
  '/',
  authenticator,
  authorizatorMiddleware(['ADMIN']),
  controller.create,
);
classRouter.get('/', authenticator, controller.findAll);
classRouter.get('/by-code', authenticator, controller.findByCode);
classRouter.get('/:id', authenticator, controller.findById);
classRouter.put(
  '/:id',
  authenticator,
  authorizatorMiddleware(['ADMIN']),
  controller.update,
);
classRouter.delete(
  '/:id',
  authenticator,
  authorizatorMiddleware(['ADMIN']),
  controller.remove,
);
classRouter.put(
  '/:id/monitor',
  authenticator,
  authorizatorMiddleware(['ADMIN']),
  controller.assignMonitor,
);
