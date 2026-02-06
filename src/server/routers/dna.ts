import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/trpc";

export const dnaRouter = createTRPCRouter({
  get: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.learningDna.findUnique({
      where: { userId: ctx.session.user.id },
    });
  }),

  saveAssessmentResponse: protectedProcedure
    .input(
      z.object({
        questionIndex: z.number(),
        question: z.string(),
        answer: z.string(),
        dimension: z.string(),
        score: z.number(),
        difficulty: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.assessmentResponse.create({
        data: {
          userId: ctx.session.user.id,
          ...input,
        },
      });
    }),

  saveDna: protectedProcedure
    .input(
      z.object({
        analytical: z.number().min(0).max(100),
        creative: z.number().min(0).max(100),
        practical: z.number().min(0).max(100),
        social: z.number().min(0).max(100),
        structural: z.number().min(0).max(100),
        explorative: z.number().min(0).max(100),
        pacePreference: z.string(),
        depthPreference: z.string(),
        stylePreference: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const dna = await ctx.db.learningDna.upsert({
        where: { userId: ctx.session.user.id },
        create: { userId: ctx.session.user.id, ...input },
        update: input,
      });

      // Mark user as onboarded
      await ctx.db.user.update({
        where: { id: ctx.session.user.id },
        data: { onboarded: true },
      });

      return dna;
    }),
});
