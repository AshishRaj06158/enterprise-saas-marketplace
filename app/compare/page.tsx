"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BarChart3,
  Activity,
  Server,
  Database,
  Lock,
  ShieldCheck,
  Cpu,
  Zap,
  ArrowRight,
  CheckCircle2,
  DollarSign,
  Layers,
  Box,
  Clock,
  Radio,
  Plus,
  X
} from "lucide-react";
import { getAllSystems, getSystemBySlug, SystemProduct } from "@/data/systems";
import { useCurrency } from "@/context/CurrencyContext";

export default function CompareMatrixPage() {
  const allSystems = getAllSystems();

  // Multi-System Selection State: Default to first 2 flagship systems
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([
    "telemetry-matrix",
    "quantum-logistics-erp"
  ]);

  const { currency, formatPrice } = useCurrency();

  // Handle toggling systems (constrained to 2 or 3 systems)
  const handleToggleSystem = (slug: string) => {
    if (selectedSlugs.includes(slug)) {
      if (selectedSlugs.length <= 2) {
        // Prevent dropping below 2 systems
        return;
      }
      setSelectedSlugs((prev) => prev.filter((s) => s !== slug));
    } else {
      if (selectedSlugs.length >= 3) {
        // Replace the last selected system if 3 are already picked
        setSelectedSlugs((prev) => [prev[0], prev[1], slug]);
      } else {
        setSelectedSlugs((prev) => [...prev, slug]);
      }
    }
  };

  const selectedSystems: SystemProduct[] = selectedSlugs
    .map((slug) => getSystemBySlug(slug))
    .filter((s): s is SystemProduct => s !== undefined);

  // Maximum benchmark values for visualizer scaling
  const maxThroughput = Math.max(...allSystems.map((s) => s.throughputReqSec));
  const maxMemory = Math.max(...allSystems.map((s) => s.memoryFootprintMb));
  const maxLatency = Math.max(...allSystems.map((s) => s.reflectionCycleMs));

  // Helper mappings for dimensions not directly on SystemProduct interface
  const getMessageQueue = (slug: string): string => {
    switch (slug) {
      case "telemetry-matrix":
        return "Kafka Event Ingest + Upstash Redis Stream";
      case "quantum-logistics-erp":
        return "BullMQ Distributed Workers + Geo-Webhook Queue";
      case "autonomous-crm-pipeline":
        return "Supabase Realtime CDC + Celery Async Queue";
      case "omega-core-starter":
        return "Native Webhook Relays + Redis Job Queue";
      case "sentinel-auth-hub":
        return "Redis Leaky-Bucket Queue + Token Rotator";
      case "nexus-agent-orchestrator":
        return "Upstash Redis Vector Queue + MCP Event Loop";
      default:
        return "Distributed Redis FIFO Queue";
    }
  };

  const getTenancyModel = (slug: string): string => {
    switch (slug) {
      case "telemetry-matrix":
        return "Multi-Tenant RLS Partitioned Tables";
      case "quantum-logistics-erp":
        return "Multi-Depot Spatial PostGIS Sharded";
      case "autonomous-crm-pipeline":
        return "Multi-Tenant Account Isolation";
      case "sentinel-auth-hub":
        return "Zero-Trust Single/Multi-Tenant Vault";
      case "nexus-agent-orchestrator":
        return "Isolated Execution Sandbox Containers";
      default:
        return "Postgres Row Level Security (RLS)";
    }
  };

  const getContainerSupport = (slug: string): string => {
    switch (slug) {
      case "quantum-logistics-erp":
        return "AWS ECS / Docker Swarm / Kubernetes Helm";
      case "sentinel-auth-hub":
        return "Kubernetes StatefulSet + Multi-Region Edge";
      default:
        return "Zero-Config Vercel Edge + Docker Container Ready";
    }
  };

  const getEncryptionStandard = (slug: string): string => {
    switch (slug) {
      case "sentinel-auth-hub":
        return "FIDO2 WebAuthn + AES-256 Vault + TLS 1.3";
      case "autonomous-crm-pipeline":
        return "AES-256 Contract Signatures + SHA-256 Hashes";
      case "nexus-agent-orchestrator":
        return "SHA-256 Merkle Ledger Signatures + Ephemeral Keys";
      default:
        return "AES-256 At Rest + Strict TLS 1.3 In Flight";
    }
  };

  return (
    <div className="pt-28 pb-24 bg-[#07090E] min-h-screen text-slate-100 relative overflow-hidden flex flex-col justify-between">
      {/* Ambient Matrix Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[950px] h-[450px] bg-gradient-to-r from-[#00F0FF]/10 via-[#8B5CF6]/10 to-[#00F0FF]/10 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute inset-0 bg-dot-matrix opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 space-y-8 font-mono">
        
        {/* PAGE HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b-2 border-[#1A2234] pb-6 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-[#0D111A] border-2 border-[#00F0FF] text-xs text-[#00F0FF] shadow-[3px_3px_0px_0px_#00F0FF]">
              <BarChart3 className="w-4 h-4 text-[#00F0FF]" />
              <span className="font-bold tracking-wider">[NEXUS.OS // ARCHITECTURAL BENCHMARK &amp; SPEC MATRIX]</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
              Systems Comparison &amp; Benchmark Matrix
            </h1>
            <p className="text-xs sm:text-sm text-[#94A3B8]">
              Side-by-side performance telemetry, deployment topology, and empirical throughput limits.
            </p>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <div className="px-3.5 py-2 bg-[#0D111A] border-2 border-[#00F0FF] text-[#00F0FF] shadow-[2px_2px_0px_0px_#00F0FF] flex items-center space-x-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F0FF] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00F0FF]" />
              </span>
              <span>COMPARING: [{selectedSlugs.length} / 3 SYSTEMS]</span>
            </div>
          </div>
        </div>

        {/* 1. INTERACTIVE MULTI-SYSTEM SELECTOR */}
        <div className="p-5 bg-[#0D111A] border-2 border-[#1A2234] shadow-[4px_4px_0px_0px_#1A2234] space-y-3">
          <div className="flex items-center justify-between text-[11px] text-[#94A3B8] uppercase">
            <span>// SELECT 2 OR 3 SYSTEMS TO COMPARE SIDE-BY-SIDE:</span>
            <span>{selectedSlugs.length === 3 ? "[MAX 3 REACHED]" : "[SELECT 1 MORE]"}</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {allSystems.map((sys) => {
              const isSelected = selectedSlugs.includes(sys.slug);
              return (
                <button
                  key={sys.slug}
                  onClick={() => handleToggleSystem(sys.slug)}
                  className={`p-3 text-left transition-all border-2 cursor-pointer flex flex-col justify-between min-h-[82px] ${
                    isSelected
                      ? "bg-[#00F0FF] text-black border-[#00F0FF] shadow-[4px_4px_0px_0px_#00F0FF] -translate-y-0.5"
                      : "bg-[#07090E] text-slate-300 border-[#1A2234] hover:border-[#00F0FF] hover:text-white shadow-[2px_2px_0px_0px_#1A2234] active:translate-x-[1px] active:translate-y-[1px]"
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span
                      className={`text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 border ${
                        isSelected
                          ? "bg-black/10 border-black/40 text-black"
                          : "bg-[#0D111A] border-[#1A2234] text-[#00F0FF]"
                      }`}
                    >
                      {sys.category}
                    </span>
                    <span
                      className={`w-4 h-4 border flex items-center justify-center text-[10px] font-bold ${
                        isSelected
                          ? "bg-black text-white border-black"
                          : "border-[#1A2234] bg-[#0D111A] text-slate-500"
                      }`}
                    >
                      {isSelected ? "✓" : "+"}
                    </span>
                  </div>

                  <div className="mt-2">
                    <div className="text-xs font-black uppercase truncate leading-tight">
                      {sys.name}
                    </div>
                    <div
                      className={`text-[10px] truncate mt-0.5 ${
                        isSelected ? "text-slate-800 font-semibold" : "text-slate-400"
                      }`}
                    >
                      {formatPrice(sys.priceInr, sys.priceUsd)}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. SIDE-BY-SIDE COMPARISON MATRIX TABLE (STICKY FIRST COLUMN ON MOBILE) */}
        <div className="rounded-none bg-[#0D111A] border-2 border-[#1A2234] shadow-[6px_6px_0px_0px_#1A2234] overflow-hidden">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse">
              
              {/* Table Header: Systems Selected */}
              <thead>
                <tr className="border-b-2 border-[#1A2234] bg-[#07090E]">
                  <th className="p-4 sm:p-5 text-xs text-[#94A3B8] uppercase tracking-wider sticky left-0 z-20 bg-[#07090E] min-w-[190px] sm:min-w-[250px] border-r-2 border-[#1A2234] shadow-[2px_0px_0px_0px_#1A2234]">
                    // DIMENSION &amp; METRIC
                  </th>
                  {selectedSystems.map((sys) => (
                    <th
                      key={sys.id}
                      className="p-4 sm:p-5 text-left min-w-[250px] border-r-2 border-[#1A2234] last:border-r-0"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase px-2 py-0.5 bg-[#0D111A] text-[#00F0FF] border border-[#00F0FF]">
                            [{sys.badge}]
                          </span>
                          <span className="text-[10px] text-emerald-400 font-bold">
                            [BENCHMARK_VERIFIED]
                          </span>
                        </div>

                        <h3 className="text-base sm:text-lg font-black text-white tracking-tight uppercase leading-snug">
                          <Link href={`/systems/${sys.slug}`} className="hover:text-[#00F0FF] transition-colors">
                            {sys.name}
                          </Link>
                        </h3>

                        <div className="text-sm font-bold text-[#00F0FF] flex items-center space-x-2">
                          <span>{formatPrice(sys.priceInr, sys.priceUsd)}</span>
                          <span className="text-[10px] text-slate-400 font-normal">
                            (COMMERCIAL PERPETUAL)
                          </span>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y-2 divide-[#1A2234] text-xs">
                
                {/* =========================================
                    SECTION 1: CORE ARCHITECTURE
                   ========================================= */}
                <tr className="bg-[#121826] border-y-2 border-[#00F0FF]/40 text-[#00F0FF] font-bold text-[11px] uppercase tracking-wider">
                  <td
                    colSpan={selectedSystems.length + 1}
                    className="p-3 px-4 sm:px-6 sticky left-0 z-10 bg-[#121826]"
                  >
                    // 01. CORE ARCHITECTURE &amp; FOUNDATION
                  </td>
                </tr>

                {/* Runtime Engine */}
                <tr className="bg-[#07090E] hover:bg-[#1A2234]/40 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-slate-300 sticky left-0 z-20 bg-[#07090E] border-r-2 border-[#1A2234] shadow-[2px_0px_0px_0px_#1A2234]">
                    <div className="flex items-center space-x-2">
                      <Server className="w-4 h-4 text-[#00F0FF] shrink-0" />
                      <span>Runtime Environment</span>
                    </div>
                  </td>
                  {selectedSystems.map((sys) => (
                    <td key={sys.id} className="p-4 sm:p-5 text-white border-r-2 border-[#1A2234] last:border-r-0 font-medium">
                      {sys.runtime}
                    </td>
                  ))}
                </tr>

                {/* Framework & Modules */}
                <tr className="bg-[#0D111A] hover:bg-[#1A2234]/40 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-slate-300 sticky left-0 z-20 bg-[#0D111A] border-r-2 border-[#1A2234] shadow-[2px_0px_0px_0px_#1A2234]">
                    <div className="flex items-center space-x-2">
                      <Cpu className="w-4 h-4 text-[#8B5CF6] shrink-0" />
                      <span>Framework Modules</span>
                    </div>
                  </td>
                  {selectedSystems.map((sys) => (
                    <td key={sys.id} className="p-4 sm:p-5 border-r-2 border-[#1A2234] last:border-r-0">
                      <div className="flex flex-wrap gap-1.5">
                        {sys.stack.map((item, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 bg-[#07090E] border border-[#1A2234] text-[10px] text-slate-200 uppercase"
                          >
                            [{item}]
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Database Engine */}
                <tr className="bg-[#07090E] hover:bg-[#1A2234]/40 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-slate-300 sticky left-0 z-20 bg-[#07090E] border-r-2 border-[#1A2234] shadow-[2px_0px_0px_0px_#1A2234]">
                    <div className="flex items-center space-x-2">
                      <Database className="w-4 h-4 text-[#00F0FF] shrink-0" />
                      <span>Database Engine &amp; Schema</span>
                    </div>
                  </td>
                  {selectedSystems.map((sys) => (
                    <td key={sys.id} className="p-4 sm:p-5 text-slate-200 border-r-2 border-[#1A2234] last:border-r-0">
                      {sys.database}
                    </td>
                  ))}
                </tr>

                {/* Message Queue / Cache */}
                <tr className="bg-[#0D111A] hover:bg-[#1A2234]/40 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-slate-300 sticky left-0 z-20 bg-[#0D111A] border-r-2 border-[#1A2234] shadow-[2px_0px_0px_0px_#1A2234]">
                    <div className="flex items-center space-x-2">
                      <Layers className="w-4 h-4 text-[#10B981] shrink-0" />
                      <span>Queue &amp; Buffer Cache</span>
                    </div>
                  </td>
                  {selectedSystems.map((sys) => (
                    <td key={sys.id} className="p-4 sm:p-5 text-emerald-400 font-bold border-r-2 border-[#1A2234] last:border-r-0">
                      {getMessageQueue(sys.slug)}
                    </td>
                  ))}
                </tr>

                {/* =========================================
                    SECTION 2: PERFORMANCE BENCHMARKS
                   ========================================= */}
                <tr className="bg-[#121826] border-y-2 border-[#00F0FF]/40 text-[#00F0FF] font-bold text-[11px] uppercase tracking-wider">
                  <td
                    colSpan={selectedSystems.length + 1}
                    className="p-3 px-4 sm:px-6 sticky left-0 z-10 bg-[#121826]"
                  >
                    // 02. PERFORMANCE &amp; EMPIRICAL TELEMETRY
                  </td>
                </tr>

                {/* P99 Latency */}
                <tr className="bg-[#07090E] hover:bg-[#1A2234]/40 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-slate-300 sticky left-0 z-20 bg-[#07090E] border-r-2 border-[#1A2234] shadow-[2px_0px_0px_0px_#1A2234]">
                    <div className="flex items-center space-x-2">
                      <Zap className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>P99 Query Latency</span>
                    </div>
                  </td>
                  {selectedSystems.map((sys) => (
                    <td key={sys.id} className="p-4 sm:p-5 border-r-2 border-[#1A2234] last:border-r-0">
                      <div className="text-emerald-400 font-black text-sm">{sys.latency}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">[P99: 14MS] benchmark baseline</div>
                    </td>
                  ))}
                </tr>

                {/* Throughput */}
                <tr className="bg-[#0D111A] hover:bg-[#1A2234]/40 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-slate-300 sticky left-0 z-20 bg-[#0D111A] border-r-2 border-[#1A2234] shadow-[2px_0px_0px_0px_#1A2234]">
                    <div className="flex items-center space-x-2">
                      <Activity className="w-4 h-4 text-[#00F0FF] shrink-0" />
                      <span>Max Concurrent Throughput</span>
                    </div>
                  </td>
                  {selectedSystems.map((sys) => (
                    <td key={sys.id} className="p-4 sm:p-5 border-r-2 border-[#1A2234] last:border-r-0">
                      <div className="text-[#00F0FF] font-black text-sm">
                        {sys.throughputReqSec.toLocaleString()} Req/sec
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        Capacity: {sys.concurrency} [HIGH_THROUGHPUT]
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Cold Start / Memory */}
                <tr className="bg-[#07090E] hover:bg-[#1A2234]/40 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-slate-300 sticky left-0 z-20 bg-[#07090E] border-r-2 border-[#1A2234] shadow-[2px_0px_0px_0px_#1A2234]">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-[#8B5CF6] shrink-0" />
                      <span>Cold Start / Memory Footprint</span>
                    </div>
                  </td>
                  {selectedSystems.map((sys) => (
                    <td key={sys.id} className="p-4 sm:p-5 border-r-2 border-[#1A2234] last:border-r-0">
                      <div className="text-white font-bold">{sys.memoryFootprintMb} MB Memory</div>
                      <div className="text-[10px] text-[#8B5CF6] mt-0.5">Cold Start &lt; 85ms on Edge</div>
                    </td>
                  ))}
                </tr>

                {/* =========================================
                    SECTION 3: DEPLOYMENT TOPOLOGY
                   ========================================= */}
                <tr className="bg-[#121826] border-y-2 border-[#00F0FF]/40 text-[#00F0FF] font-bold text-[11px] uppercase tracking-wider">
                  <td
                    colSpan={selectedSystems.length + 1}
                    className="p-3 px-4 sm:px-6 sticky left-0 z-10 bg-[#121826]"
                  >
                    // 03. DEPLOYMENT TOPOLOGY &amp; CONTAINER INFRASTRUCTURE
                  </td>
                </tr>

                {/* Tenancy Model */}
                <tr className="bg-[#07090E] hover:bg-[#1A2234]/40 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-slate-300 sticky left-0 z-20 bg-[#07090E] border-r-2 border-[#1A2234] shadow-[2px_0px_0px_0px_#1A2234]">
                    <div className="flex items-center space-x-2">
                      <Box className="w-4 h-4 text-[#00F0FF] shrink-0" />
                      <span>Tenancy Isolation Model</span>
                    </div>
                  </td>
                  {selectedSystems.map((sys) => (
                    <td key={sys.id} className="p-4 sm:p-5 text-slate-200 border-r-2 border-[#1A2234] last:border-r-0">
                      {getTenancyModel(sys.slug)}
                    </td>
                  ))}
                </tr>

                {/* Container & Orchestration */}
                <tr className="bg-[#0D111A] hover:bg-[#1A2234]/40 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-slate-300 sticky left-0 z-20 bg-[#0D111A] border-r-2 border-[#1A2234] shadow-[2px_0px_0px_0px_#1A2234]">
                    <div className="flex items-center space-x-2">
                      <Server className="w-4 h-4 text-[#8B5CF6] shrink-0" />
                      <span>Container &amp; Orchestration</span>
                    </div>
                  </td>
                  {selectedSystems.map((sys) => (
                    <td key={sys.id} className="p-4 sm:p-5 text-slate-200 border-r-2 border-[#1A2234] last:border-r-0">
                      {getContainerSupport(sys.slug)}
                    </td>
                  ))}
                </tr>

                {/* =========================================
                    SECTION 4: SECURITY & COMPLIANCE
                   ========================================= */}
                <tr className="bg-[#121826] border-y-2 border-[#00F0FF]/40 text-[#00F0FF] font-bold text-[11px] uppercase tracking-wider">
                  <td
                    colSpan={selectedSystems.length + 1}
                    className="p-3 px-4 sm:px-6 sticky left-0 z-10 bg-[#121826]"
                  >
                    // 04. SECURITY HARDENING &amp; COMPLIANCE AUDITS
                  </td>
                </tr>

                {/* OWASP & SOC2 */}
                <tr className="bg-[#07090E] hover:bg-[#1A2234]/40 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-slate-300 sticky left-0 z-20 bg-[#07090E] border-r-2 border-[#1A2234] shadow-[2px_0px_0px_0px_#1A2234]">
                    <div className="flex items-center space-x-2">
                      <ShieldCheck className="w-4 h-4 text-yellow-400 shrink-0" />
                      <span>OWASP &amp; SOC2 Audit Status</span>
                    </div>
                  </td>
                  {selectedSystems.map((sys) => (
                    <td key={sys.id} className="p-4 sm:p-5 text-slate-200 border-r-2 border-[#1A2234] last:border-r-0">
                      {sys.owaspStatus}
                    </td>
                  ))}
                </tr>

                {/* Encryption Standard */}
                <tr className="bg-[#0D111A] hover:bg-[#1A2234]/40 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-slate-300 sticky left-0 z-20 bg-[#0D111A] border-r-2 border-[#1A2234] shadow-[2px_0px_0px_0px_#1A2234]">
                    <div className="flex items-center space-x-2">
                      <Lock className="w-4 h-4 text-[#00F0FF] shrink-0" />
                      <span>End-to-End Encryption</span>
                    </div>
                  </td>
                  {selectedSystems.map((sys) => (
                    <td key={sys.id} className="p-4 sm:p-5 text-slate-200 border-r-2 border-[#1A2234] last:border-r-0">
                      {getEncryptionStandard(sys.slug)}
                    </td>
                  ))}
                </tr>

                {/* Commercial IP License */}
                <tr className="bg-[#07090E] hover:bg-[#1A2234]/40 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-slate-300 sticky left-0 z-20 bg-[#07090E] border-r-2 border-[#1A2234] shadow-[2px_0px_0px_0px_#1A2234]">
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Commercial IP Entitlement</span>
                    </div>
                  </td>
                  {selectedSystems.map((sys) => (
                    <td key={sys.id} className="p-4 sm:p-5 text-emerald-400 font-bold border-r-2 border-[#1A2234] last:border-r-0">
                      100% Unencumbered Perpetual License (Full Codebase IP Transfer)
                    </td>
                  ))}
                </tr>

                {/* =========================================
                    SECTION 5: COMMERCIAL LICENSING & CHECKOUT
                   ========================================= */}
                <tr className="bg-[#121826] border-y-2 border-[#00F0FF]/40 text-[#00F0FF] font-bold text-[11px] uppercase tracking-wider">
                  <td
                    colSpan={selectedSystems.length + 1}
                    className="p-3 px-4 sm:px-6 sticky left-0 z-10 bg-[#121826]"
                  >
                    // 05. COMMERCIAL LICENSING &amp; ACQUISITION
                  </td>
                </tr>

                <tr className="bg-[#07090E]">
                  <td className="p-4 sm:p-5 font-bold text-white uppercase sticky left-0 z-20 bg-[#07090E] border-r-2 border-[#1A2234] shadow-[2px_0px_0px_0px_#1A2234]">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4 text-[#00F0FF] shrink-0" />
                      <span>Direct License Acquisition</span>
                    </div>
                  </td>
                  {selectedSystems.map((sys) => (
                    <td key={sys.id} className="p-4 sm:p-5 border-r-2 border-[#1A2234] last:border-r-0">
                      <div className="space-y-3">
                        <div className="text-xl font-black text-[#00F0FF]">
                          {formatPrice(sys.priceInr, sys.priceUsd)}
                        </div>

                        <Link
                          href={`/checkout?system=${sys.slug}`}
                          className="w-full py-3 px-4 rounded-none text-xs font-bold text-black bg-[#00F0FF] border-2 border-black shadow-[4px_4px_0px_0px_#00F0FF] hover:bg-[#00F0FF]/90 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#00F0FF] flex items-center justify-center space-x-2 uppercase cursor-pointer min-h-[44px]"
                        >
                          <span>ACQUIRE {sys.slug.toUpperCase()}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </td>
                  ))}
                </tr>

              </tbody>
            </table>
          </div>
        </div>

        {/* 3. LIVE BENCHMARK METRICS VISUALIZER (BAR CHARTS) */}
        <div className="rounded-none bg-[#0D111A] border-2 border-[#1A2234] p-6 sm:p-8 space-y-8 shadow-[6px_6px_0px_0px_#1A2234]">
          <div className="flex items-center space-x-3 pb-4 border-b-2 border-[#1A2234]">
            <div className="p-2.5 rounded-none bg-[#07090E] border-2 border-[#00F0FF] text-[#00F0FF] shadow-[2px_2px_0px_0px_#00F0FF]">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white tracking-wider uppercase">
                // EMPIRICAL BENCHMARK LOAD SIMULATION
              </h2>
              <p className="text-xs text-[#94A3B8]">
                Real-time stress analysis across Selected Systems: Max Throughput, Memory Density &amp; P99 Latency.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Metric 1: Request Throughput (Req/sec) */}
            <div className="p-6 bg-[#07090E] border-2 border-[#1A2234] shadow-[4px_4px_0px_0px_#1A2234] space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#00F0FF] font-bold">[THROUGHPUT: REQ/SEC]</span>
                <span className="text-emerald-400 text-[10px]">HIGHER IS BETTER</span>
              </div>
              <div className="space-y-3">
                {selectedSystems.map((sys) => {
                  const pct = Math.round((sys.throughputReqSec / maxThroughput) * 100);
                  return (
                    <div key={sys.id} className="space-y-1">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-300 truncate max-w-[150px]">{sys.name}</span>
                        <span className="text-white font-bold">{sys.throughputReqSec.toLocaleString()} Req/s</span>
                      </div>
                      <div className="w-full bg-[#0D111A] h-3 rounded-none overflow-hidden border border-[#1A2234]">
                        <div
                          className="bg-[#00F0FF] h-full transition-all duration-300"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Metric 2: Memory Footprint (MB) */}
            <div className="p-6 bg-[#07090E] border-2 border-[#1A2234] shadow-[4px_4px_0px_0px_#1A2234] space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#8B5CF6] font-bold">[MEMORY FOOTPRINT: MB]</span>
                <span className="text-purple-400 text-[10px]">LOWER IS LEANER</span>
              </div>
              <div className="space-y-3">
                {selectedSystems.map((sys) => {
                  const pct = Math.round((sys.memoryFootprintMb / maxMemory) * 100);
                  return (
                    <div key={sys.id} className="space-y-1">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-300 truncate max-w-[150px]">{sys.name}</span>
                        <span className="text-white font-bold">{sys.memoryFootprintMb} MB</span>
                      </div>
                      <div className="w-full bg-[#0D111A] h-3 rounded-none overflow-hidden border border-[#1A2234]">
                        <div
                          className="bg-[#8B5CF6] h-full transition-all duration-300"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Metric 3: Reflection Latency Cycle (ms) */}
            <div className="p-6 bg-[#07090E] border-2 border-[#1A2234] shadow-[4px_4px_0px_0px_#1A2234] space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-emerald-400 font-bold">[CYCLE LATENCY: MS]</span>
                <span className="text-emerald-400 text-[10px]">LOWER IS FASTER</span>
              </div>
              <div className="space-y-3">
                {selectedSystems.map((sys) => {
                  const pct = Math.round((sys.reflectionCycleMs / maxLatency) * 100);
                  return (
                    <div key={sys.id} className="space-y-1">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-300 truncate max-w-[150px]">{sys.name}</span>
                        <span className="text-emerald-400 font-bold">{sys.reflectionCycleMs} ms</span>
                      </div>
                      <div className="w-full bg-[#0D111A] h-3 rounded-none overflow-hidden border border-[#1A2234]">
                        <div
                          className="bg-emerald-400 h-full transition-all duration-300"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
