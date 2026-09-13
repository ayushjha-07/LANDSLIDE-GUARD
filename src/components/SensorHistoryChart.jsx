import React, { useState, useMemo } from 'react';
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
import { generateNodeHistory } from '../data/mockSensorData';
import { useTheme } from '../hooks/useTheme';

export const SensorHistoryChart = ({ node }) => {
  const { isDark } = useTheme();
  const [activeMetric, setActiveMetric] = useState('soil');

  const historyData = useMemo(() => {
    return generateNodeHistory(node);
  }, [node]);

  const METRICS = [
    { id: 'soil', label: 'Soil Moisture', unit: '%', threshold: 60, thresholdLabel: 'Warning 60%', color: isDark ? '#52b788' : '#2d6a4f' },
    { id: 'rain', label: 'Rainfall', unit: 'mm', threshold: 20, thresholdLabel: 'Warning 20mm', color: '#0ea5e9' },
    { id: 'tilt', label: 'Tilt', unit: '°', threshold: 3.5, thresholdLabel: 'Warning 3.5°', color: '#f59e0b' },
    { id: 'vibration', label: 'Vibration', unit: 'g', threshold: 0.05, thresholdLabel: 'Warning 0.05g', color: '#ec4899' },
    { id: 'temperature', label: 'Temperature', unit: '°C', threshold: null, thresholdLabel: null, color: '#f43f5e' },
    { id: 'humidity', label: 'Humidity', unit: '%', threshold: 80, thresholdLabel: 'High 80%', color: '#8b5cf6' }
  ];

  const currentMetricConfig = METRICS.find(m => m.id === activeMetric) || METRICS[0];

  const currentValue = node.status?.toLowerCase() === 'offline' 
    ? (node.lastKnown?.[activeMetric] ?? '--')
    : (node[activeMetric] ?? '--');

  return (
    <div className="space-y-3 pt-2">
      {/* Metric Selector Tabs */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div>
          <h4 className="text-sm font-bold font-heading text-stone-900 dark:text-white">
            Sensor History — Last 24 Hours
          </h4>
          <p className="text-[11px] text-stone-500 dark:text-stone-400">
            Selected: <strong className="text-stone-700 dark:text-stone-300">{currentMetricConfig.label}</strong> &bull; Current: <span className="font-mono text-forest-700 dark:text-nature-400 font-bold">{currentValue} {currentMetricConfig.unit}</span>
          </p>
        </div>

        <div className="flex items-center gap-1 p-1 rounded-xl bg-stone-100 dark:bg-forest-950/80 border border-stone-200 dark:border-forest-800/80 overflow-x-auto max-w-full">
          {METRICS.map(metric => (
            <button
              key={metric.id}
              type="button"
              onClick={() => setActiveMetric(metric.id)}
              className={`min-h-[34px] px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeMetric === metric.id
                  ? 'bg-white dark:bg-forest-800 text-stone-900 dark:text-white shadow-sm'
                  : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              {metric.label}
            </button>
          ))}
        </div>
      </div>

      {/* Recharts Area Container */}
      <div className="h-[260px] sm:h-[280px] w-full min-w-0 pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={historyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id={`gradient-${activeMetric}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={currentMetricConfig.color} stopOpacity={0.4} />
                <stop offset="95%" stopColor={currentMetricConfig.color} stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#1b4332" : "#e5e7eb"} opacity={0.6} />
            <XAxis 
              dataKey="time" 
              tick={{ fontSize: 10, fill: isDark ? '#74c69d' : '#6b7280' }} 
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              tick={{ fontSize: 10, fill: isDark ? '#74c69d' : '#6b7280' }} 
              axisLine={false}
              tickLine={false}
              domain={['auto', 'auto']}
              unit={currentMetricConfig.unit}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: isDark ? '#0f1712' : '#ffffff',
                borderColor: isDark ? '#2d6a4f' : '#e5e7eb',
                borderRadius: '0.75rem',
                fontSize: '11px',
                color: isDark ? '#ffffff' : '#111827',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2)'
              }}
              formatter={(val) => [val !== null ? `${val} ${currentMetricConfig.unit}` : 'Signal Lost', currentMetricConfig.label]}
              labelFormatter={(label) => `Time: ${label}`}
            />
            {currentMetricConfig.threshold && (
              <ReferenceLine 
                y={currentMetricConfig.threshold} 
                stroke="#f97316" 
                strokeDasharray="4 4" 
                label={{ 
                  value: currentMetricConfig.thresholdLabel, 
                  fill: '#f97316', 
                  fontSize: 10, 
                  position: 'insideTopRight' 
                }} 
              />
            )}
            <Area 
              type="monotone" 
              dataKey={activeMetric} 
              stroke={currentMetricConfig.color} 
              strokeWidth={2.5} 
              fillOpacity={1} 
              fill={`url(#gradient-${activeMetric})`} 
              connectNulls={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SensorHistoryChart;
