import React from 'react';
import RiskHeroBanner from '../components/risk/RiskHeroBanner';
import RiskKpiCards from '../components/risk/RiskKpiCards';
import RiskGeoMapCard from '../components/risk/RiskGeoMapCard';
import RiskGaugeCard from '../components/risk/RiskGaugeCard';
import RiskModelArchitectureCard from '../components/risk/RiskModelArchitectureCard';
import RiskPredictionChartCard from '../components/risk/RiskPredictionChartCard';
import RiskShapAnalysisCard from '../components/risk/RiskShapAnalysisCard';
import RiskSensorFactorsCard from '../components/risk/RiskSensorFactorsCard';
import RiskAssessmentAndQuote from '../components/risk/RiskAssessmentAndQuote';

export const RiskAnalysis = () => {
  return (
    <div className="space-y-4 w-full min-w-0 pb-6">
      {/* 1. Top Himalayan Hero Banner */}
      <RiskHeroBanner />

      {/* 2. Top KPI Summary Cards (6 in 1 row on desktop) */}
      <RiskKpiCards />

      {/* 3. Middle Section: Map + Overall Risk Gauge + AI Architecture */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 w-full min-w-0 items-stretch">
        <div className="lg:col-span-5 min-w-0">
          <RiskGeoMapCard />
        </div>
        <div className="lg:col-span-3 min-w-0">
          <RiskGaugeCard />
        </div>
        <div className="lg:col-span-4 min-w-0">
          <RiskModelArchitectureCard />
        </div>
      </div>

      {/* 4. Lower Middle Section: Risk Prediction Chart + SHAP Analysis + Sensor Factors */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 w-full min-w-0 items-stretch">
        <div className="lg:col-span-5 min-w-0">
          <RiskPredictionChartCard />
        </div>
        <div className="lg:col-span-4 min-w-0">
          <RiskShapAnalysisCard />
        </div>
        <div className="lg:col-span-3 min-w-0">
          <RiskSensorFactorsCard />
        </div>
      </div>

      {/* 5. Bottom Section: AI Recommendation & Quote */}
      <RiskAssessmentAndQuote />
    </div>
  );
};

export default RiskAnalysis;
