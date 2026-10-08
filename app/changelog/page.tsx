"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  GitCommit,
  Tag,
  Search,
  Rss,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Cpu,
  Lock,
  FileCode,
  ExternalLink,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Filter,
  Layers
} from "lucide-react";

interface ReleaseEvent {
  version: string;
  date: string;
  badge: string;
  badgeType: "major" | "security" | "feature";
  tagCategory: "Major Releases" | "Security Patches" | "Integrations";
  title: string;
  description: string;
  highlights: string[];
  commitHash: string;
}

const changelogEvents: ReleaseEvent[] = [
  {
    version: "v2.4.0",
    date: "2026-10-08",
    badge: "MAJOR RELEASE // ZERO-TRUST",
    badgeType: "major",
    tagCategory: "Major Releases",
    title: "Nexus Agent Orchestrator & Multi-Rail Platform Consolidation",
    description: "Introduced enterprise autonomous AI agent orchestrator with gVisor container sandboxes, Upstash Redis vector search, and global currency reactivity.",
    highlights: [
      "⚡ Nexus Agent Orchestrator added with deterministic tool sandboxes and vector search.",
      "🛡️ Supabase Postgres RLS policies upgraded to prevent schema leaks & role escalation.",
      "🌐 Global Currency Switcher (INR / USD) persisted state integration across all routes.",
      "📦 Next.js 15 App Router & React Server Components (RSC) build optimization verified."
    ],
    commitHash: "sha256:c1ffaf0991a"
  },
  {
    version: "v2.3.1",
    date: "2026-09-24",
    badge: "SECURITY PATCH",
    badgeType: "security",
    tagCategory: "Security Patches",
    title: "SHA-256 License Key Verification & Latency Hardening",
    description: "Hardened cryptographic license verification route and optimized Supabase Postgres connection pooler for sub-12ms P99 query latency.",
    highlights: [
      "🔒 Cryptographic License Key verification route (/verify) SHA-256 validator added.",
      "🚀 P99 latency optimization: Sub-12ms query execution via PgBouncer transaction pooling.",
      "🛡️ Anti-bot CSRF honeypot fields added to all contact & authorization forms.",
      "🔑 Automatic license key dispatch to Customer License Vault (/vault)."
    ],
    commitHash: "sha256:ad80eb344b"
  },
  {
    version: "v2.2.0",
    date: "2026-09-10",
    badge: "COMMERCIAL INFRASTRUCTURE",
    badgeType: "feature",
    tagCategory: "Integrations",
    title: "Native Indian GST Invoicing & Multi-Rail Razorpay Settlement",
    description: "Integrated automated 18% GSTR-1 tax invoicing, dynamic UPI QR generation, and Razorpay webhook signature verification.",
    highlights: [
      "💳 Native Indian GST invoice auto-generation on checkout with B2B tax credit support.",
      "📱 WhatsApp direct dispatch integration (+91 9771596801) for enterprise SLA escalation.",
      "⚡ Dynamic UPI QR intent generation (GPay, PhonePe, BHIM) with webhook confirmation.",
      "📄 Exportable CSV and PDF financial tax compliance reports."
    ],
    commitHash: "sha256:f1ef97612c"
  },
  {
    version: "v2.1.0",
    date: "2026-08-28",
    badge: "ERP & LOGISTICS CORE",
    badgeType: "feature",
    tagCategory: "Integrations",
    title: "Quantum Logistics ERP & Thermal Depot Telemetry Engine",
    description: "Shipped multi-depot thermal sensor telemetry store and live GPS fleet unit route tracker.",
    highlights: [
      "🛰️ 450+ Active GPS fleet unit tracking with real-time webhooks.",
      "🌡️ 14 Thermal sensor monitored hubs with threshold alert triggers.",
      "🔐 Role-based access control (Admin, Depot Manager, Fleet Driver roles).",
      "📊 Interactive benchmark spec matrix compare page (/compare)."
    ],
    commitHash: "sha256:8891a2e450"
  },
  {
    version: "v2.0.0",
    date: "2026-08-15",
    badge: "INITIAL ENTERPRISE MARKETPLACE",
    badgeType: "major",
    tagCategory: "Major Releases",
    title: "Project Omega Core Platform Release",
    description: "Initial commercial launch of SUTRA / NEXUS Enterprise Software Marketplace with clean-room source code licenses.",
    highlights: [
      "🎉 Launched zero-config Next.js 15 marketplace architecture.",
      "📜 Commercial IP assignment & unencumbered source code transfer guarantee.",
      "💻 Built-in Docker Compose & Vercel edge deployment generator (/deploy-config).",
      "⚡ Real-time operational status monitoring (/operations)."
    ],
    commitHash: "sha256:0012e87ab1"
  }
];

