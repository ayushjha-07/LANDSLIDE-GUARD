import React from 'react';
import { 
  Radio, 
  Wifi, 
  WifiOff, 
  ShieldCheck, 
  CheckCircle2, 
  TrendingUp,
  Leaf
} from 'lucide-react';

export const TopSummaryFiveCards = ({
  total = 8,
  online = 7,
  offline = 1,
  safe = 5,
  warning = 1,
  highRisk = 1,
  avgRisk = 22,
  systemStatus = 'Normal'
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-3.5 select-none">
      
      {/* 1. Total Sensors */}
      <div className="rounded-2xl bg-[#09131d] border border-slate-800/80 p-3.5 shadow-md flex flex-col justify-between transition-all hover:border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <Radio className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-black font-mono text-white leading-none">{total}</div>
            <div className="text-xs text-slate-400 font-semibold mt-1">Total Sensors</div>
          </div>
        </div>
        <div className="mt-3 pt-2 border-t border-slate-800/60 text-[10.5px] text-slate-400 truncate">
          <span className="text-emerald-400 font-medium">{safe} Safe</span> &bull; <span className="text-amber-400 font-medium">{warning} Warning</span> &bull; <span className="text-rose-400 font-medium">{highRisk} High</span> &bull; <span className="text-slate-400">{offline} Off</span>
        </div>
      </div>

      {/* 2. Online */}
      <div className="rounded-2xl bg-[#09131d] border border-slate-800/80 p-3.5 shadow-md flex flex-col justify-between transition-all hover:border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
              <Wifi className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-black font-mono text-teal-400 leading-none">{online}</div>
              <div className="text-xs text-slate-400 font-semibold mt-1">Online</div>
            </div>
          </div>
          {/* Subtle sparkline */}
          <div className="w-10 h-5 flex items-end">
            <svg viewBox="0 0 40 20" className="w-full h-full stroke-emerald-400 fill-none stroke-[2]">
              <path d="M0,15 Q10,18 20,8 T40,4" />
            </svg>
          </div>
        </div>
        <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10.5px]">
          <span className="text-slate-400">87.5% Uptime</span>
          <span className="text-teal-400 font-medium flex items-center gap-0.5">
            <TrendingUp className="w-3 h-3" /> 99.4%
          </span>
        </div>
      </div>

      {/* 3. Offline */}
      <div className="rounded-2xl bg-[#09131d] border border-slate-800/80 p-3.5 shadow-md flex flex-col justify-between transition-all hover:border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <WifiOff className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-black font-mono text-amber-400 leading-none">{offline}</div>
              <div className="text-xs text-slate-400 font-semibold mt-1">Offline</div>
            </div>
          </div>
          {/* Subtle sparkline */}
          <div className="w-10 h-5 flex items-end">
            <svg viewBox="0 0 40 20" className="w-full h-full stroke-amber-400 fill-none stroke-[2]">
              <path d="M0,8 Q15,4 25,16 T40,14" />
            </svg>
          </div>
        </div>
        <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10.5px]">
          <span className="text-slate-400">12.5%</span>
          <span className="text-amber-400/80 font-medium">NODE-08 Standby</span>
        </div>
      </div>

      {/* 4. Avg. Risk Score */}
      <div className="rounded-2xl bg-[#09131d] border border-slate-800/80 p-3.5 shadow-md flex flex-col justify-between transition-all hover:border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-black font-mono text-emerald-400 leading-none">{avgRisk}</div>
              <div className="text-xs text-slate-400 font-semibold mt-1">Avg. Risk Score</div>
            </div>
          </div>
          {/* Subtle sparkline */}
          <div className="w-10 h-5 flex items-end">
            <svg viewBox="0 0 40 20" className="w-full h-full stroke-emerald-400 fill-none stroke-[2]">
              <path d="M0,14 Q10,6 25,12 T40,5" />
            </svg>
          </div>
        </div>
        <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10.5px]">
          <span className="text-emerald-400 font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Safe Level
          </span>
          <span className="text-slate-500">Low Hazard</span>
        </div>
      </div>

      {/* 5. System Status */}
      <div className="rounded-2xl bg-[#09131d] border border-slate-800/80 p-3.5 shadow-md flex flex-col justify-between transition-all hover:border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-semibold">System Status</div>
              <div className="text-xl font-black font-heading text-emerald-400 leading-tight mt-0.5">Normal</div>
            </div>
          </div>
          <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <CheckCircle2 className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="mt-3 pt-2 border-t border-slate-800/60 text-[10.5px] text-slate-400">
          All systems operational
        </div>
      </div>

    </div>
  );
};

export default TopSummaryFiveCards;
