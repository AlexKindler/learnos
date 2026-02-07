"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useTRPC } from "@/lib/trpc";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Search, Compass, Clock, Users, Trophy, Filter } from "lucide-react";

const categories = ["All", "Programming", "Business", "Finance", "Design", "Data Science", "Math", "Science", "Leadership", "DevOps", "Writing"];
const difficulties = ["All", "beginner", "intermediate", "advanced"];

export default function ExplorePage() {
  const trpc = useTRPC();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [difficulty, setDifficulty] = useState("All");

  const { data, isLoading } = useQuery(
    trpc.quest.list.queryOptions({
      search: search || undefined,
      category: category === "All" ? undefined : category,
      difficulty: difficulty === "All" ? undefined : difficulty,
      limit: 20,
    })
  );

  return (
    <AppShell>
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Compass className="h-8 w-8 text-primary" />
            Explore Quests
          </h1>
          <p className="text-muted-foreground mt-1">Find your next learning adventure</p>
        </div>

        {/* Search & Filters */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search quests..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <Button
                key={c}
                variant={category === c ? "default" : "outline"}
                size="sm"
                onClick={() => setCategory(c)}
              >
                {c}
              </Button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {difficulties.map((d) => (
              <Button
                key={d}
                variant={difficulty === d ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setDifficulty(d)}
              >
                {d === "All" ? "All Levels" : d.charAt(0).toUpperCase() + d.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Quest Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-48" />)}
          </div>
        ) : data?.quests && data.quests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.quests.map((quest) => (
              <Link key={quest.id} href={`/quest/${quest.id}`}>
                <Card className="h-full hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal-lg transition-all cursor-pointer">
                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge>{quest.category}</Badge>
                      <Badge variant="outline">{quest.difficulty}</Badge>
                    </div>
                    <h3 className="text-lg font-bold">{quest.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{quest.description}</p>
                    <div className="flex items-center justify-between pt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {quest.duration}</span>
                      <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {quest._count.questProgress}</span>
                      <span className="flex items-center gap-1"><Trophy className="h-3 w-3" /> {quest.xpReward} XP</span>
                    </div>
                    {quest.creator && (
                      <p className="text-xs text-muted-foreground">by {quest.creator.name ?? quest.creator.username}</p>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Compass className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-bold">No Quests Found</h2>
            <p className="text-muted-foreground mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </AppShell>
  );
}
