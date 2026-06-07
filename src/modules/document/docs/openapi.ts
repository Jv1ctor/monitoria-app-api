import { registry } from '@/shared/docs/registry';
import { ApiErrorResponseSchema } from '@/shared/docs/schemas/api-error.schema';

import { CreateUploadUrlRequestDto } from '../dto/request/create-upload-url-request.dto';
import { GetUploadUrlResponseDto } from '../dto/response/get-upload-url-response.dto';

const CreateUploadUrlRequestSchema = registry.register(
  'CreateUploadUrlRequestDto',
  CreateUploadUrlRequestDto,
);

const GetUploadUrlResponseSchema = registry.register(
  'GetUploadUrlResponseDto',
  GetUploadUrlResponseDto,
);

registry.registerPath({
  method: 'post',
  path: '/document',
  tags: ['Document'],
  summary: 'Create signed upload url',
  description: 'Creates a document record and returns a signed URL for upload.',
  security: [
    {
      bearerAuth: [],
    },
  ],
  request: {
    body: {
      content: {
        'application/json': {
          schema: CreateUploadUrlRequestSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Signed upload URL generated successfully.',
      content: {
        'application/json': {
          schema: GetUploadUrlResponseSchema,
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
