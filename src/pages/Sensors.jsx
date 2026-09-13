import React from 'react';
import { 
  Radio, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  ShieldAlert, 
  Wifi, 
  RefreshCw, 
  Info,
  Layers
} from 'lucide-react';
import Card from '../components/common/Card';
import SensorFilters from '../components/SensorFilters';
import SensorGrid from '../components/SensorGrid';
import NodeStatusTable from '../components/NodeStatusTable';
import SensorDetailModal from '../components/SensorDetailModal';
import { useLiveSensorData } from '../hooks/useLiveSensorData';

export const Sensors = () => {
  const {
    filteredNodes,
    summaryCounts,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    riskFilter,
    setRiskFilter,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
    selectedNode,
    openDetailModal,
    closeDetailModal,
    resetFilters,
    lastUpdatedText,
    isRefreshing,
    manualRefresh
  } = useLiveSensorData();

  return (
    <div className="space-y-6 max-w-[1440px] mx-auto pb-10 w-full min-w-0">
      {/* 1. PAGE HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200/80 dark:border-forest-900/60 pb-5 w-full min-w-0">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-xs font-semibold text-stone-500 dark:text-stone-400 mb-1.5 flex-wrap">
            <span>Home</span>
            <span>/</span>
            <span className="text-forest-700 dark:text-nature-400">Sensors</span>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-nature-500/10 text-nature-700 dark:text-nature-400 border border-nature-500/20 ml-1">
              <span className="w-1.5 h-1.5 rounded-full bg-nature-500 animate-pulse" />
              LIVE TELEMETRY
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-stone-900 dark:text-white tracking-tight">
            Live Sensor Monitoring
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
            Real-time environmental and ground-condition readings from monitoring nodes
          </p>
        </div>

        {/* Right side: Nodes Online status indicator & manual refresh */}
        <div className="flex items-center gap-3 flex-wrap self-start md:self-auto flex-shrink-0">
          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-[#121c16] border border-stone-200 dark:border-forest-800 text-xs font-semibold text-stone-800 dark:text-stone-100 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-nature-500 animate-pulse" />
            <span>{summaryCounts.online} / {summaryCounts.total} Nodes Online</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-stone-400 hidden sm:inline">
              Updated: {lastUpdatedText}
            </span>
            <button
              type="button"
              onClick={manualRefresh}
              disabled={isRefreshing}
              className="min-h-[44px] min-w-[44px] p-2.5 rounded-xl bg-white dark:bg-[#121c16] border border-stone-200 dark:border-forest-800 text-stone-700 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-forest-900/50 transition-colors shadow-sm flex items-center justify-center"
              title="Refresh sensor telemetry"
              aria-label="Refresh sensor telemetry"
            >
              <RefreshCw className={`w-4 h-4 text-forest-600 dark:text-nature-400 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* 2. SUMMARY CARDS (6 Metrics: Total, Online, Offline, Warning, High Risk, Network Health) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4 w-full min-w-0">
        {/* Card 1: Total Nodes */}
        <Card className="!p-3.5 sm:!p-4">
          <div className="flex items-center justify-between text-stone-400 mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider truncate">Total Nodes</span>
            <div className="p-1 rounded-lg bg-forest-50 dark:bg-forest-950/80 text-forest-600 dark:text-nature-400">
              <Radio className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-heading text-stone-900 dark:text-white font-mono">
            {String(summaryCounts.total).padStart(2, '0')}
          </div>
          <div className="mt-1 text-[11px] text-stone-400">8 stations deployed</div>
        </Card>

        {/* Card 2: Online */}
        <Card className="!p-3.5 sm:!p-4">
          <div className="flex items-center justify-between text-stone-400 mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider truncate">Online</span>
            <div className="p-1 rounded-lg bg-nature-500/10 text-nature-600 dark:text-nature-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-heading text-nature-600 dark:text-nature-400 font-mono">
            {String(summaryCounts.online).padStart(2, '0')}
          </div>
          <div className="mt-1 text-[11px] text-nature-600/80 dark:text-nature-400/80">Active uplink</div>
        </Card>

        {/* Card 3: Offline */}
        <Card className="!p-3.5 sm:!p-4">
          <div className="flex items-center justify-between text-stone-400 mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider truncate">Offline</span>
            <div className="p-1 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-500">
              <XCircle className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-heading text-stone-600 dark:text-stone-400 font-mono">
            {String(summaryCounts.offline).padStart(2, '0')}
          </div>
          <div className="mt-1 text-[11px] text-stone-400">Node 06 signal lost</div>
        </Card>

        {/* Card 4: Warning */}
        <Card className="!p-3.5 sm:!p-4">
          <div className="flex items-center justify-between text-stone-400 mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider truncate">Warning</span>
            <div className="p-1 rounded-lg bg-amber-500/10 text-amber-500">
              <AlertTriangle className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-heading text-amber-500 font-mono">
            {String(summaryCounts.warning).padStart(2, '0')}
          </div>
          <div className="mt-1 text-[11px] text-amber-600/80 dark:text-amber-400/80">Node 03 elevated</div>
        </Card>

        {/* Card 5: High Risk */}
        <Card className="!p-3.5 sm:!p-4">
          <div className="flex items-center justify-between text-stone-400 mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider truncate">High Risk</span>
            <div className="p-1 rounded-lg bg-orange-500/10 text-orange-500">
              <ShieldAlert className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-heading text-orange-500 font-mono">
            {String(summaryCounts.highRisk).padStart(2, '0')}
          </div>
          <div className="mt-1 text-[11px] text-orange-600/80 dark:text-orange-400/80">Node 05 saturated</div>
        </Card>

        {/* Card 6: Network Health */}
        <Card className="!p-3.5 sm:!p-4">
          <div className="flex items-center justify-between text-stone-400 mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider truncate">Network Health</span>
            <div className="p-1 rounded-lg bg-forest-50 dark:bg-forest-950/80 text-forest-600 dark:text-nature-400">
              <Wifi className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-heading text-nature-600 dark:text-nature-400 font-mono">
            {summaryCounts.networkHealth}
          </div>
          <div className="mt-1 text-[11px] text-nature-600/80 dark:text-nature-400/80">Packet delivery rate</div>
        </Card>
      </div>

      {/* 3. PROTOTYPE SIMULATION BANNER */}
      <div className="p-3.5 rounded-xl bg-forest-50/70 dark:bg-forest-950/40 border border-forest-200/80 dark:border-forest-900/60 flex items-center justify-between gap-3 flex-wrap text-xs">
        <div className="flex items-center gap-2 text-forest-800 dark:text-forest-200">
          <Info className="w-4 h-4 text-forest-600 dark:text-nature-400 flex-shrink-0" />
          <span>
            <strong className="font-semibold">Prototype Simulation:</strong> Sensor readings are simulated for demonstration purposes. Synchronized at 3-second intervals.
          </span>
        </div>
        <span className="text-[11px] font-mono text-stone-500 dark:text-stone-400 bg-white/80 dark:bg-forest-900/60 px-2 py-0.5 rounded border border-forest-200/60 dark:border-forest-800/60">
          868.1 MHz &bull; SX1276 Node Mesh
        </span>
      </div>

      {/* 4. SEARCH AND FILTER CONTROLS */}
      <SensorFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        riskFilter={riskFilter}
        onRiskChange={setRiskFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onReset={resetFilters}
        totalResults={filteredNodes.length}
      />

      {/* 5. SENSOR DISPLAY (GRID OR LIST/TABLE) */}
      {viewMode === 'grid' ? (
        <SensorGrid
          nodes={filteredNodes}
          onViewDetails={openDetailModal}
          onResetFilters={resetFilters}
        />
      ) : (
        <NodeStatusTable
          nodes={filteredNodes}
          onViewDetails={openDetailModal}
          onResetFilters={resetFilters}
        />
      )}

      {/* 6. DETAIL MODAL */}
      {selectedNode && (
        <SensorDetailModal
          node={selectedNode}
          onClose={closeDetailModal}
        />
      )}
    </div>
  );
};

export default Sensors;
