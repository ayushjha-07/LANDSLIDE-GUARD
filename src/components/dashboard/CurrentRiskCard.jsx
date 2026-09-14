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
  ChevronDown,
  RotateCcw,
  Check,
  User,
  Users,
  Compass,
  Shield,
  Map as MapIcon,
  X
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  YAxis, 
  XAxis,
  CartesianGrid,
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

// Canonical cluster coordinates in the Kullu - Manali - Beas Valley monitoring corridor (Calibrated to Master Reference)
const LOCAL_GEO_COORDS = {
  'NODE-01': [32.228, 77.098], // Solang Valley / West Slope (Safe - Green)
  'NODE-02': [32.195, 77.115], // Dhundi Slope / Southwest (Safe - Green)
  'NODE-03': [32.246, 77.152], // Inside Watch Zone (Warning - Amber)
  'NODE-04': [32.208, 77.228], // Vashisht Cliffs / Southeast (Safe - Green)
  'NODE-05': [32.228, 77.195], // Inside Prototype Risk Zone (High Risk - Red with ping ring)
  'NODE-06': [32.160, 77.170], // Inside Monitoring Boundary South (Safe - Green)
  'NODE-07': [32.185, 77.158], // Inside Monitoring Boundary North (Warning - Amber)
  'NODE-08': [32.176, 77.225]  // Parvati Valley Approach / East (Offline - Slate)
};

// Altitudes and descriptive details for popups
const NODE_METADATA = {
  'NODE-01': { alt: '2,480m', loc: 'West Ridge Slope' },
  'NODE-02': { alt: '2,850m', loc: 'Dhundi Incline' },
  'NODE-03': { alt: '3,100m', loc: 'Upper Watch Zone' },
  'NODE-04': { alt: '2,150m', loc: 'Vashisht Cliffs' },
  'NODE-05': { alt: '2,560m', loc: 'Solang Valley' },
  'NODE-06': { alt: '1,920m', loc: 'Aleo Basin' },
  'NODE-07': { alt: '1,890m', loc: 'Beas Riverbank' },
  'NODE-08': { alt: '3,450m', loc: 'Parvati Pass' }
};

// 1. Watch Zone (Yellow/Amber Dashed - Upper Left around NODE-03 and Kasol)
const WATCH_ZONE = [
  [32.262, 77.168],
  [32.256, 77.140],
  [32.242, 77.118],
  [32.220, 77.122],
  [32.206, 77.145],
  [32.215, 77.164],
  [32.240, 77.174]
];

// 2. Prototype Risk Zone (Red Dashed - Upper Right around NODE-05 and Solang)
const PROTOTYPE_RISK_ZONE = [
  [32.250, 77.185],
  [32.244, 77.218],
  [32.228, 77.234],
  [32.210, 77.218],
  [32.206, 77.182],
  [32.218, 77.170],
  [32.238, 77.176]
];

// 3. Monitoring Boundary (Prototype) (Green Dashed - South around Naggar, NODE-07, NODE-06)
const MONITORING_BOUNDARY = [
  [32.198, 77.165],
  [32.194, 77.195],
  [32.170, 77.206],
  [32.146, 77.196],
  [32.140, 77.165],
  [32.154, 77.140],
  [32.178, 77.144]
];

// Regional Geographic Landmark Labels on Terrain (Strictly conforming to Master Reference)
const REGIONAL_LANDMARKS = [
  { name: 'Rohtang Pass', elev: '3,978 m', pos: [32.268, 77.210], type: 'pass' },
  { name: 'Manali', pos: [32.256, 77.168], type: 'town_bold' },
  { name: 'Solang', pos: [32.246, 77.195], type: 'town' },
  { name: 'Kasol', pos: [32.215, 77.145], type: 'town' },
  { name: 'Naggar', pos: [32.195, 77.168], type: 'town' },
  { name: 'Mandi', pos: [32.152, 77.135], type: 'town_bold' },
  { name: 'Bhuntar', pos: [32.128, 77.160], type: 'town' },
  { name: 'Parvati Valley', pos: [32.175, 77.240], type: 'valley' },
  { name: 'Beas River', pos: [32.220, 77.105], type: 'river' },
  { name: '↑ To Lahaul (Leh)', pos: [32.265, 77.140], type: 'route' },
  { name: '← To Mandi', pos: [32.165, 77.085], type: 'route' },
  { name: '↓ To Shimla', pos: [32.130, 77.100], type: 'route' }
];

function createLandmarkIcon(landmark) {
  let innerHtml = '';
  if (landmark.type === 'pass') {
    innerHtml = `
      <div class="text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] whitespace-nowrap pointer-events-none select-none">
        <div class="text-white font-bold text-[11px] leading-tight">${landmark.name}</div>
        <div class="text-slate-200 text-[9.5px] font-mono leading-tight">⛰ ${landmark.elev}</div>
      </div>
    `;
  } else if (landmark.type === 'town_bold') {
    innerHtml = `
      <div class="text-white font-black text-xs tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] whitespace-nowrap pointer-events-none select-none">
        ${landmark.name}
      </div>
    `;
  } else if (landmark.type === 'town') {
    innerHtml = `
      <div class="text-white/95 font-bold text-[10.5px] tracking-wide drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] whitespace-nowrap pointer-events-none select-none">
        ${landmark.name}
      </div>
    `;
  } else if (landmark.type === 'valley') {
    innerHtml = `
      <div class="text-cyan-300 font-semibold text-[10.5px] tracking-wide drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)] whitespace-nowrap pointer-events-none select-none">
        ${landmark.name}
      </div>
    `;
  } else if (landmark.type === 'river') {
    innerHtml = `
      <div class="text-sky-300/95 italic font-medium text-[10px] tracking-wider drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] whitespace-nowrap pointer-events-none select-none">
        ${landmark.name}
      </div>
    `;
  } else if (landmark.type === 'route') {
    innerHtml = `
      <div class="text-slate-200/90 font-medium text-[9px] tracking-tight drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)] whitespace-nowrap pointer-events-none select-none">
        ${landmark.name}
      </div>
    `;
  }

  return L.divIcon({
    html: innerHtml,
    className: 'custom-map-landmark',
    iconSize: [120, 24],
    iconAnchor: [60, 12]
  });
}

