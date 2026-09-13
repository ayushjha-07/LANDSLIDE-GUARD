import React from 'react';
import Card from '../common/Card';

export const NodeSignalBarCard = ({ devices = [] }) => {
  return (
    <Card 
      title="LoRa Signal by Node" 
      subtitle="Received Signal Strength Indicator (RSSI) dBm per monitoring station"
      action={
        <span className="text-[11px] font-mono text-[#718096] dark:text-slate-400">
          Gateway: EDGE-GW-01
        </span>
      }
      className="w-full min-w-0"
    >
      <div className="space-y-3 pt-1">
        {devices.map((device) => {
          const isOffline = device.status === 'Offline';
          const rssi = device.signalStrength != null ? device.signalStrength : null;
          const pct = rssi != null ? Math.max(10, Math.min(100, (rssi + 100) * 2)) : 0;
          
          let barColor = 'bg-forest-600';
          let qualityText = 'Good';
          let qualityColor = 'text-forest-700 dark:text-nature-400';

          if (isOffline || rssi == null) {
            barColor = 'bg-slate-300 dark:bg-slate-700';
            qualityText = 'Unavailable';
            qualityColor = 'text-slate-400';
          } else if (rssi >= -70) {
            barColor = 'bg-emerald-500';
            qualityText = 'Excellent';
            qualityColor = 'text-emerald-700 dark:text-emerald-400';
          } else if (rssi <= -80) {
            barColor = 'bg-amber-500';
            qualityText = 'Fair / Weak';
            qualityColor = 'text-amber-700 dark:text-amber-400';
          }

          return (
            <div key={device.id} className="flex items-center gap-3 text-xs">
              <div className="w-20 sm:w-24 font-mono font-semibold text-[#1A202C] dark:text-white truncate">
                {device.id}
              </div>
              <div className="flex-1 h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div 
                  className={"h-full rounded-full transition-all duration-500 " + barColor}
                  style={{ width: (isOffline ? 0 : pct) + '%' }}
                />
              </div>
              <div className="w-24 font-mono font-bold text-right text-[#1A202C] dark:text-white">
                {isOffline ? 'Unavailable' : (rssi + ' dBm')}
              </div>
              <div className={"w-20 text-right font-semibold text-[11px] " + qualityColor}>
                {qualityText}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default NodeSignalBarCard;
