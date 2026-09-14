import React from 'react';
import { MapPin, RotateCcw } from 'lucide-react';
import heroHimalayas from '../../assets/hero_himalayas.jpg';

export const SettingsHeader = ({ onResetClick }) => {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-stone-200/80 dark:border-stone-800 shadow-lg min-h-[190px] sm:min-h-[210px] flex flex-col justify-between p-5 sm:p-7 group select-none">
      {/* 1. High-Resolution Realistic Himalayan Mountain Background */}
      <img
        src={heroHimalayas}
        alt="Himachal Pradesh Himalayan mountain peaks"
        className="absolute inset-0 w-full h-full object-cover object-[center_20%] transition-transform duration-700 group-hover:scale-105 pointer-events-none"
      />

      {/* 2. Natural Ambient Gradient Overlay (Keeps mountain peaks clearly visible while text is crisp) */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/85 via-black/45 to-black/60 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

      {/* 3. Top Row: Breadcrumb & Active Status (Left) vs Regional Badge & Quote (Right) */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-3 w-full">
        {/* Left: Breadcrumbs & Configuration Active Badge */}
        <div className="flex items-center gap-2 text-xs font-semibold text-white/80 flex-wrap">
          <span>Home</span>
          <span className="text-white/60">›</span>
          <span className="text-white">Settings</span>
          <span className="inline-flex items-center gap-1.5 text-[10.5px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/25 text-emerald-300 border border-emerald-400/40 ml-1 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            CONFIGURATION ACTIVE
          </span>
        </div>

        {/* Right: Regional Badge (matching reference image) */}
        <div className="hidden md:flex items-center gap-4">
          <div className="text-right">
            <p className="text-xs sm:text-sm font-medium italic text-white/95 drop-shadow-md font-serif tracking-wide">
              “Monitoring Today
              <br />
              for Safer Tomorrows”
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/60 dark:bg-black/70 backdrop-blur-md border border-white/20 text-white shadow-lg">
            <MapPin className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            <div className="text-left leading-tight">
              <div className="text-xs font-bold text-white">Himachal Pradesh</div>
              <div className="text-[10px] text-white/80">Kullu – Manali Region</div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom Row: System Settings Title & Subtitle */}
      <div className="relative z-10 mt-auto pt-4 flex flex-col md:flex-row md:items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight drop-shadow-md">
            System Settings
          </h1>
          <p className="text-xs sm:text-sm text-white/90 font-medium mt-1 drop-shadow-sm max-w-xl">
            Configure monitoring, risk analysis, alerts and prototype behavior
          </p>
        </div>

        {/* Mobile Quote & Badge (<768px) */}
        <div className="flex md:hidden items-center justify-between gap-2 pt-2 border-t border-white/15">
          <span className="text-[11px] italic text-white/90">“Monitoring Today for Safer Tomorrows”</span>
          <div className="flex items-center gap-1.5 text-[10px] text-white/90">
            <MapPin className="w-3 h-3 text-emerald-400" />
            <span>Kullu – Manali</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsHeader;
