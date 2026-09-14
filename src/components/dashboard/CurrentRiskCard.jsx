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
  Layers,
  AlertTriangle, 
  AlertCircle, 
  HelpCircle, 
  MoveDiagonal,
  ChevronDown
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip 
} from 'recharts';
import { MapContainer, TileLayer, Polygon, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { useSensorContext } from '../../context/SensorContext';
import heroHimalayasImg from '../../assets/hero_himalayas.jpg';
import { 
  RISK_SCORE_HISTORY_24H, 
  RISK_PREDICTION_SERIES_8H, 
  KEY_MEASUREMENTS_SPARKLINES_24H 
} from '../../data/mockHistoricalData';

// Canonical cluster coordinates in the Kullu - Manali - Beas Valley monitoring corridor
const LOCAL_GEO_COORDS = {
  'NODE-01': [32.220, 77.100], // Solang Valley / West
  'NODE-02': [32.200, 77.135], // Dhundi Slope
  'NODE-03': [32.260, 77.170], // Gulaba Ridge (Moderate Risk)
  'NODE-04': [32.215, 77.225], // Vashisht Cliffs
  'NODE-05': [32.2417, 77.1892], // Mountain Zone C / Rohtang Approach (High Risk)
  'NODE-06': [32.160, 77.185], // Aleo Basin (Offline)
  'NODE-07': [32.185, 77.165], // Beas Riverbank
  'NODE-08': [32.290, 77.175]  // Marhi Pass
};

// Altitudes and descriptive details for popups
const NODE_METADATA = {
  'NODE-01': { alt: '2,480m', loc: 'Solang Valley West' },
  'NODE-02': { alt: '2,850m', loc: 'Dhundi Incline' },
  'NODE-03': { alt: '3,100m', loc: 'Gulaba Ridge' },
  'NODE-04': { alt: '2,150m', loc: 'Vashisht Cliffs' },
  'NODE-05': { alt: '3,320m', loc: 'Mountain Zone C' },
  'NODE-06': { alt: '1,920m', loc: 'Aleo Basin' },
  'NODE-07': { alt: '1,890m', loc: 'Beas Riverbank' },
  'NODE-08': { alt: '3,450m', loc: 'Marhi Pass' }
};

// Prototype Risk Zones
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

// Custom Leaflet DivIcon: clean circular marker with drop shadow and attached dark pill
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
    pulseHtml = `<div class="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-red-500/50 animate-ping pointer-events-none"></div>`;
  } else if (isWarning) {
    dotColor = '#f59e0b'; // Amber: Warning
    pulseHtml = `<div class="absolute -top-0.5 -left-0.5 w-4 h-4 rounded-full bg-amber-500/35 animate-ping pointer-events-none"></div>`;
  }

  const selectRing = isSelected ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900 scale-105' : '';

  const html = `
    <div class="relative flex items-center cursor-pointer select-none group transition-transform ${selectRing}">
      ${pulseHtml}
      <div class="w-3.5 h-3.5 rounded-full border-2 border-white shadow-md flex items-center justify-center shrink-0 z-10" style="background-color: ${dotColor};">
        ${isWarning ? '<div class="w-1 h-1 rounded-full bg-black/50"></div>' : ''}
      </div>
      <div class="-ml-1 pl-1.5 pr-1.5 py-0.5 rounded-r-md bg-slate-900/90 text-white border border-white/20 text-[9px] font-mono font-bold tracking-tight shadow-md flex items-center gap-1 backdrop-blur-xs whitespace-nowrap">
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

// Map Controls Controller (Zoom In, Zoom Out, Reset View, Toggle Labels)
function MapOverlayControls({ onReset, onToggleLabels, showLabels }) {
  const map = useMap();

  return (
    <div className="absolute top-12 left-2.5 z-[400] flex flex-col gap-1 shadow-md">
      <button
        type="button"
        onClick={() => map.zoomIn()}
        className="w-7 h-7 rounded-md bg-slate-900/85 hover:bg-slate-800 text-white border border-white/15 flex items-center justify-center text-xs font-bold backdrop-blur-md transition-colors cursor-pointer"
        title="Zoom in"
        aria-label="Zoom in"
      >
        <Plus className="w-3.5 h-3.5" />
      </button>
      <button
        type="button"
        onClick={() => map.zoomOut()}
        className="w-7 h-7 rounded-md bg-slate-900/85 hover:bg-slate-800 text-white border border-white/15 flex items-center justify-center text-xs font-bold backdrop-blur-md transition-colors cursor-pointer"
        title="Zoom out"
        aria-label="Zoom out"
      >
        <Minus className="w-3.5 h-3.5" />
      </button>
      <button
        type="button"
        onClick={onReset}
        className="w-7 h-7 rounded-md bg-slate-900/85 hover:bg-slate-800 text-white border border-white/15 flex items-center justify-center text-xs backdrop-blur-md transition-colors cursor-pointer"
        title="Reset map view"
        aria-label="Reset map view"
      >
        <Maximize2 className="w-3.5 h-3.5" />
      </button>
      <button
        type="button"
        onClick={onToggleLabels}
        className={`w-7 h-7 rounded-md text-white border border-white/15 flex items-center justify-center text-xs backdrop-blur-md transition-colors cursor-pointer ${
          showLabels ? 'bg-emerald-600/90 hover:bg-emerald-500' : 'bg-slate-900/85 hover:bg-slate-800'
        }`}
        title="Toggle Map Labels"
        aria-label="Toggle Map Labels"
      >
        <Layers className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

// Semicircular Risk Gauge Component conforming to visual reference
const SemicircularRiskGauge = ({ score = 22, level = 'safe' }) => {
  const safeScore = Math.min(100, Math.max(0, typeof score === 'number' ? score : 22));
  
  // Dimensions
  const r = 76;
  const cx = 100;
  const cy = 88;
  const strokeWidth = 13;

  // Arc length for 180 degrees
  const arcLength = Math.PI * r;
  const progressLength = (safeScore / 100) * arcLength;

  const levelUpper = (level || 'safe').toUpperCase();
  const displayLevel = levelUpper === 'HIGH-RISK' ? 'HIGH RISK' : levelUpper;

  const levelColors = {
    SAFE: { text: 'text-emerald-500 dark:text-emerald-400', stroke: '#10b981', badge: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' },
    WARNING: { text: 'text-amber-500 dark:text-amber-400', stroke: '#f59e0b', badge: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20' },
    'HIGH RISK': { text: 'text-rose-500 dark:text-rose-400', stroke: '#ef4444', badge: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20' },
    CRITICAL: { text: 'text-red-600 dark:text-red-500', stroke: '#dc2626', badge: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20' },
    UNKNOWN: { text: 'text-slate-400 dark:text-slate-400', stroke: '#94a3b8', badge: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20' }
  };

  const currentTheme = levelColors[displayLevel] || levelColors.SAFE;

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-[220px] mx-auto select-none">
      <div className="relative w-full h-[105px] flex items-center justify-center">
        <svg viewBox="0 0 200 115" className="w-full h-full overflow-visible">
          <defs>
            {/* Calibrated 4-color track gradient */}
            <linearGradient id="riskTrackGradFull" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
              <stop offset="28%" stopColor="#84cc16" stopOpacity="0.25" />
              <stop offset="55%" stopColor="#f59e0b" stopOpacity="0.25" />
              <stop offset="80%" stopColor="#f97316" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0.25" />
            </linearGradient>

            {/* Active progress arc gradient */}
            <linearGradient id="riskActiveGradRef" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="70%" stopColor={currentTheme.stroke} />
              <stop offset="100%" stopColor={currentTheme.stroke} />
            </linearGradient>

            {/* Glow filter */}
            <filter id="gaugeGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor={currentTheme.stroke} floodOpacity="0.45" />
            </filter>
          </defs>

          {/* Background full semicircular track */}
          <path
            d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
            fill="none"
            stroke="url(#riskTrackGradFull)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          {/* Calibrated segment dividing ticks (at 25%, 50%, 75%) */}
          {[0.25, 0.50, 0.75].map((pct, idx) => {
            const angle = Math.PI * (1 - pct);
            const x1 = cx + (r - strokeWidth / 2 - 1.5) * Math.cos(angle);
            const y1 = cy - (r - strokeWidth / 2 - 1.5) * Math.sin(angle);
            const x2 = cx + (r + strokeWidth / 2 + 1.5) * Math.cos(angle);
            const y2 = cy - (r + strokeWidth / 2 + 1.5) * Math.sin(angle);
            return (
              <line
                key={idx}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#ffffff"
                strokeWidth="1.5"
                className="opacity-80 dark:opacity-50"
              />
            );
          })}

          {/* Active progress arc */}
          <path
            d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
            fill="none"
            stroke="url(#riskActiveGradRef)"
            strokeWidth={strokeWidth + 0.8}
            strokeDasharray={`${progressLength} ${arcLength}`}
            strokeLinecap="round"
            filter="url(#gaugeGlow)"
            className="transition-all duration-700 ease-out"
          />
        </svg>

        {/* Center Display: SAFE + 22 / 100 */}
        <div className="absolute inset-x-0 bottom-1 flex flex-col items-center justify-center text-center pointer-events-none">
          <span className={`text-xl sm:text-2xl font-black font-heading tracking-tight leading-none ${currentTheme.text}`}>
            {displayLevel}
          </span>
          <div className="flex items-baseline gap-1 mt-0.5 text-slate-800 dark:text-slate-100">
            <span className="text-sm sm:text-base font-bold font-mono leading-none">
              {safeScore}
            </span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold">
              / 100
            </span>
          </div>
        </div>
      </div>

      {/* Scale Legend below Gauge */}
      <div className="w-full flex items-center justify-between text-[8.5px] font-bold text-slate-400 dark:text-slate-500 pt-1 px-1">
        <span className="text-emerald-500 dark:text-emerald-400">0 Safe</span>
        <span>25</span>
        <span>50</span>
        <span>75</span>
        <span className="text-rose-500 dark:text-rose-400">100 Critical</span>
      </div>

      {/* Subtitle / Trend Badge below Gauge */}
      <div className="mt-1.5 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium border bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20">
        <span className="font-semibold">↓ -12%</span>
        <span className="text-slate-500 dark:text-slate-400">from last 24h</span>
        <span className="text-slate-300 dark:text-slate-600">•</span>
        <span className="text-slate-600 dark:text-slate-300 font-medium">Lower risk conditions</span>
      </div>
    </div>
  );
};

// Miniature Semicircular Dial for Safety Factor Card
const MiniSafetyFactorDial = ({ value = 1.59 }) => {
  const min = 1.0;
  const max = 2.0;
  const clamped = Math.min(max, Math.max(min, value));
  const pct = (clamped - min) / (max - min); // 0 to 1
  
  const r = 24;
  const cx = 32;
  const cy = 28;
  const arcLength = Math.PI * r;
  const progressLength = pct * arcLength;

  return (
    <div className="relative w-16 h-9 flex items-center justify-center shrink-0">
      <svg viewBox="0 0 64 36" className="w-full h-full overflow-visible">
        {/* Background track */}
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none"
          stroke="rgba(148, 163, 184, 0.25)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Safe threshold mark (> 1.30 = pct 0.3) */}
        <line
          x1={cx + (r - 3) * Math.cos(Math.PI * (1 - 0.3))}
          y1={cy - (r - 3) * Math.sin(Math.PI * (1 - 0.3))}
          x2={cx + (r + 3) * Math.cos(Math.PI * (1 - 0.3))}
          y2={cy - (r + 3) * Math.sin(Math.PI * (1 - 0.3))}
          stroke="#10b981"
          strokeWidth="1.5"
        />
        {/* Active arc */}
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none"
          stroke="#10b981"
          strokeWidth="4.5"
          strokeDasharray={`${progressLength} ${arcLength}`}
          strokeLinecap="round"
        />
      </svg>
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
    riskScore: 22,
    riskLevel: 'safe',
    factorOfSafety: 1.59,
    trend: 'Stable',
    predictionWindow: 'Next 6 Hours'
  };

  const nodes = propNodes || context?.nodes || [];

  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [showLabels, setShowLabels] = useState(true);
  const mapRef = useRef(null);

  // Formatted timestamp
  const formattedTimestamp = useMemo(() => {
    const d = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const pad = (n) => String(n).padStart(2, '0');
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}, ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  }, [sensorValues]);

  // Capitalized trend & formatted prediction window
  const displayTrend = useMemo(() => {
    const t = riskAssessment.trend || 'Stable';
    return t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
  }, [riskAssessment.trend]);

  const displayPredictionWindow = useMemo(() => {
    const p = riskAssessment.predictionWindow || 'Next 6 Hours';
    if (p === '6h' || p === 'Next 6h') return 'Next 6 Hours';
    if (p === '8h' || p === 'Next 8h') return 'Next 8 Hours';
    return p;
  }, [riskAssessment.predictionWindow]);

  // Center on Kullu / Beas Valley corridor (Manali Gorge)
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
        container: 'bg-emerald-500/10 border-emerald-500/25 dark:bg-emerald-950/40 dark:border-emerald-800/60',
        iconBg: 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400'
      };
    }
    if (lvl === 'warning') {
      return {
        title: 'Environmental conditions require increased attention.',
        desc: 'Elevated rainfall and soil moisture indicators observed in localized slopes.',
        icon: AlertTriangle,
        container: 'bg-amber-500/10 border-amber-500/25 dark:bg-amber-950/40 dark:border-amber-800/60',
        iconBg: 'bg-amber-100 dark:bg-amber-900/60 text-amber-600 dark:text-amber-400'
      };
    }
    if (lvl === 'high-risk' || lvl === 'high risk' || lvl === 'critical') {
      return {
        title: 'Elevated indicators suggest increased slope instability risk.',
        desc: 'Critical shear threshold approaching in active monitoring zones. Review required.',
        icon: AlertCircle,
        container: 'bg-rose-500/10 border-rose-500/25 dark:bg-rose-950/40 dark:border-rose-800/60',
        iconBg: 'bg-rose-100 dark:bg-rose-900/60 text-rose-600 dark:text-rose-400'
      };
    }
    return {
      title: 'Risk assessment unavailable due to missing sensor data.',
      desc: 'Some telemetry nodes are unreachable. Monitoring fallback active.',
      icon: HelpCircle,
      container: 'bg-slate-500/10 border-slate-500/20 dark:bg-slate-800/40 dark:border-slate-700',
      iconBg: 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
    };
  }, [riskAssessment.riskLevel]);

  const AssessmentIcon = assessmentMeta.icon;

  return (
    <div 
      id="current-landslide-risk-card" 
      className={`w-full bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm p-4 sm:p-5 md:p-6 transition-colors overflow-hidden flex flex-col justify-between ${className}`}
    >
      
      {/* ========================================================================= */}
      {/* 1. HEADER SECTION (Conforms strictly to reference visual) */}
      {/* ========================================================================= */}
      <div className="relative rounded-2xl overflow-hidden mb-4 bg-gradient-to-r from-emerald-50/60 via-slate-50/40 to-sky-50/30 dark:from-slate-800/80 dark:via-slate-850 dark:to-slate-800/60 border border-slate-100 dark:border-slate-800 p-3.5 sm:p-4">
        
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
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-emerald-100/80 dark:bg-emerald-950/70 border border-emerald-200/80 dark:border-emerald-800/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 shadow-xs">
                <Mountain className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.2]" />
              </div>

              <div className="flex items-center gap-2 min-w-0">
                <h2 className="text-base sm:text-lg md:text-xl font-bold font-heading text-slate-900 dark:text-white tracking-tight whitespace-nowrap">
                  CURRENT LANDSLIDE RISK
                </h2>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  LIVE
                </span>
              </div>
            </div>

            <div className="shrink-0 hidden sm:block">
              <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 shadow-2xs whitespace-nowrap">
                Prototype Risk Analysis
              </span>
            </div>
          </div>

          {/* Row 2: Subtitle on Left, Last updated on Right */}
          <div className="flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 pl-10.5 sm:pl-12 flex-wrap">
            <p className="font-medium text-[11px] sm:text-xs">
              Real-time multi-sensor hazard assessment
            </p>
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-slate-400 dark:text-slate-500 whitespace-nowrap">
                <Clock className="w-3 h-3" />
                <span>Last updated: {formattedTimestamp}</span>
              </span>
            </div>
          </div>

          {/* Row 3: Meta breadcrumb on Left, Slogan on Right */}
          <div className="pt-1 mt-0.5 text-[11px] text-slate-400 dark:text-slate-500 flex items-center justify-between gap-2">
            <span className="truncate">
              Himachal Region <span className="mx-1 text-slate-300 dark:text-slate-700">•</span> Monitoring Mountain Slopes <span className="mx-1 text-slate-300 dark:text-slate-700">•</span> Protecting Communities <span className="mx-1 text-slate-300 dark:text-slate-700">•</span> Powered by IoT & AI
            </span>
            <span className="font-serif italic text-xs font-semibold text-slate-600/90 dark:text-slate-300/90 tracking-tight shrink-0 whitespace-nowrap hidden sm:inline-block">
              Safer Mountains Stronger Communities
            </span>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 2. MAIN WORKSPACE: MAP (LEFT ~60%) + RISK SUMMARY & SPARKLINES (RIGHT ~40%) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch min-w-0">
        
        {/* ========================================================================= */}
        {/* LEFT: BRIGHT, HIGH-CONTRAST INTERACTIVE SATELLITE MAP (col-span-7) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-7 flex flex-col min-w-0">
          <div className="relative w-full h-[460px] sm:h-[500px] md:h-[540px] lg:h-[590px] rounded-2xl overflow-hidden border border-slate-200/90 dark:border-slate-800 shadow-xs">
            
            {/* Top-Left: Location Pill with dropdown chevron */}
            <div className="absolute top-2.5 left-2.5 z-[400] px-3 py-1.5 rounded-xl bg-slate-900/90 text-white backdrop-blur-md border border-white/15 shadow-lg flex items-center gap-2 pointer-events-none select-none">
              <div className="w-4.5 h-4.5 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <MapPin className="w-3 h-3" />
              </div>
              <div className="text-left leading-tight">
                <div className="text-[10.5px] font-bold font-heading tracking-tight flex items-center gap-1">
                  <span>Himachal Pradesh</span>
                  <ChevronDown className="w-2.5 h-2.5 text-slate-400" />
                </div>
                <div className="text-[8.5px] text-slate-300 font-medium">Kullu – Manali Region</div>
              </div>
            </div>

            {/* Top-Right: North Compass Indicator */}
            <div className="absolute top-2.5 right-2.5 z-[400] w-7 h-7 rounded-lg bg-slate-900/90 text-white backdrop-blur-md border border-white/15 shadow-lg flex flex-col items-center justify-center pointer-events-none select-none">
              <span className="text-[8px] font-bold leading-none text-rose-500">▲</span>
              <span className="text-[8.5px] font-bold font-mono leading-none mt-0.5">N</span>
            </div>

            {/* Bottom-Left: Metric Scale Bar Indicator */}
            <div className="absolute bottom-3 left-3 z-[400] px-2.5 py-1 rounded-md bg-slate-900/90 text-white backdrop-blur-md border border-white/15 shadow-md flex items-center gap-1.5 pointer-events-none select-none text-[8.5px] font-mono font-bold">
              <span>0</span>
              <div className="w-4 h-0.5 bg-white/90 rounded-xs" />
              <span>5</span>
              <div className="w-4 h-0.5 bg-white/90 rounded-xs" />
              <span>10</span>
              <div className="w-4 h-0.5 bg-white/90 rounded-xs" />
              <span>20 km</span>
            </div>

            {/* Bottom-Right: Semi-Transparent Dark Glass Map Legend */}
            <div className="absolute bottom-3 right-3 z-[400] p-2.5 rounded-xl bg-slate-900/90 text-white backdrop-blur-md border border-white/15 shadow-xl text-[8.5px] space-y-1 select-none pointer-events-none max-w-[155px]">
              <div className="font-bold text-[9px] text-slate-300 uppercase tracking-wider pb-0.5 border-b border-white/10">
                Map Legend
              </div>
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
                <span className="w-2.5 h-1.5 rounded-xs bg-red-500/40 border border-red-500/90 shrink-0" />
                <span className="text-slate-300 truncate">High Risk Zone</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-1.5 rounded-xs bg-amber-500/35 border border-amber-500/90 shrink-0" />
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
              {/* Esri World Imagery (Bright, high-contrast photographic terrain of Himachal Pradesh) */}
              <TileLayer
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                maxZoom={18}
              />
              
              {/* Places, Roads & Boundaries Overlay */}
              {showLabels && (
                <TileLayer
                  url="https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
                  maxZoom={18}
                  opacity={0.9}
                />
              )}

              {/* Map Interactive Overlay Controls */}
              <MapOverlayControls 
                onReset={handleResetMapView} 
                onToggleLabels={() => setShowLabels(prev => !prev)}
                showLabels={showLabels}
              />

              {/* Prototype Moderate Risk Influence Zone (Amber) */}
              <Polygon
                positions={MODERATE_RISK_ZONE}
                pathOptions={{
                  color: '#f59e0b',
                  fillColor: '#f59e0b',
                  fillOpacity: 0.24,
                  weight: 1.8,
                  dashArray: '5, 5'
                }}
              >
                <Popup>
                  <div className="text-xs p-1.5 text-slate-800 dark:text-slate-100">
                    <strong className="text-amber-500 block font-semibold">Prototype Moderate Risk Zone</strong>
                    <span className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
                      Simulated spatial hazard zone based on slope topography and localized moisture accumulation.
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
                  fillOpacity: 0.38,
                  weight: 2
                }}
              >
                <Popup>
                  <div className="text-xs p-1.5 text-slate-800 dark:text-slate-100">
                    <strong className="text-rose-500 block font-semibold">Prototype High Risk Zone</strong>
                    <span className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
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
                const meta = NODE_METADATA[node.id] || { alt: '2,400m', loc: 'Himalayan Ridge' };

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
                      <div className="text-xs p-2 min-w-[210px] text-slate-800 dark:text-slate-100">
                        <div className="flex items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-700 pb-1.5 mb-1.5">
                          <div>
                            <strong className="font-mono text-sm text-slate-900 dark:text-white">{node.id}</strong>
                            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">{meta.loc}</div>
                          </div>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            node.status === 'online' 
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-400' 
                              : 'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-400'
                          }`}>
                            {node.status === 'online' ? '● Online' : '○ Offline'}
                          </span>
                        </div>
                        <div className="text-slate-600 dark:text-slate-300 space-y-1 text-[11px]">
                          <div className="flex justify-between">
                            <span className="text-slate-400">Risk Level:</span>
                            <strong className="capitalize text-slate-800 dark:text-white">
                              {node.risk?.level || node.riskLevel || (node.id === 'NODE-05' ? 'High Risk' : node.id === 'NODE-03' ? 'Warning' : 'Safe')}
                            </strong>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Elevation:</span>
                            <strong className="font-mono text-slate-800 dark:text-white">{meta.alt}</strong>
                          </div>
                          {node.status === 'online' && (
                            <>
                              <div className="flex justify-between">
                                <span className="text-slate-400">Soil Moisture:</span>
                                <strong className="font-mono text-slate-800 dark:text-white">{node.readings?.soilMoisture?.value ?? 42.3}%</strong>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-400">Ground Tilt:</span>
                                <strong className="font-mono text-slate-800 dark:text-white">{node.readings?.tilt?.value ?? 1.86}°</strong>
                              </div>
                            </>
                          )}
                        </div>
                        <div className="mt-2.5 pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-end">
                          <Link 
                            to={`/sensor-nodes?node=${node.id}`} 
                            className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
                          >
                            View Details <ArrowRight className="w-3 h-3" />
                          </Link>
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
        {/* RIGHT: RISK LEVEL GAUGE, STATUS & MINI SPARKLINE GRAPHS (col-span-5) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-3 min-w-0">
          
          {/* 1. Risk Level Header & Link */}
          <div className="flex items-center justify-between pb-0.5">
            <span className="text-xs font-bold font-mono tracking-wider text-slate-500 dark:text-slate-400 uppercase">
              RISK LEVEL
            </span>
            <Link 
              to="/risk-analysis" 
              className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 inline-flex items-center gap-1 transition-colors group"
            >
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* 2. Semicircular Risk Gauge */}
          <div className="py-1">
            <SemicircularRiskGauge 
              score={riskAssessment.riskScore ?? 22} 
              level={riskAssessment.riskLevel ?? 'safe'} 
            />
          </div>

          {/* 3. Dynamic Environmental Assessment Card */}
          <div className={`rounded-xl p-3 border flex items-start gap-3 transition-colors ${assessmentMeta.container}`}>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${assessmentMeta.iconBg}`}>
              <AssessmentIcon className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-slate-800 dark:text-white leading-snug">
                {assessmentMeta.title}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                {assessmentMeta.desc}
              </div>
            </div>
          </div>

          {/* 4. Key Measurements Header & 2x2 Grid with Mini Sparkline Graphs */}
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-xs font-bold font-mono tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                KEY MEASUREMENTS
              </span>
              <span className="text-[10.5px] font-bold text-emerald-600 dark:text-emerald-400">
                (LIVE)
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              
              {/* Soil Moisture */}
              <div className="p-2.5 rounded-xl bg-slate-50/90 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/70 shadow-2xs flex flex-col justify-between min-w-0">
                <div className="flex items-start justify-between gap-1.5">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <div className="w-6.5 h-6.5 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-sky-500 dark:text-sky-400 border border-sky-100 dark:border-sky-900/40 flex items-center justify-center shrink-0">
                      <Droplets className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[10.5px] text-slate-500 dark:text-slate-400 font-medium truncate">
                      Soil Moisture
                    </span>
                  </div>
                </div>

                <div className="flex items-baseline gap-1 my-1">
                  <span className="text-sm sm:text-base font-bold font-mono text-slate-900 dark:text-white leading-none">
                    {sensorValues.moisture ?? 42.3}
                  </span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                    %
                  </span>
                </div>

                {/* Mini Recharts AreaChart Sparkline (Detailed Zig-Zag) */}
                <div className="w-full h-9 my-0.5">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={KEY_MEASUREMENTS_SPARKLINES_24H} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="moistureGradMini" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.45} />
                          <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <Area 
                        type="linear" 
                        dataKey="moisture" 
                        stroke="#06b6d4" 
                        strokeWidth={1.8} 
                        fill="url(#moistureGradMini)" 
                        isAnimationActive={false} 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="flex items-center gap-1 text-[9.5px] font-medium text-slate-600 dark:text-slate-300 pt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span>Normal</span>
                </div>
              </div>

              {/* Rainfall (24h) */}
              <div className="p-2.5 rounded-xl bg-slate-50/90 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/70 shadow-2xs flex flex-col justify-between min-w-0">
                <div className="flex items-start justify-between gap-1.5">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <div className="w-6.5 h-6.5 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-sky-500 dark:text-sky-400 border border-sky-100 dark:border-sky-900/40 flex items-center justify-center shrink-0">
                      <CloudRain className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[10.5px] text-slate-500 dark:text-slate-400 font-medium truncate">
                      Rainfall (24h)
                    </span>
                  </div>
                </div>

                <div className="flex items-baseline gap-1 my-1">
                  <span className="text-sm sm:text-base font-bold font-mono text-slate-900 dark:text-white leading-none">
                    {sensorValues.rainfall ?? 12}
                  </span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                    mm
                  </span>
                </div>

                {/* Mini Recharts BarChart Sparkline (Detailed Hyetograph Teeth) */}
                <div className="w-full h-9 my-0.5">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={KEY_MEASUREMENTS_SPARKLINES_24H} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
                      <Bar 
                        dataKey="rainBar" 
                        fill="#38bdf8" 
                        radius={[1, 1, 0, 0]} 
                        isAnimationActive={false} 
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="flex items-center gap-1 text-[9.5px] font-medium text-slate-600 dark:text-slate-300 pt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span>Normal</span>
                </div>
              </div>

              {/* Ground Tilt */}
              <div className="p-2.5 rounded-xl bg-slate-50/90 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/70 shadow-2xs flex flex-col justify-between min-w-0">
                <div className="flex items-start justify-between gap-1.5">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <div className="w-6.5 h-6.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-500 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/40 flex items-center justify-center shrink-0">
                      <MoveDiagonal className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[10.5px] text-slate-500 dark:text-slate-400 font-medium truncate">
                      Ground Tilt
                    </span>
                  </div>
                </div>

                <div className="flex items-baseline gap-0.5 my-1">
                  <span className="text-sm sm:text-base font-bold font-mono text-slate-900 dark:text-white leading-none">
                    {sensorValues.tilt ?? 1.86}°
                  </span>
                </div>

                {/* Mini Recharts AreaChart Sparkline (Detailed Inclinometer Zig-Zag) */}
                <div className="w-full h-9 my-0.5">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={KEY_MEASUREMENTS_SPARKLINES_24H} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="tiltGradMini" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#10b981" stopOpacity={0.45} />
                          <stop offset="100%" stopColor="#10b981" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <Area 
                        type="linear" 
                        dataKey="tilt" 
                        stroke="#10b981" 
                        strokeWidth={1.8} 
                        fill="url(#tiltGradMini)" 
                        isAnimationActive={false} 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="flex items-center gap-1 text-[9.5px] font-medium text-slate-600 dark:text-slate-300 pt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span>Stable</span>
                </div>
              </div>

              {/* Vibration */}
              <div className="p-2.5 rounded-xl bg-slate-50/90 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/70 shadow-2xs flex flex-col justify-between min-w-0">
                <div className="flex items-start justify-between gap-1.5">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <div className="w-6.5 h-6.5 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-500 dark:text-purple-400 border border-purple-100 dark:border-purple-900/40 flex items-center justify-center shrink-0">
                      <Activity className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[10.5px] text-slate-500 dark:text-slate-400 font-medium truncate">
                      Vibration
                    </span>
                  </div>
                </div>

                <div className="flex items-baseline gap-1 my-1">
                  <span className="text-sm sm:text-base font-bold font-mono text-slate-900 dark:text-white leading-none">
                    {sensorValues.vibration ?? 0.033}
                  </span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                    g
                  </span>
                </div>

                {/* Mini Recharts LineChart Sparkline (Detailed Seismic Waveform Zig-Zag) */}
                <div className="w-full h-9 my-0.5">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={KEY_MEASUREMENTS_SPARKLINES_24H} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
                      <Line 
                        type="linear" 
                        dataKey="vibration" 
                        stroke="#a855f7" 
                        strokeWidth={1.6} 
                        dot={false} 
                        isAnimationActive={false} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="flex items-center gap-1 text-[9.5px] font-medium text-slate-600 dark:text-slate-300 pt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span>Normal</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* 3. BOTTOM ANALYTICS CARDS (4 EQUAL CARDS CONFORMING TO REFERENCE) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4 pt-1">
        
        {/* Card 1: Trend (Last 24 Hours) */}
        <div className="p-3 rounded-2xl bg-slate-50/90 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between min-w-0">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40 flex items-center justify-center shrink-0">
                <TrendingUp className="w-3.5 h-3.5" />
              </div>
              <div className="text-[10px] sm:text-[10.5px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Trend (Last 24 Hours)
              </div>
            </div>
          </div>

          <div className="mt-2 mb-1 flex items-baseline justify-between">
            <div className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
              {displayTrend}
            </div>
            <div className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
              ↓ -2.4% net slope strain
            </div>
          </div>

          {/* 24H Risk Score Area Chart (Detailed Zig-Zag Net Slope Strain) */}
          <div className="w-full h-11 mt-1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={RISK_SCORE_HISTORY_24H} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="trendCardGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <Area 
                  type="linear" 
                  dataKey="score" 
                  stroke="#10b981" 
                  strokeWidth={2} 
                  fill="url(#trendCardGrad)" 
                  isAnimationActive={false} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Card 2: Prediction Window (Prototype) */}
        <div className="p-3 rounded-2xl bg-slate-50/90 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between min-w-0">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-sky-100/80 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 border border-sky-200/60 dark:border-sky-800/40 flex items-center justify-center shrink-0">
                <Calendar className="w-3.5 h-3.5" />
              </div>
              <div className="text-[10px] sm:text-[10.5px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Prediction Window (Prototype)
              </div>
            </div>
          </div>

          <div className="mt-2 mb-1 flex items-baseline justify-between">
            <div className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
              {displayPredictionWindow}
            </div>
            <div className="text-[10px] font-medium text-slate-500 dark:text-slate-400">
              Confidence: 94.2%
            </div>
          </div>

          {/* Multi-Horizon Risk Prediction Area Chart (Detailed Multi-Step Forecast Envelope) */}
          <div className="w-full h-11 mt-1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={RISK_PREDICTION_SERIES_8H} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="predCardGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0ea5e9" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#0ea5e9" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <Area 
                  type="linear" 
                  dataKey="high" 
                  stroke="#38bdf8" 
                  strokeWidth={1} 
                  strokeDasharray="2, 2"
                  fill="transparent" 
                  isAnimationActive={false} 
                />
                <Area 
                  type="linear" 
                  dataKey="moderate" 
                  stroke="#0ea5e9" 
                  strokeWidth={2} 
                  fill="url(#predCardGrad)" 
                  isAnimationActive={false} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Card 3: Safety Factor (Prototype) */}
        <div className="p-3 rounded-2xl bg-slate-50/90 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between min-w-0">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
              <div className="text-[10px] sm:text-[10.5px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Safety Factor (Prototype)
              </div>
            </div>
          </div>

          <div className="mt-2 mb-1 flex items-center justify-between">
            <div>
              <div className="text-base sm:text-lg font-black font-mono text-slate-900 dark:text-white leading-none">
                {riskAssessment.factorOfSafety ?? 1.59}
              </div>
              <div className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
                Safe Range (&gt; 1.30)
              </div>
            </div>
            
            {/* Miniature Semicircular Dial */}
            <MiniSafetyFactorDial value={riskAssessment.factorOfSafety ?? 1.59} />
          </div>

          <div className="text-[9.5px] text-slate-400 dark:text-slate-500 pt-1 border-t border-slate-200/60 dark:border-slate-800/80 flex items-center justify-between">
            <span>Critical: 1.00</span>
            <span>Current: 1.59</span>
            <span>Target: &gt; 1.50</span>
          </div>
        </div>

        {/* Card 4: Area Information */}
        <div className="p-3 rounded-2xl bg-slate-50/90 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between min-w-0">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40 flex items-center justify-center shrink-0">
                <Mountain className="w-3.5 h-3.5" />
              </div>
              <div className="text-[10px] sm:text-[10.5px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Area Information
              </div>
            </div>
          </div>

          <div className="mt-2 mb-1">
            <div className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white leading-tight">
              Himachal Pradesh
            </div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">
              8 Nodes Deployed (7 Online)
            </div>
          </div>

          <div className="mt-1 pt-1.5 border-t border-slate-200/60 dark:border-slate-800/80 flex items-center justify-between text-[10px]">
            <span className="font-semibold text-slate-600 dark:text-slate-300">~120 km² Monitored</span>
            <span className="px-1.5 py-0.5 rounded-md bg-slate-200/70 dark:bg-slate-700/60 font-mono text-[9px] text-slate-700 dark:text-slate-300">
              1,850m – 3,450m MSL
            </span>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 4. SUBTLE PROTOTYPE DATA DISCLAIMER FOOTNOTE */}
      {/* ========================================================================= */}
      <div className="mt-3 pt-2 text-[9.5px] text-slate-400 dark:text-slate-500 text-center leading-relaxed">
        Real geographic basemap. Sensor locations and risk zones are simulated prototype data and do not represent deployed sensors or official landslide hazard boundaries.
      </div>

    </div>
  );
};

export default CurrentRiskCard;

