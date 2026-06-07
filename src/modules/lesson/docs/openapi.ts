import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z from 'zod';

import { registry } from '@/shared/docs/registry';
import { ApiErrorResponseSchema } from '@/shared/docs/schemas/api-error.schema';

import { CreateLessonDto } from '../dto/create-lesson.dto';
import { EnrollLessonRequestDto } from '../dto/enroll-lesson-request.dto';
import { LessonClassQueryDto } from '../dto/lesson-class-query.dto';
import { LessonIdParameterDto } from '../dto/lesson-id-params.dto';
import { LessonResponseDto } from '../dto/lesson-response.dto';
import { UpdateLessonDto } from '../dto/update-lesson.dto';

extendZodWithOpenApi(z);

const CreateLessonRequestSchema = registry.register(
  'CreateLessonRequestDto',
  CreateLessonDto,
);

const UpdateLessonRequestSchema = registry.register(
  'UpdateLessonRequestDto',
  UpdateLessonDto,
);

const LessonIdParameterSchema = registry.register(
  'LessonIdParamDto',
  LessonIdParameterDto,
);

const LessonClassQuerySchema = registry.register(
  'LessonClassQueryDto',
  LessonClassQueryDto,
);

const LessonResponseSchema = registry.register(
  'LessonResponseDto',
  LessonResponseDto,
);

const LessonListResponseSchema = registry.register(
  'LessonListResponseDto',
  z.array(LessonResponseSchema),
);

const EnrollLessonRequestSchema = registry.register(
  'EnrollLessonRequestDto',
  EnrollLessonRequestDto,
);

registry.registerPath({
  method: 'post',
  path: '/lesson',
  tags: ['Lesson'],
  summary: 'Create lesson',
  description: 'Creates a new lesson.',
  security: [
    {
      bearerAuth: [],
    },
  ],
  request: {
    body: {
      content: {
        'application/json': {
          schema: CreateLessonRequestSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Lesson created successfully.',
      content: {
        'application/json': {
          schema: LessonResponseSchema,
        },
      },
    },
    400: {
      description: 'Invalid payload.',
      content: {
        'application/json': {
          schema: ApiErrorResponseSchema,
        },
      },
    },
  },
});

registry.registerPath({
  method: 'get',
  path: '/lesson',
  tags: ['Lesson'],
  summary: 'List lessons',
  description: 'Returns all lessons.',
  security: [
    {
      bearerAuth: [],
    },
  ],
  responses: {
    200: {
      description: 'Lessons returned successfully.',
      content: {
        'application/json': {
          schema: LessonListResponseSchema,
        },
      },
    },
  },
});

registry.registerPath({
  method: 'get',
  path: '/lesson/by-class',
  tags: ['Lesson'],
  summary: 'Find lessons by class',
  description: 'Returns all lessons for a given class.',
  security: [
    {
      bearerAuth: [],
    },
  ],
  request: {
    query: LessonClassQuerySchema,
  },
  responses: {
    200: {
      description: 'Lessons returned successfully.',
      content: {
        'application/json': {
          schema: LessonListResponseSchema,
        },
      },
    },
    400: {
      description: 'Invalid parameter.',
      content: {
        'application/json': {
          schema: ApiErrorResponseSchema,
        },
      },
    },
  },
});

registry.registerPath({
  method: 'get',
  path: '/lesson/{id}',
  tags: ['Lesson'],
  summary: 'Find lesson by id',
  description: 'Returns a single lesson by id.',
  security: [
    {
      bearerAuth: [],
    },
  ],
  request: {
    params: LessonIdParameterSchema,
  },
  responses: {
    200: {
      description: 'Lesson returned successfully.',
      content: {
        'application/json': {
          schema: LessonResponseSchema,
        },
      },
    },
    400: {
      description: 'Invalid parameter.',
      content: {
        'application/json': {
          schema: ApiErrorResponseSchema,
        },
      },
    },
    404: {
      description: 'Lesson not found.',
      content: {
        'application/json': {
          schema: ApiErrorResponseSchema,
        },
      },
    },
  },
});

registry.registerPath({
  method: 'put',
  path: '/lesson/{id}',
  tags: ['Lesson'],
  summary: 'Update lesson',
  description: 'Updates a lesson by id.',
  security: [
    {
      bearerAuth: [],
    },
  ],
  request: {
    params: LessonIdParameterSchema,
    body: {
      content: {
        'application/json': {
          schema: UpdateLessonRequestSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Lesson updated successfully.',
      content: {
        'application/json': {
          schema: LessonResponseSchema,
        },
      },
    },
    400: {
      description: 'Invalid payload or parameter.',
      content: {
        'application/json': {
          schema: ApiErrorResponseSchema,
        },
      },
    },
    404: {
      description: 'Lesson not found.',
      content: {
        'application/json': {
          schema: ApiErrorResponseSchema,
        },
      },
    },
  },
});

registry.registerPath({
  method: 'delete',
  path: '/lesson/{id}',
  tags: ['Lesson'],
  summary: 'Delete lesson',
  description: 'Deletes a lesson by id.',
  security: [
    {
      bearerAuth: [],
    },
  ],
  request: {
    params: LessonIdParameterSchema,
  },
  responses: {
    200: {
      description: 'Lesson deleted successfully.',
      content: {
        'application/json': {
          schema: LessonResponseSchema,
        },
      },
    },
    400: {
      description: 'Invalid parameter.',
      content: {
        'application/json': {
          schema: ApiErrorResponseSchema,
        },
      },
    },
    404: {
      description: 'Lesson not found.',
      content: {
        'application/json': {
          schema: ApiErrorResponseSchema,
        },
      },
    },
  },
});

registry.registerPath({
  method: 'post',
  path: '/lesson/{id}/enroll',
  tags: ['Lesson'],
  summary: 'Enroll student in lesson',
  description:
    'Enrolls a student in a lesson, creating a LessonUser and a PENDING Frequencys. STUDENT can only enroll themselves. MONITOR/ADMIN can enroll any student.',
  security: [{ bearerAuth: [] }],
  request: {
    params: LessonIdParameterSchema,
    body: {
      content: {
        'application/json': { schema: EnrollLessonRequestSchema },
      },
    },
  },
  responses: {
    201: {
      description: 'Student enrolled successfully.',
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
      description: 'Lesson or student not found.',
      content: { 'application/json': { schema: ApiErrorResponseSchema } },
    },
    409: {
      description: 'Student already enrolled.',
      content: { 'application/json': { schema: ApiErrorResponseSchema } },
    },
  },
});

registry.registerPath({
  method: 'delete',
  path: '/lesson/{id}/enroll',
  tags: ['Lesson'],
  summary: 'Unenroll student from lesson',
  description:
    'Removes the LessonUser, keeping the Frequencys as historical record (unbound_at stays null).',
  security: [{ bearerAuth: [] }],
  request: {
    params: LessonIdParameterSchema,
    body: {
      content: {
        'application/json': { schema: EnrollLessonRequestSchema },
      },
    },
  },
  responses: {
    200: {
      description: 'Student unenrolled successfully.',
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
      description: 'Lesson or enrollment not found.',
      content: { 'application/json': { schema: ApiErrorResponseSchema } },
    },
  },
});
