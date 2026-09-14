import React from 'react';
import { 
  Settings as SettingsIcon, 
  Activity, 
  ShieldAlert, 
  Gauge, 
  BellRing, 
  Send, 
  Cpu, 
  Sparkles, 
  User,
  ChevronRight
} from 'lucide-react';

export const SETTINGS_TABS = [
  { id: 'general', label: 'General', icon: SettingsIcon, desc: 'System identity & locale' },
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
        <label htmlFor="settings-tab-select" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          Configuration Category:
        </label>
        <select
          id="settings-tab-select"
          value={currentTab}
          onChange={(e) => handleSelect(e.target.value)}
          className="min-h-[44px] w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#0c121e] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs cursor-pointer"
        >
          {SETTINGS_TABS.map(tab => (
            <option key={tab.id} value={tab.id}>
              {tab.label} — {tab.desc}
            </option>
          ))}
        </select>
      </div>

      {/* Desktop Sidebar (>=1024px) */}
      <aside className="hidden lg:block w-72 flex-shrink-0 select-none" aria-label="Settings Categories">
        <div className="p-2 rounded-2xl bg-white dark:bg-[#0c121e] border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-1">
          {SETTINGS_TABS.map(tab => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleSelect(tab.id)}
                className={`min-h-[46px] w-full px-3.5 py-2.5 rounded-xl flex items-center justify-between gap-3 text-xs font-bold transition-all text-left group cursor-pointer ${
                  isActive
                    ? 'bg-[#0e4429] text-white shadow-sm dark:bg-[#0b3821]'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <Icon className={`w-4 h-4 flex-shrink-0 ${
                    isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400 group-hover:text-[#0e4429] dark:group-hover:text-emerald-400'
                  }`} />
                  <div className="min-w-0 flex-1">
                    <div className="truncate leading-tight">{tab.label}</div>
                    <div className={`text-[10.5px] font-normal truncate mt-0.5 ${
                      isActive ? 'text-emerald-100/90' : 'text-slate-400 dark:text-slate-500'
                    }`}>
                      {tab.desc}
                    </div>
                  </div>
                </div>

                <ChevronRight className={`w-4 h-4 flex-shrink-0 transition-transform ${
                  isActive ? 'text-white translate-x-0.5' : 'text-slate-300 dark:text-slate-600 group-hover:text-slate-400'
                }`} />
              </button>
            );
          })}
        </div>
      </aside>
    </>
  );
};

export default SettingsNav;
