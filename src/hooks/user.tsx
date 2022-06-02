import { User } from "@authorizerdev/authorizer-js";
import { trpc } from "~/utils/trpc";

type UseUser =
  | {
    isLoggedIn: false;
    user: null;
    refetch: () => void;
  }
  | {
    /**
     * The currently logged in user
     */
    user: User;
    isLoggedIn: true;
    refetch: () => void;
  };

export function useUser(): UseUser {
  const { data, refetch } = trpc.useQuery(["user.current"], { ssr: false });
  if (data) {
    return {
      isLoggedIn: true,
      user: data,
      refetch,
    };
  }
  return {
    isLoggedIn: false,
    user: null,
    refetch,
  };
}
