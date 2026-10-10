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
      <div className="max-w-lg w-full p-8 rounded-none bg-[#0D111A] border-2 border-red-500 shadow-[4px_4px_0px_0px_#EF4444] font-mono space-y-6">
        <div className="flex items-center gap-2 border-b-2 border-[#1A2234] pb-4">
          <Terminal className="w-4 h-4 text-[#00F0FF]" />
          <span className="text-xs text-[#00F0FF] font-bold">[ERROR_LOG_V2.4 // NODE_FAULT]</span>
        </div>

        <div className="space-y-3">
          <div className="text-5xl font-black text-white font-mono tracking-wider">[404]</div>
          <div className="text-sm font-bold text-red-400 font-mono">[ERR_NODE_UNRESOLVED: ROUTE_NOT_FOUND]</div>
          <p className="text-xs text-slate-400 font-mono leading-relaxed">
            The target system module, API gateway, or product package you are looking for has been moved, deprecated, or does not exist in the routing table.
          </p>
        </div>

        <div className="p-3.5 bg-[#07090E] border-2 border-[#1A2234] rounded-none text-xs text-slate-500 font-mono leading-relaxed">
          &gt; trace --target path<br />
          &gt; status: 0 matches found<br />
          &gt; suggested_action: navigate back to secure origin
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:flex-1 py-3 rounded-none bg-[#00F0FF] hover:bg-white text-black font-mono font-black text-xs uppercase tracking-wider border-2 border-[#00F0FF] hover:border-white shadow-[2px_2px_0px_0px_#00F0FF] active:translate-x-[1px] active:translate-y-[1px] flex items-center justify-center gap-1.5 transition-all min-h-[44px]"
          >
            <Home className="w-3.5 h-3.5" />
            <span>[HOME BASE]</span>
          </Link>
          <Link
            href="/systems"
            className="w-full sm:flex-1 py-3 rounded-none border-2 border-[#1A2234] hover:border-[#00F0FF] bg-[#07090E] text-slate-300 hover:text-white font-mono text-xs font-bold flex items-center justify-center gap-1.5 transition-colors min-h-[44px]"
          >
            <Search className="w-3.5 h-3.5" />
            <span>[ALL SYSTEMS]</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
