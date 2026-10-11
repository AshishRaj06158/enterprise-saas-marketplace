"use client";

import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User, LogOut, Shield, ShieldCheck, Key, Lock } from "lucide-react";

export default function NavAuthBadge() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="h-9 px-3 bg-[#0D111A] border-2 border-[#1A2234] flex items-center gap-2 font-mono text-[11px] text-slate-500 animate-pulse">
        <Lock className="w-3 h-3 text-slate-600" />
        <span>[AUTH_SYNC...]</span>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <Link
        href="/auth/login"
        className="px-3 py-1.5 rounded-none text-xs font-bold font-mono tracking-wider text-slate-300 bg-[#0D111A] border-2 border-[#1A2234] hover:border-[#00F0FF] hover:text-[#00F0FF] shadow-[2px_2px_0px_#1A2234] hover:shadow-[3px_3px_0px_#00F0FF] active:translate-x-[1px] active:translate-y-[1px] transition-all flex items-center space-x-1.5 min-h-[36px] uppercase"
      >
        <Lock className="w-3 h-3 text-[#00F0FF]" />
        <span>[AUTHENTICATE // LOGIN]</span>
      </Link>
    );
  }

  const role = (session.user as any).role || "CLIENT";
  const userName =
    session.user.name ||
    (session.user.email ? session.user.email.split("@")[0].toUpperCase() : "USER");

  return (
    <div className="flex items-center gap-1.5 font-mono text-xs">
      {/* User Info Badge & Portal Link */}
      <Link
        href="/portal"
        className="px-2.5 py-1.5 bg-[#0D111A] border-2 border-[#00F0FF] text-slate-200 hover:text-white hover:bg-[#00F0FF]/10 shadow-[2px_2px_0px_#00F0FF] active:translate-x-[1px] active:translate-y-[1px] transition-all flex items-center gap-1.5 min-h-[36px]"
        title={`Authenticated: ${session.user.email} (${role})`}
      >
        <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse shrink-0" />
        <span className="text-[#00F0FF] font-bold text-[10px] tracking-wider uppercase">
          [ID: {userName} // {role}]
        </span>
      </Link>

      {/* Admin Link if role is ADMIN */}
      {role === "ADMIN" && (
        <Link
          href="/admin"
          className="px-2 py-1.5 bg-[#EF4444] text-white border-2 border-black font-bold text-[10px] hover:bg-red-600 transition-all shadow-[2px_2px_0px_#000] flex items-center gap-1 min-h-[36px]"
          title="Root Admin Matrix"
        >
          <Shield className="w-3 h-3" />
          <span>ADMIN</span>
        </Link>
      )}

      {/* Sign Out Button */}
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="p-1.5 bg-[#07090E] border-2 border-[#1A2234] text-slate-400 hover:text-[#EF4444] hover:border-[#EF4444] transition-all min-h-[36px] min-w-[36px] flex items-center justify-center cursor-pointer"
        title="Sign Out Session"
        aria-label="Logout"
      >
        <LogOut className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
