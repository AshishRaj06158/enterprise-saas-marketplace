import type { Metadata } from 'next';
import Link from 'next/link';
import { Terminal, Home, Search } from 'lucide-react';

export const metadata: Metadata = {
  title: '404 — System Node Not Found',
  description: 'The requested route or system node could not be resolved.',
};

export default function NotFound() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center px-6 py-20 bg-[#07090E]">
      <div className="max-w-lg w-full p-8 rounded-2xl bg-[#0D111A] border border-[#1A2234] font-mono space-y-6">
        <div className="flex items-center gap-2 border-b border-[#1A2234] pb-4">
          <Terminal className="w-4 h-4 text-[#00F0FF]" />
          <span className="text-xs text-slate-400">ERROR_LOG_V2.4</span>
        </div>

        <div className="space-y-3">
          <div className="text-4xl font-bold text-slate-100 font-mono tracking-wider">404</div>
          <div className="text-sm text-[#00F0FF]">ERR_NODE_UNRESOLVED: ROUTE_NOT_FOUND</div>
          <p className="text-xs text-slate-400 font-sans leading-relaxed">
            The target system module, API gateway, or product package you are looking for has been moved, deprecated, or does not exist.
          </p>
        </div>

        <div className="p-3 bg-[#07090E] border border-[#1A2234] rounded text-xs text-slate-500 font-mono">
          &gt; trace --target path<br />
          &gt; status: 0 matches found<br />
          &gt; suggested_action: navigate back to secure origin
        </div>

        <div className="flex items-center gap-3 pt-2">
          <Link
            href="/"
            className="flex-1 py-2.5 rounded bg-slate-100 text-slate-950 font-sans text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-white transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            Home Base
          </Link>
          <Link
            href="/systems"
            className="flex-1 py-2.5 rounded border border-[#1A2234] bg-[#07090E] text-slate-300 font-sans text-xs font-medium flex items-center justify-center gap-1.5 hover:border-slate-600 transition-colors"
          >
            <Search className="w-3.5 h-3.5" />
            All Systems
          </Link>
        </div>
      </div>
    </div>
  );
}
