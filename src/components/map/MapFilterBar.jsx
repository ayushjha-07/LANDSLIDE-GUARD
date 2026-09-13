import React, { useState } from 'react';
import { Search, X, RotateCcw, ShieldAlert, MapPin, Navigation } from 'lucide-react';

export const HIMACHAL_PLACES = [
  { name: 'Manali', lat: 32.2396, lng: 77.1887, type: 'Town / Beas Valley' },
  { name: 'Kullu', lat: 31.9579, lng: 77.1095, type: 'District Center' },
  { name: 'Shimla', lat: 31.1048, lng: 77.1734, type: 'State Capital' },
  { name: 'Mandi', lat: 31.7087, lng: 76.9320, type: 'Beas Valley Town' },
  { name: 'Dharamshala', lat: 32.2190, lng: 76.3234, type: 'Kangra / Dhauladhar' },
  { name: 'Kangra', lat: 32.0998, lng: 76.2691, type: 'Valley Town' },
  { name: 'Chamba', lat: 32.5534, lng: 76.1258, type: 'Ravi River Valley' },
  { name: 'Kaza', lat: 32.2276, lng: 78.0520, type: 'Spiti Sub-division' },
  { name: 'Spiti', lat: 32.2460, lng: 78.0340, type: 'Valley Region' },
  { name: 'Lahaul', lat: 32.5710, lng: 76.9780, type: 'Valley Region' },
  { name: 'Keylong', lat: 32.5710, lng: 76.9780, type: 'Lahaul District Center' },
  { name: 'Reckong Peo', lat: 31.5407, lng: 78.2778, type: 'Kinnaur Center' },
  { name: 'Kalpa', lat: 31.5369, lng: 78.2562, type: 'Kinnaur Ridge' },
  { name: 'Solan', lat: 30.9084, lng: 77.0999, type: 'Mid-Himalayas' },
  { name: 'Bilaspur', lat: 31.3260, lng: 76.7580, type: 'Sutlej Basin' },
  { name: 'Hamirpur', lat: 31.6862, lng: 76.5213, type: 'Shivalik Hills' },
  { name: 'Una', lat: 31.4685, lng: 76.2708, type: 'Lower Shivalik' }
];

