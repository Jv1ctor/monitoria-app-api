import type { Request, Response } from 'express';

import { BadRequestError } from '@/shared/handle-error/errors/bad-request.error';

import { SubjectIdParameterDto } from '../../dto/subject-id-params.dto';
import type { SubjectServicePort } from '../../interfaces/subject-service.port';

export const remove =
  (deps: { subjectService: SubjectServicePort }) =>
  async (request: Request, response: Response) => {
    const { subjectService } = deps;

    const { success, data, error } = await SubjectIdParameterDto.safeParseAsync(
      request.params,
    );

    if (!success) {
      throw new BadRequestError({ message: 'erro de validacao', error });
    }

    const result = await subjectService.remove(data.id);

    response.status(200).json(result);
  };
