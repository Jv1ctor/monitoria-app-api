import { Router } from 'express';

import { majorRepository } from '../major/repository';
import { academicProfileRepository } from '../student/repository';
import { studentService } from '../student/service';
import { userRepository } from '../user/repository';
import { authController } from './controller';
import { authService } from './services';

export const authRouter = Router();

const userRepo = userRepository;
const majorRepo = majorRepository;
const profileRepo = academicProfileRepository;

const student = studentService({ majorRepo, userRepo, profileRepo });

const controller = authController({
  authService: authService({ userRepo, studentService: student }),
});

authRouter.post('/login', controller.login);
authRouter.post('/register', controller.register);
