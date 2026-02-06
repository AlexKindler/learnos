"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useTRPC } from "@/lib/trpc";
import { useMutation } from "@tanstack/react-query";
import { PlusCircle, Trash2, ArrowRight, Loader2, Swords, GraduationCap } from "lucide-react";
import { slugify } from "@/lib/utils";
interface MilestoneForm {
  title: string;
  description: string;
  content: string;
  type: string;
  xpReward: number;
}

export default function CreateQuestPage() {
  const router = useRouter();
  const trpc = useTRPC();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Programming");
  const [difficulty, setDifficulty] = useState("beginner");
  const [duration, setDuration] = useState("1 week");
  const [xpReward, setXpReward] = useState(100);
  const [milestones, setMilestones] = useState<MilestoneForm[]>([
    { title: "", description: "", content: "", type: "lesson", xpReward: 25 },
  ]);

  const createQuest = useMutation({
    ...trpc.quest.create.mutationOptions(),
    onSuccess: (quest) => router.push(`/quest/${quest.id}`),
  });

  const addMilestone = () => {
    setMilestones([...milestones, { title: "", description: "", content: "", type: "lesson", xpReward: 25 }]);
  };

  const removeMilestone = (idx: number) => {
    setMilestones(milestones.filter((_, i) => i !== idx));
  };

  const updateMilestone = (idx: number, field: keyof MilestoneForm, value: string | number) => {
    const updated = [...milestones];
    (updated[idx] as any)[field] = value;
    setMilestones(updated);
  };

  const handleSubmit = () => {
    createQuest.mutate({
      title,
      slug: slugify(title),
      description,
      category,
      difficulty,
      duration,
      xpReward,
      milestones: milestones.map((m, i) => ({ ...m, order: i })),
    });
  };

  const categories = ["Programming", "Design", "Data Science", "Writing", "Business", "Math"];

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <PlusCircle className="h-8 w-8 text-primary" />
            Create a Quest
          </h1>
          <p className="text-muted-foreground mt-1">Design a learning quest for the community</p>
        </div>

        {/* Quest Details */}
        <Card>
          <CardHeader>
            <CardTitle>Quest Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Quest title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Textarea placeholder="Quest description" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full h-10 rounded-md border-2 border-foreground bg-background px-3 text-sm shadow-brutal-sm">
                  {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Difficulty</label>
                <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="w-full h-10 rounded-md border-2 border-foreground bg-background px-3 text-sm shadow-brutal-sm">
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="Duration (e.g. 2 weeks)" value={duration} onChange={(e) => setDuration(e.target.value)} />
              <Input type="number" placeholder="XP Reward" value={xpReward} onChange={(e) => setXpReward(Number(e.target.value))} />
            </div>
          </CardContent>
        </Card>

        {/* Milestones */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Milestones</h2>
            <Button variant="outline" size="sm" onClick={addMilestone}>
              <PlusCircle className="h-4 w-4 mr-1" /> Add Milestone
            </Button>
          </div>
          {milestones.map((m, idx) => (
            <Card key={idx}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base">
                  Milestone {idx + 1}
                  {idx === milestones.length - 1 && milestones.length > 1 && (
                    <Badge variant="outline" className="ml-2 text-xs">Boss Battle?</Badge>
                  )}
                </CardTitle>
                {milestones.length > 1 && (
                  <Button variant="ghost" size="icon" onClick={() => removeMilestone(idx)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                )}
              </CardHeader>
              <CardContent className="space-y-3">
                <Input placeholder="Milestone title" value={m.title} onChange={(e) => updateMilestone(idx, "title", e.target.value)} />
                <Input placeholder="Short description" value={m.description} onChange={(e) => updateMilestone(idx, "description", e.target.value)} />
                <Textarea placeholder="Content (Markdown supported)" value={m.content} onChange={(e) => updateMilestone(idx, "content", e.target.value)} rows={6} className="font-mono text-sm" />
                <div className="flex gap-3">
                  <select value={m.type} onChange={(e) => updateMilestone(idx, "type", e.target.value)} className="h-9 rounded-md border-2 border-foreground bg-background px-3 text-sm">
                    <option value="lesson">Lesson</option>
                    <option value="exercise">Exercise</option>
                    <option value="boss-battle">Boss Battle</option>
                  </select>
                  <Input type="number" value={m.xpReward} onChange={(e) => updateMilestone(idx, "xpReward", Number(e.target.value))} className="w-24" placeholder="XP" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button
          size="lg"
          className="w-full"
          onClick={handleSubmit}
          disabled={!title || !description || milestones.some((m) => !m.title) || createQuest.isPending}
        >
          {createQuest.isPending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Swords className="h-4 w-4 mr-2" />}
          Create Quest
        </Button>
      </div>
    </AppShell>
  );
}
