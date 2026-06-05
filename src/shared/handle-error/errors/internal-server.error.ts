import { ApiError } from '../api-error.js';
import type { ParameterErrorType } from '../types/parameter-error.type.js';

export class InternalServerError extends ApiError {
  constructor(params: ParameterErrorType) {
    super(params, 500, 'INTERNAL_SERVER');
  }
}
