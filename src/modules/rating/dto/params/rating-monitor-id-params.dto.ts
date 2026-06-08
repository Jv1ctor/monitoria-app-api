import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z from 'zod';

extendZodWithOpenApi(z);

export const RatingMonitorIdParamsDto = z
  .object({
    monitor_id: z.coerce.number().int().positive().openapi({ example: 2 }),
  })
  .openapi('RatingMonitorIdParamsDto');

export type RatingMonitorIdParamsDto = z.infer<typeof RatingMonitorIdParamsDto>;
