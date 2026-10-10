"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { 
  Check, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Lock
} from "lucide-react";
import { useCurrency } from "@/context/CurrencyContext";

interface PricingTier {
  id: string;
  name: string;
  badge?: string;
  priceInr: string;
  priceUsd: string;
  description: string;
  features: string[];
  ctaText: string;
  popular?: boolean;
  highlightColor: string;
}

const tiers: PricingTier[] = [
  {
    id: "starter",
    name: "Single System Commercial",
    priceInr: "₹49,000",
    priceUsd: "$590",
    description: "Full production code for any 1 chosen system module with standard IP assignment.",
    features: [
      "Full clean-room TypeScript source code",
      "Supabase Postgres Schema + RLS rules",
      "Native UPI & Razorpay Payment Rails",
      "12-Month Security Update Access",
      "Standard Commercial IP Assignment"
    ],
    ctaText: "Acquire Single License",
    highlightColor: "border-[#1A2234] hover:border-[#00F0FF]/50"
  },
  {
    id: "suite",
    name: "Full Suite Enterprise",
    badge: "MOST POPULAR FOR SCALING",
    priceInr: "₹1,49,000",
    priceUsd: "$1,790",
    description: "Complete access to ALL 4 software systems, ERP modules, and telemetry pipelines.",
    features: [
      "All 4 Enterprise Systems (Telemetry, ERP, CRM, Omega)",
      "Unencumbered Source Code Redistribution Rights",
      "Multi-Depot Thermal Sensor & GPS Trackers",
      "Automated GST Invoice & Tax Engine",
      "Priority Direct Architect Slack Channel",
      "Zero Perpetual Royalty or User Fees"
    ],
    ctaText: "Acquire Complete Enterprise Suite",
    popular: true,
    highlightColor: "border-[#00F0FF]/60 shadow-[0_0_35px_rgba(0,240,255,0.2)]"
  },
  {
    id: "custom",
    name: "Custom Managed SLA",
    priceInr: "₹2,99,000+",
    priceUsd: "$3,590+",
    description: "Bespoke module engineering, cloud setup, and dedicated on-premise security audit.",
    features: [
      "Custom Module Development & DB Schema",
      "White-Glove AWS / GCP / Vercel Infra Deployment",
      "Dedicated Security Audit & SOC2 Attestation",
      "24/7 Guaranteed Priority SLA Response",
      "B2B GST Credit Compliance Invoicing"
    ],
    ctaText: "Request Architect Proposal",
    highlightColor: "border-[#8B5CF6]/50 hover:border-[#8B5CF6]/80"
  }
];

