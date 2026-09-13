import React from 'react';
import { ChevronRight, SearchX, RotateCcw } from 'lucide-react';
import Card from './common/Card';
import BatteryIndicator from './BatteryIndicator';
import SignalIndicator from './SignalIndicator';

export const NodeStatusTable = ({ nodes, onViewDetails, onResetFilters }) => {
  if (!nodes || nodes.length === 0) {
    return (
      <div className="py-16 px-4 text-center rounded-2xl border-2 border-dashed border-stone-200 dark:border-forest-900/60 bg-white/50 dark:bg-forest-950/20 max-w-lg mx-auto">
        <div className="w-12 h-12 rounded-full bg-stone-100 dark:bg-forest-900/40 text-stone-400 dark:text-stone-500 flex items-center justify-center mx-auto mb-3">
          <SearchX className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold font-heading text-stone-900 dark:text-white">
          No sensor nodes found
        </h3>
        <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 max-w-xs mx-auto">
          Try changing your search or filters to see monitoring stations.
        </p>
        <button
          type="button"
          onClick={onResetFilters}
          className="mt-4 min-h-[44px] px-4 py-2 rounded-xl bg-forest-600 hover:bg-forest-500 text-white text-xs font-semibold inline-flex items-center gap-2 shadow-sm transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Filters</span>
        </button>
      </div>
    );
  }

  return (
    <Card className="!p-0 overflow-hidden w-full min-w-0">
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left text-xs border-collapse min-w-[720px]">
          <thead>
            <tr className="border-b border-stone-200 dark:border-forest-900/80 bg-stone-50 dark:bg-forest-950/60 text-stone-500 dark:text-stone-400 font-semibold">
              <th className="py-3 px-4">Node</th>
              <th className="py-3 px-4">Location</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-3">Risk</th>
              <th className="py-3 px-3">Soil Moisture</th>
              <th className="py-3 px-3">Rainfall</th>
              <th className="py-3 px-3">Ground Tilt</th>
              <th className="py-3 px-3">Battery</th>
              <th className="py-3 px-3">Signal</th>
              <th className="py-3 px-4">Last Update</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 dark:divide-forest-900/40">
            {nodes.map(node => {
              const isOffline = node.status?.toLowerCase() === 'offline';

              const riskDisplay = isOffline
    ? 'Unknown'
    : (node.riskLevel || (node.risk?.level === 'high-risk' ? 'High Risk' : node.risk?.level === 'warning' ? 'Warning' : node.risk?.level === 'critical' ? 'Critical' : (typeof node.risk === 'string' ? node.risk : 'Safe')));

  let riskBadgeClass = "bg-nature-500/15 text-nature-700 dark:text-nature-400 border-nature-500/30";
  if (isOffline) {
    riskBadgeClass = "bg-stone-200 dark:bg-stone-800 text-stone-500 dark:text-stone-400 border-stone-300 dark:border-stone-700";
  } else if (riskDisplay === 'Critical' || node.risk?.level === 'critical') {
    riskBadgeClass = "bg-rose-500/15 text-rose-700 dark:text-rose-400 border-rose-500/30";
  } else if (riskDisplay === 'High Risk' || node.risk?.level === 'high-risk') {
    riskBadgeClass = "bg-orange-500/15 text-orange-700 dark:text-orange-400 border-orange-500/30 font-bold";
  } else if (riskDisplay === 'Warning' || node.risk?.level === 'warning') {
    riskBadgeClass = "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30";
  }

              return (
                <tr 
                  key={node.id}
                  data-node-id={node.id}
                  className="hover:bg-stone-50/80 dark:hover:bg-forest-950/40 transition-colors"
                >
                  {/* Node ID */}
                  <td className="py-3 px-4 font-mono font-bold text-stone-900 dark:text-white whitespace-nowrap">
                    {node.id}
                  </td>

                  {/* Location */}
                  <td className="py-3 px-4 text-stone-700 dark:text-stone-300 font-medium whitespace-nowrap">
                    {node.location?.name || node.location}
                  </td>

                  {/* Status */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    {isOffline ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-stone-500 dark:text-stone-400 bg-stone-200/70 dark:bg-stone-800 px-2 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-stone-400" /> Offline
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-nature-700 dark:text-nature-400 bg-nature-500/10 px-2 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-nature-500" /> Online
                      </span>
                    )}
                  </td>

                  {/* Risk Badge */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${riskBadgeClass}`}>
                      {riskDisplay}
                    </span>
                  </td>

                  {/* Soil */}
                  <td className="py-3 px-3 font-mono text-stone-800 dark:text-stone-200 whitespace-nowrap">
                    {isOffline ? (
                      <span className="text-stone-400">--</span>
                    ) : (
                      <span>{node.soil}%</span>
                    )}
                  </td>

                  {/* Rainfall */}
                  <td className="py-3 px-3 font-mono text-stone-800 dark:text-stone-200 whitespace-nowrap">
                    {isOffline ? (
                      <span className="text-stone-400">--</span>
                    ) : (
                      <span>{node.rain} mm</span>
                    )}
                  </td>

                  {/* Tilt */}
                  <td className="py-3 px-3 font-mono text-stone-800 dark:text-stone-200 whitespace-nowrap">
                    {isOffline ? (
                      <span className="text-stone-400">--</span>
                    ) : (
                      <span>{node.tilt}°</span>
                    )}
                  </td>

                  {/* Battery */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    <BatteryIndicator battery={node.battery} />
                  </td>

                  {/* Signal */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    <SignalIndicator signal={node.signal} signalStrength={node.signalStrength} />
                  </td>

                  {/* Last Update */}
                  <td className="py-3 px-4 text-stone-400 text-[11px] whitespace-nowrap">
                    {node.lastUpdate}
                  </td>

                  {/* Action */}
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => onViewDetails(node)}
                      className="min-h-[38px] px-3 py-1.5 rounded-lg bg-forest-50 dark:bg-forest-950/70 hover:bg-forest-100 dark:hover:bg-forest-900/60 border border-forest-200 dark:border-forest-800 text-forest-800 dark:text-nature-300 font-semibold text-xs inline-flex items-center gap-1 transition-colors"
                      aria-label={`View details for ${node.id}`}
                    >
                      <span>Details</span>
                      <ChevronRight className="w-3.5 h-3.5 text-forest-600 dark:text-nature-400" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default NodeStatusTable;
