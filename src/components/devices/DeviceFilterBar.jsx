import React from 'react';
import { Search, RotateCcw } from 'lucide-react';

export const DeviceFilterBar = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  deviceFilter,
  setDeviceFilter,
  healthFilter,
  setHealthFilter,
  sortBy,
  setSortBy,
  resetFilters,
  totalCount,
  filteredCount
}) => {
  return (
    <div className="p-4 rounded-2xl bg-white dark:bg-[#1A202C] border border-[#E2E8F0] dark:border-[#2D3748] shadow-soft space-y-3 w-full min-w-0">
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 min-w-0">
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#718096] dark:text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search nodes or devices (e.g. Node 05, North Slope, ESP32)..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#0E131F] border border-[#E2E8F0] dark:border-[#2D3748] text-[#1A202C] dark:text-white placeholder-[#718096] focus:outline-none focus:border-forest-500 dark:focus:border-forest-400 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 justify-between md:justify-end flex-shrink-0">
          <span className="text-xs font-mono font-medium text-[#718096] dark:text-slate-400">
            Showing <strong className="text-[#1A202C] dark:text-white">{filteredCount}</strong> of {totalCount} devices
          </span>
          <button
            type="button"
            onClick={resetFilters}
            className="min-h-[36px] px-3 py-1.5 rounded-lg border border-[#E2E8F0] dark:border-[#2D3748] text-xs font-medium text-[#718096] dark:text-slate-400 hover:text-[#1A202C] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5"
            title="Reset filters"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1 text-xs">
        <div>
          <label className="text-[11px] font-semibold uppercase tracking-wider text-[#718096] dark:text-slate-400 block mb-1">
            Status
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-[#0E131F] border border-[#E2E8F0] dark:border-[#2D3748] text-[#1A202C] dark:text-white focus:outline-none focus:border-forest-500 text-xs"
          >
            <option value="All">All Statuses</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </select>
        </div>

        <div>
          <label className="text-[11px] font-semibold uppercase tracking-wider text-[#718096] dark:text-slate-400 block mb-1">
            Device
          </label>
          <select
            value={deviceFilter}
            onChange={(e) => setDeviceFilter(e.target.value)}
            className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-[#0E131F] border border-[#E2E8F0] dark:border-[#2D3748] text-[#1A202C] dark:text-white focus:outline-none focus:border-forest-500 text-xs"
          >
            <option value="All">All Hardware</option>
            <option value="ESP32">ESP32</option>
            <option value="LoRa">LoRa Transceiver</option>
          </select>
        </div>

        <div>
          <label className="text-[11px] font-semibold uppercase tracking-wider text-[#718096] dark:text-slate-400 block mb-1">
            Health
          </label>
          <select
            value={healthFilter}
            onChange={(e) => setHealthFilter(e.target.value)}
            className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-[#0E131F] border border-[#E2E8F0] dark:border-[#2D3748] text-[#1A202C] dark:text-white focus:outline-none focus:border-forest-500 text-xs"
          >
            <option value="All">All Health</option>
            <option value="Healthy">Healthy</option>
            <option value="Attention">Attention</option>
            <option value="Critical">Critical</option>
          </select>
        </div>

        <div>
          <label className="text-[11px] font-semibold uppercase tracking-wider text-[#718096] dark:text-slate-400 block mb-1">
            Sort By
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-[#0E131F] border border-[#E2E8F0] dark:border-[#2D3748] text-[#1A202C] dark:text-white focus:outline-none focus:border-forest-500 text-xs"
          >
            <option value="nodeId">Node ID</option>
            <option value="battery">Battery (High to Low)</option>
            <option value="signal">Signal (Strong to Weak)</option>
            <option value="lastSeen">Last Seen</option>
            <option value="health">Device Health</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default DeviceFilterBar;
