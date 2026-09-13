import React, { useState, useEffect, useRef, useMemo } from 'react';
import { MapContainer, TileLayer, useMap, ScaleControl } from 'react-leaflet';
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
import { AlertTriangle } from 'lucide-react';

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
  variant = 'full', // 'full' | 'dashboard'
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

  // Support controlled or uncontrolled layer state
  const [internalLayer, setInternalLayer] = useState('terrain');
  const currentLayer = layer !== null && layer !== undefined ? layer : internalLayer;
  const [hasTileError, setHasTileError] = useState(false);

  const handleLayerChange = (newLayer) => {
    setInternalLayer(newLayer);
    if (onLayerChange) onLayerChange(newLayer);
    setHasTileError(false);
  };

  // Real geographic tile layer configuration from centralized mapConfig
  const tileConfig = useMemo(() => {
    return MAP_TILE_PROVIDERS[currentLayer] || MAP_TILE_PROVIDERS.terrain;
  }, [currentLayer]);

  // Determine initial center and zoom
  const defaultZoom = isDashboard ? HIMACHAL_DASHBOARD_ZOOM : HIMACHAL_FULL_ZOOM;
  const containerHeight = height || (isDashboard ? MAP_CONTAINER_HEIGHTS.dashboard : MAP_CONTAINER_HEIGHTS.full);

  // Determine camera target from either explicit search target or selected node
  const cameraTarget = useMemo(() => {
    if (searchTarget && searchTarget.lat && searchTarget.lng) {
      return [searchTarget.lat, searchTarget.lng];
    }
    if (selectedNode && selectedNode.latitude && selectedNode.longitude) {
      return [selectedNode.latitude, selectedNode.longitude];
    }
    return HIMACHAL_CENTER;
  }, [searchTarget, selectedNode]);

  const cameraZoom = useMemo(() => {
    if (searchTarget && searchTarget.zoom) {
      return searchTarget.zoom;
    }
    if (selectedNode) {
      return 11.5;
    }
    return HIMACHAL_FULL_ZOOM;
  }, [searchTarget, selectedNode]);

  return (
    <div className={`relative w-full rounded-2xl overflow-hidden border border-stone-800 bg-[#0c1310] shadow-2xl min-w-0 ${className}`}>
      
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
          center={HIMACHAL_CENTER}
          zoom={defaultZoom}
          minZoom={7}
          maxZoom={18}
          scrollWheelZoom={false}
          className="w-full h-full z-10"
          zoomControl={false} // Managed via custom Controls
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
            <TileLayer
              key="hybrid-overlay"
              url={tileConfig.overlayUrl}
              maxZoom={18}
            />
          )}

          {/* Metric Scale Indicator (Full map only) */}
          {!isDashboard && (
            <ScaleControl position="bottomleft" imperial={false} />
          )}

          {/* Smooth Camera Controller (Full map search/node fly-to) */}
          {!isDashboard && (
            <MapCameraController 
              targetPosition={cameraTarget} 
              targetZoom={cameraZoom} 
              selectedNodeId={selectedNode?.id}
              searchTarget={searchTarget}
            />
          )}

          {/* Map Controls: Dashboard Mode vs Full GIS Mode */}
          {isDashboard ? (
            <DashboardMapControls 
              currentLayer={currentLayer}
              onLayerChange={handleLayerChange}
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
          )}

          {/* Prototype Risk Influence Zones (Low Opacity) */}
          {showRiskZones && nodes.map(node => (
            <RiskZone key={`risk-zone-${node.id}`} node={node} />
          ))}

          {/* 8 Sensor Nodes with Custom DivIcon and Popups */}
          {nodes.map(node => (
            <SensorMarker
              key={`sensor-node-${node.id}`}
              node={node}
              isSelected={selectedNode?.id === node.id}
              onSelect={onSelectNode}
              popupVariant={isDashboard ? 'compact' : 'detailed'}
            />
          ))}
        </MapContainer>
      </div>

    </div>
  );
};

export default MonitoringMap;
