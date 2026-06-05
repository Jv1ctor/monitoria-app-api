import type { Request, Response } from 'express';

import { BadRequestError } from '@/shared/handle-error/errors/bad-request.error';

import { CreateSubjectDto } from '../../dto/create-subject.dto';
import type { SubjectServicePort } from '../../interfaces/subject-service.port';

export const create =
  (deps: { subjectService: SubjectServicePort }) =>
  async (request: Request, response: Response) => {
    const { subjectService } = deps;
    const body = request.body;

    const { success, data, error } =
      await CreateSubjectDto.safeParseAsync(body);

    if (!success) {
      throw new BadRequestError({ message: 'erro de validacao', error });
    }

    const result = await subjectService.create(data);

    response.status(200).json(result);
  };
