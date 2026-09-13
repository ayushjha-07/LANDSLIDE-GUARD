import React from 'react';
import { 
  BrainCircuit, 
  Layers, 
  Cpu, 
  TrendingUp, 
  ShieldCheck, 
  Sliders, 
  Clock,
  Sparkles
} from 'lucide-react';
import Card from '../components/common/Card';
import StatusBadge from '../components/common/StatusBadge';

export const RiskAnalysis = () => {
  const featureWeights = [
    { name: "3-Day Cumulative Precipitation (mm)", weight: 34, impact: "Primary Trigger" },
    { name: "Pore Water Pressure Rate (kPa/h)", weight: 28, impact: "Hydraulic Instability" },
    { name: "Inclinometer Lateral Shift (mm)", weight: 22, impact: "Direct Shear Displacement" },
    { name: "Micro-Seismic Vibration (m/s²)", weight: 16, impact: "Bedrock Dynamic Stress" },
  ];

  return (
    <div className="space-y-4 sm:space-y-5 md:space-y-6 w-full min-w-0">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold font-heading text-stone-900 dark:text-white">
          AI &amp; Deep Learning Risk Assessment
        </h2>
        <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
          Random Forest Classification combined with Recurrent Neural Networks (LSTM &amp; GRU) for multi-horizon slope failure prediction.
        </p>
      </div>

      {/* Model Cards Grid: 1 col on Mobile, 2 on Tablet, 3 on Desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 w-full min-w-0">
        <Card className="min-w-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-forest-50 dark:bg-forest-950/70 border border-forest-200 dark:border-forest-800 text-forest-600 dark:text-nature-400 flex-shrink-0">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="text-[11px] text-stone-500">Classifier Architecture</div>
              <h3 className="text-sm font-bold font-heading text-stone-900 dark:text-white truncate">Random Forest Ensemble</h3>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-stone-100 dark:border-forest-900/50 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-stone-500">Validation Accuracy:</span>
              <strong className="text-forest-600 dark:text-nature-400 font-mono">96.4 %</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Estimators:</span>
              <strong className="text-stone-700 dark:text-stone-300">200 Decision Trees</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Inference Mode:</span>
              <span className="text-nature-600 dark:text-nature-400 font-medium">Real-time edge synced</span>
            </div>
          </div>
        </Card>

        <Card className="min-w-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-forest-50 dark:bg-forest-950/70 border border-forest-200 dark:border-forest-800 text-forest-600 dark:text-nature-400 flex-shrink-0">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="text-[11px] text-stone-500">Sequence Model</div>
              <h3 className="text-sm font-bold font-heading text-stone-900 dark:text-white truncate">Bi-directional LSTM / GRU</h3>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-stone-100 dark:border-forest-900/50 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-stone-500">Forecast Horizon:</span>
              <strong className="text-forest-600 dark:text-nature-400">24 Hours Ahead</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Temporal Interval:</span>
              <strong className="text-stone-700 dark:text-stone-300">10 minutes</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">RMSE Error Margin:</span>
              <strong className="text-stone-700 dark:text-stone-300 font-mono">&plusmn; 0.14 mm</strong>
            </div>
          </div>
        </Card>

        <Card className="min-w-0 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-forest-50 dark:bg-forest-950/70 border border-forest-200 dark:border-forest-800 text-forest-600 dark:text-nature-400 flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="text-[11px] text-stone-500">Integrated Risk State</div>
              <h3 className="text-sm font-bold font-heading text-stone-900 dark:text-white truncate">Advisory (Safe Margin)</h3>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-stone-100 dark:border-forest-900/50 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-stone-500">Factor of Safety (FoS):</span>
              <strong className="text-amber-500 font-bold font-mono">1.42 (Threshold 1.1)</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Probability of Slip:</span>
              <strong className="text-stone-700 dark:text-stone-300 font-mono">18.2 %</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">LoRa Alert Dispatch:</span>
              <span className="text-forest-600 dark:text-nature-400 font-medium">Standby / Auto</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Feature Importance & Explainability */}
      <Card 
        title="Geotechnical Feature Weighting &amp; Impact Analysis"
        subtitle="SHAP values indicating sensor telemetry influence on landslide hazard prediction"
        className="min-w-0"
      >
        <div className="space-y-3.5 pt-1">
          {featureWeights.map((f, i) => (
            <div key={i} className="space-y-1 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="font-semibold text-stone-800 dark:text-stone-200 truncate">
                  {f.name}
                </span>
                <span className="text-stone-500 dark:text-stone-400 text-[11px]">
                  {f.impact} &bull; <strong className="text-forest-700 dark:text-nature-400 font-mono">{f.weight}%</strong>
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-stone-100 dark:bg-forest-950">
                <div 
                  className="h-2 rounded-full bg-gradient-to-r from-forest-600 to-nature-500" 
                  style={{ width: `${f.weight}%` }} 
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default RiskAnalysis;
