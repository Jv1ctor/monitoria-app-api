import type { Request, Response } from 'express';

import type { MajorServicePort } from '../../interfaces/major-service.port';

export const findAll =
  (deps: { majorService: MajorServicePort }) =>
  async (_request: Request, response: Response) => {
    const { majorService } = deps;

    const result = await majorService.findAll();

    response.status(200).json(result);
  };
