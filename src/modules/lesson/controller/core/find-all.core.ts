import type { Request, Response } from 'express';

import type { LessonServicePort } from '../../interfaces/lesson-service.port';

export const findAll =
  (deps: { lessonService: LessonServicePort }) =>
  async (_request: Request, response: Response) => {
    const { lessonService } = deps;

    const result = await lessonService.findAll();

    response.status(200).json(result);
  };
