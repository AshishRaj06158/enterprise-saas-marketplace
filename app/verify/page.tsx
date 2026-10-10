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
      {/* Structural Neo-Brutalist Grid Lines */}
      <div className="absolute inset-0 bg-dot-matrix opacity-20 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-none border-2 border-[#00F0FF] bg-[#00F0FF]/10 text-xs font-mono font-bold text-[#00F0FF] shadow-[2px_2px_0px_0px_#00F0FF]">
            <ShieldCheck className="w-4 h-4 text-[#00F0FF]" />
            <span>[CRYPTOGRAPHIC REGISTRY VALIDATOR // SHA-256]</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase font-mono">
            LICENSE KEY VERIFICATION
          </h1>

          <p className="text-sm font-mono text-[#94A3B8] leading-relaxed">
            Validate SHA-256 commercial IP entitlements, deployment SLA tier, and repository dispatch clearance in real-time.
          </p>
        </div>

        {/* Centered Terminal Card */}
        <div className="rounded-none bg-[#0D111A] border-2 border-[#1A2234] p-6 sm:p-10 shadow-[4px_4px_0px_0px_#1A2234] relative overflow-hidden group">
          {/* Card Header Bar */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b-2 border-[#1A2234]">
            <div className="flex items-center space-x-3">
              <div className="flex space-x-1.5">
                <span className="w-3 h-3 rounded-none bg-red-500 inline-block border border-red-400" />
                <span className="w-3 h-3 rounded-none bg-yellow-500 inline-block border border-yellow-400" />
                <span className="w-3 h-3 rounded-none bg-emerald-500 inline-block border border-emerald-400" />
              </div>
              <span className="text-xs font-mono font-black text-[#00F0FF] tracking-wider uppercase">
                [CRYPTOGRAPHIC LICENSE AUTHENTICATOR // SHA-256 CHECK]
              </span>
            </div>
            <div className="text-[10px] font-mono font-bold text-[#94A3B8] hidden sm:block">
              [NODE v2.4 ONLINE]
            </div>
          </div>

          {/* Input Form */}
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-[#94A3B8] uppercase block tracking-wider">
                [ENTER SHA-256 LICENSE KEY]:
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
                  className="w-full bg-[#07090E] border-2 border-[#1A2234] focus:border-[#00F0FF] rounded-none pl-12 pr-4 py-4 text-sm sm:text-base text-white font-mono placeholder-slate-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isScanning || !licenseInput.trim()}
              className="w-full py-4 rounded-none bg-[#00F0FF] hover:bg-white text-black font-mono font-black text-xs uppercase tracking-wider border-2 border-[#00F0FF] hover:border-white shadow-[4px_4px_0px_0px_#00F0FF] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#00F0FF] transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50 min-h-[44px]"
            >
              {isScanning ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>[SCANNING GLOBAL REGISTRY NODES...]</span>
                </>
              ) : (
                <>
                  <span>[VERIFY DEPLOYMENT SLA &amp; IP CLEARANCE]</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Sample One-Click Demo Keys */}
          <div className="mt-8 pt-6 border-t-2 border-[#1A2234] space-y-3">
            <div className="text-xs font-mono font-bold text-[#94A3B8] flex items-center space-x-1.5">
              <Terminal className="w-3.5 h-3.5 text-[#00F0FF]" />
              <span>[TEST ONE-CLICK SAMPLE DEMO KEYS]:</span>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => executeVerification(sampleValidKey)}
                className="px-3.5 py-2 rounded-none bg-[#07090E] text-[#00F0FF] hover:bg-[#00F0FF] hover:text-black border-2 border-[#00F0FF] text-xs font-mono font-bold flex items-center space-x-2 transition-all cursor-pointer shadow-[2px_2px_0px_0px_#00F0FF] active:translate-x-[1px] active:translate-y-[1px] min-h-[38px]"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>[TEST VALID KEY: {sampleValidKey}]</span>
              </button>

              <button
                type="button"
                onClick={() => executeVerification(sampleInvalidKey)}
                className="px-3.5 py-2 rounded-none bg-[#07090E] text-red-400 hover:bg-red-500 hover:text-black border-2 border-red-500 text-xs font-mono font-bold flex items-center space-x-2 transition-all cursor-pointer shadow-[2px_2px_0px_0px_#EF4444] active:translate-x-[1px] active:translate-y-[1px] min-h-[38px]"
              >
                <XCircle className="w-3.5 h-3.5" />
                <span>[TEST EXPIRED/INVALID KEY]</span>
              </button>
            </div>
          </div>
        </div>

        {/* SCANNING RADAR ANIMATION STATE */}
        {isScanning && (
          <div className="p-8 rounded-none bg-[#0D111A] border-2 border-[#00F0FF] text-center space-y-4 shadow-[4px_4px_0px_0px_#00F0FF] relative overflow-hidden">
            <div className="mx-auto w-12 h-12 rounded-none bg-[#00F0FF]/10 border-2 border-[#00F0FF] flex items-center justify-center">
              <RefreshCw className="w-6 h-6 text-[#00F0FF] animate-spin" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-black font-mono text-white tracking-wider uppercase">
                [QUERYING GLOBAL CRYPTOGRAPHIC REGISTRY...]
              </h3>
              <p className="text-xs text-[#94A3B8] font-mono">
                Verifying signature hash across 12 distributed verification nodes...
              </p>
            </div>
          </div>
        )}

        {/* VERIFICATION RESULT CARD: VALID */}
        {verificationResult.status === "valid" && (
          <div className="rounded-none bg-[#0D111A] border-2 border-[#00F0FF] p-6 sm:p-8 shadow-[4px_4px_0px_0px_#00F0FF] space-y-6 relative overflow-hidden">
            {/* Header Badge */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b-2 border-[#1A2234]">
              <div>
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-none bg-emerald-500/10 border-2 border-emerald-500 text-emerald-400 text-xs font-mono font-bold shadow-[2px_2px_0px_0px_#10B981]">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-none bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-none h-2 w-2 bg-emerald-400" />
                  </span>
                  <span>[AUTHENTICATED // COMMERCIAL PERPETUAL]</span>
                </div>
                <h2 className="text-xl font-black text-white mt-2 font-mono">
                  {verificationResult.key}
                </h2>
              </div>

              <div className="px-3.5 py-1.5 rounded-none bg-[#07090E] border-2 border-[#00F0FF] text-xs font-mono font-bold text-[#00F0FF] shadow-[2px_2px_0px_0px_#00F0FF]">
                [VERIFIED SLA ACTIVE]
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-none bg-[#07090E] border-2 border-[#1A2234] space-y-1">
                <div className="text-[10px] font-mono text-[#94A3B8] font-bold">[LICENSE TIER]</div>
                <div className="text-sm font-bold text-white font-mono">Enterprise Single-Tenant Perpetual</div>
              </div>

              <div className="p-4 rounded-none bg-[#07090E] border-2 border-[#1A2234] space-y-1">
                <div className="text-[10px] font-mono text-[#94A3B8] font-bold">[AUTHORIZED DOMAINS]</div>
                <div className="text-sm font-bold text-[#00F0FF] font-mono">Localhost + Unlimited Cloud Deployments</div>
              </div>

              <div className="p-4 rounded-none bg-[#07090E] border-2 border-[#1A2234] space-y-1">
                <div className="text-[10px] font-mono text-[#94A3B8] font-bold">[SUPPORT &amp; UPDATES]</div>
                <div className="text-sm font-bold text-emerald-400 font-mono">Active SLA (4-Hour Escalation Window)</div>
              </div>

              <div className="p-4 rounded-none bg-[#07090E] border-2 border-[#1A2234] space-y-1">
                <div className="text-[10px] font-mono text-[#94A3B8] font-bold">[SOURCE CODE ENTITLEMENT]</div>
                <div className="text-sm font-bold text-white font-mono">100% Unencumbered Commercial IP</div>
              </div>
            </div>

            {/* Cryptographic Hash */}
            <div className="p-4 rounded-none bg-[#07090E] border-2 border-[#00F0FF] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-[2px_2px_0px_0px_#00F0FF]">
              <div className="space-y-0.5 truncate max-w-full">
                <div className="text-[10px] font-mono text-[#94A3B8] font-bold">[CRYPTOGRAPHIC SHA-256 SIGNATURE]</div>
                <code className="text-xs font-mono text-[#00F0FF] truncate block">
                  {verificationResult.hash}
                </code>
              </div>

              <button
                onClick={handleCopyHash}
                className="px-3.5 py-1.5 rounded-none bg-[#07090E] text-[#00F0FF] hover:bg-[#00F0FF] hover:text-black border-2 border-[#00F0FF] text-xs font-mono font-bold flex items-center space-x-1.5 transition-all shrink-0 cursor-pointer shadow-[2px_2px_0px_0px_#00F0FF] min-h-[38px]"
              >
                {copiedHash ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">[COPIED]</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>[COPY HASH]</span>
                  </>
                )}
              </button>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <Link
                href="/systems"
                className="w-full sm:w-auto px-6 py-3 rounded-none bg-[#00F0FF] hover:bg-white text-black font-mono font-black text-xs uppercase tracking-wider border-2 border-[#00F0FF] hover:border-white shadow-[4px_4px_0px_0px_#00F0FF] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#00F0FF] transition-all text-center min-h-[44px] flex items-center justify-center"
              >
                [ACQUIRE ADDITIONAL SYSTEMS]
              </Link>
              <Link
                href="/docs"
                className="w-full sm:w-auto px-6 py-3 rounded-none bg-[#07090E] text-slate-300 hover:text-white border-2 border-[#1A2234] hover:border-[#00F0FF] text-xs font-mono font-bold text-center flex items-center justify-center space-x-1.5 transition-colors min-h-[44px]"
              >
                <span>[VIEW SLA DOCUMENTATION]</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* VERIFICATION RESULT CARD: INVALID */}
        {verificationResult.status === "invalid" && (
          <div className="rounded-none bg-[#0D111A] border-2 border-red-500 p-6 sm:p-8 shadow-[4px_4px_0px_0px_#EF4444] space-y-6 relative overflow-hidden">
            <div className="flex items-center space-x-3 pb-4 border-b-2 border-red-500/40">
              <div className="p-2 rounded-none bg-red-500/10 border-2 border-red-500 text-red-400">
                <ShieldAlert className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-none bg-red-500/10 border-2 border-red-500 text-red-400 text-xs font-mono font-black shadow-[2px_2px_0px_0px_#EF4444]">
                  [REVOKED // UNREGISTERED HASH]
                </div>
                <h2 className="text-lg font-black text-white mt-1 font-mono">
                  {verificationResult.key}
                </h2>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-mono">
              The provided cryptographic key could not be authenticated against active registry nodes. This license may be expired, revoked, or formatted incorrectly.
            </p>

            <div className="p-4 rounded-none bg-[#07090E] border-2 border-red-500/40 text-xs text-slate-400 space-y-1.5 font-mono">
              <div>• [VERIFICATION_NODE]: Node #04 (Ap-South-1)</div>
              <div>• [FAILURE_REASON]: Cryptographic signature mismatch (404 Not Found)</div>
              <div>• [STATUS]: Unregistered Commercial License Key</div>
            </div>

            <div className="pt-2 flex items-center space-x-3">
              <Link
                href="/checkout"
                className="px-6 py-3 rounded-none bg-red-500 hover:bg-white text-black font-mono font-black text-xs uppercase tracking-wider border-2 border-red-500 hover:border-white shadow-[4px_4px_0px_0px_#EF4444] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#EF4444] transition-all min-h-[44px] flex items-center"
              >
                <span>[ACQUIRE VALID COMMERCIAL LICENSE ➔]</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
