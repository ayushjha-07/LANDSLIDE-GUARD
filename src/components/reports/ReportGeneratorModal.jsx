import React, { useState, useEffect } from 'react';
import { X, FileText, CheckSquare, Square, Sparkles } from 'lucide-react';

export const ReportGeneratorModal = ({ isOpen, onClose, onGeneratePreview }) => {
  const [reportType, setReportType] = useState('Daily Monitoring Report');
  const [period, setPeriod] = useState('Last 24 Hours');
  const [sections, setSections] = useState({
    riskAnalysis: true,
    environmentalData: true,
    sensorStatus: true,
    alerts: true,
    loraPerformance: true,
    aiPrototypeSummary: true
  });

  // Handle keyboard Esc dismissal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const toggleSection = (key) => {
    setSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleGenerate = (e) => {
    e.preventDefault();
    onGeneratePreview({
      reportType,
      period,
      sections
    });
  };

  const reportTypes = [
    'Daily Monitoring Report',
    'Weekly Monitoring Report',
    'Risk Analysis Report',
    'Sensor Performance Report',
    'System Health Report'
  ];

  const periods = [
    'Last 24 Hours',
    'Last 7 Days',
    'Last 30 Days',
    'Custom'
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="generator-title"
    >
      <div 
        className="bg-white dark:bg-[#1A202C] rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto border border-[#E2E8F0] dark:border-[#2D3748] shadow-2xl p-5 sm:p-6"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#E2E8F0] dark:border-[#2D3748] pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#2B6CB0]/10 text-[#2B6CB0] dark:bg-[#2B6CB0]/25 dark:text-[#63B3ED] flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h2 id="generator-title" className="text-lg font-bold font-heading text-[#1A202C] dark:text-white">
                Generate Monitoring Report
              </h2>
              <p className="text-xs text-[#718096] dark:text-[#A0AEC0]">
                Configure parameters for compliance &amp; risk assessment
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#718096] hover:text-[#1A202C] dark:hover:text-white hover:bg-[#F7FAFC] dark:hover:bg-[#2D3748] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleGenerate} className="space-y-4 text-xs">
          {/* Report Type */}
          <div>
            <label className="font-semibold text-[#1A202C] dark:text-white block mb-1.5">
              Report Type
            </label>
            <select
              value={reportType}
              onChange={e => setReportType(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#E2E8F0] dark:border-[#2D3748] bg-[#F7FAFC] dark:bg-[#0E131F] text-[#1A202C] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2B6CB0]"
            >
              {reportTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Period */}
          <div>
            <label className="font-semibold text-[#1A202C] dark:text-white block mb-1.5">
              Reporting Period
            </label>
            <select
              value={period}
              onChange={e => setPeriod(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#E2E8F0] dark:border-[#2D3748] bg-[#F7FAFC] dark:bg-[#0E131F] text-[#1A202C] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2B6CB0]"
            >
              {periods.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* Include Checkboxes */}
          <div>
            <label className="font-semibold text-[#1A202C] dark:text-white block mb-2">
              Include Sections
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { key: 'riskAnalysis', label: 'Risk Analysis' },
                { key: 'environmentalData', label: 'Environmental Data' },
                { key: 'sensorStatus', label: 'Sensor Status' },
                { key: 'alerts', label: 'Alerts' },
                { key: 'loraPerformance', label: 'LoRa Performance' },
                { key: 'aiPrototypeSummary', label: 'AI Prototype Summary' }
              ].map(item => (
                <label
                  key={item.key}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-[#F7FAFC] dark:bg-[#0E131F]/60 border border-[#E2E8F0] dark:border-[#2D3748] cursor-pointer hover:bg-[#EDF2F7] dark:hover:bg-[#2D3748]/50 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={sections[item.key]}
                    onChange={() => toggleSection(item.key)}
                    className="w-4 h-4 rounded text-[#2B6CB0] focus:ring-[#2B6CB0]"
                  />
                  <span className="font-medium text-[#1A202C] dark:text-white select-none">
                    {item.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#2B6CB0]/10 border border-[#2B6CB0]/20 text-[11px] text-[#2B6CB0] dark:text-[#63B3ED] flex items-center gap-2">
            <Sparkles className="w-4 h-4 flex-shrink-0" />
            <span>Generates an environmental monitoring report preview based on simulated telemetry.</span>
          </div>

          <div className="pt-3 border-t border-[#E2E8F0] dark:border-[#2D3748] flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="min-h-[40px] px-4 py-2 rounded-xl bg-white dark:bg-[#1A202C] hover:bg-[#EDF2F7] dark:hover:bg-[#2D3748] border border-[#E2E8F0] dark:border-[#2D3748] text-xs font-semibold text-[#4A5568] dark:text-[#CBD5E0] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="min-h-[40px] px-5 py-2 rounded-xl bg-[#2B6CB0] hover:bg-[#2C5282] text-white text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
            >
              <FileText className="w-4 h-4" />
              <span>Generate Preview</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportGeneratorModal;
