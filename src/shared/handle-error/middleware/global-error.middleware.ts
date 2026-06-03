import type { NextFunction, Request, Response } from 'express';

import { logger } from '@/shared/logger';

import { ApiError } from '../api-error';

export const globalErrorMiddleware = (
  error: unknown,
  _request: Request,
  response: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) => {
  if (error instanceof ApiError) {
    const statusCode = error.statusCode;
    const codeError = error.codeError;
    const messageError = error.message;
    const validationError = error.validationError;

    response.status(statusCode as number).json({
      code_error: codeError,
      message: messageError,
      errors: validationError,
    });
    return;
  }

  logger.error((error as Error).message);
  response
    .status(500)
    .json({ code_error: 'INTERNAL_SERVER', message: 'Internal Server Error' });
};
