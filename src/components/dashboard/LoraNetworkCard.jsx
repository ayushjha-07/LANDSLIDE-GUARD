import React from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from 'recharts';
import { 
  Radio, 
  Activity, 
  Server, 
  Share2, 
  FileText, 
  CheckCircle2, 
  BarChart2, 
  Wifi, 
  Info, 
  Database 
} from 'lucide-react';
import loraBannerImg from '../../assets/lora_network_banner.jpg';
import { LORA_NETWORK_DATA } from '../../data/dashboardData';

const CustomTelemetryTooltip = ({ active, payload, label, unit, color }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 rounded-lg bg-stone-900/95 text-white border border-stone-700 text-xs shadow-xl backdrop-blur-xs">
        <div className="text-[10px] text-stone-400 font-mono">{label}</div>
        <div className="font-mono font-bold mt-0.5" style={{ color: color || '#10b981' }}>
          {payload[0].value} {unit}
        </div>
      </div>
    );
  }
  return null;
};

export const LoraNetworkCard = ({ className = "" }) => {
  return (
    <div className={`w-full min-w-0 bg-white dark:bg-[#0f1713] rounded-2xl border border-stone-200/90 dark:border-stone-800/80 shadow-sm p-4 sm:p-6 transition-all ${className}`}>
      
      {/* 1. HEADER ROW */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 sm:mb-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 flex-shrink-0">
            <Radio className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-stone-900 dark:text-white tracking-tight">
              LoRa Communication
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-0.5">
              Sub-GHz RF telemetry link integrity
            </p>
          </div>
        </div>

        <div className="self-start sm:self-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-900/50 shadow-2xs">
            <Activity className="w-3.5 h-3.5 text-blue-500" />
            {LORA_NETWORK_DATA.frequency}
          </span>
        </div>
      </div>

      {/* 2. SECTION 1 — VISUAL LORA NETWORK GRAPHIC */}
      <div className="relative w-full h-[190px] sm:h-[220px] lg:h-[240px] rounded-2xl overflow-hidden border border-stone-200/90 dark:border-stone-800 shadow-sm mb-5 sm:mb-6">
        {/* Photorealistic Himalayan Landscape Image */}
        <img 
          src={loraBannerImg || '/images/lora_network_banner.jpg'} 
          alt="Himalayan LoRa Network Topology" 
          className="w-full h-full object-cover select-none pointer-events-none"
        />

        {/* Ambient Darkened Gradient for Overlay Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-black/30 pointer-events-none" />

        {/* SVG Curved Dotted Signal Communication Paths */}
        <svg 
          viewBox="0 0 1000 240" 
          preserveAspectRatio="none" 
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
        >
          <defs>
            <linearGradient id="lora-sig-green" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.85" />
            </linearGradient>
            <linearGradient id="lora-sig-amber" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.85" />
            </linearGradient>
          </defs>

          {/* Node 03 -> Gateway */}
          <path d="M 120 50 Q 340 10, 715 65" fill="none" stroke="url(#lora-sig-green)" strokeWidth="1.8" strokeDasharray="5 5" />
          {/* Node 02 -> Gateway */}
          <path d="M 235 88 Q 450 40, 715 70" fill="none" stroke="url(#lora-sig-green)" strokeWidth="1.8" strokeDasharray="5 5" />
          {/* Node 05 -> Gateway */}
          <path d="M 380 98 Q 550 110, 715 75" fill="none" stroke="url(#lora-sig-amber)" strokeWidth="1.8" strokeDasharray="5 5" />
          {/* Node 07 -> Gateway */}
          <path d="M 480 48 Q 600 35, 715 65" fill="none" stroke="url(#lora-sig-green)" strokeWidth="1.8" strokeDasharray="5 5" />
        </svg>

        {/* Station Node Overlays */}
        {/* Node 03 (Safe) */}
        <div className="absolute z-20" style={{ left: '11%', top: '20%' }}>
          <div className="px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold shadow-lg flex items-center gap-1.5 whitespace-nowrap select-none">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-xs" />
            <span>Node 03</span>
          </div>
        </div>

        {/* Node 02 (Safe) */}
        <div className="absolute z-20" style={{ left: '23%', top: '36%' }}>
          <div className="px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold shadow-lg flex items-center gap-1.5 whitespace-nowrap select-none">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-xs" />
            <span>Node 02</span>
          </div>
        </div>

        {/* Node 05 (Warning/High Risk Accent) */}
        <div className="absolute z-20" style={{ left: '38%', top: '40%' }}>
          <div className="px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold shadow-lg flex items-center gap-1.5 whitespace-nowrap select-none">
            <span className="w-2 h-2 rounded-full bg-amber-500 shadow-xs animate-pulse" />
            <span>Node 05</span>
          </div>
        </div>

        {/* Node 07 (Safe) */}
        <div className="absolute z-20" style={{ left: '48%', top: '18%' }}>
          <div className="px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold shadow-lg flex items-center gap-1.5 whitespace-nowrap select-none">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-xs" />
            <span>Node 07</span>
          </div>
        </div>

        {/* EDGE-GW-01 Gateway on Rocky Bluff with Concentric Wireless Waves */}
        <div className="absolute z-20" style={{ left: '71%', top: '22%' }}>
          <div className="relative flex items-center justify-center">
            {/* Concentric Animated Waves */}
            <div className="absolute -left-10 -top-10 w-20 h-20 rounded-full border border-emerald-400/40 animate-ping pointer-events-none" />
            <div className="absolute -left-14 -top-14 w-28 h-28 rounded-full border border-emerald-400/20 pointer-events-none" />

            <div className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-black/85 backdrop-blur-md border border-white/25 text-white shadow-2xl flex flex-col select-none">
              <div className="font-bold text-xs tracking-wide flex items-center gap-1">
                <span>EDGE-GW-01</span>
              </div>
              <div className="text-[10px] text-stone-300 font-medium">LoRa Gateway</div>
            </div>
          </div>
        </div>

        {/* Bottom Right Slogan Overlay */}
        <div className="absolute right-4 bottom-3.5 z-20 text-right pointer-events-none hidden sm:block select-none">
          <span className="text-[9px] sm:text-[10px] font-bold tracking-widest text-stone-300 uppercase block">
            LONG RANGE
          </span>
          <span className="font-bold text-[11px] sm:text-xs text-white tracking-wide block">
            RELIABLE CONNECTIVITY FOR SAFER MOUNTAINS
          </span>
          <div className="w-10 h-0.5 bg-emerald-500 ml-auto mt-1 rounded-full" />
        </div>
      </div>

      {/* 3. SECTION 2 — NETWORK SUMMARY METRIC CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 sm:gap-3 mb-5 sm:mb-6">
        {/* Gateway */}
        <div className="p-2.5 sm:p-3 rounded-xl bg-stone-50/70 dark:bg-[#121a16] border border-stone-200/80 dark:border-stone-800 shadow-2xs">
          <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-stone-500 dark:text-stone-400 mb-1">
            <Server className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
            <span className="truncate">Gateway</span>
          </div>
          <strong className="text-xs sm:text-sm font-mono font-bold text-stone-900 dark:text-stone-100 truncate block">
            {LORA_NETWORK_DATA.gateway}
          </strong>
        </div>

        {/* Status */}
        <div className="p-2.5 sm:p-3 rounded-xl bg-stone-50/70 dark:bg-[#121a16] border border-stone-200/80 dark:border-stone-800 shadow-2xs">
          <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-stone-500 dark:text-stone-400 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
            <span className="truncate">Status</span>
          </div>
          <strong className="text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400 truncate block">
            {LORA_NETWORK_DATA.status}
          </strong>
        </div>

        {/* Nodes Connected */}
        <div className="p-2.5 sm:p-3 rounded-xl bg-stone-50/70 dark:bg-[#121a16] border border-stone-200/80 dark:border-stone-800 shadow-2xs">
          <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-stone-500 dark:text-stone-400 mb-1">
            <Share2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
            <span className="truncate">Nodes Connected</span>
          </div>
          <strong className="text-xs sm:text-sm font-mono font-bold text-stone-900 dark:text-stone-100 truncate block">
            {LORA_NETWORK_DATA.connectedNodes}
          </strong>
        </div>

        {/* Total Packets */}
        <div className="p-2.5 sm:p-3 rounded-xl bg-stone-50/70 dark:bg-[#121a16] border border-stone-200/80 dark:border-stone-800 shadow-2xs">
          <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-stone-500 dark:text-stone-400 mb-1">
            <FileText className="w-3.5 h-3.5 text-sky-500 flex-shrink-0" />
            <span className="truncate">Total Packets</span>
          </div>
          <strong className="text-xs sm:text-sm font-mono font-bold text-stone-900 dark:text-stone-100 truncate block">
            {LORA_NETWORK_DATA.packetsReceived}
          </strong>
        </div>

        {/* Success Rate */}
        <div className="p-2.5 sm:p-3 rounded-xl bg-stone-50/70 dark:bg-[#121a16] border border-stone-200/80 dark:border-stone-800 shadow-2xs">
          <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-stone-500 dark:text-stone-400 mb-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
            <span className="truncate">Success Rate</span>
          </div>
          <strong className="text-xs sm:text-sm font-mono font-bold text-emerald-600 dark:text-emerald-400 truncate block">
            {LORA_NETWORK_DATA.packetSuccess}
          </strong>
        </div>

        {/* Avg. RSSI */}
        <div className="p-2.5 sm:p-3 rounded-xl bg-stone-50/70 dark:bg-[#121a16] border border-stone-200/80 dark:border-stone-800 shadow-2xs">
          <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-stone-500 dark:text-stone-400 mb-1">
            <BarChart2 className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
            <span className="truncate">Avg. RSSI</span>
          </div>
          <strong className="text-xs sm:text-sm font-mono font-bold text-blue-600 dark:text-blue-400 truncate block">
            {LORA_NETWORK_DATA.avgRSSI}
          </strong>
        </div>

        {/* Avg. SNR */}
        <div className="p-2.5 sm:p-3 rounded-xl bg-stone-50/70 dark:bg-[#121a16] border border-stone-200/80 dark:border-stone-800 shadow-2xs">
          <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-stone-500 dark:text-stone-400 mb-1">
            <Wifi className="w-3.5 h-3.5 text-purple-500 flex-shrink-0" />
            <span className="truncate">Avg. SNR</span>
          </div>
          <strong className="text-xs sm:text-sm font-mono font-bold text-purple-600 dark:text-purple-400 truncate block">
            {LORA_NETWORK_DATA.avgSNR}
          </strong>
        </div>
      </div>

      {/* 4. SECTION 3 — TELEMETRY CHARTS (3 Compact Charts) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mb-5 sm:mb-6">
        
        {/* CHART 1: Packet Success Rate */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-stone-50/50 dark:bg-[#121a16]/80 border border-stone-200/80 dark:border-stone-800 shadow-2xs flex flex-col justify-between">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <strong className="text-xs sm:text-sm text-stone-900 dark:text-stone-100 font-bold">
                Packet Success Rate
              </strong>
            </div>
            <div className="text-right">
              <span className="font-mono font-bold text-sm sm:text-base text-emerald-600 dark:text-emerald-400 block">
                {LORA_NETWORK_DATA.packetSuccess}
              </span>
              <span className="text-[10px] text-stone-400 dark:text-stone-500 block">
                (Last 12 intervals)
              </span>
            </div>
          </div>

          <div className="h-36 sm:h-40 w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={LORA_NETWORK_DATA.successTrend} margin={{ top: 8, right: 8, left: -22, bottom: 0 }}>
                <defs>
                  <linearGradient id="grad-success" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.28} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.6} />
                <XAxis dataKey="time" tick={{ fontSize: 9, fill: '#94a3b8' }} tickLine={false} axisLine={{ stroke: '#cbd5e1' }} />
                <YAxis domain={[85, 100]} ticks={[85, 90, 95, 100]} tick={{ fontSize: 9, fill: '#94a3b8' }} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} />
                <Tooltip content={<CustomTelemetryTooltip unit="%" color="#10b981" />} />
                <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} dot={{ r: 2.5, fill: '#10b981', stroke: '#fff', strokeWidth: 1.5 }} fill="url(#grad-success)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 2: RSSI (dBm) */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-stone-50/50 dark:bg-[#121a16]/80 border border-stone-200/80 dark:border-stone-800 shadow-2xs flex flex-col justify-between">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-1.5">
              <BarChart2 className="w-4 h-4 text-blue-500 flex-shrink-0" />
              <strong className="text-xs sm:text-sm text-stone-900 dark:text-stone-100 font-bold">
                RSSI (dBm)
              </strong>
            </div>
            <div className="text-right">
              <span className="font-mono font-bold text-sm sm:text-base text-blue-600 dark:text-blue-400 block">
                {LORA_NETWORK_DATA.avgRSSI}
              </span>
              <span className="text-[10px] text-stone-400 dark:text-stone-500 block">
                (Average)
              </span>
            </div>
          </div>

          <div className="h-36 sm:h-40 w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={LORA_NETWORK_DATA.rssiTrend} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                <defs>
                  <linearGradient id="grad-rssi" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.28} />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.6} />
                <XAxis dataKey="time" tick={{ fontSize: 9, fill: '#94a3b8' }} tickLine={false} axisLine={{ stroke: '#cbd5e1' }} />
                <YAxis domain={[-120, -40]} ticks={[-120, -100, -80, -60, -40]} tick={{ fontSize: 9, fill: '#94a3b8' }} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTelemetryTooltip unit="dBm" color="#3b82f6" />} />
                <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={{ r: 2.5, fill: '#3b82f6', stroke: '#fff', strokeWidth: 1.5 }} fill="url(#grad-rssi)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 3: SNR (dB) */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-stone-50/50 dark:bg-[#121a16]/80 border border-stone-200/80 dark:border-stone-800 shadow-2xs flex flex-col justify-between">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-1.5">
              <Wifi className="w-4 h-4 text-purple-500 flex-shrink-0" />
              <strong className="text-xs sm:text-sm text-stone-900 dark:text-stone-100 font-bold">
                SNR (dB)
              </strong>
            </div>
            <div className="text-right">
              <span className="font-mono font-bold text-sm sm:text-base text-purple-600 dark:text-purple-400 block">
                {LORA_NETWORK_DATA.avgSNR}
              </span>
              <span className="text-[10px] text-stone-400 dark:text-stone-500 block">
                (Average)
              </span>
            </div>
          </div>

          <div className="h-36 sm:h-40 w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={LORA_NETWORK_DATA.snrTrend} margin={{ top: 8, right: 8, left: -22, bottom: 0 }}>
                <defs>
                  <linearGradient id="grad-snr" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.28} />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.6} />
                <XAxis dataKey="time" tick={{ fontSize: 9, fill: '#94a3b8' }} tickLine={false} axisLine={{ stroke: '#cbd5e1' }} />
                <YAxis domain={[0, 20]} ticks={[0, 5, 10, 15, 20]} tick={{ fontSize: 9, fill: '#94a3b8' }} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTelemetryTooltip unit="dB" color="#8b5cf6" />} />
                <Area type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 2.5, fill: '#8b5cf6', stroke: '#fff', strokeWidth: 1.5 }} fill="url(#grad-snr)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* 5. SECTION 4 — FOOTER NETWORK DETAILS */}
      <div className="pt-3 sm:pt-4 border-t border-stone-200/80 dark:border-stone-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-500 dark:text-stone-400">
        <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
          <div className="flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-stone-400" />
            <span>Spreading Factor:</span>
            <strong className="text-stone-800 dark:text-stone-200 font-mono">
              {LORA_NETWORK_DATA.spreadingFactor}
            </strong>
          </div>
          <div className="flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-stone-400" />
            <span>Bandwidth:</span>
            <strong className="text-stone-800 dark:text-stone-200 font-mono">
              {LORA_NETWORK_DATA.bandwidth}
            </strong>
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
          <div className="flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-stone-400" />
            <span>RF Signal:</span>
            <strong className="text-emerald-600 dark:text-emerald-400">
              {LORA_NETWORK_DATA.signal}
            </strong>
          </div>
          <div className="flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5 text-amber-500" />
            <span className="font-mono text-amber-500 font-medium">
              Simulated Network Data
            </span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default LoraNetworkCard;

