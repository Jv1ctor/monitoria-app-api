import { formatZodError } from './formatter-error';
import type { FormattedZodError } from './types/formatted-zod-error.type';
import type { ParameterErrorType } from './types/parameter-error.type';

export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly codeError: string;
  public readonly validationError?: FormattedZodError[];
  constructor(
    params: ParameterErrorType,
    statusCode: number,
    codeError: string,
  ) {
    super(params.message);
    this.statusCode = statusCode;
    this.codeError = codeError;

    this.validationError = formatZodError(params.error);
  }
}
