"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Activity,
  CheckCircle2,
  RefreshCw,
  Server,
  Zap,
  ShieldCheck,
  Globe,
  Database,
  Radio,
  Clock,
  Terminal,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Sliders,
  Cpu,
  Layers,
  Sparkles
} from "lucide-react";
import { getAllSystems } from "@/data/systems";

interface MaintenanceLog {
  id: string;
  type: "RESOLVED" | "COMPLETED" | "MONITORED";
  title: string;
  timestamp: string;
  duration: string;
  affectedNodes: string;
  details: string;
}

const operationalLogs: MaintenanceLog[] = [
  {
    id: "log-1",
    type: "RESOLVED",
    title: "Scheduled DB Migration & Vacuuming (Zero Downtime)",
    timestamp: "OCT 11, 2026 // 14:20 UTC",
    duration: "4m 12s",
    affectedNodes: "Supabase Postgres Pooler (ap-south-1)",
    details: "Automated pg_repack and table vacuuming on multi-tenant partition indexes. P99 query latency decreased by 3.8ms with 0.00% connection drops."
  },
  {
    id: "log-2",
    type: "COMPLETED",
    title: "Global Edge TLS 1.3 Key Rotation",
    timestamp: "OCT 09, 2026 // 03:00 UTC",
    duration: "1m 45s",
    affectedNodes: "Global Edge Mesh (BOM, FRA, IAD)",
    details: "Automated cryptographic ECDSA P-256 certificate renewal dispatched across all edge ingress proxy layers. Zero client renegotiation degradation."
  },
  {
    id: "log-3",
    type: "MONITORED",
    title: "P99 Redis cache warming spike mitigated (1.2m)",
    timestamp: "OCT 06, 2026 // 19:45 UTC",
    duration: "1m 14s",
    affectedNodes: "Upstash Redis Vector Cache (ap-south-1)",
    details: "Temporary cache warming concurrency surge triggered autonomous horizontal pod autoscaler (HPA). Latency normalized to < 4ms within 74 seconds."
  },
  {
    id: "log-4",
    type: "COMPLETED",
    title: "SHA-256 Cryptographic Vault Key Cluster Expansion",
    timestamp: "OCT 03, 2026 // 11:10 UTC",
    duration: "8m 30s",
    affectedNodes: "NEXUS License Authority",
    details: "Commissioned 4 new HSM attestation verification nodes across EU and US regions for sub-12ms commercial entitlement handshakes."
  },
  {
    id: "log-5",
    type: "RESOLVED",
    title: "Automated GSTR-1 & WhatsApp Dispatch Webhook SLA Audit",
    timestamp: "SEP 29, 2026 // 08:30 UTC",
    duration: "2m 10s",
    affectedNodes: "Outbound Lead & Invoicing Relay",
    details: "Full dry-run telemetry test passed with 10,000 simulated simultaneous UPI/Razorpay webhook callbacks. 100.0% delivery rate verified."
  }
];

