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
      {/* Structural Neo-Brutalist Grid Lines */}
      <div className="absolute inset-0 bg-dot-matrix opacity-20 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-none border-2 border-[#00F0FF] bg-[#00F0FF]/10 text-xs font-mono font-bold text-[#00F0FF] shadow-[2px_2px_0px_0px_#00F0FF]">
            <GitCommit className="w-4 h-4 text-[#00F0FF]" />
            <span>[PLATFORM ARCHITECTURE CHANGELOG // VERSION STREAM]</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase font-mono">
            RELEASE CHANGELOG &amp; VERSION MATRIX
          </h1>

          <p className="text-sm font-mono text-[#94A3B8] leading-relaxed">
            Continuous security patches, dependency migrations, and enterprise feature releases.
          </p>

          {/* Action Pill & Live Engine Status */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 font-mono text-xs">
            <button
              onClick={handleCopyRssFeed}
              className="px-4 py-2 rounded-none bg-[#0D111A] border-2 border-[#00F0FF] text-[#00F0FF] hover:bg-[#00F0FF] hover:text-black transition-all flex items-center space-x-2 cursor-pointer shadow-[2px_2px_0px_0px_#00F0FF] active:translate-x-[1px] active:translate-y-[1px] min-h-[44px] font-bold"
            >
              <Rss className="w-4 h-4" />
              <span>{rssCopied ? "[RSS FEED URL COPIED!]" : "[📡 SUBSCRIBE TO RSS / GITHUB RELEASES]"}</span>
            </button>

            <div className="px-4 py-2 rounded-none bg-[#0D111A] border-2 border-emerald-500 text-emerald-400 flex items-center space-x-2 shadow-[2px_2px_0px_0px_#10B981] min-h-[44px]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-none bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-none h-2 w-2 bg-emerald-400" />
              </span>
              <span className="font-bold">[ENGINE CORE v2.4.0 (LATEST STABLE)]</span>
            </div>
          </div>
        </div>

        {/* SEARCH BAR & FILTER TAG PILLS */}
        <div className="rounded-none bg-[#0D111A] border-2 border-[#1A2234] p-6 shadow-[4px_4px_0px_0px_#1A2234] space-y-4">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Tag Pills */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono w-full sm:w-auto">
              {(["All Updates", "Major Releases", "Security Patches", "Integrations"] as const).map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3.5 py-2 rounded-none transition-all cursor-pointer font-bold min-h-[38px] border-2 ${
                    selectedTag === tag
                      ? "bg-[#00F0FF] text-black border-[#00F0FF] shadow-[2px_2px_0px_0px_#00F0FF]"
                      : "bg-[#07090E] text-slate-400 border-[#1A2234] hover:text-white hover:border-[#00F0FF]/50"
                  }`}
                >
                  [{tag.toUpperCase()}]
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64 font-mono">
              <Search className="w-4 h-4 text-[#00F0FF] absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search patch notes..."
                className="w-full bg-[#07090E] border-2 border-[#1A2234] focus:border-[#00F0FF] rounded-none pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
              />
            </div>

          </div>

          <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between border-t-2 border-[#1A2234] pt-3">
            <span>[SHOWING {filteredEvents.length} OF {changelogEvents.length} RELEASE ENTRIES]</span>
            <span className="text-[#00F0FF] font-bold">[FILTER: {selectedTag.toUpperCase()}]</span>
          </div>
        </div>

        {/* CHRONOLOGICAL TIMELINE */}
        <div className="relative border-l-2 border-[#1A2234] ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-10">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((evt) => (
              <div key={evt.version} className="relative group">
                
                {/* Timeline Square Dot Node */}
                <div
                  className={`absolute -left-[31px] sm:-left-[47px] top-1.5 w-6 h-6 rounded-none flex items-center justify-center border-2 transition-all ${
                    evt.badgeType === "major"
                      ? "bg-[#00F0FF] border-[#00F0FF] text-black shadow-[2px_2px_0px_0px_#00F0FF]"
                      : evt.badgeType === "security"
                      ? "bg-[#8B5CF6] border-[#8B5CF6] text-white shadow-[2px_2px_0px_0px_#8B5CF6]"
                      : "bg-[#07090E] border-[#00F0FF] text-[#00F0FF]"
                  }`}
                >
                  <GitCommit className="w-3.5 h-3.5" />
                </div>

                {/* Event Card */}
                <div className="rounded-none bg-[#0D111A] border-2 border-[#1A2234] p-6 sm:p-8 shadow-[4px_4px_0px_0px_#1A2234] space-y-4 relative overflow-hidden group-hover:border-[#00F0FF] group-hover:shadow-[4px_4px_0px_0px_#00F0FF] transition-all">
                  {/* Top Bar: Version & Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-[#1A2234] pb-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-xl sm:text-2xl font-black text-white font-mono tracking-tight">
                        [{evt.version}]
                      </span>
                      <span
                        className={`text-[10px] font-mono font-bold tracking-wider uppercase px-2.5 py-1 rounded-none border-2 ${
                          evt.badgeType === "major"
                            ? "bg-[#00F0FF]/10 text-[#00F0FF] border-[#00F0FF]"
                            : evt.badgeType === "security"
                            ? "bg-[#8B5CF6]/10 text-[#8B5CF6] border-[#8B5CF6]"
                            : "bg-emerald-500/10 text-emerald-400 border-emerald-500"
                        }`}
                      >
                        [{evt.badge}]
                      </span>
                    </div>

                    <div className="flex items-center space-x-3 text-xs font-mono text-slate-400">
                      <span>Released: {evt.date}</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-[#00F0FF] font-mono font-bold">[{evt.commitHash}]</span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1">
                    <h2 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#00F0FF] transition-colors font-mono">
                      {evt.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed font-mono">
                      {evt.description}
                    </p>
                  </div>

                  {/* Highlights Bullet List */}
                  <div className="space-y-2 pt-2">
                    <div className="text-[11px] font-mono text-[#00F0FF] font-bold uppercase tracking-wider">
                      [RELEASE HIGHLIGHTS &amp; ARCHITECTURAL COMMITS]:
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                      {evt.highlights.map((item, i) => (
                        <li key={i} className="flex items-start space-x-2 text-slate-200 bg-[#07090E] p-2.5 rounded-none border-2 border-[#1A2234]">
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>
            ))
          ) : (
            <div className="p-8 rounded-none bg-[#0D111A] border-2 border-[#1A2234] text-center space-y-3 font-mono text-xs shadow-[4px_4px_0px_0px_#1A2234]">
              <div className="text-slate-400">Zero release notes match search query &quot;{searchQuery}&quot;.</div>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedTag("All Updates");
                }}
                className="px-4 py-2 rounded-none bg-[#00F0FF] hover:bg-white text-black font-black uppercase tracking-wider border-2 border-[#00F0FF] shadow-[2px_2px_0px_0px_#00F0FF] cursor-pointer min-h-[44px]"
              >
                [RESET SEARCH FILTERS]
              </button>
            </div>
          )}
        </div>

        {/* BOTTOM CTA BANNER */}
        <div className="p-8 rounded-none bg-[#0D111A] border-2 border-[#00F0FF] shadow-[4px_4px_0px_0px_#00F0FF] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-xl font-black text-white uppercase font-mono">Looking for custom security patches or on-premise upgrades?</h3>
            <p className="text-xs font-mono text-[#94A3B8]">Our architectural engineering team delivers dedicated SOC2 patch attestations.</p>
          </div>
          <Link
            href="/playground"
            className="px-6 py-3.5 rounded-none text-xs font-black uppercase tracking-wider font-mono text-black bg-[#00F0FF] hover:bg-white border-2 border-[#00F0FF] hover:border-white shadow-[4px_4px_0px_0px_#00F0FF] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#00F0FF] transition-all shrink-0 min-h-[44px] flex items-center"
          >
            <span>[TEST LIVE SANDBOX ⚡]</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
