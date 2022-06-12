import Link from "next/link";
import { useRouter } from "next/router";
import { Suspense } from "react";
import { useQueryClient } from "react-query";
import { LOCAL_STORAGE_ACCESS_KEY } from "~/env";
import { useIsAdmin, useUser } from "~/hooks";

export function Header() {
  const { isAdmin } = useIsAdmin();
  return (
    <header className="fixed top-0 left-0 z-10 flex justify-between p-4 backdrop-hue-rotate-180 border-slate-900/10 backdrop-filter dark:border-slate-300/10 w-full">
      <Link href="/">
        <div className="relative">
          <h1 className="text-4xl font-bold text-yellow-400 font-title cursor-pointer">
            Shorts
          </h1>
          {isAdmin && <p className="text-white absolute top-7 right-0">admin
          </p>}
        </div>
      </Link>
      <Suspense fallback={<div />}>
        <AuthActions />
      </Suspense>
    </header>
  );
}

function AuthActions() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { isLoggedIn, user } = useUser();

  const logout = () => {
    window.localStorage.removeItem(LOCAL_STORAGE_ACCESS_KEY);
    queryClient.clear();
    router.push("/");
  };

  return (
    <div>
      {isLoggedIn
        ? (
          <>
            {user?.picture && (
              <img src={user.picture} alt="user profile image" />
            )}
            <a
              className="text-yellow-400 hover:text-yellow-200"
              onClick={logout}
              onKeyDown={(e) => e.code === "Enter" && logout}
            >
              Logout
            </a>
          </>
        )
        : null}
      {
        /** (
          <>
            <Link href="/login">
              <a className="text-yellow-400 hover:text-yellow-200">Login</a>
            </Link>
            <Link href="/signup">
              <a className="ml-4 text-yellow-400 hover:text-yellow-200">
                Signup
              </a>
            </Link>
          </>
        )*/
      }
    </div>
  );
}
