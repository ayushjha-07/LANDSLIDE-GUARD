import React, { useState, useMemo } from 'react';
import {
  MoveDiagonal,
  Activity,
  TriangleAlert,
  Clock,
  ShieldCheck,
  TrendingUp,
  BarChart3,
  Lightbulb,
  Calendar,
  ChevronDown,
  Waves
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceArea,
  ReferenceLine
} from 'recharts';
import heroHimalayas from '../../assets/hero_himalayas.jpg';
import { DETAILED_STABILITY_SERIES_24H } from '../../data/mockHistoricalData';


// Header Mountain Transmitter Emblem SVG
const MountainStabilityEmblem = () => (
  <div className="w-8 h-8 rounded-xl bg-[#E8F7EF] dark:bg-emerald-950/60 border border-[#087443]/30 flex items-center justify-center text-[#087443] dark:text-emerald-400 flex-shrink-0 shadow-xs">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="m3 20 6.5-11L14 16l3-5 4 9H3Z" />
      <path d="M10 9V3" strokeWidth="2" />
      <path d="M8.5 4.5h3" strokeWidth="1.8" />
      <circle cx="10" cy="3" r="1" fill="currentColor" />
    </svg>
  </div>
);

// Slope Cross-Section Geotechnical Engineering SVG Illustration
const SlopeCrossSectionIllustration = () => (
  <div className="relative w-full h-44 sm:h-48 rounded-xl bg-slate-50 dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 p-2 overflow-hidden select-none">
    <svg viewBox="0 0 320 145" className="w-full h-full" fill="none">
      <defs>
        {/* Soil Layer Hatch Pattern */}
        <pattern id="soilHatch" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="8" stroke="#a16207" strokeWidth="0.8" strokeOpacity="0.25" />
        </pattern>
        {/* Bedrock Texture Pattern */}
        <pattern id="bedrockHatch" width="12" height="12" patternTransform="rotate(-30 0 0)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="12" stroke="#64748b" strokeWidth="1.2" strokeOpacity="0.35" />
          <line x1="0" y1="0" x2="12" y2="0" stroke="#64748b" strokeWidth="0.8" strokeOpacity="0.25" />
        </pattern>
        {/* Soil Gradient */}
        <linearGradient id="soilGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#854d0e" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#713f12" stopOpacity="0.9" />
        </linearGradient>
        {/* Bedrock Gradient */}
        <linearGradient id="bedrockGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#64748b" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#475569" stopOpacity="0.95" />
        </linearGradient>
      </defs>

      {/* Bedrock Layer (lower strata) */}
      <path
        d="M 10 135 L 265 135 L 265 105 Q 190 108 140 114 Q 70 120 10 128 Z"
        fill="url(#bedrockGrad)"
      />
      <path
        d="M 10 135 L 265 135 L 265 105 Q 190 108 140 114 Q 70 120 10 128 Z"
        fill="url(#bedrockHatch)"
      />

      {/* Soil Layer (middle strata) */}
      <path
        d="M 10 128 Q 70 120 140 114 Q 190 108 265 105 L 265 65 Q 200 48 130 70 Q 70 90 10 122 Z"
        fill="url(#soilGrad)"
      />
      <path
        d="M 10 128 Q 70 120 140 114 Q 190 108 265 105 L 265 65 Q 200 48 130 70 Q 70 90 10 122 Z"
        fill="url(#soilHatch)"
      />

      {/* Surface Vegetation Crest (Top Mountain Slope) */}
      <path
        d="M 10 122 Q 70 90 130 70 Q 200 48 265 65"
        stroke="#15803d"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* Pine Trees along the slope */}
      {/* Tree 1 */}
      <polygon points="35,110 31,120 39,120" fill="#166534" />
      <polygon points="35,104 32,114 38,114" fill="#15803d" />
      {/* Tree 2 */}
      <polygon points="65,95 60,107 70,107" fill="#166534" />
      <polygon points="65,88 61,99 69,99" fill="#15803d" />
      {/* Tree 3 */}
      <polygon points="98,82 93,94 103,94" fill="#166534" />
      <polygon points="98,75 94,86 102,86" fill="#15803d" />
      {/* Tree 4 */}
      <polygon points="128,70 123,82 133,82" fill="#166534" />
      <polygon points="128,63 124,74 132,74" fill="#15803d" />
      {/* Tree 5 (Right of sensor) */}
      <polygon points="198,58 193,70 203,70" fill="#166534" />
      <polygon points="198,51 194,62 202,62" fill="#15803d" />
      {/* Tree 6 */}
      <polygon points="235,62 230,74 240,74" fill="#166534" />
      <polygon points="235,55 231,66 239,66" fill="#15803d" />

      {/* Subsurface Inclinometer Borehole Casing (anchored into bedrock) */}
      <line x1="165" y1="55" x2="165" y2="125" stroke="#047857" strokeWidth="2.5" strokeDasharray="3 2" />
      <circle cx="165" cy="125" r="2.5" fill="#047857" />

      {/* Surface Sensor Node Structure */}
      <rect x="163" y="46" width="4" height="14" fill="#0f766e" rx="1" />
      <rect x="158" y="40" width="14" height="8" fill="#334155" rx="1.5" stroke="#94a3b8" strokeWidth="0.8" />
      {/* Small Solar Panel on Node */}
      <line x1="157" y1="38" x2="173" y2="40" stroke="#0284c7" strokeWidth="2.2" strokeLinecap="round" />

      {/* Radiating Wireless LoRa Signal Arcs */}
      <path d="M 157 34 A 11 11 0 0 1 173 34" stroke="#10b981" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.85" />
      <path d="M 153 30 A 17 17 0 0 1 177 30" stroke="#10b981" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.55" />

      {/* Callout Pointer 1: Sensor Node */}
      <line x1="174" y1="44" x2="225" y2="44" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 2" />
      <circle cx="174" cy="44" r="1.5" fill="#0284c7" />
      <text x="230" y="47" fill="#1e293b" className="dark:fill-slate-200" fontSize="9.5" fontWeight="600">
        Sensor Node
      </text>

      {/* Callout Pointer 2: Soil Layer */}
      <line x1="200" y1="78" x2="225" y2="78" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 2" />
      <circle cx="200" cy="78" r="1.5" fill="#854d0e" />
      <text x="230" y="81" fill="#1e293b" className="dark:fill-slate-200" fontSize="9.5" fontWeight="600">
        Soil Layer
      </text>

      {/* Callout Pointer 3: Bedrock */}
      <line x1="190" y1="116" x2="225" y2="116" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 2" />
      <circle cx="190" cy="116" r="1.5" fill="#475569" />
      <text x="230" y="119" fill="#1e293b" className="dark:fill-slate-200" fontSize="9.5" fontWeight="600">
        Bedrock
      </text>
    </svg>
    <div className="absolute bottom-1 left-0 right-0 text-center text-[9.5px] text-stone-400 dark:text-stone-500 italic">
      Illustration only — not to scale
    </div>
  </div>
);

