import type { NextFunction, Request, Response } from 'express';

import { logger } from '@/shared/logger';

import { ApiError } from '../api-error';

export const globalErrorMiddleware = (
  error: unknown,
  _request: Request,
  response: Response,
  _next: NextFunction,
) => {
  if (error instanceof ApiError) {
    const statusCode = error.statusCode;
    const codeError = error.codeError;
    const messageError = error.message;

    response
      .status(statusCode as number)
      .json({ code_error: codeError, error: messageError });
    return;
  }

  logger.error((error as Error).message);
  response
    .status(500)
    .json({ code_error: 'INTERNAL_SERVER', error: 'Internal Server Error' });
};
