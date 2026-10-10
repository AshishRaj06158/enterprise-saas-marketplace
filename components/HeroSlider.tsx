"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { 
  ChevronRight, 
  ChevronLeft, 
  ArrowUpRight
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
    badge: "[SYSTEM v2.4 // ZERO-CONFIG]",
    headline: "Deploy Production Apps in Minutes",
    subtext: "Pre-built fullstack software with native payment rails (UPI, Razorpay, Stripe) and audited commercial licenses.",
    metrics: "98.4% Health | 89.5k Ops | $45.2K ARR",
    kpis: [
      { label: "System Health", value: "98.4%", change: "+2.1%" },
      { label: "Total Ops/sec", value: "89.5k", change: "P99" },
      { label: "Monthly ARR", value: "$45.2K", change: "Verified" }
    ],
    tagColor: "border-2 border-[#00F0FF] text-[#00F0FF] bg-[#07090E]",
    visualType: "omega",
    imageSrc: "/slide-1-hero-tablet.png",
    imageAlt: "SYSTEM v2.4 Zero-Config Platform Showcase",
  },
  {
    id: "telemetry",
    badge: "[REAL-TIME OBSERVABILITY // P99]",
    headline: "Real-Time Executive Analytics",
    subtext: "High-frequency telemetry matrix with sub-12ms query execution across billions of indexed event nodes.",
    metrics: "₹114.2 Cr Monthly GMV | 12ms P99 Latency | 99.99% Cluster Uptime",
    kpis: [
      { label: "Monthly GMV", value: "₹114.2 Cr", change: "+18.4%" },
      { label: "P99 Latency", value: "< 12 ms", change: "Postgres RLS" },
      { label: "Cluster Uptime", value: "99.99%", change: "SLA Guaranteed" }
    ],
    tagColor: "border-2 border-[#8B5CF6] text-[#8B5CF6] bg-[#07090E]",
    visualType: "telemetry",
    imageSrc: "/slide-2-telemetry-matrix.png",
    imageAlt: "Telemetry Matrix - ₹14.2 Cr GMV and 12ms Latency Dashboard",
  },
  {
    id: "crm",
    badge: "[AUTONOMOUS REVENUE ENGINE]",
    headline: "4.8x Faster Deal Execution",
    subtext: "Zero-leakage autonomous routing: Inbound Capture -> Lead Scoring -> Dynamic GST Contract -> Multi-rail Auto Settlement.",
    metrics: "Zero Leakage | 1.2s Lead Routing | 100% Audit",
    kpis: [
      { label: "Deal Acceleration", value: "4.8x", change: "Automated" },
      { label: "Routing Latency", value: "1.2 sec", change: "Instant" },
      { label: "Audit Compliance", value: "100%", change: "ISO & GST" }
    ],
    tagColor: "border-2 border-[#00F0FF] text-[#00F0FF] bg-[#07090E]",
    visualType: "crm",
    imageSrc: "/slide-3-deal-pipeline.png",
    imageAlt: "Deal Progression Workflow - 4.8x Deal Velocity Pipeline",
  },
  {
    id: "erp",
    badge: "[OPERATIONS & AUTONOMOUS ERP]",
    headline: "Multi-Depot Thermal Warehouse Matrix & Fleet Telemetry",
    subtext: "Real-time delivery route tracking, compliance layer with automated GST tax filing, and role-based security.",
    metrics: "24/7 Monitoring | 450+ Fleet Units | Zero-Downtime",
    kpis: [
      { label: "Fleet Units", value: "450+", change: "Active GPS" },
      { label: "Warehouse Depots", value: "14 Nodes", change: "Thermal Monitored" },
      { label: "Tax Compliance", value: "Automated GST", change: "GSTR-1 Ready" }
    ],
    tagColor: "border-2 border-[#8B5CF6] text-[#8B5CF6] bg-[#07090E]",
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
      className="relative pt-32 pb-20 overflow-hidden bg-[#07090E] border-b-2 border-[#1A2234]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 bg-dot-matrix opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Slide Navigation Tabs */}
        <div className="flex items-center justify-between mb-8 overflow-x-auto pb-2 scrollbar-none border-b-2 border-[#1A2234]">
          <div className="flex space-x-2 font-mono-tabular">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCurrentSlide(idx)}
                className={"px-3.5 py-2 rounded-none text-xs uppercase font-bold transition-all duration-100 flex items-center space-x-2 min-h-[44px] cursor-pointer " + (
                  currentSlide === idx
                    ? "bg-[#00F0FF] text-black border-2 border-[#00F0FF] shadow-[3px_3px_0px_0px_#00F0FF]"
                    : "bg-[#0D111A] text-[#94A3B8] hover:text-white hover:border-[#00F0FF] border-2 border-[#1A2234] shadow-[3px_3px_0px_0px_#1A2234]"
                ) + " active:translate-x-[1px] active:translate-y-[1px]"}
              >
                <span className="relative flex h-2 w-2">
                  {currentSlide === idx && (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75" />
                  )}
                  <span className={"relative inline-flex rounded-full h-2 w-2 " + (currentSlide === idx ? "bg-black" : "bg-[#00F0FF]")} />
                </span>
                <span>[0{idx + 1}. {s.id.toUpperCase()}]</span>
              </button>
            ))}
          </div>

          <div className="hidden sm:flex items-center space-x-2 font-mono-tabular">
            <button
              onClick={() => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
              className="p-2.5 rounded-none bg-[#0D111A] border-2 border-[#1A2234] text-slate-300 hover:text-[#00F0FF] hover:border-[#00F0FF] shadow-[2px_2px_0px_0px_#1A2234] active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
              className="p-2.5 rounded-none bg-[#0D111A] border-2 border-[#1A2234] text-slate-300 hover:text-[#00F0FF] hover:border-[#00F0FF] shadow-[2px_2px_0px_0px_#1A2234] active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
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
                transition={{ duration: 0.25 }}
                className="space-y-5"
              >
                <div className={"inline-flex items-center space-x-2 px-3.5 py-1 text-xs font-mono-tabular font-bold tracking-wider shadow-[3px_3px_0px_0px_#00F0FF] " + active.tagColor}>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F0FF] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00F0FF]" />
                  </span>
                  <span>{active.badge}</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] font-mono-tabular uppercase">
                  {active.headline}
                </h1>

                <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed max-w-xl font-sans">
                  {active.subtext}
                </p>

                <div className="pt-2 flex flex-wrap gap-4 items-center font-mono-tabular">
                  <Link
                    href="/systems"
                    className="px-7 py-4 rounded-none bg-[#00F0FF] border-2 border-[#00F0FF] text-black font-bold text-xs uppercase shadow-[4px_4px_0px_0px_#8B5CF6] hover:shadow-[6px_6px_0px_0px_#8B5CF6] active:translate-x-[2px] active:translate-y-[2px] transition-all flex items-center space-x-2 group min-h-[44px]"
                  >
                    <span>EXPLORE CATALOG</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>

                  <Link
                    href="/#contact"
                    className="px-7 py-4 rounded-none bg-[#0D111A] border-2 border-[#1A2234] text-white font-bold text-xs uppercase hover:border-[#00F0FF] hover:text-[#00F0FF] shadow-[4px_4px_0px_0px_#1A2234] hover:shadow-[4px_4px_0px_0px_#00F0FF] active:translate-x-[2px] active:translate-y-[2px] transition-all flex items-center space-x-2 min-h-[44px]"
                  >
                    <span>REQUEST STAGING SLA</span>
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
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className="rounded-none bg-[#0D111A] border-2 border-[#1A2234] p-4 sm:p-6 shadow-[8px_8px_0px_0px_#1A2234] hover:border-[#00F0FF] hover:shadow-[8px_8px_0px_0px_#00F0FF] transition-all duration-150 relative overflow-hidden group"
              >
                {/* Cyber Scanline Micro-Animation */}
                <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent blur-[1px] animate-scanline pointer-events-none opacity-50 z-30" />

                {/* Top Control Bar */}
                <div className="flex items-center justify-between border-b-2 border-[#1A2234] pb-3 mb-3 relative z-20 font-mono-tabular">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 bg-red-500 inline-block border border-black" />
                    <span className="w-2.5 h-2.5 bg-yellow-500 inline-block border border-black" />
                    <span className="w-2.5 h-2.5 bg-emerald-500 inline-block border border-black" />
                    <span className="text-xs text-[#94A3B8] ml-2 uppercase font-semibold">
                      // {active.id}-node-01.internal
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-[10px] text-[#00F0FF] bg-[#07090E] px-2.5 py-0.5 border border-[#00F0FF] uppercase font-bold">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F0FF] opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#00F0FF]" />
                    </span>
                    <span>LIVE TELEMETRY</span>
                  </div>
                </div>

                {/* Main Hero Visual Image */}
                <div className="relative w-full overflow-hidden rounded-none border-2 border-[#1A2234] bg-[#07090E] shadow-[4px_4px_0px_0px_#07090E]">
                  <Image
                    src={active.imageSrc}
                    alt={active.imageAlt}
                    width={1200}
                    height={675}
                    priority
                    className="w-full h-auto object-cover rounded-none transition-transform duration-300 group-hover:scale-[1.01]"
                  />
                </div>

                {/* Key Metrics Strip */}
                <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t-2 border-[#1A2234] relative z-20 font-mono-tabular">
                  {active.kpis.map((k, i) => (
                    <div key={i} className="text-center p-2 rounded-none bg-[#07090E] border-2 border-[#1A2234] shadow-[2px_2px_0px_0px_#1A2234]">
                      <div className="text-[10px] text-[#94A3B8] uppercase truncate font-bold">[{k.label}]</div>
                      <div className="text-sm sm:text-base font-black text-white mt-0.5">{k.value}</div>
                      <div className="text-[9px] text-[#00F0FF] font-bold mt-0.5">{k.change}</div>
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
