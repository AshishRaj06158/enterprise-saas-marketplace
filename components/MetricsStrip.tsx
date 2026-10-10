"use client";

import { motion } from "framer-motion";
import { TrendingUp, Clock, ShieldCheck, Rocket } from "lucide-react";

const metrics = [
  {
    metric: "₹114.2 Cr+",
    label: "Monthly Marketplace Volume",
    subtext: "Processed via native UPI, Razorpay & Stripe integrations",
    icon: TrendingUp,
    accent: "text-[#00F0FF]",
    badge: "[LIVE GMV]"
  },
  {
    metric: "< 12 ms",
    label: "P99 Query Latency",
    subtext: "Sub-millisecond index hits via Supabase Postgres RLS",
    icon: Clock,
    accent: "text-[#8B5CF6]",
    badge: "[BENCHMARKED]"
  },
  {
    metric: "100%",
    label: "Commercial IP Ownership",
    subtext: "Unencumbered source code transfer with audited licensing",
    icon: ShieldCheck,
    accent: "text-[#00F0FF]",
    badge: "[AUDITED IP]"
  },
  {
    metric: "Zero-Config",
    label: "One-Click Deployment",
    subtext: "Deploy instantly to Vercel, AWS ECS, or Docker Swarm",
    icon: Rocket,
    accent: "text-[#8B5CF6]",
    badge: "[AUTOMATED]"
  },
];

export default function MetricsStrip() {
  return (
    <section id="telemetry" className="py-16 bg-[#07090E] relative z-20 border-b-2 border-[#1A2234] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 font-mono-tabular">
        
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs text-[#00F0FF] uppercase mb-2 font-bold tracking-wider">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F0FF] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00F0FF]" />
              </span>
              <span>// SYSTEM PERFORMANCE TELEMETRY</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
              Engineered for High-Concurrency Enterprise Scale
            </h2>
          </div>

          <div className="inline-flex items-center space-x-2 text-xs text-[#94A3B8] px-3.5 py-2 rounded-none bg-[#0D111A] border-2 border-[#1A2234] shadow-[3px_3px_0px_0px_#1A2234]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span>CLUSTERS: <strong className="text-emerald-400 font-bold uppercase">[ALL OPERATIONAL]</strong></span>
          </div>
        </div>

        {/* Staggered Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m, idx) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className="rounded-none bg-[#0D111A] border-2 border-[#1A2234] p-6 shadow-[4px_4px_0px_0px_#1A2234] relative overflow-hidden transition-all duration-150 hover:border-[#00F0FF] hover:shadow-[4px_4px_0px_0px_#00F0FF] hover:-translate-x-[2px] hover:-translate-y-[2px] group"
            >
              {/* Scanline subtle overlay */}
              <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF]/40 to-transparent blur-[1px] animate-scanline pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Card Top Row */}
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-none bg-[#07090E] border-2 border-[#1A2234] text-white group-hover:border-[#00F0FF] transition-colors">
                  <m.icon className={"w-5 h-5 " + m.accent} />
                </div>
                <span className="text-[10px] tracking-widest px-2 py-0.5 bg-[#07090E] text-[#00F0FF] border border-[#1A2234] group-hover:border-[#00F0FF]/40 uppercase font-bold">
                  {m.badge}
                </span>
              </div>

              {/* Big Metric Value */}
              <div className={"text-3xl lg:text-4xl font-black tracking-tight " + m.accent}>
                {m.metric}
              </div>

              {/* Label & Description */}
              <div className="mt-2 text-xs font-bold text-white uppercase tracking-wider">
                {m.label}
              </div>
              <p className="mt-1 text-xs text-[#94A3B8] leading-relaxed font-sans">
                {m.subtext}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
