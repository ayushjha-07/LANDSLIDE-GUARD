import React from 'react';
import { Radio, ShieldCheck, CloudRain, Droplets, AlertTriangle, Wifi } from 'lucide-react';
import Card from '../common/Card';

export const TopKpiGrid = ({ sensorValues, riskAssessment }) => {
  const isSafe = riskAssessment.riskLevel === 'SAFE';

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4 w-full min-w-0">
      {/* KPI 1: SENSOR NODES */}
      <Card className="!p-3.5 sm:!p-4 relative overflow-hidden">
        <div className="flex items-center justify-between text-stone-500 dark:text-stone-400 mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider truncate">Sensor Nodes</span>
          <div className="p-1.5 rounded-lg bg-forest-50 dark:bg-forest-950/80 text-forest-600 dark:text-nature-400 flex-shrink-0">
            <Radio className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl sm:text-3xl font-extrabold font-heading text-stone-900 dark:text-white">08</div>
        <div className="mt-2 pt-2 border-t border-stone-100 dark:border-forest-900/50 flex items-center justify-between text-[11px]">
          <span className="font-semibold text-nature-600 dark:text-nature-400">7 Online</span>
          <span className="text-stone-400 dark:text-stone-500">1 Offline</span>
        </div>
      </Card>

      {/* KPI 2: CURRENT RISK */}
      <Card className="!p-3.5 sm:!p-4 relative overflow-hidden">
        <div className="flex items-center justify-between text-stone-500 dark:text-stone-400 mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider truncate">Current Risk</span>
          <div className="p-1.5 rounded-lg bg-nature-50 dark:bg-nature-950/80 text-nature-600 dark:text-nature-400 flex-shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>
        <div className={`text-xl sm:text-2xl xl:text-3xl font-extrabold font-heading uppercase tracking-tight ${
          isSafe 
            ? 'text-nature-600 dark:text-nature-400' 
            : riskAssessment.riskLevel === 'WARNING'
              ? 'text-amber-500 dark:text-amber-400'
              : riskAssessment.riskLevel === 'HIGH RISK'
                ? 'text-orange-500 dark:text-orange-400'
                : 'text-rose-500 dark:text-rose-400'
        }`}>
          {isSafe ? 'LOW' : riskAssessment.riskLevel}
        </div>
        <div className="mt-2 pt-2 border-t border-stone-100 dark:border-forest-900/50 flex items-center justify-between text-[11px]">
          <span className="text-stone-500 dark:text-stone-400 truncate">Score {riskAssessment.riskScore} / 100</span>
          <span className="font-semibold text-forest-700 dark:text-nature-400">{riskAssessment.trend}</span>
        </div>
      </Card>

      {/* KPI 3: RAINFALL */}
      <Card className="!p-3.5 sm:!p-4 relative overflow-hidden">
        <div className="flex items-center justify-between text-stone-500 dark:text-stone-400 mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider truncate">Rainfall</span>
          <div className="p-1.5 rounded-lg bg-sky-50 dark:bg-sky-950/80 text-sky-500 flex-shrink-0">
            <CloudRain className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl sm:text-3xl font-extrabold font-heading text-stone-900 dark:text-white font-mono">
          {sensorValues.rainfall} <span className="text-base font-normal text-stone-400">mm</span>
        </div>
        <div className="mt-2 pt-2 border-t border-stone-100 dark:border-forest-900/50 flex items-center justify-between text-[11px]">
          <span className="text-stone-500 dark:text-stone-400 truncate">Last 24 hours</span>
          <span className="font-semibold text-sky-600 dark:text-sky-400">&darr; 18%</span>
        </div>
      </Card>

      {/* KPI 4: SOIL MOISTURE */}
      <Card className="!p-3.5 sm:!p-4 relative overflow-hidden">
        <div className="flex items-center justify-between text-stone-500 dark:text-stone-400 mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider truncate">Soil Moisture</span>
          <div className="p-1.5 rounded-lg bg-forest-50 dark:bg-forest-950/80 text-forest-600 dark:text-nature-400 flex-shrink-0">
            <Droplets className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl sm:text-3xl font-extrabold font-heading text-stone-900 dark:text-white font-mono">
          {sensorValues.moisture}%
        </div>
        <div className="mt-2 pt-2 border-t border-stone-100 dark:border-forest-900/50 flex items-center justify-between text-[11px]">
          <span className="text-stone-500 dark:text-stone-400 truncate">Monitoring stable</span>
          <span className="font-semibold text-nature-600 dark:text-nature-400">&plusmn; 0.2%</span>
        </div>
      </Card>

      {/* KPI 5: ACTIVE ALERTS */}
      <Card className="!p-3.5 sm:!p-4 relative overflow-hidden">
        <div className="flex items-center justify-between text-stone-500 dark:text-stone-400 mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider truncate">Active Alerts</span>
          <div className="p-1.5 rounded-lg bg-orange-50 dark:bg-orange-950/80 text-orange-500 flex-shrink-0">
            <AlertTriangle className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl sm:text-3xl font-extrabold font-heading text-orange-600 dark:text-orange-400">02</div>
        <div className="mt-2 pt-2 border-t border-stone-100 dark:border-forest-900/50 flex items-center justify-between text-[11px]">
          <span className="text-amber-600 dark:text-amber-400 font-semibold">1 Warning</span>
          <span className="text-orange-600 dark:text-orange-400 font-semibold">1 High Risk</span>
        </div>
      </Card>

      {/* KPI 6: LoRa NETWORK */}
      <Card className="!p-3.5 sm:!p-4 relative overflow-hidden">
        <div className="flex items-center justify-between text-stone-500 dark:text-stone-400 mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider truncate">LoRa Network</span>
          <div className="p-1.5 rounded-lg bg-forest-50 dark:bg-forest-950/80 text-forest-600 dark:text-nature-400 flex-shrink-0">
            <Wifi className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl sm:text-3xl font-extrabold font-heading text-stone-900 dark:text-white font-mono">98.6%</div>
        <div className="mt-2 pt-2 border-t border-stone-100 dark:border-forest-900/50 flex items-center justify-between text-[11px]">
          <span className="text-stone-500 dark:text-stone-400 truncate">Packet success</span>
          <span className="font-semibold text-nature-600 dark:text-nature-400">Healthy</span>
        </div>
      </Card>
    </div>
  );
};

export default TopKpiGrid;
