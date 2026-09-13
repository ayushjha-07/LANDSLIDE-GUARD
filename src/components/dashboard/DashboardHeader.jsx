import React from 'react';
import { RefreshCw } from 'lucide-react';

export const DashboardHeader = ({ lastUpdatedText, isRefreshing, onRefresh }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-2 border-b border-stone-200/80 dark:border-forest-900/60 min-w-0">
      <div className="min-w-0">
        <div className="flex items-center gap-2 text-[11px] font-semibold tracking-wide text-stone-500 dark:text-stone-400 mb-1">
          <span>Home</span>
          <span>/</span>
          <span className="text-forest-700 dark:text-nature-400">Dashboard</span>
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-nature-500/10 border border-nature-500/30 text-nature-700 dark:text-nature-300 font-bold ml-1.5 text-[10px]">
            <span className="w-1.5 h-1.5 rounded-full bg-nature-500 animate-pulse" />
            LIVE MONITORING
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-stone-900 dark:text-white tracking-tight">
          Landslide Monitoring Dashboard
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-0.5 truncate">
          Real-time environmental and ground-condition monitoring
        </p>
      </div>

      <div className="flex items-center gap-2.5 self-start sm:self-center flex-shrink-0">
        <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">
          Last updated: <strong className="text-stone-700 dark:text-stone-200 font-mono">{lastUpdatedText}</strong>
        </span>
        <button
          type="button"
          onClick={onRefresh}
          className={`min-h-[44px] min-w-[44px] w-11 h-11 flex items-center justify-center rounded-xl bg-white dark:bg-[#121c16] border border-stone-200 dark:border-forest-800 text-stone-600 dark:text-stone-300 hover:text-forest-700 dark:hover:text-nature-400 hover:bg-stone-50 dark:hover:bg-forest-900/50 shadow-sm transition-all ${
            isRefreshing ? 'animate-spin text-forest-600 dark:text-nature-400' : ''
          }`}
          aria-label="Refresh telemetry"
          title="Refresh telemetry"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;
