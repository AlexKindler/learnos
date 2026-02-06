"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DnaRadarChart } from "@/components/dashboard/dna-radar-chart";
import { useTRPC } from "@/lib/trpc";
import { useMutation } from "@tanstack/react-query";
import { Dna, ArrowRight, ArrowLeft, Sparkles, Brain, Palette, Wrench, Users, Building2, Compass, Loader2 } from "lucide-react";

const interests = [
  { id: "coding", label: "Coding & Programming", icon: "💻" },
  { id: "design", label: "Design & Creativity", icon: "🎨" },
  { id: "data", label: "Data & Analytics", icon: "📊" },
  { id: "writing", label: "Writing & Content", icon: "✍️" },
  { id: "business", label: "Business & Strategy", icon: "📈" },
  { id: "science", label: "Science & Research", icon: "🔬" },
  { id: "math", label: "Math & Logic", icon: "🧮" },
  { id: "leadership", label: "Leadership & Teaching", icon: "🎯" },
];

const questions = [
  {
    question: "When faced with a complex problem, what's your first instinct?",
    options: [
      { text: "Break it into smaller parts and analyze each", dimension: "analytical", score: 85 },
      { text: "Brainstorm creative approaches", dimension: "creative", score: 80 },
      { text: "Start building a quick prototype", dimension: "practical", score: 85 },
      { text: "Discuss it with others to get perspectives", dimension: "social", score: 80 },
    ],
  },
  {
    question: "How do you prefer to learn a new programming language?",
    options: [
      { text: "Read the documentation thoroughly", dimension: "structural", score: 80 },
      { text: "Build a project from scratch", dimension: "practical", score: 90 },
      { text: "Study the language design philosophy", dimension: "explorative", score: 75 },
      { text: "Join a study group or pair program", dimension: "social", score: 85 },
    ],
  },
  {
    question: "What excites you most about a new project?",
    options: [
      { text: "Solving challenging technical puzzles", dimension: "analytical", score: 90 },
      { text: "Designing an elegant user experience", dimension: "creative", score: 85 },
      { text: "Seeing something work for the first time", dimension: "practical", score: 80 },
      { text: "Exploring cutting-edge technologies", dimension: "explorative", score: 85 },
    ],
  },
  {
    question: "When you encounter an error, you typically...",
    options: [
      { text: "Systematically debug with logs and breakpoints", dimension: "analytical", score: 85 },
      { text: "Try different approaches until something works", dimension: "explorative", score: 75 },
      { text: "Search for patterns and known solutions", dimension: "structural", score: 80 },
      { text: "Ask a colleague or check community forums", dimension: "social", score: 80 },
    ],
  },
  {
    question: "Your ideal workspace setup is...",
    options: [
      { text: "Clean, organized, everything has its place", dimension: "structural", score: 85 },
      { text: "Filled with inspiration boards and creative tools", dimension: "creative", score: 80 },
      { text: "Multiple monitors with tools ready to go", dimension: "practical", score: 75 },
      { text: "Open office with easy access to teammates", dimension: "social", score: 85 },
    ],
  },
  {
    question: "When reviewing someone else's code, you focus on...",
    options: [
      { text: "Logical correctness and edge cases", dimension: "analytical", score: 85 },
      { text: "Code architecture and patterns", dimension: "structural", score: 90 },
      { text: "Does it actually solve the problem?", dimension: "practical", score: 80 },
      { text: "Readability and how easy it is for the team", dimension: "social", score: 75 },
    ],
  },
  {
    question: "Your favorite type of content to consume is...",
    options: [
      { text: "Deep technical papers and case studies", dimension: "analytical", score: 80 },
      { text: "Design showcases and creative portfolios", dimension: "creative", score: 85 },
      { text: "Tutorials and hands-on workshops", dimension: "practical", score: 85 },
      { text: "Cross-disciplinary talks (TED, etc.)", dimension: "explorative", score: 90 },
    ],
  },
  {
    question: "If you could master one skill overnight, it would be...",
    options: [
      { text: "Advanced algorithm design", dimension: "analytical", score: 90 },
      { text: "Product design and UX", dimension: "creative", score: 85 },
      { text: "Full-stack engineering", dimension: "practical", score: 85 },
      { text: "Technical leadership and mentoring", dimension: "social", score: 80 },
    ],
  },
];

type Step = "welcome" | "interests" | "quiz" | "reveal";

