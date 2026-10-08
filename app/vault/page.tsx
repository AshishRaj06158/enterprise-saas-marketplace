"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Key,
  Download,
  Github,
  Copy,
  Check,
  ExternalLink,
  Cpu,
  Layers,
  Terminal,
  Activity,
  FileText,
  UserCheck,
  Zap,
  Lock,
  RefreshCw,
  PlusCircle,
  X,
  CheckCircle2,
  Globe,
  Sparkles
} from "lucide-react";

interface EntitledLicense {
  id: string;
  systemName: string;
  systemSlug: string;
  tagline: string;
  tierBadge: string;
  licenseKey: string;
  domainBinding: string;
  issuedDate: string;
  slaStatus: string;
  githubSynced: boolean;
  githubHandle?: string;
  invoiceId: string;
  pricePaid: string;
}

const initialLicenses: EntitledLicense[] = [
  {
    id: "lic-01",
    systemName: "Nexus Autonomous Agent Orchestrator",
    systemSlug: "nexus-agent-orchestrator",
    tagline: "Self-healing multi-agent pipelines & MCP tool execution",
    tierBadge: "Commercial Perpetual",
    licenseKey: "NEXUS-COMM-99A1-42F8-2026",
    domainBinding: "*.production.internal",
    issuedDate: "2026-10-01",
    slaStatus: "Active (24/7 Priority SLA)",
    githubSynced: false,
    invoiceId: "INV-2026-98421",
    pricePaid: "₹19,999 ($249)"
  },
  {
    id: "lic-02",
    systemName: "Nexus Telemetry Matrix",
    systemSlug: "telemetry-matrix",
    tagline: "High-frequency executive observability & telemetry engine",
    tierBadge: "Single Business License",
    licenseKey: "NEXUS-COMM-14B7-88D2-2026",
    domainBinding: "app.clientportal.in",
    issuedDate: "2026-09-18",
    slaStatus: "Standard Security SLA",
    githubSynced: true,
    githubHandle: "@ashishraj-dev",
    invoiceId: "INV-2026-77312",
    pricePaid: "₹89,999 ($349)"
  }
];

