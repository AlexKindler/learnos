import { createTRPCRouter, createCallerFactory } from "@/server/trpc";
import { healthRouter } from "@/server/routers/health";
import { userRouter } from "@/server/routers/user";
import { dnaRouter } from "@/server/routers/dna";
import { questRouter } from "@/server/routers/quest";
import { milestoneRouter } from "@/server/routers/milestone";
import { xpRouter } from "@/server/routers/xp";
import { mentorRouter } from "@/server/routers/mentor";
import { constellationRouter } from "@/server/routers/constellation";

export const appRouter = createTRPCRouter({
  health: healthRouter,
  user: userRouter,
  dna: dnaRouter,
  quest: questRouter,
  milestone: milestoneRouter,
  xp: xpRouter,
  mentor: mentorRouter,
  constellation: constellationRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
