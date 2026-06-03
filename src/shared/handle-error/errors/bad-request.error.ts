import { ApiError } from '../api-error.js';
import type { ParameterErrorType } from '../types/parameter-error.type.js';

export class BadRequestError extends ApiError {
  constructor(params: ParameterErrorType) {
    super(params, 400, 'BAD_REQUEST');
  }
}
