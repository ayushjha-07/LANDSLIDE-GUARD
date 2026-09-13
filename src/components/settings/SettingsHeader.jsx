import React from 'react';
import { RotateCcw, CheckCircle2 } from 'lucide-react';

export const SettingsHeader = ({ onResetClick }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200/80 dark:border-forest-900/60 pb-5 w-full min-w-0">
      <div className="min-w-0">
        <div className="flex items-center gap-2 text-xs font-semibold text-stone-500 dark:text-stone-400 mb-1.5 flex-wrap">
          <span>Home</span>
          <span>/</span>
          <span className="text-forest-700 dark:text-nature-400">Settings</span>
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-forest-500/10 text-forest-700 dark:text-nature-400 border border-forest-500/20 ml-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            CONFIGURATION ACTIVE
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-stone-900 dark:text-white tracking-tight">
          System Settings
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
          Configure monitoring, risk analysis, alerts and prototype behavior
        </p>
      </div>

      <div className="flex items-center gap-3 self-start md:self-auto flex-shrink-0">
        <button
          type="button"
          onClick={() => onResetClick('reset_settings')}
          className="min-h-[44px] px-4 py-2 rounded-xl bg-white dark:bg-[#121c16] hover:bg-stone-100 dark:hover:bg-forest-900/50 border border-stone-200 dark:border-forest-800 text-stone-700 dark:text-stone-200 text-xs font-semibold shadow-sm transition-colors flex items-center gap-2"
          aria-label="Reset all settings to default"
        >
          <RotateCcw className="w-4 h-4 text-stone-500" />
          <span>Reset Settings</span>
        </button>
      </div>
    </div>
  );
};

export default SettingsHeader;
