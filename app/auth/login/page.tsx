"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import {
  Lock,
  ShieldCheck,
  Cpu,
  ArrowRight,
  AlertTriangle,
  UserCheck,
  Key,
  Home,
  CheckCircle2,
  Sparkles,
  Terminal,
} from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/portal";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const res = await signIn("credentials", {
        email: email.trim().toLowerCase(),
        password,
        redirect: false,
      });

      if (res?.error) {
        setErrorMessage("AUTHENTICATION_FAILED: Invalid credentials or unverified node.");
        setIsLoading(false);
        return;
      }

      setSuccessMessage("CLEARANCE_GRANTED // INITIALIZING SESSION STREAM...");
      
      // Determine destination based on email role
      const isTargetAdmin = email.trim().toLowerCase().includes("admin");
      const targetRoute = isTargetAdmin ? "/admin" : callbackUrl;

      setTimeout(() => {
        router.push(targetRoute);
        router.refresh();
      }, 700);
    } catch (err: any) {
      setErrorMessage("SYSTEM_DESYNC: Network communication error.");
      setIsLoading(false);
    }
  };

  const loadDemoAdmin = () => {
    setEmail("admin@nexus.enterprise");
    setPassword("CyberNexus@2026");
    setErrorMessage("");
  };

  const loadDemoClient = () => {
    setEmail("client@enterprise.io");
    setPassword("CyberNexus@2026");
    setErrorMessage("");
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 sm:p-8 bg-[#0D111A] border-2 border-[#00F0FF] shadow-[8px_8px_0px_0px_#00F0FF] font-mono relative z-10 text-slate-100">
      {/* Terminal Header */}
      <div className="flex items-center justify-between border-b-2 border-[#1A2234] pb-4 mb-6">
        <div className="flex items-center space-x-2">
          <Cpu className="w-5 h-5 text-[#00F0FF]" />
          <span className="text-xs font-black text-[#00F0FF] uppercase tracking-wider">
            [NEXUS.OS // AUTH_GATEWAY]
          </span>
        </div>
        <span className="text-[10px] px-2 py-0.5 bg-[#07090E] text-emerald-400 border border-emerald-400 font-bold uppercase">
          SECURE TLS 1.3
        </span>
      </div>

      {/* Headline */}
      <div className="space-y-2 mb-6">
        <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
          Security Clearance
        </h1>
        <p className="text-xs text-[#94A3B8] leading-relaxed">
          Provide cryptographic identity credentials to decrypt access to your client portal or enterprise control room.
        </p>
      </div>

      {/* Quick Load Demo Pills */}
      <div className="space-y-2 mb-6 p-3 bg-[#07090E] border-2 border-[#1A2234]">
        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center space-x-1.5">
          <Terminal className="w-3.5 h-3.5 text-[#00F0FF]" />
          <span>[FAST-LOAD DEMO CREDENTIALS]:</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={loadDemoAdmin}
            className="py-2 px-2.5 bg-[#0D111A] hover:bg-[#00F0FF] text-slate-200 hover:text-black border border-[#00F0FF] text-[10px] font-bold uppercase tracking-wider transition-all text-center flex items-center justify-center space-x-1 active:translate-x-[1px] active:translate-y-[1px]"
          >
            <Sparkles className="w-3 h-3 text-[#00F0FF] group-hover:text-black" />
            <span>[LOAD DEMO ADMIN]</span>
          </button>
          <button
            type="button"
            onClick={loadDemoClient}
            className="py-2 px-2.5 bg-[#0D111A] hover:bg-[#8B5CF6] text-slate-200 hover:text-black border border-[#8B5CF6] text-[10px] font-bold uppercase tracking-wider transition-all text-center flex items-center justify-center space-x-1 active:translate-x-[1px] active:translate-y-[1px]"
          >
            <UserCheck className="w-3 h-3 text-[#8B5CF6]" />
            <span>[LOAD DEMO CLIENT]</span>
          </button>
        </div>
      </div>

      {/* Error / Success Alerts */}
      {errorMessage && (
        <div className="mb-4 p-3 bg-red-950/40 border-2 border-[#EF4444] text-[#EF4444] text-xs flex items-center space-x-2">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {successMessage && (
        <div className="mb-4 p-3 bg-emerald-950/40 border-2 border-emerald-400 text-emerald-400 text-xs flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-[11px] uppercase tracking-wider text-slate-300 font-bold mb-1.5">
            [OPERATOR_EMAIL]:
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@nexus.enterprise"
            className="w-full bg-[#07090E] border-2 border-[#1A2234] focus:border-[#00F0FF] p-3 text-xs text-white uppercase tracking-wider outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-[11px] uppercase tracking-wider text-slate-300 font-bold mb-1.5">
            [ACCESS_PASSPHRASE]:
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
            className="w-full bg-[#07090E] border-2 border-[#1A2234] focus:border-[#00F0FF] p-3 text-xs text-white outline-none transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 px-4 bg-[#00F0FF] hover:bg-white text-black font-black text-xs uppercase tracking-wider border-2 border-[#00F0FF] shadow-[4px_4px_0px_0px_#8B5CF6] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#8B5CF6] transition-all flex items-center justify-center space-x-2 min-h-[46px] cursor-pointer disabled:opacity-50 mt-2"
        >
          {isLoading ? (
            <span>[DECRYPTING IDENTITY TOKEN...]</span>
          ) : (
            <>
              <span>[AUTHENTICATE // ACCESS PORTAL]</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Footer Navigation Links */}
      <div className="pt-6 mt-6 border-t border-[#1A2234] flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-3">
        <Link
          href="/auth/register"
          className="text-[#8B5CF6] hover:text-white transition-colors"
        >
          &gt; Register Client Account
        </Link>
        <Link
          href="/"
          className="text-slate-400 hover:text-[#00F0FF] transition-colors flex items-center space-x-1"
        >
          <Home className="w-3 h-3" />
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-4 flex items-center justify-center bg-[#07090E] relative overflow-hidden">
      <div className="absolute inset-0 bg-dot-matrix opacity-25 pointer-events-none" />
      <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent blur-[1px] animate-scanline pointer-events-none" />
      <Suspense fallback={<div className="text-xs text-[#00F0FF] font-mono">[INITIALIZING AUTH_MATRIX...]</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
