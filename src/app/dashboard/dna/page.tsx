"use client";

import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { DnaRadarChart } from "@/components/dashboard/dna-radar-chart";
import { useTRPC } from "@/lib/trpc";
import { useQuery } from "@tanstack/react-query";
import { Dna, Brain, Palette, Wrench, Users, Building2, Compass } from "lucide-react";

const dimensionMeta = [
  { key: "analytical", label: "Analytical", icon: Brain, description: "Logical reasoning, problem decomposition, pattern recognition" },
  { key: "creative", label: "Creative", icon: Palette, description: "Divergent thinking, originality, artistic expression" },
  { key: "practical", label: "Practical", icon: Wrench, description: "Hands-on building, prototyping, pragmatic solutions" },
  { key: "social", label: "Social", icon: Users, description: "Collaboration, communication, teaching and mentoring" },
  { key: "structural", label: "Structural", icon: Building2, description: "Organization, systems thinking, architecture" },
  { key: "explorative", label: "Explorative", icon: Compass, description: "Curiosity-driven, cross-disciplinary, experimental" },
];

export default function DnaPage() {
  const trpc = useTRPC();
  const { data: dna, isLoading } = useQuery(trpc.dna.get.queryOptions());

  if (isLoading) {
    return (
      <AppShell>
        <div className="max-w-4xl mx-auto space-y-6">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-96" />
        </div>
      </AppShell>
    );
  }

  if (!dna) {
    return (
      <AppShell>
        <div className="max-w-4xl mx-auto text-center py-20">
          <Dna className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold">No DNA Profile Yet</h2>
          <p className="text-muted-foreground mt-2">Complete the onboarding assessment to generate your Learning DNA.</p>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Dna className="h-8 w-8 text-primary" />
            My Learning DNA
          </h1>
          <p className="text-muted-foreground mt-1">Your unique cognitive profile across 6 dimensions</p>
        </div>

        {/* Radar Chart */}
        <Card>
          <CardContent className="p-8 flex justify-center">
            <DnaRadarChart dna={dna} size={400} />
          </CardContent>
        </Card>

        {/* Dimensions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dimensionMeta.map((d) => {
            const value = (dna as any)[d.key] as number;
            return (
              <Card key={d.key}>
                <CardContent className="flex items-start gap-4 p-5">
                  <div className="h-10 w-10 rounded-lg border-2 border-foreground bg-primary/10 flex items-center justify-center shrink-0">
                    <d.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold">{d.label}</h3>
                      <Badge variant="outline" className="font-mono">{value}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{d.description}</p>
                    <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${value}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Preferences */}
        <Card>
          <CardHeader>
            <CardTitle>Learning Preferences</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Badge variant="secondary" className="text-sm px-3 py-1">
              Pace: {dna.pacePreference}
            </Badge>
            <Badge variant="secondary" className="text-sm px-3 py-1">
              Depth: {dna.depthPreference}
            </Badge>
            <Badge variant="secondary" className="text-sm px-3 py-1">
              Style: {dna.stylePreference}
            </Badge>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
