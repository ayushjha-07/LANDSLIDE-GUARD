import React from 'react';
import { FileText, Sparkles, Sliders } from 'lucide-react';

export const ReportsHeader = ({ onOpenGenerator }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full min-w-0 pb-2 border-b border-[#E2E8F0] dark:border-[#2D3748]">
      <div className="min-w-0">
        <nav className="text-xs text-[#718096] dark:text-[#A0AEC0] mb-1 flex items-center gap-1.5 font-medium">
          <span>Home</span>
          <span>/</span>
          <span className="text-[#2B6CB0] dark:text-[#63B3ED] font-semibold">Reports</span>
        </nav>
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-[#1A202C] dark:text-white tracking-tight">
            Reports &amp; Analytics
          </h1>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#2B6CB0]/10 text-[#2B6CB0] dark:bg-[#2B6CB0]/25 dark:text-[#63B3ED] border border-[#2B6CB0]/20">
            <Sparkles className="w-3 h-3" />
            Prototype Data
          </span>
        </div>
        <p className="text-xs sm:text-sm text-[#718096] dark:text-[#A0AEC0] mt-1">
          Historical monitoring data, risk trends and system performance insights
        </p>
      </div>

      <div className="flex items-center gap-2.5 self-start md:self-auto flex-shrink-0">
        <button
          type="button"
          onClick={onOpenGenerator}
          className="min-h-[44px] px-4 py-2 rounded-xl bg-[#2B6CB0] hover:bg-[#2C5282] text-white text-xs sm:text-sm font-semibold shadow-sm transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#2B6CB0]/40"
        >
          <FileText className="w-4 h-4" />
          <span>Generate Report</span>
        </button>
      </div>
    </div>
  );
};

export default ReportsHeader;
