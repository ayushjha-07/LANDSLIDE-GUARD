import React from 'react';
import { Search, Filter, RotateCcw, X } from 'lucide-react';

export const AlertFilterBar = ({
  searchQuery,
  onSearchChange,
  severityFilter,
  onSeverityChange,
  statusFilter,
  onStatusChange,
  nodeFilter,
  onNodeChange,
  onReset,
  totalResults
}) => {
  const nodes = [
    "All Nodes",
    "Node 01",
    "Node 02",
    "Node 03",
    "Node 04",
    "Node 05",
    "Node 06",
    "Node 07",
    "Node 08"
  ];

  const severities = ["All", "Warning", "High Risk", "Critical"];
  const statuses = ["All", "Active", "Acknowledged", "Resolved"];

  const hasActiveFilters = 
    searchQuery.trim() !== '' || 
    severityFilter !== 'All' || 
    statusFilter !== 'All' || 
    nodeFilter !== 'All';

  return (
    <div className="p-3.5 sm:p-4 rounded-2xl border border-stone-200/80 dark:border-forest-800/80 bg-white dark:bg-forest-900/40 shadow-sm space-y-3">
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search alerts (e.g. Node 05, rainfall, warning)..."
            className="w-full pl-9 pr-8 py-2.5 rounded-xl text-xs bg-stone-50 dark:bg-forest-950/60 border border-stone-200 dark:border-forest-800 text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-forest-500/40 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter Dropdowns Grid */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
          {/* Severity Dropdown */}
          <div className="w-full sm:w-auto">
            <select
              value={severityFilter}
              onChange={(e) => onSeverityChange(e.target.value)}
              aria-label="Filter by Severity"
              className="w-full sm:w-auto min-h-[40px] px-3 py-2 rounded-xl text-xs font-medium bg-stone-50 dark:bg-forest-950/60 border border-stone-200 dark:border-forest-800 text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-forest-500/40"
            >
              <option value="All">All Severities</option>
              <option value="Warning">Warning</option>
              <option value="High Risk">High Risk</option>
              <option value="Critical">Critical</option>
            </select>
          </div>

          {/* Status Dropdown */}
          <div className="w-full sm:w-auto">
            <select
              value={statusFilter}
              onChange={(e) => onStatusChange(e.target.value)}
              aria-label="Filter by Status"
              className="w-full sm:w-auto min-h-[40px] px-3 py-2 rounded-xl text-xs font-medium bg-stone-50 dark:bg-forest-950/60 border border-stone-200 dark:border-forest-800 text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-forest-500/40"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Acknowledged">Acknowledged</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>

          {/* Node Dropdown */}
          <div className="w-full sm:w-auto">
            <select
              value={nodeFilter}
              onChange={(e) => onNodeChange(e.target.value)}
              aria-label="Filter by Node"
              className="w-full sm:w-auto min-h-[40px] px-3 py-2 rounded-xl text-xs font-medium bg-stone-50 dark:bg-forest-950/60 border border-stone-200 dark:border-forest-800 text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-forest-500/40"
            >
              {nodes.map(n => (
                <option key={n} value={n === "All Nodes" ? "All" : n}>
                  {n}
                </option>
              ))}
            </select>
          </div>

          {/* Reset Filters Button */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onReset}
              aria-label="Reset all filters"
              className="min-h-[40px] px-3 py-2 rounded-xl text-xs font-semibold bg-stone-100 hover:bg-stone-200 dark:bg-forest-800 dark:hover:bg-forest-700 text-stone-700 dark:text-stone-200 transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap w-full sm:w-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Results Counter & Active Filter Pills */}
      <div className="flex items-center justify-between text-[11px] text-stone-500 dark:text-stone-400 pt-1 border-t border-stone-100 dark:border-forest-800/50">
        <span className="font-mono">
          Showing <strong className="text-stone-800 dark:text-stone-200">{totalResults}</strong> filtered alerts
        </span>

        {hasActiveFilters && (
          <span className="text-forest-600 dark:text-nature-400 font-medium">
            Filters active
          </span>
        )}
      </div>
    </div>
  );
};

export default AlertFilterBar;
