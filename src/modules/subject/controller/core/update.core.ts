import type { Request, Response } from 'express';

import { BadRequestError } from '@/shared/handle-error/errors/bad-request.error';

import { SubjectIdParameterDto } from '../../dto/subject-id-params.dto';
import { UpdateSubjectDto } from '../../dto/update-subject.dto';
import type { SubjectServicePort } from '../../interfaces/subject-service.port';

export const update =
  (deps: { subjectService: SubjectServicePort }) =>
  async (request: Request, response: Response) => {
    const { subjectService } = deps;

    const parsedParams = await SubjectIdParameterDto.safeParseAsync(
      request.params,
    );

    if (!parsedParams.success) {
      throw new BadRequestError({
        message: 'erro de validacao',
        error: parsedParams.error,
      });
    }

    const parsedBody = await UpdateSubjectDto.safeParseAsync(request.body);

    if (!parsedBody.success) {
      throw new BadRequestError({
        message: 'erro de validacao',
        error: parsedBody.error,
      });
    }

    const result = await subjectService.update(
      parsedParams.data.id,
      parsedBody.data,
    );

    response.status(200).json(result);
  };
