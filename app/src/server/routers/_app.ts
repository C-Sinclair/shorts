import { createRouter } from "../createRouter";
import superjson from "superjson";
import { shortRouter } from "./short";
import { userRouter } from "./user";

/**
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
  .merge("user.", userRouter)
  .merge("short.", shortRouter);

export type AppRouter = typeof appRouter;
