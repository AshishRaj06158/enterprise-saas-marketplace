import Link from "next/link";
import { getAllSystems } from "@/data/systems";
import SystemsCatalogGrid from "@/components/SystemsCatalogGrid";

export const metadata = {
  title: "Fullstack Systems Catalog | SUTRA / NEXUS",
  description: "Browse audited production-ready enterprise software systems: Telemetry Matrix, BuildAxis AI ERP, DealFlow Autonomous CRM, and Project Omega v2.4.",
};

export default function SystemsPage() {
  const catalogSystems = getAllSystems();

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[#07090E] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#0D111A] border-2 border-[#00F0FF] text-xs font-mono-tabular text-[#00F0FF] shadow-[3px_3px_0px_0px_#00F0FF]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F0FF] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00F0FF]" />
            </span>
            <span className="uppercase tracking-widest font-bold">[AUDITED PRODUCTION CODEBASES // V2.4]</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-mono-tabular uppercase">
            Enterprise Fullstack Software Systems Catalog
          </h1>

          <p className="text-sm text-[#94A3B8] font-mono-tabular leading-relaxed">
            Acquire fully-tested, production-ready codebases with unencumbered commercial IP ownership, native payment rails, and comprehensive documentation.
          </p>
        </div>

        {/* Systems Grid */}
        <SystemsCatalogGrid systems={catalogSystems} />

      </div>
    </div>
  );
}
