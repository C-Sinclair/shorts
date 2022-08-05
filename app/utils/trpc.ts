import {
  createTRPCClient,
  createTRPCClientProxy,
  HTTPHeaders,
  httpLink,
} from "@trpc/client";
import { loggerLink } from "@trpc/client/links/loggerLink";
import type { AppRouter } from "../server/routers/_app";
import { isDev, LOCAL_STORAGE_ACCESS_KEY } from "../env";

const client = createTRPCClient<AppRouter>({
  links: [
    httpLink({
      url: `${isDev ? "http://localhost:2022" : "http://localhost"}/api/trpc`,
    }),
    // adds pretty logs to your console in development and logs errors in production
    loggerLink({
      enabled: (opts) =>
        isDev || (opts.direction === "down" && opts.result instanceof Error),
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
