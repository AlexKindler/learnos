"use client";

import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { DnaRadarChart } from "@/components/dashboard/dna-radar-chart";
import { useTRPC } from "@/lib/trpc";
import { useQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/layout/navbar";
import { Trophy, Calendar, Swords } from "lucide-react";
import { formatXp } from "@/lib/utils";

export default function PublicProfilePage() {
  const params = useParams();
  const username = params.username as string;
  const trpc = useTRPC();

  const { data: profile, isLoading } = useQuery(trpc.user.publicProfile.queryOptions({ username }));

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-4xl mx-auto p-8 space-y-6">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-4xl mx-auto p-8 text-center py-20">
          <h2 className="text-2xl font-bold">User Not Found</h2>
          <p className="text-muted-foreground mt-2">No user with username @{username}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto p-8 space-y-8">
        {/* Profile Header */}
        <Card>
          <CardContent className="flex items-center gap-6 p-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={profile.image ?? undefined} />
              <AvatarFallback className="text-3xl">{profile.name?.[0] ?? "?"}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-3xl font-bold">{profile.name}</h1>
              <p className="text-muted-foreground">@{profile.username}</p>
              {profile.bio && <p className="mt-2">{profile.bio}</p>}
              <div className="flex items-center gap-4 mt-3">
                <Badge className="text-sm"><Trophy className="h-3 w-3 mr-1" /> {formatXp(profile.xp)} XP</Badge>
                <Badge variant="secondary" className="text-sm">
                  <Calendar className="h-3 w-3 mr-1" />
                  Joined {new Date(profile.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* DNA */}
          {profile.learningDna && (
            <Card>
              <CardHeader><CardTitle>Learning DNA</CardTitle></CardHeader>
              <CardContent>
                <DnaRadarChart dna={profile.learningDna} size={300} />
              </CardContent>
            </Card>
          )}

          {/* Credentials */}
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Swords className="h-5 w-5" /> Completed Quests</CardTitle></CardHeader>
            <CardContent>
              {profile.credentialNodes.length > 0 ? (
                <div className="space-y-3">
                  {profile.credentialNodes.map((cred) => (
                    <div key={cred.quest.id} className="flex items-center gap-3 p-3 rounded-lg border border-border">
                      <div className="flex-1">
                        <h4 className="font-bold text-sm">{cred.quest.title}</h4>
                        <Badge variant="outline" className="text-xs mt-1">{cred.quest.category}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-4">No completed quests yet</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
