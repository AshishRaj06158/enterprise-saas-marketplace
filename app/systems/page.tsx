import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, 
  Layers, 
  ExternalLink,
  CheckCircle2
} from "lucide-react";
import { getAllSystems } from "@/data/systems";

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {catalogSystems.map((sys) => (
            <div
              key={sys.id}
              id={sys.id}
              className="rounded-2xl bg-[#0D111A]/80 backdrop-blur-md border border-[#00F0FF]/30 p-8 flex flex-col justify-between hover:border-[#00F0FF]/60 hover:shadow-[0_10px_35px_-5px_rgba(0,240,255,0.2)] transition-all duration-300 shadow-2xl relative overflow-hidden group hover:-translate-y-1"
            >
              {/* Scanline Overlay */}
              <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent blur-[1px] animate-scanline pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-30" />

              <div>
                {/* Badge & Name */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono-tabular tracking-wider uppercase px-3 py-1 rounded bg-[#07090E] text-[#00F0FF] border border-[#00F0FF]/30">
                    {sys.badge}
                  </span>
                  <span className="text-xs font-mono-tabular text-emerald-400 flex items-center space-x-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                    </span>
                    <span>IP AUDITED</span>
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-white group-hover:text-[#00F0FF] transition-colors">
                  <Link href={"/systems/" + sys.slug}>
                    {sys.name}
                  </Link>
                </h2>
                <p className="text-xs font-mono-tabular text-[#8B5CF6] mt-0.5 mb-3">
                  {sys.tagline}
                </p>

                {/* System Preview Image */}
                <Link href={"/systems/" + sys.slug} className="block relative w-full overflow-hidden rounded-xl border border-[#1A2234] my-4 shadow-lg bg-[#07090E]">
                  <Image
                    src={sys.imageSrc}
                    alt={sys.imageAlt}
                    width={1200}
                    height={675}
                    className="w-full h-auto object-cover rounded-xl transition-transform duration-500 group-hover:scale-[1.01]"
                  />
                </Link>

                <p className="text-sm text-[#94A3B8] leading-relaxed mb-6">
                  {sys.description}
                </p>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {sys.stack.map((t, i) => (
                    <span key={i} className="text-[11px] font-mono-tabular px-2.5 py-1 rounded-lg bg-[#07090E] text-slate-300 border border-[#1A2234]">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Key Features List */}
                <div className="space-y-2 mb-6 pt-4 border-t border-[#1A2234]">
                  <div className="text-xs font-mono-tabular text-[#94A3B8] uppercase">CORE FEATURES:</div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {sys.features.map((f, i) => (
                      <li key={i} className="flex items-center space-x-2 text-xs text-slate-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00F0FF] shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Bottom: Metrics & CTA */}
              <div className="pt-6 border-t border-[#1A2234] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] text-[#94A3B8] font-mono-tabular">COMMERCIAL TIER</div>
                  <div className="text-xl font-bold text-white font-mono-tabular">{sys.priceInr} <span className="text-xs font-normal text-slate-400">({sys.priceUsd})</span></div>
                </div>

                <div className="flex items-center space-x-3 w-full sm:w-auto">
                  <Link
                    href={"/systems/" + sys.slug}
                    className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[#00F0FF] bg-[#07090E] border border-[#00F0FF]/30 hover:bg-[#00F0FF]/10 transition-colors flex items-center space-x-1.5"
                  >
                    <span>View Specs</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href={"/#contact?system=" + sys.id}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-[#00F0FF] to-[#8B5CF6] hover:opacity-95 transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)] flex items-center space-x-1.5"
                  >
                    <span>Acquire</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
