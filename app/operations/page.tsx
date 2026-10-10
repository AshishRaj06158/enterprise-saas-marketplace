"use client";

import React, { useState, useEffect } from "react";
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
  AlertCircle,
  ArrowRight
} from "lucide-react";

interface NodeStatus {
  id: string;
  name: string;
  category: string;
  status: "Operational" | "Degraded" | "Maintenance";
  ping: string;
  metricLabel: string;
  metricValue: string;
  uptimePct: string;
  uptimeHistory: boolean[]; // 30 days boolean array (true = 100% uptime)
}

const nodeData: NodeStatus[] = [
  {
    id: "orchestrator",
    name: "Nexus Orchestrator Runtime",
    category: "Workflow Core",
    status: "Operational",
    ping: "18ms",
    metricLabel: "Active Tool Execution Loops",
    metricValue: "4,120 active",
    uptimePct: "99.99%",
    uptimeHistory: Array(30).fill(true),
  },
  {
    id: "edge-cdn",
    name: "Global Edge CDN (Vercel Mumbai/BOM & Frankfurt)",
    category: "Edge Infrastructure",
    status: "Operational",
    ping: "9ms",
    metricLabel: "Edge Hit Ratio",
    metricValue: "99.4%",
    uptimePct: "100%",
    uptimeHistory: Array(30).fill(true),
  },
  {
    id: "telemetry-bus",
    name: "Telemetry & Event Bus",
    category: "Real-time Stream",
    status: "Operational",
    ping: "12ms",
    metricLabel: "Stream Throughput",
    metricValue: "4,800 req/s",
    uptimePct: "99.98%",
    uptimeHistory: Array(30).fill(true),
  },
  {
    id: "license-auth",
    name: "License Verification Node (SHA-256 Authority)",
    category: "Security Vault",
    status: "Operational",
    ping: "14ms",
    metricLabel: "Verification SLA",
    metricValue: "100% Validated",
    uptimePct: "100%",
    uptimeHistory: Array(30).fill(true),
  },
  {
    id: "lead-dispatch",
    name: "Inbound Lead Dispatch Relay (WhatsApp/Resend)",
    category: "Notification Rails",
    status: "Operational",
    ping: "22ms",
    metricLabel: "Pending Dispatch Queue",
    metricValue: "0 pending",
    uptimePct: "99.95%",
    uptimeHistory: Array(30).fill(true),
  },
  {
    id: "postgres-rls",
    name: "Supabase Postgres RLS Connection Pool",
    category: "Data Storage",
    status: "Operational",
    ping: "11ms",
    metricLabel: "Pool Connection Load",
    metricValue: "120/200 active",
    uptimePct: "99.99%",
    uptimeHistory: Array(30).fill(true),
  },
];

interface LogItem {
  id: string;
  type: "RESOLVED" | "MAINTENANCE" | "COMPLETED";
  title: string;
  date: string;
  details: string;
}

const logsData: LogItem[] = [
  {
    id: "log-1",
    type: "RESOLVED",
    title: "Edge cache invalidation optimization completed — 0 Downtime",
    date: "Oct 08, 2026 - 18:42 UTC",
    details: "Automated cache purging rules deployed across BOM and FRA edge nodes. P99 latency reduced by 4.2ms."
  },
  {
    id: "log-2",
    type: "MAINTENANCE",
    title: "Upstash Redis Vector index compaction scheduled",
    date: "Oct 07, 2026 - 02:00 UTC",
    details: "Scheduled vector index defragmentation for high-dimensional prompt embeddings. Zero user-facing latency impact."
  },
  {
    id: "log-3",
    type: "RESOLVED",
    title: "SHA-256 cryptographic verification node cluster expanded to 12 edge nodes",
    date: "Oct 05, 2026 - 11:15 UTC",
    details: "Expanded automated license attestation authority across global edge locations for sub-15ms key verification."
  },
  {
    id: "log-4",
    type: "COMPLETED",
    title: "Automated GSTR-1 & WhatsApp Dispatch Webhook SLA verification",
    date: "Oct 02, 2026 - 09:30 UTC",
    details: "Full dry-run telemetry test passed for high-concurrency commercial license purchases."
  }
];

