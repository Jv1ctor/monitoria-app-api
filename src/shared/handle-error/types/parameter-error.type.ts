import type { ZodError } from 'zod';

export type ParameterErrorType = {
  message: string;
  error?: ZodError;
};
