import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Info } from 'lucide-react';
import Card from '../common/Card';
import MonitoringMap from '../map/MonitoringMap';
import { MAP_DISCLAIMERS } from '../map/mapConfig';

export const LiveMonitoringMapCard = ({ 
  nodes = [], 
  selectedNode = null,
  onSelectNode = null,
  className = "" 
}) => {
  return (
    <Card 
      title="Live Monitoring Map" 
      subtitle="Real-time sensor locations and terrain risk overview"
      className={`min-w-0 flex flex-col justify-between ${className}`}
      action={
        <Link 
          to="/map" 
          className="text-xs font-bold text-[#10b981] hover:text-emerald-400 hover:underline inline-flex items-center gap-1 min-h-[36px] px-2 py-1 rounded-lg hover:bg-emerald-500/10 transition-colors"
        >
          <span>Open Full Map</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      }
    >
      <div className="w-full min-w-0 flex flex-col gap-2.5">
        <MonitoringMap
          variant="dashboard"
          nodes={nodes}
          selectedNode={selectedNode}
          onSelectNode={onSelectNode}
        />

        {/* Real Geographic Basemap & Prototype Data Disclaimer */}
        <div className="flex items-start gap-2 px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 text-[11px] text-stone-600 dark:text-stone-400">
          <Info className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
          <p className="leading-snug">
            {MAP_DISCLAIMERS.dashboard}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default LiveMonitoringMapCard;
