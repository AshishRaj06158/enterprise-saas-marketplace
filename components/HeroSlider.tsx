"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { 
  Activity, 
  ChevronRight, 
  ChevronLeft, 
  ArrowUpRight,
  RefreshCw
} from "lucide-react";

interface Slide {
  id: string;
  badge: string;
  headline: string;
  subtext: string;
  metrics: string;
  kpis: { label: string; value: string; change?: string }[];
  tagColor: string;
  visualType: "omega" | "telemetry" | "crm" | "erp";
  imageSrc: string;
  imageAlt: string;
}

const slides: Slide[] = [
  {
    id: "omega",
    badge: "SYSTEM v2.4 ZERO-CONFIG PLATFORM",
    headline: "Deploy Production Apps in Minutes",
    subtext: "Pre-built fullstack software with native payment rails (UPI, Razorpay, Stripe) and audited commercial licenses.",
    metrics: "98.4% Health | 89.5k Ops | $45.2K ARR",
    kpis: [
      { label: "System Health", value: "98.4%", change: "+2.1%" },
      { label: "Total Ops/sec", value: "89.5k", change: "P99" },
      { label: "Monthly ARR", value: "$45.2K", change: "Verified" }
    ],
    tagColor: "border-[#00F0FF]/40 text-[#00F0FF] bg-[#00F0FF]/10",
    visualType: "omega",
    imageSrc: "/slide-1-hero-tablet.png",
    imageAlt: "SYSTEM v2.4 Zero-Config Platform Showcase",
  },
  {
    id: "telemetry",
    badge: "REAL-TIME OBSERVABILITY",
    headline: "Real-Time Executive Analytics",
    subtext: "High-frequency telemetry matrix with sub-12ms query execution across billions of indexed event nodes.",
    metrics: "₹114.2 Cr Monthly GMV | 12ms P99 Latency | 99.99% Cluster Uptime",
    kpis: [
      { label: "Monthly GMV", value: "₹114.2 Cr", change: "+18.4%" },
      { label: "P99 Latency", value: "< 12 ms", change: "Postgres RLS" },
      { label: "Cluster Uptime", value: "99.99%", change: "SLA Guaranteed" }
    ],
    tagColor: "border-[#8B5CF6]/40 text-[#8B5CF6] bg-[#8B5CF6]/10",
    visualType: "telemetry",
    imageSrc: "/slide-2-telemetry-matrix.png",
    imageAlt: "Telemetry Matrix - ₹14.2 Cr GMV and 12ms Latency Dashboard",
  },
  {
    id: "crm",
    badge: "AUTONOMOUS CRM",
    headline: "4.8x Faster Deal Execution",
    subtext: "Zero-leakage autonomous routing: Inbound Capture -> Lead Scoring -> Dynamic GST Contract -> Multi-rail Auto Settlement.",
    metrics: "Zero Leakage | 1.2s Lead Routing | 100% Audit",
    kpis: [
      { label: "Deal Acceleration", value: "4.8x", change: "Automated" },
      { label: "Routing Latency", value: "1.2 sec", change: "Instant" },
      { label: "Audit Compliance", value: "100%", change: "ISO & GST" }
    ],
    tagColor: "border-[#00F0FF]/40 text-[#00F0FF] bg-[#00F0FF]/10",
    visualType: "crm",
    imageSrc: "/slide-3-deal-pipeline.png",
    imageAlt: "Deal Progression Workflow - 4.8x Deal Velocity Pipeline",
  },
  {
    id: "erp",
    badge: "OPERATIONS & AUTONOMOUS ERP",
    headline: "Multi-Depot Thermal Warehouse Matrix & Fleet Telemetry",
    subtext: "Real-time delivery route tracking, compliance layer with automated GST tax filing, and role-based security.",
    metrics: "24/7 Monitoring | 450+ Fleet Units | Zero-Downtime",
    kpis: [
      { label: "Fleet Units", value: "450+", change: "Active GPS" },
      { label: "Warehouse Depots", value: "14 Nodes", change: "Thermal Monitored" },
      { label: "Tax Compliance", value: "Automated GST", change: "GSTR-1 Ready" }
    ],
    tagColor: "border-[#8B5CF6]/40 text-[#8B5CF6] bg-[#8B5CF6]/10",
    visualType: "erp",
    imageSrc: "/slide-4-erp-operations.png",
    imageAlt: "Operations & Logistics ERP - Thermal Warehouse & GST Compliance",
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);

    return () => clearInterval(timer);
  }, [isPaused]);

  const active = slides[currentSlide];

  return (
    <section 
      className="relative pt-32 pb-20 overflow-hidden bg-[#07090E] border-b border-[#1A2234]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Cyber Grid & Ambient Glow Orbs */}
      <div className="absolute inset-0 bg-dot-matrix opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#00F0FF]/15 blur-3xl pointer-events-none rounded-full animate-pulse-slow" />
      <div className="absolute top-1/3 right-1/4 translate-x-1/3 w-[550px] h-[350px] bg-[#8B5CF6]/15 blur-3xl pointer-events-none rounded-full animate-pulse-slow" style={{ animationDelay: "3s" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Slide Navigation Tabs */}
        <div className="flex items-center justify-between mb-8 overflow-x-auto pb-2 scrollbar-none border-b border-[#1A2234]/80">
          <div className="flex space-x-2">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCurrentSlide(idx)}
                className={"px-4 py-2 rounded-xl text-xs font-mono-tabular transition-all duration-300 flex items-center space-x-2.5 " + (
                  currentSlide === idx
                    ? "bg-[#0D111A]/90 text-white border border-[#00F0FF]/60 shadow-[0_0_20px_rgba(0,240,255,0.2)] backdrop-blur-md"
                    : "text-[#94A3B8] hover:text-white hover:bg-[#0D111A]/50 border border-transparent"
                )}
              >
                <span className="relative flex h-2 w-2">
                  {currentSlide === idx && (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F0FF] opacity-75" />
                  )}
                  <span className={"relative inline-flex rounded-full h-2 w-2 " + (currentSlide === idx ? "bg-[#00F0FF]" : "bg-slate-600")} />
                </span>
                <span>0{idx + 1}. {s.badge.split(" ")[0]}</span>
              </button>
            ))}
          </div>

          <div className="hidden sm:flex items-center space-x-2">
            <button
              onClick={() => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
              className="p-2 rounded-xl bg-[#0D111A]/80 border border-[#1A2234] text-slate-300 hover:text-[#00F0FF] hover:border-[#00F0FF]/40 backdrop-blur-md transition-colors"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
              className="p-2 rounded-xl bg-[#0D111A]/80 border border-[#1A2234] text-slate-300 hover:text-[#00F0FF] hover:border-[#00F0FF]/40 backdrop-blur-md transition-colors"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[500px]">
          
          {/* Left Column: Text & CTA */}
          <div className="lg:col-span-6 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="space-y-5"
              >
                <div className={"inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border text-xs font-mono-tabular tracking-wider backdrop-blur-md " + active.tagColor}>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F0FF] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00F0FF]" />
                  </span>
                  <span>{active.badge}</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
                  {active.headline}
                </h1>

                <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed max-w-xl">
                  {active.subtext}
                </p>

                <div className="pt-2 flex flex-wrap gap-4 items-center">
                  <Link
                    href="/systems"
                    className="px-7 py-4 rounded-2xl bg-gradient-to-r from-[#00F0FF] to-[#8B5CF6] text-black font-bold text-sm hover:opacity-95 transition-all shadow-[0_0_25px_rgba(0,240,255,0.3)] hover:shadow-[0_0_35px_rgba(0,240,255,0.5)] flex items-center space-x-2 group hover:-translate-y-0.5"
                  >
                    <span>Explore System Modules</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>

                  <Link
                    href="/#contact"
                    className="px-7 py-4 rounded-2xl bg-[#0D111A]/80 backdrop-blur-md border border-[#1A2234] text-white font-semibold text-sm hover:border-[#00F0FF]/60 hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] transition-all flex items-center space-x-2 hover:-translate-y-0.5"
                  >
                    <span>Request Staging SLA</span>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Cyber Visual Card */}
          <div className="lg:col-span-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, scale: 0.96, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -10 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="rounded-2xl bg-[#0D111A]/80 backdrop-blur-md border border-[#00F0FF]/30 p-4 shadow-[0_0_35px_rgba(0,240,255,0.12)] relative overflow-hidden group hover:border-[#00F0FF]/60 hover:shadow-[0_0_50px_rgba(0,240,255,0.2)] transition-all duration-300"
              >
                {/* Cyber Scanline Micro-Animation */}
                <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent blur-[1px] animate-scanline pointer-events-none opacity-50 z-30" />

                {/* Top Control Bar */}
                <div className="flex items-center justify-between border-b border-[#1A2234] pb-3 mb-3 relative z-20">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                    <span className="text-xs font-mono-tabular text-[#94A3B8] ml-2">
                      {active.id}-node-01.sutra.internal
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-[11px] font-mono-tabular text-[#00F0FF] bg-[#00F0FF]/10 px-2.5 py-0.5 rounded-full border border-[#00F0FF]/30">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F0FF] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00F0FF]" />
                    </span>
                    <span>LIVE TELEMETRY</span>
                  </div>
                </div>

                {/* Main Hero Visual Image */}
                <div className="relative w-full overflow-hidden rounded-xl border border-[#1A2234]/80 shadow-lg bg-[#07090E]">
                  <Image
                    src={active.imageSrc}
                    alt={active.imageAlt}
                    width={1200}
                    height={675}
                    priority
                    className="w-full h-auto object-cover rounded-xl transition-transform duration-500 group-hover:scale-[1.01]"
                  />
                </div>

                {/* Key Metrics Strip */}
                <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-[#1A2234] relative z-20">
                  {active.kpis.map((k, i) => (
                    <div key={i} className="text-center p-2 rounded-lg bg-[#07090E]/90 border border-[#1A2234] backdrop-blur-sm">
                      <div className="text-[10px] text-[#94A3B8] font-mono-tabular uppercase truncate">{k.label}</div>
                      <div className="text-sm font-bold text-white font-mono-tabular mt-0.5">{k.value}</div>
                      <div className="text-[9px] text-[#00F0FF] font-mono-tabular mt-0.5">{k.change}</div>
                    </div>
                  ))}
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
