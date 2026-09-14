import React from 'react';
import { 
  Radio, 
  Wifi, 
  WifiOff, 
  ShieldCheck, 
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
      <div className="rounded-2xl bg-white dark:bg-[#07131d] border border-slate-200 dark:border-slate-800/80 p-3.5 shadow-xs dark:shadow-md flex flex-col justify-between transition-all hover:border-slate-300 dark:hover:border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Radio className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-black font-mono text-slate-900 dark:text-white leading-none">{total}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-1">Total Sensors</div>
          </div>
        </div>
        <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/60 text-[10.5px] text-slate-500 dark:text-slate-400 truncate">
          <span className="text-emerald-600 dark:text-emerald-400 font-medium">{safe} Safe</span> &bull; <span className="text-amber-600 dark:text-amber-400 font-medium">{warning} Warning</span> &bull; <span className="text-rose-600 dark:text-rose-400 font-medium">{highRisk} High</span> &bull; <span className="text-slate-500 dark:text-slate-400">{offline} Off</span>
        </div>
      </div>

      {/* 2. Online */}
      <div className="rounded-2xl bg-white dark:bg-[#07131d] border border-slate-200 dark:border-slate-800/80 p-3.5 shadow-xs dark:shadow-md flex flex-col justify-between transition-all hover:border-slate-300 dark:hover:border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <Wifi className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-black font-mono text-slate-900 dark:text-white leading-none">{online}</div>
              <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-1">Online</div>
            </div>
          </div>
          {/* Sparkline */}
          <div className="w-12 h-6 flex items-end">
            <svg viewBox="0 0 48 20" className="w-full h-full stroke-emerald-500 dark:stroke-emerald-400 fill-none stroke-[2]">
              <path d="M0,16 L8,15 L16,17 L24,13 L32,15 L40,8 L48,15" />
            </svg>
          </div>
        </div>
        <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[10.5px] text-slate-500 dark:text-slate-400">
          <span>87.5% Uptime</span>
        </div>
      </div>

      {/* 3. Offline */}
      <div className="rounded-2xl bg-white dark:bg-[#07131d] border border-slate-200 dark:border-slate-800/80 p-3.5 shadow-xs dark:shadow-md flex flex-col justify-between transition-all hover:border-slate-300 dark:hover:border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-500/30 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
              <WifiOff className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-black font-mono text-slate-900 dark:text-white leading-none">{offline}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-1">Offline</div>
            </div>
          </div>
          {/* Filled mountain sparkline */}
          <div className="w-12 h-6 flex items-end">
            <svg viewBox="0 0 48 20" className="w-full h-full">
              <defs>
                <linearGradient id="offline-spark-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#cbd5e1" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.05" />
                </linearGradient>
              </defs>
              <path 
                d="M0,19 L7,13 L14,16 L21,9 L28,15 L35,7 L42,14 L48,19 Z" 
                fill="url(#offline-spark-grad)" 
                stroke="#94a3b8" 
                strokeWidth="1.6" 
              />
            </svg>
          </div>
        </div>
        <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[10.5px] text-slate-500 dark:text-slate-400">
          <span>12.5%</span>
          <span className="text-slate-400 font-mono text-[10px]">Standby</span>
        </div>
      </div>

      {/* 4. Avg. Risk Score */}
      <div className="rounded-2xl bg-white dark:bg-[#07131d] border border-slate-200 dark:border-slate-800/80 p-3.5 shadow-xs dark:shadow-md flex flex-col justify-between transition-all hover:border-slate-300 dark:hover:border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-black font-mono text-slate-900 dark:text-white leading-none">{avgRisk}</div>
              <div className="text-xs text-teal-600 dark:text-teal-400 font-semibold mt-1">Avg. Risk Score</div>
            </div>
          </div>
          {/* Sparkline */}
          <div className="w-12 h-6 flex items-end">
            <svg viewBox="0 0 48 20" className="w-full h-full stroke-emerald-500 dark:stroke-emerald-400 fill-none stroke-[2]">
              <path d="M0,7 L7,13 L14,16 L21,12 L28,16 L35,8 L42,12 L48,11" />
            </svg>
          </div>
        </div>
        <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[10.5px]">
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Safe Level</span>
        </div>
      </div>

      {/* 5. System Status */}
      <div className="rounded-2xl bg-white dark:bg-[#07131d] border border-slate-200 dark:border-slate-800/80 p-3.5 shadow-xs dark:shadow-md flex flex-col justify-between transition-all hover:border-slate-300 dark:hover:border-slate-700">
        <div className="flex items-center gap-3">
          <div className="text-emerald-500 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Leaf className="w-10 h-10" />
          </div>
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold">System Status</div>
            <div className="text-xl font-black font-heading text-emerald-600 dark:text-emerald-400 leading-tight mt-0.5">Normal</div>
          </div>
        </div>
        <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/60 text-[10.5px] text-slate-500 dark:text-slate-400">
          All systems operational
        </div>
      </div>

    </div>
  );
};

export default TopSummaryFiveCards;
