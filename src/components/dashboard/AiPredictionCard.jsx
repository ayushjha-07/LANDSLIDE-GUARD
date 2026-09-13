import React from 'react';
import { BrainCircuit } from 'lucide-react';
import Card from '../common/Card';

export const AiPredictionCard = ({ sensorValues, riskAssessment, className = "" }) => {
  return (
    <Card 
      title="AI Risk Analysis" 
      subtitle="Multi-horizon temporal prediction"
      className={`min-w-0 flex flex-col justify-between ${className}`}
      action={
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-forest-500/15 text-forest-700 dark:text-nature-400 border border-forest-500/30">
          RF + LSTM / GRU
        </span>
      }
    >
      <div className="space-y-4 pt-1 text-xs">
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-xl bg-forest-50/70 dark:bg-forest-950/70 border border-forest-200/80 dark:border-forest-800/80">
            <span className="text-[10px] text-stone-500 dark:text-stone-400 block">Risk Score</span>
            <span className="text-xl sm:text-2xl font-extrabold font-heading text-stone-900 dark:text-white font-mono">
              {riskAssessment.riskScore} <span className="text-xs font-normal text-stone-400">/ 100</span>
            </span>
          </div>
          <div className="p-3 rounded-xl bg-forest-50/70 dark:bg-forest-950/70 border border-forest-200/80 dark:border-forest-800/80">
            <span className="text-[10px] text-stone-500 dark:text-stone-400 block">Current Classification</span>
            <span className="text-xl sm:text-2xl font-extrabold font-heading text-nature-600 dark:text-nature-400">
              SAFE
            </span>
          </div>
        </div>

        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2">
            Analysis Inputs
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
            <div className="p-2 rounded-lg bg-stone-50 dark:bg-forest-950/40 border border-stone-200/70 dark:border-forest-900/50">
              <span className="text-stone-400 block text-[10px]">Moisture</span>
              <strong className="text-stone-800 dark:text-stone-200 font-mono">{sensorValues.moisture}%</strong>
            </div>
            <div className="p-2 rounded-lg bg-stone-50 dark:bg-forest-950/40 border border-stone-200/70 dark:border-forest-900/50">
              <span className="text-stone-400 block text-[10px]">Rainfall</span>
              <strong className="text-stone-800 dark:text-stone-200 font-mono">{sensorValues.rainfall} mm</strong>
            </div>
            <div className="p-2 rounded-lg bg-stone-50 dark:bg-forest-950/40 border border-stone-200/70 dark:border-forest-900/50">
              <span className="text-stone-400 block text-[10px]">Tilt</span>
              <strong className="text-stone-800 dark:text-stone-200 font-mono">{sensorValues.tilt}°</strong>
            </div>
            <div className="p-2 rounded-lg bg-stone-50 dark:bg-forest-950/40 border border-stone-200/70 dark:border-forest-900/50">
              <span className="text-stone-400 block text-[10px]">Vibration</span>
              <strong className="text-stone-800 dark:text-stone-200 font-mono">{sensorValues.vibration}g</strong>
            </div>
            <div className="p-2 rounded-lg bg-stone-50 dark:bg-forest-950/40 border border-stone-200/70 dark:border-forest-900/50">
              <span className="text-stone-400 block text-[10px]">Temperature</span>
              <strong className="text-stone-800 dark:text-stone-200 font-mono">{sensorValues.temperature}°C</strong>
            </div>
            <div className="p-2 rounded-lg bg-stone-50 dark:bg-forest-950/40 border border-stone-200/70 dark:border-forest-900/50">
              <span className="text-stone-400 block text-[10px]">Humidity</span>
              <strong className="text-stone-800 dark:text-stone-200 font-mono">{sensorValues.humidity}%</strong>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-stone-100 dark:border-forest-900/50 flex items-center justify-between text-[11px] text-stone-500">
          <span className="inline-flex items-center gap-1">
            <BrainCircuit className="w-3.5 h-3.5 text-forest-600 dark:text-nature-400" />
            Random Forest + LSTM / GRU
          </span>
          <span className="text-amber-600 dark:text-amber-400 font-medium">Prototype Simulation</span>
        </div>
      </div>
    </Card>
  );
};

export default AiPredictionCard;
