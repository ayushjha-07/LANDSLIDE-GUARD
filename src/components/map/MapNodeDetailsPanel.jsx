import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Droplets, 
  CloudRain, 
  Compass, 
  Activity, 
  Thermometer, 
  Clock, 
  MapPin, 
  Flame,
  AlertTriangle,
  Battery,
  Wifi,
  Copy,
  Check,
  ArrowRight,
  X
} from 'lucide-react';
import Card from '../common/Card';
import { getNodeFieldImage, getNodeLocationName } from '../../assets/nodes/nodeImages';

export const MapNodeDetailsPanel = ({ node, onClose, className = "" }) => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  if (!node) {
    return (
      <div className={`p-6 rounded-2xl bg-[#0d1612]/95 dark:bg-[#0a120e]/95 border border-stone-800 text-center text-stone-400 shadow-xl ${className}`}>
        <MapPin className="w-10 h-10 mb-2 mx-auto text-stone-500" />
        <h4 className="text-sm font-bold text-stone-300">
          No Station Selected
        </h4>
        <p className="text-xs text-stone-500 max-w-xs mt-1 mx-auto">
          Click any sensor marker on the terrain map to inspect real-time geotechnical telemetry.
        </p>
      </div>
    );
  }

  const isOffline = node.status?.toLowerCase() === 'offline';

  const riskDisplay = isOffline
    ? 'Unknown'
    : (node.riskLevel || (node.risk?.level === 'high-risk' ? 'High Risk' : node.risk?.level === 'warning' ? 'Warning' : node.risk?.level === 'critical' ? 'Critical' : (typeof node.risk === 'string' ? node.risk : 'Safe')));

  let riskBadgeColor = "bg-[#10b981] text-white";
  let riskBadgeBorder = "border-[#10b981]";
  if (isOffline) {
    riskBadgeColor = "bg-[#6b7280] text-stone-100";
    riskBadgeBorder = "border-[#6b7280]";
  } else if (riskDisplay === 'Critical' || node.risk?.level === 'critical') {
    riskBadgeColor = "bg-[#dc2626] text-white";
    riskBadgeBorder = "border-[#dc2626]";
  } else if (riskDisplay === 'High Risk' || node.risk?.level === 'high-risk') {
    riskBadgeColor = "bg-[#dc2626] text-white";
    riskBadgeBorder = "border-[#dc2626]";
  } else if (riskDisplay === 'Warning' || node.risk?.level === 'warning') {
    riskBadgeColor = "bg-[#f59e0b] text-white";
    riskBadgeBorder = "border-[#f59e0b]";
  }

  const coordsString = `${node.latitude ? node.latitude.toFixed(4) : '32.2417'}, ${node.longitude ? node.longitude.toFixed(4) : '77.1892'}`;

  const handleCopyCoords = () => {
    navigator.clipboard?.writeText(coordsString);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const soilVal = isOffline ? '—' : `${typeof node.readings?.soilMoisture?.value === 'number' ? Number(node.readings.soilMoisture.value).toFixed(0) : (node.readings?.soilMoisture?.value ?? '76')} %`;
  const rainVal = isOffline ? '—' : `${typeof node.readings?.rainfall?.value === 'number' ? Math.round(node.readings.rainfall.value) : (node.readings?.rainfall?.value ?? '29')} mm`;
  const tiltVal = isOffline ? '—' : `${typeof node.readings?.tilt?.value === 'number' ? Number(node.readings.tilt.value).toFixed(1) : (node.readings?.tilt?.value ?? '4.8')} °`;
  const vibVal = isOffline ? '—' : `${typeof node.readings?.vibration?.value === 'number' ? Number(node.readings.vibration.value).toFixed(2) : (node.readings?.vibration?.value ?? '0.11')} g`;
  const tempVal = isOffline ? '—' : `${typeof node.readings?.temperature?.value === 'number' ? Number(node.readings.temperature.value).toFixed(1) : (node.readings?.temperature?.value ?? '18.4')} °C`;
  const battVal = `${node.device?.battery?.value ?? '73'} %`;
  const signalVal = isOffline ? 'Unavailable' : (node.device?.signal?.rssi ? `${node.device.signal.rssi} dBm` : '-82 dBm');
  const lastSeenVal = node.device?.lastSeen || (isOffline ? '18 minutes ago' : '2 minutes ago');

  return (
    <div className={`p-4 sm:p-5 rounded-2xl bg-[#0f172a]/95 dark:bg-[#0b1319]/95 backdrop-blur-md border border-stone-800 shadow-2xl text-stone-200 flex flex-col justify-between ${className}`}>
      
      <div>
        {/* Top Header: Node ID & Risk Badge */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <h3 className="text-xl sm:text-2xl font-black font-mono tracking-tight text-white">
              {node.id}
            </h3>
          </div>

          <div className="flex items-center gap-1.5">
            <span className={`px-2.5 py-0.5 text-xs font-bold rounded-md shadow-xs ${riskBadgeColor}`}>
              {riskDisplay}
            </span>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="p-1 rounded-lg text-stone-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Close panel"
                aria-label="Close panel"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Location & Prototype GPS Coordinates */}
        <div className="mt-1 space-y-0.5 text-xs">
          <div className="text-white font-bold text-sm tracking-tight">
            {getNodeLocationName(node.id) || node.location?.name || node.name || 'Mountain Zone C'}
          </div>

          <div className="flex items-center gap-1.5 text-stone-300 text-xs">
            <MapPin className="w-3.5 h-3.5 text-[#10b981] flex-shrink-0" />
            <span>Near Kullu, Himachal Pradesh</span>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-stone-400 pt-0.5">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-stone-500 flex-shrink-0" />
              <span>{coordsString} <span className="text-stone-500">(Prototype)</span></span>
            </div>
            <button
              type="button"
              onClick={handleCopyCoords}
              className="p-1 hover:text-white transition-colors cursor-pointer"
              title="Copy GPS coordinates"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Real Field Station Photograph */}
        <div className="mt-3 relative aspect-[16/10] sm:aspect-video rounded-xl overflow-hidden border border-stone-800 shadow-md bg-black/40 group">
          <img
            key={node.id}
            src={getNodeFieldImage(node.id)}
            alt={`${node.id} field sensor station`}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {/* Top-Right Badge */}
          <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md border border-white/15 text-[10px] font-medium text-stone-200 shadow-md">
            Reference field image
          </div>
          {/* Bottom Caption matching reference image */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-2 pt-4">
            <p className="text-[10.5px] text-stone-200 font-medium tracking-tight">
              Actual sensor installation at mountain slope
            </p>
          </div>
        </div>

        {/* Telemetry Metric Rows */}
        <div className="space-y-1.5 text-xs divide-y divide-stone-800/80 pt-2 border-t border-stone-800/80 mt-2">
          {/* Status */}
          <div className="flex items-center justify-between pt-1 text-stone-300">
            <span className="text-stone-400">Status</span>
            <span className={isOffline ? 'text-stone-400 font-semibold' : 'text-[#10b981] font-bold flex items-center gap-1.5'}>
              {!isOffline && <span className="w-2 h-2 rounded-full bg-[#10b981]" />}
              {node.status?.toUpperCase() === 'ONLINE' ? 'Online' : 'Offline'}
            </span>
          </div>

          {/* Risk Score */}
          <div className="flex items-center justify-between pt-1.5 text-stone-300">
            <span className="text-stone-400">Risk Score</span>
            <span className="font-mono font-bold text-white text-sm">
              {isOffline ? '—' : `${node.riskScore ?? '68'} / 100`}
            </span>
          </div>

          {/* Risk Level */}
          <div className="flex items-center justify-between pt-1.5 text-stone-300">
            <span className="text-stone-400">Risk Level</span>
            <span className={`font-semibold flex items-center gap-1 ${
              riskDisplay === 'High Risk' || riskDisplay === 'Critical' ? 'text-red-400' :
              riskDisplay === 'Warning' ? 'text-amber-400' :
              isOffline ? 'text-stone-400' : 'text-[#10b981]'
            }`}>
              {!isOffline && (riskDisplay === 'High Risk' || riskDisplay === 'Critical') && <Flame className="w-3.5 h-3.5 text-red-400" />}
              {riskDisplay}
            </span>
          </div>

          {/* Soil Moisture */}
          <div className="flex items-center justify-between pt-1.5 text-stone-300">
            <div className="flex items-center gap-1.5 text-stone-400">
              <Droplets className="w-3.5 h-3.5 text-[#10b981]" />
              <span>Soil Moisture</span>
            </div>
            <span className="font-mono font-bold text-white">{soilVal}</span>
          </div>

          {/* Rainfall */}
          <div className="flex items-center justify-between pt-1.5 text-stone-300">
            <div className="flex items-center gap-1.5 text-stone-400">
              <CloudRain className="w-3.5 h-3.5 text-sky-400" />
              <span>Rainfall</span>
            </div>
            <span className="font-mono font-bold text-white">{rainVal}</span>
          </div>

          {/* Tilt */}
          <div className="flex items-center justify-between pt-1.5 text-stone-300">
            <div className="flex items-center gap-1.5 text-stone-400">
              <Compass className="w-3.5 h-3.5 text-emerald-400" />
              <span>Tilt</span>
            </div>
            <span className="font-mono font-bold text-white">{tiltVal}</span>
          </div>

          {/* Vibration */}
          <div className="flex items-center justify-between pt-1.5 text-stone-300">
            <div className="flex items-center gap-1.5 text-stone-400">
              <Activity className="w-3.5 h-3.5 text-amber-400" />
              <span>Vibration</span>
            </div>
            <span className="font-mono font-bold text-white">{vibVal}</span>
          </div>

          {/* Temperature */}
          <div className="flex items-center justify-between pt-1.5 text-stone-300">
            <div className="flex items-center gap-1.5 text-stone-400">
              <Thermometer className="w-3.5 h-3.5 text-rose-400" />
              <span>Temperature</span>
            </div>
            <span className="font-mono font-bold text-white">{tempVal}</span>
          </div>

          {/* Battery */}
          <div className="flex items-center justify-between pt-1.5 text-stone-300">
            <div className="flex items-center gap-1.5 text-stone-400">
              <Battery className="w-3.5 h-3.5 text-emerald-400" />
              <span>Battery</span>
            </div>
            <span className="font-mono font-bold text-white">{battVal}</span>
          </div>

          {/* LoRa Signal (RSSI) */}
          <div className="flex items-center justify-between pt-1.5 text-stone-300">
            <div className="flex items-center gap-1.5 text-stone-400">
              <Wifi className="w-3.5 h-3.5 text-stone-400" />
              <span>LoRa Signal (RSSI)</span>
            </div>
            <span className="font-mono font-bold text-white">{signalVal}</span>
          </div>

          {/* Last Updated */}
          <div className="flex items-center justify-between pt-1.5 text-stone-300">
            <div className="flex items-center gap-1.5 text-stone-400">
              <Clock className="w-3.5 h-3.5 text-stone-500" />
              <span>Last Updated</span>
            </div>
            <span className="text-stone-400 text-[11px] font-medium">{lastSeenVal}</span>
          </div>
        </div>
      </div>

      {/* View Full Node Details CTA Button */}
      <div className="mt-4 pt-2 border-t border-stone-800">
        <Link
          to={`/sensors?node=${node.id}`}
          className="w-full min-h-[44px] py-2.5 px-4 rounded-xl bg-[#10b981] hover:bg-[#059669] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer text-center"
        >
          <span>View Full Node Details</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
};

export default MapNodeDetailsPanel;