export default function OnboardingPage() {
  const router = useRouter();
  const trpc = useTRPC();
  const [step, setStep] = useState<Step>("welcome");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState<Record<string, number[]>>({
    analytical: [], creative: [], practical: [], social: [], structural: [], explorative: [],
  });
  const [finalDna, setFinalDna] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const saveDna = useMutation(trpc.dna.saveDna.mutationOptions());

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleAnswer = (option: { dimension: string; score: number }) => {
    setScores((prev) => ({
      ...prev,
      [option.dimension]: [...prev[option.dimension], option.score],
    }));

    if (currentQ < questions.length - 1) {
      setCurrentQ((q) => q + 1);
    } else {
      generateDna();
    }
  };

  const generateDna = async () => {
    setIsGenerating(true);
    // Aggregate scores
    const avg = (arr: number[]) =>
      arr.length > 0 ? Math.round(arr.reduce((a, b) => a + b, 0) / arr.length) : 50;

    const dna = {
      analytical: Math.min(100, avg(scores.analytical) + Math.floor(Math.random() * 10)),
      creative: Math.min(100, avg(scores.creative) + Math.floor(Math.random() * 10)),
      practical: Math.min(100, avg(scores.practical) + Math.floor(Math.random() * 10)),
      social: Math.min(100, avg(scores.social) + Math.floor(Math.random() * 10)),
      structural: Math.min(100, avg(scores.structural) + Math.floor(Math.random() * 10)),
      explorative: Math.min(100, avg(scores.explorative) + Math.floor(Math.random() * 10)),
      pacePreference: "moderate",
      depthPreference: "balanced",
      stylePreference: "mixed",
    };

    // Adjust based on interests
    if (selectedInterests.includes("coding")) dna.practical = Math.min(100, dna.practical + 10);
    if (selectedInterests.includes("design")) dna.creative = Math.min(100, dna.creative + 10);
    if (selectedInterests.includes("data")) dna.analytical = Math.min(100, dna.analytical + 10);
    if (selectedInterests.includes("leadership")) dna.social = Math.min(100, dna.social + 10);
    if (selectedInterests.includes("science")) dna.explorative = Math.min(100, dna.explorative + 10);

    setFinalDna(dna);
    setStep("reveal");
    setIsGenerating(false);

    try {
      await saveDna.mutateAsync(dna);
    } catch (err) {
      console.error("Failed to save DNA:", err);
    }
  };

  const totalSteps = 4;
  const currentStep = step === "welcome" ? 1 : step === "interests" ? 2 : step === "quiz" ? 3 : 4;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-2xl space-y-6">
        <Progress value={currentStep} max={totalSteps} className="h-2" />

        <AnimatePresence mode="wait">
          {step === "welcome" && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center space-y-6"
            >
              <div className="mx-auto h-24 w-24 rounded-2xl border-2 border-foreground bg-primary flex items-center justify-center shadow-brutal-lg">
                <Dna className="h-12 w-12 text-primary-foreground" />
              </div>
              <h1 className="text-4xl font-bold">Let&apos;s Discover Your Learning DNA</h1>
              <p className="text-lg text-muted-foreground max-w-md mx-auto">
                Answer a few questions so we can map your unique cognitive profile and personalize your learning experience.
              </p>
              <Button size="lg" onClick={() => setStep("interests")}>
                Let&apos;s Go <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          )}

          {step === "interests" && (
            <motion.div
              key="interests"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="text-center">
                <h2 className="text-3xl font-bold">What Are You Interested In?</h2>
                <p className="text-muted-foreground mt-2">Select all that apply</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {interests.map((i) => (
                  <button
                    key={i.id}
                    onClick={() => toggleInterest(i.id)}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      selectedInterests.includes(i.id)
                        ? "border-primary bg-primary/10 shadow-brutal-sm"
                        : "border-border hover:border-foreground"
                    }`}
                  >
                    <span className="text-2xl">{i.icon}</span>
                    <p className="font-medium mt-1">{i.label}</p>
                  </button>
                ))}
              </div>
              <div className="flex justify-between">
                <Button variant="ghost" onClick={() => setStep("welcome")}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button onClick={() => setStep("quiz")} disabled={selectedInterests.length === 0}>
                  Continue <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === "quiz" && (
            <motion.div
              key={`quiz-${currentQ}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-6"
            >
              <div className="text-center">
                <Badge variant="secondary">Question {currentQ + 1} of {questions.length}</Badge>
                <h2 className="text-2xl font-bold mt-4">{questions[currentQ].question}</h2>
              </div>
              <div className="space-y-3">
                {questions[currentQ].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(opt)}
                    disabled={isGenerating}
                    className="w-full p-4 rounded-lg border-2 border-border hover:border-primary hover:bg-primary/5 text-left font-medium transition-all"
                  >
                    {opt.text}
                  </button>
                ))}
              </div>
              {isGenerating && (
                <div className="text-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                  <p className="text-muted-foreground mt-2">Generating your Learning DNA...</p>
                </div>
              )}
            </motion.div>
          )}

          {step === "reveal" && finalDna && (
            <motion.div
              key="reveal"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="text-center">
                <Sparkles className="h-10 w-10 text-primary mx-auto mb-2" />
                <h2 className="text-3xl font-bold">Your Learning DNA</h2>
                <p className="text-muted-foreground mt-2">Here&apos;s your unique cognitive profile</p>
              </div>
              <Card>
                <CardContent className="p-8">
                  <DnaRadarChart dna={finalDna} size={350} />
                </CardContent>
              </Card>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { key: "analytical", label: "Analytical", icon: Brain },
                  { key: "creative", label: "Creative", icon: Palette },
                  { key: "practical", label: "Practical", icon: Wrench },
                  { key: "social", label: "Social", icon: Users },
                  { key: "structural", label: "Structural", icon: Building2 },
                  { key: "explorative", label: "Explorative", icon: Compass },
                ].map((d) => (
                  <div key={d.key} className="flex items-center gap-2 p-3 rounded-lg border-2 border-border">
                    <d.icon className="h-4 w-4 text-primary" />
                    <span className="font-medium text-sm">{d.label}</span>
                    <Badge variant="outline" className="ml-auto">{(finalDna as any)[d.key]}</Badge>
                  </div>
                ))}
              </div>
              <Button size="lg" className="w-full" onClick={() => router.push("/dashboard")}>
                Go to Dashboard <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