// Custom Pinned Callout DivIcon for NODE-05 (Positioned to upper-right matching Master Reference)
function createCalloutDivIcon(node) {
  const html = `
    <div class="relative select-none pointer-events-auto" style="transform: translate(52px, -125px); width: 200px;">
      <!-- Callout Glass Container -->
      <div class="rounded-xl bg-slate-950/95 border border-white/20 p-2.5 shadow-2xl backdrop-blur-md text-white">
        <!-- Top Bar: Red Pulsing Dot + NODE-05 + Close Button -->
        <div class="flex items-center justify-between pb-1 mb-1 border-b border-white/10">
          <div class="flex items-center gap-1.5">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-80"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
            <span class="font-mono font-bold text-xs text-white">${node.id || 'NODE-05'}</span>
          </div>
          <button 
            type="button" 
            onclick="window.__closeLandslideCallout && window.__closeLandslideCallout(event)" 
            class="text-slate-400 hover:text-white transition-colors text-xs px-1 cursor-pointer leading-none"
            title="Close Callout"
          >
            ✕
          </button>
        </div>

        <!-- Risk Level Subtitle -->
        <div class="text-rose-500 font-bold text-[10.5px] mb-1.5 leading-none">
          High Risk
        </div>

        <!-- Metric Rows -->
        <div class="space-y-1 text-[9px] leading-tight text-slate-300">
          <div class="flex justify-between">
            <span class="text-slate-400">Location</span>
            <span class="font-medium text-white">Solang Valley</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-400">Altitude</span>
            <span class="font-medium text-white">2,560 m</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-400">Last Update</span>
            <span class="font-medium text-slate-300">2 min ago</span>
          </div>
        </div>

        <!-- Footer Link -->
        <div class="mt-2 pt-1 border-t border-white/10 flex items-center justify-between">
          <a 
            href="/sensor-nodes?node=NODE-05" 
            class="text-[9.5px] font-semibold text-sky-400 hover:text-sky-300 hover:underline inline-flex items-center gap-1"
          >
            <span>View Details</span>
            <span>→</span>
          </a>
        </div>
      </div>

      <!-- Pointing tail extending from bottom-left toward NODE-05 -->
      <div class="absolute -left-2.5 bottom-4 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[10px] border-r-slate-950"></div>
    </div>
  `;

  return L.divIcon({
    html,
    className: 'custom-pinned-callout-marker',
    iconSize: [200, 140],
    iconAnchor: [0, 0]
  });
}



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
    pulseHtml = `<div class="absolute -top-1.5 -left-1.5 w-6 h-6 rounded-full bg-red-500/60 animate-ping pointer-events-none"></div>`;
  } else if (isWarning) {
    dotColor = '#f59e0b'; // Amber: Warning
    pulseHtml = `<div class="absolute -top-0.5 -left-0.5 w-4 h-4 rounded-full bg-amber-500/40 animate-ping pointer-events-none"></div>`;
  }

  const selectRing = isSelected ? 'ring-2 ring-emerald-400 ring-offset-2 ring-offset-slate-900 scale-110 shadow-lg' : 'hover:scale-105';

  const html = `
    <div class="relative flex items-center cursor-pointer select-none group transition-all duration-200 ${selectRing}">
      ${pulseHtml}
      <div class="w-3.5 h-3.5 rounded-full border-2 border-white shadow-md flex items-center justify-center shrink-0 z-10" style="background-color: ${dotColor};">
        ${isWarning ? '<div class="w-1 h-1 rounded-full bg-black/50"></div>' : ''}
      </div>
      <div class="-ml-1 pl-1.5 pr-2 py-0.5 rounded-r-md bg-slate-900/95 text-white border border-white/20 text-[9px] font-mono font-bold tracking-tight shadow-md flex items-center gap-1 backdrop-blur-xs whitespace-nowrap">
        <span>${node.id}</span>
      </div>
    </div>
  `;

  return L.divIcon({
    html,
    className: 'custom-risk-marker',
    iconSize: [76, 20],
    iconAnchor: [7, 10],
    popupAnchor: [0, -10]
  });
}

