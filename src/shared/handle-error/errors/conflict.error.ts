import { ApiError } from '../api-error.js';
import type { ParameterErrorType } from '../types/parameter-error.type.js';

export class ConflictError extends ApiError {
  constructor({ message }: ParameterErrorType) {
    super(message, 409, 'CONFLICT');
  }
}
