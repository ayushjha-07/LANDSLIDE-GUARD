import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { INITIAL_SENSOR_NODES, createCanonicalNode } from '../data/mockSensorData';
import { SYSTEM_INFO } from '../data/mockSystemData';
import { 
  INITIAL_SENSOR_VALUES, 
  SENSOR_SPARKLINES, 
  HOURLY_ENVIRONMENTAL_SERIES, 
  HOURLY_STABILITY_SERIES 
} from '../data/dashboardData';
import { calculateLandslideRisk, getRiskLevel } from '../utils/riskCalculator';
import { useSettings } from './SettingsContext';

const SensorContext = createContext(null);

export const SensorProvider = ({ children }) => {
  const { settings } = useSettings();
  const updateInterval = settings?.monitoring?.updateInterval || 3000;
  const liveUpdates = settings?.monitoring?.liveUpdates !== false;
  const activeThresholds = settings?.risk?.thresholds;

  const [nodes, setNodes] = useState(() => {
    if (!activeThresholds) return INITIAL_SENSOR_NODES;
    return INITIAL_SENSOR_NODES.map(node => {
      if (node.status?.toLowerCase() === 'offline' || node.risk?.score === null || node.risk?.score === undefined) {
        return node;
      }
      const newLevel = getRiskLevel(node.risk.score, activeThresholds);
      return createCanonicalNode({
        ...node,
        risk: {
          ...node.risk,
          level: newLevel
        }
      });
    });
  });
  const [system, setSystem] = useState(SYSTEM_INFO);
  const [sensorValues, setSensorValues] = useState(INITIAL_SENSOR_VALUES);
  const [sparklines, setSparklines] = useState(SENSOR_SPARKLINES);
  const [envSeries, setEnvSeries] = useState(HOURLY_ENVIRONMENTAL_SERIES);
  const [stabilitySeries, setStabilitySeries] = useState(HOURLY_STABILITY_SERIES);
  const [lastUpdatedText, setLastUpdatedText] = useState("Just now");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeScenario, setActiveScenario] = useState('normal');

  const secondsAgoRef = useRef(0);

  // Recalculate node risk levels whenever central risk thresholds are edited in Settings
  useEffect(() => {
    if (!activeThresholds) return;
    setNodes(prevNodes => prevNodes.map(node => {
      if (node.status?.toLowerCase() === 'offline' || node.risk?.score === null || node.risk?.score === undefined) {
        return node;
      }
      const newLevel = getRiskLevel(node.risk.score, activeThresholds);
      return createCanonicalNode({
        ...node,
        risk: {
          ...node.risk,
          level: newLevel
        }
      });
    }));
  }, [activeThresholds]);

  // Centralized telemetry heartbeat function
  const updateTelemetry = useCallback(() => {
    // 1. Update individual nodes (Node 06 remains offline without fabricated live data)
    setNodes(prevNodes => prevNodes.map(node => {
      if (node.status?.toLowerCase() === 'offline') {
        return node;
      }

      let newSoil, newTilt, newVib, newTemp, newHum, finalRain, nodeRiskData;

      if (node.id === 'NODE-05' || node.name === 'Node 05') {
        // Enforce canonical specification for NODE-05 (Mountain Zone C): Risk Score 68 / High Risk
        newSoil = 76.0;
        finalRain = 29.0;
        newTilt = 4.8;
        newVib = 0.11;
        newTemp = 18.4;
        newHum = 82.0;
        nodeRiskData = {
          score: 68,
          level: getRiskLevel(68, activeThresholds),
          trend: "increasing"
        };
      } else if (node.id === 'NODE-03' || node.name === 'Node 03') {
        // Enforce canonical specification for NODE-03 (Mandi Gorge Corridor): Risk Score 46 / Warning
        newSoil = 68.0;
        finalRain = 21.0;
        newTilt = 3.4;
        newVib = 0.07;
        newTemp = 22.1;
        newHum = 78.0;
        nodeRiskData = {
          score: 46,
          level: getRiskLevel(46, activeThresholds),
          trend: "increasing"
        };
      } else {
        const soilDrift = (Math.random() - 0.5) * 0.3;
        const tiltDrift = (Math.random() - 0.5) * 0.02;
        const vibDrift = (Math.random() - 0.5) * 0.002;
        const tempDrift = (Math.random() - 0.5) * 0.15;
        const humDrift = (Math.random() - 0.5) * 0.3;

        const prevSoil = node.readings?.soilMoisture?.value ?? node.soil ?? 42.0;
        const prevTilt = node.readings?.tilt?.value ?? node.tilt ?? 1.8;
        const prevVib = node.readings?.vibration?.value ?? node.vibration ?? 0.03;
        const prevTemp = node.readings?.temperature?.value ?? node.temperature ?? 21.4;
        const prevHum = node.readings?.humidity?.value ?? node.humidity ?? 72.0;
        finalRain = node.readings?.rainfall?.value ?? node.rainfall ?? 12.0;

        newSoil = Number(Math.max(35, Math.min(50, prevSoil + soilDrift)).toFixed(1));
        newTilt = Number(Math.max(1.4, Math.min(2.2, prevTilt + tiltDrift)).toFixed(2));
        newVib = Number(Math.max(0.01, Math.min(0.25, prevVib + vibDrift)).toFixed(3));
        newTemp = Number(Math.max(18, Math.min(26, prevTemp + tempDrift)).toFixed(1));
        newHum = Number(Math.max(60, Math.min(88, prevHum + humDrift)).toFixed(1));

        // Enforce canonical baseline risk scores for safe nodes in normal monitoring mode
        const canonicalScores = {
          'NODE-01': 18,
          'NODE-02': 22,
          'NODE-04': 14,
          'NODE-07': 20,
          'NODE-08': 16,
        };

        if (activeScenario === 'normal' && canonicalScores[node.id] !== undefined) {
          const baseScore = canonicalScores[node.id];
          nodeRiskData = {
            score: baseScore,
            level: getRiskLevel(baseScore, activeThresholds),
            trend: "stable"
          };
        } else {
          // Calculate node-specific risk using canonical calculator with active thresholds
          nodeRiskData = calculateLandslideRisk({
            soilMoisture: newSoil,
            rainfall: finalRain,
            tilt: newTilt,
            vibration: newVib
          }, activeThresholds);
        }
      }

      return createCanonicalNode({
        ...node,
        risk: {
          score: nodeRiskData.score,
          level: nodeRiskData.level,
          trend: nodeRiskData.trend,
          predictionWindow: "6h"
        },
        readings: {
          soilMoisture: { value: newSoil, unit: "%", trend: newSoil >= (node.readings?.soilMoisture?.value ?? 0) ? "increasing" : "stable" },
          rainfall: { value: finalRain, unit: "mm", trend: "stable" },
          tilt: { value: newTilt, unit: "°", trend: "stable" },
          vibration: { value: newVib, unit: "g", trend: "stable" },
          temperature: { value: newTemp, unit: "°C", trend: "stable" },
          humidity: { value: newHum, unit: "%", trend: "stable" }
        },
        device: {
          ...node.device,
          lastSeen: "Just now"
        }
      });
    }));

    // 2. Update slope aggregate telemetry (for Dashboard Hero & live cards)
    setSensorValues(prev => {
      const deltaMoisture = (Math.random() - 0.5) * 0.4;
      const newMoisture = Number(Math.max(40.5, Math.min(43.5, prev.moisture + deltaMoisture)).toFixed(1));

      const deltaTilt = (Math.random() - 0.5) * 0.04;
      const newTilt = Number(Math.max(1.7, Math.min(1.9, prev.tilt + deltaTilt)).toFixed(2));

      const deltaVib = (Math.random() - 0.5) * 0.004;
      const newVib = Number(Math.max(0.02, Math.min(0.04, prev.vibration + deltaVib)).toFixed(3));

      const deltaTemp = (Math.random() - 0.5) * 0.2;
      const newTemp = Number(Math.max(20.5, Math.min(22.5, prev.temperature + deltaTemp)).toFixed(1));

      const deltaHum = (Math.random() - 0.5) * 0.5;
      const newHum = Number(Math.max(70, Math.min(74, prev.humidity + deltaHum)).toFixed(1));

      // Append latest value to sparkline rolling arrays
      setSparklines(prevSp => ({
        moisture: [...prevSp.moisture.slice(1), newMoisture],
        rainfall: [...prevSp.rainfall.slice(1), prev.rainfall],
        tilt: [...prevSp.tilt.slice(1), newTilt],
        vibration: [...prevSp.vibration.slice(1), newVib],
        temperature: [...prevSp.temperature.slice(1), newTemp],
        humidity: [...prevSp.humidity.slice(1), newHum]
      }));

      return {
        ...prev,
        moisture: newMoisture,
        tilt: newTilt,
        vibration: newVib,
        temperature: newTemp,
        humidity: newHum
      };
    });

    secondsAgoRef.current = 0;
    setLastUpdatedText("Just now");
  }, [activeThresholds]);

  // Heartbeat timer using updateInterval and liveUpdates toggle
  useEffect(() => {
    if (!liveUpdates) return;
    const timer = setInterval(() => {
      updateTelemetry();
    }, updateInterval);

    return () => clearInterval(timer);
  }, [liveUpdates, updateInterval, updateTelemetry]);

  // 1-second relative string ticker
  useEffect(() => {
    const ticker = setInterval(() => {
      secondsAgoRef.current += 1;
      if (secondsAgoRef.current < 3) {
        setLastUpdatedText("Just now");
      } else {
        setLastUpdatedText(`${secondsAgoRef.current}s ago`);
      }
    }, 1000);

    return () => clearInterval(ticker);
  }, []);

  // Manual refresh action
  const manualRefresh = useCallback(() => {
    setIsRefreshing(true);
    updateTelemetry();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  }, [updateTelemetry]);

  // Demo Scenario Handler (7 scenarios required)
  const applyScenario = useCallback((scenarioKey) => {
    setActiveScenario(scenarioKey);

    if (scenarioKey === 'normal') {
      setNodes(INITIAL_SENSOR_NODES);
      setSystem(SYSTEM_INFO);
      setSensorValues(INITIAL_SENSOR_VALUES);
      return;
    }

    if (scenarioKey === 'network_degradation') {
      // Degrades communication layer without altering geotechnical landslide risk
      setSystem(prev => ({
        ...prev,
        packetSuccess: 81.4,
        avgRssi: "-94 dBm",
        droppedPackets: 1480,
        signalQuality: "Poor",
        status: "Online",
        gateway: {
          ...prev.gateway,
          signalQuality: "Poor",
          status: "Online"
        }
      }));
      setNodes(prev => prev.map(n => {
        if (n.status?.toLowerCase() === 'offline') return n;
        return {
          ...n,
          signal: "-95 dBm",
          signalStrength: -95,
          packetSuccess: 79.5
        };
      }));
      return;
    }

    // Geotechnical scenarios
    setNodes(prevNodes => prevNodes.map(node => {
      if (node.status?.toLowerCase() === 'offline') return node;

      let s = node.soil ?? 42.0;
      let r = node.rain ?? 12.0;
      let t = node.tilt ?? 1.8;
      let v = node.vibration ?? 0.03;

      if (scenarioKey === 'increased_rainfall') {
        if (node.id === 'NODE-05' || node.name === 'Node 05') { r = 48.0; s = 78.5; }
        else if (node.id === 'NODE-03' || node.name === 'Node 03') { r = 38.0; s = 72.0; }
        else if (node.id === 'NODE-07' || node.name === 'Node 07') { r = 32.0; s = 58.0; }
        else { r = 24.0; }
      } else if (scenarioKey === 'high_soil_moisture') {
        if (node.id === 'NODE-05' || node.name === 'Node 05') { s = 86.0; r = 34.0; t = 4.9; }
        else if (node.id === 'NODE-03' || node.name === 'Node 03') { s = 81.0; r = 26.0; t = 3.6; }
        else if (node.id === 'NODE-01' || node.name === 'Node 01') { s = 74.0; r = 18.0; }
        else { s = 65.0; }
      } else if (scenarioKey === 'rising_ground_movement') {
        if (node.id === 'NODE-05' || node.name === 'Node 05') { t = 5.8; v = 0.18; s = 76.0; }
        else if (node.id === 'NODE-03' || node.name === 'Node 03') { t = 4.4; v = 0.12; }
        else if (node.id === 'NODE-02' || node.name === 'Node 02') { t = 3.2; v = 0.08; }
        else { t = 2.4; v = 0.05; }
      } else if (scenarioKey === 'high_risk') {
        if (node.id === 'NODE-05' || node.name === 'Node 05') { s = 79.0; r = 35.0; t = 5.2; v = 0.14; }
        else if (node.id === 'NODE-03' || node.name === 'Node 03') { s = 75.0; r = 28.0; t = 4.5; v = 0.11; }
        else if (node.id === 'NODE-07' || node.name === 'Node 07') { s = 72.0; r = 26.0; t = 4.1; v = 0.09; }
      } else if (scenarioKey === 'critical') {
        // Selected node Node 05 reaches Score 82+ (CRITICAL)
        if (node.id === 'NODE-05' || node.name === 'Node 05') {
          s = 88.0; r = 62.0; t = 6.4; v = 0.22;
        } else if (node.id === 'NODE-03' || node.name === 'Node 03') {
          s = 76.0; r = 32.0; t = 4.8; v = 0.12;
        }
      }

      const riskData = calculateLandslideRisk({ soilMoisture: s, rainfall: r, tilt: t, vibration: v }, activeThresholds);

      return createCanonicalNode({
        ...node,
        soil: s,
        rain: r,
        tilt: t,
        vibration: v,
        risk: {
          score: riskData.score,
          level: riskData.level,
          trend: riskData.trend,
          predictionWindow: "6h"
        },
        readings: {
          soilMoisture: { value: s, unit: "%", trend: "increasing" },
          rainfall: { value: r, unit: "mm", trend: "increasing" },
          tilt: { value: t, unit: "°", trend: "increasing" },
          vibration: { value: v, unit: "g", trend: "increasing" },
          temperature: { value: node.readings?.temperature?.value || 21.4, unit: "°C", trend: "stable" },
          humidity: { value: node.readings?.humidity?.value || 72.0, unit: "%", trend: "stable" }
        }
      });
    }));

    // Update aggregate values based on scenario
    if (scenarioKey === 'critical') {
      setSensorValues(prev => ({ ...prev, moisture: 68.0, rainfall: 42.0, tilt: 4.8, vibration: 0.14 }));
    } else if (scenarioKey === 'increased_rainfall') {
      setSensorValues(prev => ({ ...prev, rainfall: 32.0, moisture: 54.0 }));
    } else if (scenarioKey === 'high_soil_moisture') {
      setSensorValues(prev => ({ ...prev, moisture: 65.0, rainfall: 22.0 }));
    } else if (scenarioKey === 'rising_ground_movement') {
      setSensorValues(prev => ({ ...prev, tilt: 3.8, vibration: 0.09 }));
    }
  }, [activeThresholds]);

  // Reset simulation back to canonical deterministic prototype state
  const resetSimulationState = useCallback(() => {
    setNodes(INITIAL_SENSOR_NODES);
    setSystem(SYSTEM_INFO);
    setSensorValues(INITIAL_SENSOR_VALUES);
    setSparklines(SENSOR_SPARKLINES);
    setEnvSeries(HOURLY_ENVIRONMENTAL_SERIES);
    setStabilitySeries(HOURLY_STABILITY_SERIES);
    setActiveScenario('normal');
    secondsAgoRef.current = 0;
    setLastUpdatedText("Just now");
  }, []);

  // Overall slope risk assessment
  const riskAssessment = calculateLandslideRisk({
    soilMoisture: sensorValues.moisture,
    rainfall: sensorValues.rainfall,
    tilt: sensorValues.tilt,
    vibration: sensorValues.vibration
  }, activeThresholds);

  const value = {
    nodes,
    system,
    sensorValues,
    sparklines,
    envSeries,
    stabilitySeries,
    riskAssessment,
    lastUpdatedText,
    lastUpdated: lastUpdatedText,
    isRefreshing,
    manualRefresh,
    activeScenario,
    applyScenario,
    resetSimulationState
  };

  return (
    <SensorContext.Provider value={value}>
      {children}
    </SensorContext.Provider>
  );
};

export const useSensorContext = () => {
  const context = useContext(SensorContext);
  if (!context) {
    throw new Error('useSensorContext must be used within a SensorProvider');
  }
  return context;
};

export const useSensors = useSensorContext;

export default SensorContext;
