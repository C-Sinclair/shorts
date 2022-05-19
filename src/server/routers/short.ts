import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
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
    async resolve({ input, ctx: { prisma } }) {
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
      return short;
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
        input: z.object({
          id: z.string().uuid().optional(),
          title: z.string().min(1).max(32),
          description: z.string().min(1).max(256),
          path: z.string().min(3),
          playbackId: z.string(),
        }),
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
