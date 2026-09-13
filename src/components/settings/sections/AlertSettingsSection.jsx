import React from 'react';
import Card from '../../common/Card';
import { useSettings } from '../../../context/SettingsContext';
import { useToast } from '../../../context/ToastContext';
import { BellRing, CheckSquare, ArrowRight, Save, Info } from 'lucide-react';

export const AlertSettingsSection = () => {
  const { settings, updateSection } = useSettings();
  const { toast } = useToast();

  const alertConf = settings.alerts;

  const handleToggle = (key) => {
    const updated = { ...alertConf, [key]: !alertConf[key] };
    updateSection('alerts', updated);
    toast.info(`${key} changed to ${updated[key] ? 'ON' : 'OFF'}`, 'Alert Setting Updated');
  };

  const handleCooldownChange = (val) => {
    const updated = { ...alertConf, cooldownMinutes: Number(val) };
    updateSection('alerts', updated);
    toast.success('Alert deduplication cooldown adjusted.', 'Cooldown Saved');
  };

  return (
    <div className="space-y-4">
      <Card 
        title="Alert Generation &amp; Dispatch Rules" 
        subtitle="Configure automatic alert triggers, cooldown periods and auto-resolution behavior"
      >
        <div className="space-y-4 text-xs">
          {/* Automatic Generation Toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-stone-50 dark:bg-forest-950/50 border border-stone-200/80 dark:border-forest-900/60">
            <div className="min-w-0 pr-3">
              <span className="font-bold text-stone-900 dark:text-white block text-sm">
                Automatic Alert Generation
              </span>
              <span className="text-stone-500 dark:text-stone-400 text-xs">
                Dynamically create early warnings when risk scores enter Warning or High Risk tiers
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleToggle('automaticGeneration')}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                alertConf.automaticGeneration ? 'bg-emerald-500' : 'bg-stone-300 dark:bg-stone-700'
              }`}
              role="switch"
              aria-checked={alertConf.automaticGeneration}
              aria-label="Toggle automatic alert generation"
            >
              <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                alertConf.automaticGeneration ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Alert Deduplication */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-stone-50 dark:bg-forest-950/50 border border-stone-200/80 dark:border-forest-900/60">
              <div className="min-w-0 pr-2">
                <span className="font-bold text-stone-900 dark:text-white block">
                  Alert Deduplication
                </span>
                <span className="text-stone-500 text-[11px]">
                  Suppress repeated notifications for same station
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleToggle('deduplication')}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  alertConf.deduplication ? 'bg-emerald-500' : 'bg-stone-300 dark:bg-stone-700'
                }`}
                role="switch"
                aria-checked={alertConf.deduplication}
                aria-label="Toggle alert deduplication"
              >
                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                  alertConf.deduplication ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>

            {/* Alert Cooldown */}
            <div>
              <label htmlFor="cooldown-select" className="block text-stone-700 dark:text-stone-300 font-semibold mb-1.5">
                Alert Cooldown
              </label>
              <select
                id="cooldown-select"
                value={alertConf.cooldownMinutes}
                onChange={(e) => handleCooldownChange(e.target.value)}
                className="min-h-[44px] w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-forest-950/70 border border-stone-200 dark:border-forest-800 text-stone-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-forest-500"
              >
                <option value={1}>1 minute</option>
                <option value={5}>5 minutes (Default)</option>
                <option value={10}>10 minutes</option>
                <option value={30}>30 minutes</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Auto Resolve */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-stone-50 dark:bg-forest-950/50 border border-stone-200/80 dark:border-forest-900/60">
              <div className="min-w-0 pr-2">
                <span className="font-bold text-stone-900 dark:text-white block">
                  Auto Resolve
                </span>
                <span className="text-stone-500 text-[11px]">
                  Automatically resolve alert when risk stabilizes back to Safe
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleToggle('autoResolve')}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  alertConf.autoResolve ? 'bg-emerald-500' : 'bg-stone-300 dark:bg-stone-700'
                }`}
                role="switch"
                aria-checked={alertConf.autoResolve}
                aria-label="Toggle auto resolve"
              >
                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                  alertConf.autoResolve ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>

            {/* Require Acknowledgement */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-stone-50 dark:bg-forest-950/50 border border-stone-200/80 dark:border-forest-900/60">
              <div className="min-w-0 pr-2">
                <span className="font-bold text-stone-900 dark:text-white block">
                  Require Acknowledgement
                </span>
                <span className="text-stone-500 text-[11px]">
                  Alerts remain highlighted until verified by civil defense officer
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleToggle('requireAcknowledgement')}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  alertConf.requireAcknowledgement ? 'bg-emerald-500' : 'bg-stone-300 dark:bg-stone-700'
                }`}
                role="switch"
                aria-checked={alertConf.requireAcknowledgement}
                aria-label="Toggle require acknowledgement"
              >
                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                  alertConf.requireAcknowledgement ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* Prototype Alert Workflow Preview Diagram */}
      <Card 
        title="Prototype Alert Workflow" 
        subtitle="Deterministic 6-phase sequence from sensor telemetry acquisition to civil defense notification"
      >
        <div className="p-4 rounded-xl bg-stone-50 dark:bg-forest-950/50 border border-stone-200/80 dark:border-forest-900/60">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-center text-xs">
            <div className="p-2.5 rounded-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-forest-800 shadow-xs">
              <span className="text-[10px] font-mono text-stone-400 block mb-1">01</span>
              <strong className="text-stone-800 dark:text-stone-200 block text-[11px]">Sensor Change</strong>
              <span className="text-[9px] text-stone-400 block mt-0.5">Telemetry uplink</span>
            </div>

            <div className="p-2.5 rounded-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-forest-800 shadow-xs">
              <span className="text-[10px] font-mono text-stone-400 block mb-1">02</span>
              <strong className="text-stone-800 dark:text-stone-200 block text-[11px]">Risk Calculation</strong>
              <span className="text-[9px] text-stone-400 block mt-0.5">Weighted algorithm</span>
            </div>

            <div className="p-2.5 rounded-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-forest-800 shadow-xs">
              <span className="text-[10px] font-mono text-stone-400 block mb-1">03</span>
              <strong className="text-stone-800 dark:text-stone-200 block text-[11px]">Risk Threshold</strong>
              <span className="text-[9px] text-stone-400 block mt-0.5">Boundary check</span>
            </div>

            <div className="p-2.5 rounded-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-forest-800 shadow-xs">
              <span className="text-[10px] font-mono text-stone-400 block mb-1">04</span>
              <strong className="text-stone-800 dark:text-stone-200 block text-[11px]">Alert Generated</strong>
              <span className="text-[9px] text-stone-400 block mt-0.5">Snapshot recorded</span>
            </div>

            <div className="p-2.5 rounded-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-forest-800 shadow-xs">
              <span className="text-[10px] font-mono text-stone-400 block mb-1">05</span>
              <strong className="text-stone-800 dark:text-stone-200 block text-[11px]">Deduplication</strong>
              <span className="text-[9px] text-stone-400 block mt-0.5">Cooldown filter</span>
            </div>

            <div className="p-2.5 rounded-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-forest-800 shadow-xs">
              <span className="text-[10px] font-mono text-stone-400 block mb-1">06</span>
              <strong className="text-stone-800 dark:text-stone-200 block text-[11px]">Operator Notice</strong>
              <span className="text-[9px] text-stone-400 block mt-0.5">In-app toast & badge</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AlertSettingsSection;
