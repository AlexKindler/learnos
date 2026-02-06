import Link from "next/link";
import { Dna } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t-2 border-foreground bg-card">
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
              <div className="h-7 w-7 rounded-md border-2 border-foreground bg-primary flex items-center justify-center shadow-brutal-sm">
                <Dna className="h-4 w-4 text-primary-foreground" />
              </div>
              LearnOS
            </Link>
            <p className="text-sm text-muted-foreground">
              Adaptive, project-based learning powered by your unique Learning DNA.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-3">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/explore" className="hover:text-foreground transition-colors">Explore Quests</Link></li>
              <li><Link href="/leaderboard" className="hover:text-foreground transition-colors">Leaderboard</Link></li>
              <li><Link href="/mentor" className="hover:text-foreground transition-colors">AI Mentor</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">API</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Community</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} LearnOS. Built with AI, for humans who love to learn.
        </div>
      </div>
    </footer>
  );
}
