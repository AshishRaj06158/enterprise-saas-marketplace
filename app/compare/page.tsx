"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Zap,
  ArrowRight,
  BarChart3,
  Activity,
  Server,
  Database,
  Lock,
  Cpu
} from "lucide-react";
import { getAllSystems, getSystemBySlug } from "@/data/systems";
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
      {/* Ambient Cyber Pattern */}
      <div className="absolute inset-0 bg-dot-matrix opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#0D111A] border-2 border-[#00F0FF] text-xs font-mono-tabular text-[#00F0FF] shadow-[3px_3px_0px_0px_#00F0FF]">
            <BarChart3 className="w-4 h-4 text-[#00F0FF]" />
            <span className="uppercase tracking-widest font-bold">[ARCHITECTURAL SPEC MATRIX // BENCHMARKS]</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-mono-tabular uppercase">
            Multi-System Benchmark &amp; Spec Matrix
          </h1>

          <p className="text-sm text-[#94A3B8] font-mono-tabular leading-relaxed">
            Side-by-side performance telemetry, deployment complexity, and concurrency limits across enterprise platforms.
          </p>
        </div>

        {/* System Selector Bar */}
        <div className="rounded-none bg-[#0D111A] border-2 border-[#1A2234] p-6 shadow-[4px_4px_0px_0px_#1A2234] grid grid-cols-1 md:grid-cols-3 gap-6 font-mono-tabular">
          
          {/* Column 1 Selector */}
          <div className="space-y-2">
            <label className="text-xs text-[#00F0FF] uppercase font-bold flex items-center justify-between tracking-wider">
              <span>[SLOT 1]:</span>
              <span className="text-[10px] text-slate-400">PRIMARY</span>
            </label>
            <select
              value={slot1}
              onChange={(e) => setSlot1(e.target.value)}
              className="w-full bg-[#07090E] border-2 border-[#1A2234] focus:border-[#00F0FF] rounded-none px-3.5 py-3 text-xs text-white focus:outline-none min-h-[44px]"
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
            <label className="text-xs text-[#8B5CF6] uppercase font-bold flex items-center justify-between tracking-wider">
              <span>[SLOT 2]:</span>
              <span className="text-[10px] text-slate-400">SECONDARY</span>
            </label>
            <select
              value={slot2}
              onChange={(e) => setSlot2(e.target.value)}
              className="w-full bg-[#07090E] border-2 border-[#1A2234] focus:border-[#8B5CF6] rounded-none px-3.5 py-3 text-xs text-white focus:outline-none min-h-[44px]"
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
            <label className="text-xs text-emerald-400 uppercase font-bold flex items-center justify-between tracking-wider">
              <span>[SLOT 3]:</span>
              <span className="text-[10px] text-slate-400">TERTIARY</span>
            </label>
            <select
              value={slot3}
              onChange={(e) => setSlot3(e.target.value)}
              className="w-full bg-[#07090E] border-2 border-[#1A2234] focus:border-emerald-400 rounded-none px-3.5 py-3 text-xs text-white focus:outline-none min-h-[44px]"
            >
              {allSystems.map((s) => (
                <option key={s.id} value={s.slug}>
                  {s.name} ({s.badge})
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* COMPARISON SPECIFICATIONS TABLE (Horizontal Scroll with Pinned Left Header on Mobile) */}
        <div className="rounded-none bg-[#0D111A] border-2 border-[#1A2234] shadow-[6px_6px_0px_0px_#1A2234] overflow-hidden relative">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse font-mono-tabular">
              <thead>
                <tr className="border-b-2 border-[#1A2234] bg-[#07090E]">
                  <th className="p-4 sm:p-6 text-xs text-[#94A3B8] uppercase tracking-wider sticky left-0 z-20 bg-[#07090E] min-w-[180px] sm:min-w-[240px] border-r-2 border-[#1A2234] shadow-[2px_0px_0px_0px_#1A2234]">
                    // SPEC PARAMETER
                  </th>
                  {selectedSystems.map((sys, idx) => (
                    <th key={sys.id + idx} className="p-4 sm:p-6 text-left min-w-[240px] border-r border-[#1A2234] last:border-r-0">
                      <div className="space-y-2">
                        <span className="text-[10px] uppercase px-2 py-0.5 bg-[#07090E] text-[#00F0FF] border border-[#00F0FF]">
                          [{sys.badge}]
                        </span>
                        <h3 className="text-base sm:text-lg font-black text-white tracking-tight">
                          <Link href={`/systems/${sys.slug}`} className="hover:text-[#00F0FF] transition-colors">
                            {sys.name}
                          </Link>
                        </h3>
                        <div className="text-sm font-bold text-[#00F0FF]">
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
              <tbody className="divide-y-2 divide-[#1A2234] text-xs">
                
                {/* Row 1: Core Runtime */}
                <tr className="hover:bg-[#1A2234]/30 transition-colors">
                  <td className="p-4 sm:p-6 font-bold text-slate-300 sticky left-0 z-20 bg-[#0D111A] border-r-2 border-[#1A2234] shadow-[2px_0px_0px_0px_#1A2234]">
                    <div className="flex items-center space-x-2">
                      <Server className="w-4 h-4 text-[#00F0FF] shrink-0" />
                      <span>Runtime Engine</span>
                    </div>
                  </td>
                  {selectedSystems.map((sys, i) => (
                    <td key={i} className="p-4 sm:p-6 text-white font-medium border-r border-[#1A2234] last:border-r-0">
                      {sys.runtime}
                    </td>
                  ))}
                </tr>

                {/* Row 2: Cold Start Latency */}
                <tr className="hover:bg-[#1A2234]/30 transition-colors">
                  <td className="p-4 sm:p-6 font-bold text-slate-300 sticky left-0 z-20 bg-[#0D111A] border-r-2 border-[#1A2234] shadow-[2px_0px_0px_0px_#1A2234]">
                    <div className="flex items-center space-x-2">
                      <Zap className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>P99 Cold Latency</span>
                    </div>
                  </td>
                  {selectedSystems.map((sys, i) => (
                    <td key={i} className="p-4 sm:p-6 text-emerald-400 font-bold border-r border-[#1A2234] last:border-r-0">
                      {sys.latency}
                    </td>
                  ))}
                </tr>

                {/* Row 3: Concurrency */}
                <tr className="hover:bg-[#1A2234]/30 transition-colors">
                  <td className="p-4 sm:p-6 font-bold text-slate-300 sticky left-0 z-20 bg-[#0D111A] border-r-2 border-[#1A2234] shadow-[2px_0px_0px_0px_#1A2234]">
                    <div className="flex items-center space-x-2">
                      <Activity className="w-4 h-4 text-[#8B5CF6] shrink-0" />
                      <span>Concurrency Ops</span>
                    </div>
                  </td>
                  {selectedSystems.map((sys, i) => (
                    <td key={i} className="p-4 sm:p-6 text-[#8B5CF6] font-bold border-r border-[#1A2234] last:border-r-0">
                      {sys.concurrency}
                    </td>
                  ))}
                </tr>

                {/* Row 4: Database Engine */}
                <tr className="hover:bg-[#1A2234]/30 transition-colors">
                  <td className="p-4 sm:p-6 font-bold text-slate-300 sticky left-0 z-20 bg-[#0D111A] border-r-2 border-[#1A2234] shadow-[2px_0px_0px_0px_#1A2234]">
                    <div className="flex items-center space-x-2">
                      <Database className="w-4 h-4 text-[#00F0FF] shrink-0" />
                      <span>Database Stack</span>
                    </div>
                  </td>
                  {selectedSystems.map((sys, i) => (
                    <td key={i} className="p-4 sm:p-6 text-slate-200 border-r border-[#1A2234] last:border-r-0">
                      {sys.database}
                    </td>
                  ))}
                </tr>

                {/* Row 5: OWASP Security */}
                <tr className="hover:bg-[#1A2234]/30 transition-colors">
                  <td className="p-4 sm:p-6 font-bold text-slate-300 sticky left-0 z-20 bg-[#0D111A] border-r-2 border-[#1A2234] shadow-[2px_0px_0px_0px_#1A2234]">
                    <div className="flex items-center space-x-2">
                      <Lock className="w-4 h-4 text-yellow-400 shrink-0" />
                      <span>OWASP Hardening</span>
                    </div>
                  </td>
                  {selectedSystems.map((sys, i) => (
                    <td key={i} className="p-4 sm:p-6 text-slate-200 border-r border-[#1A2234] last:border-r-0">
                      {sys.owaspStatus}
                    </td>
                  ))}
                </tr>

                {/* Row 6: Technology Stack */}
                <tr className="hover:bg-[#1A2234]/30 transition-colors">
                  <td className="p-4 sm:p-6 font-bold text-slate-300 sticky left-0 z-20 bg-[#0D111A] border-r-2 border-[#1A2234] shadow-[2px_0px_0px_0px_#1A2234]">
                    <div className="flex items-center space-x-2">
                      <Cpu className="w-4 h-4 text-[#00F0FF] shrink-0" />
                      <span>Stack Modules</span>
                    </div>
                  </td>
                  {selectedSystems.map((sys, i) => (
                    <td key={i} className="p-4 sm:p-6 border-r border-[#1A2234] last:border-r-0">
                      <div className="flex flex-wrap gap-1.5">
                        {sys.stack.map((st, sIdx) => (
                          <span key={sIdx} className="px-2 py-0.5 bg-[#07090E] border border-[#1A2234] text-[10px] text-slate-300 uppercase">
                            [{st}]
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Row 7: Deployment Action Buttons */}
                <tr className="bg-[#07090E]">
                  <td className="p-4 sm:p-6 font-bold text-[#00F0FF] uppercase sticky left-0 z-20 bg-[#07090E] border-r-2 border-[#1A2234] shadow-[2px_0px_0px_0px_#1A2234]">
                    // ACTION
                  </td>
                  {selectedSystems.map((sys, i) => (
                    <td key={i} className="p-4 sm:p-6 border-r border-[#1A2234] last:border-r-0">
                      <Link
                        href={`/checkout?system=${sys.slug}`}
                        className="w-full py-3 px-4 rounded-none text-xs font-bold text-black bg-[#00F0FF] border-2 border-[#00F0FF] shadow-[3px_3px_0px_0px_#8B5CF6] hover:shadow-[5px_5px_0px_0px_#8B5CF6] active:translate-x-[2px] active:translate-y-[2px] flex items-center justify-center space-x-1.5 uppercase min-h-[44px]"
                      >
                        <span>DEPLOY SYSTEM</span>
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
        <div className="rounded-none bg-[#0D111A] border-2 border-[#1A2234] p-8 space-y-8 shadow-[6px_6px_0px_0px_#1A2234] font-mono-tabular">
          
          <div className="flex items-center space-x-3 pb-4 border-b-2 border-[#1A2234]">
            <div className="p-2.5 rounded-none bg-[#07090E] border-2 border-[#00F0FF] text-[#00F0FF] shadow-[2px_2px_0px_0px_#00F0FF]">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white tracking-wider uppercase">
                // LIVE BENCHMARK METRICS VISUALIZER
              </h2>
              <p className="text-xs text-[#94A3B8]">
                Empirical load simulation: Request Throughput, Memory Footprint &amp; P99 Cycle Latency.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Metric 1: Request Throughput (Req/sec) */}
            <div className="p-6 rounded-none bg-[#07090E] border-2 border-[#1A2234] shadow-[4px_4px_0px_0px_#1A2234] space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#00F0FF] font-bold">[THROUGHPUT: REQ/SEC]</span>
                <span className="text-[#94A3B8] text-[10px]">Higher is better</span>
              </div>
              <div className="space-y-3">
                {selectedSystems.map((sys, i) => {
                  const pct = Math.round((sys.throughputReqSec / maxThroughput) * 100);
                  return (
                    <div key={i} className="space-y-1">
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
            <div className="p-6 rounded-none bg-[#07090E] border-2 border-[#1A2234] shadow-[4px_4px_0px_0px_#1A2234] space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#8B5CF6] font-bold">[MEMORY FOOTPRINT: MB]</span>
                <span className="text-[#94A3B8] text-[10px]">Lower is leaner</span>
              </div>
              <div className="space-y-3">
                {selectedSystems.map((sys, i) => {
                  const pct = Math.round((sys.memoryFootprintMb / maxMemory) * 100);
                  return (
                    <div key={i} className="space-y-1">
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

            {/* Metric 3: Reflection / Latency Cycle (ms) */}
            <div className="p-6 rounded-none bg-[#07090E] border-2 border-[#1A2234] shadow-[4px_4px_0px_0px_#1A2234] space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-emerald-400 font-bold">[REFLECTION LATENCY: MS]</span>
                <span className="text-[#94A3B8] text-[10px]">Lower is faster</span>
              </div>
              <div className="space-y-3">
                {selectedSystems.map((sys, i) => {
                  const pct = Math.round((sys.reflectionCycleMs / maxLatency) * 100);
                  return (
                    <div key={i} className="space-y-1">
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
