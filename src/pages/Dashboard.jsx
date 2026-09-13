import React from 'react';
import useLiveDashboard from '../hooks/useLiveDashboard';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import TopKpiGrid from '../components/dashboard/TopKpiGrid';
import CurrentRiskCard from '../components/dashboard/CurrentRiskCard';
import AiPredictionCard from '../components/dashboard/AiPredictionCard';
import LiveSensorReadings from '../components/dashboard/LiveSensorReadings';
import SensorStatusCard from '../components/dashboard/SensorStatusCard';
import EnvironmentalTrendsCard from '../components/dashboard/EnvironmentalTrendsCard';
import GroundStabilityCard from '../components/dashboard/GroundStabilityCard';
import LiveMonitoringMapCard from '../components/dashboard/LiveMonitoringMapCard';
import MonitoringNodesCard from '../components/dashboard/MonitoringNodesCard';
import RecentAlertsCard from '../components/dashboard/RecentAlertsCard';
import LoraNetworkCard from '../components/dashboard/LoraNetworkCard';
import WeatherCard from '../components/dashboard/WeatherCard';
import SystemHealthCard from '../components/dashboard/SystemHealthCard';
import QuickActionsCard from '../components/dashboard/QuickActionsCard';
import CommunitySafetyCard from '../components/dashboard/CommunitySafetyCard';

export const Dashboard = () => {
  const { 
    sensorValues, 
    sparklines, 
    nodes, 
    envSeries, 
    stabilitySeries, 
    lastUpdatedText, 
    isRefreshing, 
    manualRefresh,
    riskAssessment 
  } = useLiveDashboard();

  const [selectedNodeId, setSelectedNodeId] = React.useState(null);
  const selectedNode = React.useMemo(() => nodes.find(n => n.id === selectedNodeId) || null, [nodes, selectedNodeId]);

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-10 w-full min-w-0">
      {/* 1. DASHBOARD HEADER */}
      <DashboardHeader 
        lastUpdatedText={lastUpdatedText}
        isRefreshing={isRefreshing}
        onRefresh={manualRefresh}
      />

      {/* 2. TOP KPI SUMMARY METRICS (6 Cards) */}
      <TopKpiGrid 
        sensorValues={sensorValues} 
        riskAssessment={riskAssessment} 
        nodes={nodes}
      />

      {/* 3 & 4. PRIMARY RISK ASSESSMENT & AI RISK ANALYSIS WORKSPACES */}
      <div className="space-y-6 w-full min-w-0">
        <CurrentRiskCard 
          riskAssessment={riskAssessment} 
          sensorValues={sensorValues} 
        />
        <AiPredictionCard 
          riskAssessment={riskAssessment} 
          sensorValues={sensorValues} 
          nodes={nodes}
        />
      </div>

      {/* 5. LIVE SENSOR READINGS (6 Parameter Cards + Compact Environmental Summary) */}
      <LiveSensorReadings 
        sensorValues={sensorValues} 
        sparklines={sparklines} 
      />

      {/* 5B. SENSOR STATUS (Full-Width Geotechnical Health & Connectivity Matrix) */}
      <SensorStatusCard nodes={nodes} />

      {/* 6 & 7. ENVIRONMENTAL TRENDS & GROUND STABILITY */}
      <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch gap-5 sm:gap-6 w-full min-w-0">
        <EnvironmentalTrendsCard 
          envSeries={envSeries} 
          sensorValues={sensorValues} 
        />
        <GroundStabilityCard 
          stabilitySeries={stabilitySeries} 
          sensorValues={sensorValues} 
        />
      </div>

      {/* 7B. COMMUNITY SAFETY (Human-Centered Early Warning & Himalayan Resilience) */}
      <CommunitySafetyCard 
        nodes={nodes} 
        riskAssessment={riskAssessment} 
      />

      {/* 8. LIVE MONITORING MAP & SENSOR NODES INVENTORY */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 w-full min-w-0">
        <LiveMonitoringMapCard 
          nodes={nodes} 
          selectedNode={selectedNode}
          onSelectNode={(node) => setSelectedNodeId(node ? node.id : null)}
          className="lg:col-span-7"
        />
        <MonitoringNodesCard 
          nodes={nodes} 
          selectedNodeId={selectedNodeId}
          onSelectNode={(node) => setSelectedNodeId(node.id === selectedNodeId ? null : node.id)}
          className="lg:col-span-5"
        />
      </div>

      {/* 9. RECENT ALERTS (Himalayan GIS Satellite Context & Operational Event Stream) */}
      <RecentAlertsCard nodes={nodes} />

      {/* 10. LoRa NETWORK TELEMETRY */}
      <LoraNetworkCard />

      {/* 11, 12 & 13. WEATHER CONDITIONS, SYSTEM HEALTH & QUICK ACTIONS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 w-full min-w-0">
        <WeatherCard />
        <SystemHealthCard />
        <QuickActionsCard />
      </div>
    </div>
  );
};

export default Dashboard;
