import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z from 'zod';

import { registry } from '@/shared/docs/registry';
import { ApiErrorResponseSchema } from '@/shared/docs/schemas/api-error.schema';

import { FrequencysIdParamsDto } from '../dto/params/frequencys-id-params.dto';
import { FrequencysClassQueryDto } from '../dto/query/frequencys-class-query.dto';
import { FrequencysLessonQueryDto } from '../dto/query/frequencys-lesson-query.dto';
import { FrequencysStudentQueryDto } from '../dto/query/frequencys-student-query.dto';
import { UpdateFrequencysValueRequestDto } from '../dto/request/update-frequencys-value-request.dto';
import { FrequencysResponseDto } from '../dto/response/frequencys-response.dto';

extendZodWithOpenApi(z);

const FrequencysResponseSchema = registry.register(
  'FrequencysResponseDto',
  FrequencysResponseDto,
);

const FrequencysListResponseSchema = registry.register(
  'FrequencysListResponseDto',
  z.array(FrequencysResponseSchema),
);

const FrequencysIdParamsSchema = registry.register(
  'FrequencysIdParamsDto',
  FrequencysIdParamsDto,
);

const FrequencysLessonQuerySchema = registry.register(
  'FrequencysLessonQueryDto',
  FrequencysLessonQueryDto,
);

const FrequencysClassQuerySchema = registry.register(
  'FrequencysClassQueryDto',
  FrequencysClassQueryDto,
);

const FrequencysStudentQuerySchema = registry.register(
  'FrequencysStudentQueryDto',
  FrequencysStudentQueryDto,
);

const UpdateFrequencysValueRequestSchema = registry.register(
  'UpdateFrequencysValueRequestDto',
  UpdateFrequencysValueRequestDto,
);

registry.registerPath({
  method: 'get',
  path: '/frequencys/{id}',
  tags: ['Frequencys'],
  summary: 'Find frequencys by id',
  description: 'Returns a single frequencys by id.',
  security: [{ bearerAuth: [] }],
  request: { params: FrequencysIdParamsSchema },
  responses: {
    200: {
      description: 'Frequencys returned successfully.',
      content: { 'application/json': { schema: FrequencysResponseSchema } },
    },
    400: {
      description: 'Invalid parameter.',
      content: { 'application/json': { schema: ApiErrorResponseSchema } },
    },
    403: {
      description: 'Insufficient permissions.',
      content: { 'application/json': { schema: ApiErrorResponseSchema } },
    },
    404: {
      description: 'Frequencys not found.',
      content: { 'application/json': { schema: ApiErrorResponseSchema } },
    },
  },
});

registry.registerPath({
  method: 'get',
  path: '/frequencys/by-lesson',
  tags: ['Frequencys'],
  summary: 'List frequencys by lesson',
  description:
    'Returns all frequencys for a given lesson. STUDENT sees only their own.',
  security: [{ bearerAuth: [] }],
  request: { query: FrequencysLessonQuerySchema },
  responses: {
    200: {
      description: 'Frequencys returned successfully.',
      content: {
        'application/json': { schema: FrequencysListResponseSchema },
      },
    },
    400: {
      description: 'Invalid parameter.',
      content: { 'application/json': { schema: ApiErrorResponseSchema } },
    },
    403: {
      description: 'Insufficient permissions.',
      content: { 'application/json': { schema: ApiErrorResponseSchema } },
    },
    404: {
      description: 'Lesson not found.',
      content: { 'application/json': { schema: ApiErrorResponseSchema } },
    },
  },
});

registry.registerPath({
  method: 'get',
  path: '/frequencys/by-class',
  tags: ['Frequencys'],
  summary: 'List frequencys by class',
  description:
    'Returns all frequencys of lessons belonging to a class. STUDENT sees only their own.',
  security: [{ bearerAuth: [] }],
  request: { query: FrequencysClassQuerySchema },
  responses: {
    200: {
      description: 'Frequencys returned successfully.',
      content: {
        'application/json': { schema: FrequencysListResponseSchema },
      },
    },
    400: {
      description: 'Invalid parameter.',
      content: { 'application/json': { schema: ApiErrorResponseSchema } },
    },
    403: {
      description: 'Insufficient permissions.',
      content: { 'application/json': { schema: ApiErrorResponseSchema } },
    },
    404: {
      description: 'Class not found.',
      content: { 'application/json': { schema: ApiErrorResponseSchema } },
    },
  },
});

registry.registerPath({
  method: 'get',
  path: '/frequencys/by-student',
  tags: ['Frequencys'],
  summary: 'List frequencys by student',
  description:
    'Returns all frequencys of a given student. MONITOR only sees frequencys from classes they monitor.',
  security: [{ bearerAuth: [] }],
  request: { query: FrequencysStudentQuerySchema },
  responses: {
    200: {
      description: 'Frequencys returned successfully.',
      content: {
        'application/json': { schema: FrequencysListResponseSchema },
      },
    },
    400: {
      description: 'Invalid parameter.',
      content: { 'application/json': { schema: ApiErrorResponseSchema } },
    },
    403: {
      description: 'Insufficient permissions.',
      content: { 'application/json': { schema: ApiErrorResponseSchema } },
    },
    404: {
      description: 'Student not found.',
      content: { 'application/json': { schema: ApiErrorResponseSchema } },
    },
  },
});

registry.registerPath({
  method: 'patch',
  path: '/frequencys/{id}',
  tags: ['Frequencys'],
  summary: 'Update frequencys value',
  description:
    'Updates the presence value and marks the frequencys as FINISHED.',
  security: [{ bearerAuth: [] }],
  request: {
    params: FrequencysIdParamsSchema,
    body: {
      content: {
        'application/json': { schema: UpdateFrequencysValueRequestSchema },
      },
    },
  },
  responses: {
    200: {
      description: 'Frequencys updated successfully.',
      content: { 'application/json': { schema: FrequencysResponseSchema } },
    },
    400: {
      description: 'Invalid payload or parameter.',
      content: { 'application/json': { schema: ApiErrorResponseSchema } },
    },
    403: {
      description: 'Insufficient permissions.',
      content: { 'application/json': { schema: ApiErrorResponseSchema } },
    },
    404: {
      description: 'Frequencys not found.',
      content: { 'application/json': { schema: ApiErrorResponseSchema } },
    },
  },
});

registry.registerPath({
  method: 'delete',
  path: '/frequencys/{id}',
  tags: ['Frequencys'],
  summary: 'Delete frequencys',
  security: [{ bearerAuth: [] }],
  request: { params: FrequencysIdParamsSchema },
  responses: {
    200: {
      description: 'Frequencys deleted successfully.',
      content: { 'application/json': { schema: FrequencysResponseSchema } },
    },
    400: {
      description: 'Invalid parameter.',
      content: { 'application/json': { schema: ApiErrorResponseSchema } },
    },
    403: {
      description: 'Insufficient permissions.',
      content: { 'application/json': { schema: ApiErrorResponseSchema } },
    },
    404: {
      description: 'Frequencys not found.',
      content: { 'application/json': { schema: ApiErrorResponseSchema } },
    },
  },
});
