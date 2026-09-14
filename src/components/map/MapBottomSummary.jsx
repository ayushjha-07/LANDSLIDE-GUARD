import React from 'react';
import { MapPin, Radio, Wifi, XCircle, AlertTriangle } from 'lucide-react';

export const MapBottomSummary = ({
  totalCount = 8,
  onlineCount = 7,
  offlineCount = 1,
  highestRiskNode,
  className = ""
}) => {
  return (
    <div className={`space-y-3 w-full min-w-0 ${className}`}>
      {/* 1. Main White Metrics & Legend Card */}
      <div className="bg-white dark:bg-[#0c121e] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        {/* Section 1: Monitoring Region */}
        <div className="flex items-center gap-3 pr-4 lg:border-r border-slate-200 dark:border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <MapPin className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
              Monitoring Region
            </span>
            <strong className="text-sm font-extrabold text-slate-900 dark:text-white block truncate">
              Himachal Pradesh, India
            </strong>
            <span className="text-xs text-slate-500 dark:text-slate-400 block truncate">
              Kullu – Manali / Beas Valley
            </span>
          </div>
        </div>

        {/* Section 2: Nodes */}
        <div className="flex items-center gap-3 pr-4 lg:border-r border-slate-200 dark:border-slate-800">
          <div className="w-9 h-9 rounded-lg bg-slate-50 dark:bg-slate-900 text-emerald-500 flex items-center justify-center shrink-0">
            <Radio className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
              Nodes
            </span>
            <strong className="text-lg font-bold font-mono text-slate-900 dark:text-white">
              {totalCount}
            </strong>
          </div>
        </div>

        {/* Section 3: Online */}
        <div className="flex items-center gap-3 pr-4 lg:border-r border-slate-200 dark:border-slate-800">
          <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Wifi className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
              Online
            </span>
            <strong className="text-lg font-bold font-mono text-emerald-600 dark:text-emerald-400">
              {onlineCount}
            </strong>
          </div>
        </div>

        {/* Section 4: Offline */}
        <div className="flex items-center gap-3 pr-4 lg:border-r border-slate-200 dark:border-slate-800">
          <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 flex items-center justify-center shrink-0">
            <XCircle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
              Offline
            </span>
            <strong className="text-lg font-bold font-mono text-slate-700 dark:text-slate-300">
              {offlineCount}
            </strong>
          </div>
        </div>

        {/* Section 5: Highest Risk */}
        <div className="flex items-center gap-3 pr-4 lg:border-r border-slate-200 dark:border-slate-800">
          <div className="w-9 h-9 rounded-lg bg-rose-50 dark:bg-rose-950/50 text-rose-500 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
              Highest Risk
            </span>
            <div className="flex items-baseline gap-1.5">
              <strong className="text-sm font-bold text-slate-900 dark:text-white">
                {highestRiskNode?.id?.replace("NODE-", "Node ") || "Node 05"}
              </strong>
              <span className="text-xs font-bold text-rose-500">
                {highestRiskNode?.riskLevel || "High Risk"}
              </span>
            </div>
          </div>
        </div>

        {/* Section 6: Mini Risk Dots Legend */}
        <div className="flex items-center gap-4 text-xs font-medium text-slate-600 dark:text-slate-300 flex-wrap lg:flex-nowrap">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
            <span>Safe</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
            <span>Warning</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
            <span>High Risk</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#b91c1c]" />
            <span>Critical</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#64748b]" />
            <span>Offline</span>
          </div>
        </div>
      </div>

      {/* 2. Map Disclaimer Banner matching reference */}
      <div className="px-4 py-3 rounded-xl bg-amber-500/10 dark:bg-amber-950/20 border border-amber-500/30 flex items-center gap-3 text-xs text-amber-900 dark:text-amber-200">
        <div className="w-5 h-5 rounded-md border border-amber-500/50 flex items-center justify-center shrink-0 text-amber-600 dark:text-amber-400">
          <AlertTriangle className="w-3.5 h-3.5" />
        </div>
        <div className="leading-snug">
          <strong className="font-bold text-amber-800 dark:text-amber-400 mr-2">
            Map Disclaimer
          </strong>
          <span className="text-slate-600 dark:text-slate-300">
            Real geographic basemap. Sensor locations and risk data are simulated prototype data and do not represent deployed sensors or official landslide hazard boundaries.
          </span>
        </div>
      </div>
    </div>
  );
};

export default MapBottomSummary;
