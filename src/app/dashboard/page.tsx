"use client";

import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { DnaRadarChart } from "@/components/dashboard/dna-radar-chart";
import { useTRPC } from "@/lib/trpc";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { formatXp } from "@/lib/utils";
import {
  Dna,
  Swords,
  Trophy,
  Flame,
  ArrowRight,
  Compass,
  Bot,
  Zap,
} from "lucide-react";

export default function DashboardPage() {
  const trpc = useTRPC();

  const { data: user, isLoading: userLoading } = useQuery(
    trpc.user.me.queryOptions()
  );
  const { data: dna, isLoading: dnaLoading } = useQuery(
    trpc.dna.get.queryOptions()
  );
  const { data: activeQuests, isLoading: questsLoading } = useQuery(
    trpc.quest.myActiveQuests.queryOptions()
  );
  const { data: xpData } = useQuery(trpc.xp.myTotal.queryOptions());

  if (userLoading) {
    return (
      <AppShell>
        <div className="max-w-6xl mx-auto space-y-6">
          <Skeleton className="h-10 w-64" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Skeleton className="h-28" />
            <Skeleton className="h-28" />
            <Skeleton className="h-28" />
          </div>
          <Skeleton className="h-80" />
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Welcome */}
        <div>
          <h1 className="text-3xl font-bold">
            Welcome back, {user?.name?.split(" ")[0] ?? "Learner"}
          </h1>
          <p className="text-muted-foreground mt-1">
            Here&apos;s your learning overview
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="flex items-center gap-4 p-5">
              <div className="h-12 w-12 rounded-lg border-2 border-foreground bg-primary flex items-center justify-center shadow-brutal-sm">
                <Trophy className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {formatXp(xpData?.xp ?? user?.xp ?? 0)}
                </p>
                <p className="text-sm text-muted-foreground">Total XP</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 p-5">
              <div className="h-12 w-12 rounded-lg border-2 border-foreground bg-accent flex items-center justify-center shadow-brutal-sm">
                <Flame className="h-6 w-6 text-accent-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {xpData?.streak ?? user?.streak ?? 0}
                </p>
                <p className="text-sm text-muted-foreground">Day Streak</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 p-5">
              <div className="h-12 w-12 rounded-lg border-2 border-foreground bg-dna-creative flex items-center justify-center shadow-brutal-sm">
                <Swords className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {activeQuests?.length ?? 0}
                </p>
                <p className="text-sm text-muted-foreground">Active Quests</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* DNA Preview */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Dna className="h-5 w-5 text-primary" />
                Learning DNA
              </CardTitle>
              <Link href="/dashboard/dna">
                <Button variant="ghost" size="sm">
                  Full View <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {dnaLoading ? (
                <Skeleton className="h-64" />
              ) : dna ? (
                <DnaRadarChart dna={dna} size={280} />
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No DNA profile yet</p>
                  <Link href="/onboarding">
                    <Button size="sm" className="mt-2">
                      Take Assessment
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Active Quests */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Swords className="h-5 w-5 text-accent" />
                Active Quests
              </CardTitle>
              <Link href="/explore">
                <Button variant="ghost" size="sm">
                  Explore <Compass className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {questsLoading ? (
                <div className="space-y-3">
                  <Skeleton className="h-16" />
                  <Skeleton className="h-16" />
                </div>
              ) : activeQuests && activeQuests.length > 0 ? (
                <div className="space-y-3">
                  {activeQuests.map((qp) => {
                    const completed =
                      qp.milestoneProgress?.filter(
                        (m) => m.status === "completed"
                      ).length ?? 0;
                    const total = qp.quest._count.milestones ?? 1;
                    return (
                      <Link key={qp.id} href={`/quest/${qp.questId}`}>
                        <div className="p-3 rounded-lg border-2 border-border hover:border-primary transition-colors space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="font-bold text-sm">
                              {qp.quest.title}
                            </h4>
                            <Badge variant="outline" className="text-xs">
                              {qp.quest.category}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Progress value={completed} max={total} className="flex-1 h-1.5" />
                            <span>
                              {completed}/{total}
                            </span>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No active quests</p>
                  <Link href="/explore">
                    <Button size="sm" className="mt-2">
                      Find a Quest
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/explore">
            <Card className="hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal-lg transition-all cursor-pointer">
              <CardContent className="p-4 flex items-center gap-3">
                <Compass className="h-5 w-5 text-primary" />
                <span className="font-medium text-sm">Explore Quests</span>
              </CardContent>
            </Card>
          </Link>
          <Link href="/mentor">
            <Card className="hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal-lg transition-all cursor-pointer">
              <CardContent className="p-4 flex items-center gap-3">
                <Bot className="h-5 w-5 text-primary" />
                <span className="font-medium text-sm">AI Mentor</span>
              </CardContent>
            </Card>
          </Link>
          <Link href="/leaderboard">
            <Card className="hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal-lg transition-all cursor-pointer">
              <CardContent className="p-4 flex items-center gap-3">
                <Trophy className="h-5 w-5 text-yellow-500" />
                <span className="font-medium text-sm">Leaderboard</span>
              </CardContent>
            </Card>
          </Link>
          <Link href="/create">
            <Card className="hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal-lg transition-all cursor-pointer">
              <CardContent className="p-4 flex items-center gap-3">
                <Zap className="h-5 w-5 text-accent" />
                <span className="font-medium text-sm">Create Quest</span>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
