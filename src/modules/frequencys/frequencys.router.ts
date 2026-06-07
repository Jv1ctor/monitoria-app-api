import { Router } from 'express';

import { authenticatorMiddleware } from '../auth/middleware/authenticator.middleware';
import { authorizatorMiddleware } from '../auth/middleware/authorizator.middleawre';
import { classRepository } from '../class/repository';
import { lessonRepository } from '../lesson/repository/lesson';
import { academicProfileRepository } from '../user/repository/academic-profile';
import { userRepository } from '../user/repository/user';
import { frequencysController } from './controller';
import { frequencysRepository } from './repository';
import { frequencysService } from './service';

export const frequencysRouter = Router();

const service = frequencysService({
  frequencysRepo: frequencysRepository,
  lessonRepo: lessonRepository,
  classRepo: classRepository,
  profileRepo: academicProfileRepository,
});

const controller = frequencysController({ frequencysService: service });

const userRepo = userRepository;
const authenticator = authenticatorMiddleware({ userRepo });

frequencysRouter.get(
  '/by-lesson',
  authenticator,
  authorizatorMiddleware(['MONITOR', 'ADMIN', 'STUDENT']),
  controller.findByLesson,
);

frequencysRouter.get(
  '/by-class',
  authenticator,
  authorizatorMiddleware(['MONITOR', 'ADMIN', 'STUDENT']),
  controller.findByClass,
);

frequencysRouter.get(
  '/by-student',
  authenticator,
  authorizatorMiddleware(['MONITOR', 'ADMIN', 'STUDENT']),
  controller.findByStudent,
);

frequencysRouter.get(
  '/:id',
  authenticator,
  authorizatorMiddleware(['MONITOR', 'ADMIN', 'STUDENT']),
  controller.findById,
);

frequencysRouter.patch(
  '/:id',
  authenticator,
  authorizatorMiddleware(['MONITOR', 'ADMIN']),
  controller.updateValue,
);

frequencysRouter.delete(
  '/:id',
  authenticator,
  authorizatorMiddleware(['MONITOR', 'ADMIN']),
  controller.remove,
);
