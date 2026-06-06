import type { Request, RequestHandler, Response } from 'express';

import { BadRequestError } from '@/shared/handle-error/errors/bad-request.error';

import { SubjectCodeQueryDto } from '../../dto/subject-code-query.dto';
import type { SubjectServicePort } from '../../interfaces/subject-service.port';

export const findByCode = (deps: {
  subjectService: SubjectServicePort;
}): RequestHandler => {
  return async (request: Request, response: Response) => {
    const { subjectService } = deps;

    const { success, data, error } = await SubjectCodeQueryDto.safeParseAsync(
      request.query,
    );

    if (!success) {
      throw new BadRequestError({ message: 'erro de validacao', error });
    }

    const result = await subjectService.findByCode(data.code);

    response.status(200).json(result);
  };
};
