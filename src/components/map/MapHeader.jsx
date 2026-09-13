import React from 'react';
import { RefreshCw, MapPin } from 'lucide-react';

export const MapHeader = ({ 
  onlineCount = 7, 
  totalCount = 8, 
  lastUpdatedText = "Just now", 
  isRefreshing = false, 
  onRefresh 
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200/80 dark:border-forest-900/60 pb-5 w-full min-w-0">
      <div className="min-w-0">
        <div className="flex items-center gap-2 text-xs font-semibold text-stone-500 dark:text-stone-400 mb-1.5 flex-wrap">
          <span>Home</span>
          <span>/</span>
          <span className="text-forest-700 dark:text-nature-400">Map</span>
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-forest-500/10 text-forest-700 dark:text-nature-400 border border-forest-500/20 ml-1">
            <span className="w-1.5 h-1.5 rounded-full bg-nature-500 animate-pulse" />
            HIMACHAL PRADESH SECTOR
          </span>
        </div>
        
        {/* Exact Section 23 Title & Subtitle */}
        <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-stone-900 dark:text-white tracking-tight">
          Himachal Pradesh Monitoring Map
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
          Real geographic map with prototype landslide-monitoring nodes
        </p>
      </div>

      {/* Right side: Nodes Count & ● Prototype Monitoring */}
      <div className="flex items-center gap-3 flex-wrap self-start md:self-auto flex-shrink-0">
        <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-[#121c16] border border-stone-200 dark:border-forest-800 text-xs font-semibold text-stone-800 dark:text-stone-100 shadow-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-nature-500 animate-pulse" />
          <span>{onlineCount} / {totalCount} Nodes Online</span>
        </div>

        {/* Section 23: ● Prototype Monitoring */}
        <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400">
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          Prototype Monitoring
        </span>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onRefresh}
            disabled={isRefreshing}
            className="min-h-[44px] min-w-[44px] p-2.5 rounded-xl bg-white dark:bg-[#121c16] border border-stone-200 dark:border-forest-800 text-stone-700 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-forest-900/50 transition-colors shadow-sm flex items-center justify-center cursor-pointer"
            title="Refresh map telemetry"
            aria-label="Refresh map telemetry"
          >
            <RefreshCw className={`w-4 h-4 text-forest-600 dark:text-nature-400 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapHeader;
