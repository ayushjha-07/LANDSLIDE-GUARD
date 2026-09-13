import React, { useState, useMemo, useCallback } from 'react';
import { useSensorContext } from '../context/SensorContext';
import { useAlertContext } from '../context/AlertContext';
import { useToast } from '../context/ToastContext';

// Components
import ReportsHeader from '../components/reports/ReportsHeader';
import DateRangeSelector from '../components/reports/DateRangeSelector';
import ReportKpiGrid from '../components/reports/ReportKpiGrid';
import RiskHistoryChart from '../components/reports/RiskHistoryChart';
import RiskDistributionCard from '../components/reports/RiskDistributionCard';
import EnvironmentalTrendsCard from '../components/reports/EnvironmentalTrendsCard';
import GroundStabilityCard from '../components/reports/GroundStabilityCard';
import AlertAnalyticsCard from '../components/reports/AlertAnalyticsCard';
import SensorPerformanceCard from '../components/reports/SensorPerformanceCard';
import LoraPerformanceCard from '../components/reports/LoraPerformanceCard';
import NodeComparisonTable from '../components/reports/NodeComparisonTable';
import NodeRiskRankingCard from '../components/reports/NodeRiskRankingCard';
import AiAnalyticsCard from '../components/reports/AiAnalyticsCard';
import SystemHealthCard from '../components/reports/SystemHealthCard';
import AutomatedInsightsCard from '../components/reports/AutomatedInsightsCard';
import RecentReportsCard from '../components/reports/RecentReportsCard';
import MonitoringSummaryCard from '../components/reports/MonitoringSummaryCard';
import ReportGeneratorModal from '../components/reports/ReportGeneratorModal';
import ReportPreviewModal from '../components/reports/ReportPreviewModal';
import ReportsPrototypeNotice from '../components/reports/ReportsPrototypeNotice';

// Data & Utils
import { 
  HISTORICAL_RISK_SERIES_24H, 
  HISTORICAL_RISK_SERIES_7D, 
  HISTORICAL_RISK_SERIES_30D 
} from '../data/mockHistoricalData';
import { 
  calculateKpiMetrics, 
  rankNodesByRisk 
} from '../utils/reportCalculations';
import { GATEWAY_INFO } from '../data/mockDeviceData';

