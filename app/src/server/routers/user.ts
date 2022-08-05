import { TRPCError } from "@trpc/server";
import { loginSchema } from "../../pages/login";
import { signupSchema } from "../../pages/signup";
import { t } from "../context";

export const userRouter = t.router({
  /**
   * @returns the current user
   */
  current: t.procedure.query(({ ctx }) => ctx.user),
  login: t.procedure
    .input(loginSchema)
    .mutation(async ({ input, ctx: { auth } }) => {
      const { email, password } = input;
      const authToken = await auth.login({ email, password });
      if (!authToken) {
        throw new TRPCError({
          message: "An error occurred logging in",
          code: "UNAUTHORIZED",
        });
      }
      return authToken;
    }),
  logout: t.procedure.mutation(async ({ ctx }) => {
    if (ctx.authorization) {
      await ctx.auth.logout({ Authorization: ctx.authorization });
    }
  }),

  register: t.procedure
    .input(signupSchema)
    .mutation(async ({ input, ctx: { auth } }) => {
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
    }),
});