// Map Controls Controller (Zoom In, Zoom Out, Reset View, Multi-Basemap Switcher)
function MapOverlayControls({ onReset, basemap, onSelectBasemap, showLabels, onToggleLabels }) {
  const map = useMap();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="absolute top-12 left-2.5 z-[400] flex flex-col gap-1 shadow-md">
      <button
        type="button"
        onClick={() => map.zoomIn()}
        className="w-7 h-7 rounded-md bg-slate-900/90 hover:bg-slate-800 text-white border border-white/15 flex items-center justify-center text-xs font-bold backdrop-blur-md transition-colors cursor-pointer"
        title="Zoom in"
        aria-label="Zoom in"
      >
        <Plus className="w-3.5 h-3.5" />
      </button>
      <button
        type="button"
        onClick={() => map.zoomOut()}
        className="w-7 h-7 rounded-md bg-slate-900/90 hover:bg-slate-800 text-white border border-white/15 flex items-center justify-center text-xs font-bold backdrop-blur-md transition-colors cursor-pointer"
        title="Zoom out"
        aria-label="Zoom out"
      >
        <Minus className="w-3.5 h-3.5" />
      </button>
      <button
        type="button"
        onClick={onReset}
        className="w-7 h-7 rounded-md bg-slate-900/90 hover:bg-slate-800 text-white border border-white/15 flex items-center justify-center text-xs backdrop-blur-md transition-colors cursor-pointer"
        title="Reset map extent"
        aria-label="Reset map extent"
      >
        <Maximize2 className="w-3.5 h-3.5" />
      </button>

      {/* Layer Switcher Toggle */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setShowMenu(prev => !prev)}
          className={`w-7 h-7 rounded-md text-white border border-white/15 flex items-center justify-center text-xs backdrop-blur-md transition-colors cursor-pointer ${
            showMenu ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-slate-900/90 hover:bg-slate-800'
          }`}
          title="Basemap Layers"
          aria-label="Basemap Layers"
        >
          <Layers className="w-3.5 h-3.5" />
        </button>

        {/* Basemap Switcher Dropdown */}
        {showMenu && (
          <div className="absolute left-8 top-0 bg-slate-900/95 border border-white/20 rounded-xl p-2 shadow-2xl backdrop-blur-md text-white w-40 space-y-1.5 z-[500] animate-in fade-in zoom-in-95 duration-150">
            <div className="text-[9.5px] font-bold uppercase tracking-wider text-slate-400 px-1 border-b border-white/10 pb-1">
              Basemap Layer
            </div>

            <button
              type="button"
              onClick={() => { onSelectBasemap('satellite'); setShowMenu(false); }}
              className={`w-full flex items-center justify-between px-2 py-1 rounded-md text-[11px] font-medium transition-colors text-left ${
                basemap === 'satellite' ? 'bg-emerald-600 text-white' : 'hover:bg-slate-800 text-slate-200'
              }`}
            >
              <span>🛰 Satellite</span>
              {basemap === 'satellite' && <Check className="w-3 h-3" />}
            </button>

            <button
              type="button"
              onClick={() => { onSelectBasemap('terrain'); setShowMenu(false); }}
              className={`w-full flex items-center justify-between px-2 py-1 rounded-md text-[11px] font-medium transition-colors text-left ${
                basemap === 'terrain' ? 'bg-emerald-600 text-white' : 'hover:bg-slate-800 text-slate-200'
              }`}
            >
              <span>⛰ Topo Terrain</span>
              {basemap === 'terrain' && <Check className="w-3 h-3" />}
            </button>

            <button
              type="button"
              onClick={() => { onSelectBasemap('streets'); setShowMenu(false); }}
              className={`w-full flex items-center justify-between px-2 py-1 rounded-md text-[11px] font-medium transition-colors text-left ${
                basemap === 'streets' ? 'bg-emerald-600 text-white' : 'hover:bg-slate-800 text-slate-200'
              }`}
            >
              <span>🗺 Street Map</span>
              {basemap === 'streets' && <Check className="w-3 h-3" />}
            </button>

            <div className="pt-1 border-t border-white/10">
              <button
                type="button"
                onClick={onToggleLabels}
                className="w-full flex items-center justify-between px-2 py-1 rounded-md text-[10.5px] font-medium hover:bg-slate-800 text-slate-300 transition-colors text-left"
              >
                <span>Show Labels</span>
                <span className={`w-2 h-2 rounded-full ${showLabels ? 'bg-emerald-400' : 'bg-slate-600'}`} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Sleek Custom Tooltip for Mini Sparkline Charts
const MiniChartTooltip = ({ active, payload, unit = '', label = 'Value' }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const val = payload[0].value;
    return (
      <div className="bg-slate-900/95 text-white text-[10px] font-mono px-2 py-1 rounded-md border border-white/20 shadow-xl backdrop-blur-md pointer-events-none z-50">
        <div className="text-slate-400 text-[9px]">{data.time || 'Timestamp'}</div>
        <div className="font-bold text-emerald-400">
          {label}: {val} {unit}
        </div>
      </div>
    );
  }
  return null;
};

// Tooltip for Prediction Window Chart
const PredictionChartTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-900/95 text-white text-[10px] font-mono px-2 py-1 rounded-md border border-white/20 shadow-xl backdrop-blur-md pointer-events-none z-50">
        <div className="text-slate-400 text-[9px]">{data.time} Forecast</div>
        <div className="text-sky-400 font-bold">Predicted: {data.moderate} / 100</div>
        <div className="text-slate-400 text-[9px]">Range: {data.low} – {data.high}</div>
      </div>
    );
  }
  return null;
};

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

