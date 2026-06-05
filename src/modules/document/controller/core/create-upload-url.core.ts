import type { Request, Response } from 'express';

import { BadRequestError } from '@/shared/handle-error/errors/bad-request.error';

import { CreateUploadUrlRequestDto } from '../../dto/request/create-upload-url-request.dto';
import type { DocumentServicePort } from '../../interface/document-service.port';

export const createUploadUrl =
  (deps: { documentService: DocumentServicePort }) =>
  async (request: Request, response: Response) => {
    const { documentService } = deps;
    const body = request.body;

    const { success, data, error } =
      await CreateUploadUrlRequestDto.safeParseAsync(body);

    if (!success) {
      throw new BadRequestError({ message: 'validation error', error });
    }

    const result = await documentService.getSignedUpload(data);

    response.status(200).json(result);
  };
