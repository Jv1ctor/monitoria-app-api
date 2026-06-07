import type { Request, Response } from 'express';

import { BadRequestError } from '@/shared/handle-error/errors/bad-request.error';

import { DocumentClassQueryDto } from '../../dto/query/document-class-query.dto';
import type { DocumentServicePort } from '../../interface/document-service.port';

export const findAllByClass =
  (deps: { documentService: DocumentServicePort }) =>
  async (request: Request, response: Response) => {
    const { documentService } = deps;

    const { success, data, error } = await DocumentClassQueryDto.safeParseAsync(
      request.query,
    );

    if (!success) {
      throw new BadRequestError({ message: 'erro de validacao', error });
    }

    const result = await documentService.findAllByClass(data.class_id);

    response.status(200).json(result);
  };
