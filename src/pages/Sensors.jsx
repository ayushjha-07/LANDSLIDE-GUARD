import React from 'react';
import { useOutletContext } from 'react-router-dom';
import HimalayanHeroHeader from '../components/sensors/HimalayanHeroHeader';
import TopSummaryFiveCards from '../components/sensors/TopSummaryFiveCards';
import LiveReadingsAndIllustration from '../components/sensors/LiveReadingsAndIllustration';
import SensorTrendsAndAlerts from '../components/sensors/SensorTrendsAndAlerts';
import BottomOverviewCards from '../components/sensors/BottomOverviewCards';
import SensorDetailModal from '../components/SensorDetailModal';
import { useLiveSensorData } from '../hooks/useLiveSensorData';

export const Sensors = () => {
  const outletContext = useOutletContext() || {};
  const { onOpenSidebar } = outletContext;

  const {
    filteredNodes,
    summaryCounts,
    selectedNode,
    openDetailModal,
    closeDetailModal
  } = useLiveSensorData();

  return (
    <div className="relative w-full max-w-[1440px] mx-auto text-white space-y-3.5 sm:space-y-4">
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
