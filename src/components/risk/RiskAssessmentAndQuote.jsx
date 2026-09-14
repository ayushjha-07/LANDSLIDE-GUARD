import React from 'react';
import { ShieldCheck, Leaf, ClipboardCheck } from 'lucide-react';
import riskQuoteBg from '../../assets/risk_quote_bg.jpg';

export const RiskAssessmentAndQuote = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 w-full min-w-0">
      {/* Left: AI Assessment & Recommendation (span 9 / 12 on lg) */}
      <div className="lg:col-span-9 bg-white dark:bg-[#0c121e] border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col justify-between">
        {/* Title */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900/60 text-emerald-500 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4 fill-emerald-500/20 text-emerald-500" />
          </div>
          <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
            AI Assessment &amp; Recommendation
          </h2>
        </div>

        {/* 3 Column Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-auto">
          {/* Box 1: Low Risk */}
          <div className="p-3.5 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-900/60 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 shadow-2xs">
              <Leaf className="w-5 h-5 fill-emerald-500/20 text-emerald-500" />
            </div>
            <div className="min-w-0">
              <div className="text-sm sm:text-base font-extrabold text-emerald-700 dark:text-emerald-400 tracking-tight leading-snug">
                LOW RISK
              </div>
              <div className="text-[11px] text-slate-600 dark:text-slate-300 leading-tight mt-0.5">
                Current multi-sensor conditions indicate stable slope behavior.
              </div>
            </div>
          </div>

          {/* Box 2: Recommended Action */}
          <div className="p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800/80 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-900/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 shadow-2xs">
              <ClipboardCheck className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="text-[10.5px] text-slate-500 dark:text-slate-400 font-medium">
                Recommended Action
              </div>
              <div className="text-sm sm:text-base font-bold text-emerald-600 dark:text-emerald-400 leading-snug mt-0.5">
                Continue Monitoring
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                Keep monitoring sensor data and weather conditions.
              </div>
            </div>
          </div>

          {/* Box 3: Confidence Level */}
          <div className="p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800/80 flex items-center gap-3">
            {/* 87% Progress Ring */}
            <div className="relative w-11 h-11 shrink-0 flex items-center justify-center">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  className="text-slate-200 dark:text-slate-800"
                  strokeWidth="3.2"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3.2"
                  strokeDasharray="87, 100"
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center font-bold font-mono text-[11px] text-slate-900 dark:text-white">
                87%
              </span>
            </div>

            <div className="min-w-0">
              <div className="text-[10.5px] text-slate-500 dark:text-slate-400 font-medium">
                Confidence Level
              </div>
              <div className="text-sm sm:text-base font-bold text-emerald-600 dark:text-emerald-400 leading-snug mt-0.5">
                High Confidence
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                Model prediction is reliable based on current data.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Quote Card (span 3 / 12 on lg) */}
      <div className="lg:col-span-3 relative rounded-2xl overflow-hidden shadow-xs border border-slate-200/80 dark:border-slate-800/80 p-5 flex flex-col justify-center min-h-[145px] group">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url(${riskQuoteBg})` }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/60 to-black/45 backdrop-blur-[0.5px]" />

        {/* Quote Content */}
        <div className="relative z-10 space-y-2">
          <p className="text-xs sm:text-[13px] text-white font-medium italic leading-relaxed">
            &ldquo; Mountains are not just landscapes, they are life support systems. Let&apos;s protect them together. &rdquo;
          </p>
          <div className="w-8 h-0.5 bg-white/80 rounded-full mt-2" />
        </div>
      </div>
    </div>
  );
};

export default RiskAssessmentAndQuote;
