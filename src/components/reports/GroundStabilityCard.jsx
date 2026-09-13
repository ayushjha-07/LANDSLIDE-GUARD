import React, { useState } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine 
} from 'recharts';
import Card from '../common/Card';
import { Compass, Activity } from 'lucide-react';
import { STABILITY_HISTORY_24H, STABILITY_METRIC_STATS } from '../../data/mockHistoricalData';

export const GroundStabilityCard = () => {
  const [activeTab, setActiveTab] = useState('tilt');

  const tabs = [
    { id: 'tilt', label: 'Ground Tilt', icon: Compass, color: '#D97706' },
    { id: 'vibration', label: 'Ground Vibration', icon: Activity, color: '#7C3AED' }
  ];

  const currentStats = STABILITY_METRIC_STATS[activeTab] || STABILITY_METRIC_STATS.tilt;
  const activeColor = tabs.find(t => t.id === activeTab)?.color || '#D97706';

  return (
    <Card className="p-4 sm:p-5 flex flex-col space-y-4 w-full min-w-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2E8F0] dark:border-[#2D3748] pb-3">
        <div>
          <h2 className="text-base sm:text-lg font-bold font-heading text-[#1A202C] dark:text-white">
            Ground Stability
          </h2>
          <p className="text-xs text-[#718096] dark:text-[#A0AEC0] mt-0.5">
            Borehole inclinometer and tri-axial seismic accelerometer telemetry
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1.5">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`min-h-[36px] px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#2B6CB0] text-white shadow-sm'
                    : 'bg-[#F7FAFC] dark:bg-[#0E131F] text-[#4A5568] dark:text-[#CBD5E0] hover:bg-[#EDF2F7] dark:hover:bg-[#2D3748] border border-[#E2E8F0] dark:border-[#2D3748]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3 Metric Summary Pills */}
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="p-3 rounded-xl bg-[#F7FAFC] dark:bg-[#0E131F]/60 border border-[#E2E8F0] dark:border-[#2D3748]">
          <span className="text-[11px] text-[#718096] dark:text-[#A0AEC0] block">Current</span>
          <span className="text-base sm:text-lg font-bold font-heading text-[#2B6CB0] dark:text-[#63B3ED] mt-0.5 block">
            {currentStats.current} {currentStats.unit}
          </span>
        </div>
        <div className="p-3 rounded-xl bg-[#F7FAFC] dark:bg-[#0E131F]/60 border border-[#E2E8F0] dark:border-[#2D3748]">
          <span className="text-[11px] text-[#718096] dark:text-[#A0AEC0] block">Average</span>
          <span className="text-base sm:text-lg font-bold font-heading text-[#1A202C] dark:text-white mt-0.5 block">
            {currentStats.average} {currentStats.unit}
          </span>
        </div>
        <div className="p-3 rounded-xl bg-[#F7FAFC] dark:bg-[#0E131F]/60 border border-[#E2E8F0] dark:border-[#2D3748]">
          <span className="text-[11px] text-[#718096] dark:text-[#A0AEC0] block">Peak</span>
          <span className="text-base sm:text-lg font-bold font-heading text-[#EA580C] dark:text-[#F97316] mt-0.5 block">
            {currentStats.peak} {currentStats.unit}
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="h-60 sm:h-64 w-full min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={STABILITY_HISTORY_24H} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="stabilityTrendGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={activeColor} stopOpacity={0.4}/>
                <stop offset="95%" stopColor={activeColor} stopOpacity={0.0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" opacity={0.6} />
            <XAxis dataKey="time" stroke="#718096" fontSize={11} tickLine={false} />
            <YAxis stroke="#718096" fontSize={11} tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1A202C',
                borderColor: '#2D3748',
                borderRadius: '0.75rem',
                color: '#fff',
                fontSize: '12px'
              }}
              formatter={(val) => [`${val} ${currentStats.unit}`, currentStats.title]}
            />
            {activeTab === 'tilt' && (
              <ReferenceLine y={3.5} stroke="#EA580C" strokeDasharray="3 3" label={{ value: 'Warning Incline (3.5°)', fill: '#EA580C', fontSize: 10 }} />
            )}
            {activeTab === 'vibration' && (
              <ReferenceLine y={0.08} stroke="#EA580C" strokeDasharray="3 3" label={{ value: 'Seismic Warning (0.08g)', fill: '#EA580C', fontSize: 10 }} />
            )}
            <Area 
              type="monotone" 
              dataKey={activeTab} 
              stroke={activeColor} 
              strokeWidth={2.5} 
              fillOpacity={1} 
              fill="url(#stabilityTrendGradient)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="pt-2 border-t border-[#E2E8F0] dark:border-[#2D3748] flex items-center justify-between text-xs text-[#718096] dark:text-[#A0AEC0]">
        <span>Hardware: MPU-6050 &amp; Geotechnical Inclinometer</span>
        <span className="italic text-[11px]">Consistent historical data</span>
      </div>
    </Card>
  );
};

export default GroundStabilityCard;
