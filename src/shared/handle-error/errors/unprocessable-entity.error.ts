import { ApiError } from '../api-error.js';
import type { ParameterErrorType } from '../types/parameter-error.type.js';

export class UnprocessableEntityError extends ApiError {
  constructor(params: ParameterErrorType) {
    super(params, 422, 'UNPROCESSABLE_ENTITY');
  }
}
