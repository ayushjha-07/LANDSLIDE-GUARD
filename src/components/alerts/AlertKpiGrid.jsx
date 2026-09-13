import React from 'react';
import { Bell, AlertOctagon, AlertTriangle, AlertCircle, CheckCircle2 } from 'lucide-react';
import Card from '../common/Card';
import { useAlertContext } from '../../context/AlertContext';

export const AlertKpiGrid = () => {
  const { summary } = useAlertContext();

  const pad = (n) => (n < 10 ? `0${n}` : `${n}`);

  const kpis = [
    {
      id: "active",
      title: "Active Alerts",
      value: pad(summary.active),
      subtext: `Resolved Today: ${pad(summary.resolvedToday)}`,
      icon: Bell,
      color: "text-amber-500 dark:text-amber-400",
      bgColor: "bg-amber-500/10 dark:bg-amber-500/20",
      borderColor: "border-amber-200 dark:border-amber-900/40",
      badgeColor: "bg-amber-500/15 text-amber-700 dark:text-amber-300"
    },
    {
      id: "critical",
      title: "Critical",
      value: pad(summary.critical),
      subtext: "Immediate siren threshold",
      icon: AlertOctagon,
      color: "text-red-500 dark:text-red-400",
      bgColor: "bg-red-500/10 dark:bg-red-500/20",
      borderColor: "border-red-200 dark:border-red-900/40",
      badgeColor: "bg-red-500/15 text-red-700 dark:text-red-300"
    },
    {
      id: "high-risk",
      title: "High Risk",
      value: pad(summary.highRisk),
      subtext: "Operator action required",
      icon: AlertTriangle,
      color: "text-orange-500 dark:text-orange-400",
      bgColor: "bg-orange-500/10 dark:bg-orange-500/20",
      borderColor: "border-orange-200 dark:border-orange-900/40",
      badgeColor: "bg-orange-500/15 text-orange-700 dark:text-orange-300"
    },
    {
      id: "warning",
      title: "Warning",
      value: pad(summary.warning),
      subtext: "Elevated sensor telemetry",
      icon: AlertCircle,
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-500/10 dark:bg-amber-500/20",
      borderColor: "border-amber-200 dark:border-amber-900/40",
      badgeColor: "bg-amber-500/15 text-amber-700 dark:text-amber-300"
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full min-w-0">
      {kpis.map(kpi => {
        const Icon = kpi.icon;
        return (
          <div
            key={kpi.id}
            className={`p-4 rounded-2xl border bg-white dark:bg-forest-900/40 transition-all shadow-sm ${kpi.borderColor} flex flex-col justify-between`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-stone-600 dark:text-stone-300 truncate">
                {kpi.title}
              </span>
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${kpi.bgColor} ${kpi.color}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div className="my-2">
              <span className="text-2xl sm:text-3xl font-bold font-mono text-stone-900 dark:text-white">
                {kpi.value}
              </span>
            </div>

            <div className="pt-2 border-t border-stone-100 dark:border-forest-800/60 flex items-center justify-between gap-1 text-[11px] text-stone-500 dark:text-stone-400">
              <span className="truncate">{kpi.subtext}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AlertKpiGrid;
