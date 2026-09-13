import React, { useEffect } from 'react';
import { X, Download, Printer, FileText, CheckCircle2, ShieldAlert, Sparkles } from 'lucide-react';

export const ReportPreviewModal = ({ isOpen, onClose, reportConfig, nodes = [], onExportPdf, onExportCsv, onPrint }) => {
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

  const {
    reportType = 'Daily Monitoring Report',
    period = 'Last 24 Hours',
    sections = {}
  } = reportConfig || {};

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="preview-title"
    >
      <div 
        className="bg-white dark:bg-[#1A202C] rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col border border-[#E2E8F0] dark:border-[#2D3748] shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="p-4 sm:p-5 border-b border-[#E2E8F0] dark:border-[#2D3748] flex items-center justify-between gap-3 bg-[#F7FAFC] dark:bg-[#0E131F] flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#2B6CB0]/10 text-[#2B6CB0] dark:bg-[#2B6CB0]/25 dark:text-[#63B3ED] flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h2 id="preview-title" className="text-base sm:text-lg font-bold font-heading text-[#1A202C] dark:text-white">
                Report Preview: {reportType}
              </h2>
              <span className="text-xs text-[#718096] dark:text-[#A0AEC0]">
                Period: {period}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onPrint}
              className="min-h-[38px] px-3 py-1.5 rounded-xl bg-white dark:bg-[#1A202C] hover:bg-[#EDF2F7] dark:hover:bg-[#2D3748] border border-[#E2E8F0] dark:border-[#2D3748] text-xs font-semibold text-[#1A202C] dark:text-white transition-all flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print</span>
            </button>
            <button
              type="button"
              onClick={onExportCsv}
              className="min-h-[38px] px-3 py-1.5 rounded-xl bg-white dark:bg-[#1A202C] hover:bg-[#EDF2F7] dark:hover:bg-[#2D3748] border border-[#E2E8F0] dark:border-[#2D3748] text-xs font-semibold text-[#2B6CB0] dark:text-[#63B3ED] transition-all flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>
            <button
              type="button"
              onClick={onExportPdf}
              className="min-h-[38px] px-3.5 py-1.5 rounded-xl bg-[#2B6CB0] hover:bg-[#2C5282] text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[#718096] hover:text-[#1A202C] dark:hover:text-white hover:bg-[#E2E8F0] dark:hover:bg-[#2D3748] transition-colors ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Document View */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-6 text-xs text-[#2D3748] dark:text-[#CBD5E0] print:p-0">
          {/* Header Banner */}
          <div className="border-b-2 border-[#2B6CB0] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] tracking-widest uppercase font-bold text-[#2B6CB0] dark:text-[#63B3ED] block mb-1">
                Civil Defense &amp; Disaster Prevention Pipeline
              </span>
              <h1 className="text-xl sm:text-2xl font-bold font-heading text-[#1A202C] dark:text-white">
                Landslide Guard — Monitoring Report
              </h1>
              <p className="text-xs text-[#718096] dark:text-[#A0AEC0] mt-1">
                Automated Geotechnical &amp; Environmental Intelligence Summary
              </p>
            </div>
            <div className="text-left sm:text-right text-xs">
              <span className="font-semibold block text-[#1A202C] dark:text-white">Generated: 13 Sep 2026, 10:00 AM</span>
              <span className="text-[#718096]">Period: {period}</span>
              <div className="mt-1">
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30">
                  Prototype Report — Simulated Data
                </span>
              </div>
            </div>
          </div>

          {/* Section 1: Executive Summary */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold font-heading text-[#1A202C] dark:text-white uppercase tracking-wider border-b border-[#E2E8F0] dark:border-[#2D3748] pb-1">
              1. Executive Summary
            </h3>
            <p className="leading-relaxed">
              System remains operational with one offline sensor node (Node 06) and two active risk alerts (Node 05 High Risk, Node 03 Warning). The overall regional slope stability hazard index averages <strong>24 / 100 (Safe)</strong> across the remaining 7 active monitoring stations.
            </p>
          </div>

          {/* Section 2: Risk Overview */}
          {sections.riskAnalysis !== false && (
            <div className="space-y-2">
              <h3 className="text-sm font-bold font-heading text-[#1A202C] dark:text-white uppercase tracking-wider border-b border-[#E2E8F0] dark:border-[#2D3748] pb-1">
                2. Risk Overview
              </h3>
              <p className="leading-relaxed">
                Risk distribution stands at <strong>5 Safe</strong>, <strong>1 Warning</strong>, <strong>1 High Risk</strong>, <strong>0 Critical</strong>, with <strong>1 station Offline</strong>. Peak hazard was recorded at <strong>Node 05 (68 / 100)</strong> in Mountain Zone C following 29 mm localized precipitation.
              </p>
            </div>
          )}

          {/* Section 3: Environmental Conditions */}
          {sections.environmentalData !== false && (
            <div className="space-y-2">
              <h3 className="text-sm font-bold font-heading text-[#1A202C] dark:text-white uppercase tracking-wider border-b border-[#E2E8F0] dark:border-[#2D3748] pb-1">
                3. Environmental Conditions
              </h3>
              <p className="leading-relaxed">
                Incline soil saturation averaged <strong>46%</strong> across active nodes (min: 39%, peak: 76% in Zone C). Ambient temperature held at <strong>20.4°C</strong> with relative humidity hovering near <strong>74.2%</strong>.
              </p>
            </div>
          )}

          {/* Section 4: Ground Stability */}
          {sections.environmentalData !== false && (
            <div className="space-y-2">
              <h3 className="text-sm font-bold font-heading text-[#1A202C] dark:text-white uppercase tracking-wider border-b border-[#E2E8F0] dark:border-[#2D3748] pb-1">
                4. Ground Stability
              </h3>
              <p className="leading-relaxed">
                Borehole inclinometer readings indicate a mean tilt of <strong>2.1°</strong> (peak <strong>4.8°</strong>). Tri-axial seismic vibration sensors observed nominal background micro-seismic acceleration of <strong>0.04 g</strong> (peak <strong>0.11 g</strong> in Zone C).
              </p>
            </div>
          )}

          {/* Section 5: Alerts */}
          {sections.alerts !== false && (
            <div className="space-y-2">
              <h3 className="text-sm font-bold font-heading text-[#1A202C] dark:text-white uppercase tracking-wider border-b border-[#E2E8F0] dark:border-[#2D3748] pb-1">
                5. Alerts &amp; Incidents
              </h3>
              <p className="leading-relaxed">
                A total of <strong>5 alerts</strong> have been recorded in the current logging cycle: <strong>2 active</strong> (Node 05 Heavy Rain High Risk, Node 03 Increased Moisture Warning), and <strong>3 successfully resolved</strong> following operator confirmation.
              </p>
            </div>
          )}

          {/* Section 6: Sensor Network Matrix */}
          {sections.sensorStatus !== false && (
            <div className="space-y-2">
              <h3 className="text-sm font-bold font-heading text-[#1A202C] dark:text-white uppercase tracking-wider border-b border-[#E2E8F0] dark:border-[#2D3748] pb-1">
                6. Sensor Network Status
              </h3>
              <div className="overflow-x-auto rounded-xl border border-[#E2E8F0] dark:border-[#2D3748]">
                <table className="w-full text-left text-xs whitespace-nowrap">
                  <thead className="bg-[#F7FAFC] dark:bg-[#0E131F] text-[#718096] dark:text-[#A0AEC0] border-b border-[#E2E8F0] dark:border-[#2D3748]">
                    <tr>
                      <th className="py-2 px-3">Node</th>
                      <th className="py-2 px-3">Location</th>
                      <th className="py-2 px-3">Risk</th>
                      <th className="py-2 px-3 text-right">Moisture</th>
                      <th className="py-2 px-3 text-right">Rain</th>
                      <th className="py-2 px-3 text-right">Tilt</th>
                      <th className="py-2 px-3 text-right">Battery</th>
                      <th className="py-2 px-3 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E8F0] dark:divide-[#2D3748]">
                    {nodes.map(n => (
                      <tr key={n.id}>
                        <td className="py-2 px-3 font-bold text-[#2B6CB0]">{n.id}</td>
                        <td className="py-2 px-3">{n.location?.name || n.location}</td>
                        <td className="py-2 px-3 font-semibold">{n.status?.toLowerCase() === 'offline' ? 'Unknown' : (n.riskLevel || n.risk?.level || 'Safe')}</td>
                        <td className="py-2 px-3 text-right font-mono">{n.status?.toLowerCase() === 'offline' ? '—' : `${n.soil ?? n.moisture}%`}</td>
                        <td className="py-2 px-3 text-right font-mono">{n.status?.toLowerCase() === 'offline' ? '—' : `${n.rain ?? n.rainfall} mm`}</td>
                        <td className="py-2 px-3 text-right font-mono">{n.status?.toLowerCase() === 'offline' ? '—' : `${n.tilt}°`}</td>
                        <td className="py-2 px-3 text-right font-mono">{n.battery}%</td>
                        <td className="py-2 px-3 text-center font-semibold">{n.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Section 7: LoRa Performance */}
          {sections.loraPerformance !== false && (
            <div className="space-y-2">
              <h3 className="text-sm font-bold font-heading text-[#1A202C] dark:text-white uppercase tracking-wider border-b border-[#E2E8F0] dark:border-[#2D3748] pb-1">
                7. LoRa RF Communication Performance
              </h3>
              <p className="leading-relaxed">
                Central Edge Gateway (EDGE-GW-01) maintained <strong>98.6% packet delivery success</strong> on 868.1 MHz SF7. Average RSSI held at <strong>-73 dBm</strong> with SNR of <strong>8.4 dB</strong>. Dropped packets: 156 / 12,301 frames.
              </p>
            </div>
          )}

          {/* Section 8: AI Prototype Assessment */}
          {sections.aiPrototypeSummary !== false && (
            <div className="space-y-2">
              <h3 className="text-sm font-bold font-heading text-[#1A202C] dark:text-white uppercase tracking-wider border-b border-[#E2E8F0] dark:border-[#2D3748] pb-1">
                8. AI Prototype Assessment
              </h3>
              <p className="leading-relaxed">
                Rule-based algorithmic assessment projects a <strong>stable 6-hour forecast window</strong> across Sector 7. No widespread catastrophic slope shear is indicated. Continued monitoring of Zone C drainage gully recommended.
              </p>
            </div>
          )}

          {/* Disclaimer Footer */}
          <div className="pt-4 border-t border-[#E2E8F0] dark:border-[#2D3748] text-[11px] text-[#718096] dark:text-[#A0AEC0] italic text-center">
            Prototype Report — Simulated Data. All metrics, risk distributions and hardware performance indicators represent automated simulation models for demonstration purposes.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPreviewModal;
