import React, { useState, useMemo } from 'react';
import { 
  Droplets, 
  CloudRain, 
  Thermometer, 
  Wind, 
  BarChart3, 
  TrendingUp,
  Leaf,
  ShieldCheck,
  CheckCircle2,
  Lightbulb
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Bar,
  Line,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceArea,
  ReferenceLine
} from 'recharts';
import { DETAILED_ENV_SERIES_24H } from '../../data/mockHistoricalData';

// 1. Time-series historical datasets (24H default matching reference)
const SERIES_24H = [
  { time: '00:00', moisture: 38.2, rainfall: 0.0, temperature: 18.2, humidity: 68.5 },
  { time: '02:00', moisture: 38.6, rainfall: 0.0, temperature: 17.5, humidity: 70.2 },
  { time: '04:00', moisture: 39.0, rainfall: 0.2, temperature: 17.8, humidity: 72.0 },
  { time: '06:00', moisture: 39.8, rainfall: 0.8, temperature: 18.5, humidity: 74.5 },
  { time: '08:00', moisture: 40.5, rainfall: 1.5, temperature: 19.8, humidity: 75.8 },
  { time: '10:00', moisture: 41.5, rainfall: 3.2, temperature: 21.0, humidity: 74.0 },
  { time: '12:00', moisture: 42.8, rainfall: 5.5, temperature: 22.5, humidity: 71.5 },
  { time: '14:00', moisture: 43.8, rainfall: 11.2, temperature: 22.8, humidity: 72.1 }, // Tooltip anchor in reference
  { time: '16:00', moisture: 43.2, rainfall: 13.0, temperature: 22.0, humidity: 73.6 },
  { time: '18:00', moisture: 42.9, rainfall: 14.5, temperature: 21.2, humidity: 75.0 },
  { time: '20:00', moisture: 42.7, rainfall: 14.5, temperature: 20.4, humidity: 77.2 },
  { time: '22:00', moisture: 42.5, rainfall: 14.5, temperature: 19.6, humidity: 78.4 },
  { time: 'Now',   moisture: 42.4, rainfall: 12.0, temperature: 21.6, humidity: 72.1 },
];

const SERIES_1H = [
  { time: '-60m', moisture: 42.2, rainfall: 11.5, temperature: 21.4, humidity: 71.8 },
  { time: '-45m', moisture: 42.3, rainfall: 11.7, temperature: 21.5, humidity: 71.9 },
  { time: '-30m', moisture: 42.3, rainfall: 11.8, temperature: 21.5, humidity: 72.0 },
  { time: '-15m', moisture: 42.4, rainfall: 12.0, temperature: 21.6, humidity: 72.1 },
  { time: 'Now',  moisture: 42.4, rainfall: 12.0, temperature: 21.6, humidity: 72.1 },
];

const SERIES_6H = [
  { time: '08:00', moisture: 40.5, rainfall: 1.5, temperature: 19.8, humidity: 75.8 },
  { time: '10:00', moisture: 41.5, rainfall: 3.2, temperature: 21.0, humidity: 74.0 },
  { time: '12:00', moisture: 42.8, rainfall: 5.5, temperature: 22.5, humidity: 71.5 },
  { time: '14:00', moisture: 43.8, rainfall: 11.2, temperature: 22.8, humidity: 72.1 },
  { time: 'Now',   moisture: 42.4, rainfall: 12.0, temperature: 21.6, humidity: 72.1 },
];

const SERIES_7D = [
  { time: 'Day 1', moisture: 34.5, rainfall: 4.2, temperature: 20.1, humidity: 65.0 },
  { time: 'Day 2', moisture: 36.2, rainfall: 8.5, temperature: 19.4, humidity: 69.4 },
  { time: 'Day 3', moisture: 39.8, rainfall: 16.0, temperature: 18.2, humidity: 76.5 },
  { time: 'Day 4', moisture: 44.1, rainfall: 22.5, temperature: 17.5, humidity: 82.0 },
  { time: 'Day 5', moisture: 43.0, rainfall: 15.0, temperature: 19.8, humidity: 78.2 },
  { time: 'Day 6', moisture: 42.6, rainfall: 12.5, temperature: 20.9, humidity: 74.5 },
  { time: 'Today', moisture: 42.4, rainfall: 12.0, temperature: 21.6, humidity: 72.1 },
];

