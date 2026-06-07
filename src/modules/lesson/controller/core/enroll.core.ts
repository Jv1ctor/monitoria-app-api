import type { Request, Response } from 'express';

import { BadRequestError } from '@/shared/handle-error/errors/bad-request.error';

import { EnrollLessonRequestDto } from '../../dto/enroll-lesson-request.dto';
import { LessonIdParameterDto } from '../../dto/lesson-id-params.dto';
import type { LessonServicePort } from '../../interfaces/lesson-service.port';

export const enroll =
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

    const parsedBody = await EnrollLessonRequestDto.safeParseAsync(
      request.body,
    );
    if (!parsedBody.success) {
      throw new BadRequestError({
        message: 'erro de validacao',
        error: parsedBody.error,
      });
    }

    const user = request.user!;
    const result = await lessonService.enroll(
      parsedParams.data.id,
      parsedBody.data,
      { id: user.id, role: user.role },
    );

    response.status(201).json(result);
  };
