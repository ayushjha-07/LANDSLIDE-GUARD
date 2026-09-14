import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown, 
  Thermometer,
  Droplets,
  CloudRain,
  Compass,
  Activity,
  Droplet,
  Shield,
  Sun
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar 
} from 'recharts';
import sensorMastImg from '../../assets/sensor_node_illustration.jpg';

const MINI_CHART_SERIES = {
  temp: [
    { v: 19.8 }, { v: 20.1 }, { v: 20.5 }, { v: 20.9 }, { v: 21.0 },
    { v: 21.4 }, { v: 21.1 }, { v: 21.2 }
  ],
  soil: [
    { v: 36.2 }, { v: 36.8 }, { v: 37.1 }, { v: 37.5 }, { v: 37.9 },
    { v: 38.2 }, { v: 38.0 }, { v: 38.0 }
  ],
  // Bar chart for rainfall
  rainfall: [
    { v: 0.05 }, { v: 0.1 }, { v: 0.1 }, { v: 0.2 }, { v: 0.35 },
    { v: 0.25 }, { v: 0.15 }, { v: 0.2 }
  ],
  tilt: [
    { v: 1.1 }, { v: 1.2 }, { v: 1.25 }, { v: 1.3 }, { v: 1.35 },
    { v: 1.38 }, { v: 1.4 }, { v: 1.4 }
  ],
  vibration: [
    { v: 0.02 }, { v: 0.08 }, { v: 0.03 }, { v: 0.12 }, { v: 0.05 },
    { v: 0.15 }, { v: 0.07 }, { v: 0.11 }
  ],
  humidity: [
    { v: 72 }, { v: 73 }, { v: 75 }, { v: 74 }, { v: 76 },
    { v: 77 }, { v: 75 }, { v: 76 }
  ]
};

