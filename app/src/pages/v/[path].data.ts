import { trpc } from "~/utils/trpc";
import { createResource } from "solid-js";

export function getShortData({ params }) {
  const [short] = createResource(
    () => params.path,
    (path) => trpc.short.byPath.query({ path }),
  );
  return short;
}
