/**
 * Landslide Guard - Canonical Sensor Node Data Store
 * Single source of truth for all 8 geotechnical IoT monitoring stations.
 * Shared across Dashboard, Sensors, Risk Analysis, Map, Alerts, Devices, and Reports.
 */

// Factory function to attach backward-compatible accessors to canonical node objects
export function createCanonicalNode(raw) {
  const node = { ...raw };

  // Remove any static own-property aliases that might have been flattened by spread
  delete node.soil;
  delete node.moisture;
  delete node.rain;
  delete node.rainfall;
  delete node.tilt;
  delete node.vibration;
  delete node.temperature;
  delete node.humidity;
  delete node.battery;
  delete node.signal;
  delete node.signalStrength;
  delete node.riskScore;
  delete node.riskLevel;
  delete node.lastUpdate;
  delete node.coords;
  delete node.packets;
  delete node.packetSuccess;

  // Compatibility getters for seamless migration without UI regressions
  Object.defineProperties(node, {
    // Soil moisture alias
    soil: {
      get() { return this.readings?.soilMoisture?.value ?? null; },
      enumerable: true,
      configurable: true
    },
    moisture: {
      get() { return this.readings?.soilMoisture?.value ?? null; },
      enumerable: true,
      configurable: true
    },
    // Rainfall alias
    rain: {
      get() { return this.readings?.rainfall?.value ?? null; },
      enumerable: true,
      configurable: true
    },
    rainfall: {
      get() { return this.readings?.rainfall?.value ?? null; },
      enumerable: true,
      configurable: true
    },
    // Incline tilt alias
    tilt: {
      get() { return this.readings?.tilt?.value ?? null; },
      enumerable: true,
      configurable: true
    },
    // Seismic vibration alias
    vibration: {
      get() { return this.readings?.vibration?.value ?? null; },
      enumerable: true,
      configurable: true
    },
    // Temperature alias
    temperature: {
      get() { return this.readings?.temperature?.value ?? null; },
      enumerable: true,
      configurable: true
    },
    // Relative humidity alias
    humidity: {
      get() { return this.readings?.humidity?.value ?? null; },
      enumerable: true,
      configurable: true
    },
    // Device battery alias
    battery: {
      get() { return this.device?.battery?.value ?? 0; },
      enumerable: true,
      configurable: true
    },
    // Signal RSSI formatted alias
    signal: {
      get() {
        if (this.status === 'offline') return 'Unavailable';
        const rssi = this.device?.signal?.rssi;
        return rssi !== null && rssi !== undefined ? `${rssi} dBm` : 'Unavailable';
      },
      enumerable: true,
      configurable: true
    },
    signalStrength: {
      get() { return this.device?.signal?.rssi ?? null; },
      enumerable: true,
      configurable: true
    },
    // Risk score alias
    riskScore: {
      get() { return this.risk?.score ?? 0; },
      enumerable: true,
      configurable: true
    },
    // Risk level display alias (e.g. "Safe", "Warning", "High Risk", "Unknown")
    riskLevel: {
      get() {
        if (this.status === 'offline') return 'Unknown';
        switch (this.risk?.level) {
          case 'critical': return 'Critical';
          case 'high-risk': return 'High Risk';
          case 'warning': return 'Warning';
          case 'unknown': return 'Unknown';
          case 'safe':
          default: return 'Safe';
        }
      },
      enumerable: true,
      configurable: true
    },
    // Last communication string alias
    lastUpdate: {
      get() { return this.device?.lastSeen || 'Just now'; },
      enumerable: true,
      configurable: true
    },
    // Illustrative map coords
    coords: {
      get() { return { x: this.location?.x ?? 50, y: this.location?.y ?? 50 }; },
      enumerable: true,
      configurable: true
    },
    packets: {
      get() { return this.device?.packets?.received ?? 1000; },
      enumerable: true,
      configurable: true
    },
    packetSuccess: {
      get() { return this.device?.packets?.successRate ?? 98.0; },
      enumerable: true,
      configurable: true
    },
    latitude: {
      get() { return this.location?.latitude ?? 32.25; },
      enumerable: true,
      configurable: true
    },
    longitude: {
      get() { return this.location?.longitude ?? 77.18; },
      enumerable: true,
      configurable: true
    }
  });

  return node;
}

