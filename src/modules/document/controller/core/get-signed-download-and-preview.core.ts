import type { Request, Response } from 'express';

import { BadRequestError } from '@/shared/handle-error/errors/bad-request.error';

import { DocumentKeyParamsDto } from '../../dto/params/document-key-params.dto';
import type { DocumentServicePort } from '../../interface/document-service.port';

export const getSignedDownloadAndPreview =
  (deps: { documentService: DocumentServicePort }) =>
  async (request: Request, response: Response) => {
    const { documentService } = deps;

    const { success, data, error } = await DocumentKeyParamsDto.safeParseAsync(
      request.params,
    );

    if (!success) {
      throw new BadRequestError({ message: 'erro de validacao', error });
    }

    const result = await documentService.getSignedDownloadAndPreview(data.key);

    response.status(200).json(result);
  };
