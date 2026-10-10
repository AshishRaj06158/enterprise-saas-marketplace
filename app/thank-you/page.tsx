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
      {/* Structural Neo-Brutalist Grid Lines */}
      <div className="absolute inset-0 bg-dot-matrix opacity-20 pointer-events-none" />

      <div className="max-w-md w-full text-center space-y-6 p-8 rounded-none bg-[#0D111A] border-2 border-[#00F0FF] shadow-[4px_4px_0px_0px_#00F0FF] relative z-10 overflow-hidden group">
        <div className="w-16 h-16 rounded-none bg-emerald-500/10 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 mx-auto shadow-[2px_2px_0px_0px_#10B981]">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-bold text-[#00F0FF] tracking-wider uppercase px-3 py-1 rounded-none bg-[#07090E] border-2 border-[#00F0FF] inline-block shadow-[2px_2px_0px_0px_#00F0FF]">
            [INQUIRY DISPATCHED &amp; LOGGED]
          </span>
          <h1 className="text-2xl font-black text-white tracking-tight uppercase font-mono">Advisory Pipeline Assigned</h1>
          <p className="text-xs font-mono text-[#94A3B8] leading-relaxed">
            Our systems architecture team has logged your submission. A dedicated lead architect has been assigned to your SLA dispatch window.
          </p>
        </div>

        {/* Priority SLA WhatsApp Button */}
        <div className="pt-2">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-4 rounded-none bg-[#10B981] hover:bg-white text-black font-mono font-black text-xs uppercase tracking-wider border-2 border-[#10B981] hover:border-white shadow-[4px_4px_0px_0px_#10B981] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#10B981] transition-all flex items-center justify-center space-x-2 min-h-[44px]"
          >
            <MessageSquareText className="w-4 h-4 text-black" />
            <span>[CHAT ON WHATSAPP: +91 9771596801 ➔]</span>
          </a>
          <p className="text-[10px] text-slate-500 font-mono mt-2">
            Target WhatsApp Channel: +91 9771596801 • Instant Response SLA
          </p>
        </div>

        <div className="pt-4 border-t-2 border-[#1A2234] flex flex-col gap-3 font-mono text-xs">
          <Link
            href="/"
            className="w-full py-3 rounded-none bg-[#07090E] border-2 border-[#1A2234] hover:border-[#00F0FF] text-white font-bold flex items-center justify-center space-x-1.5 transition-colors min-h-[44px]"
          >
            <span>[RETURN TO MARKETPLACE HOME]</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#00F0FF]" />
          </Link>

          <Link
            href="/docs"
            className="w-full py-3 rounded-none border-2 border-[#1A2234] bg-[#07090E] hover:border-slate-500 text-slate-400 hover:text-white flex items-center justify-center space-x-1.5 transition-colors min-h-[44px]"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>[EXPLORE DEVELOPER DOCUMENTATION]</span>
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
