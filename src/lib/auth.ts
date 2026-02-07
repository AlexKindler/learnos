import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/sign-in",
    error: "/error",
    verifyRequest: "/verify",
  },
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user) {
        token.id = user.id;
      }
      // Only fetch from DB on sign-in or explicit update, not every request
      // This avoids calling Prisma from Edge Runtime (middleware)
      if (trigger === "signIn" || trigger === "update") {
        try {
          const dbUser = await db.user.findUnique({
            where: { id: token.id as string },
            select: { username: true, onboarded: true, image: true, name: true },
          });
          if (dbUser) {
            token.username = dbUser.username;
            token.onboarded = dbUser.onboarded;
            token.picture = dbUser.image;
            token.name = dbUser.name;
          }
        } catch {
          // Prisma not available in Edge — skip
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        (session.user as any).username = token.username as string | null;
        (session.user as any).onboarded = token.onboarded as boolean;
      }
      return session;
    },
  },
});
