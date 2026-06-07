import type { Request, Response } from 'express';

import { BadRequestError } from '@/shared/handle-error/errors/bad-request.error';

import { CreateLessonDto } from '../../dto/create-lesson.dto';
import type { LessonServicePort } from '../../interfaces/lesson-service.port';

export const create =
  (deps: { lessonService: LessonServicePort }) =>
  async (request: Request, response: Response) => {
    const { lessonService } = deps;
    const body = request.body;

    const { success, data, error } = await CreateLessonDto.safeParseAsync(body);

    if (!success) {
      throw new BadRequestError({ message: 'erro de validacao', error });
    }

    const result = await lessonService.create(data);

    response.status(200).json(result);
  };
