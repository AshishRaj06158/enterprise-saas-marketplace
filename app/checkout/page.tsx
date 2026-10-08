"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  CheckCircle2,
  Copy,
  Download,
  ArrowRight,
  Lock,
  Building2,
  Mail,
  QrCode,
  CreditCard,
  Landmark,
  Check,
  Cpu,
  Sparkles,
  RefreshCw,
  ExternalLink,
  ChevronLeft,
  FileText
} from "lucide-react";
import { getSystemBySlug, getAllSystems, SystemProduct } from "@/data/systems";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const systemSlug = searchParams.get("system") || "omega-core-starter";

  const [selectedSystem, setSelectedSystem] = useState<SystemProduct>(() => {
    return getSystemBySlug(systemSlug) || getAllSystems()[0];
  });

  useEffect(() => {
    const sys = getSystemBySlug(systemSlug) || getAllSystems()[0];
    setSelectedSystem(sys);
  }, [systemSlug]);

  const [currency, setCurrency] = useState<"INR" | "USD">("INR");
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    gstin: ""
  });

  const [paymentRail, setPaymentRail] = useState<"upi" | "razorpay" | "wire">("upi");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [licenseKey, setLicenseKey] = useState("");
  const [copied, setCopied] = useState(false);

  // Calculate pricing breakdown
  const inrNumeric = parseInt(selectedSystem.priceInr.replace(/[^0-9]/g, "")) || 19999;
  const usdNumeric = parseInt(selectedSystem.priceUsd.replace(/[^0-9]/g, "")) || 249;

  const basePrice = currency === "INR" ? inrNumeric : usdNumeric;
  const taxRate = currency === "INR" ? 0.18 : 0.0; // 18% GST for INR
  const taxAmount = Math.round(basePrice * taxRate);
  const totalAmount = basePrice + taxAmount;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAuthorize = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.name) {
      alert("Please provide work email and company/developer name.");
      return;
    }

    setIsVerifying(true);

    // Simulate 1.8-second cryptographic clearance process
    setTimeout(() => {
      // Generate dynamic SHA-256 styled license key
      const randHex1 = Math.random().toString(16).substring(2, 6).toUpperCase();
      const randHex2 = Math.random().toString(16).substring(2, 6).toUpperCase();
      const randHex3 = Math.random().toString(16).substring(2, 6).toUpperCase();
      const generatedKey = `NEXUS-COMM-${randHex1}-${randHex2}-${randHex3}`;
      
      setLicenseKey(generatedKey);
      setIsVerifying(false);
      setIsSuccess(true);
    }, 1800);
  };

  const handleCopyLicense = () => {
    if (licenseKey) {
      navigator.clipboard.writeText(licenseKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadPackage = () => {
    // Mock download trigger
    const content = `====================================================
SUTRA / NEXUS ENTERPRISE SOURCE CODE LICENSE
====================================================
License Key: ${licenseKey}
Product: ${selectedSystem.name} (${selectedSystem.slug})
Issued To: ${formData.name} <${formData.email}>
GSTIN/Tax ID: ${formData.gstin || "N/A"}
Perpetual Entitlement: 100% Commercial Source Code Ownership

Repository Access Granted:
- GitHub Org Dispatch Status: ACTIVE
- Documentation: https://sutra-nexus.internal/docs
====================================================`;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selectedSystem.slug}-license-pack.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="pt-28 pb-24 bg-[#07090E] min-h-screen text-slate-100 relative overflow-hidden">
      {/* Ambient Radial Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-[650px] h-[350px] bg-[#00F0FF]/12 blur-3xl pointer-events-none rounded-full animate-pulse-slow" />
      <div className="absolute bottom-1/3 right-1/4 translate-x-1/3 w-[550px] h-[350px] bg-[#8B5CF6]/12 blur-3xl pointer-events-none rounded-full animate-pulse-slow" style={{ animationDelay: "3s" }} />
      <div className="absolute inset-0 bg-dot-matrix opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Navigation Back Link */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/systems"
            className="inline-flex items-center space-x-2 text-xs font-mono-tabular text-[#94A3B8] hover:text-[#00F0FF] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Systems Catalog</span>
          </Link>

          {/* Currency Switcher */}
          <div className="p-1 rounded-xl bg-[#0D111A]/90 border border-[#1A2234] backdrop-blur-md inline-flex space-x-1">
            <button
              onClick={() => setCurrency("INR")}
              className={`px-3 py-1 rounded-lg text-xs font-bold font-mono-tabular transition-all ${
                currency === "INR"
                  ? "bg-[#00F0FF] text-black shadow-md"
                  : "text-[#94A3B8] hover:text-white"
              }`}
            >
              INR (₹ GST)
            </button>
            <button
              onClick={() => setCurrency("USD")}
              className={`px-3 py-1 rounded-lg text-xs font-bold font-mono-tabular transition-all ${
                currency === "USD"
                  ? "bg-[#8B5CF6] text-white shadow-md"
                  : "text-[#94A3B8] hover:text-white"
              }`}
            >
              USD ($ Intl)
            </button>
          </div>
        </div>

        {/* Page Title */}
        <div className="mb-10 text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#00F0FF]/40 bg-[#00F0FF]/10 text-xs font-mono-tabular text-[#00F0FF] backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-[#00F0FF]" />
            <span>COMMERCIAL LICENSE AUTHORIZATION</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Checkout & License Deployment
          </h1>

          <p className="text-sm text-[#94A3B8]">
            Acquire unencumbered commercial source code rights with instant automated repository dispatch.
          </p>
        </div>

        {/* Verification Loader Modal */}
        {isVerifying && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="rounded-2xl bg-[#0D111A] border border-[#00F0FF]/60 p-8 max-w-md w-full text-center space-y-6 shadow-[0_0_50px_rgba(0,240,255,0.3)] relative overflow-hidden">
              <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent blur-[1px] animate-scanline" />

              <div className="relative mx-auto w-16 h-16 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/40 flex items-center justify-center">
                <RefreshCw className="w-8 h-8 text-[#00F0FF] animate-spin" />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white tracking-wide font-mono-tabular">
                  VERIFYING CRYPTOGRAPHIC CLEARANCE...
                </h3>
                <p className="text-xs text-[#94A3B8] font-mono-tabular">
                  Authorizing perpetual license key & dispatching GitHub Org source repo...
                </p>
              </div>

              <div className="w-full bg-[#07090E] h-2 rounded-full overflow-hidden border border-[#1A2234]">
                <div className="bg-gradient-to-r from-[#00F0FF] to-[#8B5CF6] h-full animate-pulse w-full" />
              </div>
            </div>
          </div>
        )}

        {/* SUCCESS STATE */}
        {isSuccess ? (
          <div className="max-w-3xl mx-auto rounded-2xl bg-[#0D111A]/90 backdrop-blur-md border border-[#00F0FF]/50 p-8 shadow-[0_0_50px_rgba(0,240,255,0.2)] space-y-8 relative overflow-hidden">
            <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent blur-[1px] animate-scanline pointer-events-none" />

            {/* Success Header Badge */}
            <div className="text-center space-y-3">
              <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 text-xs font-mono-tabular">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span>COMMERCIAL LICENSE AUTHORIZED & DEPLOYED</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                {selectedSystem.name}
              </h2>
              <p className="text-xs text-[#94A3B8] font-mono-tabular">
                Commercial License Issued to <span className="text-white font-semibold">{formData.name}</span> ({formData.email})
              </p>
            </div>

            {/* SHA-256 License Key Display Box */}
            <div className="p-6 rounded-xl bg-[#07090E] border border-[#00F0FF]/40 space-y-3 relative">
              <div className="flex items-center justify-between text-xs font-mono-tabular text-[#94A3B8]">
                <span>CRYPTOGRAPHIC SHA-256 LICENSE KEY</span>
                <span className="text-[#00F0FF] font-semibold">PERPETUAL COMMERCIAL</span>
              </div>

              <div className="flex items-center justify-between gap-3 bg-[#0D111A] p-3.5 rounded-lg border border-[#1A2234]">
                <code className="text-sm sm:text-base font-mono text-[#00F0FF] tracking-wider font-bold truncate">
                  {licenseKey}
                </code>
                <button
                  onClick={handleCopyLicense}
                  className="px-3.5 py-1.5 rounded-md bg-[#00F0FF]/10 text-[#00F0FF] hover:bg-[#00F0FF]/20 border border-[#00F0FF]/30 text-xs font-mono-tabular flex items-center space-x-1.5 transition-colors shrink-0"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Key</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Badges & Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* GitHub Access Badge */}
              <div className="p-4 rounded-xl bg-[#07090E] border border-[#1A2234] flex items-center space-x-3 text-xs font-mono-tabular">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-white font-bold">GitHub Org Access Dispatched</div>
                  <div className="text-slate-400 text-[11px]">Invite sent to {formData.email}</div>
                </div>
              </div>

              {/* Download Source Package Button */}
              <button
                onClick={handleDownloadPackage}
                className="p-4 rounded-xl bg-gradient-to-r from-[#00F0FF] to-[#8B5CF6] text-black font-bold text-xs flex items-center justify-center space-x-2 shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:opacity-95 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Download Source Package (.zip)</span>
              </button>
            </div>

            {/* License Details Summary */}
            <div className="p-4 rounded-xl bg-[#07090E]/60 border border-[#1A2234] space-y-2 text-xs font-mono-tabular">
              <div className="text-[#00F0FF] font-semibold uppercase">ENTITLEMENT SUMMARY:</div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Unencumbered Commercial IP Assignment</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Zero Perpetual User/Royalty Fees</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>12-Month Security Update Access</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>B2B Tax Invoice ({formData.gstin ? `GSTIN: ${formData.gstin}` : "Inclusive"})</span>
                </li>
              </ul>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-[#1A2234] flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                href={"/systems/" + selectedSystem.slug}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[#00F0FF] bg-[#07090E] border border-[#00F0FF]/30 hover:bg-[#00F0FF]/10 transition-colors flex items-center space-x-1.5"
              >
                <span>View System Specifications</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>

              <Link
                href="/systems"
                className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-[#1A2234] hover:bg-[#00F0FF] hover:text-black transition-all flex items-center space-x-2"
              >
                <span>Return to Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          /* CHECKOUT FORM LAYOUT (LEFT & RIGHT COLUMNS) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: Selected System Summary & Price Breakdown */}
            <div className="lg:col-span-6 rounded-2xl bg-[#0D111A]/80 backdrop-blur-md border border-[#00F0FF]/30 p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent blur-[1px] animate-scanline pointer-events-none opacity-40 z-20" />

              {/* Product Header */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono-tabular uppercase px-3 py-1 rounded bg-[#07090E] text-[#00F0FF] border border-[#00F0FF]/30">
                    {selectedSystem.badge}
                  </span>
                  <span className="text-xs font-mono-tabular text-emerald-400 flex items-center space-x-1">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                    </span>
                    <span>IP AUDITED</span>
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-white mb-1">{selectedSystem.name}</h2>
                <p className="text-xs font-mono-tabular text-[#8B5CF6]">{selectedSystem.tagline}</p>
              </div>

              {/* Product Preview Image */}
              <div className="relative w-full overflow-hidden rounded-xl border border-[#1A2234] bg-[#07090E]">
                <Image
                  src={selectedSystem.imageSrc}
                  alt={selectedSystem.imageAlt}
                  width={1200}
                  height={675}
                  className="w-full h-auto object-cover rounded-xl"
                />
              </div>

              {/* Technical Specifications Summary */}
              <div className="space-y-2 pt-4 border-t border-[#1A2234]">
                <h3 className="text-xs font-mono-tabular text-[#00F0FF] uppercase">SYSTEM SPECIFICATIONS SUMMARY:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedSystem.specs.slice(0, 4).map((spec, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-[#07090E] border border-[#1A2234] text-[11px] font-mono-tabular flex items-center justify-between">
                      <span className="text-slate-400">{spec.label}:</span>
                      <span className="text-white font-semibold truncate ml-1">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Commercial Entitlements */}
              <div className="space-y-2 pt-4 border-t border-[#1A2234]">
                <h3 className="text-xs font-mono-tabular text-[#00F0FF] uppercase">PERPETUAL LICENSE ENTITLEMENTS:</h3>
                <ul className="space-y-1.5 text-xs text-slate-200">
                  <li className="flex items-center space-x-2">
                    <Check className="w-3.5 h-3.5 text-[#00F0FF] shrink-0" />
                    <span>Full clean-room TypeScript & Next.js 15 source code</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-3.5 h-3.5 text-[#00F0FF] shrink-0" />
                    <span>Unencumbered commercial redistribution & IP ownership</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-3.5 h-3.5 text-[#00F0FF] shrink-0" />
                    <span>Zero perpetual royalty or per-user subscription fees</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-3.5 h-3.5 text-[#00F0FF] shrink-0" />
                    <span>12-Month security update & version patch access</span>
                  </li>
                </ul>
              </div>

              {/* Price Breakdown */}
              <div className="p-4 rounded-xl bg-[#07090E] border border-[#1A2234] space-y-2.5 font-mono-tabular text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Base Commercial License:</span>
                  <span className="text-white font-semibold">
                    {currency === "INR" ? `₹${basePrice.toLocaleString("en-IN")}` : `$${basePrice}`}
                  </span>
                </div>

                {currency === "INR" && (
                  <div className="flex justify-between text-slate-400">
                    <span>18% GST Estimate:</span>
                    <span className="text-white font-semibold">₹{taxAmount.toLocaleString("en-IN")}</span>
                  </div>
                )}

                <div className="pt-2 border-t border-[#1A2234] flex justify-between text-sm font-bold text-white">
                  <span className="text-[#00F0FF]">Total Authorized Amount:</span>
                  <span className="text-[#00F0FF]">
                    {currency === "INR" ? `₹${totalAmount.toLocaleString("en-IN")}` : `$${totalAmount}`}
                  </span>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Customer Details Form & Payment Rail */}
            <div className="lg:col-span-6 rounded-2xl bg-[#0D111A]/80 backdrop-blur-md border border-[#00F0FF]/30 p-6 sm:p-8 space-y-6 shadow-2xl relative">
              
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                  <Lock className="w-5 h-5 text-[#00F0FF]" />
                  <span>Deployment Authorization</span>
                </h3>
                <p className="text-xs text-[#94A3B8]">
                  Fill in deployment credentials to dispatch source code repository and generate cryptographic license key.
                </p>
              </div>

              <form onSubmit={handleAuthorize} className="space-y-6">
                
                {/* STEP 1: Customer Details */}
                <div className="space-y-4 pt-2">
                  <div className="text-xs font-mono-tabular text-[#00F0FF] uppercase tracking-wider flex items-center space-x-1.5">
                    <span className="w-4 h-4 rounded-full bg-[#00F0FF]/20 text-[#00F0FF] flex items-center justify-center text-[10px] font-bold">1</span>
                    <span>DEVELOPER & COMPANY CREDENTIALS</span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs text-slate-300 font-mono-tabular mb-1">
                        Work Email Address <span className="text-rose-400">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="architect@company.com"
                          className="w-full bg-[#07090E] border border-[#1A2234] rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#00F0FF] transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-slate-300 font-mono-tabular mb-1">
                        Company / Developer Name <span className="text-rose-400">*</span>
                      </label>
                      <div className="relative">
                        <Building2 className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Acme Corp / Tech Lead Name"
                          className="w-full bg-[#07090E] border border-[#1A2234] rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#00F0FF] transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-slate-300 font-mono-tabular mb-1">
                        GSTIN / Tax ID <span className="text-slate-500">(Optional for B2B Tax Credit)</span>
                      </label>
                      <div className="relative">
                        <FileText className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                        <input
                          type="text"
                          name="gstin"
                          value={formData.gstin}
                          onChange={handleInputChange}
                          placeholder="27AAAAA0000A1Z5"
                          className="w-full bg-[#07090E] border border-[#1A2234] rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#00F0FF] transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* STEP 2: Payment Rail Selection */}
                <div className="space-y-4 pt-4 border-t border-[#1A2234]">
                  <div className="text-xs font-mono-tabular text-[#00F0FF] uppercase tracking-wider flex items-center space-x-1.5">
                    <span className="w-4 h-4 rounded-full bg-[#00F0FF]/20 text-[#00F0FF] flex items-center justify-center text-[10px] font-bold">2</span>
                    <span>SELECT PAYMENT SETTLEMENT RAIL</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Option 1: UPI QR */}
                    <button
                      type="button"
                      onClick={() => setPaymentRail("upi")}
                      className={`p-3 rounded-xl border text-left flex flex-col justify-between space-y-2 transition-all ${
                        paymentRail === "upi"
                          ? "bg-[#00F0FF]/10 border-[#00F0FF] text-white shadow-[0_0_15px_rgba(0,240,255,0.2)]"
                          : "bg-[#07090E] border-[#1A2234] text-slate-400 hover:border-slate-700"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <QrCode className="w-5 h-5 text-[#00F0FF]" />
                        {paymentRail === "upi" && <Check className="w-4 h-4 text-[#00F0FF]" />}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">Dynamic UPI QR</div>
                        <div className="text-[10px] text-slate-400">GPay, PhonePe, BHIM</div>
                      </div>
                    </button>

                    {/* Option 2: Razorpay */}
                    <button
                      type="button"
                      onClick={() => setPaymentRail("razorpay")}
                      className={`p-3 rounded-xl border text-left flex flex-col justify-between space-y-2 transition-all ${
                        paymentRail === "razorpay"
                          ? "bg-[#00F0FF]/10 border-[#00F0FF] text-white shadow-[0_0_15px_rgba(0,240,255,0.2)]"
                          : "bg-[#07090E] border-[#1A2234] text-slate-400 hover:border-slate-700"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <CreditCard className="w-5 h-5 text-[#8B5CF6]" />
                        {paymentRail === "razorpay" && <Check className="w-4 h-4 text-[#00F0FF]" />}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">Instant Razorpay</div>
                        <div className="text-[10px] text-slate-400">Cards & NetBanking</div>
                      </div>
                    </button>

                    {/* Option 3: Corporate Wire */}
                    <button
                      type="button"
                      onClick={() => setPaymentRail("wire")}
                      className={`p-3 rounded-xl border text-left flex flex-col justify-between space-y-2 transition-all ${
                        paymentRail === "wire"
                          ? "bg-[#00F0FF]/10 border-[#00F0FF] text-white shadow-[0_0_15px_rgba(0,240,255,0.2)]"
                          : "bg-[#07090E] border-[#1A2234] text-slate-400 hover:border-slate-700"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <Landmark className="w-5 h-5 text-emerald-400" />
                        {paymentRail === "wire" && <Check className="w-4 h-4 text-[#00F0FF]" />}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">Corporate Wire</div>
                        <div className="text-[10px] text-slate-400">NEFT / RTGS Transfer</div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Submit Action Button */}
                <div className="pt-4 border-t border-[#1A2234]">
                  <button
                    type="submit"
                    className="w-full py-4 px-6 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-[#00F0FF] to-[#8B5CF6] hover:opacity-95 transition-all shadow-[0_0_25px_rgba(0,240,255,0.4)] flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Authorize License Deployment ({currency === "INR" ? `₹${totalAmount.toLocaleString("en-IN")}` : `$${totalAmount}`})</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-[10px] text-center text-slate-500 font-mono-tabular mt-2">
                    Instant 256-bit encrypted settlement • Automated commercial IP assignment certificate included
                  </p>
                </div>

              </form>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="pt-32 pb-24 bg-[#07090E] min-h-screen text-slate-100 flex items-center justify-center">
          <div className="text-center space-y-4 font-mono-tabular">
            <RefreshCw className="w-8 h-8 text-[#00F0FF] animate-spin mx-auto" />
            <p className="text-xs text-[#94A3B8]">Loading Checkout Environment...</p>
          </div>
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
