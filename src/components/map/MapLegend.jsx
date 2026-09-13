import React from 'react';
import { Radio, Map as MapIcon, ShieldCheck } from 'lucide-react';
import Card from '../common/Card';

export const MapLegend = () => {
  return (
    <Card className="!p-4 w-full min-w-0">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        
        {/* Column 1: Monitoring Legend */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block font-mono">
            Monitoring Legend
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-50 dark:bg-forest-950/50 border border-stone-200 dark:border-forest-900/60">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2d6a4f]" />
              <span className="font-semibold text-stone-700 dark:text-stone-300">Safe (0–25)</span>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-50 dark:bg-forest-950/50 border border-stone-200 dark:border-forest-900/60">
              <span className="w-2.5 h-2.5 rounded-full bg-[#d97706]" />
              <span className="font-semibold text-stone-700 dark:text-stone-300">Warning (&gt;25–50)</span>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-50 dark:bg-forest-950/50 border border-stone-200 dark:border-forest-900/60">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ea580c]" />
              <span className="font-semibold text-stone-700 dark:text-stone-300">High Risk (&gt;50–75)</span>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-50 dark:bg-forest-950/50 border border-stone-200 dark:border-forest-900/60">
              <span className="w-2.5 h-2.5 rounded-full bg-[#dc2626]" />
              <span className="font-semibold text-stone-700 dark:text-stone-300">Critical (&gt;75–100)</span>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-50 dark:bg-forest-950/50 border border-stone-200 dark:border-forest-900/60">
              <span className="w-2.5 h-2.5 rounded-full bg-[#78716c]" />
              <span className="font-semibold text-stone-700 dark:text-stone-300">Offline / Unknown</span>
            </div>
          </div>
        </div>

        {/* Column 2: Himachal Geographic Context */}
        <div className="space-y-2 border-t md:border-t-0 md:border-l border-stone-100 dark:border-forest-900/50 pt-3 md:pt-0 md:pl-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block font-mono">
            Himachal Monitoring Corridor
          </span>
          <div className="space-y-1.5 text-[11px] text-stone-500 dark:text-stone-400">
            <div className="flex items-center justify-between">
              <span>Primary Sector</span>
              <strong className="text-stone-700 dark:text-stone-300 font-medium">Kullu–Manali / Beas Valley</strong>
            </div>
            <div className="flex items-center justify-between">
              <span>Geotechnical Highway</span>
              <span className="font-mono text-stone-600 dark:text-stone-300">NH-3 (Ghat Corridor)</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Elevation Range</span>
              <span className="text-stone-600 dark:text-stone-300 font-mono">1,280m &rarr; 2,050m MSL</span>
            </div>
          </div>
        </div>

        {/* Column 3: Map Data & Legal Tile Attribution */}
        <div className="space-y-2 border-t md:border-t-0 md:border-l border-stone-100 dark:border-forest-900/50 pt-3 md:pt-0 md:pl-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block font-mono">
            Map Data &amp; Attribution
          </span>
          <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-forest-950/50 border border-stone-200/80 dark:border-forest-900/60 space-y-1 text-[11px]">
            <div className="flex items-center gap-1.5 font-bold text-stone-800 dark:text-stone-200">
              <MapIcon className="w-3.5 h-3.5 text-forest-600 dark:text-nature-400" />
              <span>OpenStreetMap Basemap</span>
            </div>
            <p className="text-[10px] text-stone-500 dark:text-stone-400 leading-normal">
              Map tiles and geographic data &copy;{' '}
              <a 
                href="https://www.openstreetmap.org/copyright" 
                target="_blank" 
                rel="noreferrer"
                className="underline hover:text-forest-600 dark:hover:text-nature-400 font-medium"
              >
                OpenStreetMap contributors
              </a>.
            </p>
          </div>
        </div>

      </div>
    </Card>
  );
};

export default MapLegend;