export const INITIAL_CANONICAL_NODES_DATA = [
  {
    id: "NODE-01",
    name: "Node 01",
    location: {
      name: "North Slope",
      x: 28,
      y: 32,
      latitude: 32.2200,
      longitude: 76.4500
    },
    status: "online",
    risk: {
      score: 18,
      level: "safe",
      trend: "stable",
      predictionWindow: "6h"
    },
    readings: {
      soilMoisture: { value: 42.0, unit: "%", trend: "stable" },
      rainfall: { value: 12.0, unit: "mm", trend: "decreasing" },
      tilt: { value: 1.8, unit: "°", trend: "stable" },
      vibration: { value: 0.03, unit: "g", trend: "stable" },
      temperature: { value: 21.4, unit: "°C", trend: "stable" },
      humidity: { value: 72.0, unit: "%", trend: "stable" }
    },
    device: {
      controller: "ESP32",
      communication: "LoRa",
      battery: { value: 91, unit: "%" },
      signal: { rssi: -71, unit: "dBm" },
      snr: 8.8,
      lastSeen: "Just now",
      packets: { received: 1520, successRate: 98.9 }
    },
    riskHistory: ["Safe", "Safe", "Safe", "Safe", "Safe"]
  },
  {
    id: "NODE-02",
    name: "Node 02",
    location: {
      name: "East Ridge",
      x: 62,
      y: 24,
      latitude: 32.3600,
      longitude: 77.2200
    },
    status: "online",
    risk: {
      score: 22,
      level: "safe",
      trend: "stable",
      predictionWindow: "6h"
    },
    readings: {
      soilMoisture: { value: 38.0, unit: "%", trend: "stable" },
      rainfall: { value: 8.0, unit: "mm", trend: "decreasing" },
      tilt: { value: 1.2, unit: "°", trend: "stable" },
      vibration: { value: 0.03, unit: "g", trend: "stable" },
      temperature: { value: 20.8, unit: "°C", trend: "stable" },
      humidity: { value: 74.0, unit: "%", trend: "stable" }
    },
    device: {
      controller: "ESP32",
      communication: "LoRa",
      battery: { value: 87, unit: "%" },
      signal: { rssi: -68, unit: "dBm" },
      snr: 9.2,
      lastSeen: "Just now",
      packets: { received: 1478, successRate: 98.8 }
    },
    riskHistory: ["Safe", "Safe", "Safe", "Safe", "Safe"]
  },
  {
    id: "NODE-03",
    name: "Node 03",
    location: {
      name: "Mountain Zone B",
      x: 45,
      y: 52,
      latitude: 31.6800,
      longitude: 76.9600
    },
    status: "online",
    risk: {
      score: 46,
      level: "warning",
      trend: "increasing",
      predictionWindow: "6h"
    },
    readings: {
      soilMoisture: { value: 64.0, unit: "%", trend: "increasing" },
      rainfall: { value: 24.0, unit: "mm", trend: "increasing" },
      tilt: { value: 3.6, unit: "°", trend: "increasing" },
      vibration: { value: 0.07, unit: "g", trend: "increasing" },
      temperature: { value: 22.1, unit: "°C", trend: "stable" },
      humidity: { value: 78.0, unit: "%", trend: "increasing" }
    },
    device: {
      controller: "ESP32",
      communication: "LoRa",
      battery: { value: 79, unit: "%" },
      signal: { rssi: -75, unit: "dBm" },
      snr: 8.0,
      lastSeen: "Just now",
      packets: { received: 1482, successRate: 98.4 }
    },
    riskHistory: ["Safe", "Safe", "Safe", "Warning", "Warning"]
  },
  {
    id: "NODE-04",
    name: "Node 04",
    location: {
      name: "South Slope",
      x: 30,
      y: 75,
      latitude: 31.8800,
      longitude: 77.1600
    },
    status: "online",
    risk: {
      score: 14,
      level: "safe",
      trend: "stable",
      predictionWindow: "6h"
    },
    readings: {
      soilMoisture: { value: 38.0, unit: "%", trend: "stable" },
      rainfall: { value: 9.0, unit: "mm", trend: "decreasing" },
      tilt: { value: 1.5, unit: "°", trend: "stable" },
      vibration: { value: 0.02, unit: "g", trend: "stable" },
      temperature: { value: 21.0, unit: "°C", trend: "stable" },
      humidity: { value: 70.0, unit: "%", trend: "stable" }
    },
    device: {
      controller: "ESP32",
      communication: "LoRa",
      battery: { value: 94, unit: "%" },
      signal: { rssi: -66, unit: "dBm" },
      snr: 9.5,
      lastSeen: "Just now",
      packets: { received: 1489, successRate: 99.5 }
    },
    riskHistory: ["Safe", "Safe", "Safe", "Safe", "Safe"]
  },
  {
    id: "NODE-05",
    name: "Node 05",
    location: {
      name: "Mountain Zone C",
      x: 74,
      y: 68,
      latitude: 32.2417,
      longitude: 77.1892
    },
    status: "online",
    risk: {
      score: 68,
      level: "high-risk",
      trend: "increasing",
      predictionWindow: "6h"
    },
    readings: {
      soilMoisture: { value: 76.0, unit: "%", trend: "increasing" },
      rainfall: { value: 29.0, unit: "mm", trend: "increasing" },
      tilt: { value: 4.8, unit: "°", trend: "increasing" },
      vibration: { value: 0.11, unit: "g", trend: "increasing" },
      temperature: { value: 18.4, unit: "°C", trend: "stable" },
      humidity: { value: 82.0, unit: "%", trend: "increasing" }
    },
    device: {
      controller: "ESP32",
      communication: "LoRa",
      battery: { value: 73, unit: "%" },
      signal: { rssi: -82, unit: "dBm" },
      snr: 6.8,
      lastSeen: "Just now",
      packets: { received: 1450, successRate: 96.2 }
    },
    riskHistory: ["Safe", "Safe", "Warning", "Warning", "High Risk"]
  },
  {
    id: "NODE-06",
    name: "Node 06",
    location: {
      name: "West Ridge",
      x: 18,
      y: 55,
      latitude: 31.5200,
      longitude: 77.7200
    },
    status: "offline",
    risk: {
      score: null,
      level: "unknown",
      trend: "stable",
      predictionWindow: "6h"
    },
    readings: {
      soilMoisture: { value: null, unit: "%", trend: "unknown" },
      rainfall: { value: null, unit: "mm", trend: "unknown" },
      tilt: { value: null, unit: "°", trend: "unknown" },
      vibration: { value: null, unit: "g", trend: "unknown" },
      temperature: { value: null, unit: "°C", trend: "unknown" },
      humidity: { value: null, unit: "%", trend: "unknown" }
    },
    lastKnownReadings: {
      soilMoisture: 35.0,
      rainfall: 0.0,
      tilt: 1.1,
      vibration: 0.01,
      temperature: 19.5,
      humidity: 65.0
    },
    device: {
      controller: "ESP32",
      communication: "LoRa",
      battery: { value: 32, unit: "%" },
      signal: { rssi: null, unit: "dBm" },
      snr: null,
      lastSeen: "18 minutes ago",
      packets: { received: 980, successRate: 82.0 }
    },
    riskHistory: ["Safe", "Safe", "Safe", "Unknown", "Unknown"]
  },
  {
    id: "NODE-07",
    name: "Node 07",
    location: {
      name: "Central Slope",
      x: 50,
      y: 38,
      latitude: 31.9800,
      longitude: 77.1200
    },
    status: "online",
    risk: {
      score: 20,
      level: "safe",
      trend: "stable",
      predictionWindow: "6h"
    },
    readings: {
      soilMoisture: { value: 45.0, unit: "%", trend: "stable" },
      rainfall: { value: 14.0, unit: "mm", trend: "stable" },
      tilt: { value: 2.1, unit: "°", trend: "stable" },
      vibration: { value: 0.03, unit: "g", trend: "stable" },
      temperature: { value: 21.2, unit: "°C", trend: "stable" },
      humidity: { value: 73.0, unit: "%", trend: "stable" }
    },
    device: {
      controller: "ESP32",
      communication: "LoRa",
      battery: { value: 89, unit: "%" },
      signal: { rssi: -70, unit: "dBm" },
      snr: 8.9,
      lastSeen: "Just now",
      packets: { received: 1475, successRate: 98.7 }
    },
    riskHistory: ["Safe", "Safe", "Safe", "Safe", "Safe"]
  },
  {
    id: "NODE-08",
    name: "Node 08",
    location: {
      name: "North Ridge",
      x: 78,
      y: 30,
      latitude: 32.0500,
      longitude: 77.5800
    },
    status: "online",
    risk: {
      score: 16,
      level: "safe",
      trend: "stable",
      predictionWindow: "6h"
    },
    readings: {
      soilMoisture: { value: 40.0, unit: "%", trend: "stable" },
      rainfall: { value: 11.0, unit: "mm", trend: "stable" },
      tilt: { value: 1.7, unit: "°", trend: "stable" },
      vibration: { value: 0.02, unit: "g", trend: "stable" },
      temperature: { value: 20.5, unit: "°C", trend: "stable" },
      humidity: { value: 69.0, unit: "%", trend: "stable" }
    },
    device: {
      controller: "ESP32",
      communication: "LoRa",
      battery: { value: 96, unit: "%" },
      signal: { rssi: -64, unit: "dBm" },
      snr: 9.8,
      lastSeen: "Just now",
      packets: { received: 1492, successRate: 99.8 }
    },
    riskHistory: ["Safe", "Safe", "Safe", "Safe", "Safe"]
  }
];

