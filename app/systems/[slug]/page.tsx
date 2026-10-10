import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, Cpu } from "lucide-react";
import DynamicSystemPreview from "@/components/DynamicSystemPreview";
import SystemDetailActions from "@/components/SystemDetailActions";
import SystemDetailPrice from "@/components/SystemDetailPrice";
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
    <div className="pt-32 pb-24 min-h-screen bg-[#07090E] text-slate-100 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Header Badge */}
        <div className="space-y-4 text-center">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-[#0D111A] border-2 border-[#00F0FF] text-xs font-mono-tabular text-[#00F0FF] shadow-[3px_3px_0px_0px_#00F0FF]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F0FF] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00F0FF]" />
            </span>
            <span className="uppercase font-bold tracking-widest">[SYSTEM SPECIFICATION // {sys.badge}]</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-mono-tabular uppercase">
            {sys.name}
          </h1>
          <p className="text-sm text-[#8B5CF6] font-mono-tabular uppercase tracking-wider font-semibold">
            // {sys.tagline}
          </p>
        </div>

        {/* Detail Card with Cybernetic Neo-Brutalism */}
        <div className="rounded-none bg-[#0D111A] border-2 border-[#1A2234] p-8 sm:p-10 shadow-[6px_6px_0px_0px_#1A2234] space-y-8 relative overflow-hidden group">
          <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent blur-[1px] animate-scanline pointer-events-none opacity-40 z-20" />

          {/* Main Visual Image Asset */}
          <div className="relative w-full overflow-hidden rounded-none border-2 border-[#1A2234] shadow-[4px_4px_0px_0px_#07090E] bg-[#07090E]">
            <Image
              src={sys.imageSrc}
              alt={sys.imageAlt}
              width={1200}
              height={675}
              priority
              className="w-full h-auto object-cover rounded-none"
            />
          </div>

          {/* Dynamic Component Preview (Image-Free Interactive Dashboard Visual) */}
          <div className="space-y-3 font-mono-tabular">
            <h3 className="text-xs text-[#00F0FF] uppercase font-bold tracking-wider flex items-center space-x-2">
              <Cpu className="w-4 h-4 text-[#00F0FF]" />
              <span>// LIVE TELEMETRY COMPONENT PREVIEW:</span>
            </h3>
            <div className="border-2 border-[#1A2234] shadow-[3px_3px_0px_0px_#1A2234]">
              <DynamicSystemPreview category={sys.category} slug={sys.slug} />
            </div>
          </div>

          <p className="text-sm text-[#94A3B8] leading-relaxed font-sans">{sys.description}</p>

          {/* Technical Specifications Grid */}
          <div className="space-y-3 pt-6 border-t-2 border-[#1A2234] font-mono-tabular">
            <h3 className="text-xs text-[#00F0FF] uppercase font-bold tracking-wider">
              // PRODUCTION SPECIFICATIONS:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {sys.specs.map((spec, i) => (
                <div key={i} className="p-3.5 rounded-none bg-[#07090E] border-2 border-[#1A2234] shadow-[2px_2px_0px_0px_#1A2234] flex items-center justify-between text-xs">
                  <span className="text-[#94A3B8] uppercase">[{spec.label}]:</span>
                  <span className="text-white font-bold">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Architecture */}
          <div className="space-y-3 pt-6 border-t-2 border-[#1A2234] font-mono-tabular">
            <h3 className="text-xs text-[#00F0FF] uppercase font-bold tracking-wider">
              // TECH STACK ARCHITECTURE:
            </h3>
            <div className="flex flex-wrap gap-2">
              {sys.stack.map((item, i) => (
                <span key={i} className="px-3 py-1.5 rounded-none bg-[#07090E] border-2 border-[#1A2234] text-xs text-slate-200 uppercase font-semibold">
                  [{item}]
                </span>
              ))}
            </div>
          </div>

          {/* Audited Capabilities Checklist */}
          <div className="space-y-3 pt-6 border-t-2 border-[#1A2234] font-mono-tabular">
            <h3 className="text-xs text-[#00F0FF] uppercase font-bold tracking-wider">
              // AUDITED ENTERPRISE CAPABILITIES:
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {sys.features.map((feat, i) => (
                <li key={i} className="flex items-start space-x-2.5 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-[#00F0FF] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Commercial Pricing & Checkout CTA */}
          <div className="pt-8 border-t-2 border-[#1A2234] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <SystemDetailPrice priceInr={sys.priceInr} priceUsd={sys.priceUsd} />
            <SystemDetailActions sys={sys} />
          </div>
        </div>

      </div>
    </div>
  );
}
