import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  ShieldCheck, 
  Plus, 
  Minus, 
  Crosshair, 
  BrainCircuit, 
  Layers, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink,
  Droplets,
  CloudRain,
  Activity,
  Compass,
  AlertTriangle
} from 'lucide-react';
import { MapContainer, TileLayer, Polygon, Marker, Popup, useMap, ScaleControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Link } from 'react-router-dom';
import { useSensorContext } from '../../context/SensorContext';

// Canonical Map Center: Kullu-Manali cluster
const MAP_CENTER = [32.225, 77.165];
const DEFAULT_ZOOM = 12;

// Real Tile Layer configurations
const TILE_LAYERS = {
  Satellite: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    maxZoom: 18,
    attribution: '&copy; Esri &mdash; Source: Esri, USGS, GIS User Community'
  },
  Map: {
    url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  },
  Terrain: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
    maxZoom: 18,
    attribution: '&copy; Esri, USGS, DeLorme, METI/NASA'
  }
};

// 1. High Risk Zone (Red Dashed - Central Corridor)
const HIGH_RISK_ZONE = [
  [32.242, 77.152],
  [32.246, 77.178],
  [32.235, 77.195],
  [32.216, 77.188],
  [32.212, 77.162],
  [32.222, 77.144]
];

// 2. Watch Zone (Yellow Dashed - Intermediate Zone)
const WATCH_ZONE = [
  [32.258, 77.142],
  [32.264, 77.184],
  [32.250, 77.214],
  [32.214, 77.220],
  [32.196, 77.186],
  [32.196, 77.142],
  [32.224, 77.122]
];

// 3. Monitoring Boundary (Green Dashed - Outer Perimeter)
const MONITORING_BOUNDARY = [
  [32.274, 77.132],
  [32.282, 77.188],
  [32.262, 77.234],
  [32.204, 77.246],
  [32.168, 77.224],
  [32.152, 77.184],
  [32.158, 77.138],
  [32.188, 77.108],
  [32.244, 77.108]
];

// Landmark Text Labels directly rendered on the terrain
const LANDMARKS = [
  { name: 'Manali', pos: [32.258, 77.184] },
  { name: 'Solang Valley', pos: [32.226, 77.112] },
  { name: 'Kullu', pos: [32.186, 77.122] }
];

// Default Sensor Node Definitions (All 8 Nodes)
const BASE_NODES = [
  { id: 'NODE-01', name: 'Solang Valley West', lat: 32.242, lng: 77.120, status: 'active', riskLevel: 'safe', riskScore: 18, elevation: '2,480m' },
  { id: 'NODE-02', name: 'Solang Ridge North', lat: 32.268, lng: 77.165, status: 'active', riskLevel: 'safe', riskScore: 24, elevation: '2,850m' },
  { id: 'NODE-03', name: 'Upper Catchment East', lat: 32.248, lng: 77.198, status: 'warning', riskLevel: 'warning', riskScore: 48, elevation: '3,100m' },
  { id: 'NODE-04', name: 'Vashisht Slopes East', lat: 32.225, lng: 77.228, status: 'active', riskLevel: 'safe', riskScore: 22, elevation: '2,150m' },
  { id: 'NODE-05', name: 'Solang Central Incline', lat: 32.230, lng: 77.170, status: 'critical', riskLevel: 'high-risk', riskScore: 78, elevation: '2,560m' },
  { id: 'NODE-06', name: 'Aleo Basin South', lat: 32.198, lng: 77.135, status: 'active', riskLevel: 'safe', riskScore: 19, elevation: '1,920m' },
  { id: 'NODE-07', name: 'Beas Riverbank West', lat: 32.180, lng: 77.165, status: 'offline', riskLevel: 'offline', riskScore: null, elevation: '1,890m' },
  { id: 'NODE-08', name: 'Parvati Approach South', lat: 32.195, lng: 77.215, status: 'active', riskLevel: 'safe', riskScore: 21, elevation: '3,450m' }
];

// Helper to create crisp landmark DivIcon
function createLandmarkDivIcon(name) {
  return L.divIcon({
    html: `<div class="text-white font-extrabold text-[11px] sm:text-xs tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] whitespace-nowrap pointer-events-none select-none">${name}</div>`,
    className: 'custom-map-landmark',
    iconSize: [90, 20],
    iconAnchor: [45, 10]
  });
}

