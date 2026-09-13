import React from 'react';
import { ShieldCheck, Activity, AlertTriangle, Radio } from 'lucide-react';
import { useAlertContext } from '../../context/AlertContext';

export const EarlyWarningBanner = () => {
  const { summary } = useAlertContext();

  const formattedActive = summary.active < 10 ? `0${summary.active}` : `${summary.active}`;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-forest-950 via-forest-900 to-forest-950 text-white p-4 sm:p-5 md:p-6 border border-forest-800/80 shadow-md">
      {/* Background Decorative Rings */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 w-80 h-80 rounded-full bg-nature-500/5 blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left: System Status & Monitoring Statement */}
        <div className="space-y-1.5 max-w-xl">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="text-[11px] font-bold tracking-wider uppercase text-nature-400 font-mono">
              Early Warning System
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              MONITORING
            </span>
          </div>
          <h2 className="text-base sm:text-lg font-bold font-heading text-white">
            Real-Time Slope Geotechnical Surveillance Active
          </h2>
          <p className="text-xs text-forest-200/80 leading-relaxed">
            All monitored locations are currently being evaluated for moisture saturation, slope inclination creep, and harmonic vibration spikes.
          </p>
        </div>

        {/* Right: Key Summary Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 flex-shrink-0">
          {/* Nodes Online */}
          <div className="flex sm:flex-col items-center sm:items-start justify-between sm:justify-center p-3 rounded-xl bg-forest-900/60 border border-forest-700/50 backdrop-blur-sm min-w-[140px]">
            <span className="text-[11px] text-forest-300 flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-nature-400" />
              Nodes Online
            </span>
            <span className="text-sm sm:text-base font-mono font-bold text-white mt-0.5">
              {summary.onlineNodes} / {summary.totalNodes} Nodes Online
            </span>
          </div>

          {/* Active Alerts */}
          <div className="flex sm:flex-col items-center sm:items-start justify-between sm:justify-center p-3 rounded-xl bg-forest-900/60 border border-forest-700/50 backdrop-blur-sm min-w-[140px]">
            <span className="text-[11px] text-forest-300 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              Active Alerts
            </span>
            <span className="text-sm sm:text-base font-mono font-bold text-amber-300 mt-0.5">
              {formattedActive} Active Alerts
            </span>
          </div>

          {/* Highest Risk */}
          <div className="flex sm:flex-col items-center sm:items-start justify-between sm:justify-center p-3 rounded-xl bg-forest-900/60 border border-forest-700/50 backdrop-blur-sm min-w-[150px]">
            <span className="text-[11px] text-forest-300 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-orange-400" />
              Highest Risk
            </span>
            <span className="text-sm sm:text-base font-mono font-bold text-orange-300 mt-0.5">
              Highest Risk: {summary.highestNode?.id || "Node 05"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarlyWarningBanner;