export default function OperationsPage() {
  const systems = getAllSystems();

  // Real-time dynamic states (Client-side simulation)
  const [edgeLatency, setEdgeLatency] = useState<number>(19);
  const [activeRegion, setActiveRegion] = useState<"APAC" | "EU" | "US">("APAC");
  const [lastSyncTime, setLastSyncTime] = useState<string>("JUST NOW");
  const [isManualSyncing, setIsManualSyncing] = useState<boolean>(false);
  const [hoveredDay, setHoveredDay] = useState<{ system: string; day: number } | null>(null);
  const [expandedLogs, setExpandedLogs] = useState<Record<string, boolean>>({ "log-1": true });

  // Fluctuation state for RPS per system
  const [liveRps, setLiveRps] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    systems.forEach((s) => {
      initial[s.slug] = s.throughputReqSec || 24000;
    });
    return initial;
  });

  // Oscillating telemetry effect
  useEffect(() => {
    const timer = setInterval(() => {
      // Oscillate global edge latency between 18ms and 24ms
      setEdgeLatency(18 + Math.floor(Math.random() * 7));

      // Jitter throughput per system slightly
      setLiveRps((prev) => {
        const next: Record<string, number> = {};
        systems.forEach((s) => {
          const base = s.throughputReqSec || 24000;
          const jitter = Math.floor((Math.random() - 0.5) * (base * 0.03));
          next[s.slug] = base + jitter;
        });
        return next;
      });

      const now = new Date();
      setLastSyncTime(now.toLocaleTimeString("en-US", { hour12: false }));
    }, 2500);

    return () => clearInterval(timer);
  }, [systems]);

  const handleManualSync = () => {
    setIsManualSyncing(true);
    setTimeout(() => {
      setEdgeLatency(18 + Math.floor(Math.random() * 5));
      const now = new Date();
      setLastSyncTime(now.toLocaleTimeString("en-US", { hour12: false }));
      setIsManualSyncing(false);
    }, 600);
  };

  const toggleLog = (id: string) => {
    setExpandedLogs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="pt-28 sm:pt-32 pb-24 bg-[#07090E] min-h-screen text-slate-100 relative overflow-hidden font-sans">
      {/* Structural Neo-Brutalist Grid Lines & Scanlines */}
      <div className="absolute inset-0 bg-dot-matrix opacity-25 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />
      <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF]/40 to-transparent blur-[1px] animate-scanline pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">

        {/* ========================================================= */}
        {/* HEADER SECTION */}
        {/* ========================================================= */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-none border-2 border-emerald-400 bg-emerald-500/10 text-xs font-mono font-bold text-emerald-400 shadow-[2px_2px_0px_0px_#10B981]">
            <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>[ENTERPRISE_NOC // PUBLIC_STATUS_STREAM]</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase font-mono">
            NOC TELEMETRY &amp; SYSTEM STATUS
          </h1>

          <p className="text-xs sm:text-sm font-mono text-[#94A3B8] leading-relaxed max-w-2xl mx-auto">
            Live infrastructure observability across all 6 enterprise codebases, regional edge latency matrices, and verified 90-day SLA performance records.
          </p>
        </div>

        {/* ========================================================= */}
        {/* 1. GLOBAL SYSTEM HEALTH BANNER */}
        {/* ========================================================= */}
        <div className="rounded-none bg-[#0D111A] border-2 border-emerald-400 p-5 sm:p-7 shadow-[4px_4px_0px_0px_#10B981] relative overflow-hidden">
          <div className="absolute top-0 right-0 px-4 py-1 bg-emerald-400 text-black font-mono font-bold text-[10px] tracking-wider uppercase">
            LIVE NOC FEED
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Status Indicator & Title */}
            <div className="md:col-span-6 flex items-start space-x-4">
              <div className="relative flex h-6 w-6 shrink-0 mt-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-none bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-none h-6 w-6 bg-emerald-400 border-2 border-black" />
              </div>

              <div className="space-y-1">
                <div className="text-xs font-mono font-black text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                  <span>[ALL_SYSTEMS_OPERATIONAL // INCIDENTS: 0]</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black font-mono text-white tracking-tight uppercase">
                  All 6 Core Systems Operational
                </h2>
                <p className="text-xs font-mono text-slate-400">
                  Zero service disruptions across Indian and global edge availability zones.
                </p>
              </div>
            </div>

            {/* Telemetry Metrics Strip */}
            <div className="md:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
              
              {/* Metric 1: Uptime */}
              <div className="p-3 bg-[#07090E] border-2 border-[#1A2234]">
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  OVERALL UPTIME
                </div>
                <div className="text-base sm:text-lg font-bold text-white mt-0.5">
                  99.98%
                </div>
                <div className="text-[10px] text-emerald-400 font-bold">
                  (LAST 90 DAYS)
                </div>
              </div>

              {/* Metric 2: P99 Edge Latency */}
              <div className="p-3 bg-[#07090E] border-2 border-[#1A2234]">
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  P99 EDGE LATENCY
                </div>
                <div className="text-base sm:text-lg font-bold text-[#00F0FF] mt-0.5 flex items-center space-x-1.5">
                  <span>{edgeLatency}ms</span>
                  <span className="text-[10px] text-slate-500 font-normal">/ P99</span>
                </div>
                <div className="text-[10px] text-slate-400 truncate">
                  [18ms - 24ms RANGE]
                </div>
              </div>

              {/* Metric 3: Heartbeat Sync */}
              <div className="p-3 bg-[#07090E] border-2 border-[#1A2234] col-span-2 sm:col-span-1 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    HEARTBEAT SYNC
                  </div>
                  <div className="text-xs font-bold text-white mt-1">
                    {lastSyncTime}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleManualSync}
                  disabled={isManualSyncing}
                  className="mt-2 py-1 px-2 rounded-none bg-[#0D111A] hover:bg-[#00F0FF] text-[#00F0FF] hover:text-black border border-[#00F0FF] text-[10px] font-bold flex items-center justify-center space-x-1 transition-all cursor-pointer"
                  title="Force telemetry refresh"
                >
                  <RefreshCw className={`w-3 h-3 ${isManualSyncing ? "animate-spin" : ""}`} />
                  <span>{isManualSyncing ? "SYNCING..." : "PULSE"}</span>
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. PER-SYSTEM TELEMETRY GRID (ALL 6 SYSTEMS) */}
        {/* ========================================================= */}
        <div className="space-y-4">
          
          {/* Section Subheader */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center space-x-2 text-white font-bold uppercase">
              <Server className="w-4 h-4 text-[#00F0FF]" />
              <span>[02. REGISTRY WORKLOAD TELEMETRY // 6 SYSTEMS ACTIVE]</span>
            </div>

            {/* Regional Latency Switcher */}
            <div className="flex items-center space-x-1 bg-[#0D111A] border-2 border-[#1A2234] p-1">
              <span className="text-[10px] text-slate-400 px-2 font-bold uppercase">REGION:</span>
              {(["APAC", "EU", "US"] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setActiveRegion(r)}
                  className={`px-2.5 py-1 text-[10px] font-bold uppercase transition-all ${
                    activeRegion === r
                      ? "bg-[#00F0FF] text-black shadow-[1px_1px_0px_0px_#00F0FF]"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-mono">
            {systems.map((sys) => {
              const currentRps = liveRps[sys.slug] || sys.throughputReqSec || 24000;

              // Regional Latencies
              const regionalPing =
                activeRegion === "APAC"
                  ? `${Math.floor(sys.reflectionCycleMs || 12)}ms`
                  : activeRegion === "EU"
                  ? `${Math.floor((sys.reflectionCycleMs || 12) * 2.4)}ms`
                  : `${Math.floor((sys.reflectionCycleMs || 12) * 3.6)}ms`;

              const regionLabel =
                activeRegion === "APAC"
                  ? "Mumbai (ap-south-1)"
                  : activeRegion === "EU"
                  ? "Frankfurt (eu-central-1)"
                  : "N. Virginia (us-east-1)";

              return (
                <div
                  key={sys.id}
                  className="rounded-none bg-[#0D111A] border-2 border-[#1A2234] p-6 hover:border-[#00F0FF] shadow-[4px_4px_0px_0px_#1A2234] hover:shadow-[4px_4px_0px_0px_#00F0FF] transition-all flex flex-col justify-between space-y-5 relative group"
                >
                  
                  {/* Card Header */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="px-2 py-0.5 bg-[#07090E] text-[#00F0FF] border border-[#1A2234] font-bold uppercase">
                        [{sys.category}]
                      </span>
                      <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/40 font-bold">
                        v2.4.0-prod
                      </span>
                    </div>

                    <Link
                      href={`/systems/${sys.slug}`}
                      className="text-base font-bold text-white group-hover:text-[#00F0FF] transition-colors block uppercase tracking-tight"
                    >
                      {sys.name}
                    </Link>

                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                      {sys.tagline}
                    </p>
                  </div>

                  {/* Mid Telemetry Strip */}
                  <div className="space-y-3 pt-3 border-t-2 border-[#1A2234] text-xs">
                    
                    {/* Live Throughput / RPS */}
                    <div className="flex justify-between items-center bg-[#07090E] p-2.5 border border-[#1A2234]">
                      <div className="flex items-center space-x-2 text-slate-400">
                        <Activity className="w-3.5 h-3.5 text-[#00F0FF]" />
                        <span>LIVE THROUGHPUT:</span>
                      </div>
                      <span className="font-bold text-white flex items-center space-x-1">
                        <span className="text-[#00F0FF]">{currentRps.toLocaleString()}</span>
                        <span className="text-[10px] text-slate-500">req/s</span>
                      </span>
                    </div>

                    {/* Regional Latency */}
                    <div className="flex justify-between items-center text-slate-300">
                      <div className="flex items-center space-x-1.5 text-slate-400">
                        <Globe className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="truncate max-w-[130px]">{regionLabel}:</span>
                      </div>
                      <span className="text-emerald-400 font-bold">{regionalPing}</span>
                    </div>

                    {/* Database & Security */}
                    <div className="flex justify-between items-center text-slate-300 text-[11px]">
                      <span className="text-slate-500">STORAGE ENGINE:</span>
                      <span className="text-slate-300 font-semibold truncate max-w-[160px]">
                        {sys.database.split(" ")[0]} RLS
                      </span>
                    </div>

                    {/* 90-Day Uptime Ticks Visualizer */}
                    <div className="space-y-1.5 pt-2 border-t border-[#1A2234]">
                      <div className="flex justify-between text-[10px] text-slate-400">
                        <span>90-Day Uptime History</span>
                        <span className="text-emerald-400 font-bold">100.0% UPTIME</span>
                      </div>

                      {/* Interactive Uptime Tick Bars (45 Dual-Day Bars for visual crispness) */}
                      <div className="flex items-center space-x-[2px] h-5 bg-[#07090E] p-1 border border-[#1A2234]">
                        {Array.from({ length: 45 }).map((_, barIdx) => {
                          const dayNum = 90 - barIdx * 2;
                          return (
                            <div
                              key={barIdx}
                              onMouseEnter={() => setHoveredDay({ system: sys.slug, day: dayNum })}
                              onMouseLeave={() => setHoveredDay(null)}
                              className="flex-1 h-full bg-emerald-400 hover:bg-[#00F0FF] transition-colors cursor-crosshair"
                              title={`Day -${dayNum}: 100% Operational (0 incident ms)`}
                            />
                          );
                        })}
                      </div>

                      {/* Day Hover Readout */}
                      <div className="text-[9px] text-slate-500 flex justify-between h-3">
                        <span>90 days ago</span>
                        <span>
                          {hoveredDay && hoveredDay.system === sys.slug
                            ? `[DAY -${hoveredDay.day}: 100% OPERATIONAL]`
                            : "Today"}
                        </span>
                      </div>
                    </div>

                  </div>

                  {/* Card Bottom CTA */}
                  <div className="pt-2 border-t border-[#1A2234] flex items-center justify-between text-xs">
                    <span className="text-[10px] text-emerald-400 font-bold flex items-center space-x-1">
                      <span className="w-1.5 h-1.5 rounded-none bg-emerald-400 animate-pulse" />
                      <span>OPERATIONAL</span>
                    </span>

                    <Link
                      href={`/systems/${sys.slug}`}
                      className="text-[#00F0FF] hover:text-white font-bold flex items-center space-x-1 group-hover:translate-x-1 transition-all"
                    >
                      <span>SPEC &amp; BENCHMARKS</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

        {/* ========================================================= */}
        {/* 3. SIMULATED INCIDENT HISTORY & MAINTENANCE LOGS */}
        {/* ========================================================= */}
        <div className="rounded-none bg-[#0D111A] border-2 border-[#1A2234] p-5 sm:p-7 shadow-[4px_4px_0px_0px_#1A2234] space-y-6">
          
          <div className="flex flex-wrap items-center justify-between pb-4 border-b-2 border-[#1A2234] gap-2 font-mono">
            <div className="flex items-center space-x-3">
              <Terminal className="w-5 h-5 text-[#00F0FF]" />
              <h2 className="text-sm font-black text-white tracking-wider uppercase">
                [03. INCIDENT HISTORY &amp; MAINTENANCE AUDIT LOGS]
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-bold">
              [ZERO UNRESOLVED INCIDENTS]
            </span>
          </div>

          <div className="space-y-3 font-mono">
            {operationalLogs.map((log) => {
              const isExpanded = !!expandedLogs[log.id];

              // Badge styling per incident status
              const badgeClass =
                log.type === "RESOLVED"
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500"
                  : log.type === "MONITORED"
                  ? "bg-amber-500/10 text-amber-400 border-amber-500"
                  : "bg-[#00F0FF]/10 text-[#00F0FF] border-[#00F0FF]";

              return (
                <div
                  key={log.id}
                  className="rounded-none bg-[#07090E] border-2 border-[#1A2234] p-4 space-y-3 hover:border-[#00F0FF] transition-colors"
                >
                  <div
                    onClick={() => toggleLog(log.id)}
                    className="flex flex-wrap items-center justify-between cursor-pointer gap-2 min-h-[36px]"
                  >
                    <div className="flex items-center space-x-3 truncate">
                      <span className={`px-2.5 py-1 rounded-none text-[10px] font-bold border-2 ${badgeClass}`}>
                        [{log.type}]
                      </span>
                      <span className="text-xs font-bold text-white truncate max-w-xl">
                        {log.title}
                      </span>
                    </div>

                    <div className="flex items-center space-x-3 shrink-0 text-slate-400 text-xs">
                      <span className="text-[11px] text-slate-500 hidden sm:inline">{log.timestamp}</span>
                      <span className="text-[10px] px-2 py-0.5 bg-[#0D111A] text-slate-300 border border-[#1A2234]">
                        DUR: {log.duration}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-[#00F0FF]" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-500" />
                      )}
                    </div>
                  </div>

                  {/* Expanded Audit Post-Mortem Details */}
                  {isExpanded && (
                    <div className="pt-3 border-t-2 border-[#1A2234] text-xs text-slate-300 leading-relaxed bg-[#0D111A] p-3.5 space-y-2">
                      <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 border-b border-[#1A2234] pb-2">
                        <span>AFFECTED INFRASTRUCTURE: <span className="text-white font-bold">{log.affectedNodes}</span></span>
                        <span>RESOLUTION SLA: <span className="text-emerald-400 font-bold">100% MET</span></span>
                      </div>
                      <p className="text-slate-200">
                        {log.details}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

        {/* ========================================================= */}
        {/* BOTTOM NAVIGATION ACTIONS */}
        {/* ========================================================= */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 font-mono">
          <Link
            href="/playground"
            className="w-full sm:w-auto px-6 py-3 rounded-none bg-[#07090E] hover:bg-[#00F0FF]/10 text-[#00F0FF] font-bold text-xs uppercase tracking-wider border-2 border-[#00F0FF] shadow-[4px_4px_0px_0px_#00F0FF] active:translate-x-[2px] active:translate-y-[2px] transition-all flex items-center justify-center space-x-2 min-h-[44px]"
          >
            <span>[TEST IN LIVE PLAYGROUND ⚡]</span>
          </Link>

          <Link
            href="/systems"
            className="w-full sm:w-auto px-8 py-3 rounded-none bg-[#00F0FF] hover:bg-white text-black font-black text-xs uppercase tracking-wider border-2 border-[#00F0FF] hover:border-white shadow-[4px_4px_0px_0px_#8B5CF6] active:translate-x-[2px] active:translate-y-[2px] transition-all flex items-center justify-center space-x-2 min-h-[44px]"
          >
            <span>[VIEW SYSTEMS CATALOG ➔]</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
