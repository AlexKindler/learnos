"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useTRPC } from "@/lib/trpc";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { Users, Plus, ArrowRight, MessageCircle, Loader2 } from "lucide-react";

export default function ConstellationsPage() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const [showCreate, setShowCreate] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { data: myConstellations, isLoading: myLoading } = useQuery(
    trpc.constellation.myConstellations.queryOptions()
  );
  const { data: allConstellations, isLoading: allLoading } = useQuery(
    trpc.constellation.list.queryOptions()
  );

  const createConstellation = useMutation({
    ...trpc.constellation.create.mutationOptions(),
    onSuccess: () => {
      queryClient.invalidateQueries();
      setShowCreate(false);
      setName("");
      setDescription("");
    },
  });

  const joinConstellation = useMutation({
    ...trpc.constellation.join.mutationOptions(),
    onSuccess: () => queryClient.invalidateQueries(),
  });

  const myIds = new Set(
    myConstellations?.map((m) => m.constellationId) ?? []
  );

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Users className="h-8 w-8 text-accent" />
              Constellations
            </h1>
            <p className="text-muted-foreground mt-1">
              Collaborate with complementary learners
            </p>
          </div>
          <Button onClick={() => setShowCreate(!showCreate)}>
            <Plus className="h-4 w-4 mr-2" /> Create
          </Button>
        </div>

        {/* Create Form */}
        {showCreate && (
          <Card>
            <CardHeader>
              <CardTitle>Create a Constellation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Constellation name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Textarea
                placeholder="Description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
              />
              <Button
                onClick={() =>
                  createConstellation.mutate({
                    name,
                    description: description || undefined,
                  })
                }
                disabled={!name || createConstellation.isPending}
              >
                {createConstellation.isPending ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : null}
                Create Constellation
              </Button>
            </CardContent>
          </Card>
        )}

        {/* My Constellations */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">My Constellations</h2>
          {myLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-20" />
              <Skeleton className="h-20" />
            </div>
          ) : myConstellations && myConstellations.length > 0 ? (
            <div className="space-y-3">
              {myConstellations.map((membership) => (
                <Link
                  key={membership.constellationId}
                  href={`/constellation/${membership.constellationId}`}
                >
                  <Card className="hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal-lg transition-all cursor-pointer">
                    <CardContent className="flex items-center gap-4 p-4">
                      <div className="h-10 w-10 rounded-full border-2 border-foreground bg-accent flex items-center justify-center shadow-brutal-sm">
                        <Users className="h-5 w-5 text-accent-foreground" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold">
                          {membership.constellation.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {membership.constellation._count.members} members
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">
              You haven&apos;t joined any constellations yet.
            </p>
          )}
        </div>

        {/* Discover */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Discover Constellations</h2>
          {allLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-20" />
              <Skeleton className="h-20" />
            </div>
          ) : allConstellations && allConstellations.length > 0 ? (
            <div className="space-y-3">
              {allConstellations
                .filter((c) => !myIds.has(c.id))
                .map((constellation) => (
                  <Card key={constellation.id}>
                    <CardContent className="flex items-center gap-4 p-4">
                      <div className="h-10 w-10 rounded-full border-2 border-foreground bg-muted flex items-center justify-center">
                        <Users className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold">{constellation.name}</h3>
                        {constellation.description && (
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {constellation.description}
                          </p>
                        )}
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {constellation.members.length}/
                            {constellation.maxMembers} members
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            <MessageCircle className="h-3 w-3 mr-1" />
                            {constellation._count.messages}
                          </Badge>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.preventDefault();
                          joinConstellation.mutate({
                            constellationId: constellation.id,
                          });
                        }}
                        disabled={
                          joinConstellation.isPending ||
                          constellation.members.length >=
                            constellation.maxMembers
                        }
                      >
                        {joinConstellation.isPending ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          "Join"
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              {allConstellations.filter((c) => !myIds.has(c.id)).length ===
                0 && (
                <p className="text-muted-foreground text-sm text-center py-4">
                  No other constellations to discover. Create one!
                </p>
              )}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm text-center py-4">
              No constellations yet. Be the first to create one!
            </p>
          )}
        </div>
      </div>
    </AppShell>
  );
}
