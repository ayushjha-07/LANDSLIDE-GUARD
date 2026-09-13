import React from 'react';
import { Battery, BatteryCharging, BatteryWarning } from 'lucide-react';

export const BatteryIndicator = ({ battery = 0, className = "" }) => {
  let colorClass = "text-nature-600 dark:text-nature-400";
  let bgClass = "bg-nature-500/10";

  if (battery <= 20) {
    colorClass = "text-rose-600 dark:text-rose-400";
    bgClass = "bg-rose-500/10";
  } else if (battery <= 50) {
    colorClass = "text-amber-600 dark:text-amber-400";
    bgClass = "bg-amber-500/10";
  }

  return (
    <div 
      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg ${bgClass} ${colorClass} ${className}`}
      title={`Battery: ${battery}%`}
      aria-label={`Battery level ${battery} percent`}
    >
      {battery <= 20 ? (
        <BatteryWarning className="w-3.5 h-3.5 flex-shrink-0" />
      ) : (
        <Battery className="w-3.5 h-3.5 flex-shrink-0" />
      )}
      <span className="font-mono font-bold text-xs">{battery}%</span>
    </div>
  );
};

export default BatteryIndicator;
