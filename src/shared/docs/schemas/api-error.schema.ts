import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z from 'zod';

import { FormattedZodError } from '@/shared/handle-error/types/formatted-zod-error.type';

import { registry } from '../registry';

extendZodWithOpenApi(z);

export const ApiErrorResponseSchema = registry.register(
  'ApiErrorResponseDto',
  z.object({
    code_error: z.string(),
    message: z.string(),
    errors: z.array(FormattedZodError).optional(),
  }),
);
