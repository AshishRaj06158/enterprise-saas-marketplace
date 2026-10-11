import { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { getAdminSystems } from "@/lib/systems-service";
import AdminControlClient from "./AdminControlClient";
import { ShieldAlert, ArrowLeft, Terminal, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Admin Command Matrix // Enterprise Control Room",
  description: "Enterprise SaaS administration, live systems management, and license minting console.",
};

export default async function AdminPage() {
  const session = await auth();

  // Redirect to login if not authenticated
  if (!session?.user) {
    redirect("/auth/login?callbackUrl=/admin");
  }

  const userRole = (session.user as any).role;

  // Enforce ADMIN role check
  if (userRole !== "ADMIN") {
    return (
      <div className="min-h-screen bg-[#07090E] text-slate-100 flex items-center justify-center p-6 relative overflow-hidden">
        {/* Cyber grid background */}
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
                <span className="text-[#00F0FF]">{session.user.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">ASSIGNED_ROLE:</span>
                <span className="text-yellow-400 font-bold">{userRole || "CLIENT"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">REQUIRED_CLEARANCE:</span>
                <span className="text-[#EF4444] font-bold">ADMIN (LEVEL_0)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">SECURITY_ACTION:</span>
                <span className="text-[#EF4444]">PORTAL_REDIRECT_RECOMMENDED</span>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed text-[11px]">
              This control matrix requires Root Administrator privileges. Your account is registered under standard client clearance. Proceed to the Client Portal to access your licensed software source distributions.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 font-mono text-xs font-bold uppercase">
            <Link
              href="/portal"
              className="flex-1 text-center py-3 px-4 bg-[#00F0FF] text-[#07090E] hover:bg-[#38bdf8] transition-all shadow-[3px_3px_0px_#000] active:translate-x-[1px] active:translate-y-[1px]"
            >
              [OPEN_CLIENT_PORTAL]
            </Link>
            <Link
              href="/"
              className="flex items-center justify-center gap-1.5 py-3 px-4 bg-[#07090E] border-2 border-[#1A2234] text-slate-300 hover:text-white hover:border-slate-500 transition-all shadow-[3px_3px_0px_#000]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              [BASE]
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Load systems for admin console
  const systems = await getAdminSystems();

  return (
    <AdminControlClient
      initialSystems={systems}
      user={{
        name: session.user.name,
        email: session.user.email,
        role: userRole,
      }}
    />
  );
}
