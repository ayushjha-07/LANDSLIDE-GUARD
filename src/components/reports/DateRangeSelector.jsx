import React from 'react';
import { Calendar, Clock, ChevronDown } from 'lucide-react';

export const DateRangeSelector = ({ selectedPeriod, onSelectPeriod, customDates, onCustomDateChange }) => {
  const periods = [
    { id: '24h', label: 'Last 24 Hours' },
    { id: '7d', label: 'Last 7 Days' },
    { id: '30d', label: 'Last 30 Days' },
    { id: 'custom', label: 'Custom Range' }
  ];

  return (
    <div className="bg-white dark:bg-[#1A202C] rounded-2xl p-3 sm:p-4 border border-[#E2E8F0] dark:border-[#2D3748] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 w-full min-w-0">
      <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#1A202C] dark:text-white">
        <Clock className="w-4 h-4 text-[#2B6CB0] dark:text-[#63B3ED]" />
        <span>Reporting Period:</span>
      </div>

      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
        {periods.map(period => {
          const isActive = selectedPeriod === period.id;
          return (
            <button
              key={period.id}
              type="button"
              onClick={() => onSelectPeriod(period.id)}
              className={`min-h-[38px] px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                isActive
                  ? 'bg-[#2B6CB0] text-white shadow-sm'
                  : 'bg-[#F7FAFC] dark:bg-[#0E131F] text-[#4A5568] dark:text-[#CBD5E0] hover:bg-[#EDF2F7] dark:hover:bg-[#2D3748] border border-[#E2E8F0] dark:border-[#2D3748]'
              }`}
            >
              <span>{period.label}</span>
            </button>
          );
        })}
      </div>

      {selectedPeriod === 'custom' && (
        <div className="flex items-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E2E8F0] dark:border-[#2D3748] text-xs">
          <input
            type="date"
            value={customDates?.start || '2026-09-01'}
            onChange={e => onCustomDateChange('start', e.target.value)}
            className="px-2.5 py-1.5 rounded-lg border border-[#E2E8F0] dark:border-[#2D3748] bg-[#F7FAFC] dark:bg-[#0E131F] text-[#1A202C] dark:text-white text-xs focus:ring-1 focus:ring-[#2B6CB0]"
          />
          <span className="text-[#718096]">to</span>
          <input
            type="date"
            value={customDates?.end || '2026-09-13'}
            onChange={e => onCustomDateChange('end', e.target.value)}
            className="px-2.5 py-1.5 rounded-lg border border-[#E2E8F0] dark:border-[#2D3748] bg-[#F7FAFC] dark:bg-[#0E131F] text-[#1A202C] dark:text-white text-xs focus:ring-1 focus:ring-[#2B6CB0]"
          />
        </div>
      )}
    </div>
  );
};

export default DateRangeSelector;
