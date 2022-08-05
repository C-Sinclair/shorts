import { z } from "zod";

export const uploadSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1).max(32),
  description: z.string().min(1).max(256),
  path: z.string().min(3),
  playbackId: z.string(),
});
