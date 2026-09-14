import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import Card from '../common/Card';
import { SYSTEM_HEALTH_SUBSYSTEMS } from '../../data/dashboardData';
import sensorStationImg from '../../assets/sensor_station_field.jpg';

export const SystemHealthCard = () => {
  return (
    <Card 
      title="System Health" 
      subtitle="Subsystem diagnostics & watchdog state"
      className="min-w-0 flex flex-col justify-between"
    >
      <div className="space-y-3 pt-1 text-xs">
        {/* Real Field Monitoring Station Photograph - Equal aspect-video ratio */}
        <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-xs border border-stone-200/70 dark:border-forest-900/60 group bg-stone-100 dark:bg-[#0c1813]">
          <img 
            src={sensorStationImg} 
            alt="Solar-powered landslide monitoring field station, Himachal Pradesh" 
            className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {/* Subtle gradient scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          
          {/* Subtle field telemetry station tag */}
          <div className="absolute bottom-2 left-2 flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[10px] font-medium text-white border border-white/15 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Field Telemetry Station</span>
          </div>
        </div>

        {/* Subsystem Diagnostics List */}
        <div className="divide-y divide-stone-100 dark:divide-forest-900/40 text-xs">
          {SYSTEM_HEALTH_SUBSYSTEMS.map((sub, i) => (
            <div key={i} className="py-2.5 flex items-center justify-between gap-2 min-w-0">
              <div className="min-w-0 flex-1">
                <div className="font-semibold text-stone-800 dark:text-stone-200 text-xs sm:text-[13px] leading-tight">
                  {sub.name}
                </div>
                <div className="text-[10px] sm:text-[11px] text-stone-400 dark:text-stone-400 leading-tight mt-0.5">
                  {sub.note}
                </div>
              </div>
              <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-nature-600 dark:text-nature-400 bg-nature-500/10 px-2 py-0.5 rounded-full border border-nature-500/20 flex-shrink-0">
                <CheckCircle2 className="w-3 h-3 text-nature-500" />
                {sub.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default SystemHealthCard;

