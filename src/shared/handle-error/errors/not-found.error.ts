import { ApiError } from '../api-error.js';
import type { ParameterErrorType } from '../types/parameter-error.type.js';

export class NotFoundError extends ApiError {
  constructor({ message }: ParameterErrorType) {
    super(message, 404, 'NOT_FOUND');
  }
}
