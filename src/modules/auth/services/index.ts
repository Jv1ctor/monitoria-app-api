import type { StudentServicePort } from '@/modules/student/interfaces/student-service.port';
import type { UserRepositoryPort } from '@/modules/user/interfaces/user-repository.port';

import type { AuthServicePort } from '../interfaces/auth-service.port';
import { login } from './core/login.core';
import { register } from './core/register.core';

export const authService = (deps: {
  userRepo: UserRepositoryPort;
  studentService: StudentServicePort;
}): AuthServicePort => ({
  login: login({ userRepo: deps.userRepo }),
  register: register({
    studentService: deps.studentService,
  }),
  // recover: ,
});
