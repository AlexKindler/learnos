"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useTRPC } from "@/lib/trpc";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Settings, Save, Loader2, AlertTriangle } from "lucide-react";

export default function SettingsPage() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { data: user, isLoading } = useQuery(trpc.user.me.queryOptions());
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [initialized, setInitialized] = useState(false);

  if (user && !initialized) {
    setName(user.name ?? "");
    setUsername(user.username ?? "");
    setBio(user.bio ?? "");
    setInitialized(true);
  }

  const updateUser = useMutation({
    ...trpc.user.update.mutationOptions(),
    onSuccess: () => queryClient.invalidateQueries(),
  });

  const handleSave = () => {
    updateUser.mutate({
      name: name || undefined,
      username: username || undefined,
      bio: bio || undefined,
    });
  };

  if (isLoading) {
    return <AppShell><div className="max-w-2xl mx-auto space-y-6"><Skeleton className="h-96" /></div></AppShell>;
  }

  return (
    <AppShell>
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Settings className="h-8 w-8" />
            Settings
          </h1>
          <p className="text-muted-foreground mt-1">Manage your profile and preferences</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Update your public profile information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Display Name</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Username</label>
              <Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username" />
              <p className="text-xs text-muted-foreground">Your public profile URL: learnos.dev/profile/{username || "..."}</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Bio</label>
              <Textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Tell us about yourself" rows={3} />
            </div>
            <Button onClick={handleSave} disabled={updateUser.isPending}>
              {updateUser.isPending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
              Save Changes
            </Button>
            {updateUser.isSuccess && <p className="text-sm text-accent">Profile updated!</p>}
          </CardContent>
        </Card>

        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" /> Danger Zone
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Once you delete your account, there is no going back. All data will be permanently removed.
            </p>
            <Button variant="destructive" size="sm">Delete Account</Button>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
