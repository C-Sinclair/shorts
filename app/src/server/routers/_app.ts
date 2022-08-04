import { shortRouter } from "./short";
import { userRouter } from "./user";
import { t } from "../context";

export const appRouter = t.router({
  short: shortRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
