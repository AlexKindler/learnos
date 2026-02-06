import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/trpc";

export const xpRouter = createTRPCRouter({
  myLogs: protectedProcedure
    .input(z.object({ limit: z.number().min(1).max(100).default(20) }))
    .query(async ({ ctx, input }) => {
      return ctx.db.xpLog.findMany({
        where: { userId: ctx.session.user.id },
        orderBy: { createdAt: "desc" },
        take: input.limit,
      });
    }),

  myTotal: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUniqueOrThrow({
      where: { id: ctx.session.user.id },
      select: { xp: true, streak: true },
    });
    return user;
  }),
});
