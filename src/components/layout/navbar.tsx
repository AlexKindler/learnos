"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Dna, Sun, Moon, Menu, X, LogOut } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-foreground bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 mx-auto max-w-7xl">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="h-8 w-8 rounded-md border-2 border-foreground bg-primary flex items-center justify-center shadow-brutal-sm">
            <Dna className="h-5 w-5 text-primary-foreground" />
          </div>
          <span>LearnOS</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {session ? (
            <>
              <Link href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">Dashboard</Link>
              <Link href="/explore" className="text-sm font-medium hover:text-primary transition-colors">Explore</Link>
              <Link href="/mentor" className="text-sm font-medium hover:text-primary transition-colors">AI Mentor</Link>
              <Link href="/leaderboard" className="text-sm font-medium hover:text-primary transition-colors">Leaderboard</Link>
            </>
          ) : (
            <>
              <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">Features</a>
              <a href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">How It Works</a>
            </>
          )}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
          {session ? (
            <div className="flex items-center gap-3">
              <Link href="/dashboard">
                <Avatar>
                  <AvatarImage src={session.user?.image ?? undefined} />
                  <AvatarFallback>{session.user?.name?.[0] ?? "U"}</AvatarFallback>
                </Avatar>
              </Link>
              <Button variant="ghost" size="icon" onClick={() => signOut()}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/sign-in"><Button variant="outline" size="sm">Sign In</Button></Link>
              <Link href="/sign-up"><Button size="sm">Get Started</Button></Link>
            </div>
          )}
        </div>

        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t-2 border-foreground bg-background p-4 space-y-3">
          {session ? (
            <>
              <Link href="/dashboard" className="block text-sm font-medium py-2" onClick={() => setMobileOpen(false)}>Dashboard</Link>
              <Link href="/explore" className="block text-sm font-medium py-2" onClick={() => setMobileOpen(false)}>Explore</Link>
              <Link href="/mentor" className="block text-sm font-medium py-2" onClick={() => setMobileOpen(false)}>AI Mentor</Link>
              <Button variant="ghost" size="sm" onClick={() => signOut()} className="w-full justify-start">
                <LogOut className="h-4 w-4 mr-2" /> Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link href="/sign-in" className="block" onClick={() => setMobileOpen(false)}><Button variant="outline" className="w-full">Sign In</Button></Link>
              <Link href="/sign-up" className="block" onClick={() => setMobileOpen(false)}><Button className="w-full">Get Started</Button></Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