export default function PricingSection() {
  const { currency, setCurrency } = useCurrency();

  return (
    <section id="pricing" className="py-24 bg-[#07090E] relative overflow-hidden">
      {/* Ambient Radial Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[400px] bg-[#00F0FF]/10 blur-3xl pointer-events-none rounded-full animate-pulse-slow" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[350px] bg-[#8B5CF6]/12 blur-3xl pointer-events-none rounded-full animate-pulse-slow" style={{ animationDelay: "3s" }} />
      <div className="absolute inset-0 bg-dot-matrix opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-none border-2 border-[#00F0FF] bg-[#00F0FF]/10 text-xs font-mono text-[#00F0FF] shadow-[2px_2px_0px_0px_#00F0FF]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full bg-[#00F0FF] opacity-75" />
              <span className="relative inline-flex h-2 w-2 bg-[#00F0FF]" />
            </span>
            <span>[SYS_PRICING // COMMERCIAL PERPETUAL LICENSING]</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase">
            Perpetual Source Code Licensing. Zero Per-User Fees.
          </h2>

          <p className="text-base sm:text-lg text-[#94A3B8]">
            Acquire unencumbered commercial IP ownership with perpetual deployment rights for your business.
          </p>

          {/* Currency Toggle */}
          <div className="pt-4 flex items-center justify-center">
            <div className="p-1 rounded-none bg-[#0D111A] border-2 border-[#1A2234] shadow-[4px_4px_0px_0px_#1A2234] inline-flex space-x-1">
              <button
                onClick={() => setCurrency("INR")}
                className={"px-4 py-2 rounded-none text-xs font-mono font-bold transition-all cursor-pointer min-h-[44px] " + (
                  currency === "INR"
                    ? "bg-[#00F0FF] text-black border-2 border-black shadow-[2px_2px_0px_0px_#00F0FF]"
                    : "text-[#94A3B8] hover:text-white border-2 border-transparent"
                )}
              >
                [INR ₹ GST INCLUDED]
              </button>
              <button
                onClick={() => setCurrency("USD")}
                className={"px-4 py-2 rounded-none text-xs font-mono font-bold transition-all cursor-pointer min-h-[44px] " + (
                  currency === "USD"
                    ? "bg-[#8B5CF6] text-white border-2 border-white shadow-[2px_2px_0px_0px_#8B5CF6]"
                    : "text-[#94A3B8] hover:text-white border-2 border-transparent"
                )}
              >
                [USD $ INTERNATIONAL]
              </button>
            </div>
          </div>
        </div>

        {/* Featured Deployment Architecture Visual Banner */}
        <div className="mb-16 rounded-none bg-[#0D111A] border-2 border-[#1A2234] p-6 lg:p-8 shadow-[4px_4px_0px_0px_#1A2234] relative overflow-hidden group hover:border-[#00F0FF] hover:shadow-[4px_4px_0px_0px_#00F0FF] transition-all">
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent blur-[1px] animate-scanline pointer-events-none opacity-40 z-20" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-none bg-[#00F0FF]/10 text-[#00F0FF] border-2 border-[#00F0FF] text-xs font-mono shadow-[2px_2px_0px_0px_#00F0FF]">
                <Lock className="w-3.5 h-3.5" />
                <span>[ZERO-TRUST DEPLOYMENT ARCHITECTURE]</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
                Instant Isolated Container &amp; Micro-Rail Deployment
              </h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                Every commercial tier includes containerized deployment blueprints (Docker, Kubernetes, Vercel) ready to spin up with zero vendor lock-in.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2 font-mono text-xs">
                <div className="flex items-center space-x-1.5 text-emerald-400">
                  <Check className="w-4 h-4" />
                  <span>[100% SOURCE CODE TRANSFER]</span>
                </div>
                <div className="flex items-center space-x-1.5 text-[#00F0FF]">
                  <Check className="w-4 h-4" />
                  <span>[NO ROYALTY FEES]</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative w-full overflow-hidden rounded-none border-2 border-[#1A2234] shadow-[4px_4px_0px_0px_#1A2234] bg-[#07090E]">
                <Image
                  src="/slide-5-deployment-cubes.png"
                  alt="Instant Zero-Trust Deployment Cubes - Commercial Licensing"
                  width={1200}
                  height={675}
                  className="w-full h-auto object-cover rounded-none transition-transform duration-300 group-hover:scale-[1.01]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid with Neo-Brutalism Offset Shadows */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier, idx) => {
            const displayPrice = currency === "INR" ? tier.priceInr : tier.priceUsd;
            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                whileHover={{ y: -4, transition: { duration: 0.15, ease: "easeOut" } }}
                className={"rounded-none bg-[#0D111A] p-8 flex flex-col justify-between relative transition-all duration-200 border-2 " + (
                  tier.popular
                    ? "border-[#00F0FF] shadow-[4px_4px_0px_0px_#00F0FF]"
                    : "border-[#1A2234] shadow-[4px_4px_0px_0px_#1A2234] hover:border-[#00F0FF] hover:shadow-[4px_4px_0px_0px_#00F0FF]"
                ) + " group"}
              >
                {/* Popular Badge */}
                {tier.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-none text-[10px] font-mono font-bold tracking-wider uppercase bg-[#00F0FF] text-black border-2 border-black shadow-[2px_2px_0px_0px_#000000] flex items-center space-x-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full bg-black opacity-75" />
                      <span className="relative inline-flex h-2 w-2 bg-black" />
                    </span>
                    <span>[{tier.badge}]</span>
                  </div>
                )}

                <div>
                  {/* Tier Title & Description */}
                  <div className="space-y-2 mb-6">
                    <h3 className="text-xl font-bold text-white flex items-center justify-between tracking-tight">
                      <span>{tier.name}</span>
                      {tier.popular && <Sparkles className="w-5 h-5 text-[#00F0FF]" />}
                    </h3>
                    <p className="text-xs text-[#94A3B8] leading-relaxed">
                      {tier.description}
                    </p>
                  </div>

                  {/* Price Block */}
                  <div className="py-4 border-y-2 border-[#1A2234] mb-6">
                    <div className="flex items-baseline space-x-2 font-mono">
                      <span className="text-4xl lg:text-5xl font-black text-white tracking-tight">
                        {displayPrice}
                      </span>
                      <span className="text-xs text-[#94A3B8]">/ One-time</span>
                    </div>
                    <div className="text-[10px] text-[#00F0FF] font-mono mt-2">
                      [TAX_EXCLUSIVE: FINAL PAYABLE CALCULATED AT CHECKOUT]
                    </div>
                    <div className="text-[11px] text-emerald-400 font-mono mt-1 flex items-center space-x-1">
                      <span>✓ 100% Commercial Source Code IP Transfer</span>
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-3 mb-8">
                    <div className="text-xs font-mono text-[#94A3B8] uppercase tracking-wider">
                      [INCLUDED CAPABILITIES]:
                    </div>
                    <ul className="space-y-2.5">
                      {tier.features.map((feat, i) => (
                        <li key={i} className="flex items-start space-x-2.5 text-xs text-slate-200 font-mono">
                          <Check className="w-4 h-4 text-[#00F0FF] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Action CTA Button */}
                <div className="pt-4 border-t-2 border-[#1A2234]">
                  <Link
                    href={"/#contact?plan=" + tier.id}
                    className={"w-full py-3.5 px-4 rounded-none text-xs font-mono font-bold uppercase flex items-center justify-center space-x-2 transition-all duration-150 min-h-[44px] cursor-pointer " + (
                      tier.popular
                        ? "bg-[#00F0FF] text-black border-2 border-black shadow-[4px_4px_0px_0px_#00F0FF] hover:bg-[#00F0FF]/90 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#00F0FF]"
                        : "bg-[#07090E] border-2 border-[#1A2234] text-white hover:border-[#00F0FF] hover:text-[#00F0FF] shadow-[4px_4px_0px_0px_#1A2234] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#00F0FF]"
                    )}
                  >
                    <span>[{tier.ctaText.toUpperCase()}]</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Pricing Guarantee Banner */}
        <div className="mt-12 p-6 rounded-none bg-[#0D111A] border-2 border-[#1A2234] shadow-[4px_4px_0px_0px_#1A2234] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-none bg-[#00F0FF]/10 text-[#00F0FF] border-2 border-[#00F0FF] shadow-[2px_2px_0px_0px_#00F0FF]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white uppercase font-mono">[CUSTOM ENTERPRISE SLA OR ON-PREMISE AUDIT]</h4>
              <p className="text-xs text-[#94A3B8]">Our solutions engineering team provides custom IP assignments and security compliance audits.</p>
            </div>
          </div>
          <Link
            href="/#contact"
            className="px-5 py-2.5 rounded-none text-xs font-mono font-bold uppercase text-black bg-[#00F0FF] border-2 border-black shadow-[2px_2px_0px_0px_#00F0FF] hover:bg-[#00F0FF]/90 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all min-h-[44px] flex items-center shrink-0"
          >
            [SPEAK WITH ARCHITECT]
          </Link>
        </div>

      </div>
    </section>
  );
}
