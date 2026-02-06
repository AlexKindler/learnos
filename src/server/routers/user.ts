import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/trpc";

export const userRouter = createTRPCRouter({
  me: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: { id: ctx.session.user.id },
      include: { learningDna: true },
    });
    return user;
  }),

  update: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1).max(100).optional(),
        username: z.string().min(3).max(30).regex(/^[a-zA-Z0-9_-]+$/).optional(),
        bio: z.string().max(500).optional(),
        image: z.string().url().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.user.update({
        where: { id: ctx.session.user.id },
        data: input,
      });
    }),

  onboardingStatus: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: { id: ctx.session.user.id },
      select: { onboarded: true },
    });
    return { onboarded: user?.onboarded ?? false };
  }),

  publicProfile: publicProcedure
    .input(z.object({ username: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.user.findUnique({
        where: { username: input.username },
        select: {
          id: true,
          name: true,
          username: true,
          image: true,
          bio: true,
          xp: true,
          createdAt: true,
          learningDna: true,
          credentialNodes: {
            include: { quest: { select: { id: true, title: true, category: true, coverImage: true } } },
          },
        },
      });
    }),

  leaderboard: publicProcedure
    .input(z.object({ limit: z.number().min(1).max(100).default(50) }))
    .query(async ({ ctx, input }) => {
      return ctx.db.user.findMany({
        where: { onboarded: true },
        select: {
          id: true,
          name: true,
          username: true,
          image: true,
          xp: true,
          streak: true,
        },
        orderBy: { xp: "desc" },
        take: input.limit,
      });
    }),
});
