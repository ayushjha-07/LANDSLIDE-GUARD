import React from 'react';
import { Info } from 'lucide-react';

export const DevicePrototypeNotice = () => {
  return (
    <div className="p-4 rounded-2xl bg-forest-50/70 dark:bg-forest-950/40 border border-forest-200/80 dark:border-forest-800/70 shadow-soft flex items-start gap-3 text-xs w-full min-w-0">
      <div className="p-1.5 rounded-lg bg-forest-100 dark:bg-forest-900/60 text-forest-700 dark:text-nature-300 flex-shrink-0 mt-0.5">
        <Info className="w-4 h-4" />
      </div>
      <div className="min-w-0">
        <h4 className="font-bold text-[#1A202C] dark:text-white text-xs">
          Prototype Device Monitoring
        </h4>
        <p className="text-[11px] text-[#718096] dark:text-slate-300 mt-0.5 leading-relaxed">
          ESP32, LoRa connectivity, gateway statistics and device health shown here are simulated for demonstration. Real hardware integration will be implemented in a later stage.
        </p>
      </div>
    </div>
  );
};

export default DevicePrototypeNotice;
