import React, { useState, useMemo, useRef } from 'react';
import { 
  BrainCircuit, 
  ShieldCheck, 
  Droplets, 
  CloudRain, 
  MoveDiagonal, 
  Activity, 
  Thermometer, 
  Wind, 
  Clock, 
  Clock3, 
  TrendingUp, 
  MapPin, 
  Maximize2, 
  Check, 
  CheckCircle2, 
  Bell, 
  Info, 
  AlertTriangle, 
  AlertCircle,
  ChevronDown, 
  Layers, 
  Cpu, 
  ArrowRight,
  Plus,
  Minus
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ReferenceLine, 
  ReferenceArea 
} from 'recharts';
import { MapContainer, TileLayer, Polygon, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { useSensorContext } from '../../context/SensorContext';
import { useTheme } from '../../hooks/useTheme';
import heroHimalayasImg from '../../assets/hero_himalayas.jpg';
import aiTerrainRiskMapImg from '../../assets/ai_terrain_risk_map.jpg';

// Canonical cluster coordinates in the Kullu - Manali - Beas Valley monitoring corridor
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

// AI Risk Surface Heatmap Polygons (simulated multi-tier risk gradient over Kullu valley)
const AI_SURFACE_LOW = [
  [32.300, 77.120],
  [32.290, 77.220],
  [32.260, 77.260],
  [32.190, 77.250],
  [32.150, 77.210],
  [32.155, 77.140],
  [32.210, 77.090],
  [32.270, 77.095]
];

const AI_SURFACE_MODERATE = [
  [32.280, 77.145],
  [32.275, 77.210],
  [32.245, 77.240],
  [32.205, 77.235],
  [32.175, 77.195],
  [32.180, 77.145],
  [32.225, 77.120],
  [32.265, 77.125]
];

const AI_SURFACE_ELEVATED = [
  [32.270, 77.155],
  [32.265, 77.200],
  [32.240, 77.225],
  [32.220, 77.215],
  [32.222, 77.160],
  [32.245, 77.145]
];

const AI_SURFACE_HIGH = [
  [32.258, 77.165],
  [32.255, 77.198],
  [32.235, 77.208],
  [32.228, 77.185],
  [32.232, 77.160]
];

// Custom DivIcon for AI Terrain Map Markers
function createAiMapMarker(node) {
  const isOffline = node.status?.toLowerCase() === 'offline';
  const riskLevel = isOffline ? 'unknown' : (node.risk?.level?.toLowerCase() || (typeof node.risk === 'string' ? node.risk.toLowerCase() : 'safe'));
  const isHighRisk = !isOffline && (riskLevel === 'critical' || riskLevel === 'high-risk' || riskLevel === 'high risk' || node.id === 'NODE-05');
  const isWarning = !isOffline && (riskLevel === 'warning');

  let dotColor = '#10b981';
  let pulseHtml = '';

  if (isOffline) {
    dotColor = '#94a3b8';
  } else if (isHighRisk) {
    dotColor = '#ef4444';
    pulseHtml = `<div class="absolute -top-1 -left-1 w-4 h-4 rounded-full bg-red-500/45 animate-ping pointer-events-none"></div>`;
  } else if (isWarning) {
    dotColor = '#f59e0b';
  }

  const html = `
    <div class="relative flex items-center cursor-pointer select-none">
      ${pulseHtml}
      <div class="w-3 h-3 rounded-full border-1.5 border-white shadow-sm flex items-center justify-center shrink-0 z-10" style="background-color: ${dotColor};">
      </div>
      <div class="-ml-1 pl-1 pr-1 py-0.2 rounded-r bg-slate-900/85 text-white border border-white/20 text-[8px] font-mono font-bold shadow-xs whitespace-nowrap">
        ${node.id}
      </div>
    </div>
  `;

  return L.divIcon({
    html,
    className: 'custom-ai-map-marker',
    iconSize: [60, 16],
    iconAnchor: [6, 8],
    popupAnchor: [0, -8]
  });
}

// Semicircular SVG Risk Gauge
const SemicircularGauge = ({ score = 23, level = 'safe' }) => {
  const safeScore = Math.min(100, Math.max(0, typeof score === 'number' ? score : 23));
  const r = 68;
  const cx = 90;
  const cy = 76;
  const strokeWidth = 10;
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
    <div className="flex flex-col items-center justify-center w-full max-w-[190px] mx-auto">
      <div className="relative w-full h-[88px] flex items-center justify-center select-none">
        <svg viewBox="0 0 180 95" className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="aiGaugeTrackGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
              <stop offset="30%" stopColor="#84cc16" stopOpacity="0.25" />
              <stop offset="55%" stopColor="#f59e0b" stopOpacity="0.25" />
              <stop offset="75%" stopColor="#f97316" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0.25" />
            </linearGradient>

            <linearGradient id="aiGaugeActiveGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="60%" stopColor={currentTheme.stroke} />
              <stop offset="100%" stopColor={currentTheme.stroke} />
            </linearGradient>
          </defs>

          {/* Background full track */}
          <path
            d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
            fill="none"
            stroke="url(#aiGaugeTrackGrad)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          {/* Segment ticks */}
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
            stroke="url(#aiGaugeActiveGrad)"
            strokeWidth={strokeWidth + 0.5}
            strokeDasharray={`${progressLength} ${arcLength}`}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
        </svg>

        {/* Center Score & Classification */}
        <div className="absolute inset-x-0 bottom-1 flex flex-col items-center justify-center text-center pointer-events-none">
          <div className="flex items-baseline gap-1 text-slate-800 dark:text-slate-200">
            <span className="text-2xl sm:text-3xl font-extrabold font-mono leading-none">
              {safeScore}
            </span>
            <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
              / 100
            </span>
          </div>
          <span className={`text-sm sm:text-base font-bold font-heading tracking-tight leading-none mt-1 ${currentTheme.text}`}>
            {displayLevel}
          </span>
          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium mt-0.5">
            {displayLevel === 'SAFE' ? 'Low Probability' : (displayLevel === 'WARNING' ? 'Moderate Risk' : 'High Probability')}
          </span>
        </div>
      </div>
    </div>
  );
};

