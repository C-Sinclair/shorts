import { createResource, createSignal } from "solid-js";
import { trpc } from "~/utils/trpc";

export type Short = {
  id: string;
  title: string;
  description: string;
  playbackId: string;
  path: string;
  thumbnailTime?: number | null;
};

/**
 * @resource for accessing all shorts
 */
export const allShorts = createResource(() => trpc.short.all.query());

export const focusedShortSignal = createSignal<Short | null>(null);
