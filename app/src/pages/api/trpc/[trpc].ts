import { createContext } from "~/server/context";
import { appRouter } from "~/server/routers/_app";
import { createHTTPHandler } from "@trpc/server/adapters/standalone";

export default createHTTPHandler({
  router: appRouter,
  createContext,
});
