import React from 'react';
import Card from '../common/Card';
import { Sparkles, Activity, Clock, Target, Layers } from 'lucide-react';

export const AiAnalyticsCard = () => {
  return (
    <Card className="p-4 sm:p-5 flex flex-col justify-between space-y-4 w-full min-w-0">
      <div className="flex items-center justify-between border-b border-[#E2E8F0] dark:border-[#2D3748] pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#2B6CB0] dark:text-[#63B3ED]" />
          <h2 className="text-base sm:text-lg font-bold font-heading text-[#1A202C] dark:text-white">
            AI Risk Analysis Summary
          </h2>
        </div>
        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#2B6CB0]/10 text-[#2B6CB0] dark:bg-[#2B6CB0]/25 dark:text-[#63B3ED] border border-[#2B6CB0]/20 uppercase tracking-wider">
          Prototype Simulation
        </span>
      </div>

      {/* Assessment banner */}
      <div className="p-3.5 rounded-xl bg-[#2B6CB0]/10 border border-[#2B6CB0]/20 text-xs">
        <span className="font-bold text-[#2B6CB0] dark:text-[#63B3ED] uppercase tracking-wider text-[10px] block mb-1">
          Current Assessment
        </span>
        <p className="text-[#1A202C] dark:text-[#CBD5E0] font-medium leading-relaxed">
          Low overall landslide risk across the monitoring area. Localized vigilance advised in Sector 7 drainage basin.
        </p>
      </div>

      {/* Primary Factors & Temporal Pattern */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div className="p-3 rounded-xl bg-[#F7FAFC] dark:bg-[#0E131F]/60 border border-[#E2E8F0] dark:border-[#2D3748]">
          <span className="text-[10px] uppercase tracking-wider text-[#718096] dark:text-[#A0AEC0] font-bold flex items-center gap-1.5 mb-1.5">
            <Layers className="w-3.5 h-3.5 text-[#2B6CB0]" />
            Primary Factors
          </span>
          <ul className="space-y-1 text-[#1A202C] dark:text-white font-medium list-disc list-inside">
            <li>Soil moisture</li>
            <li>Rainfall</li>
            <li>Ground tilt</li>
          </ul>
        </div>

        <div className="space-y-3">
          <div className="p-3 rounded-xl bg-[#F7FAFC] dark:bg-[#0E131F]/60 border border-[#E2E8F0] dark:border-[#2D3748]">
            <span className="text-[10px] uppercase tracking-wider text-[#718096] dark:text-[#A0AEC0] font-bold flex items-center gap-1.5 mb-1">
              <Activity className="w-3.5 h-3.5 text-[#38A169]" />
              Temporal Pattern
            </span>
            <span className="text-sm font-bold text-[#38A169] dark:text-[#48BB78]">Stable</span>
          </div>

          <div className="p-3 rounded-xl bg-[#F7FAFC] dark:bg-[#0E131F]/60 border border-[#E2E8F0] dark:border-[#2D3748] flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#718096] dark:text-[#A0AEC0] font-bold block">
                Highest Risk Node
              </span>
              <span className="text-sm font-bold text-[#EA580C]">Node 05</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase tracking-wider text-[#718096] dark:text-[#A0AEC0] font-bold block">
                Prediction Window
              </span>
              <span className="text-xs font-semibold text-[#1A202C] dark:text-white">Next 6 Hours</span>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-2 border-t border-[#E2E8F0] dark:border-[#2D3748] text-[11px] text-[#718096] dark:text-[#A0AEC0] italic">
        Model accuracy statistics will be calibrated upon field ML model deployment. Current indicators are rule-based prototype heuristics.
      </div>
    </Card>
  );
};

export default AiAnalyticsCard;
