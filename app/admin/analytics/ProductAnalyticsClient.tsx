"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BarChart3,
  TrendingUp,
  Sparkles,
  Star,
  Users,
  CheckCircle2,
  Clock,
  ArrowLeft,
  ArrowRight,
  Filter,
  Layers,
  Activity,
  Award,
  Zap,
  PieChart,
  Download,
} from "lucide-react";
import { LeadRecord, FeedbackRecord } from "@/lib/leads-feedback-service";

interface ProductAnalyticsClientProps {
  analytics: {
    totalLeads: number;
    topProduct: string;
    topProductCount: number;
    statusCounts: Record<string, number>;
    productBreakdown: { product: string; count: number; percentage: number }[];
  };
  feedbackStats: {
    totalCount: number;
    averageRating: number;
    formattedRating: string;
    ratingCounts: Record<number, number>;
    categoryCounts: Record<string, number>;
  };
  feedbacks: FeedbackRecord[];
  leads: LeadRecord[];
}

export default function ProductAnalyticsClient({
  analytics,
  feedbackStats,
  feedbacks,
  leads,
}: ProductAnalyticsClientProps) {
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  const exportTelemetryData = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(
        JSON.stringify(
          {
            generatedAt: new Date().toISOString(),
            analytics,
            feedbackStats,
            totalLeadsCount: leads.length,
            totalFeedbacksCount: feedbacks.length,
          },
          null,
          2
        )
      );
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute(
      "download",
      `nexus_product_analytics_${new Date().toISOString().slice(0, 10)}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    setDownloadNotice("TELEMETRY AUDIT REPORT EXPORTED // JSON");
    setTimeout(() => setDownloadNotice(null), 3000);
  };

  return (
    <div className="space-y-8 font-mono">
      {/* Header Matrix */}
      <div className="p-6 bg-[#0D111A] border-2 border-[#8B5CF6] shadow-[6px_6px_0px_0px_#8B5CF6] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8B5CF6] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#8B5CF6]" />
            </span>
            <span className="text-xs font-black text-[#8B5CF6] uppercase tracking-wider">
              [INTELLIGENCE_CORE // PRODUCT & FEEDBACK TELEMETRY]
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            Enterprise Product Analytics
          </h1>
          <p className="text-xs text-slate-400">
            Marketplace inquiry distribution, demand clustering, and customer satisfaction metrics.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/admin/leads"
            className="px-3.5 py-2 bg-[#0D111A] hover:bg-[#07090E] text-[#00F0FF] hover:text-white border-2 border-[#00F0FF] shadow-[3px_3px_0px_0px_#00F0FF] text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 transition-all"
          >
            <Users className="w-3.5 h-3.5" />
            <span>[LEADS_MANAGEMENT]</span>
          </Link>
          <button
            onClick={exportTelemetryData}
            className="px-3.5 py-2 bg-[#07090E] hover:bg-[#1A2234] text-slate-300 hover:text-white border border-[#1A2234] text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span>[EXPORT_JSON]</span>
          </button>
        </div>
      </div>

      {downloadNotice && (
        <div className="p-3 bg-purple-950/50 border-2 border-[#8B5CF6] text-purple-300 text-xs flex items-center space-x-2 shadow-[4px_4px_0px_0px_#8B5CF6]">
          <CheckCircle2 className="w-4 h-4 text-[#8B5CF6]" />
          <span>{downloadNotice}</span>
        </div>
      )}

      {/* Top 4 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Inquiries */}
        <div className="p-5 bg-[#0D111A] border-2 border-[#1A2234] shadow-[4px_4px_0px_0px_#1A2234]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Total Inquiries Captured
            </span>
            <Users className="w-4 h-4 text-[#00F0FF]" />
          </div>
          <div className="text-3xl font-black text-white">{analytics.totalLeads}</div>
          <div className="mt-2 text-[10px] text-slate-400 flex items-center justify-between">
            <span>Inquiry pipeline:</span>
            <span className="text-emerald-400 font-bold">100% DISPATCHED</span>
          </div>
        </div>

        {/* Top Product Badge */}
        <div className="p-5 bg-[#0D111A] border-2 border-[#00F0FF] shadow-[4px_4px_0px_0px_#00F0FF]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-[#00F0FF] uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-[#00F0FF]" /> Top Inquired SaaS
            </span>
            <span className="px-1.5 py-0.5 bg-[#00F0FF]/20 text-[#00F0FF] text-[9px] font-black uppercase">
              LEADER
            </span>
          </div>
          <div className="text-lg font-black text-white truncate" title={analytics.topProduct}>
            {analytics.topProduct}
          </div>
          <div className="mt-2 text-[10px] text-slate-400 flex items-center justify-between">
            <span>Volume Share:</span>
            <span className="text-[#00F0FF] font-bold">
              {analytics.topProductCount} inquiries ({analytics.totalLeads > 0 ? Math.round((analytics.topProductCount / analytics.totalLeads) * 100) : 0}%)
            </span>
          </div>
        </div>

        {/* Lead Status Velocity */}
        <div className="p-5 bg-[#0D111A] border-2 border-[#1A2234] shadow-[4px_4px_0px_0px_#1A2234]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Conversion Pipeline
            </span>
            <Activity className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="grid grid-cols-3 gap-1 mt-2 text-center">
            <div className="p-1 bg-[#07090E] border border-amber-500/30">
              <div className="text-xs font-black text-amber-400">{analytics.statusCounts.NEW || 0}</div>
              <div className="text-[9px] text-slate-500">NEW</div>
            </div>
            <div className="p-1 bg-[#07090E] border border-cyan-500/30">
              <div className="text-xs font-black text-[#00F0FF]">{analytics.statusCounts.CONTACTED || 0}</div>
              <div className="text-[9px] text-slate-500">ENGAGED</div>
            </div>
            <div className="p-1 bg-[#07090E] border border-emerald-500/30">
              <div className="text-xs font-black text-emerald-400">{analytics.statusCounts.CLOSED || 0}</div>
              <div className="text-[9px] text-slate-500">CLOSED</div>
            </div>
          </div>
        </div>

        {/* Visitor Rating */}
        <div className="p-5 bg-[#0D111A] border-2 border-[#1A2234] shadow-[4px_4px_0px_0px_#1A2234]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Customer Satisfaction
            </span>
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <div className="text-3xl font-black text-amber-400">
              {feedbackStats.formattedRating}
            </div>
            <div className="text-xs text-slate-500 font-bold">/ 5.0</div>
          </div>
          <div className="mt-2 text-[10px] text-slate-400 flex items-center justify-between">
            <span>{feedbackStats.totalCount} ratings</span>
            <span className="text-emerald-400 font-bold">HIGH POSITIVE</span>
          </div>
        </div>
      </div>

      {/* Main Section: Product-wise Inquiry Breakdown (Visual Ranked Bar Chart) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Product Breakdown Chart (2 Cols) */}
        <div className="lg:col-span-2 p-6 bg-[#0D111A] border-2 border-[#1A2234] shadow-[6px_6px_0px_0px_#1A2234] space-y-6">
          <div className="flex items-center justify-between border-b border-[#1A2234] pb-4">
            <div>
              <span className="text-[11px] font-bold text-[#00F0FF] uppercase tracking-wider">
                [CATALOG_DEMAND_ANALYSIS]
              </span>
              <h2 className="text-lg font-black text-white uppercase mt-1">
                Product-wise Inquiry Volume & Share
              </h2>
            </div>
            <span className="text-xs text-slate-500 font-mono">
              RANKED BY INQUIRY DENSITY
            </span>
          </div>

          <div className="space-y-5">
            {analytics.productBreakdown.map((item, index) => {
              const isTop = index === 0;
              const barColors = [
                "bg-[#00F0FF]",
                "bg-[#8B5CF6]",
                "bg-emerald-400",
                "bg-amber-400",
                "bg-pink-400",
                "bg-indigo-400",
              ];
              const barColor = barColors[index % barColors.length];

              return (
                <div key={item.product} className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 flex items-center justify-center bg-[#07090E] border border-[#1A2234] text-[10px] font-bold text-slate-400">
                        #{index + 1}
                      </span>
                      <span className="font-bold text-white">{item.product}</span>
                      {isTop && (
                        <span className="px-1.5 py-0.5 bg-[#00F0FF]/20 text-[#00F0FF] text-[9px] font-black uppercase">
                          TOP INQUIRED
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-white font-bold">{item.count} leads</span>
                      <span className="text-slate-400 text-[11px] w-12 text-right">
                        {item.percentage}%
                      </span>
                    </div>
                  </div>

                  {/* Visual Progress Bar */}
                  <div className="h-3 bg-[#07090E] border border-[#1A2234] overflow-hidden p-0.5">
                    <div
                      className={`h-full ${barColor} transition-all duration-500 shadow-[0_0_10px_rgba(0,240,255,0.3)]`}
                      style={{ width: `${Math.max(5, item.percentage)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-[#1A2234] flex items-center justify-between text-xs text-slate-400">
            <span>Need full customer details for these inquiries?</span>
            <Link
              href="/admin/leads"
              className="text-[#00F0FF] hover:underline font-bold flex items-center gap-1 uppercase"
            >
              <span>[NAVIGATE TO LEADS DISPATCH]</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Right Column: Feedback Metrics & Rating Distribution */}
        <div className="p-6 bg-[#0D111A] border-2 border-[#1A2234] shadow-[6px_6px_0px_0px_#1A2234] space-y-6">
          <div className="border-b border-[#1A2234] pb-4">
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
              [VISITOR_SENTIMENT_BREAKDOWN]
            </span>
            <h2 className="text-lg font-black text-white uppercase mt-1">
              Feedback Telemetry
            </h2>
          </div>

          {/* Big Score Box */}
          <div className="p-4 bg-[#07090E] border border-[#1A2234] text-center space-y-2">
            <div className="text-5xl font-black text-amber-400">
              {feedbackStats.formattedRating}
            </div>
            <div className="flex justify-center text-amber-400">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`w-5 h-5 ${
                    s <= Math.round(feedbackStats.averageRating)
                      ? "fill-amber-400 text-amber-400"
                      : "text-slate-700"
                  }`}
                />
              ))}
            </div>
            <p className="text-[11px] text-slate-400">
              Based on {feedbackStats.totalCount} visitor assessments
            </p>
          </div>

          {/* Rating Bars */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Star Breakdown
            </span>
            {[5, 4, 3, 2, 1].map((star) => {
              const count = feedbackStats.ratingCounts[star] || 0;
              const pct =
                feedbackStats.totalCount > 0
                  ? Math.round((count / feedbackStats.totalCount) * 100)
                  : 0;

              return (
                <div key={star} className="flex items-center gap-2 text-xs">
                  <span className="w-10 text-slate-300 font-bold">{star} ★</span>
                  <div className="flex-grow h-2 bg-[#07090E] border border-[#1A2234] overflow-hidden">
                    <div
                      className="h-full bg-amber-400"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="w-12 text-right text-slate-400 text-[10px]">
                    {count} ({pct}%)
                  </span>
                </div>
              );
            })}
          </div>

          {/* Category Chips */}
          <div className="pt-2 border-t border-[#1A2234] space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Feedback Categories
            </span>
            <div className="space-y-1.5">
              {Object.entries(feedbackStats.categoryCounts).map(([cat, count]) => (
                <div
                  key={cat}
                  className="flex justify-between items-center text-xs p-2 bg-[#07090E] border border-[#1A2234]"
                >
                  <span className="text-slate-300 font-bold uppercase text-[10px]">
                    {cat}
                  </span>
                  <span className="text-white font-bold">{count} entries</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
