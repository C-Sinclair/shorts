import { TRPCError } from "@trpc/server";
import { t } from "../context";

export const adminOnly = t.middleware(async ({ ctx, next }) => {
  const roles = ctx.user?.roles || [];
  const isAdmin = roles.includes("admin");
  if (!isAdmin) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next();
});