// Full Semicircular Safety Factor Gauge matching Master Reference (hires_safety_factor.png)
const SafetyFactorGauge = ({ value = 1.59 }) => {
  const numVal = typeof value === 'number' ? value : 1.59;
  const clampedVal = Math.min(2.5, Math.max(0, numVal));
  
  // Dimensions calibrated to fit the card container
  const r = 48;
  const cx = 85;
  const cy = 68;
  const strokeWidth = 9;

  // Arc runs 180 degrees from 180° (Math.PI, left) to 0° (0, right)
  const arcLength = Math.PI * r;
  // Scale is 0.0 to 2.5
  const progressRatio = clampedVal / 2.5;
  const progressLength = progressRatio * arcLength;

  // Scale ticks and labels around perimeter (0.5, 1.0, 1.5, 2.0, 2.5)
  const scaleMarks = [
    { label: '0.5', pct: 0.20, xOffset: -5, yOffset: 4 },
    { label: '1.0', pct: 0.40, xOffset: -6, yOffset: -5 },
    { label: '1.5', pct: 0.60, xOffset: 5, yOffset: -5 },
    { label: '2.0', pct: 0.80, xOffset: 6, yOffset: 4 },
    { label: '2.5', pct: 1.00, xOffset: 12, yOffset: 12 }
  ];

  return (
    <div className="flex flex-col items-center justify-center w-full select-none">
      <div className="relative w-full max-w-[190px] h-[92px] flex items-center justify-center">
        <svg viewBox="0 0 170 94" className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="safetyFactorGreenGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="60%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
            <filter id="safetyGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="#10b981" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* Inactive background track */}
          <path
            d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
            fill="none"
            stroke="#1e293b"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          {/* Active green progress arc */}
          <path
            d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
            fill="none"
            stroke="url(#safetyFactorGreenGrad)"
            strokeWidth={strokeWidth}
            strokeDasharray={`${progressLength} ${arcLength}`}
            strokeLinecap="round"
            filter="url(#safetyGlow)"
            className="transition-all duration-700 ease-out"
          />

          {/* Perimeter scale dividing tick marks */}
          {[0.20, 0.40, 0.60, 0.80].map((pct, idx) => {
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
                strokeWidth="1.2"
                className="opacity-40"
              />
            );
          })}

          {/* Perimeter scale labels */}
          {/* Bottom-left start label 0.5 */}
          <text
            x={cx - r - 8}
            y={cy + 13}
            fill="#94a3b8"
            fontSize="8.5"
            fontWeight="bold"
            fontFamily="monospace"
            textAnchor="middle"
          >
            0.5
          </text>

          {/* Arc perimeter labels */}
          {scaleMarks.map((mark, idx) => {
            const angle = Math.PI * (1 - mark.pct);
            const dist = r + 12;
            const x = cx + dist * Math.cos(angle) + mark.xOffset;
            const y = cy - dist * Math.sin(angle) + mark.yOffset;
            return (
              <text
                key={idx}
                x={x}
                y={y}
                fill="#94a3b8"
                fontSize="8.5"
                fontWeight="bold"
                fontFamily="monospace"
                textAnchor="middle"
              >
                {mark.label}
              </text>
            );
          })}
        </svg>

        {/* Centered Inside Text: 1.59 + Safe Range */}
        <div className="absolute inset-x-0 bottom-0.5 flex flex-col items-center justify-center text-center pointer-events-none">
          <span className="text-2xl font-black font-sans tracking-tight text-white leading-none drop-shadow-sm">
            {numVal.toFixed(2)}
          </span>
          <span className="text-[10.5px] font-medium text-slate-300 dark:text-slate-300 mt-1 leading-none">
            Safe Range
          </span>
        </div>
      </div>

      {/* Footnote below Gauge */}
      <div className="text-[10px] text-slate-400 dark:text-slate-500 text-center leading-tight mt-2 px-1">
        Higher values indicate more stable conditions (prototype metric).
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

  const baseSensorValues = propSensorValues || context?.sensorValues || {
    moisture: 42.3,
    rainfall: 12,
    tilt: 1.86,
    vibration: 0.033
  };

  const baseRiskAssessment = propRiskAssessment || context?.riskAssessment || {
    riskScore: 22,
    riskLevel: 'safe',
    factorOfSafety: 1.59,
    trend: 'Stable',
    predictionWindow: 'Next 6 Hours'
  };

  const nodes = propNodes || context?.nodes || [];

  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [calloutOpen, setCalloutOpen] = useState(true);
  const [basemap, setBasemap] = useState('satellite'); // 'satellite' | 'terrain' | 'streets'
  const [showLabels, setShowLabels] = useState(true);
  const mapRef = useRef(null);

  // Global handler for HTML callout close button inside Leaflet divIcon
  React.useEffect(() => {
    window.__closeLandslideCallout = (e) => {
      if (e && e.stopPropagation) e.stopPropagation();
      setCalloutOpen(false);
    };
    return () => {
      delete window.__closeLandslideCallout;
    };
  }, []);

  // Selected node object if any
  const selectedNode = useMemo(() => {
    if (!selectedNodeId) return null;
    return nodes.find(n => n.id === selectedNodeId) || null;
  }, [selectedNodeId, nodes]);

  // Reactive sensor values: dynamically bound to selected node if selected, otherwise regional aggregate
  const activeSensorValues = useMemo(() => {
    if (selectedNode && selectedNode.readings) {
      return {
        moisture: selectedNode.readings?.soilMoisture?.value ?? baseSensorValues.moisture,
        rainfall: selectedNode.readings?.rainfall?.value ?? baseSensorValues.rainfall,
        tilt: selectedNode.readings?.tilt?.value ?? baseSensorValues.tilt,
        vibration: selectedNode.readings?.vibration?.value ?? baseSensorValues.vibration
      };
    }
    return baseSensorValues;
  }, [selectedNode, baseSensorValues]);

  // Reactive risk assessment: dynamically bound to selected node if selected
  const activeRiskAssessment = useMemo(() => {
    if (selectedNode) {
      const nodeScore = selectedNode.risk?.score ?? (selectedNode.id === 'NODE-05' ? 68 : selectedNode.id === 'NODE-03' ? 46 : 22);
      const nodeLevel = selectedNode.risk?.level ?? (selectedNode.id === 'NODE-05' ? 'high-risk' : selectedNode.id === 'NODE-03' ? 'warning' : 'safe');
      const fos = nodeScore > 50 ? 1.08 : (nodeScore > 30 ? 1.34 : 1.59);
      return {
        riskScore: nodeScore,
        riskLevel: nodeLevel,
        factorOfSafety: fos,
        trend: selectedNode.risk?.trend ? (selectedNode.risk.trend.charAt(0).toUpperCase() + selectedNode.risk.trend.slice(1)) : 'Stable',
        predictionWindow: 'Next 8 Hours'
      };
    }
    return baseRiskAssessment;
  }, [selectedNode, baseRiskAssessment]);

  // Formatted timestamp
  const formattedTimestamp = useMemo(() => {
    const d = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const pad = (n) => String(n).padStart(2, '0');
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}, ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  }, [activeSensorValues]);

  // Capitalized trend & formatted prediction window
  const displayTrend = useMemo(() => {
    const t = activeRiskAssessment.trend || 'Stable';
    return t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
  }, [activeRiskAssessment.trend]);

  const displayPredictionWindow = useMemo(() => {
    const p = activeRiskAssessment.predictionWindow || 'Next 8 Hours';
    if (p === '6h' || p === 'Next 6h') return 'Next 8 Hours';
    if (p === '8h' || p === 'Next 8h') return 'Next 8 Hours';
    return p;
  }, [activeRiskAssessment.predictionWindow]);

  // Center on Kullu / Beas Valley corridor (Calibrated to Master Reference)
  const initialCenter = [32.205, 77.170];
  const initialZoom = 11.0;

  const handleResetMapView = () => {
    if (mapRef.current) {
      mapRef.current.setView(initialCenter, initialZoom, { animate: true });
    }
  };


  // Assessment copy based on active risk level
  const assessmentMeta = useMemo(() => {
    const lvl = (activeRiskAssessment.riskLevel || 'safe').toLowerCase();
    if (lvl === 'safe') {
      return {
        title: selectedNode ? `${selectedNode.id} status is stable.` : 'Environmental conditions are currently stable.',
        desc: 'No immediate risk detected based on multi-sensor analysis.',
        icon: ShieldCheck,
        container: 'bg-emerald-500/10 border-emerald-500/25 dark:bg-emerald-950/40 dark:border-emerald-800/60',
        iconBg: 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400'
      };
    }
    if (lvl === 'warning') {
      return {
        title: selectedNode ? `${selectedNode.id} requires increased attention.` : 'Environmental conditions require increased attention.',
        desc: 'Elevated rainfall and soil moisture indicators observed in localized slopes.',
        icon: AlertTriangle,
        container: 'bg-amber-500/10 border-amber-500/25 dark:bg-amber-950/40 dark:border-amber-800/60',
        iconBg: 'bg-amber-100 dark:bg-amber-900/60 text-amber-600 dark:text-amber-400'
      };
    }
    if (lvl === 'high-risk' || lvl === 'high risk' || lvl === 'critical') {
      return {
        title: selectedNode ? `Elevated instability risk detected at ${selectedNode.id}.` : 'Elevated indicators suggest increased slope instability risk.',
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
  }, [activeRiskAssessment.riskLevel, selectedNode]);

  const AssessmentIcon = assessmentMeta.icon;

  // Active Tile Layer URL based on basemap state
  const basemapUrl = useMemo(() => {
    switch (basemap) {
      case 'terrain':
        return 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}';
      case 'streets':
        return 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
      case 'satellite':
      default:
        return 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
    }
  }, [basemap]);

  return (
    <div 
      id="current-landslide-risk-card" 
      className={`w-full bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm p-4 sm:p-5 md:p-6 transition-colors overflow-hidden flex flex-col justify-between ${className}`}
    >
      
      {/* ========================================================================= */}
      {/* 1. HEADER SECTION (Strictly matching reference visual) */}
      {/* ========================================================================= */}
      <div className="relative rounded-2xl overflow-hidden mb-4 bg-gradient-to-r from-emerald-50/60 via-slate-50/40 to-sky-50/30 dark:from-slate-900/90 dark:via-slate-850/80 dark:to-slate-800/70 border border-slate-100 dark:border-slate-800 p-3.5 sm:p-4">
        
        {/* Himalayan Mountain Panorama Backdrop (Seamless blending into right side) */}
        <div className="absolute right-0 top-0 bottom-0 w-2/5 sm:w-1/2 pointer-events-none overflow-hidden select-none">
          <img 
            src={heroHimalayasImg} 
            alt="" 
            className="w-full h-full object-cover object-right opacity-35 dark:opacity-25 mix-blend-multiply dark:mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-50/90 via-slate-50/70 to-transparent dark:from-slate-900 dark:via-slate-900/80 dark:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-50/80 via-transparent to-transparent dark:from-slate-900/90 dark:via-transparent" />
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

            {/* Bottom-Right: Semi-Transparent Dark Glass Map Legend (Strictly Matching Master Reference) */}
            <div className="absolute bottom-3 right-3 z-[400] p-2.5 rounded-xl bg-slate-950/90 text-white backdrop-blur-md border border-white/15 shadow-xl text-[8.5px] space-y-1.5 select-none pointer-events-none min-w-[155px]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 border border-white/60 shrink-0" />
                <span className="text-slate-200">Sensor Node (Safe)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500 border border-white/60 shrink-0" />
                <span className="text-slate-200">Sensor Node (Warning)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 border border-white/60 shrink-0" />
                <span className="text-slate-200">Sensor Node (High Risk)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-slate-400 border border-white/60 shrink-0" />
                <span className="text-slate-200">Sensor Node (Offline)</span>
              </div>
              <div className="pt-1 border-t border-white/10 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-0 border-t-2 border-dashed border-rose-500 shrink-0" />
                  <span className="text-slate-300">Prototype Risk Zone</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-0 border-t-2 border-dashed border-amber-400 shrink-0" />
                  <span className="text-slate-300">Watch Zone</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-0 border-t-2 border-dashed border-emerald-400 shrink-0" />
                  <span className="text-slate-300">Monitoring Boundary (Prototype)</span>
                </div>
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
              {/* Dynamic Basemap TileLayer */}
              <TileLayer
                key={basemap}
                url={basemapUrl}
                maxZoom={18}
              />
              
              {/* Places, Roads & Boundaries Overlay for Satellite and Topo */}
              {showLabels && basemap !== 'streets' && (
                <TileLayer
                  url="https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
                  maxZoom={18}
                  opacity={0.9}
                />
              )}

              {/* Map Interactive Overlay Controls */}
              <MapOverlayControls 
                onReset={handleResetMapView} 
                basemap={basemap}
                onSelectBasemap={setBasemap}
                showLabels={showLabels}
                onToggleLabels={() => setShowLabels(prev => !prev)}
              />

              {/* 1. Watch Zone (Yellow/Amber Dashed - Upper Left around NODE-03 and Kasol) */}
              <Polygon
                positions={WATCH_ZONE}
                pathOptions={{
                  color: '#eab308',
                  fillColor: '#eab308',
                  fillOpacity: 0.22,
                  weight: 2,
                  dashArray: '5, 5'
                }}
              >
                <Popup>
                  <div className="text-xs p-1.5 text-slate-800 dark:text-slate-100">
                    <strong className="text-amber-500 block font-semibold">Watch Zone</strong>
                    <span className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
                      Elevated surveillance zone around Kasol and NODE-03.
                    </span>
                  </div>
                </Popup>
              </Polygon>

              {/* 2. Prototype Risk Zone (Red Dashed - Upper Right around NODE-05 and Solang) */}
              <Polygon
                positions={PROTOTYPE_RISK_ZONE}
                pathOptions={{
                  color: '#ef4444',
                  fillColor: '#ef4444',
                  fillOpacity: 0.32,
                  weight: 2,
                  dashArray: '5, 5'
                }}
              >
                <Popup>
                  <div className="text-xs p-1.5 text-slate-800 dark:text-slate-100">
                    <strong className="text-rose-500 block font-semibold">Prototype Risk Zone</strong>
                    <span className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
                      Concentrated slope instability potential near Solang Valley (NODE-05).
                    </span>
                  </div>
                </Popup>
              </Polygon>

              {/* 3. Monitoring Boundary (Prototype) (Green Dashed - South around Naggar, NODE-07, NODE-06) */}
              <Polygon
                positions={MONITORING_BOUNDARY}
                pathOptions={{
                  color: '#10b981',
                  fillColor: '#10b981',
                  fillOpacity: 0.18,
                  weight: 2,
                  dashArray: '5, 5'
                }}
              >
                <Popup>
                  <div className="text-xs p-1.5 text-slate-800 dark:text-slate-100">
                    <strong className="text-emerald-500 block font-semibold">Monitoring Boundary (Prototype)</strong>
                    <span className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
                      Active baseline perimeter covering Naggar and downstream Beas Valley slopes.
                    </span>
                  </div>
                </Popup>
              </Polygon>

              {/* Regional Geographic Landmark Labels on Terrain (Matching Master Reference) */}
              {REGIONAL_LANDMARKS.map((landmark, idx) => (
                <Marker
                  key={`landmark-${idx}`}
                  position={landmark.pos}
                  icon={createLandmarkIcon(landmark)}
                  interactive={false}
                />
              ))}

              {/* Pinned Callout Box directly above NODE-05 (Matching Master Reference) */}
              {calloutOpen && (
                <Marker
                  position={LOCAL_GEO_COORDS['NODE-05']}
                  icon={createCalloutDivIcon(
                    nodes.find(n => n.id === 'NODE-05') || { id: 'NODE-05' }
                  )}
                  interactive={true}
                  zIndexOffset={1000}
                />
              )}


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
                      click: () => {
                        setSelectedNodeId(prev => prev === node.id ? null : node.id);
                      }
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
                              <div className="flex justify-between">
                                <span className="text-slate-400">Rainfall:</span>
                                <strong className="font-mono text-slate-800 dark:text-white">{node.readings?.rainfall?.value ?? 12} mm</strong>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-400">Vibration:</span>
                                <strong className="font-mono text-slate-800 dark:text-white">{node.readings?.vibration?.value ?? 0.033} g</strong>
                              </div>
                            </>
                          )}
                        </div>
                        <div className="mt-2.5 pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
                          <button
                            type="button"
                            onClick={() => setSelectedNodeId(node.id)}
                            className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-600 text-white hover:bg-emerald-500 transition-colors"
                          >
                            Filter Telemetry
                          </button>
                          <Link 
                            to={`/sensor-nodes?node=${node.id}`} 
                            className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-0.5"
                          >
                            Details <ArrowRight className="w-3 h-3" />
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
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold font-mono tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                RISK LEVEL
              </span>
              {selectedNode && (
                <button
                  type="button"
                  onClick={() => setSelectedNodeId(null)}
                  className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-700 transition-colors cursor-pointer"
                  title="Reset to regional overview"
                >
                  <RotateCcw className="w-2.5 h-2.5" />
                  <span>Reset ({selectedNode.id})</span>
                </button>
              )}
            </div>
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
              score={activeRiskAssessment.riskScore ?? 22} 
              level={activeRiskAssessment.riskLevel ?? 'safe'} 
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
            <div className="flex items-center justify-between gap-1.5 mb-2">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold font-mono tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                  KEY MEASUREMENTS
                </span>
                <span className="text-[10.5px] font-bold text-emerald-600 dark:text-emerald-400">
                  (LIVE)
                </span>
              </div>
              {selectedNode && (
                <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 truncate">
                  Node: {selectedNode.id}
                </span>
              )}
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
                    {activeSensorValues.moisture ?? 42.3}
                  </span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                    %
                  </span>
                </div>

                {/* Mini Recharts AreaChart Sparkline (Detailed Zig-Zag with Dynamic Domain) */}
                <div className="w-full h-9 my-0.5">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={KEY_MEASUREMENTS_SPARKLINES_24H} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="moistureGradMini" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.5} />
                          <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <YAxis domain={['dataMin - 1.2', 'dataMax + 1.2']} hide />
                      <Tooltip content={<MiniChartTooltip unit="%" label="Moisture" />} />
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
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                    (activeSensorValues.moisture || 0) > 60 ? 'bg-rose-500' : (activeSensorValues.moisture || 0) > 48 ? 'bg-amber-500' : 'bg-emerald-500'
                  }`} />
                  <span>{(activeSensorValues.moisture || 0) > 60 ? 'Critical' : (activeSensorValues.moisture || 0) > 48 ? 'Elevated' : 'Normal'}</span>
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
                    {activeSensorValues.rainfall ?? 12}
                  </span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                    mm
                  </span>
                </div>

                {/* Mini Recharts BarChart Sparkline (Discrete Hyetograph Bars with Tooltip) */}
                <div className="w-full h-9 my-0.5">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={KEY_MEASUREMENTS_SPARKLINES_24H} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
                      <Tooltip content={<MiniChartTooltip unit="mm" label="Rain Rate" />} />
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
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                    (activeSensorValues.rainfall || 0) > 30 ? 'bg-rose-500' : (activeSensorValues.rainfall || 0) > 20 ? 'bg-amber-500' : 'bg-emerald-500'
                  }`} />
                  <span>{(activeSensorValues.rainfall || 0) > 30 ? 'Heavy' : (activeSensorValues.rainfall || 0) > 20 ? 'Moderate' : 'Normal'}</span>
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
                    {activeSensorValues.tilt ?? 1.86}°
                  </span>
                </div>

                {/* Mini Recharts AreaChart Sparkline (Detailed Inclinometer Zig-Zag with Dynamic Domain) */}
                <div className="w-full h-9 my-0.5">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={KEY_MEASUREMENTS_SPARKLINES_24H} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="tiltGradMini" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#10b981" stopOpacity={0.5} />
                          <stop offset="100%" stopColor="#10b981" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <YAxis domain={['dataMin - 0.2', 'dataMax + 0.2']} hide />
                      <Tooltip content={<MiniChartTooltip unit="°" label="Incline" />} />
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
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                    (activeSensorValues.tilt || 0) > 4.0 ? 'bg-rose-500' : (activeSensorValues.tilt || 0) > 3.0 ? 'bg-amber-500' : 'bg-emerald-500'
                  }`} />
                  <span>{(activeSensorValues.tilt || 0) > 4.0 ? 'Displacement' : (activeSensorValues.tilt || 0) > 3.0 ? 'Shift' : 'Stable'}</span>
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
                    {activeSensorValues.vibration ?? 0.033}
                  </span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                    g
                  </span>
                </div>

                {/* Mini Recharts LineChart Sparkline (Detailed Seismic Waveform Zig-Zag with Dynamic Domain) */}
                <div className="w-full h-9 my-0.5">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={KEY_MEASUREMENTS_SPARKLINES_24H} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
                      <YAxis domain={['dataMin - 0.005', 'dataMax + 0.008']} hide />
                      <Tooltip content={<MiniChartTooltip unit="g" label="Vibration" />} />
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
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                    (activeSensorValues.vibration || 0) > 0.08 ? 'bg-rose-500' : (activeSensorValues.vibration || 0) > 0.05 ? 'bg-amber-500' : 'bg-emerald-500'
                  }`} />
                  <span>{(activeSensorValues.vibration || 0) > 0.08 ? 'Micro-Tremors' : 'Normal'}</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* 3. BOTTOM ANALYTICS CARDS (4 EQUAL CARDS STRICTLY MATCHING MASTER REFERENCE) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4 pt-1">
        
        {/* Card 1: Trend (Last 24 Hours) */}
        <div className="p-3 rounded-2xl bg-slate-50/90 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between min-w-0">
          <div>
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-emerald-100/80 dark:bg-emerald-950/70 border border-emerald-200/60 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <TrendingUp className="w-3.5 h-3.5" />
              </div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">
                Trend <span className="text-slate-400 font-normal text-xs">(Last 24 Hours)</span>
              </div>
            </div>

            <div className="mt-2.5 mb-1">
              <div className="text-sm sm:text-base font-bold text-emerald-600 dark:text-emerald-400 leading-none">
                Stable
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 leading-tight">
                No significant change in overall risk level
              </div>
            </div>
          </div>

          {/* Detailed 24H Sparkline with Grid & X-Axis */}
          <div className="w-full h-14 mt-1.5">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={RISK_SCORE_HISTORY_24H} margin={{ top: 2, right: 4, left: 4, bottom: 0 }}>
                <defs>
                  <linearGradient id="trendCardGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#334155" strokeDasharray="2 2" strokeOpacity={0.35} vertical={false} />
                <YAxis domain={['dataMin - 3', 'dataMax + 3']} hide />
                <XAxis 
                  dataKey="time" 
                  ticks={['00:00', '06:00', '12:00', '18:00', 'Now']} 
                  stroke="#475569" 
                  tick={{ fill: '#94a3b8', fontSize: 8.5 }} 
                  axisLine={{ stroke: '#334155', strokeWidth: 0.8 }} 
                  tickLine={false} 
                />
                <Tooltip content={<MiniChartTooltip unit="/100" label="Risk Index" />} />
                <Area 
                  type="linear" 
                  dataKey="score" 
                  stroke="#10b981" 
                  strokeWidth={1.8} 
                  fill="url(#trendCardGrad)" 
                  dot={{ r: 1.5, fill: '#10b981', strokeWidth: 0 }}
                  isAnimationActive={false} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Card 2: Prediction Window (Prototype) */}
        <div className="p-3 rounded-2xl bg-slate-50/90 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between min-w-0">
          <div>
            <div className="flex items-start justify-between gap-1 min-w-0">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-sky-100/80 dark:bg-sky-950/70 border border-sky-200/60 dark:border-sky-500/30 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <div className="leading-tight min-w-0">
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    Prediction Window
                  </div>
                  <div className="text-[10px] text-slate-400">
                    (Prototype)
                  </div>
                </div>
              </div>
              <span className="text-rose-500 dark:text-rose-400 font-semibold text-[11px] shrink-0">
                Next 8 hours
              </span>
            </div>

            <div className="mt-1.5 text-[10px] text-slate-600 dark:text-slate-300 leading-tight">
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Low probability</span> of increased risk based on current trends
            </div>

            {/* Legend Dots */}
            <div className="flex items-center gap-3 mt-1.5 text-[9.5px] font-medium text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Low</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span>Moderate</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                <span>High</span>
              </div>
            </div>
          </div>

          {/* Multi-Horizon Risk Prediction Area Chart */}
          <div className="w-full h-14 mt-1.5">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={RISK_PREDICTION_SERIES_8H} margin={{ top: 2, right: 4, left: 4, bottom: 0 }}>
                <defs>
                  <linearGradient id="predLowGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="predModGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#334155" strokeDasharray="2 2" strokeOpacity={0.3} vertical={false} />
                <YAxis domain={['dataMin - 3', 'dataMax + 4']} hide />
                <XAxis 
                  dataKey="time" 
                  ticks={['Now', '+2h', '+4h', '+6h', '+8h']} 
                  tickFormatter={(val) => val.replace('+', '')}
                  stroke="#475569" 
                  tick={{ fill: '#94a3b8', fontSize: 8.5 }} 
                  axisLine={{ stroke: '#334155', strokeWidth: 0.8 }} 
                  tickLine={false} 
                />
                <Tooltip content={<PredictionChartTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="high" 
                  stroke="#ef4444" 
                  strokeWidth={1} 
                  strokeDasharray="2 2"
                  fill="transparent" 
                  isAnimationActive={false} 
                />
                <Area 
                  type="monotone" 
                  dataKey="moderate" 
                  stroke="#f59e0b" 
                  strokeWidth={1.5} 
                  fill="url(#predModGrad)" 
                  isAnimationActive={false} 
                />
                <Area 
                  type="monotone" 
                  dataKey="low" 
                  stroke="#10b981" 
                  strokeWidth={1.8} 
                  fill="url(#predLowGrad)" 
                  isAnimationActive={false} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Card 3: Safety Factor (Prototype) */}
        <div className="p-3 rounded-2xl bg-slate-50/90 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between min-w-0">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-emerald-100/80 dark:bg-emerald-950/70 border border-emerald-200/60 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">
              Safety Factor <span className="text-rose-500 dark:text-rose-400 font-normal text-xs">(Prototype)</span>
            </div>
          </div>

          <div className="mt-1 flex items-center justify-center w-full">
            <SafetyFactorGauge value={activeRiskAssessment.factorOfSafety ?? 1.59} />
          </div>
        </div>

        {/* Card 4: Area Information */}
        <div className="p-3 rounded-2xl bg-slate-50/90 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between min-w-0">
          <div>
            <div className="flex items-start gap-2.5 min-w-0 mb-2.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-100/80 dark:bg-emerald-950/70 border border-emerald-200/60 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <Mountain className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0 leading-tight">
                <div className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">
                  Area Information
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  Himachal Pradesh
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">
                  Kullu – Manali Region
                </div>
              </div>
            </div>

            {/* 3 Metric Rows matching Master Reference */}
            <div className="space-y-2 pt-1 border-t border-slate-200/60 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md border border-emerald-500/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <User className="w-3 h-3" />
                </div>
                <div className="leading-tight">
                  <span className="font-bold text-xs text-slate-900 dark:text-white mr-1.5">8</span>
                  <span className="text-[10.5px] text-slate-500 dark:text-slate-400">Monitoring Nodes</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md border border-emerald-500/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Compass className="w-3 h-3" />
                </div>
                <div className="leading-tight">
                  <span className="font-bold text-xs text-slate-900 dark:text-white mr-1.5">~120 km²</span>
                  <span className="text-[10.5px] text-slate-500 dark:text-slate-400">Monitored Area (Prototype)</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-md border border-emerald-500/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Shield className="w-3 h-3" />
                </div>
                <div className="text-[10.5px] text-slate-600 dark:text-slate-300 leading-snug">
                  Multiple high-risk slopes under observation
                </div>
              </div>
            </div>
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

