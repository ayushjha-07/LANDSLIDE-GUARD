import React from 'react';
import { Radio, RefreshCw, Cpu } from 'lucide-react';

export const DevicesHeader = ({ isRefreshing, onRefresh }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-1 min-w-0">
      <div className="min-w-0">
        <div className="flex items-center gap-2 text-xs font-medium text-[#718096] dark:text-slate-400 mb-1">
          <span>Home</span>
          <span>/</span>
          <span className="text-[#1A202C] dark:text-white font-semibold">Devices</span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold font-heading text-[#1A202C] dark:text-white tracking-tight truncate">
          Devices &amp; LoRa Monitoring
        </h1>
        <p className="text-xs sm:text-sm text-[#718096] dark:text-slate-400 mt-1">
          Monitor sensor-node health, gateway connectivity and long-range communication
        </p>
      </div>

      <div className="flex items-center gap-2.5 flex-wrap self-start sm:self-auto flex-shrink-0">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-semibold shadow-soft">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span>Network Online</span>
        </div>

        <span className="px-2.5 py-1 rounded-full bg-slate-200/70 dark:bg-slate-800 text-[11px] font-mono text-[#4A5568] dark:text-slate-300 border border-[#E2E8F0] dark:border-[#2D3748]">
          Prototype Simulation
        </span>

        <button
          type="button"
          onClick={onRefresh}
          disabled={isRefreshing}
          className="min-h-[40px] px-3.5 py-2 rounded-xl bg-white dark:bg-[#1A202C] border border-[#E2E8F0] dark:border-[#2D3748] text-xs font-medium text-[#2D3748] dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/80 shadow-soft transition-colors flex items-center gap-2 disabled:opacity-60"
          title="Refresh device telemetry"
          aria-label="Refresh device telemetry"
        >
          <RefreshCw className={"w-3.5 h-3.5 text-forest-600 dark:text-nature-400 " + (isRefreshing ? 'animate-spin' : '')} />
          <span className="hidden sm:inline">Ping Nodes</span>
        </button>
      </div>
    </div>
  );
};

export default DevicesHeader;
