import React, { useMemo } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import { 
  AlertTriangle, 
  Activity, 
  WifiOff, 
  ExternalLink 
} from 'lucide-react';

/**
 * Generates custom HTML divIcon for Leaflet markers matching the reference image.
 * Features a teardrop GIS pin with risk color and a dark attached badge displaying "NODE-01", "NODE-02", etc.
 */
function createNodeDivIcon(node, isSelected) {
  const isOffline = node.status?.toLowerCase() === 'offline';
  const riskLevel = isOffline ? 'unknown' : (node.risk?.level?.toLowerCase() || (typeof node.risk === 'string' ? node.risk.toLowerCase() : 'safe'));

  // Risk pin colors matching the reference image
  let pinColor = '#10b981'; // Green: Safe
  let pulseRing = '';

  if (isOffline) {
    pinColor = '#6b7280'; // Gray: Offline
  } else if (riskLevel === 'critical' || riskLevel === 'high-risk' || riskLevel === 'high risk') {
    pinColor = '#ef4444'; // Red: High Risk
    pulseRing = '<div class="absolute -top-1 -left-1 w-9 h-9 rounded-full bg-red-500/35 animate-ping pointer-events-none"></div>';
  } else if (riskLevel === 'warning') {
    pinColor = '#f59e0b'; // Amber / Yellow: Warning
  }

  const selectGlow = isSelected 
    ? 'ring-2 ring-white ring-offset-2 ring-offset-black/50 scale-110 z-50 drop-shadow-xl' 
    : 'hover:scale-105 drop-shadow-md';

  const html = `
    <div class="relative flex items-center cursor-pointer select-none transition-all duration-200 ${selectGlow}">
      ${pulseRing}
      <!-- Teardrop GIS Pin with Mountain Peak Icon inside -->
      <div class="relative flex items-center justify-center flex-shrink-0">
        <svg width="28" height="34" viewBox="0 0 28 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Teardrop path with tip at (14, 34) -->
          <path d="M14 0C6.268 0 0 6.268 0 14C0 23.5 14 34 14 34C14 34 28 23.5 28 14C28 6.268 21.732 0 14 0Z" fill="${pinColor}" stroke="#ffffff" stroke-width="1.8" />
          <!-- Inner circle badge -->
          <circle cx="14" cy="13" r="8" fill="rgba(0,0,0,0.22)" />
          <!-- Mountain icon inside pin -->
          <path d="M9 16.5L12.5 10.5L15.5 14.5L17.5 11.5L20 16.5H9Z" fill="#ffffff" />
        </svg>
      </div>

      <!-- Attached Sleek Dark Node ID Badge -->
      <div class="-ml-1 pl-2 pr-2.5 py-0.5 rounded-r-md bg-[#0f172a]/95 text-white border border-[#334155]/90 text-[10px] font-mono font-bold tracking-tight shadow-md flex items-center backdrop-blur-xs whitespace-nowrap">
        ${node.id}
      </div>
    </div>
  `;

  return L.divIcon({
    html,
    className: 'custom-node-marker',
    iconSize: [96, 36],
    iconAnchor: [14, 34], // Pin tip at (14, 34)
    popupAnchor: [0, -34]
  });
}

