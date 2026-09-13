import React from 'react';
import Card from '../common/Card';
import { Cpu, Droplets, CloudRain, Compass, Activity, Thermometer, Wind } from 'lucide-react';
import { SENSOR_AVAILABILITY_STATS } from '../../data/mockHistoricalData';

export const SensorPerformanceCard = () => {
  const iconMap = {
    Droplets,
    CloudRain,
    Compass,
    Activity,
    Thermometer,
    Wind
  };

  return (
    <Card className="p-4 sm:p-5 flex flex-col space-y-4 w-full min-w-0">
      <div className="flex items-center justify-between border-b border-[#E2E8F0] dark:border-[#2D3748] pb-3">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-[#2B6CB0] dark:text-[#63B3ED]" />
          <h2 className="text-base sm:text-lg font-bold font-heading text-[#1A202C] dark:text-white">
            Sensor Performance
          </h2>
        </div>
        <span className="text-xs font-semibold text-[#38A169] dark:text-[#48BB78]">
          98.7% Aggregate Health
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {SENSOR_AVAILABILITY_STATS.map(sensor => {
          const Icon = iconMap[sensor.icon] || Activity;
          return (
            <div
              key={sensor.name}
              className="p-3.5 rounded-xl bg-[#F7FAFC] dark:bg-[#0E131F]/60 border border-[#E2E8F0] dark:border-[#2D3748] flex flex-col justify-between space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#2B6CB0]/10 dark:bg-[#2B6CB0]/25 text-[#2B6CB0] dark:text-[#63B3ED] flex items-center justify-center">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-semibold text-[#1A202C] dark:text-white">
                    {sensor.name}
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-[#38A169] dark:text-[#48BB78]">
                  {sensor.availability}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-[#E2E8F0] dark:bg-[#2D3748] rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-[#38A169] h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${sensor.availability}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[10px] text-[#718096] dark:text-[#A0AEC0]">
                <span>Telemetry Ingestion</span>
                <span className="font-semibold text-[#38A169]">{sensor.status}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-2 border-t border-[#E2E8F0] dark:border-[#2D3748] flex items-center justify-between text-xs text-[#718096] dark:text-[#A0AEC0]">
        <span>Coverage: All 8 monitoring stations</span>
        <span className="italic text-[11px] font-medium text-amber-600 dark:text-amber-400">
          Illustrative prototype statistics
        </span>
      </div>
    </Card>
  );
};

export default SensorPerformanceCard;
