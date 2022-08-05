import { Authorizer } from "@authorizerdev/authorizer-js";
import { AUTHORIZER_URL, CLIENT_ID } from "../env";

export type { AuthToken, User } from "@authorizerdev/authorizer-js";

export const auth = new Authorizer({
  authorizerURL: AUTHORIZER_URL,
  clientID: CLIENT_ID,
  // TODO: check for local url (from preview)
  redirectURL: `http://localhost:3000`,
});
