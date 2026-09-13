import React from 'react';
import Card from '../../common/Card';
import { useSettings } from '../../../context/SettingsContext';
import { useToast } from '../../../context/ToastContext';
import { Activity, Clock, Shield, Info } from 'lucide-react';

export const MonitoringSection = () => {
  const { settings, updateSection } = useSettings();
  const { toast } = useToast();

  const mon = settings.monitoring;

  const handleToggle = (key) => {
    const updated = { ...mon, [key]: !mon[key] };
    updateSection('monitoring', updated);
    toast.info(`${key} set to ${updated[key] ? 'ON' : 'OFF'}`, 'Monitoring Updated');
  };

  const handleChange = (key, val) => {
    const updated = { ...mon, [key]: val };
    updateSection('monitoring', updated);
    toast.success('Telemetry update interval adjusted.', 'Monitoring Updated');
  };

  return (
    <div className="space-y-4">
      <Card 
        title="Monitoring Settings" 
        subtitle="Telemetry update frequencies, historical data windows and auto-refresh controls"
      >
        <div className="space-y-4 text-xs">
          {/* Live Updates Toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-stone-50 dark:bg-forest-950/50 border border-stone-200/80 dark:border-forest-900/60">
            <div className="min-w-0 pr-3">
              <span className="font-bold text-stone-900 dark:text-white block text-sm">
                Live Updates
              </span>
              <span className="text-stone-500 dark:text-stone-400 text-xs">
                Synchronized telemetry streaming from simulated IoT sensors
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleToggle('liveUpdates')}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                mon.liveUpdates ? 'bg-emerald-500' : 'bg-stone-300 dark:bg-stone-700'
              }`}
              role="switch"
              aria-checked={mon.liveUpdates}
              aria-label="Toggle live updates"
            >
              <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                mon.liveUpdates ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Update Interval */}
            <div>
              <label htmlFor="update-interval-select" className="block text-stone-700 dark:text-stone-300 font-semibold mb-1.5">
                Update Interval
              </label>
              <select
                id="update-interval-select"
                value={mon.updateInterval}
                onChange={(e) => handleChange('updateInterval', Number(e.target.value))}
                className="min-h-[44px] w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-forest-950/70 border border-stone-200 dark:border-forest-800 text-stone-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-forest-500"
              >
                <option value={1000}>1 second (High frequency)</option>
                <option value={3000}>3 seconds (Standard prototype default)</option>
                <option value={5000}>5 seconds</option>
                <option value={10000}>10 seconds</option>
                <option value={30000}>30 seconds (Power conservation)</option>
              </select>
            </div>

            {/* Historical Window */}
            <div>
              <label htmlFor="history-window-select" className="block text-stone-700 dark:text-stone-300 font-semibold mb-1.5">
                Historical Data Window
              </label>
              <select
                id="history-window-select"
                value={mon.historicalWindow}
                onChange={(e) => handleChange('historicalWindow', e.target.value)}
                className="min-h-[44px] w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-forest-950/70 border border-stone-200 dark:border-forest-800 text-stone-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-forest-500"
              >
                <option value="6 hours">6 hours</option>
                <option value="12 hours">12 hours</option>
                <option value="24 hours">24 hours (Recommended)</option>
                <option value="7 days">7 days</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            {/* Auto Refresh Toggle */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 dark:bg-forest-950/40 border border-stone-200/60 dark:border-forest-900/50">
              <span className="font-semibold text-stone-800 dark:text-stone-200">
                Auto Refresh UI
              </span>
              <button
                type="button"
                onClick={() => handleToggle('autoRefresh')}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  mon.autoRefresh ? 'bg-forest-600' : 'bg-stone-300 dark:bg-stone-700'
                }`}
                role="switch"
                aria-checked={mon.autoRefresh}
                aria-label="Toggle auto refresh"
              >
                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                  mon.autoRefresh ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>

            {/* Show Prototype Labels Toggle */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 dark:bg-forest-950/40 border border-stone-200/60 dark:border-forest-900/50">
              <span className="font-semibold text-stone-800 dark:text-stone-200">
                Show Prototype Labels
              </span>
              <button
                type="button"
                onClick={() => handleToggle('showPrototypeLabels')}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  mon.showPrototypeLabels ? 'bg-forest-600' : 'bg-stone-300 dark:bg-stone-700'
                }`}
                role="switch"
                aria-checked={mon.showPrototypeLabels}
                aria-label="Toggle prototype labels"
              >
                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                  mon.showPrototypeLabels ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-800 dark:text-blue-300 flex items-start gap-2 mt-2">
            <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
            <span>
              <strong>Resource Optimization:</strong> The telemetry interval adjusts timers in the shared state context. Intervals below 3s should only be used during live presentations.
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MonitoringSection;