// 2. Exact Parameter Definitions matching reference values & thresholds
const PARAMETERS_CONFIG = {
  moisture: {
    id: 'moisture',
    label: 'Soil Moisture',
    shortLabel: 'Soil Moisture',
    unit: ' %',
    dataKey: 'moisture',
    color: '#0F6B4F',
    badgeBg: '#DDF3EA',
    axisLabel: 'Soil Moisture (%)',
    baseline: 42.4,
    range24h: '38.2% – 44.1%',
    statusText: 'Normal',
    changeText: '+2.1%',
    changeIsPositive: true,
    changeContext: 'vs previous reading',
    changeComparison: 'Higher than previous day',
    trend: 'Increasing',
    trendDesc: 'Steady rise in last 24 hours',
    currentDesc: 'Within normal range',
    thresholds: {
      normalMax: 60,
      elevatedMax: 75,
      max: 100,
      ruleText: 'Normal: 0–60%   Elevated: >60–75%   High: >75%',
      normalLabel: 'Normal  0% – 60%',
      elevatedLabel: 'Elevated  60% – 75%',
      highLabel: 'High Risk  > 75%',
      normalMaxLabel: '60% Elevated',
      elevatedMaxLabel: '75% High Risk',
      normalY: 53,
      elevatedY: 67,
      highY: 85
    },
    yDomain: [0, 100],
    yTicks: [0, 25, 50, 60, 75, 100]
  },
  rainfall: {
    id: 'rainfall',
    label: 'Rainfall',
    shortLabel: 'Rainfall',
    unit: ' mm',
    dataKey: 'rainfall',
    color: '#1597E5',
    badgeBg: '#E1F3FE',
    axisLabel: 'Precipitation (mm)',
    baseline: 12.0,
    range24h: '0.0 mm – 14.5 mm',
    statusText: 'Low',
    changeText: '-18%',
    changeIsPositive: false,
    changeContext: 'vs peak downpour',
    changeComparison: 'Lower than yesterday',
    trend: 'Decreasing',
    trendDesc: 'Runoff tapering off across sectors',
    currentDesc: 'Below critical hazard threshold',
    thresholds: {
      normalMax: 25,
      elevatedMax: 50,
      max: 60,
      ruleText: 'Normal: 0–25mm   Elevated: >25–50mm   High: >50mm',
      normalLabel: 'Normal  0 – 25mm',
      elevatedLabel: 'Elevated  25 – 50mm',
      highLabel: 'High Risk  > 50mm',
      normalMaxLabel: '25mm Elevated',
      elevatedMaxLabel: '50mm Threshold',
      normalY: 18,
      elevatedY: 38,
      highY: 55
    },
    yDomain: [0, 60],
    yTicks: [0, 10, 25, 35, 50, 60]
  },
  temperature: {
    id: 'temperature',
    label: 'Temperature',
    shortLabel: 'Temperature',
    unit: '°C',
    dataKey: 'temperature',
    color: '#F59E0B',
    badgeBg: '#FEF3C7',
    axisLabel: 'Air Temperature (°C)',
    baseline: 21.6,
    range24h: '17.5°C – 22.8°C',
    statusText: 'Optimal',
    changeText: '+1.4°C',
    changeIsPositive: true,
    changeContext: 'vs dawn minimum',
    changeComparison: 'Seasonal alpine norm',
    trend: 'Stable',
    trendDesc: 'Diurnal Himalayan mountain cycle',
    currentDesc: 'Comfortable alpine condition',
    thresholds: {
      normalMax: 28,
      elevatedMax: 35,
      max: 40,
      ruleText: 'Normal: 10–28°C   Elevated: >28–35°C   High: >35°C',
      normalLabel: 'Normal  10°C – 28°C',
      elevatedLabel: 'Elevated  28°C – 35°C',
      highLabel: 'Extreme  > 35°C',
      normalMaxLabel: '28°C Elevated',
      elevatedMaxLabel: '35°C Extreme',
      normalY: 22,
      elevatedY: 31,
      highY: 37
    },
    yDomain: [10, 40],
    yTicks: [10, 15, 20, 25, 30, 35, 40]
  },
  humidity: {
    id: 'humidity',
    label: 'Humidity',
    shortLabel: 'Humidity',
    unit: '%',
    dataKey: 'humidity',
    color: '#0d9488',
    badgeBg: '#CCFBF1',
    axisLabel: 'Relative Humidity (%)',
    baseline: 72.0,
    range24h: '68.5% – 79.0%',
    statusText: 'Normal',
    changeText: '+3.4%',
    changeIsPositive: true,
    changeContext: 'vs morning average',
    changeComparison: 'Valley condensation normal',
    trend: 'Stable',
    trendDesc: 'Balanced alpine ambient moisture',
    currentDesc: 'Optimal valley humidity',
    thresholds: {
      normalMax: 70,
      elevatedMax: 85,
      max: 100,
      ruleText: 'Normal: 30–70%   Elevated: >70–85%   High: >85%',
      normalLabel: 'Normal  30% – 70%',
      elevatedLabel: 'Elevated  70% – 85%',
      highLabel: 'Saturated  > 85%',
      normalMaxLabel: '70% Normal Max',
      elevatedMaxLabel: '85% Saturated',
      normalY: 52,
      elevatedY: 77,
      highY: 92
    },
    yDomain: [30, 100],
    yTicks: [30, 50, 70, 85, 100]
  }
};

// Clean Custom Tooltip matching reference dark popover card
const CustomTooltip = ({ active, payload, label, unit, parameterLabel, isRainfall }) => {
  if (active && payload && payload.length) {
    const dataPoint = payload[0]?.payload;
    const val = payload[0]?.value;
    const status = dataPoint?.status || 'Normal';
    return (
      <div className="bg-slate-900/95 dark:bg-slate-950/95 text-white px-3.5 py-2.5 rounded-xl shadow-xl border border-slate-700/60 backdrop-blur-md pointer-events-none z-50 min-w-[145px]">
        <div className="text-[11px] font-semibold text-slate-400 mb-1.5 font-mono flex items-center justify-between gap-2">
          <span>{label}</span>
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9.5px] font-bold bg-[#0F6B4F]/30 text-emerald-300 border border-emerald-500/30">
            {status}
          </span>
        </div>
        {isRainfall ? (
          <div className="space-y-1">
            <div className="flex items-center justify-between gap-3 text-xs">
              <span className="text-slate-300">Rate:</span>
              <span className="font-bold font-mono text-cyan-300">{dataPoint?.rainfallIntensity ?? 0} mm/h</span>
            </div>
            <div className="flex items-center justify-between gap-3 text-xs">
              <span className="text-slate-300">Total:</span>
              <span className="font-bold font-mono text-white">{dataPoint?.rainfall ?? val} mm</span>
            </div>
          </div>
        ) : (
          <div className="space-y-1">
            <div className="flex items-center justify-between gap-3 text-xs">
              <span className="text-slate-300">{parameterLabel}:</span>
              <span className="text-sm font-bold font-mono text-emerald-300">
                {val}{unit}
              </span>
            </div>
            <div className="text-[10px] text-slate-400 flex items-center gap-1">
              <span>Status:</span>
              <span className="text-emerald-400 font-semibold">{status}</span>
            </div>
          </div>
        )}
      </div>
    );
  }
  return null;
};

