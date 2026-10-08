"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Layers,
  Cpu,
  Zap,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  BarChart3,
  Activity,
  Server,
  Database,
  Lock,
  ChevronRight,
  ExternalLink
} from "lucide-react";
import { getAllSystems, getSystemBySlug, SystemProduct } from "@/data/systems";
import { useCurrency } from "@/context/CurrencyContext";

export default function CompareMatrixPage() {
  const allSystems = getAllSystems();

  // State for 3 system selector columns
  const [slot1, setSlot1] = useState<string>("telemetry-matrix");
  const [slot2, setSlot2] = useState<string>("quantum-logistics-erp");
  const [slot3, setSlot3] = useState<string>("nexus-agent-orchestrator");

  const { currency } = useCurrency();

  const sys1 = getSystemBySlug(slot1) || allSystems[0];
  const sys2 = getSystemBySlug(slot2) || allSystems[1];
  const sys3 = getSystemBySlug(slot3) || allSystems[5];

  const selectedSystems = [sys1, sys2, sys3];

  // Benchmark Max values for bar chart scaling
  const maxThroughput = Math.max(...allSystems.map((s) => s.throughputReqSec));
  const maxMemory = Math.max(...allSystems.map((s) => s.memoryFootprintMb));
  const maxLatency = Math.max(...allSystems.map((s) => s.reflectionCycleMs));

  return (
    <div className="pt-32 pb-24 bg-[#07090E] min-h-screen text-slate-100 relative overflow-hidden">
      {/* Ambient Radial Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#00F0FF]/10 blur-3xl pointer-events-none rounded-full animate-pulse-slow" />
      <div className="absolute bottom-10 right-1/4 w-[550px] h-[350px] bg-[#8B5CF6]/12 blur-3xl pointer-events-none rounded-full animate-pulse-slow" style={{ animationDelay: "3s" }} />
      <div className="absolute inset-0 bg-dot-matrix opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#00F0FF]/40 bg-[#00F0FF]/10 text-xs font-mono-tabular text-[#00F0FF] backdrop-blur-md">
            <BarChart3 className="w-4 h-4 text-[#00F0FF]" />
            <span>ARCHITECTURAL SYSTEM MATRIX // BENCHMARK SPECIFICATIONS</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Multi-System Benchmark & Spec Matrix
          </h1>

          <p className="text-base text-[#94A3B8] leading-relaxed">
            Side-by-side performance metrics, deployment complexity, and concurrency limits across all enterprise software platforms.
          </p>
        </div>

        {/* System Selector Bar */}
        <div className="rounded-2xl bg-[#0D111A]/90 border border-[#00F0FF]/30 p-6 backdrop-blur-md shadow-xl grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Column 1 Selector */}
          <div className="space-y-2">
            <label className="text-xs font-mono-tabular text-[#00F0FF] uppercase flex items-center justify-between">
              <span>SYSTEM SLOT 1:</span>
              <span className="text-[10px] text-slate-400">PRIMARY</span>
            </label>
            <select
              value={slot1}
              onChange={(e) => setSlot1(e.target.value)}
              className="w-full bg-[#07090E] border border-[#1A2234] focus:border-[#00F0FF] rounded-xl px-3.5 py-3 text-xs font-mono-tabular text-white focus:outline-none"
            >
              {allSystems.map((s) => (
                <option key={s.id} value={s.slug}>
                  {s.name} ({s.badge})
                </option>
              ))}
            </select>
          </div>

          {/* Column 2 Selector */}
          <div className="space-y-2">
            <label className="text-xs font-mono-tabular text-[#8B5CF6] uppercase flex items-center justify-between">
              <span>SYSTEM SLOT 2:</span>
              <span className="text-[10px] text-slate-400">SECONDARY</span>
            </label>
            <select
              value={slot2}
              onChange={(e) => setSlot2(e.target.value)}
              className="w-full bg-[#07090E] border border-[#1A2234] focus:border-[#8B5CF6] rounded-xl px-3.5 py-3 text-xs font-mono-tabular text-white focus:outline-none"
            >
              {allSystems.map((s) => (
                <option key={s.id} value={s.slug}>
                  {s.name} ({s.badge})
                </option>
              ))}
            </select>
          </div>

          {/* Column 3 Selector */}
          <div className="space-y-2">
            <label className="text-xs font-mono-tabular text-emerald-400 uppercase flex items-center justify-between">
              <span>SYSTEM SLOT 3:</span>
              <span className="text-[10px] text-slate-400">TERTIARY</span>
            </label>
            <select
              value={slot3}
              onChange={(e) => setSlot3(e.target.value)}
              className="w-full bg-[#07090E] border border-[#1A2234] focus:border-emerald-400 rounded-xl px-3.5 py-3 text-xs font-mono-tabular text-white focus:outline-none"
            >
              {allSystems.map((s) => (
                <option key={s.id} value={s.slug}>
                  {s.name} ({s.badge})
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* COMPARISON SPECIFICATIONS TABLE */}
        <div className="rounded-3xl bg-[#0D111A]/80 backdrop-blur-md border border-[#00F0FF]/30 overflow-hidden shadow-2xl relative">
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent blur-[1px] animate-scanline pointer-events-none" />

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#1A2234] bg-[#07090E]/80">
                  <th className="p-6 text-xs font-mono-tabular text-[#94A3B8] w-1/4 uppercase tracking-wider">
                    SPECIFICATION PARAMETERS
                  </th>
                  {selectedSystems.map((sys, idx) => (
                    <th key={sys.id + idx} className="p-6 text-left w-1/4 min-w-[240px]">
                      <div className="space-y-3">
                        <span className="text-[10px] font-mono-tabular uppercase px-2.5 py-1 rounded bg-[#07090E] text-[#00F0FF] border border-[#00F0FF]/30">
                          {sys.badge}
                        </span>
                        <h3 className="text-lg font-bold text-white tracking-tight">
                          <Link href={`/systems/${sys.slug}`} className="hover:text-[#00F0FF] transition-colors">
                            {sys.name}
                          </Link>
                        </h3>
                        <div className="text-base font-bold text-[#00F0FF] font-mono-tabular">
                          {currency === "INR" ? sys.priceInr : sys.priceUsd}{" "}
                          <span className="text-xs text-slate-400 font-normal">
                            ({currency === "INR" ? sys.priceUsd : sys.priceInr})
                          </span>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1A2234] text-xs font-mono-tabular">
                
                {/* Row 1: Core Runtime */}
                <tr className="hover:bg-[#1A2234]/30 transition-colors">
                  <td className="p-6 font-semibold text-slate-300 flex items-center space-x-2">
                    <Server className="w-4 h-4 text-[#00F0FF]" />
                    <span>Architecture & Core Runtime</span>
                  </td>
                  {selectedSystems.map((sys, i) => (
                    <td key={i} className="p-6 text-white font-medium">
                      {sys.runtime}
                    </td>
                  ))}
                </tr>

                {/* Row 2: Cold Start Latency */}
                <tr className="hover:bg-[#1A2234]/30 transition-colors">
                  <td className="p-6 font-semibold text-slate-300 flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-emerald-400" />
                    <span>Cold Start P99 Latency</span>
                  </td>
                  {selectedSystems.map((sys, i) => (
                    <td key={i} className="p-6 text-emerald-400 font-bold">
                      {sys.latency}
                    </td>
                  ))}
                </tr>

                {/* Row 3: Concurrency */}
                <tr className="hover:bg-[#1A2234]/30 transition-colors">
                  <td className="p-6 font-semibold text-slate-300 flex items-center space-x-2">
                    <Activity className="w-4 h-4 text-[#8B5CF6]" />
                    <span>Concurrent Event Capacity</span>
                  </td>
                  {selectedSystems.map((sys, i) => (
                    <td key={i} className="p-6 text-[#8B5CF6] font-bold">
                      {sys.concurrency}
                    </td>
                  ))}
                </tr>

                {/* Row 4: Database Engine */}
                <tr className="hover:bg-[#1A2234]/30 transition-colors">
                  <td className="p-6 font-semibold text-slate-300 flex items-center space-x-2">
                    <Database className="w-4 h-4 text-[#00F0FF]" />
                    <span>Database & Storage Integration</span>
                  </td>
                  {selectedSystems.map((sys, i) => (
                    <td key={i} className="p-6 text-slate-200">
                      {sys.database}
                    </td>
                  ))}
                </tr>

                {/* Row 5: OWASP Security */}
                <tr className="hover:bg-[#1A2234]/30 transition-colors">
                  <td className="p-6 font-semibold text-slate-300 flex items-center space-x-2">
                    <Lock className="w-4 h-4 text-yellow-400" />
                    <span>OWASP Security & Token Vault</span>
                  </td>
                  {selectedSystems.map((sys, i) => (
                    <td key={i} className="p-6 text-slate-200">
                      {sys.owaspStatus}
                    </td>
                  ))}
                </tr>

                {/* Row 6: Technology Stack */}
                <tr className="hover:bg-[#1A2234]/30 transition-colors">
                  <td className="p-6 font-semibold text-slate-300 flex items-center space-x-2">
                    <Cpu className="w-4 h-4 text-[#00F0FF]" />
                    <span>Primary Stack Technologies</span>
                  </td>
                  {selectedSystems.map((sys, i) => (
                    <td key={i} className="p-6">
                      <div className="flex flex-wrap gap-1.5">
                        {sys.stack.map((st, sIdx) => (
                          <span key={sIdx} className="px-2 py-0.5 rounded bg-[#07090E] border border-[#1A2234] text-[10px] text-slate-300">
                            {st}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Row 7: Deployment Action Buttons */}
                <tr className="bg-[#07090E]/60">
                  <td className="p-6 font-semibold text-[#00F0FF]">
                    DEPLOYMENT AUTHORIZATION
                  </td>
                  {selectedSystems.map((sys, i) => (
                    <td key={i} className="p-6">
                      <Link
                        href={`/checkout?system=${sys.slug}`}
                        className="w-full py-3 px-4 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-[#00F0FF] to-[#8B5CF6] hover:opacity-95 transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)] flex items-center justify-center space-x-1.5"
                      >
                        <span>Deploy System</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  ))}
                </tr>

              </tbody>
            </table>
          </div>
        </div>

        {/* LIVE BENCHMARKING VISUALIZER (BAR CHARTS) */}
        <div className="rounded-3xl bg-[#0D111A]/90 backdrop-blur-md border border-[#00F0FF]/40 p-8 space-y-8 shadow-2xl relative">
          
          <div className="flex items-center space-x-3 pb-4 border-b border-[#1A2234]">
            <div className="p-2 rounded-xl bg-[#00F0FF]/10 border border-[#00F0FF]/30">
              <BarChart3 className="w-6 h-6 text-[#00F0FF]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-wide font-mono-tabular">
                LIVE BENCHMARK METRICS VISUALIZER
              </h2>
              <p className="text-xs text-[#94A3B8] font-mono-tabular">
                Empirical load simulation: Request Throughput, Memory Footprint & P99 Cycle Latency.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Metric 1: Request Throughput (Req/sec) */}
            <div className="p-6 rounded-2xl bg-[#07090E] border border-[#1A2234] space-y-4">
              <div className="flex items-center justify-between text-xs font-mono-tabular">
                <span className="text-[#00F0FF] font-bold">THROUGHPUT (REQ/SEC)</span>
                <span className="text-[#94A3B8]">Higher is better</span>
              </div>
              <div className="space-y-3">
                {selectedSystems.map((sys, i) => {
                  const pct = Math.round((sys.throughputReqSec / maxThroughput) * 100);
                  return (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-[11px] font-mono-tabular">
                        <span className="text-slate-300 truncate max-w-[150px]">{sys.name}</span>
                        <span className="text-white font-bold">{sys.throughputReqSec.toLocaleString()} Req/s</span>
                      </div>
                      <div className="w-full bg-[#0D111A] h-2.5 rounded-full overflow-hidden border border-[#1A2234]">
                        <div
                          className="bg-gradient-to-r from-[#00F0FF] to-[#8B5CF6] h-full rounded-full transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Metric 2: Memory Footprint (MB) */}
            <div className="p-6 rounded-2xl bg-[#07090E] border border-[#1A2234] space-y-4">
              <div className="flex items-center justify-between text-xs font-mono-tabular">
                <span className="text-[#8B5CF6] font-bold">MEMORY FOOTPRINT (MB)</span>
                <span className="text-[#94A3B8]">Lower is leaner</span>
              </div>
              <div className="space-y-3">
                {selectedSystems.map((sys, i) => {
                  const pct = Math.round((sys.memoryFootprintMb / maxMemory) * 100);
                  return (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-[11px] font-mono-tabular">
                        <span className="text-slate-300 truncate max-w-[150px]">{sys.name}</span>
                        <span className="text-white font-bold">{sys.memoryFootprintMb} MB</span>
                      </div>
                      <div className="w-full bg-[#0D111A] h-2.5 rounded-full overflow-hidden border border-[#1A2234]">
                        <div
                          className="bg-gradient-to-r from-[#8B5CF6] to-[#00F0FF] h-full rounded-full transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Metric 3: Reflection / Latency Cycle (ms) */}
            <div className="p-6 rounded-2xl bg-[#07090E] border border-[#1A2234] space-y-4">
              <div className="flex items-center justify-between text-xs font-mono-tabular">
                <span className="text-emerald-400 font-bold">REFLECTION LATENCY (MS)</span>
                <span className="text-[#94A3B8]">Lower is faster</span>
              </div>
              <div className="space-y-3">
                {selectedSystems.map((sys, i) => {
                  const pct = Math.round((sys.reflectionCycleMs / maxLatency) * 100);
                  return (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-[11px] font-mono-tabular">
                        <span className="text-slate-300 truncate max-w-[150px]">{sys.name}</span>
                        <span className="text-emerald-400 font-bold">{sys.reflectionCycleMs} ms</span>
                      </div>
                      <div className="w-full bg-[#0D111A] h-2.5 rounded-full overflow-hidden border border-[#1A2234]">
                        <div
                          className="bg-gradient-to-r from-emerald-500 to-[#00F0FF] h-full rounded-full transition-all duration-500"
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
