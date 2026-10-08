import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Layers, CheckCircle2, ArrowRight, ExternalLink, Cpu } from "lucide-react";
import DynamicSystemPreview from "@/components/DynamicSystemPreview";
import SystemDetailActions from "@/components/SystemDetailActions";
import { getAllSystems, getSystemBySlug } from "@/data/systems";

export function generateStaticParams() {
  const systems = getAllSystems();
  return systems.map((sys) => ({
    slug: sys.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const sys = getSystemBySlug(slug);
  
  if (!sys) {
    return {
      title: "System Not Found | SUTRA / NEXUS",
      description: "The requested software system specification could not be found.",
    };
  }

  return {
    title: `${sys.name} | SUTRA / NEXUS`,
    description: sys.description,
  };
}

export default async function SystemDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const sys = getSystemBySlug(slug);

  if (!sys) {
    notFound();
  }

  return (
    <div className="pt-32 pb-24 bg-[#07090E] min-h-screen text-slate-100 relative overflow-hidden">
      {/* Ambient Radial Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#00F0FF]/12 blur-3xl pointer-events-none rounded-full animate-pulse-slow" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[300px] bg-[#8B5CF6]/12 blur-3xl pointer-events-none rounded-full animate-pulse-slow" style={{ animationDelay: "2.5s" }} />
      <div className="absolute inset-0 bg-dot-matrix opacity-20 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Header Badge */}
        <div className="space-y-4 text-center">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#00F0FF]/40 bg-[#00F0FF]/10 text-xs font-mono-tabular text-[#00F0FF] backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F0FF] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00F0FF]" />
            </span>
            <span>SYSTEM DEPLOYMENT SPECIFICATION</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">{sys.name}</h1>
          <p className="text-base text-[#8B5CF6] font-mono-tabular">{sys.tagline}</p>
        </div>

        {/* Detail Card with Glassmorphism & Gradient Border */}
        <div className="rounded-2xl bg-[#0D111A]/80 backdrop-blur-md border border-[#00F0FF]/30 p-8 shadow-[0_0_40px_rgba(0,240,255,0.15)] space-y-8 relative overflow-hidden group">
          <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent blur-[1px] animate-scanline pointer-events-none opacity-40 z-20" />

          {/* Main Visual Image Asset */}
          <div className="relative w-full overflow-hidden rounded-xl border border-[#1A2234] shadow-xl bg-[#07090E]">
            <Image
              src={sys.imageSrc}
              alt={sys.imageAlt}
              width={1200}
              height={675}
              priority
              className="w-full h-auto object-cover rounded-xl"
            />
          </div>

          {/* Dynamic Component Preview (Image-Free Interactive Dashboard Visual) */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono-tabular text-[#00F0FF] uppercase flex items-center space-x-2">
              <Cpu className="w-4 h-4 text-[#00F0FF]" />
              <span>LIVE TELEMETRY COMPONENT PREVIEW:</span>
            </h3>
            <DynamicSystemPreview category={sys.category} slug={sys.slug} />
          </div>

          <p className="text-base text-[#94A3B8] leading-relaxed">{sys.description}</p>

          {/* Technical Specifications Grid */}
          <div className="space-y-3 pt-4 border-t border-[#1A2234]">
            <h3 className="text-xs font-mono-tabular text-[#00F0FF] uppercase">PRODUCTION SPECIFICATIONS:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {sys.specs.map((spec, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-[#07090E]/80 border border-[#1A2234] flex items-center justify-between text-xs font-mono-tabular">
                  <span className="text-[#94A3B8]">{spec.label}:</span>
                  <span className="text-white font-semibold">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Architecture */}
          <div className="space-y-3 pt-4 border-t border-[#1A2234]">
            <h3 className="text-xs font-mono-tabular text-[#00F0FF] uppercase">TECH STACK ARCHITECTURE:</h3>
            <div className="flex flex-wrap gap-2">
              {sys.stack.map((item, i) => (
                <span key={i} className="px-3 py-1.5 rounded-lg bg-[#07090E]/80 border border-[#1A2234] text-xs font-mono-tabular text-slate-200">
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Audited Capabilities Checklist */}
          <div className="space-y-3 pt-4 border-t border-[#1A2234]">
            <h3 className="text-xs font-mono-tabular text-[#00F0FF] uppercase">AUDITED CAPABILITIES:</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {sys.features.map((feat, i) => (
                <li key={i} className="flex items-center space-x-2.5 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-[#00F0FF] shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Commercial Pricing & Checkout CTA */}
          <div className="pt-6 border-t border-[#1A2234] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs text-[#94A3B8] font-mono-tabular">COMMERCIAL TIER PRICE</div>
              <div className="text-2xl font-bold text-white font-mono-tabular">{sys.priceInr} <span className="text-sm font-normal text-slate-400">({sys.priceUsd})</span></div>
            </div>

            <SystemDetailActions sys={sys} />
          </div>
        </div>

      </div>
    </div>
  );
}
