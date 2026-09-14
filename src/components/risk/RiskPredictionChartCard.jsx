import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const DATA_POINTS = [
  { label: 'Now', time: '07:24 (Now)', value: 21, isPredicted: false, isSmall: false, x: 40, y: 128.0 },
  { label: '30m', time: '07:54 (+30m)', value: 16.5, isPredicted: false, isSmall: true, x: 60, y: 134.9 },
  { label: '1h', time: '08:24 (+1h)', value: 18, isPredicted: false, isSmall: false, x: 80, y: 132.6 },
  { label: '1.5h', time: '08:54 (+1.5h)', value: 17, isPredicted: false, isSmall: true, x: 100, y: 134.1 },
  { label: '2h', time: '09:24 (+2h)', value: 16, isPredicted: false, isSmall: false, x: 120, y: 135.6 },
  { label: '2.5h', time: '09:54 (+2.5h)', value: 15, isPredicted: false, isSmall: true, x: 140, y: 137.2 },
  { label: '3h', time: '10:24 (+3h)', value: 12, isPredicted: false, isSmall: false, x: 160, y: 141.7 },
  { label: '3.5h', time: '10:54 (+3.5h)', value: 12, isPredicted: false, isSmall: true, x: 180, y: 141.7 },
  { label: '4h', time: '11:24 (+4h)', value: 12, isPredicted: false, isSmall: false, x: 200, y: 141.7 },
  { label: '5h', time: '12:24 (+5h)', value: 15.5, isPredicted: true, isSmall: false, x: 240, y: 136.4 },
  { label: '6h', time: '13:24 (+6h)', value: 18.5, isPredicted: true, isSmall: false, x: 280, y: 131.8 },
  { label: 'Edge', time: '14:24 (+7h)', value: 24.5, isPredicted: true, isSmall: false, x: 320, y: 122.7 },
];

