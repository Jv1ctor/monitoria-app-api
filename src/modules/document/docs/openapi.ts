import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z from 'zod';

import { registry } from '@/shared/docs/registry';
import { ApiErrorResponseSchema } from '@/shared/docs/schemas/api-error.schema';

import { DocumentIdParamsDto } from '../dto/params/document-id-params.dto';
import { DocumentKeyParamsDto } from '../dto/params/document-key-params.dto';
import { DocumentClassQueryDto } from '../dto/query/document-class-query.dto';
import { CreateUploadUrlRequestDto } from '../dto/request/create-upload-url-request.dto';
import { UpdateDocumentRequestDto } from '../dto/request/update-document-request.dto';
import { DocumentResponseDto } from '../dto/response/document-response.dto';
import { GetSignedDownloadAndPreviewResponseDto } from '../dto/response/get-download-and-preview-response.dto';
import { GetUploadUrlResponseDto } from '../dto/response/get-upload-url-response.dto';

extendZodWithOpenApi(z);

const CreateUploadUrlRequestSchema = registry.register(
  'CreateUploadUrlRequestDto',
  CreateUploadUrlRequestDto,
);

const UpdateDocumentRequestSchema = registry.register(
  'UpdateDocumentRequestDto',
  UpdateDocumentRequestDto,
);

const GetUploadUrlResponseSchema = registry.register(
  'GetUploadUrlResponseDto',
  GetUploadUrlResponseDto,
);

const GetSignedDownloadAndPreviewResponseSchema = registry.register(
  'GetSignedDownloadAndPreviewResponseDto',
  GetSignedDownloadAndPreviewResponseDto,
);

const DocumentResponseSchema = registry.register(
  'DocumentResponseDto',
  DocumentResponseDto,
);

const DocumentListResponseSchema = registry.register(
  'DocumentListResponseDto',
  z.array(DocumentResponseSchema),
);

const DocumentIdParamsSchema = registry.register(
  'DocumentIdParamsDto',
  DocumentIdParamsDto,
);

const DocumentClassQuerySchema = registry.register(
  'DocumentClassQueryDto',
  DocumentClassQueryDto,
);

const DocumentKeyParamsSchema = registry.register(
  'DocumentKeyParamsDto',
  DocumentKeyParamsDto,
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
      content: { 'application/json': { schema: ApiErrorResponseSchema } },
    },
  },
});

registry.registerPath({
  method: 'get',
  path: '/document',
  tags: ['Document'],
  summary: 'List documents by class',
  description: 'Returns all documents of a given class.',
  security: [{ bearerAuth: [] }],
  request: {
    query: DocumentClassQuerySchema,
  },
  responses: {
    200: {
      description: 'Documents returned successfully.',
      content: { 'application/json': { schema: DocumentListResponseSchema } },
    },
    400: {
      description: 'Invalid query parameter.',
      content: { 'application/json': { schema: ApiErrorResponseSchema } },
    },
  },
});

registry.registerPath({
  method: 'get',
  path: '/document/by-key/{key}/download-and-preview',
  tags: ['Document'],
  summary: 'Get signed download and preview urls',
  description:
    'Returns signed URLs for downloading and previewing a document by its storage key.',
  security: [{ bearerAuth: [] }],
  request: {
    params: DocumentKeyParamsSchema,
  },
  responses: {
    200: {
      description: 'Signed URLs generated successfully.',
      content: {
        'application/json': {
          schema: GetSignedDownloadAndPreviewResponseSchema,
        },
      },
    },
    400: {
      description: 'Invalid parameter.',
      content: { 'application/json': { schema: ApiErrorResponseSchema } },
    },
    404: {
      description: 'Document not found.',
      content: { 'application/json': { schema: ApiErrorResponseSchema } },
    },
  },
});

registry.registerPath({
  method: 'get',
  path: '/document/{id}',
  tags: ['Document'],
  summary: 'Find document by id',
  description: 'Returns a single document by id.',
  security: [{ bearerAuth: [] }],
  request: {
    params: DocumentIdParamsSchema,
  },
  responses: {
    200: {
      description: 'Document returned successfully.',
      content: { 'application/json': { schema: DocumentResponseSchema } },
    },
    400: {
      description: 'Invalid parameter.',
      content: { 'application/json': { schema: ApiErrorResponseSchema } },
    },
    404: {
      description: 'Document not found.',
      content: { 'application/json': { schema: ApiErrorResponseSchema } },
    },
  },
});

registry.registerPath({
  method: 'delete',
  path: '/document/{id}',
  tags: ['Document'],
  summary: 'Delete document',
  description: 'Deletes a document by id and removes the object from storage.',
  security: [{ bearerAuth: [] }],
  request: {
    params: DocumentIdParamsSchema,
  },
  responses: {
    200: {
      description: 'Document deleted successfully.',
      content: { 'application/json': { schema: DocumentResponseSchema } },
    },
    400: {
      description: 'Invalid parameter.',
      content: { 'application/json': { schema: ApiErrorResponseSchema } },
    },
    404: {
      description: 'Document not found.',
      content: { 'application/json': { schema: ApiErrorResponseSchema } },
    },
  },
});

registry.registerPath({
  method: 'patch',
  path: '/document/{id}',
  tags: ['Document'],
  summary: 'Update document description',
  description: 'Updates the description of a document by id.',
  security: [{ bearerAuth: [] }],
  request: {
    params: DocumentIdParamsSchema,
    body: {
      content: {
        'application/json': {
          schema: UpdateDocumentRequestSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Document updated successfully.',
      content: { 'application/json': { schema: DocumentResponseSchema } },
    },
    400: {
      description: 'Invalid payload or parameter.',
      content: { 'application/json': { schema: ApiErrorResponseSchema } },
    },
    404: {
      description: 'Document not found.',
      content: { 'application/json': { schema: ApiErrorResponseSchema } },
    },
  },
});
