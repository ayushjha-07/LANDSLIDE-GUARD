import React, { useState } from 'react';
import Card from '../../common/Card';
import { useSettings } from '../../../context/SettingsContext';
import { useToast } from '../../../context/ToastContext';
import { validateRiskConfig, getRiskRange } from '../../../utils/riskCalculator';
import { ShieldAlert, AlertTriangle, Save, RotateCcw, CheckCircle2, Sliders } from 'lucide-react';

export const RiskThresholdsSection = () => {
  const { settings, updateSection } = useSettings();
  const { toast } = useToast();

  const riskConfig = settings.risk?.thresholds || {};
  const [thresholds, setThresholds] = useState({
    safeMax: typeof riskConfig.safeMax === 'number' ? riskConfig.safeMax : (riskConfig.safe?.max ?? 25),
    warningMax: typeof riskConfig.warningMax === 'number' ? riskConfig.warningMax : (riskConfig.warning?.max ?? 50),
    highRiskMax: typeof riskConfig.highRiskMax === 'number' ? riskConfig.highRiskMax : (riskConfig.highRisk?.max ?? 75)
  });

  const [validationError, setValidationError] = useState(null);

  const handleBoundChange = (key, value) => {
    const num = value === '' ? '' : Number(value);
    const updated = {
      ...thresholds,
      [key]: num
    };
    setThresholds(updated);

    // Validate on the fly
    const validation = validateRiskConfig(updated);
    if (!validation.isValid) {
      setValidationError(validation.error);
    } else {
      setValidationError(null);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    const validation = validateRiskConfig(thresholds);
    if (!validation.isValid) {
      setValidationError(validation.error);
      toast.error(validation.error, 'Invalid Threshold Configuration');
      return;
    }

    setValidationError(null);
    updateSection('risk', {
      minScore: 0,
      maxScore: 100,
      thresholds: {
        safeMax: Number(thresholds.safeMax),
        warningMax: Number(thresholds.warningMax),
        highRiskMax: Number(thresholds.highRiskMax)
      }
    });
    toast.success('Central risk thresholds updated and applied globally.', 'Thresholds Saved');
  };

  const handleResetDefaults = () => {
    const defaults = {
      safeMax: 25,
      warningMax: 50,
      highRiskMax: 75
    };
    setThresholds(defaults);
    setValidationError(null);
    updateSection('risk', {
      minScore: 0,
      maxScore: 100,
      thresholds: defaults
    });
    toast.info('Risk thresholds restored to standard defaults (0–25, >25–50, >50–75, >75–100).', 'Thresholds Restored');
  };

  const safeMax = typeof thresholds.safeMax === 'number' ? thresholds.safeMax : 25;
  const warningMax = typeof thresholds.warningMax === 'number' ? thresholds.warningMax : 50;
  const highRiskMax = typeof thresholds.highRiskMax === 'number' ? thresholds.highRiskMax : 75;

  return (
    <Card 
      title="Risk Thresholds & Classification" 
      subtitle="Configure the 3 central hazard boundaries (0–100) applied across all 7 monitoring pages"
    >
      <form onSubmit={handleSave} className="space-y-5 text-xs">
        {/* Validation Warning Alert */}
        {validationError && (
          <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-700 dark:text-red-400 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="block text-sm font-bold">Invalid threshold configuration</strong>
              <p className="text-xs mt-0.5 leading-relaxed">{validationError}</p>
            </div>
          </div>
        )}

        {/* 3 Configurable Upper Boundaries Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Safe Maximum */}
          <div className="p-4 rounded-xl bg-stone-50 dark:bg-forest-950/50 border border-stone-200/70 dark:border-forest-900/60 space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="safeMaxInput" className="font-bold text-stone-900 dark:text-white text-sm">
                Safe Maximum
              </label>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-[10px] font-bold border border-emerald-500/20">
                Default: 25
              </span>
            </div>
            <p className="text-stone-500 dark:text-stone-400 text-[11px] leading-relaxed">
              Upper bound for normal baseline telemetry. Range: <code>0–{safeMax}</code>.
            </p>
            <div className="pt-1">
              <input
                id="safeMaxInput"
                name="safeMax"
                type="number"
                value={thresholds.safeMax}
                onChange={(e) => handleBoundChange('safeMax', e.target.value)}
                min="0"
                max="100"
                className="min-h-[44px] w-full px-3 py-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-forest-700 text-stone-900 dark:text-white font-mono font-bold text-base focus:ring-2 focus:ring-forest-500"
              />
            </div>
          </div>

          {/* Warning Maximum */}
          <div className="p-4 rounded-xl bg-stone-50 dark:bg-forest-950/50 border border-stone-200/70 dark:border-forest-900/60 space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="warningMaxInput" className="font-bold text-stone-900 dark:text-white text-sm">
                Warning Maximum
              </label>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-mono text-[10px] font-bold border border-amber-500/20">
                Default: 50
              </span>
            </div>
            <p className="text-stone-500 dark:text-stone-400 text-[11px] leading-relaxed">
              Upper bound for close surveillance. Range: <code>&gt;{safeMax}–{warningMax}</code>.
            </p>
            <div className="pt-1">
              <input
                id="warningMaxInput"
                name="warningMax"
                type="number"
                value={thresholds.warningMax}
                onChange={(e) => handleBoundChange('warningMax', e.target.value)}
                min="0"
                max="100"
                className="min-h-[44px] w-full px-3 py-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-forest-700 text-stone-900 dark:text-white font-mono font-bold text-base focus:ring-2 focus:ring-forest-500"
              />
            </div>
          </div>

          {/* High Risk Maximum */}
          <div className="p-4 rounded-xl bg-stone-50 dark:bg-forest-950/50 border border-stone-200/70 dark:border-forest-900/60 space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="highRiskMaxInput" className="font-bold text-stone-900 dark:text-white text-sm">
                High Risk Maximum
              </label>
              <span className="px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 font-mono text-[10px] font-bold border border-orange-500/20">
                Default: 75
              </span>
            </div>
            <p className="text-stone-500 dark:text-stone-400 text-[11px] leading-relaxed">
              Critical boundary threshold. Range: <code>&gt;{warningMax}–{highRiskMax}</code>.
            </p>
            <div className="pt-1">
              <input
                id="highRiskMaxInput"
                name="highRiskMax"
                type="number"
                value={thresholds.highRiskMax}
                onChange={(e) => handleBoundChange('highRiskMax', e.target.value)}
                min="0"
                max="100"
                className="min-h-[44px] w-full px-3 py-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-forest-700 text-stone-900 dark:text-white font-mono font-bold text-base focus:ring-2 focus:ring-forest-500"
              />
            </div>
          </div>
        </div>

        {/* Visual Multi-Segment Range Bar */}
        <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-forest-950/50 border border-stone-200/70 dark:border-forest-900/60 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono text-stone-500">
            <span>0</span>
            <span>{safeMax}</span>
            <span>{warningMax}</span>
            <span>{highRiskMax}</span>
            <span>100</span>
          </div>
          <div className="h-3 w-full rounded-full flex overflow-hidden shadow-inner bg-stone-200 dark:bg-forest-950">
            <div 
              style={{ width: `${Math.max(0, Math.min(100, safeMax))}%` }} 
              className="bg-emerald-500 transition-all duration-300" 
              title={`Safe: 0–${safeMax}`} 
            />
            <div 
              style={{ width: `${Math.max(0, Math.min(100, warningMax - safeMax))}%` }} 
              className="bg-amber-500 transition-all duration-300" 
              title={`Warning: >${safeMax}–${warningMax}`} 
            />
            <div 
              style={{ width: `${Math.max(0, Math.min(100, highRiskMax - warningMax))}%` }} 
              className="bg-orange-500 transition-all duration-300" 
              title={`High Risk: >${warningMax}–${highRiskMax}`} 
            />
            <div 
              style={{ width: `${Math.max(0, Math.min(100, 100 - highRiskMax))}%` }} 
              className="bg-red-500 transition-all duration-300" 
              title={`Critical: >${highRiskMax}–100`} 
            />
          </div>
          <div className="flex items-center justify-between text-[10px] text-stone-400 font-medium flex-wrap gap-1">
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">Safe (0–{safeMax})</span>
            <span className="text-amber-600 dark:text-amber-400 font-bold">Warning (&gt;{safeMax}–{warningMax})</span>
            <span className="text-orange-600 dark:text-orange-400 font-bold">High Risk (&gt;{warningMax}–{highRiskMax})</span>
            <span className="text-red-600 dark:text-red-400 font-bold">Critical (&gt;{highRiskMax}–100)</span>
          </div>
        </div>

        {/* Derived Range Classification Table */}
        <div className="overflow-x-auto rounded-xl border border-stone-200 dark:border-forest-900/80">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-100/70 dark:bg-forest-950/80 border-b border-stone-200 dark:border-forest-900/60 text-stone-700 dark:text-stone-300 font-semibold">
              <tr>
                <th className="py-2.5 px-3">Risk Level</th>
                <th className="py-2.5 px-3">Score Range</th>
                <th className="py-2.5 px-3">Classification Rule</th>
                <th className="py-2.5 px-3">Meaning / Operational Protocol</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-forest-900/40">
              {/* Safe */}
              <tr className="hover:bg-stone-50/50 dark:hover:bg-forest-900/20">
                <td className="py-2.5 px-3 font-semibold text-emerald-600 dark:text-emerald-400">
                  Safe
                </td>
                <td className="py-2.5 px-3 font-mono font-bold text-stone-900 dark:text-white">
                  0–{safeMax}
                </td>
                <td className="py-2.5 px-3 font-mono text-stone-500 dark:text-stone-400">
                  <code>0 &le; score &le; {safeMax}</code>
                </td>
                <td className="py-2.5 px-3 text-stone-500 dark:text-stone-400 text-[11px]">
                  Normal slope condition — standard baseline telemetry
                </td>
              </tr>

              {/* Warning */}
              <tr className="hover:bg-stone-50/50 dark:hover:bg-forest-900/20">
                <td className="py-2.5 px-3 font-semibold text-amber-600 dark:text-amber-400">
                  Warning
                </td>
                <td className="py-2.5 px-3 font-mono font-bold text-stone-900 dark:text-white">
                  &gt;{safeMax}–{warningMax}
                </td>
                <td className="py-2.5 px-3 font-mono text-stone-500 dark:text-stone-400">
                  <code>{safeMax} &lt; score &le; {warningMax}</code>
                </td>
                <td className="py-2.5 px-3 text-stone-500 dark:text-stone-400 text-[11px]">
                  Conditions require closer monitoring and slope inspection
                </td>
              </tr>

              {/* High Risk */}
              <tr className="hover:bg-stone-50/50 dark:hover:bg-forest-900/20">
                <td className="py-2.5 px-3 font-semibold text-orange-600 dark:text-orange-400">
                  High Risk
                </td>
                <td className="py-2.5 px-3 font-mono font-bold text-stone-900 dark:text-white">
                  &gt;{warningMax}–{highRiskMax}
                </td>
                <td className="py-2.5 px-3 font-mono text-stone-500 dark:text-stone-400">
                  <code>{warningMax} &lt; score &le; {highRiskMax}</code>
                </td>
                <td className="py-2.5 px-3 text-stone-500 dark:text-stone-400 text-[11px]">
                  Elevated conditions require immediate operator attention
                </td>
              </tr>

              {/* Critical */}
              <tr className="hover:bg-stone-50/50 dark:hover:bg-forest-900/20">
                <td className="py-2.5 px-3 font-semibold text-red-600 dark:text-red-400">
                  Critical
                </td>
                <td className="py-2.5 px-3 font-mono font-bold text-stone-900 dark:text-white">
                  &gt;{highRiskMax}–100
                </td>
                <td className="py-2.5 px-3 font-mono text-stone-500 dark:text-stone-400">
                  <code>{highRiskMax} &lt; score &le; 100</code>
                </td>
                <td className="py-2.5 px-3 text-stone-500 dark:text-stone-400 text-[11px]">
                  Critical warning condition — community siren standby
                </td>
              </tr>

              {/* Unknown */}
              <tr className="hover:bg-stone-50/50 dark:hover:bg-forest-900/20">
                <td className="py-2.5 px-3 font-semibold text-stone-500 dark:text-stone-400">
                  Unknown
                </td>
                <td className="py-2.5 px-3 font-mono text-stone-400">
                  No score
                </td>
                <td className="py-2.5 px-3 font-mono text-stone-500 dark:text-stone-400">
                  <code>score === null</code>
                </td>
                <td className="py-2.5 px-3 text-stone-500 dark:text-stone-400 text-[11px]">
                  Sensor offline or telemetry link disconnected
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="min-h-[44px] w-full sm:w-auto px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-forest-950 dark:hover:bg-forest-900 text-stone-700 dark:text-stone-300 font-semibold transition-colors flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Standard Defaults</span>
          </button>

          <button
            type="submit"
            disabled={!!validationError}
            className={`min-h-[44px] w-full sm:w-auto px-6 py-2.5 rounded-xl font-semibold shadow-sm transition-colors flex items-center justify-center gap-2 ${
              validationError
                ? 'bg-stone-300 text-stone-500 dark:bg-stone-800 dark:text-stone-500 cursor-not-allowed'
                : 'bg-forest-600 hover:bg-forest-500 text-white'
            }`}
          >
            <Save className="w-4 h-4" />
            <span>Save Threshold Configuration</span>
          </button>
        </div>
      </form>
    </Card>
  );
};

export default RiskThresholdsSection;