// Helper to create custom sensor pin DivIcon matching the reference screenshot
function createSensorDivIcon(node) {
  const isOffline = node.status?.toLowerCase() === 'offline' || node.riskLevel === 'offline';
  const isCritical = !isOffline && (node.riskLevel === 'critical' || node.riskLevel === 'high-risk' || (node.riskScore && node.riskScore > 65));
  const isWarning = !isOffline && !isCritical && (node.riskLevel === 'warning' || (node.riskScore && node.riskScore > 35));

  let dotBg = '#10b981'; // Green
  let pingRing = '';
  let dotInner = '';

  if (isOffline) {
    dotBg = '#94a3b8'; // Slate
    dotInner = '<div class="w-1.5 h-1.5 rounded-full bg-slate-900"></div>';
  } else if (isCritical) {
    dotBg = '#ef4444'; // Red
    pingRing = '<span class="animate-ping absolute -top-1 -left-1 w-5 h-5 rounded-full bg-red-500 opacity-75 pointer-events-none"></span>';
    dotInner = '<div class="w-1.5 h-1.5 rounded-full bg-white"></div>';
  } else if (isWarning) {
    dotBg = '#f59e0b'; // Amber
    dotInner = '<div class="w-1.5 h-1.5 rounded-full bg-black/60"></div>';
  }

  const html = `
    <div class="relative flex items-center cursor-pointer select-none group transition-transform duration-200 hover:scale-110">
      ${pingRing}
      <div class="w-4 h-4 rounded-full border-2 border-white shadow-md flex items-center justify-center shrink-0 z-20" style="background-color: ${dotBg};">
        ${dotInner}
      </div>
      <div class="-ml-1 pl-2 pr-2 py-0.5 rounded-r-md bg-slate-950/90 text-white border border-white/20 text-[9px] font-mono font-bold tracking-tight shadow-lg flex items-center gap-1 backdrop-blur-md whitespace-nowrap z-10">
        <span>${node.id}</span>
      </div>
    </div>
  `;

  return L.divIcon({
    html,
    className: 'custom-risk-marker',
    iconSize: [80, 22],
    iconAnchor: [8, 11],
    popupAnchor: [0, -12]
  });
}

// Map Resizer component to ensure proper tile rendering on mount and resize
function MapResizer() {
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 150);
    const handleResize = () => map.invalidateSize();
    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [map]);
  return null;
}

