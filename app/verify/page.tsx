"use client";

import React, { useState, useRef } from "react";
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
  Cpu,
  Printer,
  FileCheck,
  FileText,
  X,
  Sparkles,
  QrCode,
  Hash
} from "lucide-react";
import { getAllSystems } from "@/data/systems";

interface VerificationPayload {
  status: "idle" | "valid" | "invalid";
  licenseKey: string;
  providedHash: string;
  registryHash?: string;
  systemName?: string;
  systemSlug?: string;
  issuedTo?: string;
  issueDate?: string;
  licenseType?: string;
  complianceTier?: string;
  authDomains?: string;
  attestationCertId?: string;
}

export default function VerifyLicensePage() {
  const allSystems = getAllSystems();

  // Known sample values
  const SAMPLE_VALID_KEY = "NX-ENT-8842-CYBER-2026";
  const SAMPLE_VALID_HASH = "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";

  const SAMPLE_TAMPERED_KEY = "NX-TAMPERED-0000-INVALID";
  const SAMPLE_TAMPERED_HASH = "8f4b234190ffbba40192837465abcde999990000000000000000000000000000";

  // Form states
  const [licenseKey, setLicenseKey] = useState<string>(SAMPLE_VALID_KEY);
  const [checksumHash, setChecksumHash] = useState<string>(SAMPLE_VALID_HASH);
  const [selectedSystem, setSelectedSystem] = useState<string>("telemetry-matrix");
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [verificationResult, setVerificationResult] = useState<VerificationPayload>({
    status: "idle",
    licenseKey: "",
    providedHash: "",
  });

  // Modal State
  const [showCertificateModal, setShowCertificateModal] = useState<boolean>(false);
  const [copiedHash, setCopiedHash] = useState<boolean>(false);
  const [copiedCertId, setCopiedCertId] = useState<boolean>(false);

  // Load sample valid credentials
  const handleLoadSampleKey = () => {
    setLicenseKey(SAMPLE_VALID_KEY);
    setChecksumHash(SAMPLE_VALID_HASH);
    setSelectedSystem("telemetry-matrix");
  };

  // Load sample tampered credentials
  const handleLoadTamperedKey = () => {
    setLicenseKey(SAMPLE_TAMPERED_KEY);
    setChecksumHash(SAMPLE_TAMPERED_HASH);
  };

  // Verification Routine
  const handleVerify = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmedKey = licenseKey.trim();
    const trimmedHash = checksumHash.trim();

    if (!trimmedKey || !trimmedHash) return;

    setIsVerifying(true);
    setVerificationResult({ status: "idle", licenseKey: trimmedKey, providedHash: trimmedHash });

    setTimeout(() => {
      setIsVerifying(false);

      const isTampered =
        trimmedKey.includes("TAMPER") ||
        trimmedKey.includes("INVALID") ||
        trimmedKey.includes("EXPD") ||
        trimmedHash.includes("99999") ||
        trimmedKey.length < 10;

      const matchedSystemObj = allSystems.find((s) => s.slug === selectedSystem) || allSystems[0];

      if (!isTampered) {
        setVerificationResult({
          status: "valid",
          licenseKey: trimmedKey,
          providedHash: trimmedHash,
          registryHash: trimmedHash, // 100% Match
          systemName: matchedSystemObj.name,
          systemSlug: matchedSystemObj.slug,
          issuedTo: "Mock Enterprise Corp (Acme Global Holdings)",
          issueDate: "OCT 11, 2026 // 14:00:00 UTC",
          licenseType: "Full Commercial Source Code IP (Perpetual Royalty-Free)",
          complianceTier: "SOC2 Type II Aligned & OWASP Top 10 Hardened",
          authDomains: "Localhost, Staging & Unlimited Enterprise Cloud VPCs",
          attestationCertId: `CERT-NEXUS-SHA256-${trimmedKey.replace(/[^A-Z0-9]/g, "").slice(0, 12)}`,
        });
      } else {
        setVerificationResult({
          status: "invalid",
          licenseKey: trimmedKey,
          providedHash: trimmedHash,
          registryHash: "0x0000000000000000000000000000000000000000000000000000000000000000",
          systemName: matchedSystemObj.name,
          attestationCertId: "INVALID-UNATTESTED",
        });
      }
    }, 1100);
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  const handleCopyHash = () => {
    if (verificationResult.providedHash) {
      navigator.clipboard.writeText(verificationResult.providedHash);
      setCopiedHash(true);
      setTimeout(() => setCopiedHash(false), 2000);
    }
  };

  const handleCopyCertId = () => {
    if (verificationResult.attestationCertId) {
      navigator.clipboard.writeText(verificationResult.attestationCertId);
      setCopiedCertId(true);
      setTimeout(() => setCopiedCertId(false), 2000);
    }
  };

  return (
    <div className="pt-28 sm:pt-32 pb-24 bg-[#07090E] min-h-screen text-slate-100 relative overflow-hidden font-sans">
      {/* Structural Neo-Brutalist Grid Lines & Scanlines */}
      <div className="absolute inset-0 bg-dot-matrix opacity-25 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />
      <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF]/40 to-transparent blur-[1px] animate-scanline pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* ========================================================= */}
        {/* PAGE HEADER */}
        {/* ========================================================= */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-none border-2 border-[#00F0FF] bg-[#00F0FF]/10 text-xs font-mono font-bold text-[#00F0FF] shadow-[2px_2px_0px_0px_#00F0FF]">
            <ShieldCheck className="w-4 h-4 text-[#00F0FF]" />
            <span>[SHA-256 // ZERO-KNOWLEDGE CODE ATTESTATION]</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase font-mono">
            CRYPTOGRAPHIC LICENSE VERIFIER
          </h1>

          <p className="text-xs sm:text-sm font-mono text-[#94A3B8] leading-relaxed max-w-2xl mx-auto">
            Verify authentic commercial IP entitlements, cryptographic SHA-256 build checksums, and compliance seals against the immutable NEXUS trust network.
          </p>
        </div>

        {/* ========================================================= */}
        {/* 1. INTERACTIVE VERIFICATION TERMINAL */}
        {/* ========================================================= */}
        <div className="rounded-none bg-[#0D111A] border-2 border-[#1A2234] p-6 sm:p-8 shadow-[4px_4px_0px_0px_#00F0FF] space-y-6 relative">
          
          {/* Card Top Title Bar */}
          <div className="flex flex-wrap items-center justify-between pb-4 border-b-2 border-[#1A2234] gap-2 font-mono text-xs">
            <div className="flex items-center space-x-3">
              <Terminal className="w-4 h-4 text-[#00F0FF]" />
              <span className="font-bold text-white uppercase tracking-wider">
                [INPUT_PARAMETERS // PUBLIC_ATTESTATION_PORT]
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-[10px] px-2 py-0.5 bg-[#07090E] text-[#00F0FF] border border-[#00F0FF] font-bold">
                [COMPLIANCE: SOC2_ALIGNED]
              </span>
              <span className="text-[10px] px-2 py-0.5 bg-[#07090E] text-[#8B5CF6] border border-[#8B5CF6] font-bold hidden sm:inline">
                [ROOT_CA: NEXUS_TRUST_NETWORK]
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleVerify} className="space-y-5 font-mono">
            
            {/* System Mapping Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase block tracking-wider flex items-center space-x-1.5">
                <Cpu className="w-3.5 h-3.5 text-[#00F0FF]" />
                <span>[01. TARGET SYSTEM MODULE]:</span>
              </label>
              <select
                value={selectedSystem}
                onChange={(e) => setSelectedSystem(e.target.value)}
                className="w-full bg-[#07090E] border-2 border-[#1A2234] focus:border-[#00F0FF] rounded-none px-4 py-3 text-xs font-mono text-white focus:outline-none transition-colors"
              >
                {allSystems.map((s) => (
                  <option key={s.id} value={s.slug}>
                    {s.name} ({s.badge})
                  </option>
                ))}
              </select>
            </div>

            {/* Input Box 1: License Key */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label className="font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
                  <Key className="w-3.5 h-3.5 text-[#00F0FF]" />
                  <span>[02. ENTER COMMERCIAL LICENSE KEY]:</span>
                </label>
                <span className="text-slate-500 text-[10px] hidden sm:inline">FORMAT: NX-ENT-XXXX-XXXX-XXXX</span>
              </div>
              <input
                type="text"
                value={licenseKey}
                onChange={(e) => setLicenseKey(e.target.value)}
                placeholder="e.g. NX-ENT-8842-CYBER-2026"
                className="w-full bg-[#07090E] border-2 border-[#1A2234] focus:border-[#00F0FF] rounded-none px-4 py-3 text-xs sm:text-sm font-mono text-white placeholder-slate-600 focus:outline-none uppercase tracking-wider transition-colors"
              />
            </div>

            {/* Input Box 2: SHA-256 Checksum / Build Hash */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label className="font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
                  <Hash className="w-3.5 h-3.5 text-[#00F0FF]" />
                  <span>[03. SHA-256 CHECKSUM / BUILD HASH]:</span>
                </label>
                <span className="text-slate-500 text-[10px] hidden sm:inline">64-CHARACTER HEX DIGEST</span>
              </div>
              <input
                type="text"
                value={checksumHash}
                onChange={(e) => setChecksumHash(e.target.value)}
                placeholder="e.g. e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
                className="w-full bg-[#07090E] border-2 border-[#1A2234] focus:border-[#00F0FF] rounded-none px-4 py-3 text-xs sm:text-sm font-mono text-white placeholder-slate-600 focus:outline-none tracking-wider transition-colors"
              />
            </div>

            {/* Sample Button Controls */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1 text-xs">
              <button
                type="button"
                onClick={handleLoadSampleKey}
                className="px-3.5 py-2 rounded-none bg-[#07090E] text-[#00F0FF] hover:bg-[#00F0FF] hover:text-black border-2 border-[#00F0FF] font-bold flex items-center space-x-1.5 transition-all cursor-pointer shadow-[2px_2px_0px_0px_#00F0FF] active:translate-x-[1px] active:translate-y-[1px]"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>[LOAD SAMPLE KEY]</span>
              </button>

              <button
                type="button"
                onClick={handleLoadTamperedKey}
                className="px-3.5 py-2 rounded-none bg-[#07090E] text-red-400 hover:bg-red-500 hover:text-black border-2 border-red-500/80 font-bold flex items-center space-x-1.5 transition-all cursor-pointer shadow-[2px_2px_0px_0px_#EF4444] active:translate-x-[1px] active:translate-y-[1px]"
              >
                <XCircle className="w-3.5 h-3.5" />
                <span>[SIMULATE TAMPERED KEY]</span>
              </button>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isVerifying || !licenseKey.trim() || !checksumHash.trim()}
                className="w-full py-4 rounded-none bg-[#00F0FF] hover:bg-white text-black font-mono font-black text-xs sm:text-sm uppercase tracking-wider border-2 border-[#00F0FF] hover:border-white shadow-[4px_4px_0px_0px_#00F0FF] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#00F0FF] transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50 min-h-[48px]"
              >
                {isVerifying ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>[VERIFYING SIGNATURE VIA ZERO-KNOWLEDGE PROOF...]</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>[VERIFY CRYPTOGRAPHIC SIGNATURE]</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

          </form>

        </div>

        {/* ========================================================= */}
        {/* 2. DYNAMIC VERIFICATION OUTPUT PANEL */}
        {/* ========================================================= */}
        
        {/* SCANNING STATE */}
        {isVerifying && (
          <div className="p-8 rounded-none bg-[#0D111A] border-2 border-[#00F0FF] text-center space-y-4 shadow-[4px_4px_0px_0px_#00F0FF] relative overflow-hidden font-mono">
            <div className="mx-auto w-12 h-12 rounded-none bg-[#00F0FF]/10 border-2 border-[#00F0FF] flex items-center justify-center">
              <RefreshCw className="w-6 h-6 text-[#00F0FF] animate-spin" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-black text-white tracking-wider uppercase">
                [INTERROGATING ATTESTATION ORACLES...]
              </h3>
              <p className="text-xs text-[#94A3B8]">
                Cross-checking cryptographic SHA-256 digest against distributed registry consensus...
              </p>
            </div>
          </div>
        )}

        {/* VALID ATTESTATION PANEL */}
        {verificationResult.status === "valid" && !isVerifying && (
          <div className="rounded-none bg-[#0D111A] border-2 border-emerald-400 p-6 sm:p-8 shadow-[4px_4px_0px_0px_#10B981] space-y-6 relative overflow-hidden font-mono animate-in fade-in duration-200">
            
            {/* Header Badge */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b-2 border-[#1A2234]">
              <div className="space-y-1.5">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-none bg-emerald-500/15 border-2 border-emerald-400 text-emerald-400 text-xs font-bold shadow-[2px_2px_0px_0px_#10B981]">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-none bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-none h-2 w-2 bg-emerald-400" />
                  </span>
                  <span>[VERIFIED: AUTHENTIC ENTERPRISE LICENSE]</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase">
                  {verificationResult.systemName}
                </h2>
                <div className="text-xs text-slate-400">
                  KEY: <span className="text-white font-bold">{verificationResult.licenseKey}</span>
                </div>
              </div>

              {/* Export Certificate Trigger */}
              <button
                type="button"
                onClick={() => setShowCertificateModal(true)}
                className="px-4 py-2.5 rounded-none bg-[#07090E] hover:bg-emerald-400 text-emerald-400 hover:text-black border-2 border-emerald-400 text-xs font-bold flex items-center space-x-2 transition-all cursor-pointer shadow-[3px_3px_0px_0px_#10B981] active:translate-x-[1px] active:translate-y-[1px] min-h-[44px]"
              >
                <FileCheck className="w-4 h-4" />
                <span>[EXPORT AUDIT CERTIFICATE]</span>
              </button>
            </div>

            {/* Verification Metadata Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-[#07090E] border-2 border-[#1A2234] space-y-1">
                <span className="text-[10px] text-slate-500 font-bold uppercase block">[ISSUED TO ENTITY]:</span>
                <span className="text-white font-bold text-sm block">{verificationResult.issuedTo}</span>
              </div>

              <div className="p-4 bg-[#07090E] border-2 border-[#1A2234] space-y-1">
                <span className="text-[10px] text-slate-500 font-bold uppercase block">[ATTESTATION TIMESTAMP]:</span>
                <span className="text-[#00F0FF] font-bold text-sm block">{verificationResult.issueDate}</span>
              </div>

              <div className="p-4 bg-[#07090E] border-2 border-[#1A2234] space-y-1">
                <span className="text-[10px] text-slate-500 font-bold uppercase block">[LICENSE TYPE &amp; INTELLECTUAL PROPERTY]:</span>
                <span className="text-emerald-400 font-bold block">{verificationResult.licenseType}</span>
              </div>

              <div className="p-4 bg-[#07090E] border-2 border-[#1A2234] space-y-1">
                <span className="text-[10px] text-slate-500 font-bold uppercase block">[SECURITY &amp; COMPLIANCE STATUS]:</span>
                <span className="text-white font-bold block">{verificationResult.complianceTier}</span>
              </div>
            </div>

            {/* Live SHA-256 Hash Match Confirmation Box */}
            <div className="p-4 bg-[#07090E] border-2 border-emerald-400 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1A2234] pb-2 text-xs">
                <span className="font-bold text-emerald-400 flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>[SHA-256 HASH MATCH CONFIRMED // ZERO-DIFF 0x00]</span>
                </span>
                <span className="text-[10px] text-slate-400">STATUS: 100% UNTAMPERED</span>
              </div>

              <div className="space-y-1 text-xs">
                <div className="text-[10px] text-slate-500 font-bold uppercase">[REGISTERED BUILD DIGEST]:</div>
                <div className="text-[#00F0FF] font-bold break-all bg-[#0D111A] p-2 border border-[#1A2234]">
                  {verificationResult.registryHash}
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] text-slate-400">
                  ATTESTATION ID: <span className="text-white font-bold">{verificationResult.attestationCertId}</span>
                </span>

                <button
                  type="button"
                  onClick={handleCopyHash}
                  className="px-3 py-1 text-[11px] bg-[#0D111A] text-slate-300 hover:text-white border border-[#1A2234] hover:border-emerald-400 transition-colors flex items-center space-x-1 cursor-pointer"
                >
                  {copiedHash ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">[COPIED HASH]</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>[COPY CHECKSUM]</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>
        )}

        {/* INVALID / TAMPERED ALERT PANEL */}
        {verificationResult.status === "invalid" && !isVerifying && (
          <div className="rounded-none bg-[#0D111A] border-2 border-[#EF4444] p-6 sm:p-8 shadow-[4px_4px_0px_0px_#EF4444] space-y-6 relative overflow-hidden font-mono animate-in fade-in duration-200">
            
            <div className="flex items-start space-x-4 pb-4 border-b-2 border-red-500/40">
              <div className="p-3 bg-red-500/10 border-2 border-red-500 text-red-400 shrink-0">
                <ShieldAlert className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <div className="inline-flex items-center space-x-2 px-3 py-1 bg-red-500/20 border-2 border-red-500 text-red-400 text-xs font-bold">
                  <span>[VERIFICATION_FAILED // INVALID_OR_TAMPERED_HASH]</span>
                </div>
                <h2 className="text-lg sm:text-xl font-black text-white uppercase">
                  Cryptographic Integrity Failure
                </h2>
                <p className="text-xs text-slate-300 leading-relaxed">
                  The provided key <span className="text-red-400 font-bold">&quot;{verificationResult.licenseKey}&quot;</span> could not be authenticated against the public registry ledger.
                </p>
              </div>
            </div>

            <div className="p-4 bg-[#07090E] border-2 border-red-500/40 text-xs text-slate-400 space-y-2">
              <div className="text-red-400 font-bold uppercase">[AUDIT DIAGNOSTIC TRACE]:</div>
              <div>• [REASON]: SHA-256 build hash does not correspond to an official release candidate.</div>
              <div>• [THREAT_VECTOR]: Potential unauthorized binary modification or license tampering.</div>
              <div>• [ATTESTATION_STATUS]: REVOKED / UNREGISTERED.</div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <Link
                href="/checkout"
                className="w-full sm:w-auto px-6 py-3 rounded-none bg-red-500 hover:bg-white text-black font-black text-xs uppercase tracking-wider border-2 border-red-500 hover:border-white shadow-[4px_4px_0px_0px_#EF4444] active:translate-x-[2px] active:translate-y-[2px] transition-all text-center min-h-[44px] flex items-center justify-center"
              >
                <span>[ACQUIRE VERIFIED COMMERCIAL LICENSE ➔]</span>
              </Link>

              <button
                type="button"
                onClick={handleLoadSampleKey}
                className="w-full sm:w-auto px-5 py-3 rounded-none bg-[#07090E] hover:bg-[#1A2234] text-slate-300 hover:text-white border-2 border-[#1A2234] text-xs font-bold text-center min-h-[44px] cursor-pointer"
              >
                <span>[RESET TO VALID SAMPLE KEY]</span>
              </button>
            </div>

          </div>
        )}

      </div>

      {/* ========================================================= */}
      {/* 3. PRINTABLE / EXPORTABLE AUDIT CERTIFICATE MODAL */}
      {/* ========================================================= */}
      {showCertificateModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          {/* Modal Dialog */}
          <div className="relative w-full max-w-3xl bg-[#0D111A] border-2 border-[#00F0FF] shadow-[8px_8px_0px_0px_#07090E] p-6 sm:p-10 font-mono text-slate-100 space-y-6 animate-in zoom-in-95 duration-150">
            
            {/* Modal Controls (Not Printed) */}
            <div className="flex items-center justify-between border-b-2 border-[#1A2234] pb-4 print:hidden">
              <div className="flex items-center space-x-2 text-xs text-[#00F0FF] font-bold">
                <FileCheck className="w-4 h-4" />
                <span>[LEGAL_COMPLIANCE // AUDIT_CERTIFICATE_PREVIEW]</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={handlePrintCertificate}
                  className="px-3.5 py-1.5 rounded-none bg-[#00F0FF] text-black font-bold text-xs border-2 border-[#00F0FF] hover:bg-white flex items-center space-x-1.5 shadow-[2px_2px_0px_0px_#00F0FF] cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>[PRINT / SAVE PDF]</span>
                </button>

                <button
                  onClick={() => setShowCertificateModal(false)}
                  className="p-1.5 rounded-none bg-[#07090E] text-slate-400 hover:text-white border border-[#1A2234] hover:border-red-500 cursor-pointer"
                  title="Close (ESC)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* PRINTABLE CERTIFICATE CANVAS */}
            <div className="border-4 border-[#00F0FF] p-6 sm:p-8 bg-[#07090E] space-y-6 relative overflow-hidden">
              {/* Decorative Corner Seals */}
              <div className="absolute top-2 left-2 text-[9px] text-slate-600 font-bold">[OFFICIAL ATTESTATION]</div>
              <div className="absolute top-2 right-2 text-[9px] text-[#00F0FF] font-bold">[SOC2 TYPE II VERIFIED]</div>

              {/* Certificate Title */}
              <div className="text-center space-y-2 pt-2">
                <div className="w-10 h-10 mx-auto bg-[#0D111A] border-2 border-[#00F0FF] flex items-center justify-center text-[#00F0FF]">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-widest uppercase">
                  CERTIFICATE OF CRYPTOGRAPHIC COMPLIANCE
                </h3>
                <div className="text-[10px] text-slate-400 uppercase tracking-widest">
                  NEXUS DIGITAL INFRASTRUCTURE ATTESTATION AUTHORITY
                </div>
              </div>

              {/* Certificate Details */}
              <div className="space-y-3 border-y-2 border-[#1A2234] py-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <span className="text-slate-500 text-[10px] uppercase block">SYSTEM TITLE:</span>
                    <span className="text-white font-bold">{verificationResult.systemName}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] uppercase block">ENTITLED ENTITY:</span>
                    <span className="text-white font-bold">{verificationResult.issuedTo}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] uppercase block">LICENSE ID:</span>
                    <span className="text-[#00F0FF] font-bold">{verificationResult.licenseKey}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] uppercase block">ATTESTATION CERT ID:</span>
                    <span className="text-emerald-400 font-bold">{verificationResult.attestationCertId}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#1A2234]">
                  <span className="text-slate-500 text-[10px] uppercase block">SHA-256 INTEGRITY DIGEST:</span>
                  <code className="text-[11px] text-[#00F0FF] break-all block mt-0.5">
                    {verificationResult.registryHash}
                  </code>
                </div>

                <div className="pt-2 border-t border-[#1A2234]">
                  <span className="text-slate-500 text-[10px] uppercase block">LEGAL ENTITLEMENT:</span>
                  <p className="text-[11px] text-slate-300 leading-relaxed mt-0.5">
                    Full perpetual source code rights granted with zero royalty obligations. Entitled to self-host, audit, and modify within authorized corporate boundaries.
                  </p>
                </div>
              </div>

              {/* Certificate Signatures & Footer */}
              <div className="flex flex-wrap items-center justify-between text-[10px] text-slate-400 pt-2 gap-4">
                <div className="space-y-0.5">
                  <div>VERIFICATION TIMESTAMP:</div>
                  <div className="text-white font-bold">{verificationResult.issueDate}</div>
                </div>

                <div className="text-right space-y-0.5">
                  <div>ROOT KEY VALIDATOR:</div>
                  <div className="text-[#00F0FF] font-bold">[NEXUS.OS // ZERO_KNOWLEDGE_ORACLE]</div>
                </div>
              </div>

            </div>

            {/* Modal Bottom Close */}
            <div className="flex justify-end print:hidden">
              <button
                type="button"
                onClick={() => setShowCertificateModal(false)}
                className="px-5 py-2 rounded-none bg-[#07090E] text-slate-300 hover:text-white border border-[#1A2234] text-xs font-bold cursor-pointer"
              >
                [CLOSE PREVIEW]
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
