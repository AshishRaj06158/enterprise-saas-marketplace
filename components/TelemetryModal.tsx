"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Terminal,
  Activity,
  Code2,
  Copy,
  Check,
  Cpu,
  Zap,
  ShieldCheck,
  RefreshCw,
  HardDrive,
  Server
} from "lucide-react";

interface TelemetryModalProps {
  isOpen: boolean;
  onClose: () => void;
  systemName: string;
  systemSlug: string;
  stack?: string[];
  specs?: { label: string; value: string }[];
}

export default function TelemetryModal({
  isOpen,
  onClose,
  systemName,
  systemSlug,
  stack = [],
  specs = []
}: TelemetryModalProps) {
  const [activeTab, setActiveTab] = useState<"logs" | "metrics" | "payload">("logs");
  const [copied, setCopied] = useState(false);

  // Simulated live typewriter log entries
  const [logLines, setLogLines] = useState<string[]>([]);
  const [isStreaming, setIsStreaming] = useState(true);

  const initialLogs = [
    `[SYS_INIT] Loading docker sandbox container for ${systemSlug}.internal...`,
    `[NET_BOUND] Edge router node attached (us-east-1, P99 < 14ms)...`,
    `[AUTH_GUARD] Validated JWT Scoped Bearer Token & AES-256 vault secret...`,
    `[DISPATCH] Executing tool call: SQL Sandbox (<18ms response)...`,
    `[SEC] OWASP Top 10 LLM Guardrail check: PASSED (99.9% Defense)...`,
    `[MCP_SYNC] Model Context Protocol schema validated via Zod...`,
    `[STREAM_CHUNK] Streaming event payload chunk #0041 to client socket...`,
    `[OK] Pipeline reflection loop cycle completed cleanly.`
  ];

  useEffect(() => {
    if (!isOpen) return;

    setLogLines([initialLogs[0], initialLogs[1]]);
    let currentIdx = 2;
    setIsStreaming(true);

    const interval = setInterval(() => {
      if (currentIdx < initialLogs.length) {
        const nextLog = initialLogs[currentIdx];
        setLogLines((prev) => [...prev, nextLog]);
        currentIdx++;
      } else {
        setIsStreaming(false);
        clearInterval(interval);
      }
    }, 450);

    return () => clearInterval(interval);
  }, [isOpen, systemSlug]);

  const handleCopyJson = () => {
    const payload = JSON.stringify(
      {
        system: systemName,
        slug: systemSlug,
        environment: "production-docker-sandbox-v4.2",
        status: "ONLINE",
        telemetry: {
          latencyP99Ms: 18,
          cpuUsagePercent: 14.2,
          memoryMb: 210,
          uptimePercent: 99.99,
          activeNodes: 1420
        },
        stack: stack,
        specifications: specs
      },
      null,
      2
    );

    navigator.clipboard.writeText(payload);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const rawPayload = JSON.stringify(
    {
      request: {
        action: "EXECUTE_AGENT_PIPELINE",
        systemSlug: systemSlug,
        traceId: `tr-${Math.random().toString(36).substring(2, 10)}`,
        timestamp: new Date().toISOString(),
        guardrails: {
          promptFirewall: "ACTIVE",
          maxContextTokens: 128000
        }
      },
      response: {
        status: 200,
        statusText: "OK",
        latency: "18ms",
        agentReflection: {
          stepsEvaluated: 3,
          toolDispatches: ["sql_vector_query", "redis_session_store"],
          guardrailResult: "CLEAR"
        }
      }
    },
    null,
    2
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-3xl rounded-none bg-[#07090E] border-2 border-[#00F0FF] p-6 sm:p-8 shadow-[8px_8px_0px_0px_#00F0FF] text-slate-100 z-10 overflow-hidden"
          >
            {/* Cyber Scanline Micro-Animation */}
            <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent blur-[1px] animate-scanline pointer-events-none opacity-60 z-20" />

            {/* Modal Header */}
            <div className="flex items-center justify-between border-b-2 border-[#1A2234] pb-4 mb-6 relative z-10">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono uppercase text-[#00F0FF] px-2.5 py-0.5 rounded-none bg-[#00F0FF]/10 border-2 border-[#00F0FF] flex items-center space-x-1.5 font-bold shadow-[2px_2px_0px_0px_#00F0FF]">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-none bg-[#00F0FF] opacity-75" />
                      <span className="relative inline-flex rounded-none h-1.5 w-1.5 bg-[#00F0FF]" />
                    </span>
                    <span>[ONLINE // DOCKER SANDBOX 4.2]</span>
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase flex items-center gap-2">
                  <span>{systemName}</span>
                </h2>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-2 rounded-none bg-[#0D111A] border-2 border-[#1A2234] text-slate-400 hover:text-white hover:border-[#00F0FF] transition-all shadow-[2px_2px_0px_0px_#1A2234] active:translate-x-[1px] active:translate-y-[1px]"
                aria-label="Close Telemetry Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Telemetry Tabs */}
            <div className="flex items-center space-x-2 border-b-2 border-[#1A2234] mb-6 overflow-x-auto pb-2">
              <button
                onClick={() => setActiveTab("logs")}
                className={`px-4 py-2 rounded-none text-xs font-mono uppercase font-bold tracking-wider transition-all flex items-center space-x-2 border-2 ${
                  activeTab === "logs"
                    ? "bg-[#00F0FF] text-black border-[#00F0FF] shadow-[2px_2px_0px_0px_#00F0FF]"
                    : "text-slate-400 border-transparent hover:text-white hover:bg-[#0D111A] hover:border-[#1A2234]"
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>[LIVE LOGS]</span>
              </button>

              <button
                onClick={() => setActiveTab("metrics")}
                className={`px-4 py-2 rounded-none text-xs font-mono uppercase font-bold tracking-wider transition-all flex items-center space-x-2 border-2 ${
                  activeTab === "metrics"
                    ? "bg-[#8B5CF6] text-white border-[#8B5CF6] shadow-[2px_2px_0px_0px_#8B5CF6]"
                    : "text-slate-400 border-transparent hover:text-white hover:bg-[#0D111A] hover:border-[#1A2234]"
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                <span>[METRICS]</span>
              </button>

              <button
                onClick={() => setActiveTab("payload")}
                className={`px-4 py-2 rounded-none text-xs font-mono uppercase font-bold tracking-wider transition-all flex items-center space-x-2 border-2 ${
                  activeTab === "payload"
                    ? "bg-emerald-400 text-black border-emerald-400 shadow-[2px_2px_0px_0px_#10B981]"
                    : "text-slate-400 border-transparent hover:text-white hover:bg-[#0D111A] hover:border-[#1A2234]"
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>[API PAYLOAD]</span>
              </button>
            </div>

            {/* TAB CONTENT */}

            {/* TAB 1: Live Agent Logs */}
            {activeTab === "logs" && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="flex items-center space-x-1.5 font-bold uppercase text-slate-300">
                    <Server className="w-3.5 h-3.5 text-[#00F0FF]" />
                    <span>[CONTAINER STREAMING TERMINAL]</span>
                  </span>
                  {isStreaming ? (
                    <span className="text-[#00F0FF] animate-pulse flex items-center space-x-1 font-bold">
                      <RefreshCw className="w-3 h-3 animate-spin" />
                      <span>STREAMING...</span>
                    </span>
                  ) : (
                    <span className="text-emerald-400 font-bold">[STREAM READY]</span>
                  )}
                </div>

                <div className="h-64 bg-[#05070B] border-2 border-[#1A2234] rounded-none p-4 font-mono text-xs text-slate-300 overflow-y-auto space-y-2 shadow-[2px_2px_0px_0px_#1A2234]">
                  {logLines.map((line, idx) => (
                    <div key={idx} className="flex items-start space-x-2">
                      <span className="text-slate-600 select-none">&gt;</span>
                      <span
                        className={
                          line.includes("[SEC]")
                            ? "text-emerald-400 font-semibold"
                            : line.includes("[DISPATCH]")
                            ? "text-[#00F0FF]"
                            : line.includes("[MCP_SYNC]")
                            ? "text-[#8B5CF6]"
                            : "text-slate-300"
                        }
                      >
                        {line}
                      </span>
                    </div>
                  ))}
                  {isStreaming && (
                    <div className="flex items-center space-x-1 text-[#00F0FF]">
                      <span className="inline-block w-2 h-4 bg-[#00F0FF] animate-pulse" />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 2: System Metrics */}
            {activeTab === "metrics" && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3.5 rounded-none bg-[#0D111A] border-2 border-[#1A2234] space-y-1 shadow-[2px_2px_0px_0px_#1A2234]">
                    <div className="text-[10px] text-slate-400 font-mono uppercase font-bold">[P99 LATENCY]</div>
                    <div className="text-xl font-black text-[#00F0FF] font-mono">&lt; 18ms</div>
                    <div className="text-[9px] text-emerald-400 font-mono font-bold">Edge Verified</div>
                  </div>

                  <div className="p-3.5 rounded-none bg-[#0D111A] border-2 border-[#1A2234] space-y-1 shadow-[2px_2px_0px_0px_#1A2234]">
                    <div className="text-[10px] text-slate-400 font-mono uppercase font-bold">[CPU USAGE]</div>
                    <div className="text-xl font-black text-white font-mono">14.2%</div>
                    <div className="text-[9px] text-slate-400 font-mono">Container Pool</div>
                  </div>

                  <div className="p-3.5 rounded-none bg-[#0D111A] border-2 border-[#1A2234] space-y-1 shadow-[2px_2px_0px_0px_#1A2234]">
                    <div className="text-[10px] text-slate-400 font-mono uppercase font-bold">[MEMORY ALLOC]</div>
                    <div className="text-xl font-black text-[#8B5CF6] font-mono">210 MB</div>
                    <div className="text-[9px] text-slate-400 font-mono">V8 Heap Stable</div>
                  </div>

                  <div className="p-3.5 rounded-none bg-[#0D111A] border-2 border-[#1A2234] space-y-1 shadow-[2px_2px_0px_0px_#1A2234]">
                    <div className="text-[10px] text-slate-400 font-mono uppercase font-bold">[CLUSTER UPTIME]</div>
                    <div className="text-xl font-black text-emerald-400 font-mono">99.99%</div>
                    <div className="text-[9px] text-emerald-400 font-mono font-bold">SLA Active</div>
                  </div>
                </div>

                {/* Visual Performance Gauges */}
                <div className="space-y-3 p-4 rounded-none bg-[#0D111A] border-2 border-[#1A2234] font-mono text-xs shadow-[4px_4px_0px_0px_#1A2234]">
                  <div className="flex justify-between text-slate-300 font-bold uppercase">
                    <span>Tool Dispatch Queue Efficiency</span>
                    <span className="text-[#00F0FF]">98.4%</span>
                  </div>
                  <div className="w-full bg-[#07090E] h-2.5 rounded-none overflow-hidden border-2 border-[#1A2234]">
                    <div className="bg-[#00F0FF] h-full w-[98.4%]" />
                  </div>

                  <div className="flex justify-between text-slate-300 font-bold uppercase pt-2">
                    <span>LLM Schema Self-Healing Coverage</span>
                    <span className="text-[#8B5CF6]">100%</span>
                  </div>
                  <div className="w-full bg-[#07090E] h-2.5 rounded-none overflow-hidden border-2 border-[#1A2234]">
                    <div className="bg-[#8B5CF6] h-full w-[100%]" />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: Raw API Payload */}
            {activeTab === "payload" && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400 uppercase font-bold">[JSON REQUEST / RESPONSE FORMAT]</span>
                  <button
                    onClick={handleCopyJson}
                    className="px-3.5 py-1.5 rounded-none bg-[#00F0FF]/10 text-[#00F0FF] border-2 border-[#00F0FF] hover:bg-[#00F0FF] hover:text-black transition-all flex items-center space-x-1.5 font-bold uppercase text-xs shadow-[2px_2px_0px_0px_#00F0FF] active:translate-x-[1px] active:translate-y-[1px]"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">[COPIED]</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>[COPY JSON]</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="h-64 bg-[#05070B] border-2 border-[#1A2234] rounded-none p-4 font-mono text-xs text-[#00F0FF] overflow-y-auto shadow-[2px_2px_0px_0px_#1A2234]">
                  <pre>{rawPayload}</pre>
                </div>
              </div>
            )}

            {/* Modal Footer */}
            <div className="mt-6 pt-4 border-t-2 border-[#1A2234] flex items-center justify-between text-xs font-mono text-slate-500">
              <span className="flex items-center space-x-1.5 text-slate-400 font-bold uppercase">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>[AUDITED SANDBOX TELEMETRY]</span>
              </span>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-none bg-[#1A2234] text-white border-2 border-[#1A2234] hover:bg-[#00F0FF] hover:text-black hover:border-[#00F0FF] font-black uppercase tracking-wider font-mono shadow-[2px_2px_0px_0px_#1A2234] active:translate-x-[1px] active:translate-y-[1px] transition-all"
              >
                [CLOSE]
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
