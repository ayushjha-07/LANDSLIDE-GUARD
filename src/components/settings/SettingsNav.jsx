import React from 'react';
import { 
  Sliders, 
  Activity, 
  ShieldAlert, 
  Gauge, 
  BellRing, 
  Send, 
  Cpu, 
  Sparkles, 
  User 
} from 'lucide-react';

export const SETTINGS_TABS = [
  { id: 'general', label: 'General', icon: Sliders, desc: 'System identity & locale' },
  { id: 'monitoring', label: 'Monitoring', icon: Activity, desc: 'Telemetry intervals' },
  { id: 'risk', label: 'Risk Thresholds', icon: ShieldAlert, desc: 'Hazard classifications' },
  { id: 'sensors', label: 'Sensor Thresholds', icon: Gauge, desc: 'Physical geotechnical limits' },
  { id: 'alerts', label: 'Alert Settings', icon: BellRing, desc: 'Workflow & cooldown' },
  { id: 'notifications', label: 'Notifications', icon: Send, desc: 'Channels & dispatches' },
  { id: 'devices', label: 'Devices & LoRa', icon: Cpu, desc: 'ESP32 & LoRa radio specs' },
  { id: 'simulation', label: 'Simulation & Demo', icon: Sparkles, desc: 'Controlled slope scenarios' },
  { id: 'account', label: 'Account', icon: User, desc: 'Operator profile & storage' },
];

export const SettingsNav = ({ activeTab, onTabChange, activeSection, onSelectSection }) => {
  const currentTab = activeTab || activeSection || 'general';
  const handleSelect = onTabChange || onSelectSection || (() => {});

  return (
    <>
      {/* Mobile Selector (<1024px): Clean, accessible dropdown */}
      <div className="block lg:hidden w-full mb-4">
        <label htmlFor="settings-tab-select" className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
          Configuration Category:
        </label>
        <select
          id="settings-tab-select"
          value={currentTab}
          onChange={(e) => handleSelect(e.target.value)}
          className="min-h-[44px] w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#121c16] border border-stone-200 dark:border-forest-800 text-stone-900 dark:text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-forest-500 shadow-sm"
        >
          {SETTINGS_TABS.map(tab => (
            <option key={tab.id} value={tab.id}>
              {tab.label} — {tab.desc}
            </option>
          ))}
        </select>
      </div>

      {/* Desktop Sidebar (>=1024px) */}
      <aside className="hidden lg:block w-72 flex-shrink-0 space-y-1.5" aria-label="Settings Categories">
        <div className="p-2 rounded-2xl bg-white dark:bg-[#121c16] border border-stone-200/80 dark:border-forest-900/60 shadow-xs space-y-1">
          {SETTINGS_TABS.map(tab => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleSelect(tab.id)}
                className={`min-h-[44px] w-full px-3.5 py-2.5 rounded-xl flex items-center gap-3 text-xs font-semibold transition-all text-left group ${
                  isActive
                    ? 'bg-forest-600 text-white dark:bg-forest-800 dark:text-nature-300 shadow-sm'
                    : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-forest-950/60'
                }`}
              >
                <Icon className={`w-4 h-4 flex-shrink-0 ${
                  isActive ? 'text-white dark:text-nature-300' : 'text-stone-400 group-hover:text-forest-600 dark:group-hover:text-nature-400'
                }`} />
                <div className="min-w-0 flex-1">
                  <div className="truncate">{tab.label}</div>
                  <div className={`text-[10px] font-normal truncate ${
                    isActive ? 'text-forest-100 dark:text-nature-400/80' : 'text-stone-400 dark:text-stone-500'
                  }`}>
                    {tab.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </aside>
    </>
  );
};

export default SettingsNav;
