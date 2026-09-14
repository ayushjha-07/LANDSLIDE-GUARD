import React, { useState, useEffect } from 'react';
import { 
  Radio, 
  MapPin, 
  Calendar, 
  Info, 
  RefreshCw, 
  Layers
} from 'lucide-react';
import heroHimalayasBannerImg from '../assets/hero_himalayas_banner.jpg';
import SensorSummaryKpiCards from '../components/sensors/SensorSummaryKpiCards';
import SensorControlBar from '../components/sensors/SensorControlBar';
import SensorCardRedesigned from '../components/sensors/SensorCardRedesigned';
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

  // Dynamic live clock for Kullu-Manali regional monitoring
  const [currentDateTime, setCurrentDateTime] = useState(() => {
    const now = new Date();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dayName = days[now.getDay()];
    const day = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const mins = String(now.getMinutes()).padStart(2, '0');
    const secs = String(now.getSeconds()).padStart(2, '0');
    return `${dayName}, ${day} ${month} ${year} • ${hours}:${mins}:${secs}`;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const dayName = days[now.getDay()];
      const day = now.getDate();
      const month = months[now.getMonth()];
      const year = now.getFullYear();
      const hours = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      const secs = String(now.getSeconds()).padStart(2, '0');
      setCurrentDateTime(`${dayName}, ${day} ${month} ${year} • ${hours}:${mins}:${secs}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative -m-4 sm:-m-5 md:-m-6 lg:-m-7 xl:-m-8 p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8 bg-[#f8fafc] dark:bg-[#070d18] text-slate-900 dark:text-white min-h-[calc(100vh-64px)] overflow-x-hidden transition-colors duration-200">
      
      {/* ========================================================================= */}
      {/* REALISTIC HIMALAYAN MOUNTAIN PANORAMA BACKGROUND LAYER */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
        <img 
          src={heroHimalayasBannerImg} 
          alt="Himalayan Mountain Range" 
          className="w-full h-[320px] sm:h-[380px] lg:h-[420px] object-cover object-top filter brightness-[1.05] contrast-[1.08]"
        />
        {/* Left-to-right balanced vignette: ensures contrast for text in both modes */}
        <div className="absolute inset-x-0 top-0 h-[320px] sm:h-[380px] lg:h-[420px] bg-gradient-to-r from-slate-950/65 via-slate-900/35 to-transparent dark:from-[#070d18]/95 dark:via-[#070d18]/70 dark:to-[#070d18]/25" />
        
        {/* Top-to-bottom atmospheric fade: merges snow peaks smoothly into #f8fafc or #070d18 */}
        <div className="absolute inset-x-0 top-16 h-[260px] sm:h-[320px] lg:h-[360px] bg-gradient-to-b from-transparent via-[#f8fafc]/60 to-[#f8fafc] dark:via-[#070d18]/75 dark:to-[#070d18]" />
      </div>

      {/* ========================================================================= */}
      {/* MAIN CONTENT CONTAINER (Constrained to 1440px) */}
      {/* ========================================================================= */}
      <div className="relative z-10 max-w-[1440px] mx-auto space-y-4 sm:space-y-5 w-full min-w-0">
        
        {/* ======================================================================= */}
        {/* 1. HERO HEADER: BREADCRUMB, TITLE, REGIONAL PILLS & SLOGAN */}
        {/* ======================================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 select-none">
          {/* Left: Breadcrumbs + Title + Live Subtitle */}
          <div className="min-w-0">
            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-xs font-semibold text-white/85 drop-shadow-xs mb-1.5 flex-wrap">
              <span className="hover:text-white transition-colors">Home</span>
              <span className="text-white/60">&gt;</span>
              <span className="hover:text-white transition-colors">Sensors</span>
              <span className="text-white/60">&gt;</span>
              <span className="text-emerald-300 font-bold">Live Telemetry</span>
            </div>

            {/* Title & Live Badge */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-emerald-500/25 border border-emerald-400/40 text-emerald-300 flex items-center justify-center shrink-0 shadow-sm backdrop-blur-md">
                <Radio className="w-5 h-5 stroke-[2.3]" />
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-black font-heading text-white tracking-tight leading-tight drop-shadow-md">
                Live Sensor Monitoring
              </h1>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500 text-white shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                LIVE
              </span>
            </div>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-white/95 font-medium mt-1 drop-shadow-sm">
              Real-time environmental and ground-condition readings from monitoring nodes
            </p>
          </div>

          {/* Right: Dynamic Timestamp Pill & Italic Slogan */}
          <div className="flex flex-col items-start lg:items-end gap-1.5 shrink-0">
            <div className="flex items-center gap-2 flex-wrap">
              {/* Dynamic Timestamp Pill */}
              <div className="px-3.5 py-2 rounded-xl bg-slate-900/45 dark:bg-slate-900/85 border border-white/20 shadow-md backdrop-blur-md flex items-center gap-2 text-white">
                <Calendar className="w-4 h-4 text-emerald-300 shrink-0" />
                <div className="text-left leading-tight">
                  <div className="text-[9.5px] text-slate-300">Telemetry Clock</div>
                  <div className="text-[11px] font-mono font-bold text-white">{currentDateTime}</div>
                </div>
              </div>
            </div>

            {/* Slogan with Accent Line */}
            <div className="flex items-center gap-2 mt-0.5">
              <span className="w-8 h-0.5 bg-emerald-400/80 rounded-full" />
              <div className="font-serif italic text-xs sm:text-sm font-semibold text-white/95 tracking-tight drop-shadow-sm">
                Mountains Today, Safer Communities Tomorrow
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================================= */}
        {/* 2. TOP SUMMARY KPI CARDS (6 Metrics) */}
        {/* ======================================================================= */}
        <SensorSummaryKpiCards summaryCounts={summaryCounts} />

        {/* ======================================================================= */}
        {/* 3. PROTOTYPE SIMULATION BANNER */}
        {/* ======================================================================= */}
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

        {/* ======================================================================= */}
        {/* 4. SEARCH + FILTER CONTROL BAR */}
        {/* ======================================================================= */}
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

        {/* ======================================================================= */}
        {/* 5. SENSOR DISPLAY: 4-COLUMN GRID OR LIST TABLE */}
        {/* ======================================================================= */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 w-full min-w-0">
            {filteredNodes.map((node) => (
              <SensorCardRedesigned
                key={node.id}
                node={node}
                onViewDetails={openDetailModal}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl overflow-hidden bg-white dark:bg-[#0c1626]/85 backdrop-blur-md border border-slate-200 dark:border-slate-800/80 shadow-sm dark:shadow-xl">
            <NodeStatusTable
              nodes={filteredNodes}
              onViewDetails={openDetailModal}
              onResetFilters={resetFilters}
            />
          </div>
        )}

        {/* ======================================================================= */}
        {/* 6. DETAIL MODAL (Inspection Workflow) */}
        {/* ======================================================================= */}
        {selectedNode && (
          <SensorDetailModal
            node={selectedNode}
            onClose={closeDetailModal}
          />
        )}

      </div>
    </div>
  );
};

export default Sensors;
