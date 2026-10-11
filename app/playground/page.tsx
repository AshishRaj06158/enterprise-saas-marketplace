"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
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
  Pause,
  Copy,
  Check,
  ArrowRight,
  RefreshCw,
  Zap,
  Activity,
  Cpu,
  ShieldCheck,
  Server,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Truck,
  Lock,
  Unlock,
  DollarSign,
  Flame,
  Radio,
  Sliders,
  Send,
  Trash2
} from "lucide-react";
import { useCurrency } from "@/context/CurrencyContext";
import { getSystemBySlug, getAllSystems, SystemProduct } from "@/data/systems";

type ViewMode = "canvas" | "code" | "payload";
type DeviceViewport = "desktop" | "tablet" | "mobile";

interface LogEntry {
  id: string;
  timestamp: string;
  level: "INFO" | "METRIC" | "WARN" | "SECURITY" | "LEDGER";
  source: string;
  message: string;
}

interface MockTransaction {
  id: string;
  timestamp: string;
  hash: string;
  counterparty: string;
  rail: "UPI INTENT" | "RAZORPAY AUTO" | "STRIPE ACH" | "INSTANT WIRE";
  amount: string;
  gstTax: string;
  status: "VALIDATING" | "GST_SEALED" | "SETTLED" | "ESCROW_HELD";
  invoiceNo: string;
}

function PlaygroundContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const systemSlug = searchParams.get("system") || "telemetry-matrix";

  const allSystems = getAllSystems();
  const [selectedSystem, setSelectedSystem] = useState<SystemProduct>(() => {
    return getSystemBySlug(systemSlug) || allSystems[0];
  });

  const { currency, formatPrice } = useCurrency();
  const [viewMode, setViewMode] = useState<ViewMode>("canvas");
  const [viewport, setViewport] = useState<DeviceViewport>("desktop");
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedPayload, setCopiedPayload] = useState(false);

  // Sync state when URL query parameter changes
  useEffect(() => {
    if (systemSlug) {
      const sys = getSystemBySlug(systemSlug);
      if (sys) {
        setSelectedSystem(sys);
      }
    }
  }, [systemSlug]);

  // Tab switcher handler with URL sync
  const handleSelectSystem = (slug: string) => {
    const sys = getSystemBySlug(slug) || allSystems[0];
    setSelectedSystem(sys);
    const newUrl = `/playground?system=${slug}`;
    window.history.replaceState(null, "", newUrl);
  };

  // ==========================================
  // 1. TELEMETRY MATRIX CONSOLE STATE
  // ==========================================
  const [isTelemetryStreaming, setIsTelemetryStreaming] = useState(true);
  const [telemetryTickRate, setTelemetryTickRate] = useState<"fast" | "normal">("normal");
  const [telemetrySpikeActive, setTelemetrySpikeActive] = useState(false);
  const [cpuUsage, setCpuUsage] = useState(24.2);
  const [reqPerSec, setReqPerSec] = useState(28540);
  const [memoryMb, setMemoryMb] = useState(36.4);
  const [pingStream, setPingStream] = useState<number[]>([
    10.8, 11.2, 9.6, 12.4, 10.1, 11.8, 9.4, 10.5, 11.1, 10.9, 9.8, 11.5, 10.2, 11.7, 10.4, 11.0
  ]);
  const [telemetryLogs, setTelemetryLogs] = useState<LogEntry[]>([
    {
      id: "l-1",
      timestamp: "21:40:12.102",
      level: "INFO",
      source: "NODE_BOM_01",
      message: "Supabase connection pool established (120/120 active slots)"
    },
    {
      id: "l-2",
      timestamp: "21:40:13.419",
      level: "METRIC",
      source: "OBSERVABILITY",
      message: "P99 query latency verified at sub-12ms (actual: 10.4ms)"
    },
    {
      id: "l-3",
      timestamp: "21:40:14.004",
      level: "SECURITY",
      source: "RLS_GUARD",
      message: "Row-level tenant isolation verified: 0 leaky projections"
    }
  ]);

  // Real-time Telemetry streaming interval
  useEffect(() => {
    if (!isTelemetryStreaming) return;

    const intervalTime = telemetryTickRate === "fast" ? 1000 : 2000;
    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = `${now.toTimeString().split(" ")[0]}.${String(now.getMilliseconds()).padStart(3, "0")}`;

      if (telemetrySpikeActive) {
        // Return from spike
        setTelemetrySpikeActive(false);
      }

      const baseLatency = telemetrySpikeActive ? 84.5 : 10.2;
      const jitter = (Math.random() * 3 - 1.5);
      const newLatency = parseFloat(Math.max(8.2, baseLatency + jitter).toFixed(1));

      setPingStream((prev) => [...prev.slice(1), newLatency]);
      setCpuUsage((prev) => parseFloat((22 + Math.random() * 6).toFixed(1)));
      setReqPerSec((prev) => Math.floor(28000 + Math.random() * 950));
      setMemoryMb((prev) => parseFloat((35.8 + Math.random() * 1.6).toFixed(1)));

      const sampleEvents = [
        `Kafka event batch committed: ${Math.floor(800 + Math.random() * 400)} events`,
        `Indexed query executed across partition nodes (${newLatency}ms)`,
        `Postgres buffer cache hit ratio: 99.8%`,
        `Telemetry snapshot pushed to Redis stream node`
      ];
      const randomEvent = sampleEvents[Math.floor(Math.random() * sampleEvents.length)];

      const newLog: LogEntry = {
        id: `l-${Date.now()}`,
        timestamp: timeStr,
        level: newLatency > 40 ? "WARN" : "METRIC",
        source: "TELEMETRY_ENGINE",
        message: randomEvent
      };

      setTelemetryLogs((prev) => [newLog, ...prev.slice(0, 19)]);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [isTelemetryStreaming, telemetryTickRate, telemetrySpikeActive]);

  const triggerLatencySpike = () => {
    setTelemetrySpikeActive(true);
    setPingStream((prev) => [...prev.slice(1), 89.4]);
    setCpuUsage(78.5);
    const now = new Date();
    const timeStr = `${now.toTimeString().split(" ")[0]}.${String(now.getMilliseconds()).padStart(3, "0")}`;
    setTelemetryLogs((prev) => [
      {
        id: `l-spike-${Date.now()}`,
        timestamp: timeStr,
        level: "WARN",
        source: "CHAOS_INJECTOR",
        message: "Simulated traffic spike injected: 89.4ms latency detected"
      },
      ...prev
    ]);
  };

  // ==========================================
  // 2. AI AGENT ORCHESTRATOR STATE
  // ==========================================
  const [agentPrompt, setAgentPrompt] = useState(
    "Audit sub-12ms telemetry metrics, verify OWASP LLM01 guardrail, and auto-sign GST invoice."
  );
  const [isAgentRunning, setIsAgentRunning] = useState(false);
  const [agentStepIndex, setAgentStepIndex] = useState(-1);
  const [agentTokensCount, setAgentTokensCount] = useState(0);
  const [agentLogs, setAgentLogs] = useState<
    Array<{ step: string; tag: string; text: string; color: string }>
  >([]);

  const promptPresets = [
    "Audit sub-12ms telemetry metrics, verify OWASP LLM01 guardrail, and auto-sign GST invoice.",
    "Execute MCP vector search across sales leads and generate GSTR-1 tax return.",
    "Trigger zero-trust honeypot breach scan and rotate Redis API session keys."
  ];

  const handleRunAgent = () => {
    if (isAgentRunning) return;
    setIsAgentRunning(true);
    setAgentStepIndex(0);
    setAgentTokensCount(12);
    setAgentLogs([
      {
        step: "[01 // INTENT_DECOMPOSITION]",
        tag: "PLANNING",
        text: `Parsing user goal: "${agentPrompt.slice(0, 50)}..."`,
        color: "#00F0FF"
      }
    ]);

    const steps = [
      {
        step: "[02 // OWASP_LLM01_FIREWALL]",
        tag: "GUARDRAIL",
        text: "OWASP Top 10 Prompt-Injection Defense: Zero jailbreak heuristics detected. Request clean.",
        color: "#10B981"
      },
      {
        step: "[03 // MCP_TOOL_DISPATCH]",
        tag: "TOOL_CALL",
        text: "Calling Upstash Redis Vector Index (query_embedding: dim_1536, top_k: 8) -> 8 candidates returned in 18ms.",
        color: "#8B5CF6"
      },
      {
        step: "[04 // POSTGRES_RLS_EXECUTION]",
        tag: "DATABASE",
        text: "Executing Supabase Postgres RLS query with tenant-scoped JWT auth token. 0 records leaked.",
        color: "#00F0FF"
      },
      {
        step: "[05 // SHA-256_LEDGER_LOCK]",
        tag: "COMPLETED",
        text: "GST Invoice PDF assembled with digital certificate. SHA-256 state hash committed to execution ledger.",
        color: "#10B981"
      }
    ];

    steps.forEach((st, idx) => {
      setTimeout(() => {
        setAgentStepIndex(idx + 1);
        setAgentTokensCount((prev) => prev + 54 + Math.floor(Math.random() * 30));
        setAgentLogs((prev) => [...prev, st]);
        if (idx === steps.length - 1) {
          setIsAgentRunning(false);
        }
      }, (idx + 1) * 800);
    });
  };

  // ==========================================
  // 3. FINTECH ENGINE / LEDGER SIMULATOR STATE
  // ==========================================
  const [ledgerTransactions, setLedgerTransactions] = useState<MockTransaction[]>([
    {
      id: "TXN-9081",
      timestamp: "21:38:10",
      hash: "0x8f4a...31b2",
      counterparty: "Hyperion Cloud Pvt Ltd",
      rail: "UPI INTENT",
      amount: "₹89,999",
      gstTax: "₹13,728",
      status: "SETTLED",
      invoiceNo: "INV-2026-0891"
    },
    {
      id: "TXN-9082",
      timestamp: "21:39:24",
      hash: "0x3e1d...94c0",
      counterparty: "Acme Logistics Global",
      rail: "RAZORPAY AUTO",
      amount: "₹1,49,999",
      gstTax: "₹22,881",
      status: "SETTLED",
      invoiceNo: "INV-2026-0892"
    },
    {
      id: "TXN-9083",
      timestamp: "21:41:05",
      hash: "0x7b9c...a28e",
      counterparty: "Starlight FinTech Labs",
      rail: "STRIPE ACH",
      amount: "₹49,999",
      gstTax: "₹7,627",
      status: "GST_SEALED",
      invoiceNo: "INV-2026-0893"
    }
  ]);
  const [selectedRail, setSelectedRail] = useState<MockTransaction["rail"]>("UPI INTENT");
  const [mockAmountInput, setMockAmountInput] = useState("₹89,999");
  const [mockCounterparty, setMockCounterparty] = useState("Nexus Digital Enterprises");
  const [isDispatchingTxn, setIsDispatchingTxn] = useState(false);

  const handleDispatchTransaction = () => {
    if (isDispatchingTxn) return;
    setIsDispatchingTxn(true);

    const now = new Date();
    const timeStr = now.toTimeString().split(" ")[0];
    const newId = `TXN-${Math.floor(9084 + Math.random() * 800)}`;
    const randomHash = `0x${Math.random().toString(16).slice(2, 6)}...${Math.random().toString(16).slice(2, 6)}`;
    const numericAmt = parseInt(mockAmountInput.replace(/[^\d]/g, "")) || 89999;
    const taxAmt = Math.round(numericAmt * 0.18);

    const newTxn: MockTransaction = {
      id: newId,
      timestamp: timeStr,
      hash: randomHash,
      counterparty: mockCounterparty,
      rail: selectedRail,
      amount: `₹${numericAmt.toLocaleString("en-IN")}`,
      gstTax: `₹${taxAmt.toLocaleString("en-IN")}`,
      status: "VALIDATING",
      invoiceNo: `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`
    };

    setLedgerTransactions((prev) => [newTxn, ...prev]);

    // Transition from VALIDATING -> GST_SEALED -> SETTLED
    setTimeout(() => {
      setLedgerTransactions((prev) =>
        prev.map((t) => (t.id === newId ? { ...t, status: "GST_SEALED" } : t))
      );
    }, 1200);

    setTimeout(() => {
      setLedgerTransactions((prev) =>
        prev.map((t) => (t.id === newId ? { ...t, status: "SETTLED" } : t))
      );
      setIsDispatchingTxn(false);
    }, 2400);
  };

  // ==========================================
  // 4. QUANTUM LOGISTICS & FLEET SIMULATOR STATE
  // ==========================================
  const [depots, setDepots] = useState([
    { name: "Bhiwandi Hub 01", temp: -18.4, status: "OPTIMAL" },
    { name: "Chakan Depot 02", temp: -20.1, status: "OPTIMAL" },
    { name: "Sri City Cold 03", temp: 3.8, status: "CHILLED" },
    { name: "Gurugram Hub 04", temp: -19.2, status: "OPTIMAL" }
  ]);
  const [thermalAlertTriggered, setThermalAlertTriggered] = useState(false);

  const simulateThermalBreach = () => {
    setThermalAlertTriggered(true);
    setDepots((prev) =>
      prev.map((d, i) =>
        i === 0 ? { ...d, temp: -11.2, status: "TEMPERATURE ALERT" } : d
      )
    );
    setTimeout(() => {
      setDepots((prev) =>
        prev.map((d, i) =>
          i === 0 ? { ...d, temp: -18.4, status: "OPTIMAL" } : d
        )
      );
      setThermalAlertTriggered(false);
    }, 4000);
  };

  // ==========================================
  // 5. SENTINEL IDENTITY & WEBAUTHN SIMULATOR STATE
  // ==========================================
  const [fido2Step, setFido2Step] = useState<"IDLE" | "TOUCH_REQUESTED" | "ATTESTATION_VERIFIED" | "JWT_ISSUED">("IDLE");
  const [honeypotBlocked, setHoneypotBlocked] = useState(false);

  const handleSimulateFido2 = () => {
    setFido2Step("TOUCH_REQUESTED");
    setTimeout(() => {
      setFido2Step("ATTESTATION_VERIFIED");
      setTimeout(() => {
        setFido2Step("JWT_ISSUED");
        setTimeout(() => setFido2Step("IDLE"), 3500);
      }, 1000);
    }, 1200);
  };

  const handleSimulateHoneypot = () => {
    setHoneypotBlocked(true);
    setTimeout(() => setHoneypotBlocked(false), 3500);
  };

  // Sample code snippet tailored to the active system
  const sampleCodeSnippet = `// Production Next.js 15 Server Action / Edge Route
// System: ${selectedSystem.name} (${selectedSystem.slug})
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { cookies: { getAll: () => cookieStore.getAll() } }
  );

  // 1. Enforce OWASP Top 10 Security Guardrail
  const clientIp = req.headers.get("x-forwarded-for") || "127.0.0.1";
  console.log(\`[SECURITY]: Validating client IP \${clientIp} against Redis leaky-bucket.\`);

  // 2. Query Postgres Row Level Security (RLS) Pool
  const { data, error } = await supabase
    .from("${selectedSystem.slug.replace(/-/g, "_")}_records")
    .select("*")
    .limit(25);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // 3. Return Sub-12ms Telemetry Signature
  return NextResponse.json({
    system: "${selectedSystem.slug}",
    runtime: "${selectedSystem.runtime}",
    latency_p99: "${selectedSystem.latency}",
    status: 200,
    records_count: data?.length ?? 0,
    timestamp: new Date().toISOString()
  });
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
      cpu_percent: cpuUsage,
      latency_ms: pingStream[pingStream.length - 1],
      throughput_req_sec: reqPerSec,
      memory_footprint_mb: memoryMb,
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

  const handleCopyPayloadJson = () => {
    navigator.clipboard.writeText(JSON.stringify(samplePayloadJson, null, 2));
    setCopiedPayload(true);
    setTimeout(() => setCopiedPayload(false), 2000);
  };

  const displayPrice = formatPrice(selectedSystem.priceInr, selectedSystem.priceUsd);

  return (
    <div className="pt-28 pb-24 bg-[#07090E] min-h-screen text-slate-100 relative overflow-hidden flex flex-col justify-between">
      {/* Ambient Cybernetic Backdrop Matrix */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[950px] h-[450px] bg-gradient-to-r from-[#00F0FF]/10 via-[#8B5CF6]/10 to-[#00F0FF]/10 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute inset-0 bg-dot-matrix opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 space-y-6">
        
        {/* HEADER BADGE & TITLE */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b-2 border-[#1A2234] pb-6 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#0D111A] border-2 border-[#00F0FF] text-xs font-mono text-[#00F0FF] shadow-[3px_3px_0px_0px_#00F0FF]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F0FF] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00F0FF]" />
              </span>
              <span className="font-bold tracking-wider">[NEXUS.OS // INTERACTIVE LIVE PLAYGROUND v2.4]</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight font-mono">
              Live Architecture &amp; Telemetry Sandbox
            </h1>
            <p className="text-xs sm:text-sm text-[#94A3B8] font-mono">
              Test real-time metrics, autonomous agent tool loops, and simulated ledger rails before acquiring.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              href={`/systems/${selectedSystem.slug}`}
              className="px-3.5 py-2 rounded-none text-xs font-mono font-bold text-slate-300 bg-[#0D111A] border-2 border-[#1A2234] hover:text-white hover:border-[#8B5CF6] shadow-[2px_2px_0px_0px_#1A2234] transition-all flex items-center space-x-1.5"
            >
              <span>[SYSTEM SPEC]</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#8B5CF6]" />
            </Link>

            <Link
              href={`/checkout?system=${selectedSystem.slug}`}
              className="px-5 py-2.5 rounded-none text-xs font-mono font-bold uppercase text-black bg-[#00F0FF] border-2 border-black hover:bg-[#00F0FF]/90 shadow-[4px_4px_0px_0px_#00F0FF] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#00F0FF] transition-all flex items-center space-x-1.5"
            >
              <span>[ACQUIRE ({displayPrice})]</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 1. DYNAMIC SYSTEM SELECTOR: 6 HARD-EDGED TAB PILLS */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono text-[#94A3B8] uppercase">
            <span>// SELECT SYSTEM SANDBOX ARCHITECTURE:</span>
            <span>DIRECT LINK: ?system={selectedSystem.slug}</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {allSystems.map((sys) => {
              const isSelected = selectedSystem.slug === sys.slug;
              return (
                <button
                  key={sys.slug}
                  onClick={() => handleSelectSystem(sys.slug)}
                  className={`p-3 rounded-none text-left font-mono transition-all border-2 cursor-pointer flex flex-col justify-between min-h-[78px] ${
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
                    {isSelected && <Zap className="w-3.5 h-3.5 text-black fill-black" />}
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
                      {sys.badge}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. VIEW MODE TOGGLES & VIEWPORT CONTROLS */}
        <div className="rounded-none bg-[#0D111A] border-2 border-[#1A2234] p-3 shadow-[4px_4px_0px_0px_#1A2234] flex flex-wrap items-center justify-between gap-3">
          
          {/* Active System Indicator */}
          <div className="flex items-center space-x-2.5 font-mono text-xs">
            <span className="p-1.5 bg-[#00F0FF]/10 border-2 border-[#00F0FF] text-[#00F0FF]">
              <Cpu className="w-4 h-4" />
            </span>
            <div>
              <span className="text-white font-bold uppercase">{selectedSystem.name}</span>
              <span className="text-[#94A3B8] ml-2 text-[11px]">// {selectedSystem.runtime}</span>
            </div>
          </div>

          {/* Mode Switcher */}
          <div className="p-1 rounded-none bg-[#07090E] border-2 border-[#1A2234] inline-flex items-center space-x-1 text-xs font-mono shadow-[2px_2px_0px_0px_#1A2234]">
            <button
              onClick={() => setViewMode("canvas")}
              className={`px-3 py-1.5 rounded-none font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
                viewMode === "canvas"
                  ? "bg-[#00F0FF] text-black border-2 border-black shadow-[2px_2px_0px_0px_#00F0FF]"
                  : "text-slate-400 hover:text-white border-2 border-transparent"
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>[LIVE CONSOLE]</span>
            </button>
            <button
              onClick={() => setViewMode("code")}
              className={`px-3 py-1.5 rounded-none font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
                viewMode === "code"
                  ? "bg-[#8B5CF6] text-white border-2 border-white shadow-[2px_2px_0px_0px_#8B5CF6]"
                  : "text-slate-400 hover:text-white border-2 border-transparent"
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>[SOURCE .TSX]</span>
            </button>
            <button
              onClick={() => setViewMode("payload")}
              className={`px-3 py-1.5 rounded-none font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
                viewMode === "payload"
                  ? "bg-[#10B981] text-black border-2 border-black shadow-[2px_2px_0px_0px_#10B981]"
                  : "text-slate-400 hover:text-white border-2 border-transparent"
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>[PAYLOAD JSON]</span>
            </button>
          </div>

          {/* Viewport Width Emulation */}
          <div className="hidden sm:flex items-center space-x-1 bg-[#07090E] p-1 rounded-none border-2 border-[#1A2234] shadow-[2px_2px_0px_0px_#1A2234]">
            <button
              onClick={() => setViewport("desktop")}
              className={`p-1.5 rounded-none transition-colors cursor-pointer border ${
                viewport === "desktop"
                  ? "bg-[#1A2234] border-[#00F0FF] text-[#00F0FF]"
                  : "border-transparent text-slate-400 hover:text-white"
              }`}
              title="Desktop 100%"
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewport("tablet")}
              className={`p-1.5 rounded-none transition-colors cursor-pointer border ${
                viewport === "tablet"
                  ? "bg-[#1A2234] border-[#00F0FF] text-[#00F0FF]"
                  : "border-transparent text-slate-400 hover:text-white"
              }`}
              title="Tablet 768px"
            >
              <Tablet className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewport("mobile")}
              className={`p-1.5 rounded-none transition-colors cursor-pointer border ${
                viewport === "mobile"
                  ? "bg-[#1A2234] border-[#00F0FF] text-[#00F0FF]"
                  : "border-transparent text-slate-400 hover:text-white"
              }`}
              title="Mobile 420px"
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 3. MAIN TERMINAL & SANDBOX CANVAS */}
        <div
          className={`transition-all duration-300 ${
            viewport === "desktop"
              ? "w-full"
              : viewport === "tablet"
              ? "max-w-3xl mx-auto"
              : "max-w-md mx-auto"
          }`}
        >
          {/* =========================================
              VIEW MODE 1: LIVE CANVAS INTERACTIVE CONSOLES
             ========================================= */}
          {viewMode === "canvas" && (
            <div className="rounded-none bg-[#0D111A] border-2 border-[#1A2234] p-5 sm:p-7 shadow-[6px_6px_0px_0px_#1A2234] space-y-6 relative overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent blur-[1px] animate-scanline pointer-events-none" />

              {/* -------------------------------------------
                  CONSOLE A: TELEMETRY MATRIX TERMINAL
                 ------------------------------------------- */}
              {selectedSystem.slug === "telemetry-matrix" && (
                <div className="space-y-6 font-mono">
                  {/* Top Bar with Live Telemetry Stats */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    <div className="p-3.5 bg-[#07090E] border-2 border-[#1A2234] shadow-[2px_2px_0px_0px_#1A2234] space-y-1">
                      <div className="text-[10px] text-[#94A3B8] uppercase">[P99 QUERY LATENCY]</div>
                      <div className="text-xl font-black text-[#00F0FF] flex items-center justify-between">
                        <span>{pingStream[pingStream.length - 1]} ms</span>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/40">
                          SUB-12MS
                        </span>
                      </div>
                    </div>

                    <div className="p-3.5 bg-[#07090E] border-2 border-[#1A2234] shadow-[2px_2px_0px_0px_#1A2234] space-y-1">
                      <div className="text-[10px] text-[#94A3B8] uppercase">[CPU UTILIZATION]</div>
                      <div className="text-xl font-black text-[#8B5CF6]">
                        {cpuUsage}%
                      </div>
                    </div>

                    <div className="p-3.5 bg-[#07090E] border-2 border-[#1A2234] shadow-[2px_2px_0px_0px_#1A2234] space-y-1">
                      <div className="text-[10px] text-[#94A3B8] uppercase">[THROUGHPUT OPS/SEC]</div>
                      <div className="text-xl font-black text-[#10B981]">
                        {reqPerSec.toLocaleString()}
                      </div>
                    </div>

                    <div className="p-3.5 bg-[#07090E] border-2 border-[#1A2234] shadow-[2px_2px_0px_0px_#1A2234] space-y-1">
                      <div className="text-[10px] text-[#94A3B8] uppercase">[CONNECTION POOL]</div>
                      <div className="text-xl font-black text-white flex items-center justify-between">
                        <span>120 / 120</span>
                        <span className="text-[10px] text-emerald-400">● 100% HEALTH</span>
                      </div>
                    </div>
                  </div>

                  {/* Frequency Histogram Stream */}
                  <div className="p-5 bg-[#07090E] border-2 border-[#1A2234] space-y-4 shadow-[2px_2px_0px_0px_#1A2234]">
                    <div className="flex flex-wrap items-center justify-between text-xs gap-2">
                      <div className="flex items-center space-x-2 text-[#00F0FF] font-bold">
                        <Activity className="w-4 h-4 text-[#00F0FF]" />
                        <span>[REAL-TIME P99 TELEMETRY FREQUENCY GRAPH]:</span>
                      </div>

                      {/* Stream Controls */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setIsTelemetryStreaming((prev) => !prev)}
                          className={`px-3 py-1 text-[11px] font-bold uppercase border-2 flex items-center space-x-1 cursor-pointer transition-all ${
                            isTelemetryStreaming
                              ? "bg-[#0D111A] text-amber-400 border-amber-400/60 shadow-[2px_2px_0px_0px_#F59E0B]"
                              : "bg-[#10B981] text-black border-black shadow-[2px_2px_0px_0px_#10B981]"
                          }`}
                        >
                          {isTelemetryStreaming ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 fill-black" />}
                          <span>{isTelemetryStreaming ? "[PAUSE STREAM]" : "[RESUME STREAM]"}</span>
                        </button>

                        <button
                          onClick={triggerLatencySpike}
                          disabled={telemetrySpikeActive}
                          className="px-3 py-1 text-[11px] font-bold uppercase bg-[#0D111A] text-[#EF4444] border-2 border-[#EF4444] shadow-[2px_2px_0px_0px_#EF4444] active:translate-x-[1px] active:translate-y-[1px] cursor-pointer disabled:opacity-50"
                        >
                          [SIMULATE SPIKE ⚡]
                        </button>
                      </div>
                    </div>

                    {/* Frequency Bars Visualizer */}
                    <div className="flex items-end justify-between h-36 gap-2 pt-4 border-b-2 border-[#1A2234] px-1">
                      {pingStream.map((val, idx) => {
                        const heightPct = Math.min(100, Math.max(16, (val / 90) * 100));
                        const isHigh = val > 30;
                        return (
                          <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 group">
                            <span className="text-[9px] text-[#00F0FF] opacity-0 group-hover:opacity-100 transition-opacity">
                              {val}ms
                            </span>
                            <div
                              className={`w-full border border-black transition-all duration-300 ${
                                isHigh ? "bg-[#EF4444]" : "bg-[#00F0FF]"
                              }`}
                              style={{ height: `${heightPct}%` }}
                            />
                            <span className="text-[9px] text-slate-500">t-{pingStream.length - idx}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Live Packet Terminal Log Output */}
                  <div className="p-4 bg-[#07090E] border-2 border-[#1A2234] space-y-2 shadow-[2px_2px_0px_0px_#1A2234]">
                    <div className="flex items-center justify-between text-[11px] text-[#94A3B8] pb-2 border-b border-[#1A2234]">
                      <div className="flex items-center space-x-2">
                        <Terminal className="w-3.5 h-3.5 text-[#00F0FF]" />
                        <span className="text-[#00F0FF] font-bold">[INGESTED TELEMETRY EVENT STREAM]</span>
                      </div>
                      <span className="text-slate-500">Auto-scrolling buffer (20 events)</span>
                    </div>

                    <div className="space-y-1.5 text-xs max-h-48 overflow-y-auto pt-2">
                      {telemetryLogs.map((log) => (
                        <div key={log.id} className="flex items-start space-x-2.5 font-mono leading-relaxed">
                          <span className="text-slate-500 text-[11px] shrink-0">[{log.timestamp}]</span>
                          <span
                            className={`text-[10px] font-bold px-1.5 py-0.2 border shrink-0 ${
                              log.level === "WARN"
                                ? "bg-red-500/10 text-red-400 border-red-500/40"
                                : log.level === "SECURITY"
                                ? "bg-purple-500/10 text-[#8B5CF6] border-[#8B5CF6]/40"
                                : "bg-[#00F0FF]/10 text-[#00F0FF] border-[#00F0FF]/40"
                            }`}
                          >
                            [{log.level}]
                          </span>
                          <span className="text-[#94A3B8] text-[11px] shrink-0">[{log.source}]</span>
                          <span className="text-slate-200">{log.message}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* -------------------------------------------
                  CONSOLE B: AI AGENT ORCHESTRATOR TERMINAL
                 ------------------------------------------- */}
              {selectedSystem.slug === "nexus-agent-orchestrator" && (
                <div className="space-y-6 font-mono">
                  {/* Prompt Dispatcher Box */}
                  <div className="p-5 bg-[#07090E] border-2 border-[#1A2234] space-y-4 shadow-[2px_2px_0px_0px_#1A2234]">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#00F0FF] font-bold uppercase flex items-center space-x-2">
                        <Radio className="w-4 h-4 text-[#00F0FF]" />
                        <span>[AUTONOMOUS AGENT REASONING DISPATCH]:</span>
                      </span>
                      <span className="text-emerald-400 text-[11px]">
                        TOKENS: {agentTokensCount} | REFLECTION LATENCY: &lt;24ms
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={agentPrompt}
                        onChange={(e) => setAgentPrompt(e.target.value)}
                        placeholder="Enter mission prompt for agent tool execution..."
                        className="w-full bg-[#0D111A] border-2 border-[#1A2234] focus:border-[#00F0FF] rounded-none px-4 py-3 text-xs text-white focus:outline-none font-mono shadow-[2px_2px_0px_0px_#1A2234]"
                      />

                      <button
                        onClick={handleRunAgent}
                        disabled={isAgentRunning}
                        className="px-6 py-3 rounded-none bg-[#00F0FF] text-black border-2 border-black font-mono font-black text-xs uppercase shrink-0 cursor-pointer disabled:opacity-60 flex items-center space-x-2 shadow-[3px_3px_0px_0px_#00F0FF] active:translate-x-[1px] active:translate-y-[1px]"
                      >
                        {isAgentRunning ? (
                          <RefreshCw className="w-4 h-4 animate-spin text-black" />
                        ) : (
                          <Play className="w-4 h-4 fill-black" />
                        )}
                        <span>{isAgentRunning ? "[EXECUTING...]" : "[DISPATCH AGENT]"}</span>
                      </button>
                    </div>

                    {/* Quick Presets */}
                    <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
                      <span className="text-slate-400 uppercase">[PRESET PROMPTS]:</span>
                      {promptPresets.map((p, idx) => (
                        <button
                          key={idx}
                          onClick={() => setAgentPrompt(p)}
                          className="px-2.5 py-1 bg-[#0D111A] border border-[#1A2234] hover:border-[#00F0FF] text-slate-300 hover:text-white transition-colors cursor-pointer text-[10px]"
                        >
                          // Preset 0{idx + 1}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Terminal Execution Steps */}
                  <div className="p-5 bg-[#07090E] border-2 border-[#1A2234] space-y-3 shadow-[2px_2px_0px_0px_#1A2234]">
                    <div className="flex items-center justify-between pb-2 border-b border-[#1A2234] text-xs">
                      <span className="text-[#8B5CF6] font-bold flex items-center space-x-2">
                        <Terminal className="w-4 h-4 text-[#8B5CF6]" />
                        <span>[REASONING TRACE &amp; TOOL DISPATCH CONSOLE]</span>
                      </span>
                      <span className="text-slate-400 text-[11px]">
                        OWASP LLM01 Guardrail Active
                      </span>
                    </div>

                    <div className="space-y-3 min-h-[220px] pt-1">
                      {agentLogs.length > 0 ? (
                        agentLogs.map((log, i) => (
                          <div
                            key={i}
                            className="p-3 bg-[#0D111A] border-2 border-[#1A2234] space-y-1.5 shadow-[2px_2px_0px_0px_#1A2234]"
                          >
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-bold text-white">{log.step}</span>
                              <span
                                className="text-[10px] font-bold px-2 py-0.5 border"
                                style={{
                                  color: log.color,
                                  borderColor: log.color,
                                  backgroundColor: `${log.color}15`
                                }}
                              >
                                [{log.tag}]
                              </span>
                            </div>
                            <p className="text-xs text-slate-300 leading-relaxed font-sans">{log.text}</p>
                          </div>
                        ))
                      ) : (
                        <div className="p-8 text-center text-slate-500 space-y-2">
                          <Terminal className="w-8 h-8 mx-auto text-[#1A2234]" />
                          <p className="text-xs">
                            Select a preset prompt and click &quot;[DISPATCH AGENT]&quot; to simulate multi-turn LLM reasoning, MCP vector search, and ledger commits.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* -------------------------------------------
                  CONSOLE C: FINTECH ENGINE & LEDGER SIMULATOR
                 ------------------------------------------- */}
              {(selectedSystem.slug === "omega-core-starter" ||
                selectedSystem.slug === "autonomous-crm-pipeline") && (
                <div className="space-y-6 font-mono">
                  {/* Transaction Dispatch Simulator Box */}
                  <div className="p-5 bg-[#07090E] border-2 border-[#1A2234] space-y-4 shadow-[2px_2px_0px_0px_#1A2234]">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#00F0FF] font-bold flex items-center space-x-2">
                        <DollarSign className="w-4 h-4 text-[#00F0FF]" />
                        <span>[MULTI-RAIL PAYMENT LEDGER SIMULATOR]:</span>
                      </span>
                      <span className="text-emerald-400 text-[11px]">
                        GSTR-1 AUTO-COMPLIANCE ACTIVE
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                      {/* Rail Selector */}
                      <div>
                        <label className="text-[10px] text-slate-400 block mb-1 uppercase">[PAYMENT RAIL]:</label>
                        <select
                          value={selectedRail}
                          onChange={(e) => setSelectedRail(e.target.value as any)}
                          className="w-full bg-[#0D111A] border-2 border-[#1A2234] text-xs font-mono font-bold text-white px-3 py-2.5 rounded-none focus:outline-none focus:border-[#00F0FF]"
                        >
                          <option value="UPI INTENT">UPI INTENT ⚡</option>
                          <option value="RAZORPAY AUTO">RAZORPAY AUTO</option>
                          <option value="STRIPE ACH">STRIPE ACH</option>
                          <option value="INSTANT WIRE">INSTANT WIRE</option>
                        </select>
                      </div>

                      {/* Amount */}
                      <div>
                        <label className="text-[10px] text-slate-400 block mb-1 uppercase">[GROSS AMOUNT]:</label>
                        <select
                          value={mockAmountInput}
                          onChange={(e) => setMockAmountInput(e.target.value)}
                          className="w-full bg-[#0D111A] border-2 border-[#1A2234] text-xs font-mono font-bold text-white px-3 py-2.5 rounded-none focus:outline-none focus:border-[#00F0FF]"
                        >
                          <option value="₹49,999">₹49,999 (Tier 1)</option>
                          <option value="₹89,999">₹89,999 (Tier 2)</option>
                          <option value="₹1,49,999">₹1,49,999 (Enterprise)</option>
                        </select>
                      </div>

                      {/* Counterparty */}
                      <div>
                        <label className="text-[10px] text-slate-400 block mb-1 uppercase">[COUNTERPARTY]:</label>
                        <input
                          type="text"
                          value={mockCounterparty}
                          onChange={(e) => setMockCounterparty(e.target.value)}
                          className="w-full bg-[#0D111A] border-2 border-[#1A2234] text-xs font-mono text-white px-3 py-2.5 rounded-none focus:outline-none focus:border-[#00F0FF]"
                        />
                      </div>

                      {/* CTA */}
                      <div className="flex items-end">
                        <button
                          onClick={handleDispatchTransaction}
                          disabled={isDispatchingTxn}
                          className="w-full py-2.5 bg-[#00F0FF] text-black border-2 border-black font-mono font-black text-xs uppercase shadow-[3px_3px_0px_0px_#00F0FF] active:translate-x-[1px] active:translate-y-[1px] cursor-pointer disabled:opacity-60 flex items-center justify-center space-x-1.5"
                        >
                          {isDispatchingTxn ? (
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Send className="w-3.5 h-3.5" />
                          )}
                          <span>[DISPATCH TXN ⚡]</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Ledger Simulator Table */}
                  <div className="p-5 bg-[#07090E] border-2 border-[#1A2234] space-y-3 shadow-[2px_2px_0px_0px_#1A2234]">
                    <div className="flex items-center justify-between pb-2 border-b border-[#1A2234] text-xs">
                      <span className="text-white font-bold flex items-center space-x-2">
                        <Database className="w-4 h-4 text-[#00F0FF]" />
                        <span>[REAL-TIME TRANSACTION LEDGER]</span>
                      </span>
                      <span className="text-slate-400 text-[11px]">Instant settlement verification</span>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs font-mono">
                        <thead>
                          <tr className="border-b-2 border-[#1A2234] text-[#94A3B8] text-[10px] uppercase">
                            <th className="pb-2.5">TXN ID / TIME</th>
                            <th className="pb-2.5">COUNTERPARTY</th>
                            <th className="pb-2.5">RAIL</th>
                            <th className="pb-2.5">AMOUNT (18% GST)</th>
                            <th className="pb-2.5">STATUS PILL</th>
                            <th className="pb-2.5">CRYPTO HASH</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2234]">
                          {ledgerTransactions.map((tx) => (
                            <tr key={tx.id} className="hover:bg-[#0D111A]/60 transition-colors">
                              <td className="py-3">
                                <div className="text-white font-bold">{tx.id}</div>
                                <div className="text-[10px] text-slate-500">{tx.timestamp}</div>
                              </td>
                              <td className="py-3 text-slate-200">{tx.counterparty}</td>
                              <td className="py-3">
                                <span className="px-2 py-0.5 rounded-none bg-[#07090E] border border-[#1A2234] text-[10px] text-[#00F0FF]">
                                  {tx.rail}
                                </span>
                              </td>
                              <td className="py-3">
                                <div className="text-[#00F0FF] font-bold">{tx.amount}</div>
                                <div className="text-[10px] text-slate-400">GST: {tx.gstTax}</div>
                              </td>
                              <td className="py-3">
                                <span
                                  className={`px-2 py-0.5 border text-[10px] font-bold ${
                                    tx.status === "SETTLED"
                                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/50"
                                      : tx.status === "GST_SEALED"
                                      ? "bg-purple-500/10 text-[#8B5CF6] border-[#8B5CF6]/50"
                                      : "bg-amber-500/10 text-amber-400 border-amber-500/50 animate-pulse"
                                  }`}
                                >
                                  [{tx.status}]
                                </span>
                              </td>
                              <td className="py-3 text-[11px] text-slate-500 font-mono">
                                {tx.hash}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* -------------------------------------------
                  CONSOLE D: QUANTUM LOGISTICS & FLEET ERP
                 ------------------------------------------- */}
              {selectedSystem.slug === "quantum-logistics-erp" && (
                <div className="space-y-6 font-mono">
                  {/* Thermal Warehouses Live Telemetry */}
                  <div className="p-5 bg-[#07090E] border-2 border-[#1A2234] space-y-4 shadow-[2px_2px_0px_0px_#1A2234]">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#00F0FF] font-bold flex items-center space-x-2">
                        <Truck className="w-4 h-4 text-[#00F0FF]" />
                        <span>[MULTI-DEPOT THERMAL SENSOR TELEMETRY]:</span>
                      </span>
                      <button
                        onClick={simulateThermalBreach}
                        disabled={thermalAlertTriggered}
                        className="px-3 py-1 bg-[#0D111A] text-amber-400 border-2 border-amber-400/60 text-[11px] font-bold uppercase shadow-[2px_2px_0px_0px_#F59E0B] cursor-pointer disabled:opacity-50"
                      >
                        [SIMULATE BREACH ⚡]
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {depots.map((dep, idx) => (
                        <div
                          key={idx}
                          className={`p-3.5 bg-[#0D111A] border-2 transition-all ${
                            dep.status !== "OPTIMAL" && dep.status !== "CHILLED"
                              ? "border-red-500 shadow-[3px_3px_0px_0px_#EF4444]"
                              : "border-[#1A2234] shadow-[2px_2px_0px_0px_#1A2234]"
                          }`}
                        >
                          <div className="text-[10px] text-slate-400 uppercase">{dep.name}</div>
                          <div
                            className={`text-2xl font-black mt-1 ${
                              dep.status !== "OPTIMAL" && dep.status !== "CHILLED"
                                ? "text-red-400"
                                : "text-[#00F0FF]"
                            }`}
                          >
                            {dep.temp}°C
                          </div>
                          <div className="text-[10px] mt-1 font-bold text-emerald-400">
                            [{dep.status}]
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Active Fleet GPS Sensor Units */}
                  <div className="p-5 bg-[#07090E] border-2 border-[#1A2234] space-y-3 shadow-[2px_2px_0px_0px_#1A2234]">
                    <div className="flex items-center justify-between pb-2 border-b border-[#1A2234] text-xs">
                      <span className="text-white font-bold">[ACTIVE FLEET GPS WEBHOOK TELEMETRY]</span>
                      <span className="text-[#00F0FF]">450+ Units Monitored</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 bg-[#0D111A] border-2 border-[#1A2234] space-y-1">
                        <div className="flex justify-between">
                          <span className="text-[#00F0FF] font-bold">MH-12-RN-4821 (Scania Reefer)</span>
                          <span className="text-emerald-400 font-bold">[EN ROUTE]</span>
                        </div>
                        <div className="text-[11px] text-slate-400">Route: Bhiwandi ➔ Pune Chakan Depot</div>
                        <div className="text-[11px] text-slate-400">Speed: 68 km/h • E-Way Bill: EWB-88391204</div>
                      </div>

                      <div className="p-3 bg-[#0D111A] border-2 border-[#1A2234] space-y-1">
                        <div className="flex justify-between">
                          <span className="text-[#8B5CF6] font-bold">DL-01-AX-9912 (Volvo Cold 14T)</span>
                          <span className="text-emerald-400 font-bold">[EN ROUTE]</span>
                        </div>
                        <div className="text-[11px] text-slate-400">Route: Gurugram ➔ Jaipur Cold Hub</div>
                        <div className="text-[11px] text-slate-400">Speed: 54 km/h • E-Way Bill: EWB-99401290</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* -------------------------------------------
                  CONSOLE E: SENTINEL IDENTITY & SECURITY HUB
                 ------------------------------------------- */}
              {selectedSystem.slug === "sentinel-auth-hub" && (
                <div className="space-y-6 font-mono">
                  {/* FIDO2 Hardware Key Handshake Simulator */}
                  <div className="p-5 bg-[#07090E] border-2 border-[#1A2234] space-y-4 shadow-[2px_2px_0px_0px_#1A2234]">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#00F0FF] font-bold flex items-center space-x-2">
                        <ShieldCheck className="w-4 h-4 text-[#00F0FF]" />
                        <span>[FIDO2 / WEBAUTHN HARDWARE KEY HANDSHAKE]:</span>
                      </span>
                      <span className="text-purple-400 text-[11px]">SAML 2.0 &amp; OIDC READY</span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 items-center justify-between p-4 bg-[#0D111A] border-2 border-[#1A2234]">
                      <div className="space-y-1">
                        <div className="text-xs text-white font-bold flex items-center space-x-2">
                          <Lock className="w-3.5 h-3.5 text-[#00F0FF]" />
                          <span>Status: {fido2Step}</span>
                        </div>
                        <div className="text-[11px] text-slate-400">
                          Simulate client-side biometric attestation &amp; signed challenge verification.
                        </div>
                      </div>

                      <button
                        onClick={handleSimulateFido2}
                        disabled={fido2Step !== "IDLE"}
                        className="px-4 py-2.5 bg-[#8B5CF6] text-white border-2 border-white font-mono text-xs font-bold uppercase shadow-[3px_3px_0px_0px_#8B5CF6] cursor-pointer disabled:opacity-50"
                      >
                        [TOUCH SECURITY KEY 🔑]
                      </button>
                    </div>
                  </div>

                  {/* Honeypot Bot Rate-Limiter Simulator */}
                  <div className="p-5 bg-[#07090E] border-2 border-[#1A2234] space-y-3 shadow-[2px_2px_0px_0px_#1A2234]">
                    <div className="flex items-center justify-between pb-2 border-b border-[#1A2234] text-xs">
                      <span className="text-[#EF4444] font-bold">[HONEYPOT &amp; REDIS LEAKY-BUCKET DEFENSE]</span>
                      <button
                        onClick={handleSimulateHoneypot}
                        className="px-3 py-1 bg-[#0D111A] text-red-400 border border-red-500/60 text-[10px] font-bold uppercase"
                      >
                        [SIMULATE BOT ATTACK]
                      </button>
                    </div>

                    <div className="p-3.5 bg-[#0D111A] border-2 border-[#1A2234] text-xs space-y-1">
                      {honeypotBlocked ? (
                        <div className="text-red-400 font-bold flex items-center space-x-2">
                          <AlertCircle className="w-4 h-4 text-red-400" />
                          <span>[429_TOO_MANY_REQUESTS] Bot IP 192.168.1.99 blacklisted in Redis Leaky-Bucket vault!</span>
                        </div>
                      ) : (
                        <div className="text-emerald-400 flex items-center space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Honeypot endpoints active. Zero bot intrusion payloads detected in last 60s.</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* =========================================
              VIEW MODE 2: SOURCE CODE .TSX
             ========================================= */}
          {viewMode === "code" && (
            <div className="rounded-none bg-[#0D111A] border-2 border-[#8B5CF6] shadow-[4px_4px_0px_0px_#8B5CF6] overflow-hidden relative">
              <div className="bg-[#07090E] border-b-2 border-[#1A2234] p-4 flex items-center justify-between text-xs font-mono">
                <span className="text-[#8B5CF6] font-bold flex items-center space-x-2">
                  <Code2 className="w-4 h-4" />
                  <span>app/api/{selectedSystem.slug}/route.ts</span>
                </span>

                <button
                  onClick={handleCopyCodeSnippet}
                  className="px-3.5 py-1.5 rounded-none bg-[#8B5CF6]/10 text-[#8B5CF6] hover:bg-[#8B5CF6]/20 border-2 border-[#8B5CF6] flex items-center space-x-1.5 transition-colors cursor-pointer min-h-[36px] font-mono shadow-[2px_2px_0px_0px_#8B5CF6]"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">COPIED!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>[COPY SNIPPET]</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-6 bg-[#07090E] font-mono text-xs sm:text-sm text-slate-200 overflow-x-auto max-h-[520px] leading-relaxed">
                <pre>
                  <code>{sampleCodeSnippet}</code>
                </pre>
              </div>
            </div>
          )}

          {/* =========================================
              VIEW MODE 3: PAYLOAD INSPECTOR JSON
             ========================================= */}
          {viewMode === "payload" && (
            <div className="rounded-none bg-[#0D111A] border-2 border-[#10B981] shadow-[4px_4px_0px_0px_#10B981] overflow-hidden relative">
              <div className="bg-[#07090E] border-b-2 border-[#1A2234] p-4 flex items-center justify-between text-xs font-mono">
                <span className="text-[#10B981] font-bold flex items-center space-x-2">
                  <Database className="w-4 h-4" />
                  <span>[RESPONSE PAYLOAD INSPECTOR // JSON]</span>
                </span>
                
                <div className="flex items-center space-x-3">
                  <span className="text-slate-400 text-[11px]">[HTTP 200 OK // 11.2ms]</span>
                  <button
                    onClick={handleCopyPayloadJson}
                    className="px-3 py-1 bg-[#10B981]/10 text-[#10B981] border border-[#10B981] text-[11px] font-bold flex items-center space-x-1"
                  >
                    {copiedPayload ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedPayload ? "COPIED" : "[COPY]"}</span>
                  </button>
                </div>
              </div>

              <div className="p-6 bg-[#07090E] font-mono text-xs text-emerald-400 overflow-x-auto max-h-[520px] leading-relaxed">
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
        <div className="pt-32 pb-24 bg-[#07090E] min-h-screen text-slate-100 flex items-center justify-center font-mono">
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
