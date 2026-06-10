import type { Request, Response } from 'express';

import type { StudentServicePort } from '../../interfaces/student-service.port';

export const findAll =
  (deps: { studentService: StudentServicePort }) =>
  async (_request: Request, response: Response) => {
    const { studentService } = deps;

    const result = await studentService.findAll();

    response.status(200).json(result);
  };
