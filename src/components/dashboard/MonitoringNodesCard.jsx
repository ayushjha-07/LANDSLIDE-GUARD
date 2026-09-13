import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../common/Card';

export const MonitoringNodesCard = ({ nodes, selectedNodeId = null, onSelectNode = null, className = "" }) => {
  return (
    <Card 
      title="Monitoring Nodes" 
      subtitle="8 IoT stations across Himalayan slope sectors"
      className={`min-w-0 flex flex-col justify-between ${className}`}
      action={
        <Link to="/sensors" className="text-xs font-semibold text-forest-600 dark:text-nature-400 hover:underline inline-flex items-center gap-1">
          View All Sensors &rarr;
        </Link>
      }
    >
      <div className="divide-y divide-stone-100 dark:divide-forest-900/50 overflow-y-auto max-h-[380px] pr-1">
        {nodes.map(node => (
          <div 
            key={node.id}
            data-node-id={node.id}
            onClick={() => onSelectNode && onSelectNode(node)}
            className={`py-2.5 px-2.5 rounded-xl flex items-center justify-between gap-2 transition-all cursor-pointer ${
              selectedNodeId === node.id
                ? 'bg-emerald-500/15 dark:bg-emerald-500/20 ring-1 ring-emerald-500/50 shadow-xs'
                : 'hover:bg-stone-50/80 dark:hover:bg-forest-950/40'
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                node.status?.toLowerCase() === 'offline'
                  ? 'bg-stone-400'
                  : (node.risk === 'Critical' || node.risk?.level === 'critical')
                    ? 'bg-red-600 animate-pulse'
                    : (node.risk === 'High Risk' || node.risk?.level === 'high-risk')
                      ? 'bg-orange-500'
                      : (node.risk === 'Warning' || node.risk?.level === 'warning')
                        ? 'bg-amber-400'
                        : 'bg-nature-500'
              }`} />
              <div className="min-w-0">
                <div className="font-bold text-xs text-stone-900 dark:text-white truncate">
                  {node.id} <span className="font-normal text-stone-500 text-[11px] ml-1">&bull; {node.location?.name || node.location}</span>
                </div>
                <div className="text-[10px] text-stone-400">
                  Signal: <span className="font-mono text-stone-600 dark:text-stone-300">{node.signal}</span> &bull; {node.lastUpdate}
                </div>
              </div>
            </div>

            <div className="text-right flex-shrink-0">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                node.status?.toLowerCase() === 'offline'
                  ? 'bg-stone-100 dark:bg-stone-800 text-stone-500'
                  : (node.risk === 'Critical' || node.risk?.level === 'critical')
                    ? 'bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/30 font-bold'
                    : (node.risk === 'High Risk' || node.risk?.level === 'high-risk')
                      ? 'bg-orange-500/15 text-orange-600 dark:text-orange-400 border border-orange-500/30 font-bold'
                      : (node.risk === 'Warning' || node.risk?.level === 'warning')
                        ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                        : 'bg-nature-500/15 text-nature-700 dark:text-nature-400'
              }`}>
                {node.status?.toLowerCase() === 'offline' ? 'Offline' : (node.riskLevel || (node.risk?.level === 'critical' ? 'Critical' : node.risk?.level === 'high-risk' ? 'High Risk' : node.risk?.level === 'warning' ? 'Warning' : 'Safe'))}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-3 border-t border-stone-100 dark:border-forest-900/50 text-center">
        <Link 
          to="/sensors" 
          className="text-xs font-semibold text-forest-600 dark:text-nature-400 hover:underline"
        >
          View All Sensors &rarr;
        </Link>
      </div>
    </Card>
  );
};

export default MonitoringNodesCard;