export const RiskGeoMapCard = () => {
  const [mapLayer, setMapLayer] = useState('Satellite');
  const [showRiskZones, setShowRiskZones] = useState(true);
  const [mapInstance, setMapInstance] = useState(null);
  const { nodes: liveNodes } = useSensorContext() || {};

  // Merge live node data with base geographic node positions
  const displayNodes = useMemo(() => {
    return BASE_NODES.map((base) => {
      const live = liveNodes?.find((n) => n.id === base.id);
      if (!live) return base;
      const isOffline = live.status?.toLowerCase() === 'offline';
      return {
        ...base,
        status: live.status || base.status,
        riskScore: isOffline ? null : (live.risk?.score ?? base.riskScore),
        riskLevel: isOffline ? 'offline' : (live.risk?.level ?? base.riskLevel),
        moisture: live.readings?.soilMoisture ?? 45,
        rainfall: live.readings?.rainfall ?? 18,
        tilt: live.readings?.tiltAngle ?? 1.8,
        vibration: live.readings?.vibration ?? 0.04
      };
    });
  }, [liveNodes]);

  // Working Zoom & Recenter handlers
  const handleZoomIn = () => {
    if (mapInstance) mapInstance.zoomIn();
  };

  const handleZoomOut = () => {
    if (mapInstance) mapInstance.zoomOut();
  };

  const handleRecenter = () => {
    if (mapInstance) {
      mapInstance.flyTo(MAP_CENTER, DEFAULT_ZOOM, {
        duration: 1.2
      });
    }
  };

  const currentTileConfig = TILE_LAYERS[mapLayer] || TILE_LAYERS.Satellite;

  return (
    <div className="bg-white dark:bg-[#0c121e] border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900/60 text-emerald-500 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4 fill-emerald-500/20 text-emerald-500" />
          </div>
          <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
            Geographical Risk Assessment
          </h2>
        </div>
        <div className="text-[11px] text-slate-500 dark:text-slate-400">
          Real-time sensor network and AI-derived risk zones
        </div>
      </div>

      {/* Interactive Map Display Container */}
      <div className="relative w-full flex-1 min-h-[380px] sm:min-h-[420px] rounded-xl overflow-hidden border border-slate-200/70 dark:border-slate-800 bg-slate-950 group select-none">
        
        {/* Leaflet Map */}
        <MapContainer
          ref={setMapInstance}
          center={MAP_CENTER}
          zoom={DEFAULT_ZOOM}
          minZoom={10}
          maxZoom={18}
          scrollWheelZoom={false}
          zoomControl={false}
          attributionControl={true}
          className="w-full h-full min-h-[380px] sm:min-h-[420px] z-10"
        >
          <MapResizer />

          {/* Dynamic Real Tile Layer */}
          <TileLayer
            key={mapLayer}
            url={currentTileConfig.url}
            maxZoom={currentTileConfig.maxZoom}
            attribution={currentTileConfig.attribution}
          />
          {currentTileConfig.overlayUrl && (
            <TileLayer
              key={`${mapLayer}-overlay`}
              url={currentTileConfig.overlayUrl}
              maxZoom={currentTileConfig.maxZoom}
            />
          )}

          {/* AI Risk Zones (Toggleable) */}
          {showRiskZones && (
            <>
              {/* 1. High Risk Zone (Red) */}
              <Polygon
                positions={HIGH_RISK_ZONE}
                pathOptions={{
                  color: '#ef4444',
                  fillColor: '#ef4444',
                  fillOpacity: 0.32,
                  weight: 2,
                  dashArray: '5, 5'
                }}
              >
                <Popup className="custom-dark-popup">
                  <div className="p-2 text-xs">
                    <div className="font-bold text-rose-400 flex items-center gap-1 mb-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      High Risk Landslide Zone
                    </div>
                    <div className="text-slate-300 text-[11px] leading-snug">
                      Severe slope steepness (38°–44°), high shear strain, saturated subsoil. Immediate caution advised.
                    </div>
                  </div>
                </Popup>
              </Polygon>

              {/* 2. Watch Zone (Yellow/Amber) */}
              <Polygon
                positions={WATCH_ZONE}
                pathOptions={{
                  color: '#eab308',
                  fillColor: '#eab308',
                  fillOpacity: 0.2,
                  weight: 2,
                  dashArray: '6, 6'
                }}
              >
                <Popup className="custom-dark-popup">
                  <div className="p-2 text-xs">
                    <div className="font-bold text-amber-400 flex items-center gap-1 mb-1">
                      <Compass className="w-3.5 h-3.5" />
                      Watch Zone (Elevated Risk)
                    </div>
                    <div className="text-slate-300 text-[11px] leading-snug">
                      Moderate displacement risk. Active pore pressure accumulation under continuous rainfall.
                    </div>
                  </div>
                </Popup>
              </Polygon>

              {/* 3. Monitoring Boundary (Green) */}
              <Polygon
                positions={MONITORING_BOUNDARY}
                pathOptions={{
                  color: '#10b981',
                  fillColor: '#10b981',
                  fillOpacity: 0.12,
                  weight: 2,
                  dashArray: '6, 6'
                }}
              >
                <Popup className="custom-dark-popup">
                  <div className="p-2 text-xs">
                    <div className="font-bold text-emerald-400 flex items-center gap-1 mb-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Prototype Monitoring Boundary
                    </div>
                    <div className="text-slate-300 text-[11px] leading-snug">
                      Standard surveillance perimeter covering the Kullu–Manali critical highway corridor.
                    </div>
                  </div>
                </Popup>
              </Polygon>
            </>
          )}

          {/* Regional Landmark Labels */}
          {LANDMARKS.map((lm) => (
            <Marker
              key={lm.name}
              position={lm.pos}
              icon={createLandmarkDivIcon(lm.name)}
              interactive={false}
            />
          ))}

          {/* All 8 Interactive Sensor Node Markers */}
          {displayNodes.map((node) => {
            const isOffline = node.status?.toLowerCase() === 'offline' || node.riskLevel === 'offline';
            return (
              <Marker
                key={node.id}
                position={[node.lat, node.lng]}
                icon={createSensorDivIcon(node)}
              >
                <Popup className="custom-dark-popup" minWidth={210}>
                  <div className="p-3 text-white text-xs bg-slate-950/95 rounded-xl border border-white/10 shadow-2xl">
                    <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-white/10">
                      <span className="font-mono font-bold text-white text-xs">{node.id}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        isOffline 
                          ? 'bg-slate-700 text-slate-300'
                          : node.riskScore > 65 
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          : node.riskScore > 35 
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      }`}>
                        {isOffline ? 'Offline' : node.riskLevel || 'Safe'}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-[11px] text-slate-300 mb-3">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Location:</span>
                        <span className="font-medium text-white">{node.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Elevation:</span>
                        <span className="font-mono text-white">{node.elevation}</span>
                      </div>
                      {!isOffline && (
                        <>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Risk Score:</span>
                            <span className="font-mono font-bold text-white">{node.riskScore} / 100</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Soil Moisture:</span>
                            <span className="font-mono text-white">{node.moisture}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Rainfall (24h):</span>
                            <span className="font-mono text-white">{node.rainfall} mm</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Tilt Angle:</span>
                            <span className="font-mono text-white">{node.tilt}°</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Vibration:</span>
                            <span className="font-mono text-white">{node.vibration} g</span>
                          </div>
                        </>
                      )}
                    </div>

                    <Link
                      to={`/sensor-nodes?node=${node.id}`}
                      className="w-full py-1 px-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-[11px] flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <span>View Node Telemetry</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>

        {/* Top-Left: Map Layer Switcher (Map, Satellite, Terrain) */}
        <div className="absolute top-3 left-3 z-[400] flex items-center bg-black/75 dark:bg-black/80 backdrop-blur-md p-1 rounded-lg border border-white/20 shadow-xl">
          {['Map', 'Satellite', 'Terrain'].map((layer) => (
            <button
              key={layer}
              type="button"
              onClick={() => setMapLayer(layer)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
                mapLayer === layer 
                  ? 'bg-white text-slate-900 font-bold shadow-sm' 
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              {layer}
            </button>
          ))}
        </div>

        {/* Top-Right: AI Risk Zones Toggle Button */}
        <div className="absolute top-3 right-3 z-[400] flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowRiskZones((prev) => !prev)}
            className={`p-2 rounded-lg backdrop-blur-md border shadow-xl transition-all cursor-pointer flex items-center justify-center ${
              showRiskZones
                ? 'bg-emerald-600/90 hover:bg-emerald-500 text-white border-emerald-400/50 ring-2 ring-emerald-500/30'
                : 'bg-black/75 hover:bg-black/90 text-white/70 hover:text-white border-white/20'
            }`}
            title={showRiskZones ? 'Hide AI Risk Zones' : 'Show AI Risk Zones'}
            aria-label="Toggle AI Risk Zones"
          >
            <BrainCircuit className="w-4 h-4" />
          </button>
        </div>

        {/* Top-Right Legend Box (Clean Glass Panel below AI button) */}
        <div className="absolute top-[52px] right-3 z-[400] bg-black/75 dark:bg-black/85 backdrop-blur-md border border-white/20 p-2.5 rounded-xl shadow-2xl text-white text-[10.5px] w-[165px] pointer-events-auto">
          {/* Node Status Items */}
          <div className="space-y-1.5 mb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] shadow-xs shrink-0"></span>
              <span className="font-medium text-slate-200">Safe Node</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b] shadow-xs shrink-0"></span>
              <span className="font-medium text-slate-200">Warning Node</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444] shadow-xs shrink-0"></span>
              <span className="font-medium text-slate-200">High Risk Node</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#94a3b8] shadow-xs shrink-0"></span>
              <span className="font-medium text-slate-200">Offline Node</span>
            </div>
          </div>

          <div className="border-t border-white/15 my-1.5" />

          {/* AI Risk Zones Items */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-2.5 rounded-xs border border-dashed border-rose-500 bg-rose-500/30 shrink-0"></span>
              <span className="text-[10px] text-slate-200">High Risk Zone</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-2.5 rounded-xs border border-dashed border-amber-400 bg-amber-400/25 shrink-0"></span>
              <span className="text-[10px] text-slate-200">Watch Zone</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-2.5 rounded-xs border border-dashed border-emerald-400 bg-emerald-400/25 shrink-0"></span>
              <span className="text-[10px] text-slate-200">Monitoring Boundary</span>
            </div>
          </div>
        </div>

        {/* Bottom-Left: Zoom & Recenter Controls + Scale Bar */}
        <div className="absolute bottom-3 left-3 z-[400] flex items-end gap-3 pointer-events-auto">
          <div className="flex flex-col gap-1.5">
            {/* Zoom In & Out */}
            <div className="flex flex-col bg-white dark:bg-slate-900 rounded-lg border border-slate-300 dark:border-white/20 shadow-xl overflow-hidden">
              <button
                type="button"
                onClick={handleZoomIn}
                className="p-1.5 text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer flex items-center justify-center"
                title="Zoom In"
                aria-label="Zoom In"
              >
                <Plus className="w-4 h-4" />
              </button>
              <div className="h-[1px] bg-slate-200 dark:bg-white/15 w-full" />
              <button
                type="button"
                onClick={handleZoomOut}
                className="p-1.5 text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer flex items-center justify-center"
                title="Zoom Out"
                aria-label="Zoom Out"
              >
                <Minus className="w-4 h-4" />
              </button>
            </div>

            {/* Recenter */}
            <button
              type="button"
              onClick={handleRecenter}
              className="p-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-white/20 text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 shadow-xl transition-colors cursor-pointer flex items-center justify-center w-fit"
              title="Recenter to Valley Corridor"
              aria-label="Recenter Map"
            >
              <Crosshair className="w-4 h-4" />
            </button>
          </div>

          {/* Scale Bar */}
          <div className="flex flex-col items-center pb-0.5 select-none pointer-events-none">
            <span className="text-[10px] font-mono font-bold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)] mb-0.5">5 km</span>
            <div className="w-14 h-1 border-b-2 border-l-2 border-r-2 border-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskGeoMapCard;

