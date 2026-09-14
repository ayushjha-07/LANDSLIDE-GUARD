import React, { useState } from 'react';
import { useSettings } from '../../../context/SettingsContext';
import { useToast } from '../../../context/ToastContext';
import { 
  Settings as SettingsIcon, 
  RotateCcw, 
  Save, 
  Mountain, 
  FlaskConical, 
  CheckCircle2, 
  X 
} from 'lucide-react';

export const GeneralSection = ({ onResetClick }) => {
  const { settings, updateSection } = useSettings();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    systemName: settings.general?.systemName || 'Landslide Guard',
    tagline: settings.general?.tagline || 'Monitor • Predict • Prevent',
    systemDescription: settings.general?.systemDescription || 'AI-Powered Landslide Early Warning System',
    monitoringArea: settings.general?.monitoringArea || 'Mountain Slope Monitoring Zone',
    version: settings.general?.version || 'v1.0 Prototype',
    timeFormat: settings.general?.timeFormat || '24 Hour',
    dateFormat: settings.general?.dateFormat || 'DD/MM/YYYY'
  });

  // Success notification banner (matching Reference Image)
  const [showSavedBanner, setShowSavedBanner] = useState(true);

  const handleChange = (field, val) => {
    setFormData(prev => ({ ...prev, [field]: val }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateSection('general', formData);
    setShowSavedBanner(true);
    toast.success('General settings saved successfully.', 'Settings Saved');
  };

  return (
    <div className="bg-white dark:bg-[#0c121e] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs space-y-6">
      
      {/* 1. Card Header: Gear Icon + Title + Reset Settings Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <SettingsIcon className="w-5 h-5 animate-[spin_16s_linear_infinite]" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
              General System Settings
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Application identity, localized regional formats and monitoring boundary
            </p>
          </div>
        </div>

        {onResetClick && (
          <button
            type="button"
            onClick={() => onResetClick('reset_settings')}
            className="self-start sm:self-auto px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold shadow-2xs flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
            title="Reset Settings to Defaults"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Reset Settings</span>
          </button>
        )}
      </div>

      {/* 2. Main Form */}
      <form onSubmit={handleSave} className="space-y-5">
        
        {/* Row 1: System Name & Tagline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              System Name
            </label>
            <input
              type="text"
              value={formData.systemName}
              onChange={(e) => handleChange('systemName', e.target.value)}
              className="min-h-[42px] w-full px-3.5 py-2 rounded-xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-medium focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Tagline
            </label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => handleChange('tagline', e.target.value)}
              className="min-h-[42px] w-full px-3.5 py-2 rounded-xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-medium focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              required
            />
          </div>
        </div>

        {/* Row 2: System Description & Monitoring Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              System Description
            </label>
            <input
              type="text"
              value={formData.systemDescription}
              onChange={(e) => handleChange('systemDescription', e.target.value)}
              className="min-h-[42px] w-full px-3.5 py-2 rounded-xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-medium focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Monitoring Area
            </label>
            <input
              type="text"
              value={formData.monitoringArea}
              onChange={(e) => handleChange('monitoringArea', e.target.value)}
              className="min-h-[42px] w-full px-3.5 py-2 rounded-xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-medium focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            />
          </div>
        </div>

        {/* Row 3: Version, Time Format, Date Format */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Version
            </label>
            <input
              type="text"
              value={formData.version}
              disabled
              className="min-h-[42px] w-full px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-mono text-xs cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Time Format
            </label>
            <select
              value={formData.timeFormat}
              onChange={(e) => handleChange('timeFormat', e.target.value)}
              className="min-h-[42px] w-full px-3.5 py-2 rounded-xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-medium focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-colors cursor-pointer"
            >
              <option value="24 Hour">24 Hour (e.g. 22:30)</option>
              <option value="12 Hour">12 Hour (e.g. 10:30 PM)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Date Format
            </label>
            <select
              value={formData.dateFormat}
              onChange={(e) => handleChange('dateFormat', e.target.value)}
              className="min-h-[42px] w-full px-3.5 py-2 rounded-xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-medium focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-colors cursor-pointer"
            >
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>
        </div>

        {/* 3. Information Strip matching Reference Image */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Item 1: Mountain Identity */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0 shadow-2xs">
              <Mountain className="w-4 h-4" />
            </div>
            <div>
              <strong className="text-xs font-bold text-slate-900 dark:text-white block">
                Landslide Guard
              </strong>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                AI-Powered Landslide Early Warning System
              </span>
            </div>
          </div>

          {/* Vertical Divider */}
          <div className="hidden sm:block w-px h-8 bg-emerald-200/60 dark:bg-emerald-800/40" />

          {/* Item 2: Research & Prototype Environment */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0 shadow-2xs">
              <FlaskConical className="w-4 h-4" />
            </div>
            <div>
              <strong className="text-xs font-bold text-slate-900 dark:text-white block">
                Prototype Environment
              </strong>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                Monitoring configuration for research/demo use
              </span>
            </div>
          </div>
        </div>

        {/* 4. Action Row: Save General Settings Button */}
        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="min-h-[42px] px-6 py-2.5 rounded-xl bg-[#0e4429] hover:bg-[#0b3821] text-white text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4 text-white" />
            <span>Save General Settings</span>
          </button>
        </div>

        {/* 5. In-card Success Notification Banner matching Reference Image */}
        {showSavedBanner && (
          <div className="mt-3 px-3.5 py-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-200 flex items-center justify-between text-xs font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
              <span>General settings saved successfully.</span>
            </div>
            <button
              type="button"
              onClick={() => setShowSavedBanner(false)}
              className="p-1 text-emerald-700 dark:text-emerald-300 hover:text-emerald-900 dark:hover:text-white transition-colors cursor-pointer"
              title="Dismiss banner"
              aria-label="Dismiss banner"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

      </form>
    </div>
  );
};

export default GeneralSection;
