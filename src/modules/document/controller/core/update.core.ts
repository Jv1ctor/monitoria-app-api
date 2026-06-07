import type { Request, Response } from 'express';

import { BadRequestError } from '@/shared/handle-error/errors/bad-request.error';

import { DocumentIdParamsDto } from '../../dto/params/document-id-params.dto';
import { UpdateDocumentRequestDto } from '../../dto/request/update-document-request.dto';
import type { DocumentServicePort } from '../../interface/document-service.port';

export const update =
  (deps: { documentService: DocumentServicePort }) =>
  async (request: Request, response: Response) => {
    const { documentService } = deps;

    const parsedParams = await DocumentIdParamsDto.safeParseAsync(
      request.params,
    );

    if (!parsedParams.success) {
      throw new BadRequestError({
        message: 'erro de validacao',
        error: parsedParams.error,
      });
    }

    const parsedBody = await UpdateDocumentRequestDto.safeParseAsync(
      request.body,
    );

    if (!parsedBody.success) {
      throw new BadRequestError({
        message: 'erro de validacao',
        error: parsedBody.error,
      });
    }

    const result = await documentService.update(
      parsedParams.data.id,
      parsedBody.data,
    );

    response.status(200).json(result);
  };
