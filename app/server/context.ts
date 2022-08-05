import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import { CreateHTTPContextOptions } from "@trpc/server/adapters/standalone";
import { auth } from "./auth";

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 * @TODO: cache responses
 */
export async function createContext(opts: CreateHTTPContextOptions) {
  const { authorization } = opts.req.headers;
  if (authorization) {
    try {
      console.info("Authorization:", authorization);
      const user = await auth.getProfile({ Authorization: authorization });
      return {
        user,
        authorization,
        auth,
      };
    } catch (e) {
      console.error(e);
    }
  }
  return {
    auth,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;

export const t = initTRPC<{ ctx: Context }>()();
