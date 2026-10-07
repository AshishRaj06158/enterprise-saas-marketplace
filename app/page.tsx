import HeroSlider from "@/components/HeroSlider";
import MetricsStrip from "@/components/MetricsStrip";
import FeaturesGrid from "@/components/FeaturesGrid";
import PricingSection from "@/components/PricingSection";
import ContactSection from "@/components/ContactSection";
import Link from "next/link";
import { ArrowRight, Cpu, CheckCircle2 } from "lucide-react";

export default function Home() {
  return (
    <>
      {/* 1. Hero Section & Multi-Slide Carousel */}
      <HeroSlider />

      {/* 2. Live Telemetry & Metrics Strip */}
      <MetricsStrip />

      {/* 3. Systems Showcase / Architecture Highlight Banner */}
      <section id="systems" className="py-20 bg-[#07090E] relative overflow-hidden border-b border-[#1A2234]">
        {/* Ambient Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-gradient-to-r from-[#00F0FF]/15 via-[#8B5CF6]/15 to-[#00F0FF]/15 blur-3xl pointer-events-none rounded-full" />
        <div className="absolute inset-0 bg-dot-matrix opacity-20 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="rounded-3xl bg-[#0D111A]/80 backdrop-blur-md border border-[#00F0FF]/40 p-8 lg:p-12 shadow-[0_0_40px_rgba(0,240,255,0.15)] relative overflow-hidden group hover:border-[#00F0FF]/60 transition-all">
            <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent blur-[1px] animate-scanline pointer-events-none opacity-40 z-20" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/30 text-xs font-mono-tabular">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F0FF] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00F0FF]" />
                  </span>
                  <Cpu className="w-3.5 h-3.5" />
                  <span>FEATURED ARCHITECTURAL STACK v2.4</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  BuildAxis AI & Project Omega Core Engines
                </h2>
                <p className="text-sm sm:text-base text-[#94A3B8] max-w-2xl leading-relaxed">
                  Pre-assembled enterprise software suites configured with native payment gateways (UPI, Razorpay, Stripe), GSTR-1 automated invoicing, and role-based security RLS policies.
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <div className="flex items-center space-x-2 text-xs text-slate-200 bg-[#07090E]/80 px-3.5 py-2 rounded-xl border border-[#1A2234] font-mono-tabular">
                    <CheckCircle2 className="w-4 h-4 text-[#00F0FF]" />
                    <span>Postgres Row Level Security (RLS)</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-slate-200 bg-[#07090E]/80 px-3.5 py-2 rounded-xl border border-[#1A2234] font-mono-tabular">
                    <CheckCircle2 className="w-4 h-4 text-[#8B5CF6]" />
                    <span>Native Dynamic UPI QR Rails</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-slate-200 bg-[#07090E]/80 px-3.5 py-2 rounded-xl border border-[#1A2234] font-mono-tabular">
                    <CheckCircle2 className="w-4 h-4 text-[#00F0FF]" />
                    <span>Zero-Config Vercel / Docker Container</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex justify-start lg:justify-end">
                <Link
                  href="/systems"
                  className="px-6 py-4 rounded-2xl bg-gradient-to-r from-[#00F0FF] to-[#8B5CF6] text-black font-bold text-sm hover:opacity-95 transition-all shadow-[0_0_25px_rgba(0,240,255,0.3)] flex items-center space-x-2 group hover:-translate-y-0.5"
                >
                  <span>Explore Full Catalog</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Architectural Feature Showcase */}
      <FeaturesGrid />

      {/* 5. Commercial Licensing & Pricing Section */}
      <PricingSection />

      {/* 6. Contact & Inquiries Section */}
      <ContactSection />
    </>
  );
}
