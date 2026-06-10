import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z from 'zod';

extendZodWithOpenApi(z);

export const RatingResponseDto = z
  .object({
    id: z.number().int().positive().openapi({ example: 1 }),
    rate: z.number().int().min(1).max(5).openapi({ example: 5 }),
    monitor_id: z.number().int().positive().openapi({ example: 2 }),
    createdAt: z
      .string()
      .datetime()
      .openapi({ example: '2026-06-07T03:20:00.000Z' }),
  })
  .openapi('RatingResponseDto');

export type RatingResponseDto = z.infer<typeof RatingResponseDto>;
