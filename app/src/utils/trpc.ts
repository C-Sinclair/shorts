import {
  createTRPCClient,
  createTRPCClientProxy,
  HTTPHeaders,
  httpLink,
} from "@trpc/client";
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import { loggerLink } from "@trpc/client/links/loggerLink";
import type { AppRouter } from "../server/routers/_app";
import { LOCAL_STORAGE_ACCESS_KEY } from "../env";

const client = createTRPCClient<AppRouter>({
  links: [
    httpLink({
      url: `http://localhost:2022`,
    }),
    // adds pretty logs to your console in development and logs errors in production
    loggerLink({
      enabled: (opts) =>
        process.env.NODE_ENV === "development" ||
        (opts.direction === "down" && opts.result instanceof Error),
    }),
    httpBatchLink({
      url: `/api/trpc`,
    }),
  ],
  headers() {
    const token = typeof window !== "undefined" &&
      window.localStorage?.getItem(LOCAL_STORAGE_ACCESS_KEY);
    const Authorization = token ? `Bearer ${token}` : undefined;
    return { Authorization } as HTTPHeaders;
  },
});
export const trpc = createTRPCClientProxy(client);
