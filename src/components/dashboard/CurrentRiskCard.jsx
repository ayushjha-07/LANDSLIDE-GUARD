import React from 'react';
import Card from '../common/Card';
import RiskGauge from './RiskGauge';

export const CurrentRiskCard = ({ sensorValues, riskAssessment, className = "" }) => {
  return (
    <Card 
      title="Current Landslide Risk" 
      subtitle="Real-time multi-sensor hazard assessment"
      className={`min-w-0 flex flex-col justify-between ${className}`}
      action={
        <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-stone-100 dark:bg-forest-950 border border-stone-200 dark:border-forest-800 text-stone-600 dark:text-stone-300">
          Prototype Risk Analysis
        </span>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center py-2">
        {/* Left side: Circular Risk Gauge */}
        <div className="sm:col-span-5 flex flex-col items-center justify-center border-b sm:border-b-0 sm:border-r border-stone-100 dark:border-forest-900/60 pb-4 sm:pb-0 sm:pr-4">
          <RiskGauge score={riskAssessment.riskScore} level={riskAssessment.riskLevel} />
        </div>

        {/* Right side: Assessment summary & current sensor parameters */}
        <div className="sm:col-span-7 space-y-3.5 text-xs min-w-0">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">Current Assessment</h4>
            <p className="text-sm font-semibold text-stone-800 dark:text-stone-100 mt-0.5">
              Environmental conditions are currently stable.
            </p>
          </div>

          {/* 4 Key Sensor Parameter Badges */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-forest-950/60 border border-stone-200/70 dark:border-forest-800/60">
              <span className="text-[10px] text-stone-500 dark:text-stone-400 block">Soil Moisture</span>
              <span className="font-bold text-sm text-stone-800 dark:text-stone-100 font-mono">{sensorValues.moisture}%</span>
            </div>
            <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-forest-950/60 border border-stone-200/70 dark:border-forest-800/60">
              <span className="text-[10px] text-stone-500 dark:text-stone-400 block">Rainfall</span>
              <span className="font-bold text-sm text-stone-800 dark:text-stone-100 font-mono">{sensorValues.rainfall} mm</span>
            </div>
            <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-forest-950/60 border border-stone-200/70 dark:border-forest-800/60">
              <span className="text-[10px] text-stone-500 dark:text-stone-400 block">Ground Tilt</span>
              <span className="font-bold text-sm text-forest-600 dark:text-nature-400 font-mono">{sensorValues.tilt}°</span>
            </div>
            <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-forest-950/60 border border-stone-200/70 dark:border-forest-800/60">
              <span className="text-[10px] text-stone-500 dark:text-stone-400 block">Vibration</span>
              <span className="font-bold text-sm text-stone-800 dark:text-stone-100 font-mono">{sensorValues.vibration} g</span>
            </div>
          </div>

          {/* Trend & Prediction Window */}
          <div className="flex items-center justify-between pt-2 border-t border-stone-100 dark:border-forest-900/50 text-xs">
            <div>
              <span className="text-stone-400 text-[11px] block">Trend:</span>
              <span className="font-bold text-nature-600 dark:text-nature-400">Stable</span>
            </div>
            <div>
              <span className="text-stone-400 text-[11px] block">Prediction Window:</span>
              <span className="font-bold text-stone-800 dark:text-stone-200 font-mono">Next 6 Hours</span>
            </div>
            <div>
              <span className="text-stone-400 text-[11px] block">Factor of Safety:</span>
              <span className="font-bold text-stone-800 dark:text-stone-200 font-mono">{riskAssessment.factorOfSafety}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CurrentRiskCard;
