import React, { useState } from 'react';
import Card from '../../common/Card';
import { useSettings } from '../../../context/SettingsContext';
import { useToast } from '../../../context/ToastContext';
import { Save, CheckCircle2 } from 'lucide-react';

export const GeneralSection = () => {
  const { settings, updateSection } = useSettings();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    systemName: settings.general.systemName,
    tagline: settings.general.tagline,
    systemDescription: settings.general.systemDescription,
    monitoringArea: settings.general.monitoringArea,
    version: settings.general.version,
    timeFormat: settings.general.timeFormat,
    dateFormat: settings.general.dateFormat
  });

  const handleChange = (field, val) => {
    setFormData(prev => ({ ...prev, [field]: val }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateSection('general', formData);
    toast.success('General settings saved to localStorage.', 'Settings Saved');
  };

  return (
    <Card 
      title="General System Settings" 
      subtitle="Application identity, localized regional formats and monitoring boundary"
    >
      <form onSubmit={handleSave} className="space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-1.5">
              System Name
            </label>
            <input
              type="text"
              value={formData.systemName}
              onChange={(e) => handleChange('systemName', e.target.value)}
              className="min-h-[44px] w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-forest-950/70 border border-stone-200 dark:border-forest-800 text-stone-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-forest-500"
              required
            />
          </div>

          <div>
            <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-1.5">
              Tagline
            </label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => handleChange('tagline', e.target.value)}
              className="min-h-[44px] w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-forest-950/70 border border-stone-200 dark:border-forest-800 text-stone-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-forest-500"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-1.5">
              System Description
            </label>
            <input
              type="text"
              value={formData.systemDescription}
              onChange={(e) => handleChange('systemDescription', e.target.value)}
              className="min-h-[44px] w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-forest-950/70 border border-stone-200 dark:border-forest-800 text-stone-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-forest-500"
            />
          </div>

          <div>
            <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-1.5">
              Monitoring Area
            </label>
            <input
              type="text"
              value={formData.monitoringArea}
              onChange={(e) => handleChange('monitoringArea', e.target.value)}
              className="min-h-[44px] w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-forest-950/70 border border-stone-200 dark:border-forest-800 text-stone-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-forest-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          <div>
            <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-1.5">
              Version
            </label>
            <input
              type="text"
              value={formData.version}
              disabled
              className="min-h-[44px] w-full px-3 py-2 rounded-xl bg-stone-100 dark:bg-forest-950/30 border border-stone-200 dark:border-forest-900 text-stone-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-1.5">
              Time Format
            </label>
            <select
              value={formData.timeFormat}
              onChange={(e) => handleChange('timeFormat', e.target.value)}
              className="min-h-[44px] w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-forest-950/70 border border-stone-200 dark:border-forest-800 text-stone-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-forest-500"
            >
              <option value="12 Hour">12 Hour (e.g. 10:30 PM)</option>
              <option value="24 Hour">24 Hour (e.g. 22:30)</option>
            </select>
          </div>

          <div>
            <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-1.5">
              Date Format
            </label>
            <select
              value={formData.dateFormat}
              onChange={(e) => handleChange('dateFormat', e.target.value)}
              className="min-h-[44px] w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-forest-950/70 border border-stone-200 dark:border-forest-800 text-stone-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-forest-500"
            >
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>
        </div>

        <div className="pt-3 border-t border-stone-100 dark:border-forest-900/60 flex justify-end">
          <button
            type="submit"
            className="min-h-[44px] w-full sm:w-auto px-6 py-2.5 rounded-xl bg-forest-600 hover:bg-forest-500 text-white font-semibold shadow-sm transition-colors flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save General Settings</span>
          </button>
        </div>
      </form>
    </Card>
  );
};

export default GeneralSection;
