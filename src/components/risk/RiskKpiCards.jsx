import React from 'react';
import { 
  MapPin, 
  Network, 
  ShieldCheck, 
  Settings, 
  Clock, 
  Calendar
} from 'lucide-react';
import mountainPeakImg from '../../assets/risk_mountain_peak.png';

export const RiskKpiCards = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 xl:gap-3 w-full min-w-0">
      {/* 1. Selected Area */}
      <div className="bg-white dark:bg-[#0c121e] border border-slate-200/80 dark:border-slate-800/80 rounded-xl p-2.5 xl:p-3 shadow-xs relative overflow-hidden flex flex-col justify-between min-h-[92px]">
        <div className="flex items-start gap-2">
          <div className="w-7 h-7 rounded-lg bg-sky-50 dark:bg-sky-950/50 border border-sky-100 dark:border-sky-900/60 text-sky-500 flex items-center justify-center shrink-0">
            <MapPin className="w-3.5 h-3.5 fill-sky-500 text-sky-500" />
          </div>
          <div className="min-w-0 flex-1 z-10">
            <div className="text-[10px] xl:text-[10.5px] text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap">Selected Area</div>
            <div className="text-[11.5px] xl:text-[12.5px] font-bold text-slate-900 dark:text-white whitespace-nowrap tracking-tight mt-0.5">
              Kullu – Manali Region
            </div>
            <div className="text-[9.5px] xl:text-[10px] text-slate-500 dark:text-slate-400 whitespace-nowrap mt-0.5">
              Himachal Pradesh
            </div>
          </div>
        </div>
        {/* Mountain peak watermark graphic on the right */}
        <div className="absolute right-0 bottom-0 pointer-events-none w-9 h-9 overflow-hidden flex items-end justify-end">
          <img 
            src={mountainPeakImg} 
            alt="Mountain graphic" 
            className="w-full h-full object-contain object-bottom-right"
          />
        </div>
      </div>

      {/* 2. Total Nodes */}
      <div className="bg-white dark:bg-[#0c121e] border border-slate-200/80 dark:border-slate-800/80 rounded-xl p-2.5 xl:p-3 shadow-xs relative overflow-hidden flex flex-col justify-between min-h-[92px]">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-2 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-100 dark:border-emerald-900/60 text-emerald-500 flex items-center justify-center shrink-0">
              <Network className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] xl:text-[10.5px] text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap">Total Nodes</div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-white mt-0.5 leading-none">
                08
              </div>
              <div className="text-[9.5px] xl:text-[10px] text-slate-500 dark:text-slate-400 mt-1 whitespace-nowrap">
                7 Online | 1 Offline
              </div>
            </div>
          </div>

          {/* 3-bar green signal */}
          <div className="flex items-end gap-1 h-5 self-center shrink-0 pr-0.5">
            <span className="w-1 h-2 rounded-xs bg-emerald-500" />
            <span className="w-1 h-3.5 rounded-xs bg-emerald-500" />
            <span className="w-1 h-5 rounded-xs bg-emerald-500" />
          </div>
        </div>
      </div>

      {/* 3. Current Risk Score */}
      <div className="bg-white dark:bg-[#0c121e] border border-slate-200/80 dark:border-slate-800/80 rounded-xl p-2.5 xl:p-3 shadow-xs relative overflow-hidden flex flex-col justify-between min-h-[92px]">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-2 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-100 dark:border-emerald-900/60 text-emerald-500 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-3.5 h-3.5 fill-emerald-500/20 text-emerald-500" />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] xl:text-[10.5px] text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap">Current Risk Score</div>
              <div className="flex items-baseline gap-1 mt-0.5 leading-none">
                <span className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-white">22</span>
                <span className="text-xs text-slate-400 font-medium">/ 100</span>
              </div>
              <div className="mt-1">
                <span className="inline-block px-1.5 py-0.5 text-[9.5px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-100/70 dark:bg-emerald-950/60 rounded-md">
                  Low Risk
                </span>
              </div>
            </div>
          </div>

          {/* Sparkline mini-graph */}
          <div className="self-center shrink-0 w-11 h-6">
            <svg viewBox="0 0 50 30" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="riskKpiGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path
                d="M 2,24 Q 10,22 18,25 T 32,12 T 48,6"
                fill="none"
                stroke="#10b981"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <path
                d="M 2,24 Q 10,22 18,25 T 32,12 T 48,6 L 48,28 L 2,28 Z"
                fill="url(#riskKpiGrad)"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* 4. AI Model Status */}
      <div className="bg-white dark:bg-[#0c121e] border border-slate-200/80 dark:border-slate-800/80 rounded-xl p-2.5 xl:p-3 shadow-xs relative overflow-hidden flex flex-col justify-between min-h-[92px]">
        <div className="flex items-start gap-2 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-sky-50 dark:bg-sky-950/50 border border-sky-100 dark:border-sky-900/60 text-sky-500 flex items-center justify-center shrink-0">
            <Settings className="w-3.5 h-3.5 text-sky-500" />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] xl:text-[10.5px] text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap">AI Model Status</div>
            <div className="flex items-center gap-1.5 text-xs sm:text-[13.5px] font-bold text-emerald-600 dark:text-emerald-400 mt-1 leading-tight">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              <span>Active</span>
            </div>
            <div className="text-[9.5px] xl:text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">
              RF + LSTM/GRU
            </div>
          </div>
        </div>
      </div>

      {/* 5. Last Analysis */}
      <div className="bg-white dark:bg-[#0c121e] border border-slate-200/80 dark:border-slate-800/80 rounded-xl p-2.5 xl:p-3 shadow-xs relative overflow-hidden flex flex-col justify-between min-h-[92px]">
        <div className="flex items-start gap-2 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900/60 text-indigo-500 flex items-center justify-center shrink-0">
            <Clock className="w-3.5 h-3.5 text-indigo-500" />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] xl:text-[10.5px] text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap">Last Analysis</div>
            <div className="text-xs sm:text-[13.5px] font-bold text-slate-900 dark:text-white mt-1 leading-tight">
              Just now
            </div>
            <div className="text-[9.5px] xl:text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">
              Auto refresh: 5s
            </div>
          </div>
        </div>
      </div>

      {/* 6. Prediction Horizon */}
      <div className="bg-white dark:bg-[#0c121e] border border-slate-200/80 dark:border-slate-800/80 rounded-xl p-2.5 xl:p-3 shadow-xs relative overflow-hidden flex flex-col justify-between min-h-[92px]">
        <div className="flex items-start gap-2 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-sky-50 dark:bg-sky-950/50 border border-sky-100 dark:border-sky-900/60 text-sky-500 flex items-center justify-center shrink-0">
            <Calendar className="w-3.5 h-3.5 text-sky-500" />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] xl:text-[10.5px] text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap">Prediction Horizon</div>
            <div className="text-xs sm:text-[13.5px] font-bold text-slate-900 dark:text-white mt-1 leading-tight">
              6 Hours
            </div>
            <div className="text-[9.5px] xl:text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">
              Next 6h forecast
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskKpiCards;
