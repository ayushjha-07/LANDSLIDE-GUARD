import React from 'react';
import { Wifi, Battery, CheckCircle2, Layers } from 'lucide-react';
import Card from '../common/Card';
import { DEVICE_HEALTH_OVERVIEW } from '../../data/mockDeviceData';

export const DeviceHealthCard = () => {
  const { score, status, breakdown, label } = DEVICE_HEALTH_OVERVIEW;

  const items = [
    { label: 'Connectivity', value: breakdown.connectivity + '%', icon: Wifi, color: 'text-forest-600 dark:text-nature-400' },
    { label: 'Battery Health', value: breakdown.battery + '%', icon: Battery, color: 'text-emerald-600 dark:text-emerald-400' },
    { label: 'Packet Delivery', value: breakdown.packetDelivery + '%', icon: CheckCircle2, color: 'text-emerald-600 dark:text-emerald-400' },
    { label: 'Sensor Availability', value: breakdown.sensorAvailability + '%', icon: Layers, color: 'text-forest-600 dark:text-nature-400' }
  ];

  return (
    <Card 
      title="Device Health Score" 
      subtitle="Comprehensive multi-factor hardware & communication index"
      action={
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400">
          {status}
        </span>
      }
      className="w-full min-w-0"
    >
      <div className="flex flex-col sm:flex-row items-center gap-6 pt-2">
        <div className="flex flex-col items-center justify-center w-32 h-32 rounded-3xl bg-forest-50/70 dark:bg-forest-950/50 border border-forest-200 dark:border-forest-800 shadow-soft flex-shrink-0 text-center">
          <span className="text-3xl sm:text-4xl font-black font-heading text-forest-700 dark:text-nature-400 tracking-tight">
            {score}
          </span>
          <span className="text-[10px] font-mono text-[#718096] dark:text-slate-400 uppercase tracking-widest mt-0.5">
            / 100
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 w-full min-w-0">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-[#0E131F]/50 border border-[#E2E8F0] dark:border-[#2D3748]">
                <div className="flex items-center gap-1.5 text-[11px] text-[#718096] dark:text-slate-400 mb-1">
                  <Icon className={"w-3.5 h-3.5 " + item.color} />
                  <span className="truncate">{item.label}</span>
                </div>
                <div className="text-base font-bold font-mono text-[#1A202C] dark:text-white">
                  {item.value}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <p className="text-[11px] text-[#718096] dark:text-slate-400 italic pt-3 mt-3 border-t border-[#E2E8F0] dark:border-[#2D3748]/60 text-center sm:text-left">
        {label}
      </p>
    </Card>
  );
};

export default DeviceHealthCard;
