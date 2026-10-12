"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Users,
  TrendingUp,
  Star,
  MessageSquare,
  Phone,
  Mail,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Filter,
  Search,
  RefreshCw,
  ExternalLink,
  Sparkles,
  BarChart3,
  Layers,
  ArrowLeft,
  ChevronRight,
  Send,
  AlertCircle,
} from "lucide-react";
import { updateLeadStatusAction } from "@/app/admin/actions";
import { LeadRecord, FeedbackRecord } from "@/lib/leads-feedback-service";

interface LeadsDashboardClientProps {
  initialLeads: LeadRecord[];
  initialAnalytics: {
    totalLeads: number;
    topProduct: string;
    topProductCount: number;
    statusCounts: Record<string, number>;
    productBreakdown: { product: string; count: number; percentage: number }[];
  };
  initialFeedbacks: FeedbackRecord[];
  initialFeedbackStats: {
    totalCount: number;
    averageRating: number;
    formattedRating: string;
    ratingCounts: Record<number, number>;
    categoryCounts: Record<string, number>;
  };
  user: {
    name?: string | null;
    email?: string | null;
    role?: string;
  };
}

export default function LeadsDashboardClient({
  initialLeads,
  initialAnalytics,
  initialFeedbacks,
  initialFeedbackStats,
  user,
}: LeadsDashboardClientProps) {
  const [leads, setLeads] = useState<LeadRecord[]>(initialLeads);
  const [analytics, setAnalytics] = useState(initialAnalytics);
  const [feedbacks, setFeedbacks] = useState<FeedbackRecord[]>(initialFeedbacks);
  const [feedbackStats, setFeedbackStats] = useState(initialFeedbackStats);

  const [activeTab, setActiveTab] = useState<"leads" | "feedback">("leads");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "NEW" | "CONTACTED" | "CLOSED">("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedLead, setSelectedLead] = useState<LeadRecord | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Status toggle handler
  const handleStatusChange = async (leadId: string, newStatus: "NEW" | "CONTACTED" | "CLOSED") => {
    setUpdatingId(leadId);
    try {
      // Optimistic update
      setLeads((prev) =>
        prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
      );

      const res = await updateLeadStatusAction(leadId, newStatus);
      if (res.success) {
        showToast(`LEAD [${leadId.slice(0, 8)}] STATUS RECONFIGURED TO ${newStatus}`);
      } else {
        showToast(`ERROR: ${res.error || "Failed to update lead status"}`);
      }
    } catch (err) {
      showToast("FAILED TO SYNC WITH DISPATCH MATRIX");
    } finally {
      setUpdatingId(null);
    }
  };

  // Cycle status: NEW -> CONTACTED -> CLOSED -> NEW
  const cycleStatus = (lead: LeadRecord) => {
    const nextStatus =
      lead.status === "NEW"
        ? "CONTACTED"
        : lead.status === "CONTACTED"
        ? "CLOSED"
        : "NEW";
    handleStatusChange(lead.id, nextStatus);
  };

  // Clean phone and generate WhatsApp URL
  const getWhatsAppLink = (lead: LeadRecord) => {
    const phone = lead.phone || "";
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    const targetPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
    const msg = `Hello ${lead.name}, thank you for inquiring about ${lead.productName} on NEXUS Labs. How can we assist your technical architecture team today?`;
    return `https://wa.me/${targetPhone}?text=${encodeURIComponent(msg)}`;
  };

  // Filtered Leads
  const filteredLeads = leads.filter((lead) => {
    const matchesStatus = statusFilter === "ALL" || lead.status === statusFilter;
    const matchesSearch =
      !searchQuery ||
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.company && lead.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (lead.phone && lead.phone.includes(searchQuery));

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-8 font-mono">
      {/* Top Header & Cyber Breadcrumbs */}
      <div className="p-6 bg-[#0D111A] border-2 border-[#00F0FF] shadow-[6px_6px_0px_0px_#00F0FF] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F0FF] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00F0FF]" />
            </span>
            <span className="text-xs font-black text-[#00F0FF] uppercase tracking-wider">
              [DISPATCH_MATRIX // LEADS & VISITOR INTELLIGENCE]
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            Client Inquiries & Feedback Telemetry
          </h1>
          <p className="text-xs text-slate-400">
            Real-time advisory leads pipeline, WhatsApp 1-click dispatch, and customer sentiment analytics.
          </p>
        </div>

        {/* Global Admin Navigation Links */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/admin"
            className="px-3.5 py-2 bg-[#07090E] hover:bg-[#1A2234] text-slate-300 hover:text-white border border-[#1A2234] text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>[MAIN_ADMIN]</span>
          </Link>
          <Link
            href="/admin/analytics"
            className="px-3.5 py-2 bg-[#0D111A] hover:bg-[#07090E] text-[#8B5CF6] hover:text-white border-2 border-[#8B5CF6] shadow-[3px_3px_0px_0px_#8B5CF6] text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 transition-all"
          >
            <BarChart3 className="w-3.5 h-3.5 text-[#8B5CF6]" />
            <span>[ANALYTICS_VIEW]</span>
          </Link>
        </div>
      </div>

      {/* Toast Alert */}
      {toastMessage && (
        <div className="p-3 bg-emerald-950/60 border-2 border-emerald-400 text-emerald-300 text-xs flex items-center space-x-2 shadow-[4px_4px_0px_0px_#10B981] animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top 4 Analytics & Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Leads */}
        <div className="p-5 bg-[#0D111A] border-2 border-[#1A2234] hover:border-[#00F0FF] transition-all shadow-[4px_4px_0px_0px_#1A2234]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Total Inquiries
            </span>
            <Users className="w-4 h-4 text-[#00F0FF]" />
          </div>
          <div className="text-3xl font-black text-white">{analytics.totalLeads}</div>
          <div className="mt-2 flex items-center gap-2 text-[10px] text-slate-400">
            <span className="px-1.5 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">
              {analytics.statusCounts.NEW || 0} NEW
            </span>
            <span className="px-1.5 py-0.5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
              {analytics.statusCounts.CONTACTED || 0} ACTIVE
            </span>
          </div>
        </div>

        {/* Card 2: Top Inquired Product Badge */}
        <div className="p-5 bg-[#0D111A] border-2 border-[#00F0FF]/60 hover:border-[#00F0FF] transition-all shadow-[4px_4px_0px_0px_#00F0FF]/30 relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-[#00F0FF] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#00F0FF]" /> Top Inquired SaaS
            </span>
            <span className="px-1.5 py-0.5 bg-[#00F0FF]/20 text-[#00F0FF] text-[10px] font-black uppercase">
              #1 POPULAR
            </span>
          </div>
          <div className="text-lg font-black text-white truncate" title={analytics.topProduct}>
            {analytics.topProduct}
          </div>
          <div className="mt-2 text-[10px] text-slate-400 flex items-center justify-between">
            <span>Inquiry Volume:</span>
            <span className="text-[#00F0FF] font-bold">
              {analytics.topProductCount} inquiries ({analytics.totalLeads > 0 ? Math.round((analytics.topProductCount / analytics.totalLeads) * 100) : 0}%)
            </span>
          </div>
        </div>

        {/* Card 3: Product-wise Breakdown Summary */}
        <div className="p-5 bg-[#0D111A] border-2 border-[#1A2234] hover:border-[#8B5CF6] transition-all shadow-[4px_4px_0px_0px_#1A2234]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Catalog Demand Split
            </span>
            <TrendingUp className="w-4 h-4 text-[#8B5CF6]" />
          </div>
          <div className="space-y-1.5 mt-1">
            {analytics.productBreakdown.slice(0, 2).map((item, idx) => (
              <div key={idx} className="space-y-0.5">
                <div className="flex justify-between text-[10px]">
                  <span className="text-slate-300 truncate max-w-[150px]">{item.product}</span>
                  <span className="text-white font-bold">{item.count}</span>
                </div>
                <div className="h-1 bg-[#07090E] overflow-hidden">
                  <div
                    className="h-full bg-[#8B5CF6]"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <Link
            href="/admin/analytics"
            className="mt-2.5 inline-flex items-center gap-1 text-[10px] text-[#8B5CF6] hover:underline uppercase"
          >
            <span>[VIEW FULL RANKED BREAKDOWN]</span>
            <ChevronRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Card 4: Average Visitor Feedback */}
        <div className="p-5 bg-[#0D111A] border-2 border-[#1A2234] hover:border-emerald-400 transition-all shadow-[4px_4px_0px_0px_#1A2234]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Visitor Feedback Rating
            </span>
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <div className="text-3xl font-black text-amber-400">
              {feedbackStats.formattedRating}
            </div>
            <div className="text-xs text-slate-500 font-bold">/ 5.0</div>
          </div>
          <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
            <span>{feedbackStats.totalCount} ratings logged</span>
            <span className="text-emerald-400 font-bold">
              {feedbackStats.ratingCounts[5] || 0} 5-Star reviews
            </span>
          </div>
        </div>
      </div>

      {/* Tabs Switcher: Leads Management vs Visitor Feedback */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-[#1A2234] pb-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab("leads")}
            className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-2 transition-all cursor-pointer flex items-center space-x-2 ${
              activeTab === "leads"
                ? "bg-[#00F0FF] text-black border-[#00F0FF] shadow-[4px_4px_0px_0px_#00F0FF]"
                : "bg-[#0D111A] text-slate-300 border-[#1A2234] hover:border-[#00F0FF]"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>[LEADS_MANAGEMENT_TABLE ({leads.length})]</span>
          </button>

          <button
            onClick={() => setActiveTab("feedback")}
            className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-2 transition-all cursor-pointer flex items-center space-x-2 ${
              activeTab === "feedback"
                ? "bg-amber-400 text-black border-amber-400 shadow-[4px_4px_0px_0px_#f59e0b]"
                : "bg-[#0D111A] text-slate-300 border-[#1A2234] hover:border-amber-400"
            }`}
          >
            <Star className="w-3.5 h-3.5" />
            <span>[VISITOR_FEEDBACK_FEED ({feedbacks.length})]</span>
          </button>
        </div>

        {activeTab === "leads" && (
          <div className="flex flex-wrap items-center gap-2">
            {/* Status Filter Buttons */}
            {(["ALL", "NEW", "CONTACTED", "CLOSED"] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider border transition-all ${
                  statusFilter === st
                    ? "bg-white text-black border-white shadow-[2px_2px_0px_#000]"
                    : "bg-[#07090E] text-slate-400 border-[#1A2234] hover:text-white"
                }`}
              >
                {st}
              </button>
            ))}

            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="SEARCH_LEADS..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-7 pr-3 py-1 bg-[#07090E] border border-[#1A2234] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00F0FF] w-40 sm:w-56"
              />
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2 top-2" />
            </div>
          </div>
        )}
      </div>

      {/* TAB 1: Leads Management Table */}
      {activeTab === "leads" && (
        <div className="space-y-4">
          <div className="bg-[#0D111A] border-2 border-[#1A2234] shadow-[6px_6px_0px_0px_#1A2234] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                  <tr className="border-b-2 border-[#1A2234] bg-[#07090E] text-[11px] text-slate-400 uppercase tracking-wider">
                    <th className="p-3.5 font-bold">DATE</th>
                    <th className="p-3.5 font-bold">PRODUCT INQUIRED</th>
                    <th className="p-3.5 font-bold">CLIENT IDENTITY</th>
                    <th className="p-3.5 font-bold">PHONE / WHATSAPP</th>
                    <th className="p-3.5 font-bold">REQUIREMENT BRIEF</th>
                    <th className="p-3.5 font-bold">STATUS</th>
                    <th className="p-3.5 font-bold text-right">DISPATCH ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1A2234] text-xs">
                  {filteredLeads.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-slate-500 font-bold uppercase">
                        No inquiry telemetry found matching filter criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredLeads.map((lead) => {
                      const dateObj = new Date(lead.createdAt);
                      const formattedDate = dateObj.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      });

                      const statusColors = {
                        NEW: "bg-amber-500/10 text-amber-400 border-amber-500/30",
                        CONTACTED: "bg-cyan-500/10 text-[#00F0FF] border-cyan-500/30",
                        CLOSED: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
                      };

                      return (
                        <tr
                          key={lead.id}
                          className="hover:bg-[#121722] transition-colors group"
                        >
                          {/* Date */}
                          <td className="p-3.5 whitespace-nowrap text-slate-400 font-mono text-[11px]">
                            {formattedDate}
                          </td>

                          {/* Product */}
                          <td className="p-3.5">
                            <span className="px-2 py-0.5 bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/30 font-bold text-[11px] inline-block max-w-[200px] truncate" title={lead.productName}>
                              {lead.productName}
                            </span>
                          </td>

                          {/* Client */}
                          <td className="p-3.5">
                            <div className="font-bold text-white">{lead.name}</div>
                            {lead.company && (
                              <div className="text-[10px] text-slate-400">{lead.company}</div>
                            )}
                            <a
                              href={`mailto:${lead.email}`}
                              className="text-[10px] text-slate-400 hover:text-[#00F0FF] flex items-center gap-1 mt-0.5"
                            >
                              <Mail className="w-2.5 h-2.5" />
                              <span className="truncate max-w-[140px]">{lead.email}</span>
                            </a>
                          </td>

                          {/* Phone / WhatsApp */}
                          <td className="p-3.5 whitespace-nowrap">
                            {lead.phone ? (
                              <div className="flex items-center gap-1.5 text-slate-300 font-mono text-[11px]">
                                <Phone className="w-3 h-3 text-[#00F0FF]" />
                                <span>{lead.phone}</span>
                              </div>
                            ) : (
                              <span className="text-slate-600 text-[10px]">NOT_PROVIDED</span>
                            )}
                          </td>

                          {/* Message Brief */}
                          <td className="p-3.5 max-w-[240px]">
                            <p
                              className="text-slate-300 text-[11px] truncate cursor-pointer hover:text-white"
                              onClick={() => setSelectedLead(lead)}
                              title="Click to view full message"
                            >
                              {lead.message}
                            </p>
                            {lead.budget && (
                              <span className="text-[10px] text-slate-500 block mt-0.5">
                                Budget: {lead.budget}
                              </span>
                            )}
                          </td>

                          {/* Status */}
                          <td className="p-3.5 whitespace-nowrap">
                            <button
                              onClick={() => cycleStatus(lead)}
                              disabled={updatingId === lead.id}
                              title="Click to toggle status (NEW -> CONTACTED -> CLOSED)"
                              className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-wider border flex items-center gap-1 transition-all hover:scale-105 ${statusColors[lead.status]}`}
                            >
                              {updatingId === lead.id ? (
                                <RefreshCw className="w-3 h-3 animate-spin" />
                              ) : null}
                              <span>{lead.status}</span>
                            </button>
                          </td>

                          {/* Actions */}
                          <td className="p-3.5 whitespace-nowrap text-right">
                            <div className="flex items-center justify-end gap-2">
                              {/* WhatsApp Quick Reply */}
                              {lead.phone ? (
                                <a
                                  href={getWhatsAppLink(lead)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-2.5 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-black font-black text-[11px] uppercase tracking-wider flex items-center gap-1 shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] transition-all"
                                  title="Quick Reply via WhatsApp"
                                >
                                  <Send className="w-3 h-3" />
                                  <span>WHATSAPP</span>
                                </a>
                              ) : (
                                <button
                                  disabled
                                  className="px-2.5 py-1.5 bg-[#1A2234] text-slate-600 font-bold text-[11px] uppercase tracking-wider cursor-not-allowed"
                                >
                                  NO_PHONE
                                </button>
                              )}

                              {/* Status Selector Dropdown */}
                              <select
                                value={lead.status}
                                onChange={(e) =>
                                  handleStatusChange(
                                    lead.id,
                                    e.target.value as "NEW" | "CONTACTED" | "CLOSED"
                                  )
                                }
                                disabled={updatingId === lead.id}
                                className="px-2 py-1 bg-[#07090E] border border-[#1A2234] text-slate-300 text-[10px] uppercase font-bold focus:outline-none focus:border-[#00F0FF]"
                              >
                                <option value="NEW">NEW</option>
                                <option value="CONTACTED">CONTACTED</option>
                                <option value="CLOSED">CLOSED</option>
                              </select>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Feedback Section */}
      {activeTab === "feedback" && (
        <div className="space-y-6">
          {/* Feedback Sentiment Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 bg-[#0D111A] border-2 border-amber-400/40 shadow-[4px_4px_0px_0px_#f59e0b]/20">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Overall Average Score
              </span>
              <div className="flex items-center gap-3 mt-2">
                <div className="text-4xl font-black text-amber-400">
                  {feedbackStats.formattedRating}
                </div>
                <div className="flex text-amber-400">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-4 h-4 ${
                        s <= Math.round(feedbackStats.averageRating)
                          ? "fill-amber-400 text-amber-400"
                          : "text-slate-600"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-[10px] text-slate-500 mt-2 font-mono">
                Computed across {feedbackStats.totalCount} active visitor submissions
              </p>
            </div>

            {/* Star Distribution */}
            <div className="p-5 bg-[#0D111A] border-2 border-[#1A2234] space-y-1.5 shadow-[4px_4px_0px_0px_#1A2234]">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Star Rating Breakdown
              </span>
              {[5, 4, 3, 2, 1].map((r) => {
                const count = feedbackStats.ratingCounts[r] || 0;
                const pct =
                  feedbackStats.totalCount > 0
                    ? Math.round((count / feedbackStats.totalCount) * 100)
                    : 0;
                return (
                  <div key={r} className="flex items-center gap-2 text-[10px]">
                    <span className="w-8 font-bold text-slate-300">{r} ★</span>
                    <div className="flex-grow h-1.5 bg-[#07090E] overflow-hidden">
                      <div
                        className="h-full bg-amber-400"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="w-8 text-right text-slate-400">{count}</span>
                  </div>
                );
              })}
            </div>

            {/* Categories Breakdown */}
            <div className="p-5 bg-[#0D111A] border-2 border-[#1A2234] shadow-[4px_4px_0px_0px_#1A2234]">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Feedback Categories
              </span>
              <div className="space-y-2 mt-2">
                {Object.entries(feedbackStats.categoryCounts).map(([cat, count]) => (
                  <div key={cat} className="flex justify-between items-center text-xs">
                    <span className="px-2 py-0.5 bg-[#1A2234] text-slate-200 border border-slate-700 font-bold text-[10px] uppercase">
                      {cat}
                    </span>
                    <span className="text-white font-bold">{count} entries</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Feedbacks Stream Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {feedbacks.length === 0 ? (
              <div className="col-span-2 p-8 text-center text-slate-500 font-bold uppercase bg-[#0D111A] border border-[#1A2234]">
                No visitor feedback logged yet.
              </div>
            ) : (
              feedbacks.map((fb) => (
                <div
                  key={fb.id}
                  className="p-5 bg-[#0D111A] border-2 border-[#1A2234] hover:border-amber-400 transition-all shadow-[4px_4px_0px_0px_#1A2234] space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map((st) => (
                        <Star
                          key={st}
                          className={`w-3.5 h-3.5 ${
                            st <= fb.rating
                              ? "fill-amber-400 text-amber-400"
                              : "text-slate-700"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="px-2 py-0.5 bg-amber-400/10 text-amber-400 border border-amber-400/30 text-[10px] font-bold uppercase">
                      [{fb.category}]
                    </span>
                  </div>

                  <p className="text-xs text-slate-200 leading-relaxed font-sans">
                    &ldquo;{fb.comment}&rdquo;
                  </p>

                  <div className="pt-2 border-t border-[#1A2234] flex items-center justify-between text-[10px] text-slate-500 font-mono">
                    <span>
                      {fb.userEmail ? (
                        <span className="text-[#00F0FF]">{fb.userEmail}</span>
                      ) : (
                        "Anonymous Visitor"
                      )}
                    </span>
                    <span>
                      {new Date(fb.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Message Inspection Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="max-w-lg w-full bg-[#0D111A] border-2 border-[#00F0FF] shadow-[8px_8px_0px_0px_#00F0FF] p-6 space-y-4 font-mono">
            <div className="flex items-center justify-between border-b border-[#1A2234] pb-3">
              <span className="text-xs font-black text-[#00F0FF] uppercase tracking-wider">
                [INQUIRY_TELEMETRY // {selectedLead.id}]
              </span>
              <button
                onClick={() => setSelectedLead(null)}
                className="text-slate-400 hover:text-white text-sm font-bold"
              >
                [ESC_CLOSE]
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">CLIENT:</span>
                <span className="text-white font-bold">{selectedLead.name}</span>
              </div>
              {selectedLead.company && (
                <div className="flex justify-between">
                  <span className="text-slate-500">ORGANIZATION:</span>
                  <span className="text-slate-300">{selectedLead.company}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-slate-500">PRODUCT INQUIRED:</span>
                <span className="text-[#00F0FF] font-bold">{selectedLead.productName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">EMAIL:</span>
                <span className="text-slate-300">{selectedLead.email}</span>
              </div>
              {selectedLead.phone && (
                <div className="flex justify-between">
                  <span className="text-slate-500">PHONE:</span>
                  <span className="text-slate-300">{selectedLead.phone}</span>
                </div>
              )}
              {selectedLead.budget && (
                <div className="flex justify-between">
                  <span className="text-slate-500">BUDGET TIER:</span>
                  <span className="text-amber-400 font-bold">{selectedLead.budget}</span>
                </div>
              )}
            </div>

            <div className="p-3 bg-[#07090E] border border-[#1A2234] space-y-1">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">
                FULL INQUIRY MESSAGE:
              </span>
              <p className="text-xs text-slate-200 whitespace-pre-wrap leading-relaxed font-sans">
                {selectedLead.message}
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              {selectedLead.phone && (
                <a
                  href={getWhatsAppLink(selectedLead)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 text-center bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs uppercase tracking-wider"
                >
                  [DISPATCH WHATSAPP]
                </a>
              )}
              <button
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 bg-[#07090E] border border-[#1A2234] text-slate-300 hover:text-white text-xs uppercase"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
