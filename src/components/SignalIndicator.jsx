import React from 'react';
import { Wifi, WifiOff } from 'lucide-react';

export const SignalIndicator = ({ signal = "None", signalStrength = null, className = "" }) => {
  const isUnavailable = signal === "None" || signal === "Unavailable" || signalStrength === null;

  let quality = "Good";
  let colorClass = "text-nature-600 dark:text-nature-400";
  let bgClass = "bg-nature-500/10";

  if (isUnavailable) {
    quality = "Unavailable";
    colorClass = "text-stone-400 dark:text-stone-500";
    bgClass = "bg-stone-100 dark:bg-stone-800";
  } else if (signalStrength < -85) {
    quality = "Poor";
    colorClass = "text-orange-600 dark:text-orange-400";
    bgClass = "bg-orange-500/10";
  } else if (signalStrength < -75) {
    quality = "Fair";
    colorClass = "text-amber-600 dark:text-amber-400";
    bgClass = "bg-amber-500/10";
  }

  return (
    <div 
      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg ${bgClass} ${colorClass} ${className}`}
      title={`LoRa Signal: ${signal} (${quality})`}
      aria-label={`LoRa RF Signal ${signal}`}
    >
      {isUnavailable ? (
        <WifiOff className="w-3.5 h-3.5 flex-shrink-0" />
      ) : (
        <Wifi className="w-3.5 h-3.5 flex-shrink-0" />
      )}
      <span className="font-mono text-xs font-semibold">{signal}</span>
    </div>
  );
};

export default SignalIndicator;
