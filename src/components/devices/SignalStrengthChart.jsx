import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine
} from 'recharts';
import Card from '../common/Card';
import { SIGNAL_STRENGTH_SERIES } from '../../data/mockDeviceData';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white dark:bg-[#1A202C] p-3 rounded-xl border border-[#E2E8F0] dark:border-[#2D3748] shadow-lg text-xs">
        <div className="font-bold text-[#1A202C] dark:text-white mb-1">{label}</div>
        <div className="space-y-1">
          <div className="flex items-center justify-between gap-4">
            <span className="text-[#718096] dark:text-slate-400">Gateway RSSI:</span>
            <span className="font-mono font-bold text-forest-600 dark:text-nature-400">{data.rssi} dBm</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-[#718096] dark:text-slate-400">Status:</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">{data.label}</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export const SignalStrengthChart = () => {
  return (
    <Card 
      title="LoRa Signal Strength" 
      subtitle="Recent signal strength over time (-68 to -75 dBm) with RF reception threshold bands"
      action={
        <div className="flex items-center gap-2 text-xs flex-wrap">
          <span className="inline-flex items-center gap-1 text-[11px] text-[#718096] dark:text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500" /> &gt; -70 dBm (Excellent)
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] text-[#718096] dark:text-slate-400">
            <span className="w-2 h-2 rounded-full bg-forest-500" /> -70 to -80 dBm (Good)
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] text-[#718096] dark:text-slate-400">
            <span className="w-2 h-2 rounded-full bg-amber-500" /> -80 to -90 dBm (Fair)
          </span>
        </div>
      }
      className="w-full min-w-0"
    >
      <div className="h-64 sm:h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={SIGNAL_STRENGTH_SERIES} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
            <defs>
              <linearGradient id="signalGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2B6CB0" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#2B6CB0" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.2)" />
            <XAxis 
              dataKey="time" 
              stroke="#718096" 
              fontSize={11} 
              tickLine={false} 
              axisLine={false} 
            />
            <YAxis 
              domain={[-90, -60]} 
              stroke="#718096" 
              fontSize={11} 
              tickLine={false} 
              axisLine={false} 
              unit="dBm"
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={-70} stroke="#10B981" strokeDasharray="3 3" label={{ value: 'Excellent', fill: '#10B981', fontSize: 10, position: 'insideTopRight' }} />
            <ReferenceLine y={-80} stroke="#F59E0B" strokeDasharray="3 3" label={{ value: 'Good Threshold', fill: '#F59E0B', fontSize: 10, position: 'insideTopRight' }} />
            <Area 
              type="monotone" 
              dataKey="rssi" 
              stroke="#2B6CB0" 
              strokeWidth={2.5} 
              fillOpacity={1} 
              fill="url(#signalGradient)" 
              dot={{ r: 4, fill: '#2B6CB0', stroke: '#fff', strokeWidth: 2 }}
              activeDot={{ r: 6, fill: '#2B6CB0', stroke: '#fff', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default SignalStrengthChart;
