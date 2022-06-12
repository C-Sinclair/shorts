import { useRouter } from "next/router";
import { useIsAdmin } from "~/hooks";

/**
 * Higher order component
 * Only allow users with admin role to access the children
 * Redirects to home page if not admin
 */
export function AdminOnly({ children }) {
  const router = useRouter();
  const { isAdmin, isLoading } = useIsAdmin();
  if (isLoading) {
    return <div>Loading permissions...</div>;
  }
  if (!isAdmin) {
    console.log("not admin, redirecting");
    router.push("/");
    return <></>;
  }
  return <>{children}</>;
}
