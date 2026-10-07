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
    badge: "LIVE GMV"
  },
  {
    metric: "< 12 ms",
    label: "P99 Query Latency",
    subtext: "Sub-millisecond index hits via Supabase Postgres RLS",
    icon: Clock,
    accent: "text-[#8B5CF6]",
    badge: "BENCHMARKED"
  },
  {
    metric: "100%",
    label: "Commercial IP Ownership",
    subtext: "Unencumbered source code transfer with audited licensing",
    icon: ShieldCheck,
    accent: "text-[#00F0FF]",
    badge: "AUDITED IP"
  },
  {
    metric: "Zero-Config",
    label: "One-Click Deployment",
    subtext: "Deploy instantly to Vercel, AWS ECS, or Docker Swarm",
    icon: Rocket,
    accent: "text-[#8B5CF6]",
    badge: "AUTOMATED"
  },
];

export default function MetricsStrip() {
  return (
    <section id="telemetry" className="py-16 bg-[#07090E] relative z-20 border-y border-[#1A2234] overflow-hidden">
      {/* Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[250px] bg-gradient-to-r from-[#00F0FF]/10 via-[#8B5CF6]/10 to-[#00F0FF]/10 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-mono-tabular text-[#00F0FF] tracking-wider uppercase mb-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F0FF] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00F0FF]" />
              </span>
              <span>SYSTEM PERFORMANCE TELEMETRY</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Engineered for High-Concurrency Enterprise Scale
            </h2>
          </div>

          <div className="mt-4 md:mt-0 inline-flex items-center space-x-2 text-xs text-[#94A3B8] font-mono-tabular px-3 py-1.5 rounded-full bg-[#0D111A]/80 border border-[#1A2234] backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span>Node status: <strong className="text-emerald-400 font-semibold">ALL CLUSTERS OPERATIONAL</strong></span>
          </div>
        </div>

        {/* Staggered Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m, idx) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: idx * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
              className="rounded-2xl bg-[#0D111A]/80 backdrop-blur-md border border-[#1A2234] p-6 shadow-xl relative overflow-hidden transition-all duration-300 hover:border-[#00F0FF]/50 hover:shadow-[0_10px_30px_-5px_rgba(0,240,255,0.2)] group"
            >
              {/* Scanline subtle overlay */}
              <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF]/40 to-transparent blur-[1px] animate-scanline pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Card Top Row */}
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-[#07090E] border border-[#1A2234] text-white group-hover:border-[#00F0FF]/40 transition-colors">
                  <m.icon className={"w-5 h-5 " + m.accent} />
                </div>
                <span className="text-[10px] font-mono-tabular tracking-widest px-2 py-0.5 rounded bg-[#07090E] text-[#94A3B8] border border-[#1A2234] group-hover:border-[#00F0FF]/30 transition-colors">
                  {m.badge}
                </span>
              </div>

              {/* Big Metric Value */}
              <div className={"text-3xl lg:text-4xl font-extrabold font-mono-tabular tracking-tight " + m.accent}>
                {m.metric}
              </div>

              {/* Label & Description */}
              <div className="mt-2 space-y-1">
                <div className="text-sm font-bold text-slate-100">{m.label}</div>
                <p className="text-xs text-[#94A3B8] leading-relaxed">{m.subtext}</p>
              </div>

              {/* Bottom Subtle Gradient Accent Line */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
