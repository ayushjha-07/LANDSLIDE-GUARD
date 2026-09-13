import React from 'react';
import Card from '../../common/Card';
import { useSettings } from '../../../context/SettingsContext';
import { useToast } from '../../../context/ToastContext';
import { LayoutDashboard, BellRing, Mail, Smartphone, Volume2, CheckSquare, AlertCircle } from 'lucide-react';

export const NotificationsSection = () => {
  const { settings, updateSection } = useSettings();
  const { toast } = useToast();

  const { channels, preferences } = settings.notifications;

  const handleChannelToggle = (ch) => {
    if (ch === 'dashboard' || ch === 'visual') {
      toast.info('Dashboard and Visual Alerts are mandatory core channels.', 'Protected Channel');
      return;
    }
    const updated = {
      ...channels,
      [ch]: !channels[ch]
    };
    updateSection('notifications', { channels: updated, preferences });
    toast.info(`Channel ${ch.toUpperCase()} set to ${updated[ch] ? 'ON' : 'OFF'}`, 'Notification Channel');
  };

  const handlePreferenceToggle = (pref) => {
    const updated = {
      ...preferences,
      [pref]: !preferences[pref]
    };
    updateSection('notifications', { channels, preferences: updated });
    toast.info(`Preference updated: ${pref}`, 'Notification Preference');
  };

  return (
    <div className="space-y-4 text-xs">
      {/* Channels Status Card */}
      <Card 
        title="Notification Channels" 
        subtitle="Configured dispatch relays for operator warnings and community siren triggers"
      >
        <div className="space-y-3">
          {/* Dashboard */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 dark:bg-forest-950/50 border border-stone-200/70 dark:border-forest-900/60">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600">
                <LayoutDashboard className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-stone-900 dark:text-white block">Dashboard</span>
                <span className="text-[11px] text-stone-500">Real-time in-app incident cards and banners</span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
              Active
            </span>
          </div>

          {/* Visual Alerts */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 dark:bg-forest-950/50 border border-stone-200/70 dark:border-forest-900/60">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600">
                <BellRing className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-stone-900 dark:text-white block">Visual Alerts</span>
                <span className="text-[11px] text-stone-500">Pulsing badges, high-contrast banner overlays</span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
              Active
            </span>
          </div>

          {/* Email */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 dark:bg-forest-950/50 border border-stone-200/70 dark:border-forest-900/60">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-stone-900 dark:text-white">Email (Civil Defense)</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-300 font-mono">Prototype</span>
                </div>
                <span className="text-[11px] text-stone-500">SMTP emergency dispatch relay</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleChannelToggle('email')}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                channels.email ? 'bg-forest-600' : 'bg-stone-300 dark:bg-stone-700'
              }`}
              role="switch"
              aria-checked={channels.email}
              aria-label="Toggle email notifications"
            >
              <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                channels.email ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </button>
          </div>

          {/* SMS */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 dark:bg-forest-950/50 border border-stone-200/70 dark:border-forest-900/60">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-600">
                <Smartphone className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-stone-900 dark:text-white">SMS Broadcast</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-300 font-mono">Prototype</span>
                </div>
                <span className="text-[11px] text-stone-500">Cellular emergency text broadcast relay</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleChannelToggle('sms')}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                channels.sms ? 'bg-forest-600' : 'bg-stone-300 dark:bg-stone-700'
              }`}
              role="switch"
              aria-checked={channels.sms}
              aria-label="Toggle SMS notifications"
            >
              <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                channels.sms ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </button>
          </div>

          {/* Buzzer / LED */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 dark:bg-forest-950/50 border border-stone-200/70 dark:border-forest-900/60">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600">
                <Volume2 className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-stone-900 dark:text-white block">Buzzer / GPIO LED Siren</span>
                <span className="text-[11px] text-stone-500">ESP32 physical acoustic horn relay</span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/30">
              Hardware Integration Later
            </span>
          </div>

          <div className="p-3 rounded-xl bg-stone-100 dark:bg-forest-950/30 text-stone-500 dark:text-stone-400 text-[11px] flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-stone-400 flex-shrink-0" />
            <span>External notification channels are not connected in this prototype. Do not send real messages.</span>
          </div>
        </div>
      </Card>

      {/* Notification Preferences Card */}
      <Card 
        title="Notification Preferences" 
        subtitle="Select specific severity levels and system anomalies that trigger dispatch"
      >
        <div className="space-y-2">
          <span className="font-bold text-stone-800 dark:text-stone-200 block mb-2">Notify For:</span>
          
          <label className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-stone-50 dark:hover:bg-forest-950/40 cursor-pointer">
            <input 
              type="checkbox"
              checked={preferences.warning}
              onChange={() => handlePreferenceToggle('warning')}
              className="w-4 h-4 accent-amber-500 rounded"
            />
            <span className="font-medium text-stone-800 dark:text-stone-200">Warning (Score &gt;25–50)</span>
          </label>

          <label className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-stone-50 dark:hover:bg-forest-950/40 cursor-pointer">
            <input 
              type="checkbox"
              checked={preferences.highRisk}
              onChange={() => handlePreferenceToggle('highRisk')}
              className="w-4 h-4 accent-orange-500 rounded"
            />
            <span className="font-medium text-stone-800 dark:text-stone-200">High Risk (Score &gt;50–75)</span>
          </label>

          <label className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-stone-50 dark:hover:bg-forest-950/40 cursor-pointer">
            <input 
              type="checkbox"
              checked={preferences.critical}
              onChange={() => handlePreferenceToggle('critical')}
              className="w-4 h-4 accent-red-600 rounded"
            />
            <span className="font-medium text-stone-800 dark:text-stone-200">Critical (Score &gt;75–100)</span>
          </label>

          <label className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-stone-50 dark:hover:bg-forest-950/40 cursor-pointer">
            <input 
              type="checkbox"
              checked={preferences.deviceOffline}
              onChange={() => handlePreferenceToggle('deviceOffline')}
              className="w-4 h-4 accent-stone-500 rounded"
            />
            <span className="font-medium text-stone-800 dark:text-stone-200">Device Offline (RF link loss, e.g. Node 06)</span>
          </label>

          <label className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-stone-50 dark:hover:bg-forest-950/40 cursor-pointer">
            <input 
              type="checkbox"
              checked={preferences.weakSignal}
              onChange={() => handlePreferenceToggle('weakSignal')}
              className="w-4 h-4 accent-forest-600 rounded"
            />
            <span className="font-medium text-stone-800 dark:text-stone-200">Weak LoRa Signal (RSSI &lt; -85 dBm)</span>
          </label>
        </div>
      </Card>
    </div>
  );
};

export default NotificationsSection;
