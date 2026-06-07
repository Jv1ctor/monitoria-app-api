import type { Request, Response } from 'express';

import { BadRequestError } from '@/shared/handle-error/errors/bad-request.error';

import { DocumentIdParamsDto } from '../../dto/params/document-id-params.dto';
import type { DocumentServicePort } from '../../interface/document-service.port';

export const remove =
  (deps: { documentService: DocumentServicePort }) =>
  async (request: Request, response: Response) => {
    const { documentService } = deps;

    const { success, data, error } = await DocumentIdParamsDto.safeParseAsync(
      request.params,
    );

    if (!success) {
      throw new BadRequestError({ message: 'erro de validacao', error });
    }

    const result = await documentService.remove(data.id);

    response.status(200).json(result);
  };
