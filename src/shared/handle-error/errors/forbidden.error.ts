import { ApiError } from '../api-error.js';
import type { ParameterErrorType } from '../types/parameter-error.type.js';

export class ForbiddenError extends ApiError {
  constructor({ message }: ParameterErrorType) {
    super(message, 403, 'FORBIDDEN');
  }
}
