"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import {
  UserPlus,
  ShieldCheck,
  Cpu,
  ArrowRight,
  AlertTriangle,
  Building,
  Mail,
  Lock,
  User,
  Home,
  CheckCircle2,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          companyName: companyName.trim(),
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(data.error || "Registration validation error.");
        setIsLoading(false);
        return;
      }

      setSuccessMessage("NODE_REGISTERED // ESTABLISHING CLIENT CLEARANCE...");

      // Automatically sign in upon registration
      setTimeout(async () => {
        await signIn("credentials", {
          email: email.trim().toLowerCase(),
          password,
          callbackUrl: "/portal",
        });
      }, 800);
    } catch (err: any) {
      setErrorMessage("SYSTEM_DESYNC: Network communication error.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 flex items-center justify-center bg-[#07090E] relative overflow-hidden">
      <div className="absolute inset-0 bg-dot-matrix opacity-25 pointer-events-none" />
      <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#8B5CF6] to-transparent blur-[1px] animate-scanline pointer-events-none" />

      <div className="w-full max-w-md mx-auto p-6 sm:p-8 bg-[#0D111A] border-2 border-[#8B5CF6] shadow-[8px_8px_0px_0px_#8B5CF6] font-mono relative z-10 text-slate-100">
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b-2 border-[#1A2234] pb-4 mb-6">
          <div className="flex items-center space-x-2">
            <UserPlus className="w-5 h-5 text-[#8B5CF6]" />
            <span className="text-xs font-black text-[#8B5CF6] uppercase tracking-wider">
              [NEXUS.OS // CLIENT_REGISTRATION]
            </span>
          </div>
          <span className="text-[10px] px-2 py-0.5 bg-[#07090E] text-[#00F0FF] border border-[#00F0FF] font-bold uppercase">
            TIER: CLIENT
          </span>
        </div>

        {/* Headline */}
        <div className="space-y-2 mb-6">
          <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            Register Account
          </h1>
          <p className="text-xs text-[#94A3B8] leading-relaxed">
            Create an enterprise client account to acquire, manage, and verify software system license artifacts.
          </p>
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

        {/* Registration Form */}
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-slate-300 font-bold mb-1.5">
              [LEGAL_REPRESENTATIVE_NAME]:
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Dr. Rajesh Sharma"
              className="w-full bg-[#07090E] border-2 border-[#1A2234] focus:border-[#8B5CF6] p-3 text-xs text-white uppercase tracking-wider outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider text-slate-300 font-bold mb-1.5">
              [CORPORATE_WORK_EMAIL]:
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="rajesh@enterprise.in"
              className="w-full bg-[#07090E] border-2 border-[#1A2234] focus:border-[#8B5CF6] p-3 text-xs text-white uppercase tracking-wider outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider text-slate-300 font-bold mb-1.5">
              [ENTERPRISE_ORGANIZATION]:
            </label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="HyperScale Global Systems Pvt Ltd"
              className="w-full bg-[#07090E] border-2 border-[#1A2234] focus:border-[#8B5CF6] p-3 text-xs text-white uppercase tracking-wider outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider text-slate-300 font-bold mb-1.5">
              [PASSPHRASE_MIN_6_CHARS]:
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-[#07090E] border-2 border-[#1A2234] focus:border-[#8B5CF6] p-3 text-xs text-white outline-none transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-4 bg-[#8B5CF6] hover:bg-white text-black font-black text-xs uppercase tracking-wider border-2 border-[#8B5CF6] shadow-[4px_4px_0px_0px_#00F0FF] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#00F0FF] transition-all flex items-center justify-center space-x-2 min-h-[46px] cursor-pointer disabled:opacity-50 mt-2"
          >
            {isLoading ? (
              <span>[REGISTERING IDENTITY RECORD...]</span>
            ) : (
              <>
                <span>[CREATE CLIENT IDENTITY // PROCEED]</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer Navigation Links */}
        <div className="pt-6 mt-6 border-t border-[#1A2234] flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-3">
          <Link
            href="/auth/login"
            className="text-[#00F0FF] hover:text-white transition-colors"
          >
            &gt; Already Registered? Sign In
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
    </div>
  );
}