// Mountain Sensor Emblem SVG
const MountainSensorEmblem = () => (
  <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-[#0F6B4F]/30 flex items-center justify-center text-[#0F6B4F] dark:text-emerald-400 flex-shrink-0">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="m3 20 6.5-11L14 16l3-5 4 9H3Z" />
      <path d="M10 9V3" strokeWidth="2" />
      <path d="M8.5 4.5h3" strokeWidth="1.8" />
      <circle cx="10" cy="3" r="1" fill="currentColor" />
    </svg>
  </div>
);

export const EnvironmentalTrendsCard = ({ envSeries, sensorValues }) => {
  const [selectedParam, setSelectedParam] = useState('moisture');
  const [timeRange, setTimeRange] = useState('24H');

  const currentParam = PARAMETERS_CONFIG[selectedParam] || PARAMETERS_CONFIG.moisture;

  // Real live telemetry data binding
  const liveVal = useMemo(() => {
    if (currentParam.id === 'moisture') {
      return sensorValues?.soilMoisture?.value !== undefined ? sensorValues.soilMoisture.value : currentParam.baseline;
    }
    if (currentParam.id === 'rainfall') {
      return sensorValues?.rainfall?.value !== undefined ? sensorValues.rainfall.value : currentParam.baseline;
    }
    if (currentParam.id === 'temperature') {
      return sensorValues?.temperature?.value !== undefined ? sensorValues.temperature.value : currentParam.baseline;
    }
    if (currentParam.id === 'humidity') {
      return sensorValues?.humidity?.value !== undefined ? sensorValues.humidity.value : currentParam.baseline;
    }
    return currentParam.baseline;
  }, [sensorValues, currentParam]);

  // Canonical telemetry values for the 4 Environmental Insights metrics
  const soilMoistureVal = useMemo(() => {
    return sensorValues?.soilMoisture?.value !== undefined ? Number(sensorValues.soilMoisture.value).toFixed(1) : '42.4';
  }, [sensorValues]);

  const rainfallVal = useMemo(() => {
    return sensorValues?.rainfall?.value !== undefined ? Number(sensorValues.rainfall.value).toFixed(0) : '12';
  }, [sensorValues]);

  const temperatureVal = useMemo(() => {
    return sensorValues?.temperature?.value !== undefined ? Number(sensorValues.temperature.value).toFixed(1) : '21.6';
  }, [sensorValues]);

  const humidityVal = useMemo(() => {
    return sensorValues?.humidity?.value !== undefined ? Number(sensorValues.humidity.value).toFixed(0) : '72';
  }, [sensorValues]);

  // Dataset per time range (24H uses high-fidelity 25-point hourly series)
  const chartData = useMemo(() => {
    if (timeRange === '7D') return SERIES_7D;
    return DETAILED_ENV_SERIES_24H.map(item => {
      if (item.time === 'Now') {
        return {
          ...item,
          [currentParam.dataKey]: Number(liveVal),
          ...(currentParam.id === 'rainfall' ? { rainfall: Number(liveVal) } : {})
        };
      }
      return item;
    });
  }, [timeRange, currentParam.dataKey, currentParam.id, liveVal]);

  // Dynamically calculated Min / Avg / Max for active parameter across the series
  const activeStats = useMemo(() => {
    const key = currentParam.dataKey;
    const values = chartData.map(d => Number(d[key])).filter(v => !isNaN(v));
    if (!values.length) return { min: '0.0', max: '0.0', avg: '0.0' };
    const min = Math.min(...values);
    const max = Math.max(...values);
    const sum = values.reduce((acc, v) => acc + v, 0);
    const avg = sum / values.length;
    return {
      min: min.toFixed(1),
      max: max.toFixed(1),
      avg: avg.toFixed(1)
    };
  }, [chartData, currentParam]);

  // Dynamic icon for current selected parameter
  const CurrentParamIcon = useMemo(() => {
    switch (selectedParam) {
      case 'rainfall': return CloudRain;
      case 'temperature': return Thermometer;
      case 'humidity': return Wind;
      case 'moisture':
      default: return Droplets;
    }
  }, [selectedParam]);

  // SVG circular gauge calculation
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min(Math.max((liveVal / currentParam.thresholds.max) * 100, 0), 100);
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative rounded-2xl bg-white dark:bg-[#0c1410] border border-stone-200/90 dark:border-stone-800/80 shadow-xs overflow-hidden transition-all duration-300 h-full min-h-full flex flex-col justify-between">
      <div className="relative z-10 p-4 sm:p-6 flex flex-col flex-1 justify-between">
        
        {/* 2. HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 pb-2">
          <div className="flex items-center gap-3">
            <MountainSensorEmblem />

            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-stone-900 dark:text-white tracking-tight leading-tight">
                  Environmental Trends
                </h3>
                
                {/* Live Pill */}
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#DDF3EA] text-[#0F6B4F] dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-500/30">
                  <span className="w-2 h-2 rounded-full bg-[#0F6B4F] dark:bg-emerald-400 animate-pulse" />
                  LIVE
                </span>

                <span className="text-xs text-stone-400 dark:text-stone-500 font-sans">
                  Updated just now
                </span>
              </div>
              
              <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1 font-sans">
                Live environmental telemetry & 24-hour trend analysis
              </p>
            </div>
          </div>

          {/* Time Range Buttons (1H, 6H, 24H, 7D) */}
          <div className="flex items-center p-1 rounded-xl bg-stone-100/90 dark:bg-stone-800/70 border border-stone-200/80 dark:border-stone-700/80 backdrop-blur-xs self-start sm:self-center flex-shrink-0">
            {['1H', '6H', '24H', '7D'].map((range) => (
              <button
                key={range}
                type="button"
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  timeRange === range
                    ? 'bg-[#0F6B4F] text-white shadow-sm'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* 3. FOUR PARAMETER BUTTONS IN SINGLE ROW */}
        <div className="mt-4 flex items-center gap-2 sm:gap-2.5 overflow-x-auto no-scrollbar pb-1">
          {/* Button 1: Soil Moisture */}
          <button
            type="button"
            onClick={() => setSelectedParam('moisture')}
            className={`flex items-center gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer border flex-shrink-0 ${
              selectedParam === 'moisture'
                ? 'bg-[#0F6B4F] text-white border-[#0F6B4F] shadow-sm shadow-emerald-900/20 ring-1 ring-[#0F6B4F]'
                : 'bg-white dark:bg-stone-900/80 text-stone-700 dark:text-stone-300 border-stone-200/90 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800/80 hover:text-stone-900'
            }`}
          >
            <Droplets className={`w-4 h-4 ${selectedParam === 'moisture' ? 'text-white' : 'text-[#0F6B4F] dark:text-emerald-400'}`} />
            <span>Soil Moisture</span>
          </button>

          {/* Button 2: Rainfall */}
          <button
            type="button"
            onClick={() => setSelectedParam('rainfall')}
            className={`flex items-center gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer border flex-shrink-0 ${
              selectedParam === 'rainfall'
                ? 'bg-[#0F6B4F] text-white border-[#0F6B4F] shadow-sm shadow-emerald-900/20 ring-1 ring-[#0F6B4F]'
                : 'bg-white dark:bg-stone-900/80 text-stone-700 dark:text-stone-300 border-stone-200/90 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800/80 hover:text-stone-900'
            }`}
          >
            <CloudRain className={`w-4 h-4 ${selectedParam === 'rainfall' ? 'text-white' : 'text-blue-500'}`} />
            <span>Rainfall</span>
          </button>

          {/* Button 3: Temperature */}
          <button
            type="button"
            onClick={() => setSelectedParam('temperature')}
            className={`flex items-center gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer border flex-shrink-0 ${
              selectedParam === 'temperature'
                ? 'bg-[#0F6B4F] text-white border-[#0F6B4F] shadow-sm shadow-emerald-900/20 ring-1 ring-[#0F6B4F]'
                : 'bg-white dark:bg-stone-900/80 text-stone-700 dark:text-stone-300 border-stone-200/90 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800/80 hover:text-stone-900'
            }`}
          >
            <Thermometer className={`w-4 h-4 ${selectedParam === 'temperature' ? 'text-white' : 'text-amber-500'}`} />
            <span>Temperature</span>
          </button>

          {/* Button 4: Humidity */}
          <button
            type="button"
            onClick={() => setSelectedParam('humidity')}
            className={`flex items-center gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer border flex-shrink-0 ${
              selectedParam === 'humidity'
                ? 'bg-[#0F6B4F] text-white border-[#0F6B4F] shadow-sm shadow-emerald-900/20 ring-1 ring-[#0F6B4F]'
                : 'bg-white dark:bg-stone-900/80 text-stone-700 dark:text-stone-300 border-stone-200/90 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800/80 hover:text-stone-900'
            }`}
          >
            <Wind className={`w-4 h-4 ${selectedParam === 'humidity' ? 'text-white' : 'text-teal-500'}`} />
            <span>Humidity</span>
          </button>
        </div>

        {/* 4. CURRENT VALUE AREA + 24H RANGE + CIRCULAR GAUGE */}
        <div className="mt-4 p-3.5 sm:p-4 rounded-2xl bg-stone-50/80 dark:bg-stone-900/50 border border-stone-200/80 dark:border-stone-800/80 space-y-3">
          
          {/* Row 1: Left Metric & Right Circular Gauge */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#DDF3EA] dark:bg-emerald-950/60 border border-emerald-500/20 flex items-center justify-center text-[#0F6B4F] dark:text-emerald-400 flex-shrink-0 shadow-xs">
                <CurrentParamIcon className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] sm:text-[10.5px] font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider block">
                  {currentParam.label}
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-2xl sm:text-3xl font-black font-mono text-stone-900 dark:text-white tracking-tight">
                    {liveVal}
                  </span>
                  <span className="text-base sm:text-lg font-semibold text-stone-500 dark:text-stone-400">
                    {currentParam.unit}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#DDF3EA] text-[#0F6B4F] dark:bg-emerald-950/70 dark:text-emerald-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0F6B4F] dark:bg-emerald-400" />
                    {currentParam.statusText}
                  </span>
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                    ↗ {currentParam.changeText}
                  </span>
                  <span className="text-[11px] text-stone-400 dark:text-stone-500 font-sans hidden sm:inline">
                    {currentParam.changeContext}
                  </span>
                </div>
              </div>
            </div>

            {/* Circular Gauge (explicit width/height to guarantee no responsive overflow) */}
            <div className="relative w-20 h-20 sm:w-[84px] sm:h-[84px] flex-shrink-0 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 76 76">
                <circle
                  cx="38"
                  cy="38"
                  r={radius}
                  stroke="#e2e8f0"
                  strokeWidth="6"
                  fill="none"
                  className="dark:stroke-stone-800"
                />
                <circle
                  cx="38"
                  cy="38"
                  r={radius}
                  stroke="#0F6B4F"
                  strokeWidth="6"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="none"
                  className="transition-all duration-700 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-1 select-none">
                <span className="text-xs sm:text-sm font-bold font-mono text-stone-900 dark:text-white leading-tight">
                  {liveVal}{currentParam.unit.trim()}
                </span>
                <span className="text-[8.5px] sm:text-[9px] text-stone-500 dark:text-stone-400 leading-tight mt-0.5">
                  {currentParam.shortLabel}
                </span>
              </div>
            </div>
          </div>

          {/* Row 2: 24H Range & Threshold Rules with Divider */}
          <div className="flex items-center gap-3 pt-2.5 border-t border-stone-200/70 dark:border-stone-800/70">
            <div className="w-8 h-8 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400 flex-shrink-0">
              <BarChart3 className="w-4.5 h-4.5" />
            </div>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5 min-w-0 flex-1">
              <div className="flex items-baseline gap-2">
                <span className="text-[10px] font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                  24H RANGE
                </span>
                <span className="text-base font-bold font-mono text-stone-900 dark:text-white">
                  {currentParam.range24h}
                </span>
              </div>
              <div className="text-[10.5px] text-stone-500 dark:text-stone-400 font-sans">
                {currentParam.thresholds.ruleText}
              </div>
            </div>
          </div>

        </div>

        {/* 5. ADVANCED TELEMETRY GRAPH & CONTROLS */}
        <div className="mt-4 p-3.5 sm:p-4 rounded-2xl bg-stone-50/60 dark:bg-stone-900/40 border border-stone-200/80 dark:border-stone-800/80">
          
          {/* Dedicated Chart Header with Live Indicator & Analytics Strip */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-stone-200/70 dark:border-stone-800/70">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-bold text-stone-900 dark:text-white font-heading">
                  {currentParam.label} Trend
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-md font-medium text-stone-500 dark:text-stone-400 bg-stone-200/70 dark:bg-stone-800 font-sans">
                  {timeRange === '7D' ? '7 Days' : '24 Hours'}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#DDF3EA] text-[#0F6B4F] dark:bg-emerald-950/70 dark:text-emerald-300 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0F6B4F] dark:bg-emerald-400 animate-pulse" />
                  LIVE
                </span>
              </div>
              <p className="text-[10.5px] text-stone-500 dark:text-stone-400 mt-0.5 font-sans">
                {currentParam.trendDesc} • 24H telemetry stream
              </p>
            </div>

            {/* Dynamic Analytics Strip: Min | Avg | Max */}
            <div className="flex items-center gap-2 sm:gap-3 px-3 py-1.5 rounded-xl bg-white dark:bg-stone-800/90 border border-stone-200/80 dark:border-stone-700/80 shadow-xs self-start sm:self-auto">
              <div className="flex items-baseline gap-1">
                <span className="text-[9px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wider">MIN</span>
                <span className="text-xs font-mono font-bold text-stone-800 dark:text-stone-200">
                  {activeStats.min}{currentParam.unit.trim()}
                </span>
              </div>
              <span className="text-stone-300 dark:text-stone-700 text-xs">|</span>
              <div className="flex items-baseline gap-1">
                <span className="text-[9px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wider">AVG</span>
                <span className="text-xs font-mono font-bold text-[#0F6B4F] dark:text-emerald-400">
                  {activeStats.avg}{currentParam.unit.trim()}
                </span>
              </div>
              <span className="text-stone-300 dark:text-stone-700 text-xs">|</span>
              <div className="flex items-baseline gap-1">
                <span className="text-[9px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wider">MAX</span>
                <span className="text-xs font-mono font-bold text-stone-800 dark:text-stone-200">
                  {activeStats.max}{currentParam.unit.trim()}
                </span>
              </div>
            </div>
          </div>

          {/* Telemetry Chart */}
          <div className="mt-3 relative w-full h-64 sm:h-72 min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              {selectedParam === 'rainfall' ? (
                <ComposedChart data={chartData} margin={{ top: 15, right: 48, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="rainfallAreaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0F6B4F" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#0F6B4F" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>

                  {/* Threshold Background Bands */}
                  <ReferenceArea 
                    y1={0} 
                    y2={currentParam.thresholds.normalMax} 
                    fill="#0F6B4F" 
                    fillOpacity={0.03} 
                  />
                  <ReferenceArea 
                    y1={currentParam.thresholds.normalMax} 
                    y2={currentParam.thresholds.elevatedMax} 
                    fill="#F59E0B" 
                    fillOpacity={0.05} 
                  />

                  {/* Threshold Lines with Right-side Labels */}
                  <ReferenceLine 
                    y={currentParam.thresholds.normalMax} 
                    stroke="#10b981" 
                    strokeDasharray="4 4" 
                    strokeOpacity={0.6}
                    label={{
                      value: currentParam.thresholds.normalMaxLabel,
                      position: 'insideTopRight',
                      fill: '#10b981',
                      fontSize: 9.5,
                      fontWeight: 600,
                      dy: -6,
                      dx: -2
                    }}
                  />
                  <ReferenceLine 
                    y={currentParam.thresholds.elevatedMax} 
                    stroke="#f59e0b" 
                    strokeDasharray="4 4" 
                    strokeOpacity={0.6}
                    label={{
                      value: currentParam.thresholds.elevatedMaxLabel,
                      position: 'insideTopRight',
                      fill: '#f59e0b',
                      fontSize: 9.5,
                      fontWeight: 600,
                      dy: -6,
                      dx: -2
                    }}
                  />

                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-stone-800" vertical={false} />

                  <XAxis 
                    dataKey="time" 
                    ticks={timeRange === '7D' ? undefined : ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', 'Now']}
                    interval={0}
                    stroke="#94a3b8" 
                    className="dark:stroke-stone-600"
                    tick={{ fontSize: 9, fill: '#94a3b8' }}
                    dy={3}
                    tickLine={false} 
                    axisLine={{ stroke: '#cbd5e1' }}
                  />

                  {/* Left Y-Axis for Cumulative Rainfall */}
                  <YAxis 
                    yAxisId="cumulative"
                    domain={currentParam.yDomain} 
                    ticks={currentParam.yTicks}
                    stroke="#94a3b8" 
                    className="dark:stroke-stone-600"
                    fontSize={10.5} 
                    tickLine={false} 
                    axisLine={{ stroke: '#cbd5e1' }}
                    label={{ 
                      value: currentParam.axisLabel, 
                      angle: -90, 
                      position: 'insideLeft', 
                      offset: 15,
                      fontSize: 10,
                      fill: '#94a3b8' 
                    }}
                  />

                  {/* Right Y-Axis for Rain Intensity (bars) */}
                  <YAxis 
                    yAxisId="intensity"
                    orientation="right"
                    domain={[0, 8]}
                    hide
                  />

                  <Tooltip 
                    content={
                      <CustomTooltip 
                        unit={currentParam.unit} 
                        parameterLabel={currentParam.label} 
                        isRainfall={true}
                      />
                    }
                    cursor={{ stroke: '#64748b', strokeDasharray: '3 3', strokeWidth: 1.2 }}
                  />

                  {/* Intensity Bars */}
                  <Bar 
                    yAxisId="intensity"
                    dataKey="rainfallIntensity" 
                    fill="#38bdf8" 
                    fillOpacity={0.35} 
                    radius={[2, 2, 0, 0]} 
                    maxBarSize={12} 
                  />

                  {/* Cumulative Rainfall Line */}
                  <Line 
                    yAxisId="cumulative"
                    type="monotone" 
                    dataKey="rainfall" 
                    stroke="#0F6B4F" 
                    strokeWidth={2.4} 
                    dot={{ r: 3, fill: "#ffffff", stroke: "#0F6B4F", strokeWidth: 2 }}
                    activeDot={{ r: 5.5, fill: "#0F6B4F", stroke: "#ffffff", strokeWidth: 2 }}
                  />
                </ComposedChart>
              ) : (
                <AreaChart data={chartData} margin={{ top: 15, right: 48, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="paramAreaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={currentParam.color} stopOpacity={0.32} />
                      <stop offset="95%" stopColor={currentParam.color} stopOpacity={0.02} />
                    </linearGradient>
                  </defs>

                  {/* Threshold Background Bands */}
                  <ReferenceArea 
                    y1={currentParam.yDomain[0]} 
                    y2={currentParam.thresholds.normalMax} 
                    fill="#0F6B4F" 
                    fillOpacity={0.035} 
                  />
                  <ReferenceArea 
                    y1={currentParam.thresholds.normalMax} 
                    y2={currentParam.thresholds.elevatedMax} 
                    fill="#F59E0B" 
                    fillOpacity={0.05} 
                  />
                  <ReferenceArea 
                    y1={currentParam.thresholds.elevatedMax} 
                    y2={currentParam.thresholds.max} 
                    fill="#EF4444" 
                    fillOpacity={0.05} 
                  />

                  {/* Threshold Horizontal Reference Lines with Right-side Labels */}
                  <ReferenceLine 
                    y={currentParam.thresholds.normalMax} 
                    stroke="#10b981" 
                    strokeDasharray="4 4" 
                    strokeOpacity={0.65}
                    label={{
                      value: currentParam.thresholds.normalMaxLabel,
                      position: 'insideTopRight',
                      fill: '#10b981',
                      fontSize: 9.5,
                      fontWeight: 600,
                      dy: -6,
                      dx: -2
                    }}
                  />
                  <ReferenceLine 
                    y={currentParam.thresholds.elevatedMax} 
                    stroke="#f59e0b" 
                    strokeDasharray="4 4" 
                    strokeOpacity={0.65}
                    label={{
                      value: currentParam.thresholds.elevatedMaxLabel,
                      position: 'insideTopRight',
                      fill: '#f59e0b',
                      fontSize: 9.5,
                      fontWeight: 600,
                      dy: -6,
                      dx: -2
                    }}
                  />

                  {/* Dotted Grid */}
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-stone-800" vertical={false} />

                  {/* X-Axis */}
                  <XAxis 
                    dataKey="time" 
                    ticks={timeRange === '7D' ? undefined : ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', 'Now']}
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
                    domain={currentParam.yDomain} 
                    ticks={currentParam.yTicks}
                    stroke="#94a3b8" 
                    className="dark:stroke-stone-600"
                    fontSize={10.5} 
                    tickLine={false} 
                    axisLine={{ stroke: '#cbd5e1' }}
                    label={{ 
                      value: currentParam.axisLabel, 
                      angle: -90, 
                      position: 'insideLeft', 
                      offset: 15,
                      fontSize: 10,
                      fill: '#94a3b8' 
                    }}
                  />

                  {/* Interactive Tooltip */}
                  <Tooltip 
                    content={
                      <CustomTooltip 
                        unit={currentParam.unit} 
                        parameterLabel={currentParam.label} 
                      />
                    }
                    cursor={{ stroke: '#64748b', strokeDasharray: '3 3', strokeWidth: 1.2 }}
                  />

                  {/* Area & Line */}
                  <Area 
                    type="monotone" 
                    dataKey={currentParam.dataKey} 
                    stroke={currentParam.color} 
                    strokeWidth={2.4} 
                    fillOpacity={1} 
                    fill="url(#paramAreaGrad)" 
                    dot={{ r: 3, fill: "#ffffff", stroke: currentParam.color, strokeWidth: 2 }}
                    activeDot={{ r: 5.5, fill: currentParam.color, stroke: "#ffffff", strokeWidth: 2 }}
                  />
                </AreaChart>
              )}
            </ResponsiveContainer>

            {/* Pinned Current Value Badge on the Right Margin */}
            <div className="absolute right-0 sm:right-1 top-[54%] -translate-y-1/2 pointer-events-none z-10">
              <span 
                className="px-2 py-0.5 rounded-full text-[10px] font-bold font-mono text-white shadow-sm border"
                style={{ backgroundColor: currentParam.color, borderColor: `${currentParam.color}80` }}
              >
                {liveVal}{currentParam.unit.trim()}
              </span>
            </div>
          </div>
        </div>

        {/* 6. BOTTOM THREE SUMMARY CARDS */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
          
          {/* Card 1: CURRENT */}
          <div className="relative p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#DDF3EA] dark:bg-emerald-950/60 border border-emerald-500/20 flex items-center justify-center text-[#0F6B4F] dark:text-emerald-400 flex-shrink-0">
              <Droplets className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider block">
                CURRENT
              </span>
              <div className="text-lg sm:text-xl font-bold font-mono text-stone-900 dark:text-white tracking-tight mt-0.5 leading-none">
                {liveVal} {currentParam.unit.trim()}
              </div>
              <span className="text-[10.5px] sm:text-xs text-stone-500 dark:text-stone-400 block font-sans mt-1 leading-tight">
                {currentParam.currentDesc}
              </span>
            </div>
          </div>

          {/* Card 2: 24H CHANGE */}
          <div className="relative p-3 sm:p-3.5 rounded-2xl bg-cyan-50/40 dark:bg-cyan-950/20 border border-cyan-100 dark:border-cyan-900/40 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-100/60 dark:bg-cyan-900/40 border border-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400 flex-shrink-0">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1 pr-6">
              <span className="text-[10px] font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider block">
                24H CHANGE
              </span>
              <div className="text-lg sm:text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400 tracking-tight mt-0.5 leading-none">
                {currentParam.changeText}
              </div>
              <span className="text-[10.5px] sm:text-xs text-stone-500 dark:text-stone-400 block font-sans mt-1 leading-tight">
                {currentParam.changeComparison}
              </span>
            </div>

            {/* Upward Chart Graphic positioned in top right of card */}
            <div className="absolute top-3 right-3 pointer-events-none">
              <svg viewBox="0 0 28 16" fill="none" className="w-7 h-4 text-emerald-500" aria-hidden="true">
                <path d="M2 14 L10 9 L16 11 L26 3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                <polyline points="20,3 26,3 26,9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* Card 3: TREND */}
          <div className="relative p-3 sm:p-3.5 rounded-2xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100/60 dark:bg-emerald-900/40 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 flex-shrink-0">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1 pr-7">
              <span className="text-[10px] font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider block">
                TREND
              </span>
              <div className="text-lg sm:text-xl font-bold text-emerald-700 dark:text-emerald-400 tracking-tight mt-0.5 leading-none">
                {currentParam.trend}
              </div>
              <span className="text-[10.5px] sm:text-xs text-stone-500 dark:text-stone-400 block font-sans mt-1 leading-tight">
                {currentParam.trendDesc}
              </span>
            </div>

            {/* Smooth Wavy Trend Graphic positioned in top right of card */}
            <div className="absolute top-3 right-3 pointer-events-none">
              <svg viewBox="0 0 32 16" fill="none" className="w-7 h-4 text-emerald-500" aria-hidden="true">
                <path d="M2 13 C8 14, 11 9, 16 11 C21 13, 24 6 30 3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                <polyline points="24,3 30,3 30,8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

        </div>

        {/* 7. ENVIRONMENTAL INSIGHTS (Filling vertical space naturally with compact telemetry overview) */}
        <div className="mt-4 p-4 rounded-2xl bg-white dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 shadow-xs flex flex-col flex-1 justify-between space-y-3.5">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-stone-100 dark:border-stone-800/60">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#E8F7EF] dark:bg-emerald-950/60 border border-emerald-500/20 flex items-center justify-center text-[#0F6B4F] dark:text-emerald-400 flex-shrink-0">
                <Lightbulb className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-base font-bold font-heading text-stone-900 dark:text-white tracking-tight leading-tight">
                  Environmental Insights
                </h4>
                <p className="text-[11px] text-stone-500 dark:text-stone-400 font-sans">
                  Live sensor overview
                </p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#DDF3EA] text-[#0F6B4F] dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0F6B4F] dark:bg-emerald-400 animate-pulse" />
              Live Telemetry
            </span>
          </div>

          {/* Four Compact Metric Cards (2x2 Grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
            
            {/* Metric 1: SOIL MOISTURE */}
            <div className="p-3 rounded-xl bg-stone-50/80 dark:bg-stone-900/80 border border-stone-200/70 dark:border-stone-800/80 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-[#DDF3EA] dark:bg-emerald-950/60 text-[#0F6B4F] dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                    <Droplets className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[10px] font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider truncate">
                    SOIL MOISTURE
                  </span>
                </div>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#DDF3EA] text-[#0F6B4F] dark:bg-emerald-950/60 dark:text-emerald-300 flex-shrink-0">
                  Normal
                </span>
              </div>
              <div className="flex items-baseline justify-between">
                <div className="text-lg font-bold font-mono text-stone-900 dark:text-white leading-none">
                  {soilMoistureVal}%
                </div>
                <span className="text-[10px] text-stone-400 dark:text-stone-500">
                  Safe: 0–60%
                </span>
              </div>
              {/* Horizontal Progress / Health Bar */}
              <div className="w-full h-1.5 bg-stone-200/80 dark:bg-stone-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#0F6B4F] dark:bg-emerald-500 rounded-full transition-all duration-500" 
                  style={{ width: `${Math.min((Number(soilMoistureVal) / 100) * 100, 100)}%` }}
                />
              </div>
            </div>

            {/* Metric 2: RAINFALL */}
            <div className="p-3 rounded-xl bg-stone-50/80 dark:bg-stone-900/80 border border-stone-200/70 dark:border-stone-800/80 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
                    <CloudRain className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[10px] font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider truncate">
                    RAINFALL
                  </span>
                </div>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EAF4FB] text-[#3B82C4] dark:bg-cyan-950/60 dark:text-cyan-300 flex-shrink-0">
                  Low
                </span>
              </div>
              <div className="flex items-baseline justify-between">
                <div className="text-lg font-bold font-mono text-stone-900 dark:text-white leading-none">
                  {rainfallVal} mm
                </div>
                <span className="text-[10px] text-stone-400 dark:text-stone-500">
                  Threshold: 50 mm
                </span>
              </div>
              {/* Horizontal Progress / Health Bar */}
              <div className="w-full h-1.5 bg-stone-200/80 dark:bg-stone-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-cyan-500 rounded-full transition-all duration-500" 
                  style={{ width: `${Math.min((Number(rainfallVal) / 50) * 100, 100)}%` }}
                />
              </div>
            </div>

            {/* Metric 3: TEMPERATURE */}
            <div className="p-3 rounded-xl bg-stone-50/80 dark:bg-stone-900/80 border border-stone-200/70 dark:border-stone-800/80 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0">
                    <Thermometer className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[10px] font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider truncate">
                    TEMPERATURE
                  </span>
                </div>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#DDF3EA] text-[#0F6B4F] dark:bg-emerald-950/60 dark:text-emerald-300 flex-shrink-0">
                  Optimal
                </span>
              </div>
              <div className="flex items-baseline justify-between">
                <div className="text-lg font-bold font-mono text-stone-900 dark:text-white leading-none">
                  {temperatureVal}°C
                </div>
                <span className="text-[10px] text-stone-400 dark:text-stone-500">
                  Alpine: 10–28°C
                </span>
              </div>
              {/* Horizontal Progress / Health Bar */}
              <div className="w-full h-1.5 bg-stone-200/80 dark:bg-stone-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 rounded-full transition-all duration-500" 
                  style={{ width: `${Math.min(((Number(temperatureVal) - 5) / 30) * 100, 100)}%` }}
                />
              </div>
            </div>

            {/* Metric 4: HUMIDITY */}
            <div className="p-3 rounded-xl bg-stone-50/80 dark:bg-stone-900/80 border border-stone-200/70 dark:border-stone-800/80 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center flex-shrink-0">
                    <Wind className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[10px] font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider truncate">
                    HUMIDITY
                  </span>
                </div>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#DDF3EA] text-[#0F6B4F] dark:bg-emerald-950/60 dark:text-emerald-300 flex-shrink-0">
                  Normal
                </span>
              </div>
              <div className="flex items-baseline justify-between">
                <div className="text-lg font-bold font-mono text-stone-900 dark:text-white leading-none">
                  {humidityVal}%
                </div>
                <span className="text-[10px] text-stone-400 dark:text-stone-500">
                  Range: 40–85%
                </span>
              </div>
              {/* Horizontal Progress / Health Bar */}
              <div className="w-full h-1.5 bg-stone-200/80 dark:bg-stone-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-teal-500 rounded-full transition-all duration-500" 
                  style={{ width: `${Math.min((Number(humidityVal) / 100) * 100, 100)}%` }}
                />
              </div>
            </div>

          </div>

          {/* Environmental Observations (Structured Geotechnical Bullets) */}
          <div className="p-3.5 rounded-xl bg-stone-50/70 dark:bg-stone-900/50 border border-stone-200/60 dark:border-stone-800/60 space-y-1.5">
            <ul className="space-y-2 text-xs sm:text-[12.5px] text-stone-600 dark:text-stone-300">
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#0F6B4F] dark:bg-emerald-400 mt-1.5 flex-shrink-0" />
                <span>Soil moisture ({soilMoistureVal}%) remains within safe baseline absorption levels without pore pressure buildup.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#0F6B4F] dark:bg-emerald-400 mt-1.5 flex-shrink-0" />
                <span>Cumulative rainfall ({rainfallVal} mm) is well below the critical hydraulic triggering threshold (50 mm).</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#0F6B4F] dark:bg-emerald-400 mt-1.5 flex-shrink-0" />
                <span>Surface air temperature ({temperatureVal}°C) tracks stable diurnal alpine curves with zero freeze-thaw hazard.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#0F6B4F] dark:bg-emerald-400 mt-1.5 flex-shrink-0" />
                <span>Atmospheric humidity ({humidityVal}%) indicates balanced slope evapotranspiration across monitored nodes.</span>
              </li>
            </ul>
          </div>

          {/* Overall Environmental Condition */}
          <div className="p-3 sm:p-3.5 rounded-xl bg-[#E8F7EF]/50 dark:bg-emerald-950/20 border border-emerald-500/25 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-[#DDF3EA] dark:bg-emerald-950/70 border border-emerald-500/30 flex items-center justify-center text-[#0F6B4F] dark:text-emerald-400 flex-shrink-0">
                <ShieldCheck className="w-4.5 h-4.5" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] sm:text-[10.5px] font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                  Overall Environmental Condition
                </div>
                <div className="text-xs sm:text-[13px] font-semibold text-stone-800 dark:text-stone-200 truncate mt-0.5">
                  All atmospheric & soil parameters within safe baseline limits
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#0F6B4F] text-white dark:bg-emerald-500/20 dark:text-emerald-300 border border-emerald-500/40 shadow-xs flex-shrink-0">
              <span className="w-2 h-2 rounded-full bg-white dark:bg-emerald-400 animate-pulse" />
              <span>Normal</span>
            </div>
          </div>

        </div>

        {/* 8. FOOTER */}
        <div className="mt-4 px-4 py-2.5 rounded-xl bg-[#E8F7EF]/70 dark:bg-emerald-950/30 border border-emerald-500/20 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-stone-600 dark:text-stone-300">
          <div className="flex items-center gap-2 font-medium">
            <ShieldCheck className="w-4 h-4 text-[#0F6B4F] dark:text-emerald-400" />
            <span>Continuous monitoring. Safer mountains. Stronger communities.</span>
          </div>
          <div className="flex items-center gap-1.5 font-semibold text-[#0F6B4F] dark:text-emerald-400">
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

export default EnvironmentalTrendsCard;
