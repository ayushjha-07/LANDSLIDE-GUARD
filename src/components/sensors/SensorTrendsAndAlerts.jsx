import React, { useState } from 'react';
import { 
  Bell, 
  ChevronDown, 
  AlertTriangle, 
  Flame, 
  CloudRain, 
  CheckCircle2, 
  ArrowUpRight,
  Thermometer
} from 'lucide-react';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceArea,
  ReferenceLine
} from 'recharts';
import { Link } from 'react-router-dom';

// Exact 24-hour time series matching reference image (ref_trends_chart.png)
const TREND_DATA_24H = [
  { time: '00:00', temp: 19.3, displayTime: '00:00' },
  { time: '01:00', temp: 18.5 },
  { time: '02:00', temp: 17.8, displayTime: '02:00' },
  { time: '03:00', temp: 17.5, isMin: true }, // Min 17.5°C dip
  { time: '04:00', temp: 17.4, displayTime: '04:00' },
  { time: '05:00', temp: 18.0 },
  { time: '06:00', temp: 18.8, displayTime: '06:00' },
  { time: '07:00', temp: 19.6 },
  { time: '08:00', temp: 20.6, displayTime: '08:00' },
  { time: '09:00', temp: 21.4 },
  { time: '10:00', temp: 21.8, displayTime: '10:00' },
  { time: '11:00', temp: 22.0 },
  { time: '12:00', temp: 22.0, displayTime: '12:00' },
  { time: '13:00', temp: 22.4 },
  { time: '14:00', temp: 22.6, displayTime: '14:00' },
  { time: '15:00', temp: 22.8, isMax: true }, // Max 22.8°C peak
  { time: '16:00', temp: 22.5, displayTime: '16:00' },
  { time: '17:00', temp: 21.8 },
  { time: '18:00', temp: 21.2, displayTime: '18:00' },
  { time: '19:00', temp: 20.8 },
  { time: '20:00', temp: 20.2, displayTime: '20:00' },
  { time: '21:00', temp: 19.6 },
  { time: '22:00', temp: 20.2, displayTime: '22:00' },
  { time: '23:00', temp: 21.0 },
  { time: 'Now',   temp: 21.6, isNow: true, displayTime: 'Now' }  // Now 21.6°C
];

const PARAMETERS = [
  { id: 'temperature', label: 'Temperature' },
  { id: 'soil', label: 'Soil Moisture' },
  { id: 'rainfall', label: 'Rainfall' },
  { id: 'tilt', label: 'Ground Tilt' },
  { id: 'vibration', label: 'Vibration' },
  { id: 'humidity', label: 'Humidity' }
];

const renderCustomDot = (props) => {
  const { cx, cy } = props;
  if (!cx || !cy) return null;
  return (
    <g key={`dot-${cx}-${cy}`}>
      <circle cx={cx} cy={cy} r={4.5} fill="#0d9488" fillOpacity={0.6} />
      <circle cx={cx} cy={cy} r={2.5} fill="#ffffff" stroke="#14b8a6" strokeWidth={1} />
    </g>
  );
};

