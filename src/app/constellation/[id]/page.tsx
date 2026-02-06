"use client";

import { useParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useTRPC } from "@/lib/trpc";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Users, Send, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function ConstellationDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const [message, setMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data: constellation, isLoading } = useQuery(
    trpc.constellation.get.queryOptions({ id })
  );

  const sendMessage = useMutation({
    ...trpc.constellation.sendMessage.mutationOptions(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: trpc.constellation.get.queryOptions({ id }).queryKey,
      });
      setMessage("");
    },
  });

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [constellation?.messages]);

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

  if (!constellation) {
    return (
      <AppShell>
        <div className="max-w-4xl mx-auto text-center py-20">
          <h2 className="text-2xl font-bold">Constellation Not Found</h2>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto flex flex-col h-[calc(100vh-8rem)]">
        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <Link href="/constellation">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-xl font-bold flex items-center gap-2">
              <Users className="h-5 w-5 text-accent" />
              {constellation.name}
            </h1>
            {constellation.description && (
              <p className="text-sm text-muted-foreground">
                {constellation.description}
              </p>
            )}
          </div>
          <div className="flex -space-x-2">
            {constellation.members.map((m) => (
              <Avatar key={m.id} className="h-8 w-8 border-2 border-background">
                <AvatarImage src={m.user.image ?? undefined} />
                <AvatarFallback className="text-xs">
                  {m.user.name?.[0] ?? "?"}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
        </div>

        {/* Messages */}
        <Card className="flex-1 flex flex-col overflow-hidden">
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {constellation.messages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                No messages yet. Start the conversation!
              </div>
            ) : (
              constellation.messages.map((msg) => {
                const isMe = msg.userId === session?.user?.id;
                return (
                  <div
                    key={msg.id}
                    className={`flex gap-2 ${isMe ? "justify-end" : "justify-start"}`}
                  >
                    {!isMe && (
                      <Avatar className="h-7 w-7 shrink-0">
                        <AvatarImage src={msg.userImage ?? undefined} />
                        <AvatarFallback className="text-xs">
                          {msg.userName[0]}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`max-w-[75%] rounded-lg px-3 py-2 text-sm ${
                        isMe
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      {!isMe && (
                        <p className="text-xs font-bold mb-0.5">
                          {msg.userName}
                        </p>
                      )}
                      <p>{msg.content}</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Input */}
          <div className="border-t border-border p-3 flex gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              onKeyDown={(e) => {
                if (e.key === "Enter" && message.trim()) {
                  sendMessage.mutate({
                    constellationId: id,
                    content: message.trim(),
                  });
                }
              }}
            />
            <Button
              size="icon"
              onClick={() => {
                if (message.trim()) {
                  sendMessage.mutate({
                    constellationId: id,
                    content: message.trim(),
                  });
                }
              }}
              disabled={sendMessage.isPending || !message.trim()}
            >
              {sendMessage.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
