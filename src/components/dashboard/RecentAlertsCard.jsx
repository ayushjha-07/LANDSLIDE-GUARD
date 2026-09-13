import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../common/Card';
import { useAlertContext } from '../../context/AlertContext';
import { DASHBOARD_ALERTS } from '../../data/dashboardData';

export const RecentAlertsCard = () => {
  const alertCtx = useAlertContext();
  const alertsToDisplay = alertCtx?.allAlerts ? alertCtx.allAlerts.slice(0, 4) : DASHBOARD_ALERTS;

  return (
    <Card 
      title="Recent Alerts" 
      subtitle="Threshold deviations & early warning event stream"
      className="min-w-0 flex flex-col justify-between"
      action={
        <Link to="/alerts" className="text-xs font-semibold text-forest-600 dark:text-nature-400 hover:underline inline-flex items-center gap-1">
          View All Alerts &rarr;
        </Link>
      }
    >
      <div className="space-y-3 pt-1">
        {alertsToDisplay.map(alert => (
          <div 
            key={alert.id}
            className="p-3 rounded-xl border border-stone-200/80 dark:border-forest-900/60 bg-stone-50/50 dark:bg-forest-950/30 space-y-1.5"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  alert.severity === 'High Risk'
                    ? 'bg-orange-500/15 text-orange-600 dark:text-orange-400 border border-orange-500/30'
                    : alert.severity === 'Warning'
                      ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                      : 'bg-stone-200/70 dark:bg-forest-900/60 text-stone-600 dark:text-stone-300'
                }`}>
                  {alert.severity}
                </span>
                <strong className="text-xs text-stone-900 dark:text-stone-100">{alert.title}</strong>
              </div>
              <span className="text-[10px] text-stone-400 flex-shrink-0">{alert.timestamp}</span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-stone-500 dark:text-stone-400 pt-0.5">
              <span className="font-mono text-stone-700 dark:text-stone-300 font-semibold">{alert.node}</span>
              <span className="truncate ml-2">{alert.details}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-3 border-t border-stone-100 dark:border-forest-900/50 text-center">
        <Link to="/alerts" className="text-xs font-semibold text-forest-600 dark:text-nature-400 hover:underline">
          View All Alerts &rarr;
        </Link>
      </div>
    </Card>
  );
};

export default RecentAlertsCard;
