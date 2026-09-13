import React from 'react';
import { Link } from 'react-router-dom';
import { Droplets, CloudRain, Compass, Activity, Thermometer, Wind } from 'lucide-react';
import Card from '../common/Card';
import StatusBadge from '../common/StatusBadge';
import MiniSparkline from './MiniSparkline';
import { useTheme } from '../../hooks/useTheme';

export const LiveSensorReadings = ({ sensorValues, sparklines }) => {
  const { isDark } = useTheme();

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-lg sm:text-xl font-bold font-heading text-stone-900 dark:text-white">
            Live Sensor Readings
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Synchronized 3-second geotechnical &amp; hydrological telemetry
          </p>
        </div>
        <Link 
          to="/sensors" 
          className="min-h-[44px] inline-flex items-center gap-1 text-xs font-semibold text-forest-600 dark:text-nature-400 hover:underline"
        >
          All Sensors &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 w-full min-w-0">
        {/* Parameter 1: Soil Moisture */}
        <Card className="!p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-stone-500 mb-1">
            <span className="text-[11px] font-semibold truncate">Soil Moisture</span>
            <Droplets className="w-4 h-4 text-forest-600 dark:text-nature-400 flex-shrink-0" />
          </div>
          <div className="text-xl sm:text-2xl font-bold font-heading text-stone-900 dark:text-white font-mono my-1">
            {sensorValues.moisture}<span className="text-xs font-normal text-stone-400 ml-0.5">%</span>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-stone-100 dark:border-forest-900/50">
            <StatusBadge status="normal" label="Normal" className="!px-2 !py-0.5 !text-[10px]" />
            <MiniSparkline data={sparklines.moisture} color={isDark ? "#52b788" : "#2d6a4f"} />
          </div>
        </Card>

        {/* Parameter 2: Rainfall */}
        <Card className="!p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-stone-500 mb-1">
            <span className="text-[11px] font-semibold truncate">Rainfall</span>
            <CloudRain className="w-4 h-4 text-sky-500 flex-shrink-0" />
          </div>
          <div className="text-xl sm:text-2xl font-bold font-heading text-stone-900 dark:text-white font-mono my-1">
            {sensorValues.rainfall}<span className="text-xs font-normal text-stone-400 ml-0.5">mm</span>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-stone-100 dark:border-forest-900/50">
            <StatusBadge status="normal" label="Normal" className="!px-2 !py-0.5 !text-[10px]" />
            <MiniSparkline data={sparklines.rainfall} color="#0ea5e9" />
          </div>
        </Card>

        {/* Parameter 3: Ground Tilt */}
        <Card className="!p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-stone-500 mb-1">
            <span className="text-[11px] font-semibold truncate">Ground Tilt</span>
            <Compass className="w-4 h-4 text-forest-600 dark:text-nature-400 flex-shrink-0" />
          </div>
          <div className="text-xl sm:text-2xl font-bold font-heading text-forest-700 dark:text-nature-400 font-mono my-1">
            {sensorValues.tilt}<span className="text-xs font-normal text-stone-400 ml-0.5">°</span>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-stone-100 dark:border-forest-900/50">
            <StatusBadge status="normal" label="Stable" className="!px-2 !py-0.5 !text-[10px]" />
            <MiniSparkline data={sparklines.tilt} color={isDark ? "#52b788" : "#2d6a4f"} />
          </div>
        </Card>

        {/* Parameter 4: Vibration */}
        <Card className="!p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-stone-500 mb-1">
            <span className="text-[11px] font-semibold truncate">Vibration</span>
            <Activity className="w-4 h-4 text-amber-500 flex-shrink-0" />
          </div>
          <div className="text-xl sm:text-2xl font-bold font-heading text-stone-900 dark:text-white font-mono my-1">
            {sensorValues.vibration}<span className="text-xs font-normal text-stone-400 ml-0.5">g</span>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-stone-100 dark:border-forest-900/50">
            <StatusBadge status="normal" label="Normal" className="!px-2 !py-0.5 !text-[10px]" />
            <MiniSparkline data={sparklines.vibration} color="#f59e0b" />
          </div>
        </Card>

        {/* Parameter 5: Temperature */}
        <Card className="!p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-stone-500 mb-1">
            <span className="text-[11px] font-semibold truncate">Temperature</span>
            <Thermometer className="w-4 h-4 text-rose-500 flex-shrink-0" />
          </div>
          <div className="text-xl sm:text-2xl font-bold font-heading text-stone-900 dark:text-white font-mono my-1">
            {sensorValues.temperature}<span className="text-xs font-normal text-stone-400 ml-0.5">°C</span>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-stone-100 dark:border-forest-900/50">
            <StatusBadge status="normal" label="Normal" className="!px-2 !py-0.5 !text-[10px]" />
            <MiniSparkline data={sparklines.temperature} color="#f43f5e" />
          </div>
        </Card>

        {/* Parameter 6: Humidity */}
        <Card className="!p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-stone-500 mb-1">
            <span className="text-[11px] font-semibold truncate">Humidity</span>
            <Wind className="w-4 h-4 text-purple-500 flex-shrink-0" />
          </div>
          <div className="text-xl sm:text-2xl font-bold font-heading text-stone-900 dark:text-white font-mono my-1">
            {sensorValues.humidity}<span className="text-xs font-normal text-stone-400 ml-0.5">%</span>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-stone-100 dark:border-forest-900/50">
            <StatusBadge status="normal" label="Normal" className="!px-2 !py-0.5 !text-[10px]" />
            <MiniSparkline data={sparklines.humidity} color="#8b5cf6" />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LiveSensorReadings;
