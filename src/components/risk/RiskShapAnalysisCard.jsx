import React, { useState } from 'react';
import { Network, ChevronDown } from 'lucide-react';

const SHAP_FEATURES = [
  { name: '3-Day Rainfall', value: '+0.32', widthPct: 62, color: 'bg-[#f43f5e]' },
  { name: 'Soil Moisture', value: '+0.24', widthPct: 47, color: 'bg-[#f97316]' },
  { name: 'Ground Tilt', value: '+0.18', widthPct: 35, color: 'bg-[#f59e0b]' },
  { name: 'Vibration', value: '+0.12', widthPct: 24, color: 'bg-[#3b82f6]' },
  { name: 'Temperature', value: '+0.08', widthPct: 16, color: 'bg-[#60a5fa]' },
  { name: 'Humidity', value: '+0.06', widthPct: 12, color: 'bg-[#93c5fd]' },
  { name: 'Terrain Slope', value: '+0.04', widthPct: 8, color: 'bg-[#94a3b8]' },
];

export const RiskShapAnalysisCard = () => {
  const [predictionSelection, setPredictionSelection] = useState('Current Prediction');

  return (
    <div className="bg-white dark:bg-[#0c121e] border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900/60 text-emerald-500 flex items-center justify-center shrink-0">
            <Network className="w-4 h-4 text-emerald-500" />
          </div>
          <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
            Feature Contribution (SHAP Analysis)
          </h2>
        </div>

        {/* Dropdown */}
        <button
          type="button"
          className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 transition-colors"
        >
          <span>{predictionSelection}</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </button>
      </div>

      {/* SHAP Bars List */}
      <div className="space-y-2.5 my-auto py-1">
        {SHAP_FEATURES.map((item) => (
          <div key={item.name} className="flex items-center gap-3 text-xs">
            {/* Feature Name */}
            <span className="w-24 sm:w-26 text-[11.5px] font-medium text-slate-700 dark:text-slate-300 truncate shrink-0">
              {item.name}
            </span>

            {/* Zero-Centered Bar Track */}
            <div className="relative flex-1 h-3.5 bg-slate-100 dark:bg-slate-800/70 rounded-xs overflow-hidden flex items-center">
              {/* Zero reference guideline */}
              <div className="absolute left-[30%] top-0 bottom-0 w-[1px] bg-slate-300 dark:bg-slate-600 z-10" />

              {/* Positive Risk Bar starting from 30% extending right */}
              <div
                className={`absolute left-[30%] top-0.5 bottom-0.5 rounded-xs transition-all duration-500 ${item.color}`}
                style={{ width: `${item.widthPct}%` }}
              />
            </div>

            {/* Value */}
            <span className="w-11 text-right text-[11px] font-mono font-semibold text-slate-700 dark:text-slate-300 shrink-0">
              {item.value}
            </span>
          </div>
        ))}
      </div>

      {/* Footer Axis Guide */}
      <div className="flex items-center justify-between text-[10.5px] text-slate-400 dark:text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800/80 mt-2">
        <span className="pl-1">Decreases Risk &larr;</span>
        <span className="pr-1">&rarr; Increases Risk</span>
      </div>
    </div>
  );
};

export default RiskShapAnalysisCard;
