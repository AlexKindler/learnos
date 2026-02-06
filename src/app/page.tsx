import Link from "next/link";
import { MarketingLayout } from "@/components/layout/marketing-layout";
import { DnaHelix } from "@/components/landing/dna-helix";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dna, Brain, Users, Swords, Sparkles, Target, Zap, ArrowRight } from "lucide-react";

const features = [
  {
    icon: Dna,
    title: "Learning DNA",
    description: "AI maps your unique learning profile across 6 cognitive dimensions. Your DNA evolves as you learn.",
    color: "text-primary",
  },
  {
    icon: Swords,
    title: "Quest-Based Learning",
    description: "Replace boring courses with epic quests. Complete milestones, face boss battles, and earn XP.",
    color: "text-accent",
  },
  {
    icon: Brain,
    title: "AI Mentor",
    description: "A personal Claude-powered mentor that knows your DNA, your progress, and adapts in real-time.",
    color: "text-dna-creative",
  },
  {
    icon: Users,
    title: "Peer Constellations",
    description: "AI matches you with complementary learners. Collaborate in real-time constellation workspaces.",
    color: "text-dna-social",
  },
  {
    icon: Target,
    title: "Skill Graph",
    description: "Interactive force-directed graph visualizes every skill you've built. Watch your network grow.",
    color: "text-dna-analytical",
  },
  {
    icon: Sparkles,
    title: "Adaptive Difficulty",
    description: "Content adapts to your level. Struggling? Get more scaffolding. Flying? Face harder challenges.",
    color: "text-dna-explorative",
  },
];

const steps = [
  { step: "01", title: "Discover Your DNA", description: "Take a quick AI-powered assessment. Claude analyzes your responses to map your learning profile." },
  { step: "02", title: "Choose Your Quest", description: "Browse quests matched to your DNA. Each quest is a hands-on project with milestones and boss battles." },
  { step: "03", title: "Learn & Level Up", description: "Complete milestones, chat with your AI mentor, earn XP, and watch your skill graph expand." },
];

export default function HomePage() {
  return (
    <MarketingLayout>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <DnaHelix />
        <div className="container mx-auto max-w-7xl px-4 relative z-10">
          <div className="max-w-3xl space-y-6">
            <Badge variant="secondary" className="text-sm">
              <Zap className="h-3 w-3 mr-1" /> Now in Beta
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
              Your Learning{" "}
              <span className="text-primary">DNA</span>{" "}
              is Unique.{" "}
              <span className="text-accent">Your Education</span>{" "}
              Should Be Too.
            </h1>
            <p className="text-xl text-muted-foreground max-w-xl">
              LearnOS maps your cognitive profile, matches you with AI-powered quests, and connects you with peer constellations. This isn&apos;t a course platform — it&apos;s an operating system for learning.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/sign-up">
                <Button size="lg" className="text-lg px-8">
                  Map Your DNA <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="#features">
                <Button variant="outline" size="lg" className="text-lg px-8">
                  See How It Works
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-card/50">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-16 space-y-4">
            <Badge>Features</Badge>
            <h2 className="text-4xl md:text-5xl font-bold">
              Everything You Need to Learn <span className="text-primary">Differently</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A complete adaptive learning ecosystem built around your unique cognitive profile.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <Card key={f.title} className="hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal-lg transition-all duration-200">
                <CardContent className="p-6 space-y-3">
                  <f.icon className={`h-10 w-10 ${f.color}`} />
                  <h3 className="text-xl font-bold">{f.title}</h3>
                  <p className="text-muted-foreground">{f.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-16 space-y-4">
            <Badge variant="secondary">How It Works</Badge>
            <h2 className="text-4xl md:text-5xl font-bold">
              Three Steps to <span className="text-accent">Smarter Learning</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((s) => (
              <div key={s.step} className="space-y-4">
                <div className="h-16 w-16 rounded-lg border-2 border-foreground bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold shadow-brutal">
                  {s.step}
                </div>
                <h3 className="text-2xl font-bold">{s.title}</h3>
                <p className="text-muted-foreground">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-7xl px-4 text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold">Ready to Discover Your Learning DNA?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Join thousands of learners who have replaced traditional courses with adaptive, AI-powered quests.
          </p>
          <Link href="/sign-up">
            <Button size="lg" variant="outline" className="text-lg px-8 bg-white text-primary border-white hover:bg-white/90">
              Start Free <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </MarketingLayout>
  );
}
