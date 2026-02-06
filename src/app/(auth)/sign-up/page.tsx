"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Dna, Github, Mail, Loader2 } from "lucide-react";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState<string | null>(null);

  const handleOAuth = async (provider: string) => {
    setLoading(provider);
    await signIn(provider, { callbackUrl: "/onboarding" });
  };

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading("email");
    await signIn("resend", { email, callbackUrl: "/onboarding" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 font-bold text-2xl">
            <div className="h-10 w-10 rounded-md border-2 border-foreground bg-primary flex items-center justify-center shadow-brutal">
              <Dna className="h-6 w-6 text-primary-foreground" />
            </div>
            LearnOS
          </Link>
          <p className="text-muted-foreground">Create your account and discover your Learning DNA</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Get Started</CardTitle>
            <CardDescription>Choose how you&apos;d like to create your account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full" onClick={() => handleOAuth("github")} disabled={loading !== null}>
              {loading === "github" ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Github className="h-4 w-4 mr-2" />}
              Continue with GitHub
            </Button>
            <Button variant="outline" className="w-full" onClick={() => handleOAuth("google")} disabled={loading !== null}>
              {loading === "google" ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
              Continue with Google
            </Button>

            <div className="relative">
              <Separator />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">or</span>
            </div>

            <form onSubmit={handleEmail} className="space-y-3">
              <Input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <Button type="submit" className="w-full" disabled={loading !== null}>
                {loading === "email" ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Mail className="h-4 w-4 mr-2" />}
                Sign Up with Email
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-primary font-medium hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
