import type { Request, RequestHandler, Response } from 'express';

import { BadRequestError } from '@/shared/handle-error/errors/bad-request.error';

import { LessonClassQueryDto } from '../../dto/lesson-class-query.dto';
import type { LessonServicePort } from '../../interfaces/lesson-service.port';

export const findByClassId = (deps: {
  lessonService: LessonServicePort;
}): RequestHandler => {
  return async (request: Request, response: Response) => {
    const { lessonService } = deps;

    const { success, data, error } = await LessonClassQueryDto.safeParseAsync(
      request.query,
    );

    if (!success) {
      throw new BadRequestError({ message: 'erro de validacao', error });
    }

    const result = await lessonService.findByClassId(data.class_id);

    response.status(200).json(result);
  };
};
