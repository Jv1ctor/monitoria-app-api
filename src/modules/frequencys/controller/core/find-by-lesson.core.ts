import type { Request, Response } from 'express';

import { BadRequestError } from '@/shared/handle-error/errors/bad-request.error';

import { FrequencysLessonQueryDto } from '../../dto/query/frequencys-lesson-query.dto';
import type { FrequencysServicePort } from '../../interfaces/frequencys-service.port';

export const findByLesson =
  (deps: { frequencysService: FrequencysServicePort }) =>
  async (request: Request, response: Response) => {
    const { frequencysService } = deps;

    const parsed = await FrequencysLessonQueryDto.safeParseAsync(request.query);
    if (!parsed.success) {
      throw new BadRequestError({
        message: 'erro de validacao',
        error: parsed.error,
      });
    }

    const user = request.user!;
    const result = await frequencysService.findByLesson(parsed.data.lesson_id, {
      id: user.id,
      role: user.role,
    });

    response.status(200).json(result);
  };
