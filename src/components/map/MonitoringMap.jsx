import React, { useState, useEffect, useRef, useMemo } from 'react';
import { MapContainer, TileLayer, useMap, ScaleControl, Polygon } from 'react-leaflet';
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

// Elongated Himalayan mountain slope landslide hazard zone overlay for Kullu / Beas sector
export const LANDSLIDE_PRONE_ZONE = [
  [32.2580, 77.1700],
  [32.2640, 77.2060],
  [32.2460, 77.2220],
  [32.2300, 77.2000],
  [32.2340, 77.1720]
];

// Helper component to smoothly fly map to selected node or search location without overriding the initial wide view
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

    // Only fly if user explicitly searched or clicked another node
    const nodeChanged = selectedNodeId && selectedNodeId !== prevSelectedNodeId.current;
    const searchChanged = searchTarget && searchTarget !== prevSearchTarget.current;

    if (nodeChanged || searchChanged) {
      prevSelectedNodeId.current = selectedNodeId;
      prevSearchTarget.current = searchTarget;
      if (targetPosition) {
        map.flyTo(targetPosition, targetZoom || 10.5, {
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
  className = ""
}) => {
  const isDashboard = variant === 'dashboard';
  const isAlerts = variant === 'alerts';

  // Default to real high-altitude Himalayan aerial satellite view matching the reference images
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

  // Support canonical alert nodes prioritization
  const displayNodes = useMemo(() => {
    if (isAlerts && nodes.length > 0) {
      const alertNodeIds = ['NODE-05', 'NODE-03', 'NODE-02', 'NODE-07', 'Node 05', 'Node 03', 'Node 02', 'Node 07'];
      const filtered = nodes.filter(n => alertNodeIds.includes(n.id) || alertNodeIds.includes(n.name));
      return filtered.length > 0 ? filtered : nodes;
    }
    return nodes;
  }, [nodes, isAlerts]);

  // Determine initial center and zoom
  const initialCenter = isAlerts ? [32.2417, 77.1892] : HIMACHAL_CENTER;
  const defaultZoom = isAlerts ? 10.6 : (isDashboard ? HIMACHAL_DASHBOARD_ZOOM : HIMACHAL_FULL_ZOOM);
  const containerHeight = height || (isAlerts ? 'h-[360px] sm:h-[440px] lg:h-full lg:min-h-[500px]' : isDashboard ? MAP_CONTAINER_HEIGHTS.dashboard : MAP_CONTAINER_HEIGHTS.full);

  // Determine camera target from either explicit search target or selected node
  const cameraTarget = useMemo(() => {
    if (searchTarget && searchTarget.lat && searchTarget.lng) {
      return [searchTarget.lat, searchTarget.lng];
    }
    if (selectedNode && selectedNode.latitude && selectedNode.longitude) {
      return [selectedNode.latitude, selectedNode.longitude];
    }
    return initialCenter;
  }, [searchTarget, selectedNode, initialCenter]);

  const cameraZoom = useMemo(() => {
    if (searchTarget && searchTarget.zoom) {
      return searchTarget.zoom;
    }
    if (selectedNode) {
      return 11.5;
    }
    return defaultZoom;
  }, [searchTarget, selectedNode, defaultZoom]);

  return (
    <div className={`relative w-full rounded-2xl overflow-hidden border border-stone-800 bg-[#0c1310] shadow-2xl min-w-0 ${className}`}>
      {/* Subtle Natural Atmospheric Haze Overlay (inspired by reference images) */}
      <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-stone-950/25 via-stone-950/10 to-transparent pointer-events-none z-[350]" />

      {/* ALERTS VARIANT GIS OVERLAYS (matching primary reference) */}
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

          {/* Metric Scale Indicator (Full map only) */}
          {!isDashboard && !isAlerts && (
            <ScaleControl position="bottomleft" imperial={false} />
          )}

          {/* Smooth Camera Controller - centers map when a node is selected or searched */}
          <MapCameraController 
            targetPosition={cameraTarget} 
            targetZoom={cameraZoom} 
            selectedNodeId={selectedNode?.id}
            searchTarget={searchTarget}
          />

          {/* Map Controls: Dashboard Mode vs Full GIS Mode (Alerts mode uses streamlined overlays) */}
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
              />
            )
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

          {/* Prototype Risk Influence Zones (Low Opacity) */}
          {showRiskZones && displayNodes.map(node => (
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
              disablePopup={isAlerts}
            />
          ))}
        </MapContainer>
      </div>

    </div>
  );
};

export default MonitoringMap;
