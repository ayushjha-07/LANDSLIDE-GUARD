import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  X, 
  Droplets, 
  CloudRain, 
  Compass, 
  Activity, 
  Thermometer, 
  Wind, 
  Battery, 
  Wifi, 
  MapPin, 
  BrainCircuit, 
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Radio,
  Clock
} from 'lucide-react';
import SensorHistoryChart from './SensorHistoryChart';

export const SensorDetailModal = ({ node, onClose }) => {
  const navigate = useNavigate();

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!node) return null;

  const isOffline = node.status?.toLowerCase() === 'offline';

  // Risk styling
  const isNodeOffline = node.status?.toLowerCase() === 'offline';
  const riskDisplay = isNodeOffline
    ? 'Offline'
    : (node.riskLevel || (node.risk?.level === 'high-risk' ? 'High Risk' : node.risk?.level === 'warning' ? 'Warning' : node.risk?.level === 'critical' ? 'Critical' : (typeof node.risk === 'string' ? node.risk : 'Safe')));

  let riskBadgeClass = "bg-nature-500/15 text-nature-700 dark:text-nature-400 border-nature-500/30";
  if (isNodeOffline) {
    riskBadgeClass = "bg-stone-200 dark:bg-stone-800 text-stone-500 dark:text-stone-400 border-stone-300 dark:border-stone-700";
  } else if (riskDisplay === 'Critical' || node.risk?.level === 'critical') {
    riskBadgeClass = "bg-rose-500/15 text-rose-700 dark:text-rose-400 border-rose-500/30";
  } else if (riskDisplay === 'High Risk' || node.risk?.level === 'high-risk') {
    riskBadgeClass = "bg-orange-500/15 text-orange-700 dark:text-orange-400 border-orange-500/30 font-bold";
  } else if (riskDisplay === 'Warning' || node.risk?.level === 'warning') {
    riskBadgeClass = "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30";
  }

  // Signal quality
  let signalQuality = "Good";
  if (isOffline || node.signalStrength === null) {
    signalQuality = "Unavailable";
  } else if (node.signalStrength < -85) {
    signalQuality = "Poor";
  } else if (node.signalStrength < -75) {
    signalQuality = "Fair";
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Dark backdrop */}
      <div 
        className="fixed inset-0 bg-stone-950/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card Content */}
      <div className="relative w-full max-w-3xl my-6 rounded-2xl bg-white dark:bg-[#121c16] border border-stone-200 dark:border-forest-850 shadow-2xl z-10 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* MODAL HEADER */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-stone-100 dark:border-forest-900/60 bg-stone-50/70 dark:bg-forest-950/40 flex-shrink-0">
          <div className="min-w-0 pr-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-sm font-bold text-forest-700 dark:text-nature-400">
                {node.id}
              </span>
              <span className="text-stone-400">&bull;</span>
              <h2 id="modal-title" className="text-base sm:text-lg font-bold font-heading text-stone-900 dark:text-white truncate">
                {node.location?.name || node.location}
              </h2>
            </div>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
              Sector station geotechnical telemetry &amp; LoRa RF diagnostics
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] rounded-xl flex items-center justify-center text-stone-400 hover:text-stone-700 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-forest-900/50 transition-colors flex-shrink-0"
            aria-label="Close details modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* MODAL BODY (Scrollable) */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          
          {/* 1. HAZARD ASSESSMENT OVERVIEW */}
          <div className="p-4 rounded-2xl bg-forest-50/60 dark:bg-forest-950/50 border border-forest-100 dark:border-forest-900/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] uppercase font-bold tracking-wider text-stone-500 dark:text-stone-400 block mb-1">
                Current Landslide Risk State
              </span>
              <div className="flex items-center gap-2.5">
                <span className={`text-xs font-bold uppercase px-3 py-1 rounded-full border ${riskBadgeClass}`}>
                  {riskDisplay}
                </span>
                {isOffline ? (
                  <span className="text-stone-500">Offline &bull; Telemetry link interrupted</span>
                ) : (
                  <span className="font-mono text-stone-700 dark:text-stone-300">
                    Risk Score: <strong className="text-base text-stone-900 dark:text-white">{node.riskScore}</strong> / 100
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 text-[11px] text-stone-500 dark:text-stone-400 border-t sm:border-t-0 sm:border-l border-stone-200 dark:border-forest-900/60 pt-2 sm:pt-0 sm:pl-4">
              <div>
                <span className="block text-stone-400 text-[10px]">Status</span>
                <strong className={isOffline ? 'text-stone-400' : 'text-nature-600 dark:text-nature-400 font-semibold'}>
                  {node.status}
                </strong>
              </div>
              <div>
                <span className="block text-stone-400 text-[10px]">Last Packet</span>
                <strong className="text-stone-700 dark:text-stone-300 font-mono">{node.lastUpdate}</strong>
              </div>
            </div>
          </div>

          {/* 2. SIX ENLARGED SENSOR READING CARDS */}
          <div>
            <h4 className="text-sm font-bold font-heading text-stone-900 dark:text-white mb-2.5">
              Live Sensor Readings
            </h4>

            {isOffline ? (
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 text-xs">
                <strong>Offline Station:</strong> This station is not actively transmitting real-time packets. Displaying last confirmed telemetry values before signal timeout:
              </div>
            ) : null}

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              {/* Reading 1: Soil Moisture */}
              <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-forest-950/40 border border-stone-200/80 dark:border-forest-900/50">
                <div className="flex items-center justify-between text-stone-400 mb-1.5">
                  <span className="text-[11px] font-semibold text-stone-600 dark:text-stone-300">Soil Moisture</span>
                  <Droplets className="w-4 h-4 text-nature-500" />
                </div>
                <div className="text-xl sm:text-2xl font-bold font-heading font-mono text-stone-900 dark:text-white">
                  {isOffline ? node.lastKnown?.soil : node.soil}
                  <span className="text-xs font-normal text-stone-400 ml-0.5">%</span>
                </div>
                <span className="text-[10px] text-stone-400 mt-1 block">Capacitive volumetric</span>
              </div>

              {/* Reading 2: Rainfall */}
              <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-forest-950/40 border border-stone-200/80 dark:border-forest-900/50">
                <div className="flex items-center justify-between text-stone-400 mb-1.5">
                  <span className="text-[11px] font-semibold text-stone-600 dark:text-stone-300">Rainfall</span>
                  <CloudRain className="w-4 h-4 text-sky-500" />
                </div>
                <div className="text-xl sm:text-2xl font-bold font-heading font-mono text-stone-900 dark:text-white">
                  {isOffline ? node.lastKnown?.rain : node.rain}
                  <span className="text-xs font-normal text-stone-400 ml-0.5">mm</span>
                </div>
                <span className="text-[10px] text-stone-400 mt-1 block">24h precipitation bucket</span>
              </div>

              {/* Reading 3: Ground Tilt */}
              <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-forest-950/40 border border-stone-200/80 dark:border-forest-900/50">
                <div className="flex items-center justify-between text-stone-400 mb-1.5">
                  <span className="text-[11px] font-semibold text-stone-600 dark:text-stone-300">Ground Tilt</span>
                  <Compass className="w-4 h-4 text-forest-600 dark:text-nature-400" />
                </div>
                <div className="text-xl sm:text-2xl font-bold font-heading font-mono text-stone-900 dark:text-white">
                  {isOffline ? node.lastKnown?.tilt : node.tilt}
                  <span className="text-xs font-normal text-stone-400 ml-0.5">°</span>
                </div>
                <span className="text-[10px] text-stone-400 mt-1 block">Biaxial MEMS inclinometer</span>
              </div>

              {/* Reading 4: Vibration */}
              <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-forest-950/40 border border-stone-200/80 dark:border-forest-900/50">
                <div className="flex items-center justify-between text-stone-400 mb-1.5">
                  <span className="text-[11px] font-semibold text-stone-600 dark:text-stone-300">Vibration</span>
                  <Activity className="w-4 h-4 text-amber-500" />
                </div>
                <div className="text-xl sm:text-2xl font-bold font-heading font-mono text-stone-900 dark:text-white">
                  {isOffline ? node.lastKnown?.vibration : node.vibration}
                  <span className="text-xs font-normal text-stone-400 ml-0.5">g</span>
                </div>
                <span className="text-[10px] text-stone-400 mt-1 block">Micro-seismic accelerometer</span>
              </div>

              {/* Reading 5: Temperature */}
              <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-forest-950/40 border border-stone-200/80 dark:border-forest-900/50">
                <div className="flex items-center justify-between text-stone-400 mb-1.5">
                  <span className="text-[11px] font-semibold text-stone-600 dark:text-stone-300">Temperature</span>
                  <Thermometer className="w-4 h-4 text-rose-500" />
                </div>
                <div className="text-xl sm:text-2xl font-bold font-heading font-mono text-stone-900 dark:text-white">
                  {isOffline ? node.lastKnown?.temperature : node.temperature}
                  <span className="text-xs font-normal text-stone-400 ml-0.5">°C</span>
                </div>
                <span className="text-[10px] text-stone-400 mt-1 block">Ambient geotechnical sensor</span>
              </div>

              {/* Reading 6: Humidity */}
              <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-forest-950/40 border border-stone-200/80 dark:border-forest-900/50">
                <div className="flex items-center justify-between text-stone-400 mb-1.5">
                  <span className="text-[11px] font-semibold text-stone-600 dark:text-stone-300">Humidity</span>
                  <Wind className="w-4 h-4 text-purple-500" />
                </div>
                <div className="text-xl sm:text-2xl font-bold font-heading font-mono text-stone-900 dark:text-white">
                  {isOffline ? node.lastKnown?.humidity : node.humidity}
                  <span className="text-xs font-normal text-stone-400 ml-0.5">%</span>
                </div>
                <span className="text-[10px] text-stone-400 mt-1 block">Relative surface atmosphere</span>
              </div>
            </div>
          </div>

          {/* 3. NODE HEALTH & LORA TRANSMISSION METRICS */}
          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-forest-950/40 border border-stone-200/80 dark:border-forest-900/50 space-y-3.5">
            <h4 className="text-sm font-bold font-heading text-stone-900 dark:text-white">
              Node Health &amp; Telemetry Integrity
            </h4>

            {/* Battery Progress Bar */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-stone-500 dark:text-stone-400 font-medium">Battery Charge</span>
                <strong className="font-mono text-stone-900 dark:text-white">{node.battery}%</strong>
              </div>
              <div className="w-full h-2.5 rounded-full bg-stone-200 dark:bg-stone-800 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    node.battery > 50 ? 'bg-nature-500' : node.battery > 20 ? 'bg-amber-500' : 'bg-rose-500'
                  }`}
                  style={{ width: `${node.battery}%` }}
                />
              </div>
            </div>

            {/* Diagnostic Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-[11px]">
              <div className="p-2.5 rounded-xl bg-white dark:bg-forest-900/30 border border-stone-200/60 dark:border-forest-800/60">
                <span className="text-stone-400 block text-[10px]">LoRa Signal</span>
                <strong className="font-mono text-stone-800 dark:text-stone-200 text-xs">{node.signal}</strong>
                <span className="text-[10px] text-nature-600 dark:text-nature-400 block mt-0.5">Status: {signalQuality}</span>
              </div>

              <div className="p-2.5 rounded-xl bg-white dark:bg-forest-900/30 border border-stone-200/60 dark:border-forest-800/60">
                <span className="text-stone-400 block text-[10px]">Last Uplink</span>
                <strong className="text-stone-800 dark:text-stone-200 text-xs">{node.lastUpdate}</strong>
                <span className="text-[10px] text-stone-400 block mt-0.5">Synchronized</span>
              </div>

              <div className="p-2.5 rounded-xl bg-white dark:bg-forest-900/30 border border-stone-200/60 dark:border-forest-800/60">
                <span className="text-stone-400 block text-[10px]">Packets Ingested</span>
                <strong className="font-mono text-stone-800 dark:text-stone-200 text-xs">{node.packets?.toLocaleString()}</strong>
                <span className="text-[10px] text-stone-400 block mt-0.5">Sub-GHz frame count</span>
              </div>

              <div className="p-2.5 rounded-xl bg-white dark:bg-forest-900/30 border border-stone-200/60 dark:border-forest-800/60">
                <span className="text-stone-400 block text-[10px]">Packet Success</span>
                <strong className="font-mono text-nature-600 dark:text-nature-400 text-xs">{node.packetSuccess}%</strong>
                <span className="text-[10px] text-stone-400 block mt-0.5">CRC valid</span>
              </div>
            </div>
          </div>

          {/* 4. SENSOR HISTORY CHART (24H) */}
          <div className="p-4 rounded-2xl bg-white dark:bg-forest-950/40 border border-stone-200/80 dark:border-forest-900/60">
            <SensorHistoryChart node={node} />
          </div>

          {/* 5. RISK HISTORY (24-Hour Progression) */}
          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-forest-950/40 border border-stone-200/80 dark:border-forest-900/50">
            <h4 className="text-sm font-bold font-heading text-stone-900 dark:text-white mb-2">
              Risk History — 24-Hour Progression
            </h4>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full text-xs">
              {(node.riskHistory || ["Safe", "Safe", "Safe", "Safe", "Safe"]).map((state, idx, arr) => (
                <React.Fragment key={idx}>
                  <span className={`px-2.5 py-1 rounded-lg font-semibold text-[11px] whitespace-nowrap ${
                    state === 'High Risk'
                      ? 'bg-orange-500/15 text-orange-700 dark:text-orange-400 border border-orange-500/30'
                      : state === 'Warning'
                        ? 'bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30'
                        : state === 'Unknown'
                          ? 'bg-stone-200 dark:bg-stone-800 text-stone-500'
                          : 'bg-nature-500/15 text-nature-700 dark:text-nature-400 border border-nature-500/30'
                  }`}>
                    {state}
                  </span>
                  {idx < arr.length - 1 && (
                    <ArrowRight className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
                  )}
                </React.Fragment>
              ))}
            </div>
            <p className="text-[10px] text-stone-400 mt-2">
              Evaluated sequentially using multi-sensor environmental threshold criteria.
            </p>
          </div>

          {/* 6. QUICK NODE ACTIONS (Navigation to other views) */}
          <div className="pt-2 border-t border-stone-100 dark:border-forest-900/60">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2.5">
              Quick Operational Actions
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  navigate('/map');
                }}
                className="min-h-[44px] px-3.5 py-2 rounded-xl bg-stone-100 dark:bg-forest-900/50 hover:bg-stone-200 dark:hover:bg-forest-800/60 text-stone-800 dark:text-stone-200 font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <MapPin className="w-4 h-4 text-forest-600 dark:text-nature-400" />
                <span>View on Map</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  navigate('/risk-analysis');
                }}
                className="min-h-[44px] px-3.5 py-2 rounded-xl bg-stone-100 dark:bg-forest-900/50 hover:bg-stone-200 dark:hover:bg-forest-800/60 text-stone-800 dark:text-stone-200 font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <BrainCircuit className="w-4 h-4 text-forest-600 dark:text-nature-400" />
                <span>Analyze Risk</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  navigate('/alerts');
                }}
                className="min-h-[44px] px-3.5 py-2 rounded-xl bg-stone-100 dark:bg-forest-900/50 hover:bg-stone-200 dark:hover:bg-forest-800/60 text-stone-800 dark:text-stone-200 font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <AlertTriangle className="w-4 h-4 text-orange-500" />
                <span>View Alerts</span>
              </button>
            </div>
          </div>

        </div>

        {/* MODAL FOOTER */}
        <div className="p-4 border-t border-stone-100 dark:border-forest-900/60 bg-stone-50/80 dark:bg-forest-950/60 flex items-center justify-between text-xs flex-shrink-0">
          <span className="text-[11px] text-stone-400">
            Node coordinates: Sector {node.location?.name || node.location} &bull; ESP32 + LoRa SX1276 Node
          </span>
          <button
            type="button"
            onClick={onClose}
            className="min-h-[40px] px-4 py-1.5 rounded-xl bg-stone-200 dark:bg-forest-900 text-stone-800 dark:text-stone-200 hover:bg-stone-300 dark:hover:bg-forest-800 font-semibold transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

export default SensorDetailModal;