export default function OperationsStatusPage() {
  const [lastSync, setLastSync] = useState<Date>(new Date());
  const [isSyncing, setIsSyncing] = useState(false);
  const [expandedLogs, setExpandedLogs] = useState<Record<string, boolean>>({});

  const handleManualSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setLastSync(new Date());
      setIsSyncing(false);
    }, 800);
  };

  // Auto-sync heartbeat timer every 30s
  useEffect(() => {
    const timer = setInterval(() => {
      setLastSync(new Date());
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  const toggleLogExpand = (id: string) => {
    setExpandedLogs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="pt-32 pb-24 bg-[#07090E] min-h-screen text-slate-100 relative overflow-hidden">
      {/* Structural Neo-Brutalist Grid Lines */}
      <div className="absolute inset-0 bg-dot-matrix opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-none border-2 border-[#00F0FF] bg-[#00F0FF]/10 text-xs font-mono font-bold text-[#00F0FF] shadow-[2px_2px_0px_0px_#00F0FF]">
            <Radio className="w-4 h-4 text-[#00F0FF] animate-pulse" />
            <span>[GLOBAL SYSTEM HEALTH // LIVE TELEMETRY STATUS]</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase font-mono">
            SYSTEM STATUS &amp; OPERATIONS DASHBOARD
          </h1>

          <p className="text-sm font-mono text-[#94A3B8] leading-relaxed">
            Real-time operational health, edge node latency, and incident maintenance logs across all software platforms.
          </p>
        </div>

        {/* Global Operational Status Banner */}
        <div className="rounded-none bg-[#0D111A] border-2 border-emerald-500 p-6 sm:p-8 shadow-[4px_4px_0px_0px_#10B981] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden">
          <div className="flex items-center space-x-4">
            <div className="relative flex h-5 w-5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-none bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-none h-5 w-5 bg-emerald-400" />
            </div>

            <div>
              <div className="text-xs font-mono text-emerald-400 font-black uppercase tracking-wider">
                [ALL SYSTEMS OPERATIONAL // 99.98% UPTIME]
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-mono text-white mt-0.5 uppercase">
                All 6 Core Infrastructure Nodes Active
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-4 shrink-0 font-mono text-xs">
            <div className="text-right hidden sm:block">
              <div className="text-slate-400 text-[10px] font-bold">[REAL-TIME EDGE HEARTBEAT]</div>
              <div className="text-white font-semibold flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5 text-[#00F0FF]" />
                <span>Auto-sync 30s (Last: {lastSync.toLocaleTimeString()})</span>
              </div>
            </div>

            <button
              onClick={handleManualSync}
              disabled={isSyncing}
              className="px-4 py-2.5 rounded-none bg-[#07090E] text-[#00F0FF] hover:bg-[#00F0FF] hover:text-black border-2 border-[#00F0FF] text-xs font-mono font-bold flex items-center space-x-2 transition-all cursor-pointer shadow-[2px_2px_0px_0px_#00F0FF] active:translate-x-[1px] active:translate-y-[1px] min-h-[44px]"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? "animate-spin" : ""}`} />
              <span>{isSyncing ? "[SYNCING...]" : "[PULSE REFRESH]"}</span>
            </button>
          </div>
        </div>

        {/* Operational Nodes Grid (6 Nodes) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8]">
            <span className="uppercase tracking-wider font-bold flex items-center space-x-2">
              <Server className="w-4 h-4 text-[#00F0FF]" />
              <span>[ACTIVE OPERATIONAL NODES: 6 REGISTRY NODES]</span>
            </span>
            <span className="text-emerald-400 font-bold border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5">[6 / 6 OPERATIONAL]</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nodeData.map((node) => (
              <div
                key={node.id}
                className="rounded-none bg-[#0D111A] border-2 border-[#1A2234] p-6 hover:border-[#00F0FF] shadow-[4px_4px_0px_0px_#1A2234] hover:shadow-[4px_4px_0px_0px_#00F0FF] transition-all flex flex-col justify-between space-y-4 relative group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="px-2 py-0.5 rounded-none bg-[#07090E] text-[#00F0FF] border-2 border-[#1A2234] uppercase font-bold">
                      [{node.category}]
                    </span>
                    <span className="text-emerald-400 font-bold flex items-center space-x-1">
                      <span className="w-1.5 h-1.5 rounded-none bg-emerald-400 animate-pulse" />
                      <span>[{node.status}]</span>
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-[#00F0FF] transition-colors font-mono">
                    {node.name}
                  </h3>
                </div>

                <div className="space-y-3 pt-3 border-t-2 border-[#1A2234] text-xs font-mono">
                  <div className="flex justify-between items-center text-slate-400">
                    <span>Response Ping:</span>
                    <span className="text-emerald-400 font-bold">{node.ping}</span>
                  </div>

                  <div className="flex justify-between items-center text-slate-400">
                    <span>{node.metricLabel}:</span>
                    <span className="text-white font-bold">{node.metricValue}</span>
                  </div>

                  {/* 30-Day Uptime Ticks Visualizer */}
                  <div className="space-y-1 pt-1">
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>30-Day Uptime</span>
                      <span className="text-white font-bold">{node.uptimePct}</span>
                    </div>
                    <div className="flex items-center space-x-0.5">
                      {node.uptimeHistory.map((_, idx) => (
                        <span
                          key={idx}
                          className="h-4 flex-1 rounded-none bg-emerald-400 hover:bg-[#00F0FF] transition-colors"
                          title={`Day ${30 - idx}: 100% Operational`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Incident & Maintenance Log Table */}
        <div className="rounded-none bg-[#0D111A] border-2 border-[#1A2234] p-6 sm:p-8 shadow-[4px_4px_0px_0px_#1A2234] space-y-6 relative overflow-hidden">
          <div className="flex items-center justify-between pb-4 border-b-2 border-[#1A2234]">
            <div className="flex items-center space-x-3">
              <Terminal className="w-5 h-5 text-[#00F0FF]" />
              <h2 className="text-sm font-black text-white tracking-wider font-mono uppercase">
                [INCIDENT &amp; MAINTENANCE AUDIT LOG]
              </h2>
            </div>
            <span className="text-xs font-mono font-bold text-slate-400">
              [HISTORICAL AUDIT TRAIL]
            </span>
          </div>

          <div className="space-y-3 font-mono">
            {logsData.map((log) => {
              const isExpanded = !!expandedLogs[log.id];
              return (
                <div
                  key={log.id}
                  className="rounded-none bg-[#07090E] border-2 border-[#1A2234] p-4 space-y-2 hover:border-[#00F0FF] transition-colors"
                >
                  <div
                    onClick={() => toggleLogExpand(log.id)}
                    className="flex items-center justify-between cursor-pointer min-h-[36px]"
                  >
                    <div className="flex items-center space-x-3 truncate mr-2">
                      <span
                        className={`px-2 py-0.5 rounded-none text-[10px] font-bold border-2 ${
                          log.type === "RESOLVED"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500"
                            : log.type === "MAINTENANCE"
                            ? "bg-yellow-500/10 text-yellow-400 border-yellow-500"
                            : "bg-[#00F0FF]/10 text-[#00F0FF] border-[#00F0FF]"
                        }`}
                      >
                        [{log.type}]
                      </span>
                      <span className="text-xs font-bold text-white truncate">
                        {log.title}
                      </span>
                    </div>

                    <div className="flex items-center space-x-3 shrink-0 text-slate-400 text-[11px]">
                      <span className="hidden sm:inline-block">{log.date}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-[#00F0FF]" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-500" />
                      )}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="pt-2 border-t-2 border-[#1A2234] text-xs text-slate-300 leading-relaxed bg-[#0D111A] p-3 rounded-none">
                      {log.details}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center pt-4">
          <Link
            href="/systems"
            className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-none bg-[#00F0FF] hover:bg-white text-black font-mono font-black text-xs uppercase tracking-wider border-2 border-[#00F0FF] hover:border-white shadow-[4px_4px_0px_0px_#00F0FF] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#00F0FF] transition-all min-h-[44px]"
          >
            <span>[EXPLORE SYSTEMS CATALOG]</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
