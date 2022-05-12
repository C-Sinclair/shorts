import Link from "next/link";
import { Suspense } from "react";
import { useUser } from "~/hooks";

export function Header() {
  return (
    <header
      className="flex justify-between p-4 backdrop-hue-rotate-180 border-slate-900/10 backdrop-filter dark:border-slate-300/10 w-full"
    >
      <Link href="/">
        <h1 className="text-4xl font-bold text-yellow-400 font-title">
          Shorts
        </h1>
      </Link>
      <Suspense fallback={<div />}>
        <AuthActions />
      </Suspense>
    </header>
  );
}

function AuthActions() {
  const { isLoggedIn, user } = useUser();
  return (
    <div>
      {isLoggedIn
        ? (
          <>
            {user?.picture &&
              <img src={user.picture} alt="user profile image" />}
            <Link href="/logout">
              <a className="text-yellow-400 hover:text-yellow-200">Logout</a>
            </Link>
          </>
        )
        : (
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
        )}
    </div>
  );
}
