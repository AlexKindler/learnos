"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { useTRPC } from "@/lib/trpc";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, CheckCircle2, Swords, Loader2 } from "lucide-react";
import Link from "next/link";

export default function MilestonePage() {
  const params = useParams();
  const router = useRouter();
  const questId = params.questId as string;
  const milestoneId = params.milestoneId as string;
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const [submission, setSubmission] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);

  const { data: milestone, isLoading } = useQuery(trpc.milestone.get.queryOptions({ milestoneId }));
  const { data: progress } = useQuery(trpc.quest.myProgress.queryOptions({ questId }));

  const completeMilestone = useMutation({
    ...trpc.milestone.complete.mutationOptions(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: trpc.quest.myProgress.queryOptions({ questId }).queryKey });
      setFeedback("Great work! Milestone completed successfully.");
    },
  });

  if (isLoading) {
    return (
      <AppShell>
        <div className="max-w-4xl mx-auto space-y-6">
          <Skeleton className="h-10 w-96" />
          <Skeleton className="h-96 w-full" />
        </div>
      </AppShell>
    );
  }

  if (!milestone) {
    return (
      <AppShell>
        <div className="max-w-4xl mx-auto text-center py-20">
          <h2 className="text-2xl font-bold">Milestone Not Found</h2>
        </div>
      </AppShell>
    );
  }

  const handleComplete = () => {
    if (!progress) return;
    completeMilestone.mutate({
      milestoneId,
      questProgressId: progress.id,
      submission: submission || undefined,
      score: 85,
    });
  };

  const mp = progress?.milestoneProgress.find((m) => m.milestoneId === milestoneId);
  const isCompleted = mp?.status === "completed";

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link href={`/quest/${questId}`}>
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <p className="text-sm text-muted-foreground">{milestone.quest.title}</p>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              {milestone.title}
              {milestone.type === "boss-battle" && <Swords className="h-6 w-6 text-primary" />}
            </h1>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Badge variant="outline">{milestone.type}</Badge>
            <Badge>{milestone.xpReward} XP</Badge>
          </div>
        </div>

        {/* Content */}
        <Card>
          <CardContent className="p-8 prose prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {milestone.content}
            </ReactMarkdown>
          </CardContent>
        </Card>

        {/* Submission */}
        {!isCompleted && (
          <Card>
            <CardHeader>
              <CardTitle>
                {milestone.type === "boss-battle" ? "Boss Battle Submission" : "Submit Your Work"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Paste your code, write your answer, or describe what you've built..."
                value={submission}
                onChange={(e) => setSubmission(e.target.value)}
                rows={8}
                className="font-mono"
              />
              <Button
                size="lg"
                onClick={handleComplete}
                disabled={completeMilestone.isPending}
              >
                {completeMilestone.isPending ? (
                  <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Evaluating...</>
                ) : (
                  <><CheckCircle2 className="h-4 w-4 mr-2" /> Complete Milestone</>
                )}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Feedback */}
        {(feedback || isCompleted) && (
          <Card className="border-accent">
            <CardContent className="p-6 flex items-start gap-3">
              <CheckCircle2 className="h-6 w-6 text-accent shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-accent">Milestone Complete!</h3>
                <p className="text-muted-foreground mt-1">
                  {feedback ?? mp?.aiFeedback ?? "Well done! Moving on to the next milestone."}
                </p>
                <Link href={`/quest/${questId}`}>
                  <Button size="sm" className="mt-3">
                    Back to Quest
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AppShell>
  );
}
