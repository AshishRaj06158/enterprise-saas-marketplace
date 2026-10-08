"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Zap,
  Play,
  CheckCircle2,
  Cpu,
  ShieldCheck,
  Database,
  Terminal,
  RefreshCw,
  Code2,
  Lock,
  ArrowRight,
  Server,
  Layers,
  ChevronRight,
  Sparkles,
  Info,
  X
} from "lucide-react";

interface PipelineNode {
  id: number;
  slug: string;
  name: string;
  subtitle: string;
  latency: string;
  policy: string;
  color: string;
  icon: React.ElementType;
  sampleInput: object;
  sampleOutput: object;
}

const pipelineNodes: PipelineNode[] = [
  {
    id: 1,
    slug: "gateway",
    name: "Client Gateway",
    subtitle: "Zod Schema Validation & Inbound Rate Limiter",
    latency: "1.2ms",
    policy: "Zod Strict Validation v2 + Redis Leaky-Bucket",
    color: "#00F0FF",
    icon: Server,
    sampleInput: {
      user_id: "usr_nexus_99f2",
      prompt: "Execute high-frequency market GMV telemetry scrape & audit invoice",
      timestamp: 1759938000
    },
    sampleOutput: {
      status: "VALIDATED",
      sanitized: true,
      rate_limit_remaining: 119
    }
  },
  {
    id: 2,
    slug: "security",
    name: "Security Shield",
    subtitle: "Prompt Injection Firewall & OWASP Guardrails",
    latency: "3.4ms",
    policy: "OWASP LLM01 Mitigation + Salted Honeypot Shield",
    color: "#8B5CF6",
    icon: ShieldCheck,
    sampleInput: {
      raw_prompt: "Execute high-frequency market GMV telemetry scrape & audit invoice",
      token_count: 14
    },
    sampleOutput: {
      jailbreak_detected: false,
      toxicity_score: 0.001,
      security_cleared: true
    }
  },
  {
    id: 3,
    slug: "orchestrator",
    name: "Nexus Orchestrator",
    subtitle: "Model Routing, Re-ranking & Context Compression",
    latency: "8.6ms",
    policy: "Gemini 3.8 / Omni Model Dispatch + 4.2x Context Comp",
    color: "#00F0FF",
    icon: Cpu,
    sampleInput: {
      cleared_prompt: "Execute high-frequency market GMV telemetry scrape & audit invoice",
      agent_graph: "multi_turn_telemetry_loop"
    },
    sampleOutput: {
      model_assigned: "gemini-omni-flash-1.1",
      context_tokens_in: 1240,
      compressed_tokens_out: 295
    }
  },
  {
    id: 4,
    slug: "sandbox",
    name: "MCP Tool Sandboxes",
    subtitle: "Isolated Vector Search, Code Interpreter & SQL",
    latency: "12.1ms",
    policy: "Isolated gVisor Docker Sandbox + Supabase RLS",
    color: "#10B981",
    icon: Database,
    sampleInput: {
      tool_calls: ["upstash_vector_search", "supabase_postgres_pool_query"],
      query_params: { db: "nexus_gmv_events", limit: 50 }
    },
    sampleOutput: {
      tools_executed: 2,
      query_p99_latency: "11.8ms",
      status_code: 200
    }
  },
  {
    id: 5,
    slug: "crypto",
    name: "Cryptographic Output",
    subtitle: "Deterministic Response & SHA-256 State Ledger",
    latency: "1.8ms",
    policy: "SHA-256 State Hash Verification + Commercial SLA",
    color: "#F59E0B",
    icon: Lock,
    sampleInput: {
      assembled_response: "Telemetry Matrix GMV data compiled successfully.",
      state_diff: "finalized"
    },
    sampleOutput: {
      execution_hash: "sha256:7f8a3b99f4d1e2a0b3c4d5e6f",
      state_ledger: "COMMITTED",
      commercial_sla: "AUTHENTICATED"
    }
  }
];

