import React from 'react';
import { Clock, Eye, CheckCircle2, ShieldCheck, History } from 'lucide-react';
import Card from '../common/Card';
import StatusBadge from '../common/StatusBadge';

export const AlertHistoryTable = ({ alerts = [], onViewDetails }) => {
  if (!alerts || alerts.length === 0) {
    return (
      <div className="p-6 text-center text-xs text-stone-500 dark:text-stone-400 bg-stone-50 dark:bg-forest-950/20 rounded-xl border border-dashed border-stone-200 dark:border-forest-800">
        <History className="w-5 h-5 mx-auto mb-1.5 opacity-40" />
        No historical alerts recorded for current filters.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Desktop / Tablet Table View (Hidden on Small Mobile < 640px) */}
      <div className="hidden sm:block overflow-x-auto rounded-xl border border-stone-200/80 dark:border-forest-800/80">
        <table className="w-full text-left text-xs">
          <thead className="bg-stone-50 dark:bg-forest-900/60 text-stone-500 dark:text-stone-400 font-mono uppercase text-[10px] tracking-wider border-b border-stone-200/80 dark:border-forest-800/80">
            <tr>
              <th scope="col" className="py-3 px-4">Alert</th>
              <th scope="col" className="py-3 px-3">Node</th>
              <th scope="col" className="py-3 px-3">Severity</th>
              <th scope="col" className="py-3 px-3">Time</th>
              <th scope="col" className="py-3 px-3">Status</th>
              <th scope="col" className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 dark:divide-forest-800/50 bg-white dark:bg-forest-950/40">
            {alerts.map(alert => {
              const isResolved = alert.status?.toLowerCase() === 'resolved';

              return (
                <tr 
                  key={alert.id}
                  className="hover:bg-stone-50/80 dark:hover:bg-forest-900/30 transition-colors"
                >
                  {/* Alert Title */}
                  <td className="py-3 px-4">
                    <div className="font-semibold text-stone-900 dark:text-white">
                      {alert.title}
                    </div>
                    <div className="text-[11px] text-stone-500 dark:text-stone-400 truncate max-w-xs">
                      {alert.details}
                    </div>
                  </td>

                  {/* Node */}
                  <td className="py-3 px-3 font-mono font-medium text-stone-800 dark:text-stone-200 whitespace-nowrap">
                    <div>{alert.node}</div>
                    <div className="text-[10px] text-stone-400 font-sans">{alert.location}</div>
                  </td>

                  {/* Severity */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    <StatusBadge status={alert.severity} />
                  </td>

                  {/* Time */}
                  <td className="py-3 px-3 text-stone-500 dark:text-stone-400 whitespace-nowrap font-mono text-[11px]">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-stone-400" />
                      <span>{alert.timestamp}</span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    {isResolved ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                        <CheckCircle2 className="w-3 h-3" />
                        Resolved
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                        {alert.status}
                      </span>
                    )}
                  </td>

                  {/* Action */}
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => onViewDetails(alert)}
                      className="min-h-[36px] px-3 py-1.5 rounded-lg text-xs font-semibold bg-stone-100 hover:bg-stone-200 dark:bg-forest-800 dark:hover:bg-forest-700 text-stone-800 dark:text-stone-100 transition-colors inline-flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Details</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Card-Based History View (320px - 639px) */}
      <div className="sm:hidden space-y-2.5">
        {alerts.map(alert => (
          <div
            key={alert.id}
            className="p-3.5 rounded-xl border border-stone-200 dark:border-forest-800 bg-white dark:bg-forest-900/30 space-y-2"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-bold text-stone-900 dark:text-white text-xs">
                {alert.title}
              </span>
              <StatusBadge status={alert.severity} />
            </div>

            <div className="flex items-center justify-between text-[11px] text-stone-500 dark:text-stone-400">
              <span className="font-mono font-medium text-stone-800 dark:text-stone-200">
                {alert.node} &bull; {alert.location}
              </span>
              <span className="font-mono text-[10px]">{alert.timestamp}</span>
            </div>

            <div className="pt-2 border-t border-stone-100 dark:border-forest-800/60 flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-3 h-3" />
                {alert.status}
              </span>

              <button
                type="button"
                onClick={() => onViewDetails(alert)}
                className="min-h-[44px] px-3 py-1.5 rounded-lg text-xs font-semibold bg-stone-100 hover:bg-stone-200 dark:bg-forest-800 text-stone-800 dark:text-stone-100 transition-colors flex items-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Details</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertHistoryTable;
