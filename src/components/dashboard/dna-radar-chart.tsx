"use client";

import { useEffect, useRef } from "react";

interface DnaRadarChartProps {
  dna: {
    analytical: number;
    creative: number;
    practical: number;
    social: number;
    structural: number;
    explorative: number;
  };
  size?: number;
}

const dimensions = [
  { key: "analytical", label: "Analytical", color: "#6366f1" },
  { key: "creative", label: "Creative", color: "#f43f5e" },
  { key: "practical", label: "Practical", color: "#22c55e" },
  { key: "social", label: "Social", color: "#f59e0b" },
  { key: "structural", label: "Structural", color: "#3b82f6" },
  { key: "explorative", label: "Explorative", color: "#a855f7" },
];

export function DnaRadarChart({ dna, size = 300 }: DnaRadarChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;
    const maxR = size * 0.38;
    const n = dimensions.length;
    const angleStep = (Math.PI * 2) / n;
    const startAngle = -Math.PI / 2;

    ctx.clearRect(0, 0, size, size);

    // Draw grid rings
    const rings = [0.25, 0.5, 0.75, 1];
    rings.forEach((pct) => {
      ctx.beginPath();
      for (let i = 0; i <= n; i++) {
        const angle = startAngle + i * angleStep;
        const r = maxR * pct;
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = "rgba(128,128,128,0.2)";
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // Draw axes
    dimensions.forEach((_, i) => {
      const angle = startAngle + i * angleStep;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(angle) * maxR, cy + Math.sin(angle) * maxR);
      ctx.strokeStyle = "rgba(128,128,128,0.15)";
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // Draw data polygon
    const values = dimensions.map((d) => (dna as any)[d.key] / 100);
    ctx.beginPath();
    values.forEach((v, i) => {
      const angle = startAngle + i * angleStep;
      const r = maxR * v;
      const x = cx + Math.cos(angle) * r;
      const y = cy + Math.sin(angle) * r;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fillStyle = "rgba(139, 92, 246, 0.2)";
    ctx.fill();
    ctx.strokeStyle = "rgba(139, 92, 246, 0.8)";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw data points
    values.forEach((v, i) => {
      const angle = startAngle + i * angleStep;
      const r = maxR * v;
      const x = cx + Math.cos(angle) * r;
      const y = cy + Math.sin(angle) * r;
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = dimensions[i].color;
      ctx.fill();
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });

    // Draw labels
    dimensions.forEach((d, i) => {
      const angle = startAngle + i * angleStep;
      const lr = maxR + 24;
      const x = cx + Math.cos(angle) * lr;
      const y = cy + Math.sin(angle) * lr;
      ctx.font = "bold 11px system-ui, sans-serif";
      ctx.fillStyle = "currentColor";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Use computed style to get the text color
      const computedColor = getComputedStyle(canvas).color || "#888";
      ctx.fillStyle = computedColor;
      ctx.fillText(d.label, x, y);
    });
  }, [dna, size]);

  return (
    <div className="flex justify-center">
      <canvas ref={canvasRef} style={{ width: size, height: size }} />
    </div>
  );
}