export default function PipelineTopologyPage() {
  const [selectedNode, setSelectedNode] = useState<PipelineNode | null>(pipelineNodes[2]);
  const [activeStep, setActiveStep] = useState<number>(-1);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationLogs, setSimulationLogs] = useState<string[]>([]);

  const handleRunSimulation = () => {
    if (isSimulating) return;

    setIsSimulating(true);
    setActiveStep(1);
    setSimulationLogs(["[00:00.000] [SYSTEM] Initiating agentic payload stream simulation..."]);

    const logMessages = [
      "[00:00.001] [GATEWAY] Validating inbound payload against Zod schema... OK (1.2ms)",
      "[00:00.004] [SECURITY] Scanning prompt for injection vectors... 0 threats detected (3.4ms)",
      "[00:00.012] [ORCHESTRATOR] Routing execution graph to Gemini Omni Flash... Context compressed 4.2x (8.6ms)",
      "[00:00.024] [MCP SANDBOX] Executing tool queries in gVisor sandbox container... 200 OK (12.1ms)",
      "[00:00.026] [LEDGER] Cryptographic SHA-256 state ledger hash committed. Transaction finalized (1.8ms)"
    ];

    let current = 1;
    const interval = setInterval(() => {
      if (current < 5) {
        current += 1;
        setActiveStep(current);
        setSimulationLogs((prev) => [...prev, logMessages[current - 1]]);
      } else {
        clearInterval(interval);
        setSimulationLogs((prev) => [
          ...prev,
          logMessages[4],
          "[00:00.027] [SUCCESS] Pipeline execution loop finalized. All 5 nodes verified."
        ]);
        setTimeout(() => {
          setIsSimulating(false);
          setActiveStep(-1);
        }, 1200);
      }
    }, 600);
  };

  return (
    <div className="pt-32 pb-24 bg-[#07090E] min-h-screen text-slate-100 relative overflow-hidden">
      {/* Ambient Radial Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#00F0FF]/10 blur-3xl pointer-events-none rounded-full animate-pulse-slow" />
      <div className="absolute bottom-10 right-1/4 w-[550px] h-[350px] bg-[#8B5CF6]/12 blur-3xl pointer-events-none rounded-full animate-pulse-slow" style={{ animationDelay: "3s" }} />
      <div className="absolute inset-0 bg-dot-matrix opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#00F0FF]/40 bg-[#00F0FF]/10 text-xs font-mono-tabular text-[#00F0FF] backdrop-blur-md">
            <Zap className="w-4 h-4 text-[#00F0FF]" />
            <span>AGENTIC PIPELINE TOPOLOGY // REAL-TIME EXECUTION ORCHESTRATION</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Multi-Agent Execution Pipeline Topology
          </h1>

          <p className="text-base text-[#94A3B8] leading-relaxed">
            Interactive step-through visualizer illustrating zero-trust input validation, dynamic LLM dispatch, and deterministic tool feedback loops.
          </p>

          {/* Trigger Payload Stream Button */}
          <div className="pt-4 flex items-center justify-center">
            <button
              onClick={handleRunSimulation}
              disabled={isSimulating}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#00F0FF] to-[#8B5CF6] text-black font-bold text-xs sm:text-sm hover:opacity-95 transition-all shadow-[0_0_30px_rgba(0,240,255,0.4)] flex items-center space-x-2.5 cursor-pointer disabled:opacity-60"
            >
              {isSimulating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-black" />
                  <span>Streaming Payload Pulse...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-black" />
                  <span>Trigger Test Payload Stream</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* VISUAL NODE FLOW DIAGRAM (HORIZONTAL / RESPONSIVE GRID) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-mono-tabular text-[#94A3B8]">
            <span className="uppercase tracking-wider flex items-center space-x-2">
              <Layers className="w-4 h-4 text-[#00F0FF]" />
              <span>5-STAGE AGENTIC DISPATCH GRAPH (CLICK ANY NODE TO INSPECT)</span>
            </span>
            <span className="text-[#00F0FF]">TOTAL LATENCY: ~27.1ms</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {pipelineNodes.map((node, index) => {
              const IconComponent = node.icon;
              const isSelected = selectedNode?.id === node.id;
              const isActiveInSimulation = activeStep === node.id;

              return (
                <div key={node.id} className="relative flex flex-col justify-between">
                  {/* Step Card */}
                  <div
                    onClick={() => setSelectedNode(node)}
                    className={`rounded-2xl p-5 border transition-all duration-300 backdrop-blur-md cursor-pointer flex flex-col justify-between h-full relative overflow-hidden group ${
                      isActiveInSimulation
                        ? "bg-[#00F0FF]/20 border-[#00F0FF] shadow-[0_0_35px_rgba(0,240,255,0.4)] scale-[1.03]"
                        : isSelected
                        ? "bg-[#0D111A] border-[#00F0FF]/80 shadow-[0_0_20px_rgba(0,240,255,0.2)]"
                        : "bg-[#0D111A]/80 border-[#1A2234] hover:border-[#00F0FF]/50"
                    }`}
                  >
                    {/* Top scanline pulse */}
                    <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent blur-[1px] opacity-40" />

                    <div>
                      {/* Step Badge & Icon */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="w-6 h-6 rounded-full bg-[#07090E] border border-[#00F0FF]/40 text-[#00F0FF] font-mono-tabular font-bold text-xs flex items-center justify-center">
                          {node.id}
                        </span>
                        <div className="p-2 rounded-xl bg-[#07090E] border border-[#1A2234]">
                          <IconComponent className="w-4 h-4 text-[#00F0FF]" />
                        </div>
                      </div>

                      <h3 className="text-sm font-bold text-white mb-1 group-hover:text-[#00F0FF] transition-colors">
                        {node.name}
                      </h3>
                      <p className="text-[11px] text-[#94A3B8] leading-snug">
                        {node.subtitle}
                      </p>
                    </div>

                    <div className="pt-3 mt-4 border-t border-[#1A2234] flex items-center justify-between text-[11px] font-mono-tabular">
                      <span className="text-slate-400">LATENCY:</span>
                      <span className="text-emerald-400 font-bold">{node.latency}</span>
                    </div>
                  </div>

                  {/* Connecting Arrow for Desktop */}
                  {index < pipelineNodes.length - 1 && (
                    <div className="hidden md:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-[#07090E] border border-[#00F0FF]/40 items-center justify-center text-[#00F0FF] shadow-md">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* NODE INSPECTION DRAWER / DETAIL PANEL */}
        {selectedNode && (
          <div className="rounded-3xl bg-[#0D111A]/90 backdrop-blur-md border border-[#00F0FF]/40 p-6 sm:p-8 shadow-[0_0_40px_rgba(0,240,255,0.15)] space-y-6 relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent blur-[1px] animate-scanline pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#1A2234]">
              <div className="flex items-center space-x-3">
                <span className="w-7 h-7 rounded-full bg-[#00F0FF]/20 border border-[#00F0FF]/50 text-[#00F0FF] font-mono-tabular font-bold text-xs flex items-center justify-center">
                  {selectedNode.id}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-white tracking-wide font-mono-tabular">
                    NODE INSPECTOR: {selectedNode.name.toUpperCase()}
                  </h3>
                  <p className="text-xs text-[#94A3B8] font-mono-tabular">{selectedNode.subtitle}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 text-xs font-mono-tabular">
                  LATENCY: {selectedNode.latency}
                </span>
                <button
                  onClick={() => setSelectedNode(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-[#1A2234]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content: Policy & Payload JSON */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              <div className="lg:col-span-4 space-y-4">
                <div className="p-4 rounded-2xl bg-[#07090E] border border-[#1A2234] space-y-2 font-mono-tabular">
                  <div className="text-[10px] text-[#94A3B8] uppercase">ACTIVE ENVIRONMENT POLICY:</div>
                  <div className="text-xs text-[#00F0FF] font-semibold">{selectedNode.policy}</div>
                </div>

                <div className="p-4 rounded-2xl bg-[#07090E] border border-[#1A2234] space-y-2 font-mono-tabular">
                  <div className="text-[10px] text-[#94A3B8] uppercase">PIPELINE STAGE HAS:</div>
                  <div className="text-xs text-emerald-400 flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Deterministic State Contract Verified</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-8 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Sample Input JSON */}
                  <div className="space-y-1">
                    <div className="text-[10px] font-mono-tabular text-[#94A3B8] uppercase">SAMPLE INBOUND PAYLOAD (JSON):</div>
                    <pre className="p-4 rounded-2xl bg-[#07090E] border border-[#1A2234] text-[11px] font-mono text-[#00F0FF] overflow-x-auto">
                      {JSON.stringify(selectedNode.sampleInput, null, 2)}
                    </pre>
                  </div>

                  {/* Sample Output JSON */}
                  <div className="space-y-1">
                    <div className="text-[10px] font-mono-tabular text-[#94A3B8] uppercase">SAMPLE DISPATCH OUTPUT (JSON):</div>
                    <pre className="p-4 rounded-2xl bg-[#07090E] border border-[#1A2234] text-[11px] font-mono text-emerald-400 overflow-x-auto">
                      {JSON.stringify(selectedNode.sampleOutput, null, 2)}
                    </pre>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* SIMULATION EXECUTION TERMINAL LOG */}
        <div className="rounded-3xl bg-[#0D111A]/90 backdrop-blur-md border border-[#00F0FF]/30 p-6 sm:p-8 shadow-2xl space-y-4 relative overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-[#1A2234]">
            <div className="flex items-center space-x-2">
              <Terminal className="w-5 h-5 text-[#00F0FF]" />
              <h2 className="text-sm font-bold text-white font-mono-tabular uppercase tracking-wider">
                LIVE EXECUTION LOG STREAM TERMINAL
              </h2>
            </div>
            <span className="text-xs font-mono-tabular text-slate-400">
              {isSimulating ? "STATUS: STREAMING..." : "STATUS: IDLE"}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#07090E] border border-[#1A2234] font-mono text-xs text-[#00F0FF] space-y-1.5 min-h-[140px] max-h-[220px] overflow-y-auto overflow-x-auto leading-relaxed">
            {simulationLogs.length > 0 ? (
              simulationLogs.map((log, idx) => (
                <div key={idx} className="flex items-start space-x-2">
                  <span className="text-[#8B5CF6] shrink-0">&gt;</span>
                  <span>{log}</span>
                </div>
              ))
            ) : (
              <div className="text-slate-500 italic">
                Press &quot;Trigger Test Payload Stream&quot; above to initiate live agent execution trace...
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
