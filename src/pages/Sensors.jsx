import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Info, Radio } from 'lucide-react';
import HimalayanHeroHeader from '../components/sensors/HimalayanHeroHeader';
import TopSummaryFiveCards from '../components/sensors/TopSummaryFiveCards';
import LiveReadingsAndIllustration from '../components/sensors/LiveReadingsAndIllustration';
import SensorTrendsAndAlerts from '../components/sensors/SensorTrendsAndAlerts';
import BottomOverviewCards from '../components/sensors/BottomOverviewCards';
import SensorControlBar from '../components/sensors/SensorControlBar';
import SensorCardRedesigned from '../components/sensors/SensorCardRedesigned';
import NodeStatusTable from '../components/NodeStatusTable';
import SensorDetailModal from '../components/SensorDetailModal';
import { useLiveSensorData } from '../hooks/useLiveSensorData';

export const Sensors = () => {
  const outletContext = useOutletContext() || {};
  const { onOpenSidebar } = outletContext;

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
    isRefreshing,
    manualRefresh
  } = useLiveSensorData();

  return (
    <div className="relative w-full max-w-[1440px] mx-auto text-slate-900 dark:text-white space-y-3.5 sm:space-y-4 transition-colors duration-200">
      {/* 2. Top Himalayan hero/header */}
      <HimalayanHeroHeader onOpenSidebar={onOpenSidebar} />

      {/* 3. Top summary cards (5 cards) */}
      <TopSummaryFiveCards
        total={summaryCounts?.total || 8}
        online={summaryCounts?.online || 7}
        offline={summaryCounts?.offline || 1}
        safe={5}
        warning={summaryCounts?.warning || 1}
        highRisk={summaryCounts?.highRisk || 1}
        avgRisk={22}
        systemStatus="Normal"
      />

      {/* 4 & 5. Live Sensor Readings (6 cards with custom mini charts) + Sensor Node Illustration */}
      <LiveReadingsAndIllustration
        nodes={filteredNodes}
        onSelectNode={openDetailModal}
      />

      {/* 6 & 7. Sensor Data Trends (24H Recharts chart with normal range) + Active Alerts (4 alerts) */}
      <SensorTrendsAndAlerts />

      {/* 8, 9 & 10. Environmental Overview + Ground Stability Overview + Himalayan Quote Card */}
      <BottomOverviewCards
        temp={21.6}
        soil={42.4}
        rainfall={12}
        humidity={72}
        tilt={1.77}
        vibration={0.033}
        groundCondition="Stable Ground Condition"
      />

      {/* ======================================================================= */}
      {/* 11. ALL NODES SECTION (PROTOTYPE SIMULATION + FILTERS + 8 NODES GRID) */}
      {/* ======================================================================= */}
      <div className="space-y-3.5 pt-2">
        {/* Prototype Simulation Banner */}
        <div className="px-4 py-2.5 rounded-xl bg-sky-50 dark:bg-[#0a1628]/80 backdrop-blur-md border border-sky-200 dark:border-sky-900/50 shadow-xs flex items-center justify-between gap-3 flex-wrap text-xs text-sky-900 dark:text-slate-300 select-none">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-sky-100 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
              <Info className="w-3.5 h-3.5" />
            </div>
            <span>
              <strong className="text-sky-950 dark:text-white font-semibold">Prototype Simulation:</strong> Sensor readings are simulated for demonstration purposes. Synchronized at 3-second intervals.
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] font-mono text-sky-700 dark:text-cyan-300 font-semibold">
            <Radio className="w-3.5 h-3.5 text-sky-600 dark:text-cyan-400 animate-pulse" />
            <span>LoRa: 868.1 MHz &bull; SX1276 Node Mesh</span>
          </div>
        </div>

        {/* Filter & Search Toolbar */}
        <SensorControlBar
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
          totalResults={filteredNodes.length}
          onRefresh={manualRefresh}
          isRefreshing={isRefreshing}
        />

        {/* 8 Nodes Grid or List View */}
        {viewMode === 'grid' ? (
          filteredNodes.length === 0 ? (
            <div className="py-12 px-4 text-center rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/20 max-w-lg mx-auto">
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">No sensor nodes found matching your filters.</p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-3 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 w-full min-w-0">
              {filteredNodes.map(node => (
                <SensorCardRedesigned
                  key={node.id}
                  node={node}
                  onViewDetails={openDetailModal}
                />
              ))}
            </div>
          )
        ) : (
          <div className="rounded-2xl overflow-hidden bg-white dark:bg-[#0c1626]/85 backdrop-blur-md border border-slate-200 dark:border-slate-800/80 shadow-xs dark:shadow-xl">
            <NodeStatusTable
              nodes={filteredNodes}
              onViewDetails={openDetailModal}
              onResetFilters={resetFilters}
            />
          </div>
        )}
      </div>

      {/* Sensor Detail Inspection Modal (preserves full inspection capabilities) */}
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
