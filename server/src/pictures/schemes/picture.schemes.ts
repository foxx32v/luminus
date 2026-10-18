import { z } from 'zod';

export const createPictureSchema = z.object({
  title: z.string().optional(),
  content: z.array(z.number().int().min(0).max(16777215)).length(256),
});

export type CreatePictureDto = z.infer<typeof createPictureSchema>;