import React from 'react';
import Card from '../common/Card';
import { Activity, CheckCircle, AlertTriangle } from 'lucide-react';
import { SYSTEM_HEALTH_STATUS } from '../../data/mockHistoricalData';

export const SystemHealthCard = () => {
  return (
    <Card className="p-4 sm:p-5 flex flex-col justify-between space-y-4 w-full min-w-0">
      <div className="flex items-center justify-between border-b border-[#E2E8F0] dark:border-[#2D3748] pb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#2B6CB0] dark:text-[#63B3ED]" />
          <h2 className="text-base sm:text-lg font-bold font-heading text-[#1A202C] dark:text-white">
            System Health
          </h2>
        </div>
        <span className="text-xs font-semibold text-[#38A169] dark:text-[#48BB78]">
          5 / 6 Nominal
        </span>
      </div>

      <div className="space-y-2.5">
        {SYSTEM_HEALTH_STATUS.map(item => {
          const isWarning = item.level === 'warning';
          return (
            <div
              key={item.subsystem}
              className="p-2.5 sm:p-3 rounded-xl bg-[#F7FAFC] dark:bg-[#0E131F]/60 border border-[#E2E8F0] dark:border-[#2D3748] flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2.5">
                <span className={`w-2 h-2 rounded-full ${isWarning ? 'bg-[#EA580C] animate-pulse' : 'bg-[#38A169]'}`} />
                <div>
                  <span className="font-semibold text-[#1A202C] dark:text-white block">
                    {item.subsystem}
                  </span>
                  <span className="text-[10px] text-[#718096] dark:text-[#A0AEC0]">
                    {item.detail}
                  </span>
                </div>
              </div>

              <span className={`font-mono font-bold px-2 py-0.5 rounded text-[11px] ${
                isWarning 
                  ? 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20' 
                  : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
              }`}>
                {item.status}
              </span>
            </div>
          );
        })}
      </div>

      <div className="pt-2 border-t border-[#E2E8F0] dark:border-[#2D3748] text-[11px] text-[#718096] dark:text-[#A0AEC0] flex items-center justify-between">
        <span>Active Core Services</span>
        <span className="italic">Continuous pipeline polling</span>
      </div>
    </Card>
  );
};

export default SystemHealthCard;
