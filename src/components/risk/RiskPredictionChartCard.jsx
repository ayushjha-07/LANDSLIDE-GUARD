import React, { useState } from 'react';
import { TrendingUp, ChevronDown } from 'lucide-react';

export const RiskPredictionChartCard = () => {
  const [selectedMetric, setSelectedMetric] = useState('Risk Score');

  return (
    <div className="bg-white dark:bg-[#0c121e] border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900/60 text-emerald-500 flex items-center justify-center shrink-0">
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
            Risk Prediction (Next 6 Hours)
          </h2>
        </div>

        {/* Dropdown Selector */}
        <div className="relative">
          <button
            type="button"
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 transition-colors"
          >
            <span>{selectedMetric}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mb-2 text-xs text-slate-600 dark:text-slate-400">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 bg-emerald-500 rounded-full" />
          <span className="w-2 h-2 rounded-full bg-emerald-500 -ml-2 mr-0.5" />
          <span className="w-3 h-0.5 bg-emerald-500 rounded-full -ml-1.5" />
          <span className="text-[11px] font-medium text-slate-700 dark:text-slate-300">Historical</span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 border-t border-dashed border-sky-500" />
          <span className="w-2 h-2 rounded-full border border-sky-500 bg-white dark:bg-[#0c121e] -ml-2 mr-0.5" />
          <span className="w-3 h-0.5 border-t border-dashed border-sky-500 -ml-1.5" />
          <span className="text-[11px] font-medium text-slate-700 dark:text-slate-300">Predicted</span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-2.5 rounded-xs bg-sky-100 dark:bg-sky-950/60 border border-dashed border-sky-400" />
          <span className="text-[11px] font-medium text-slate-700 dark:text-slate-300">Confidence Range</span>
        </div>
      </div>

      {/* SVG Chart */}
      <div className="relative w-full flex-1 min-h-[220px] flex items-center justify-center overflow-x-auto select-none my-auto">
        <svg viewBox="0 0 500 205" className="w-full h-full min-w-[340px]">
          {/* Risk Level Background Color Bands */}
          {/* Critical: 75 to 100 */}
          <rect x="45" y="15" width="375" height="38" fill="currentColor" className="text-red-500/10 dark:text-red-500/15" />
          {/* High Risk: 50 to 75 */}
          <rect x="45" y="53" width="375" height="38" fill="currentColor" className="text-orange-500/10 dark:text-orange-500/15" />
          {/* Warning: 25 to 50 */}
          <rect x="45" y="91" width="375" height="38" fill="currentColor" className="text-amber-500/10 dark:text-amber-500/15" />
          {/* Safe: 0 to 25 */}
          <rect x="45" y="129" width="375" height="38" fill="currentColor" className="text-emerald-500/10 dark:text-emerald-500/15" />

          {/* Grid lines */}
          <line x1="45" y1="15" x2="420" y2="15" stroke="currentColor" className="text-slate-200 dark:text-slate-800" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="45" y1="53" x2="420" y2="53" stroke="currentColor" className="text-slate-200 dark:text-slate-800" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="45" y1="91" x2="420" y2="91" stroke="currentColor" className="text-slate-200 dark:text-slate-800" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="45" y1="129" x2="420" y2="129" stroke="currentColor" className="text-slate-200 dark:text-slate-800" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="45" y1="167" x2="420" y2="167" stroke="currentColor" className="text-slate-300 dark:text-slate-700" strokeWidth="1.2" />

          {/* Y Axis Labels */}
          <text x="35" y="19" className="text-[9.5px] fill-slate-400 font-mono font-medium" textAnchor="end">100</text>
          <text x="35" y="57" className="text-[9.5px] fill-slate-400 font-mono font-medium" textAnchor="end">75</text>
          <text x="35" y="95" className="text-[9.5px] fill-slate-400 font-mono font-medium" textAnchor="end">50</text>
          <text x="35" y="133" className="text-[9.5px] fill-slate-400 font-mono font-medium" textAnchor="end">25</text>
          <text x="35" y="171" className="text-[9.5px] fill-slate-400 font-mono font-medium" textAnchor="end">0</text>

          {/* Rotated Y Axis Title */}
          <text 
            x="-91" 
            y="12" 
            transform="rotate(-90)" 
            className="text-[10px] fill-slate-400 font-semibold tracking-wide" 
            textAnchor="middle"
          >
            Risk Score
          </text>

          {/* Right-Hand Risk Band Status Pills */}
          {/* Critical */}
          <g transform="translate(428, 22)">
            <rect width="64" height="24" rx="6" fill="#fee2e2" className="dark:fill-red-950/60" />
            <text x="32" y="15.5" fill="#ef4444" className="text-[10.5px] font-bold" textAnchor="middle">Critical</text>
          </g>
          {/* High Risk */}
          <g transform="translate(428, 60)">
            <rect width="64" height="24" rx="6" fill="#ffedd5" className="dark:fill-orange-950/60" />
            <text x="32" y="15.5" fill="#f97316" className="text-[10.5px] font-bold" textAnchor="middle">High Risk</text>
          </g>
          {/* Warning */}
          <g transform="translate(428, 98)">
            <rect width="64" height="24" rx="6" fill="#fef3c7" className="dark:fill-amber-950/60" />
            <text x="32" y="15.5" fill="#f59e0b" className="text-[10.5px] font-bold" textAnchor="middle">Warning</text>
          </g>
          {/* Safe */}
          <g transform="translate(428, 136)">
            <rect width="64" height="24" rx="6" fill="#d1fae5" className="dark:fill-emerald-950/60" />
            <text x="32" y="15.5" fill="#10b981" className="text-[10.5px] font-bold" textAnchor="middle">Safe</text>
          </g>

          {/* Confidence Range Shaded Fan Area (4h to 6h) */}
          <path
            d="M 295,150 Q 357.5,128 420,102 L 420,162 Q 357.5,156 295,150 Z"
            fill="rgba(14, 165, 233, 0.18)"
            stroke="rgba(14, 165, 233, 0.4)"
            strokeWidth="1"
            strokeDasharray="3 3"
          />

          {/* Historical Line (Now to 4h) */}
          <path
            d="M 45,134 L 107.5,140 L 170,141 L 232.5,148 L 295,150"
            fill="none"
            stroke="#10b981"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Historical Dots */}
          <circle cx="45" cy="134" r="3.5" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
          <circle cx="107.5" cy="140" r="3.5" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
          <circle cx="170" cy="141" r="3.5" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
          <circle cx="232.5" cy="148" r="3.5" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
          <circle cx="295" cy="150" r="3.5" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />

          {/* Predicted Line (4h to 6h) */}
          <path
            d="M 295,150 L 357.5,142 L 420,130"
            fill="none"
            stroke="#0284c7"
            strokeWidth="2.5"
            strokeDasharray="5 4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Predicted Hollow Dots */}
          <circle cx="357.5" cy="142" r="3.5" fill="#ffffff" className="dark:fill-[#0c121e]" stroke="#0284c7" strokeWidth="2" />
          <circle cx="420" cy="130" r="3.5" fill="#ffffff" className="dark:fill-[#0c121e]" stroke="#0284c7" strokeWidth="2" />

          {/* X Axis Labels */}
          <text x="45" y="188" className="text-[10px] fill-slate-500 font-medium" textAnchor="middle">Now</text>
          <text x="107.5" y="188" className="text-[10px] fill-slate-500 font-medium" textAnchor="middle">1h</text>
          <text x="170" y="188" className="text-[10px] fill-slate-500 font-medium" textAnchor="middle">2h</text>
          <text x="232.5" y="188" className="text-[10px] fill-slate-500 font-medium" textAnchor="middle">3h</text>
          <text x="295" y="188" className="text-[10px] fill-slate-500 font-medium" textAnchor="middle">4h</text>
          <text x="357.5" y="188" className="text-[10px] fill-slate-500 font-medium" textAnchor="middle">5h</text>
          <text x="420" y="188" className="text-[10px] fill-slate-500 font-medium" textAnchor="middle">6h</text>
        </svg>
      </div>
    </div>
  );
};

export default RiskPredictionChartCard;
