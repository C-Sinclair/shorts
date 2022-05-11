/**
 * This file contains the root router of your tRPC-backend
 */
import { createRouter } from "../createRouter";
import superjson from "superjson";
import { shortRouter } from "./short";

/**
 * Create your application's root router
 * If you want to use SSG, you need export this
 * @link https://trpc.io/docs/ssg
 * @link https://trpc.io/docs/router
 */
export const appRouter = createRouter()
  /**
   * Add data transformers
   * @link https://trpc.io/docs/data-transformers
   */
  .transformer(superjson)
  /**
   * Add a health check endpoint to be called with `/api/trpc/healthz`
   */
  .query("healthz", {
    async resolve() {
      return "yay!";
    },
  })
  /**
   * Merge `shortRouter` under `post.`
   */
  .merge("short.", shortRouter);

export type AppRouter = typeof appRouter;