// Custom Forecast Tooltip
const ForecastTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-900/95 text-white p-2.5 rounded-xl border border-white/15 shadow-xl text-xs backdrop-blur-md">
        <div className="text-[11px] text-slate-400 font-medium">{label} Horizon</div>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm font-bold font-mono text-emerald-400">{data.score} / 100</span>
          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            {data.level}
          </span>
        </div>
      </div>
    );
  }
  return null;
};

export const AiPredictionCard = ({ 
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
    vibration: 0.033,
    temperature: 20.6,
    humidity: 73.7
  };

  const riskAssessment = propRiskAssessment || context?.riskAssessment || {
    riskScore: 23,
    riskLevel: 'safe',
    factorOfSafety: 1.58,
    trend: 'Stable',
    predictionWindow: '0 – 6 Hours'
  };

  const nodes = propNodes || context?.nodes || [];

  const [forecastHorizon, setForecastHorizon] = useState('24h');
  const [selectedSensorFilter, setSelectedSensorFilter] = useState('all');
  const [showMapModal, setShowMapModal] = useState(false);
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

  // 24-Hour Forecast Series (Deterministic projection derived from live riskScore)
  const forecastData = useMemo(() => {
    const base = typeof riskAssessment.riskScore === 'number' ? riskAssessment.riskScore : 23;
    return [
      { time: 'Now', score: base, level: base > 50 ? 'High' : (base > 25 ? 'Warning' : 'Safe') },
      { time: '3h', score: Math.min(100, Math.round(base + 1)), level: 'Safe' },
      { time: '6h', score: Math.min(100, Math.round(base + 1.5)), level: 'Safe' },
      { time: '9h', score: Math.min(100, Math.round(base + 2)), level: 'Safe' },
      { time: '12h', score: Math.min(100, Math.round(base + 2.4)), level: 'Safe' },
      { time: '18h', score: Math.min(100, Math.round(base + 3)), level: 'Safe' },
      { time: '24h', score: Math.min(100, Math.round(base + 2.8)), level: 'Safe' }
    ];
  }, [riskAssessment.riskScore]);

  // Online nodes count
  const onlineCount = useMemo(() => {
    if (!nodes || nodes.length === 0) return 6;
    return nodes.filter(n => n.status?.toLowerCase() === 'online').length;
  }, [nodes]);

  // Dynamic assessment messaging
  const forecastInsight = useMemo(() => {
    const lvl = (riskAssessment.riskLevel || 'safe').toLowerCase();
    if (lvl === 'safe') {
      return {
        title: 'Risk is expected to remain low in the next 6 hours.',
        subtext: 'Continuous monitoring is recommended as conditions may change rapidly in mountainous regions.',
        color: 'text-emerald-700 dark:text-emerald-400',
        bg: 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-200/80 dark:border-emerald-800/60'
      };
    }
    if (lvl === 'warning') {
      return {
        title: 'Localized moderate risk anticipated in steep catchment zones.',
        subtext: 'Increased soil saturation requires active telemetry observation.',
        color: 'text-amber-700 dark:text-amber-400',
        bg: 'bg-amber-50/70 dark:bg-amber-950/40 border-amber-200/80 dark:border-amber-800/60'
      };
    }
    return {
      title: 'Elevated probability of slope movement under continuous rainfall.',
      subtext: 'Geotechnical alert issued for vulnerable infrastructure segments.',
      color: 'text-rose-700 dark:text-rose-400',
      bg: 'bg-rose-50/70 dark:bg-rose-950/40 border-rose-200/80 dark:border-rose-800/60'
    };
  }, [riskAssessment.riskLevel]);

  // Contributing factors relative weights (based on actual telemetry influences)
  const contributingFactors = useMemo(() => [
    { name: 'Rainfall', icon: CloudRain, pct: 32, barColor: 'bg-blue-500', textColor: 'text-blue-500' },
    { name: 'Soil Moisture', icon: Droplets, pct: 24, barColor: 'bg-emerald-500', textColor: 'text-emerald-500' },
    { name: 'Ground Tilt', icon: MoveDiagonal, pct: 18, barColor: 'bg-amber-700', textColor: 'text-amber-700' },
    { name: 'Vibration', icon: Activity, pct: 14, barColor: 'bg-amber-500', textColor: 'text-amber-500' },
    { name: 'Temperature', icon: Thermometer, pct: 7, barColor: 'bg-rose-500', textColor: 'text-rose-500' },
    { name: 'Humidity', icon: Wind, pct: 5, barColor: 'bg-purple-500', textColor: 'text-purple-500' }
  ], []);

  return (
    <div id="ai-risk-analysis-workspace" className={`w-full bg-white/95 dark:bg-slate-900/90 rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs backdrop-blur-sm p-4 sm:p-5 transition-colors overflow-hidden space-y-5 ${className}`}>
      
      {/* ========================================================================= */}
      {/* 1. HEADER SECTION (Himalayan Backdrop, Slogan, Model Status, LIVE Pill) */}
      {/* ========================================================================= */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-emerald-50/50 via-white to-sky-50/25 dark:from-slate-800/70 dark:via-slate-850 dark:to-slate-800/50 border border-slate-100 dark:border-slate-800 p-3 sm:p-3.5">
        
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
          {/* Row 1: Icon + Title + LIVE pill on Left, Status Pills on Right */}
          <div className="flex items-center justify-between gap-2 min-w-0">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200/80 dark:border-emerald-800/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 shadow-xs">
                <BrainCircuit className="w-5 h-5 stroke-[2.2]" />
              </div>

              <div className="flex items-center gap-2 min-w-0">
                <h2 className="text-base sm:text-lg font-bold font-heading text-slate-900 dark:text-white tracking-tight whitespace-nowrap">
                  AI Risk Analysis
                </h2>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  LIVE
                </span>
              </div>
            </div>

            {/* Right Group: Model Active & Architecture Pills */}
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="hidden xl:inline-flex items-center gap-1 text-[10px] font-medium text-slate-400 dark:text-slate-500 pr-1 whitespace-nowrap">
                <Clock className="w-3 h-3" />
                <span>Last updated: {formattedTimestamp}</span>
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100/90 dark:bg-emerald-950/70 border border-emerald-200/80 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-400 shadow-2xs whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Model Active
              </span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 shadow-2xs whitespace-nowrap inline-flex items-center">
                RF + LSTM / GRU
              </span>
            </div>
          </div>

          {/* Row 2: Subtitle */}
          <div className="flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 pl-11 sm:pl-13">
            <p className="font-medium truncate">
              Multi-horizon temporal prediction using machine learning & deep learning
            </p>
          </div>

          {/* Row 3: Meta breadcrumb on Left, Slogan on Right */}
          <div className="pt-1 mt-0.5 text-[10.5px] sm:text-[11px] text-slate-400 dark:text-slate-500 flex items-center justify-between gap-2">
            <span className="truncate">
              Analyzing real-time sensor data <span className="mx-1 text-slate-300 dark:text-slate-700">|</span> Predicting landslide probability <span className="mx-1 text-slate-300 dark:text-slate-700">|</span> Powered by RF + LSTM / GRU
            </span>
            <span className="font-serif italic text-xs font-semibold text-slate-600/90 dark:text-slate-300/90 tracking-tight shrink-0 whitespace-nowrap hidden sm:inline-block">
              Smarter Monitoring Safer Himalayas
            </span>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 2. TOP ANALYSIS GRID: 4 MAJOR PARTS (Score, Prediction, Forecast, Terrain) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-3.5 items-stretch min-w-0">
        
        {/* PART 1: Risk Score (Live) + Compact Indicators (xl:col-span-3) */}
        <div className="xl:col-span-3 flex flex-col justify-between space-y-2.5 min-w-0">
          
          {/* Main Semicircular Gauge Box */}
          <div className="p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex-1 flex flex-col justify-between">
            <div className="flex items-center gap-1.5 mb-1">
              <MapPin className="w-3.5 h-3.5 text-sky-500" />
              <span className="text-xs font-bold text-slate-800 dark:text-white font-heading">
                Risk Score
              </span>
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                (Live)
              </span>
            </div>

            <div className="py-1">
              <SemicircularGauge 
                score={riskAssessment.riskScore} 
                level={riskAssessment.riskLevel} 
              />
            </div>
          </div>

          {/* Bottom 2 Compact Indicator Cards: Prediction Window & Trend */}
          <div className="grid grid-cols-2 gap-2">
            {/* Prediction Window */}
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 border border-sky-100 dark:border-sky-900/40 flex items-center justify-center shrink-0">
                <Clock3 className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <div className="text-[9.5px] text-slate-500 dark:text-slate-400 font-medium leading-none whitespace-nowrap">
                  Prediction Window
                </div>
                <div className="text-xs font-bold text-slate-900 dark:text-white leading-tight mt-1 truncate">
                  {riskAssessment.predictionWindow || '0 – 6 Hours'}
                </div>
                <div className="text-[9px] font-semibold text-emerald-600 dark:text-emerald-400 leading-none mt-0.5">
                  Low Risk
                </div>
              </div>
            </div>

            {/* Trend */}
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 border border-sky-100 dark:border-sky-900/40 flex items-center justify-center shrink-0">
                <TrendingUp className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <div className="text-[9.5px] text-slate-500 dark:text-slate-400 font-medium leading-none whitespace-nowrap">
                  Trend
                </div>
                <div className="text-xs font-bold text-slate-900 dark:text-white leading-tight mt-1 truncate">
                  {riskAssessment.trend || 'Stable'}
                </div>
                <div className="text-[9px] text-slate-500 dark:text-slate-400 font-medium leading-none mt-0.5 truncate">
                  No significant change
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* PART 2: Current Prediction Card (xl:col-span-2) */}
        <div className="xl:col-span-2 p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex flex-col justify-between min-w-0">
          <div>
            <div className="flex items-center gap-1.5 mb-2.5">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-500" />
              <span className="text-xs font-bold text-slate-800 dark:text-white font-heading">
                Current Prediction
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-900/40 flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs sm:text-[13px] font-bold text-slate-900 dark:text-white leading-snug">
                  Low probability of landslide
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                  in next 6 hours
                </div>
              </div>
            </div>

            {/* Subtle Mountain Topography SVG curve */}
            <div className="w-full h-8 my-2 opacity-35 dark:opacity-20 flex items-end">
              <svg viewBox="0 0 200 40" className="w-full h-full stroke-emerald-600 fill-emerald-500/10">
                <path d="M 0 35 Q 35 15 70 25 T 140 10 T 200 30 L 200 40 L 0 40 Z" />
              </svg>
            </div>
          </div>

          {/* Model Confidence / Signal Strength */}
          <div className="pt-2">
            <div className="flex items-baseline justify-between mb-1">
              <span className="text-base font-extrabold font-mono text-emerald-600 dark:text-emerald-400 leading-none">
                87%
              </span>
              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                Model Confidence
              </span>
            </div>
            {/* 10-step signal segment bars */}
            <div className="grid grid-cols-10 gap-0.5 h-2">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                <div key={i} className="rounded-xs bg-emerald-500" />
              ))}
              {[9, 10].map(i => (
                <div key={i} className="rounded-xs bg-slate-200 dark:bg-slate-700" />
              ))}
            </div>
          </div>
        </div>

        {/* PART 3: Risk Forecast — Next 24 Hours (xl:col-span-4) */}
        <div className="xl:col-span-4 p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex flex-col justify-between min-w-0">
          <div>
            {/* Header & Horizon Selector */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-1.5 min-w-0">
                <TrendingUp className="w-3.5 h-3.5 text-sky-500" />
                <span className="text-xs font-bold text-slate-800 dark:text-white font-heading truncate">
                  Risk Forecast (Next 24 Hours)
                </span>
              </div>
              <div className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 shrink-0 select-none">
                <span>Next 24 Hours</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </div>
            </div>

            {/* Threshold Legend */}
            <div className="flex items-center gap-3 text-[9px] text-slate-500 dark:text-slate-400 mb-1 flex-wrap">
              <span className="inline-flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Predicted Risk
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="w-3 h-0.5 border-t border-dashed border-amber-500" />
                Warning Threshold
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="w-3 h-0.5 border-t border-dashed border-rose-500" />
                High Risk Threshold
              </span>
            </div>

            {/* Recharts Area / Line Forecast Chart */}
            <div className="relative w-full h-[145px] sm:h-[155px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={forecastData} margin={{ top: 10, right: 12, left: -22, bottom: 0 }}>
                  <defs>
                    <linearGradient id="aiForecastAreaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity={0.25} />
                      <stop offset="100%" stopColor="#10b981" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>

                  {/* 4 Risk Category Background Bands */}
                  <ReferenceArea y1={0} y2={25} fill="#10b981" fillOpacity={0.05} />
                  <ReferenceArea y1={25} y2={50} fill="#f59e0b" fillOpacity={0.04} />
                  <ReferenceArea y1={50} y2={75} fill="#f97316" fillOpacity={0.04} />
                  <ReferenceArea y1={75} y2={100} fill="#ef4444" fillOpacity={0.04} />

                  {/* Threshold Lines */}
                  <ReferenceLine y={50} stroke="#f59e0b" strokeDasharray="3 3" strokeWidth={1} />
                  <ReferenceLine y={75} stroke="#ef4444" strokeDasharray="3 3" strokeWidth={1} />

                  <XAxis 
                    dataKey="time" 
                    tick={{ fontSize: 9, fill: '#94a3b8' }} 
                    axisLine={false} 
                    tickLine={false} 
                  />
                  <YAxis 
                    domain={[0, 100]} 
                    ticks={[0, 25, 50, 75, 100]} 
                    tick={{ fontSize: 9, fill: '#94a3b8' }} 
                    axisLine={false} 
                    tickLine={false} 
                  />
                  <Tooltip content={<ForecastTooltip />} />

                  <Area 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#10b981" 
                    strokeWidth={2.2} 
                    fill="url(#aiForecastAreaGrad)" 
                    dot={{ r: 3, fill: '#10b981', stroke: '#ffffff', strokeWidth: 1.5 }}
                    activeDot={{ r: 4.5, fill: '#10b981', stroke: '#ffffff', strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>

              {/* Current Forecast Badge Overlay */}
              <div className="absolute right-2 top-2 px-1.5 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-[9px] font-mono font-bold shadow-2xs pointer-events-none select-none">
                {riskAssessment.riskScore} (Safe)
              </div>
            </div>
          </div>

          {/* Forecast Insight Box */}
          <div className={`mt-2 p-2 rounded-xl border flex items-start gap-2 ${forecastInsight.bg}`}>
            <div className="w-5 h-5 rounded-md bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck className="w-3 h-3" />
            </div>
            <div className="min-w-0">
              <div className="text-[11px] font-bold text-slate-800 dark:text-white leading-tight">
                {forecastInsight.title}
              </div>
              <div className="text-[9.5px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                {forecastInsight.subtext}
              </div>
            </div>
          </div>
        </div>

        {/* PART 4: Terrain Risk Map — AI Analysis (xl:col-span-3) */}
        <div className="xl:col-span-3 p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex flex-col justify-between min-w-0">
          <div className="flex-1 flex flex-col justify-between mb-2">
            {/* Header: TrendingUp icon, Title & Subtitle */}
            <div className="flex items-center gap-1.5 mb-2.5">
              <TrendingUp className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400 stroke-[2.2]" />
              <span className="text-xs font-bold text-slate-800 dark:text-white font-heading">
                Terrain Risk Map
              </span>
              <span className="text-[10.5px] text-slate-400 font-medium">
                (AI Analysis)
              </span>
            </div>

            {/* Exact Reference Terrain Risk Orthophoto with AI Hazard Heatmap Corridor */}
            <div className="relative w-full flex-1 min-h-[185px] rounded-xl overflow-hidden border border-slate-200/80 dark:border-slate-700/80 shadow-2xs group select-none bg-slate-950">
              <img 
                src={aiTerrainRiskMapImg} 
                alt="Terrain Risk Map (AI Analysis)" 
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              
              {/* Expand Fullscreen Button in Top-Right matching reference exactly */}
              <button 
                type="button" 
                onClick={() => setShowMapModal(true)}
                className="absolute top-2 right-2 z-10 w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-white/95 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 shadow-md border border-slate-200/70 dark:border-slate-700/70 flex items-center justify-center hover:scale-110 active:scale-95 transition-all cursor-pointer"
                title="Expand Terrain Risk Map"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Bottom Gradient Scale Bar matching reference */}
          <div className="mt-2 pt-1">
            <div className="h-2 w-full rounded-full bg-gradient-to-r from-emerald-500 via-yellow-400 via-orange-500 to-rose-600 shadow-2xs" />
            <div className="flex items-center justify-between text-[9.5px] font-medium text-slate-400 dark:text-slate-500 mt-1">
              <span>Low Risk</span>
              <span>High Risk</span>
            </div>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 3. LIVE SENSOR INPUTS (LEFT ~65%) + CONTRIBUTING FACTORS (RIGHT ~35%) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-3.5 items-stretch min-w-0">
        
        {/* Left: Live Sensor Inputs 6-Card Grid (xl:col-span-8) */}
        <div className="xl:col-span-8 p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex flex-col justify-between min-w-0">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2 min-w-0">
                <Activity className="w-4 h-4 text-sky-500" />
                <div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-heading leading-tight">
                    Live Sensor Inputs
                  </div>
                  <div className="text-[10px] text-slate-400 dark:text-slate-500">
                    Real-time data used for AI analysis
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <div className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 shrink-0 select-none">
                  <span>All Sensors</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100/90 dark:bg-emerald-950/70 border border-emerald-200/80 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-400 shadow-2xs whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {onlineCount} / {nodes.length || 6} Online
                </span>
              </div>
            </div>

            {/* 6 Sensor Cards in 6 Columns */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              
              {/* 1. Soil Moisture */}
              <div className="p-2 sm:p-2.5 rounded-xl bg-emerald-50/30 dark:bg-emerald-950/20 border border-emerald-100/80 dark:border-emerald-900/40 flex flex-col justify-between min-w-0">
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="w-6 h-6 rounded-md bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <Droplets className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[10px] font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap">
                    Soil Moisture
                  </span>
                </div>
                <div className="flex items-baseline gap-1 my-0.5">
                  <span className="text-sm sm:text-base font-bold font-mono text-slate-900 dark:text-white leading-none">
                    {sensorValues.moisture ?? 42.3}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">%</span>
                </div>
                {/* SVG Mini Sparkline */}
                <div className="w-full h-4 my-1 opacity-75">
                  <svg viewBox="0 0 100 24" className="w-full h-full stroke-emerald-500 fill-none" strokeWidth="2">
                    <path d="M 0 16 Q 20 8 40 14 T 70 6 T 100 12" />
                  </svg>
                </div>
                <div className="flex items-center justify-between text-[9px] pt-1">
                  <span className="inline-flex items-center gap-1 text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Live
                  </span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">Normal</span>
                </div>
              </div>

              {/* 2. Rainfall (24h) */}
              <div className="p-2 sm:p-2.5 rounded-xl bg-sky-50/30 dark:bg-sky-950/20 border border-sky-100/80 dark:border-sky-900/40 flex flex-col justify-between min-w-0">
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="w-6 h-6 rounded-md bg-sky-100 dark:bg-sky-900/60 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                    <CloudRain className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[10px] font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap">
                    Rainfall (24h)
                  </span>
                </div>
                <div className="flex items-baseline gap-1 my-0.5">
                  <span className="text-sm sm:text-base font-bold font-mono text-slate-900 dark:text-white leading-none">
                    {sensorValues.rainfall ?? 12}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">mm</span>
                </div>
                {/* SVG Mini Bar Chart Sparkline */}
                <div className="w-full h-4 my-1 flex items-end gap-1 opacity-75">
                  <div className="w-1.5 h-2 bg-sky-500 rounded-xs" />
                  <div className="w-1.5 h-3 bg-sky-500 rounded-xs" />
                  <div className="w-1.5 h-1 bg-sky-500 rounded-xs" />
                  <div className="w-1.5 h-4 bg-sky-500 rounded-xs" />
                  <div className="w-1.5 h-3.5 bg-sky-500 rounded-xs" />
                  <div className="w-1.5 h-2 bg-sky-500 rounded-xs" />
                </div>
                <div className="flex items-center justify-between text-[9px] pt-1">
                  <span className="inline-flex items-center gap-1 text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Live
                  </span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">Normal</span>
                </div>
              </div>

              {/* 3. Ground Tilt */}
              <div className="p-2 sm:p-2.5 rounded-xl bg-amber-50/30 dark:bg-amber-950/20 border border-amber-100/80 dark:border-amber-900/40 flex flex-col justify-between min-w-0">
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="w-6 h-6 rounded-md bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0">
                    <MoveDiagonal className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[10px] font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap">
                    Ground Tilt
                  </span>
                </div>
                <div className="flex items-baseline gap-0.5 my-0.5">
                  <span className="text-sm sm:text-base font-bold font-mono text-slate-900 dark:text-white leading-none">
                    {sensorValues.tilt ?? 1.86}°
                  </span>
                </div>
                {/* SVG Mini Angular Slope Sparkline */}
                <div className="w-full h-4 my-1 opacity-75">
                  <svg viewBox="0 0 100 24" className="w-full h-full stroke-amber-700 fill-none" strokeWidth="2">
                    <path d="M 0 18 L 25 14 L 50 16 L 75 10 L 100 12" />
                  </svg>
                </div>
                <div className="flex items-center justify-between text-[9px] pt-1">
                  <span className="inline-flex items-center gap-1 text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Live
                  </span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">Stable</span>
                </div>
              </div>

              {/* 4. Vibration */}
              <div className="p-2 sm:p-2.5 rounded-xl bg-orange-50/30 dark:bg-orange-950/20 border border-orange-100/80 dark:border-orange-900/40 flex flex-col justify-between min-w-0">
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="w-6 h-6 rounded-md bg-orange-100 dark:bg-orange-900/60 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0">
                    <Activity className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[10px] font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap">
                    Vibration
                  </span>
                </div>
                <div className="flex items-baseline gap-1 my-0.5">
                  <span className="text-sm sm:text-base font-bold font-mono text-slate-900 dark:text-white leading-none">
                    {sensorValues.vibration ?? 0.033}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">g</span>
                </div>
                {/* SVG Mini Seismic Wave Sparkline */}
                <div className="w-full h-4 my-1 opacity-75">
                  <svg viewBox="0 0 100 24" className="w-full h-full stroke-orange-500 fill-none" strokeWidth="2">
                    <path d="M 0 12 Q 25 12 35 4 T 50 20 T 65 8 T 100 12" />
                  </svg>
                </div>
                <div className="flex items-center justify-between text-[9px] pt-1">
                  <span className="inline-flex items-center gap-1 text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Live
                  </span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">Normal</span>
                </div>
              </div>

              {/* 5. Temperature */}
              <div className="p-2 sm:p-2.5 rounded-xl bg-rose-50/30 dark:bg-rose-950/20 border border-rose-100/80 dark:border-rose-900/40 flex flex-col justify-between min-w-0">
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="w-6 h-6 rounded-md bg-rose-100 dark:bg-rose-900/60 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                    <Thermometer className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[10px] font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap">
                    Temperature
                  </span>
                </div>
                <div className="flex items-baseline gap-1 my-0.5">
                  <span className="text-sm sm:text-base font-bold font-mono text-slate-900 dark:text-white leading-none">
                    {sensorValues.temperature ?? 20.6}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">°C</span>
                </div>
                {/* SVG Mini Coral Sparkline */}
                <div className="w-full h-4 my-1 opacity-75">
                  <svg viewBox="0 0 100 24" className="w-full h-full stroke-rose-500 fill-none" strokeWidth="2">
                    <path d="M 0 14 Q 30 18 50 10 T 80 12 T 100 8" />
                  </svg>
                </div>
                <div className="flex items-center justify-between text-[9px] pt-1">
                  <span className="inline-flex items-center gap-1 text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Live
                  </span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">Normal</span>
                </div>
              </div>

              {/* 6. Humidity */}
              <div className="p-2 sm:p-2.5 rounded-xl bg-purple-50/30 dark:bg-purple-950/20 border border-purple-100/80 dark:border-purple-900/40 flex flex-col justify-between min-w-0">
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="w-6 h-6 rounded-md bg-purple-100 dark:bg-purple-900/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                    <Wind className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[10px] font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap">
                    Humidity
                  </span>
                </div>
                <div className="flex items-baseline gap-1 my-0.5">
                  <span className="text-sm sm:text-base font-bold font-mono text-slate-900 dark:text-white leading-none">
                    {sensorValues.humidity ?? 73.7}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">%</span>
                </div>
                {/* SVG Mini Purple Sparkline */}
                <div className="w-full h-4 my-1 opacity-75">
                  <svg viewBox="0 0 100 24" className="w-full h-full stroke-purple-500 fill-none" strokeWidth="2">
                    <path d="M 0 10 Q 25 6 50 14 T 75 8 T 100 12" />
                  </svg>
                </div>
                <div className="flex items-center justify-between text-[9px] pt-1">
                  <span className="inline-flex items-center gap-1 text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Live
                  </span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">Normal</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Right: Contributing Factors (Feature Importance) (xl:col-span-4) */}
        <div className="xl:col-span-4 p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex flex-col justify-between min-w-0">
          <div>
            <div className="flex items-center gap-1.5 mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-500" />
              <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-heading">
                Contributing Factors
              </span>
              <span className="text-[10px] text-slate-400 font-medium">
                (Feature Importance)
              </span>
            </div>

            {/* 6 Horizontal Feature Importance Bars */}
            <div className="space-y-2">
              {contributingFactors.map((factor, idx) => {
                const Icon = factor.icon;
                return (
                  <div key={idx} className="flex items-center gap-2 text-xs">
                    <div className="flex items-center gap-1.5 w-26 shrink-0 min-w-0">
                      <Icon className={`w-3.5 h-3.5 shrink-0 ${factor.textColor}`} />
                      <span className="text-[11px] font-medium text-slate-600 dark:text-slate-300 truncate">
                        {factor.name}
                      </span>
                    </div>

                    <div className="flex-1 h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${factor.barColor}`} 
                        style={{ width: `${factor.pct * 2.5}%` }}
                      />
                    </div>

                    <span className="text-[10.5px] font-mono font-bold text-slate-700 dark:text-slate-300 w-7 text-right shrink-0">
                      {factor.pct}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 4. BOTTOM TRIO: MODEL STATUS + ANALYSIS TIMELINE + RECENT ALERTS */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 items-stretch min-w-0">
        
        {/* Card 1: Model Status */}
        <div className="p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex flex-col justify-between min-w-0">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <div className="flex items-center gap-1.5 min-w-0">
                <Cpu className="w-3.5 h-3.5 text-sky-500" />
                <span className="text-xs font-bold text-slate-800 dark:text-white font-heading truncate">
                  Model Status
                </span>
              </div>
              <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 shrink-0">
                Prototype Model
              </span>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Model:</span>
                <span className="font-bold text-slate-800 dark:text-white font-mono text-[10.5px]">
                  Random Forest + LSTM / GRU
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Status:</span>
                <span className="inline-flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Active
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Last Inference:</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">Just now</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Next Evaluation:</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">3 seconds</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Mode:</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">Real-time Prediction</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Analysis Timeline (Live) */}
        <div className="p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex flex-col justify-between min-w-0">
          <div>
            <div className="flex items-center gap-1.5 mb-3">
              <Clock3 className="w-3.5 h-3.5 text-sky-500" />
              <span className="text-xs font-bold text-slate-800 dark:text-white font-heading">
                Analysis Timeline
              </span>
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                (Live)
              </span>
            </div>

            {/* 4-Step Connected Workflow */}
            <div className="relative pt-2 pb-1">
              {/* Connecting line */}
              <div className="absolute top-5 left-4 right-4 h-0.5 bg-sky-500/40 -z-0" />

              <div className="grid grid-cols-4 gap-1 text-center relative z-10">
                {/* Step 1 */}
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full bg-sky-500 text-white flex items-center justify-center text-[10px] shadow-sm mb-1">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <div className="text-[9.5px] font-bold text-slate-800 dark:text-white leading-tight">
                    Sensor Data Received
                  </div>
                  <div className="text-[8.5px] text-slate-400 mt-0.5">Just now</div>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full bg-sky-500 text-white flex items-center justify-center text-[10px] shadow-sm mb-1">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <div className="text-[9.5px] font-bold text-slate-800 dark:text-white leading-tight">
                    Features Processed
                  </div>
                  <div className="text-[8.5px] text-slate-400 mt-0.5">Just now</div>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full bg-sky-500 text-white flex items-center justify-center text-[10px] shadow-sm mb-1">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <div className="text-[9.5px] font-bold text-slate-800 dark:text-white leading-tight">
                    Risk Evaluated
                  </div>
                  <div className="text-[8.5px] text-slate-400 mt-0.5">Just now</div>
                </div>

                {/* Step 4: Active now */}
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full bg-sky-500 text-white flex items-center justify-center text-[10px] shadow-sm mb-1 ring-2 ring-sky-300 dark:ring-sky-700">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <div className="text-[9.5px] font-bold text-slate-800 dark:text-white leading-tight">
                    Prediction Updated
                  </div>
                  <div className="inline-block mt-0.5 px-1 py-0.2 rounded-full text-[8px] font-bold bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-400 border border-sky-200 dark:border-sky-800">
                    Active now
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Recent Alerts & Insights */}
        <div className="p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex flex-col justify-between min-w-0">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-1.5 min-w-0">
                <Bell className="w-3.5 h-3.5 text-rose-500" />
                <span className="text-xs font-bold text-slate-800 dark:text-white font-heading truncate">
                  Recent Alerts & Insights
                </span>
              </div>
              <span className="text-[10px] font-semibold text-sky-600 dark:text-sky-400 hover:underline cursor-pointer inline-flex items-center gap-0.5">
                View All <ArrowRight className="w-2.5 h-2.5" />
              </span>
            </div>

            <div className="space-y-1.5 text-[11px]">
              <div className="flex items-start gap-1.5">
                <Info className="w-3.5 h-3.5 text-sky-500 shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1 flex items-baseline justify-between gap-1">
                  <span className="text-slate-700 dark:text-slate-300 truncate">
                    Risk level remains SAFE.
                  </span>
                  <span className="text-[9.5px] text-slate-400 shrink-0">2 min ago</span>
                </div>
              </div>

              <div className="flex items-start gap-1.5">
                <Info className="w-3.5 h-3.5 text-sky-500 shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1 flex items-baseline justify-between gap-1">
                  <span className="text-slate-700 dark:text-slate-300 truncate">
                    No significant change in sensor readings.
                  </span>
                  <span className="text-[9.5px] text-slate-400 shrink-0">5 min ago</span>
                </div>
              </div>

              <div className="flex items-start gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1 flex items-baseline justify-between gap-1">
                  <span className="text-slate-700 dark:text-slate-300 truncate">
                    Slight increase in soil moisture, within normal range.
                  </span>
                  <span className="text-[9.5px] text-slate-400 shrink-0">12 min ago</span>
                </div>
              </div>

              <div className="flex items-start gap-1.5">
                <Info className="w-3.5 h-3.5 text-sky-500 shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1 flex items-baseline justify-between gap-1">
                  <span className="text-slate-700 dark:text-slate-300 truncate">
                    AI model confidence stable at 87%.
                  </span>
                  <span className="text-[9.5px] text-slate-400 shrink-0">18 min ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 5. PROTOTYPE DATA DISCLAIMER FOOTNOTE */}
      {/* ========================================================================= */}
      <div className="pt-2 text-[9px] text-slate-400 dark:text-slate-500 text-center leading-tight">
        Prototype AI analysis. Predictions are for research/demo purposes and should not be interpreted as guaranteed landslide forecasts.
      </div>

      {/* Expanded Fullscreen Map Modal */}
      {showMapModal && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setShowMapModal(false)}
        >
          <div 
            className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden p-4 sm:p-6 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-sky-500" />
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-heading">
                  Terrain Risk Map (AI Analysis) — High Resolution Orthophoto
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowMapModal(false)}
                className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center text-sm font-bold transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="relative w-full aspect-square sm:aspect-[4/3] max-h-[65vh] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-inner bg-slate-950">
              <img 
                src={aiTerrainRiskMapImg} 
                alt="Terrain Risk Map High Res" 
                className="w-full h-full object-cover object-center"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs text-slate-500">
              <div className="flex items-center gap-2 w-full sm:w-64">
                <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">Low</span>
                <div className="h-2 flex-1 rounded-full bg-gradient-to-r from-emerald-500 via-yellow-400 via-orange-500 to-rose-600" />
                <span className="text-[10px] font-semibold text-rose-600 dark:text-rose-400">High</span>
              </div>
              <span className="text-[11px] text-slate-400">
                AI Deep Learning Hazard Surface · Multi-band Satellite Telemetry
              </span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AiPredictionCard;

