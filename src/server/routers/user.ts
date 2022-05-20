import { TRPCError } from "@trpc/server";
import { loginSchema } from "~/pages/login";
import { signupSchema } from "~/pages/signup";
import { createRouter } from "~/server/createRouter";

export const userRouter = createRouter()
  /**
   * @returns the current user
   */
  .query("current", {
    async resolve({ ctx }) {
      console.log("CURRENT");
      return ctx.session?.user;
    },
  })
  .mutation("login", {
    input: loginSchema,
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
    input: signupSchema,
    async resolve({ input, ctx: { auth } }) {
      const { email, password, confirm_password } = input;
      const authToken = await auth.signup({
        email,
        password,
        confirm_password,
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
