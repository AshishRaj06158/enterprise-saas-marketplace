"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { upsertSystemAction } from "../../actions";
import {
  Upload,
  Layers,
  DollarSign,
  Cpu,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Terminal,
  ArrowRight,
} from "lucide-react";

export default function DeploySystemForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    const formData = new FormData(e.currentTarget);

    try {
      const res = await upsertSystemAction(formData);
      if (res?.success) {
        setSuccessMessage("DEPLOYMENT_SUCCESSFUL // SYSTEM CODEBASE ACTIVATED IN REGISTRY");
        setTimeout(() => {
          router.push("/admin");
          router.refresh();
        }, 1200);
      } else {
        setErrorMessage(res?.error || "Deployment execution failed.");
        setIsSubmitting(false);
      }
    } catch (err: any) {
      setErrorMessage("RUNTIME_ERROR: Connection failed during deployment.");
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#0D111A] border-2 border-[#1A2234] p-6 sm:p-8 shadow-[6px_6px_0px_#1A2234] space-y-6 text-xs font-mono"
    >
      {/* Alert Banners */}
      {errorMessage && (
        <div className="p-4 bg-red-950/30 border-2 border-[#EF4444] text-[#EF4444] flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {successMessage && (
        <div className="p-4 bg-emerald-950/30 border-2 border-[#10B981] text-[#10B981] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Row 1: Slug & Title */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-slate-300 font-bold uppercase mb-1">
            [SYSTEM_SLUG] (UNIQUE IDENTIFIER):
          </label>
          <input
            type="text"
            name="slug"
            required
            placeholder="e.g. sentinel-ai-guard"
            className="w-full bg-[#07090E] border-2 border-[#1A2234] focus:border-[#00F0FF] p-3 text-white outline-none"
          />
        </div>

        <div>
          <label className="block text-slate-300 font-bold uppercase mb-1">
            [SYSTEM_TITLE / NAME]:
          </label>
          <input
            type="text"
            name="title"
            required
            placeholder="e.g. Sentinel AI Autonomous Security"
            className="w-full bg-[#07090E] border-2 border-[#1A2234] focus:border-[#00F0FF] p-3 text-white outline-none"
          />
        </div>
      </div>

      {/* Row 2: Tagline & Category */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-slate-300 font-bold uppercase mb-1">
            [EXECUTIVE_TAGLINE]:
          </label>
          <input
            type="text"
            name="tagline"
            required
            placeholder="e.g. Autonomous SOC 2 Cloud Security Engine"
            className="w-full bg-[#07090E] border-2 border-[#1A2234] focus:border-[#00F0FF] p-3 text-white outline-none"
          />
        </div>

        <div>
          <label className="block text-slate-300 font-bold uppercase mb-1">
            [CATEGORY_VERTICAL]:
          </label>
          <select
            name="category"
            className="w-full bg-[#07090E] border-2 border-[#1A2234] focus:border-[#00F0FF] p-3 text-white uppercase outline-none"
          >
            <option value="Dashboards">Dashboards & Observability</option>
            <option value="ERP">Operations & ERP</option>
            <option value="CRM">Autonomous CRM & Pipelines</option>
            <option value="Fintech">Fintech & Billing</option>
            <option value="AI Agents">AI Agents & Multi-Agent</option>
            <option value="Infrastructure">DevOps & Cloud</option>
          </select>
        </div>
      </div>

      {/* Overview Description */}
      <div>
        <label className="block text-slate-300 font-bold uppercase mb-1">
          [TECHNICAL_OVERVIEW / DESCRIPTION]:
        </label>
        <textarea
          name="overview"
          rows={3}
          required
          placeholder="Detailed architectural summary of the software system..."
          className="w-full bg-[#07090E] border-2 border-[#1A2234] focus:border-[#00F0FF] p-3 text-white outline-none resize-none"
        />
      </div>

      {/* Row 3: Pricing INR & USD (Integer Values) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-slate-300 font-bold uppercase mb-1">
            [PRICE_INR] (NUMERIC RUPEES):
          </label>
          <input
            type="number"
            name="priceINR"
            required
            defaultValue="99999"
            className="w-full bg-[#07090E] border-2 border-[#1A2234] focus:border-[#00F0FF] p-3 text-white outline-none"
          />
        </div>

        <div>
          <label className="block text-slate-300 font-bold uppercase mb-1">
            [PRICE_USD] (NUMERIC DOLLARS):
          </label>
          <input
            type="number"
            name="priceUSD"
            required
            defaultValue="399"
            className="w-full bg-[#07090E] border-2 border-[#1A2234] focus:border-[#00F0FF] p-3 text-white outline-none"
          />
        </div>
      </div>

      {/* Row 4: Telemetry Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-slate-300 font-bold uppercase mb-1">
            [P99_LATENCY]:
          </label>
          <input
            type="text"
            name="p99Latency"
            defaultValue="< 12ms P99"
            className="w-full bg-[#07090E] border-2 border-[#1A2234] focus:border-[#00F0FF] p-3 text-white outline-none"
          />
        </div>

        <div>
          <label className="block text-slate-300 font-bold uppercase mb-1">
            [THROUGHPUT]:
          </label>
          <input
            type="text"
            name="throughput"
            defaultValue="100,000 Ops/sec"
            className="w-full bg-[#07090E] border-2 border-[#1A2234] focus:border-[#00F0FF] p-3 text-white outline-none"
          />
        </div>

        <div>
          <label className="block text-slate-300 font-bold uppercase mb-1">
            [RUNTIME_ARCHITECTURE]:
          </label>
          <input
            type="text"
            name="architecture"
            defaultValue="Vercel Edge / Node.js 20+"
            className="w-full bg-[#07090E] border-2 border-[#1A2234] focus:border-[#00F0FF] p-3 text-white outline-none"
          />
        </div>
      </div>

      {/* Row 5: Tech Stack */}
      <div>
        <label className="block text-slate-300 font-bold uppercase mb-1">
          [TECH_STACK] (COMMA-SEPARATED):
        </label>
        <input
          type="text"
          name="techStack"
          defaultValue="Next.js 15, TypeScript, Tailwind CSS, Prisma, PostgreSQL"
          className="w-full bg-[#07090E] border-2 border-[#1A2234] focus:border-[#00F0FF] p-3 text-white outline-none"
        />
      </div>

      {/* Row 6: Features */}
      <div>
        <label className="block text-slate-300 font-bold uppercase mb-1">
          [KEY_FEATURES] (ONE PER LINE):
        </label>
        <textarea
          name="features"
          rows={3}
          defaultValue={`Clean-room TypeScript & Next.js 15 source code\nNative PostgreSQL migrations & audit triggers\nZero-downtime container configuration & Helm chart`}
          className="w-full bg-[#07090E] border-2 border-[#1A2234] focus:border-[#00F0FF] p-3 text-white outline-none resize-none"
        />
      </div>

      {/* Submit Button */}
      <div className="pt-4 border-t-2 border-[#1A2234] flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3.5 bg-[#00F0FF] text-[#07090E] font-bold uppercase tracking-wider hover:bg-[#38bdf8] transition-all shadow-[4px_4px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] flex items-center gap-2"
        >
          {isSubmitting ? (
            <span>[DEPLOYING_TO_POSTGRESQL...]</span>
          ) : (
            <>
              <Upload className="w-4 h-4" />
              <span>[CONFIRM_DEPLOYMENT_&_PUBLISH]</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
