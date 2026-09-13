import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Card from '../common/Card';
import MonitoringMap from '../map/MonitoringMap';

export const LiveMonitoringMapCard = ({ nodes = [], className = "" }) => {
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
      <div className="w-full min-w-0">
        <MonitoringMap
          variant="dashboard"
          nodes={nodes}
        />
      </div>
    </Card>
  );
};

export default LiveMonitoringMapCard;
