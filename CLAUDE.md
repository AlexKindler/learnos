# LearnOS

Adaptive, project-based education platform with AI-powered "Learning DNA" system.

## Tech Stack

- **Framework**: Next.js 14 (App Router), TypeScript
- **Styling**: Tailwind CSS + shadcn/ui (neo-brutalist theme: 2px borders, hard offset shadows)
- **Database**: Neon PostgreSQL via Prisma ORM
- **Auth**: NextAuth v5 (Auth.js beta) with JWT strategy + PrismaAdapter (GitHub + Google OAuth)
- **API**: tRPC v11 with TanStack React Query
- **AI**: Vercel AI SDK v6 (`ai` + `@ai-sdk/react`) with Anthropic Claude
- **Real-time**: Pusher Channels (constellation chat)
- **Animations**: Framer Motion

## Key Architecture Notes

- **Edge Runtime**: Prisma cannot run in Edge Runtime. The JWT callback in `src/lib/auth.ts` wraps DB calls in try/catch and only runs on `signIn`/`update` triggers.
- **AI SDK v6 API**: `useChat` uses `TextStreamChatTransport` for transport config, `sendMessage({text})` instead of old `handleSubmit`, and `status` instead of `isLoading`.
- **tRPC**: 8 routers (health, user, dna, quest, milestone, xp, mentor, constellation) aggregated in `src/server/root.ts`.

## Commands

- `npm run dev` — Start dev server
- `npx prisma db push` — Push schema to Neon
- `npx prisma db seed` — Seed database (5 users, 5 quests, 2 constellations)
- `npx prisma studio` — Database GUI

## Project Structure

```
src/
  app/           — Pages (App Router)
  components/    — UI components (shadcn + custom)
  lib/           — Auth, DB, tRPC client, utils
  server/        — tRPC server, routers
prisma/          — Schema + seed
```

## Environment Variables

Required in `.env`: DATABASE_URL, DIRECT_URL, NEXTAUTH_URL, NEXTAUTH_SECRET, GITHUB_ID, GITHUB_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, ANTHROPIC_API_KEY
