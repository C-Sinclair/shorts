import { children, Component, Show, Suspense } from "solid-js";
import { isAdmin } from "~/hooks/user";

/**
 * Higher order component
 * Only allow users with admin role to access the children
 * Redirects to home page if not admin
 */
export const AdminOnly: Component = (props) => {
  const c = children(() => props.children);
  return (
    <Suspense fallback={<div>Loading permissions...</div>}>
      <Show when={isAdmin} fallback={<div>Missing permissions!</div>}>
        {c()}
      </Show>
    </Suspense>
  );
};
