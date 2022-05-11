import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createRouter } from "~/server/createRouter";

export const userRouter = createRouter()
  /**
   * @returns the current user
   */
  .query("current", {
    async resolve({ ctx }) {
      return ctx.session?.user;
    },
  })
  .mutation("login", {
    input: z.object({
      email: z.string().email(),
      password: z.string(),
    }),
    async resolve({ input, ctx: { auth } }) {
      const { email, password } = input;
      const authToken = await auth.login({ email, password });
      if (!authToken) {
        throw new TRPCError({
          message: "An error occurred logging in",
          code: "UNAUTHORIZED",
        });
      }
      return authToken;
    },
  })
  .mutation("logout", {
    async resolve({ ctx }) {
      if (ctx.authorization) {
        await ctx.auth.logout({ Authorization: ctx.authorization });
      }
    },
  })
  .mutation("register", {
    input: z
      .object({
        email: z.string().email(),
        password: z.string(),
        confirmPassword: z.string(),
      })
      .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
      }),
    async resolve({ input, ctx: { auth } }) {
      const { email, password, confirmPassword } = input;
      const authToken = await auth.signup({
        email,
        password,
        confirm_password: confirmPassword,
      });
      if (!authToken) {
        throw new TRPCError({
          message: "An error occurred signing up",
          code: "UNAUTHORIZED",
        });
      }
      return authToken;
    },
  });
