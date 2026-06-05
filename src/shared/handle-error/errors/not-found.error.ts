import { ApiError } from '../api-error.js';
import type { ParameterErrorType } from '../types/parameter-error.type.js';

export class NotFoundError extends ApiError {
  constructor(params: ParameterErrorType) {
    super(params, 404, 'NOT_FOUND');
  }
}
