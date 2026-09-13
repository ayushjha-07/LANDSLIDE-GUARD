import React, { useState } from 'react';
import { useSensorContext } from '../context/SensorContext';
import { useDeviceFilters } from '../hooks/useDeviceFilters';
import { getOnlineNodeCount, getOfflineNodeCount } from '../utils/dataSelectors';

// Components
import DevicesHeader from '../components/devices/DevicesHeader';
import DevicePrototypeNotice from '../components/devices/DevicePrototypeNotice';
import DeviceKpiGrid from '../components/devices/DeviceKpiGrid';
import GatewayOverviewCard from '../components/devices/GatewayOverviewCard';
import SignalStrengthChart from '../components/devices/SignalStrengthChart';
import PacketDeliveryChart from '../components/devices/PacketDeliveryChart';
import DeviceFilterBar from '../components/devices/DeviceFilterBar';
import DeviceGrid from '../components/devices/DeviceGrid';
import DeviceDetailModal from '../components/devices/DeviceDetailModal';
import DeviceHealthCard from '../components/devices/DeviceHealthCard';
import BatteryHealthCard from '../components/devices/BatteryHealthCard';
import NodeSignalBarCard from '../components/devices/NodeSignalBarCard';
import NetworkTopologyCard from '../components/devices/NetworkTopologyCard';
import NetworkActivityCard from '../components/devices/NetworkActivityCard';
import DeviceAlertsCard from '../components/devices/DeviceAlertsCard';
import HardwareArchitectureCard from '../components/devices/HardwareArchitectureCard';
import DeviceQuickActions from '../components/devices/DeviceQuickActions';

export const Devices = () => {
  const { nodes = [], isRefreshing, manualRefresh } = useSensorContext();
  const [selectedDevice, setSelectedDevice] = useState(null);

  const {
    devices,
    rawNodes,
    totalCount,
    filteredCount,
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
    resetFilters
  } = useDeviceFilters(nodes);

  // Derive counts directly via pure selectors from canonical data model
  const onlineCount = getOnlineNodeCount(nodes);
  const offlineCount = getOfflineNodeCount(nodes);

  return (
    <div className="space-y-6 max-w-[1440px] mx-auto pb-12 w-full min-w-0">
      {/* 1. Page Header */}
      <DevicesHeader 
        isRefreshing={isRefreshing} 
        onRefresh={manualRefresh} 
      />

      {/* 2. Prototype Device Monitoring Notice */}
      <DevicePrototypeNotice />

      {/* 3. Summary KPI Cards (6 columns desktop, 3 tablet, 2 mobile) */}
      <DeviceKpiGrid 
        totalNodes={totalCount} 
        onlineNodes={onlineCount} 
        offlineNodes={offlineCount} 
      />

      {/* 4. LoRa Gateway Overview & Network Communication Statistics */}
      <GatewayOverviewCard />

      {/* 5. Signal Strength & Packet Delivery Charts (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 w-full min-w-0">
        <SignalStrengthChart />
        <PacketDeliveryChart />
      </div>

      {/* 6. Sensor Node Device Grid & Search/Filters */}
      <div className="space-y-4 w-full min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 min-w-0">
          <div>
            <h2 className="text-lg sm:text-xl font-bold font-heading text-[#1A202C] dark:text-white">
              ESP32 Sensor Nodes
            </h2>
            <p className="text-xs text-[#718096] dark:text-slate-400">
              Hardware provisioning, real-time power levels, and LoRa telemetry per station
            </p>
          </div>
          <span className="text-xs font-mono text-forest-700 dark:text-nature-400 self-start sm:self-auto">
            Single Source of Truth &bull; 8 IoT Stations
          </span>
        </div>

        {/* Filter controls */}
        <DeviceFilterBar 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          deviceFilter={deviceFilter}
          setDeviceFilter={setDeviceFilter}
          healthFilter={healthFilter}
          setHealthFilter={setHealthFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          resetFilters={resetFilters}
          totalCount={totalCount}
          filteredCount={filteredCount}
        />

        {/* Device Cards Grid */}
        <DeviceGrid 
          devices={devices} 
          onViewDetails={setSelectedDevice} 
        />
      </div>

      {/* 7. Secondary Telemetry & Analytics Grid (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 w-full min-w-0 items-start">
        {/* Left Column: Device Health Score, Battery Health, Network Topology */}
        <div className="space-y-5 sm:space-y-6 w-full min-w-0">
          <DeviceHealthCard />
          <BatteryHealthCard devices={rawNodes} />
          <NetworkTopologyCard devices={rawNodes} />
        </div>

        {/* Right Column: LoRa Signal by Node, Device Alerts, Network Activity */}
        <div className="space-y-5 sm:space-y-6 w-full min-w-0">
          <NodeSignalBarCard devices={rawNodes} />
          <DeviceAlertsCard />
          <NetworkActivityCard />
        </div>
      </div>

      {/* 8. End-to-End Hardware Architecture & Component List */}
      <HardwareArchitectureCard />

      {/* 9. Operational Quick Actions */}
      <DeviceQuickActions />

      {/* 10. Device Detail Modal */}
      {selectedDevice && (
        <DeviceDetailModal 
          device={selectedDevice} 
          onClose={() => setSelectedDevice(null)} 
        />
      )}
    </div>
  );
};

export default Devices;

