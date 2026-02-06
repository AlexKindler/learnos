"use client";

import { useParams } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useTRPC } from "@/lib/trpc";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { Swords, CheckCircle2, Lock, Play, Circle, Trophy, Clock, Users as UsersIcon } from "lucide-react";

export default function QuestPage() {
  const params = useParams();
  const questId = params.questId as string;
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const { data: quest, isLoading } = useQuery(trpc.quest.getById.queryOptions({ id: questId }));
  const { data: progress } = useQuery(trpc.quest.myProgress.queryOptions({ questId }));
  const startQuest = useMutation({
    ...trpc.quest.start.mutationOptions(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: trpc.quest.myProgress.queryOptions({ questId }).queryKey });
    },
  });

  if (isLoading) {
    return (
      <AppShell>
        <div className="max-w-4xl mx-auto space-y-6">
          <Skeleton className="h-10 w-96" />
          <Skeleton className="h-48 w-full" />
        </div>
      </AppShell>
    );
  }

  if (!quest) {
    return (
      <AppShell>
        <div className="max-w-4xl mx-auto text-center py-20">
          <h2 className="text-2xl font-bold">Quest Not Found</h2>
        </div>
      </AppShell>
    );
  }

  const completed = progress?.milestoneProgress.filter((m) => m.status === "completed").length ?? 0;
  const total = quest.milestones.length;

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Quest Header */}
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge>{quest.category}</Badge>
                <Badge variant="outline">{quest.difficulty}</Badge>
              </div>
              <h1 className="text-4xl font-bold">{quest.title}</h1>
              <p className="text-muted-foreground">{quest.description}</p>
            </div>
            <div className="text-right space-y-1">
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" /> {quest.duration}
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <UsersIcon className="h-4 w-4" /> {quest._count.questProgress} learners
              </div>
              <Badge className="mt-1">
                <Trophy className="h-3 w-3 mr-1" /> {quest.xpReward} XP
              </Badge>
            </div>
          </div>

          {progress ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Progress</span>
                <span className="text-muted-foreground">{completed}/{total} milestones</span>
              </div>
              <Progress value={completed} max={total} />
            </div>
          ) : (
            <Button size="lg" onClick={() => startQuest.mutate({ questId })} disabled={startQuest.isPending}>
              <Swords className="h-5 w-5 mr-2" />
              {startQuest.isPending ? "Starting..." : "Start Quest"}
            </Button>
          )}
        </div>

        {/* Milestones */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Milestones</h2>
          {quest.milestones.map((milestone, idx) => {
            const mp = progress?.milestoneProgress.find((m) => m.milestoneId === milestone.id);
            const status = mp?.status ?? "locked";
            const StatusIcon = status === "completed" ? CheckCircle2 : status === "active" ? Play : status === "locked" ? Lock : Circle;

            return (
              <Card
                key={milestone.id}
                className={`transition-all ${status === "active" ? "border-primary" : ""} ${status === "locked" ? "opacity-60" : ""}`}
              >
                <CardContent className="flex items-center gap-4 p-4">
                  <div className={`h-10 w-10 rounded-full border-2 flex items-center justify-center ${
                    status === "completed" ? "border-accent bg-accent text-accent-foreground" :
                    status === "active" ? "border-primary bg-primary text-primary-foreground" :
                    "border-border bg-muted text-muted-foreground"
                  }`}>
                    <StatusIcon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold">{milestone.title}</h3>
                      <Badge variant="outline" className="text-xs">{milestone.type}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{milestone.description}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary" className="text-xs">{milestone.xpReward} XP</Badge>
                    {status === "active" && progress && (
                      <Link href={`/quest/${questId}/milestone/${milestone.id}`}>
                        <Button size="sm" className="mt-2">Open</Button>
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
