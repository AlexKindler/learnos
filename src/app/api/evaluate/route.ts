import { anthropic } from "@ai-sdk/anthropic";
import { generateObject } from "ai";
import { z } from "zod";
import { auth } from "@/lib/auth";

export const maxDuration = 30;

const evaluationSchema = z.object({
  score: z.number().min(0).max(100).describe("Score from 0-100 based on quality of submission"),
  feedback: z.string().describe("Constructive feedback on the submission (2-4 sentences)"),
  passed: z.boolean().describe("Whether the submission meets the milestone requirements"),
});

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { submission, milestoneTitle, milestoneContent, milestoneType, questTitle } = await req.json();

  if (!submission?.trim()) {
    return Response.json({ score: 70, feedback: "Milestone marked as complete.", passed: true });
  }

  // If no Anthropic API key, return a default score
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({
      score: 80,
      feedback: "Great work completing this milestone! AI evaluation is not configured yet, but your submission has been recorded.",
      passed: true,
    });
  }

  const { object } = await generateObject({
    model: anthropic("claude-sonnet-4-5-20250929"),
    schema: evaluationSchema,
    prompt: `You are evaluating a learner's submission for a quest milestone.

## Quest: ${questTitle}
## Milestone: ${milestoneTitle}
## Milestone Type: ${milestoneType}

## Milestone Content/Instructions:
${milestoneContent}

## Learner's Submission:
${submission}

Evaluate the submission based on:
1. Does it address the milestone requirements?
2. Quality and completeness of the work
3. Understanding demonstrated

For boss-battle milestones, be more rigorous (require score >= 70 to pass).
For lesson milestones, be more lenient (any genuine attempt passes).
For exercise milestones, check for correctness (require score >= 60 to pass).

Be encouraging but honest in your feedback.`,
  });

  return Response.json(object);
}
