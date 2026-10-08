"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Send, ShieldCheck, AlertCircle, MessageSquareText } from "lucide-react";

function ContactFormInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const systemParam = searchParams.get("system") || "";

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    workEmail: "",
    company: "",
    systemRequested: systemParam || "Nexus Autonomous Agent Orchestrator",
    budget: "₹1,49,000 (Enterprise Suite)",
    requirements: "",
    website_hp: "" // Honeypot field
  });

  useEffect(() => {
    if (systemParam) {
      setFormData((prev) => ({
        ...prev,
        systemRequested: systemParam
      }));
    }
  }, [systemParam]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      // 1. Submit lead to API endpoint
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.ok !== false) {
        // 2. Construct structured WhatsApp lead message
        const waMessage = `🚀 *New Enterprise Inquiry - NEXUS.OS*
• *Client*: ${formData.fullName}
• *Company*: ${formData.company || "N/A"}
• *Email*: ${formData.workEmail}
• *System*: ${formData.systemRequested || "Custom Architecture"}
• *Budget*: ${formData.budget || "Commercial Tier"}
• *Scope*: ${formData.requirements}`;

        const waUrl = `https://wa.me/919771596801?text=${encodeURIComponent(waMessage)}`;

        // 3. Automatically attempt opening WhatsApp in a new tab
        try {
          window.open(waUrl, "_blank", "noopener,noreferrer");
        } catch (e) {
          console.error("Window open blocked:", e);
        }

        // 4. Navigate to thank-you page with WhatsApp link context
        router.push(`/thank-you?wa=${encodeURIComponent(waUrl)}`);
      } else {
        setErrorMsg(data.error || "Submission failed. Please check your details and try again.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-8 rounded-2xl bg-[#0D111A]/80 backdrop-blur-md border border-[#00F0FF]/30 shadow-[0_0_35px_rgba(0,240,255,0.1)] space-y-6 relative overflow-hidden group"
    >
      <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent blur-[1px] animate-scanline pointer-events-none opacity-30 z-20" />

      {/* Honeypot field for bot protection */}
      <div className="hidden" aria-hidden="true">
        <input
          type="text"
          name="website_hp"
          tabIndex={-1}
          autoComplete="off"
          value={formData.website_hp}
          onChange={(e) => setFormData({ ...formData, website_hp: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-mono text-slate-400 mb-2">FULL NAME *</label>
          <input
            type="text"
            required
            placeholder="Rajesh Kumar"
            className="w-full bg-[#07090E]/90 border border-[#1A2234] rounded-lg px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-[#00F0FF] transition-colors font-mono"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-slate-400 mb-2">WORK EMAIL *</label>
          <input
            type="email"
            required
            placeholder="rajesh@company.com"
            className="w-full bg-[#07090E]/90 border border-[#1A2234] rounded-lg px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-[#00F0FF] transition-colors font-mono"
            value={formData.workEmail}
            onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-slate-400 mb-2">COMPANY / ENTITY</label>
          <input
            type="text"
            placeholder="Nexus Technologies Ltd."
            className="w-full bg-[#07090E]/90 border border-[#1A2234] rounded-lg px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-[#00F0FF] transition-colors font-mono"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-slate-400 mb-2">SYSTEM MODULE REQUESTED</label>
          <select
            className="w-full bg-[#07090E]/90 border border-[#1A2234] rounded-lg px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-[#00F0FF] transition-colors font-mono"
            value={formData.systemRequested}
            onChange={(e) => setFormData({ ...formData, systemRequested: e.target.value })}
          >
            <option value="Nexus Autonomous Agent Orchestrator">Nexus Autonomous Agent Orchestrator</option>
            <option value="Nexus Telemetry Matrix">Nexus Telemetry Matrix</option>
            <option value="Quantum Logistics & Fleet ERP">Quantum Logistics & Fleet ERP</option>
            <option value="Autonomous CRM & Revenue Engine">Autonomous CRM & Revenue Engine</option>
            <option value="Project Omega Enterprise Platform">Project Omega Enterprise Platform</option>
            <option value="Sentinel Unified Auth & Identity Hub">Sentinel Unified Auth & Identity Hub</option>
            <option value="Custom Enterprise Architecture">Custom Enterprise Architecture</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-mono text-slate-400 mb-2">COMMERCIAL BUDGET TIER</label>
          <select
            className="w-full bg-[#07090E]/90 border border-[#1A2234] rounded-lg px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-[#00F0FF] transition-colors font-mono"
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
          >
            <option value="₹19,999 (Agentic Core)">₹19,999 (Agentic Core Tier)</option>
            <option value="₹49,000 (Single System)">₹49,000 (Single System Commercial)</option>
            <option value="₹1,49,000 (Enterprise Suite)">₹1,49,000 (Full Suite Enterprise)</option>
            <option value="₹2,99,000+ (Custom Managed SLA)">₹2,99,000+ (Custom Managed SLA)</option>
          </select>
        </div>

        <div className="flex items-center">
          <div className="p-3 rounded-xl bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-xs font-mono text-[#00F0FF] flex items-center space-x-2 w-full">
            <MessageSquareText className="w-4 h-4 shrink-0 text-[#00F0FF]" />
            <span>Includes Direct WhatsApp Priority Channel (+91 9771596801)</span>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs font-mono text-slate-400 mb-2">SYSTEM REQUIREMENTS & SCOPE *</label>
        <textarea
          required
          rows={4}
          placeholder="Describe your tech stack, required custom modules (CRM, ERP, Billing), or expected deployment timeline..."
          className="w-full bg-[#07090E]/90 border border-[#1A2234] rounded-lg px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-[#00F0FF] transition-colors leading-relaxed"
          value={formData.requirements}
          onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
        />
      </div>

      {errorMsg && (
        <div className="p-3.5 rounded-lg bg-red-950/40 border border-red-500/50 text-xs text-red-300 flex items-center gap-2 font-mono">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00F0FF] to-[#8B5CF6] text-black font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-[0_0_25px_rgba(0,240,255,0.3)] hover:opacity-95 disabled:opacity-50 hover:-translate-y-0.5 cursor-pointer"
      >
        {loading ? (
          "Transmitting Request..."
        ) : (
          <>
            <Send className="w-4 h-4" />
            <span>Submit Deployment Request & Launch WhatsApp Dispatch</span>
          </>
        )}
      </button>
    </form>
  );
}

export default function ContactSection() {
  return (
    <section className="py-24 bg-[#07090E] border-t border-[#1A2234] relative overflow-hidden" id="contact">
      {/* Ambient Glow Orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#00F0FF]/10 blur-3xl pointer-events-none rounded-full animate-pulse-slow" />
      <div className="absolute inset-0 bg-dot-matrix opacity-20 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#00F0FF]/40 bg-[#00F0FF]/10 text-xs font-mono text-[#00F0FF] backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F0FF] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00F0FF]" />
            </span>
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>ENTERPRISE DEPLOYMENT INQUIRY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Deploy Custom Architectures
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            Need customized ERP modules, custom payment gateways, or enterprise SLA? Talk to our core engineering team.
          </p>
        </div>

        <Suspense fallback={<div className="text-center text-slate-500 font-mono text-xs">Loading inquiry form...</div>}>
          <ContactFormInner />
        </Suspense>
      </div>
    </section>
  );
}
