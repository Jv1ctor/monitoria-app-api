import type { Request, Response } from 'express';

export const notFoundErrorMiddleware = (
  _request: Request,
  response: Response,
) => {
  response.status(404).json({
    message: 'endpoint not found',
    code_error: 'NOT_FOUND',
  });
};
