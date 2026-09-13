import React, { useState } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { 
  Plus, 
  Minus, 
  RotateCcw, 
  Crosshair, 
  Layers, 
  Check, 
  Info,
  Map as MapIcon,
  Mountain
} from 'lucide-react';

import { 
  HIMACHAL_CENTER, 
  HIMACHAL_FULL_ZOOM, 
  HIMACHAL_DASHBOARD_ZOOM, 
  CLUSTER_CENTER, 
  CLUSTER_ZOOM,
  MAP_LEGEND_ITEMS,
  MAP_DISCLAIMERS
} from './mapConfig';

export { 
  HIMACHAL_CENTER, 
  HIMACHAL_FULL_ZOOM, 
  HIMACHAL_DASHBOARD_ZOOM, 
  CLUSTER_CENTER, 
  CLUSTER_ZOOM 
};
export const HIMACHAL_ZOOM = HIMACHAL_FULL_ZOOM;

export const MapControls = ({ 
  currentLayer = 'satellite', 
  onLayerChange,
  nodeFilter = 'all',
  onNodeFilterChange,
  riskFilter = 'all',
  onRiskFilterChange,
  statusFilter = 'all',
  onStatusFilterChange,
  onResetView
}) => {
  const map = useMap();

  const handleZoomIn = (e) => {
    e.stopPropagation();
    map.zoomIn();
  };

  const handleZoomOut = (e) => {
    e.stopPropagation();
    map.zoomOut();
  };

  const handleReset = (e) => {
    e.stopPropagation();
    map.closePopup();
    map.flyTo(HIMACHAL_CENTER, HIMACHAL_ZOOM, { duration: 1.0 });
    if (onLayerChange) onLayerChange('satellite');
    if (onResetView) onResetView();
  };

  const handleLocateCluster = (e) => {
    e.stopPropagation();
    map.flyTo(CLUSTER_CENTER, CLUSTER_ZOOM, { duration: 1.0 });
  };

  return (
    <>
      {/* 1. TOP FLOATING TOOLBAR: Layer Toggles + Dropdowns + Reset View */}
      <div 
        ref={(el) => {
          if (el) {
            L.DomEvent.disableScrollPropagation(el);
          }
        }}
        onMouseDown={(e) => e.stopPropagation()}
        onDoubleClick={(e) => e.stopPropagation()}
        className="absolute top-3 left-3 right-3 z-[1000] !pointer-events-auto select-none flex items-center justify-between gap-2 flex-wrap"
      >
        {/* Left: Layer Selector Pill Group [Map] [Terrain] [Satellite] */}
        <div className="flex items-center rounded-xl bg-[#0f172a]/95 dark:bg-[#0b1319]/95 border border-stone-800 shadow-xl p-1 backdrop-blur-md gap-1">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onLayerChange('standard');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              currentLayer === 'standard'
                ? 'bg-[#10b981] text-white shadow-md'
                : 'text-stone-300 hover:text-white hover:bg-white/10'
            }`}
            title="Standard OpenStreetMap (Roads, Rivers & Towns)"
          >
            Map
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onLayerChange('terrain');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              currentLayer === 'terrain'
                ? 'bg-[#10b981] text-white shadow-md'
                : 'text-stone-300 hover:text-white hover:bg-white/10'
            }`}
            title="Topographic Terrain Map (Himachal elevation relief & contours)"
          >
            Terrain
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onLayerChange('satellite');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              currentLayer === 'satellite'
                ? 'bg-[#10b981] text-white shadow-md'
                : 'text-stone-300 hover:text-white hover:bg-white/10'
            }`}
            title="Himalayan Aerial Satellite (80–90° Top-Down Drone/Satellite View)"
          >
            Satellite
          </button>
        </div>

        {/* Right / Center: Filter Dropdowns & Reset View */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Node Selector Dropdown */}
          <select
            value={nodeFilter}
            onChange={(e) => onNodeFilterChange && onNodeFilterChange(e.target.value)}
            className="min-h-[36px] px-3 py-1.5 rounded-xl bg-[#0f172a]/95 dark:bg-[#0b1319]/95 text-stone-200 border border-stone-800 text-xs font-semibold backdrop-blur-md shadow-xl focus:outline-none focus:ring-1 focus:ring-[#10b981] cursor-pointer"
            aria-label="Filter by Node"
          >
            <option value="all">All Nodes</option>
            <option value="NODE-01">NODE-01</option>
            <option value="NODE-02">NODE-02</option>
            <option value="NODE-03">NODE-03</option>
            <option value="NODE-04">NODE-04</option>
            <option value="NODE-05">NODE-05</option>
            <option value="NODE-06">NODE-06</option>
            <option value="NODE-07">NODE-07</option>
            <option value="NODE-08">NODE-08</option>
          </select>

          {/* Risk Level Dropdown */}
          <select
            value={riskFilter}
            onChange={(e) => onRiskFilterChange && onRiskFilterChange(e.target.value)}
            className="min-h-[36px] px-3 py-1.5 rounded-xl bg-[#0f172a]/95 dark:bg-[#0b1319]/95 text-stone-200 border border-stone-800 text-xs font-semibold backdrop-blur-md shadow-xl focus:outline-none focus:ring-1 focus:ring-[#10b981] cursor-pointer"
            aria-label="Filter by Risk Level"
          >
            <option value="all">All Risk Levels</option>
            <option value="safe">Safe (0–25)</option>
            <option value="warning">Warning (&gt;25–50)</option>
            <option value="high-risk">High Risk (&gt;50–75)</option>
            <option value="critical">Critical (&gt;75–100)</option>
            <option value="unknown">Unknown (null / offline)</option>
          </select>

          {/* Status Dropdown */}
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange && onStatusFilterChange(e.target.value)}
            className="min-h-[36px] px-3 py-1.5 rounded-xl bg-[#0f172a]/95 dark:bg-[#0b1319]/95 text-stone-200 border border-stone-800 text-xs font-semibold backdrop-blur-md shadow-xl focus:outline-none focus:ring-1 focus:ring-[#10b981] cursor-pointer"
            aria-label="Filter by Device Status"
          >
            <option value="all">All Status</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </select>

          {/* Reset View Button */}
          <button
            type="button"
            onClick={handleReset}
            className="min-h-[36px] px-3.5 py-1.5 rounded-xl bg-[#0f172a]/95 dark:bg-[#0b1319]/95 hover:bg-stone-800 text-stone-200 border border-stone-800 text-xs font-semibold backdrop-blur-md shadow-xl flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Reset Map View and Filters"
          >
            <RotateCcw className="w-3.5 h-3.5 text-stone-300" />
            <span>Reset View</span>
          </button>
        </div>
      </div>

      {/* 2. TOP-LEFT VERTICAL ZOOM & LOCATE CONTROLS */}
      <div 
        ref={(el) => {
          if (el) {
            L.DomEvent.disableScrollPropagation(el);
          }
        }}
        onMouseDown={(e) => e.stopPropagation()}
        onDoubleClick={(e) => e.stopPropagation()}
        className="absolute bottom-4 right-3 z-[1000] !pointer-events-auto select-none"
      >
        <div className="flex flex-col rounded-xl bg-[#0f172a]/95 dark:bg-[#0b1319]/95 border border-stone-800 shadow-xl overflow-hidden divide-y divide-stone-800 backdrop-blur-md">
          <button
            type="button"
            onClick={handleZoomIn}
            className="w-8 h-8 flex items-center justify-center text-stone-200 hover:text-white hover:bg-white/10 transition-colors"
            title="Zoom In (+)"
            aria-label="Zoom In"
          >
            <Plus className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleZoomOut}
            className="w-8 h-8 flex items-center justify-center text-stone-200 hover:text-white hover:bg-white/10 transition-colors"
            title="Zoom Out (−)"
            aria-label="Zoom Out"
          >
            <Minus className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleLocateCluster}
            className="w-8 h-8 flex items-center justify-center text-[#10b981] hover:text-emerald-300 hover:bg-white/10 transition-colors"
            title="Locate Kullu–Manali Corridor"
            aria-label="Locate Monitoring Cluster"
          >
            <Crosshair className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </>
  );
};

/**
 * Streamlined controls for the Dashboard version of MonitoringMap
 * Displays compact layer switch, prototype disclaimer, compact legend, and corner zoom buttons.
 */
export const DashboardMapControls = ({ 
  currentLayer = 'satellite', 
  onLayerChange,
  nodeFilter = 'all',
  onNodeFilterChange,
  onResetView 
}) => {
  const map = useMap();

  const handleZoomIn = (e) => {
    e.stopPropagation();
    map.zoomIn();
  };

  const handleZoomOut = (e) => {
    e.stopPropagation();
    map.zoomOut();
  };

  const handleReset = (e) => {
    e.stopPropagation();
    map.flyTo(HIMACHAL_CENTER, HIMACHAL_DASHBOARD_ZOOM, { duration: 1.0 });
    if (onLayerChange) onLayerChange('satellite');
    if (onResetView) onResetView();
  };

  return (
    <>
      {/* 1. TOP-LEFT: Layer Toggles, Station Quick Selector & Prototype Disclaimer */}
      <div 
        ref={(el) => {
          if (el) {
            L.DomEvent.disableScrollPropagation(el);
          }
        }}
        onMouseDown={(e) => e.stopPropagation()}
        onDoubleClick={(e) => e.stopPropagation()}
        className="absolute top-3 left-3 right-3 z-[1000] !pointer-events-auto select-none flex items-center justify-between gap-2 flex-wrap"
      >
        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Basemap 3-Way Toggle [Map] [Terrain] [Satellite] */}
          <div className="flex items-center rounded-xl bg-[#0f172a]/95 border border-stone-800 shadow-lg p-0.5 backdrop-blur-md gap-0.5">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (onLayerChange) onLayerChange('standard');
              }}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                currentLayer === 'standard'
                  ? 'bg-[#10b981] text-white shadow-xs'
                  : 'text-stone-300 hover:text-white hover:bg-white/10'
              }`}
              title="Standard OpenStreetMap (Roads, Rivers & Towns)"
            >
              Map
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (onLayerChange) onLayerChange('terrain');
              }}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                currentLayer === 'terrain'
                  ? 'bg-[#10b981] text-white shadow-xs'
                  : 'text-stone-300 hover:text-white hover:bg-white/10'
              }`}
              title="Topographic Terrain (Himachal Contours & Shading)"
            >
              Terrain
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (onLayerChange) onLayerChange('satellite');
              }}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                currentLayer === 'satellite'
                  ? 'bg-[#10b981] text-white shadow-xs'
                  : 'text-stone-300 hover:text-white hover:bg-white/10'
              }`}
              title="Himalayan Aerial Satellite (80–90° Top-Down Drone/Satellite View)"
            >
              Satellite
            </button>
          </div>

          {/* Quick Station Dropdown */}
          {onNodeFilterChange && (
            <select
              value={nodeFilter}
              onChange={(e) => {
                e.stopPropagation();
                onNodeFilterChange(e.target.value);
              }}
              className="px-2 py-1 rounded-lg bg-[#0f172a]/95 text-stone-200 border border-stone-800 text-[11px] font-semibold backdrop-blur-md shadow-xs focus:outline-none focus:ring-1 focus:ring-[#10b981] cursor-pointer"
              aria-label="Select Node"
            >
              <option value="all">All Nodes</option>
              <option value="NODE-01">NODE-01 (Safe)</option>
              <option value="NODE-02">NODE-02 (Safe)</option>
              <option value="NODE-03">NODE-03 (Warning)</option>
              <option value="NODE-04">NODE-04 (Safe)</option>
              <option value="NODE-05">NODE-05 (High Risk) ★</option>
              <option value="NODE-06">NODE-06 (Offline)</option>
              <option value="NODE-07">NODE-07 (Safe)</option>
              <option value="NODE-08">NODE-08 (Safe)</option>
            </select>
          )}
        </div>

        {/* Prototype disclaimer pill with full text on hover */}
        <div 
          className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md border border-stone-800 text-[10px] font-medium text-amber-300/90 shadow-xs cursor-help"
          title={MAP_DISCLAIMERS.dashboard}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
          <span>Simulated Prototype Sensors</span>
        </div>
      </div>

      {/* 2. BOTTOM-LEFT: Compact Legend */}
      <div 
        ref={(el) => {
          if (el) {
            L.DomEvent.disableScrollPropagation(el);
          }
        }}
        onMouseDown={(e) => e.stopPropagation()}
        className="absolute bottom-3 left-3 z-[1000] !pointer-events-auto select-none"
      >
        <div className="flex items-center gap-2.5 sm:gap-3 px-2.5 sm:px-3 py-1.5 rounded-xl bg-[#0f172a]/95 border border-stone-800 shadow-xl backdrop-blur-md text-[11px]">
          {MAP_LEGEND_ITEMS.map(item => (
            <div key={item.label} className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${item.bgClass}`} />
              <span className="text-stone-300 font-medium text-[11px]">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. BOTTOM-RIGHT: Compact Zoom & Reset Controls */}
      <div 
        ref={(el) => {
          if (el) {
            L.DomEvent.disableScrollPropagation(el);
          }
        }}
        onMouseDown={(e) => e.stopPropagation()}
        className="absolute bottom-3 right-3 z-[1000] !pointer-events-auto select-none"
      >
        <div className="flex flex-col rounded-xl bg-[#0f172a]/95 border border-stone-800 shadow-xl overflow-hidden divide-y divide-stone-800 backdrop-blur-md">
          <button
            type="button"
            onClick={handleZoomIn}
            className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-stone-200 hover:text-white hover:bg-white/10 transition-colors"
            title="Zoom In (+)"
            aria-label="Zoom In"
          >
            <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          <button
            type="button"
            onClick={handleZoomOut}
            className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-stone-200 hover:text-white hover:bg-white/10 transition-colors"
            title="Zoom Out (−)"
            aria-label="Zoom Out"
          >
            <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-[#10b981] hover:text-emerald-300 hover:bg-white/10 transition-colors"
            title="Reset Map View"
            aria-label="Reset View"
          >
            <RotateCcw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </button>
        </div>
      </div>
    </>
  );
};

export default MapControls;
