import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown, 
  Thermometer,
  Droplet,
  CloudRain,
  Compass,
  Activity,
  Shield,
  Sun
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar,
  LineChart,
  Line
} from 'recharts';
import sensorMastImg from '../../assets/sensor_node_illustration.jpg';

// EXACT MINI GRAPH DATA CURVES MATCHING REFERENCE IMAGE (ref_sensor_cards.png)
const NODE_01_SERIES = [
  { v: 14 }, { v: 18 }, { v: 16 }, { v: 12 }, { v: 14 }, 
  { v: 10 }, { v: 11 }, { v: 9 },  { v: 12 }, { v: 11 }, 
  { v: 15 }, { v: 20 }
];

const NODE_02_SERIES = [
  { v: 12 }, { v: 8 },  { v: 9 },  { v: 13 }, { v: 11 }, 
  { v: 16 }, { v: 12 }, { v: 8 },  { v: 11 }, { v: 17 }, 
  { v: 18 }, { v: 15 }
];

// Exactly 16 bars for Rainfall matching ref_sensor_cards.png
const NODE_03_BARS = [
  { v: 1.5 }, { v: 1.5 }, { v: 2.0 }, { v: 2.5 }, 
  { v: 3.0 }, { v: 2.0 }, { v: 3.5 }, { v: 4.5 }, 
  { v: 6.0 }, { v: 3.0 }, { v: 8.5 }, { v: 2.5 }, 
  { v: 3.0 }, { v: 12.0 }, { v: 4.0 }, { v: 6.5 }
];

const NODE_04_SERIES = [
  { v: 8 },  { v: 10 }, { v: 13 }, { v: 10 }, { v: 8 }, 
  { v: 12 }, { v: 11 }, { v: 15 }, { v: 18 }, { v: 16 }, 
  { v: 12 }, { v: 10 }
];

// Dense micro-seismic accelerometer vibration waveform (36 alternating spikes)
const NODE_05_WAVEFORM = [
  { v: 0 },   { v: 2 },   { v: -1 },  { v: 3 },   { v: -2 }, 
  { v: 5 },   { v: -4 },  { v: 2 },   { v: -3 },  { v: 8 }, 
  { v: -6 },  { v: 4 },   { v: -8 },  { v: 14 },  { v: -12 }, 
  { v: 5 },   { v: -3 },  { v: 6 },   { v: -5 },  { v: 10 }, 
  { v: -16 }, { v: 18 },  { v: -14 }, { v: 8 },   { v: -6 }, 
  { v: 4 },   { v: -8 },  { v: 12 },  { v: -7 },  { v: 3 }, 
  { v: -2 },  { v: 4 },   { v: -1 },  { v: 2 },   { v: 0 }
];

const NODE_06_SERIES = [
  { v: 8 },  { v: 13 }, { v: 18 }, { v: 15 }, { v: 12 }, 
  { v: 9 },  { v: 12 }, { v: 17 }, { v: 13 }, { v: 19 }, 
  { v: 16 }, { v: 14 }
];

