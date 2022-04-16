import { Authorizer } from "@authorizerdev/authorizer-js";

const AUTHORIZER_URL = import.meta.env.AUTHORIZER_URL as string;
const REDIRECT_URL = import.meta.env.AUTHORIZER_REDIRECT_URL as string;
const CLIENT_ID = import.meta.env.AUTHORIZER_CLIENT_ID as string;

console.log({
  AUTHORIZER_URL,
  REDIRECT_URL,
  CLIENT_ID,
});

export const auth = new Authorizer({
  authorizerURL: AUTHORIZER_URL,
  redirectURL: REDIRECT_URL,
  clientID: CLIENT_ID,
});

/**
 * Check if user is logged in from their request headers
 * And with the correct roles
 */
export async function isLoggedIn(
  headers: Headers,
  roles: string[] = [],
): Promise<boolean> {
  try {
    const Authorization = headers.get("Authorization");
    if (!Authorization) {
      return false;
    }
    const res = await auth.getSession({ Authorization }, { roles });
    return Boolean(res?.user);
  } catch (e) {
    console.error(e);
  }
  return false;
}

/**
 * Logout the current user, using their auth header
 */
export async function logout(headers: Headers): Promise<void> {
  const Authorization = headers.get("Authorization");
  if (!Authorization) {
    return;
  }
  await auth.logout({ Authorization });
}