// Custom Tooltip Matching Geotechnical Precision Card
const CustomTooltip = ({ active, payload, label, unit, parameterLabel }) => {
  if (active && payload && payload.length) {
    const dataPoint = payload[0]?.payload;
    const val = payload[0]?.value;
    const status = dataPoint?.status || 'Normal';
    const change = dataPoint?.change || '+0.08°';
    return (
      <div className="bg-slate-900/95 dark:bg-slate-950/95 text-white px-3.5 py-2.5 rounded-xl shadow-xl border border-slate-700/60 backdrop-blur-md pointer-events-none z-50 min-w-[145px]">
        <div className="text-[11px] font-semibold text-slate-400 mb-1.5 font-mono flex items-center justify-between gap-2">
          <span>{label}</span>
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9.5px] font-bold bg-[#087443]/30 text-emerald-300 border border-emerald-500/30">
            {status}
          </span>
        </div>
        <div className="space-y-1">
          <div className="flex items-center justify-between gap-3 text-xs">
            <span className="text-slate-300">{parameterLabel}:</span>
            <span className="text-sm font-bold font-mono text-emerald-300">
              {val}{unit}
            </span>
          </div>
          <div className="flex items-center justify-between gap-3 text-[11px]">
            <span className="text-slate-400">Change:</span>
            <span className="font-mono text-cyan-300 font-semibold">{change}</span>
          </div>
          <div className="flex items-center justify-between gap-3 text-[10.5px]">
            <span className="text-slate-400">Status:</span>
            <span className="text-emerald-400 font-semibold">{status}</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

// Tooltip for Vibration / Micro-seismic activity
const VibrationTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const val = payload[0]?.value;
    const status = Number(val) >= 0.05 ? 'Warning' : 'Normal';
    return (
      <div className="bg-slate-900/95 dark:bg-slate-950/95 text-white px-3 py-2 rounded-xl shadow-xl border border-slate-700/60 backdrop-blur-md pointer-events-none z-50 min-w-[130px]">
        <div className="text-[10.5px] font-mono text-slate-400 mb-1 flex items-center justify-between gap-2">
          <span>{label}</span>
          <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${Number(val) >= 0.05 ? 'bg-red-950/70 text-red-300 border border-red-500/30' : 'bg-emerald-950/70 text-emerald-300 border border-emerald-500/30'}`}>
            {status}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2 text-xs">
          <span className="text-slate-300">Vibration:</span>
          <span className="font-bold font-mono text-cyan-300">{Number(val).toFixed(3)} g</span>
        </div>
        <div className="text-[9.5px] text-slate-400 mt-0.5">
          {Number(val) < 0.03 ? 'Ambient baseline' : 'Elevated micro-tremor'}
        </div>
      </div>
    );
  }
  return null;
};

export const GroundStabilityCard = ({ stabilitySeries, sensorValues, className = "" }) => {
  const [activeTab, setActiveTab] = useState('tilt'); // 'tilt' | 'vibration'

  // Dynamic telemetry bindings with exact defaults matching reference (Current Tilt 1.77°, Vib 0.033g)
  const currentTilt = useMemo(() => {
    if (sensorValues?.tilt?.value !== undefined) return Number(sensorValues.tilt.value).toFixed(2);
    if (typeof sensorValues?.tilt === 'number') return Number(sensorValues.tilt).toFixed(2);
    return '1.77';
  }, [sensorValues]);

  const currentVib = useMemo(() => {
    if (sensorValues?.vibration?.value !== undefined) return Number(sensorValues.vibration.value).toFixed(3);
    if (typeof sensorValues?.vibration === 'number') return Number(sensorValues.vibration).toFixed(3);
    return '0.033';
  }, [sensorValues]);

  // Derive dynamic threshold values (3.5° / 0.05g)
  const warningThreshold = activeTab === 'tilt' ? 3.5 : 0.05;
  const currentVal = activeTab === 'tilt' ? Number(currentTilt) : Number(currentVib);

  // Derive status dynamically
  const isWarning = currentVal >= warningThreshold;
  const statusLabel = isWarning ? 'WARNING' : 'STABLE';
  const statusDesc = isWarning
    ? (activeTab === 'tilt' ? 'Tilt exceeded safety advisory threshold' : 'Micro-seismic tremor above baseline')
    : (activeTab === 'tilt' ? 'Ground movement within normal range' : 'Micro-seismic activity within normal limits');

  // Chart data setup using high-density 25-point 24H telemetry series
  const chartData = useMemo(() => {
    const base = stabilitySeries?.length ? stabilitySeries : DETAILED_STABILITY_SERIES_24H;
    return base.map(item => {
      if (item.time === 'Now') {
        return {
          ...item,
          tilt: Number(currentTilt),
          vibration: Number(currentVib),
          thresholdTilt: 3.5,
          thresholdVib: 0.05
        };
      }
      return item;
    });
  }, [stabilitySeries, currentTilt, currentVib]);

  // Calculate dynamic average and peak from active dataset
  const averageTilt = useMemo(() => {
    const values = chartData.map(d => Number(d.tilt)).filter(v => !isNaN(v));
    if (!values.length) return '1.54';
    const sum = values.reduce((acc, v) => acc + v, 0);
    return (sum / values.length).toFixed(2);
  }, [chartData]);

  const peakTilt = useMemo(() => {
    const values = chartData.map(d => Number(d.tilt)).filter(v => !isNaN(v));
    if (!values.length) return '1.92';
    return Math.max(...values).toFixed(2);
  }, [chartData]);


  // Stability Gauge SVG Calculation (circular progress ring)
  const gaugeRadius = 38;
  const gaugeCircumference = 2 * Math.PI * gaugeRadius;
  const gaugePct = Math.min(Math.max((currentVal / (warningThreshold * 1.15)) * 100, 10), 100);
  const gaugeOffset = gaugeCircumference - (gaugePct / 100) * gaugeCircumference;

  return (
    <div className={`relative rounded-2xl bg-white dark:bg-[#0c1410] border border-stone-200/90 dark:border-stone-800/80 shadow-xs overflow-hidden transition-all duration-300 h-full min-h-full flex flex-col justify-between ${className}`}>
      <div className="relative z-10 p-4 sm:p-6 flex flex-col flex-1 justify-between">

        {/* 2. HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 pb-2">
          <div className="flex items-center gap-3">
            <MountainStabilityEmblem />

            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-stone-900 dark:text-white tracking-tight leading-tight">
                  Ground Stability
                </h3>

                {/* Live Pill */}
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#DDF3EA] text-[#087443] dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-500/30">
                  <span className="w-2 h-2 rounded-full bg-[#087443] dark:bg-emerald-400 animate-pulse" />
                  LIVE
                </span>
              </div>

              <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-0.5 font-sans">
                Slope deformation & ground-motion monitoring
              </p>

              <div className="flex items-center gap-2 text-[11px] text-stone-400 dark:text-stone-500 mt-1 font-sans">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  Updated just now
                </span>
                <span>|</span>
                <span>Prototype telemetry</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. SENSOR MODE SWITCH TABS */}
        <div className="mt-4 flex items-center gap-2 sm:gap-3">
          {/* Tab 1: Tilt */}
          <button
            type="button"
            onClick={() => setActiveTab('tilt')}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer border ${
              activeTab === 'tilt'
                ? 'bg-[#087443] text-white border-[#087443] shadow-sm shadow-emerald-950/20'
                : 'bg-white dark:bg-stone-900/80 text-stone-700 dark:text-stone-300 border-stone-200/90 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800/80'
            }`}
          >
            <MoveDiagonal className="w-4 h-4" />
            <span>Tilt ({currentTilt}°)</span>
          </button>

          {/* Tab 2: Vibration */}
          <button
            type="button"
            onClick={() => setActiveTab('vibration')}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer border ${
              activeTab === 'vibration'
                ? 'bg-[#087443] text-white border-[#087443] shadow-sm shadow-emerald-950/20'
                : 'bg-white dark:bg-stone-900/80 text-stone-700 dark:text-stone-300 border-stone-200/90 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800/80'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Vibration ({currentVib} g)</span>
          </button>
        </div>

        {/* 4. MAIN STATUS AREA */}
        <div className="mt-4 p-3.5 sm:p-4 rounded-2xl bg-stone-50/80 dark:bg-stone-900/50 border border-stone-200/80 dark:border-stone-800/80 space-y-3.5">
          
          {/* Upper Grid: Left Stability Gauge + Right Current Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 items-stretch">
            
            {/* Section 1: Stability Gauge */}
            <div className="bg-white dark:bg-stone-900/90 border border-stone-200/70 dark:border-stone-800/80 rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-xs">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 96 96">
                  {/* Gauge Background Track */}
                  <circle
                    cx="48"
                    cy="48"
                    r={gaugeRadius}
                    stroke="#E8F7EF"
                    strokeWidth="7"
                    fill="none"
                    className="dark:stroke-emerald-950/40"
                  />
                  {/* Gauge Progress Stroke */}
                  <circle
                    cx="48"
                    cy="48"
                    r={gaugeRadius}
                    stroke={isWarning ? "#EF4444" : "#087443"}
                    strokeWidth="7"
                    strokeDasharray={gaugeCircumference}
                    strokeDashoffset={gaugeOffset}
                    strokeLinecap="round"
                    fill="none"
                    className="transition-all duration-700 ease-out"
                  />
                </svg>

                {/* Center Content Inside Gauge */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2 select-none">
                  <div className={`w-8 h-8 rounded-full ${isWarning ? 'bg-red-500 text-white' : 'bg-[#087443] text-white'} flex items-center justify-center shadow-xs mb-1`}>
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className={`text-base font-black tracking-tight ${isWarning ? 'text-red-600 dark:text-red-400' : 'text-stone-900 dark:text-white'}`}>
                    {statusLabel}
                  </span>
                  <span className="text-[9px] text-stone-500 dark:text-stone-400 leading-tight max-w-[85px] mt-0.5">
                    {statusDesc}
                  </span>
                </div>
              </div>
            </div>

            {/* Section 2: Current Metrics */}
            <div className="bg-white dark:bg-stone-900/90 border border-stone-200/70 dark:border-stone-800/80 rounded-2xl p-3.5 sm:p-4 flex flex-col justify-between shadow-xs space-y-2">
              
              {/* Metric 1: Current Tilt */}
              <div className="flex items-center justify-between gap-2 pb-2 border-b border-stone-100 dark:border-stone-800/60">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-[#E8F7EF] dark:bg-emerald-950/60 border border-emerald-500/20 flex items-center justify-center text-[#087443] dark:text-emerald-400 flex-shrink-0">
                    <MoveDiagonal className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10.5px] text-stone-500 dark:text-stone-400 block font-sans">
                      Current Tilt
                    </span>
                    <span className="text-base font-bold font-mono text-stone-900 dark:text-white leading-none">
                      {currentTilt}°
                    </span>
                  </div>
                </div>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#DDF3EA] text-[#087443] dark:bg-emerald-950/60 dark:text-emerald-300 flex-shrink-0">
                  Normal
                </span>
              </div>

              {/* Metric 2: Current Vibration */}
              <div className="flex items-center justify-between gap-2 pb-2 border-b border-stone-100 dark:border-stone-800/60">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-[#EAF4FB] dark:bg-cyan-950/60 border border-cyan-500/20 flex items-center justify-center text-[#3B82C4] dark:text-cyan-400 flex-shrink-0">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10.5px] text-stone-500 dark:text-stone-400 block font-sans">
                      Current Vibration
                    </span>
                    <span className="text-base font-bold font-mono text-stone-900 dark:text-white leading-none">
                      {currentVib} g
                    </span>
                  </div>
                </div>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EAF4FB] text-[#3B82C4] dark:bg-cyan-950/60 dark:text-cyan-300 flex-shrink-0">
                  Low
                </span>
              </div>

              {/* Metric 3: Warning Threshold */}
              <div className="flex items-center justify-between gap-2 pb-2 border-b border-stone-100 dark:border-stone-800/60">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400 flex-shrink-0">
                    <TriangleAlert className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10.5px] text-stone-500 dark:text-stone-400 block font-sans whitespace-nowrap">
                      Warning Threshold (Tilt)
                    </span>
                    <span className="text-base font-bold font-mono text-stone-900 dark:text-white leading-none">
                      3.5°
                    </span>
                  </div>
                </div>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100/70 text-amber-700 dark:bg-amber-950/70 dark:text-amber-300 flex-shrink-0">
                  Prototype
                </span>
              </div>

              {/* Metric 4: Last Updated */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-stone-800/80 border border-stone-200/60 dark:border-stone-700 flex items-center justify-center text-stone-600 dark:text-stone-400 flex-shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10.5px] text-stone-500 dark:text-stone-400 block font-sans">
                      Last Updated
                    </span>
                    <span className="text-sm font-bold font-sans text-stone-900 dark:text-white leading-none">
                      Just now
                    </span>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Section 3: Realistic Himalayan Sensor Visual Banner */}
          <div className="relative rounded-2xl overflow-hidden h-40 sm:h-44 border border-stone-200/80 dark:border-stone-800 shadow-xs group">
            <img
              src={heroHimalayas}
              alt="Himalayan slope monitoring station"
              className="absolute inset-0 w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
            />
            {/* Dark gradient scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20" />

            {/* Glowing LoRa Wireless Waves radiating above sensor */}
            <div className="absolute top-4 left-[28%] sm:left-[22%] pointer-events-none select-none">
              <svg viewBox="0 0 40 40" className="w-8 h-8 text-emerald-400 animate-pulse" fill="none">
                <circle cx="20" cy="20" r="3.5" fill="currentColor" />
                <path d="M 12 12 A 12 12 0 0 1 28 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
                <path d="M 7 7 A 19 19 0 0 1 33 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
              </svg>
            </div>

            {/* Monitored Slope Vector Line (Green dotted trace down the gorge) */}
            <div className="absolute inset-0 pointer-events-none">
              <svg viewBox="0 0 400 150" className="w-full h-full" fill="none">
                <line x1="110" y1="35" x2="280" y2="135" stroke="#10b981" strokeWidth="2" strokeDasharray="4 4" strokeOpacity="0.85" />
              </svg>
            </div>

            {/* Callout Pointer 1: Tilt Sensor Badge */}
            <div className="absolute top-3 left-4 flex items-center gap-1.5 pointer-events-none">
              <div className="px-2.5 py-0.5 rounded-md bg-white/95 text-stone-900 text-[10.5px] font-bold shadow-md border border-white/60 backdrop-blur-xs flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#087443]" />
                Tilt Sensor
              </div>
              <div className="w-6 h-[1px] bg-white/80" />
            </div>

            {/* Callout Badge 2: Monitors slope movement */}
            <div className="absolute bottom-8 right-3 text-right pointer-events-none">
              <span className="inline-block px-2.5 py-0.5 rounded-md bg-black/65 text-emerald-300 text-[10px] font-medium backdrop-blur-xs border border-white/10 leading-tight">
                Monitors slope movement
              </span>
            </div>

            {/* Callout Badge 3: Sends real-time data via LoRa */}
            <div className="absolute bottom-2 right-3 text-right pointer-events-none">
              <span className="inline-block px-2.5 py-0.5 rounded-md bg-black/65 text-stone-200 text-[10px] font-medium backdrop-blur-xs border border-white/10 leading-tight">
                Sends real-time data via LoRa
              </span>
            </div>
          </div>

        </div>

        {/* 5. GROUND TILT & VIBRATION — ADVANCED TELEMETRY CHARTS */}
        <div className="mt-4 p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 shadow-xs space-y-4">
          
          {/* Chart Header with Live Indicator & Analytics Strip */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 border-b border-stone-100 dark:border-stone-800/70">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#E8F7EF] dark:bg-emerald-950/60 border border-emerald-500/20 flex items-center justify-center text-[#087443] dark:text-emerald-400 flex-shrink-0">
                <MoveDiagonal className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="text-base sm:text-lg font-bold font-heading text-stone-900 dark:text-white tracking-tight leading-tight">
                    Ground Tilt — 24 Hours
                  </h4>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#DDF3EA] text-[#087443] dark:bg-emerald-950/70 dark:text-emerald-300 border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#087443] dark:bg-emerald-400 animate-pulse" />
                    LIVE
                  </span>
                </div>
                <p className="text-[11px] text-stone-500 dark:text-stone-400 font-sans">
                  High-precision inclinometer slope telemetry • 25 hourly data points
                </p>
              </div>
            </div>

            {/* Top Analytics Strip */}
            <div className="flex items-center gap-2 sm:gap-3 px-3 py-1.5 rounded-xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200/80 dark:border-stone-700/80 shadow-xs self-start sm:self-auto flex-wrap">
              <div className="flex items-baseline gap-1">
                <span className="text-[9px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wider">CURRENT</span>
                <span className="text-xs font-mono font-bold text-[#087443] dark:text-emerald-400">
                  {currentTilt}°
                </span>
              </div>
              <span className="text-stone-300 dark:text-stone-700 text-xs">|</span>
              <div className="flex items-baseline gap-1">
                <span className="text-[9px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wider">CHANGE</span>
                <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  +0.08°
                </span>
              </div>
              <span className="text-stone-300 dark:text-stone-700 text-xs">|</span>
              <div className="flex items-baseline gap-1">
                <span className="text-[9px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wider">PEAK</span>
                <span className="text-xs font-mono font-bold text-stone-800 dark:text-stone-200">
                  {peakTilt}°
                </span>
              </div>
              <span className="text-stone-300 dark:text-stone-700 text-xs">|</span>
              <div className="flex items-baseline gap-1">
                <span className="text-[9px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wider">AVG</span>
                <span className="text-xs font-mono font-bold text-stone-800 dark:text-stone-200">
                  ~{averageTilt}°
                </span>
              </div>
            </div>
          </div>

          {/* Primary Ground Tilt AreaChart */}
          <div className="relative w-full h-56 sm:h-64 min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 18, right: 48, left: -10, bottom: 0 }}>
                <defs>
                  {/* Subtle Forest Green Area Gradient */}
                  <linearGradient id="groundStabilityGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#087443" stopOpacity={0.28} />
                    <stop offset="95%" stopColor="#087443" stopOpacity={0.02} />
                  </linearGradient>
                </defs>

                {/* Normal Range Shaded Area (0° – 3.5°) */}
                <ReferenceArea
                  y1={0}
                  y2={3.5}
                  fill="#087443"
                  fillOpacity={0.035}
                />

                {/* Warning Zone Tint above 3.5° */}
                <ReferenceArea
                  y1={3.5}
                  y2={4.0}
                  fill="#EF4444"
                  fillOpacity={0.06}
                />

                {/* Dashed Red Warning Threshold Line with right-aligned label */}
                <ReferenceLine
                  y={3.5}
                  stroke="#EF4444"
                  strokeDasharray="4 4"
                  strokeWidth={1.4}
                  label={{
                    value: 'Warning Threshold (3.5°)',
                    position: 'insideTopRight',
                    fill: '#DC2626',
                    fontSize: 9.5,
                    fontWeight: 600,
                    dy: -6,
                    dx: -2
                  }}
                />

                {/* Dotted Grid */}
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-stone-800" vertical={false} />

                {/* X-Axis: 24 Hours (alternating 2-hour ticks) */}
                <XAxis
                  dataKey="time"
                  ticks={['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', 'Now']}
                  interval={0}
                  stroke="#94a3b8"
                  className="dark:stroke-stone-600"
                  tick={{ fontSize: 9, fill: '#94a3b8' }}
                  dy={3}
                  tickLine={false}
                  axisLine={{ stroke: '#cbd5e1' }}
                />

                {/* Y-Axis */}
                <YAxis
                  domain={[0.0, 4.0]}
                  ticks={[0.0, 1.0, 2.0, 3.0, 3.5, 4.0]}
                  stroke="#94a3b8"
                  className="dark:stroke-stone-600"
                  fontSize={10.5}
                  tickLine={false}
                  axisLine={{ stroke: '#cbd5e1' }}
                  tickFormatter={(val) => `${val.toFixed(1)}°`}
                  label={{
                    value: 'Tilt (°)',
                    angle: -90,
                    position: 'insideLeft',
                    offset: 15,
                    fontSize: 10,
                    fill: '#94a3b8'
                  }}
                />

                {/* Interactive Tooltip showing Time, Tilt, Change, Status: Normal */}
                <Tooltip
                  content={
                    <CustomTooltip
                      unit="°"
                      parameterLabel="Ground Tilt"
                    />
                  }
                  cursor={{ stroke: '#64748b', strokeDasharray: '3 3', strokeWidth: 1.2 }}
                />

                {/* Smooth Green Curve, Area Fill, and Clear Data Point Markers */}
                <Area
                  type="monotone"
                  dataKey="tilt"
                  stroke="#087443"
                  strokeWidth={2.4}
                  fillOpacity={1}
                  fill="url(#groundStabilityGrad)"
                  dot={{ r: 3, fill: "#ffffff", stroke: "#087443", strokeWidth: 2 }}
                  activeDot={{ r: 5.5, fill: "#087443", stroke: "#ffffff", strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>

            {/* Pinned Current Value Badge on the Right Margin */}
            <div className="absolute right-0 sm:right-1 top-[52%] -translate-y-1/2 pointer-events-none z-10">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold font-mono bg-[#087443] text-white shadow-sm border border-emerald-400/40">
                {currentTilt}°
              </span>
            </div>
          </div>

          {/* DEDICATED COMPACT VIBRATION ACTIVITY — 24 HOURS */}
          <div className="pt-3 border-t border-stone-100 dark:border-stone-800/70">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 flex items-center justify-center flex-shrink-0">
                  <Activity className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-stone-900 dark:text-white font-heading">
                    Vibration & Micro-Seismic Activity — 24 Hours
                  </span>
                  <span className="text-[10.5px] text-stone-500 dark:text-stone-400 ml-2 font-sans">
                    Baseline: 0.024–0.029g • Warning Limit: 0.050g
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[10.5px] font-mono text-stone-500 dark:text-stone-400 self-start sm:self-auto">
                <span className="text-stone-600 dark:text-stone-300">Peak: <strong className="text-stone-800 dark:text-white">0.038g</strong></span>
                <span>•</span>
                <span className="text-cyan-600 dark:text-cyan-400 font-semibold">Current: <strong>{currentVib}g</strong></span>
              </div>
            </div>

            {/* Compact Activity Bars Container */}
            <div className="relative w-full h-24 sm:h-28 min-w-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 12, right: 48, left: -10, bottom: 0 }}>
                  {/* Normal operating band */}
                  <ReferenceArea
                    y1={0}
                    y2={0.050}
                    fill="#087443"
                    fillOpacity={0.02}
                  />

                  {/* Warning line at 0.050g */}
                  <ReferenceLine
                    y={0.050}
                    stroke="#EF4444"
                    strokeDasharray="3 3"
                    strokeWidth={1.2}
                    label={{
                      value: 'Warning 0.050g',
                      position: 'insideTopRight',
                      fill: '#DC2626',
                      fontSize: 9,
                      fontWeight: 600,
                      dy: -6,
                      dx: -2
                    }}
                  />

                  <CartesianGrid strokeDasharray="2 2" stroke="#e2e8f0" className="dark:stroke-stone-800" vertical={false} />

                  <XAxis
                    dataKey="time"
                    ticks={['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', 'Now']}
                    interval={0}
                    stroke="#94a3b8"
                    className="dark:stroke-stone-600"
                    tick={{ fontSize: 9, fill: '#94a3b8' }}
                    dy={2}
                    tickLine={false}
                    axisLine={{ stroke: '#cbd5e1' }}
                  />

                  <YAxis
                    domain={[0, 0.06]}
                    ticks={[0, 0.025, 0.05]}
                    stroke="#94a3b8"
                    className="dark:stroke-stone-600"
                    fontSize={9.5}
                    tickLine={false}
                    axisLine={{ stroke: '#cbd5e1' }}
                    tickFormatter={(v) => `${v.toFixed(3)}g`}
                  />

                  <Tooltip
                    content={<VibrationTooltip />}
                    cursor={{ fill: 'rgba(56, 189, 248, 0.08)' }}
                  />

                  {/* Vertical Activity Bars */}
                  <Bar
                    dataKey="vibration"
                    fill="#0284c7"
                    fillOpacity={0.65}
                    radius={[2, 2, 0, 0]}
                    maxBarSize={8}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart Legend below chart */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 text-xs text-stone-500 dark:text-stone-400 flex-wrap pt-2 border-t border-stone-100 dark:border-stone-800/60">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#087443] inline-block" />
              <span>Ground Tilt (0°–3.5°)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-xs bg-[#0284c7] inline-block" />
              <span>Vibration (0.024–0.038g)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-[2px] bg-red-500 inline-block border-t border-dashed border-red-500" />
              <span>Warning Limits (3.5° / 0.050g)</span>
            </div>
          </div>

        </div>

        {/* 6. FOUR SUMMARY CARDS (Clean 2x2 grid on dashboard columns) */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
          
          {/* Card 1: CURRENT TILT */}
          <div className="relative p-3.5 rounded-2xl bg-white dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#E8F7EF] dark:bg-emerald-950/60 border border-emerald-500/20 flex items-center justify-center text-[#087443] dark:text-emerald-400 flex-shrink-0">
              <MoveDiagonal className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1 pr-6">
              <span className="text-[10px] font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider block">
                CURRENT TILT
              </span>
              <div className="text-xl font-bold font-mono text-stone-900 dark:text-white tracking-tight mt-0.5 leading-none">
                {currentTilt}°
              </div>
              <span className="text-xs text-stone-500 dark:text-stone-400 block font-sans mt-1 leading-tight">
                Within normal range (0° – 3.5°)
              </span>
            </div>
            {/* Mini upward sparkline graphic */}
            <div className="absolute top-3.5 right-3.5 pointer-events-none">
              <svg viewBox="0 0 26 14" fill="none" className="w-6 h-3.5 text-emerald-500" aria-hidden="true">
                <path d="M2 12 L9 8 L16 10 L24 2" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* Card 2: 24H CHANGE */}
          <div className="relative p-3.5 rounded-2xl bg-[#EAF4FB]/50 dark:bg-cyan-950/20 border border-cyan-100 dark:border-cyan-900/40 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-100/60 dark:bg-cyan-950/50 border border-cyan-500/20 flex items-center justify-center text-[#3B82C4] dark:text-cyan-400 flex-shrink-0">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1 pr-5">
              <span className="text-[10px] font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider block">
                24H CHANGE
              </span>
              <div className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400 tracking-tight mt-0.5 leading-none flex items-center gap-1">
                <span>+0.08°</span>
                <span className="text-sm">↗</span>
              </div>
              <span className="text-xs text-stone-500 dark:text-stone-400 block font-sans mt-1 leading-tight">
                Slight increase from previous day
              </span>
            </div>
          </div>

          {/* Card 3: AVERAGE TILT */}
          <div className="relative p-3.5 rounded-2xl bg-[#E8F7EF]/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100/60 dark:bg-emerald-950/50 border border-emerald-500/20 flex items-center justify-center text-[#087443] dark:text-emerald-400 flex-shrink-0">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1 pr-5">
              <span className="text-[10px] font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider block">
                AVERAGE TILT
              </span>
              <div className="text-xl font-bold text-emerald-700 dark:text-emerald-400 tracking-tight mt-0.5 leading-none flex items-center gap-1">
                <span>~{averageTilt}°</span>
                <span className="text-sm">→</span>
              </div>
              <span className="text-xs text-stone-500 dark:text-stone-400 block font-sans mt-1 leading-tight">
                Mean baseline over 24 hours
              </span>
            </div>
          </div>

          {/* Card 4: PEAK TILT (24H) */}
          <div className="relative p-3.5 rounded-2xl bg-white dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-stone-100 dark:bg-stone-800 border border-stone-200/80 dark:border-stone-700 flex items-center justify-center text-stone-600 dark:text-stone-300 flex-shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider block">
                PEAK TILT (24H)
              </span>
              <div className="text-xl font-bold font-mono text-stone-900 dark:text-white tracking-tight mt-0.5 leading-none">
                {peakTilt}°
              </div>
              <span className="text-xs text-stone-500 dark:text-stone-400 block font-sans mt-1 leading-tight">
                Today, 14:00
              </span>
            </div>
          </div>

        </div>

        {/* 7. GROUND MOVEMENT INSIGHTS & SLOPE CROSS-SECTION */}
        <div className="mt-4 p-4 rounded-2xl bg-white dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
          
          {/* Left Column: 4 Ground Movement Insights */}
          <div className="md:col-span-7 space-y-3">
            <div className="flex items-center gap-2 pb-1 border-b border-stone-100 dark:border-stone-800/60">
              <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-[#3B82C4] flex items-center justify-center">
                <Lightbulb className="w-4 h-4" />
              </div>
              <h4 className="text-base font-bold text-stone-900 dark:text-white font-heading">
                Ground Movement Insights
              </h4>
            </div>

            <ul className="space-y-2 text-xs sm:text-[13px] text-stone-600 dark:text-stone-300">
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#087443] dark:bg-emerald-400 mt-1.5 flex-shrink-0" />
                <span>Tilt values remain well below the prototype warning threshold (3.5°).</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#087443] dark:bg-emerald-400 mt-1.5 flex-shrink-0" />
                <span>No abnormal ground movement detected in the last 24 hours.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#087443] dark:bg-emerald-400 mt-1.5 flex-shrink-0" />
                <span>Continuous monitoring helps in early detection of potential slope instability.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#087443] dark:bg-emerald-400 mt-1.5 flex-shrink-0" />
                <span>Current slope condition is stable based on prototype sensor telemetry.</span>
              </li>
            </ul>
          </div>

          {/* Right Column: Slope Cross-Section (Illustration) */}
          <div className="md:col-span-5 flex flex-col space-y-2">
            <span className="text-xs font-bold text-stone-700 dark:text-stone-300 font-heading">
              Slope Cross-Section (Illustration)
            </span>
            <SlopeCrossSectionIllustration />
          </div>

        </div>

        {/* 8. FOOTER */}
        <div className="mt-4 px-4 py-2.5 rounded-xl bg-[#E8F7EF]/70 dark:bg-emerald-950/30 border border-emerald-500/20 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-stone-600 dark:text-stone-300">
          <div className="flex items-center gap-2 font-medium">
            <ShieldCheck className="w-4 h-4 text-[#087443] dark:text-emerald-400" />
            <span>Continuous monitoring. Safer mountains. Stronger communities.</span>
          </div>
          <div className="flex items-center gap-1.5 font-semibold text-[#087443] dark:text-emerald-400">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M12 3L2 20h20L12 3zm0 4.5l6.5 10.5H5.5L12 7.5z" />
            </svg>
            <span>Landslide Guard</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default GroundStabilityCard;
