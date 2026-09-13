import React from 'react';
import Card from '../../common/Card';
import { useSettings } from '../../../context/SettingsContext';
import { useAuth } from '../../../context/AuthContext';
import { User, Sun, Moon, Database, RotateCcw, AlertTriangle, ExternalLink } from 'lucide-react';

export const AccountSection = ({ onRequestResetModal }) => {
  const { settings } = useSettings();
  const { user } = useAuth();
  const acc = user || settings.account;

  const handleOpenThemeControl = () => {
    const themeBtn = document.getElementById('header-theme-toggle') || document.querySelector('header button[title*="theme"], header button[title*="mode"], header button[aria-label*="mode"]');
    if (themeBtn) {
      themeBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
      themeBtn.focus();
      themeBtn.classList.add('ring-4', 'ring-forest-400', 'animate-bounce');
      setTimeout(() => {
        themeBtn.classList.remove('ring-4', 'ring-forest-400', 'animate-bounce');
      }, 1500);
    }
  };

  return (
    <div className="space-y-4 text-xs">
      {/* Account Profile Card */}
      <Card 
        title="Prototype Account" 
        subtitle="Operator profile and civil defense station administrative credentials"
      >
        <div className="flex items-center gap-4 p-4 rounded-xl bg-stone-50 dark:bg-forest-950/50 border border-stone-200/80 dark:border-forest-900/60">
          <div className="w-14 h-14 rounded-2xl bg-forest-600 dark:bg-forest-800 text-white dark:text-nature-300 font-bold text-xl font-heading flex items-center justify-center flex-shrink-0 shadow-sm">
            {acc.initials || 'AJ'}
          </div>
          <div className="min-w-0 flex-1 space-y-1">
            <h3 className="text-base font-bold font-heading text-stone-900 dark:text-white">
              {acc.name}
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              {acc.role}
            </p>
            <div className="flex items-center gap-2 pt-0.5">
              <span className="px-2 py-0.5 rounded-full bg-forest-500/10 text-forest-700 dark:text-nature-400 font-mono text-[10px] font-bold border border-forest-500/20">
                {acc.accountType}
              </span>
              <span className="text-stone-400 text-[11px]">&bull; Himalayan Slope Sector 04</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Appearance Info Card (Strict Single Theme Toggle Rule 19) */}
      <Card 
        title="Appearance &amp; Theme" 
        subtitle="Theme controlled by the global Light/Dark button in the header"
      >
        <div className="p-4 rounded-xl bg-stone-50 dark:bg-forest-950/50 border border-stone-200/80 dark:border-forest-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <strong className="block text-stone-900 dark:text-white font-semibold">
              Single Centralized Theme System
            </strong>
            <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
              The application uses exactly one unified Light/Dark mode toggle located in the main header bar.
            </p>
          </div>

          <button
            type="button"
            onClick={handleOpenThemeControl}
            className="min-h-[44px] px-4 py-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-forest-800 hover:bg-stone-100 dark:hover:bg-forest-900 text-stone-800 dark:text-stone-200 font-semibold shadow-xs transition-colors flex items-center justify-center gap-2 flex-shrink-0"
          >
            <span>Open Theme Control</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </Card>

      {/* Data Management Card */}
      <Card 
        title="Local Prototype Data Management" 
        subtitle="Manage browser localStorage cache and reset simulation states"
      >
        <div className="space-y-3">
          <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-forest-950/50 border border-stone-200/80 dark:border-forest-900/60">
            <span className="font-bold text-stone-900 dark:text-white block text-xs">
              Simulation data stored locally in browser
            </span>
            <span className="text-stone-500 text-[11px] block mt-0.5">
              Settings, telemetry logs, risk configurations, and alert histories are maintained in localStorage for offline demonstration.
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
            <button
              type="button"
              onClick={() => onRequestResetModal('reset_simulation')}
              className="min-h-[44px] px-4 py-2.5 rounded-xl bg-white dark:bg-[#121c16] hover:bg-stone-100 dark:hover:bg-forest-900/50 border border-stone-200 dark:border-forest-800 text-stone-800 dark:text-stone-200 font-semibold transition-colors flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5 text-stone-500" />
              <span>Reset Simulation Data</span>
            </button>

            <button
              type="button"
              onClick={() => onRequestResetModal('reset_settings')}
              className="min-h-[44px] px-4 py-2.5 rounded-xl bg-white dark:bg-[#121c16] hover:bg-stone-100 dark:hover:bg-forest-900/50 border border-stone-200 dark:border-forest-800 text-stone-800 dark:text-stone-200 font-semibold transition-colors flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5 text-stone-500" />
              <span>Reset Settings</span>
            </button>

            <button
              type="button"
              onClick={() => onRequestResetModal('reset_everything')}
              className="min-h-[44px] px-4 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-700 dark:text-red-400 border border-red-500/30 font-semibold transition-colors flex items-center justify-center gap-1.5"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
              <span>Reset Everything</span>
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AccountSection;
