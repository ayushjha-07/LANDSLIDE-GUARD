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
  onResetView,
  searchQuery = '',
  onSearchChange,
  onSelectNodeById,
  onSelectPlace
}) => {
  const map = useMap();
  const [localSearch, setLocalSearch] = useState(searchQuery || '');

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
    setLocalSearch('');
  };

  const handleLocateCluster = (e) => {
    e.stopPropagation();
    map.flyTo(CLUSTER_CENTER, CLUSTER_ZOOM, { duration: 1.0 });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = localSearch.trim().toLowerCase();
    if (!query) return;

    if (query.startsWith('node-') || query.startsWith('node')) {
      const num = query.replace('node-', '').replace('node', '').padStart(2, '0');
      const nodeId = `NODE-${num}`;
      if (onSelectNodeById) onSelectNodeById(nodeId);
      return;
    }

    const PLACES = {
      manali: { lat: 32.256, lng: 77.185, zoom: 13 },
      kullu: { lat: 32.186, lng: 77.122, zoom: 13 },
      solang: { lat: 32.226, lng: 77.112, zoom: 13.5 },
      spiti: { lat: 32.246, lng: 77.980, zoom: 11 },
      bhuntar: { lat: 32.148, lng: 77.185, zoom: 13 },
      rohtang: { lat: 32.268, lng: 77.215, zoom: 13.5 },
      hampta: { lat: 32.250, lng: 77.265, zoom: 13.5 }
    };

    for (const [key, val] of Object.entries(PLACES)) {
      if (query.includes(key)) {
        map.flyTo([val.lat, val.lng], val.zoom, { duration: 1.0 });
        if (onSelectPlace) onSelectPlace({ name: key, ...val });
        break;
      }
    }
  };

  return (
    <>
      {/* 1. TOP FLOATING TOOLBAR: Layer Switcher + Search Bar + Filters + Reset View */}
      <div 
        ref={(el) => {
          if (el) {
            L.DomEvent.disableScrollPropagation(el);
          }
        }}
        onMouseDown={(e) => e.stopPropagation()}
        onDoubleClick={(e) => e.stopPropagation()}
        className="absolute top-3 left-3 right-12 z-[1000] !pointer-events-auto select-none flex items-center gap-1.5 flex-nowrap overflow-x-auto no-scrollbar py-0.5"
      >
        {/* Left: Layer Selector Pill Group [Map] [Satellite] [Terrain] */}
        <div className="flex items-center rounded-xl bg-black/80 dark:bg-black/85 border border-white/20 shadow-xl p-0.5 backdrop-blur-md gap-0.5 shrink-0">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onLayerChange('standard');
            }}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              currentLayer === 'standard'
                ? 'bg-white text-slate-900 font-bold shadow-xs'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
            title="Standard OpenStreetMap"
          >
            Map
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onLayerChange('satellite');
            }}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              currentLayer === 'satellite'
                ? 'bg-white text-slate-900 font-bold shadow-xs'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
            title="Himalayan Aerial Satellite"
          >
            Satellite
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onLayerChange('terrain');
            }}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              currentLayer === 'terrain'
                ? 'bg-white text-slate-900 font-bold shadow-xs'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
            title="Topographic Terrain"
          >
            Terrain
          </button>
        </div>

        {/* Center: Search Bar directly inside top bar matching reference */}
        <form onSubmit={handleSearchSubmit} className="relative shrink-0 w-36 sm:w-44 lg:w-48">
          <div className="relative flex items-center">
            <span className="absolute left-2.5 text-slate-400 pointer-events-none text-xs">
              🔍
            </span>
            <input
              type="text"
              value={localSearch}
              onChange={(e) => {
                setLocalSearch(e.target.value);
                if (onSearchChange) onSearchChange(e.target.value);
              }}
              placeholder="Search location or node..."
              className="w-full pl-7 pr-2.5 py-1 rounded-xl bg-black/80 dark:bg-black/85 border border-white/20 text-white text-xs placeholder:text-slate-400 backdrop-blur-md shadow-xl focus:outline-none focus:ring-1 focus:ring-emerald-400"
            />
          </div>
        </form>

        {/* Right: Filter Dropdowns & Reset View */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Node Selector Dropdown */}
          <select
            value={nodeFilter}
            onChange={(e) => onNodeFilterChange && onNodeFilterChange(e.target.value)}
            className="h-[30px] px-2 py-0.5 rounded-xl bg-black/80 dark:bg-black/85 text-white border border-white/20 text-xs font-semibold backdrop-blur-md shadow-xl focus:outline-none focus:ring-1 focus:ring-emerald-400 cursor-pointer"
            aria-label="Filter by Node"
          >
            <option value="all" className="bg-slate-900 text-white">All Nodes</option>
            <option value="NODE-01" className="bg-slate-900 text-white">NODE-01</option>
            <option value="NODE-02" className="bg-slate-900 text-white">NODE-02</option>
            <option value="NODE-03" className="bg-slate-900 text-white">NODE-03</option>
            <option value="NODE-04" className="bg-slate-900 text-white">NODE-04</option>
            <option value="NODE-05" className="bg-slate-900 text-white">NODE-05</option>
            <option value="NODE-06" className="bg-slate-900 text-white">NODE-06</option>
            <option value="NODE-07" className="bg-slate-900 text-white">NODE-07</option>
            <option value="NODE-08" className="bg-slate-900 text-white">NODE-08</option>
          </select>

          {/* Risk Level Dropdown */}
          <select
            value={riskFilter}
            onChange={(e) => onRiskFilterChange && onRiskFilterChange(e.target.value)}
            className="h-[30px] px-2 py-0.5 rounded-xl bg-black/80 dark:bg-black/85 text-white border border-white/20 text-xs font-semibold backdrop-blur-md shadow-xl focus:outline-none focus:ring-1 focus:ring-emerald-400 cursor-pointer"
            aria-label="Filter by Risk Level"
          >
            <option value="all" className="bg-slate-900 text-white">All Risk Levels</option>
            <option value="safe" className="bg-slate-900 text-white">Safe (0–25)</option>
            <option value="warning" className="bg-slate-900 text-white">Warning (&gt;25–50)</option>
            <option value="high-risk" className="bg-slate-900 text-white">High Risk (&gt;50–75)</option>
            <option value="critical" className="bg-slate-900 text-white">Critical (&gt;75–100)</option>
            <option value="unknown" className="bg-slate-900 text-white">Offline</option>
          </select>

          {/* Status Dropdown */}
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange && onStatusFilterChange(e.target.value)}
            className="h-[30px] px-2 py-0.5 rounded-xl bg-black/80 dark:bg-black/85 text-white border border-white/20 text-xs font-semibold backdrop-blur-md shadow-xl focus:outline-none focus:ring-1 focus:ring-emerald-400 cursor-pointer"
            aria-label="Filter by Device Status"
          >
            <option value="all" className="bg-slate-900 text-white">All Status</option>
            <option value="online" className="bg-slate-900 text-white">Online</option>
            <option value="offline" className="bg-slate-900 text-white">Offline</option>
          </select>

          {/* Reset View Button */}
          <button
            type="button"
            onClick={handleReset}
            className="h-[30px] px-2.5 py-0.5 rounded-xl bg-black/80 dark:bg-black/85 hover:bg-black text-white border border-white/20 text-xs font-semibold backdrop-blur-md shadow-xl flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
            title="Reset Map View and Filters"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-300" />
            <span>Reset View</span>
          </button>
        </div>
      </div>

      {/* 2. RIGHT-SIDE VERTICAL CONTROLS (North Indicator + Zoom Controls + Locate Cluster) */}
      <div 
        ref={(el) => { if (el) L.DomEvent.disableScrollPropagation(el); }}
        onMouseDown={(e) => e.stopPropagation()}
        onDoubleClick={(e) => e.stopPropagation()}
        className="absolute top-14 right-3 z-[1000] !pointer-events-auto select-none flex flex-col items-center gap-2"
      >
        {/* North Compass Indicator */}
        <div className="w-8 h-8 rounded-lg bg-white/95 dark:bg-slate-900 border border-slate-300 dark:border-white/20 shadow-xl flex flex-col items-center justify-center text-slate-800 dark:text-white pointer-events-none">
          <div className="w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-b-[6px] border-b-rose-500 mb-0.5" />
          <span className="text-[9px] font-mono font-black leading-none">N</span>
        </div>

        {/* Zoom In & Zoom Out Pill */}
        <div className="flex flex-col rounded-lg bg-white/95 dark:bg-slate-900 border border-slate-300 dark:border-white/20 shadow-xl overflow-hidden divide-y divide-slate-200 dark:divide-slate-800">
          <button
            type="button"
            onClick={handleZoomIn}
            className="w-8 h-8 flex items-center justify-center text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
            title="Zoom In (+)"
            aria-label="Zoom In"
          >
            <Plus className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleZoomOut}
            className="w-8 h-8 flex items-center justify-center text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
            title="Zoom Out (−)"
            aria-label="Zoom Out"
          >
            <Minus className="w-4 h-4" />
          </button>
        </div>

        {/* Locate Cluster */}
        <button
          type="button"
          onClick={handleLocateCluster}
          className="w-8 h-8 rounded-lg bg-white/95 dark:bg-slate-900 border border-slate-300 dark:border-white/20 text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 shadow-xl flex items-center justify-center transition-colors cursor-pointer"
          title="Locate Kullu–Manali Corridor"
          aria-label="Locate Monitoring Cluster"
        >
          <Crosshair className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
        </button>
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
