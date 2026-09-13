import React from 'react';
import { BarChart3, Clock, CheckCircle2, ShieldAlert } from 'lucide-react';
import Card from '../common/Card';
import { DEMO_ALERT_STATISTICS } from '../../data/mockAlerts';

export const AlertStatisticsCard = () => {
  const stats = [
    { label: "Alerts Today", value: "05", color: "text-stone-900 dark:text-white" },
    { label: "Warnings", value: "03", color: "text-amber-600 dark:text-amber-400" },
    { label: "High Risk", value: "01", color: "text-orange-600 dark:text-orange-400" },
    { label: "Critical", value: "00", color: "text-red-600 dark:text-red-400" },
    { label: "Resolved", value: "03", color: "text-emerald-600 dark:text-emerald-400" },
    { label: "Average Response", value: "4 min", color: "text-forest-700 dark:text-nature-400" },
  ];

  return (
    <Card 
      title="Alert Statistics" 
      subtitle="Operational performance and event metrics"
      className="p-4 sm:p-5"
    >
      <div className="space-y-3.5 pt-1">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {stats.map(item => (
            <div 
              key={item.label}
              className="p-3 rounded-xl bg-stone-50 dark:bg-forest-950/40 border border-stone-200/60 dark:border-forest-800/60"
            >
              <span className="text-[11px] text-stone-500 dark:text-stone-400 block truncate">
                {item.label}
              </span>
              <span className={`text-lg font-mono font-bold block mt-0.5 ${item.color}`}>
                {item.value}
              </span>
            </div>
          ))}
        </div>

        {/* Mandatory Demo Statistic Label */}
        <div className="p-2.5 rounded-xl bg-stone-100/70 dark:bg-forest-900/40 border border-stone-200/60 dark:border-forest-800/40 text-[11px] text-stone-500 dark:text-stone-400 leading-snug">
          <strong>Note:</strong> Average response time is a <span className="font-semibold text-stone-700 dark:text-stone-300">Demo statistic</span> calculated from simulated operator acknowledgment cycles.
        </div>
      </div>
    </Card>
  );
};

export default AlertStatisticsCard;
