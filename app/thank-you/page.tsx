"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ArrowRight, BookOpen, MessageSquareText } from "lucide-react";

function ThankYouContent() {
  const searchParams = useSearchParams();
  const waParam = searchParams.get("wa");

  // Target WhatsApp phone link fallback
  const defaultWaUrl =
    "https://wa.me/919771596801?text=" +
    encodeURIComponent("🚀 *Enterprise Inquiry - Priority SLA Channel*\nRequesting immediate technical advisory.");

  const [waUrl, setWaUrl] = useState(defaultWaUrl);

  useEffect(() => {
    if (waParam) {
      try {
        const decoded = decodeURIComponent(waParam);
        setWaUrl(decoded);

        // Automatically attempt opening WhatsApp in a new tab upon landing
        const timer = setTimeout(() => {
          try {
            window.open(decoded, "_blank", "noopener,noreferrer");
          } catch (e) {
            console.error("Auto open blocked:", e);
          }
        }, 300);

        return () => clearTimeout(timer);
      } catch (e) {
        console.error("Failed to decode wa param:", e);
      }
    }
  }, [waParam]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-20 bg-[#07090E] relative overflow-hidden">
      {/* Ambient Radial Glow Orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#00F0FF]/15 blur-3xl pointer-events-none rounded-full animate-pulse-slow" />
      <div className="absolute inset-0 bg-dot-matrix opacity-20 pointer-events-none" />

      <div className="max-w-md w-full text-center space-y-6 p-8 rounded-2xl bg-[#0D111A]/90 backdrop-blur-md border border-[#00F0FF]/40 shadow-[0_0_50px_rgba(0,240,255,0.2)] relative z-10 overflow-hidden group">
        <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent blur-[1px] animate-scanline pointer-events-none opacity-50 z-20" />

        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto shadow-[0_0_30px_rgba(16,185,129,0.3)]">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono-tabular text-[#00F0FF] tracking-wider uppercase px-3 py-1 rounded bg-[#07090E] border border-[#00F0FF]/30 inline-block">
            INQUIRY DISPATCHED & LOGGED
          </span>
          <h1 className="text-2xl font-bold text-white tracking-tight">Advisory Pipeline Assigned</h1>
          <p className="text-xs text-[#94A3B8] leading-relaxed">
            Our systems architecture team has logged your submission. A dedicated lead architect has been assigned to your SLA dispatch window.
          </p>
        </div>

        {/* Priority SLA WhatsApp Button */}
        <div className="pt-2">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-400 via-[#00F0FF] to-[#8B5CF6] text-black font-bold text-xs shadow-[0_0_30px_rgba(0,240,255,0.4)] hover:opacity-95 transition-all flex items-center justify-center space-x-2 group hover:-translate-y-0.5"
          >
            <MessageSquareText className="w-4 h-4 text-black" />
            <span>Connect Directly via WhatsApp (Priority SLA) ➔</span>
          </a>
          <p className="text-[10px] text-slate-500 font-mono-tabular mt-2">
            Target WhatsApp Channel: +91 9771596801 • Instant Response SLA
          </p>
        </div>

        <div className="pt-4 border-t border-[#1A2234] flex flex-col gap-3 font-mono-tabular text-xs">
          <Link
            href="/"
            className="w-full py-2.5 rounded-xl bg-[#07090E] border border-[#1A2234] hover:border-[#00F0FF]/50 text-white font-semibold flex items-center justify-center space-x-1.5 transition-colors"
          >
            <span>Return to Marketplace Home</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#00F0FF]" />
          </Link>

          <Link
            href="/docs"
            className="w-full py-2.5 rounded-xl border border-[#1A2234] hover:bg-[#161F30] text-slate-400 hover:text-white flex items-center justify-center space-x-1.5 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Explore Developer Documentation</span>
          </Link>
        </div>

      </div>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[80vh] flex items-center justify-center bg-[#07090E] text-slate-400 font-mono text-xs">
          Loading confirmation...
        </div>
      }
    >
      <ThankYouContent />
    </Suspense>
  );
}
