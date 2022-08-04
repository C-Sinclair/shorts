import { createResource } from "solid-js";
import { trpc } from "~/utils/trpc";

/**
 * @resource for accessing all shorts
 */
export const allShorts = createResource(() => trpc.short.all.query());
