import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z from 'zod';

import { registry } from '@/shared/docs/registry';
import { ApiErrorResponseSchema } from '@/shared/docs/schemas/api-error.schema';

import { MeResponseDto } from '../dto/response/me-response.dto';

extendZodWithOpenApi(z);

const MeResponseSchema = registry.register('MeResponseDto', MeResponseDto);

registry.registerPath({
  method: 'get',
  path: '/user/me',
  tags: ['User'],
  summary: 'Get current user',
  description: 'Retorna os dados do usuário logado.',
  security: [{ bearerAuth: [] }],
  responses: {
    200: {
      description: 'User returned successfully.',
      content: { 'application/json': { schema: MeResponseSchema } },
    },
    401: {
      description: 'Unauthorized.',
      content: { 'application/json': { schema: ApiErrorResponseSchema } },
    },
    404: {
      description: 'User not found.',
      content: { 'application/json': { schema: ApiErrorResponseSchema } },
    },
  },
});
