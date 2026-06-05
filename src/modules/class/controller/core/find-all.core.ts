import type { Request, Response } from 'express';

import type { ClassServicePort } from '../../interfaces/class-service.port';

export const findAll =
  (deps: { classService: ClassServicePort }) =>
  async (_request: Request, response: Response) => {
    const { classService } = deps;

    const result = await classService.findAll();

    response.status(200).json(result);
  };
