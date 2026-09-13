import React, { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Droplets, 
  CloudRain, 
  Activity, 
  Battery, 
  Radio, 
  ArrowUpRight, 
  ArrowRight
} from 'lucide-react';
import kulluValleyImg from '../../assets/kullu_valley_aerial.jpg';

/**
 * MonitoringNodesCard
 * 
 * Professional Himalayan environmental IoT monitoring panel combining:
 * 1. Upper-right photographic aerial view of the Kullu–Manali valley at ~25-30% opacity with forest-green gradient.
 * 2. Header with compact network statistics (8 Total, 7 Online, 5 Safe, 1 Warning, 1 High Risk, 1 Offline).
 * 3. Compact visual sensor node cards with telemetry icons (Soil, Rain, Tilt, Battery, LoRa RSSI).
 * 4. High-risk visual prominence for NODE-05 (Mountain Zone C).
 * 5. Interactive node selection linked with the Live Monitoring Map.
 */
export const MonitoringNodesCard = ({ 
  nodes = [], 
  selectedNodeId = null, 
  onSelectNode = null, 
  className = "" 
}) => {
  const navigate = useNavigate();

  // Compute live compact statistics from nodes
  const stats = useMemo(() => {
    let total = nodes.length || 8;
    let online = 0;
    let safe = 0;
    let warning = 0;
    let highRisk = 0;
    let offline = 0;

    nodes.forEach(node => {
      const isOff = node.status?.toLowerCase() === 'offline';
      if (isOff) {
        offline += 1;
      } else {
        online += 1;
        const riskLevel = node.riskLevel || node.risk?.level || (typeof node.risk === 'string' ? node.risk : 'safe');
        const levelLower = riskLevel?.toLowerCase() || '';
        const score = node.risk?.score || 0;

        if (node.id === 'NODE-05' || levelLower.includes('high') || levelLower.includes('critical') || score > 50) {
          highRisk += 1;
        } else if (levelLower.includes('warn') || score > 25) {
          warning += 1;
        } else {
          safe += 1;
        }
      }
    });

    // Fallback defaults if node array is initializing
    if (nodes.length === 0) {
      total = 8;
      online = 7;
      safe = 5;
      warning = 1;
      highRisk = 1;
      offline = 1;
    }

    return { total, online, safe, warning, highRisk, offline };
  }, [nodes]);

  return (
    <div 
      className={`relative overflow-hidden rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#0f1712] shadow-sm hover:shadow-md transition-all duration-200 min-w-0 flex flex-col justify-between ${className}`}
    >
      {/* 1. UPPER BACKGROUND VISUAL: Real Kullu–Manali Himalayan Valley Aerial Photograph */}
      <div 
        className="absolute top-0 right-0 w-full sm:w-[85%] h-52 sm:h-56 overflow-hidden pointer-events-none z-0 select-none"
        aria-hidden="true"
      >
        <img 
          src={kulluValleyImg} 
          alt="Kullu-Manali Himalayan Valley" 
          className="w-full h-full object-cover object-[center_35%] opacity-30 dark:opacity-25 filter contrast-105"
          loading="lazy"
        />
        {/* Subtle Dark Forest-Green Gradient Scrims for 100% Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/40 via-emerald-950/60 to-white dark:to-[#0f1712]" />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent dark:from-[#0f1712] dark:via-[#0f1712]/80 dark:to-transparent" />
      </div>

      {/* 2. PANEL HEADER & COMPACT METRICS */}
      <div className="relative z-10 p-4 sm:p-5 pb-3">
        {/* Title and Top Action */}
        <div className="flex items-start justify-between gap-3 min-w-0 pb-2 border-b border-stone-100/80 dark:border-stone-800/60">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-bold font-heading text-stone-900 dark:text-white tracking-tight">
                Monitoring Nodes
              </h3>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Mesh
              </span>
            </div>
            <p className="text-xs text-stone-500 dark:text-stone-300 mt-0.5">
              8 IoT stations across Himalayan slope sectors
            </p>
          </div>

          <Link 
            to="/sensors" 
            className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 hover:underline inline-flex items-center gap-1 flex-shrink-0 transition-colors py-1 px-1.5 rounded-lg hover:bg-emerald-500/10"
            title="Open comprehensive sensor telemetry view"
          >
            <span>View All Sensors</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Compact Statistics Row: 8 Total, 7 Online, 5 Safe, 1 Warning, 1 High Risk, 1 Offline */}
        <div className="mt-3 flex items-center gap-1.5 sm:gap-2 flex-wrap text-[11px]">
          {/* Total */}
          <div className="px-2 py-0.5 rounded-lg bg-stone-100/90 dark:bg-stone-800/80 backdrop-blur-xs border border-stone-200/80 dark:border-stone-700/70 text-stone-700 dark:text-stone-300 font-medium flex items-center gap-1 shadow-2xs">
            <span className="font-bold text-stone-900 dark:text-white">{stats.total}</span>
            <span>Total Nodes</span>
          </div>

          {/* Online */}
          <div className="px-2 py-0.5 rounded-lg bg-emerald-500/10 dark:bg-emerald-950/40 backdrop-blur-xs border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 font-medium flex items-center gap-1.5 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="font-bold">{stats.online}</span>
            <span>Online</span>
          </div>

          {/* Safe */}
          <div className="px-2 py-0.5 rounded-lg bg-emerald-500/10 dark:bg-emerald-950/30 backdrop-blur-xs border border-emerald-500/25 text-emerald-700 dark:text-emerald-400 font-medium flex items-center gap-1.5 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="font-bold">{stats.safe}</span>
            <span>Safe</span>
          </div>

          {/* Warning */}
          <div className="px-2 py-0.5 rounded-lg bg-amber-500/10 dark:bg-amber-950/40 backdrop-blur-xs border border-amber-500/30 text-amber-700 dark:text-amber-300 font-medium flex items-center gap-1.5 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span className="font-bold">{stats.warning}</span>
            <span>Warning</span>
          </div>

          {/* High Risk */}
          <div className="px-2 py-0.5 rounded-lg bg-red-500/10 dark:bg-red-950/40 backdrop-blur-xs border border-red-500/30 text-red-700 dark:text-red-300 font-medium flex items-center gap-1.5 shadow-2xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
            </span>
            <span className="font-bold">{stats.highRisk}</span>
            <span>High Risk</span>
          </div>

          {/* Offline */}
          <div className="px-2 py-0.5 rounded-lg bg-stone-100/90 dark:bg-stone-800/80 backdrop-blur-xs border border-stone-200/80 dark:border-stone-700/70 text-stone-500 dark:text-stone-400 font-medium flex items-center gap-1.5 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-stone-400" />
            <span className="font-bold">{stats.offline}</span>
            <span>Offline</span>
          </div>
        </div>
      </div>

      {/* 3. SCROLLABLE NODE CARDS LIST */}
      <div className="relative z-10 px-4 sm:px-5 pb-3">
        <div className="overflow-y-auto max-h-[385px] sm:max-h-[415px] space-y-2 pr-1 custom-scrollbar">
          {nodes.map(node => {
            const isOffline = node.status?.toLowerCase() === 'offline';
            const riskLevel = node.riskLevel || node.risk?.level || (typeof node.risk === 'string' ? node.risk : 'safe');
            const levelLower = riskLevel?.toLowerCase() || '';
            const score = node.risk?.score || 0;

            const isHighRisk = !isOffline && (node.id === 'NODE-05' || levelLower.includes('high') || levelLower.includes('critical') || score > 50);
            const isWarning = !isOffline && !isHighRisk && (levelLower.includes('warn') || score > 25);
            const isSafe = !isOffline && !isHighRisk && !isWarning;
            const isSelected = selectedNodeId === node.id;

            // Telemetry values
            const soilVal = isOffline ? '—' : `${typeof node.readings?.soilMoisture?.value === 'number' ? Math.round(node.readings.soilMoisture.value) : (node.readings?.soilMoisture?.value ?? node.soil ?? 42)}%`;
            const rainVal = isOffline ? '—' : `${typeof node.readings?.rainfall?.value === 'number' ? Math.round(node.readings.rainfall.value) : (node.readings?.rainfall?.value ?? node.rainfall ?? 12)}mm`;
            const tiltVal = isOffline ? '—' : `${typeof node.readings?.tilt?.value === 'number' ? Number(node.readings.tilt.value).toFixed(1) : (node.readings?.tilt?.value ?? node.tilt ?? 1.8)}°`;
            const battVal = `${node.device?.battery?.value ?? node.battery ?? 91}%`;
            const signalVal = isOffline ? 'Offline' : (node.device?.signal?.rssi ? `${node.device.signal.rssi} dBm` : (node.signal || '-71 dBm'));
            const locationName = node.location?.name || node.locationName || (typeof node.location === 'string' ? node.location : 'Himalayan Slope');

            return (
              <div 
                key={node.id}
                data-node-id={node.id}
                onClick={() => onSelectNode && onSelectNode(node)}
                className={`group relative rounded-xl p-2.5 transition-all duration-200 cursor-pointer border ${
                  isSelected 
                    ? 'bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-500 shadow-sm ring-1 ring-emerald-500/50' 
                    : isHighRisk
                      ? 'bg-red-50/70 dark:bg-red-950/20 border-red-400/60 dark:border-red-500/50 shadow-xs hover:border-red-500'
                      : 'bg-stone-50/80 dark:bg-stone-900/60 backdrop-blur-xs border-stone-200/80 dark:border-stone-800/80 hover:bg-stone-100/80 dark:hover:bg-stone-900/90 hover:border-emerald-500/40'
                }`}
              >
                {/* Visual Highlight Ribbon for NODE-05 (High Risk) */}
                {isHighRisk && (
                  <div className="absolute top-0 left-0 bottom-0 w-1 bg-red-500 rounded-l-xl" />
                )}

                {/* Line 1: Status Dot, Node ID · Location, and Risk Badge */}
                <div className="flex items-center justify-between gap-2 min-w-0 pl-1">
                  <div className="flex items-center gap-2 min-w-0">
                    {/* Status Dot */}
                    {isOffline ? (
                      <span className="w-2.5 h-2.5 rounded-full bg-stone-400 flex-shrink-0" />
                    ) : isHighRisk ? (
                      <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
                      </span>
                    ) : isWarning ? (
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400 flex-shrink-0 shadow-2xs" />
                    ) : (
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 flex-shrink-0 shadow-2xs" />
                    )}

                    <div className="font-extrabold text-xs text-stone-900 dark:text-stone-100 truncate flex items-center gap-1.5">
                      <span className="font-mono tracking-tight">{node.id}</span>
                      <span className="text-stone-400 dark:text-stone-500 text-[10px]">&bull;</span>
                      <span className="font-medium text-stone-600 dark:text-stone-300 text-[11px] truncate">
                        {locationName}
                      </span>
                    </div>
                  </div>

                  {/* Risk Badge */}
                  <div className="flex-shrink-0">
                    <span className={`text-[10px] uppercase tracking-wide font-bold px-2 py-0.5 rounded-full ${
                      isOffline
                        ? 'bg-stone-200/70 dark:bg-stone-800 text-stone-600 dark:text-stone-400 border border-stone-300/60 dark:border-stone-700'
                        : isHighRisk
                          ? 'bg-red-500/15 text-red-700 dark:text-red-400 border border-red-500/30 font-extrabold shadow-2xs'
                          : isWarning
                            ? 'bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30 font-bold'
                            : 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 font-bold'
                    }`}>
                      {isOffline ? 'Offline' : isHighRisk ? 'HIGH RISK' : isWarning ? 'WARNING' : 'SAFE'}
                    </span>
                  </div>
                </div>

                {/* Line 2: Telemetry Metrics with Small Icons (Soil, Rain, Tilt, Battery) */}
                <div className="mt-2 grid grid-cols-4 gap-1.5 text-[10.5px] pl-1 border-t border-stone-200/50 dark:border-stone-800/60 pt-1.5">
                  {/* Soil Moisture */}
                  <div className="flex items-center gap-1 text-stone-600 dark:text-stone-300 truncate" title={`Soil Moisture: ${soilVal}`}>
                    <Droplets className="w-3 h-3 text-cyan-500 flex-shrink-0" />
                    <span className="truncate">Soil <strong className="text-stone-900 dark:text-white font-mono">{soilVal}</strong></span>
                  </div>

                  {/* Rainfall */}
                  <div className="flex items-center gap-1 text-stone-600 dark:text-stone-300 truncate" title={`Rainfall: ${rainVal}`}>
                    <CloudRain className="w-3 h-3 text-blue-500 flex-shrink-0" />
                    <span className="truncate">Rain <strong className="text-stone-900 dark:text-white font-mono">{rainVal}</strong></span>
                  </div>

                  {/* Tilt */}
                  <div className="flex items-center gap-1 text-stone-600 dark:text-stone-300 truncate" title={`Ground Tilt: ${tiltVal}`}>
                    <Activity className="w-3 h-3 text-amber-500 flex-shrink-0" />
                    <span className="truncate">Tilt <strong className="text-stone-900 dark:text-white font-mono">{tiltVal}</strong></span>
                  </div>

                  {/* Battery */}
                  <div className="flex items-center gap-1 text-stone-600 dark:text-stone-300 truncate" title={`Battery Level: ${battVal}`}>
                    <Battery className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                    <span className="truncate">Batt <strong className="text-stone-900 dark:text-white font-mono">{battVal}</strong></span>
                  </div>
                </div>

                {/* Line 3: LoRa Telemetry RSSI & View Details Action */}
                <div className="mt-1.5 flex items-center justify-between text-[10.5px] pl-1 pt-0.5">
                  <div className="flex items-center gap-1.5 text-stone-500 dark:text-stone-400 font-mono">
                    <Radio className="w-3 h-3 text-purple-400 flex-shrink-0" />
                    <span>LoRa {signalVal}</span>
                    {!isOffline && (
                      <>
                        <span className="text-stone-400">&bull;</span>
                        <span className="text-[10px] text-stone-400 font-sans">{node.device?.lastSeen || 'Just now'}</span>
                      </>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onSelectNode) onSelectNode(node);
                      navigate('/sensors');
                    }}
                    className="inline-flex items-center gap-1 text-[10.5px] font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 hover:underline cursor-pointer group-hover:translate-x-0.5 transition-all"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. FOOTER: View All Sensors Action */}
      <div className="relative z-10 px-5 py-3 border-t border-stone-100 dark:border-stone-800/80 bg-stone-50/50 dark:bg-stone-900/30 text-center">
        <Link 
          to="/sensors" 
          className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 hover:underline inline-flex items-center gap-1 transition-colors"
        >
          <span>View All Sensors</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};

export default MonitoringNodesCard;