export const INITIAL_SENSOR_NODES = INITIAL_CANONICAL_NODES_DATA.map(createCanonicalNode);

// 24-hour historical telemetry series generator for detailed modal charts
export const generateNodeHistory = (node) => {
  const hours = [
    "00:00", "02:00", "04:00", "06:00", "08:00", 
    "10:00", "12:00", "14:00", "16:00", "18:00", 
    "20:00", "22:00", "Now"
  ];

  const isOffline = node.status?.toLowerCase() === 'offline';
  const baseSoil = isOffline ? (node.lastKnownReadings?.soilMoisture ?? 35) : (node.readings?.soilMoisture?.value ?? 35);
  const baseRain = isOffline ? (node.lastKnownReadings?.rainfall ?? 0) : (node.readings?.rainfall?.value ?? 0);
  const baseTilt = isOffline ? (node.lastKnownReadings?.tilt ?? 1.5) : (node.readings?.tilt?.value ?? 1.5);
  const baseVib = isOffline ? (node.lastKnownReadings?.vibration ?? 0.02) : (node.readings?.vibration?.value ?? 0.02);
  const baseTemp = isOffline ? (node.lastKnownReadings?.temperature ?? 20) : (node.readings?.temperature?.value ?? 20);
  const baseHum = isOffline ? (node.lastKnownReadings?.humidity ?? 70) : (node.readings?.humidity?.value ?? 70);

  return hours.map((time, idx) => {
    const factor = (idx + 1) / hours.length;
    const isOfflinePoint = isOffline && idx > 8;

    return {
      time,
      soil: isOfflinePoint ? null : Number((baseSoil * 0.85 + baseSoil * 0.15 * factor + (Math.sin(idx) * 1.2)).toFixed(1)),
      rain: isOfflinePoint ? null : Number(Math.max(0, (baseRain * factor + (idx > 6 ? 2.0 : 0))).toFixed(1)),
      tilt: isOfflinePoint ? null : Number((baseTilt * 0.9 + baseTilt * 0.1 * factor + (Math.cos(idx) * 0.05)).toFixed(2)),
      vibration: isOfflinePoint ? null : Number(Math.max(0.01, (baseVib * 0.8 + baseVib * 0.2 * factor + (Math.sin(idx * 2) * 0.004))).toFixed(3)),
      temperature: isOfflinePoint ? null : Number((baseTemp - 2.0 + Math.sin(idx * 0.5) * 2.5).toFixed(1)),
      humidity: isOfflinePoint ? null : Number((baseHum - 3.0 + Math.cos(idx * 0.4) * 4.0).toFixed(1))
    };
  });
};

export default INITIAL_SENSOR_NODES;
