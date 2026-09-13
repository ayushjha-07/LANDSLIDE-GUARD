import React from 'react';
import { 
  Radio, 
  Cpu, 
  Activity, 
  ShieldAlert, 
  Bell, 
  AlertTriangle, 
  CheckSquare, 
  CheckCircle2, 
  ArrowRight,
  ArrowDown
} from 'lucide-react';
import Card from '../common/Card';
import { WORKFLOW_STEPS } from '../../data/mockAlerts';

export const EarlyWarningWorkflow = () => {
  const iconMap = {
    Radio,
    Cpu,
    Activity,
    ShieldAlert,
    Bell,
    AlertTriangle,
    CheckSquare,
    CheckCircle2
  };

  return (
    <Card 
      title="Early Warning Workflow" 
      subtitle="Autonomous IoT telemetry detection, AI classification, operator acknowledgment & resolution lifecycle"
      className="p-4 sm:p-5"
    >
      <div className="pt-2">
        {/* Desktop / Large Screen Grid Flow with Connecting Line */}
        <div className="hidden xl:grid grid-cols-8 gap-2 relative">
          {/* Connector Line behind cards */}
          <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-stone-200 dark:bg-forest-800 -translate-y-1/2 z-0" />

          {WORKFLOW_STEPS.map((step, idx) => {
            const Icon = iconMap[step.icon] || Activity;
            const isAlertStep = step.step === 5 || step.step === 6;
            const isResolveStep = step.step === 7 || step.step === 8;

            return (
              <div 
                key={step.step}
                className="relative z-10 flex flex-col items-center text-center group"
              >
                {/* Step Circle Card */}
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center border shadow-sm transition-all duration-200 group-hover:scale-105 ${
                  isAlertStep 
                    ? 'bg-amber-500/10 border-amber-500/40 text-amber-600 dark:text-amber-400' 
                    : isResolveStep
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-600 dark:text-emerald-400'
                      : 'bg-white dark:bg-forest-900 border-stone-200 dark:border-forest-700 text-forest-700 dark:text-nature-400'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>

                <div className="mt-2.5 space-y-0.5">
                  <span className="font-mono text-[10px] font-bold text-stone-400 dark:text-stone-500 uppercase">
                    Step 0{step.step}
                  </span>
                  <h4 className="text-xs font-bold text-stone-900 dark:text-white leading-tight">
                    {step.name}
                  </h4>
                  <p className="text-[10px] text-stone-500 dark:text-stone-400 leading-tight line-clamp-2">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Responsive Reflow Flow (Tablets & Mobile: Clean Vertical Pipeline) */}
        <div className="xl:hidden relative pl-6 space-y-4 before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200 dark:before:bg-forest-800">
          {WORKFLOW_STEPS.map((step, idx) => {
            const Icon = iconMap[step.icon] || Activity;
            const isAlertStep = step.step === 5 || step.step === 6;
            const isResolveStep = step.step === 7 || step.step === 8;

            return (
              <div key={step.step} className="relative flex items-start gap-3">
                {/* Circle Marker on the vertical line */}
                <div className={`absolute -left-6 top-1 w-6 h-6 rounded-full flex items-center justify-center border shadow-xs ${
                  isAlertStep 
                    ? 'bg-amber-500 border-amber-400 text-white' 
                    : isResolveStep
                      ? 'bg-emerald-500 border-emerald-400 text-white'
                      : 'bg-white dark:bg-forest-900 border-stone-300 dark:border-forest-700 text-forest-700 dark:text-nature-400'
                }`}>
                  <span className="font-mono text-[10px] font-bold">{step.step}</span>
                </div>

                <div className="p-3 rounded-xl border border-stone-200/80 dark:border-forest-800/80 bg-white/60 dark:bg-forest-950/40 w-full flex items-center justify-between gap-3">
                  <div className="space-y-0.5 min-w-0">
                    <div className="flex items-center gap-2">
                      <Icon className="w-3.5 h-3.5 text-forest-600 dark:text-nature-400 flex-shrink-0" />
                      <h4 className="text-xs font-bold text-stone-900 dark:text-white truncate">
                        {step.name}
                      </h4>
                    </div>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400">
                      {step.desc}
                    </p>
                  </div>
                  {idx < WORKFLOW_STEPS.length - 1 && (
                    <ArrowDown className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};

export default EarlyWarningWorkflow;