export const SensorTrendsAndAlerts = () => {
  const [selectedParam, setSelectedParam] = useState('temperature');
  const [timeRange, setTimeRange] = useState('24H');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 mb-3.5 select-none">
      
      {/* ========================================================================= */}
      {/* LEFT COLUMN: SENSOR DATA TRENDS (EXACT 24H GRAPH MATCHING REFERENCE)      */}
      {/* ========================================================================= */}
      <div className="lg:col-span-8 rounded-2xl bg-white dark:bg-[#07131d] border border-slate-200 dark:border-slate-800/80 p-4 shadow-xs dark:shadow-md flex flex-col justify-between transition-colors duration-200">
        
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-100 dark:border-slate-800/70">
          <div className="flex items-center gap-3">
            <h2 className="text-base font-black font-heading text-slate-900 dark:text-white tracking-tight">
              Sensor Data Trends
            </h2>

            {/* Parameter Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-[#0a1826] border border-slate-200 dark:border-slate-700/80 text-slate-800 dark:text-white text-xs font-medium flex items-center gap-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <Thermometer className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                <span>{PARAMETERS.find(p => p.id === selectedParam)?.label}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              </button>

              {dropdownOpen && (
                <div className="absolute left-0 mt-1 w-44 rounded-xl bg-white dark:bg-[#0a1826] border border-slate-200 dark:border-slate-700 shadow-xl py-1 z-30">
                  {PARAMETERS.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        setSelectedParam(p.id);
                        setDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs transition-colors flex items-center justify-between ${
                        selectedParam === p.id 
                          ? 'bg-emerald-50 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-semibold' 
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span>{p.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Time Range Pills */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-[#050c14] p-0.5 rounded-xl border border-slate-200 dark:border-slate-800">
            {['1H', '6H', '24H', '7D'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-2.5 py-0.5 rounded-lg text-xs font-semibold transition-all ${
                  timeRange === range
                    ? 'bg-[#10b981] text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Legend Row */}
        <div className="flex flex-wrap items-center gap-4 text-xs mb-1.5 text-slate-600 dark:text-slate-300">
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-teal-50 dark:bg-teal-500/20 text-teal-700 dark:text-teal-300 font-semibold text-[11px]">
            <span className="w-2 h-2 rounded-full bg-teal-500" />
            <span>Temperature</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-[11px]">
            <span className="w-4 h-0.5 border-t-2 border-dashed border-sky-500 dark:border-sky-400" />
            <span>Min (17.5°C)</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-[11px]">
            <span className="w-4 h-0.5 border-t-2 border-dashed border-amber-500 dark:border-amber-400" />
            <span>Max (22.8°C)</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-[11px]">
            <span className="w-3.5 h-3 rounded bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-500/40" />
            <span>Normal Range (10–28°C)</span>
          </div>
        </div>

        {/* Recharts Chart with Exact Markers & Overlays */}
        <div className="relative h-60 sm:h-64 w-full pt-1">
          
          {/* Min Callout Pill */}
          <div className="absolute top-[67%] left-[16.5%] z-20 pointer-events-none transform -translate-x-1/2">
            <div className="relative flex flex-col items-center">
              <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[4px] border-b-sky-500" />
              <div className="px-2 py-1 rounded-md bg-[#0b1c2e] border border-sky-500/70 text-white text-center leading-tight shadow-lg">
                <div className="text-[8.5px] text-sky-400 font-medium uppercase">Min</div>
                <div className="text-[11px] font-mono font-bold text-white">17.5°C</div>
              </div>
            </div>
          </div>

          {/* Max Callout Pill */}
          <div className="absolute top-[16%] left-[62.5%] z-20 pointer-events-none transform -translate-x-1/2 -translate-y-full">
            <div className="relative flex flex-col items-center">
              <div className="px-2 py-1 rounded-md bg-[#2a1705] border border-amber-500/70 text-white text-center leading-tight shadow-lg">
                <div className="text-[8.5px] text-amber-400 font-medium uppercase">Max</div>
                <div className="text-[11px] font-mono font-bold text-white">22.8°C</div>
              </div>
              <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-amber-500" />
            </div>
          </div>

          {/* Now Callout Pill */}
          <div className="absolute top-[28%] right-[10px] z-20 pointer-events-none transform translate-y-[-50%]">
            <div className="px-2 py-1 rounded-md bg-[#10b981] text-white text-center leading-tight shadow-lg">
              <div className="text-[8.5px] font-medium uppercase opacity-90">Now</div>
              <div className="text-[11px] font-mono font-bold">21.6°C</div>
            </div>
          </div>

          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={TREND_DATA_24H}
              margin={{ top: 15, right: 28, left: 2, bottom: 5 }}
            >
              <defs>
                <linearGradient id="trends-teal-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#14b8a6" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#14b8a6" stopOpacity={0.02} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="2 2" stroke="#334155" strokeOpacity={0.4} vertical={true} />

              <XAxis 
                dataKey="time" 
                stroke="#64748b" 
                ticks={['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', 'Now']}
                tick={{ fill: '#64748b', fontSize: 10, fontFamily: 'monospace' }}
                axisLine={{ stroke: '#94a3b8', strokeOpacity: 0.3 }}
                tickLine={false}
              />

              <YAxis 
                domain={[10, 30]} 
                ticks={[10, 15, 20, 25, 30]}
                stroke="#64748b" 
                tick={{ fill: '#64748b', fontSize: 10, fontFamily: 'monospace' }}
                axisLine={false}
                tickLine={false}
                label={{ 
                  value: 'Temperature (°C)', 
                  angle: -90, 
                  position: 'insideLeft', 
                  fill: '#64748b', 
                  fontSize: 10,
                  offset: 8
                }}
              />

              <Tooltip 
                contentStyle={{
                  backgroundColor: '#050c14',
                  borderColor: '#2b3648',
                  borderRadius: '8px',
                  color: '#f8fafc',
                  fontSize: '11px'
                }}
                formatter={(val) => [`${val} °C`, 'Temperature']}
              />

              <ReferenceArea 
                y1={16.8} 
                y2={28.0} 
                fill="#047857" 
                fillOpacity={0.12} 
              />

              <ReferenceLine 
                y={28.0} 
                stroke="#ef4444" 
                strokeDasharray="3 3" 
                strokeOpacity={0.65} 
              />

              <ReferenceLine 
                y={20.8} 
                stroke="#eab308" 
                strokeDasharray="3 3" 
                strokeOpacity={0.65} 
              />

              <ReferenceLine 
                y={16.8} 
                stroke="#0284c7" 
                strokeDasharray="3 3" 
                strokeOpacity={0.65} 
              />

              <Area 
                type="monotone" 
                dataKey="temp" 
                stroke="#14b8a6" 
                strokeWidth={2} 
                fill="url(#trends-teal-gradient)" 
                dot={renderCustomDot}
                activeDot={{ r: 6, fill: '#34d399', stroke: '#fff', strokeWidth: 2 }}
                isAnimationActive={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* RIGHT COLUMN: ACTIVE ALERTS                                              */}
      {/* ========================================================================= */}
      <div className="lg:col-span-4 rounded-2xl bg-white dark:bg-[#07131d] border border-slate-200 dark:border-slate-800/80 p-4 shadow-xs dark:shadow-md flex flex-col justify-between transition-colors duration-200">
        
        {/* Card Header */}
        <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-100 dark:border-slate-800/70">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-rose-50 dark:bg-rose-500/15 text-rose-600 dark:text-rose-400 flex items-center justify-center">
              <Bell className="w-3.5 h-3.5" />
            </div>
            <h2 className="text-base font-black font-heading text-slate-900 dark:text-white tracking-tight">
              Active Alerts
            </h2>
          </div>
          <Link 
            to="/alerts" 
            className="text-emerald-600 dark:text-emerald-400 hover:underline text-xs font-semibold flex items-center gap-0.5 transition-colors"
          >
            <span>View All</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 4 Alerts List */}
        <div className="space-y-2 flex-1 flex flex-col justify-between">
          
          {/* 1. HIGH VIBRATION DETECTED */}
          <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/25 border border-rose-200 dark:border-rose-500/30 flex items-start justify-between gap-2 transition-all hover:bg-rose-100 dark:hover:bg-rose-950/35">
            <div className="flex items-start gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
                <Flame className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0 leading-tight">
                <div className="text-xs font-bold text-slate-900 dark:text-white truncate">High Vibration Detected</div>
                <div className="text-[10.5px] font-mono text-rose-600 dark:text-rose-400 mt-0.5 flex items-center gap-1.5">
                  <span className="font-semibold">NODE-05</span>
                  <span className="text-slate-400">&bull;</span>
                  <span>0.11 g</span>
                </div>
              </div>
            </div>
            <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 shrink-0 whitespace-nowrap">
              2 min ago
            </span>
          </div>

          {/* 2. TILT INCREASING */}
          <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/25 border border-amber-200 dark:border-amber-500/30 flex items-start justify-between gap-2 transition-all hover:bg-amber-100 dark:hover:bg-amber-950/35">
            <div className="flex items-start gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                <AlertTriangle className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0 leading-tight">
                <div className="text-xs font-bold text-slate-900 dark:text-white truncate">Tilt Increasing</div>
                <div className="text-[10.5px] font-mono text-amber-600 dark:text-amber-400 mt-0.5 flex items-center gap-1.5">
                  <span className="font-semibold">NODE-03</span>
                  <span className="text-slate-400">&bull;</span>
                  <span>1.4°</span>
                </div>
              </div>
            </div>
            <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 shrink-0 whitespace-nowrap">
              12 min ago
            </span>
          </div>

          {/* 3. HEAVY RAINFALL */}
          <div className="p-2.5 rounded-xl bg-sky-50 dark:bg-sky-950/25 border border-sky-200 dark:border-sky-500/30 flex items-start justify-between gap-2 transition-all hover:bg-sky-100 dark:hover:bg-sky-950/35">
            <div className="flex items-start gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-sky-100 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0 mt-0.5">
                <CloudRain className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0 leading-tight">
                <div className="text-xs font-bold text-slate-900 dark:text-white truncate">Heavy Rainfall</div>
                <div className="text-[10.5px] font-mono text-sky-600 dark:text-sky-400 mt-0.5 flex items-center gap-1.5">
                  <span className="font-semibold">NODE-02</span>
                  <span className="text-slate-400">&bull;</span>
                  <span>12 mm (24h)</span>
                </div>
              </div>
            </div>
            <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 shrink-0 whitespace-nowrap">
              28 min ago
            </span>
          </div>

          {/* 4. ALL OTHER NODES NORMAL */}
          <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/25 border border-emerald-200 dark:border-emerald-500/30 flex items-start justify-between gap-2 transition-all hover:bg-emerald-100 dark:hover:bg-emerald-950/35">
            <div className="flex items-start gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0 leading-tight">
                <div className="text-xs font-bold text-slate-900 dark:text-white truncate">All Other Nodes Normal</div>
                <div className="text-[10.5px] text-emerald-600 dark:text-emerald-400 mt-0.5">
                  5 nodes operating normally
                </div>
              </div>
            </div>
            <span className="text-[10px] font-medium text-slate-400 shrink-0 whitespace-nowrap">
              &mdash;
            </span>
          </div>

        </div>

      </div>

    </div>
  );
};

export default SensorTrendsAndAlerts;