export const LiveReadingsAndIllustration = ({ nodes = [], onSelectNode }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const cardData = [
    {
      id: 'NODE-01',
      node: nodes.find(n => n.id === 'NODE-01') || { id: 'NODE-01', name: 'Node 01' },
      location: 'Beas Valley',
      status: 'safe',
      dotColor: 'bg-emerald-400',
      icon: Thermometer,
      iconBoxClass: 'bg-emerald-950/40 border border-emerald-500/30 text-emerald-400',
      value: '21.2°C',
      paramLabel: 'Temp',
      valueColor: 'text-white',
      chartType: 'area',
      stroke: '#10b981',
      fillId: 'node-grad-01',
      series: NODE_01_SERIES
    },
    {
      id: 'NODE-02',
      node: nodes.find(n => n.id === 'NODE-02') || { id: 'NODE-02', name: 'Node 02' },
      location: 'Kasol Ridge',
      status: 'safe',
      dotColor: 'bg-cyan-400',
      icon: Droplet,
      iconBoxClass: 'bg-cyan-950/40 border border-cyan-500/30 text-cyan-400',
      value: '38 %',
      paramLabel: 'Soil Moisture',
      valueColor: 'text-white',
      chartType: 'area',
      stroke: '#06b6d4',
      fillId: 'node-grad-02',
      series: NODE_02_SERIES
    },
    {
      id: 'NODE-03',
      node: nodes.find(n => n.id === 'NODE-03') || { id: 'NODE-03', name: 'Node 03' },
      location: 'Manali North',
      status: 'safe',
      dotColor: 'bg-emerald-400',
      icon: CloudRain,
      iconBoxClass: 'bg-cyan-950/40 border border-cyan-500/30 text-cyan-400',
      value: '0.2 mm',
      paramLabel: 'Rainfall',
      valueColor: 'text-white',
      chartType: 'bar',
      barColor: '#06b6d4',
      series: NODE_03_BARS
    },
    {
      id: 'NODE-04',
      node: nodes.find(n => n.id === 'NODE-04') || { id: 'NODE-04', name: 'Node 04' },
      location: 'Naggar Slope',
      status: 'warning',
      dotColor: 'bg-amber-400',
      icon: Compass,
      iconBoxClass: 'bg-amber-950/40 border border-amber-500/30 text-amber-400',
      value: '1.4°',
      paramLabel: 'Ground Tilt',
      valueColor: 'text-white',
      chartType: 'area',
      stroke: '#f59e0b',
      fillId: 'node-grad-04',
      series: NODE_04_SERIES
    },
    {
      id: 'NODE-05',
      node: nodes.find(n => n.id === 'NODE-05') || { id: 'NODE-05', name: 'Node 05' },
      location: 'Solang Valley',
      status: 'high-risk',
      dotColor: 'bg-rose-500 animate-pulse',
      icon: Activity,
      iconBoxClass: 'bg-rose-950/40 border border-rose-500/30 text-rose-400',
      value: '0.11 g',
      paramLabel: 'Vibration',
      valueColor: 'text-white',
      chartType: 'line',
      stroke: '#f43f5e',
      fillId: 'node-grad-05',
      series: NODE_05_WAVEFORM
    },
    {
      id: 'NODE-06',
      node: nodes.find(n => n.id === 'NODE-06') || { id: 'NODE-06', name: 'Node 06' },
      location: 'Bhuntar',
      status: 'safe',
      dotColor: 'bg-emerald-400',
      icon: Droplet,
      iconBoxClass: 'bg-teal-950/40 border border-teal-500/30 text-teal-400',
      value: '76 %',
      paramLabel: 'Humidity',
      valueColor: 'text-white',
      chartType: 'area',
      stroke: '#10b981',
      fillId: 'node-grad-06',
      series: NODE_06_SERIES
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 mb-3.5 select-none">
      
      {/* ========================================================================= */}
      {/* LEFT COLUMN: LIVE SENSOR READINGS (EXACT SINGLE-ROW OF 6 CARDS)           */}
      {/* ========================================================================= */}
      <div className="lg:col-span-8 rounded-2xl bg-[#07131d] border border-slate-800/80 p-3.5 shadow-md flex flex-col justify-between relative">
        
        {/* Card Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-800/70">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-black font-heading text-white tracking-tight">
              Live Sensor Readings
            </h2>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live Data
            </span>
          </div>

          <div className="flex items-center gap-2.5 text-xs">
            <span className="text-slate-400 text-[10.5px] font-mono flex items-center gap-1">
              <span>⏱</span>
              <span>Auto Refresh: 5s</span>
            </span>
            
            {/* Filter Dropdown */}
            <div className="relative">
              <button 
                type="button"
                className="px-2.5 py-1 rounded-lg bg-[#0a1826] border border-slate-700/80 text-white text-xs font-medium flex items-center gap-1.5 hover:bg-slate-800 transition-colors"
              >
                <span>All Nodes</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Row: Left Arrow + 6 Cards in Single Row + Right Arrow */}
        <div className="flex items-center gap-1.5 flex-1">
          {/* Left Arrow Button */}
          <button 
            type="button"
            onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
            className="w-6 h-12 rounded-lg bg-[#0a1826] border border-slate-700/70 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors shrink-0"
            title="Previous Nodes"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* 6 Sensor Cards in Single Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-2 flex-1">
            {cardData.map((item) => {
              const IconComp = item.icon;
              return (
                <div 
                  key={item.id}
                  onClick={() => onSelectNode && onSelectNode(item.node)}
                  className="cursor-pointer rounded-xl bg-[#050c14] border border-slate-800 hover:border-slate-600 p-2.5 flex flex-col justify-between transition-all hover:shadow-md group h-[138px]"
                >
                  {/* Header: Dot + Node ID + Location */}
                  <div className="leading-tight">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${item.dotColor} shrink-0`} />
                      <span className="font-mono text-[11px] font-bold text-white tracking-wide">
                        {item.id}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400 truncate mt-0.5 pl-3.5">
                      {item.location}
                    </div>
                  </div>

                  {/* Metric: Icon Box + Value + Label */}
                  <div className="flex items-center gap-2 my-1">
                    <div className={`w-7 h-7 rounded-lg ${item.iconBoxClass} flex items-center justify-center shrink-0`}>
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div className="leading-none">
                      <div className="text-sm font-black font-mono text-white tracking-tight">
                        {item.value}
                      </div>
                      <div className="text-[9px] text-slate-400 font-medium mt-0.5">
                        {item.paramLabel}
                      </div>
                    </div>
                  </div>

                  {/* Mini Graph matching exact reference curve */}
                  <div className="h-9 w-full pointer-events-none select-none -mb-1">
                    <ResponsiveContainer width="100%" height="100%">
                      {item.chartType === 'bar' ? (
                        <BarChart data={item.series} margin={{ top: 2, right: 0, bottom: 0, left: 0 }} barCategoryGap={1}>
                          <Bar 
                            dataKey="v" 
                            fill={item.barColor} 
                            radius={[1.5, 1.5, 0, 0]} 
                            isAnimationActive={false} 
                          />
                        </BarChart>
                      ) : item.chartType === 'line' ? (
                        <LineChart data={item.series} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
                          <Line 
                            type="monotone" 
                            dataKey="v" 
                            stroke={item.stroke} 
                            strokeWidth={1.4} 
                            dot={false}
                            isAnimationActive={false} 
                          />
                        </LineChart>
                      ) : (
                        <AreaChart data={item.series} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
                          <defs>
                            <linearGradient id={item.fillId} x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor={item.stroke} stopOpacity={0.35} />
                              <stop offset="100%" stopColor={item.stroke} stopOpacity={0.0} />
                            </linearGradient>
                          </defs>
                          <Area 
                            type="monotone" 
                            dataKey="v" 
                            stroke={item.stroke} 
                            strokeWidth={1.6} 
                            fill={`url(#${item.fillId})`} 
                            dot={false}
                            isAnimationActive={false} 
                          />
                        </AreaChart>
                      )}
                    </ResponsiveContainer>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Right Arrow Button */}
          <button 
            type="button"
            onClick={() => setCurrentPage(p => p + 1)}
            className="w-6 h-12 rounded-lg bg-[#0a1826] border border-slate-700/70 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors shrink-0"
            title="Next Nodes"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* RIGHT COLUMN: SENSOR NODE ILLUSTRATION (MAST + BADGES)                   */}
      {/* ========================================================================= */}
      <div className="lg:col-span-4 rounded-2xl bg-[#07131d] border border-slate-800/80 p-3.5 shadow-md flex flex-col justify-between">
        
        {/* Card Header */}
        <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-800/70">
          <h2 className="text-base font-black font-heading text-white tracking-tight">
            Sensor Node Illustration
          </h2>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            Hardware v2.4
          </span>
        </div>

        {/* Mast Image: Fills height with cover */}
        <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-[#050c14] flex-1 min-h-[140px] flex items-center justify-center shadow-inner">
          <img 
            src={sensorMastImg} 
            alt="Geotechnical IoT Monitoring Station Mast"
            className="w-full h-full object-cover object-center filter brightness-[1.03] contrast-[1.05]"
          />
        </div>

        {/* Bottom Feature Badges */}
        <div className="grid grid-cols-3 gap-2 mt-2 pt-2 border-t border-slate-800/70 text-center">
          <div className="px-2 py-1 rounded-lg bg-[#050c14] border border-slate-800 text-[10px] font-semibold text-slate-300 flex items-center justify-center gap-1">
            <Shield className="w-3 h-3 text-emerald-400 shrink-0" />
            <span>Rugged</span>
          </div>
          <div className="px-2 py-1 rounded-lg bg-[#050c14] border border-slate-800 text-[10px] font-semibold text-slate-300 flex items-center justify-center gap-1">
            <Sun className="w-3 h-3 text-amber-400 shrink-0" />
            <span>Solar Powered</span>
          </div>
          <div className="px-2 py-1 rounded-lg bg-[#050c14] border border-slate-800 text-[10px] font-semibold text-slate-300 flex items-center justify-center gap-1">
            <CloudRain className="w-3 h-3 text-sky-400 shrink-0" />
            <span>All-Weather</span>
          </div>
        </div>

      </div>

    </div>
  );
};

export default LiveReadingsAndIllustration;
