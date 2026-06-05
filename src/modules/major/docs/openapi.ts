import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z from 'zod';

import { registry } from '@/shared/docs/registry';
import { ApiErrorResponseSchema } from '@/shared/docs/schemas/api-error.schema';

import { CreateMajorDto } from '../dto/create-major.dto';
import { MajorIdParameterDto } from '../dto/major-id-params.dto';
import { MajorResponseDto } from '../dto/major-response.dto';
import { UpdateMajorDto } from '../dto/update-major.dto';

extendZodWithOpenApi(z);

const CreateMajorRequestSchema = registry.register(
  'CreateMajorRequestDto',
  CreateMajorDto,
);

const UpdateMajorRequestSchema = registry.register(
  'UpdateMajorRequestDto',
  UpdateMajorDto,
);

const MajorIdParameterSchema = registry.register(
  'MajorIdParamDto',
  MajorIdParameterDto,
);

const MajorResponseSchema = registry.register(
  'MajorResponseDto',
  MajorResponseDto,
);

const MajorListResponseSchema = registry.register(
  'MajorListResponseDto',
  z.array(MajorResponseSchema),
);

registry.registerPath({
  method: 'post',
  path: '/major',
  tags: ['Major'],
  summary: 'Create major',
  description: 'Creates a new major.',
  request: {
    body: {
      content: {
        'application/json': {
          schema: CreateMajorRequestSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Major created successfully.',
      content: {
        'application/json': {
          schema: MajorResponseSchema,
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
  path: '/major',
  tags: ['Major'],
  summary: 'List majors',
  description: 'Returns all majors.',
  responses: {
    200: {
      description: 'Majors returned successfully.',
      content: {
        'application/json': {
          schema: MajorListResponseSchema,
        },
      },
    },
  },
});

registry.registerPath({
  method: 'get',
  path: '/major/{id}',
  tags: ['Major'],
  summary: 'Find major by id',
  description: 'Returns a single major by id.',
  request: {
    params: MajorIdParameterSchema,
  },
  responses: {
    200: {
      description: 'Major returned successfully.',
      content: {
        'application/json': {
          schema: MajorResponseSchema,
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
      description: 'Major not found.',
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
  path: '/major/{id}',
  tags: ['Major'],
  summary: 'Update major',
  description: 'Updates a major by id.',
  request: {
    params: MajorIdParameterSchema,
    body: {
      content: {
        'application/json': {
          schema: UpdateMajorRequestSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Major updated successfully.',
      content: {
        'application/json': {
          schema: MajorResponseSchema,
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
      description: 'Major not found.',
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
  path: '/major/{id}',
  tags: ['Major'],
  summary: 'Delete major',
  description: 'Deletes a major by id.',
  request: {
    params: MajorIdParameterSchema,
  },
  responses: {
    200: {
      description: 'Major deleted successfully.',
      content: {
        'application/json': {
          schema: MajorResponseSchema,
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
      description: 'Major not found.',
      content: {
        'application/json': {
          schema: ApiErrorResponseSchema,
        },
      },
    },
  },
});
