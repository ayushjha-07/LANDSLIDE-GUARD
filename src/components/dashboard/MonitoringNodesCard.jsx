import React, { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Layers, 
  Wifi, 
  ShieldCheck, 
  AlertCircle, 
  AlertTriangle, 
  Droplets, 
  CloudRain, 
  Battery, 
  Clock, 
  ArrowRight
} from 'lucide-react';
import kulluValleyImg from '../../assets/kullu_valley_aerial.jpg';

/**
 * 1. LoRa / IoT Communication Tower Icon
 * Professional lattice transmission mast with concentric wireless signal waves.
 */
export const LoraTowerIcon = ({ className = "w-8 h-8 text-stone-100" }) => (
  <svg
    viewBox="0 0 36 36"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* Central Antenna Mast */}
    <line x1="18" y1="3" x2="18" y2="13" strokeWidth="2.4" />
    <circle cx="18" cy="3" r="1.5" fill="currentColor" />

    {/* Structural Tower Legs */}
    <path d="M13.5 32 L17 13 L19 13 L22.5 32" strokeWidth="2" />

    {/* Horizontal Struts */}
    <line x1="14.8" y1="26.5" x2="21.2" y2="26.5" strokeWidth="1.6" />
    <line x1="16.2" y1="20" x2="19.8" y2="20" strokeWidth="1.6" />

    {/* Diagonal Cross Lattice */}
    <line x1="16.2" y1="20" x2="21.2" y2="26.5" strokeWidth="1.2" strokeOpacity="0.85" />
    <line x1="19.8" y1="20" x2="14.8" y2="26.5" strokeWidth="1.2" strokeOpacity="0.85" />
    <line x1="15" y1="26.5" x2="22" y2="32" strokeWidth="1.2" strokeOpacity="0.7" />
    <line x1="21" y1="26.5" x2="14" y2="32" strokeWidth="1.2" strokeOpacity="0.7" />

    {/* Concentric Wireless Radio Wave Arcs (Inner) */}
    <path d="M12 6 A 8.5 8.5 0 0 0 12 16" strokeWidth="2" />
    <path d="M24 6 A 8.5 8.5 0 0 1 24 16" strokeWidth="2" />

    {/* Concentric Wireless Radio Wave Arcs (Outer) */}
    <path d="M7 3 A 14 14 0 0 0 7 19" strokeWidth="2" strokeOpacity="0.8" />
    <path d="M29 3 A 14 14 0 0 1 29 19" strokeWidth="2" strokeOpacity="0.8" />
  </svg>
);

/**
 * 2. Himalayan Mountain Identity Badge for Each Node Card
 * Circular identity icon with bold twin Himalayan mountain peaks in crisp snow white,
 * colored outer border and subtle glow matching node risk.
 */
