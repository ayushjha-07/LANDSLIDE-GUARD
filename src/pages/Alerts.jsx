import React from 'react';
import { ShieldAlert, Info } from 'lucide-react';
import { useAlerts } from '../hooks/useAlerts';
import AlertHeader from '../components/alerts/AlertHeader';
import EarlyWarningBanner from '../components/alerts/EarlyWarningBanner';
import AlertKpiGrid from '../components/alerts/AlertKpiGrid';
import OfflineNodeNotice from '../components/alerts/OfflineNodeNotice';
import AlertFilterBar from '../components/alerts/AlertFilterBar';
import ActiveAlertsList from '../components/alerts/ActiveAlertsList';
import AlertDetailModal from '../components/alerts/AlertDetailModal';
import AlertHistoryTable from '../components/alerts/AlertHistoryTable';
import EarlyWarningWorkflow from '../components/alerts/EarlyWarningWorkflow';
import NotificationChannels from '../components/alerts/NotificationChannels';
import AlertTimeline from '../components/alerts/AlertTimeline';
import RiskDistributionCard from '../components/alerts/RiskDistributionCard';
import HighestRiskNodeCard from '../components/alerts/HighestRiskNodeCard';
import AlertStatisticsCard from '../components/alerts/AlertStatisticsCard';
import AlertThresholdsTable from '../components/alerts/AlertThresholdsTable';

export const Alerts = () => {
  const {
    searchQuery,
    setSearchQuery,
    severityFilter,
    setSeverityFilter,
    statusFilter,
    setStatusFilter,
    nodeFilter,
    setNodeFilter,
    resetFilters,
    filteredActiveAlerts,
    filteredHistoricalAlerts,
    selectedAlertForModal,
    openAlertModal,
    closeAlertModal,
    acknowledgeAlert,
    resolveAlert
  } = useAlerts();

  const totalFilteredCount = filteredActiveAlerts.length + filteredHistoricalAlerts.length;

  return (
    <div className="space-y-5 sm:space-y-6 md:space-y-7 w-full max-w-[1440px] mx-auto min-w-0 pb-10">
      {/* 1. Page Header */}
      <AlertHeader />

      {/* 2. Early Warning Status Banner */}
      <EarlyWarningBanner />

      {/* 3. Four KPI Cards + Resolved Today */}
      <AlertKpiGrid />

      {/* 4. Node 06 Offline Notice (Strict Separation of Device vs Geotechnical Hazard) */}
      <OfflineNodeNotice />

      {/* 5. Search & Multi-Filter Bar */}
      <AlertFilterBar 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        severityFilter={severityFilter}
        onSeverityChange={setSeverityFilter}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        nodeFilter={nodeFilter}
        onNodeChange={setNodeFilter}
        onReset={resetFilters}
        totalResults={totalFilteredCount}
      />

      {/* 6. Main Content Two-Column Responsive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
        {/* Primary Left Column: Active Incidents, Workflow, History */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-6 sm:space-y-7 min-w-0">
          {/* Active Alerts Section */}
          <section className="space-y-3" aria-labelledby="active-alerts-heading">
            <div className="flex items-center justify-between">
              <div>
                <h2 id="active-alerts-heading" className="text-base sm:text-lg font-bold font-heading text-stone-900 dark:text-white">
                  Active Alerts
                </h2>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Unresolved geotechnical conditions requiring operator attention
                </p>
              </div>
              <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                {filteredActiveAlerts.length} Active
              </span>
            </div>

            <ActiveAlertsList 
              alerts={filteredActiveAlerts} 
              onViewDetails={openAlertModal}
              onAcknowledge={acknowledgeAlert}
              onResolve={resolveAlert}
            />
          </section>

          {/* Early Warning 8-Step Visual Process */}
          <section aria-labelledby="workflow-heading">
            <EarlyWarningWorkflow />
          </section>

          {/* Alert History Section */}
          <section className="space-y-3" aria-labelledby="history-heading">
            <div className="flex items-center justify-between">
              <div>
                <h2 id="history-heading" className="text-base sm:text-lg font-bold font-heading text-stone-900 dark:text-white">
                  Alert History
                </h2>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Historical log of acknowledged and resolved geotechnical events
                </p>
              </div>
              <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                {filteredHistoricalAlerts.length} Resolved
              </span>
            </div>

            <AlertHistoryTable 
              alerts={filteredHistoricalAlerts} 
              onViewDetails={openAlertModal} 
            />
          </section>
        </div>

        {/* Secondary Right Sidebar Column: Highlights, Channels, Distribution, Timeline */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-5 sm:space-y-6 min-w-0">
          {/* Highest Current Risk Highlight Card */}
          <HighestRiskNodeCard />

          {/* Dynamic Risk Distribution */}
          <RiskDistributionCard />

          {/* Notification Channels Status */}
          <NotificationChannels />

          {/* Chronological Warning Activity Timeline */}
          <AlertTimeline />

          {/* Alert Statistics */}
          <AlertStatisticsCard />

          {/* Centralized Alert Thresholds Preview */}
          <AlertThresholdsTable />
        </div>
      </div>

      {/* 7. Mandatory Prototype Warning Disclaimer Notice */}
      <footer className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 dark:bg-forest-900/40 border border-amber-500/25 dark:border-forest-800 text-stone-700 dark:text-stone-300">
        <div className="flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-bold font-heading text-stone-900 dark:text-white uppercase tracking-wider">
              Prototype Early-Warning System
            </h4>
            <p className="text-xs leading-relaxed text-stone-600 dark:text-stone-300">
              Alerts and notifications are generated from simulated sensor data for demonstration. This prototype is not a certified emergency-warning system. In real-world deployments, early warning alerts are governed by institutional civil defense protocols.
            </p>
          </div>
        </div>
      </footer>

      {/* 8. Alert Detail Modal */}
      <AlertDetailModal 
        alert={selectedAlertForModal}
        isOpen={Boolean(selectedAlertForModal)}
        onClose={closeAlertModal}
        onAcknowledge={acknowledgeAlert}
        onResolve={resolveAlert}
      />
    </div>
  );
};

export default Alerts;
