import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  X, 
  ShieldAlert, 
  CloudRain, 
  Droplets, 
  TrendingUp, 
  Activity, 
  Battery, 
  Wifi, 
  Clock, 
  CheckSquare, 
  CheckCircle2, 
  ExternalLink,
  MapPin,
  Cpu
} from 'lucide-react';
import StatusBadge from '../common/StatusBadge';

export const AlertDetailModal = ({ 
  alert, 
  isOpen, 
  onClose, 
  onAcknowledge, 
  onResolve 
}) => {
  const navigate = useNavigate();

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !alert) return null;

  const isAcknowledged = alert.status?.toLowerCase() === 'acknowledged';
  const isResolved = alert.status?.toLowerCase() === 'resolved';

  const handleNavigateNode = () => {
    onClose();
    navigate('/sensors');
  };

  const handleNavigateRisk = () => {
    onClose();
    navigate('/risk-analysis');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 dark:bg-black/80 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="alert-modal-title"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-xl bg-white dark:bg-forest-950 rounded-2xl border border-stone-200 dark:border-forest-800 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col pointer-events-auto"
        onClick={(e) => e.stopPropagation()}
        style={{ width: 'calc(100% - 32px)', maxWidth: '640px' }}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between p-5 border-b border-stone-200/80 dark:border-forest-800/80">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-xs font-bold text-stone-500 dark:text-stone-400">
                {alert.id}
              </span>
              <span className="text-stone-300 dark:text-stone-700">&bull;</span>
              <StatusBadge status={alert.severity} label={alert.severity?.toUpperCase()} />
              {isAcknowledged && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-sky-500/10 text-sky-700 dark:text-sky-300 border border-sky-500/20">
                  <CheckSquare className="w-3 h-3" />
                  Acknowledged
                </span>
              )}
              {isResolved && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                  <CheckCircle2 className="w-3 h-3" />
                  Resolved
                </span>
              )}
            </div>
            <h2 id="alert-modal-title" className="text-lg sm:text-xl font-bold font-heading text-stone-900 dark:text-white">
              {alert.title}
            </h2>
            <p className="text-xs font-medium text-stone-600 dark:text-stone-300 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-forest-600 dark:text-nature-400" />
              <strong className="text-stone-900 dark:text-white">{alert.node}</strong> — <span>{alert.location}</span>
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="min-w-[44px] min-h-[44px] -mr-2 -mt-2 rounded-xl flex items-center justify-center text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors focus:outline-none focus:ring-2 focus:ring-forest-500/30"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 overflow-y-auto space-y-5 text-xs text-stone-700 dark:text-stone-300">
          {/* Risk Score Highlight */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-stone-50 dark:bg-forest-900/40 border border-stone-200/80 dark:border-forest-800/60">
            <div className="flex items-center gap-2.5">
              <ShieldAlert className="w-5 h-5 text-orange-500 flex-shrink-0" />
              <div>
                <span className="text-xs font-bold text-stone-900 dark:text-white block">
                  Landslide Hazard Index
                </span>
                <span className="text-[11px] text-stone-500 dark:text-stone-400">
                  Synthesized multi-sensor slope classification
                </span>
              </div>
            </div>
            <div className="text-right font-mono">
              <span className="text-xl font-bold text-orange-600 dark:text-orange-400">
                {alert.riskScore}
              </span>
              <span className="text-xs text-stone-400"> / 100</span>
            </div>
          </div>

          {/* Section: Trigger Conditions */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 font-mono">
              Trigger Conditions (Snapshot)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {/* Rainfall */}
              <div className="p-3 rounded-xl bg-stone-50 dark:bg-forest-900/30 border border-stone-200/60 dark:border-forest-800/40">
                <span className="text-[11px] text-stone-500 dark:text-stone-400 flex items-center gap-1">
                  <CloudRain className="w-3.5 h-3.5 text-sky-500" />
                  Rainfall
                </span>
                <span className="text-base font-mono font-bold text-stone-900 dark:text-white block mt-1">
                  {alert.rainfall} mm
                </span>
              </div>

              {/* Soil Moisture */}
              <div className="p-3 rounded-xl bg-stone-50 dark:bg-forest-900/30 border border-stone-200/60 dark:border-forest-800/40">
                <span className="text-[11px] text-stone-500 dark:text-stone-400 flex items-center gap-1">
                  <Droplets className="w-3.5 h-3.5 text-nature-500" />
                  Soil Moisture
                </span>
                <span className="text-base font-mono font-bold text-stone-900 dark:text-white block mt-1">
                  {alert.soil ?? alert.moisture}%
                </span>
              </div>

              {/* Ground Tilt */}
              <div className="p-3 rounded-xl bg-stone-50 dark:bg-forest-900/30 border border-stone-200/60 dark:border-forest-800/40">
                <span className="text-[11px] text-stone-500 dark:text-stone-400 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-amber-500" />
                  Ground Tilt
                </span>
                <span className="text-base font-mono font-bold text-stone-900 dark:text-white block mt-1">
                  {alert.tilt}°
                </span>
              </div>

              {/* Vibration */}
              <div className="p-3 rounded-xl bg-stone-50 dark:bg-forest-900/30 border border-stone-200/60 dark:border-forest-800/40">
                <span className="text-[11px] text-stone-500 dark:text-stone-400 flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5 text-purple-500" />
                  Vibration
                </span>
                <span className="text-base font-mono font-bold text-stone-900 dark:text-white block mt-1">
                  {typeof alert.vibration === 'number' ? `${alert.vibration} g` : alert.vibration}
                </span>
              </div>
            </div>
          </div>

          {/* Section: Device Status */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 font-mono">
              Device Status
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-forest-900/30 border border-stone-200/60 dark:border-forest-800/40 flex items-center justify-between">
                <span className="text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
                  <Battery className="w-3.5 h-3.5 text-nature-500" />
                  Battery:
                </span>
                <span className="font-mono font-bold text-stone-900 dark:text-white">
                  {alert.battery}%
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-forest-900/30 border border-stone-200/60 dark:border-forest-800/40 flex items-center justify-between">
                <span className="text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
                  <Wifi className="w-3.5 h-3.5 text-sky-500" />
                  LoRa Signal:
                </span>
                <span className="font-mono font-bold text-stone-900 dark:text-white">
                  {alert.signal}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-forest-900/30 border border-stone-200/60 dark:border-forest-800/40 flex items-center justify-between">
                <span className="text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-stone-400" />
                  Last Update:
                </span>
                <span className="font-mono font-bold text-stone-900 dark:text-white">
                  Just now
                </span>
              </div>
            </div>
          </div>

          {/* Section: Recommended Prototype Action */}
          <div className="p-3.5 rounded-xl bg-amber-500/10 dark:bg-amber-950/30 border border-amber-500/30 text-amber-900 dark:text-amber-200 space-y-1">
            <h4 className="font-bold flex items-center gap-1.5 text-xs">
              <ShieldAlert className="w-4 h-4 text-amber-500" />
              Recommended Prototype Action
            </h4>
            <p className="text-xs leading-relaxed">
              {alert.recommendedAction || "Increase monitoring frequency and review the affected node."}
            </p>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 sm:p-5 border-t border-stone-200/80 dark:border-forest-800/80 bg-stone-50/50 dark:bg-forest-950/50 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Left: Cross-navigation buttons */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleNavigateNode}
              className="min-h-[44px] flex-1 sm:flex-none px-3.5 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-forest-900 hover:bg-stone-100 dark:hover:bg-forest-800 border border-stone-200 dark:border-forest-700 text-stone-800 dark:text-stone-200 transition-colors flex items-center justify-center gap-1.5"
            >
              <span>View Node</span>
              <ExternalLink className="w-3 h-3" />
            </button>
            <button
              type="button"
              onClick={handleNavigateRisk}
              className="min-h-[44px] flex-1 sm:flex-none px-3.5 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-forest-900 hover:bg-stone-100 dark:hover:bg-forest-800 border border-stone-200 dark:border-forest-700 text-stone-800 dark:text-stone-200 transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Risk Analysis</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          {/* Right: Operational Actions (Acknowledge / Resolve) */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            {!isAcknowledged && !isResolved && (
              <button
                type="button"
                onClick={() => onAcknowledge(alert.id)}
                className="min-h-[44px] flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-semibold bg-forest-800 hover:bg-forest-700 dark:bg-nature-600 dark:hover:bg-nature-500 text-white transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <CheckSquare className="w-3.5 h-3.5" />
                <span>Acknowledge</span>
              </button>
            )}

            {!isResolved && (
              <button
                type="button"
                onClick={() => onResolve(alert.id)}
                className="min-h-[44px] flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Resolve</span>
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="min-h-[44px] px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-forest-900 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertDetailModal;
