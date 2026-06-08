import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z from 'zod';

import { registry } from '@/shared/docs/registry';
import { ApiErrorResponseSchema } from '@/shared/docs/schemas/api-error.schema';

import { RatingMonitorIdParamsDto } from '../dto/params/rating-monitor-id-params.dto';
import { CreateRatingRequestDto } from '../dto/request/create-rating-request.dto';
import { RatingResponseDto } from '../dto/response/rating-response.dto';

extendZodWithOpenApi(z);

const CreateRatingRequestSchema = registry.register(
  'CreateRatingRequestDto',
  CreateRatingRequestDto,
);

const RatingMonitorIdParameterSchema = registry.register(
  'RatingMonitorIdParamDto',
  RatingMonitorIdParamsDto,
);

const RatingResponseSchema = registry.register(
  'RatingResponseDto',
  RatingResponseDto,
);

const RatingListResponseSchema = registry.register(
  'RatingListResponseDto',
  z.array(RatingResponseSchema),
);

registry.registerPath({
  method: 'post',
  path: '/rating',
  tags: ['Rating'],
  summary: 'Avaliar monitor',
  description: 'Cria ou atualiza um rating (somente STUDENT logado).',
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        'application/json': {
          schema: CreateRatingRequestSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Rating criado/atualizado.',
      content: { 'application/json': { schema: RatingResponseSchema } },
    },
    400: {
      description: 'Invalid payload.',
      content: { 'application/json': { schema: ApiErrorResponseSchema } },
    },
    403: {
      description: 'Aluno não matriculado em turma do monitor.',
      content: { 'application/json': { schema: ApiErrorResponseSchema } },
    },
    404: {
      description: 'Monitor não encontrado.',
      content: { 'application/json': { schema: ApiErrorResponseSchema } },
    },
    409: {
      description: 'Não é possível avaliar a si mesmo.',
      content: { 'application/json': { schema: ApiErrorResponseSchema } },
    },
  },
});

registry.registerPath({
  method: 'get',
  path: '/rating/me/ratings',
  tags: ['Rating'],
  summary: 'Meus ratings (student)',
  description: 'Lista ratings dados pelo student logado.',
  security: [{ bearerAuth: [] }],
  responses: {
    200: {
      description: 'Ratings returned successfully.',
      content: { 'application/json': { schema: RatingListResponseSchema } },
    },
  },
});

registry.registerPath({
  method: 'get',
  path: '/rating/me/monitor/ratings',
  tags: ['Rating'],
  summary: 'Meus ratings (monitor)',
  description: 'Lista ratings recebidos pelo monitor logado.',
  security: [{ bearerAuth: [] }],
  responses: {
    200: {
      description: 'Ratings returned successfully.',
      content: { 'application/json': { schema: RatingListResponseSchema } },
    },
  },
});

registry.registerPath({
  method: 'get',
  path: '/rating/monitor/{monitor_id}/ratings',
  tags: ['Rating'],
  summary: 'Ratings por monitor',
  description: 'Lista ratings recebidos por qualquer monitor.',
  security: [{ bearerAuth: [] }],
  request: {
    params: RatingMonitorIdParameterSchema,
  },
  responses: {
    200: {
      description: 'Ratings returned successfully.',
      content: { 'application/json': { schema: RatingListResponseSchema } },
    },
    400: {
      description: 'Invalid parameter.',
      content: { 'application/json': { schema: ApiErrorResponseSchema } },
    },
  },
});
