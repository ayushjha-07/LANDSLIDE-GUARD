import React from 'react';
import Card from '../common/Card';

export const BatteryHealthCard = ({ devices = [] }) => {
  return (
    <Card 
      title="Battery Health" 
      subtitle="Real-time power storage across all 8 geotechnical stations"
      action={
        <div className="flex items-center gap-2 text-[11px]">
          <span className="text-emerald-700 dark:text-emerald-400 font-semibold">&bull; Good (&gt;70%)</span>
          <span className="text-amber-700 dark:text-amber-400 font-semibold">&bull; Medium (50-70%)</span>
          <span className="text-red-700 dark:text-red-400 font-semibold">&bull; Low (&lt;50%)</span>
        </div>
      }
      className="w-full min-w-0"
    >
      <div className="space-y-3 pt-1">
        {devices.map((device) => {
          const battery = device.battery || 0;
          let barColor = 'bg-emerald-500';
          let statusLabel = 'Good';
          let textColor = 'text-emerald-700 dark:text-emerald-400';

          if (battery < 50) {
            barColor = 'bg-red-500';
            statusLabel = 'Low';
            textColor = 'text-red-700 dark:text-red-400';
          } else if (battery < 75) {
            barColor = 'bg-amber-500';
            statusLabel = 'Medium';
            textColor = 'text-amber-700 dark:text-amber-400';
          }

          return (
            <div key={device.id} className="flex items-center gap-3 text-xs">
              <div className="w-20 sm:w-24 font-mono font-semibold text-[#1A202C] dark:text-white truncate">
                {device.id}
              </div>
              <div className="flex-1 h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div 
                  className={"h-full rounded-full transition-all duration-500 " + barColor}
                  style={{ width: battery + '%' }}
                />
              </div>
              <div className="w-14 font-mono font-bold text-right text-[#1A202C] dark:text-white">
                {battery}%
              </div>
              <div className={"w-16 text-right font-semibold text-[11px] " + textColor}>
                {statusLabel}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default BatteryHealthCard;
