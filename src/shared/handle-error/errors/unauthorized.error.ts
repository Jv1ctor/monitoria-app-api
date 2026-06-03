import { ApiError } from '../api-error.js';
import type { ParameterErrorType } from '../types/parameter-error.type.js';

export class UnauthorizedError extends ApiError {
  constructor(params: ParameterErrorType) {
    super(params, 401, 'UNAUTHORIZED');
  }
}
