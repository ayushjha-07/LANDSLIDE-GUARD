import React from 'react';
import Card from '../common/Card';
import { RECENT_NETWORK_ACTIVITY } from '../../data/mockDeviceData';

export const NetworkActivityCard = () => {
  return (
    <Card 
      title="Recent Network Activity" 
      subtitle="Chronological log of wireless LoRa telemetry transmissions and heartbeats"
      className="w-full min-w-0"
    >
      <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E2E8F0] dark:before:bg-[#2D3748] pt-2">
        {RECENT_NETWORK_ACTIVITY.map((item) => {
          let dotColor = 'bg-forest-500';
          if (item.status === 'critical') dotColor = 'bg-red-500';
          else if (item.status === 'warning') dotColor = 'bg-amber-500';
          else if (item.status === 'success') dotColor = 'bg-emerald-500';

          return (
            <div key={item.id} className="relative text-xs min-w-0">
              <span className={"absolute -left-6 top-1 w-2.5 h-2.5 rounded-full " + dotColor + " ring-4 ring-white dark:ring-[#1A202C]"} />

              <div className="flex items-baseline justify-between gap-2">
                <span className="font-bold text-[#1A202C] dark:text-white">
                  {item.node} &mdash; {item.event}
                </span>
                <span className="font-mono text-[10px] text-[#718096] dark:text-slate-400 flex-shrink-0">
                  {item.timestamp}
                </span>
              </div>
              <p className="text-[11px] text-[#718096] dark:text-slate-400 mt-0.5 leading-relaxed">
                {item.detail}
              </p>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default NetworkActivityCard;