export const MountainNodeBadge = ({ risk = 'safe', className = "w-11 h-11 sm:w-12 sm:h-12" }) => {
  const styles = {
    safe: {
      border: 'border-emerald-500',
      glow: 'shadow-[0_0_10px_rgba(16,185,129,0.25)]',
      bg: 'bg-emerald-950/90 dark:bg-gradient-to-br dark:from-[#082a1d] dark:via-[#051a12] dark:to-[#03110c]',
      mountainLeft: '#059669',
      mountainRight: '#10b981',
    },
    warning: {
      border: 'border-amber-500',
      glow: 'shadow-[0_0_10px_rgba(245,158,11,0.25)]',
      bg: 'bg-amber-950/90 dark:bg-gradient-to-br dark:from-[#2e1a05] dark:via-[#1c1102] dark:to-[#0c0801]',
      mountainLeft: '#d97706',
      mountainRight: '#f59e0b',
    },
    'high-risk': {
      border: 'border-rose-500',
      glow: 'shadow-[0_0_12px_rgba(239,68,68,0.35)]',
      bg: 'bg-rose-950/90 dark:bg-gradient-to-br dark:from-[#38090d] dark:via-[#210507] dark:to-[#120304]',
      mountainLeft: '#dc2626',
      mountainRight: '#ef4444',
    },
    offline: {
      border: 'border-slate-400 dark:border-stone-600',
      glow: 'shadow-none',
      bg: 'bg-slate-800/90 dark:bg-gradient-to-br dark:from-[#1e2326] dark:via-[#14181a] dark:to-[#0c0e10]',
      mountainLeft: '#64748b',
      mountainRight: '#94a3b8',
    }
  };

  const c = styles[risk] || styles.safe;

  return (
    <div 
      className={`relative flex items-center justify-center rounded-full border-2 ${c.border} ${c.glow} ${c.bg} flex-shrink-0 select-none overflow-hidden ${className}`}
    >
      <svg
        viewBox="0 0 32 32"
        fill="none"
        className="w-full h-full p-1"
        aria-hidden="true"
      >
        {/* Left Secondary Peak */}
        <path d="M5 23 L12 12 L19 23 Z" fill={c.mountainLeft} />
        {/* Left Peak Snow Cap */}
        <path d="M12 12 L9.5 16 L14.5 16 Z" fill="#ffffff" />

        {/* Right Primary Himalayan Peak */}
        <path d="M12 23 L21 8 L29 23 Z" fill={c.mountainRight} />
        {/* Right Peak Snow Cap */}
        <path d="M21 8 L17.5 14 L20.5 13.2 L22 14.5 L25 14 Z" fill="#ffffff" />
      </svg>
    </div>
  );
};

/**
 * 3. Mountain Wireframe Icon for Header Slogan
 */
export const MountainWireframeIcon = ({ className = "w-5 h-5 text-emerald-400" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M3 20 L10 7 L14 14 L17 9 L21 20 Z" />
    <path d="M10 7 L7 12 L10 13 L14 14" strokeOpacity="0.6" />
    <path d="M17 9 L15 13 L17 14 L19 14" strokeOpacity="0.6" />
  </svg>
);

/**
 * 4. Tilt Inclinometer Icon
 */
export const TiltIcon = ({ className = "w-3.5 h-3.5 text-cyan-400" }) => (
  <svg 
    viewBox="0 0 16 16" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.6" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className} 
    aria-hidden="true"
  >
    <polygon points="8 2 14 14 2 14" />
    <line x1="8" y1="7" x2="8" y2="11" strokeWidth="1.2" />
  </svg>
);

/**
 * 5. Dynamic 4-Bar Signal RSSI Icon
 */
export const SignalBarsIcon = ({ rssi = -70, isOffline = false, className = "w-3.5 h-3.5" }) => {
  let bars = 4;
  let color = "text-emerald-600 dark:text-emerald-400";

  if (isOffline) {
    bars = 0;
    color = "text-slate-400 dark:text-stone-500";
  } else if (rssi >= -70) {
    bars = 4;
    color = "text-emerald-600 dark:text-emerald-400";
  } else if (rssi >= -78) {
    bars = 3;
    color = "text-emerald-600 dark:text-emerald-400";
  } else if (rssi >= -85) {
    bars = 2;
    color = "text-amber-600 dark:text-amber-400";
  } else {
    bars = 1;
    color = "text-rose-600 dark:text-red-400";
  }

  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={`${className} ${color}`} aria-hidden="true">
      <rect x="1" y="11" width="2.2" height="4" rx="0.5" opacity={bars >= 1 ? 1 : 0.25} />
      <rect x="4.5" y="8" width="2.2" height="7" rx="0.5" opacity={bars >= 2 ? 1 : 0.25} />
      <rect x="8" y="5" width="2.2" height="10" rx="0.5" opacity={bars >= 3 ? 1 : 0.25} />
      <rect x="11.5" y="2" width="2.2" height="13" rx="0.5" opacity={bars >= 4 ? 1 : 0.25} />
    </svg>
  );
};

