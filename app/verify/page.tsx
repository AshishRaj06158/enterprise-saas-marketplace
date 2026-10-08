"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  ShieldAlert,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Key,
  Lock,
  ArrowRight,
  Download,
  Copy,
  Check,
  Terminal,
  ExternalLink,
  Cpu
} from "lucide-react";

export default function VerifyLicensePage() {
  const [licenseInput, setLicenseInput] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{
    status: "idle" | "valid" | "invalid";
    key?: string;
    hash?: string;
    issuedAt?: string;
  }>({ status: "idle" });

  const [copiedHash, setCopiedHash] = useState(false);

  const sampleValidKey = "NEXUS-COMM-89F2-44A1-2026";
  const sampleInvalidKey = "NEXUS-EXPD-9999-0000-0000";

  const executeVerification = (keyToTest: string) => {
    const trimmed = keyToTest.trim();
    if (!trimmed) return;

    setLicenseInput(trimmed);
    setIsScanning(true);
    setVerificationResult({ status: "idle" });

    // Simulate 1.2-second pulse radar scan simulation
    setTimeout(() => {
      setIsScanning(false);
      // Valid if starts with NEXUS-COMM or equals sample valid key or length >= 16 and doesn't contain EXPD/INVALID
      const isExpired = trimmed.includes("EXPD") || trimmed.includes("INVALID") || trimmed.includes("9999");
      const isValid = !isExpired && (trimmed.startsWith("NEXUS-COMM") || trimmed.length >= 12);

      if (isValid) {
        // Generate pseudo SHA-256 hash based on key string
        const num = Array.from(trimmed).reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const pseudoHash = "sha256:" + num.toString(16) + "7f8a3b99f4d1e2a0b3c4d5e6f";
        setVerificationResult({
          status: "valid",
          key: trimmed,
          hash: pseudoHash,
          issuedAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        });
      } else {
        setVerificationResult({
          status: "invalid",
          key: trimmed,
        });
      }
    }, 1200);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeVerification(licenseInput);
  };

  const handleCopyHash = () => {
    if (verificationResult.hash) {
      navigator.clipboard.writeText(verificationResult.hash);
      setCopiedHash(true);
      setTimeout(() => setCopiedHash(false), 2000);
    }
  };

  return (
    <div className="pt-32 pb-24 bg-[#07090E] min-h-screen text-slate-100 relative overflow-hidden">
      {/* Ambient Radial Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[400px] bg-[#00F0FF]/10 blur-3xl pointer-events-none rounded-full animate-pulse-slow" />
      <div className="absolute bottom-10 right-1/4 w-[550px] h-[350px] bg-[#8B5CF6]/12 blur-3xl pointer-events-none rounded-full animate-pulse-slow" style={{ animationDelay: "3s" }} />
      <div className="absolute inset-0 bg-dot-matrix opacity-20 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#00F0FF]/40 bg-[#00F0FF]/10 text-xs font-mono-tabular text-[#00F0FF] backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-[#00F0FF]" />
            <span>CRYPTOGRAPHIC REGISTRY VALIDATOR</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            License Key Verification
          </h1>

          <p className="text-base text-[#94A3B8] leading-relaxed">
            Validate SHA-256 commercial IP entitlements, deployment SLA tier, and repository dispatch clearance in real-time.
          </p>
        </div>

        {/* Centered Terminal Card */}
        <div className="rounded-3xl bg-[#0D111A]/90 backdrop-blur-md border border-[#00F0FF]/40 p-6 sm:p-10 shadow-[0_0_40px_rgba(0,240,255,0.15)] relative overflow-hidden group">
          <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent blur-[1px] animate-scanline pointer-events-none opacity-40 z-20" />

          {/* Card Header Bar */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#1A2234]">
            <div className="flex items-center space-x-3">
              <div className="flex space-x-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <span className="text-xs font-mono-tabular font-bold text-[#00F0FF] tracking-wider uppercase">
                CRYPTOGRAPHIC LICENSE AUTHENTICATOR // SHA-256 CHECK
              </span>
            </div>
            <div className="text-[10px] font-mono-tabular text-[#94A3B8] hidden sm:block">
              NODE v2.4 ONLINE
            </div>
          </div>

          {/* Input Form */}
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-mono-tabular text-[#94A3B8] uppercase block">
                ENTER SHA-256 LICENSE KEY:
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#00F0FF]">
                  <Key className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={licenseInput}
                  onChange={(e) => setLicenseInput(e.target.value)}
                  placeholder="e.g. NEXUS-COMM-89F2-44A1-2026"
                  className="w-full bg-[#07090E] border border-[#1A2234] focus:border-[#00F0FF] rounded-2xl pl-12 pr-4 py-4 text-sm sm:text-base text-white font-mono placeholder-slate-500 focus:outline-none focus:shadow-[0_0_20px_rgba(0,240,255,0.25)] transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isScanning || !licenseInput.trim()}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#00F0FF] to-[#8B5CF6] text-black font-bold text-sm hover:opacity-95 transition-all shadow-[0_0_25px_rgba(0,240,255,0.3)] flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
            >
              {isScanning ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Scanning Global Registry Nodes...</span>
                </>
              ) : (
                <>
                  <span>Verify Deployment SLA</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Sample One-Click Demo Keys */}
          <div className="mt-8 pt-6 border-t border-[#1A2234] space-y-3">
            <div className="text-xs font-mono-tabular text-[#94A3B8] flex items-center space-x-1.5">
              <Terminal className="w-3.5 h-3.5 text-[#00F0FF]" />
              <span>TEST ONE-CLICK SAMPLE DEMO KEYS:</span>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => executeVerification(sampleValidKey)}
                className="px-3.5 py-2 rounded-xl bg-[#00F0FF]/10 text-[#00F0FF] hover:bg-[#00F0FF]/20 border border-[#00F0FF]/30 text-xs font-mono-tabular flex items-center space-x-2 transition-colors cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>[ Test Valid Key: {sampleValidKey} ]</span>
              </button>

              <button
                type="button"
                onClick={() => executeVerification(sampleInvalidKey)}
                className="px-3.5 py-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30 text-xs font-mono-tabular flex items-center space-x-2 transition-colors cursor-pointer"
              >
                <XCircle className="w-3.5 h-3.5" />
                <span>[ Test Expired/Invalid Key ]</span>
              </button>
            </div>
          </div>
        </div>

        {/* SCANNING RADAR ANIMATION STATE */}
        {isScanning && (
          <div className="p-8 rounded-3xl bg-[#0D111A] border border-[#00F0FF]/60 text-center space-y-4 shadow-[0_0_50px_rgba(0,240,255,0.25)] relative overflow-hidden">
            <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent blur-[1px] animate-scanline" />
            <div className="mx-auto w-12 h-12 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/40 flex items-center justify-center">
              <RefreshCw className="w-6 h-6 text-[#00F0FF] animate-spin" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold font-mono-tabular text-white tracking-wider">
                QUERYING GLOBAL CRYPTOGRAPHIC REGISTRY...
              </h3>
              <p className="text-xs text-[#94A3B8] font-mono-tabular">
                Verifying signature hash across 12 distributed verification nodes...
              </p>
            </div>
          </div>
        )}

        {/* VERIFICATION RESULT CARD: VALID */}
        {verificationResult.status === "valid" && (
          <div className="rounded-3xl bg-[#0D111A]/90 backdrop-blur-md border border-[#00F0FF]/60 p-6 sm:p-8 shadow-[0_0_50px_rgba(0,240,255,0.25)] space-y-6 relative overflow-hidden">
            <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent blur-[1px] animate-scanline pointer-events-none" />

            {/* Header Badge */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#1A2234]">
              <div>
                <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 text-xs font-mono-tabular">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                  </span>
                  <span>AUTHENTICATED // COMMERCIAL PERPETUAL</span>
                </div>
                <h2 className="text-xl font-bold text-white mt-2 font-mono-tabular">
                  {verificationResult.key}
                </h2>
              </div>

              <div className="px-3.5 py-1.5 rounded-xl bg-[#07090E] border border-[#00F0FF]/30 text-xs font-mono-tabular text-[#00F0FF]">
                VERIFIED SLA ACTIVE
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#07090E] border border-[#1A2234] space-y-1">
                <div className="text-[10px] font-mono-tabular text-[#94A3B8]">LICENSE TIER</div>
                <div className="text-sm font-bold text-white">Enterprise Single-Tenant Perpetual</div>
              </div>

              <div className="p-4 rounded-xl bg-[#07090E] border border-[#1A2234] space-y-1">
                <div className="text-[10px] font-mono-tabular text-[#94A3B8]">AUTHORIZED DOMAINS</div>
                <div className="text-sm font-bold text-[#00F0FF]">Localhost + Unlimited Cloud Deployments</div>
              </div>

              <div className="p-4 rounded-xl bg-[#07090E] border border-[#1A2234] space-y-1">
                <div className="text-[10px] font-mono-tabular text-[#94A3B8]">SUPPORT & UPDATES</div>
                <div className="text-sm font-bold text-emerald-400">Active SLA (4-Hour Escalation Window)</div>
              </div>

              <div className="p-4 rounded-xl bg-[#07090E] border border-[#1A2234] space-y-1">
                <div className="text-[10px] font-mono-tabular text-[#94A3B8]">SOURCE CODE ENTITLEMENT</div>
                <div className="text-sm font-bold text-white">100% Unencumbered Commercial IP</div>
              </div>
            </div>

            {/* Cryptographic Hash */}
            <div className="p-4 rounded-xl bg-[#07090E] border border-[#00F0FF]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="space-y-0.5 truncate max-w-full">
                <div className="text-[10px] font-mono-tabular text-[#94A3B8]">CRYPTOGRAPHIC SHA-256 SIGNATURE</div>
                <code className="text-xs font-mono text-[#00F0FF] truncate block">
                  {verificationResult.hash}
                </code>
              </div>

              <button
                onClick={handleCopyHash}
                className="px-3 py-1.5 rounded-lg bg-[#00F0FF]/10 text-[#00F0FF] hover:bg-[#00F0FF]/20 border border-[#00F0FF]/30 text-xs font-mono-tabular flex items-center space-x-1.5 transition-colors shrink-0 cursor-pointer"
              >
                {copiedHash ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Hash</span>
                  </>
                )}
              </button>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <Link
                href="/systems"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#00F0FF] to-[#8B5CF6] text-black font-bold text-xs hover:opacity-95 transition-all text-center"
              >
                Acquire Additional Systems
              </Link>
              <Link
                href="/docs"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#07090E] text-slate-300 hover:text-white border border-[#1A2234] text-xs font-mono-tabular text-center flex items-center justify-center space-x-1"
              >
                <span>View SLA Documentation</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* VERIFICATION RESULT CARD: INVALID */}
        {verificationResult.status === "invalid" && (
          <div className="rounded-3xl bg-[#0D111A]/90 backdrop-blur-md border border-red-500/50 p-6 sm:p-8 shadow-[0_0_50px_rgba(239,68,68,0.2)] space-y-6 relative overflow-hidden">
            <div className="flex items-center space-x-3 pb-4 border-b border-red-500/20">
              <div className="p-2 rounded-xl bg-red-500/10 border border-red-500/30">
                <ShieldAlert className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono-tabular font-bold">
                  REVOKED // UNREGISTERED HASH
                </div>
                <h2 className="text-lg font-bold text-white mt-1 font-mono-tabular">
                  {verificationResult.key}
                </h2>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-mono-tabular">
              The provided cryptographic key could not be authenticated against active registry nodes. This license may be expired, revoked, or formatted incorrectly.
            </p>

            <div className="p-4 rounded-xl bg-[#07090E] border border-red-500/20 text-xs text-slate-400 space-y-1.5 font-mono-tabular">
              <div>• Verification Node: Node #04 (Ap-South-1)</div>
              <div>• Failure Reason: Cryptographic signature mismatch (404 Not Found)</div>
              <div>• Status: Unregistered Commercial License Key</div>
            </div>

            <div className="pt-2 flex items-center space-x-3">
              <Link
                href="/checkout"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00F0FF] to-[#8B5CF6] text-black font-bold text-xs hover:opacity-95 transition-all"
              >
                Acquire Valid Commercial License ➔
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