export const RiskPredictionChartCard = () => {
  const [selectedMetric, setSelectedMetric] = useState('Risk Score');
  const [hoveredPoint, setHoveredPoint] = useState(null);

  const getStatusText = (val) => {
    if (val >= 75) return 'Critical';
    if (val >= 50) return 'High Risk';
    if (val >= 25) return 'Warning';
    return 'Safe';
  };

  const getStatusColor = (val) => {
    if (val >= 75) return 'text-red-500';
    if (val >= 50) return 'text-orange-500';
    if (val >= 25) return 'text-amber-500';
    return 'text-emerald-500';
  };

  return (
    <div className="bg-white dark:bg-[#0c121e] border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-4 shadow-xs flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-1.5">
        <div className="flex items-center gap-2 min-w-0">
          {/* Custom 3 rising vertical bars matching reference icon */}
          <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <rect x="2" y="11" width="3.5" height="7" rx="0.8" />
            <rect x="7.5" y="7" width="3.5" height="11" rx="0.8" />
            <rect x="13" y="3" width="3.5" height="15" rx="0.8" />
          </svg>
          <h2 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
            Risk Prediction (Next 6 Hours)
          </h2>
        </div>

        {/* Dropdown Selector */}
        <button
          type="button"
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 transition-colors shrink-0 whitespace-nowrap"
        >
          <span>{selectedMetric}</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </button>
      </div>

      {/* Legend directly matching reference image */}
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 my-1 text-xs select-none">
        {/* Historical */}
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-[2px] bg-emerald-500 rounded-full" />
          <span className="w-2.5 h-2.5 rounded-full border-2 border-emerald-500 bg-white dark:bg-[#0c121e] -ml-2 mr-0.5" />
          <span className="w-3.5 h-[2px] bg-emerald-500 rounded-full -ml-1.5" />
          <span className="text-[11px] font-medium text-slate-600 dark:text-slate-400">Historical</span>
        </div>

        {/* Predicted */}
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-[2px] border-t-2 border-dashed border-sky-500" />
          <span className="w-2.5 h-2.5 rounded-full border-2 border-sky-500 bg-white dark:bg-[#0c121e] -ml-2 mr-0.5" />
          <span className="w-3.5 h-[2px] border-t-2 border-dashed border-sky-500 -ml-1.5" />
          <span className="text-[11px] font-medium text-slate-600 dark:text-slate-400">Predicted</span>
        </div>

        {/* Confidence Range */}
        <div className="flex items-center gap-1.5">
          <span className="w-4 h-2.5 rounded-xs bg-sky-200/60 dark:bg-sky-950/60 border border-dashed border-sky-400" />
          <span className="text-[11px] font-medium text-slate-600 dark:text-slate-400">Confidence Range</span>
        </div>
      </div>

      {/* SVG Chart Container */}
      <div className="relative w-full flex-1 flex items-center justify-center select-none pt-1">
        <svg 
          viewBox="0 0 380 186" 
          className="w-full h-auto overflow-visible"
        >
          {/* Rotated Y Axis Title */}
          <text 
            x="-84" 
            y="11" 
            transform="rotate(-90)" 
            className="text-[9.5px] fill-slate-400 dark:fill-slate-500 font-semibold tracking-wide" 
            textAnchor="middle"
          >
            Risk Score
          </text>

          {/* Y Axis Numbers on left */}
          <text x="34" y="11" className="text-[9px] fill-slate-400 dark:fill-slate-500 font-mono font-medium" textAnchor="end">100</text>
          <text x="34" y="49" className="text-[9px] fill-slate-400 dark:fill-slate-500 font-mono font-medium" textAnchor="end">75</text>
          <text x="34" y="87" className="text-[9px] fill-slate-400 dark:fill-slate-500 font-mono font-medium" textAnchor="end">50</text>
          <text x="34" y="125" className="text-[9px] fill-slate-400 dark:fill-slate-500 font-mono font-medium" textAnchor="end">25</text>
          <text x="34" y="163" className="text-[9px] fill-slate-400 dark:fill-slate-500 font-mono font-medium" textAnchor="end">0</text>

          {/* Y Axis Small Ticks */}
          <line x1="38" y1="8" x2="40" y2="8" stroke="currentColor" className="text-slate-300 dark:text-slate-600" strokeWidth="0.8" />
          <line x1="38" y1="46" x2="40" y2="46" stroke="currentColor" className="text-slate-300 dark:text-slate-600" strokeWidth="0.8" />
          <line x1="38" y1="84" x2="40" y2="84" stroke="currentColor" className="text-slate-300 dark:text-slate-600" strokeWidth="0.8" />
          <line x1="38" y1="122" x2="40" y2="122" stroke="currentColor" className="text-slate-300 dark:text-slate-600" strokeWidth="0.8" />
          <line x1="38" y1="160" x2="40" y2="160" stroke="currentColor" className="text-slate-300 dark:text-slate-600" strokeWidth="0.8" />

          {/* 4 Colored Risk Bands filling plot box */}
          {/* Critical: 75 to 100 */}
          <rect x="40" y="8" width="280" height="38" fill="#fee2e2" fillOpacity="0.7" className="dark:fill-red-950/40" />
          {/* High Risk: 50 to 75 */}
          <rect x="40" y="46" width="280" height="38" fill="#ffedd5" fillOpacity="0.7" className="dark:fill-orange-950/40" />
          {/* Warning: 25 to 50 */}
          <rect x="40" y="84" width="280" height="38" fill="#fef9c3" fillOpacity="0.7" className="dark:fill-amber-950/40" />
          {/* Safe: 0 to 25 */}
          <rect x="40" y="122" width="280" height="38" fill="#dcfce7" fillOpacity="0.7" className="dark:fill-emerald-950/40" />

          {/* Plot Box Outer Border */}
          <rect 
            x="40" 
            y="8" 
            width="280" 
            height="152" 
            fill="none" 
            stroke="currentColor" 
            className="text-slate-200 dark:text-slate-700/80" 
            strokeWidth="0.8" 
          />

          {/* Horizontal Grid lines */}
          <line x1="40" y1="46" x2="320" y2="46" stroke="currentColor" className="text-slate-200/80 dark:text-slate-700/60" strokeWidth="0.8" strokeDasharray="2 2" />
          <line x1="40" y1="84" x2="320" y2="84" stroke="currentColor" className="text-slate-200/80 dark:text-slate-700/60" strokeWidth="0.8" strokeDasharray="2 2" />
          <line x1="40" y1="122" x2="320" y2="122" stroke="currentColor" className="text-slate-200/80 dark:text-slate-700/60" strokeWidth="0.8" strokeDasharray="2 2" />

          {/* Vertical Grid lines at hour marks */}
          {[80, 120, 160, 200, 240, 280].map((vx, idx) => (
            <line
              key={idx}
              x1={vx}
              y1="8"
              x2={vx}
              y2="160"
              stroke="currentColor"
              className="text-slate-200/80 dark:text-slate-700/60"
              strokeWidth="0.8"
              strokeDasharray="2 2"
            />
          ))}

          {/* Bottom X-Axis Small Ticks */}
          {[40, 80, 120, 160, 200, 240, 280, 320].map((vx, idx) => (
            <line key={idx} x1={vx} y1="160" x2={vx} y2="162.5" stroke="currentColor" className="text-slate-300 dark:text-slate-600" strokeWidth="0.8" />
          ))}

          {/* Right-Hand Risk Band Status Pills */}
          {/* Critical */}
          <g transform="translate(326, 14)">
            <rect width="48" height="26" rx="5" fill="#fee2e2" className="dark:fill-red-950/80" />
            <text x="24" y="17" fill="#ef4444" className="text-[9.5px] font-bold" textAnchor="middle">Critical</text>
          </g>
          {/* High Risk */}
          <g transform="translate(326, 52)">
            <rect width="48" height="26" rx="5" fill="#ffedd5" className="dark:fill-orange-950/80" />
            <text x="24" y="17" fill="#f97316" className="text-[9.5px] font-bold" textAnchor="middle">High Risk</text>
          </g>
          {/* Warning */}
          <g transform="translate(326, 90)">
            <rect width="48" height="26" rx="5" fill="#fef3c7" className="dark:fill-amber-950/80" />
            <text x="24" y="17" fill="#f59e0b" className="text-[9.5px] font-bold" textAnchor="middle">Warning</text>
          </g>
          {/* Safe */}
          <g transform="translate(326, 128)">
            <rect width="48" height="26" rx="5" fill="#d1fae5" className="dark:fill-emerald-950/80" />
            <text x="24" y="17" fill="#10b981" className="text-[9.5px] font-bold" textAnchor="middle">Safe</text>
          </g>

          {/* Confidence Range Shaded Fan Area (4h to edge) */}
          <path
            d="M 200,141.7 C 240,128.0 280,115.9 320,102.2 L 320,149.3 C 280,147.8 240,144.8 200,141.7 Z"
            fill="rgba(56, 189, 248, 0.2)"
            className="dark:fill-sky-500/20"
          />
          {/* Upper dashed border of confidence range */}
          <path
            d="M 200,141.7 C 240,128.0 280,115.9 320,102.2"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="1.2"
            strokeDasharray="3 3"
          />

          {/* Historical Line (Now to 4h) */}
          <path
            d="M 40,128.0 L 60,134.9 L 80,132.6 L 100,134.1 L 120,135.6 L 140,137.2 L 160,141.7 L 180,141.7 L 200,141.7"
            fill="none"
            stroke="#10b981"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Predicted Line (4h to Edge) */}
          <path
            d="M 200,141.7 L 240,136.4 L 280,131.8 L 320,122.7"
            fill="none"
            stroke="#0284c7"
            strokeWidth="2.2"
            strokeDasharray="5 3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data Points Interactive Circles */}
          {DATA_POINTS.map((pt, idx) => (
            <g 
              key={idx} 
              className="cursor-pointer"
              onMouseEnter={() => setHoveredPoint(pt)}
              onMouseLeave={() => setHoveredPoint(null)}
            >
              <circle cx={pt.x} cy={pt.y} r="7" fill="transparent" />
              <circle
                cx={pt.x}
                cy={pt.y}
                r={hoveredPoint?.x === pt.x ? (pt.isSmall ? 3.5 : 4.5) : (pt.isSmall ? 2 : 3.2)}
                fill="#ffffff"
                className="dark:fill-[#0c121e]"
                stroke={pt.isPredicted ? '#0284c7' : '#10b981'}
                strokeWidth={hoveredPoint?.x === pt.x ? 2.2 : 1.8}
              />
            </g>
          ))}

          {/* X Axis Tick Labels */}
          <text x="40" y="172" className="text-[9px] fill-slate-500 font-medium" textAnchor="middle">Now</text>
          <text x="80" y="172" className="text-[9px] fill-slate-500 font-medium" textAnchor="middle">1h</text>
          <text x="120" y="172" className="text-[9px] fill-slate-500 font-medium" textAnchor="middle">2h</text>
          <text x="160" y="172" className="text-[9px] fill-slate-500 font-medium" textAnchor="middle">3h</text>
          <text x="200" y="172" className="text-[9px] fill-slate-500 font-medium" textAnchor="middle">4h</text>
          <text x="240" y="172" className="text-[9px] fill-slate-500 font-medium" textAnchor="middle">5h</text>
          <text x="280" y="172" className="text-[9px] fill-slate-500 font-medium" textAnchor="middle">6h</text>
        </svg>

        {/* Hover Tooltip Overlay */}
        {hoveredPoint && (
          <div 
            className="absolute z-20 px-2.5 py-1.5 rounded-lg bg-slate-900/90 text-white text-[11px] shadow-lg pointer-events-none backdrop-blur-xs border border-white/20 transform -translate-x-1/2 -translate-y-full"
            style={{
              left: `${(hoveredPoint.x / 380) * 100}%`,
              top: `${(hoveredPoint.y / 186) * 90}%`,
            }}
          >
            <div className="font-semibold">{hoveredPoint.time}</div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span>Risk: <strong className="font-mono">{hoveredPoint.value} / 100</strong></span>
              <span className={`font-bold ${getStatusColor(hoveredPoint.value)}`}>
                ({getStatusText(hoveredPoint.value)})
              </span>
            </div>
            <div className="text-[9px] text-slate-300">
              {hoveredPoint.isPredicted ? 'AI LSTM Forecast' : 'Verified IoT Reading'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RiskPredictionChartCard;
