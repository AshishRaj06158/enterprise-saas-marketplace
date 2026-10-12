import { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import {
  getLeadAnalytics,
  getFeedbackStats,
  getAllFeedbacks,
  getAllLeads,
} from "@/lib/leads-feedback-service";
import ProductAnalyticsClient from "./ProductAnalyticsClient";
import { ShieldAlert, ArrowLeft } from "lucide-react";

import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Admin Product Analytics & Marketplace Demand // NEXUS Systems",
  description: "Product-wise inquiry volumes, top requested systems, conversion velocity, and visitor satisfaction metrics.",
};

export default async function AdminAnalyticsPage({
  searchParams,
}: {
  searchParams?: Promise<{ secret?: string }>;
}) {
  const session = await auth();
  const params = await searchParams;
  const cookieStore = await cookies();

  const configuredSecret = process.env.ADMIN_SECRET || "NexusAdmin@2026";
  const isSecretAuth =
    (params?.secret && params.secret === configuredSecret) ||
    cookieStore.get("admin_secret")?.value === configuredSecret;

  const userRole = (session?.user as any)?.role;
  const isAdmin = userRole === "ADMIN" || isSecretAuth;

  // Authentication check
  if (!isAdmin && !session?.user) {
    redirect("/auth/login?callbackUrl=/admin/analytics");
  }

  // Enforce ADMIN role check
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#07090E] text-slate-100 flex items-center justify-center p-6 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #1A2234 1px, transparent 0)`,
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative z-10 max-w-lg w-full bg-[#0D111A] border-2 border-[#EF4444] p-8 shadow-[6px_6px_0px_#EF4444]">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#1A2234]">
            <ShieldAlert className="w-8 h-8 text-[#EF4444] animate-pulse" />
            <div>
              <div className="text-[10px] font-mono tracking-widest text-[#EF4444] uppercase font-bold">
                [SECURITY_CLEARANCE_VIOLATION]
              </div>
              <h1 className="text-xl font-bold font-mono tracking-wider text-slate-100 uppercase">
                ACCESS_DENIED // 0x403
              </h1>
            </div>
          </div>

          <div className="space-y-4 mb-8 font-mono text-xs text-slate-300">
            <div className="bg-[#07090E] border border-[#1A2234] p-3 space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">AUTHENTICATED_IDENTITY:</span>
                <span className="text-[#00F0FF]">{session?.user?.email || "UNAUTHENTICATED"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">ASSIGNED_ROLE:</span>
                <span className="text-yellow-400 font-bold">{userRole || "CLIENT"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">REQUIRED_CLEARANCE:</span>
                <span className="text-[#EF4444] font-bold">ADMIN (LEVEL_0)</span>
              </div>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Access to marketplace analytics, demand distribution, and telemetry intelligence is restricted to Root Administrator clearance.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 font-mono text-xs font-bold uppercase">
            <Link
              href="/portal"
              className="flex-1 text-center py-3 px-4 bg-[#00F0FF] text-[#07090E] hover:bg-[#38bdf8] transition-all shadow-[3px_3px_0px_#000]"
            >
              [OPEN_CLIENT_PORTAL]
            </Link>
            <Link
              href="/"
              className="flex items-center justify-center gap-1.5 py-3 px-4 bg-[#07090E] border-2 border-[#1A2234] text-slate-300 hover:text-white transition-all shadow-[3px_3px_0px_#000]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              [BASE]
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Fetch analytics data in parallel
  const [analytics, feedbackStats, feedbacks, leads] = await Promise.all([
    getLeadAnalytics(),
    getFeedbackStats(),
    getAllFeedbacks(),
    getAllLeads(),
  ]);

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <ProductAnalyticsClient
          analytics={analytics}
          feedbackStats={feedbackStats}
          feedbacks={feedbacks}
          leads={leads}
        />
      </div>
    </div>
  );
}
