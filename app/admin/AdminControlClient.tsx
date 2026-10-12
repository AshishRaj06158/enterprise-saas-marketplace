"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldAlert,
  Server,
  Layers,
  Key,
  Plus,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Activity,
  Terminal,
  Cpu,
  ArrowRight,
  ExternalLink,
  Copy,
  Check,
  Power,
  Sliders,
  DollarSign,
  AlertTriangle,
  Trash2,
  Users,
  BarChart3,
} from "lucide-react";
import { toggleSystemLiveAction, upsertSystemAction, generateLicenseAction, deleteSystemAction } from "./actions";

interface AdminControlClientProps {
  initialSystems: any[];
  user: {
    name?: string | null;
    email?: string | null;
    role?: string;
  };
}

export default function AdminControlClient({
  initialSystems,
  user,
}: AdminControlClientProps) {
  const [systems, setSystems] = useState(initialSystems);
  const [activeTab, setActiveTab] = useState<"systems" | "licenses" | "telemetry">("systems");
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedLicense, setGeneratedLicense] = useState<any | null>(null);
  const [copiedKey, setCopiedKey] = useState(false);
  const [feedbackNotice, setFeedbackNotice] = useState<string | null>(null);

  // Toggle System Status
  const handleToggle = async (id: string, currentStatus: boolean) => {
    const nextStatus = !currentStatus;
    setSystems((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isLive: nextStatus } : s))
    );

    const res = await toggleSystemLiveAction(id, nextStatus);
    if (res.success) {
      setFeedbackNotice(`SYSTEM [${id}] STATUS UPDATED TO ${nextStatus ? "LIVE" : "DRAFT"}`);
      setTimeout(() => setFeedbackNotice(null), 3000);
    }
  };

  // Delete System
  const handleDelete = async (id: string, slug: string) => {
    if (!window.confirm(`CONFIRM DELETION: Are you sure you want to permanently delete system [${slug}]?`)) {
      return;
    }

    setSystems((prev) => prev.filter((s) => s.id !== id && s.slug !== slug));
    const res = await deleteSystemAction(id);
    if (res?.success) {
      setFeedbackNotice(`SYSTEM [${slug}] PURGED FROM REGISTRY`);
      setTimeout(() => setFeedbackNotice(null), 3000);
    }
  };

  // Handle Deploy Form Submission
  const handleDeploySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);

    const res = await upsertSystemAction(formData);
    if (res.success) {
      setIsDeployModalOpen(false);
      setFeedbackNotice(`SYSTEM [${formData.get("slug")}] DEPLOYED TO REGISTRY`);
      setTimeout(() => setFeedbackNotice(null), 3000);
    }
    setIsSubmitting(false);
  };

  // Handle Generate License
  const handleGenerateLicense = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);

    const res = await generateLicenseAction(formData);
    if (res.success && res.license) {
      setGeneratedLicense(res.license);
      setFeedbackNotice("CRYPTOGRAPHIC LICENSE ATTESTATION GENERATED");
    }
    setIsSubmitting(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <div className="space-y-8 font-mono">
      {/* Control Room Top Header */}
      <div className="p-6 bg-[#0D111A] border-2 border-[#EF4444] shadow-[6px_6px_0px_0px_#EF4444] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EF4444] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#EF4444]" />
            </span>
            <span className="text-xs font-black text-[#EF4444] uppercase tracking-wider">
              [ENTERPRISE_CONTROL_ROOM // ROOT_ADMIN]
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            Central Command & Registry Control
          </h1>
          <p className="text-xs text-slate-400">
            Authenticated: <span className="text-white font-bold">{user.email}</span> (ROLE: {user.role})
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <Link
            href="/admin/systems/new"
            className="px-4 py-3 bg-[#0D111A] hover:bg-[#07090E] text-[#00F0FF] hover:text-white font-bold text-xs uppercase tracking-wider border-2 border-[#00F0FF] shadow-[4px_4px_0px_0px_#00F0FF] active:translate-x-[2px] active:translate-y-[2px] flex items-center space-x-2 transition-all min-h-[44px]"
          >
            <Plus className="w-4 h-4 text-[#00F0FF]" />
            <span>[DEPLOY SPEC (/admin/systems/new)]</span>
          </Link>
          <button
            onClick={() => setIsDeployModalOpen(true)}
            className="px-4 py-3 bg-[#00F0FF] hover:bg-white text-black font-black text-xs uppercase tracking-wider border-2 border-[#00F0FF] shadow-[4px_4px_0px_0px_#07090E] active:translate-x-[2px] active:translate-y-[2px] flex items-center space-x-2 transition-all cursor-pointer min-h-[44px]"
          >
            <Plus className="w-4 h-4" />
            <span>[FAST MODAL DEPLOY]</span>
          </button>
        </div>
      </div>

      {/* Global Feedback Alert */}
      {feedbackNotice && (
        <div className="p-3 bg-emerald-950/40 border-2 border-emerald-400 text-emerald-400 text-xs flex items-center space-x-2 shadow-[4px_4px_0px_0px_#10B981]">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{feedbackNotice}</span>
        </div>
      )}

      {/* Tab Selector Pills */}
      <div className="flex flex-wrap gap-2.5">
        <button
          onClick={() => setActiveTab("systems")}
          className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-2 transition-all cursor-pointer min-h-[42px] flex items-center space-x-2 ${
            activeTab === "systems"
              ? "bg-[#00F0FF] text-black border-[#00F0FF] shadow-[4px_4px_0px_0px_#00F0FF]"
              : "bg-[#0D111A] text-slate-300 border-[#1A2234] hover:border-[#00F0FF]"
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>[SYSTEMS_MANAGEMENT ({systems.length})]</span>
        </button>

        <button
          onClick={() => setActiveTab("licenses")}
          className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-2 transition-all cursor-pointer min-h-[42px] flex items-center space-x-2 ${
            activeTab === "licenses"
              ? "bg-[#8B5CF6] text-white border-[#8B5CF6] shadow-[4px_4px_0px_0px_#8B5CF6]"
              : "bg-[#0D111A] text-slate-300 border-[#1A2234] hover:border-[#8B5CF6]"
          }`}
        >
          <Key className="w-3.5 h-3.5" />
          <span>[LICENSE_GENERATOR]</span>
        </button>

        <button
          onClick={() => setActiveTab("telemetry")}
          className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-2 transition-all cursor-pointer min-h-[42px] flex items-center space-x-2 ${
            activeTab === "telemetry"
              ? "bg-emerald-400 text-black border-emerald-400 shadow-[4px_4px_0px_0px_#10B981]"
              : "bg-[#0D111A] text-slate-300 border-[#1A2234] hover:border-emerald-400"
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>[AUDIT_TELEMETRY_LOGS]</span>
        </button>

        <Link
          href="/admin/leads"
          className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-2 bg-[#0D111A] text-[#00F0FF] border-[#00F0FF]/60 hover:border-[#00F0FF] hover:bg-[#00F0FF]/10 shadow-[3px_3px_0px_0px_#00F0FF]/30 transition-all flex items-center space-x-2 min-h-[42px]"
        >
          <Users className="w-3.5 h-3.5 text-[#00F0FF]" />
          <span>[LEADS_DASHBOARD (/admin/leads)]</span>
        </Link>

        <Link
          href="/admin/analytics"
          className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-2 bg-[#0D111A] text-[#8B5CF6] border-[#8B5CF6]/60 hover:border-[#8B5CF6] hover:bg-[#8B5CF6]/10 shadow-[3px_3px_0px_0px_#8B5CF6]/30 transition-all flex items-center space-x-2 min-h-[42px]"
        >
          <BarChart3 className="w-3.5 h-3.5 text-[#8B5CF6]" />
          <span>[PRODUCT_ANALYTICS (/admin/analytics)]</span>
        </Link>
      </div>

      {/* TAB 1: Systems Management Table */}
      {activeTab === "systems" && (
        <div className="bg-[#0D111A] border-2 border-[#1A2234] shadow-[6px_6px_0px_0px_#1A2234] overflow-hidden">
          <div className="p-4 border-b-2 border-[#1A2234] flex items-center justify-between">
            <span className="text-xs text-[#00F0FF] font-bold uppercase">
              // REGISTERED PRODUCTION CODEBASES & IN-MEMORY RUNTIMES
            </span>
            <span className="text-[10px] text-slate-500 uppercase">
              REVALIDATE_PATH: ACTIVE
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#07090E] border-b-2 border-[#1A2234] text-slate-400 uppercase text-[10px]">
                  <th className="p-3.5">STATUS</th>
                  <th className="p-3.5">SLUG / TITLE</th>
                  <th className="p-3.5">CATEGORY</th>
                  <th className="p-3.5">PRICING (INR / USD)</th>
                  <th className="p-3.5">P99 LATENCY</th>
                  <th className="p-3.5 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1A2234]">
                {systems.map((s) => (
                  <tr key={s.id || s.slug} className="hover:bg-[#07090E]/60 transition-colors">
                    <td className="p-3.5 whitespace-nowrap">
                      <span
                        className={`px-2 py-0.5 text-[10px] font-bold border uppercase ${
                          s.isLive
                            ? "bg-emerald-950/40 text-emerald-400 border-emerald-400"
                            : "bg-red-950/40 text-[#EF4444] border-[#EF4444]"
                        }`}
                      >
                        {s.isLive ? "[ONLINE // LIVE]" : "[OFFLINE // DRAFT]"}
                      </span>
                    </td>
                    <td className="p-3.5 font-bold text-white">
                      <div>{s.title || s.name}</div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        /systems/{s.slug}
                      </div>
                    </td>
                    <td className="p-3.5 text-slate-300">
                      <span className="px-2 py-0.5 bg-[#07090E] border border-[#1A2234] text-[10px]">
                        [{s.category}]
                      </span>
                    </td>
                    <td className="p-3.5 text-white font-bold whitespace-nowrap">
                      {typeof s.priceINR === "number"
                        ? `₹${s.priceINR.toLocaleString("en-IN")}`
                        : s.priceINR || s.priceInr}{" "}
                      /{" "}
                      {typeof s.priceUSD === "number"
                        ? `$${s.priceUSD}`
                        : s.priceUSD || s.priceUsd}
                    </td>
                    <td className="p-3.5 text-[#00F0FF] whitespace-nowrap">
                      {s.p99Latency || s.latency || "< 12ms"}
                    </td>
                    <td className="p-3.5 text-right whitespace-nowrap">
                      <div className="inline-flex items-center space-x-2">
                        <Link
                          href={`/systems/${s.slug}`}
                          target="_blank"
                          className="p-2 bg-[#07090E] border border-[#1A2234] hover:border-[#00F0FF] text-slate-300 hover:text-white transition-colors"
                          title="View Live Page"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => handleToggle(s.id, s.isLive)}
                          className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                            s.isLive
                              ? "bg-yellow-950/20 text-yellow-400 border-yellow-400 hover:bg-yellow-400 hover:text-black"
                              : "bg-emerald-950/20 text-emerald-400 border-emerald-400 hover:bg-emerald-400 hover:text-black"
                          }`}
                        >
                          {s.isLive ? "DEACTIVATE" : "ACTIVATE"}
                        </button>
                        <button
                          onClick={() => handleDelete(s.id, s.slug)}
                          className="px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider border border-red-500/60 bg-[#07090E] text-red-400 hover:bg-[#EF4444] hover:text-white transition-all cursor-pointer flex items-center gap-1"
                          title="Purge System from Database"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>DELETE</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: License Generator */}
      {activeTab === "licenses" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6 bg-[#0D111A] border-2 border-[#8B5CF6] p-6 sm:p-8 shadow-[6px_6px_0px_0px_#8B5CF6] space-y-6">
            <div className="border-b-2 border-[#1A2234] pb-4">
              <div className="text-xs text-[#8B5CF6] font-bold uppercase tracking-wider">
                [CRYPTOGRAPHIC LICENSE ISSUANCE ENGINE]
              </div>
              <h3 className="text-xl font-black text-white uppercase mt-1">
                Mint Enterprise Software License
              </h3>
            </div>

            <form onSubmit={handleGenerateLicense} className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-slate-300 font-bold mb-1.5">
                  [TARGET_SOFTWARE_SYSTEM]:
                </label>
                <select
                  name="systemSlug"
                  className="w-full bg-[#07090E] border-2 border-[#1A2234] focus:border-[#8B5CF6] p-3 text-xs text-white uppercase tracking-wider outline-none"
                >
                  {systems.map((s) => (
                    <option key={s.slug} value={s.slug}>
                      {s.title || s.name} ({s.slug})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-slate-300 font-bold mb-1.5">
                  [RECIPIENT_CLIENT_EMAIL]:
                </label>
                <input
                  type="email"
                  name="clientEmail"
                  defaultValue="client@enterprise.io"
                  className="w-full bg-[#07090E] border-2 border-[#1A2234] focus:border-[#8B5CF6] p-3 text-xs text-white uppercase tracking-wider outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 bg-[#8B5CF6] hover:bg-white text-black font-black text-xs uppercase tracking-wider border-2 border-[#8B5CF6] shadow-[4px_4px_0px_0px_#00F0FF] active:translate-x-[2px] active:translate-y-[2px] transition-all flex items-center justify-center space-x-2 min-h-[46px] cursor-pointer disabled:opacity-50 mt-4"
              >
                <Key className="w-4 h-4" />
                <span>[MINT CRYPTOGRAPHIC LICENSE KEY]</span>
              </button>
            </form>
          </div>

          <div className="lg:col-span-6 bg-[#0D111A] border-2 border-[#1A2234] p-6 sm:p-8 shadow-[6px_6px_0px_0px_#1A2234] space-y-6">
            <div className="border-b-2 border-[#1A2234] pb-4">
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                [ISSUANCE_VERIFICATION_OUTPUT]
              </div>
              <h3 className="text-xl font-black text-white uppercase mt-1">
                Generated License Artifact
              </h3>
            </div>

            {generatedLicense ? (
              <div className="space-y-4">
                <div className="p-3 bg-emerald-950/40 border border-emerald-400 text-emerald-400 text-xs font-bold uppercase">
                  ✓ SIGNATURE ATTESTATION VALIDATED
                </div>

                <div className="p-4 bg-[#07090E] border-2 border-[#1A2234] space-y-3 text-xs">
                  <div>
                    <span className="text-slate-500 uppercase block text-[10px]">LICENSE_KEY:</span>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-[#00F0FF] font-bold text-sm tracking-wide">
                        {generatedLicense.key}
                      </span>
                      <button
                        onClick={() => copyToClipboard(generatedLicense.key)}
                        className="p-1.5 bg-[#0D111A] border border-[#00F0FF] text-[#00F0FF] hover:bg-[#00F0FF] hover:text-black transition-colors"
                      >
                        {copiedKey ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-500 uppercase block text-[10px]">BUILD_SHA256_HASH:</span>
                    <span className="text-slate-300 font-mono text-[11px] break-all">
                      {generatedLicense.buildHash}
                    </span>
                  </div>

                  <div className="flex justify-between border-t border-[#1A2234] pt-2 text-[11px]">
                    <span className="text-slate-500">SYSTEM:</span>
                    <span className="text-white font-bold">{generatedLicense.systemId}</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-500">STATUS:</span>
                    <span className="text-emerald-400 font-bold">{generatedLicense.status}</span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400">
                  This license has been registered to the global audit catalog. Clients can verify this signature at{" "}
                  <Link href="/verify" className="text-[#00F0FF] underline">
                    /verify
                  </Link>.
                </div>
              </div>
            ) : (
              <div className="py-16 text-center text-slate-500 text-xs space-y-2">
                <Key className="w-8 h-8 text-slate-600 mx-auto" />
                <p>// NO LICENSE MINTED IN CURRENT CONSOLE SESSION</p>
                <p className="text-[10px]">Select system and execute mint form on left.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: Audit Telemetry Feed */}
      {activeTab === "telemetry" && (
        <div className="bg-[#0D111A] border-2 border-emerald-400 p-6 shadow-[6px_6px_0px_0px_#10B981] space-y-4">
          <div className="flex items-center justify-between border-b-2 border-[#1A2234] pb-3">
            <span className="text-xs text-emerald-400 font-bold uppercase">
              [REAL_TIME_ADMIN_AUDIT_LOG_STREAM]
            </span>
            <span className="text-[10px] text-slate-400">
              BUFFER: 100 EVENTS RETAINED
            </span>
          </div>

          <div className="space-y-2 text-xs text-slate-300 max-h-96 overflow-y-auto">
            <div className="p-3 bg-[#07090E] border border-[#1A2234] flex items-start justify-between">
              <div>
                <span className="text-emerald-400 font-bold mr-2">[AUTH_OK]</span>
                <span>Session established for operator <span className="text-white">{user.email}</span></span>
              </div>
              <span className="text-[10px] text-slate-500">JUST NOW</span>
            </div>
            <div className="p-3 bg-[#07090E] border border-[#1A2234] flex items-start justify-between">
              <div>
                <span className="text-[#00F0FF] font-bold mr-2">[REGISTRY_SCAN]</span>
                <span>Hydrated {systems.length} systems from hybrid persistence layer.</span>
              </div>
              <span className="text-[10px] text-slate-500">1M AGO</span>
            </div>
            <div className="p-3 bg-[#07090E] border border-[#1A2234] flex items-start justify-between">
              <div>
                <span className="text-[#8B5CF6] font-bold mr-2">[KEY_ROTATION]</span>
                <span>Edge TLS & NextAuth v5 session secret verified.</span>
              </div>
              <span className="text-[10px] text-slate-500">4M AGO</span>
            </div>
            <div className="p-3 bg-[#07090E] border border-[#1A2234] flex items-start justify-between">
              <div>
                <span className="text-amber-400 font-bold mr-2">[ROUTER_CHECK]</span>
                <span>P99 global edge routing verified at 11.4ms across BOM, FRA, IAD.</span>
              </div>
              <span className="text-[10px] text-slate-500">12M AGO</span>
            </div>
          </div>
        </div>
      )}

      {/* Deploy / Edit System Modal */}
      {isDeployModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-[#0D111A] border-2 border-[#00F0FF] shadow-[8px_8px_0px_0px_#00F0FF] p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b-2 border-[#1A2234] pb-3">
              <span className="text-xs font-black text-[#00F0FF] uppercase tracking-wider">
                [DEPLOY_SYSTEM_SPECIFICATION_MANIFEST]
              </span>
              <button
                onClick={() => setIsDeployModalOpen(false)}
                className="text-slate-400 hover:text-white text-xs font-bold"
              >
                [CLOSE ✕]
              </button>
            </div>

            <form onSubmit={handleDeploySubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 uppercase font-bold mb-1">
                    SLUG (URL PATH):
                  </label>
                  <input
                    name="slug"
                    required
                    placeholder="quantum-edge-mesh"
                    className="w-full bg-[#07090E] border border-[#1A2234] focus:border-[#00F0FF] p-2.5 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 uppercase font-bold mb-1">
                    TITLE / SYSTEM NAME:
                  </label>
                  <input
                    name="title"
                    required
                    placeholder="Quantum Edge Mesh"
                    className="w-full bg-[#07090E] border border-[#1A2234] focus:border-[#00F0FF] p-2.5 text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 uppercase font-bold mb-1">
                  TAGLINE:
                </label>
                <input
                  name="tagline"
                  required
                  placeholder="Distributed High-Throughput Edge Routing & Cache Ingress"
                  className="w-full bg-[#07090E] border border-[#1A2234] focus:border-[#00F0FF] p-2.5 text-white outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-300 uppercase font-bold mb-1">
                    CATEGORY:
                  </label>
                  <select
                    name="category"
                    className="w-full bg-[#07090E] border border-[#1A2234] focus:border-[#00F0FF] p-2.5 text-white outline-none"
                  >
                    <option value="Dashboards">Dashboards</option>
                    <option value="ERP">ERP</option>
                    <option value="CRM">CRM</option>
                    <option value="Websites">Websites</option>
                    <option value="AI Agents">AI Agents</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 uppercase font-bold mb-1">
                    PRICE (INR):
                  </label>
                  <input
                    name="priceINR"
                    defaultValue="₹99,999"
                    className="w-full bg-[#07090E] border border-[#1A2234] focus:border-[#00F0FF] p-2.5 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 uppercase font-bold mb-1">
                    PRICE (USD):
                  </label>
                  <input
                    name="priceUSD"
                    defaultValue="$399"
                    className="w-full bg-[#07090E] border border-[#1A2234] focus:border-[#00F0FF] p-2.5 text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 uppercase font-bold mb-1">
                  OVERVIEW / SPECIFICATION DESCRIPTION:
                </label>
                <textarea
                  name="overview"
                  rows={3}
                  placeholder="Comprehensive description of runtime capabilities, multi-tenant schemas, and latency specifications."
                  className="w-full bg-[#07090E] border border-[#1A2234] focus:border-[#00F0FF] p-2.5 text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 uppercase font-bold mb-1">
                  TECH STACK (COMMA SEPARATED):
                </label>
                <input
                  name="techStack"
                  defaultValue="Next.js 15, TypeScript, Postgres, Redis, Tailwind CSS"
                  className="w-full bg-[#07090E] border border-[#1A2234] focus:border-[#00F0FF] p-2.5 text-white outline-none"
                />
              </div>

              <div className="pt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsDeployModalOpen(false)}
                  className="px-4 py-2.5 bg-[#07090E] text-slate-400 border border-[#1A2234] uppercase font-bold"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-[#00F0FF] hover:bg-white text-black font-black uppercase tracking-wider border-2 border-[#00F0FF] shadow-[3px_3px_0px_0px_#8B5CF6]"
                >
                  {isSubmitting ? "[COMMITTING...]" : "[SAVE & DEPLOY]"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
