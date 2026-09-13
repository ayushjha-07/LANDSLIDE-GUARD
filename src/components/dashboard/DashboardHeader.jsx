import React from 'react';
import { 
  RefreshCw, 
  MapPin, 
  Mountain, 
  Users, 
  Leaf 
} from 'lucide-react';
import heroHimalayasBanner from '../../assets/hero_himalayas_banner.jpg';

export const DashboardHeader = ({ lastUpdatedText, isRefreshing, onRefresh }) => {
  return (
    <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-white dark:bg-[#0B0F19] border border-slate-200/80 dark:border-slate-800/80 shadow-xs min-w-0 transition-colors duration-200">
      {/* 1. Panoramic Himalayan Mountain Landscape Backdrop (Right Side with Smooth Left Fade) */}
      <div className="absolute top-0 right-0 bottom-0 w-full sm:w-[65%] lg:w-[60%] overflow-hidden pointer-events-none select-none z-0">
        <img 
          src={heroHimalayasBanner} 
          alt="Himalayan Mountain Range" 
          className="w-full h-full object-cover object-right sm:object-[75%_25%]"
        />
        {/* Horizontal Gradient Mask: Fades out completely to page white/dark on the left */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent dark:from-[#0B0F19] dark:via-[#0B0F19]/85 dark:to-transparent" />
        {/* Vertical subtle gradient to anchor bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-white/30 dark:from-[#0B0F19]/70 dark:via-transparent dark:to-[#0B0F19]/30" />
      </div>

      {/* 2. Top-Right Calligraphic Badge: "Safer Mountains, Stronger Communities" */}
      <div className="absolute top-3.5 sm:top-5 right-4 sm:right-7 z-10 text-right pointer-events-none select-none hidden md:block">
        <p className="text-xs sm:text-[13px] font-bold italic text-slate-800 dark:text-slate-100 font-serif tracking-tight drop-shadow-xs">
          Safer Mountains
        </p>
        <p className="text-xs sm:text-[13px] font-bold italic text-slate-800 dark:text-slate-100 font-serif tracking-tight -mt-1 drop-shadow-xs">
          Stronger Communities
        </p>
        <svg className="w-20 sm:w-24 h-2 ml-auto text-emerald-600 dark:text-emerald-400 mt-0.5" viewBox="0 0 100 10" fill="none">
          <path d="M5 7 C 35 1, 65 9, 95 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      {/* 3. Main Content Layer */}
      <div className="relative z-10 p-5 sm:p-6 lg:p-7 flex flex-col justify-between gap-4 sm:gap-5 min-w-0">
        {/* Row A: Breadcrumbs + LIVE MONITORING pill */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors">Home</span>
            <span className="text-slate-300 dark:text-slate-600">/</span>
            <span className="text-slate-900 dark:text-white font-bold">Dashboard</span>
          </div>

          {/* Premium Live Badge matching reference */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 text-emerald-700 dark:text-emerald-300 text-[10.5px] font-extrabold uppercase tracking-wider shadow-2xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600 dark:bg-emerald-400" />
            </span>
            <span>LIVE MONITORING</span>
          </div>
        </div>

        {/* Row B: Main Title and Subtitle */}
        <div className="space-y-1 max-w-2xl min-w-0">
          <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-extrabold font-heading text-slate-900 dark:text-white tracking-tight leading-tight">
            Landslide Monitoring Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
            Real-time environmental and ground-condition monitoring
          </p>
        </div>

        {/* Row C: Metadata Row & Telemetry Refresh pill */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1.5 min-w-0">
          {/* Metadata indicators */}
          <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-2 text-[11.5px] sm:text-xs font-medium text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 flex-shrink-0" />
              <span>Himachal Region</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Mountain className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 flex-shrink-0" />
              <span>Monitoring Mountain Slopes</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 flex-shrink-0" />
              <span>Protecting Communities</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Leaf className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
              <span>Powered by IoT &amp; AI</span>
            </div>
          </div>

          {/* Refresh pill matching reference bottom-right position */}
          <div className="flex items-center gap-2 self-start sm:self-auto px-3 py-1.5 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 shadow-2xs">
            <span className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">
              Last updated: <strong className="text-slate-800 dark:text-slate-200 font-mono font-semibold">{lastUpdatedText}</strong>
            </span>
            <button
              type="button"
              onClick={onRefresh}
              className={`w-6 h-6 rounded-lg flex items-center justify-center text-slate-500 hover:text-emerald-700 dark:text-slate-400 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer ${
                isRefreshing ? 'animate-spin text-emerald-600 dark:text-emerald-400' : ''
              }`}
              title="Refresh telemetry"
              aria-label="Refresh telemetry"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
