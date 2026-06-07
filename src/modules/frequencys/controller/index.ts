import type { RequestHandler } from 'express';

import type { FrequencysServicePort } from '../interfaces/frequencys-service.port';
import { findByClass } from './core/find-by-class.core';
import { findById } from './core/find-by-id.core';
import { findByLesson } from './core/find-by-lesson.core';
import { findByStudent } from './core/find-by-student.core';
import { remove } from './core/remove.core';
import { updateValue } from './core/update-value.core';

type FrequencysController = {
  findById: RequestHandler;
  findByLesson: RequestHandler;
  findByClass: RequestHandler;
  findByStudent: RequestHandler;
  updateValue: RequestHandler;
  remove: RequestHandler;
};

export const frequencysController = (deps: {
  frequencysService: FrequencysServicePort;
}): FrequencysController => ({
  findById: findById(deps),
  findByLesson: findByLesson(deps),
  findByClass: findByClass(deps),
  findByStudent: findByStudent(deps),
  updateValue: updateValue(deps),
  remove: remove(deps),
});
