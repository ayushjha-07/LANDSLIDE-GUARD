import React from 'react';
import { Cpu, Wifi, WifiOff, Radio, CheckCircle2, ShieldCheck } from 'lucide-react';
import Card from '../common/Card';

export const DeviceKpiGrid = ({ totalNodes = 8, onlineNodes = 7, offlineNodes = 1 }) => {
  const cards = [
    {
      title: 'Sensor Nodes',
      value: String(totalNodes).padStart(2, '0'),
      subtext: '8 stations deployed',
      icon: Cpu,
      color: 'text-forest-600 dark:text-nature-400',
      bg: 'bg-forest-500/10'
    },
    {
      title: 'Online',
      value: String(onlineNodes).padStart(2, '0'),
      subtext: 'Active telemetry links',
      icon: Wifi,
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-500/10'
    },
    {
      title: 'Offline',
      value: String(offlineNodes).padStart(2, '0'),
      subtext: 'Node 06 signal lost',
      icon: WifiOff,
      color: 'text-red-600 dark:text-red-400',
      bg: 'bg-red-500/10'
    },
    {
      title: 'LoRa Gateway',
      value: '01 Online',
      subtext: 'EDGE-GW-01 central',
      icon: Radio,
      color: 'text-forest-600 dark:text-nature-400',
      bg: 'bg-forest-500/10'
    },
    {
      title: 'Packet Success',
      value: '98.6%',
      subtext: 'Delivery rate',
      icon: CheckCircle2,
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-500/10'
    },
    {
      title: 'Network Health',
      value: 'GOOD',
      subtext: 'Optimal RF propagation',
      icon: ShieldCheck,
      color: 'text-forest-600 dark:text-nature-400',
      bg: 'bg-forest-500/10'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4 w-full min-w-0">
      {cards.map((item, idx) => {
        const Icon = item.icon;
        return (
          <Card key={idx} className="p-3.5 sm:p-4 hover:border-forest-400 dark:hover:border-forest-600 transition-all">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#718096] dark:text-slate-400 truncate">
                {item.title}
              </span>
              <div className={"w-7 h-7 rounded-lg flex items-center justify-center " + item.bg + " " + item.color + " flex-shrink-0"}>
                <Icon className="w-4 h-4" />
              </div>
            </div>
            <div className="text-xl sm:text-2xl font-bold font-heading text-[#1A202C] dark:text-white tracking-tight">
              {item.value}
            </div>
            <div className="text-[11px] text-[#718096] dark:text-slate-400 mt-0.5 truncate">
              {item.subtext}
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default DeviceKpiGrid;
