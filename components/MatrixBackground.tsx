"use client";

import { useEffect, useRef } from "react";

export default function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const spotlightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // -------------------------------------------------------------
    // 1. Hardware-Accelerated Interactive Radial Spotlight Tracker
    // -------------------------------------------------------------
    let animationFrameId: number;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let curX = targetX;
    let curY = targetY;
    let isTracking = true;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Smooth lerp loop with zero layout thrashing
    const updateSpotlight = () => {
      if (spotlightRef.current && isTracking) {
        curX += (targetX - curX) * 0.12;
        curY += (targetY - curY) * 0.12;
        // Shift by half radius (375px) for 750px diameter circle
        spotlightRef.current.style.transform = `translate3d(${curX - 375}px, ${curY - 375}px, 0)`;
      }
      animationFrameId = requestAnimationFrame(updateSpotlight);
    };

    updateSpotlight();

    // -------------------------------------------------------------
    // 2. High-Performance Digital Matrix Rain Canvas
    // -------------------------------------------------------------
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        let canvasAnimId: number;

        const resizeCanvas = () => {
          if (!canvas) return;
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas, { passive: true });

        // High-velocity digital telemetry glyph stream
        const chars = "010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101";
        const fontSize = 14;
        const columns = Math.floor((canvas.width || 1200) / fontSize);

        const drops: number[] = [];
        for (let i = 0; i < columns; i++) {
          drops[i] = Math.random() * -100;
        }

        let lastFrameTime = performance.now();
        const fpsInterval = 1000 / 30; // Throttled to 30fps for canvas to reserve 100% GPU for browser rendering

        const drawMatrix = (currentTime: number) => {
          canvasAnimId = requestAnimationFrame(drawMatrix);

          const elapsed = currentTime - lastFrameTime;
          if (elapsed < fpsInterval) return;
          lastFrameTime = currentTime - (elapsed % fpsInterval);

          ctx.fillStyle = "rgba(7, 9, 14, 0.1)";
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          ctx.font = `${fontSize}px monospace`;

          for (let i = 0; i < drops.length; i++) {
            const text = chars.charAt(Math.floor(Math.random() * chars.length));

            const isHead = Math.random() > 0.88;
            ctx.fillStyle = isHead
              ? "#00F0FF"
              : Math.random() > 0.6
              ? "#8B5CF6"
              : "rgba(148, 163, 184, 0.25)";

            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.98) {
              drops[i] = 0;
            }

            drops[i]++;
          }
        };

        canvasAnimId = requestAnimationFrame(drawMatrix);

        return () => {
          isTracking = false;
          window.removeEventListener("mousemove", handleMouseMove);
          window.removeEventListener("resize", resizeCanvas);
          cancelAnimationFrame(animationFrameId);
          cancelAnimationFrame(canvasAnimId);
        };
      }
    }

    return () => {
      isTracking = false;
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none -z-20 overflow-hidden bg-[#07090E]"
      aria-hidden="true"
    >
      {/* 1. Subtle, high-performance CSS grid matrix on root canvas */}
      <div
        className="absolute inset-0 w-full h-full opacity-60"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 240, 255, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 240, 255, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* 2. Cyber Dot Matrix Mesh */}
      <div
        className="absolute inset-0 w-full h-full opacity-40"
        style={{
          backgroundImage: "radial-gradient(rgba(0, 240, 255, 0.10) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* 3. Hardware-Accelerated Radial Cursor Spotlight */}
      <div
        ref={spotlightRef}
        className="absolute top-0 left-0 w-[750px] h-[750px] rounded-full pointer-events-none will-change-transform"
        style={{
          background: "radial-gradient(circle, rgba(0, 240, 255, 0.07) 0%, rgba(139, 92, 246, 0.035) 45%, transparent 70%)",
          transform: "translate3d(-9999px, -9999px, 0)",
        }}
      />

      {/* 4. Digital Matrix Rain Layer (Lightweight & Subdued) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
      />

      {/* 5. Authentic CRT Micro-Scanline Texture (Non-intrusive high readability) */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
        style={{
          backgroundImage: "repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, rgba(0, 0, 0, 0.3) 4px)",
        }}
      />

      {/* 6. Sweeping Cybernetic Scanline Accent Line */}
      <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF]/40 to-transparent blur-[1px] animate-scanline pointer-events-none" />

      {/* 7. Deep Space Atmospheric Ambient Glows */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#00F0FF]/08 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-[650px] h-[650px] bg-[#8B5CF6]/08 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-40 left-1/3 w-[700px] h-[550px] bg-[#00F0FF]/06 rounded-full blur-[140px] pointer-events-none" />
    </div>
  );
}
