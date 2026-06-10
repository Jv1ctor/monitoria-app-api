import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z from 'zod';

import { registry } from '@/shared/docs/registry';
import { ApiErrorResponseSchema } from '@/shared/docs/schemas/api-error.schema';

import { ClassCodeQueryDto } from '../dto/class-code-query.dto';
import { ClassIdParameterDto } from '../dto/class-id-params.dto';
import { ClassResponseDto } from '../dto/class-response.dto';
import { CreateClassDto } from '../dto/create-class.dto';
import { AssignMonitorRequestDto } from '../dto/request/assign-monitor-request.dto';
import { AssignMonitorResponseDto } from '../dto/response/assign-monitor-response.dto';
import { UpdateClassDto } from '../dto/update-class.dto';

extendZodWithOpenApi(z);

const CreateClassRequestSchema = registry.register(
  'CreateClassRequestDto',
  CreateClassDto,
);

const UpdateClassRequestSchema = registry.register(
  'UpdateClassRequestDto',
  UpdateClassDto,
);

const ClassIdParameterSchema = registry.register(
  'ClassIdParamDto',
  ClassIdParameterDto,
);

const ClassCodeQuerySchema = registry.register(
  'ClassCodeQueryDto',
  ClassCodeQueryDto,
);

const ClassResponseSchema = registry.register(
  'ClassResponseDto',
  ClassResponseDto,
);

const ClassListResponseSchema = registry.register(
  'ClassListResponseDto',
  z.array(ClassResponseSchema),
);

const AssignMonitorRequestSchema = registry.register(
  'AssignMonitorRequestDto',
  AssignMonitorRequestDto,
);

const AssignMonitorResponseSchema = registry.register(
  'AssignMonitorResponseDto',
  AssignMonitorResponseDto,
);

registry.registerPath({
  method: 'post',
  path: '/class',
  tags: ['Class'],
  summary: 'Create class',
  description: 'Creates a new class.',
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        'application/json': {
          schema: CreateClassRequestSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Class created successfully.',
      content: { 'application/json': { schema: ClassResponseSchema } },
    },
    400: {
      description: 'Invalid payload.',
      content: { 'application/json': { schema: ApiErrorResponseSchema } },
    },
    409: {
      description: 'Class code already exists.',
      content: { 'application/json': { schema: ApiErrorResponseSchema } },
    },
  },
});

registry.registerPath({
  method: 'get',
  path: '/class',
  tags: ['Class'],
  summary: 'List classes',
  description: 'Returns all classes.',
  security: [{ bearerAuth: [] }],
  responses: {
    200: {
      description: 'Classes returned successfully.',
      content: { 'application/json': { schema: ClassListResponseSchema } },
    },
  },
});

registry.registerPath({
  method: 'get',
  path: '/class/by-code',
  tags: ['Class'],
  summary: 'Find class by code',
  description: 'Returns a single class by its code.',
  security: [{ bearerAuth: [] }],
  request: {
    query: ClassCodeQuerySchema,
  },
  responses: {
    200: {
      description: 'Class returned successfully.',
      content: { 'application/json': { schema: ClassResponseSchema } },
    },
    400: {
      description: 'Invalid parameter.',
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
  path: '/class/{id}',
  tags: ['Class'],
  summary: 'Find class by id',
  description: 'Returns a single class by id.',
  security: [{ bearerAuth: [] }],
  request: {
    params: ClassIdParameterSchema,
  },
  responses: {
    200: {
      description: 'Class returned successfully.',
      content: { 'application/json': { schema: ClassResponseSchema } },
    },
    400: {
      description: 'Invalid parameter.',
      content: { 'application/json': { schema: ApiErrorResponseSchema } },
    },
    404: {
      description: 'Class not found.',
      content: { 'application/json': { schema: ApiErrorResponseSchema } },
    },
  },
});

registry.registerPath({
  method: 'put',
  path: '/class/{id}',
  tags: ['Class'],
  summary: 'Update class',
  description: 'Updates a class by id.',
  security: [{ bearerAuth: [] }],
  request: {
    params: ClassIdParameterSchema,
    body: {
      content: {
        'application/json': {
          schema: UpdateClassRequestSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Class updated successfully.',
      content: { 'application/json': { schema: ClassResponseSchema } },
    },
    400: {
      description: 'Invalid payload or parameter.',
      content: { 'application/json': { schema: ApiErrorResponseSchema } },
    },
    404: {
      description: 'Class not found.',
      content: { 'application/json': { schema: ApiErrorResponseSchema } },
    },
  },
});

registry.registerPath({
  method: 'delete',
  path: '/class/{id}',
  tags: ['Class'],
  summary: 'Delete class',
  description: 'Deletes a class by id.',
  security: [{ bearerAuth: [] }],
  request: {
    params: ClassIdParameterSchema,
  },
  responses: {
    200: {
      description: 'Class deleted successfully.',
      content: { 'application/json': { schema: ClassResponseSchema } },
    },
    400: {
      description: 'Invalid parameter.',
      content: { 'application/json': { schema: ApiErrorResponseSchema } },
    },
    404: {
      description: 'Class not found.',
      content: { 'application/json': { schema: ApiErrorResponseSchema } },
    },
    409: {
      description: 'Class is in use by a lesson.',
      content: { 'application/json': { schema: ApiErrorResponseSchema } },
    },
  },
});

registry.registerPath({
  method: 'put',
  path: '/class/{id}/monitor',
  tags: ['Class'],
  summary: 'Assign monitor to class',
  description: 'Vincula um monitor a uma turma (somente ADMIN).',
  security: [{ bearerAuth: [] }],
  request: {
    params: ClassIdParameterSchema,
    body: {
      content: {
        'application/json': {
          schema: AssignMonitorRequestSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Monitor assigned successfully.',
      content: { 'application/json': { schema: AssignMonitorResponseSchema } },
    },
    400: {
      description: 'Invalid payload or parameter.',
      content: { 'application/json': { schema: ApiErrorResponseSchema } },
    },
    404: {
      description: 'Class or monitor not found.',
      content: { 'application/json': { schema: ApiErrorResponseSchema } },
    },
  },
});
