import React, { useState } from 'react';
import { 
  Bell, 
  ChevronDown, 
  AlertTriangle, 
  Flame, 
  CloudRain, 
  CheckCircle2, 
  ArrowUpRight
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

const TREND_DATA_24H = [
  { time: '00:00', temp: 18.6 },
  { time: '02:00', temp: 17.5, isMin: true }, // Min 17.5°C
  { time: '04:00', temp: 17.8 },
  { time: '06:00', temp: 18.2 },
  { time: '08:00', temp: 19.4 },
  { time: '10:00', temp: 21.0 },
  { time: '12:00', temp: 22.3 },
  { time: '14:00', temp: 22.8, isMax: true }, // Max 22.8°C
  { time: '16:00', temp: 22.5 },
  { time: '18:00', temp: 22.1 },
  { time: '20:00', temp: 21.8 },
  { time: '22:00', temp: 21.6 },
  { time: 'Now',   temp: 21.6, isNow: true }  // Now 21.6°C
];

const PARAMETERS = [
  { id: 'temperature', label: 'Temperature (°C)' },
  { id: 'soil', label: 'Soil Moisture (%)' },
  { id: 'rainfall', label: 'Rainfall (mm)' },
  { id: 'tilt', label: 'Ground Tilt (°)' },
  { id: 'vibration', label: 'Vibration (g)' },
  { id: 'humidity', label: 'Humidity (%)' }
];

export const SensorTrendsAndAlerts = () => {
  const [selectedParam, setSelectedParam] = useState('temperature');
  const [timeRange, setTimeRange] = useState('24H');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 mb-3.5 select-none">
      
      {/* ========================================================================= */}
      {/* LEFT COLUMN: SENSOR DATA TRENDS (24H WITH NORMAL RANGE BAND)              */}
      {/* ========================================================================= */}
      <div className="lg:col-span-8 rounded-2xl bg-[#09131d] border border-slate-800/80 p-4 shadow-md flex flex-col justify-between">
        
        {/* Header: Parameter Dropdown + Time Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2.5 pb-2 border-b border-slate-800/70">
          <div className="flex items-center gap-3">
            <h2 className="text-base font-black font-heading text-white tracking-tight">
              Sensor Data Trends
            </h2>

            {/* Parameter Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700/80 text-white text-xs font-medium flex items-center gap-1.5 hover:bg-slate-800 transition-colors"
              >
                <span>🌡 {PARAMETERS.find(p => p.id === selectedParam)?.label.split(' ')[0]}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {dropdownOpen && (
                <div className="absolute left-0 mt-1 w-44 rounded-xl bg-slate-900 border border-slate-700 shadow-xl py-1 z-30">
                  {PARAMETERS.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        setSelectedParam(p.id);
                        setDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs transition-colors flex items-center justify-between ${
                        selectedParam === p.id 
                          ? 'bg-emerald-500/20 text-emerald-400 font-semibold' 
                          : 'text-slate-300 hover:bg-slate-800'
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
          <div className="flex items-center gap-1 bg-[#060c13] p-1 rounded-xl border border-slate-800">
            {['1H', '6H', '24H', '7D'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-2.5 py-0.5 rounded-lg text-xs font-semibold transition-all ${
                  timeRange === range
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Legend Row */}
        <div className="flex flex-wrap items-center gap-4 text-xs mb-2 text-slate-300">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-xs" />
            <span className="font-semibold text-white text-[11px]">Temperature</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
            <span className="w-3.5 h-0.5 border-t-2 border-dashed border-cyan-400/80" />
            <span>Min (17.5°C)</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
            <span className="w-3.5 h-0.5 border-t-2 border-dashed border-amber-400/80" />
            <span>Max (22.8°C)</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
            <span className="w-3 h-3 rounded bg-emerald-500/15 border border-emerald-500/30" />
            <span>Normal Range (10–28°C)</span>
          </div>
        </div>

        {/* Recharts Chart with Callout Markers */}
        <div className="relative h-60 sm:h-64 w-full pt-1">
          {/* Min Marker */}
          <div className="absolute top-[68%] left-[16%] z-20 pointer-events-none transform -translate-x-1/2 -translate-y-full">
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9.5px] font-mono font-bold bg-[#060c13]/90 text-cyan-300 border border-cyan-500/40 shadow-md">
              Min 17.5°C
            </span>
          </div>

          {/* Max Marker */}
          <div className="absolute top-[22%] left-[63%] z-20 pointer-events-none transform -translate-x-1/2 -translate-y-full">
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9.5px] font-mono font-bold bg-[#060c13]/90 text-amber-300 border border-amber-500/40 shadow-md">
              Max 22.8°C
            </span>
          </div>

          {/* Now Marker */}
          <div className="absolute top-[32%] right-[12px] z-20 pointer-events-none transform translate-y-[-50%]">
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9.5px] font-mono font-bold bg-emerald-500 text-white shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Now 21.6°C
            </span>
          </div>

          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={TREND_DATA_24H}
              margin={{ top: 15, right: 25, left: 0, bottom: 5 }}
            >
              <defs>
                <linearGradient id="trends-temp-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0.02} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#1b2533" vertical={false} />

              <XAxis 
                dataKey="time" 
                stroke="#64748b" 
                tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'monospace' }}
                axisLine={{ stroke: '#2b3648' }}
                tickLine={false}
              />

              <YAxis 
                domain={[10, 30]} 
                ticks={[10, 15, 20, 25, 30]}
                stroke="#64748b" 
                tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'monospace' }}
                axisLine={false}
                tickLine={false}
                label={{ 
                  value: 'Temperature (°C)', 
                  angle: -90, 
                  position: 'insideLeft', 
                  fill: '#64748b', 
                  fontSize: 10,
                  offset: 10
                }}
              />

              <Tooltip 
                contentStyle={{
                  backgroundColor: '#060c13',
                  borderColor: '#2b3648',
                  borderRadius: '8px',
                  color: '#f8fafc',
                  fontSize: '11px'
                }}
                formatter={(val) => [`${val} °C`, 'Temperature']}
              />

              {/* Shaded Normal Range Band (10 - 28°C) */}
              <ReferenceArea 
                y1={10} 
                y2={28} 
                fill="#10b981" 
                fillOpacity={0.05} 
                stroke="#10b981" 
                strokeOpacity={0.15} 
                strokeDasharray="4 4"
              />

              {/* Min Reference Line */}
              <ReferenceLine 
                y={17.5} 
                stroke="#06b6d4" 
                strokeDasharray="3 3" 
                strokeOpacity={0.6} 
              />

              {/* Max Reference Line */}
              <ReferenceLine 
                y={22.8} 
                stroke="#f59e0b" 
                strokeDasharray="3 3" 
                strokeOpacity={0.6} 
              />

              {/* Main Temperature Area / Curve */}
              <Area 
                type="monotone" 
                dataKey="temp" 
                stroke="#10b981" 
                strokeWidth={2.4} 
                fill="url(#trends-temp-fill)" 
                dot={{ r: 3.5, fill: '#10b981', stroke: '#060c13', strokeWidth: 1.5 }}
                activeDot={{ r: 5.5, fill: '#34d399', stroke: '#fff', strokeWidth: 2 }}
                isAnimationActive={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* RIGHT COLUMN: ACTIVE ALERTS (4 ALERTS COLOR-CODED)                       */}
      {/* ========================================================================= */}
      <div className="lg:col-span-4 rounded-2xl bg-[#09131d] border border-slate-800/80 p-4 shadow-md flex flex-col justify-between">
        
        {/* Card Header */}
        <div className="flex items-center justify-between gap-2 mb-2.5 pb-2 border-b border-slate-800/70">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-rose-500/15 text-rose-400 flex items-center justify-center">
              <Bell className="w-3.5 h-3.5" />
            </div>
            <h2 className="text-base font-black font-heading text-white tracking-tight">
              Active Alerts
            </h2>
          </div>
          <Link 
            to="/alerts" 
            className="text-emerald-400 hover:text-emerald-300 text-xs font-semibold flex items-center gap-0.5 transition-colors"
          >
            <span>View All</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 4 Alerts List */}
        <div className="space-y-2 flex-1 flex flex-col justify-between">
          
          {/* 1. HIGH VIBRATION DETECTED (RED) */}
          <div className="p-2.5 rounded-xl bg-rose-950/25 border border-rose-500/30 flex items-start justify-between gap-2 transition-all hover:bg-rose-950/35">
            <div className="flex items-start gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
                <Flame className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0 leading-tight">
                <div className="text-xs font-bold text-white truncate">High Vibration Detected</div>
                <div className="text-[10.5px] font-mono text-rose-400 mt-0.5 flex items-center gap-1.5">
                  <span className="font-semibold">NODE-05</span>
                  <span className="text-slate-500">&bull;</span>
                  <span>0.11 g</span>
                </div>
              </div>
            </div>
            <span className="text-[10px] font-medium text-slate-500 shrink-0 whitespace-nowrap">
              2 min ago
            </span>
          </div>

          {/* 2. TILT INCREASING (AMBER) */}
          <div className="p-2.5 rounded-xl bg-amber-950/25 border border-amber-500/30 flex items-start justify-between gap-2 transition-all hover:bg-amber-950/35">
            <div className="flex items-start gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                <AlertTriangle className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0 leading-tight">
                <div className="text-xs font-bold text-white truncate">Tilt Increasing</div>
                <div className="text-[10.5px] font-mono text-amber-400 mt-0.5 flex items-center gap-1.5">
                  <span className="font-semibold">NODE-03</span>
                  <span className="text-slate-500">&bull;</span>
                  <span>1.4°</span>
                </div>
              </div>
            </div>
            <span className="text-[10px] font-medium text-slate-500 shrink-0 whitespace-nowrap">
              12 min ago
            </span>
          </div>

          {/* 3. HEAVY RAINFALL (BLUE) */}
          <div className="p-2.5 rounded-xl bg-sky-950/25 border border-sky-500/30 flex items-start justify-between gap-2 transition-all hover:bg-sky-950/35">
            <div className="flex items-start gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0 mt-0.5">
                <CloudRain className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0 leading-tight">
                <div className="text-xs font-bold text-white truncate">Heavy Rainfall</div>
                <div className="text-[10.5px] font-mono text-sky-400 mt-0.5 flex items-center gap-1.5">
                  <span className="font-semibold">NODE-02</span>
                  <span className="text-slate-500">&bull;</span>
                  <span>12 mm (24h)</span>
                </div>
              </div>
            </div>
            <span className="text-[10px] font-medium text-slate-500 shrink-0 whitespace-nowrap">
              28 min ago
            </span>
          </div>

          {/* 4. ALL OTHER NODES NORMAL (GREEN) */}
          <div className="p-2.5 rounded-xl bg-emerald-950/25 border border-emerald-500/30 flex items-start justify-between gap-2 transition-all hover:bg-emerald-950/35">
            <div className="flex items-start gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0 leading-tight">
                <div className="text-xs font-bold text-white truncate">All Other Nodes Normal</div>
                <div className="text-[10.5px] text-emerald-400 mt-0.5">
                  5 nodes operating normally
                </div>
              </div>
            </div>
            <span className="text-[10px] font-medium text-slate-500 shrink-0 whitespace-nowrap">
              &mdash;
            </span>
          </div>

        </div>

      </div>

    </div>
  );
};

export default SensorTrendsAndAlerts;
