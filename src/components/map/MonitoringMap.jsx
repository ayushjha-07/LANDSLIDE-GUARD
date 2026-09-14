import React, { useState, useEffect, useRef, useMemo } from 'react';
import { MapContainer, TileLayer, useMap, ScaleControl, Polygon, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import SensorMarker from './SensorMarker';
import RiskZone from './RiskZone';
import { 
  HIMACHAL_CENTER, 
  HIMACHAL_FULL_ZOOM, 
  HIMACHAL_DASHBOARD_ZOOM, 
  MAP_TILE_PROVIDERS,
  MAP_CONTAINER_HEIGHTS,
  MAP_DISCLAIMERS
} from './mapConfig';
import MapControls, { DashboardMapControls } from './MapControls';
import { AlertTriangle, Compass, CloudRain } from 'lucide-react';

// Exact canonical map coordinates matching Reference Image 1
export const CANONICAL_MAP_COORDS = {
  'NODE-01': [32.258, 77.170],
  'NODE-02': [32.242, 77.145],
  'NODE-03': [32.246, 77.215],
  'NODE-04': [32.230, 77.248],
  'NODE-05': [32.228, 77.185],
  'NODE-06': [32.195, 77.185],
  'NODE-07': [32.198, 77.140],
  'NODE-08': [32.196, 77.230]
};

// 1. High Risk Zone (Red Dashed - Central Corridor around NODE-05)
export const HIGH_RISK_ZONE = [
  [32.240, 77.170],
  [32.244, 77.195],
  [32.235, 77.215],
  [32.218, 77.205],
  [32.212, 77.175],
  [32.220, 77.155],
  [32.234, 77.155]
];

// 2. Watch Zone (Yellow Dashed - Intermediate Slope Zone around NODE-03 and NODE-05)
export const WATCH_ZONE = [
  [32.256, 77.165],
  [32.262, 77.195],
  [32.254, 77.235],
  [32.225, 77.240],
  [32.205, 77.218],
  [32.198, 77.175],
  [32.206, 77.142],
  [32.235, 77.132],
  [32.250, 77.145]
];

// 3. Monitoring Boundary (Green Dashed - Outer Valley Perimeter enclosing all 8 nodes)
export const MONITORING_BOUNDARY = [
  [32.274, 77.155],
  [32.282, 77.205],
  [32.268, 77.260],
  [32.240, 77.275],
  [32.205, 77.268],
  [32.170, 77.245],
  [32.165, 77.175],
  [32.172, 77.125],
  [32.215, 77.110],
  [32.255, 77.120]
];

// Regional Landmark labels directly rendered on terrain matching Reference Image 1
export const TERRAIN_LANDMARKS = [
  { name: 'Rohtang Pass', elev: '3,978 m', pos: [32.268, 77.215], type: 'pass' },
  { name: 'Hampta Pass', elev: '4,270 m', pos: [32.250, 77.265], type: 'pass' },
  { name: 'Manali', pos: [32.256, 77.185], type: 'town' },
  { name: 'Solang Valley', pos: [32.226, 77.112], type: 'town' },
  { name: 'Kullu', pos: [32.186, 77.122], type: 'town' },
  { name: 'Bhuntar', pos: [32.148, 77.185], type: 'town' },
  { name: 'Beas River', pos: [32.242, 77.135], type: 'river' }
];

// Historical Landslide warning spots matching Reference Image 1
export const LANDSLIDE_HAZARDS = [
  [32.252, 77.200],
  [32.242, 77.255],
  [32.236, 77.160],
  [32.220, 77.155],
  [32.224, 77.228],
  [32.180, 77.185]
];

function createLandmarkIcon(landmark) {
  if (landmark.type === 'pass') {
    return L.divIcon({
      html: `<div class="text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] whitespace-nowrap pointer-events-none select-none">
        <div class="text-white font-bold text-[11px] leading-tight flex items-center gap-1 justify-center">
          <span class="text-xs">⛰</span> <span>${landmark.name}</span>
        </div>
        <div class="text-slate-200 text-[9.5px] font-mono leading-tight">⛰ ${landmark.elev}</div>
      </div>`,
      className: 'custom-map-landmark',
      iconSize: [110, 24],
      iconAnchor: [55, 12]
    });
  }
  if (landmark.type === 'river') {
    return L.divIcon({
      html: `<div class="text-cyan-300 font-bold italic text-xs tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] whitespace-nowrap pointer-events-none select-none -rotate-12">${landmark.name}</div>`,
      className: 'custom-map-landmark',
      iconSize: [80, 20],
      iconAnchor: [40, 10]
    });
  }
  return L.divIcon({
    html: `<div class="text-white font-black text-xs sm:text-sm tracking-wider drop-shadow-[0_2px_5px_rgba(0,0,0,0.95)] whitespace-nowrap pointer-events-none select-none">${landmark.name}</div>`,
    className: 'custom-map-landmark',
    iconSize: [90, 20],
    iconAnchor: [45, 10]
  });
}

function createHazardIcon() {
  return L.divIcon({
    html: `<div class="w-4 h-4 flex items-center justify-center text-xs drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] select-none pointer-events-none">⚠️</div>`,
    className: 'custom-map-hazard',
    iconSize: [16, 16],
    iconAnchor: [8, 8]
  });
}

// Elongated Himalayan mountain slope landslide hazard zone overlay for Kullu / Beas sector (Alerts mode)
export const LANDSLIDE_PRONE_ZONE = [
  [32.2580, 77.1700],
  [32.2640, 77.2060],
  [32.2460, 77.2220],
  [32.2300, 77.2000],
  [32.2340, 77.1720]
];

// Helper component to smoothly fly map to selected node or search location without overriding initial wide view
function MapCameraController({ targetPosition, targetZoom, selectedNodeId, searchTarget }) {
  const map = useMap();
  const isFirstRender = useRef(true);
  const prevSelectedNodeId = useRef(selectedNodeId);
  const prevSearchTarget = useRef(searchTarget);

  useEffect(() => {
    // Keep initial mount at wide regional view
    if (isFirstRender.current) {
      isFirstRender.current = false;
      prevSelectedNodeId.current = selectedNodeId;
      prevSearchTarget.current = searchTarget;
      return;
    }

    // Fly if user searched, selected a node, or selected All Nodes / reset
    const nodeChanged = selectedNodeId !== prevSelectedNodeId.current;
    const searchChanged = searchTarget !== prevSearchTarget.current;

    if (nodeChanged || searchChanged) {
      prevSelectedNodeId.current = selectedNodeId;
      prevSearchTarget.current = searchTarget;
      if (targetPosition) {
        map.flyTo(targetPosition, targetZoom || 12.1, {
          duration: 1.0
        });
      }
    }
  }, [targetPosition, targetZoom, selectedNodeId, searchTarget, map]);

  return null;
}

export const MonitoringMap = ({
  variant = 'full', // 'full' | 'dashboard' | 'alerts'
  nodes = [],
  selectedNode = null,
  onSelectNode = null,
  showRiskZones = true,
  searchTarget = null,
  layer = null,
  onLayerChange = null,
  nodeFilter = 'all',
  onNodeFilterChange = null,
  riskFilter = 'all',
  onRiskFilterChange = null,
  statusFilter = 'all',
  onStatusFilterChange = null,
  onResetView = null,
  height = null,
  className = "",
  searchQuery = '',
  onSearchChange = null,
  onSelectPlace = null,
  onSelectNodeById = null
}) => {
  const isDashboard = variant === 'dashboard';
  const isAlerts = variant === 'alerts';

  // Default to real high-altitude Himalayan aerial satellite view matching Reference Image 1
  const [internalLayer, setInternalLayer] = useState('satellite');
  const currentLayer = layer !== null && layer !== undefined ? layer : internalLayer;
  const [hasTileError, setHasTileError] = useState(false);

  const handleLayerChange = (newLayer) => {
    setInternalLayer(newLayer);
    if (onLayerChange) onLayerChange(newLayer);
    setHasTileError(false);
  };

  // Real geographic tile layer configuration from centralized mapConfig
  const tileConfig = useMemo(() => {
    return MAP_TILE_PROVIDERS[currentLayer] || MAP_TILE_PROVIDERS.satellite;
  }, [currentLayer]);

  // Support canonical coordinates for all nodes to guarantee exact alignment with Reference Image 1
  const displayNodes = useMemo(() => {
    const list = isAlerts && nodes.length > 0
      ? (() => {
          const alertNodeIds = ['NODE-05', 'NODE-03', 'NODE-02', 'NODE-07', 'Node 05', 'Node 03', 'Node 02', 'Node 07'];
          const filtered = nodes.filter(n => alertNodeIds.includes(n.id) || alertNodeIds.includes(n.name));
          return filtered.length > 0 ? filtered : nodes;
        })()
      : nodes;

    return list.map(node => {
      const canonicalCoord = CANONICAL_MAP_COORDS[node.id];
      if (canonicalCoord) {
        return {
          ...node,
          latitude: canonicalCoord[0],
          longitude: canonicalCoord[1],
          location: {
            ...node.location,
            latitude: canonicalCoord[0],
            longitude: canonicalCoord[1]
          }
        };
      }
      return node;
    });
  }, [nodes, isAlerts]);

  // Determine initial center and zoom
  const initialCenter = isAlerts ? [32.2417, 77.1892] : [32.225, 77.185];
  const defaultZoom = isAlerts ? 10.6 : (isDashboard ? HIMACHAL_DASHBOARD_ZOOM : 12.1);
  const containerHeight = height || (isAlerts ? 'h-[360px] sm:h-[440px] lg:h-full lg:min-h-[500px]' : isDashboard ? MAP_CONTAINER_HEIGHTS.dashboard : 'h-[620px] sm:h-[680px] lg:h-[720px]');

  // Determine camera target from either explicit search target or selected node
  const cameraTarget = useMemo(() => {
    if (searchTarget && searchTarget.lat && searchTarget.lng) {
      return [searchTarget.lat, searchTarget.lng];
    }
    const nodeLat = selectedNode?.latitude ?? selectedNode?.location?.latitude;
    const nodeLng = selectedNode?.longitude ?? selectedNode?.location?.longitude;
    if (nodeLat && nodeLng) {
      return [nodeLat, nodeLng];
    }
    return initialCenter;
  }, [searchTarget, selectedNode, initialCenter]);

  const cameraZoom = useMemo(() => {
    if (searchTarget && searchTarget.zoom) {
      return searchTarget.zoom;
    }
    if (selectedNode) {
      return 12.5;
    }
    return defaultZoom;
  }, [searchTarget, selectedNode, defaultZoom]);

  return (
    <div className={`relative w-full rounded-2xl overflow-hidden border border-stone-800 bg-[#0c1310] shadow-2xl min-w-0 ${className}`}>
      {/* Subtle Natural Atmospheric Haze Overlay */}
      <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-stone-950/25 via-stone-950/10 to-transparent pointer-events-none z-[350]" />

      {/* 1. LEFT-SIDE FLOATING LEGEND (matching Reference Image 1) */}
      {!isDashboard && !isAlerts && (
        <div 
          ref={(el) => { if (el) L.DomEvent.disableScrollPropagation(el); }}
          onMouseDown={(e) => e.stopPropagation()}
          className="absolute top-16 left-3 z-[1000] !pointer-events-auto select-none p-3 rounded-xl bg-black/85 backdrop-blur-md border border-white/20 shadow-2xl text-xs space-y-2 text-stone-200"
        >
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] shadow-xs flex-shrink-0" />
            <span className="text-stone-100 text-[11px] font-medium">Safe Node</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b] shadow-xs flex-shrink-0" />
            <span className="text-stone-100 text-[11px] font-medium">Warning Node</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444] shadow-xs flex-shrink-0" />
            <span className="text-stone-100 text-[11px] font-medium">High Risk Node</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#94a3b8] shadow-xs flex-shrink-0" />
            <span className="text-stone-100 text-[11px] font-medium">Offline Node</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3 rounded-xs border border-dashed border-[#10b981] bg-[#10b981]/30 flex-shrink-0" />
            <span className="text-stone-100 text-[11px] font-medium">Monitoring Boundary</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3 rounded-xs border border-dashed border-[#eab308] bg-[#eab308]/30 flex-shrink-0" />
            <span className="text-stone-100 text-[11px] font-medium">Watch Zone</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3 rounded-xs border border-dashed border-[#ef4444] bg-[#ef4444]/40 flex-shrink-0" />
            <span className="text-stone-100 text-[11px] font-medium">High Risk Zone</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 flex items-center justify-center text-xs font-bold text-amber-400 flex-shrink-0">⚠️</span>
            <span className="text-stone-100 text-[11px] font-medium">Landslide History</span>
          </div>
        </div>
      )}

      {/* 2. BOTTOM-LEFT 5 KM SCALE INDICATOR (matching Reference Image 1) */}
      {!isDashboard && !isAlerts && (
        <div className="absolute bottom-3 left-4 z-[999] pointer-events-none select-none flex flex-col items-start text-white drop-shadow-md">
          <span className="text-[10px] font-mono font-bold leading-none mb-1">5 km</span>
          <div className="relative w-16 h-1 border-b-2 border-l-2 border-r-2 border-white" />
        </div>
      )}

      {/* 3. BOTTOM-RIGHT OPENSTREETMAP ATTRIBUTION (matching Reference Image 1) */}
      {!isDashboard && !isAlerts && (
        <div className="absolute bottom-2.5 right-4 z-[999] pointer-events-none select-none text-[10.5px] text-white/70 drop-shadow-md font-sans">
          © OpenStreetMap contributors
        </div>
      )}

      {/* ALERTS VARIANT GIS OVERLAYS */}
      {isAlerts && (
        <>
          {/* Top-Left Location Indicator */}
          <div className="absolute top-3 left-3 z-[400] px-3 py-2 rounded-xl bg-black/75 backdrop-blur-md border border-white/10 text-white shadow-lg pointer-events-none">
            <div className="font-bold text-xs tracking-wide">Kullu</div>
            <div className="text-[10px] text-stone-300">Himachal Pradesh</div>
          </div>

          {/* Top-Right Risk & Sensor Legend */}
          <div className="absolute top-3 right-3 z-[400] px-3 py-2.5 rounded-xl bg-black/75 backdrop-blur-md border border-white/10 text-white shadow-lg space-y-1.5 pointer-events-none text-[10px]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-sm flex-shrink-0" />
              <span className="text-stone-200">High Risk Zone</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-sm flex-shrink-0" />
              <span className="text-stone-200">Moderate Risk Zone</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm flex-shrink-0" />
              <span className="text-stone-200">Sensor Node</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-0 border-t-2 border-dashed border-red-500 flex-shrink-0" />
              <span className="text-stone-200">Landslide Prone Area</span>
            </div>
          </div>

          {/* Bottom-Left Compass & Scale Indicator */}
          <div className="absolute bottom-3 left-3 z-[400] flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-black/75 backdrop-blur-md border border-white/10 text-white shadow-lg pointer-events-none text-[10px]">
            <div className="flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-white" />
              <span className="font-bold font-mono">N</span>
            </div>
            <div className="h-3 w-px bg-white/20" />
            <div className="flex items-center gap-1.5 font-mono text-[9px] text-stone-300">
              <span>0</span>
              <div className="w-8 h-1 bg-white/80 rounded-xs" />
              <span>1 km</span>
            </div>
          </div>

          {/* Bottom-Right Live Environmental Condition Tag */}
          <div className="absolute bottom-3 right-3 z-[400] flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/75 backdrop-blur-md border border-white/10 text-white shadow-lg pointer-events-none text-xs">
            <CloudRain className="w-4 h-4 text-sky-400 flex-shrink-0" />
            <div>
              <strong className="text-xs font-mono text-white">21°C</strong>
              <span className="text-[10px] text-stone-300 ml-1">Light Rain</span>
            </div>
          </div>
        </>
      )}
      
      {/* TILE ERROR / OFFLINE FALLBACK BANNER */}
      {hasTileError && (
        <div className="absolute inset-x-4 top-16 z-[1000] p-3 rounded-xl bg-amber-500/90 text-white backdrop-blur-md shadow-lg flex items-center justify-between text-xs gap-3 pointer-events-auto">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            <span>
              <strong>Map tiles fallback active:</strong> Switched to backup standard basemap.
            </span>
          </div>
          <button
            type="button"
            onClick={() => setHasTileError(false)}
            className="px-2 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-white text-[11px] font-bold"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Empty State Overlay when filters match 0 nodes */}
      {nodes.length === 0 && (
        <div className="absolute inset-x-4 top-20 z-[999] flex justify-center pointer-events-none">
          <div className="p-3.5 sm:p-4 rounded-xl bg-[#0f172a]/95 text-stone-200 border border-stone-800 shadow-2xl backdrop-blur-md flex items-center gap-3 pointer-events-auto max-w-md">
            <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />
            <div className="text-left text-xs">
              <p className="font-semibold text-stone-100">No sensor stations match current filters</p>
              <p className="text-stone-400 mt-0.5">Try changing risk or status filters, or click Reset View to restore all stations.</p>
            </div>
            {onResetView && (
              <button
                type="button"
                onClick={onResetView}
                className="ml-auto px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      )}

      {/* Leaflet MapContainer */}
      <div className={`w-full ${containerHeight}`}>
        <MapContainer
          center={initialCenter}
          zoom={defaultZoom}
          minZoom={7}
          maxZoom={18}
          scrollWheelZoom={false}
          className="w-full h-full z-10"
          zoomControl={false} // Managed via custom Controls
          attributionControl={false}
        >
          {/* Active Basemap Tile Layer */}
          <TileLayer
            key={`${tileConfig.url}-${currentLayer}`}
            url={tileConfig.url}
            subdomains={tileConfig.subdomains || 'abc'}
            maxZoom={tileConfig.maxZoom}
            attribution={tileConfig.attribution}
            eventHandlers={{
              tileerror: () => {
                if (currentLayer !== 'standard') {
                  handleLayerChange('standard');
                  setHasTileError(true);
                }
              }
            }}
          />

          {/* Place Names, Roads & Administrative Boundaries Overlay */}
          {tileConfig.hasOverlay && (
            <>
              <TileLayer
                key="hybrid-overlay"
                url={tileConfig.overlayUrl}
                maxZoom={18}
              />
              {tileConfig.transportUrl && (
                <TileLayer
                  key="transport-overlay"
                  url={tileConfig.transportUrl}
                  maxZoom={18}
                />
              )}
            </>
          )}

          {/* Smooth Camera Controller - centers map when a node is selected or searched */}
          <MapCameraController 
            targetPosition={cameraTarget} 
            targetZoom={cameraZoom} 
            selectedNodeId={selectedNode?.id}
            searchTarget={searchTarget}
          />

          {/* Map Controls: Dashboard Mode vs Full GIS Mode */}
          {!isAlerts && (
            isDashboard ? (
              <DashboardMapControls 
                currentLayer={currentLayer}
                onLayerChange={handleLayerChange}
                nodeFilter={selectedNode?.id || nodeFilter || 'all'}
                onNodeFilterChange={(val) => {
                  if (onNodeFilterChange) onNodeFilterChange(val);
                  if (val === 'all') {
                    if (onSelectNode) onSelectNode(null);
                  } else {
                    const target = nodes.find(n => n.id === val);
                    if (target && onSelectNode) onSelectNode(target);
                  }
                }}
                onResetView={onResetView}
              />
            ) : (
              <MapControls 
                currentLayer={currentLayer}
                onLayerChange={handleLayerChange}
                nodeFilter={nodeFilter}
                onNodeFilterChange={onNodeFilterChange}
                riskFilter={riskFilter}
                onRiskFilterChange={onRiskFilterChange}
                statusFilter={statusFilter}
                onStatusFilterChange={onStatusFilterChange}
                onResetView={onResetView}
                searchQuery={searchQuery}
                onSearchChange={onSearchChange}
                onSelectPlace={onSelectPlace}
                onSelectNodeById={onSelectNodeById}
              />
            )
          )}

          {/* 3 CONCENTRIC AI RISK ZONES (Full Map GIS Mode) */}
          {!isAlerts && !isDashboard && (
            <>
              {/* Outer Monitoring Boundary (Green Dashed) */}
              <Polygon
                positions={MONITORING_BOUNDARY}
                pathOptions={{
                  color: '#10b981',
                  fillColor: '#10b981',
                  fillOpacity: 0.12,
                  weight: 1.5,
                  dashArray: '6 6'
                }}
              />

              {/* Middle Watch Zone (Yellow Dashed) */}
              <Polygon
                positions={WATCH_ZONE}
                pathOptions={{
                  color: '#eab308',
                  fillColor: '#eab308',
                  fillOpacity: 0.22,
                  weight: 1.5,
                  dashArray: '6 6'
                }}
              />

              {/* Inner High Risk Zone (Red Dashed) */}
              <Polygon
                positions={HIGH_RISK_ZONE}
                pathOptions={{
                  color: '#ef4444',
                  fillColor: '#ef4444',
                  fillOpacity: 0.35,
                  weight: 2,
                  dashArray: '6 6'
                }}
              />

              {/* Terrain Landmarks (Rohtang, Hampta, Manali, etc.) */}
              {TERRAIN_LANDMARKS.map(landmark => (
                <Marker
                  key={landmark.name}
                  position={landmark.pos}
                  icon={createLandmarkIcon(landmark)}
                  interactive={false}
                />
              ))}

              {/* Landslide History Warning Spots */}
              {LANDSLIDE_HAZARDS.map((pos, idx) => (
                <Marker
                  key={`hazard-${idx}`}
                  position={pos}
                  icon={createHazardIcon()}
                  interactive={false}
                />
              ))}
            </>
          )}

          {/* Landslide Prone Hazard Area Polygon (Alerts mode) */}
          {isAlerts && (
            <Polygon
              positions={LANDSLIDE_PRONE_ZONE}
              pathOptions={{
                color: '#ef4444',
                fillColor: '#ef4444',
                fillOpacity: 0.32,
                weight: 2,
                dashArray: '6 4'
              }}
            />
          )}

          {/* Fallback prototype Risk Influence Zones if on Dashboard */}
          {isDashboard && showRiskZones && displayNodes.map(node => (
            <RiskZone key={`risk-zone-${node.id}`} node={node} />
          ))}

          {/* Sensor Nodes with Custom DivIcon and Popups */}
          {displayNodes.map(node => (
            <SensorMarker
              key={`sensor-node-${node.id}`}
              node={node}
              isSelected={selectedNode?.id === node.id}
              onSelect={onSelectNode}
              popupVariant={isDashboard || isAlerts ? 'compact' : 'detailed'}
              disablePopup={!isDashboard}
            />
          ))}
        </MapContainer>
      </div>

    </div>
  );
};

export default MonitoringMap;
