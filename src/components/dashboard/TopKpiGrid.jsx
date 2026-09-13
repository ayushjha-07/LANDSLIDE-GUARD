import React from 'react';
import { 
  RadioTower, 
  Radio, 
  ShieldCheck, 
  Shield, 
  CloudRain, 
  BarChart2, 
  Droplets, 
  TrendingUp, 
  TriangleAlert, 
  Bell, 
  Activity 
} from 'lucide-react';
import kpiSensorStation from '../../assets/kpi_sensor_station.png';
import kpiLoraGateway from '../../assets/kpi_lora_gateway.png';

export const TopKpiGrid = ({ sensorValues, riskAssessment, nodes = [] }) => {
  const isSafe = riskAssessment.riskLevel === 'SAFE';

  // Dynamic node counts if available
  const totalNodes = nodes.length || 8;
  const onlineNodes = nodes.filter(n => n.status !== 'offline').length || 7;
  const offlineNodes = totalNodes - onlineNodes;

  // Dynamic risk display
  let riskDisplay = 'LOW';
  let riskColor = 'text-sky-600 dark:text-sky-400';
  if (riskAssessment.riskLevel === 'WARNING') {
    riskDisplay = 'MODERATE';
    riskColor = 'text-amber-500 dark:text-amber-400';
  } else if (riskAssessment.riskLevel === 'HIGH RISK') {
    riskDisplay = 'HIGH';
    riskColor = 'text-orange-500 dark:text-orange-400';
  } else if (riskAssessment.riskLevel === 'CRITICAL') {
    riskDisplay = 'CRITICAL';
    riskColor = 'text-rose-500 dark:text-rose-400';
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-3.5 w-full min-w-0">
      {/* ────────────────────────────────────────────────────────── */}
      {/* KPI 1: SENSOR NODES */}
      {/* ────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-[#151D2A] border border-slate-200/80 dark:border-slate-800/80 px-3.5 py-3.5 sm:px-4 sm:py-4 flex flex-col justify-between shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 select-none group min-h-[175px]">
        {/* Header */}
        <div className="flex items-center justify-between gap-1">
          <div className="w-6 h-6 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
            <RadioTower className="w-3.5 h-3.5" />
          </div>
          <span className="text-[10px] 2xl:text-[10.5px] font-bold tracking-tight text-slate-700 dark:text-slate-200 uppercase whitespace-nowrap">
            SENSOR NODES
          </span>
          <div className="w-6 h-6 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
            <Radio className="w-3 h-3" />
          </div>
        </div>

        {/* Value */}
        <div className="my-auto pt-1">
          <div className="text-3xl sm:text-[34px] font-extrabold font-heading text-slate-900 dark:text-white leading-none tracking-tight">
            {String(totalNodes).padStart(2, '0')}
          </div>
          <div className="flex items-center gap-2 text-[10.5px] text-slate-500 dark:text-slate-400 mt-1.5">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <strong className="font-semibold text-slate-700 dark:text-slate-300">{onlineNodes} Online</strong>
            </span>
            <span className="flex items-center gap-1 text-slate-400 dark:text-slate-500">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
              <span>{offlineNodes} Offline</span>
            </span>
          </div>
        </div>

        {/* Micro Visual: Signal Bars on Left + Real Field Station Cutout on Right */}
        <div className="relative pt-2 flex items-end justify-between min-h-[46px]">
          {/* Signal bars */}
          <div className="flex items-end gap-1 pb-1">
            <div className="w-1.5 h-[10px] rounded-t-xs bg-emerald-500" />
            <div className="w-1.5 h-[15px] rounded-t-xs bg-emerald-500" />
            <div className="w-1.5 h-[20px] rounded-t-xs bg-emerald-500" />
            <div className="w-1.5 h-[24px] rounded-t-xs bg-emerald-500" />
            <div className="w-1.5 h-[28px] rounded-t-xs bg-emerald-500" />
            <div className="w-1.5 h-[18px] rounded-t-xs bg-slate-200 dark:bg-slate-700" />
          </div>

          {/* Miniature realistic field station */}
          <div className="absolute -bottom-2 -right-1 w-16 h-16 pointer-events-none select-none">
            <img 
              src={kpiSensorStation} 
              alt="Sensor Station" 
              className="w-full h-full object-contain object-bottom drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────── */}
      {/* KPI 2: CURRENT RISK */}
      {/* ────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-[#151D2A] border border-slate-200/80 dark:border-slate-800/80 px-3.5 py-3.5 sm:px-4 sm:py-4 flex flex-col justify-between shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 select-none group min-h-[175px]">
        {/* Header */}
        <div className="flex items-center justify-between gap-1">
          <div className="w-6 h-6 rounded-md bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-3.5 h-3.5" />
          </div>
          <span className="text-[10px] 2xl:text-[10.5px] font-bold tracking-tight text-slate-700 dark:text-slate-200 uppercase whitespace-nowrap">
            CURRENT RISK
          </span>
          <div className="w-6 h-6 rounded-md bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center flex-shrink-0">
            <Shield className="w-3 h-3" />
          </div>
        </div>

        {/* Value */}
        <div className="my-auto pt-1">
          <div className={`text-3xl sm:text-[34px] font-extrabold font-heading leading-none tracking-tight ${riskColor}`}>
            {riskDisplay}
          </div>
          <div className="flex items-center justify-between text-[10.5px] text-slate-500 dark:text-slate-400 mt-1.5">
            <span>Score <strong className="text-sky-600 dark:text-sky-400 font-mono font-bold">{riskAssessment.riskScore}</strong> / 100</span>
            <span className="font-semibold text-slate-600 dark:text-slate-300">{riskAssessment.trend || 'stable'}</span>
          </div>
        </div>

        {/* Micro Visual: Smooth SVG Risk Wave */}
        <div className="relative pt-2 min-h-[46px] flex items-end overflow-hidden">
          <svg className="w-full h-8 overflow-visible" viewBox="0 0 120 30" preserveAspectRatio="none">
            <defs>
              <linearGradient id="riskWaveGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0284c7" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#0284c7" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path 
              d="M0,18 C15,10 25,24 40,16 C55,8 65,22 80,18 C95,14 105,20 120,15 L120,30 L0,30 Z" 
              fill="url(#riskWaveGrad)" 
            />
            <path 
              d="M0,18 C15,10 25,24 40,16 C55,8 65,22 80,18 C95,14 105,20 120,15" 
              fill="none" 
              stroke="#0284c7" 
              strokeWidth="1.8" 
              strokeLinecap="round" 
            />
          </svg>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────── */}
      {/* KPI 3: RAINFALL */}
      {/* ────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-[#151D2A] border border-slate-200/80 dark:border-slate-800/80 px-3.5 py-3.5 sm:px-4 sm:py-4 flex flex-col justify-between shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 select-none group min-h-[175px]">
        {/* Header */}
        <div className="flex items-center justify-between gap-1">
          <div className="w-6 h-6 rounded-md bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center flex-shrink-0">
            <CloudRain className="w-3.5 h-3.5" />
          </div>
          <span className="text-[10px] 2xl:text-[10.5px] font-bold tracking-tight text-slate-700 dark:text-slate-200 uppercase whitespace-nowrap">
            RAINFALL
          </span>
          <div className="w-6 h-6 rounded-md bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center flex-shrink-0">
            <BarChart2 className="w-3 h-3" />
          </div>
        </div>

        {/* Value */}
        <div className="my-auto pt-1">
          <div className="text-3xl sm:text-[34px] font-extrabold font-heading text-slate-900 dark:text-white leading-none tracking-tight font-mono">
            {sensorValues.rainfall} <span className="text-sm font-normal text-slate-400 font-sans">mm</span>
          </div>
          <div className="flex items-center justify-between text-[10.5px] text-slate-500 dark:text-slate-400 mt-1.5">
            <span>Last 24 hours</span>
            <span className="font-semibold text-sky-600 dark:text-sky-400">&darr; 18%</span>
          </div>
        </div>

        {/* Micro Visual: Rainfall Bar Histogram */}
        <div className="pt-2 min-h-[46px] flex items-end justify-between gap-1">
          {[20, 35, 45, 30, 50, 40, 65, 90, 100, 75, 45, 25].map((height, idx) => (
            <div 
              key={idx} 
              className="flex-1 rounded-t-xs bg-gradient-to-t from-sky-500 to-sky-400/70"
              style={{ height: `${(height / 100) * 28}px` }}
            />
          ))}
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────── */}
      {/* KPI 4: SOIL MOISTURE */}
      {/* ────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-[#151D2A] border border-slate-200/80 dark:border-slate-800/80 px-3.5 py-3.5 sm:px-4 sm:py-4 flex flex-col justify-between shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 select-none group min-h-[175px]">
        {/* Header */}
        <div className="flex items-center justify-between gap-1">
          <div className="w-6 h-6 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
            <Droplets className="w-3.5 h-3.5" />
          </div>
          <span className="text-[10px] 2xl:text-[10.5px] font-bold tracking-tight text-slate-700 dark:text-slate-200 uppercase whitespace-nowrap">
            SOIL MOISTURE
          </span>
          <div className="w-6 h-6 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-3 h-3" />
          </div>
        </div>

        {/* Value */}
        <div className="my-auto pt-1">
          <div className="text-3xl sm:text-[34px] font-extrabold font-heading text-slate-900 dark:text-white leading-none tracking-tight font-mono">
            {sensorValues.moisture}%
          </div>
          <div className="flex items-center justify-between text-[10.5px] text-slate-500 dark:text-slate-400 mt-1.5">
            <span>Monitoring stable</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">&plusmn; 0.2%</span>
          </div>
        </div>

        {/* Micro Visual: Smooth Green Ascending Sparkline */}
        <div className="relative pt-2 min-h-[46px] flex items-end overflow-hidden">
          <svg className="w-full h-8 overflow-visible" viewBox="0 0 120 30" preserveAspectRatio="none">
            <defs>
              <linearGradient id="moistWaveGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path 
              d="M0,24 C20,24 30,12 50,18 C70,24 80,8 100,14 C110,18 115,10 120,6 L120,30 L0,30 Z" 
              fill="url(#moistWaveGrad)" 
            />
            <path 
              d="M0,24 C20,24 30,12 50,18 C70,24 80,8 100,14 C110,18 115,10 120,6" 
              fill="none" 
              stroke="#10b981" 
              strokeWidth="1.8" 
              strokeLinecap="round" 
            />
          </svg>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────── */}
      {/* KPI 5: ACTIVE ALERTS */}
      {/* ────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-[#151D2A] border border-slate-200/80 dark:border-slate-800/80 px-3.5 py-3.5 sm:px-4 sm:py-4 flex flex-col justify-between shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 select-none group min-h-[175px]">
        {/* Header */}
        <div className="flex items-center justify-between gap-1">
          <div className="w-6 h-6 rounded-md bg-orange-50 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center flex-shrink-0">
            <TriangleAlert className="w-3.5 h-3.5" />
          </div>
          <span className="text-[10px] 2xl:text-[10.5px] font-bold tracking-tight text-slate-700 dark:text-slate-200 uppercase whitespace-nowrap">
            ACTIVE ALERTS
          </span>
          <div className="w-6 h-6 rounded-md bg-orange-50 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center flex-shrink-0">
            <Bell className="w-3 h-3" />
          </div>
        </div>

        {/* Value */}
        <div className="my-auto pt-1">
          <div className="text-3xl sm:text-[34px] font-extrabold font-heading text-orange-600 dark:text-orange-400 leading-none tracking-tight font-mono">
            02
          </div>
          <div className="flex items-center gap-2 text-[10.5px] text-slate-500 dark:text-slate-400 mt-1.5">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <strong className="font-semibold text-slate-700 dark:text-slate-300">1 Warning</strong>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              <strong className="font-semibold text-rose-600 dark:text-rose-400">1 High Risk</strong>
            </span>
          </div>
        </div>

        {/* Micro Visual: Alert Activity Histogram Spikes */}
        <div className="pt-2 min-h-[46px] flex items-end justify-between gap-1">
          {[15, 25, 10, 45, 70, 30, 20, 60, 95, 80, 55, 75, 40, 25].map((height, idx) => (
            <div 
              key={idx} 
              className="flex-1 rounded-t-xs bg-gradient-to-t from-orange-500 to-rose-500"
              style={{ height: `${(height / 100) * 28}px` }}
            />
          ))}
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────── */}
      {/* KPI 6: LORA NETWORK */}
      {/* ────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-[#151D2A] border border-slate-200/80 dark:border-slate-800/80 px-3.5 py-3.5 sm:px-4 sm:py-4 flex flex-col justify-between shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 select-none group min-h-[175px]">
        {/* Header */}
        <div className="flex items-center justify-between gap-1">
          <div className="w-6 h-6 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center flex-shrink-0">
            <RadioTower className="w-3.5 h-3.5" />
          </div>
          <span className="text-[10px] 2xl:text-[10.5px] font-bold tracking-tight text-slate-700 dark:text-slate-200 uppercase whitespace-nowrap">
            LORA NETWORK
          </span>
          <div className="w-6 h-6 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center flex-shrink-0">
            <Activity className="w-3 h-3" />
          </div>
        </div>

        {/* Value */}
        <div className="my-auto pt-1">
          <div className="text-3xl sm:text-[34px] font-extrabold font-heading text-slate-900 dark:text-white leading-none tracking-tight font-mono">
            98.6%
          </div>
          <div className="flex items-center justify-between text-[10.5px] text-slate-500 dark:text-slate-400 mt-1.5">
            <span>Packet success</span>
            <span className="font-semibold text-sky-600 dark:text-sky-400">Healthy</span>
          </div>
        </div>

        {/* Micro Visual: Signal Bars on Left + LoRa Gateway Station Cutout on Right */}
        <div className="relative pt-2 flex items-end justify-between min-h-[46px]">
          {/* Signal bars */}
          <div className="flex items-end gap-1 pb-1">
            <div className="w-1.5 h-[8px] rounded-t-xs bg-sky-500" />
            <div className="w-1.5 h-[14px] rounded-t-xs bg-sky-500" />
            <div className="w-1.5 h-[20px] rounded-t-xs bg-sky-500" />
            <div className="w-1.5 h-[26px] rounded-t-xs bg-sky-500" />
            <div className="w-1.5 h-[30px] rounded-t-xs bg-sky-500" />
          </div>

          {/* Miniature realistic LoRa station */}
          <div className="absolute -bottom-2 -right-1 w-16 h-16 pointer-events-none select-none">
            <img 
              src={kpiLoraGateway} 
              alt="LoRa Gateway" 
              className="w-full h-full object-contain object-bottom drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopKpiGrid;

