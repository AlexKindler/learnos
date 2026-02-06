"use client";

import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useTRPC } from "@/lib/trpc";
import { useQuery } from "@tanstack/react-query";
import { Trophy, Medal, Flame } from "lucide-react";
import { formatXp } from "@/lib/utils";
import Link from "next/link";

export default function LeaderboardPage() {
  const trpc = useTRPC();
  const { data: users, isLoading } = useQuery(trpc.user.leaderboard.queryOptions({ limit: 50 }));

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Trophy className="h-8 w-8 text-yellow-500" />
            Leaderboard
          </h1>
          <p className="text-muted-foreground mt-1">Top learners by XP</p>
        </div>

        <Card>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-4 space-y-3">
                { [...Array(10)].map((_, i) => <Skeleton key={i} className="h-14" />)}
              </div>
            ) : users && users.length > 0 ? (
              <div className="divide-y divide-border">
                {users.map((user, idx) => (
                  <Link key={user.id} href={user.username ? `/profile/${user.username}` : "#"}>
                    <div className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors">
                      <div className="w-8 text-center font-bold text-lg">
                        {idx === 0 ? <Medal className="h-6 w-6 text-yellow-500 mx-auto" /> :
                         idx === 1 ? <Medal className="h-6 w-6 text-gray-400 mx-auto" /> :
                         idx === 2 ? <Medal className="h-6 w-6 text-amber-700 mx-auto" /> :
                         <span className="text-muted-foreground">{idx + 1}</span>}
                      </div>
                      <Avatar>
                        <AvatarImage src={user.image ?? undefined} />
                        <AvatarFallback>{user.name?.[0] ?? "?"}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-bold">{user.name ?? "Anonymous"}</p>
                        {user.username && <p className="text-xs text-muted-foreground">@{user.username}</p>}
                      </div>
                      <div className="flex items-center gap-3">
                        {user.streak > 0 && (
                          <Badge variant="secondary" className="text-xs">
                            <Flame className="h-3 w-3 mr-1 text-orange-500" /> {user.streak}
                          </Badge>
                        )}
                        <Badge className="font-mono">{formatXp(user.xp)} XP</Badge>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">No learners yet</div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
