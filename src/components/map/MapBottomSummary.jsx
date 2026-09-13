import React from 'react';
import { MapPin, Mountain, Radio, CheckCircle2, AlertTriangle, Info } from 'lucide-react';

export const MapBottomSummary = ({
  totalCount = 8,
  onlineCount = 7,
  offlineCount = 1,
  highestRiskNode,
  className = ""
}) => {
  return (
    <div className={`p-4 rounded-2xl bg-[#0f172a]/95 dark:bg-[#0b1319]/95 backdrop-blur-md border border-stone-800 shadow-xl text-stone-300 grid grid-cols-1 md:grid-cols-12 gap-4 items-center ${className}`}>
      
      {/* Column 1: Monitoring Region (Col 1-3) */}
      <div className="md:col-span-3 flex items-start gap-3 border-b md:border-b-0 md:border-r border-stone-800 pb-3 md:pb-0 md:pr-4">
        <div className="p-2 rounded-xl bg-forest-950/60 border border-forest-800/80 text-[#10b981] flex-shrink-0">
          <MapPin className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block font-semibold">
            Monitoring Region
          </span>
          <strong className="text-sm font-bold text-white block truncate">
            Himachal Pradesh, India
          </strong>
          <span className="text-[11px] text-stone-400 block truncate">
            Kullu &ndash; Manali / Beas Valley
          </span>
        </div>
      </div>

      {/* Column 2: Sensor Node Counts & Highest Risk (Col 4-7) */}
      <div className="md:col-span-4 flex items-center justify-between gap-3 border-b md:border-b-0 md:border-r border-stone-800 pb-3 md:pb-0 md:pr-4">
        {/* Sensor Nodes */}
        <div className="flex items-center gap-2">
          <Radio className="w-4 h-4 text-[#10b981]" />
          <div>
            <span className="text-[10px] text-stone-400 uppercase block">Nodes</span>
            <strong className="text-sm font-bold text-white font-mono">{totalCount}</strong>
          </div>
        </div>

        {/* Online */}
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] ring-2 ring-[#10b981]/30" />
          <div>
            <span className="text-[10px] text-stone-400 uppercase block">Online</span>
            <strong className="text-sm font-bold text-[#10b981] font-mono">{onlineCount}</strong>
          </div>
        </div>

        {/* Offline */}
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-stone-500" />
          <div>
            <span className="text-[10px] text-stone-400 uppercase block">Offline</span>
            <strong className="text-sm font-bold text-stone-400 font-mono">{offlineCount}</strong>
          </div>
        </div>

        {/* Highest Risk */}
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-[#ef4444] flex-shrink-0" />
          <div>
            <span className="text-[10px] text-stone-400 uppercase block">Highest Risk</span>
            <div className="flex items-center gap-1">
              <strong className="text-xs font-bold font-mono text-white">
                {highestRiskNode?.id?.replace("NODE-", "Node ") || "Node 05"}
              </strong>
              <span className="text-[10px] font-bold text-[#ef4444]">
                {highestRiskNode?.riskLevel || "High Risk"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Column 3: Risk Legend (Col 8-9) */}
      <div className="md:col-span-2 flex items-center justify-center border-b md:border-b-0 md:border-r border-stone-800 pb-3 md:pb-0 md:pr-4">
        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[11px]">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#10b981]" />
            <span className="text-stone-300">Safe</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#dc2626]" />
            <span className="text-stone-300">Critical</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#f59e0b]" />
            <span className="text-stone-300">Warning</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-stone-500" />
            <span className="text-stone-400">Offline</span>
          </div>
          <div className="flex items-center gap-1.5 col-span-2">
            <span className="w-2 h-2 rounded-full bg-[#ea580c]" />
            <span className="text-stone-300">High Risk</span>
          </div>
        </div>
      </div>

      {/* Column 4: Map Disclaimer & Attribution (Col 10-12) */}
      <div className="md:col-span-3 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-[#10b981] flex-shrink-0 mt-0.5" />
        <div className="space-y-0.5 text-[11px]">
          <strong className="font-bold text-white text-xs block">
            Map Disclaimer
          </strong>
          <p className="text-[10px] text-stone-400 leading-tight">
            Real geographic basemap. Prototype sensor locations and risk data are simulated for demonstration and are not official hazard boundaries.
          </p>
          <span className="text-[10px] text-stone-500 block font-mono">
            &copy; OpenStreetMap contributors
          </span>
        </div>
      </div>

    </div>
  );
};

export default MapBottomSummary;
