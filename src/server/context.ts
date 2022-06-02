import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { auth } from "./auth";
import { prisma } from "./prisma";

interface CreateContextOptions {
  /**
   * The auth header
   */
  authorization?: string;
}

/**
 * Inner function for `createContext` where we create the context.
 * This is useful for testing when we don't want to mock Next.js' request/response
 */
export async function createContextInner(opts: CreateContextOptions) {
  const { authorization } = opts;
  if (authorization) {
    try {
      console.info("Authorization:", authorization);
      const session = await auth.getSession({ Authorization: authorization });
      return {
        session,
        authorization,
        auth,
        prisma,
      };
    } catch (e) {
      console.error(e);
    }
  }
  return {
    auth,
    prisma,
  };
}

export type Context = trpc.inferAsyncReturnType<typeof createContextInner>;

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 * @TODO: cache responses
 */
export async function createContext({
  req,
}: trpcNext.CreateNextContextOptions): Promise<Context> {
  const { authorization } = req.headers;

  return await createContextInner({
    authorization,
  });
}
