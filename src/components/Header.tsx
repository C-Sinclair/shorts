import { createResource, Suspense } from "solid-js";
import { Link } from "solid-app-router";

export function Header() {
  return (
    <header class="flex justify-between p-4 backdrop-hue-rotate-180 border-slate-900/10 backdrop-filter dark:border-slate-300/10">
      <Link href="/">
        <h1 class="text-4xl font-bold text-yellow-400 font-title">Shorts</h1>
      </Link>
      <Suspense fallback={<div />}>
        <AuthActions />
      </Suspense>
    </header>
  );
}

function AuthActions() {
  const [auth] = createResource(checkAuthStatus);
  return (
    <div>
      {auth()?.isAuthenticated
        ? (
          <>
            {auth().profileImage && (
              <img src={auth().profileImage} alt="user profile image" />
            )}
            <Link href="/logout" class="text-yellow-400 hover:text-yellow-200">
              Logout
            </Link>
          </>
        )
        : (
          <>
            <Link href="/login" class="text-yellow-400 hover:text-yellow-200">
              Login
            </Link>
            <Link
              href="/signup"
              class="ml-4 text-yellow-400 hover:text-yellow-200"
            >
              Signup
            </Link>
          </>
        )}
    </div>
  );
}

type AuthStatusResponse = {
  isAuthenticated: boolean;
  profileImage?: string;
};

async function checkAuthStatus(): Promise<AuthStatusResponse> {
  try {
    return { isAuthenticated: false };
    const res = await fetch(`/profile`, {
      method: "POST",
    });
    const data = await res.json();
    const profileImage = data.user?.profile_name;
    return {
      isAuthenticated: true,
      profileImage,
    };
  } catch (e) {
    console.error(e);
    return {
      isAuthenticated: false,
    };
  }
}
