"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Monitor,
  Tablet,
  Smartphone,
  Code2,
  Database,
  Terminal,
  Play,
  Copy,
  Check,
  ArrowRight,
  RefreshCw,
  Zap,
  Activity,
  Cpu,
  Layers,
  ShieldCheck,
  TrendingUp,
  Server,
  Kanban,
  ExternalLink,
  Sliders,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { useCurrency } from "@/context/CurrencyContext";
import { getSystemBySlug, getAllSystems, SystemProduct } from "@/data/systems";

type ViewMode = "canvas" | "code" | "payload";
type DeviceViewport = "desktop" | "tablet" | "mobile";

function PlaygroundContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const systemSlug = searchParams.get("system") || "telemetry-matrix";

  const allSystems = getAllSystems();
  const [selectedSystem, setSelectedSystem] = useState<SystemProduct>(() => {
    return getSystemBySlug(systemSlug) || allSystems[0];
  });

  useEffect(() => {
    const sys = getSystemBySlug(systemSlug) || allSystems[0];
    setSelectedSystem(sys);
  }, [systemSlug]);

  const { currency } = useCurrency();

  const [viewMode, setViewMode] = useState<ViewMode>("canvas");
  const [viewport, setViewport] = useState<DeviceViewport>("desktop");
  const [copiedCode, setCopiedCode] = useState(false);

  // --- Telemetry Interactive State ---
  const [timeRange, setTimeRange] = useState<"1h" | "24h" | "7d">("24h");
  const [errorRateToggle, setErrorRateToggle] = useState<"low" | "mid" | "high">("low");
  const [pingStream, setPingStream] = useState<number[]>(() => [11.2, 9.8, 10.5, 12.1, 10.9, 11.6, 9.4, 10.8]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPingStream((prev) => {
        const base = errorRateToggle === "low" ? 10 : errorRateToggle === "mid" ? 28 : 95;
        const newPing = parseFloat((base + Math.random() * 4).toFixed(1));
        return [...prev.slice(1), newPing];
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [errorRateToggle]);

  // --- Agent Orchestrator Interactive State ---
  const [agentPrompt, setAgentPrompt] = useState("Execute multi-turn GMV telemetry audit & auto-sign GST invoice.");
  const [isAgentRunning, setIsAgentRunning] = useState(false);
  const [agentTokens, setAgentTokens] = useState<string[]>([]);
  const [activeToolIndex, setActiveToolIndex] = useState(-1);

  const handleRunAgent = () => {
    if (isAgentRunning) return;
    setIsAgentRunning(true);
    setAgentTokens([]);
    setActiveToolIndex(0);

    const tokens = [
      "Analyzing user intent...",
      "Resolving Supabase Postgres connection pooler...",
      "Executing tool: Upstash Redis Vector Search...",
      "Filtering OWASP LLM01 prompt injection firewall...",
      "Generating legally binding GST PDF contract...",
      "SHA-256 state hash committed to execution ledger."
    ];

    tokens.forEach((tok, idx) => {
      setTimeout(() => {
        setAgentTokens((prev) => [...prev, tok]);
        setActiveToolIndex(idx);
        if (idx === tokens.length - 1) {
          setIsAgentRunning(false);
        }
      }, (idx + 1) * 700);
    });
  };

  // --- CRM Kanban Interactive State ---
  const [kanbanDeals, setKanbanDeals] = useState([
    { id: "d1", name: "Acme Logistics Corp", value: "₹2,49,000", stage: "lead" },
    { id: "d2", name: "Hyperion Cloud Systems", value: "₹1,89,000", stage: "lead" },
    { id: "d3", name: "Starlight Labs B2B", value: "₹4,99,000", stage: "contract" },
    { id: "d4", name: "Nexus Global Fintech", value: "₹8,49,000", stage: "won" }
  ]);

  const advanceDeal = (id: string) => {
    setKanbanDeals((prev) =>
      prev.map((d) => {
        if (d.id !== id) return d;
        if (d.stage === "lead") return { ...d, stage: "contract" };
        if (d.stage === "contract") return { ...d, stage: "won" };
        return d;
      })
    );
  };

  // Code Snippet Generation
  const sampleCodeSnippet = `// Production Next.js 15 Server Component
// System: ${selectedSystem.name} (${selectedSystem.slug})
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function execute${selectedSystem.slug.replace(/[^a-zA-Z0-9]/g, "")}Task(payload: Record<string, any>) {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { cookies: { getAll: () => cookieStore.getAll() } }
  );

  // 1. Enforce OWASP Top 10 Security Guardrail
  if (process.env.OWASP_FIREWALL_ENABLED === "true") {
    console.log("[SECURITY]: Executing honeypot & token validation check.");
  }

  // 2. Query Postgres Row Level Security (RLS) Pool
  const { data, error } = await supabase
    .from("nexus_events")
    .select("*")
    .limit(50);

  if (error) throw new Error(\`System error: \${error.message}\`);

  return {
    system: "${selectedSystem.slug}",
    latency_ms: 11.8,
    status: 200,
    records: data
  };
}`;

  const samplePayloadJson = {
    system_metadata: {
      id: selectedSystem.id,
      slug: selectedSystem.slug,
      name: selectedSystem.name,
      runtime: selectedSystem.runtime,
      latency_p99: selectedSystem.latency,
      owasp_hardened: selectedSystem.owaspStatus
    },
    live_telemetry: {
      current_ping_ms: pingStream[pingStream.length - 1],
      throughput_req_sec: selectedSystem.throughputReqSec,
      memory_footprint_mb: selectedSystem.memoryFootprintMb,
      concurrency_ops_sec: selectedSystem.concurrency
    },
    specs_breakdown: selectedSystem.specs,
    commercial_entitlement: {
      price_inr: selectedSystem.priceInr,
      price_usd: selectedSystem.priceUsd,
      commercial_ip_transfer: true,
      perpetual_license: true
    }
  };

  const handleCopyCodeSnippet = () => {
    navigator.clipboard.writeText(sampleCodeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const displayPrice = currency === "INR" ? selectedSystem.priceInr : selectedSystem.priceUsd;

  return (
    <div className="pt-24 pb-24 bg-[#07090E] min-h-screen text-slate-100 relative overflow-hidden flex flex-col justify-between">
      {/* Background Cyber Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-[#00F0FF]/10 blur-3xl pointer-events-none rounded-full animate-pulse-slow" />
      <div className="absolute inset-0 bg-dot-matrix opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 space-y-6">
        
        {/* TOP BAR PLAYGROUND CONTROLS */}
        <div className="rounded-2xl bg-[#0D111A]/90 backdrop-blur-md border border-[#00F0FF]/40 p-4 shadow-[0_0_35px_rgba(0,240,255,0.15)] flex flex-wrap items-center justify-between gap-4">
          
          {/* System Switcher */}
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-[#00F0FF]/10 border border-[#00F0FF]/40 text-[#00F0FF]">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono-tabular text-[#94A3B8] uppercase">
                ACTIVE SYSTEM SANDBOX
              </div>
              <select
                value={selectedSystem.slug}
                onChange={(e) => {
                  const targetSlug = e.target.value;
                  router.push(`/playground?system=${targetSlug}`);
                }}
                className="bg-[#07090E] border border-[#1A2234] focus:border-[#00F0FF] rounded-lg px-3 py-1.5 text-xs font-mono-tabular font-bold text-white focus:outline-none cursor-pointer"
              >
                {allSystems.map((sys) => (
                  <option key={sys.id} value={sys.slug}>
                    {sys.name} ({sys.badge})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="p-1 rounded-xl bg-[#07090E] border border-[#1A2234] inline-flex items-center space-x-1 text-xs font-mono-tabular">
            <button
              onClick={() => setViewMode("canvas")}
              className={`px-3 py-2 rounded-lg font-bold transition-all flex items-center space-x-1.5 cursor-pointer min-h-[38px] ${
                viewMode === "canvas"
                  ? "bg-[#00F0FF] text-black shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Monitor className="w-4 h-4" />
              <span>Live Canvas</span>
            </button>
            <button
              onClick={() => setViewMode("code")}
              className={`px-3 py-2 rounded-lg font-bold transition-all flex items-center space-x-1.5 cursor-pointer min-h-[38px] ${
                viewMode === "code"
                  ? "bg-[#8B5CF6] text-white shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Code2 className="w-4 h-4" />
              <span>Source Code (.tsx)</span>
            </button>
            <button
              onClick={() => setViewMode("payload")}
              className={`px-3 py-2 rounded-lg font-bold transition-all flex items-center space-x-1.5 cursor-pointer min-h-[38px] ${
                viewMode === "payload"
                  ? "bg-emerald-500 text-black shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Database className="w-4 h-4" />
              <span>Payload Inspector</span>
            </button>
          </div>

          {/* Device Viewport Selector */}
          <div className="hidden sm:flex items-center space-x-1 bg-[#07090E] p-1 rounded-xl border border-[#1A2234]">
            <button
              onClick={() => setViewport("desktop")}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                viewport === "desktop" ? "bg-[#1A2234] text-[#00F0FF]" : "text-slate-400 hover:text-white"
              }`}
              title="Desktop View (100%)"
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewport("tablet")}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                viewport === "tablet" ? "bg-[#1A2234] text-[#00F0FF]" : "text-slate-400 hover:text-white"
              }`}
              title="Tablet View (768px)"
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewport("mobile")}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                viewport === "mobile" ? "bg-[#1A2234] text-[#00F0FF]" : "text-slate-400 hover:text-white"
              }`}
              title="Mobile View (380px)"
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>

          {/* Action CTA */}
          <Link
            href={`/checkout?system=${selectedSystem.slug}`}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-[#00F0FF] to-[#8B5CF6] hover:opacity-95 transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)] flex items-center space-x-1.5 cursor-pointer min-h-[44px]"
          >
            <span>Acquire System ({displayPrice})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* MAIN SANDBOX PREVIEW AREA */}
        <div
          className={`transition-all duration-300 ${
            viewport === "desktop"
              ? "w-full"
              : viewport === "tablet"
              ? "max-w-3xl mx-auto"
              : "max-w-sm mx-auto"
          }`}
        >
          {/* VIEW MODE 1: LIVE CANVAS */}
          {viewMode === "canvas" && (
            <div className="rounded-3xl bg-[#0D111A]/90 backdrop-blur-md border border-[#00F0FF]/30 p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent blur-[1px] animate-scanline pointer-events-none" />

              {/* Canvas Header info */}
              <div className="flex flex-wrap items-center justify-between border-b border-[#1A2234] pb-4 gap-2">
                <div className="flex items-center space-x-3">
                  <span className="text-[10px] font-mono-tabular uppercase px-3 py-1 rounded bg-[#07090E] text-[#00F0FF] border border-[#00F0FF]/30">
                    {selectedSystem.badge}
                  </span>
                  <h2 className="text-xl font-bold text-white">{selectedSystem.name}</h2>
                </div>
                <div className="flex items-center space-x-2 text-xs font-mono-tabular text-emerald-400">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                  </span>
                  <span>LIVE REACTION SIMULATOR ACTIVE</span>
                </div>
              </div>

              {/* 1. Telemetry Matrix Custom Live Canvas */}
              {selectedSystem.slug === "telemetry-matrix" && (
                <div className="space-y-6">
                  {/* Telemetry controls */}
                  <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-[#07090E] border border-[#1A2234] text-xs font-mono-tabular">
                    <div className="flex items-center space-x-2">
                      <span className="text-slate-400">Time Range:</span>
                      {(["1h", "24h", "7d"] as const).map((tr) => (
                        <button
                          key={tr}
                          onClick={() => setTimeRange(tr)}
                          className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                            timeRange === tr
                              ? "bg-[#00F0FF] text-black font-bold"
                              : "text-slate-400 hover:text-white bg-[#0D111A]"
                          }`}
                        >
                          {tr}
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-slate-400">P99 Latency Mode:</span>
                      {(["low", "mid", "high"] as const).map((mode) => (
                        <button
                          key={mode}
                          onClick={() => setErrorRateToggle(mode)}
                          className={`px-3 py-1 rounded-lg uppercase transition-colors cursor-pointer ${
                            errorRateToggle === mode
                              ? "bg-[#8B5CF6] text-white font-bold"
                              : "text-slate-400 hover:text-white bg-[#0D111A]"
                          }`}
                        >
                          {mode === "low" ? "<12ms" : mode === "mid" ? "~28ms" : "~95ms"}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Real-time Ping Chart Stream */}
                  <div className="p-6 rounded-2xl bg-[#07090E] border border-[#1A2234] space-y-4">
                    <div className="flex justify-between items-center text-xs font-mono-tabular">
                      <span className="text-[#00F0FF] font-bold">SUB-12MS P99 QUERY LATENCY STREAM:</span>
                      <span className="text-emerald-400 font-bold">
                        LATEST PING: {pingStream[pingStream.length - 1]} ms
                      </span>
                    </div>

                    <div className="flex items-end justify-between h-36 gap-2 pt-4 border-b border-[#1A2234] px-2">
                      {pingStream.map((val, idx) => {
                        const heightPct = Math.min(100, Math.max(15, (val / 100) * 100));
                        return (
                          <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                            <div className="text-[9px] text-[#00F0FF] opacity-0 group-hover:opacity-100 transition-opacity font-mono">
                              {val}ms
                            </div>
                            <div
                              className="w-full bg-gradient-to-t from-[#00F0FF] to-[#8B5CF6] rounded-t-md transition-all duration-500 shadow-[0_0_10px_rgba(0,240,255,0.3)]"
                              style={{ height: `${heightPct}%` }}
                            />
                            <span className="text-[9px] font-mono text-slate-500">t-{pingStream.length - idx}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* 2. Agent Orchestrator Custom Live Canvas */}
              {selectedSystem.slug === "nexus-agent-orchestrator" && (
                <div className="space-y-6 font-mono-tabular">
                  <div className="p-4 rounded-2xl bg-[#07090E] border border-[#1A2234] space-y-3">
                    <label className="text-xs text-[#00F0FF] font-bold block uppercase">
                      ENTER AUTONOMOUS AGENT PROMPT:
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={agentPrompt}
                        onChange={(e) => setAgentPrompt(e.target.value)}
                        className="w-full bg-[#0D111A] border border-[#1A2234] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00F0FF]"
                      />
                      <button
                        onClick={handleRunAgent}
                        disabled={isAgentRunning}
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00F0FF] to-[#8B5CF6] text-black font-bold text-xs shrink-0 cursor-pointer disabled:opacity-60 flex items-center space-x-1.5"
                      >
                        {isAgentRunning ? (
                          <RefreshCw className="w-4 h-4 animate-spin" />
                        ) : (
                          <Play className="w-4 h-4 fill-black" />
                        )}
                        <span>Run Stream</span>
                      </button>
                    </div>
                  </div>

                  {/* Token Stream Display */}
                  <div className="p-4 rounded-2xl bg-[#07090E] border border-[#1A2234] space-y-2 min-h-[160px]">
                    <div className="text-[11px] text-[#94A3B8] uppercase">LLM REFLECTION TOKEN STREAM:</div>
                    {agentTokens.length > 0 ? (
                      <div className="space-y-1.5 text-xs">
                        {agentTokens.map((tok, i) => (
                          <div key={i} className="flex items-center space-x-2 text-emerald-400 animate-in fade-in">
                            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                            <span>{tok}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-xs text-slate-500 italic py-4">
                        Press &quot;Run Stream&quot; to test real-time tool calling and context compression...
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 3. CRM Custom Live Canvas (Kanban) */}
              {selectedSystem.slug === "autonomous-crm-pipeline" && (
                <div className="space-y-4">
                  <div className="text-xs font-mono-tabular text-[#94A3B8]">
                    CLICK ANY DEAL CARD TO ADVANCE STAGE THROUGH AUTONOMOUS GST PIPELINE:
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono-tabular">
                    {/* Stage 1: Lead Capture */}
                    <div className="p-4 rounded-2xl bg-[#07090E] border border-[#1A2234] space-y-3">
                      <div className="text-xs font-bold text-[#00F0FF] flex items-center justify-between pb-2 border-b border-[#1A2234]">
                        <span>1. INBOUND LEAD CAPTURE</span>
                        <span className="px-2 py-0.5 rounded bg-[#00F0FF]/10 text-[#00F0FF]">
                          {kanbanDeals.filter((d) => d.stage === "lead").length}
                        </span>
                      </div>
                      <div className="space-y-2">
                        {kanbanDeals
                          .filter((d) => d.stage === "lead")
                          .map((deal) => (
                            <div
                              key={deal.id}
                              onClick={() => advanceDeal(deal.id)}
                              className="p-3 rounded-xl bg-[#0D111A] border border-[#1A2234] hover:border-[#00F0FF] cursor-pointer transition-all space-y-1"
                            >
                              <div className="text-xs font-bold text-white">{deal.name}</div>
                              <div className="text-[11px] text-emerald-400">{deal.value}</div>
                              <div className="text-[9px] text-slate-500">Click to assemble GST contract ➔</div>
                            </div>
                          ))}
                      </div>
                    </div>

                    {/* Stage 2: Contracted */}
                    <div className="p-4 rounded-2xl bg-[#07090E] border border-[#1A2234] space-y-3">
                      <div className="text-xs font-bold text-[#8B5CF6] flex items-center justify-between pb-2 border-b border-[#1A2234]">
                        <span>2. GST CONTRACT DISPATCH</span>
                        <span className="px-2 py-0.5 rounded bg-[#8B5CF6]/10 text-[#8B5CF6]">
                          {kanbanDeals.filter((d) => d.stage === "contract").length}
                        </span>
                      </div>
                      <div className="space-y-2">
                        {kanbanDeals
                          .filter((d) => d.stage === "contract")
                          .map((deal) => (
                            <div
                              key={deal.id}
                              onClick={() => advanceDeal(deal.id)}
                              className="p-3 rounded-xl bg-[#0D111A] border border-[#1A2234] hover:border-[#8B5CF6] cursor-pointer transition-all space-y-1"
                            >
                              <div className="text-xs font-bold text-white">{deal.name}</div>
                              <div className="text-[11px] text-[#8B5CF6]">{deal.value}</div>
                              <div className="text-[9px] text-slate-500">Click to execute auto-settlement ➔</div>
                            </div>
                          ))}
                      </div>
                    </div>

                    {/* Stage 3: Won */}
                    <div className="p-4 rounded-2xl bg-[#07090E] border border-[#1A2234] space-y-3">
                      <div className="text-xs font-bold text-emerald-400 flex items-center justify-between pb-2 border-b border-[#1A2234]">
                        <span>3. SETTLED & CLOSED WON</span>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400">
                          {kanbanDeals.filter((d) => d.stage === "won").length}
                        </span>
                      </div>
                      <div className="space-y-2">
                        {kanbanDeals
                          .filter((d) => d.stage === "won")
                          .map((deal) => (
                            <div
                              key={deal.id}
                              className="p-3 rounded-xl bg-[#0D111A] border border-emerald-500/40 space-y-1"
                            >
                              <div className="text-xs font-bold text-white">{deal.name}</div>
                              <div className="text-[11px] text-emerald-400 font-bold">{deal.value} (SETTLED)</div>
                              <div className="text-[9px] text-emerald-400">✓ Revenue locked in database</div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Default Live Canvas for ERP/Omega/Sentinel */}
              {["quantum-logistics-erp", "omega-core-starter", "sentinel-auth-hub"].includes(selectedSystem.slug) && (
                <div className="p-6 rounded-2xl bg-[#07090E] border border-[#1A2234] space-y-4 font-mono-tabular text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[#00F0FF] font-bold">PRODUCTION SYSTEM SPECIFICATION:</span>
                    <span className="text-slate-400">{selectedSystem.runtime}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedSystem.specs.map((sp, i) => (
                      <div key={i} className="p-3 rounded-xl bg-[#0D111A] border border-[#1A2234] flex items-center justify-between">
                        <span className="text-slate-400">{sp.label}:</span>
                        <span className="text-white font-semibold">{sp.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

          {/* VIEW MODE 2: SOURCE CODE */}
          {viewMode === "code" && (
            <div className="rounded-3xl bg-[#0D111A]/90 backdrop-blur-md border border-[#8B5CF6]/40 shadow-2xl overflow-hidden relative">
              <div className="bg-[#07090E] border-b border-[#1A2234] p-4 flex items-center justify-between text-xs font-mono-tabular">
                <span className="text-[#8B5CF6] font-bold flex items-center space-x-2">
                  <Code2 className="w-4 h-4" />
                  <span>app/api/{selectedSystem.slug}/route.ts</span>
                </span>

                <button
                  onClick={handleCopyCodeSnippet}
                  className="px-3.5 py-1.5 rounded-lg bg-[#8B5CF6]/10 text-[#8B5CF6] hover:bg-[#8B5CF6]/20 border border-[#8B5CF6]/30 flex items-center space-x-1.5 transition-colors cursor-pointer min-h-[36px]"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Snippet</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-6 bg-[#07090E] font-mono text-xs sm:text-sm text-slate-200 overflow-x-auto max-h-[500px] leading-relaxed">
                <pre>
                  <code>{sampleCodeSnippet}</code>
                </pre>
              </div>
            </div>
          )}

          {/* VIEW MODE 3: PAYLOAD INSPECTOR */}
          {viewMode === "payload" && (
            <div className="rounded-3xl bg-[#0D111A]/90 backdrop-blur-md border border-emerald-500/40 shadow-2xl overflow-hidden relative">
              <div className="bg-[#07090E] border-b border-[#1A2234] p-4 flex items-center justify-between text-xs font-mono-tabular">
                <span className="text-emerald-400 font-bold flex items-center space-x-2">
                  <Database className="w-4 h-4" />
                  <span>RESPONSE PAYLOAD INSPECTOR (JSON)</span>
                </span>
                <span className="text-slate-400">HTTP 200 OK (11.8ms)</span>
              </div>

              <div className="p-6 bg-[#07090E] font-mono text-xs text-emerald-400 overflow-x-auto max-h-[500px] leading-relaxed">
                <pre>
                  <code>{JSON.stringify(samplePayloadJson, null, 2)}</code>
                </pre>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default function PlaygroundPage() {
  return (
    <Suspense
      fallback={
        <div className="pt-32 pb-24 bg-[#07090E] min-h-screen text-slate-100 flex items-center justify-center font-mono-tabular">
          <div className="text-center space-y-3">
            <RefreshCw className="w-8 h-8 text-[#00F0FF] animate-spin mx-auto" />
            <p className="text-xs text-[#94A3B8]">Loading Live Component Playground...</p>
          </div>
        </div>
      }
    >
      <PlaygroundContent />
    </Suspense>
  );
}
