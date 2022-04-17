import { auth } from ".";
import type { AuthToken } from ".";
import { getAuthParams } from "./login";

/**
 * Attempt signup using the request object
 * Redirects if no JS search params are used as the data mechanism
 */
export async function signup(request: Request): Promise<AuthToken> {
  const { email, password, confirm_password } = await getAuthParams(request);
  if (email && password && confirm_password) {
    const authToken = await auth.signup({
      email,
      password,
      confirm_password,
    });
    if (!authToken) {
      throw new Error("An error occurred signing up");
    }
    return authToken;
  }
}
