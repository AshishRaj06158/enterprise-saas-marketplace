"use client";

import React, { useEffect, useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ArrowRight, BookOpen, MessageSquareText, ShieldAlert } from "lucide-react";

function ThankYouContent() {
  const searchParams = useSearchParams();

  const formData = useMemo(() => ({
    name: searchParams.get("name") || searchParams.get("fullName") || "",
    email: searchParams.get("email") || searchParams.get("workEmail") || "",
    company: searchParams.get("company") || "",
    systemOfInterest: searchParams.get("systemOfInterest") || searchParams.get("system") || "",
    message: searchParams.get("message") || searchParams.get("note") || searchParams.get("requirements") || "",
  }), [searchParams]);

  const auto = searchParams.get("auto");
  const waParam = searchParams.get("wa");

  // Dynamic Pre-Filled WhatsApp Deep Link with target phone 919771596801
  const targetWhatsAppUrl = useMemo(() => {
    if (waParam) {
      try {
        return decodeURIComponent(waParam);
      } catch {
        // Fall through to reconstruction
      }
    }

    const messagePayload = encodeURIComponent(
      `*⚡ SUTRA / NEXUS ENTERPRISE INQUIRY*\n\n` +
      `• *Lead Name:* ${formData.name || 'Enterprise Client'}\n` +
      `• *Email:* ${formData.email || 'N/A'}\n` +
      `• *Company:* ${formData.company || 'N/A'}\n` +
      `• *System:* ${formData.systemOfInterest || 'Enterprise SaaS'}\n` +
      `• *Message:* ${formData.message || 'Ready for SLA Dispatch'}`
    );

    return `https://wa.me/919771596801?text=${messagePayload}`;
  }, [waParam, formData]);

  // Optional auto-launch WhatsApp in a new tab if auto === "1"
  const [hasAutoOpened, setHasAutoOpened] = useState(false);

  useEffect(() => {
    if (auto === "1" && !hasAutoOpened && targetWhatsAppUrl) {
      setHasAutoOpened(true);
      const timer = setTimeout(() => {
        try {
          window.open(targetWhatsAppUrl, "_blank", "noopener,noreferrer");
        } catch (e) {
          console.error("Auto open blocked by browser popup settings:", e);
        }
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [auto, hasAutoOpened, targetWhatsAppUrl]);

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 sm:px-6 py-20 bg-[#07090E] relative overflow-hidden">
      {/* Structural Neo-Brutalist Grid Lines */}
      <div className="absolute inset-0 bg-dot-matrix opacity-20 pointer-events-none" />

      <div className="max-w-lg w-full text-center space-y-6 p-6 sm:p-8 rounded-none bg-[#0D111A] border-2 border-[#00F0FF] shadow-[6px_6px_0px_0px_#00F0FF] relative z-10 overflow-hidden group">
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent blur-[1px] animate-scanline pointer-events-none opacity-40 z-20" />

        <div className="w-16 h-16 rounded-none bg-emerald-500/10 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 mx-auto shadow-[3px_3px_0px_0px_#10B981]">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-bold text-[#00F0FF] tracking-wider uppercase px-3 py-1.5 rounded-none bg-[#07090E] border-2 border-[#00F0FF] inline-block shadow-[2px_2px_0px_0px_#00F0FF]">
            [INQUIRY DISPATCHED &amp; LOGGED]
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase font-mono">
            Advisory Pipeline Assigned
          </h1>
          <p className="text-xs font-mono text-[#94A3B8] leading-relaxed">
            Our systems architecture team has logged your submission. A dedicated lead architect has been assigned to your SLA dispatch window.
          </p>
        </div>

        {/* Client Inquiry Summary Snapshot (If Available) */}
        {(formData.name || formData.company || formData.systemOfInterest) && (
          <div className="text-left p-4 bg-[#07090E] border-2 border-[#1A2234] font-mono text-xs space-y-1.5 shadow-[2px_2px_0px_0px_#1A2234]">
            <div className="text-[10px] text-[#00F0FF] uppercase tracking-wider font-bold mb-2 flex items-center justify-between">
              <span>// DISPATCH TELEMETRY PAYLOAD:</span>
              <span className="text-emerald-400">[EMAIL DISPATCHED]</span>
            </div>
            {formData.name && (
              <div className="flex justify-between">
                <span className="text-slate-500">[NAME]:</span>
                <span className="text-slate-200 font-bold truncate max-w-[240px]">{formData.name}</span>
              </div>
            )}
            {formData.company && (
              <div className="flex justify-between">
                <span className="text-slate-500">[COMPANY]:</span>
                <span className="text-slate-200 truncate max-w-[240px]">{formData.company}</span>
              </div>
            )}
            {formData.systemOfInterest && (
              <div className="flex justify-between">
                <span className="text-slate-500">[SYSTEM]:</span>
                <span className="text-[#00F0FF] font-bold truncate max-w-[240px]">{formData.systemOfInterest}</span>
              </div>
            )}
          </div>
        )}

        {/* Priority SLA WhatsApp Button */}
        <div className="pt-2 space-y-2">
          <a
            href={targetWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 px-4 rounded-none bg-[#10B981] hover:bg-white text-black font-mono font-black text-xs uppercase tracking-wider border-2 border-[#10B981] hover:border-white shadow-[4px_4px_0px_0px_#10B981] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#10B981] transition-all flex items-center justify-center space-x-2 min-h-[48px] cursor-pointer"
          >
            <MessageSquareText className="w-4 h-4 text-black shrink-0" />
            <span>[CHAT ON WHATSAPP: +91 9771596801 ➔]</span>
          </a>
          <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500 font-mono">
            <ShieldAlert className="w-3 h-3 text-[#10B981]" />
            <span>Target WhatsApp Channel: +91 9771596801 • Instant Response SLA</span>
          </div>
        </div>

        <div className="pt-4 border-t-2 border-[#1A2234] flex flex-col gap-3 font-mono text-xs">
          <Link
            href="/"
            className="w-full py-3.5 rounded-none bg-[#07090E] border-2 border-[#1A2234] hover:border-[#00F0FF] text-white font-bold flex items-center justify-center space-x-1.5 transition-colors min-h-[44px]"
          >
            <span>[RETURN TO MARKETPLACE HOME]</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#00F0FF]" />
          </Link>

          <Link
            href="/docs"
            className="w-full py-3.5 rounded-none border-2 border-[#1A2234] bg-[#07090E] hover:border-slate-500 text-slate-400 hover:text-white flex items-center justify-center space-x-1.5 transition-colors min-h-[44px]"
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
        <div className="min-h-[85vh] flex items-center justify-center bg-[#07090E] text-slate-400 font-mono text-xs">
          Loading confirmation...
        </div>
      }
    >
      <ThankYouContent />
    </Suspense>
  );
}
