import React from 'react';
import Card from '../common/Card';
import { FileText, Eye, Download, Calendar } from 'lucide-react';
import { RECENT_REPORTS_ARCHIVE } from '../../data/mockHistoricalData';

export const RecentReportsCard = ({ onViewReport, onDownloadReport }) => {
  return (
    <Card className="p-4 sm:p-5 flex flex-col space-y-4 w-full min-w-0">
      <div className="flex items-center justify-between border-b border-[#E2E8F0] dark:border-[#2D3748] pb-3">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-[#2B6CB0] dark:text-[#63B3ED]" />
          <h2 className="text-base sm:text-lg font-bold font-heading text-[#1A202C] dark:text-white">
            Recent Reports
          </h2>
        </div>
        <span className="text-xs text-[#718096] dark:text-[#A0AEC0]">
          Archived Dispatches
        </span>
      </div>

      <div className="space-y-3">
        {RECENT_REPORTS_ARCHIVE.map(report => (
          <div
            key={report.id}
            className="p-3.5 rounded-xl bg-[#F7FAFC] dark:bg-[#0E131F]/60 border border-[#E2E8F0] dark:border-[#2D3748] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="font-bold text-xs sm:text-sm text-[#1A202C] dark:text-white">
                  {report.title}
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  {report.status}
                </span>
                <span className="text-[11px] text-[#718096] font-mono">
                  {report.size}
                </span>
              </div>
              <p className="text-xs text-[#4A5568] dark:text-[#CBD5E0] line-clamp-1">
                {report.summary}
              </p>
              <div className="flex items-center gap-2 text-[11px] text-[#718096] dark:text-[#A0AEC0] mt-1">
                <Calendar className="w-3 h-3" />
                <span>{report.date}</span>
                <span>•</span>
                <span>{report.period}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center flex-shrink-0">
              <button
                type="button"
                onClick={() => onViewReport(report)}
                className="min-h-[38px] px-3 py-1.5 rounded-lg bg-white dark:bg-[#1A202C] hover:bg-[#EDF2F7] dark:hover:bg-[#2D3748] border border-[#E2E8F0] dark:border-[#2D3748] text-xs font-semibold text-[#1A202C] dark:text-white transition-all flex items-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5 text-[#2B6CB0] dark:text-[#63B3ED]" />
                <span>View</span>
              </button>
              <button
                type="button"
                onClick={() => onDownloadReport(report)}
                className="min-h-[38px] px-3 py-1.5 rounded-lg bg-[#2B6CB0] hover:bg-[#2C5282] text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-2 border-t border-[#E2E8F0] dark:border-[#2D3748] text-[11px] text-[#718096] dark:text-[#A0AEC0] flex items-center justify-between">
        <span>Automated Daily &amp; Weekly cron scheduler</span>
        <span className="italic">Storage: Edge Local</span>
      </div>
    </Card>
  );
};

export default RecentReportsCard;
