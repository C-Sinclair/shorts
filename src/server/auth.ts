import { Authorizer } from "@authorizerdev/authorizer-js";
import { AUTHORIZER_URL, CLIENT_ID, REDIRECT_URL } from "~/env";

export type { AuthToken, User } from "@authorizerdev/authorizer-js";

export const auth = new Authorizer({
  authorizerURL: AUTHORIZER_URL,
  redirectURL: REDIRECT_URL,
  clientID: CLIENT_ID,
});
