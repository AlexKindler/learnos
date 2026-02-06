import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { Providers } from "@/components/providers/providers";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: {
    default: "LearnOS — Adaptive Learning Platform",
    template: "%s | LearnOS",
  },
  description:
    "An adaptive, project-based education platform with AI-powered Learning DNA. Replace courses with quests, constellations, and an interactive skill graph.",
  keywords: ["education", "adaptive learning", "AI", "quests", "skill graph"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased grain`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
