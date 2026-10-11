import { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import DeploySystemForm from "./DeploySystemForm";
import { ArrowLeft, Cpu, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Deploy New Enterprise System // Admin Matrix",
  description: "Provision a new verified software system codebase into the enterprise marketplace.",
};

export default async function NewSystemPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login?callbackUrl=/admin/systems/new");
  }

  const role = (session.user as any).role;
  if (role !== "ADMIN") {
    redirect("/admin");
  }

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 font-mono py-12 px-4 sm:px-6 relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #1A2234 1px, transparent 0)`,
          backgroundSize: "28px 28px",
        }}
      />

      <div className="max-w-4xl mx-auto space-y-6 relative z-10">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between border-b-2 border-[#1A2234] pb-4">
          <Link
            href="/admin"
            className="px-3.5 py-2 bg-[#0D111A] border-2 border-[#1A2234] hover:border-[#00F0FF] text-slate-300 hover:text-white transition-all text-xs font-bold uppercase flex items-center gap-2 shadow-[2px_2px_0px_#000]"
          >
            <ArrowLeft className="w-4 h-4 text-[#00F0FF]" />
            <span>[BACK_TO_CONTROL_ROOM]</span>
          </Link>

          <div className="flex items-center gap-2 text-[10px] text-slate-500 uppercase">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
            <span>CLEARANCE: ROOT_ADMIN (LEVEL_0)</span>
          </div>
        </div>

        {/* Header Block */}
        <div className="bg-[#0D111A] border-2 border-[#00F0FF] p-6 shadow-[6px_6px_0px_#00F0FF] flex items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[#00F0FF] text-xs font-bold uppercase">
              <Cpu className="w-4 h-4" />
              <span>[NEXUS.OS // ARCHITECTURE_PROVISIONING]</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              DEPLOY NEW SYSTEM CODEBASE
            </h1>
            <p className="text-xs text-slate-400">
              Publish an audited production-ready codebase to PostgreSQL. Immediately updates catalog upon submission.
            </p>
          </div>
          <ShieldCheck className="w-12 h-12 text-[#00F0FF] hidden sm:block shrink-0" />
        </div>

        {/* Interactive Deployment Form */}
        <DeploySystemForm />
      </div>
    </div>
  );
}
