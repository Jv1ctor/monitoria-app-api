import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z from 'zod';

import { registry } from '@/shared/docs/registry';
import { ApiErrorResponseSchema } from '@/shared/docs/schemas/api-error.schema';

import { CreateSubjectDto } from '../dto/create-subject.dto';
import { SubjectCodeQueryDto } from '../dto/subject-code-query.dto';
import { SubjectIdParameterDto } from '../dto/subject-id-params.dto';
import { SubjectResponseDto } from '../dto/subject-response.dto';
import { UpdateSubjectDto } from '../dto/update-subject.dto';

extendZodWithOpenApi(z);

const CreateSubjectRequestSchema = registry.register(
  'CreateSubjectRequestDto',
  CreateSubjectDto,
);

const UpdateSubjectRequestSchema = registry.register(
  'UpdateSubjectRequestDto',
  UpdateSubjectDto,
);

const SubjectIdParameterSchema = registry.register(
  'SubjectIdParamDto',
  SubjectIdParameterDto,
);

const SubjectCodeQuerySchema = registry.register(
  'SubjectCodeQueryDto',
  SubjectCodeQueryDto,
);

const SubjectResponseSchema = registry.register(
  'SubjectResponseDto',
  SubjectResponseDto,
);

const SubjectListResponseSchema = registry.register(
  'SubjectListResponseDto',
  z.array(SubjectResponseSchema),
);

registry.registerPath({
  method: 'post',
  path: '/subject',
  tags: ['Subject'],
  summary: 'Create subject',
  description: 'Creates a new subject.',
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        'application/json': {
          schema: CreateSubjectRequestSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Subject created successfully.',
      content: { 'application/json': { schema: SubjectResponseSchema } },
    },
    400: {
      description: 'Invalid payload.',
      content: { 'application/json': { schema: ApiErrorResponseSchema } },
    },
    409: {
      description: 'Subject code already exists.',
      content: { 'application/json': { schema: ApiErrorResponseSchema } },
    },
  },
});

registry.registerPath({
  method: 'get',
  path: '/subject',
  tags: ['Subject'],
  summary: 'List subjects',
  description: 'Returns all subjects.',
  security: [{ bearerAuth: [] }],
  responses: {
    200: {
      description: 'Subjects returned successfully.',
      content: { 'application/json': { schema: SubjectListResponseSchema } },
    },
  },
});

registry.registerPath({
  method: 'get',
  path: '/subject/by-code',
  tags: ['Subject'],
  summary: 'Find subject by code',
  description: 'Returns a single subject by its code.',
  security: [{ bearerAuth: [] }],
  request: {
    query: SubjectCodeQuerySchema,
  },
  responses: {
    200: {
      description: 'Subject returned successfully.',
      content: { 'application/json': { schema: SubjectResponseSchema } },
    },
    400: {
      description: 'Invalid parameter.',
      content: { 'application/json': { schema: ApiErrorResponseSchema } },
    },
    404: {
      description: 'Subject not found.',
      content: { 'application/json': { schema: ApiErrorResponseSchema } },
    },
  },
});

registry.registerPath({
  method: 'get',
  path: '/subject/{id}',
  tags: ['Subject'],
  summary: 'Find subject by id',
  description: 'Returns a single subject by id.',
  security: [{ bearerAuth: [] }],
  request: {
    params: SubjectIdParameterSchema,
  },
  responses: {
    200: {
      description: 'Subject returned successfully.',
      content: { 'application/json': { schema: SubjectResponseSchema } },
    },
    400: {
      description: 'Invalid parameter.',
      content: { 'application/json': { schema: ApiErrorResponseSchema } },
    },
    404: {
      description: 'Subject not found.',
      content: { 'application/json': { schema: ApiErrorResponseSchema } },
    },
  },
});

registry.registerPath({
  method: 'put',
  path: '/subject/{id}',
  tags: ['Subject'],
  summary: 'Update subject',
  description: 'Updates a subject by id.',
  security: [{ bearerAuth: [] }],
  request: {
    params: SubjectIdParameterSchema,
    body: {
      content: {
        'application/json': {
          schema: UpdateSubjectRequestSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Subject updated successfully.',
      content: { 'application/json': { schema: SubjectResponseSchema } },
    },
    400: {
      description: 'Invalid payload or parameter.',
      content: { 'application/json': { schema: ApiErrorResponseSchema } },
    },
    404: {
      description: 'Subject not found.',
      content: { 'application/json': { schema: ApiErrorResponseSchema } },
    },
  },
});

registry.registerPath({
  method: 'delete',
  path: '/subject/{id}',
  tags: ['Subject'],
  summary: 'Delete subject',
  description: 'Deletes a subject by id.',
  security: [{ bearerAuth: [] }],
  request: {
    params: SubjectIdParameterSchema,
  },
  responses: {
    200: {
      description: 'Subject deleted successfully.',
      content: { 'application/json': { schema: SubjectResponseSchema } },
    },
    400: {
      description: 'Invalid parameter.',
      content: { 'application/json': { schema: ApiErrorResponseSchema } },
    },
    404: {
      description: 'Subject not found.',
      content: { 'application/json': { schema: ApiErrorResponseSchema } },
    },
    409: {
      description: 'Subject is in use by a class.',
      content: { 'application/json': { schema: ApiErrorResponseSchema } },
    },
  },
});
