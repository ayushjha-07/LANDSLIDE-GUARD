import React from 'react';
import { AlertTriangle, WifiOff, Info } from 'lucide-react';
import Card from '../common/Card';
import { DEVICE_ALERTS } from '../../data/mockDeviceData';

export const DeviceAlertsCard = () => {
  return (
    <Card 
      title="Device &amp; Communication Alerts" 
      subtitle="Hardware faults and RF propagation issues (Distinct from landslide risk alerts)"
      action={
        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30">
          2 Active Notices
        </span>
      }
      className="w-full min-w-0"
    >
      <div className="space-y-3 pt-1">
        {DEVICE_ALERTS.map((alert) => {
          const isWarning = alert.severity === 'System Warning';
          return (
            <div 
              key={alert.id} 
              className={"p-3.5 rounded-2xl border transition-all " + (
                isWarning 
                  ? 'bg-red-500/5 border-red-200 dark:border-red-900/60' 
                  : 'bg-amber-500/5 border-amber-200 dark:border-amber-900/60'
              )}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <div className="flex items-center gap-2 min-w-0">
                  {isWarning ? (
                    <WifiOff className="w-4 h-4 text-red-500 flex-shrink-0" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  )}
                  <span className="font-bold text-xs sm:text-sm text-[#1A202C] dark:text-white truncate">
                    {alert.title}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#718096] dark:text-slate-400 flex-shrink-0">
                  {alert.timestamp}
                </span>
              </div>

              <div className="text-[11px] text-[#718096] dark:text-slate-300 leading-relaxed mb-2">
                <strong className="text-[#1A202C] dark:text-white font-mono">{alert.location}:</strong> {alert.detail}
              </div>

              <div className="text-[11px] font-medium text-forest-700 dark:text-nature-400 bg-white dark:bg-[#1A202C] p-2 rounded-xl border border-[#E2E8F0] dark:border-[#2D3748]">
                &rarr; Recommended Action: {alert.action}
              </div>
            </div>
          );
        })}

        <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0E131F]/50 border border-[#E2E8F0] dark:border-[#2D3748] flex items-start gap-2.5 text-[11px] text-[#718096] dark:text-slate-400">
          <Info className="w-4 h-4 text-forest-600 flex-shrink-0 mt-0.5" />
          <span>
            <strong>System distinction:</strong> Device alerts track RF signal degradation, packet loss, or microcontroller battery depletion. They are handled separately from geotechnical slope hazard dispatches.
          </span>
        </div>
      </div>
    </Card>
  );
};

export default DeviceAlertsCard;
