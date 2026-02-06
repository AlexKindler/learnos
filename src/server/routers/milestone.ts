import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/trpc";

export const milestoneRouter = createTRPCRouter({
  get: protectedProcedure
    .input(z.object({ milestoneId: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.milestone.findUniqueOrThrow({
        where: { id: input.milestoneId },
        include: { quest: { select: { id: true, title: true, slug: true } } },
      });
    }),

  getProgress: protectedProcedure
    .input(z.object({ milestoneId: z.string(), questProgressId: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.milestoneProgress.findUnique({
        where: {
          questProgressId_milestoneId: {
            questProgressId: input.questProgressId,
            milestoneId: input.milestoneId,
          },
        },
      });
    }),

  complete: protectedProcedure
    .input(
      z.object({
        milestoneId: z.string(),
        questProgressId: z.string(),
        submission: z.string().optional(),
        aiFeedback: z.string().optional(),
        score: z.number().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Mark current milestone as completed
      await ctx.db.milestoneProgress.update({
        where: {
          questProgressId_milestoneId: {
            questProgressId: input.questProgressId,
            milestoneId: input.milestoneId,
          },
        },
        data: {
          status: "completed",
          submission: input.submission,
          aiFeedback: input.aiFeedback,
          score: input.score,
          completedAt: new Date(),
        },
      });

      // Get the milestone to find the reward and the next one
      const milestone = await ctx.db.milestone.findUniqueOrThrow({
        where: { id: input.milestoneId },
      });

      // Unlock next milestone
      const nextMilestone = await ctx.db.milestone.findFirst({
        where: {
          questId: milestone.questId,
          order: milestone.order + 1,
        },
      });

      if (nextMilestone) {
        await ctx.db.milestoneProgress.updateMany({
          where: {
            questProgressId: input.questProgressId,
            milestoneId: nextMilestone.id,
          },
          data: { status: "active" },
        });
      } else {
        // All milestones completed — complete the quest
        const quest = await ctx.db.quest.findUniqueOrThrow({
          where: { id: milestone.questId },
        });

        await ctx.db.questProgress.update({
          where: { id: input.questProgressId },
          data: { status: "completed", completedAt: new Date() },
        });

        // Award quest XP
        await ctx.db.user.update({
          where: { id: ctx.session.user.id },
          data: { xp: { increment: quest.xpReward } },
        });

        await ctx.db.xpLog.create({
          data: {
            userId: ctx.session.user.id,
            amount: quest.xpReward,
            source: "quest-complete",
            sourceId: quest.id,
          },
        });

        // Create credential node
        await ctx.db.credentialNode.create({
          data: {
            userId: ctx.session.user.id,
            questId: quest.id,
            score: input.score,
          },
        });
      }

      // Award milestone XP
      await ctx.db.user.update({
        where: { id: ctx.session.user.id },
        data: { xp: { increment: milestone.xpReward } },
      });

      await ctx.db.xpLog.create({
        data: {
          userId: ctx.session.user.id,
          amount: milestone.xpReward,
          source: "milestone-complete",
          sourceId: milestone.id,
        },
      });

      return { success: true };
    }),
});
