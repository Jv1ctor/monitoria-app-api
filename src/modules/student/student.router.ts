import { Router } from 'express';

import { authenticatorMiddleware } from '../auth/middleware/authenticator.middleware';
import { authorizatorMiddleware } from '../auth/middleware/authorizator.middleawre';
import { majorRepository } from '../major/repository';
import { subjectRepository } from '../subject/repository';
import { academicProfileRepository } from '../user/repository/academic-profile';
import { userRepository } from '../user/repository/user';
import { studentController } from './controller';
import { studentService } from './service';

export const studentRouter = Router();

const userRepo = userRepository;
const majorRepo = majorRepository;
const profileRepo = academicProfileRepository;
const subjectRepo = subjectRepository;
const authenticator = authenticatorMiddleware({ userRepo });

const studentSvc = studentService({
  userRepo,
  subjectRepo,
  majorRepo,
  profileRepo,
});
const studentCtrl = studentController({ studentService: studentSvc });

studentRouter.get(
  '/',
  authenticator,
  authorizatorMiddleware(['ADMIN']),
  studentCtrl.findAll,
);

studentRouter.post(
  '/:id/promote',
  authenticator,
  authorizatorMiddleware(['ADMIN']),
  studentCtrl.promote,
);
