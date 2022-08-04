import { createResource } from "solid-js";
import { trpc } from "~/utils/trpc";

/**
 * @resource for accessing the currently logged in user
 */
export const currentUser = createResource(() => trpc.user.current.query());

/** */
export const isAdmin = () => {
  const [data] = currentUser;
  const isAdmin = data()?.roles?.includes("admin");
  return Boolean(isAdmin);
};
