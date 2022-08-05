import { useNavigate } from "@solidjs/router";
import { Show, Suspense } from "solid-js/web";
import { LOCAL_STORAGE_ACCESS_KEY } from "../env";
import { currentUser, isAdmin } from "../hooks/user";

export function Header() {
  return (
    <header class="fixed top-0 left-0 z-10 flex justify-between p-4 backdrop-hue-rotate-180 border-slate-900/10 backdrop-filter dark:border-slate-300/10 w-full">
      <a href="/">
        <div class="relative">
          <h1 class="text-4xl font-bold text-yellow-400 font-title cursor-pointer">
            Shorts
          </h1>
          <Show when={isAdmin()}>
            <p class="text-white absolute top-7 right-0">admin</p>
          </Show>
        </div>
      </a>
      <Suspense fallback={<div />}>
        <AuthActions />
      </Suspense>
    </header>
  );
}

function AuthActions() {
  const [user] = currentUser;
  const navigate = useNavigate();

  const logout = () => {
    window.localStorage.removeItem(LOCAL_STORAGE_ACCESS_KEY);
    navigate("/");
  };

  return (
    <div>
      <Show when={user()}>
        <>
          <Show when={user()?.picture}>
            <img src={user()?.picture || ""} alt="user profile image" />
          </Show>
          <a
            class="text-yellow-400 hover:text-yellow-200"
            onClick={logout}
            onKeyDown={(e) => e.code === "Enter" && logout}
          >
            Logout
          </a>
        </>
      </Show>
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
