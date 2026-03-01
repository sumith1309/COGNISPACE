import { z } from 'zod';

export const messageSchema = z.object({
  content: z.string().min(1).max(5000),
});

export type MessageInput = z.infer<typeof messageSchema>;
