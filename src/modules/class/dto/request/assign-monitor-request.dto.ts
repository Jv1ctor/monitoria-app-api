import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z from 'zod';

extendZodWithOpenApi(z);

export const AssignMonitorRequestDto = z
  .object({
    monitor_id: z.coerce.number().int().positive().openapi({ example: 2 }),
  })
  .openapi('AssignMonitorRequestDto');

export type AssignMonitorRequestDto = z.infer<typeof AssignMonitorRequestDto>;