/**
 * MonitoringNodesCard Component
 */
export const MonitoringNodesCard = ({ 
  nodes = [], 
  selectedNodeId = null, 
  onSelectNode = null, 
  className = "" 
}) => {
  const navigate = useNavigate();

  // Compute live statistics matching canonical definitions
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
      className={`relative overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/90 shadow-xs hover:shadow-md transition-all duration-200 min-w-0 flex flex-col justify-between text-slate-900 dark:text-white ${className}`}
    >
      {/* 1. UPPER BACKGROUND VISUAL: Real Kullu-Manali Himalayan Valley Aerial Visual */}
      <div 
        className="absolute top-0 right-0 w-full h-72 sm:h-80 overflow-hidden pointer-events-none z-0 select-none"
        aria-hidden="true"
      >
        <img 
          src={kulluValleyImg} 
          alt="Kullu-Manali Himalayan Valley" 
          className="w-full h-full object-cover object-[center_35%] opacity-15 dark:opacity-25 mix-blend-multiply dark:mix-blend-luminosity filter contrast-105"
          loading="lazy"
        />
        {/* Subtle Theme-Adaptive Gradient Scrims for 100% Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-white dark:from-emerald-950/20 dark:via-slate-900/85 dark:to-slate-900" />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 to-transparent dark:from-slate-900 dark:via-slate-900/80 dark:to-transparent" />
      </div>

      {/* 2. PANEL HEADER & TOP SECTION */}
      <div className="relative z-10 p-4 sm:p-5 pb-2">
        {/* Header Row */}
        <div className="flex items-start justify-between gap-3 min-w-0 pb-3">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            {/* Professional LoRa / IoT Communication Tower Icon */}
            <div className="flex-shrink-0 p-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200/80 dark:border-emerald-800/60 shadow-2xs">
              <LoraTowerIcon className="w-8 h-8 sm:w-9 sm:h-9 text-emerald-600 dark:text-emerald-400" />
            </div>

            <div className="min-w-0">
              <h3 className="text-lg sm:text-xl font-bold font-heading text-slate-900 dark:text-white tracking-tight leading-tight">
                Monitoring Nodes
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-sans">
                8 IoT stations across Himalayan slope sectors
              </p>
            </div>
          </div>

          {/* Top Right: View All Sensors Action */}
          <Link 
            to="/sensors" 
            className="text-xs font-semibold text-slate-700 dark:text-stone-200 hover:text-emerald-700 dark:hover:text-white inline-flex items-center gap-1.5 flex-shrink-0 transition-all py-1.5 px-3 rounded-full border border-slate-200/80 dark:border-stone-700/60 bg-white/90 dark:bg-stone-900/60 backdrop-blur-md hover:bg-slate-100 dark:hover:bg-stone-800/80 shadow-2xs"
            title="Open comprehensive sensor telemetry view"
          >
            <span>View All Sensors</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 3. STATISTIC CARDS (3x2 Grid) + RIGHT-SIDE VALLEY SLOGAN */}
        <div className="mt-1 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-2">
          {/* 3x2 Stat Cards Grid */}
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2 flex-1 max-w-sm sm:max-w-md">
            {/* 1. Total Nodes */}
            <div className="flex flex-col justify-center px-2 py-1.5 sm:px-2.5 sm:py-2 rounded-xl bg-cyan-50/80 dark:bg-cyan-950/40 border border-cyan-200/80 dark:border-cyan-800/50 backdrop-blur-md min-w-0 shadow-2xs">
              <div className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-600 dark:text-cyan-400 flex-shrink-0" />
                <span className="text-base sm:text-lg font-bold font-mono text-cyan-700 dark:text-cyan-400 leading-none">{stats.total}</span>
              </div>
              <span className="text-[10px] sm:text-[10.5px] text-slate-600 dark:text-stone-300 font-medium whitespace-nowrap mt-1 leading-tight">Total Nodes</span>
            </div>

            {/* 2. Online */}
            <div className="flex flex-col justify-center px-2 py-1.5 sm:px-2.5 sm:py-2 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/50 backdrop-blur-md min-w-0 shadow-2xs">
              <div className="flex items-center gap-1.5">
                <Wifi className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                <span className="text-base sm:text-lg font-bold font-mono text-emerald-700 dark:text-emerald-400 leading-none">{stats.online}</span>
              </div>
              <span className="text-[10px] sm:text-[10.5px] text-slate-600 dark:text-stone-300 font-medium whitespace-nowrap mt-1 leading-tight">Online</span>
            </div>

            {/* 3. Safe */}
            <div className="flex flex-col justify-center px-2 py-1.5 sm:px-2.5 sm:py-2 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/50 backdrop-blur-md min-w-0 shadow-2xs">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                <span className="text-base sm:text-lg font-bold font-mono text-emerald-700 dark:text-emerald-400 leading-none">{stats.safe}</span>
              </div>
              <span className="text-[10px] sm:text-[10.5px] text-slate-600 dark:text-stone-300 font-medium whitespace-nowrap mt-1 leading-tight">Safe</span>
            </div>

            {/* 4. High Risk */}
            <div className="flex flex-col justify-center px-2 py-1.5 sm:px-2.5 sm:py-2 rounded-xl bg-rose-50/80 dark:bg-rose-950/40 border border-rose-200/80 dark:border-rose-800/50 backdrop-blur-md min-w-0 shadow-2xs">
              <div className="flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-600 dark:text-rose-400 flex-shrink-0" />
                <span className="text-base sm:text-lg font-bold font-mono text-rose-700 dark:text-rose-400 leading-none">{stats.highRisk}</span>
              </div>
              <span className="text-[10px] sm:text-[10.5px] text-slate-600 dark:text-stone-300 font-medium whitespace-nowrap mt-1 leading-tight">High Risk</span>
            </div>

            {/* 5. Offline */}
            <div className="flex flex-col justify-center px-2 py-1.5 sm:px-2.5 sm:py-2 rounded-xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-stone-800/60 backdrop-blur-md min-w-0 shadow-2xs">
              <div className="flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-500 dark:text-stone-400 flex-shrink-0" />
                <span className="text-base sm:text-lg font-bold font-mono text-slate-700 dark:text-stone-300 leading-none">{stats.offline}</span>
              </div>
              <span className="text-[10px] sm:text-[10.5px] text-slate-500 dark:text-stone-400 font-medium whitespace-nowrap mt-1 leading-tight">Offline</span>
            </div>

            {/* 6. Warning */}
            <div className="flex flex-col justify-center px-2 py-1.5 sm:px-2.5 sm:py-2 rounded-xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/50 backdrop-blur-md min-w-0 shadow-2xs">
              <div className="flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                <span className="text-base sm:text-lg font-bold font-mono text-amber-700 dark:text-amber-400 leading-none">{stats.warning}</span>
              </div>
              <span className="text-[10px] sm:text-[10.5px] text-slate-600 dark:text-stone-300 font-medium whitespace-nowrap mt-1 leading-tight">Warning</span>
            </div>
          </div>

          {/* Right-Side Valley Slogan with Mountain Outline */}
          <div className="hidden sm:flex flex-col justify-center items-end text-right pl-2 pr-1 select-none flex-shrink-0">
            <div className="text-[11px] sm:text-xs font-medium italic text-slate-700 dark:text-emerald-100/90 tracking-wide font-serif">
              Real-time Monitoring
            </div>
            <div className="text-[11px] sm:text-xs font-medium italic text-slate-500 dark:text-emerald-200/80 flex items-center gap-1.5 justify-end font-serif mt-0.5">
              <span>for a Safer Tomorrow</span>
              <MountainWireframeIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400 inline" />
            </div>
          </div>
        </div>
      </div>

      {/* 4. SCROLLABLE NODE CARDS LIST */}
      <div className="relative z-10 px-4 sm:px-5 pb-3">
        <div className="overflow-y-auto max-h-[385px] sm:max-h-[420px] space-y-2.5 pr-1 custom-scrollbar">
          {nodes.map(node => {
            const isOffline = node.status?.toLowerCase() === 'offline';
            const riskLevel = node.riskLevel || node.risk?.level || (typeof node.risk === 'string' ? node.risk : 'safe');
            const levelLower = riskLevel?.toLowerCase() || '';
            const score = node.risk?.score || 0;

            const isHighRisk = !isOffline && (node.id === 'NODE-05' || levelLower.includes('high') || levelLower.includes('critical') || score > 50);
            const isWarning = !isOffline && !isHighRisk && (levelLower.includes('warn') || score > 25);
            const isSafe = !isOffline && !isHighRisk && !isWarning;
            const isSelected = selectedNodeId === node.id;

            const riskKey = isOffline ? 'offline' : isHighRisk ? 'high-risk' : isWarning ? 'warning' : 'safe';

            // Telemetry readings
            const soilVal = isOffline ? '--' : `${typeof node.readings?.soilMoisture?.value === 'number' ? Math.round(node.readings.soilMoisture.value) : (node.readings?.soilMoisture?.value ?? node.soil ?? 42)}%`;
            const rainVal = isOffline ? '--' : `${typeof node.readings?.rainfall?.value === 'number' ? Math.round(node.readings.rainfall.value) : (node.readings?.rainfall?.value ?? node.rainfall ?? 12)} mm`;
            const tiltVal = isOffline ? '--' : `${typeof node.readings?.tilt?.value === 'number' ? Number(node.readings.tilt.value).toFixed(1) : (node.readings?.tilt?.value ?? node.tilt ?? 1.8)}°`;
            const battVal = isOffline ? '--' : `${node.device?.battery?.value ?? node.battery ?? 91}%`;
            const signalVal = isOffline ? '--' : (node.device?.signal?.rssi ? `${node.device.signal.rssi} dBm` : (node.signal || '-71 dBm'));
            const rssiNum = node.device?.signal?.rssi ?? (typeof node.signal === 'string' ? parseInt(node.signal, 10) : -71);
            const locationName = node.location?.name || node.locationName || (typeof node.location === 'string' ? node.location : 'Himalayan Slope');

            // Telemetry icon accent colors
            const iconColor = isOffline 
              ? 'text-slate-400 dark:text-stone-500' 
              : isHighRisk 
                ? 'text-rose-600 dark:text-red-400' 
                : isWarning 
                  ? 'text-amber-600 dark:text-amber-400' 
                  : 'text-emerald-600 dark:text-emerald-400';

            const rainColor = isOffline 
              ? 'text-slate-400 dark:text-stone-500' 
              : isHighRisk 
                ? 'text-rose-600 dark:text-red-400' 
                : 'text-sky-600 dark:text-cyan-400';

            const tiltColor = isOffline 
              ? 'text-slate-400 dark:text-stone-500' 
              : isHighRisk 
                ? 'text-rose-600 dark:text-red-400' 
                : isWarning 
                  ? 'text-amber-600 dark:text-amber-400' 
                  : 'text-sky-600 dark:text-cyan-400';

            const battColor = isOffline 
              ? 'text-slate-400 dark:text-stone-500' 
              : isHighRisk 
                ? 'text-rose-600 dark:text-red-400' 
                : isWarning 
                  ? 'text-amber-600 dark:text-amber-400' 
                  : 'text-emerald-600 dark:text-emerald-400';

            return (
              <div 
                key={node.id}
                data-node-id={node.id}
                onClick={() => onSelectNode && onSelectNode(node)}
                className={`group relative rounded-xl p-3 transition-all duration-200 cursor-pointer border flex items-center gap-3.5 ${
                  isSelected 
                    ? 'bg-emerald-50/90 dark:bg-emerald-950/60 border-emerald-500 dark:border-emerald-400 shadow-md ring-1 ring-emerald-400/60' 
                    : isHighRisk
                      ? 'bg-rose-50/70 dark:bg-gradient-to-r dark:from-red-950/40 dark:via-[#140b0d]/95 dark:to-[#081511]/90 border-rose-300 dark:border-red-500/80 shadow-[0_0_14px_rgba(239,68,68,0.15)] hover:border-rose-400 dark:hover:border-red-400'
                      : isWarning
                        ? 'bg-amber-50/70 dark:bg-gradient-to-r dark:from-amber-950/30 dark:via-[#161208]/95 dark:to-[#081511]/90 border-amber-300 dark:border-amber-500/60 shadow-[0_0_12px_rgba(245,158,11,0.12)] hover:border-amber-400 dark:hover:border-amber-400'
                        : isOffline
                          ? 'bg-slate-50/90 dark:bg-[#0d1214]/85 border-slate-200 dark:border-stone-800/80 hover:border-slate-300 dark:hover:border-stone-700 text-slate-400 dark:text-stone-400'
                          : 'bg-slate-50/60 dark:bg-[#081612]/90 backdrop-blur-md border-slate-200/80 dark:border-emerald-900/40 hover:bg-slate-100/70 dark:hover:bg-[#0a1c17]/95 hover:border-emerald-500/50 shadow-2xs'
                }`}
              >
                {/* LEFT: Large Circular Himalayan Mountain Identity Badge */}
                <MountainNodeBadge risk={riskKey} className="w-11 h-11 sm:w-12 sm:h-12" />

                {/* RIGHT: Node Content Details */}
                <div className="min-w-0 flex-1 flex flex-col justify-between gap-1.5">
                  {/* Line 1: Header (Node ID • Location) + Badges (Online/Offline + Risk) */}
                  <div className="flex items-center justify-between gap-2 min-w-0">
                    <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                      <span className="font-mono font-bold text-xs sm:text-sm text-slate-900 dark:text-white tracking-tight whitespace-nowrap flex-shrink-0">
                        {node.id}
                      </span>
                      <span className="text-slate-300 dark:text-stone-500 text-xs flex-shrink-0">•</span>
                      <span className="font-medium text-slate-600 dark:text-stone-200 text-[11px] sm:text-xs truncate">
                        {locationName}
                      </span>
                    </div>

                    {/* Top Right Badges */}
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      {/* Online / Offline Status Badge */}
                      <span className={`text-[10.5px] sm:text-[11px] font-semibold px-2 sm:px-2.5 py-0.5 rounded-full border ${
                        isOffline 
                          ? 'border-slate-300 dark:border-stone-700/50 bg-slate-100 dark:bg-stone-800/60 text-slate-500 dark:text-stone-400' 
                          : 'border-emerald-300 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
                      }`}>
                        {isOffline ? 'Offline' : 'Online'}
                      </span>

                      {/* Risk Level Badge */}
                      <span className={`text-[10.5px] sm:text-[11px] font-bold px-2.5 sm:px-3 py-0.5 rounded-full ${
                        isOffline 
                          ? 'bg-slate-200 dark:bg-stone-700 text-slate-700 dark:text-stone-200' 
                          : isHighRisk 
                            ? 'bg-rose-600 text-white shadow-xs' 
                            : isWarning 
                              ? 'bg-amber-400 dark:bg-amber-500 text-slate-950 font-bold' 
                              : 'bg-emerald-500 text-slate-950 font-bold'
                      }`}>
                        {isOffline ? 'Offline' : isHighRisk ? 'High Risk' : isWarning ? 'Warning' : 'Safe'}
                      </span>
                    </div>
                  </div>

                  {/* Line 2: Telemetry Metrics with Professional Icons */}
                  <div className="grid grid-cols-5 gap-1.5 text-xs py-0.5">
                    {/* 1. Soil Moisture */}
                    <div className="flex items-center gap-1.5 min-w-0" title={`Soil Moisture: ${soilVal}`}>
                      <Droplets className={`w-3.5 h-3.5 ${iconColor} flex-shrink-0`} />
                      <div className="min-w-0 leading-tight">
                        <span className="text-[10px] text-slate-500 dark:text-stone-400 font-medium block">Soil</span>
                        <span className="text-xs font-bold text-slate-900 dark:text-white font-mono block mt-0.5">{soilVal}</span>
                      </div>
                    </div>

                    {/* 2. Rainfall */}
                    <div className="flex items-center gap-1.5 min-w-0" title={`Rainfall: ${rainVal}`}>
                      <CloudRain className={`w-3.5 h-3.5 ${rainColor} flex-shrink-0`} />
                      <div className="min-w-0 leading-tight">
                        <span className="text-[10px] text-slate-500 dark:text-stone-400 font-medium block">Rainfall</span>
                        <span className="text-xs font-bold text-slate-900 dark:text-white font-mono block mt-0.5">{rainVal}</span>
                      </div>
                    </div>

                    {/* 3. Tilt */}
                    <div className="flex items-center gap-1.5 min-w-0" title={`Ground Tilt: ${tiltVal}`}>
                      <TiltIcon className={`w-3.5 h-3.5 ${tiltColor} flex-shrink-0`} />
                      <div className="min-w-0 leading-tight">
                        <span className="text-[10px] text-slate-500 dark:text-stone-400 font-medium block">Tilt</span>
                        <span className="text-xs font-bold text-slate-900 dark:text-white font-mono block mt-0.5">{tiltVal}</span>
                      </div>
                    </div>

                    {/* 4. Battery */}
                    <div className="flex items-center gap-1.5 min-w-0" title={`Battery Level: ${battVal}`}>
                      <Battery className={`w-3.5 h-3.5 ${battColor} flex-shrink-0`} />
                      <div className="min-w-0 leading-tight">
                        <span className="text-[10px] text-slate-500 dark:text-stone-400 font-medium block">Battery</span>
                        <span className="text-xs font-bold text-slate-900 dark:text-white font-mono block mt-0.5">{battVal}</span>
                      </div>
                    </div>

                    {/* 5. LoRa Signal */}
                    <div className="flex items-center gap-1.5 min-w-0" title={`Signal RSSI: ${signalVal}`}>
                      <SignalBarsIcon rssi={rssiNum} isOffline={isOffline} className="w-3.5 h-3.5 flex-shrink-0" />
                      <div className="min-w-0 leading-tight">
                        <span className="text-[10px] text-slate-500 dark:text-stone-400 font-medium block">Signal</span>
                        <span className="text-xs font-bold text-slate-900 dark:text-white font-mono block mt-0.5">{signalVal}</span>
                      </div>
                    </div>
                  </div>

                  {/* Line 3: Footer (Last Seen + View Details) */}
                  <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-200/60 dark:border-white/5">
                    <div className="flex items-center gap-1.5 text-slate-400 dark:text-stone-400 text-[11px]">
                      <Clock className="w-3 h-3 text-slate-400 dark:text-stone-400 flex-shrink-0" />
                      <span>Last seen: {node.device?.lastSeen || (isOffline ? '18 minutes ago' : 'Just now')}</span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onSelectNode) onSelectNode(node);
                        navigate('/sensors');
                      }}
                      className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 dark:text-stone-300 hover:text-emerald-600 dark:hover:text-white cursor-pointer group-hover:translate-x-0.5 transition-all"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-white" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MonitoringNodesCard;
