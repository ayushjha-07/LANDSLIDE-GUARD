import React from 'react';
import { 
  AlertTriangle, 
  Clock, 
  CloudRain, 
  Droplets, 
  TrendingUp, 
  Activity,
  CheckSquare, 
  CheckCircle2, 
  Eye, 
  Radio, 
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import Card from '../common/Card';
import StatusBadge from '../common/StatusBadge';

export const ActiveAlertsList = ({ 
  alerts = [], 
  onViewDetails, 
  onAcknowledge, 
  onResolve 
}) => {
  if (!alerts || alerts.length === 0) {
    return (
      <Card className="p-8 text-center bg-stone-50/50 dark:bg-forest-950/20 border-dashed">
        <div className="mx-auto w-12 h-12 rounded-full bg-forest-500/10 dark:bg-nature-500/10 flex items-center justify-center text-forest-600 dark:text-nature-400 mb-3">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold font-heading text-stone-900 dark:text-white">
          No Active Alerts Matching Criteria
        </h3>
        <p className="text-xs text-stone-500 dark:text-stone-400 max-w-sm mx-auto mt-1">
          All monitored slope sectors are within normal baseline thresholds or filtered out.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {alerts.map((alert, index) => {
        const isAcknowledged = alert.status?.toLowerCase() === 'acknowledged';
        const isHighRisk = alert.severity?.toLowerCase() === 'high risk';
        const isCritical = alert.severity?.toLowerCase() === 'critical';

        return (
          <div
            key={alert.id}
            className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 bg-white dark:bg-forest-900/40 shadow-sm ${
              isCritical
                ? 'border-red-500/40 ring-1 ring-red-500/20'
                : isHighRisk
                  ? 'border-orange-500/40 ring-1 ring-orange-500/15'
                  : 'border-amber-500/30 ring-1 ring-amber-500/10'
            }`}
          >
            {/* Header: Title, Node, Severity & Timestamp */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-stone-100 dark:border-forest-800/60">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-mono font-bold text-stone-500 dark:text-stone-400">
                    ALERT 0{index + 1}
                  </span>
                  <span className="text-stone-300 dark:text-stone-600">&bull;</span>
                  <StatusBadge 
                    status={alert.severity} 
                    label={alert.severity?.toUpperCase()} 
                    pulse={isCritical || isHighRisk}
                  />
                  {isAcknowledged && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-sky-500/10 text-sky-700 dark:text-sky-300 border border-sky-500/20">
                      <CheckSquare className="w-3 h-3" />
                      Acknowledged
                    </span>
                  )}
                </div>
                <h3 className="text-base sm:text-lg font-bold font-heading text-stone-900 dark:text-white">
                  {alert.title}
                </h3>
                <p className="text-xs font-medium text-stone-600 dark:text-stone-300">
                  <span className="font-bold text-forest-700 dark:text-nature-400">{alert.node}</span> — <span>{alert.location}</span>
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 flex-shrink-0 self-start sm:self-auto">
                <Clock className="w-3.5 h-3.5 text-stone-400" />
                <span className="font-mono font-medium">
                  {isAcknowledged && alert.acknowledgedAt 
                    ? `Acknowledged ${alert.acknowledgedAt}`
                    : alert.timestamp}
                </span>
              </div>
            </div>

            {/* Trigger Conditions Summary Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 py-3.5">
              {/* Rainfall */}
              <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-forest-950/40 border border-stone-200/60 dark:border-forest-800/40">
                <span className="text-[11px] text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
                  <CloudRain className="w-3.5 h-3.5 text-sky-500" />
                  Rainfall
                </span>
                <span className="text-sm font-mono font-bold text-stone-900 dark:text-white block mt-0.5">
                  {typeof alert.rainfall === 'number' ? `${alert.rainfall} mm` : alert.rainfall || '—'}
                </span>
              </div>

              {/* Soil Moisture */}
              <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-forest-950/40 border border-stone-200/60 dark:border-forest-800/40">
                <span className="text-[11px] text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
                  <Droplets className="w-3.5 h-3.5 text-nature-500" />
                  Soil Moisture
                </span>
                <span className="text-sm font-mono font-bold text-stone-900 dark:text-white block mt-0.5">
                  {typeof alert.soil === 'number' ? `${alert.soil}%` : alert.soil || '—'}
                </span>
              </div>

              {/* Ground Tilt */}
              <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-forest-950/40 border border-stone-200/60 dark:border-forest-800/40">
                <span className="text-[11px] text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-amber-500" />
                  Ground Tilt
                </span>
                <span className="text-sm font-mono font-bold text-stone-900 dark:text-white block mt-0.5">
                  {typeof alert.tilt === 'number' ? `${alert.tilt}°` : alert.tilt || '—'}
                </span>
              </div>

              {/* Vibration */}
              <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-forest-950/40 border border-stone-200/60 dark:border-forest-800/40">
                <span className="text-[11px] text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-purple-500" />
                  Vibration
                </span>
                <span className="text-sm font-mono font-bold text-stone-900 dark:text-white block mt-0.5">
                  {typeof alert.vibration === 'number' ? `${alert.vibration} g` : alert.vibration || '—'}
                </span>
              </div>

              {/* Risk Score */}
              <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-forest-950/40 border border-stone-200/60 dark:border-forest-800/40 col-span-2 sm:col-span-1">
                <span className="text-[11px] text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-orange-500" />
                  Risk Score
                </span>
                <span className="text-sm font-mono font-bold text-stone-900 dark:text-white block mt-0.5">
                  {alert.riskScore} / 100
                </span>
              </div>
            </div>

            {/* Footer Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed truncate max-w-lg">
                {alert.details}
              </p>

              <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                <button
                  type="button"
                  onClick={() => onViewDetails(alert)}
                  aria-label={`View details for alert ${alert.id}`}
                  className="min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-semibold bg-stone-100 hover:bg-stone-200 dark:bg-forest-800 dark:hover:bg-forest-700 text-stone-800 dark:text-stone-100 transition-colors flex items-center justify-center gap-1.5 w-full sm:w-auto"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Details</span>
                </button>

                {!isAcknowledged ? (
                  <button
                    type="button"
                    onClick={() => onAcknowledge(alert.id)}
                    aria-label={`Acknowledge alert ${alert.id}`}
                    className="min-h-[44px] px-4 py-2 rounded-xl text-xs font-semibold bg-forest-800 hover:bg-forest-700 dark:bg-nature-600 dark:hover:bg-nature-500 text-white transition-colors flex items-center justify-center gap-1.5 w-full sm:w-auto shadow-sm"
                  >
                    <CheckSquare className="w-3.5 h-3.5" />
                    <span>Acknowledge</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => onResolve(alert.id)}
                    aria-label={`Resolve alert ${alert.id}`}
                    className="min-h-[44px] px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors flex items-center justify-center gap-1.5 w-full sm:w-auto shadow-sm"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Resolve</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ActiveAlertsList;