export const SensorMarker = ({ node, isSelected, onSelect, popupVariant = 'detailed' }) => {
  const navigate = useNavigate();
  const position = [node.latitude, node.longitude];

  const customIcon = useMemo(() => {
    return createNodeDivIcon(node, isSelected);
  }, [node, isSelected]);

  const isOffline = node.status?.toLowerCase() === 'offline';
  const riskDisplay = isOffline
    ? 'UNKNOWN'
    : (node.riskLevel || (node.risk?.level === 'high-risk' ? 'HIGH RISK' : node.risk?.level === 'warning' ? 'WARNING' : node.risk?.level === 'critical' ? 'CRITICAL' : 'SAFE')).toUpperCase();

  const scoreDisplay = isOffline ? '—' : `${node.risk?.score ?? '—'} / 100`;

  let riskBadgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-300';
  if (isOffline) {
    riskBadgeColor = 'bg-stone-100 text-stone-700 border-stone-300';
  } else if (riskDisplay.includes('CRITICAL')) {
    riskBadgeColor = 'bg-red-100 text-red-800 border-red-300 font-bold';
  } else if (riskDisplay.includes('HIGH RISK')) {
    riskBadgeColor = 'bg-orange-100 text-orange-800 border-orange-300 font-bold';
  } else if (riskDisplay.includes('WARNING')) {
    riskBadgeColor = 'bg-amber-100 text-amber-800 border-amber-300';
  }

  const isCompact = popupVariant === 'compact';

  const soilVal = isOffline ? '—' : `${typeof node.readings?.soilMoisture?.value === 'number' ? Number(node.readings.soilMoisture.value).toFixed(1) : (node.readings?.soilMoisture?.value ?? '76')}%`;
  const rainVal = isOffline ? '—' : `${typeof node.readings?.rainfall?.value === 'number' ? Math.round(node.readings.rainfall.value) : (node.readings?.rainfall?.value ?? '29')} mm`;
  const tiltVal = isOffline ? '—' : `${typeof node.readings?.tilt?.value === 'number' ? Number(node.readings.tilt.value).toFixed(1) : (node.readings?.tilt?.value ?? '4.8')}°`;
  const vibVal = isOffline ? '—' : `${typeof node.readings?.vibration?.value === 'number' ? Number(node.readings.vibration.value).toFixed(2) : (node.readings?.vibration?.value ?? '0.11')} g`;
  const tempVal = isOffline ? '—' : `${typeof node.readings?.temperature?.value === 'number' ? Number(node.readings.temperature.value).toFixed(1) : (node.readings?.temperature?.value ?? '18.4')}°C`;
  const battVal = `${node.device?.battery?.value ?? '—'}%`;
  const signalVal = isOffline ? '—' : (node.device?.signal?.rssi ? `${node.device.signal.rssi} dBm` : '-82 dBm');
  const lastSeenVal = node.device?.lastSeen || (isOffline ? '18 minutes ago' : 'Just now');

  const markerRef = React.useRef(null);

  React.useEffect(() => {
    if (isSelected && markerRef.current) {
      const timer = setTimeout(() => {
        if (markerRef.current) {
          markerRef.current.openPopup();
        }
      }, 350);
      return () => clearTimeout(timer);
    } else if (!isSelected && markerRef.current) {
      markerRef.current.closePopup();
    }
  }, [isSelected]);

  return (
    <Marker 
      ref={markerRef}
      position={position} 
      icon={customIcon}
      eventHandlers={{
        click: () => {
          if (onSelect) onSelect(node);
        }
      }}
    >
      <Popup 
        className="custom-leaflet-popup" 
        minWidth={isCompact ? 220 : 270} 
        maxWidth={isCompact ? 260 : 320}
        autoPan={true}
        autoPanPaddingTopLeft={[20, 85]}
        autoPanPaddingBottomRight={[20, 20]}
      >
        <div className="p-1 space-y-2 text-stone-800 font-sans text-xs">
          
          {/* Header */}
          <div className="flex items-start justify-between border-b border-stone-200 pb-2">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm font-heading text-stone-900">
                  {node.id}
                </span>
                <span className={`text-[10px] font-mono uppercase px-1.5 py-0.2 rounded font-bold border ${
                  isOffline ? 'bg-stone-200 text-stone-600 border-stone-300' : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                }`}>
                  {node.status?.toUpperCase() || 'ONLINE'}
                </span>
              </div>
              <p className="text-xs text-stone-600 font-medium">
                {node.location?.name || 'Mountain Sector'}
              </p>
            </div>

            <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full border ${riskBadgeColor}`}>
              {riskDisplay}
            </span>
          </div>

          {/* Risk Score */}
          <div className="flex items-center justify-between p-1.5 rounded-lg bg-stone-50 border border-stone-200/80">
            <span className="text-stone-500 font-medium">Risk Score:</span>
            <span className="font-bold font-mono text-stone-900">{scoreDisplay}</span>
          </div>

          {/* Detailed Telemetry Readings (Full Map Mode) */}
          {!isCompact && (
            <>
              <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                <div className="p-1.5 rounded bg-stone-50 border border-stone-200/60">
                  <span className="text-[10px] text-stone-500 block">Soil Moisture:</span>
                  <strong className="text-stone-800 font-mono">{soilVal}</strong>
                </div>

                <div className="p-1.5 rounded bg-stone-50 border border-stone-200/60">
                  <span className="text-[10px] text-stone-500 block">Rainfall:</span>
                  <strong className="text-stone-800 font-mono">{rainVal}</strong>
                </div>

                <div className="p-1.5 rounded bg-stone-50 border border-stone-200/60">
                  <span className="text-[10px] text-stone-500 block">Tilt:</span>
                  <strong className="text-stone-800 font-mono">{tiltVal}</strong>
                </div>

                <div className="p-1.5 rounded bg-stone-50 border border-stone-200/60">
                  <span className="text-[10px] text-stone-500 block">Vibration:</span>
                  <strong className="text-stone-800 font-mono">{vibVal}</strong>
                </div>

                <div className="p-1.5 rounded bg-stone-50 border border-stone-200/60">
                  <span className="text-[10px] text-stone-500 block">Temperature:</span>
                  <strong className="text-stone-800 font-mono">{tempVal}</strong>
                </div>

                <div className="p-1.5 rounded bg-stone-50 border border-stone-200/60">
                  <span className="text-[10px] text-stone-500 block">Battery:</span>
                  <strong className="text-stone-800 font-mono">{battVal}</strong>
                </div>
              </div>

              {/* LoRa Signal and Last Updated */}
              <div className="flex items-center justify-between text-[11px] text-stone-600 pt-1 border-t border-stone-200">
                <span>LoRa RSSI: <strong>{signalVal}</strong></span>
                <span className="text-[10px] text-stone-400 font-mono">{lastSeenVal}</span>
              </div>
            </>
          )}

          {/* Action Button: [View Details] */}
          <button
            type="button"
            onClick={() => {
              if (onSelect) onSelect(node);
              navigate(`/sensors?node=${node.id}`);
            }}
            className="w-full mt-1.5 py-1.5 px-3 rounded-lg bg-[#10b981] hover:bg-[#059669] text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
          >
            <span>View Details</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

        </div>
      </Popup>
    </Marker>
  );
};

export default SensorMarker;
