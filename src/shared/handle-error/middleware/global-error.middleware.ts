import type { Request, Response } from 'express';

import { ApiError } from '../api-error';

export const globalErrorMiddleware = (
  error: unknown,
  _request: Request,
  response: Response,
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

  response
    .status(50)
    .json({ code_error: 'INTERNAL_SERVER', error: 'Internal Server Error' });
};
