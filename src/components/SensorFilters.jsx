import React from 'react';
import { 
  Search, 
  X, 
  RotateCcw, 
  LayoutGrid, 
  List, 
  SlidersHorizontal,
  ArrowUpDown
} from 'lucide-react';

export const SensorFilters = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  riskFilter,
  onRiskChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  onReset,
  totalResults
}) => {
  const hasActiveFilters = searchQuery !== '' || statusFilter !== 'all' || riskFilter !== 'all' || sortBy !== 'id';

  return (
    <div className="p-4 rounded-2xl bg-white dark:bg-[#121c16] border border-stone-200/80 dark:border-forest-900/60 shadow-sm space-y-3.5 w-full min-w-0">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 w-full min-w-0">
        {/* Search Bar */}
        <div className="relative flex-1 min-w-[200px] w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search sensor nodes (e.g. Node 03, Zone B)..."
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
        </div>

        {/* View Mode Toggle: Grid | List */}
        <div className="flex items-center gap-1 self-start sm:self-auto p-1 rounded-xl bg-stone-100 dark:bg-forest-950/80 border border-stone-200 dark:border-forest-800/80 flex-shrink-0">
          <button
            type="button"
            onClick={() => onViewModeChange('grid')}
            className={`min-h-[40px] px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              viewMode === 'grid'
                ? 'bg-white dark:bg-forest-800 text-stone-900 dark:text-white shadow-sm'
                : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
            }`}
            title="Grid View"
            aria-label="Grid View"
          >
            <LayoutGrid className="w-4 h-4" />
            <span className="hidden sm:inline">Grid</span>
          </button>
          <button
            type="button"
            onClick={() => onViewModeChange('list')}
            className={`min-h-[40px] px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              viewMode === 'list'
                ? 'bg-white dark:bg-forest-800 text-stone-900 dark:text-white shadow-sm'
                : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
            }`}
            title="List / Table View"
            aria-label="List View"
          >
            <List className="w-4 h-4" />
            <span className="hidden sm:inline">List</span>
          </button>
        </div>
      </div>

      {/* Filter Row: Status, Risk, Sort, Clear */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-stone-100 dark:border-forest-900/50 text-xs">
        <div className="flex flex-wrap items-center gap-2.5 flex-1 min-w-0">
          {/* Status Filter */}
          <div className="flex items-center gap-1 min-h-[44px]">
            <span className="text-[11px] font-semibold text-stone-400 mr-1 hidden sm:inline">Status:</span>
            <div className="flex items-center gap-1 p-1 rounded-xl bg-stone-100 dark:bg-forest-950/80 border border-stone-200 dark:border-forest-800/80">
              {['all', 'online', 'offline'].map(status => (
                <button
                  key={status}
                  type="button"
                  onClick={() => onStatusChange(status)}
                  className={`min-h-[36px] px-2.5 py-1 rounded-lg capitalize font-medium transition-all text-xs ${
                    statusFilter === status
                      ? 'bg-white dark:bg-forest-800 text-stone-900 dark:text-white shadow-sm font-semibold'
                      : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Risk Filter */}
          <div className="flex items-center gap-1 min-h-[44px]">
            <span className="text-[11px] font-semibold text-stone-400 mr-1 hidden sm:inline">Risk:</span>
            <select
              value={riskFilter}
              onChange={(e) => onRiskChange(e.target.value)}
              className="min-h-[40px] px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-forest-950/80 border border-stone-200 dark:border-forest-800/80 text-xs text-stone-800 dark:text-stone-200 font-medium focus:outline-none focus:ring-2 focus:ring-forest-500/30"
              aria-label="Filter by risk category"
            >
              <option value="all">All Risks</option>
              <option value="safe">Safe (0–25)</option>
              <option value="warning">Warning (&gt;25–50)</option>
              <option value="high risk">High Risk (&gt;50–75)</option>
              <option value="critical">Critical (&gt;75–100)</option>
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-1 min-h-[44px]">
            <span className="text-[11px] font-semibold text-stone-400 mr-1 hidden sm:inline">Sort:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
                className="min-h-[40px] pl-3 pr-8 py-1.5 rounded-xl bg-stone-100 dark:bg-forest-950/80 border border-stone-200 dark:border-forest-800/80 text-xs text-stone-800 dark:text-stone-200 font-medium focus:outline-none focus:ring-2 focus:ring-forest-500/30"
                aria-label="Sort sensor nodes"
              >
                <option value="id">Node ID</option>
                <option value="risk">Hazard Risk (High to Low)</option>
                <option value="battery">Battery Level</option>
                <option value="signal">LoRa Signal Strength</option>
                <option value="lastUpdate">Last Update</option>
              </select>
              <ArrowUpDown className="w-3.5 h-3.5 text-stone-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Right side: Results count & Clear filters button */}
        <div className="flex items-center gap-3 flex-shrink-0 self-end sm:self-center">
          <span className="text-[11px] text-stone-400 font-mono">
            {totalResults} {totalResults === 1 ? 'node' : 'nodes'} found
          </span>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onReset}
              className="min-h-[40px] px-3 py-1.5 rounded-xl text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-forest-900/50 border border-stone-200 dark:border-forest-800 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SensorFilters;
