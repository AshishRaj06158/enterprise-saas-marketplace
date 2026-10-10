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
  RefreshCw,
  ExternalLink,
  ChevronLeft,
  FileText,
  Printer
} from "lucide-react";
import { getSystemBySlug, getAllSystems, SystemProduct } from "@/data/systems";
import { useCurrency } from "@/context/CurrencyContext";

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

  const { currency, setCurrency } = useCurrency();
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
      <div className="absolute inset-0 bg-dot-matrix opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 font-mono-tabular">
        
        {/* Navigation Back Link & Currency Switcher */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/systems"
            className="inline-flex items-center space-x-2 text-xs text-[#94A3B8] hover:text-[#00F0FF] transition-colors uppercase font-bold"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>[BACK TO SYSTEMS CATALOG]</span>
          </Link>

          {/* Currency Switcher */}
          <div className="rounded-none bg-[#0D111A] border-2 border-[#1A2234] shadow-[3px_3px_0px_0px_#1A2234] inline-flex">
            <button
              onClick={() => setCurrency("INR")}
              className={`px-3 py-1.5 text-xs font-bold transition-all uppercase min-h-[44px] ${
                currency === "INR"
                  ? "bg-[#00F0FF] text-black border-r-2 border-[#1A2234]"
                  : "text-[#94A3B8] hover:text-white border-r-2 border-[#1A2234]"
              }`}
            >
              [INR (₹ GST)]
            </button>
            <button
              onClick={() => setCurrency("USD")}
              className={`px-3 py-1.5 text-xs font-bold transition-all uppercase min-h-[44px] ${
                currency === "USD"
                  ? "bg-[#8B5CF6] text-white"
                  : "text-[#94A3B8] hover:text-white"
              }`}
            >
              [USD ($ INTL)]
            </button>
          </div>
        </div>

        {/* Page Title */}
        <div className="mb-10 text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#0D111A] border-2 border-[#00F0FF] text-xs text-[#00F0FF] shadow-[3px_3px_0px_0px_#00F0FF]">
            <ShieldCheck className="w-4 h-4 text-[#00F0FF]" />
            <span className="uppercase font-bold tracking-widest">[COMMERCIAL LICENSE AUTHORIZATION]</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase">
            Checkout &amp; License Deployment
          </h1>

          <p className="text-xs text-[#94A3B8] leading-relaxed">
            Acquire unencumbered commercial source code rights with instant automated repository dispatch.
          </p>
        </div>

        {/* Verification Loader Modal */}
        {isVerifying && (
          <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4">
            <div className="rounded-none bg-[#0D111A] border-2 border-[#00F0FF] p-8 max-w-md w-full text-center space-y-6 shadow-[8px_8px_0px_0px_#00F0FF] relative overflow-hidden">
              <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent blur-[1px] animate-scanline" />

              <div className="relative mx-auto w-16 h-16 rounded-none bg-[#07090E] border-2 border-[#00F0FF] flex items-center justify-center">
                <RefreshCw className="w-8 h-8 text-[#00F0FF] animate-spin" />
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-black text-white tracking-wider uppercase">
                  // VERIFYING CRYPTOGRAPHIC CLEARANCE...
                </h3>
                <p className="text-xs text-[#94A3B8]">
                  Authorizing perpetual license key &amp; dispatching GitHub Org source repo...
                </p>
              </div>

              <div className="w-full bg-[#07090E] h-2 rounded-none overflow-hidden border border-[#1A2234]">
                <div className="bg-[#00F0FF] h-full animate-pulse w-full" />
              </div>
            </div>
          </div>
        )}

        {/* SUCCESS STATE */}
        {isSuccess ? (
          <div className="max-w-3xl mx-auto rounded-none bg-[#0D111A] border-2 border-[#00F0FF] p-8 sm:p-10 shadow-[8px_8px_0px_0px_#00F0FF] space-y-8 relative overflow-hidden">
            <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent blur-[1px] animate-scanline pointer-events-none" />

            {/* Success Header Badge */}
            <div className="text-center space-y-3">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-[#07090E] border-2 border-emerald-500 text-emerald-400 text-xs font-bold uppercase shadow-[2px_2px_0px_0px_#10B981]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span>// COMMERCIAL LICENSE AUTHORIZED &amp; DEPLOYED</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase">
                {selectedSystem.name}
              </h2>
              <p className="text-xs text-[#94A3B8]">
                Commercial License Issued to <span className="text-white font-bold">{formData.name}</span> ({formData.email})
              </p>
            </div>

            {/* SHA-256 License Key Display Box */}
            <div className="p-6 rounded-none bg-[#07090E] border-2 border-[#00F0FF] shadow-[4px_4px_0px_0px_#00F0FF] space-y-3 relative">
              <div className="flex items-center justify-between text-xs text-[#94A3B8] uppercase">
                <span>[CRYPTOGRAPHIC SHA-256 LICENSE KEY]</span>
                <span className="text-[#00F0FF] font-bold">PERPETUAL COMMERCIAL</span>
              </div>

              <div className="flex items-center justify-between gap-3 bg-[#0D111A] p-3.5 border-2 border-[#1A2234]">
                <code className="text-sm sm:text-base font-mono text-[#00F0FF] tracking-wider font-bold truncate">
                  {licenseKey}
                </code>
                <button
                  onClick={handleCopyLicense}
                  className="px-3.5 py-2 rounded-none bg-[#00F0FF] text-black font-bold text-xs flex items-center space-x-1.5 active:translate-x-[1px] active:translate-y-[1px] transition-all shrink-0 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-black" />
                      <span>COPIED!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-black" />
                      <span>COPY KEY</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Badges & Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* GitHub Access Badge */}
              <div className="p-4 rounded-none bg-[#07090E] border-2 border-[#1A2234] shadow-[3px_3px_0px_0px_#1A2234] flex items-center space-x-3 text-xs">
                <div className="p-2 rounded-none bg-[#0D111A] text-emerald-400 border border-emerald-500">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-white font-bold uppercase">GitHub Org Access Dispatched</div>
                  <div className="text-slate-400 text-[11px]">Invite sent to {formData.email}</div>
                </div>
              </div>

              {/* Download Source Package Button */}
              <button
                onClick={handleDownloadPackage}
                className="p-4 rounded-none bg-[#00F0FF] text-black font-bold text-xs border-2 border-[#00F0FF] shadow-[4px_4px_0px_0px_#8B5CF6] hover:shadow-[5px_5px_0px_0px_#8B5CF6] active:translate-x-[2px] active:translate-y-[2px] flex items-center justify-center space-x-2 transition-all uppercase min-h-[44px] cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>DOWNLOAD SOURCE PACKAGE (.ZIP)</span>
              </button>

              {/* GST Tax Invoice Link Button */}
              <Link
                href={`/invoice/INV-2026-NEXUS-8841?system=${selectedSystem.slug}`}
                className="p-4 rounded-none bg-[#07090E] border-2 border-[#00F0FF] shadow-[4px_4px_0px_0px_#00F0FF] text-[#00F0FF] hover:bg-[#00F0FF]/10 font-bold text-xs flex items-center justify-center space-x-2 transition-all sm:col-span-2 min-h-[44px] uppercase"
              >
                <Printer className="w-4 h-4" />
                <span>VIEW &amp; PRINT STATUTORY GST B2B TAX INVOICE ➔</span>
              </Link>
            </div>

            {/* License Details Summary */}
            <div className="p-4 rounded-none bg-[#07090E] border-2 border-[#1A2234] space-y-2 text-xs">
              <div className="text-[#00F0FF] font-bold uppercase tracking-wider">// ENTITLEMENT SUMMARY:</div>
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
            <div className="pt-4 border-t-2 border-[#1A2234] flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                href="/vault"
                className="w-full sm:w-auto px-5 py-3 rounded-none text-xs font-bold text-black bg-[#00F0FF] border-2 border-[#00F0FF] shadow-[4px_4px_0px_0px_#8B5CF6] hover:shadow-[5px_5px_0px_0px_#8B5CF6] active:translate-x-[2px] active:translate-y-[2px] flex items-center justify-center space-x-2 min-h-[44px] uppercase"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>ACCESS IN CUSTOMER VAULT ➔</span>
              </Link>

              <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
                <Link
                  href={"/systems/" + selectedSystem.slug}
                  className="px-4 py-2.5 rounded-none text-xs font-bold text-[#00F0FF] bg-[#07090E] border-2 border-[#1A2234] hover:border-[#00F0FF] transition-colors flex items-center space-x-1.5 min-h-[44px] uppercase"
                >
                  <span>SPECIFICATIONS</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href="/systems"
                  className="px-5 py-2.5 rounded-none text-xs font-bold text-white bg-[#1A2234] hover:bg-[#00F0FF] hover:text-black transition-all flex items-center space-x-2 min-h-[44px] uppercase"
                >
                  <span>CATALOG</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        ) : (
          /* CHECKOUT FORM LAYOUT (LEFT & RIGHT COLUMNS) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: Selected System Summary & Price Breakdown */}
            <div className="lg:col-span-6 rounded-none bg-[#0D111A] border-2 border-[#1A2234] p-6 sm:p-8 space-y-6 shadow-[6px_6px_0px_0px_#1A2234] relative overflow-hidden">
              <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent blur-[1px] animate-scanline pointer-events-none opacity-40 z-20" />

              {/* Product Header */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] uppercase px-2.5 py-1 bg-[#07090E] text-[#00F0FF] border border-[#00F0FF]">
                    [{selectedSystem.badge}]
                  </span>
                  <span className="text-xs text-emerald-400 flex items-center space-x-1 font-bold">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                    </span>
                    <span>[IP AUDITED]</span>
                  </span>
                </div>

                <h2 className="text-2xl font-black text-white mb-1 uppercase">{selectedSystem.name}</h2>
                <p className="text-xs text-[#8B5CF6] uppercase font-semibold">// {selectedSystem.tagline}</p>
              </div>

              {/* Product Preview Image */}
              <div className="relative w-full overflow-hidden rounded-none border-2 border-[#1A2234] bg-[#07090E] shadow-[4px_4px_0px_0px_#07090E]">
                <Image
                  src={selectedSystem.imageSrc}
                  alt={selectedSystem.imageAlt}
                  width={1200}
                  height={675}
                  className="w-full h-auto object-cover rounded-none"
                />
              </div>

              {/* Technical Specifications Summary */}
              <div className="space-y-2 pt-4 border-t-2 border-[#1A2234]">
                <h3 className="text-xs text-[#00F0FF] uppercase font-bold">// SPECIFICATIONS:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedSystem.specs.slice(0, 4).map((spec, i) => (
                    <div key={i} className="p-2.5 rounded-none bg-[#07090E] border border-[#1A2234] text-[11px] flex items-center justify-between">
                      <span className="text-slate-400 uppercase">[{spec.label}]:</span>
                      <span className="text-white font-bold truncate ml-1">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Commercial Entitlements */}
              <div className="space-y-2 pt-4 border-t-2 border-[#1A2234]">
                <h3 className="text-xs text-[#00F0FF] uppercase font-bold">// PERPETUAL LICENSE RIGHTS:</h3>
                <ul className="space-y-1.5 text-xs text-slate-200">
                  <li className="flex items-center space-x-2">
                    <Check className="w-3.5 h-3.5 text-[#00F0FF] shrink-0" />
                    <span>Clean-room TypeScript &amp; Next.js 15 source code</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-3.5 h-3.5 text-[#00F0FF] shrink-0" />
                    <span>Unencumbered commercial redistribution &amp; IP ownership</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-3.5 h-3.5 text-[#00F0FF] shrink-0" />
                    <span>Zero perpetual royalty or per-user subscription fees</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-3.5 h-3.5 text-[#00F0FF] shrink-0" />
                    <span>12-Month security update &amp; version patch access</span>
                  </li>
                </ul>
              </div>

              {/* Price Breakdown */}
              <div className="p-4 rounded-none bg-[#07090E] border-2 border-[#1A2234] space-y-2.5 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span className="uppercase">[BASE COMMERCIAL LICENSE]:</span>
                  <span className="text-white font-bold">
                    {currency === "INR" ? `₹${basePrice.toLocaleString("en-IN")}` : `$${basePrice}`}
                  </span>
                </div>

                {currency === "INR" && (
                  <div className="flex justify-between text-slate-400">
                    <span className="uppercase">[18% GST ESTIMATE]:</span>
                    <span className="text-white font-bold">₹{taxAmount.toLocaleString("en-IN")}</span>
                  </div>
                )}

                <div className="pt-2 border-t border-[#1A2234] flex justify-between text-base font-black text-white">
                  <span className="text-[#00F0FF] uppercase">[TOTAL AMOUNT PAYABLE]:</span>
                  <span className="text-[#00F0FF]">
                    {currency === "INR" ? `₹${totalAmount.toLocaleString("en-IN")}` : `$${totalAmount}`}
                  </span>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Customer Details Form & Payment Rail */}
            <div className="lg:col-span-6 rounded-none bg-[#0D111A] border-2 border-[#1A2234] p-6 sm:p-8 space-y-6 shadow-[6px_6px_0px_0px_#1A2234] relative">
              
              <div className="space-y-1">
                <h3 className="text-xl font-black text-white flex items-center space-x-2 uppercase">
                  <Lock className="w-5 h-5 text-[#00F0FF]" />
                  <span>// Deployment Authorization</span>
                </h3>
                <p className="text-xs text-[#94A3B8]">
                  Fill in deployment credentials to dispatch source code repository and generate cryptographic license key.
                </p>
              </div>

              <form onSubmit={handleAuthorize} className="space-y-6">
                
                {/* STEP 1: Customer Details */}
                <div className="space-y-4 pt-2">
                  <div className="text-xs text-[#00F0FF] uppercase tracking-wider font-bold flex items-center space-x-1.5">
                    <span>[STEP 1: DEVELOPER &amp; COMPANY CREDENTIALS]</span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs text-slate-300 uppercase font-bold mb-1">
                        Work Email Address <span className="text-rose-400">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="architect@company.com"
                          className="w-full bg-[#07090E] border-2 border-[#1A2234] rounded-none pl-9 pr-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#00F0FF] min-h-[44px]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-slate-300 uppercase font-bold mb-1">
                        Company / Developer Name <span className="text-rose-400">*</span>
                      </label>
                      <div className="relative">
                        <Building2 className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Acme Corp / Tech Lead Name"
                          className="w-full bg-[#07090E] border-2 border-[#1A2234] rounded-none pl-9 pr-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#00F0FF] min-h-[44px]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-slate-300 uppercase font-bold mb-1">
                        GSTIN / Tax ID <span className="text-slate-500 normal-case">(Optional for B2B Tax Credit)</span>
                      </label>
                      <div className="relative">
                        <FileText className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                        <input
                          type="text"
                          name="gstin"
                          value={formData.gstin}
                          onChange={handleInputChange}
                          placeholder="27AAAAA0000A1Z5"
                          className="w-full bg-[#07090E] border-2 border-[#1A2234] rounded-none pl-9 pr-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#00F0FF] min-h-[44px]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* STEP 2: Payment Rail Selection */}
                <div className="space-y-4 pt-4 border-t-2 border-[#1A2234]">
                  <div className="text-xs text-[#00F0FF] uppercase tracking-wider font-bold flex items-center space-x-1.5">
                    <span>[STEP 2: PAYMENT SETTLEMENT RAIL]</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Option 1: UPI QR */}
                    <button
                      type="button"
                      onClick={() => setPaymentRail("upi")}
                      className={`p-3.5 rounded-none border-2 text-left flex flex-col justify-between space-y-2 transition-all min-h-[44px] cursor-pointer ${
                        paymentRail === "upi"
                          ? "bg-[#07090E] border-[#00F0FF] text-white shadow-[3px_3px_0px_0px_#00F0FF]"
                          : "bg-[#07090E] border-[#1A2234] text-slate-400 hover:border-slate-500 shadow-[2px_2px_0px_0px_#1A2234]"
                      } active:translate-x-[1px] active:translate-y-[1px]`}
                    >
                      <div className="flex items-center justify-between">
                        <QrCode className="w-5 h-5 text-[#00F0FF]" />
                        {paymentRail === "upi" && <Check className="w-4 h-4 text-[#00F0FF]" />}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white uppercase">[UPI QR]</div>
                        <div className="text-[10px] text-slate-400">GPay, PhonePe, BHIM</div>
                      </div>
                    </button>

                    {/* Option 2: Razorpay */}
                    <button
                      type="button"
                      onClick={() => setPaymentRail("razorpay")}
                      className={`p-3.5 rounded-none border-2 text-left flex flex-col justify-between space-y-2 transition-all min-h-[44px] cursor-pointer ${
                        paymentRail === "razorpay"
                          ? "bg-[#07090E] border-[#8B5CF6] text-white shadow-[3px_3px_0px_0px_#8B5CF6]"
                          : "bg-[#07090E] border-[#1A2234] text-slate-400 hover:border-slate-500 shadow-[2px_2px_0px_0px_#1A2234]"
                      } active:translate-x-[1px] active:translate-y-[1px]`}
                    >
                      <div className="flex items-center justify-between">
                        <CreditCard className="w-5 h-5 text-[#8B5CF6]" />
                        {paymentRail === "razorpay" && <Check className="w-4 h-4 text-[#8B5CF6]" />}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white uppercase">[RAZORPAY]</div>
                        <div className="text-[10px] text-slate-400">Cards &amp; NetBanking</div>
                      </div>
                    </button>

                    {/* Option 3: Corporate Wire */}
                    <button
                      type="button"
                      onClick={() => setPaymentRail("wire")}
                      className={`p-3.5 rounded-none border-2 text-left flex flex-col justify-between space-y-2 transition-all min-h-[44px] cursor-pointer ${
                        paymentRail === "wire"
                          ? "bg-[#07090E] border-emerald-500 text-white shadow-[3px_3px_0px_0px_#10B981]"
                          : "bg-[#07090E] border-[#1A2234] text-slate-400 hover:border-slate-500 shadow-[2px_2px_0px_0px_#1A2234]"
                      } active:translate-x-[1px] active:translate-y-[1px]`}
                    >
                      <div className="flex items-center justify-between">
                        <Landmark className="w-5 h-5 text-emerald-400" />
                        {paymentRail === "wire" && <Check className="w-4 h-4 text-emerald-400]" />}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white uppercase">[CORP WIRE]</div>
                        <div className="text-[10px] text-slate-400">NEFT / RTGS Wire</div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Submit Action Button */}
                <div className="pt-4 border-t-2 border-[#1A2234]">
                  <button
                    type="submit"
                    className="w-full py-4 px-6 rounded-none text-xs font-bold text-black bg-[#00F0FF] border-2 border-[#00F0FF] shadow-[4px_4px_0px_0px_#8B5CF6] hover:shadow-[6px_6px_0px_0px_#8B5CF6] active:translate-x-[2px] active:translate-y-[2px] transition-all flex items-center justify-center space-x-2 cursor-pointer uppercase min-h-[44px]"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>AUTHORIZE LICENSE DEPLOYMENT ({currency === "INR" ? `₹${totalAmount.toLocaleString("en-IN")}` : `$${totalAmount}`})</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-[10px] text-center text-slate-500 mt-2 uppercase">
                    [INSTANT 256-BIT ENCRYPTED SETTLEMENT // COMMERCIAL IP CERTIFICATE INCLUDED]
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
        <div className="pt-32 pb-24 bg-[#07090E] min-h-screen text-slate-100 flex items-center justify-center font-mono-tabular">
          <div className="text-center space-y-4">
            <RefreshCw className="w-8 h-8 text-[#00F0FF] animate-spin mx-auto" />
            <p className="text-xs text-[#94A3B8] uppercase">[INITIALIZING SECURE CHECKOUT MATRIX...]</p>
          </div>
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
