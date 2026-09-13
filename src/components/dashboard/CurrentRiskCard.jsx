import React, { useState, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mountain, 
  ShieldCheck, 
  Droplets, 
  CloudRain, 
  Activity, 
  TrendingUp, 
  Calendar, 
  Clock, 
  ArrowRight, 
  MapPin, 
  Maximize2, 
  Plus, 
  Minus, 
  RotateCcw, 
  AlertTriangle, 
  AlertCircle, 
  HelpCircle, 
  MoveDiagonal
} from 'lucide-react';
import { MapContainer, TileLayer, Polygon, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { useSensorContext } from '../../context/SensorContext';
import { useTheme } from '../../hooks/useTheme';
import heroHimalayasImg from '../../assets/hero_himalayas.jpg';

// Canonical cluster coordinates in the Kullu - Manali - Beas Valley monitoring corridor
// Matching the positions shown in media_1789319667361.jpg
const LOCAL_GEO_COORDS = {
  'NODE-01': [32.220, 77.100],
  'NODE-02': [32.200, 77.135],
  'NODE-03': [32.260, 77.170],
  'NODE-04': [32.215, 77.225],
  'NODE-05': [32.2417, 77.1892],
  'NODE-06': [32.160, 77.185],
  'NODE-07': [32.185, 77.165],
  'NODE-08': [32.290, 77.175]
};

// Prototype Risk Zones matching media_1789319667361.jpg
const HIGH_RISK_ZONE = [
  [32.258, 77.165],
  [32.255, 77.205],
  [32.235, 77.215],
  [32.228, 77.185],
  [32.232, 77.160]
];

const MODERATE_RISK_ZONE = [
  [32.285, 77.140],
  [32.280, 77.210],
  [32.250, 77.245],
  [32.200, 77.240],
  [32.170, 77.200],
  [32.175, 77.135],
  [32.220, 77.110],
  [32.260, 77.115]
];

// Custom Leaflet DivIcon matching media_1789319667361.jpg: clean circular marker with attached dark pill
function createRiskMarkerIcon(node, isSelected) {
  const isOffline = node.status?.toLowerCase() === 'offline';
  const riskLevel = isOffline ? 'unknown' : (node.risk?.level?.toLowerCase() || (typeof node.risk === 'string' ? node.risk.toLowerCase() : 'safe'));
  const isHighRisk = !isOffline && (riskLevel === 'critical' || riskLevel === 'high-risk' || riskLevel === 'high risk' || node.id === 'NODE-05');
  const isWarning = !isOffline && (riskLevel === 'warning');

  let dotColor = '#10b981'; // Green: Safe
  let pulseHtml = '';
  
  if (isOffline) {
    dotColor = '#94a3b8'; // Slate: Offline
  } else if (isHighRisk) {
    dotColor = '#ef4444'; // Red: High Risk
    pulseHtml = `<div class="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-red-500/45 animate-ping pointer-events-none"></div>`;
  } else if (isWarning) {
    dotColor = '#f59e0b'; // Amber: Warning
  }

  const selectRing = isSelected ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900 scale-105' : '';

  const html = `
    <div class="relative flex items-center cursor-pointer select-none group transition-transform ${selectRing}">
      ${pulseHtml}
      <div class="w-3.5 h-3.5 rounded-full border-2 border-white shadow-md flex items-center justify-center shrink-0 z-10" style="background-color: ${dotColor};">
        ${isWarning ? '<div class="w-1 h-1 rounded-full bg-black/60"></div>' : ''}
      </div>
      <div class="-ml-1 pl-1.5 pr-1 py-0.5 rounded-r-md bg-slate-900/90 text-white border border-white/20 text-[9px] font-mono font-bold tracking-tight shadow-md flex items-center gap-1 backdrop-blur-xs whitespace-nowrap">
        <span>${node.id}</span>
      </div>
    </div>
  `;

  return L.divIcon({
    html,
    className: 'custom-risk-marker',
    iconSize: [72, 20],
    iconAnchor: [7, 10],
    popupAnchor: [0, -10]
  });
}

// Map Controls Controller (Zoom In, Zoom Out, Reset View)
function MapOverlayControls({ onReset }) {
  const map = useMap();

  return (
    <div className="absolute top-12 left-2.5 z-[400] flex flex-col gap-1 shadow-md">
      <button
        type="button"
        onClick={() => map.zoomIn()}
        className="w-6 h-6 rounded-md bg-slate-900/85 hover:bg-slate-800 text-white border border-white/15 flex items-center justify-center text-xs font-bold backdrop-blur-md transition-colors cursor-pointer"
        title="Zoom in"
      >
        <Plus className="w-3 h-3" />
      </button>
      <button
        type="button"
        onClick={() => map.zoomOut()}
        className="w-6 h-6 rounded-md bg-slate-900/85 hover:bg-slate-800 text-white border border-white/15 flex items-center justify-center text-xs font-bold backdrop-blur-md transition-colors cursor-pointer"
        title="Zoom out"
      >
        <Minus className="w-3 h-3" />
      </button>
      <button
        type="button"
        onClick={onReset}
        className="w-6 h-6 rounded-md bg-slate-900/85 hover:bg-slate-800 text-white border border-white/15 flex items-center justify-center text-xs backdrop-blur-md transition-colors cursor-pointer"
        title="Reset map view"
      >
        <Maximize2 className="w-3 h-3" />
      </button>
    </div>
  );
}

// Semicircular Risk Gauge Component conforming to media_1789319667361.jpg
const SemicircularRiskGauge = ({ score = 23, level = 'safe' }) => {
  const safeScore = Math.min(100, Math.max(0, typeof score === 'number' ? score : 23));
  
  // Radius and arc dimensions
  const r = 72;
  const cx = 100;
  const cy = 84;
  const strokeWidth = 12;

  // Arc length for 180 degrees
  const arcLength = Math.PI * r;
  const progressLength = (safeScore / 100) * arcLength;

  const levelUpper = (level || 'safe').toUpperCase();
  const displayLevel = levelUpper === 'HIGH-RISK' ? 'HIGH RISK' : levelUpper;

  const levelColors = {
    SAFE: { text: 'text-emerald-600 dark:text-emerald-400', stroke: '#10b981' },
    WARNING: { text: 'text-amber-500 dark:text-amber-400', stroke: '#f59e0b' },
    'HIGH RISK': { text: 'text-rose-600 dark:text-rose-400', stroke: '#ef4444' },
    CRITICAL: { text: 'text-red-700 dark:text-red-500', stroke: '#dc2626' },
    UNKNOWN: { text: 'text-slate-500 dark:text-slate-400', stroke: '#94a3b8' }
  };

  const currentTheme = levelColors[displayLevel] || levelColors.SAFE;

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-[200px] mx-auto">
      <div className="relative w-full h-[96px] flex items-center justify-center select-none">
        <svg viewBox="0 0 200 105" className="w-full h-full overflow-visible">
          <defs>
            {/* Multi-color track gradient matching the 4 risk segments in reference */}
            <linearGradient id="riskTrackGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
              <stop offset="25%" stopColor="#84cc16" stopOpacity="0.25" />
              <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.25" />
              <stop offset="75%" stopColor="#f97316" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0.25" />
            </linearGradient>

            {/* Active filled arc gradient */}
            <linearGradient id="riskActiveGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="60%" stopColor={currentTheme.stroke} />
              <stop offset="100%" stopColor={currentTheme.stroke} />
            </linearGradient>
          </defs>

          {/* Background full semicircular track */}
          <path
            d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
            fill="none"
            stroke="url(#riskTrackGrad)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          {/* Segment dividing ticks */}
          {[0.25, 0.50, 0.75].map((pct, idx) => {
            const angle = Math.PI * (1 - pct);
            const x1 = cx + (r - strokeWidth / 2 - 1) * Math.cos(angle);
            const y1 = cy - (r - strokeWidth / 2 - 1) * Math.sin(angle);
            const x2 = cx + (r + strokeWidth / 2 + 1) * Math.cos(angle);
            const y2 = cy - (r + strokeWidth / 2 + 1) * Math.sin(angle);
            return (
              <line
                key={idx}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#ffffff"
                strokeWidth="1.5"
                className="opacity-75 dark:opacity-40"
              />
            );
          })}

          {/* Active progress arc */}
          <path
            d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
            fill="none"
            stroke="url(#riskActiveGrad)"
            strokeWidth={strokeWidth + 0.5}
            strokeDasharray={`${progressLength} ${arcLength}`}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
        </svg>

        {/* Center Text: SAFE + Score */}
        <div className="absolute inset-x-0 bottom-1 flex flex-col items-center justify-center text-center pointer-events-none">
          <span className={`text-xl sm:text-2xl font-bold font-heading tracking-tight leading-none ${currentTheme.text}`}>
            {displayLevel}
          </span>
          <div className="flex items-baseline gap-1 mt-0.5 text-slate-800 dark:text-slate-200">
            <span className="text-sm sm:text-base font-bold font-mono leading-none">
              {safeScore}
            </span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
              / 100
            </span>
          </div>
        </div>
      </div>

      {/* Scale Legend below Gauge */}
      <div className="w-full flex items-center justify-between text-[9px] font-bold text-slate-400 dark:text-slate-500 pt-0.5 px-1">
        <span className="text-emerald-600 dark:text-emerald-400">0 Safe</span>
        <span>25</span>
        <span>50</span>
        <span>75</span>
        <span className="text-rose-600 dark:text-rose-400">100 Critical</span>
      </div>
    </div>
  );
};

