import React from 'react';
import { 
  Search, 
  X, 
  LayoutGrid, 
  List, 
  RefreshCw,
  ChevronDown
} from 'lucide-react';

export const SensorControlBar = ({
  searchQuery = '',
  onSearchChange,
  statusFilter = 'all',
  onStatusChange,
  riskFilter = 'all',
  onRiskChange,
  sortBy = 'id',
  onSortChange,
  viewMode = 'grid',
  onViewModeChange,
  totalResults = 8,
  onRefresh,
  isRefreshing = false
}) => {
  return (
    <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-white dark:bg-[#0c1626]/85 backdrop-blur-md border border-slate-200 dark:border-slate-800/80 shadow-xs dark:shadow-lg flex flex-col lg:flex-row lg:items-center justify-between gap-3 w-full min-w-0 text-slate-800 dark:text-white select-none">
      
      {/* 1. SEARCH INPUT */}
      <div className="relative flex-1 min-w-[220px] max-w-md w-full">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search sensor nodes (e.g. Node 03, Zone B)..."
          className="w-full h-10 pl-9 pr-8 py-2 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700/70 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-md transition-colors"
            title="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* 2. FILTER PILLS & SELECT DROPDOWNS */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 min-w-0">
        
        {/* Status Pills: All | Online | Offline */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 hidden sm:inline">Status:</span>
          <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700/70">
            {[
              { id: 'all', label: 'All' },
              { id: 'online', label: 'Online' },
              { id: 'offline', label: 'Offline' }
            ].map(item => (
              <button
                key={item.id}
                type="button"
                onClick={() => onStatusChange(item.id)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  statusFilter === item.id
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-600 dark:text-white dark:border-emerald-500 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Risk Dropdown */}
        <div className="relative">
          <select
            value={riskFilter}
            onChange={(e) => onRiskChange(e.target.value)}
            className="h-9 pl-3 pr-8 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700/70 text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-none focus:border-emerald-500 appearance-none cursor-pointer"
          >
            <option value="all">Risk: All Risks</option>
            <option value="safe">Risk: Safe</option>
            <option value="warning">Risk: Warning</option>
            <option value="high risk">Risk: High Risk</option>
            <option value="critical">Risk: Critical</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Sort Dropdown */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="h-9 pl-3 pr-8 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700/70 text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-none focus:border-emerald-500 appearance-none cursor-pointer"
          >
            <option value="id">Sort: Node ID</option>
            <option value="risk">Sort: Hazard Risk</option>
            <option value="battery">Sort: Battery</option>
            <option value="signal">Sort: Signal RSSI</option>
            <option value="lastUpdate">Sort: Last Update</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* 3. RIGHT CONTROLS: VIEW TOGGLE, COUNT & REFRESH */}
      <div className="flex items-center gap-3 self-end lg:self-auto shrink-0">
        {/* Grid vs List Toggle */}
        <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700/70">
          <button
            type="button"
            onClick={() => onViewModeChange('grid')}
            className={`p-1.5 rounded-lg transition-all cursor-pointer ${
              viewMode === 'grid'
                ? 'bg-white text-slate-900 shadow-xs dark:bg-emerald-600 dark:text-white font-semibold'
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white'
            }`}
            title="Grid View"
            aria-label="Grid View"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onViewModeChange('list')}
            className={`p-1.5 rounded-lg transition-all cursor-pointer ${
              viewMode === 'list'
                ? 'bg-white text-slate-900 shadow-xs dark:bg-emerald-600 dark:text-white font-semibold'
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white'
            }`}
            title="List View"
            aria-label="List View"
          >
            <List className="w-4 h-4" />
          </button>
        </div>

        {/* Node Count Indicator */}
        <span className="text-xs font-medium text-slate-500 dark:text-slate-300">
          <strong className="text-slate-900 dark:text-white font-mono font-bold">{totalResults}</strong> nodes found
        </span>

        {/* Refresh Button */}
        <button
          type="button"
          onClick={onRefresh}
          disabled={isRefreshing}
          className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-900/90 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/70 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-all cursor-pointer shadow-xs"
          title="Refresh telemetry"
          aria-label="Refresh telemetry"
        >
          <RefreshCw className={`w-4 h-4 text-emerald-500 dark:text-emerald-400 ${isRefreshing ? 'animate-spin' : ''}`} />
        </button>
      </div>

    </div>
  );
};

export default SensorControlBar;