export const LiveReadingsAndIllustration = ({ nodes = [], onSelectNode }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const cardData = [
    {
      id: 'NODE-01',
      node: nodes.find(n => n.id === 'NODE-01') || { id: 'NODE-01', name: 'Node 01' },
      location: 'Beas Valley',
      status: 'safe',
      statusLabel: 'Safe',
      icon: Thermometer,
      iconBg: 'bg-emerald-500/15 text-emerald-400',
      value: '21.2°C',
      paramLabel: 'Temp',
      valueColor: 'text-white',
      chartType: 'area',
      stroke: '#10b981',
      fillId: 'grad-temp',
      series: MINI_CHART_SERIES.temp,
      updated: 'Updated 2s ago',
      condition: 'Normal',
      condColor: 'text-emerald-400'
    },
    {
      id: 'NODE-02',
      node: nodes.find(n => n.id === 'NODE-02') || { id: 'NODE-02', name: 'Node 02' },
      location: 'Kasol Ridge',
      status: 'safe',
      statusLabel: 'Safe',
      icon: Droplets,
      iconBg: 'bg-teal-500/15 text-teal-400',
      value: '38 %',
      paramLabel: 'Soil Moisture',
      valueColor: 'text-teal-400',
      chartType: 'area',
      stroke: '#14b8a6',
      fillId: 'grad-soil',
      series: MINI_CHART_SERIES.soil,
      updated: 'Updated 3s ago',
      condition: 'Normal',
      condColor: 'text-emerald-400'
    },
    {
      id: 'NODE-03',
      node: nodes.find(n => n.id === 'NODE-03') || { id: 'NODE-03', name: 'Node 03' },
      location: 'Manali North',
      status: 'safe',
      statusLabel: 'Safe',
      icon: CloudRain,
      iconBg: 'bg-cyan-500/15 text-cyan-400',
      value: '0.2 mm',
      paramLabel: 'Rainfall',
      valueColor: 'text-cyan-400',
      chartType: 'bar',
      barColor: '#06b6d4',
      series: MINI_CHART_SERIES.rainfall,
      updated: 'Updated 1s ago',
      condition: 'Normal',
      condColor: 'text-emerald-400'
    },
    {
      id: 'NODE-04',
      node: nodes.find(n => n.id === 'NODE-04') || { id: 'NODE-04', name: 'Node 04' },
      location: 'Naggar Slope',
      status: 'warning',
      statusLabel: 'Warning',
      icon: Compass,
      iconBg: 'bg-amber-500/15 text-amber-400',
      value: '1.4°',
      paramLabel: 'Ground Tilt',
      valueColor: 'text-amber-400',
      chartType: 'area',
      stroke: '#f59e0b',
      fillId: 'grad-tilt',
      series: MINI_CHART_SERIES.tilt,
      updated: 'Updated 4s ago',
      condition: 'Warning',
      condColor: 'text-amber-400'
    },
    {
      id: 'NODE-05',
      node: nodes.find(n => n.id === 'NODE-05') || { id: 'NODE-05', name: 'Node 05' },
      location: 'Solang Valley',
      status: 'high-risk',
      statusLabel: 'High Risk',
      icon: Activity,
      iconBg: 'bg-rose-500/15 text-rose-400',
      value: '0.11 g',
      paramLabel: 'Vibration',
      valueColor: 'text-rose-500',
      chartType: 'area',
      stroke: '#f43f5e',
      fillId: 'grad-vib',
      series: MINI_CHART_SERIES.vibration,
      updated: 'Updated 1s ago',
      condition: 'Action Required',
      condColor: 'text-rose-400'
    },
    {
      id: 'NODE-06',
      node: nodes.find(n => n.id === 'NODE-06') || { id: 'NODE-06', name: 'Node 06' },
      location: 'Bhuntar',
      status: 'safe',
      statusLabel: 'Safe',
      icon: Droplet,
      iconBg: 'bg-emerald-500/15 text-emerald-400',
      value: '76 %',
      paramLabel: 'Humidity',
      valueColor: 'text-emerald-400',
      chartType: 'area',
      stroke: '#10b981',
      fillId: 'grad-hum',
      series: MINI_CHART_SERIES.humidity,
      updated: 'Updated 2s ago',
      condition: 'Normal',
      condColor: 'text-emerald-400'
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 mb-3.5 select-none">
      
      {/* ========================================================================= */}
      {/* LEFT COLUMN: LIVE SENSOR READINGS (6 COMPACT CARDS WITH RECHARTS)        */}
      {/* ========================================================================= */}
      <div className="lg:col-span-8 rounded-2xl bg-[#09131d] border border-slate-800/80 p-4 shadow-md flex flex-col justify-between relative">
        
        {/* Card Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3 pb-2.5 border-b border-slate-800/70">
          <div className="flex items-center gap-2.5">
            <h2 className="text-base sm:text-lg font-black font-heading text-white tracking-tight">
              Live Sensor Readings
            </h2>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live Data
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 text-[11px] font-mono hidden sm:inline">
              Auto Refresh: 5s
            </span>
            
            {/* Filter Dropdown */}
            <div className="relative">
              <button 
                type="button"
                className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700/80 text-white text-xs font-medium flex items-center gap-1.5 hover:bg-slate-800 transition-colors"
              >
                <span>All Nodes</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Outer Flanking Arrows & 6 Cards Grid */}
        <div className="relative flex items-center gap-1.5 flex-1">
          {/* Left Arrow Button */}
          <button 
            type="button"
            onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
            className="w-7 h-14 rounded-lg bg-slate-900/90 border border-slate-700/80 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors shrink-0"
            title="Previous Nodes"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* 6 Sensor Cards (3 cols x 2 rows) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 flex-1">
            {cardData.map((item) => {
              const IconComp = item.icon;
              return (
                <div 
                  key={item.id}
                  onClick={() => onSelectNode && onSelectNode(item.node)}
                  className="cursor-pointer rounded-xl bg-[#060c13] border border-slate-800 hover:border-slate-600 p-2.5 flex flex-col justify-between transition-all hover:shadow-md group"
                >
                  {/* Top: Node ID & Location */}
                  <div className="flex items-center justify-between text-xs mb-1">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        item.status === 'safe' ? 'bg-emerald-400' : item.status === 'warning' ? 'bg-amber-400' : 'bg-rose-400 animate-pulse'
                      }`} />
                      <span className="font-mono text-[11px] font-bold text-white tracking-wide">
                        {item.id}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 truncate max-w-[90px]">
                      {item.location}
                    </span>
                  </div>

                  {/* Middle: Icon + Value + Parameter Label */}
                  <div className="my-1 flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-lg ${item.iconBg} flex items-center justify-center shrink-0`}>
                      <IconComp className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex items-baseline gap-1 leading-none">
                      <span className={`text-lg font-black font-mono tracking-tight ${item.valueColor}`}>
                        {item.value}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {item.paramLabel}
                      </span>
                    </div>
                  </div>

                  {/* Mini Chart (Recharts Area or Bar Chart) */}
                  <div className="h-10 w-full my-0.5 pointer-events-none select-none">
                    <ResponsiveContainer width="100%" height="100%">
                      {item.chartType === 'bar' ? (
                        <BarChart data={item.series} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
                          <Bar 
                            dataKey="v" 
                            fill={item.barColor} 
                            radius={[2, 2, 0, 0]} 
                            isAnimationActive={false} 
                          />
                        </BarChart>
                      ) : (
                        <AreaChart data={item.series} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
                          <defs>
                            <linearGradient id={item.fillId} x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor={item.stroke} stopOpacity={0.4} />
                              <stop offset="100%" stopColor={item.stroke} stopOpacity={0.02} />
                            </linearGradient>
                          </defs>
                          <Area 
                            type="monotone" 
                            dataKey="v" 
                            stroke={item.stroke} 
                            strokeWidth={1.8} 
                            fill={`url(#${item.fillId})`} 
                            isAnimationActive={false} 
                          />
                        </AreaChart>
                      )}
                    </ResponsiveContainer>
                  </div>

                  {/* Bottom: Updated ago & Condition */}
                  <div className="pt-1.5 border-t border-slate-800/70 flex items-center justify-between text-[9.5px]">
                    <span className="text-slate-500">{item.updated}</span>
                    <span className={`font-semibold ${item.condColor}`}>{item.condition}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Arrow Button */}
          <button 
            type="button"
            onClick={() => setCurrentPage(p => p + 1)}
            className="w-7 h-14 rounded-lg bg-slate-900/90 border border-slate-700/80 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors shrink-0"
            title="Next Nodes"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* RIGHT COLUMN: SENSOR NODE ILLUSTRATION (MAST + CALLOUTS + BADGES)        */}
      {/* ========================================================================= */}
      <div className="lg:col-span-4 rounded-2xl bg-[#09131d] border border-slate-800/80 p-4 shadow-md flex flex-col justify-between">
        
        {/* Card Header */}
        <div className="flex items-center justify-between gap-2 mb-2.5 pb-2 border-b border-slate-800/70">
          <h2 className="text-base font-black font-heading text-white tracking-tight">
            Sensor Node Illustration
          </h2>
          <span className="text-[10.5px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            Hardware v2.4
          </span>
        </div>

        {/* Mast Image: Fills height with cover */}
        <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-[#060c13] flex-1 min-h-[220px] sm:min-h-[240px] flex items-center justify-center shadow-inner">
          <img 
            src={sensorMastImg} 
            alt="Geotechnical IoT Monitoring Station Mast"
            className="w-full h-full object-cover object-center filter brightness-[1.03] contrast-[1.05]"
          />
        </div>

        {/* Bottom Feature Badges */}
        <div className="grid grid-cols-3 gap-2 mt-2.5 pt-2 border-t border-slate-800/70 text-center">
          <div className="px-2 py-1 rounded-lg bg-[#060c13] border border-slate-800 text-[10px] font-semibold text-slate-300 flex items-center justify-center gap-1">
            <Shield className="w-3 h-3 text-emerald-400 shrink-0" />
            <span>Rugged</span>
          </div>
          <div className="px-2 py-1 rounded-lg bg-[#060c13] border border-slate-800 text-[10px] font-semibold text-slate-300 flex items-center justify-center gap-1">
            <Sun className="w-3 h-3 text-amber-400 shrink-0" />
            <span>Solar Powered</span>
          </div>
          <div className="px-2 py-1 rounded-lg bg-[#060c13] border border-slate-800 text-[10px] font-semibold text-slate-300 flex items-center justify-center gap-1">
            <CloudRain className="w-3 h-3 text-sky-400 shrink-0" />
            <span>All-Weather</span>
          </div>
        </div>

      </div>

    </div>
  );
};

export default LiveReadingsAndIllustration;
