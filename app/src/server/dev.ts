import "dotenv/config";
import { createContext } from "./context";
import { appRouter } from "./routers/_app";
import express from "express";
import cors from "cors";
import { createExpressMiddleware } from "@trpc/server/adapters/express";

/**
 * This function starts a development Express server to host the backend
 */
async function main() {
  console.log(`Starting DEV server!`);

  const app = express();

  app.use((req, _res, next) => {
    console.log("⬅️ ", req.method, req.path, req.body ?? req.query);
    next();
  });

  // to allow access from other PORTs
  app.use(cors());

  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    }),
  );

  app.listen(2022, () => {
    console.log("listening on port 2022");
  });
}

main();
