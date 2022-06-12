import { User } from "@authorizerdev/authorizer-js";
import { trpc } from "~/utils/trpc";

type UseUser =
  & {
    isLoading?: boolean;
    error?: Error;
  }
  & (
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
    }
  );

export function useUser(): UseUser {
  const { data, isLoading } = trpc.useQuery(["user.current"], {
    ssr: false,
  });
  if (data) {
    return {
      isLoggedIn: true,
      user: data,
      isLoading,
    };
  }
  return {
    isLoggedIn: false,
    user: null,
  };
}

type UseIsAdmin = {
  isAdmin?: boolean;
  isLoading?: boolean;
};

export function useIsAdmin(): UseIsAdmin {
  const { data, isLoading } = trpc.useQuery(["user.current"], {
    ssr: false,
  });
  const isAdmin = data?.roles?.includes("admin");
  return {
    isAdmin,
    isLoading,
  };
}
