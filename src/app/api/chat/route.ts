import { anthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export const maxDuration = 30;

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { messages } = await req.json();

  // Fetch user DNA and context
  const user = await db.user.findUnique({
    where: { id: session.user.id },
    include: {
      learningDna: true,
      questProgress: {
        where: { status: "active" },
        include: { quest: { select: { title: true, category: true } } },
        take: 3,
      },
    },
  });

  const dna = user?.learningDna;
  const activeQuests = user?.questProgress ?? [];

  const systemPrompt = `You are the LearnOS AI Mentor — a warm, encouraging, and highly knowledgeable learning companion.

## About the Learner
- Name: ${user?.name ?? "Learner"}
${dna ? `- Learning DNA Profile:\n  - Analytical: ${dna.analytical}/100\n  - Creative: ${dna.creative}/100\n  - Practical: ${dna.practical}/100\n  - Social: ${dna.social}/100\n  - Structural: ${dna.structural}/100\n  - Explorative: ${dna.explorative}/100\n  - Learning pace: ${dna.pacePreference}\n  - Learning depth: ${dna.depthPreference}\n  - Learning style: ${dna.stylePreference}` : "- No DNA profile yet"}
${activeQuests.length > 0 ? `- Active Quests: ${activeQuests.map((q) => q.quest.title).join(", ")}` : "- No active quests"}

## Your Behavior
- Adapt explanations to the learner's DNA profile (e.g., more visual for creative learners, more structured for structural learners)
- Be encouraging but honest. Celebrate progress, gently correct mistakes
- Use analogies and examples relevant to their interests
- When helping with code, provide clear explanations alongside the code
- Ask clarifying questions when the request is ambiguous
- Keep responses concise unless depth is requested
- Use markdown formatting for code blocks, lists, and emphasis`;

  const result = streamText({
    model: anthropic("claude-sonnet-4-5-20250929"),
    system: systemPrompt,
    messages,
  });

  // Save messages to memory (fire and forget)
  const lastMessage = messages[messages.length - 1];
  if (lastMessage) {
    db.mentorMemory.create({
      data: {
        userId: session.user.id,
        role: lastMessage.role,
        content: lastMessage.content,
      },
    }).catch(() => {});
  }

  return result.toTextStreamResponse();
}
