import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z from 'zod';

extendZodWithOpenApi(z);

export const CreateRatingRequestDto = z
  .object({
    monitor_id: z.coerce.number().int().positive().openapi({ example: 2 }),
    rate: z.number().int().min(1).max(5).openapi({ example: 5 }),
  })
  .openapi('CreateRatingRequestDto');

export type CreateRatingRequestDto = z.infer<typeof CreateRatingRequestDto>;
