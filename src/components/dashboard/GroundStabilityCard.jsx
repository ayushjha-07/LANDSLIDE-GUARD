import React, { useState } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine } from 'recharts';
import Card from '../common/Card';
import { useTheme } from '../../hooks/useTheme';

export const GroundStabilityCard = ({ stabilitySeries, sensorValues, className = "" }) => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('tilt');

  return (
    <Card
      title="Ground Stability"
      subtitle="Subsurface inclinometer & micro-seismic monitoring"
      className={`min-w-0 ${className}`}
      action={
        <div className="flex items-center gap-1 p-1 rounded-xl bg-stone-100 dark:bg-forest-950 border border-stone-200/80 dark:border-forest-800/80">
          <button
            type="button"
            onClick={() => setActiveTab('tilt')}
            className={`px-3 py-1 rounded-lg text-[11px] font-semibold transition-all ${
              activeTab === 'tilt'
                ? 'bg-white dark:bg-forest-800 text-stone-900 dark:text-white shadow-sm'
                : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            Tilt (1.8°)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('vibration')}
            className={`px-3 py-1 rounded-lg text-[11px] font-semibold transition-all ${
              activeTab === 'vibration'
                ? 'bg-white dark:bg-forest-800 text-stone-900 dark:text-white shadow-sm'
                : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            Vibration (0.03 g)
          </button>
        </div>
      }
    >
      <div className="flex items-center justify-between text-xs py-2 px-1 text-stone-500 dark:text-stone-400">
        <div className="flex items-center gap-3">
          <span>Status: <strong className="text-nature-600 dark:text-nature-400">Stable</strong></span>
          <span className="hidden sm:inline text-stone-400">&bull; Threshold: {activeTab === 'tilt' ? '3.5°' : '0.05 g'}</span>
        </div>
        <span className="font-mono font-bold text-stone-800 dark:text-stone-200">
          Current: {activeTab === 'tilt' ? `${sensorValues.tilt}°` : `${sensorValues.vibration} g`}
        </span>
      </div>

      <div className="h-64 sm:h-72 w-full min-w-0 pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={stabilitySeries} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#1e382b" : "#e2e8e4"} vertical={false} />
            <XAxis dataKey="time" stroke={isDark ? "#64748b" : "#94a3b8"} fontSize={11} tickLine={false} />
            <YAxis 
              stroke={isDark ? "#64748b" : "#94a3b8"} 
              fontSize={11} 
              tickLine={false} 
              domain={activeTab === 'tilt' ? [1.5, 4.0] : [0.01, 0.06]}
              unit={activeTab === 'tilt' ? '°' : 'g'}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: isDark ? "#121c16" : "#ffffff",
                borderColor: isDark ? "#2d6a4f" : "#cbd5e1",
                borderRadius: "0.75rem",
                fontSize: "0.75rem",
                boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)"
              }}
            />
            {activeTab === 'tilt' && (
              <ReferenceLine y={3.5} stroke="#f59e0b" strokeDasharray="4 4" label={{ value: "Warning 3.5°", position: "top", fill: "#f59e0b", fontSize: 10 }} />
            )}
            {activeTab === 'vibration' && (
              <ReferenceLine y={0.05} stroke="#f59e0b" strokeDasharray="4 4" label={{ value: "Threshold 0.05g", position: "top", fill: "#f59e0b", fontSize: 10 }} />
            )}
            <Line 
              type="monotone" 
              dataKey={activeTab} 
              stroke={activeTab === 'tilt' ? (isDark ? "#52b788" : "#2d6a4f") : "#f59e0b"} 
              strokeWidth={2.5}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
              name={activeTab === 'tilt' ? "Tilt (°)" : "Vibration (g)"}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default GroundStabilityCard;