export default function ChangelogPage() {
  const [selectedTag, setSelectedTag] = useState<string>("All Updates");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [rssCopied, setRssCopied] = useState(false);

  const filteredEvents = useMemo(() => {
    return changelogEvents.filter((evt) => {
      // Tag Filter
      let matchesTag = true;
      if (selectedTag !== "All Updates") {
        matchesTag = evt.tagCategory === selectedTag;
      }
      if (!matchesTag) return false;

      // Search Query Filter
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();

      return (
        evt.version.toLowerCase().includes(q) ||
        evt.title.toLowerCase().includes(q) ||
        evt.description.toLowerCase().includes(q) ||
        evt.badge.toLowerCase().includes(q) ||
        evt.highlights.some((h) => h.toLowerCase().includes(q))
      );
    });
  }, [selectedTag, searchQuery]);

  const handleCopyRssFeed = () => {
    navigator.clipboard.writeText("https://nexus-systems.in/rss.xml");
    setRssCopied(true);
    setTimeout(() => setRssCopied(false), 2000);
  };

  return (
    <div className="pt-32 pb-24 bg-[#07090E] min-h-screen text-slate-100 relative overflow-hidden">
      {/* Ambient Radial Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[400px] bg-[#00F0FF]/10 blur-3xl pointer-events-none rounded-full animate-pulse-slow" />
      <div
        className="absolute bottom-10 right-1/4 w-[550px] h-[350px] bg-[#8B5CF6]/12 blur-3xl pointer-events-none rounded-full animate-pulse-slow"
        style={{ animationDelay: "3s" }}
      />
      <div className="absolute inset-0 bg-dot-matrix opacity-20 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#00F0FF]/40 bg-[#00F0FF]/10 text-xs font-mono-tabular text-[#00F0FF] backdrop-blur-md">
            <GitCommit className="w-4 h-4 text-[#00F0FF]" />
            <span>PLATFORM ARCHITECTURE CHANGELOG // VERSION STREAM</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Release Changelog & Version Matrix
          </h1>

          <p className="text-base text-[#94A3B8] leading-relaxed">
            Continuous security patches, dependency migrations, and enterprise feature releases.
          </p>

          {/* Action Pill & Live Engine Status */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 font-mono-tabular text-xs">
            <button
              onClick={handleCopyRssFeed}
              className="px-4 py-2 rounded-xl bg-[#0D111A] border border-[#00F0FF]/40 text-[#00F0FF] hover:bg-[#00F0FF]/10 transition-colors flex items-center space-x-2 cursor-pointer shadow-[0_0_15px_rgba(0,240,255,0.15)] min-h-[44px]"
            >
              <Rss className="w-4 h-4" />
              <span>{rssCopied ? "RSS Feed URL Copied!" : "[📡 Subscribe to RSS / GitHub Releases]"}</span>
            </button>

            <div className="px-4 py-2 rounded-xl bg-[#0D111A] border border-emerald-500/40 text-emerald-400 flex items-center space-x-2 shadow-[0_0_15px_rgba(52,211,153,0.15)] min-h-[44px]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="font-bold">ENGINE CORE v2.4.0 (LATEST STABLE)</span>
            </div>
          </div>
        </div>

        {/* SEARCH BAR & FILTER TAG PILLS */}
        <div className="rounded-2xl bg-[#0D111A]/90 backdrop-blur-md border border-[#00F0FF]/30 p-6 shadow-xl space-y-4">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Tag Pills */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono-tabular w-full sm:w-auto">
              {(["All Updates", "Major Releases", "Security Patches", "Integrations"] as const).map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer font-bold min-h-[38px] ${
                    selectedTag === tag
                      ? "bg-[#00F0FF] text-black shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                      : "bg-[#07090E] text-slate-400 border border-[#1A2234] hover:text-white"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64 font-mono-tabular">
              <Search className="w-4 h-4 text-[#00F0FF] absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search patch notes..."
                className="w-full bg-[#07090E] border border-[#1A2234] focus:border-[#00F0FF] rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
              />
            </div>

          </div>

          <div className="text-[11px] font-mono-tabular text-slate-400 flex items-center justify-between border-t border-[#1A2234] pt-3">
            <span>Showing {filteredEvents.length} of {changelogEvents.length} release entries</span>
            <span>Tag: {selectedTag}</span>
          </div>
        </div>

        {/* CHRONOLOGICAL TIMELINE */}
        <div className="relative border-l-2 border-[#1A2234] ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-10">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((evt, idx) => (
              <div key={evt.version} className="relative group">
                
                {/* Timeline Dot Node */}
                <div
                  className={`absolute -left-[31px] sm:-left-[47px] top-1.5 w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                    evt.badgeType === "major"
                      ? "bg-[#00F0FF] border-[#00F0FF] text-black shadow-[0_0_15px_rgba(0,240,255,0.5)]"
                      : evt.badgeType === "security"
                      ? "bg-[#8B5CF6] border-[#8B5CF6] text-white shadow-[0_0_15px_rgba(139,92,246,0.5)]"
                      : "bg-[#07090E] border-[#00F0FF]/60 text-[#00F0FF]"
                  }`}
                >
                  <GitCommit className="w-3.5 h-3.5" />
                </div>

                {/* Event Card */}
                <div className="rounded-2xl bg-[#0D111A]/80 backdrop-blur-md border border-[#00F0FF]/30 p-6 sm:p-8 shadow-2xl space-y-4 relative overflow-hidden group-hover:border-[#00F0FF]/60 transition-all">
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent blur-[1px] animate-scanline pointer-events-none opacity-40 z-20" />

                  {/* Top Bar: Version & Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1A2234] pb-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-xl sm:text-2xl font-extrabold text-white font-mono-tabular tracking-tight">
                        {evt.version}
                      </span>
                      <span
                        className={`text-[10px] font-mono-tabular tracking-wider uppercase px-3 py-1 rounded border ${
                          evt.badgeType === "major"
                            ? "bg-[#00F0FF]/10 text-[#00F0FF] border-[#00F0FF]/30"
                            : evt.badgeType === "security"
                            ? "bg-[#8B5CF6]/10 text-[#8B5CF6] border-[#8B5CF6]/30"
                            : "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                        }`}
                      >
                        {evt.badge}
                      </span>
                    </div>

                    <div className="flex items-center space-x-3 text-xs font-mono-tabular text-slate-400">
                      <span>Released: {evt.date}</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-[#00F0FF] font-mono">{evt.commitHash}</span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1">
                    <h2 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#00F0FF] transition-colors">
                      {evt.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                      {evt.description}
                    </p>
                  </div>

                  {/* Highlights Bullet List */}
                  <div className="space-y-2 pt-2">
                    <div className="text-[11px] font-mono-tabular text-[#00F0FF] uppercase">
                      RELEASE HIGHLIGHTS & ARCHITECTURAL COMMITS:
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono-tabular">
                      {evt.highlights.map((item, i) => (
                        <li key={i} className="flex items-start space-x-2 text-slate-200 bg-[#07090E] p-2.5 rounded-xl border border-[#1A2234]">
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>
            ))
          ) : (
            <div className="p-8 rounded-2xl bg-[#0D111A] border border-[#1A2234] text-center space-y-3 font-mono-tabular text-xs">
              <div className="text-slate-400">Zero release notes match search query &quot;{searchQuery}&quot;.</div>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedTag("All Updates");
                }}
                className="px-4 py-2 rounded-xl bg-[#00F0FF] text-black font-bold"
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </div>

        {/* BOTTOM CTA BANNER */}
        <div className="p-8 rounded-3xl bg-[#0D111A]/90 backdrop-blur-md border border-[#00F0FF]/40 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white">Looking for custom security patches or on-premise upgrades?</h3>
            <p className="text-xs text-[#94A3B8]">Our architectural engineering team delivers dedicated SOC2 patch attestations.</p>
          </div>
          <Link
            href="/playground"
            className="px-6 py-3.5 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-[#00F0FF] to-[#8B5CF6] hover:opacity-95 transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)] shrink-0 min-h-[44px] flex items-center"
          >
            <span>Test Live Sandbox ⚡</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
