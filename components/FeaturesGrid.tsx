"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  CreditCard, 
  Database, 
  PlayCircle, 
  Cpu, 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  ArrowRight,
  Lock
} from "lucide-react";

const features = [
  {
    id: "multi-rail",
    title: "Multi-Rail Native Payments",
    badge: "PAYMENTS ENGINE",
    description: "Fullstack checkout architecture with native UPI QR generation, Razorpay webhook handling, and instant automated GST invoice compilation.",
    icon: CreditCard,
    accent: "from-[#00F0FF] to-[#00F0FF]/20",
    bullets: [
      "UPI Dynamic QR & Intent API",
      "Razorpay & Stripe Webhook Handlers",
      "Automated GST Tax Invoice PDF Gen",
      "Auto-reconciliation & Ledger Audit"
    ],
    ctaText: "Test Payment Demo",
    ctaLink: "/demos#payment"
  },
  {
    id: "type-safe",
    title: "Pure Type-Safe Next.js 15 & Supabase",
    badge: "CORE ARCHITECTURE",
    description: "Built with Next.js 15 App Router, React Server Components, and Supabase Postgres schemas with granular Row Level Security (RLS).",
    icon: Database,
    accent: "from-[#8B5CF6] to-[#8B5CF6]/20",
    bullets: [
      "Strict TypeScript Schema Contracts",
      "Postgres Row Level Security (RLS)",
      "Zero-downtime DB Migration Scripts",
      "Optimized Server-Side Rendering"
    ],
    ctaText: "Inspect Architecture",
    ctaLink: "/docs#architecture"
  },
  {
    id: "sandbox",
    title: "Interactive Sandbox Previews",
    badge: "ZERO RISK STAGING",
    description: "Safe, isolated staging environments allowing full system testing, API trigger inspection, and UI customization before codebase purchase.",
    icon: PlayCircle,
    accent: "from-[#00F0FF] to-[#8B5CF6]",
    bullets: [
      "Live Isolated Staging Clusters",
      "Real-Time Data Injection Controls",
      "Full API Payload Inspection",
      "Interactive ERP & CRM Playgrounds"
    ],
    ctaText: "Launch Sandbox",
    ctaLink: "/demos"
  },
  {
    id: "autonomous-erp",
    title: "Autonomous ERP & CRM Pipeline",
    badge: "OPERATIONAL INTELLIGENCE",
    description: "Multi-depot thermal warehouse monitoring, live GPS fleet tracking, and automated lead scoring with dynamic contract assembly.",
    icon: Cpu,
    accent: "from-[#8B5CF6] to-[#00F0FF]",
    bullets: [
      "Thermal Depot Telemetry Sensors",
      "GPS Fleet Tracking Engine",
      "Autonomous Lead Scoring Matrix",
      "Automated Legal Contract Assembly"
    ],
    ctaText: "Explore ERP Features",
    ctaLink: "/systems"
  },
  {
    id: "ip-ownership",
    title: "Audited Commercial IP Transfer",
    badge: "ENTERPRISE IP",
    description: "100% unencumbered commercial source code ownership. Perpetual deployment rights with no per-user licensing penalties.",
    icon: ShieldCheck,
    accent: "from-[#00F0FF] to-[#8B5CF6]",
    bullets: [
      "Complete Clean-Room Source Code",
      "Formal IP Assignment Certificate",
      "Zero Perpetual Royalty Fees",
      "Commercial Redistribution Allowed"
    ],
    ctaText: "Review License Terms",
    ctaLink: "/terms"
  },
  {
    id: "security-compliance",
    title: "Bank-Grade Security & Audit Trails",
    badge: "SECURITY HARDENED",
    description: "Honeypot anti-spam defense, rate-limiting handlers, CSRF protection, and AES-256 encrypted environment variables.",
    icon: Lock,
    accent: "from-[#8B5CF6] to-[#8B5CF6]/30",
    bullets: [
      "Honeypot Anti-Spam API Protection",
      "IP-Based Rate Limiting Handlers",
      "AES-256 Secret Vault Management",
      "Strict OWASP Top 10 Mitigation"
    ],
    ctaText: "Read Security Spec",
    ctaLink: "/docs#security"
  },
];

export default function FeaturesGrid() {
  return (
    <section id="pipeline" className="py-24 bg-[#07090E] relative overflow-hidden">
      {/* Background Radial Glow Orbs */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-[#00F0FF]/10 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-[#8B5CF6]/10 rounded-full blur-3xl pointer-events-none animate-pulse-slow" style={{ animationDelay: "2.5s" }} />
      <div className="absolute inset-0 bg-dot-matrix opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#00F0FF]/40 bg-[#00F0FF]/10 text-xs font-mono-tabular text-[#00F0FF] backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F0FF] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00F0FF]" />
            </span>
            <span>FULLSTACK SYSTEMS ARCHITECTURE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Production-Grade Software Stacks Built for Speed & Compliance
          </h2>

          <p className="text-base sm:text-lg text-[#94A3B8]">
            Eliminate months of boilerplate development. Every system includes audited source code, native payments, database schemas, and documentation.
          </p>
        </div>

        {/* Feature Cards Grid with Staggered Scroll Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              whileHover={{ y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
              className="rounded-2xl bg-[#0D111A]/80 backdrop-blur-md border border-[#1A2234] p-7 flex flex-col justify-between hover:border-[#00F0FF]/60 transition-all duration-300 group hover:shadow-[0_10px_30px_-5px_rgba(0,240,255,0.2)] relative overflow-hidden"
            >
              {/* Subtle Scanline Effect on Hover */}
              <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent blur-[1px] animate-scanline pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Gradient Corner Ambient Glow */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-[#00F0FF]/15 via-[#8B5CF6]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-bl-full" />

              <div>
                {/* Header row */}
                <div className="flex items-center justify-between mb-5">
                  <div className="p-3 rounded-xl bg-[#07090E] border border-[#1A2234] text-[#00F0FF] group-hover:border-[#00F0FF]/50 transition-colors">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono-tabular tracking-wider uppercase px-2.5 py-1 rounded bg-[#07090E] text-[#8B5CF6] border border-[#8B5CF6]/30 flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />
                    <span>{item.badge}</span>
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#00F0FF] transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm text-[#94A3B8] leading-relaxed mb-6">
                  {item.description}
                </p>

                {/* Feature Bullet Points */}
                <ul className="space-y-2.5 mb-8">
                  {item.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start space-x-2.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-[#00F0FF] shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card Footer CTA */}
              <div className="pt-4 border-t border-[#1A2234]">
                <Link
                  href={item.ctaLink}
                  className="inline-flex items-center space-x-2 text-xs font-semibold text-[#00F0FF] group-hover:text-white transition-colors"
                >
                  <span>{item.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
