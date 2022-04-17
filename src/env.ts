export const AUTHORIZER_URL = (import.meta.env.AUTHORIZER_URL as string) ||
  (process.env.AUTHORIZER_URL as string);
export const REDIRECT_URL =
  (import.meta.env.AUTHORIZER_REDIRECT_URL as string) ||
  (process.env.AUTHORIZER_REDIRECT_URL as string);
export const CLIENT_ID = (import.meta.env.AUTHORIZER_CLIENT_ID as string) ||
  (process.env.AUTHORIZER_CLIENT_ID as string);
