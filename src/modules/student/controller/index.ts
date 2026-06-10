import type { RequestHandler } from 'express';

import type { StudentServicePort } from '../interfaces/student-service.port';
import { findAll } from './core/find-all.core';
import { promote } from './core/promote.core';

type StudentController = {
  findAll: RequestHandler;
  promote: RequestHandler;
};

export const studentController = (deps: {
  studentService: StudentServicePort;
}): StudentController => ({
  findAll: findAll(deps),
  promote: promote(deps),
});
