import React, { useState } from 'react';
import Card from '../../common/Card';
import { useSettings } from '../../../context/SettingsContext';
import { useToast } from '../../../context/ToastContext';
import { AlertCircle, Save, Info, Gauge } from 'lucide-react';

export const SensorThresholdsSection = () => {
  const { settings, updateSection } = useSettings();
  const { toast } = useToast();

  const [thresholds, setThresholds] = useState(settings.sensorThresholds);

  const handleChange = (sensor, field, val) => {
    const num = parseFloat(val);
    setThresholds(prev => ({
      ...prev,
      [sensor]: {
        ...prev[sensor],
        [field]: isNaN(num) ? val : num
      }
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateSection('sensorThresholds', thresholds);
    toast.success('Sensor reference thresholds saved to localStorage.', 'Thresholds Saved');
  };

  return (
    <Card 
      title="Sensor Thresholds" 
      subtitle="Prototype warning and geotechnical reference limits per environmental parameter"
    >
      <form onSubmit={handleSave} className="space-y-4 text-xs">
        {/* Mandatory Prototype Disclaimer Banner */}
        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-800 dark:text-amber-300 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="block text-xs font-bold">
              Prototype reference thresholds only — these values are not validated scientific or emergency-warning thresholds and must not be used for real-world safety decisions.
            </strong>
            <p className="text-[11px] mt-0.5 leading-relaxed">
              Individual sensor thresholds describe whether a single measurement is Normal, Elevated, or High. They do NOT automatically determine landslide risk by themselves. The central risk calculator combines all sensor inputs into the canonical 0–100 risk score.
            </p>
          </div>
        </div>

        {/* 6 Parameter Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Soil Moisture */}
          <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-forest-950/50 border border-stone-200/70 dark:border-forest-900/60 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-stone-900 dark:text-white text-sm">Soil Moisture (%)</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 font-mono text-[10px]">Volumetric Water</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-[10px] text-stone-500 mb-1">Normal Max</label>
                <input
                  type="number"
                  value={thresholds.moisture.normalMax}
                  onChange={(e) => handleChange('moisture', 'normalMax', e.target.value)}
                  className="min-h-[44px] w-full px-2 py-1 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-forest-800 text-center font-mono font-bold"
                />
              </div>
              <div>
                <label className="block text-[10px] text-stone-500 mb-1">Elevated Max</label>
                <input
                  type="number"
                  value={thresholds.moisture.elevatedMax}
                  onChange={(e) => handleChange('moisture', 'elevatedMax', e.target.value)}
                  className="min-h-[44px] w-full px-2 py-1 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-forest-800 text-center font-mono font-bold"
                />
              </div>
              <div>
                <label className="block text-[10px] text-stone-500 mb-1">High Range</label>
                <div className="min-h-[44px] flex items-center justify-center rounded-xl bg-red-500/10 text-red-600 font-mono font-bold text-[11px] px-1 text-center">
                  &gt;{thresholds.moisture.elevatedMax}–100%
                </div>
              </div>
            </div>
            <div className="text-[11px] text-stone-500 dark:text-stone-400 flex items-center justify-between pt-1 border-t border-stone-200/60 dark:border-forest-900/40">
              <span>Normal: <code>0–{thresholds.moisture.normalMax}%</code></span>
              <span>Elevated: <code>&gt;{thresholds.moisture.normalMax}–{thresholds.moisture.elevatedMax}%</code></span>
            </div>
          </div>

          {/* Rainfall */}
          <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-forest-950/50 border border-stone-200/70 dark:border-forest-900/60 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-stone-900 dark:text-white text-sm">Precipitation (mm)</span>
              <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-600 font-mono text-[10px]">24h Cumulative</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-[10px] text-stone-500 mb-1">Normal Max</label>
                <input
                  type="number"
                  value={thresholds.rainfall.normalMax}
                  onChange={(e) => handleChange('rainfall', 'normalMax', e.target.value)}
                  className="min-h-[44px] w-full px-2 py-1 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-forest-800 text-center font-mono font-bold"
                />
              </div>
              <div>
                <label className="block text-[10px] text-stone-500 mb-1">Elevated Max</label>
                <input
                  type="number"
                  value={thresholds.rainfall.elevatedMax}
                  onChange={(e) => handleChange('rainfall', 'elevatedMax', e.target.value)}
                  className="min-h-[44px] w-full px-2 py-1 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-forest-800 text-center font-mono font-bold"
                />
              </div>
              <div>
                <label className="block text-[10px] text-stone-500 mb-1">High Range</label>
                <div className="min-h-[44px] flex items-center justify-center rounded-xl bg-red-500/10 text-red-600 font-mono font-bold text-[11px] px-1 text-center">
                  &gt;{thresholds.rainfall.elevatedMax} mm
                </div>
              </div>
            </div>
            <div className="text-[11px] text-stone-500 dark:text-stone-400 flex items-center justify-between pt-1 border-t border-stone-200/60 dark:border-forest-900/40">
              <span>Normal: <code>0–{thresholds.rainfall.normalMax} mm</code></span>
              <span>Elevated: <code>&gt;{thresholds.rainfall.normalMax}–{thresholds.rainfall.elevatedMax} mm</code></span>
            </div>
          </div>

          {/* Ground Tilt */}
          <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-forest-950/50 border border-stone-200/70 dark:border-forest-900/60 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-stone-900 dark:text-white text-sm">Ground Tilt (°)</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 font-mono text-[10px]">MPU6050 Gyro</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-[10px] text-stone-500 mb-1">Normal Max</label>
                <input
                  type="number"
                  step="0.1"
                  value={thresholds.tilt.normalMax}
                  onChange={(e) => handleChange('tilt', 'normalMax', e.target.value)}
                  className="min-h-[44px] w-full px-2 py-1 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-forest-800 text-center font-mono font-bold"
                />
              </div>
              <div>
                <label className="block text-[10px] text-stone-500 mb-1">Elevated Max</label>
                <input
                  type="number"
                  step="0.1"
                  value={thresholds.tilt.elevatedMax}
                  onChange={(e) => handleChange('tilt', 'elevatedMax', e.target.value)}
                  className="min-h-[44px] w-full px-2 py-1 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-forest-800 text-center font-mono font-bold"
                />
              </div>
              <div>
                <label className="block text-[10px] text-stone-500 mb-1">High Range</label>
                <div className="min-h-[44px] flex items-center justify-center rounded-xl bg-red-500/10 text-red-600 font-mono font-bold text-[11px] px-1 text-center">
                  &gt;{thresholds.tilt.elevatedMax}°
                </div>
              </div>
            </div>
            <div className="text-[11px] text-stone-500 dark:text-stone-400 flex items-center justify-between pt-1 border-t border-stone-200/60 dark:border-forest-900/40">
              <span>Normal: <code>0–{thresholds.tilt.normalMax}°</code></span>
              <span>Elevated: <code>&gt;{thresholds.tilt.normalMax}–{thresholds.tilt.elevatedMax}°</code></span>
            </div>
          </div>

          {/* Ground Vibration */}
          <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-forest-950/50 border border-stone-200/70 dark:border-forest-900/60 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-stone-900 dark:text-white text-sm">Vibration (g)</span>
              <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 font-mono text-[10px]">Micro-Seismic</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-[10px] text-stone-500 mb-1">Normal Max</label>
                <input
                  type="number"
                  step="0.005"
                  value={thresholds.vibration.normalMax}
                  onChange={(e) => handleChange('vibration', 'normalMax', e.target.value)}
                  className="min-h-[44px] w-full px-2 py-1 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-forest-800 text-center font-mono font-bold"
                />
              </div>
              <div>
                <label className="block text-[10px] text-stone-500 mb-1">Elevated Max</label>
                <input
                  type="number"
                  step="0.005"
                  value={thresholds.vibration.elevatedMax}
                  onChange={(e) => handleChange('vibration', 'elevatedMax', e.target.value)}
                  className="min-h-[44px] w-full px-2 py-1 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-forest-800 text-center font-mono font-bold"
                />
              </div>
              <div>
                <label className="block text-[10px] text-stone-500 mb-1">High Range</label>
                <div className="min-h-[44px] flex items-center justify-center rounded-xl bg-red-500/10 text-red-600 font-mono font-bold text-[11px] px-1 text-center">
                  &gt;{thresholds.vibration.elevatedMax} g
                </div>
              </div>
            </div>
            <div className="text-[11px] text-stone-500 dark:text-stone-400 flex items-center justify-between pt-1 border-t border-stone-200/60 dark:border-forest-900/40">
              <span>Normal: <code>0–{thresholds.vibration.normalMax} g</code></span>
              <span>Elevated: <code>&gt;{thresholds.vibration.normalMax}–{thresholds.vibration.elevatedMax} g</code></span>
            </div>
          </div>

          {/* Temperature & Humidity (Prototype Reference Values) */}
          <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-forest-950/50 border border-stone-200/70 dark:border-forest-900/60 space-y-2 md:col-span-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-stone-900 dark:text-white text-sm">
                Temperature & Humidity (DHT22 Reference Values)
              </span>
              <span className="px-2 py-0.5 rounded bg-stone-200 dark:bg-forest-900 text-stone-600 dark:text-stone-300 font-mono text-[10px]">
                Prototype reference values
              </span>
            </div>
            <p className="text-[11px] text-stone-500 dark:text-stone-400">
              Ambient temperature and relative humidity provide meteorological context for dewpoint and saturation analysis.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
              <div>
                <label className="block text-[10px] text-stone-500 mb-1">Temp Min (°C)</label>
                <input
                  type="number"
                  value={thresholds.temperature.normalMin}
                  onChange={(e) => handleChange('temperature', 'normalMin', e.target.value)}
                  className="min-h-[44px] w-full px-2 py-1 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-forest-800 text-center font-mono font-bold"
                />
              </div>
              <div>
                <label className="block text-[10px] text-stone-500 mb-1">Temp Max (°C)</label>
                <input
                  type="number"
                  value={thresholds.temperature.normalMax}
                  onChange={(e) => handleChange('temperature', 'normalMax', e.target.value)}
                  className="min-h-[44px] w-full px-2 py-1 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-forest-800 text-center font-mono font-bold"
                />
              </div>
              <div>
                <label className="block text-[10px] text-stone-500 mb-1">Humidity Min (%)</label>
                <input
                  type="number"
                  value={thresholds.humidity.normalMin}
                  onChange={(e) => handleChange('humidity', 'normalMin', e.target.value)}
                  className="min-h-[44px] w-full px-2 py-1 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-forest-800 text-center font-mono font-bold"
                />
              </div>
              <div>
                <label className="block text-[10px] text-stone-500 mb-1">Humidity Max (%)</label>
                <input
                  type="number"
                  value={thresholds.humidity.normalMax}
                  onChange={(e) => handleChange('humidity', 'normalMax', e.target.value)}
                  className="min-h-[44px] w-full px-2 py-1 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-forest-800 text-center font-mono font-bold"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="min-h-[44px] w-full sm:w-auto px-6 py-2.5 rounded-xl bg-forest-600 hover:bg-forest-500 text-white font-semibold shadow-sm transition-colors flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Sensor Thresholds</span>
          </button>
        </div>
      </form>
    </Card>
  );
};

export default SensorThresholdsSection;
