import React from 'react';
import { CloudRain, Droplets, Wind, Gauge, MapPin } from 'lucide-react';
import Card from '../common/Card';
import { WEATHER_CONDITIONS } from '../../data/dashboardData';
import beasValleyImg from '../../assets/beas_valley.jpg';

export const WeatherCard = () => {
  return (
    <Card 
      title="Current Conditions" 
      subtitle="Atmospheric baseline telemetry"
      className="min-w-0 flex flex-col justify-between"
      action={
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-forest-50 dark:bg-forest-950/60 border border-forest-200/80 dark:border-forest-800/80 text-[10px] font-mono font-medium text-forest-700 dark:text-nature-400">
          <span className="w-1.5 h-1.5 rounded-full bg-nature-500 animate-pulse" />
          <span>Live</span>
        </div>
      }
    >
      <div className="space-y-3 pt-1 text-xs">
        {/* 16:9 Realistic Himalayan Mountain & River Valley Landscape */}
        <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-xs border border-stone-200/70 dark:border-forest-900/60 group bg-stone-100 dark:bg-[#0c1813]">
          <img 
            src={beasValleyImg} 
            alt="Beas River Valley Himalayan Landscape, Himachal Pradesh" 
            className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {/* Natural atmospheric gradient scrim for pristine contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />
          
          {/* Location Badge */}
          <div className="absolute bottom-2 left-2 flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[10px] font-medium text-white border border-white/15">
            <MapPin className="w-3 h-3 text-[#39B86A] flex-shrink-0" />
            <span className="truncate">Beas Valley, Himachal Pradesh</span>
          </div>

          {/* Sector Tag */}
          <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-md text-[9px] font-mono text-emerald-200 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#39B86A]" />
            <span>Kullu Sector</span>
          </div>
        </div>

        {/* Temperature & Condition Indicator */}
        <div className="flex items-center justify-between px-1">
          <div>
            <div className="text-3xl font-extrabold font-heading text-stone-900 dark:text-white font-mono leading-none">
              {WEATHER_CONDITIONS.temperature}
            </div>
            <span className="text-xs text-stone-500 dark:text-stone-400 font-medium block mt-1">
              {WEATHER_CONDITIONS.condition}
            </span>
          </div>
          <div className="p-2 rounded-xl bg-forest-50 dark:bg-forest-950/60 border border-forest-100 dark:border-forest-800/60">
            <CloudRain className="w-7 h-7 text-forest-600 dark:text-nature-400" />
          </div>
        </div>

        {/* Environmental Parameters Grid */}
        <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-stone-100 dark:border-forest-900/50">
          <div className="p-2 rounded-lg bg-stone-50 dark:bg-forest-950/40 border border-stone-100/80 dark:border-forest-900/30">
            <div className="flex items-center gap-1 text-stone-400 text-[10px] mb-0.5">
              <Droplets className="w-3 h-3 text-blue-500" />
              <span>Humidity</span>
            </div>
            <strong className="text-stone-800 dark:text-stone-200">{WEATHER_CONDITIONS.humidity}</strong>
          </div>

          <div className="p-2 rounded-lg bg-stone-50 dark:bg-forest-950/40 border border-stone-100/80 dark:border-forest-900/30">
            <div className="flex items-center gap-1 text-stone-400 text-[10px] mb-0.5">
              <Wind className="w-3 h-3 text-teal-500" />
              <span>Wind Velocity</span>
            </div>
            <strong className="text-stone-800 dark:text-stone-200">{WEATHER_CONDITIONS.wind}</strong>
          </div>

          <div className="p-2 rounded-lg bg-stone-50 dark:bg-forest-950/40 border border-stone-100/80 dark:border-forest-900/30">
            <div className="flex items-center gap-1 text-stone-400 text-[10px] mb-0.5">
              <CloudRain className="w-3 h-3 text-forest-500" />
              <span>Precipitation</span>
            </div>
            <strong className="text-stone-800 dark:text-stone-200">{WEATHER_CONDITIONS.rainfall}</strong>
          </div>

          <div className="p-2 rounded-lg bg-stone-50 dark:bg-forest-950/40 border border-stone-100/80 dark:border-forest-900/30">
            <div className="flex items-center gap-1 text-stone-400 text-[10px] mb-0.5">
              <Gauge className="w-3 h-3 text-purple-500" />
              <span>Barometric Pressure</span>
            </div>
            <strong className="text-stone-800 dark:text-stone-200">{WEATHER_CONDITIONS.pressure}</strong>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WeatherCard;
