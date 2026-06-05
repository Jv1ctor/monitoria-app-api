import { ApiError } from '../api-error.js';
import type { ParameterErrorType } from '../types/parameter-error.type.js';

export class ForbiddenError extends ApiError {
  constructor(params: ParameterErrorType) {
    super(params, 403, 'FORBIDDEN');
  }
}
