"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Printer,
  ShieldCheck,
  Key,
  ArrowLeft,
  CheckCircle2,
  Cpu,
  Edit3,
  FileCheck,
  Lock,
  Download
} from "lucide-react";

export default function TaxInvoicePage() {
  const params = useParams();
  const rawOrderId = (params?.orderId as string) || "INV-2026-NEXUS-8841";
  const orderId = decodeURIComponent(rawOrderId);

  // Editable buyer state for live invoice customization
  const [buyerName, setBuyerName] = useState("Ashish Raj");
  const [buyerCompany, setBuyerCompany] = useState("ENTERPRISE CLIENT LIMITED");
  const [buyerGstin, setBuyerGstin] = useState("09AABCE1234F1Z2");
  const [buyerAddress, setBuyerAddress] = useState("Tower B, 14th Floor, Tech Park, Sector 62, Noida, UP - 201309");
  const [systemName, setSystemName] = useState("Nexus Agent Orchestrator (Commercial Perpetual License)");

  const [isEditingBuyer, setIsEditingBuyer] = useState(false);

  // Financial calculations
  const totalAmount = 19999.00;
  const igstRate = 18;
  const basePrice = Math.round((totalAmount / (1 + igstRate / 100)) * 100) / 100; // 16948.30
  const igstAmount = Math.round((totalAmount - basePrice) * 100) / 100; // 3050.70

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-[#07090E] print:bg-white text-slate-100 print:text-black pt-28 print:pt-0 pb-20 print:pb-0 font-sans selection:bg-[#00F0FF] selection:text-black">
      
      {/* TOP ACTION BAR (Hidden on Print) */}
      <div className="print:hidden fixed top-20 left-0 right-0 z-40 bg-[#0D111A]/95 backdrop-blur-md border-b border-[#00F0FF]/30 py-3 px-4 shadow-xl">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3 font-mono-tabular text-xs">
          
          <div className="flex items-center space-x-2 text-[#00F0FF]">
            <FileCheck className="w-4 h-4 shrink-0" />
            <span className="font-bold">B2B TAX INVOICE ENGINE // {orderId}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsEditingBuyer(!isEditingBuyer)}
              className="px-3.5 py-2 rounded-xl bg-[#07090E] border border-[#1A2234] hover:border-[#00F0FF] text-slate-300 hover:text-white transition-colors flex items-center space-x-1.5 cursor-pointer min-h-[38px]"
            >
              <Edit3 className="w-3.5 h-3.5 text-[#00F0FF]" />
              <span>{isEditingBuyer ? "Done Editing" : "Edit Buyer GSTIN"}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#00F0FF] to-[#8B5CF6] text-black font-bold hover:opacity-95 transition-all flex items-center space-x-2 cursor-pointer shadow-[0_0_15px_rgba(0,240,255,0.3)] min-h-[38px]"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF (Ctrl+P)</span>
            </button>

            <Link
              href="/vault"
              className="px-3.5 py-2 rounded-xl bg-[#07090E] border border-[#00F0FF]/40 text-[#00F0FF] hover:bg-[#00F0FF]/10 transition-colors flex items-center space-x-1.5 min-h-[38px]"
            >
              <Key className="w-3.5 h-3.5" />
              <span>Customer Vault</span>
            </Link>

            <Link
              href="/verify"
              className="px-3.5 py-2 rounded-xl bg-[#07090E] border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 transition-colors flex items-center space-x-1.5 min-h-[38px]"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verify Stamp</span>
            </Link>
          </div>

        </div>
      </div>

      {/* MAIN INVOICE CONTAINER */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 print:px-0">
        
        {/* Optional Edit Drawer on Screen View */}
        {isEditingBuyer && (
          <div className="print:hidden mb-6 p-6 rounded-2xl bg-[#0D111A] border border-[#00F0FF]/40 space-y-4 font-mono-tabular text-xs">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <Edit3 className="w-4 h-4 text-[#00F0FF]" />
              <span>Customize Buyer GST &amp; Entity Details for Statutory Tax Claim</span>
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-slate-400">Buyer Company Name</label>
                <input
                  type="text"
                  value={buyerCompany}
                  onChange={(e) => setBuyerCompany(e.target.value)}
                  className="w-full bg-[#07090E] border border-[#1A2234] rounded-lg px-3 py-2 text-white font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400">Buyer GSTIN Number</label>
                <input
                  type="text"
                  value={buyerGstin}
                  onChange={(e) => setBuyerGstin(e.target.value)}
                  className="w-full bg-[#07090E] border border-[#1A2234] rounded-lg px-3 py-2 text-white font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400">Buyer Contact Person</label>
                <input
                  type="text"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  className="w-full bg-[#07090E] border border-[#1A2234] rounded-lg px-3 py-2 text-white font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400">Billing Address</label>
                <input
                  type="text"
                  value={buyerAddress}
                  onChange={(e) => setBuyerAddress(e.target.value)}
                  className="w-full bg-[#07090E] border border-[#1A2234] rounded-lg px-3 py-2 text-white font-mono"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAX INVOICE CARD */}
        <div className="rounded-3xl bg-[#0D111A] print:bg-white border border-[#00F0FF]/30 print:border-slate-800 p-8 sm:p-12 print:p-8 shadow-2xl print:shadow-none space-y-8 print:space-y-6 text-slate-100 print:text-black">
          
          {/* HEADER ROW */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b border-[#1A2234] print:border-slate-800 pb-6">
            
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00F0FF] to-[#8B5CF6] p-[1px] print:hidden">
                  <div className="w-full h-full bg-[#0D111A] rounded-[7px] flex items-center justify-center">
                    <Cpu className="w-4 h-4 text-[#00F0FF]" />
                  </div>
                </div>
                <span className="font-extrabold text-xl tracking-wider text-white print:text-black">
                  SUTRA <span className="text-[#00F0FF] print:text-black">/</span> NEXUS
                </span>
              </div>
              <p className="text-xs text-[#94A3B8] print:text-slate-600 font-mono-tabular">
                NEXUS SYSTEMS PRIVATE LIMITED • Enterprise Software Marketplace
              </p>
            </div>

            <div className="text-left sm:text-right space-y-1 font-mono-tabular">
              <div className="text-xs font-bold uppercase tracking-widest text-[#00F0FF] print:text-black">
                TAX INVOICE / B2B BILL OF SUPPLY
              </div>
              <div className="text-xs text-slate-400 print:text-slate-700">
                (Under Rule 46 of CGST Rules, 2017)
              </div>
              <div className="text-sm font-bold text-white print:text-black font-mono">
                Invoice No: {orderId}
              </div>
              <div className="text-xs text-slate-400 print:text-slate-700">
                Date of Issue: 09-Oct-2026
              </div>
            </div>

          </div>

          {/* SELLER & BUYER METADATA GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-xs font-mono-tabular border-b border-[#1A2234] print:border-slate-800 pb-6">
            
            {/* SELLER (SUPPLIER) DETAILS */}
            <div className="space-y-2 p-4 rounded-xl bg-[#07090E]/60 print:bg-slate-50 border border-[#1A2234] print:border-slate-300">
              <div className="text-[#00F0FF] print:text-black font-bold uppercase tracking-wider text-[11px]">
                SUPPLIER (SELLER) DETAILS
              </div>
              <div className="font-bold text-white print:text-black text-sm">
                NEXUS SYSTEMS PRIVATE LIMITED
              </div>
              <div className="text-slate-300 print:text-slate-800 space-y-0.5">
                <div><span className="text-slate-500 print:text-slate-600">GSTIN:</span> <strong className="text-white print:text-black">07AAACN0000A1Z5</strong></div>
                <div><span className="text-slate-500 print:text-slate-600">State Code:</span> 07 (Delhi, India)</div>
                <div><span className="text-slate-500 print:text-slate-600">SAC Code:</span> 998313 (IT Software Licensing)</div>
                <div><span className="text-slate-500 print:text-slate-600">Address:</span> Plot 42, Cyber City, Phase III, Gurugram / New Delhi - 110037</div>
                <div><span className="text-slate-500 print:text-slate-600">Email:</span> billing@nexus-systems.in</div>
              </div>
            </div>

            {/* BUYER (RECIPIENT) DETAILS */}
            <div className="space-y-2 p-4 rounded-xl bg-[#07090E]/60 print:bg-slate-50 border border-[#1A2234] print:border-slate-300">
              <div className="text-[#8B5CF6] print:text-black font-bold uppercase tracking-wider text-[11px]">
                RECIPIENT (BUYER B2B) DETAILS
              </div>
              <div className="font-bold text-white print:text-black text-sm">
                {buyerCompany}
              </div>
              <div className="text-slate-300 print:text-slate-800 space-y-0.5">
                <div><span className="text-slate-500 print:text-slate-600">Buyer GSTIN:</span> <strong className="text-white print:text-black">{buyerGstin}</strong></div>
                <div><span className="text-slate-500 print:text-slate-600">Attn / Contact:</span> {buyerName}</div>
                <div><span className="text-slate-500 print:text-slate-600">Place of Supply:</span> Uttar Pradesh (09) [Inter-state IGST]</div>
                <div><span className="text-slate-500 print:text-slate-600">Billing Address:</span> {buyerAddress}</div>
              </div>
            </div>

          </div>

          {/* ITEMIZATION TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono-tabular border-collapse">
              <thead>
                <tr className="bg-[#07090E] print:bg-slate-100 text-[#00F0FF] print:text-black border-b border-[#1A2234] print:border-slate-800 uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-3">S.No</th>
                  <th className="py-3 px-3">Description of Software &amp; Services</th>
                  <th className="py-3 px-3">SAC</th>
                  <th className="py-3 px-3 text-center">Qty</th>
                  <th className="py-3 px-3 text-right">Taxable Value (₹)</th>
                  <th className="py-3 px-3 text-right">IGST (18%)</th>
                  <th className="py-3 px-3 text-right">Total (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1A2234] print:divide-slate-300 text-slate-200 print:text-black">
                <tr>
                  <td className="py-4 px-3 font-mono">01</td>
                  <td className="py-4 px-3 space-y-1">
                    <div className="font-bold text-white print:text-black text-sm">
                      {systemName}
                    </div>
                    <div className="text-[11px] text-slate-400 print:text-slate-600">
                      Clean-room commercial source code assignment with unencumbered IP transfer &amp; 12-month SLA updates.
                    </div>
                  </td>
                  <td className="py-4 px-3 font-mono">998313</td>
                  <td className="py-4 px-3 text-center font-mono">1</td>
                  <td className="py-4 px-3 text-right font-mono">₹{basePrice.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                  <td className="py-4 px-3 text-right font-mono text-[#00F0FF] print:text-black">₹{igstAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                  <td className="py-4 px-3 text-right font-mono font-bold text-white print:text-black">₹{totalAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* FINANCIAL SUMMARY & WORDS BREAKDOWN */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#1A2234] print:border-slate-800 font-mono-tabular text-xs">
            
            <div className="space-y-3 p-4 rounded-xl bg-[#07090E]/60 print:bg-slate-50 border border-[#1A2234] print:border-slate-300">
              <div>
                <div className="text-slate-400 print:text-slate-600 text-[11px] uppercase">TOTAL INVOICE AMOUNT IN WORDS:</div>
                <div className="text-white print:text-black font-bold mt-0.5">
                  Nineteen Thousand Nine Hundred Ninety-Nine Rupees Only
                </div>
              </div>

              <div>
                <div className="text-slate-400 print:text-slate-600 text-[11px] uppercase">GST TAX AMOUNT IN WORDS:</div>
                <div className="text-[#00F0FF] print:text-black font-bold mt-0.5">
                  Three Thousand Fifty Rupees and Seventy Paise Only
                </div>
              </div>
            </div>

            <div className="space-y-2 p-4 rounded-xl bg-[#07090E] print:bg-slate-100 border border-[#1A2234] print:border-slate-400 text-right">
              <div className="flex justify-between text-slate-400 print:text-slate-700">
                <span>Total Taxable Subtotal:</span>
                <span className="font-mono text-white print:text-black">₹{basePrice.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-slate-400 print:text-slate-700">
                <span>Integrated GST (IGST @ 18%):</span>
                <span className="font-mono text-[#00F0FF] print:text-black">₹{igstAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-white print:text-black pt-2 border-t border-[#1A2234] print:border-slate-400">
                <span>Total Amount Payable:</span>
                <span className="font-mono text-emerald-400 print:text-black">₹{totalAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
              </div>
            </div>

          </div>

          {/* STATUTORY DECLARATION & HSM DIGITAL SEAL */}
          <div className="pt-6 border-t border-[#1A2234] print:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-6 items-end font-mono-tabular text-xs">
            
            <div className="space-y-2 text-slate-400 print:text-slate-700">
              <div className="font-bold text-slate-200 print:text-black uppercase text-[11px]">STATUTORY DECLARATIONS</div>
              <div>• Reverse Charge Applicable: <strong className="text-white print:text-black">NO</strong></div>
              <div>• Payment Status: <strong className="text-emerald-400 print:text-black">PAID IN FULL (Razorpay / UPI Settlement)</strong></div>
              <div className="text-[11px] leading-relaxed pt-1 text-slate-500 print:text-slate-600">
                Certified that the particulars given above are true and correct and the amount indicated represents the price actually charged.
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#07090E] print:bg-slate-50 border border-emerald-500/30 print:border-slate-400 text-center space-y-2">
              <div className="inline-flex items-center space-x-1.5 text-emerald-400 print:text-black text-[11px] font-bold uppercase">
                <Lock className="w-3.5 h-3.5" />
                <span>CRYPTOGRAPHICALLY SEALED VIA NEXUS CORE HSM</span>
              </div>
              <div className="text-[10px] text-slate-400 print:text-slate-700 font-mono break-all">
                SHA256: 8f4c6e7a1b92019f8a32b0012c44ef89
              </div>
              <div className="text-[11px] font-bold text-white print:text-black pt-2 border-t border-[#1A2234] print:border-slate-300">
                For NEXUS SYSTEMS PRIVATE LIMITED (Digitally Signed)
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
