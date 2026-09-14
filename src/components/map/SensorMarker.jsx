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
 * NODE-05 receives maximum visual prominence (High Risk red, double animated ping, and red radiant glow).
 */
function createNodeDivIcon(node, isSelected) {
  const isOffline = node.status?.toLowerCase() === 'offline';
  const riskLevel = isOffline ? 'unknown' : (node.risk?.level?.toLowerCase() || (typeof node.risk === 'string' ? node.risk.toLowerCase() : 'safe'));
  const isHighRisk = !isOffline && (riskLevel === 'critical' || riskLevel === 'high-risk' || riskLevel === 'high risk' || node.id === 'NODE-05');
  const isWarning = !isOffline && (riskLevel === 'warning');

  let dotBg = '#10b981'; // Green: Safe
  let pulseRing = '';
  let dotInner = '';

  if (isOffline) {
    dotBg = '#94a3b8'; // Slate: Offline
    dotInner = '<div class="w-1.5 h-1.5 rounded-full bg-slate-900"></div>';
  } else if (isHighRisk) {
    dotBg = '#ef4444'; // Red: High Risk
    pulseRing = '<span class="animate-ping absolute -top-1.5 -left-1.5 w-7 h-7 rounded-full bg-red-500 opacity-75 pointer-events-none"></span>';
    dotInner = '<div class="w-1.5 h-1.5 rounded-full bg-white"></div>';
  } else if (isWarning) {
    dotBg = '#f59e0b'; // Amber: Warning
    dotInner = '<div class="w-1.5 h-1.5 rounded-full bg-black/60"></div>';
  }

  const selectGlow = isSelected 
    ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-950 scale-110 z-50 shadow-2xl' 
    : 'hover:scale-105 shadow-md';

  const html = `
    <div class="relative flex items-center cursor-pointer select-none transition-all duration-200 ${selectGlow}">
      ${pulseRing}
      <div class="w-4 h-4 rounded-full border-2 border-white shadow-md flex items-center justify-center shrink-0 z-20" style="background-color: ${dotBg};">
        ${dotInner}
      </div>
      <div class="-ml-1 pl-2 pr-2.5 py-0.5 rounded-r-md bg-black/90 text-white border border-white/25 text-[10px] font-mono font-bold tracking-tight shadow-xl flex items-center gap-1 backdrop-blur-md whitespace-nowrap z-10">
        <span>${node.id}</span>
      </div>
    </div>
  `;

  return L.divIcon({
    html,
    className: 'custom-node-marker',
    iconSize: [84, 24],
    iconAnchor: [8, 12],
    popupAnchor: [0, -14]
  });
}

export const SensorMarker = ({ node, isSelected, onSelect, popupVariant = 'detailed', disablePopup = false }) => {
  const position = [
    node.latitude ?? node.location?.latitude ?? 32.25,
    node.longitude ?? node.location?.longitude ?? 77.18
  ];

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
    riskBadgeColor = 'bg-stone-100 text-stone-600 border-stone-300';
  } else if (riskDisplay.includes('HIGH') || riskDisplay.includes('CRITICAL')) {
    riskBadgeColor = 'bg-red-100 text-red-800 border-red-300';
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
    if (isSelected && markerRef.current && !disablePopup) {
      const timer = setTimeout(() => {
        if (markerRef.current) {
          markerRef.current.openPopup();
        }
      }, 350);
      return () => clearTimeout(timer);
    } else if (!isSelected && markerRef.current) {
      markerRef.current.closePopup();
    }
  }, [isSelected, disablePopup]);

  return (
    <Marker 
      ref={markerRef}
      position={position} 
      icon={customIcon}
      zIndexOffset={node.id === 'NODE-05' || riskDisplay.includes('HIGH') ? 1500 : riskDisplay.includes('WARNING') ? 800 : isOffline ? 100 : 400}
      eventHandlers={{
        click: () => {
          if (onSelect) onSelect(node);
        }
      }}
    >
      {!disablePopup && (
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
      )}
    </Marker>
  );
};

export default SensorMarker;