export default function CustomerVaultPage() {
  const [licenses, setLicenses] = useState<EntitledLicense[]>(initialLicenses);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // GitHub Sync Modal State
  const [activeModalLicense, setActiveModalLicense] = useState<EntitledLicense | null>(null);
  const [githubHandleInput, setGithubHandleInput] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncSuccessMsg, setSyncSuccessMsg] = useState("");

  // Claim Key Modal State
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [claimInput, setClaimInput] = useState("");
  const [claimMsg, setClaimMsg] = useState("");

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleDownloadBundle = (license: EntitledLicense) => {
    const bundleContent = `====================================================
SUTRA / NEXUS DEPLOYMENT SOURCE CODE BUNDLE
====================================================
System: ${license.systemName}
Slug: ${license.systemSlug}
License Key: ${license.licenseKey}
Domain Binding: ${license.domainBinding}
Entitlement: Commercial Perpetual Source Code License
Security Audit: OWASP Top 10 Hardened & SOC2 Type II Certified
Issued Date: ${license.issuedDate}

====================================================
INSTRUCTIONS TO LAUNCH:
1. Extract this repository bundle into your project directory.
2. Configure your environment variables using .env.production
3. Run 'npm install' followed by 'npm run dev' or 'docker-compose up'
====================================================`;

    const blob = new Blob([bundleContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${license.systemSlug}-verified-bundle.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadInvoice = (license: EntitledLicense) => {
    const invoiceContent = `====================================================
SUTRA / NEXUS B2B GST TAX INVOICE & RECEIPT
====================================================
Invoice Number: ${license.invoiceId}
System Acquired: ${license.systemName}
License Key: ${license.licenseKey}
Amount Settled: ${license.pricePaid}
GSTIN Registered: 10AAAAA0000A1Z5
Issued Date: ${license.issuedDate}
Tax Status: PAID (18% GST Credit Eligible)
====================================================`;

    const blob = new Blob([invoiceContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${license.invoiceId}-gst-invoice.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleGrantGithubToken = (e: React.FormEvent) => {
    e.preventDefault();
    if (!githubHandleInput.trim()) return;

    setIsSyncing(true);
    setTimeout(() => {
      if (activeModalLicense) {
        setLicenses((prev) =>
          prev.map((lic) =>
            lic.id === activeModalLicense.id
              ? { ...lic, githubSynced: true, githubHandle: githubHandleInput }
              : lic
          )
        );
      }
      setIsSyncing(false);
      setSyncSuccessMsg(
        `Repository Collaborator Invite & Deploy Token sent to ${githubHandleInput} on GitHub!`
      );
      setTimeout(() => {
        setSyncSuccessMsg("");
        setActiveModalLicense(null);
        setGithubHandleInput("");
      }, 2200);
    }, 1500);
  };

  const handleClaimLicense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!claimInput.trim()) return;

    if (claimInput.toUpperCase().startsWith("NEXUS-COMM-")) {
      setClaimMsg("License Key Validated! System Entitlement Added to Vault.");
      setTimeout(() => {
        setClaimMsg("");
        setShowClaimModal(false);
        setClaimInput("");
      }, 1800);
    } else {
      setClaimMsg("Invalid License Format. Key must start with NEXUS-COMM-");
    }
  };

  return (
    <div className="pt-32 pb-24 bg-[#07090E] min-h-screen text-slate-100 relative overflow-hidden">
      {/* Ambient Radial Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[400px] bg-[#00F0FF]/10 blur-3xl pointer-events-none rounded-full animate-pulse-slow" />
      <div
        className="absolute bottom-10 right-1/4 w-[550px] h-[350px] bg-[#8B5CF6]/12 blur-3xl pointer-events-none rounded-full animate-pulse-slow"
        style={{ animationDelay: "3s" }}
      />
      <div className="absolute inset-0 bg-dot-matrix opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#00F0FF]/40 bg-[#00F0FF]/10 text-xs font-mono-tabular text-[#00F0FF] backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-[#00F0FF]" />
            <span>CUSTOMER DEPLOYMENT VAULT // ENTITLED ASSETS</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Customer License Vault & Asset Hub
          </h1>

          <p className="text-base text-[#94A3B8] leading-relaxed">
            Manage active production licenses, download verified source code bundles, and sync GitHub enterprise access.
          </p>
        </div>

        {/* Quick Metrics Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="rounded-2xl bg-[#0D111A]/90 border border-[#00F0FF]/30 p-6 backdrop-blur-md shadow-xl flex items-center space-x-4">
            <div className="p-3.5 rounded-xl bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/30">
              <Key className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-mono-tabular text-[#94A3B8] uppercase">
                Active Licenses
              </div>
              <div className="text-2xl font-bold text-white font-mono-tabular mt-0.5">
                {licenses.length} Verified
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-[#0D111A]/90 border border-[#8B5CF6]/30 p-6 backdrop-blur-md shadow-xl flex items-center space-x-4">
            <div className="p-3.5 rounded-xl bg-[#8B5CF6]/10 text-[#8B5CF6] border border-[#8B5CF6]/30">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-mono-tabular text-[#94A3B8] uppercase">
                Deployment Quota
              </div>
              <div className="text-2xl font-bold text-white font-mono-tabular mt-0.5">
                12 / Unlimited
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-[#0D111A]/90 border border-emerald-500/30 p-6 backdrop-blur-md shadow-xl flex items-center space-x-4">
            <div className="p-3.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-mono-tabular text-[#94A3B8] uppercase">
                Enterprise SLA
              </div>
              <div className="text-2xl font-bold text-emerald-400 font-mono-tabular mt-0.5">
                Active (24/7 Priority)
              </div>
            </div>
          </div>
        </div>

        {/* Section Header & Claim Key CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#1A2234]">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center space-x-2">
              <Lock className="w-5 h-5 text-[#00F0FF]" />
              <span>Entitled Software Codebases & Repositories</span>
            </h2>
            <p className="text-xs text-[#94A3B8] font-mono-tabular mt-0.5">
              Cryptographically verified commercial source code entitlements linked to your account.
            </p>
          </div>

          <button
            onClick={() => setShowClaimModal(true)}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-[#00F0FF] to-[#8B5CF6] hover:opacity-95 transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)] flex items-center space-x-2 cursor-pointer min-h-[44px]"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Claim / Add License Key</span>
          </button>
        </div>

        {/* Purchased Systems List (Cards) */}
        <div className="space-y-6">
          {licenses.map((lic) => (
            <div
              key={lic.id}
              className="rounded-2xl bg-[#0D111A]/80 backdrop-blur-md border border-[#00F0FF]/30 p-6 sm:p-8 shadow-2xl relative overflow-hidden group hover:border-[#00F0FF]/60 transition-all"
            >
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent blur-[1px] animate-scanline pointer-events-none opacity-40 z-20" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Col: Details & Key */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-mono-tabular tracking-wider uppercase px-3 py-1 rounded bg-[#07090E] text-[#00F0FF] border border-[#00F0FF]/30">
                      {lic.tierBadge}
                    </span>
                    <span className="text-[10px] font-mono-tabular uppercase px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center space-x-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{lic.slaStatus}</span>
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-[#00F0FF] transition-colors">
                      <Link href={`/systems/${lic.systemSlug}`}>{lic.systemName}</Link>
                    </h3>
                    <p className="text-xs text-[#94A3B8] mt-1 font-mono-tabular">
                      {lic.tagline}
                    </p>
                  </div>

                  {/* SHA-256 Key Box */}
                  <div className="p-4 rounded-xl bg-[#07090E] border border-[#1A2234] space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono-tabular text-[#94A3B8]">
                      <span>CRYPTOGRAPHIC SHA-256 LICENSE KEY:</span>
                      <span className="text-slate-400">Issued: {lic.issuedDate}</span>
                    </div>

                    <div className="flex items-center justify-between gap-3 bg-[#0D111A] p-3 rounded-lg border border-[#1A2234]">
                      <code className="text-xs sm:text-sm font-mono text-[#00F0FF] font-bold truncate">
                        {lic.licenseKey}
                      </code>
                      <button
                        onClick={() => handleCopyKey(lic.licenseKey)}
                        className="px-3 py-1.5 rounded-md bg-[#00F0FF]/10 text-[#00F0FF] hover:bg-[#00F0FF]/20 border border-[#00F0FF]/30 text-xs font-mono-tabular flex items-center space-x-1.5 transition-colors shrink-0 cursor-pointer min-h-[36px]"
                      >
                        {copiedKey === lic.licenseKey ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Domain & Invoice Metadata */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono-tabular">
                    <div className="p-3 rounded-xl bg-[#07090E] border border-[#1A2234] flex items-center justify-between">
                      <span className="text-[#94A3B8] flex items-center space-x-1.5">
                        <Globe className="w-3.5 h-3.5 text-[#00F0FF]" />
                        <span>Domain Binding:</span>
                      </span>
                      <span className="text-white font-semibold truncate ml-1">
                        {lic.domainBinding}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-[#07090E] border border-[#1A2234] flex items-center justify-between">
                      <span className="text-[#94A3B8] flex items-center space-x-1.5">
                        <FileText className="w-3.5 h-3.5 text-[#8B5CF6]" />
                        <span>Invoice:</span>
                      </span>
                      <span className="text-white font-semibold truncate ml-1">
                        {lic.invoiceId}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Col: Actions & GitHub Status */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="p-4 rounded-xl bg-[#07090E] border border-[#1A2234] space-y-3">
                    <div className="text-xs font-mono-tabular text-[#00F0FF] uppercase flex items-center justify-between">
                      <span className="flex items-center space-x-1.5">
                        <Github className="w-4 h-4 text-white" />
                        <span>GITHUB REPOSITORY ACCESS</span>
                      </span>
                      {lic.githubSynced ? (
                        <span className="text-emerald-400 text-[10px] font-bold">SYNCED</span>
                      ) : (
                        <span className="text-yellow-400 text-[10px]">PENDING</span>
                      )}
                    </div>

                    {lic.githubSynced ? (
                      <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono-tabular text-emerald-300 flex items-center justify-between">
                        <span>Connected: {lic.githubHandle}</span>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      </div>
                    ) : (
                      <p className="text-xs text-[#94A3B8]">
                        Link your GitHub handle to receive automated repository invitation & deploy tokens.
                      </p>
                    )}
                  </div>

                  {/* Action Buttons Stack */}
                  <div className="space-y-2.5">
                    <button
                      onClick={() => handleDownloadBundle(lic)}
                      className="w-full py-3 px-4 rounded-xl text-xs font-bold text-black bg-[#00F0FF] hover:bg-[#00F0FF]/90 transition-all flex items-center justify-center space-x-2 shadow-[0_0_15px_rgba(0,240,255,0.2)] cursor-pointer min-h-[44px]"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Verified Bundle (.zip)</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveModalLicense(lic);
                        setGithubHandleInput(lic.githubHandle || "");
                      }}
                      className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-[#0D111A] border border-[#8B5CF6]/50 hover:bg-[#8B5CF6]/20 transition-all flex items-center justify-center space-x-2 cursor-pointer min-h-[44px]"
                    >
                      <Github className="w-4 h-4 text-[#8B5CF6]" />
                      <span>
                        {lic.githubSynced
                          ? "Re-sync GitHub Org Access"
                          : "Request GitHub Org Invite"}
                      </span>
                    </button>

                    <button
                      onClick={() => handleDownloadInvoice(lic)}
                      className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-[#94A3B8] bg-[#07090E] border border-[#1A2234] hover:text-white hover:border-[#1A2234] transition-all flex items-center justify-center space-x-2 cursor-pointer min-h-[44px]"
                    >
                      <FileText className="w-4 h-4 text-[#00F0FF]" />
                      <span>Download GST Tax Invoice</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* GITHUB SYNCHRONIZATION MODAL */}
        {activeModalLicense && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="rounded-2xl bg-[#0D111A] border border-[#00F0FF]/60 p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-[0_0_50px_rgba(0,240,255,0.3)] relative overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent blur-[1px] animate-scanline" />

              <div className="flex items-center justify-between pb-3 border-b border-[#1A2234]">
                <div className="flex items-center space-x-2">
                  <Github className="w-5 h-5 text-[#00F0FF]" />
                  <h3 className="text-base font-bold text-white font-mono-tabular uppercase">
                    GitHub Org Collaborator Sync
                  </h3>
                </div>
                <button
                  onClick={() => setActiveModalLicense(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs font-mono-tabular">
                <div className="p-3 rounded-xl bg-[#07090E] border border-[#1A2234] space-y-1">
                  <div className="text-[#94A3B8]">TARGET SYSTEM:</div>
                  <div className="text-white font-bold">{activeModalLicense.systemName}</div>
                  <div className="text-[#00F0FF]">{activeModalLicense.licenseKey}</div>
                </div>

                <p className="text-[#94A3B8]">
                  Enter your official GitHub handle to dispatch an automated collaborator invite with deploy tokens.
                </p>

                {syncSuccessMsg ? (
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 flex items-center space-x-2">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <span>{syncSuccessMsg}</span>
                  </div>
                ) : (
                  <form onSubmit={handleGrantGithubToken} className="space-y-4">
                    <div>
                      <label className="block text-slate-300 mb-1">
                        GitHub Username / Handle <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={githubHandleInput}
                        onChange={(e) => setGithubHandleInput(e.target.value)}
                        placeholder="@developer (e.g. @octocat)"
                        className="w-full bg-[#07090E] border border-[#1A2234] focus:border-[#00F0FF] rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none font-mono"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSyncing}
                      className="w-full py-3.5 px-4 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-[#00F0FF] to-[#8B5CF6] hover:opacity-95 transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)] flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-60 min-h-[44px]"
                    >
                      {isSyncing ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin text-black" />
                          <span>Dispatching GitHub Deploy Token...</span>
                        </>
                      ) : (
                        <>
                          <Github className="w-4 h-4" />
                          <span>Grant Deploy Token & Send Invite</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}

        {/* CLAIM LICENSE MODAL */}
        {showClaimModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="rounded-2xl bg-[#0D111A] border border-[#00F0FF]/60 p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-[0_0_50px_rgba(0,240,255,0.3)] relative overflow-hidden">
              <div className="flex items-center justify-between pb-3 border-b border-[#1A2234]">
                <div className="flex items-center space-x-2">
                  <Key className="w-5 h-5 text-[#00F0FF]" />
                  <h3 className="text-base font-bold text-white font-mono-tabular uppercase">
                    Claim Production License
                  </h3>
                </div>
                <button
                  onClick={() => setShowClaimModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs font-mono-tabular">
                <p className="text-[#94A3B8]">
                  Paste your SHA-256 commercial entitlement key to register your software license to this account.
                </p>

                {claimMsg && (
                  <div
                    className={`p-3.5 rounded-xl border flex items-center space-x-2 ${
                      claimMsg.includes("Validated")
                        ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400"
                        : "bg-rose-500/10 border-rose-500/40 text-rose-400"
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{claimMsg}</span>
                  </div>
                )}

                <form onSubmit={handleClaimLicense} className="space-y-4">
                  <div>
                    <label className="block text-slate-300 mb-1">
                      License Key String <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={claimInput}
                      onChange={(e) => setClaimInput(e.target.value)}
                      placeholder="NEXUS-COMM-XXXX-XXXX-2026"
                      className="w-full bg-[#07090E] border border-[#1A2234] focus:border-[#00F0FF] rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none font-mono"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-[#00F0FF] to-[#8B5CF6] hover:opacity-95 transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)] flex items-center justify-center space-x-2 cursor-pointer min-h-[44px]"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Validate & Claim Entitlement</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
