"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Terminal, ArrowRight, ExternalLink } from "lucide-react";
import { SystemProduct } from "@/data/systems";
import TelemetryModal from "@/components/TelemetryModal";

interface SystemDetailActionsProps {
  sys: SystemProduct;
}

export default function SystemDetailActions({ sys }: SystemDetailActionsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex items-center space-x-3">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-3 rounded-xl text-xs font-semibold text-[#00F0FF] bg-[#07090E] border border-[#00F0FF]/40 hover:bg-[#00F0FF]/10 transition-colors flex items-center space-x-2 cursor-pointer"
        >
          <Terminal className="w-4 h-4 text-[#00F0FF]" />
          <span>Test Sandbox / Live Telemetry</span>
        </button>

        <Link
          href={`/checkout?system=${sys.slug}`}
          className="px-6 py-3 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-[#00F0FF] to-[#8B5CF6] hover:opacity-95 transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)] flex items-center space-x-2"
        >
          <span>Acquire License</span>
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
