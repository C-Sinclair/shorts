import { User } from "@authorizerdev/authorizer-js";
import { trpc } from "~/utils/trpc";

type UseUser =
  | {
    isLoggedIn: false;
    user: null;
  }
  | {
    /**
       * The currently logged in user
       */
    user: User;
    isLoggedIn: true;
  };

export function useUser(): UseUser {
  const { data } = trpc.useQuery(["user.current"], { ssr: false });
  if (data) {
    return {
      isLoggedIn: true,
      user: data,
    };
  }
  return {
    isLoggedIn: false,
    user: null,
  };
}
