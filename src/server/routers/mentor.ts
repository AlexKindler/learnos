import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/trpc";

export const mentorRouter = createTRPCRouter({
  getHistory: protectedProcedure
    .input(z.object({ limit: z.number().min(1).max(100).default(50) }))
    .query(async ({ ctx, input }) => {
      return ctx.db.mentorMemory.findMany({
        where: { userId: ctx.session.user.id },
        orderBy: { createdAt: "asc" },
        take: input.limit,
      });
    }),

  saveMessage: protectedProcedure
    .input(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string(),
        context: z.any().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.mentorMemory.create({
        data: {
          userId: ctx.session.user.id,
          role: input.role,
          content: input.content,
          context: input.context ?? undefined,
        },
      });
    }),

  clearHistory: protectedProcedure.mutation(async ({ ctx }) => {
    await ctx.db.mentorMemory.deleteMany({
      where: { userId: ctx.session.user.id },
    });
    return { success: true };
  }),
});
