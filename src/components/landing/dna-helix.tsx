"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
}

export function DnaHelix() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;
    const particles: Particle[] = [];

    const colors = [
      "hsl(262, 80%, 60%)",
      "hsl(172, 66%, 50%)",
      "hsl(220, 90%, 65%)",
      "hsl(280, 80%, 70%)",
      "hsl(25, 95%, 65%)",
      "hsl(340, 80%, 65%)",
    ];

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    window.addEventListener("resize", resize);

    const addParticle = (x: number, y: number, color: string) => {
      particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        life: 0,
        maxLife: 40 + Math.random() * 40,
        color,
      });
    };

    const animate = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      time += 0.015;
      const centerX = w / 2;
      const amplitude = Math.min(w * 0.15, 120);
      const numPoints = 20;
      const spacing = h / numPoints;

      const strand1: { x: number; y: number }[] = [];
      const strand2: { x: number; y: number }[] = [];

      for (let i = 0; i <= numPoints; i++) {
        const y = i * spacing;
        const phase = time + i * 0.35;
        const x1 = centerX + Math.sin(phase) * amplitude;
        const x2 = centerX + Math.sin(phase + Math.PI) * amplitude;
        strand1.push({ x: x1, y });
        strand2.push({ x: x2, y });
      }

      // Draw rungs
      for (let i = 0; i < strand1.length; i++) {
        const rungAlpha = 0.15 + 0.15 * Math.sin(time + i * 0.5);
        const color = colors[i % colors.length];
        ctx.beginPath();
        ctx.moveTo(strand1[i].x, strand1[i].y);
        ctx.lineTo(strand2[i].x, strand2[i].y);
        ctx.strokeStyle = color;
        ctx.globalAlpha = rungAlpha;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.globalAlpha = 1;

        if (Math.random() < 0.02) {
          const mx = (strand1[i].x + strand2[i].x) / 2;
          const my = (strand1[i].y + strand2[i].y) / 2;
          addParticle(mx, my, color);
        }
      }

      // Draw strands
      ctx.globalAlpha = 0.6;
      ctx.lineWidth = 3;
      ctx.beginPath();
      strand1.forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
      ctx.strokeStyle = "hsl(262, 80%, 60%)";
      ctx.stroke();

      ctx.beginPath();
      strand2.forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
      ctx.strokeStyle = "hsl(172, 66%, 50%)";
      ctx.stroke();
      ctx.globalAlpha = 1;

      // Draw nodes
      [...strand1, ...strand2].forEach((p, i) => {
        const color = i < strand1.length ? "hsl(262, 80%, 60%)" : "hsl(172, 66%, 50%)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.8;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        const alpha = 1 - p.life / p.maxLife;
        if (alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha * 0.5;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
}
