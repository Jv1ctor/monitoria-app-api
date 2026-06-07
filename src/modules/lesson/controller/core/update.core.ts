import type { Request, Response } from 'express';

import { BadRequestError } from '@/shared/handle-error/errors/bad-request.error';

import { LessonIdParameterDto } from '../../dto/lesson-id-params.dto';
import { UpdateLessonDto } from '../../dto/update-lesson.dto';
import type { LessonServicePort } from '../../interfaces/lesson-service.port';

export const update =
  (deps: { lessonService: LessonServicePort }) =>
  async (request: Request, response: Response) => {
    const { lessonService } = deps;

    const parsedParams = await LessonIdParameterDto.safeParseAsync(
      request.params,
    );

    if (!parsedParams.success) {
      throw new BadRequestError({
        message: 'erro de validacao',
        error: parsedParams.error,
      });
    }

    const parsedBody = await UpdateLessonDto.safeParseAsync(request.body);

    if (!parsedBody.success) {
      throw new BadRequestError({
        message: 'erro de validacao',
        error: parsedBody.error,
      });
    }

    const result = await lessonService.update(
      parsedParams.data.id,
      parsedBody.data,
    );

    response.status(200).json(result);
  };
