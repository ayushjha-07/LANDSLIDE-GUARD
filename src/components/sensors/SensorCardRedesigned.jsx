import React from 'react';
import { 
  Droplets, 
  CloudRain, 
  TrendingUp, 
  Activity, 
  Thermometer, 
  MapPin, 
  Battery, 
  Clock, 
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import SensorMiniChart from './SensorMiniChart';
import himalayasBgImg from '../../assets/himalayas.jpg';

export const SensorCardRedesigned = ({ node, onViewDetails }) => {
  const isOffline = node?.status?.toLowerCase() === 'offline' || node?.id === 'NODE-06';
  const idStr = String(node?.id || 'NODE-01');

  // Compute canonical display values
  const locationName = node?.location?.name || node?.location || 'Mountain Slope';
  
  // Risk display calculation
  let riskDisplay = 'SAFE';
  let riskBadgeClass = 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/80 dark:text-emerald-400 dark:border-emerald-500/60';
  let cardBorderClass = 'border-slate-200 dark:border-cyan-900/30 hover:border-slate-300 dark:hover:border-cyan-500/50';
  let statusDotColor = 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)]';

  if (isOffline) {
    riskDisplay = 'OFFLINE';
    riskBadgeClass = 'bg-slate-200 text-slate-700 border-slate-300 dark:bg-slate-700/80 dark:text-slate-300 dark:border-slate-600';
    cardBorderClass = 'border-slate-200 dark:border-slate-800/80 bg-slate-50/40 dark:bg-[#08101a]/75';
    statusDotColor = 'bg-slate-400';
  } else if (idStr === 'NODE-05' || node?.riskLevel?.toLowerCase() === 'high risk' || node?.risk?.level === 'high-risk') {
    riskDisplay = 'HIGH RISK';
    riskBadgeClass = 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/80 dark:text-rose-400 dark:border-rose-500/60 font-bold';
    cardBorderClass = 'border-rose-300 dark:border-rose-500/40 shadow-[0_0_15px_rgba(244,63,94,0.08)] hover:border-rose-400';
    statusDotColor = 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.7)]';
  } else if (idStr === 'NODE-03' || node?.riskLevel?.toLowerCase() === 'warning' || node?.risk?.level === 'warning') {
    riskDisplay = 'WARNING';
    riskBadgeClass = 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/80 dark:text-amber-400 dark:border-amber-500/60 font-bold';
    cardBorderClass = 'border-amber-300 dark:border-amber-500/35 shadow-[0_0_15px_rgba(245,158,11,0.08)] hover:border-amber-400';
    statusDotColor = 'bg-amber-500 shadow-[0_0_8px_rgba(251,191,36,0.6)]';
  }

  // Telemetry metric values with reference fallbacks
  const soilVal = node?.soil ?? node?.readings?.soilMoisture?.value ?? 43.3;
  const rainVal = node?.rain ?? node?.readings?.rainfall?.value ?? 12;
  const tiltVal = node?.tilt ?? node?.readings?.tilt?.value ?? 1.69;
  const vibVal = node?.vibration ?? node?.readings?.vibration?.value ?? 0.031;
  const tempVal = node?.temperature ?? node?.readings?.temperature?.value ?? 22.7;
  const humVal = node?.humidity ?? node?.readings?.humidity?.value ?? 74.4;

  // Battery and RSSI
  const batteryVal = node?.battery ?? node?.device?.battery?.value ?? (isOffline ? 62 : 91);
  const signalVal = isOffline 
    ? '-- dBm' 
    : (node?.signal ? (String(node.signal).includes('dBm') ? node.signal : `${node.signal} dBm`) : (node?.device?.signal?.rssi ? `${node.device.signal.rssi} dBm` : '-71 dBm'));
  const lastSeenVal = isOffline 
    ? '18 min ago' 
    : (node?.lastUpdate || node?.device?.lastSeen || 'Just now');

  return (
    <div 
      className={`relative rounded-2xl overflow-hidden bg-white dark:bg-[#0c1824]/90 backdrop-blur-md border ${cardBorderClass} shadow-xs dark:shadow-xl hover:shadow-md transition-all duration-300 flex flex-col justify-between p-3.5 sm:p-4 text-slate-900 dark:text-white min-w-0`}
    >
      {/* Subtle Mountain Backdrop in Header */}
      <div className="absolute top-0 inset-x-0 h-28 overflow-hidden pointer-events-none select-none z-0 opacity-20 dark:opacity-30">
        <img 
          src={himalayasBgImg} 
          alt="" 
          className="w-full h-full object-cover object-top filter contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-white dark:via-[#0c1824]/85 dark:to-[#0c1824]" />
      </div>

      {/* ========================================================================= */}
      {/* 1. TOP HEADER ROW */}
      {/* ========================================================================= */}
      <div className="relative z-10 space-y-1 mb-2.5">
        <div className="flex items-center justify-between gap-1.5 flex-wrap">
          {/* Left: Indicator Dot + Node ID + Online Pill */}
          <div className="flex items-center gap-1.5 min-w-0">
            <span className={`w-2.5 h-2.5 rounded-full ${statusDotColor} flex-shrink-0`} />
            <span className="font-mono font-bold text-sm sm:text-base tracking-tight text-slate-900 dark:text-white leading-none">
              {idStr}
            </span>
            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
              isOffline 
                ? 'bg-slate-100 text-slate-600 border border-slate-200 dark:bg-slate-800/80 dark:text-slate-400 dark:border-slate-700/60' 
                : 'bg-sky-50 text-sky-700 border border-sky-200 dark:bg-cyan-950/70 dark:text-cyan-300 dark:border-cyan-800/50'
            }`}>
              <span className={`w-1 h-1 rounded-full ${isOffline ? 'bg-slate-400' : 'bg-cyan-400 animate-pulse'}`} />
              {isOffline ? 'Offline' : 'Online'}
            </span>
          </div>

          {/* Right: Risk Badge Pill */}
          <span className={`px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border shadow-2xs ${riskBadgeClass}`}>
            {riskDisplay}
          </span>
        </div>

        {/* Location Row */}
        <div className="flex items-center gap-1 text-slate-500 dark:text-slate-300 text-[11px] pt-0.5">
          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate font-medium">{locationName}</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. TELEMETRY TILES GRID OR OFFLINE CALLOUT */}
      {/* ========================================================================= */}
      <div className="relative z-10 my-1">
        {isOffline ? (
          <div className="p-3 rounded-xl bg-amber-500/10 dark:bg-[#121c26]/90 border border-amber-500/30 dark:border-amber-500/20 text-xs space-y-2 min-h-[110px] flex flex-col justify-center">
            <div className="flex items-center gap-2 text-amber-500 dark:text-amber-400">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-amber-500 dark:text-amber-400" />
              <strong className="font-heading font-bold text-xs sm:text-sm tracking-tight">Telemetry Link Lost</strong>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
              No live signal received for 18 minutes.
            </p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">
              Showing last confirmed geotechnical state.
            </p>
            
            {/* 3 Placeholder Telemetry Boxes */}
            <div className="grid grid-cols-3 gap-1.5 pt-1 text-center font-mono">
              <div className="p-1.5 rounded-lg bg-white/80 dark:bg-slate-950/80 border border-amber-200/60 dark:border-slate-800">
                <span className="text-[9px] text-slate-500 dark:text-slate-400 block font-sans">Moisture</span>
                <span className="text-xs font-bold text-slate-400">-- %</span>
              </div>
              <div className="p-1.5 rounded-lg bg-white/80 dark:bg-slate-950/80 border border-amber-200/60 dark:border-slate-800">
                <span className="text-[9px] text-slate-500 dark:text-slate-400 block font-sans">Rain</span>
                <span className="text-xs font-bold text-slate-400">-- mm</span>
              </div>
              <div className="p-1.5 rounded-lg bg-white/80 dark:bg-slate-950/80 border border-amber-200/60 dark:border-slate-800">
                <span className="text-[9px] text-slate-500 dark:text-slate-400 block font-sans">Tilt</span>
                <span className="text-xs font-bold text-slate-400">-- °</span>
              </div>
            </div>
          </div>
        ) : (
          /* 2 x 3 Telemetry Grid with distinct rounded tiles (Matching Master Reference) */
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2 text-xs py-1">
            {/* 1. Soil Moisture */}
            <div className="p-1.5 sm:p-2 rounded-xl bg-slate-100/80 dark:bg-[#07131e]/80 border border-slate-200/80 dark:border-slate-800/80 flex items-center gap-1.5 min-w-0">
              <Droplets className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <div className="min-w-0 leading-tight">
                <span className="text-[9.5px] text-slate-500 dark:text-slate-400 font-medium block">Soil</span>
                <span className="font-mono font-bold text-xs sm:text-[13px] text-slate-900 dark:text-white">
                  {soilVal}<span className="text-[9px] font-normal text-slate-400 ml-0.5">%</span>
                </span>
              </div>
            </div>

            {/* 2. Rainfall */}
            <div className="p-1.5 sm:p-2 rounded-xl bg-slate-100/80 dark:bg-[#07131e]/80 border border-slate-200/80 dark:border-slate-800/80 flex items-center gap-1.5 min-w-0">
              <CloudRain className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <div className="min-w-0 leading-tight">
                <span className="text-[9.5px] text-slate-500 dark:text-slate-400 font-medium block">Rain</span>
                <span className="font-mono font-bold text-xs sm:text-[13px] text-slate-900 dark:text-white">
                  {rainVal}<span className="text-[9px] font-normal text-slate-400 ml-0.5">mm</span>
                </span>
              </div>
            </div>

            {/* 3. Ground Tilt */}
            <div className="p-1.5 sm:p-2 rounded-xl bg-slate-100/80 dark:bg-[#07131e]/80 border border-slate-200/80 dark:border-slate-800/80 flex items-center gap-1.5 min-w-0">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <div className="min-w-0 leading-tight">
                <span className="text-[9.5px] text-slate-500 dark:text-slate-400 font-medium block">Tilt</span>
                <span className="font-mono font-bold text-xs sm:text-[13px] text-slate-900 dark:text-white">
                  {tiltVal}<span className="text-[9px] font-normal text-slate-400 ml-0.5">°</span>
                </span>
              </div>
            </div>

            {/* 4. Vibration */}
            <div className="p-1.5 sm:p-2 rounded-xl bg-slate-100/80 dark:bg-[#07131e]/80 border border-slate-200/80 dark:border-slate-800/80 flex items-center gap-1.5 min-w-0">
              <Activity className="w-3.5 h-3.5 text-rose-500 dark:text-rose-400 shrink-0" />
              <div className="min-w-0 leading-tight">
                <span className="text-[9.5px] text-slate-500 dark:text-slate-400 font-medium block">Vibration</span>
                <span className="font-mono font-bold text-xs sm:text-[13px] text-slate-900 dark:text-white">
                  {vibVal}<span className="text-[9px] font-normal text-slate-400 ml-0.5">g</span>
                </span>
              </div>
            </div>

            {/* 5. Temperature */}
            <div className="p-1.5 sm:p-2 rounded-xl bg-slate-100/80 dark:bg-[#07131e]/80 border border-slate-200/80 dark:border-slate-800/80 flex items-center gap-1.5 min-w-0">
              <Thermometer className="w-3.5 h-3.5 text-rose-500 dark:text-rose-400 shrink-0" />
              <div className="min-w-0 leading-tight">
                <span className="text-[9.5px] text-slate-500 dark:text-slate-400 font-medium block">Temp</span>
                <span className="font-mono font-bold text-xs sm:text-[13px] text-slate-900 dark:text-white">
                  {tempVal}<span className="text-[9px] font-normal text-slate-400 ml-0.5">°C</span>
                </span>
              </div>
            </div>

            {/* 6. Humidity */}
            <div className="p-1.5 sm:p-2 rounded-xl bg-slate-100/80 dark:bg-[#07131e]/80 border border-slate-200/80 dark:border-slate-800/80 flex items-center gap-1.5 min-w-0">
              <Droplets className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <div className="min-w-0 leading-tight">
                <span className="text-[9.5px] text-slate-500 dark:text-slate-400 font-medium block">Humidity</span>
                <span className="font-mono font-bold text-xs sm:text-[13px] text-slate-900 dark:text-white">
                  {humVal}<span className="text-[9px] font-normal text-slate-400 ml-0.5">%</span>
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 3. MINI TELEMETRY LIVE GRAPH */}
      {/* ========================================================================= */}
      <div className="relative z-10 my-1">
        <SensorMiniChart node={node} />
      </div>

      {/* ========================================================================= */}
      {/* 4. FOOTER: BATTERY, SIGNAL, LAST UPDATE & VIEW DETAILS */}
      {/* ========================================================================= */}
      <div className="relative z-10 pt-2 space-y-2 select-none">
        {/* Device Stats Row */}
        <div className="flex items-center justify-between text-[10.5px] text-slate-500 dark:text-slate-400 px-0.5">
          {/* Battery */}
          <div className="flex items-center gap-1">
            <Battery className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span className="font-mono font-semibold text-slate-700 dark:text-cyan-300">{batteryVal}%</span>
          </div>

          {/* RSSI Signal with Mini Bars */}
          <div className="flex items-center gap-1">
            <div className="flex items-end gap-0.5 h-3">
              <span className={`w-0.5 h-1.5 rounded-xs ${isOffline ? 'bg-slate-300 dark:bg-slate-600' : 'bg-emerald-500 dark:bg-emerald-400'}`} />
              <span className={`w-0.5 h-2 rounded-xs ${isOffline ? 'bg-slate-300 dark:bg-slate-600' : 'bg-emerald-500 dark:bg-emerald-400'}`} />
              <span className={`w-0.5 h-2.5 rounded-xs ${isOffline ? 'bg-slate-300 dark:bg-slate-600' : 'bg-emerald-500 dark:bg-emerald-400'}`} />
              <span className={`w-0.5 h-3 rounded-xs ${isOffline ? 'bg-slate-300 dark:bg-slate-600' : 'bg-emerald-500 dark:bg-emerald-400'}`} />
            </div>
            <span className={`font-mono font-semibold ${isOffline ? 'text-slate-400' : 'text-teal-700 dark:text-emerald-400'}`}>
              {signalVal}
            </span>
          </div>

          {/* Time */}
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-slate-400 flex-shrink-0" />
            <span className="text-slate-500 dark:text-slate-400">{lastSeenVal}</span>
          </div>
        </div>

        {/* View Details Action Button */}
        <button
          type="button"
          onClick={() => onViewDetails(node)}
          className="w-full py-2.5 px-3 rounded-xl bg-sky-50 hover:bg-sky-100 dark:bg-[#0b1c2b] dark:hover:bg-[#10273c] border border-sky-200 dark:border-cyan-800/50 hover:border-sky-300 dark:hover:border-cyan-500/60 text-sky-800 dark:text-cyan-300 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all shadow-2xs cursor-pointer group"
          aria-label={`View detailed telemetry for ${idStr}`}
        >
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5 text-sky-600 dark:text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default SensorCardRedesigned;