export const Reports = () => {
  const { nodes, sensorValues, riskAssessment } = useSensorContext();
  const { activeAlerts, historicalAlerts, summary, riskDistribution } = useAlertContext();
  const { toast } = useToast();

  // Period state
  const [selectedPeriod, setSelectedPeriod] = useState('24h');
  const [customDates, setCustomDates] = useState({ start: '2026-09-01', end: '2026-09-13' });

  // Modal states
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewConfig, setPreviewConfig] = useState({
    reportType: 'Daily Monitoring Report',
    period: 'Last 24 Hours',
    sections: {
      riskAnalysis: true,
      environmentalData: true,
      sensorStatus: true,
      alerts: true,
      loraPerformance: true,
      aiPrototypeSummary: true
    }
  });

  // Calculate dynamic KPIs from shared single source of truth
  const kpiData = useMemo(() => {
    return calculateKpiMetrics({
      nodes,
      activeAlerts,
      historicalAlerts,
      period: selectedPeriod
    });
  }, [nodes, activeAlerts, historicalAlerts, selectedPeriod]);

  // Select historical risk series according to reporting period
  const riskSeries = useMemo(() => {
    switch (selectedPeriod) {
      case '7d':
        return HISTORICAL_RISK_SERIES_7D;
      case '30d':
        return HISTORICAL_RISK_SERIES_30D;
      case 'custom':
      case '24h':
      default:
        return HISTORICAL_RISK_SERIES_24H;
    }
  }, [selectedPeriod]);

  // Ranked nodes for risk hierarchy (Node 05 first, Node 03 second, etc.)
  const rankedNodes = useMemo(() => {
    return rankNodesByRisk(nodes);
  }, [nodes]);

  // Compact monitoring summary
  const monitoringSummary = useMemo(() => {
    const onlineNodes = nodes.filter(n => n.status?.toLowerCase() === 'online').length;
    const offlineNodes = nodes.filter(n => n.status?.toLowerCase() === 'offline').length;

    return {
      area: 'Mountain Slope Monitoring Zone',
      nodes: nodes.length,
      online: onlineNodes,
      offline: offlineNodes,
      currentRisk: riskAssessment?.riskLevel || 'LOW',
      activeAlerts: activeAlerts.length,
      gateway: GATEWAY_INFO.status
    };
  }, [nodes, riskAssessment, activeAlerts]);

  // Handlers
  const handleCustomDateChange = (field, value) => {
    setCustomDates(prev => ({ ...prev, [field]: value }));
  };

  const handleOpenGenerator = () => {
    setIsGeneratorOpen(true);
  };

  const handleGeneratePreview = (config) => {
    setPreviewConfig(config);
    setIsGeneratorOpen(false);
    setIsPreviewOpen(true);
  };

  const handleExportPdf = () => {
    toast.info("Export functionality will be connected in the reporting backend stage.", "Export PDF");
  };

  const handleExportCsv = useCallback(() => {
    try {
      const csvRows = [
        ['Node ID', 'Location', 'Risk Level', 'Risk Score', 'Soil Moisture (%)', 'Rainfall (mm)', 'Tilt (deg)', 'Vibration (g)', 'Battery (%)', 'Signal', 'Status'],
        ...nodes.map(n => [
          n.id,
          `"${n.location?.name || n.location}"`,
          n.status?.toLowerCase() === 'offline' ? 'Unknown' : (n.riskLevel || (n.risk?.level === 'high-risk' ? 'High Risk' : n.risk?.level === 'warning' ? 'Warning' : 'Safe')),
          n.status === 'Offline' ? '0' : (n.riskScore || 0),
          n.status === 'Offline' ? '' : (n.soil ?? n.moisture ?? ''),
          n.status === 'Offline' ? '' : (n.rain ?? n.rainfall ?? ''),
          n.status === 'Offline' ? '' : (n.tilt ?? ''),
          n.status === 'Offline' ? '' : (n.vibration ?? ''),
          n.battery,
          n.status === 'Offline' ? 'Unavailable' : (n.signal || ''),
          n.status
        ])
      ];

      const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.map(e => e.join(',')).join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `landslide_guard_report_${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("Telemetry & risk CSV generated and downloaded.", "Export CSV");
    } catch (err) {
      toast.error("Failed to generate CSV download.", "Export Error");
    }
  }, [nodes, toast]);

  const handlePrint = () => {
    window.print();
  };

  const handleViewArchivedReport = (report) => {
    setPreviewConfig({
      reportType: report.title,
      period: report.period,
      sections: {
        riskAnalysis: true,
        environmentalData: true,
        sensorStatus: true,
        alerts: true,
        loraPerformance: true,
        aiPrototypeSummary: true
      }
    });
    setIsPreviewOpen(true);
  };

  const handleDownloadArchivedReport = (report) => {
    handleExportCsv();
  };

  return (
    <div className="space-y-4 sm:space-y-5 md:space-y-6 w-full min-w-0 max-w-[1440px] mx-auto">
      {/* 1. Page Header */}
      <ReportsHeader onOpenGenerator={handleOpenGenerator} />

      {/* 2. Date Range Control */}
      <DateRangeSelector
        selectedPeriod={selectedPeriod}
        onSelectPeriod={setSelectedPeriod}
        customDates={customDates}
        onCustomDateChange={handleCustomDateChange}
      />

      {/* 3. Overview KPI Cards (6 cards) */}
      <ReportKpiGrid kpiData={kpiData} />

      {/* 4. Risk Analytics Section: Risk History & Risk Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 w-full min-w-0">
        <div className="lg:col-span-2 min-w-0">
          <RiskHistoryChart data={riskSeries} />
        </div>
        <div className="lg:col-span-1 min-w-0">
          <RiskDistributionCard distribution={riskDistribution} />
        </div>
      </div>

      {/* 5. Environmental & Geotechnical Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 w-full min-w-0">
        <EnvironmentalTrendsCard />
        <GroundStabilityCard />
      </div>

      {/* 6. Alert Analytics & Sensor Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 w-full min-w-0">
        <AlertAnalyticsCard 
          activeCount={activeAlerts.length}
          resolvedCount={historicalAlerts.length}
          acknowledgedCount={activeAlerts.filter(a => a.status === 'Acknowledged').length}
        />
        <SensorPerformanceCard />
      </div>

      {/* 7. LoRa Communication & AI Risk Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 w-full min-w-0">
        <LoraPerformanceCard />
        <AiAnalyticsCard />
      </div>

      {/* 8. Full Node Comparison Matrix (Full Width) */}
      <div className="w-full min-w-0">
        <NodeComparisonTable nodes={nodes} />
      </div>

      {/* 9. Risk Ranking, System Health & Monitoring Summary (3 columns) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 w-full min-w-0">
        <NodeRiskRankingCard rankedNodes={rankedNodes} />
        <SystemHealthCard />
        <MonitoringSummaryCard summary={monitoringSummary} />
      </div>

      {/* 10. Automated Insights & Recent Reports Archive */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 w-full min-w-0">
        <AutomatedInsightsCard nodes={nodes} alerts={activeAlerts} />
        <RecentReportsCard
          onViewReport={handleViewArchivedReport}
          onDownloadReport={handleDownloadArchivedReport}
        />
      </div>

      {/* 11. Prototype Notice Callout Banner */}
      <ReportsPrototypeNotice />

      {/* Report Generator Configuration Modal */}
      <ReportGeneratorModal
        isOpen={isGeneratorOpen}
        onClose={() => setIsGeneratorOpen(false)}
        onGeneratePreview={handleGeneratePreview}
      />

      {/* Report Preview Document View Modal */}
      <ReportPreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        reportConfig={previewConfig}
        nodes={nodes}
        onExportPdf={handleExportPdf}
        onExportCsv={handleExportCsv}
        onPrint={handlePrint}
      />
    </div>
  );
};

export default Reports;
