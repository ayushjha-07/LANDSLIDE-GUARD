import React from 'react';
import Card from '../../common/Card';
import { useSettings } from '../../../context/SettingsContext';
import { useToast } from '../../../context/ToastContext';
import { Cpu, Radio, Battery, Signal, AlertTriangle } from 'lucide-react';

export const DeviceSettingsSection = () => {
  const { settings, updateSection } = useSettings();
  const { toast } = useToast();

  const dev = settings.devices;
  const opts = dev.monitoringOptions;

  const handleOptionToggle = (key) => {
    const updated = {
      ...dev,
      monitoringOptions: {
        ...opts,
        [key]: !opts[key]
      }
    };
    updateSection('devices', updated);
    toast.info(`Option ${key} updated.`, 'Device Setting');
  };

  const handleFieldChange = (key, val) => {
    const num = parseInt(val, 10);
    const updated = {
      ...dev,
      [key]: isNaN(num) ? val : num
    };
    updateSection('devices', updated);
  };

  return (
    <div className="space-y-4 text-xs">
      <Card 
        title="Device Settings" 
        subtitle="Hardware microcontroller definitions, gateway topology & RF thresholds"
      >
        <div className="space-y-4">
          <div className="p-3.5 rounded-xl bg-stone-100 dark:bg-forest-950/40 border border-stone-200 dark:border-forest-900/60 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="block text-xs font-bold text-stone-800 dark:text-stone-200">Prototype configuration</strong>
              <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                Hardware parameters shown here represent simulated device models. These values are not certified hardware limits.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-stone-500 mb-1">Default Device Type</label>
              <input
                type="text"
                value={dev.defaultDeviceType}
                disabled
                className="min-h-[44px] w-full px-3 py-2 rounded-xl bg-stone-100 dark:bg-forest-950/30 border border-stone-200 dark:border-forest-900 text-stone-700 dark:text-stone-300 font-medium"
              />
            </div>

            <div>
              <label className="block text-stone-500 mb-1">Communication</label>
              <input
                type="text"
                value={dev.communication}
                disabled
                className="min-h-[44px] w-full px-3 py-2 rounded-xl bg-stone-100 dark:bg-forest-950/30 border border-stone-200 dark:border-forest-900 text-stone-700 dark:text-stone-300 font-medium"
              />
            </div>

            <div>
              <label className="block text-stone-500 mb-1">LoRa Gateway</label>
              <input
                type="text"
                value={dev.gateway}
                disabled
                className="min-h-[44px] w-full px-3 py-2 rounded-xl bg-stone-100 dark:bg-forest-950/30 border border-stone-200 dark:border-forest-900 font-mono font-bold text-stone-800 dark:text-stone-200"
              />
            </div>

            <div>
              <label className="block text-stone-500 mb-1">Gateway Status</label>
              <span className="min-h-[44px] w-full px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                {dev.gatewayStatus}
              </span>
            </div>

            <div>
              <label className="block text-stone-500 mb-1">Expected Sensor Nodes</label>
              <input
                type="number"
                value={dev.expectedNodes}
                onChange={(e) => handleFieldChange('expectedNodes', e.target.value)}
                className="min-h-[44px] w-full px-3 py-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-forest-700 font-mono font-bold text-center"
              />
            </div>

            <div>
              <label className="block text-stone-500 mb-1">Min Battery Warning (%)</label>
              <input
                type="number"
                value={dev.minBatteryWarning}
                onChange={(e) => handleFieldChange('minBatteryWarning', e.target.value)}
                className="min-h-[44px] w-full px-3 py-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-forest-700 font-mono font-bold text-center"
              />
            </div>

            <div>
              <label className="block text-stone-500 mb-1">Weak Signal Limit (dBm)</label>
              <input
                type="number"
                value={dev.weakSignalThreshold}
                onChange={(e) => handleFieldChange('weakSignalThreshold', e.target.value)}
                className="min-h-[44px] w-full px-3 py-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-forest-700 font-mono font-bold text-center"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Device Monitoring Options Card */}
      <Card 
        title="Device Monitoring Options" 
        subtitle="Automatic diagnostics checks performed on each incoming telemetry uplink"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 dark:bg-forest-950/50 border border-stone-200/70 dark:border-forest-900/60">
            <span className="font-semibold text-stone-800 dark:text-stone-200">Monitor Battery</span>
            <button
              type="button"
              onClick={() => handleOptionToggle('monitorBattery')}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                opts.monitorBattery ? 'bg-forest-600' : 'bg-stone-300 dark:bg-stone-700'
              }`}
              role="switch"
              aria-checked={opts.monitorBattery}
              aria-label="Toggle monitor battery"
            >
              <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                opts.monitorBattery ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 dark:bg-forest-950/50 border border-stone-200/70 dark:border-forest-900/60">
            <span className="font-semibold text-stone-800 dark:text-stone-200">Monitor LoRa Signal</span>
            <button
              type="button"
              onClick={() => handleOptionToggle('monitorSignal')}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                opts.monitorSignal ? 'bg-forest-600' : 'bg-stone-300 dark:bg-stone-700'
              }`}
              role="switch"
              aria-checked={opts.monitorSignal}
              aria-label="Toggle monitor signal"
            >
              <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                opts.monitorSignal ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 dark:bg-forest-950/50 border border-stone-200/70 dark:border-forest-900/60">
            <span className="font-semibold text-stone-800 dark:text-stone-200">Monitor Packet Loss</span>
            <button
              type="button"
              onClick={() => handleOptionToggle('monitorPacketLoss')}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                opts.monitorPacketLoss ? 'bg-forest-600' : 'bg-stone-300 dark:bg-stone-700'
              }`}
              role="switch"
              aria-checked={opts.monitorPacketLoss}
              aria-label="Toggle monitor packet loss"
            >
              <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                opts.monitorPacketLoss ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 dark:bg-forest-950/50 border border-stone-200/70 dark:border-forest-900/60">
            <span className="font-semibold text-stone-800 dark:text-stone-200">Monitor Offline Nodes</span>
            <button
              type="button"
              onClick={() => handleOptionToggle('monitorOfflineNodes')}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                opts.monitorOfflineNodes ? 'bg-forest-600' : 'bg-stone-300 dark:bg-stone-700'
              }`}
              role="switch"
              aria-checked={opts.monitorOfflineNodes}
              aria-label="Toggle monitor offline nodes"
            >
              <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                opts.monitorOfflineNodes ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 dark:bg-forest-950/50 border border-stone-200/70 dark:border-forest-900/60 sm:col-span-2">
            <span className="font-semibold text-stone-800 dark:text-stone-200">Show Device Alerts</span>
            <button
              type="button"
              onClick={() => handleOptionToggle('showDeviceAlerts')}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                opts.showDeviceAlerts ? 'bg-forest-600' : 'bg-stone-300 dark:bg-stone-700'
              }`}
              role="switch"
              aria-checked={opts.showDeviceAlerts}
              aria-label="Toggle show device alerts"
            >
              <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                opts.showDeviceAlerts ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DeviceSettingsSection;
