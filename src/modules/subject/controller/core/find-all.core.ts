import type { Request, Response } from 'express';

import type { SubjectServicePort } from '../../interfaces/subject-service.port';

export const findAll =
  (deps: { subjectService: SubjectServicePort }) =>
  async (_request: Request, response: Response) => {
    const { subjectService } = deps;

    const result = await subjectService.findAll();

    response.status(200).json(result);
  };
