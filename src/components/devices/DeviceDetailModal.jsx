import React, { useEffect } from 'react';
import { 
  X, 
  Cpu, 
  Radio, 
  Battery, 
  ExternalLink,
  Layers
} from 'lucide-react';
import { Link } from 'react-router-dom';
import StatusBadge from '../common/StatusBadge';

export const DeviceDetailModal = ({ device, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!device) return null;

  const isOnline = device.status === 'Online';

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="device-modal-title"
    >
      <div 
        className="w-full max-w-2xl bg-white dark:bg-[#1A202C] rounded-3xl border border-[#E2E8F0] dark:border-[#2D3748] shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-[#E2E8F0] dark:border-[#2D3748] flex items-center justify-between gap-4 flex-shrink-0 bg-slate-50/50 dark:bg-[#0E131F]/30">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 rounded-2xl bg-forest-50 dark:bg-forest-950/60 border border-forest-200 dark:border-forest-800 flex items-center justify-center text-forest-600 dark:text-nature-400 shadow-sm flex-shrink-0">
              <Cpu className="w-6 h-6" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 id="device-modal-title" className="text-lg sm:text-xl font-bold font-heading text-[#1A202C] dark:text-white truncate">
                  {device.id} &mdash; Device Details
                </h2>
                <StatusBadge status={isOnline ? 'online' : 'offline'} label={device.status} pulse={isOnline} />
              </div>
              <p className="text-xs text-[#718096] dark:text-slate-400 mt-0.5 truncate">
                {device.location?.name || device.location} &bull; {device.nodeType || 'Wireless Sensor Node'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="min-w-[44px] min-h-[44px] w-11 h-11 flex items-center justify-center rounded-xl text-[#718096] hover:text-[#1A202C] dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex-shrink-0"
            aria-label="Close device details modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-xs text-[#2D3748] dark:text-slate-200">
          {/* Section 1: Hardware Specifications */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#718096] dark:text-slate-400 mb-2 flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-forest-600" /> Hardware Specifications
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 p-3 rounded-2xl bg-slate-50 dark:bg-[#0E131F]/50 border border-[#E2E8F0] dark:border-[#2D3748]">
              <div>
                <span className="text-[10px] text-[#718096] dark:text-slate-400 block">Controller</span>
                <strong className="font-mono text-[#1A202C] dark:text-white">{device.controller || 'ESP32'}</strong>
              </div>
              <div>
                <span className="text-[10px] text-[#718096] dark:text-slate-400 block">Communication</span>
                <strong className="font-mono text-[#1A202C] dark:text-white">{device.communication || 'LoRa'}</strong>
              </div>
              <div>
                <span className="text-[10px] text-[#718096] dark:text-slate-400 block">Firmware</span>
                <strong className="font-mono text-[#1A202C] dark:text-white">{device.firmware || 'v2.4.1'}</strong>
              </div>
            </div>
          </div>

          {/* Section 2: Connectivity & LoRa Telemetry */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#718096] dark:text-slate-400 mb-2 flex items-center gap-1.5">
              <Radio className="w-4 h-4 text-forest-600" /> Connectivity &amp; RF Metrics
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 rounded-2xl bg-slate-50 dark:bg-[#0E131F]/50 border border-[#E2E8F0] dark:border-[#2D3748]">
              <div>
                <span className="text-[10px] text-[#718096] dark:text-slate-400 block">Status</span>
                <strong className={isOnline ? 'text-emerald-600 font-bold' : 'text-red-600 font-bold'}>{device.status}</strong>
              </div>
              <div>
                <span className="text-[10px] text-[#718096] dark:text-slate-400 block">Signal (RSSI)</span>
                <strong className="font-mono text-[#1A202C] dark:text-white">{device.signal || 'Unavailable'}</strong>
              </div>
              <div>
                <span className="text-[10px] text-[#718096] dark:text-slate-400 block">SNR</span>
                <strong className="font-mono text-[#1A202C] dark:text-white">{device.snr || '8.2 dB'}</strong>
              </div>
              <div>
                <span className="text-[10px] text-[#718096] dark:text-slate-400 block">Last Seen</span>
                <strong className="font-mono text-[#1A202C] dark:text-white">{device.lastUpdate || 'Just now'}</strong>
              </div>
              <div>
                <span className="text-[10px] text-[#718096] dark:text-slate-400 block">Packets Received</span>
                <strong className="font-mono text-[#1A202C] dark:text-white">{device.packetsReceived || device.packets || 1480}</strong>
              </div>
              <div>
                <span className="text-[10px] text-[#718096] dark:text-slate-400 block">Packet Success</span>
                <strong className="font-mono text-emerald-600 dark:text-emerald-400">{device.packetSuccess || 98.4}%</strong>
              </div>
              <div className="col-span-2">
                <span className="text-[10px] text-[#718096] dark:text-slate-400 block">Device Health Classification</span>
                <span className={"inline-block mt-0.5 px-2 py-0.5 rounded text-[11px] font-semibold border " + (device.healthBadge || 'bg-slate-100')}>
                  {device.deviceHealth || 'Healthy'}
                </span>
              </div>
            </div>
          </div>

          {/* Section 3: Power System */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#718096] dark:text-slate-400 mb-2 flex items-center gap-1.5">
              <Battery className="w-4 h-4 text-forest-600" /> Power Management
            </h4>
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#0E131F]/50 border border-[#E2E8F0] dark:border-[#2D3748] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span>Battery Level: <strong className="font-mono text-[#1A202C] dark:text-white">{device.battery}%</strong></span>
                <span className={"font-semibold " + (device.battery > 70 ? 'text-emerald-600' : device.battery > 40 ? 'text-amber-600' : 'text-red-600')}>
                  {device.battery > 70 ? 'Good' : device.battery > 40 ? 'Medium' : 'Low'}
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                <div 
                  className={"h-full rounded-full " + (device.battery > 70 ? 'bg-emerald-500' : device.battery > 40 ? 'bg-amber-500' : 'bg-red-500')} 
                  style={{ width: device.battery + '%' }} 
                />
              </div>
            </div>
          </div>

          {/* Section 4: Attached Sensor Payloads */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#718096] dark:text-slate-400 mb-2 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-forest-600" /> Attached Geotechnical Sensors
            </h4>
            <div className="flex flex-wrap gap-2">
              {(device.sensors || ['Soil Moisture', 'Rainfall', 'Tilt', 'Vibration', 'Temperature', 'Humidity']).map((s, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-[#2D3748] dark:text-slate-300 font-medium text-xs border border-[#E2E8F0] dark:border-[#2D3748]">
                  &bull; {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 border-t border-[#E2E8F0] dark:border-[#2D3748] bg-slate-50/50 dark:bg-[#0E131F]/30 flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0">
          <div className="text-[11px] text-[#718096] dark:text-slate-400">
            Node: <strong className="font-mono text-[#1A202C] dark:text-white">{device.id}</strong> ({device.location?.name || device.location})
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <Link
              to="/sensors"
              onClick={onClose}
              className="min-h-[40px] flex-1 sm:flex-none px-4 py-2 rounded-xl bg-white dark:bg-[#1A202C] border border-[#E2E8F0] dark:border-[#2D3748] text-xs font-semibold text-[#2D3748] dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5 shadow-soft"
            >
              <span>Sensor Telemetry</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <Link
              to="/risk-analysis"
              onClick={onClose}
              className="min-h-[40px] flex-1 sm:flex-none px-4 py-2 rounded-xl bg-forest-600 hover:bg-forest-700 text-white text-xs font-semibold shadow-soft transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Risk Analysis</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceDetailModal;
