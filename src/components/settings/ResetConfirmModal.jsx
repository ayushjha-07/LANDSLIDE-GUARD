import React from 'react';
import { AlertTriangle, X, RotateCcw } from 'lucide-react';

export const ResetConfirmModal = ({ isOpen, type, onClose, onConfirm }) => {
  if (!isOpen) return null;

  const titles = {
    reset_settings: 'Reset All Settings?',
    reset_simulation: 'Reset Simulation Data?',
    reset_everything: 'Reset Everything to Initial State?'
  };

  const descriptions = {
    reset_settings: 'This will reset all general, monitoring, risk, alert, device, and notification preferences to their prototype default values. Custom thresholds will revert to factory baselines.',
    reset_simulation: 'This will restore all 8 sensor nodes, simulated readings, and LoRa gateway packet statistics to their clean initial state (5 Safe, 1 Warning, 1 High Risk, 1 Offline).',
    reset_everything: 'This will reset all application settings, active risk alerts, scenario triggers, and node telemetry back to the deterministic initial prototype state.'
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-reset-title"
    >
      <div 
        className="fixed inset-0 bg-stone-950/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md my-6 rounded-2xl bg-white dark:bg-[#121c16] border border-stone-200 dark:border-forest-800 shadow-2xl z-10 overflow-hidden p-5 sm:p-6 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 dark:bg-amber-950/40 border border-amber-500/30 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="min-w-[44px] min-h-[44px] -mr-2 -mt-2 rounded-xl flex items-center justify-center text-stone-400 hover:text-stone-700 dark:hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div>
          <h3 id="modal-reset-title" className="text-lg font-bold font-heading text-stone-900 dark:text-white">
            {titles[type] || 'Confirm Action'}
          </h3>
          <p className="text-xs text-stone-600 dark:text-stone-300 mt-2 leading-relaxed">
            {descriptions[type] || 'Are you sure you want to proceed with this reset operation?'}
          </p>
        </div>

        <div className="pt-2 flex flex-col-reverse sm:flex-row sm:items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] w-full sm:w-auto px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-forest-900 dark:hover:bg-forest-800 text-stone-700 dark:text-stone-200 text-xs font-semibold transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm(type);
              onClose();
            }}
            className="min-h-[44px] w-full sm:w-auto px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold shadow-sm transition-colors flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Confirm Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetConfirmModal;
