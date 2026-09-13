import React from 'react';
import { Sparkles, AlertCircle } from 'lucide-react';

export const ReportsPrototypeNotice = () => {
  return (
    <div className="bg-[#2B6CB0]/10 dark:bg-[#2B6CB0]/20 border border-[#2B6CB0]/30 rounded-2xl p-4 flex items-start gap-3 w-full min-w-0">
      <div className="w-8 h-8 rounded-xl bg-[#2B6CB0] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
        <Sparkles className="w-4 h-4" />
      </div>
      <div className="text-xs text-[#2D3748] dark:text-[#CBD5E0] leading-relaxed min-w-0">
        <span className="font-bold font-heading text-[#1A202C] dark:text-white block mb-0.5 text-sm">
          Prototype Analytics
        </span>
        Historical measurements, risk statistics, AI analysis summaries and network metrics are simulated for demonstration purposes. No displayed metric should be interpreted as validated real-world performance.
      </div>
    </div>
  );
};

export default ReportsPrototypeNotice;
