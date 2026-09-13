import React from 'react';
import { Cpu, Battery, Signal, Clock, Eye } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';

export const DeviceCard = ({ device, onViewDetails }) => {
  const isOnline = device.status === 'Online';

  const battery = device.battery || 0;
  let batteryColor = 'bg-emerald-500';
  let batteryTextColor = 'text-emerald-700 dark:text-emerald-400';
  if (battery < 50) {
    batteryColor = 'bg-red-500';
    batteryTextColor = 'text-red-700 dark:text-red-400';
  } else if (battery < 75) {
    batteryColor = 'bg-amber-500';
    batteryTextColor = 'text-amber-700 dark:text-amber-400';
  }

  const signal = device.signal || 'Unavailable';

  return (
    <div className="p-4 rounded-2xl bg-white dark:bg-[#1A202C] border border-[#E2E8F0] dark:border-[#2D3748] shadow-soft hover:border-forest-400 dark:hover:border-forest-600 transition-all flex flex-col justify-between space-y-3.5 min-w-0">
      <div className="flex items-start justify-between gap-2 min-w-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className={"w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 " + (isOnline ? 'bg-forest-50 dark:bg-forest-950/70 text-forest-600 dark:text-nature-400 border border-forest-200 dark:border-forest-800' : 'bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800')}>
            <Cpu className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="font-bold text-sm sm:text-base font-heading text-[#1A202C] dark:text-white truncate">
              {device.id}
            </div>
            <div className="text-xs text-[#718096] dark:text-slate-400 truncate">
              {device.location?.name || device.location}
            </div>
          </div>
        </div>

        <StatusBadge 
          status={isOnline ? 'online' : 'offline'} 
          label={device.status} 
          pulse={isOnline}
        />
      </div>

      <div className="flex items-center gap-1.5 flex-wrap text-[11px] font-mono">
        <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[#4A5568] dark:text-slate-300">
          ESP32
        </span>
        <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[#4A5568] dark:text-slate-300">
          LoRa 868.1
        </span>
        <span className={"px-2 py-0.5 rounded border text-[10px] font-semibold " + (device.healthBadge || 'bg-slate-100')}>
          {device.deviceHealth || 'Healthy'}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-[#0E131F]/60 border border-[#E2E8F0] dark:border-[#2D3748] text-xs">
        <div>
          <span className="text-[10px] font-medium uppercase tracking-wider text-[#718096] dark:text-slate-400 block flex items-center gap-1">
            <Signal className="w-3 h-3 text-forest-500" /> LoRa Signal
          </span>
          <span className="font-mono font-bold text-[#1A202C] dark:text-white">
            {signal}
          </span>
        </div>
        <div>
          <span className="text-[10px] font-medium uppercase tracking-wider text-[#718096] dark:text-slate-400 block flex items-center gap-1">
            <Clock className="w-3 h-3 text-forest-500" /> Last Seen
          </span>
          <span className="font-mono font-bold text-[#1A202C] dark:text-white">
            {device.lastUpdate || 'Just now'}
          </span>
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#718096] dark:text-slate-400 flex items-center gap-1 text-[11px]">
            <Battery className="w-3.5 h-3.5" /> Battery Level
          </span>
          <span className={"font-mono font-bold " + batteryTextColor}>
            {battery}%
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
          <div 
            className={"h-full rounded-full transition-all duration-500 " + batteryColor} 
            style={{ width: battery + '%' }} 
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#E2E8F0] dark:border-[#2D3748]/60">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="text-[10px] uppercase tracking-wider text-[#718096] dark:text-slate-400">
            Risk:
          </span>
          <StatusBadge status={device.riskLevel?.toLowerCase() || device.risk?.level || 'safe'} label={device.riskLevel || (device.risk?.level === 'high-risk' ? 'High Risk' : device.risk?.level === 'warning' ? 'Warning' : 'Safe')} />
        </div>

        <button
          type="button"
          onClick={() => onViewDetails(device)}
          className="min-h-[38px] px-3 py-1.5 rounded-xl bg-forest-600 hover:bg-forest-700 text-white text-xs font-semibold shadow-soft transition-colors flex items-center gap-1.5 flex-shrink-0"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>View Device</span>
        </button>
      </div>
    </div>
  );
};

export default DeviceCard;
