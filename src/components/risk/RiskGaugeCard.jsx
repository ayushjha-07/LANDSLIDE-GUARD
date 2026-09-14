import React from 'react';
import { ShieldCheck, MoreVertical, TrendingUp, Clock, Info } from 'lucide-react';

export const RiskGaugeCard = () => {
  const riskValue = 22;
  // Needle calculation
  // 180° = value 0 (left), 90° = value 50 (top), 0° = value 100 (right)
  const angleRad = (180 - (riskValue / 100) * 180) * (Math.PI / 180);
  const cx = 110;
  const cy = 115;
  const needleLength = 65;
  const nx = cx + needleLength * Math.cos(angleRad);
  const ny = cy - needleLength * Math.sin(angleRad);

  return (
    <div className="bg-white dark:bg-[#0c121e] border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900/60 text-emerald-500 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4 fill-emerald-500/20 text-emerald-500" />
          </div>
          <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
            Overall Risk Assessment
          </h2>
        </div>
        <button 
          type="button" 
          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-1"
          aria-label="Options"
        >
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>

      {/* Semi-Circular Radial Gauge */}
      <div className="relative flex flex-col items-center justify-center my-auto select-none py-1">
        <svg viewBox="0 0 220 135" className="w-56 sm:w-64 max-w-full overflow-visible">
          {/* Gauge Background Shadow/Track */}
          <path
            d="M 28,115 A 82,82 0 0,1 192,115"
            fill="none"
            stroke="currentColor"
            className="text-slate-100 dark:text-slate-800/70"
            strokeWidth="15"
            strokeLinecap="round"
          />

          {/* 4 Arc Color Segments (0-25 Green, 25-50 Lime, 50-75 Orange, 75-100 Red) */}
          {/* Segment 1: 0 - 25 (180° to 135°) */}
          <path
            d="M 30,115 A 80,80 0 0,1 53.4,58.4"
            fill="none"
            stroke="#10b981"
            strokeWidth="13"
            strokeLinecap="round"
          />
          {/* Segment 2: 25 - 50 (135° to 90°) */}
          <path
            d="M 53.4,58.4 A 80,80 0 0,1 110,35"
            fill="none"
            stroke="#84cc16"
            strokeWidth="13"
          />
          {/* Segment 3: 50 - 75 (90° to 45°) */}
          <path
            d="M 110,35 A 80,80 0 0,1 166.6,58.4"
            fill="none"
            stroke="#f97316"
            strokeWidth="13"
          />
          {/* Segment 4: 75 - 100 (45° to 0°) */}
          <path
            d="M 166.6,58.4 A 80,80 0 0,1 190,115"
            fill="none"
            stroke="#ef4444"
            strokeWidth="13"
            strokeLinecap="round"
          />

          {/* Scale Labels */}
          <text x="20" y="130" className="text-[10px] fill-slate-400 font-semibold" textAnchor="middle">0</text>
          <text x="44" y="52" className="text-[10px] fill-slate-400 font-semibold" textAnchor="middle">25</text>
          <text x="110" y="24" className="text-[10px] fill-slate-400 font-semibold" textAnchor="middle">50</text>
          <text x="176" y="52" className="text-[10px] fill-slate-400 font-semibold" textAnchor="middle">75</text>
          <text x="200" y="130" className="text-[10px] fill-slate-400 font-semibold" textAnchor="middle">100</text>

          {/* Needle Indicator */}
          <line
            x1={cx}
            y1={cy}
            x2={nx}
            y2={ny}
            stroke="#475569"
            strokeWidth="3.2"
            strokeLinecap="round"
            className="dark:stroke-slate-300"
          />
          {/* Center Hub Cap */}
          <circle cx={cx} cy={cy} r="5.5" fill="#1e293b" className="dark:fill-slate-100" />
          <circle cx={cx} cy={cy} r="2" fill="#f8fafc" className="dark:fill-slate-900" />
        </svg>

        {/* Value readout centered under arc */}
        <div className="absolute top-[40px] sm:top-[42px] flex flex-col items-center pointer-events-none">
          <div className="text-3xl sm:text-4xl font-extrabold font-mono text-slate-900 dark:text-white tracking-tight leading-none">
            22
          </div>
          <div className="text-[10.5px] text-slate-400 font-medium mt-0.5">
            / 100
          </div>
          <div className="mt-1">
            <span className="inline-block px-3 py-0.5 rounded-full text-xs font-bold bg-emerald-100/90 dark:bg-emerald-950/80 border border-emerald-300/80 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 shadow-2xs">
              Low Risk
            </span>
          </div>
        </div>
      </div>

      {/* Sub metrics: Trend & Prediction */}
      <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
        {/* Trend */}
        <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50/80 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800/60">
          <div className="w-7 h-7 rounded-lg bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <TrendingUp className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] text-slate-400 font-medium">Trend</div>
            <div className="text-xs font-bold text-slate-900 dark:text-white truncate">Stable</div>
          </div>
        </div>

        {/* Prediction */}
        <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50/80 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800/60">
          <div className="w-7 h-7 rounded-lg bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Clock className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] text-slate-400 font-medium">Prediction (6h)</div>
            <div className="text-xs font-bold text-slate-900 dark:text-white truncate">Low Risk</div>
          </div>
        </div>
      </div>

      {/* Bottom Info Banner */}
      <div className="mt-3 p-2.5 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-900/60 flex items-start gap-2">
        <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5">
          <Info className="w-2.5 h-2.5 stroke-[2.5]" />
        </div>
        <div className="text-[11px] leading-tight">
          <div className="font-bold text-emerald-900 dark:text-emerald-300">
            Current risk level is LOW
          </div>
          <div className="text-emerald-700/90 dark:text-emerald-400/90 mt-0.5">
            No immediate landslide threat detected based on multi-sensor analysis.
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskGaugeCard;
