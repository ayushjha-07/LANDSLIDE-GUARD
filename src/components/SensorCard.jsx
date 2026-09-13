import React from 'react';
import { 
  Droplets, 
  CloudRain, 
  Compass, 
  Activity, 
  Thermometer, 
  Wind, 
  Clock, 
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import Card from './common/Card';
import BatteryIndicator from './BatteryIndicator';
import SignalIndicator from './SignalIndicator';

export const SensorCard = ({ node, onViewDetails }) => {
  const isOffline = node.status?.toLowerCase() === 'offline';

  // Risk styling
  const isNodeOffline = node.status?.toLowerCase() === 'offline';
  const riskDisplay = isNodeOffline
    ? 'Offline'
    : (node.riskLevel || (node.risk?.level === 'high-risk' ? 'High Risk' : node.risk?.level === 'warning' ? 'Warning' : node.risk?.level === 'critical' ? 'Critical' : (typeof node.risk === 'string' ? node.risk : 'Safe')));

  let riskBadgeClass = "bg-nature-500/15 text-nature-700 dark:text-nature-400 border-nature-500/30";
  if (isNodeOffline) {
    riskBadgeClass = "bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-400 border-stone-300 dark:border-stone-700";
  } else if (riskDisplay === 'Critical' || node.risk?.level === 'critical') {
    riskBadgeClass = "bg-rose-500/15 text-rose-700 dark:text-rose-400 border-rose-500/30";
  } else if (riskDisplay === 'High Risk' || node.risk?.level === 'high-risk') {
    riskBadgeClass = "bg-orange-500/15 text-orange-700 dark:text-orange-400 border-orange-500/30 font-bold";
  } else if (riskDisplay === 'Warning' || node.risk?.level === 'warning') {
    riskBadgeClass = "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30";
  }

  return (
    <Card 
      data-node-id={node.id}
      className={`flex flex-col justify-between transition-all duration-200 hover:shadow-md ${
        isOffline ? 'opacity-90 border-stone-300 dark:border-stone-800/80 bg-stone-50/50 dark:bg-forest-950/20' : ''
      }`}
    >
      {/* 1. TOP HEADER */}
      <div className="flex items-start justify-between gap-2 border-b border-stone-100 dark:border-forest-900/60 pb-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold font-heading text-stone-900 dark:text-white font-mono truncate">
              {node.id}
            </h3>
            {isOffline ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-stone-500 dark:text-stone-400 bg-stone-200/70 dark:bg-stone-800 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-stone-400" /> Offline
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-nature-700 dark:text-nature-400 bg-nature-500/10 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-nature-500 animate-pulse" /> Online
              </span>
            )}
          </div>
          <p className="text-xs text-stone-500 dark:text-stone-400 font-medium truncate mt-0.5">
            {node.location?.name || node.location}
          </p>
        </div>

        <div className="flex-shrink-0 text-right">
          <span className={`inline-block text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${riskBadgeClass}`}>
            {riskDisplay}
          </span>
        </div>
      </div>

      {/* 2. MIDDLE: 6 SENSOR READINGS */}
      <div className="py-3">
        {isOffline ? (
          <div className="p-3 rounded-xl bg-stone-100 dark:bg-stone-900/50 border border-stone-200 dark:border-stone-800 text-stone-500 dark:text-stone-400 text-xs space-y-2">
            <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-semibold">
              <AlertCircle className="w-4 h-4" />
              <span>Telemetry Link Lost</span>
            </div>
            <p className="text-[11px] text-stone-400 dark:text-stone-500">
              No live signal received for 18 minutes. Showing last confirmed geotechnical state:
            </p>
            <div className="grid grid-cols-3 gap-1.5 text-center pt-1 font-mono text-[11px]">
              <div className="p-1.5 rounded bg-white/70 dark:bg-stone-800/60">
                <span className="text-[10px] text-stone-400 block font-sans">Moisture</span>
                <span className="font-bold text-stone-700 dark:text-stone-300">{node.lastKnown?.soil}%</span>
              </div>
              <div className="p-1.5 rounded bg-white/70 dark:bg-stone-800/60">
                <span className="text-[10px] text-stone-400 block font-sans">Rain</span>
                <span className="font-bold text-stone-700 dark:text-stone-300">{node.lastKnown?.rain} mm</span>
              </div>
              <div className="p-1.5 rounded bg-white/70 dark:bg-stone-800/60">
                <span className="text-[10px] text-stone-400 block font-sans">Tilt</span>
                <span className="font-bold text-stone-700 dark:text-stone-300">{node.lastKnown?.tilt}°</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {/* Reading 1: Soil Moisture */}
            <div className="p-2 rounded-xl bg-stone-50 dark:bg-forest-950/40 border border-stone-100 dark:border-forest-900/40">
              <div className="flex items-center justify-between text-stone-400 mb-1">
                <span className="text-[10px] uppercase font-semibold">Soil</span>
                <Droplets className="w-3.5 h-3.5 text-nature-500" />
              </div>
              <div className="text-sm sm:text-base font-bold font-mono text-stone-900 dark:text-white">
                {node.soil}<span className="text-[10px] font-normal text-stone-400 ml-0.5">%</span>
              </div>
            </div>

            {/* Reading 2: Rainfall */}
            <div className="p-2 rounded-xl bg-stone-50 dark:bg-forest-950/40 border border-stone-100 dark:border-forest-900/40">
              <div className="flex items-center justify-between text-stone-400 mb-1">
                <span className="text-[10px] uppercase font-semibold">Rain</span>
                <CloudRain className="w-3.5 h-3.5 text-sky-500" />
              </div>
              <div className="text-sm sm:text-base font-bold font-mono text-stone-900 dark:text-white">
                {node.rain}<span className="text-[10px] font-normal text-stone-400 ml-0.5">mm</span>
              </div>
            </div>

            {/* Reading 3: Ground Tilt */}
            <div className="p-2 rounded-xl bg-stone-50 dark:bg-forest-950/40 border border-stone-100 dark:border-forest-900/40">
              <div className="flex items-center justify-between text-stone-400 mb-1">
                <span className="text-[10px] uppercase font-semibold">Tilt</span>
                <Compass className="w-3.5 h-3.5 text-forest-600 dark:text-nature-400" />
              </div>
              <div className="text-sm sm:text-base font-bold font-mono text-stone-900 dark:text-white">
                {node.tilt}<span className="text-[10px] font-normal text-stone-400 ml-0.5">°</span>
              </div>
            </div>

            {/* Reading 4: Vibration */}
            <div className="p-2 rounded-xl bg-stone-50 dark:bg-forest-950/40 border border-stone-100 dark:border-forest-900/40">
              <div className="flex items-center justify-between text-stone-400 mb-1">
                <span className="text-[10px] uppercase font-semibold">Vibration</span>
                <Activity className="w-3.5 h-3.5 text-amber-500" />
              </div>
              <div className="text-sm sm:text-base font-bold font-mono text-stone-900 dark:text-white">
                {node.vibration}<span className="text-[10px] font-normal text-stone-400 ml-0.5">g</span>
              </div>
            </div>

            {/* Reading 5: Temperature */}
            <div className="p-2 rounded-xl bg-stone-50 dark:bg-forest-950/40 border border-stone-100 dark:border-forest-900/40">
              <div className="flex items-center justify-between text-stone-400 mb-1">
                <span className="text-[10px] uppercase font-semibold">Temp</span>
                <Thermometer className="w-3.5 h-3.5 text-rose-500" />
              </div>
              <div className="text-sm sm:text-base font-bold font-mono text-stone-900 dark:text-white">
                {node.temperature}<span className="text-[10px] font-normal text-stone-400 ml-0.5">°C</span>
              </div>
            </div>

            {/* Reading 6: Humidity */}
            <div className="p-2 rounded-xl bg-stone-50 dark:bg-forest-950/40 border border-stone-100 dark:border-forest-900/40">
              <div className="flex items-center justify-between text-stone-400 mb-1">
                <span className="text-[10px] uppercase font-semibold">Humidity</span>
                <Wind className="w-3.5 h-3.5 text-purple-500" />
              </div>
              <div className="text-sm sm:text-base font-bold font-mono text-stone-900 dark:text-white">
                {node.humidity}<span className="text-[10px] font-normal text-stone-400 ml-0.5">%</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. BOTTOM: DEVICE INFORMATION */}
      <div className="pt-3 border-t border-stone-100 dark:border-forest-900/60 space-y-2.5">
        <div className="flex items-center justify-between gap-1 flex-wrap text-xs">
          <div className="flex items-center gap-2">
            <BatteryIndicator battery={node.battery} />
            <SignalIndicator signal={node.signal} signalStrength={node.signalStrength} />
          </div>

          <div className="flex items-center gap-1 text-[11px] text-stone-400">
            <Clock className="w-3 h-3" />
            <span>{node.lastUpdate}</span>
          </div>
        </div>

        {/* 4. FOOTER BUTTON: VIEW DETAILS */}
        <button
          type="button"
          onClick={() => onViewDetails(node)}
          className="w-full min-h-[44px] px-4 py-2.5 rounded-xl bg-forest-50 dark:bg-forest-950/70 hover:bg-forest-100 dark:hover:bg-forest-900/60 border border-forest-200 dark:border-forest-800 text-forest-800 dark:text-nature-300 font-semibold text-xs flex items-center justify-between transition-colors shadow-sm"
          aria-label={`View detailed telemetry for ${node.id} ${node.location?.name || node.location}`}
        >
          <span>View Details</span>
          <ChevronRight className="w-4 h-4 text-forest-600 dark:text-nature-400" />
        </button>
      </div>
    </Card>
  );
};

export default SensorCard;
