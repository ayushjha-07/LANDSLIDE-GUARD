import React from 'react';
import { 
  Gauge, 
  Droplets, 
  CloudRain, 
  AlertTriangle, 
  Activity, 
  Thermometer 
} from 'lucide-react';

export const RiskSensorFactorsCard = () => {
  return (
    <div className="bg-white dark:bg-[#0c121e] border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900/60 text-emerald-500 flex items-center justify-center shrink-0">
            <Gauge className="w-4 h-4 text-emerald-500" />
          </div>
          <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
            Current Sensor Factors
          </h2>
        </div>

        {/* Live Data Badge */}
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Live Data</span>
        </div>
      </div>

      {/* 2x3 Grid of Sensor Factors */}
      <div className="grid grid-cols-2 gap-2.5 my-auto">
        {/* 1. Soil Moisture */}
        <div className="p-2.5 rounded-xl bg-slate-50/80 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800/60 flex flex-col justify-between min-h-[78px]">
          <div className="flex items-start gap-2">
            <div className="w-6 h-6 rounded-md bg-sky-100 dark:bg-sky-950/80 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
              <Droplets className="w-3.5 h-3.5 fill-sky-500/20" />
            </div>
            <div className="min-w-0">
              <div className="text-[10.5px] text-slate-500 dark:text-slate-400 leading-tight whitespace-nowrap">Soil Moisture</div>
              <div className="flex items-baseline gap-1 text-sm sm:text-[15px] font-bold font-mono text-slate-900 dark:text-white mt-0.5 whitespace-nowrap">
                <span>42.4</span>
                <span className="text-[11px] font-sans font-normal text-slate-400">%</span>
              </div>
            </div>
          </div>
          {/* Sparkline */}
          <div className="w-full h-4 mt-1.5">
            <svg viewBox="0 0 100 20" className="w-full h-full overflow-visible">
              <path
                d="M 0,14 Q 25,6 50,14 T 100,8"
                fill="none"
                stroke="#10b981"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* 2. Rainfall (24h) */}
        <div className="p-2.5 rounded-xl bg-slate-50/80 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800/60 flex flex-col justify-between min-h-[78px]">
          <div className="flex items-start gap-2">
            <div className="w-6 h-6 rounded-md bg-sky-100 dark:bg-sky-950/80 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
              <CloudRain className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <div className="text-[10.5px] text-slate-500 dark:text-slate-400 leading-tight whitespace-nowrap">Rainfall (24h)</div>
              <div className="flex items-baseline gap-1 text-sm sm:text-[15px] font-bold font-mono text-slate-900 dark:text-white mt-0.5 whitespace-nowrap">
                <span>12</span>
                <span className="text-[11px] font-sans font-normal text-slate-400">mm</span>
              </div>
            </div>
          </div>
          {/* Bar sparkline */}
          <div className="flex items-end justify-between gap-1 w-full h-4 mt-1.5 px-0.5">
            {[3, 4, 3, 5, 4, 6, 8, 7, 10, 8, 14, 12].map((val, idx) => (
              <span
                key={idx}
                className="flex-1 bg-sky-500 dark:bg-sky-400 rounded-xs"
                style={{ height: `${(val / 14) * 100}%` }}
              />
            ))}
          </div>
        </div>

        {/* 3. Ground Tilt */}
        <div className="p-2.5 rounded-xl bg-slate-50/80 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800/60 flex flex-col justify-between min-h-[78px]">
          <div className="flex items-start gap-2">
            <div className="w-6 h-6 rounded-md bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <div className="text-[10.5px] text-slate-500 dark:text-slate-400 leading-tight whitespace-nowrap">Ground Tilt</div>
              <div className="flex items-baseline gap-1 text-sm sm:text-[15px] font-bold font-mono text-slate-900 dark:text-white mt-0.5 whitespace-nowrap">
                <span>1.77</span>
                <span className="text-[11px] font-sans font-normal text-slate-400">&deg;</span>
              </div>
            </div>
          </div>
          {/* Sparkline */}
          <div className="w-full h-4 mt-1.5">
            <svg viewBox="0 0 100 20" className="w-full h-full overflow-visible">
              <path
                d="M 0,12 Q 25,18 45,6 T 75,14 T 100,10"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* 4. Vibration */}
        <div className="p-2.5 rounded-xl bg-slate-50/80 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800/60 flex flex-col justify-between min-h-[78px]">
          <div className="flex items-start gap-2">
            <div className="w-6 h-6 rounded-md bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
              <Activity className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <div className="text-[10.5px] text-slate-500 dark:text-slate-400 leading-tight whitespace-nowrap">Vibration</div>
              <div className="flex items-baseline gap-1 text-sm sm:text-[15px] font-bold font-mono text-slate-900 dark:text-white mt-0.5 whitespace-nowrap">
                <span>0.033</span>
                <span className="text-[11px] font-sans font-normal text-slate-400">g</span>
              </div>
            </div>
          </div>
          {/* Sparkline */}
          <div className="w-full h-4 mt-1.5">
            <svg viewBox="0 0 100 20" className="w-full h-full overflow-visible">
              <path
                d="M 0,15 L 20,15 L 28,6 L 36,18 L 48,4 L 56,16 L 100,15"
                fill="none"
                stroke="#ef4444"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* 5. Temperature */}
        <div className="p-2.5 rounded-xl bg-slate-50/80 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800/60 flex flex-col justify-between min-h-[78px]">
          <div className="flex items-start gap-2">
            <div className="w-6 h-6 rounded-md bg-orange-100 dark:bg-orange-950/80 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0">
              <Thermometer className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <div className="text-[10.5px] text-slate-500 dark:text-slate-400 leading-tight whitespace-nowrap">Temperature</div>
              <div className="flex items-baseline gap-1 text-sm sm:text-[15px] font-bold font-mono text-slate-900 dark:text-white mt-0.5 whitespace-nowrap">
                <span>21.6</span>
                <span className="text-[11px] font-sans font-normal text-slate-400">&deg;C</span>
              </div>
            </div>
          </div>
          {/* Sparkline */}
          <div className="w-full h-4 mt-1.5">
            <svg viewBox="0 0 100 20" className="w-full h-full overflow-visible">
              <path
                d="M 0,16 Q 30,14 60,6 T 100,4"
                fill="none"
                stroke="#10b981"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* 6. Humidity */}
        <div className="p-2.5 rounded-xl bg-slate-50/80 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800/60 flex flex-col justify-between min-h-[78px]">
          <div className="flex items-start gap-2">
            <div className="w-6 h-6 rounded-md bg-sky-100 dark:bg-sky-950/80 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
              <Droplets className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <div className="text-[10.5px] text-slate-500 dark:text-slate-400 leading-tight whitespace-nowrap">Humidity</div>
              <div className="flex items-baseline gap-1 text-sm sm:text-[15px] font-bold font-mono text-slate-900 dark:text-white mt-0.5 whitespace-nowrap">
                <span>72</span>
                <span className="text-[11px] font-sans font-normal text-slate-400">%</span>
              </div>
            </div>
          </div>
          {/* Sparkline */}
          <div className="w-full h-4 mt-1.5">
            <svg viewBox="0 0 100 20" className="w-full h-full overflow-visible">
              <path
                d="M 0,15 Q 35,16 65,8 T 100,6"
                fill="none"
                stroke="#10b981"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskSensorFactorsCard;
