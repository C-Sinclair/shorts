import { auth } from ".";
import type { AuthToken } from ".";

/**
 * Attempt login using the request object
 * Redirects if no JS search params are used as the data mechanism
 */
export async function login(request: Request): Promise<AuthToken> {
  const { email, password } = await getAuthParams(request);
  if (email && password) {
    const authToken = await auth.login({ email, password });
    if (!authToken) {
      throw new Error("An error occurred logging in");
    }
    return authToken;
  }
}

type AuthParams = {
  email?: string;
  password?: string;
  confirm_password?: string;
};

/**
 * Get email/password from request
 */
export async function getAuthParams(request: Request): Promise<AuthParams> {
  if (request.method.toLowerCase() === "get") {
    const params = new URL(request.url).searchParams;
    const email = params.get("email");
    const password = params.get("password");
    const confirm_password = params.get("confirm_password");
    return { email, password, confirm_password };
  } else {
    const body = await request.json();
    return body;
  }
}
