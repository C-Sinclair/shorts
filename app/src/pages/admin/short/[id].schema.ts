import { z } from "zod";

export const editShortSchema = z.object({
  title: z.string().min(1).max(32).optional(),
  description: z.string().min(1).max(256).optional(),
  path: z.string().min(3),
  playbackId: z.string(),
  thumbnailTime: z.string().optional(),
  previewGifStartTime: z.string().optional(),
});
