import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, 
  Layers, 
  ExternalLink,
  CheckCircle2
} from "lucide-react";
import { getAllSystems } from "@/data/systems";
import SystemsCatalogGrid from "@/components/SystemsCatalogGrid";

export const metadata = {
  title: "Fullstack Systems Catalog | SUTRA / NEXUS",
  description: "Browse audited production-ready enterprise software systems: Telemetry Matrix, BuildAxis AI ERP, DealFlow Autonomous CRM, and Project Omega v2.4.",
};

export default function SystemsPage() {
  const catalogSystems = getAllSystems();

  return (
    <div className="pt-32 pb-24 bg-[#07090E] min-h-screen relative overflow-hidden">
      {/* Ambient Radial Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-[600px] h-[350px] bg-[#00F0FF]/12 blur-3xl pointer-events-none rounded-full animate-pulse-slow" />
      <div className="absolute bottom-1/3 right-1/4 translate-x-1/3 w-[550px] h-[350px] bg-[#8B5CF6]/12 blur-3xl pointer-events-none rounded-full animate-pulse-slow" style={{ animationDelay: "3s" }} />
      <div className="absolute inset-0 bg-dot-matrix opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#00F0FF]/40 bg-[#00F0FF]/10 text-xs font-mono-tabular text-[#00F0FF] backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F0FF] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00F0FF]" />
            </span>
            <span>AUDITED PRODUCTION CODEBASES</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Enterprise Fullstack Software Systems Catalog
          </h1>

          <p className="text-base text-[#94A3B8] leading-relaxed">
            Acquire fully-tested, production-ready codebases with unencumbered commercial IP ownership, native payment rails, and comprehensive documentation.
          </p>
        </div>

        {/* Systems Grid */}
        <SystemsCatalogGrid systems={catalogSystems} />

      </div>
    </div>
  );
}
