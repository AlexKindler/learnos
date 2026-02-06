import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/trpc";

export const constellationRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.constellation.findMany({
      include: {
        members: {
          include: {
            user: { select: { id: true, name: true, username: true, image: true } },
          },
        },
        _count: { select: { members: true, messages: true } },
      },
      orderBy: { createdAt: "desc" },
    });
  }),

  get: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.constellation.findUniqueOrThrow({
        where: { id: input.id },
        include: {
          members: {
            include: {
              user: {
                select: { id: true, name: true, username: true, image: true },

              },
            },
          },
          messages: {
            orderBy: { createdAt: "asc" },
            take: 100,
          },
        },
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1).max(100),
        description: z.string().max(500).optional(),
        maxMembers: z.number().min(2).max(10).default(5),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.constellation.create({
        data: {
          ...input,
          members: {
            create: {
              userId: ctx.session.user.id,
              role: "creator",
            },
          },
        },
      });
    }),

  join: protectedProcedure
    .input(z.object({ constellationId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const constellation = await ctx.db.constellation.findUniqueOrThrow({
        where: { id: input.constellationId },
        include: { _count: { select: { members: true } } },
      });

      if (constellation._count.members >= constellation.maxMembers) {
        throw new Error("Constellation is full");
      }

      return ctx.db.constellationMember.create({
        data: {
          constellationId: input.constellationId,
          userId: ctx.session.user.id,
        },
      });
    }),

  sendMessage: protectedProcedure
    .input(
      z.object({
        constellationId: z.string(),
        content: z.string().min(1).max(2000),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUniqueOrThrow({
        where: { id: ctx.session.user.id },
      });

      const message = await ctx.db.constellationMessage.create({
        data: {
          constellationId: input.constellationId,
          userId: ctx.session.user.id,
          userName: user.name ?? "Anonymous",
          userImage: user.image,
          content: input.content,
        },
      });

      // Trigger Pusher event (fire and forget)
      try {
        const { getPusherServer } = await import("@/lib/pusher-server");
        await getPusherServer().trigger(
          `constellation-${input.constellationId}`,
          "new-message",
          message
        );
      } catch {
        // Pusher not configured, silently fail
      }

      return message;
    }),

  myConstellations: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.constellationMember.findMany({
      where: { userId: ctx.session.user.id },
      include: {
        constellation: {
          include: {
            _count: { select: { members: true } },
          },
        },
      },
    });
  }),
});
