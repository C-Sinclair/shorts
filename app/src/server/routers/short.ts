import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { editShortSchema } from "~/pages/admin/short/[id]";
import { uploadSchema } from "~/pages/admin/upload";
import { t } from "../context";
import { adminOnly } from "./middleware";

export const shortRouter = t.router({
  all: t.procedure.query(async ({ ctx }) => {
    return [];
  }),
  byId: t.procedure.input(z.object({
    id: z.string(),
  })).query(async ({ input, ctx: { user } }) => {
    const { id } = input;
    const short = null;
    if (!short) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `No short with id '${id}'`,
      });
    }
    // record short being viewed
    // await prisma.view.create({
    //   data: {
    //     short: { connect: { id } },
    //     userId: user?.id,
    //   },
    // });
    // const views = short.views.length + 1;
    // return {
    //   ...short,
    //   views,
    // };
  }),
  viewed: t.procedure.input(z.object({
    shortId: z.string(),
  })).mutation(async ({ input, ctx: { user } }) => {
    // await prisma.view.create({
    //   data: {
    //     short: { connect: { id: input.shortId } },
    //     userId: user?.id,
    //   },
    // });
  }),
  react: t.procedure.input(z.object({
    shortId: z.string(),
    // reaction: z.enum([
    // ReactionType.LIKE,
    // ReactionType.DISLIKE,
    // ReactionType.LOVE,
    // ReactionType.UNICORN,
    // ReactionType.COOL,
    // ]),
  })).mutation(async ({ input, ctx: { user } }) => {
    // await prisma.reaction.create({
    //   data: {
    //     short: { connect: { id: input.shortId } },
    //     userId: user?.id,
    //     type: input.reaction,
    //   },
    // });
  }),
  admin: t.router({
    add: t.procedure.use(adminOnly)
      .input(uploadSchema)
      .mutation(async ({ input }) => {
        // TODO: create short
      }),
    edit: t.procedure.use(adminOnly)
      .input(z.object({
        id: z.string(),
        data: editShortSchema,
      })).mutation(async ({ input }) => {
        // TODO: update short
      }),
    delete: t.procedure.use(adminOnly)
      .input(z.object({
        id: z.string(),
      })).mutation(async ({ input }) => {
        // TODO: delete short
      }),
  }),
});
