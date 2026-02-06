import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/trpc";

export const questRouter = createTRPCRouter({
  list: publicProcedure
    .input(
      z.object({
        category: z.string().optional(),
        difficulty: z.string().optional(),
        search: z.string().optional(),
        limit: z.number().min(1).max(50).default(20),
        cursor: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const where: any = { published: true };
      if (input.category) where.category = input.category;
      if (input.difficulty) where.difficulty = input.difficulty;
      if (input.search) {
        where.OR = [
          { title: { contains: input.search, mode: "insensitive" } },
          { description: { contains: input.search, mode: "insensitive" } },
        ];
      }

      const quests = await ctx.db.quest.findMany({
        where,
        take: input.limit + 1,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        orderBy: { createdAt: "desc" },
        include: {
          creator: { select: { name: true, username: true, image: true } },
          _count: { select: { questProgress: true, milestones: true } },
        },
      });

      let nextCursor: string | undefined;
      if (quests.length > input.limit) {
        const next = quests.pop();
        nextCursor = next!.id;
      }
      return { quests, nextCursor };
    }),

  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.quest.findUnique({
        where: { slug: input.slug },
        include: {
          creator: { select: { name: true, username: true, image: true } },
          milestones: { orderBy: { order: "asc" } },
          _count: { select: { questProgress: true } },
        },
      });
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.quest.findUnique({
        where: { id: input.id },
        include: {
          creator: { select: { name: true, username: true, image: true } },
          milestones: { orderBy: { order: "asc" } },
          _count: { select: { questProgress: true } },
        },
      });
    }),

  start: protectedProcedure
    .input(z.object({ questId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const quest = await ctx.db.quest.findUniqueOrThrow({
        where: { id: input.questId },
        include: { milestones: { orderBy: { order: "asc" } } },
      });

      const progress = await ctx.db.questProgress.create({
        data: {
          userId: ctx.session.user.id,
          questId: input.questId,
          milestoneProgress: {
            create: quest.milestones.map((m, i) => ({
              milestoneId: m.id,
              status: i === 0 ? "active" : "locked",
            })),
          },
        },
        include: { milestoneProgress: true },
      });
      return progress;
    }),

  myProgress: protectedProcedure
    .input(z.object({ questId: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.questProgress.findUnique({
        where: {
          userId_questId: {
            userId: ctx.session.user.id,
            questId: input.questId,
          },
        },
        include: {
          milestoneProgress: {
            include: { milestone: true },
            orderBy: { milestone: { order: "asc" } },
          },
        },
      });
    }),

  myActiveQuests: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.questProgress.findMany({
      where: { userId: ctx.session.user.id, status: "active" },
      include: {
        quest: {
          include: {
            _count: { select: { milestones: true } },
          },
        },
        milestoneProgress: true,
      },
      orderBy: { startedAt: "desc" },
    });
  }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1).max(200),
        slug: z.string().min(1).max(200),
        description: z.string().min(1),
        category: z.string(),
        difficulty: z.string(),
        duration: z.string(),
        xpReward: z.number().min(0).default(100),
        coverImage: z.string().optional(),
        milestones: z.array(
          z.object({
            title: z.string(),
            description: z.string(),
            content: z.string(),
            order: z.number(),
            type: z.string().default("lesson"),
            xpReward: z.number().default(25),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { milestones, ...questData } = input;
      return ctx.db.quest.create({
        data: {
          ...questData,
          creatorId: ctx.session.user.id,
          milestones: { create: milestones },
        },
        include: { milestones: true },
      });
    }),

  publish: protectedProcedure
    .input(z.object({ questId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.quest.update({
        where: { id: input.questId, creatorId: ctx.session.user.id },
        data: { published: true },
      });
    }),
});
