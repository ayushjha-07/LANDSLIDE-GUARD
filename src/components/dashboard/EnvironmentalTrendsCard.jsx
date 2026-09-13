import React, { useState } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import Card from '../common/Card';
import { useTheme } from '../../hooks/useTheme';

export const EnvironmentalTrendsCard = ({ envSeries, sensorValues, className = "" }) => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('moisture');

  const TABS = [
    { id: 'moisture', label: 'Soil Moisture', unit: '%', dataKey: 'moisture', color: isDark ? '#52b788' : '#2d6a4f', current: `${sensorValues.moisture}%` },
    { id: 'rainfall', label: 'Rainfall', unit: 'mm', dataKey: 'rainfall', color: '#0ea5e9', current: `${sensorValues.rainfall} mm` },
    { id: 'temperature', label: 'Temperature', unit: '°C', dataKey: 'temperature', color: '#f59e0b', current: `${sensorValues.temperature}°C` },
    { id: 'humidity', label: 'Humidity', unit: '%', dataKey: 'humidity', color: '#8b5cf6', current: `${sensorValues.humidity}%` },
  ];

  const currentTab = TABS.find(t => t.id === activeTab) || TABS[0];

  return (
    <Card
      title="Environmental Trends"
      subtitle="24-hour sensor telemetry progression"
      className={`min-w-0 ${className}`}
      action={
        <div className="flex items-center gap-1 p-1 rounded-xl bg-stone-100 dark:bg-forest-950 border border-stone-200/80 dark:border-forest-800/80">
          {TABS.map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-forest-800 text-stone-900 dark:text-white shadow-sm'
                  : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      }
    >
      <div className="flex items-center justify-between text-xs py-2 px-1 text-stone-500 dark:text-stone-400">
        <span>Selected parameter: <strong className="text-stone-800 dark:text-stone-200">{currentTab.label}</strong></span>
        <span className="font-mono font-bold text-forest-700 dark:text-nature-400">Current: {currentTab.current}</span>
      </div>

      <div className="h-64 sm:h-72 w-full min-w-0 pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={envSeries} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
            <defs>
              <linearGradient id="envTrendGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={currentTab.color} stopOpacity={0.4} />
                <stop offset="95%" stopColor={currentTab.color} stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#1e382b" : "#e2e8e4"} vertical={false} />
            <XAxis dataKey="time" stroke={isDark ? "#64748b" : "#94a3b8"} fontSize={11} tickLine={false} />
            <YAxis stroke={isDark ? "#64748b" : "#94a3b8"} fontSize={11} tickLine={false} unit={` ${currentTab.unit}`} />
            <Tooltip 
              contentStyle={{
                backgroundColor: isDark ? "#121c16" : "#ffffff",
                borderColor: isDark ? "#2d6a4f" : "#cbd5e1",
                borderRadius: "0.75rem",
                fontSize: "0.75rem",
                boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)"
              }}
            />
            <Area 
              type="monotone" 
              dataKey={currentTab.dataKey} 
              stroke={currentTab.color} 
              strokeWidth={2.5} 
              fillOpacity={1} 
              fill="url(#envTrendGrad)" 
              name={`${currentTab.label} (${currentTab.unit})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default EnvironmentalTrendsCard;