export const MapFilterBar = ({
  searchQuery,
  onSearchChange,
  onSelectPlace,
  riskFilter,
  onRiskChange,
  statusFilter,
  onStatusChange,
  showRiskZones,
  onToggleRiskZones,
  onReset,
  totalNodesCount,
  visibleNodesCount
}) => {
  const hasActiveFilters = searchQuery !== '' || riskFilter !== 'all' || statusFilter !== 'all';

  // Check if search query matches any Himachal places
  const matchingPlaces = searchQuery.trim().length >= 2 
    ? HIMACHAL_PLACES.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase().trim())).slice(0, 3)
    : [];

  return (
    <div className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-[#121c16] border border-stone-200/80 dark:border-forest-900/60 shadow-sm space-y-3 w-full min-w-0">
      
      {/* Search Bar & Risk Zones Toggle */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 w-full min-w-0">
        
        {/* Search input with Section 15 Placeholder */}
        <div className="relative flex-1 min-w-[220px] w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search location or node..."
            className="w-full min-h-[44px] pl-10 pr-9 py-2 rounded-xl bg-stone-50 dark:bg-forest-950/60 border border-stone-200 dark:border-forest-800/80 text-xs text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-forest-500/30 focus:border-forest-500 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 rounded-md"
              title="Clear search"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Place Search Suggestions (Geographic Fly-to) */}
          {matchingPlaces.length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-1 bg-white dark:bg-[#121c16] border border-stone-200 dark:border-forest-800 rounded-xl shadow-lg z-30 p-1 divide-y divide-stone-100 dark:divide-forest-900/40">
              <div className="px-2 py-1 text-[10px] font-mono uppercase text-stone-400 font-bold">
                Himachal Geographic Places
              </div>
              {matchingPlaces.map(place => (
                <button
                  key={place.name}
                  type="button"
                  onClick={() => {
                    if (onSelectPlace) onSelectPlace(place);
                  }}
                  className="w-full px-2.5 py-1.5 text-left text-xs hover:bg-forest-50 dark:hover:bg-forest-950/80 rounded-lg flex items-center justify-between text-stone-800 dark:text-stone-200 transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-forest-600 dark:text-nature-400" />
                    <span className="font-semibold">{place.name}</span>
                    <span className="text-[10px] text-stone-400">({place.type})</span>
                  </div>
                  <Navigation className="w-3 h-3 text-stone-400" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Toggle Show Risk Zones */}
        <button
          type="button"
          onClick={onToggleRiskZones}
          className={`min-h-[44px] px-4 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border transition-all shadow-sm flex-shrink-0 cursor-pointer ${
            showRiskZones
              ? 'bg-orange-500/15 text-orange-700 dark:text-orange-400 border-orange-500/30'
              : 'bg-stone-50 dark:bg-forest-950/60 text-stone-600 dark:text-stone-400 border-stone-200 dark:border-forest-800/80 hover:bg-stone-100 dark:hover:bg-forest-900/40'
          }`}
          aria-pressed={showRiskZones}
        >
          <ShieldAlert className={`w-4 h-4 ${showRiskZones ? 'text-orange-500' : 'text-stone-400'}`} />
          <span>Show Risk Zones</span>
          <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
            showRiskZones ? 'bg-orange-500/20 text-orange-600 dark:text-orange-300 font-bold' : 'bg-stone-200 dark:bg-stone-800 text-stone-500'
          }`}>
            {showRiskZones ? 'ON' : 'OFF'}
          </span>
        </button>
      </div>

      {/* Filter Row: Risk, Status, Counts, Reset */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-stone-100 dark:border-forest-900/50 text-xs">
        <div className="flex flex-wrap items-center gap-2.5 flex-1 min-w-0">
          
          {/* Section 17: Risk Filter */}
          <div className="flex items-center gap-1.5 min-h-[44px]">
            <label htmlFor="risk-filter-select" className="text-stone-500 dark:text-stone-400 font-medium">
              Risk Filter:
            </label>
            <select
              id="risk-filter-select"
              value={riskFilter}
              onChange={(e) => onRiskChange(e.target.value)}
              className="min-h-[40px] px-3 py-1.5 rounded-xl bg-stone-50 dark:bg-forest-950/60 border border-stone-200 dark:border-forest-800/80 text-xs text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-forest-500/30 font-medium"
            >
              <option value="all">All Risk Levels</option>
              <option value="safe">Safe (0–25)</option>
              <option value="warning">Warning (&gt;25–50)</option>
              <option value="high-risk">High Risk (&gt;50–75)</option>
              <option value="critical">Critical (&gt;75–100)</option>
              <option value="unknown">Offline / Unknown</option>
            </select>
          </div>

          {/* Section 18: Status Filter */}
          <div className="flex items-center gap-1.5 min-h-[44px]">
            <label htmlFor="status-filter-select" className="text-stone-500 dark:text-stone-400 font-medium">
              Device Status:
            </label>
            <select
              id="status-filter-select"
              value={statusFilter}
              onChange={(e) => onStatusChange(e.target.value)}
              className="min-h-[40px] px-3 py-1.5 rounded-xl bg-stone-50 dark:bg-forest-950/60 border border-stone-200 dark:border-forest-800/80 text-xs text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-forest-500/30 font-medium"
            >
              <option value="all">All Devices</option>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
            </select>
          </div>

          {/* Reset Filters */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onReset}
              className="min-h-[40px] px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-forest-900/40 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-forest-900/70 transition-colors flex items-center gap-1 font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Node Counts Indicator */}
        <div className="text-[11px] font-mono text-stone-500 dark:text-stone-400">
          Showing <strong className="text-stone-800 dark:text-stone-200">{visibleNodesCount}</strong> of {totalNodesCount} nodes
        </div>
      </div>

    </div>
  );
};

export default MapFilterBar;
