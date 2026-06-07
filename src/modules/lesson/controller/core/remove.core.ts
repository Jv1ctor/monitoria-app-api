import type { Request, Response } from 'express';

import { BadRequestError } from '@/shared/handle-error/errors/bad-request.error';

import { LessonIdParameterDto } from '../../dto/lesson-id-params.dto';
import type { LessonServicePort } from '../../interfaces/lesson-service.port';

export const remove =
  (deps: { lessonService: LessonServicePort }) =>
  async (request: Request, response: Response) => {
    const { lessonService } = deps;

    const { success, data, error } = await LessonIdParameterDto.safeParseAsync(
      request.params,
    );

    if (!success) {
      throw new BadRequestError({ message: 'erro de validacao', error });
    }

    const result = await lessonService.remove(data.id);

    response.status(200).json(result);
  };
