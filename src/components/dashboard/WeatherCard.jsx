import React from 'react';
import { CloudRain } from 'lucide-react';
import Card from '../common/Card';
import { WEATHER_CONDITIONS } from '../../data/dashboardData';

export const WeatherCard = () => {
  return (
    <Card 
      title="Current Conditions" 
      subtitle="Atmospheric baseline telemetry"
      className="min-w-0 flex flex-col justify-between"
      action={<span className="text-[10px] font-mono text-stone-400">Demo Data</span>}
    >
      <div className="space-y-3.5 pt-1 text-xs">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-3xl font-extrabold font-heading text-stone-900 dark:text-white font-mono">
              {WEATHER_CONDITIONS.temperature}
            </div>
            <span className="text-xs text-stone-500 dark:text-stone-400">{WEATHER_CONDITIONS.condition}</span>
          </div>
          <CloudRain className="w-10 h-10 text-forest-600 dark:text-nature-400" />
        </div>

        <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-stone-100 dark:border-forest-900/50">
          <div className="p-2 rounded-lg bg-stone-50 dark:bg-forest-950/40">
            <span className="text-stone-400 block text-[10px]">Humidity</span>
            <strong className="text-stone-800 dark:text-stone-200">{WEATHER_CONDITIONS.humidity}</strong>
          </div>
          <div className="p-2 rounded-lg bg-stone-50 dark:bg-forest-950/40">
            <span className="text-stone-400 block text-[10px]">Wind Velocity</span>
            <strong className="text-stone-800 dark:text-stone-200">{WEATHER_CONDITIONS.wind}</strong>
          </div>
          <div className="p-2 rounded-lg bg-stone-50 dark:bg-forest-950/40">
            <span className="text-stone-400 block text-[10px]">Precipitation</span>
            <strong className="text-stone-800 dark:text-stone-200">{WEATHER_CONDITIONS.rainfall}</strong>
          </div>
          <div className="p-2 rounded-lg bg-stone-50 dark:bg-forest-950/40">
            <span className="text-stone-400 block text-[10px]">Barometric Pressure</span>
            <strong className="text-stone-800 dark:text-stone-200">{WEATHER_CONDITIONS.pressure}</strong>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WeatherCard;
