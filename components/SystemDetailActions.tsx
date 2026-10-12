"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Terminal, ArrowRight, ExternalLink, MessageSquare } from "lucide-react";
import { SystemProduct } from "@/data/systems";
import TelemetryModal from "@/components/TelemetryModal";

interface SystemDetailActionsProps {
  sys: SystemProduct;
}

export default function SystemDetailActions({ sys }: SystemDetailActionsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-wrap items-center gap-3 font-mono-tabular">
        <Link
          href={`/#contact?product=${encodeURIComponent(sys.name)}`}
          className="px-4 py-3 rounded-none text-xs font-bold text-amber-400 bg-[#07090E] border-2 border-amber-400/80 shadow-[3px_3px_0px_0px_#f59e0b] hover:bg-amber-400/10 active:translate-x-[2px] active:translate-y-[2px] transition-all flex items-center space-x-1.5 min-h-[44px] uppercase"
          title="Direct Architectural Advisory Inquiry"
        >
          <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
          <span>[INQUIRE ADVISORY]</span>
        </Link>

        <Link
          href={`/playground?system=${sys.slug}`}
          className="px-4 py-3 rounded-none text-xs font-bold text-[#00F0FF] bg-[#07090E] border-2 border-[#00F0FF] shadow-[3px_3px_0px_0px_#00F0FF] hover:bg-[#00F0FF]/10 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#00F0FF] transition-all flex items-center space-x-2 cursor-pointer min-h-[44px] uppercase"
        >
          <Terminal className="w-4 h-4 text-[#00F0FF]" />
          <span>[LAUNCH LIVE SANDBOX ⚡]</span>
        </Link>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-3 rounded-none text-xs font-bold text-slate-300 bg-[#0D111A] border-2 border-[#1A2234] hover:text-white hover:border-[#8B5CF6] shadow-[3px_3px_0px_0px_#1A2234] hover:shadow-[3px_3px_0px_0px_#8B5CF6] active:translate-x-[2px] active:translate-y-[2px] transition-all flex items-center space-x-1.5 cursor-pointer min-h-[44px] uppercase"
        >
          <ExternalLink className="w-3.5 h-3.5 text-[#8B5CF6]" />
          <span>[TELEMETRY STREAM]</span>
        </button>

        <Link
          href={`/checkout?system=${sys.slug}`}
          className="px-6 py-3 rounded-none text-xs font-bold text-black bg-[#00F0FF] border-2 border-[#00F0FF] shadow-[4px_4px_0px_0px_#8B5CF6] hover:shadow-[6px_6px_0px_0px_#8B5CF6] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#8B5CF6] transition-all flex items-center space-x-2 min-h-[44px] uppercase"
        >
          <span>[ACQUIRE COMMERCIAL LICENSE]</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <TelemetryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        systemName={sys.name}
        systemSlug={sys.slug}
        stack={sys.stack}
        specs={sys.specs}
      />
    </>
  );
}
