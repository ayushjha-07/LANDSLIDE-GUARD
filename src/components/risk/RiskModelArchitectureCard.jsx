import React from 'react';
import { 
  Network, 
  Wifi, 
  Database, 
  GitBranch, 
  Activity, 
  BarChart3,
  ArrowDown
} from 'lucide-react';
import riskArchBg from '../../assets/risk_arch_bg.jpg';

export const RiskModelArchitectureCard = () => {
  return (
    <div className="bg-white dark:bg-[#0c121e] border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-4 sm:p-5 shadow-xs relative overflow-hidden flex flex-col justify-between h-full">
      {/* Background Watermark */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-15 dark:opacity-10 pointer-events-none"
        style={{ backgroundImage: `url(${riskArchBg})` }}
      />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900/60 text-emerald-500 flex items-center justify-center shrink-0">
            <Network className="w-4 h-4 text-emerald-500" />
          </div>
          <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
            AI Model Architecture
          </h2>
        </div>
        <a 
          href="#architecture" 
          onClick={(e) => e.preventDefault()}
          className="text-xs font-medium text-sky-500 hover:text-sky-600 dark:text-sky-400 dark:hover:text-sky-300 transition-colors"
        >
          How it works
        </a>
      </div>

      {/* Flowchart Container */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-1.5 my-auto w-full py-1">
        {/* Step 1: Sensor Data */}
        <div className="w-full max-w-[280px] bg-sky-50/85 dark:bg-sky-950/50 border border-sky-200/80 dark:border-sky-800/60 rounded-xl p-2.5 flex items-center justify-center gap-2.5 shadow-2xs">
          <div className="w-6 h-6 rounded-md bg-sky-100 dark:bg-sky-900/80 text-sky-600 dark:text-sky-300 flex items-center justify-center shrink-0">
            <Wifi className="w-3.5 h-3.5" />
          </div>
          <div className="text-center leading-tight">
            <div className="text-xs font-bold text-slate-800 dark:text-slate-100">Sensor Data</div>
            <div className="text-[10.5px] text-slate-500 dark:text-slate-400">(Multi-source IoT)</div>
          </div>
        </div>

        {/* Arrow 1 */}
        <ArrowDown className="w-3.5 h-3.5 text-slate-400 -my-0.5" />

        {/* Step 2: Feature Engineering */}
        <div className="w-full max-w-[280px] bg-emerald-50/85 dark:bg-emerald-950/50 border border-emerald-200/80 dark:border-emerald-800/60 rounded-xl p-2.5 flex items-center justify-center gap-2.5 shadow-2xs">
          <div className="w-6 h-6 rounded-md bg-emerald-100 dark:bg-emerald-900/80 text-emerald-600 dark:text-emerald-300 flex items-center justify-center shrink-0">
            <Database className="w-3.5 h-3.5" />
          </div>
          <div className="text-center leading-tight">
            <div className="text-xs font-bold text-slate-800 dark:text-slate-100">Feature Engineering</div>
            <div className="text-[10.5px] text-slate-500 dark:text-slate-400">(Preprocessing)</div>
          </div>
        </div>

        {/* Fork Connectors */}
        <div className="w-full max-w-[280px] flex flex-col items-center -my-0.5">
          <div className="w-[1px] h-2 bg-slate-300 dark:bg-slate-700" />
          <div className="w-[60%] h-[1px] bg-slate-300 dark:bg-slate-700" />
          <div className="w-[60%] flex justify-between">
            <div className="w-[1px] h-2 bg-slate-300 dark:bg-slate-700" />
            <div className="w-[1px] h-2 bg-slate-300 dark:bg-slate-700" />
          </div>
        </div>

        {/* Step 3: Parallel Models (Random Forest & LSTM/GRU) */}
        <div className="w-full max-w-[310px] grid grid-cols-2 gap-2">
          {/* Random Forest */}
          <div className="bg-amber-50/85 dark:bg-amber-950/50 border border-amber-200/80 dark:border-amber-800/60 rounded-xl p-2 flex flex-col items-center justify-center text-center shadow-2xs">
            <div className="w-6 h-6 rounded-md bg-amber-100 dark:bg-amber-900/80 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mb-1">
              <GitBranch className="w-3.5 h-3.5" />
            </div>
            <div className="text-xs font-bold text-slate-800 dark:text-slate-100">Random Forest</div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400">(Classification)</div>
          </div>

          {/* LSTM / GRU */}
          <div className="bg-indigo-50/85 dark:bg-indigo-950/50 border border-indigo-200/80 dark:border-indigo-800/60 rounded-xl p-2 flex flex-col items-center justify-center text-center shadow-2xs">
            <div className="w-6 h-6 rounded-md bg-indigo-100 dark:bg-indigo-900/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 mb-1">
              <Activity className="w-3.5 h-3.5" />
            </div>
            <div className="text-xs font-bold text-slate-800 dark:text-slate-100">LSTM / GRU</div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400">(Time Series)</div>
          </div>
        </div>

        {/* Join Connectors */}
        <div className="w-full max-w-[280px] flex flex-col items-center -my-0.5">
          <div className="w-[60%] flex justify-between">
            <div className="w-[1px] h-2 bg-slate-300 dark:bg-slate-700" />
            <div className="w-[1px] h-2 bg-slate-300 dark:bg-slate-700" />
          </div>
          <div className="w-[60%] h-[1px] bg-slate-300 dark:bg-slate-700" />
          <div className="w-[1px] h-2 bg-slate-300 dark:bg-slate-700" />
        </div>

        {/* Step 4: Risk Prediction */}
        <div className="w-full max-w-[280px] bg-rose-50/85 dark:bg-rose-950/50 border border-rose-200/80 dark:border-rose-800/60 rounded-xl p-2.5 flex items-center justify-center gap-2.5 shadow-2xs">
          <div className="w-6 h-6 rounded-md bg-rose-100 dark:bg-rose-900/80 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
            <BarChart3 className="w-3.5 h-3.5" />
          </div>
          <div className="text-center leading-tight">
            <div className="text-xs font-bold text-slate-800 dark:text-slate-100">Risk Prediction</div>
            <div className="text-[10.5px] text-slate-500 dark:text-slate-400">(0 - 100)</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskModelArchitectureCard;
