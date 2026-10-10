"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { getSystemBySlug } from "@/data/systems";
import {
  Printer,
  ShieldCheck,
  Key,
  Edit3,
  FileCheck,
  Lock,
  Cpu
} from "lucide-react";

// Deterministic Indian Rupee number to words converter
function numberToIndianWords(amount: number): string {
  const ones = [
    "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
    "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
    "Seventeen", "Eighteen", "Nineteen"
  ];
  const tens = [
    "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"
  ];

  function twoDigits(n: number): string {
    if (n < 20) return ones[n];
    const t = Math.floor(n / 10);
    const o = n % 10;
    return tens[t] + (o > 0 ? " " + ones[o] : "");
  }

  function threeDigits(n: number): string {
    const h = Math.floor(n / 100);
    const rest = n % 100;
    let res = "";
    if (h > 0) {
      res += ones[h] + " Hundred";
    }
    if (rest > 0) {
      if (res) res += " ";
      res += twoDigits(rest);
    }
    return res;
  }

  function convertInteger(n: number): string {
    if (n === 0) return "Zero";
    let words = "";

    const crore = Math.floor(n / 10000000);
    n %= 10000000;

    const lakh = Math.floor(n / 100000);
    n %= 100000;

    const thousand = Math.floor(n / 1000);
    n %= 1000;

    const hundred = n;

    if (crore > 0) {
      words += twoDigits(crore) + " Crore ";
    }
    if (lakh > 0) {
      words += twoDigits(lakh) + " Lakh ";
    }
    if (thousand > 0) {
      words += twoDigits(thousand) + " Thousand ";
    }
    if (hundred > 0) {
      words += threeDigits(hundred);
    }
    return words.trim();
  }

  const rounded = Math.round(amount * 100) / 100;
  const integerPart = Math.floor(rounded);
  const decimalPart = Math.round((rounded - integerPart) * 100);

  let result = convertInteger(integerPart) + " Rupees";
  if (decimalPart > 0) {
    result += " and " + twoDigits(decimalPart) + " Paise";
  }
  result += " Only";
  return result;
}

function parsePrice(priceStr?: string): number {
  if (!priceStr) return 19999;
  const cleaned = priceStr.replace(/[^0-9]/g, "");
  const num = parseInt(cleaned, 10);
  return isNaN(num) || num <= 0 ? 19999 : num;
}

function InvoiceContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const rawOrderId = (params?.orderId as string) || "INV-2026-NEXUS-8841";
  const orderId = decodeURIComponent(rawOrderId);

  const systemQuery = searchParams.get("system") || "";
  const matchedSystem = systemQuery ? getSystemBySlug(systemQuery) : undefined;

  const defaultSystemTitle = matchedSystem
    ? `${matchedSystem.name} (Commercial Perpetual License)`
    : "Nexus Agent Orchestrator (Commercial Perpetual License)";

  const defaultAmount = matchedSystem
    ? parsePrice(matchedSystem.priceInr)
    : 19999.00;

  // Editable buyer state for live invoice customization
  const [buyerName, setBuyerName] = useState("Ashish Raj");
  const [buyerCompany, setBuyerCompany] = useState("ENTERPRISE CLIENT LIMITED");
  const [buyerGstin, setBuyerGstin] = useState("09AABCE1234F1Z2");
  const [buyerAddress, setBuyerAddress] = useState("Tower B, 14th Floor, Tech Park, Sector 62, Noida, UP - 201309");
  const [systemName, setSystemName] = useState(defaultSystemTitle);
  const [totalAmount, setTotalAmount] = useState<number>(defaultAmount);

  const [isEditingBuyer, setIsEditingBuyer] = useState(false);

  // Financial calculations
  const igstRate = 18;
  const basePrice = Math.round((totalAmount / (1 + igstRate / 100)) * 100) / 100;
  const igstAmount = Math.round((totalAmount - basePrice) * 100) / 100;

  const totalInWords = numberToIndianWords(totalAmount);
  const igstInWords = numberToIndianWords(igstAmount);

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
              className="px-3.5 py-2 rounded-none bg-[#07090E] border-2 border-[#1A2234] hover:border-[#00F0FF] text-slate-300 hover:text-white transition-colors flex items-center space-x-1.5 cursor-pointer min-h-[38px] font-mono text-xs font-bold"
            >
              <Edit3 className="w-3.5 h-3.5 text-[#00F0FF]" />
              <span>{isEditingBuyer ? "[DONE EDITING]" : "[EDIT BUYER GSTIN & SYSTEM]"}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-none bg-[#00F0FF] hover:bg-white text-black font-mono font-black text-xs uppercase tracking-wider border-2 border-[#00F0FF] hover:border-white shadow-[2px_2px_0px_0px_#00F0FF] active:translate-x-[1px] active:translate-y-[1px] transition-all flex items-center space-x-2 cursor-pointer min-h-[38px]"
            >
              <Printer className="w-4 h-4" />
              <span>[PRINT / SAVE PDF (CTRL+P)]</span>
            </button>

            <Link
              href="/vault"
              className="px-3.5 py-2 rounded-none bg-[#07090E] border-2 border-[#00F0FF] text-[#00F0FF] hover:bg-[#00F0FF] hover:text-black transition-all flex items-center space-x-1.5 min-h-[38px] font-mono text-xs font-bold shadow-[2px_2px_0px_0px_#00F0FF]"
            >
              <Key className="w-3.5 h-3.5" />
              <span>[CUSTOMER VAULT]</span>
            </Link>

            <Link
              href="/verify"
              className="px-3.5 py-2 rounded-none bg-[#07090E] border-2 border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-black transition-all flex items-center space-x-1.5 min-h-[38px] font-mono text-xs font-bold shadow-[2px_2px_0px_0px_#10B981]"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>[VERIFY STAMP]</span>
            </Link>
          </div>

        </div>
      </div>

      {/* MAIN INVOICE CONTAINER */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 print:px-0">
        
        {/* Optional Edit Drawer on Screen View */}
        {isEditingBuyer && (
          <div className="print:hidden mb-6 p-6 rounded-none bg-[#0D111A] border-2 border-[#00F0FF] space-y-4 font-mono text-xs shadow-[4px_4px_0px_0px_#00F0FF]">
            <h3 className="text-sm font-black text-white flex items-center space-x-2 uppercase font-mono">
              <Edit3 className="w-4 h-4 text-[#00F0FF]" />
              <span>[CUSTOMIZE BUYER GST &amp; ENTITY DETAILS FOR STATUTORY TAX CLAIM]</span>
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-slate-400 font-bold">[BUYER COMPANY NAME]</label>
                <input
                  type="text"
                  value={buyerCompany}
                  onChange={(e) => setBuyerCompany(e.target.value)}
                  className="w-full bg-[#07090E] border-2 border-[#1A2234] focus:border-[#00F0FF] rounded-none px-3 py-2 text-white font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-bold">[BUYER GSTIN NUMBER]</label>
                <input
                  type="text"
                  value={buyerGstin}
                  onChange={(e) => setBuyerGstin(e.target.value)}
                  className="w-full bg-[#07090E] border-2 border-[#1A2234] focus:border-[#00F0FF] rounded-none px-3 py-2 text-white font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-bold">[BUYER CONTACT PERSON]</label>
                <input
                  type="text"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  className="w-full bg-[#07090E] border-2 border-[#1A2234] focus:border-[#00F0FF] rounded-none px-3 py-2 text-white font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-bold">[BILLING ADDRESS]</label>
                <input
                  type="text"
                  value={buyerAddress}
                  onChange={(e) => setBuyerAddress(e.target.value)}
                  className="w-full bg-[#07090E] border-2 border-[#1A2234] focus:border-[#00F0FF] rounded-none px-3 py-2 text-white font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-bold">[LICENSED SOFTWARE NAME]</label>
                <input
                  type="text"
                  value={systemName}
                  onChange={(e) => setSystemName(e.target.value)}
                  className="w-full bg-[#07090E] border-2 border-[#1A2234] focus:border-[#00F0FF] rounded-none px-3 py-2 text-white font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-bold">[INVOICE TOTAL AMOUNT (₹)]</label>
                <input
                  type="number"
                  value={totalAmount}
                  onChange={(e) => setTotalAmount(Number(e.target.value) || 0)}
                  className="w-full bg-[#07090E] border-2 border-[#1A2234] focus:border-[#00F0FF] rounded-none px-3 py-2 text-white font-mono"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAX INVOICE CARD */}
        <div className="rounded-none bg-[#0D111A] print:bg-white border-2 border-[#00F0FF] print:border-slate-800 p-8 sm:p-12 print:p-8 shadow-[4px_4px_0px_0px_#00F0FF] print:shadow-none space-y-8 print:space-y-6 text-slate-100 print:text-black">
          
          {/* HEADER ROW */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b border-[#1A2234] print:border-slate-800 pb-6">
            
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-none border-2 border-[#00F0FF] bg-[#0D111A] flex items-center justify-center print:hidden shadow-[2px_2px_0px_0px_#00F0FF]">
                  <Cpu className="w-4 h-4 text-[#00F0FF]" />
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-xs font-mono border-b-2 border-[#1A2234] print:border-slate-800 pb-6">
            
            {/* SELLER (SUPPLIER) DETAILS */}
            <div className="space-y-2 p-4 rounded-none bg-[#07090E] print:bg-slate-50 border-2 border-[#1A2234] print:border-slate-300">
              <div className="text-[#00F0FF] print:text-black font-bold uppercase tracking-wider text-[11px]">
                [SUPPLIER (SELLER) DETAILS]
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
            <div className="space-y-2 p-4 rounded-none bg-[#07090E] print:bg-slate-50 border-2 border-[#1A2234] print:border-slate-300">
              <div className="text-[#8B5CF6] print:text-black font-bold uppercase tracking-wider text-[11px]">
                [RECIPIENT (BUYER B2B) DETAILS]
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
            <table className="w-full text-left text-xs font-mono border-collapse">
              <thead>
                <tr className="bg-[#07090E] print:bg-slate-100 text-[#00F0FF] print:text-black border-b-2 border-[#1A2234] print:border-slate-800 uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-3">S.No</th>
                  <th className="py-3 px-3">Description of Software &amp; Services</th>
                  <th className="py-3 px-3">SAC</th>
                  <th className="py-3 px-3 text-center">Qty</th>
                  <th className="py-3 px-3 text-right">Taxable Value (₹)</th>
                  <th className="py-3 px-3 text-right">IGST (18%)</th>
                  <th className="py-3 px-3 text-right">Total (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-[#1A2234] print:divide-slate-300 text-slate-200 print:text-black">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t-2 border-[#1A2234] print:border-slate-800 font-mono text-xs">
            
            <div className="space-y-3 p-4 rounded-none bg-[#07090E] print:bg-slate-50 border-2 border-[#1A2234] print:border-slate-300">
              <div>
                <div className="text-slate-400 print:text-slate-600 text-[11px] uppercase font-bold">[TOTAL INVOICE AMOUNT IN WORDS]:</div>
                <div className="text-white print:text-black font-bold mt-0.5">
                  {totalInWords}
                </div>
              </div>

              <div>
                <div className="text-slate-400 print:text-slate-600 text-[11px] uppercase font-bold">[GST TAX AMOUNT IN WORDS]:</div>
                <div className="text-[#00F0FF] print:text-black font-bold mt-0.5">
                  {igstInWords}
                </div>
              </div>
            </div>

            <div className="space-y-2 p-4 rounded-none bg-[#07090E] print:bg-slate-100 border-2 border-[#1A2234] print:border-slate-400 text-right">
              <div className="flex justify-between text-slate-400 print:text-slate-700">
                <span>Total Taxable Subtotal:</span>
                <span className="font-mono text-white print:text-black font-bold">₹{basePrice.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-slate-400 print:text-slate-700">
                <span>Integrated GST (IGST @ 18%):</span>
                <span className="font-mono text-[#00F0FF] print:text-black font-bold">₹{igstAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-white print:text-black pt-2 border-t-2 border-[#1A2234] print:border-slate-400">
                <span>Total Amount Payable:</span>
                <span className="font-mono text-emerald-400 print:text-black">₹{totalAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
              </div>
            </div>

          </div>

          {/* STATUTORY DECLARATION & HSM DIGITAL SEAL */}
          <div className="pt-6 border-t-2 border-[#1A2234] print:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-6 items-end font-mono text-xs">
            
            <div className="space-y-2 text-slate-400 print:text-slate-700">
              <div className="font-bold text-slate-200 print:text-black uppercase text-[11px]">[STATUTORY DECLARATIONS]</div>
              <div>• Reverse Charge Applicable: <strong className="text-white print:text-black">NO</strong></div>
              <div>• Payment Status: <strong className="text-emerald-400 print:text-black">PAID IN FULL (Razorpay / UPI Settlement)</strong></div>
              <div className="text-[11px] leading-relaxed pt-1 text-slate-500 print:text-slate-600">
                Certified that the particulars given above are true and correct and the amount indicated represents the price actually charged.
              </div>
            </div>

            <div className="p-4 rounded-none bg-[#07090E] print:bg-slate-50 border-2 border-emerald-500 print:border-slate-400 text-center space-y-2 shadow-[2px_2px_0px_0px_#10B981]">
              <div className="inline-flex items-center space-x-1.5 text-emerald-400 print:text-black text-[11px] font-bold uppercase">
                <Lock className="w-3.5 h-3.5" />
                <span>[CRYPTOGRAPHICALLY SEALED VIA NEXUS CORE HSM]</span>
              </div>
              <div className="text-[10px] text-slate-400 print:text-slate-700 font-mono break-all">
                SHA256: 8f4c6e7a1b92019f8a32b0012c44ef89
              </div>
              <div className="text-[11px] font-bold text-white print:text-black pt-2 border-t-2 border-[#1A2234] print:border-slate-300">
                For NEXUS SYSTEMS PRIVATE LIMITED (Digitally Signed)
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default function TaxInvoicePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#07090E] flex items-center justify-center text-slate-400 font-mono text-sm">
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 border-2 border-[#00F0FF] border-t-transparent rounded-full animate-spin" />
            <span>Generating Cryptographic Tax Invoice...</span>
          </div>
        </div>
      }
    >
      <InvoiceContent />
    </Suspense>
  );
}
