import React from 'react';
import { 
  Thermometer, 
  Droplets, 
  CloudRain, 
  Wind, 
  Compass, 
  Activity, 
  ShieldCheck, 
  Mountain,
  Leaf
} from 'lucide-react';
import mountainQuoteBg from '../../assets/hero_himalayas_banner.jpg';

export const BottomOverviewCards = ({
  temp = 21.6,
  soil = 42.4,
  rainfall = 12,
  humidity = 72,
  tilt = 1.77,
  vibration = 0.033,
  groundCondition = 'Stable'
}) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-3 select-none">
      
      {/* ========================================================================= */}
      {/* 8. ENVIRONMENTAL OVERVIEW (4 Horizontal Columns)                         */}
      {/* ========================================================================= */}
      <div className="xl:col-span-5 rounded-2xl bg-[#09131d] border border-slate-800/80 p-4 shadow-md flex flex-col justify-between">
        
        {/* Header */}
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-800/70">
          <div className="w-6 h-6 rounded-lg bg-teal-500/15 text-teal-400 flex items-center justify-center">
            <Leaf className="w-3.5 h-3.5" />
          </div>
          <h3 className="text-sm sm:text-base font-black font-heading text-white tracking-tight">
            Environmental Overview
          </h3>
        </div>

        {/* 4 Horizontal Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 flex-1">
          {/* Temperature */}
          <div className="flex items-center gap-2 p-2 rounded-xl bg-[#060c13] border border-slate-800/70">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
              <Thermometer className="w-4 h-4" />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-black font-mono text-white">{temp}&deg;C</div>
              <div className="text-[10px] text-slate-400 font-medium">Temperature</div>
            </div>
          </div>

          {/* Soil Moisture */}
          <div className="flex items-center gap-2 p-2 rounded-xl bg-[#060c13] border border-slate-800/70">
            <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center shrink-0">
              <Droplets className="w-4 h-4" />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-black font-mono text-teal-400">{soil}%</div>
              <div className="text-[10px] text-slate-400 font-medium">Soil Moisture</div>
            </div>
          </div>

          {/* Rainfall */}
          <div className="flex items-center gap-2 p-2 rounded-xl bg-[#060c13] border border-slate-800/70">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
              <CloudRain className="w-4 h-4" />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-black font-mono text-cyan-400">{rainfall} mm</div>
              <div className="text-[10px] text-slate-400 font-medium">Rainfall (24h)</div>
            </div>
          </div>

          {/* Humidity */}
          <div className="flex items-center gap-2 p-2 rounded-xl bg-[#060c13] border border-slate-800/70">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <Wind className="w-4 h-4" />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-black font-mono text-emerald-400">{humidity} %</div>
              <div className="text-[10px] text-slate-400 font-medium">Humidity</div>
            </div>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 9. GROUND STABILITY OVERVIEW (3 Horizontal Columns)                      */}
      {/* ========================================================================= */}
      <div className="xl:col-span-4 rounded-2xl bg-[#09131d] border border-slate-800/80 p-4 shadow-md flex flex-col justify-between">
        
        {/* Header */}
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-800/70">
          <div className="w-6 h-6 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
            <Mountain className="w-3.5 h-3.5" />
          </div>
          <h3 className="text-sm sm:text-base font-black font-heading text-white tracking-tight">
            Ground Stability Overview
          </h3>
        </div>

        {/* 3 Horizontal Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 flex-1">
          {/* Current Tilt */}
          <div className="flex items-center gap-2 p-2 rounded-xl bg-[#060c13] border border-slate-800/70">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
              <Compass className="w-4 h-4" />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-black font-mono text-white">{tilt}&deg;</div>
              <div className="text-[10px] text-slate-400 font-medium">Current Tilt</div>
            </div>
          </div>

          {/* Vibration */}
          <div className="flex items-center gap-2 p-2 rounded-xl bg-[#060c13] border border-slate-800/70">
            <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center shrink-0">
              <Activity className="w-4 h-4" />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-black font-mono text-white">{vibration} g</div>
              <div className="text-[10px] text-slate-400 font-medium">Vibration</div>
            </div>
          </div>

          {/* Ground Condition Badge */}
          <div className="flex items-center gap-2 p-2 rounded-xl bg-[#060c13] border border-slate-800/70">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-black font-heading text-emerald-400">{groundCondition}</div>
              <div className="text-[10px] text-slate-400 font-medium">Ground Condition</div>
            </div>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 10. HIMALAYAN QUOTE CARD                                                  */}
      {/* ========================================================================= */}
      <div className="xl:col-span-3 relative rounded-2xl overflow-hidden bg-[#060c13] border border-slate-800/80 p-4 shadow-md flex flex-col justify-between group">
        {/* Himalayan Mountain Background */}
        <div className="absolute inset-0 pointer-events-none select-none z-0">
          <img 
            src={mountainQuoteBg} 
            alt="Himalayan Panorama" 
            className="w-full h-full object-cover object-[center_35%] filter brightness-[0.70] contrast-[1.15] transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#060c13]/90 via-[#060c13]/70 to-[#060c13]/40" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 flex flex-col justify-between h-full space-y-2">
          
          {/* Quote Mark Icon */}
          <div className="w-7 h-7 rounded-lg bg-slate-900/80 border border-white/15 text-emerald-400 flex items-center justify-center text-sm font-serif font-black shadow-xs">
            &ldquo;
          </div>

          {/* Quote Text */}
          <div className="my-auto py-1">
            <p className="font-serif italic text-xs sm:text-sm text-slate-100 font-medium leading-relaxed drop-shadow-sm">
              &ldquo;Monitoring the mountains today for safer communities tomorrow.&rdquo;
            </p>
            <div className="w-12 h-0.5 bg-emerald-400/80 rounded-full mt-2" />
          </div>

          {/* Subtle branding */}
          <div className="text-[9.5px] text-slate-400 font-mono flex items-center justify-between pt-1 border-t border-white/10">
            <span>Landslide Guard</span>
            <span>Himachal Pradesh</span>
          </div>

        </div>
      </div>

    </div>
  );
};

export default BottomOverviewCards;