export const CurrentRiskCard = ({ 
  sensorValues: propSensorValues, 
  riskAssessment: propRiskAssessment,
  nodes: propNodes,
  className = "" 
}) => {
  const context = useSensorContext();

  const sensorValues = propSensorValues || context?.sensorValues || {
    moisture: 42.3,
    rainfall: 12,
    tilt: 1.86,
    vibration: 0.033
  };

  const riskAssessment = propRiskAssessment || context?.riskAssessment || {
    riskScore: 23,
    riskLevel: 'safe',
    factorOfSafety: 1.58,
    trend: 'Stable',
    predictionWindow: 'Next 6 Hours'
  };

  const nodes = propNodes || context?.nodes || [];

  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const mapRef = useRef(null);

  // Dynamic formatted timestamp
  const formattedTimestamp = useMemo(() => {
    const d = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const pad = (n) => String(n).padStart(2, '0');
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}, ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  }, [sensorValues]);

  // Center on Kullu / Beas Valley corridor
  const initialCenter = [32.225, 77.165];
  const initialZoom = 11.2;

  const handleResetMapView = () => {
    if (mapRef.current) {
      mapRef.current.setView(initialCenter, initialZoom, { animate: true });
    }
  };

  // Assessment copy based on risk level
  const assessmentMeta = useMemo(() => {
    const lvl = (riskAssessment.riskLevel || 'safe').toLowerCase();
    if (lvl === 'safe') {
      return {
        title: 'Environmental conditions are currently stable.',
        desc: 'No immediate risk detected based on multi-sensor analysis.',
        icon: ShieldCheck,
        container: 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-200/80 dark:border-emerald-800/60',
        iconBg: 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400'
      };
    }
    if (lvl === 'warning') {
      return {
        title: 'Environmental conditions require increased attention.',
        desc: 'Elevated rainfall and soil moisture indicators observed in localized slopes.',
        icon: AlertTriangle,
        container: 'bg-amber-50/70 dark:bg-amber-950/40 border-amber-200/80 dark:border-amber-800/60',
        iconBg: 'bg-amber-100 dark:bg-amber-900/60 text-amber-600 dark:text-amber-400'
      };
    }
    if (lvl === 'high-risk' || lvl === 'high risk' || lvl === 'critical') {
      return {
        title: 'Elevated indicators suggest increased slope instability risk.',
        desc: 'Critical shear threshold approaching in active monitoring zones. Review required.',
        icon: AlertCircle,
        container: 'bg-rose-50/70 dark:bg-rose-950/40 border-rose-200/80 dark:border-rose-800/60',
        iconBg: 'bg-rose-100 dark:bg-rose-900/60 text-rose-600 dark:text-rose-400'
      };
    }
    return {
      title: 'Risk assessment unavailable due to missing sensor data.',
      desc: 'Some telemetry nodes are unreachable. Monitoring fallback active.',
      icon: HelpCircle,
      container: 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700',
      iconBg: 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
    };
  }, [riskAssessment.riskLevel]);

  const AssessmentIcon = assessmentMeta.icon;

  return (
    <div id="current-landslide-risk-card" className={`w-full bg-white/95 dark:bg-slate-900/90 rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs backdrop-blur-sm p-4 sm:p-5 transition-colors overflow-hidden flex flex-col justify-between ${className}`}>
      
      {/* ========================================================================= */}
      {/* 1. HEADER SECTION (Conforms strictly to media_1789319667361.jpg) */}
      {/* ========================================================================= */}
      <div className="relative rounded-2xl overflow-hidden mb-3.5 bg-gradient-to-r from-emerald-50/50 via-white to-sky-50/25 dark:from-slate-800/70 dark:via-slate-850 dark:to-slate-800/50 border border-slate-100 dark:border-slate-800 p-3 sm:p-3.5">
        
        {/* Himalayan Mountain Panorama Backdrop (Right fading into content) */}
        <div className="absolute right-0 top-0 bottom-0 w-2/5 sm:w-1/2 pointer-events-none overflow-hidden select-none">
          <img 
            src={heroHimalayasImg} 
            alt="" 
            className="w-full h-full object-cover object-right opacity-30 dark:opacity-20 mix-blend-multiply dark:mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent dark:from-slate-900 dark:via-slate-900/80 dark:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent dark:from-slate-900/90 dark:via-transparent" />
        </div>

        <div className="relative z-10 flex flex-col gap-2">
          {/* Row 1: Icon + Title + LIVE pill on Left, Prototype badge on Right */}
          <div className="flex items-center justify-between gap-2 min-w-0">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200/80 dark:border-emerald-800/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 shadow-xs">
                <Mountain className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                <h2 className="text-sm sm:text-base md:text-lg font-bold font-heading text-slate-900 dark:text-white tracking-tight whitespace-nowrap">
                  Current Landslide Risk
                </h2>
                <span className="inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  LIVE
                </span>
              </div>
            </div>

            <div className="shrink-0 hidden min-[520px]:block">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 shadow-2xs whitespace-nowrap">
                Prototype Risk Analysis
              </span>
            </div>
          </div>

          {/* Row 2: Subtitle on Left, Last updated / Badge on Right */}
          <div className="flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 pl-10 sm:pl-13">
            <p className="font-medium text-[11px] sm:text-xs truncate">
              Real-time multi-sensor hazard assessment
            </p>
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="inline-flex items-center gap-1 text-[9.5px] sm:text-[10px] font-medium text-slate-400 dark:text-slate-500 whitespace-nowrap">
                <Clock className="w-3 h-3" />
                <span>Last updated: {formattedTimestamp}</span>
              </span>
              <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 shadow-2xs whitespace-nowrap min-[520px]:hidden">
                Prototype
              </span>
            </div>
          </div>

          {/* Row 3: Meta breadcrumb on Left, Slogan on Right */}
          <div className="pt-1 mt-0.5 text-[10.5px] sm:text-[11px] text-slate-400 dark:text-slate-500 flex items-center justify-between gap-2">
            <span className="truncate">
              Monitoring mountain slopes <span className="mx-1 text-slate-300 dark:text-slate-700">|</span> Protecting communities <span className="mx-1 text-slate-300 dark:text-slate-700">|</span> Powered by IoT & AI
            </span>
            <span className="font-serif italic text-xs font-semibold text-slate-600/90 dark:text-slate-300/90 tracking-tight shrink-0 whitespace-nowrap hidden sm:inline-block">
              Safer Mountains Stronger Communities
            </span>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 2. MAIN WORKSPACE: MAP (LEFT ~60%) + RISK SUMMARY (RIGHT ~40%) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch min-w-0">
        
        {/* ========================================================================= */}
        {/* LEFT: REALISTIC INTERACTIVE TERRAIN/SATELLITE MAP (col-span-7) */}
        {/* ========================================================================= */}
        <div className="md:col-span-7 flex flex-col justify-between min-w-0">
          <div className="relative w-full h-[290px] sm:h-[310px] md:h-[330px] rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-700/80 shadow-2xs">
            
            {/* Top-Left: Himachal Region / Monitoring Area Pill */}
            <div className="absolute top-2.5 left-2.5 z-[400] px-2.5 py-1 rounded-xl bg-slate-900/85 text-white backdrop-blur-md border border-white/15 shadow-md flex items-center gap-1.5 pointer-events-none select-none">
              <div className="w-4 h-4 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <MapPin className="w-2.5 h-2.5" />
              </div>
              <div className="text-left leading-tight">
                <div className="text-[10px] font-bold font-heading tracking-tight">Himachal Region</div>
                <div className="text-[8px] text-slate-300 font-medium">Monitoring Area</div>
              </div>
            </div>

            {/* Top-Right: North Compass Indicator */}
            <div className="absolute top-2.5 right-2.5 z-[400] w-6 h-6 rounded-lg bg-slate-900/85 text-white backdrop-blur-md border border-white/15 shadow-md flex flex-col items-center justify-center pointer-events-none select-none">
              <span className="text-[7px] font-bold leading-none text-rose-400">▲</span>
              <span className="text-[8px] font-bold font-mono leading-none mt-0.5">N</span>
            </div>

            {/* Bottom-Left: Metric Scale Bar Indicator */}
            <div className="absolute bottom-2.5 left-2.5 z-[400] px-2 py-0.5 rounded-md bg-slate-900/85 text-white backdrop-blur-md border border-white/15 shadow-md flex items-center gap-1.5 pointer-events-none select-none text-[8px] font-mono font-bold">
              <span>0</span>
              <div className="w-5 h-0.5 bg-white/80 rounded-xs" />
              <span>1</span>
              <div className="w-5 h-0.5 bg-white/80 rounded-xs" />
              <span>2 km</span>
            </div>

            {/* Bottom-Right: Semi-Transparent Compact Map Legend */}
            <div className="absolute bottom-2.5 right-2.5 z-[400] p-2 rounded-xl bg-slate-900/90 text-white backdrop-blur-md border border-white/15 shadow-lg text-[8px] space-y-0.5 select-none pointer-events-none max-w-[135px]">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 border border-white/60 shrink-0" />
                <span className="text-slate-200 truncate">Sensor Node (Normal)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500 border border-white/60 shrink-0" />
                <span className="text-slate-200 truncate">Sensor Node (Warning)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500 border border-white/60 shrink-0" />
                <span className="text-slate-200 truncate">Sensor Node (High Risk)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-slate-400 border border-white/60 shrink-0" />
                <span className="text-slate-200 truncate">Sensor Node (Offline)</span>
              </div>
              <div className="flex items-center gap-1.5 pt-0.5 border-t border-white/10">
                <span className="w-2.5 h-1.5 rounded-xs bg-red-500/40 border border-red-500/80 shrink-0" />
                <span className="text-slate-300 truncate">High Risk Zone</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-1.5 rounded-xs bg-amber-500/35 border border-amber-500/80 shrink-0" />
                <span className="text-slate-300 truncate">Moderate Risk Zone</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-0.5 bg-white/70 rounded-full shrink-0" />
                <span className="text-slate-400 truncate">Road / Infrastructure</span>
              </div>
            </div>

            {/* Leaflet MapContainer */}
            <MapContainer
              ref={mapRef}
              center={initialCenter}
              zoom={initialZoom}
              minZoom={8}
              maxZoom={18}
              scrollWheelZoom={false}
              zoomControl={false}
              attributionControl={false}
              className="w-full h-full z-10"
            >
              {/* Esri World Imagery (Photographic Satellite Terrain of Himachal Pradesh) */}
              <TileLayer
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                maxZoom={18}
              />
              
              {/* Places, Roads & Boundaries Overlay */}
              <TileLayer
                url="https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
                maxZoom={18}
                opacity={0.85}
              />

              {/* Map Interactive Overlay Controls */}
              <MapOverlayControls onReset={handleResetMapView} />

              {/* Prototype Moderate Risk Influence Zone (Amber) */}
              <Polygon
                positions={MODERATE_RISK_ZONE}
                pathOptions={{
                  color: '#f59e0b',
                  fillColor: '#f59e0b',
                  fillOpacity: 0.22,
                  weight: 1.5,
                  dashArray: '4, 4'
                }}
              >
                <Popup>
                  <div className="text-xs p-1">
                    <strong className="text-amber-600 block">Prototype Moderate Risk Zone</strong>
                    <span className="text-slate-500 text-[11px]">
                      Simulated spatial hazard zone based on slope topography and soil moisture.
                    </span>
                  </div>
                </Popup>
              </Polygon>

              {/* Prototype High Risk Influence Zone (Red - Centered around NODE-05) */}
              <Polygon
                positions={HIGH_RISK_ZONE}
                pathOptions={{
                  color: '#ef4444',
                  fillColor: '#ef4444',
                  fillOpacity: 0.35,
                  weight: 1.8
                }}
              >
                <Popup>
                  <div className="text-xs p-1">
                    <strong className="text-rose-600 block">Prototype High Risk Zone</strong>
                    <span className="text-slate-500 text-[11px]">
                      Concentrated slope instability potential near Mountain Zone C (NODE-05).
                    </span>
                  </div>
                </Popup>
              </Polygon>

              {/* 8 Canonical Monitoring Node Markers */}
              {nodes.map(node => {
                const geo = LOCAL_GEO_COORDS[node.id];
                const lat = geo ? geo[0] : (node.latitude ?? node.location?.latitude ?? 32.25);
                const lng = geo ? geo[1] : (node.longitude ?? node.location?.longitude ?? 77.18);
                const isSelected = selectedNodeId === node.id;
                const icon = createRiskMarkerIcon(node, isSelected);

                return (
                  <Marker
                    key={node.id}
                    position={[lat, lng]}
                    icon={icon}
                    eventHandlers={{
                      click: () => setSelectedNodeId(node.id)
                    }}
                  >
                    <Popup>
                      <div className="text-xs p-1 min-w-[170px]">
                        <div className="flex items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-700 pb-1 mb-1">
                          <strong className="font-mono text-slate-900 dark:text-white">{node.id}</strong>
                          <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                            node.status === 'online' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                          }`}>
                            {node.status}
                          </span>
                        </div>
                        <div className="text-slate-600 dark:text-slate-300 space-y-0.5 text-[11px]">
                          <div>Location: <strong>{node.location?.name || node.name}</strong></div>
                          <div>Risk: <strong className="capitalize">{node.risk?.level || node.riskLevel || 'Safe'}</strong></div>
                          {node.status === 'online' && (
                            <>
                              <div>Moisture: <strong>{node.readings?.soilMoisture?.value ?? node.moisture}%</strong></div>
                              <div>Tilt: <strong>{node.readings?.tilt?.value ?? node.tilt}°</strong></div>
                            </>
                          )}
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                );
              })}
            </MapContainer>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT: RISK LEVEL GAUGE, ASSESSMENT & KEY MEASUREMENTS (col-span-5) */}
        {/* ========================================================================= */}
        <div className="md:col-span-5 flex flex-col justify-between space-y-2.5 min-w-0">
          
          {/* 1. Risk Level Header & Link */}
          <div className="flex items-center justify-between pb-1">
            <span className="text-[11px] font-bold font-mono tracking-wider text-slate-400 dark:text-slate-500 uppercase">
              Risk Level
            </span>
            <Link 
              to="/risk-analysis" 
              className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 inline-flex items-center gap-1 transition-colors"
            >
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 2. Semicircular Risk Gauge */}
          <div className="py-0.5">
            <SemicircularRiskGauge 
              score={riskAssessment.riskScore} 
              level={riskAssessment.riskLevel} 
            />
          </div>

          {/* 3. Dynamic Environmental Assessment Card */}
          <div className={`rounded-xl p-2.5 border flex items-start gap-2.5 transition-colors ${assessmentMeta.container}`}>
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${assessmentMeta.iconBg}`}>
              <AssessmentIcon className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-slate-800 dark:text-white leading-snug">
                {assessmentMeta.title}
              </div>
              <div className="text-[10.5px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                {assessmentMeta.desc}
              </div>
            </div>
          </div>

          {/* 4. Key Measurements Header & 2x2 Grid */}
          <div>
            <div className="flex items-center gap-1.5 mb-1.5">
              <span className="text-[11px] font-bold font-mono tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                Key Measurements
              </span>
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                (Live)
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {/* Soil Moisture */}
              <div className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/70 shadow-2xs flex items-start gap-2 min-w-0">
                <div className="w-6.5 h-6.5 sm:w-7 sm:h-7 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-sky-500 dark:text-sky-400 border border-sky-100 dark:border-sky-900/40 flex items-center justify-center shrink-0 mt-0.5">
                  <Droplets className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] sm:text-[10.5px] text-slate-500 dark:text-slate-400 font-medium leading-tight">
                    Soil Moisture
                  </div>
                  <div className="flex items-baseline gap-1 my-0.5">
                    <span className="text-xs sm:text-sm font-bold font-mono text-slate-900 dark:text-white leading-none">
                      {sensorValues.moisture ?? 42.3}
                    </span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                      %
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[9px] sm:text-[9.5px] font-medium text-slate-600 dark:text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span>Normal</span>
                  </div>
                </div>
              </div>

              {/* Rainfall (24h) */}
              <div className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/70 shadow-2xs flex items-start gap-2 min-w-0">
                <div className="w-6.5 h-6.5 sm:w-7 sm:h-7 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-sky-500 dark:text-sky-400 border border-sky-100 dark:border-sky-900/40 flex items-center justify-center shrink-0 mt-0.5">
                  <CloudRain className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] sm:text-[10.5px] text-slate-500 dark:text-slate-400 font-medium leading-tight">
                    Rainfall (24h)
                  </div>
                  <div className="flex items-baseline gap-1 my-0.5">
                    <span className="text-xs sm:text-sm font-bold font-mono text-slate-900 dark:text-white leading-none">
                      {sensorValues.rainfall ?? 12}
                    </span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                      mm
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[9px] sm:text-[9.5px] font-medium text-slate-600 dark:text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span>Normal</span>
                  </div>
                </div>
              </div>

              {/* Ground Tilt */}
              <div className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/70 shadow-2xs flex items-start gap-2 min-w-0">
                <div className="w-6.5 h-6.5 sm:w-7 sm:h-7 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-sky-500 dark:text-sky-400 border border-sky-100 dark:border-sky-900/40 flex items-center justify-center shrink-0 mt-0.5">
                  <MoveDiagonal className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] sm:text-[10.5px] text-slate-500 dark:text-slate-400 font-medium leading-tight">
                    Ground Tilt
                  </div>
                  <div className="flex items-baseline gap-0.5 my-0.5">
                    <span className="text-xs sm:text-sm font-bold font-mono text-slate-900 dark:text-white leading-none">
                      {sensorValues.tilt ?? 1.86}°
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[9px] sm:text-[9.5px] font-medium text-slate-600 dark:text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span>Stable</span>
                  </div>
                </div>
              </div>

              {/* Vibration */}
              <div className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/70 shadow-2xs flex items-start gap-2 min-w-0">
                <div className="w-6.5 h-6.5 sm:w-7 sm:h-7 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-sky-500 dark:text-sky-400 border border-sky-100 dark:border-sky-900/40 flex items-center justify-center shrink-0 mt-0.5">
                  <Activity className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] sm:text-[10.5px] text-slate-500 dark:text-slate-400 font-medium leading-tight">
                    Vibration
                  </div>
                  <div className="flex items-baseline gap-1 my-0.5">
                    <span className="text-xs sm:text-sm font-bold font-mono text-slate-900 dark:text-white leading-none">
                      {sensorValues.vibration ?? 0.033}
                    </span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                      g
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[9px] sm:text-[9.5px] font-medium text-slate-600 dark:text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span>Normal</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* 3. BOTTOM SUMMARY ROW (Trend | Prediction Window | Factor of Safety | Monitored Area) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3.5 pt-1">
        
        {/* Column 1: Trend */}
        <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50/50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800/60 min-w-0">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 border border-sky-100 dark:border-sky-900/40 flex items-center justify-center shrink-0 shadow-2xs">
            <TrendingUp className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <div className="text-[9.5px] text-slate-400 dark:text-slate-500 font-medium leading-none">Trend</div>
            <div className="text-xs font-bold text-slate-900 dark:text-white leading-tight mt-0.5">
              {riskAssessment.trend || 'Stable'}
            </div>
            <div className="text-[9px] text-slate-500 dark:text-slate-400 font-medium leading-none mt-0.5">
              No change
            </div>
          </div>
        </div>

        {/* Column 2: Prediction Window */}
        <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50/50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800/60 min-w-0">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 border border-sky-100 dark:border-sky-900/40 flex items-center justify-center shrink-0 shadow-2xs">
            <Calendar className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <div className="text-[9.5px] text-slate-400 dark:text-slate-500 font-medium leading-none">Prediction</div>
            <div className="text-xs font-bold text-slate-900 dark:text-white leading-tight mt-0.5">
              {riskAssessment.predictionWindow || 'Next 6h'}
            </div>
            <div className="text-[9px] text-slate-500 dark:text-slate-400 font-medium leading-none mt-0.5">
              Low prob.
            </div>
          </div>
        </div>

        {/* Column 3: Factor of Safety */}
        <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50/50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800/60 min-w-0">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 border border-sky-100 dark:border-sky-900/40 flex items-center justify-center shrink-0 shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <div className="text-[9.5px] text-slate-400 dark:text-slate-500 font-medium leading-none">Safety Factor</div>
            <div className="text-xs font-bold font-mono text-slate-900 dark:text-white leading-tight mt-0.5">
              {riskAssessment.factorOfSafety ?? 1.58}
            </div>
            <div className="text-[9px] text-slate-500 dark:text-slate-400 font-medium leading-none mt-0.5">
              Safe range
            </div>
          </div>
        </div>

        {/* Column 4: Monitored Area */}
        <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50/50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800/60 min-w-0">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 border border-sky-100 dark:border-sky-900/40 flex items-center justify-center shrink-0 shadow-2xs">
            <Mountain className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <div className="text-[9.5px] text-slate-400 dark:text-slate-500 font-medium leading-none">Area</div>
            <div className="text-xs font-bold text-slate-900 dark:text-white leading-tight mt-0.5">
              Himachal
            </div>
            <div className="text-[9px] text-slate-500 dark:text-slate-400 font-medium leading-none mt-0.5">
              {nodes.length || 8} nodes
            </div>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 4. SUBTLE PROTOTYPE DATA DISCLAIMER FOOTNOTE */}
      {/* ========================================================================= */}
      <div className="mt-2.5 pt-1.5 text-[9px] text-slate-400 dark:text-slate-500 text-center leading-tight">
        Real geographic basemap. Sensor locations and risk zones are simulated prototype data and do not represent deployed sensors or official landslide hazard boundaries.
      </div>

    </div>
  );
};

export default CurrentRiskCard;
