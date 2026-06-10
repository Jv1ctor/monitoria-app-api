import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z from 'zod';

import { registry } from '@/shared/docs/registry';
import { ApiErrorResponseSchema } from '@/shared/docs/schemas/api-error.schema';

import { StudentIdParamsDto } from '../dto/params/student-id-params.dto';
import { PromoteStudentRequestDto } from '../dto/request/promote-student-request.dto';
import { PromoteStudentResponseDto } from '../dto/response/promote-student-response.dto';
import { StudentResponseDto } from '../dto/response/student-response.dto';

extendZodWithOpenApi(z);

const PromoteStudentRequestSchema = registry.register(
  'PromoteStudentRequestDto',
  PromoteStudentRequestDto,
);

const PromoteStudentResponseSchema = registry.register(
  'PromoteStudentResponseDto',
  PromoteStudentResponseDto,
);

const StudentResponseSchema = registry.register(
  'StudentResponseDto',
  StudentResponseDto,
);

const StudentsListResponseSchema = registry.register(
  'StudentsListResponseDto',
  z.array(StudentResponseSchema),
);

const StudentIdParamsSchema = registry.register(
  'StudentIdParamsDto',
  StudentIdParamsDto,
);

registry.registerPath({
  method: 'get',
  path: '/student',
  tags: ['Student'],
  summary: 'List students',
  description: 'Lista todos os alunos (somente ADMIN).',
  security: [{ bearerAuth: [] }],
  responses: {
    200: {
      description: 'Students returned successfully.',
      content: {
        'application/json': { schema: StudentsListResponseSchema },
      },
    },
    401: {
      description: 'Unauthorized.',
      content: { 'application/json': { schema: ApiErrorResponseSchema } },
    },
    403: {
      description: 'Forbidden.',
      content: { 'application/json': { schema: ApiErrorResponseSchema } },
    },
  },
});

registry.registerPath({
  method: 'post',
  path: '/student/{id}/promote',
  tags: ['Student'],
  summary: 'Promote student to monitor',
  description: 'Promove um student a monitor (somente ADMIN).',
  security: [{ bearerAuth: [] }],
  request: {
    params: StudentIdParamsSchema,
    body: {
      content: {
        'application/json': {
          schema: PromoteStudentRequestSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Student promoted successfully.',
      content: {
        'application/json': { schema: PromoteStudentResponseSchema },
      },
    },
    400: {
      description: 'Invalid payload or parameter.',
      content: { 'application/json': { schema: ApiErrorResponseSchema } },
    },
    401: {
      description: 'Unauthorized.',
      content: { 'application/json': { schema: ApiErrorResponseSchema } },
    },
    403: {
      description: 'Forbidden.',
      content: { 'application/json': { schema: ApiErrorResponseSchema } },
    },
    404: {
      description: 'User or subject not found.',
      content: { 'application/json': { schema: ApiErrorResponseSchema } },
    },
    409: {
      description: 'User is not a student, or subject major mismatch.',
      content: { 'application/json': { schema: ApiErrorResponseSchema } },
    },
  },
});
