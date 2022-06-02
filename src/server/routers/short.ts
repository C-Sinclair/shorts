import { Prisma, ReactionType } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { uploadSchema } from "~/pages/upload";
import { createRouter } from "~/server/createRouter";

/**
 * Default selector for Short.
 * It's important to always explicitly say which fields you want to return in order to not leak extra information
 * @see https://github.com/prisma/prisma/issues/9353
 */
const defaultShortSelect = Prisma.validator<Prisma.ShortSelect>()({
  id: true,
  title: true,
  description: true,
  createdAt: true,
  updatedAt: true,
  playbackId: true,
  path: true,
  // grab only the View's id by default
  views: {
    select: {
      id: true,
    },
  },
});

export const shortRouter = createRouter()
  // read
  .query("all", {
    async resolve({ ctx: { prisma } }) {
      /**
       * For pagination you can have a look at this docs site
       * @link https://trpc.io/docs/useInfiniteQuery
       */
      const shorts = await prisma.short.findMany({
        select: defaultShortSelect,
      });
      return shorts;
    },
  })
  .query("byId", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx: { prisma, session } }) {
      const { id } = input;
      const short = await prisma.short.findUnique({
        where: { id },
        select: defaultShortSelect,
      });
      if (!short) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No short with id '${id}'`,
        });
      }
      // record short being viewed
      await prisma.view.create({
        data: {
          short: { connect: { id } },
          userId: session?.user?.id,
        },
      });
      const views = short.views.length + 1;
      return {
        ...short,
        views,
      };
    },
  })
  .mutation("viewed", {
    input: z.object({
      shortId: z.string(),
    }),
    async resolve({ input, ctx: { prisma, session } }) {
      await prisma.view.create({
        data: {
          short: { connect: { id: input.shortId } },
          userId: session?.user?.id,
        },
      });
    },
  })
  .mutation("react", {
    input: z.object({
      shortId: z.string(),
      reaction: z.enum([
        ReactionType.LIKE,
        ReactionType.DISLIKE,
        ReactionType.LOVE,
        ReactionType.UNICORN,
        ReactionType.COOL,
      ]),
    }),
    async resolve({ input, ctx: { prisma, session } }) {
      await prisma.reaction.create({
        data: {
          short: { connect: { id: input.shortId } },
          userId: session?.user?.id,
          type: input.reaction,
        },
      });
    },
  })
  .merge(
    "admin.",
    createRouter()
      .middleware(async ({ ctx, next }) => {
        const roles = ctx.session?.user?.roles || [];
        const isAdmin = roles.includes("admin");
        if (!isAdmin) {
          throw new TRPCError({ code: "UNAUTHORIZED" });
        }
        return next();
      })
      .mutation("add", {
        input: uploadSchema,
        async resolve({ input, ctx: { prisma } }) {
          const short = await prisma.short.create({
            data: input,
            select: defaultShortSelect,
          });
          return short;
        },
      })
      .mutation("edit", {
        input: z.object({
          id: z.string().uuid(),
          data: z.object({
            title: z.string().min(1).max(32).optional(),
            description: z.string().min(1).max(256).optional(),
            path: z.string().min(3).optional(),
            playbackId: z.string().optional(),
          }),
        }),
        async resolve({ input, ctx }) {
          const { id, data } = input;
          const short = await ctx.prisma.short.update({
            where: { id },
            data,
            select: defaultShortSelect,
          });
          return short;
        },
      })
      .mutation("delete", {
        input: z.object({
          id: z.string(),
        }),
        async resolve({ input, ctx: { prisma } }) {
          const { id } = input;
          await prisma.short.delete({ where: { id } });
          return {
            id,
          };
        },
      }),
  );
