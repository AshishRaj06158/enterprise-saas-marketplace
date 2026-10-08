"use client";

import { useState } from "react";
import { 
  CreditCard, 
  Terminal, 
  Zap, 
  Activity, 
  CheckCircle2, 
  RefreshCw, 
  QrCode, 
  Check, 
  ShieldCheck,
  Send,
  Loader2,
  Cpu
} from "lucide-react";

export default function DemosPage() {
  // Simulator State 1: UPI / Razorpay Checkout
  const [upiAmount, setUpiAmount] = useState("14999");
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "generating" | "scanned" | "success">("idle");
  const [gstInvoiceNumber, setGstInvoiceNumber] = useState("");

  // Simulator State 2: Telemetry Live Stream
  const [latencies, setLatencies] = useState([8.4, 9.1, 11.2, 7.8, 10.5, 12.1, 8.9, 9.4]);
  const [isInjecting, setIsInjecting] = useState(false);

  // Simulator State 3: CRM Autonomous Lead Routing
  const [leadInput, setLeadInput] = useState({ name: "TechCorp Global", value: "₹25,00,000", domain: "Fintech Enterprise" });
  const [routingState, setRoutingState] = useState<"idle" | "routing" | "completed">("idle");
  const [routingLog, setRoutingLog] = useState<string[]>([]);

  // Trigger UPI Simulation
  const handleSimulatePayment = () => {
    setPaymentStatus("generating");
    setTimeout(() => {
      setPaymentStatus("scanned");
      setTimeout(() => {
        setPaymentStatus("success");
        setGstInvoiceNumber(`INV-2026-GST-${Math.floor(10000 + Math.random() * 90000)}`);
      }, 2000);
    }, 1500);
  };

  // Trigger Telemetry Pulse
  const handleInjectTelemetryPulse = () => {
    setIsInjecting(true);
    const newPulse = Array.from({ length: 8 }, () => Number((Math.random() * 6 + 6).toFixed(1)));
    setLatencies(newPulse);
    setTimeout(() => setIsInjecting(false), 800);
  };

  // Trigger CRM Lead Routing Simulation
  const handleSimulateLeadRouting = () => {
    setRoutingState("routing");
    setRoutingLog([
      "[00.01s] Webhook received from landing form target: TechCorp Global",
      "[00.35s] AI Lead Score calculated: 96/100 (HIGH PRIORITY ENTERPRISE)",
      "[00.82s] Dynamic GSTR-1 Contract template injected with ₹25,00,000 SLA",
      "[01.18s] Deal assigned to Principal Architect Node 04 via Razorpay webhook",
      "[01.20s] ROUTING COMPLETE • ZERO LEAKAGE AUDIT LOGGED"
    ]);
    setTimeout(() => setRoutingState("completed"), 1200);
  };

  return (
    <div className="pt-32 pb-24 bg-[#07090E] min-h-screen text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#00F0FF]/30 bg-[#00F0FF]/10 text-xs font-mono-tabular text-[#00F0FF]">
            <Zap className="w-3.5 h-3.5" />
            <span>INTERACTIVE STAGING SANDBOX</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Live System Simulators & Staging Playgrounds
          </h1>

          <p className="text-base text-[#94A3B8] leading-relaxed">
            Test real-time UPI QR payment flows, observe live P99 telemetry latency bursts, and trigger autonomous CRM lead routing pipelines before acquiring source code.
          </p>

          <div className="pt-2 flex justify-center">
            <a
              href="/playground"
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#00F0FF] to-[#8B5CF6] text-black font-bold text-xs sm:text-sm hover:opacity-95 transition-all shadow-[0_0_25px_rgba(0,240,255,0.3)] inline-flex items-center space-x-2 min-h-[44px]"
            >
              <Cpu className="w-4 h-4 text-black" />
              <span>Launch Full In-Browser Live Playground ⚡</span>
            </a>
          </div>
        </div>

        {/* 3 Interactive Sandbox Modules */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Playground 1: Multi-Rail UPI & Razorpay Checkout Simulator */}
          <div id="payment" className="lg:col-span-6 rounded-2xl bg-[#0D111A] border border-[#1A2234] p-6 shadow-2xl glow-border-cyan space-y-6">
            <div className="flex items-center justify-between border-b border-[#1A2234] pb-4">
              <div className="flex items-center space-x-2.5">
                <CreditCard className="w-5 h-5 text-[#00F0FF]" />
                <h3 className="font-bold text-white text-base">UPI Dynamic QR & GST Invoicing Sandbox</h3>
              </div>
              <span className="text-[10px] font-mono-tabular px-2.5 py-1 rounded bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/30">
                LIVE CHECKOUT
              </span>
            </div>

            <div className="space-y-4 text-xs font-mono-tabular">
              <div>
                <label className="text-[#94A3B8] block mb-1">TRANSACTION AMOUNT (INR):</label>
                <input
                  type="number"
                  value={upiAmount}
                  onChange={(e) => setUpiAmount(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#07090E] border border-[#1A2234] text-white text-sm focus:border-[#00F0FF] outline-none"
                />
              </div>

              {/* Dynamic QR Output Box */}
              <div className="p-6 rounded-2xl bg-[#07090E] border border-[#1A2234] text-center space-y-4">
                {paymentStatus === "idle" && (
                  <div className="py-8 space-y-3">
                    <QrCode className="w-16 h-16 text-[#94A3B8] mx-auto opacity-50" />
                    <p className="text-xs text-[#94A3B8]">Click generate to trigger simulated dynamic UPI QR & GST webhook</p>
                  </div>
                )}

                {paymentStatus === "generating" && (
                  <div className="py-8 space-y-3">
                    <Loader2 className="w-10 h-10 text-[#00F0FF] animate-spin mx-auto" />
                    <p className="text-xs text-[#00F0FF]">Generating Dynamic UPI QR String via Razorpay Webhook API...</p>
                  </div>
                )}

                {paymentStatus === "scanned" && (
                  <div className="py-8 space-y-3">
                    <RefreshCw className="w-10 h-10 text-[#8B5CF6] animate-spin mx-auto" />
                    <p className="text-xs text-[#8B5CF6]">Payer Scanned UPI Intent • Waiting for NPCI Settlement Signal...</p>
                  </div>
                )}

                {paymentStatus === "success" && (
                  <div className="py-6 space-y-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto">
                      <Check className="w-6 h-6" />
                    </div>
                    <div className="text-sm font-bold text-white">PAYMENT CONFIRMED: ₹{upiAmount}</div>
                    <div className="text-xs text-emerald-400 font-mono-tabular">AUTOMATED GST INVOICE ISSUED: {gstInvoiceNumber}</div>
                  </div>
                )}
              </div>

              <button
                onClick={handleSimulatePayment}
                className="w-full py-3 rounded-xl font-bold text-xs text-black bg-[#00F0FF] hover:bg-[#00F0FF]/90 transition-all shadow-lg flex items-center justify-center space-x-2"
              >
                <Zap className="w-4 h-4" />
                <span>Simulate UPI Payment Trigger</span>
              </button>
            </div>
          </div>

          {/* Playground 2: Telemetry Latency Stream */}
          <div className="lg:col-span-6 rounded-2xl bg-[#0D111A] border border-[#1A2234] p-6 shadow-2xl glow-border-violet space-y-6">
            <div className="flex items-center justify-between border-b border-[#1A2234] pb-4">
              <div className="flex items-center space-x-2.5">
                <Terminal className="w-5 h-5 text-[#8B5CF6]" />
                <h3 className="font-bold text-white text-base">P99 Postgres Latency Stream Sandbox</h3>
              </div>
              <span className="text-[10px] font-mono-tabular px-2.5 py-1 rounded bg-[#8B5CF6]/10 text-[#8B5CF6] border border-[#8B5CF6]/30">
                REALTIME STREAM
              </span>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#07090E] border border-[#1A2234] space-y-3">
                <div className="flex justify-between text-xs font-mono-tabular text-[#94A3B8]">
                  <span>P99 QUERY EXECUTION SPECTRUM</span>
                  <span className="text-emerald-400">9.4 ms AVG</span>
                </div>

                <div className="h-28 flex items-end justify-between gap-2 pt-4">
                  {latencies.map((val, idx) => (
                    <div key={idx} className="w-full flex flex-col items-center gap-1">
                      <span className="text-[9px] font-mono-tabular text-slate-400">{val}ms</span>
                      <div
                        style={{ height: `${val * 6}%` }}
                        className="w-full rounded-t bg-gradient-to-t from-[#8B5CF6] to-[#00F0FF] transition-all duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#07090E] border border-[#1A2234] text-xs font-mono-tabular text-slate-300 flex justify-between items-center">
                <span>Supabase Postgres Connection Pool:</span>
                <span className="text-[#00F0FF] font-bold">120/120 Active (RLS Enforced)</span>
              </div>

              <button
                onClick={handleInjectTelemetryPulse}
                disabled={isInjecting}
                className="w-full py-3 rounded-xl font-bold text-xs text-white bg-[#8B5CF6] hover:bg-[#8B5CF6]/90 transition-all shadow-lg flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <Activity className={`w-4 h-4 ${isInjecting ? "animate-spin" : ""}`} />
                <span>Inject Query Load Pulse</span>
              </button>
            </div>
          </div>

          {/* Playground 3: Autonomous CRM Lead Routing Pipeline */}
          <div className="lg:col-span-12 rounded-2xl bg-[#0D111A] border border-[#1A2234] p-6 shadow-2xl glow-border-cyan space-y-6">
            <div className="flex items-center justify-between border-b border-[#1A2234] pb-4">
              <div className="flex items-center space-x-2.5">
                <Cpu className="w-5 h-5 text-[#00F0FF]" />
                <h3 className="font-bold text-white text-base">DealFlow Autonomous Lead Routing Simulator</h3>
              </div>
              <span className="text-[10px] font-mono-tabular px-2.5 py-1 rounded bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/30">
                1.2s AUTONOMOUS ROUTE
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-5 space-y-3 text-xs font-mono-tabular">
                <div>
                  <label className="text-[#94A3B8] block mb-1">ENTERPRISE LEAD NAME:</label>
                  <input
                    type="text"
                    value={leadInput.name}
                    onChange={(e) => setLeadInput({ ...leadInput, name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#07090E] border border-[#1A2234] text-white text-xs outline-none focus:border-[#00F0FF]"
                  />
                </div>
                <div>
                  <label className="text-[#94A3B8] block mb-1">PROJECTED CONTRACT VALUE:</label>
                  <input
                    type="text"
                    value={leadInput.value}
                    onChange={(e) => setLeadInput({ ...leadInput, value: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#07090E] border border-[#1A2234] text-white text-xs outline-none focus:border-[#00F0FF]"
                  />
                </div>

                <button
                  onClick={handleSimulateLeadRouting}
                  disabled={routingState === "routing"}
                  className="w-full py-3 rounded-xl font-bold text-xs text-black bg-gradient-to-r from-[#00F0FF] to-[#8B5CF6] hover:opacity-95 transition-all shadow-md flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4 text-black" />
                  <span>Trigger Autonomous Lead Pipeline</span>
                </button>
              </div>

              {/* Terminal Log Window */}
              <div className="lg:col-span-7 p-4 rounded-xl bg-[#07090E] border border-[#1A2234] font-mono-tabular text-xs space-y-2 text-slate-300 min-h-[180px]">
                <div className="flex justify-between border-b border-[#1A2234] pb-2 text-[#94A3B8]">
                  <span>AUTONOMOUS DEAL EXECUTION STREAM</span>
                  <span className="text-[#00F0FF]">LATENCY: 1.2s</span>
                </div>

                {routingLog.length === 0 ? (
                  <div className="text-[#94A3B8] py-8 text-center">Click trigger to observe autonomous lead scoring & contract assembly...</div>
                ) : (
                  routingLog.map((log, i) => (
                    <div key={i} className={i === routingLog.length - 1 ? "text-emerald-400 font-bold" : "text-slate-300"}>
                      {log}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
