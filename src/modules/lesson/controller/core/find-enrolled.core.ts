import type { Request, Response } from 'express';

import type { LessonServicePort } from '../../interfaces/lesson-service.port';

export const findEnrolled =
  (deps: { lessonService: LessonServicePort }) =>
  async (_request: Request, response: Response) => {
    const { lessonService } = deps;

    const user = _request.user!;
    const result = await lessonService.findEnrolled({
      id: user.id,
      role: user.role,
    });

    response.status(200).json(result);
  };
