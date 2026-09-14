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
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 w-full min-w-0">
      <div className="min-w-0">
        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-1 font-medium">
          <span>Home</span>
          <span className="text-slate-400">›</span>
          <span className="text-slate-600 dark:text-slate-300">Monitoring Map</span>
        </div>
        
        {/* Main Heading */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Himachal Pradesh Monitoring Map
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Real-time geospatial monitoring of sensor nodes and landslide risk zones
        </p>
      </div>

      {/* Right side: Nodes Count & Prototype Monitoring & Refresh */}
      <div className="flex items-center gap-3 flex-wrap self-start md:self-auto flex-shrink-0">
        <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 text-xs font-bold text-emerald-800 dark:text-emerald-300 shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-xs" />
          <span>{onlineCount} / {totalCount} Nodes Online</span>
        </div>

        <span className="inline-flex items-center gap-2 text-xs font-semibold px-3.5 py-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 text-amber-800 dark:text-amber-300 shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          Prototype Monitoring
        </span>

        <button
          type="button"
          onClick={onRefresh}
          disabled={isRefreshing}
          className="p-2.5 rounded-xl bg-white dark:bg-[#121c16] border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-2xs flex items-center justify-center cursor-pointer"
          title="Refresh map telemetry"
          aria-label="Refresh map telemetry"
        >
          <RefreshCw className={`w-4 h-4 text-slate-600 dark:text-slate-300 ${isRefreshing ? 'animate-spin' : ''}`} />
        </button>
      </div>
    </div>
  );
};

export default MapHeader;
