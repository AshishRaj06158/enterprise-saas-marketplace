"use client";

import { useEffect, useRef } from "react";

export default function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Matrix Telemetry Stream Characters
    const chars = "010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);

    // Array of drops - 1 per column
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    const draw = () => {
      // Semi-transparent background clear for fade trail effect
      ctx.fillStyle = "rgba(7, 9, 14, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));

        // Alternate head color (Electric Cyan) and body color (Neon Violet / Faded Slate)
        const isHead = Math.random() > 0.85;
        ctx.fillStyle = isHead ? "#00F0FF" : Math.random() > 0.5 ? "#8B5CF6" : "rgba(148, 163, 184, 0.4)";

        // Render text
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop back to top once it passes canvas bottom
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* 1. Matrix Canvas Stream */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-25 transition-opacity duration-1000"
      />

      {/* 2. Cyber Dot Matrix Grid Overlay */}
      <div className="absolute inset-0 bg-dot-matrix opacity-40" />

      {/* 3. Radial Glow Orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#00F0FF]/15 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#8B5CF6]/12 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />
      <div className="absolute bottom-10 left-1/4 w-[600px] h-[400px] bg-[#00F0FF]/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "4s" }} />
    </div>
  );
}
