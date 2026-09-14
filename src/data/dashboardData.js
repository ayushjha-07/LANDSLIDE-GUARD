export const INITIAL_SENSOR_VALUES = {
  moisture: 41.2,      // %
  rainfall: 12.0,      // mm
  tilt: 1.77,          // degrees
  vibration: 0.033,    // g
  temperature: 21.6,   // °C
  humidity: 76.5,      // %
  pressure: 1012,      // hPa
  windSpeed: 6.0,      // km/h
};

export const SENSOR_SPARKLINES = {
  moisture: [41.2, 41.5, 41.8, 42.4, 42.1, 41.9, 42.0],
  rainfall: [0.0, 1.2, 4.5, 8.0, 11.2, 12.0, 12.0],
  tilt: [1.75, 1.76, 1.78, 1.80, 1.79, 1.81, 1.80],
  vibration: [0.028, 0.029, 0.031, 0.030, 0.032, 0.029, 0.030],
  temperature: [20.2, 20.6, 21.0, 21.8, 21.6, 21.3, 21.4],
  humidity: [74.0, 73.5, 72.8, 71.9, 72.2, 72.5, 72.0],
};

import { INITIAL_SENSOR_NODES } from './mockSensorData';

export const MONITORING_NODES = INITIAL_SENSOR_NODES;

export const HOURLY_ENVIRONMENTAL_SERIES = [
  { time: "00:00", moisture: 38.4, rainfall: 0.0, temperature: 18.2, humidity: 76.0 },
  { time: "02:00", moisture: 38.6, rainfall: 0.0, temperature: 17.8, humidity: 77.5 },
  { time: "04:00", moisture: 39.1, rainfall: 1.2, temperature: 17.5, humidity: 79.0 },
  { time: "06:00", moisture: 39.8, rainfall: 3.5, temperature: 18.4, humidity: 78.2 },
  { time: "08:00", moisture: 41.2, rainfall: 6.8, temperature: 19.5, humidity: 75.4 },
  { time: "10:00", moisture: 42.0, rainfall: 9.4, temperature: 20.8, humidity: 73.0 },
  { time: "12:00", moisture: 42.8, rainfall: 11.2, temperature: 22.1, humidity: 70.8 },
  { time: "14:00", moisture: 42.6, rainfall: 12.0, temperature: 22.8, humidity: 69.5 },
  { time: "16:00", moisture: 42.4, rainfall: 12.0, temperature: 22.0, humidity: 71.0 },
  { time: "18:00", moisture: 42.2, rainfall: 12.0, temperature: 21.2, humidity: 72.4 },
  { time: "20:00", moisture: 42.1, rainfall: 12.0, temperature: 20.4, humidity: 73.8 },
  { time: "22:00", moisture: 42.0, rainfall: 12.0, temperature: 19.8, humidity: 74.5 },
  { time: "Now",   moisture: 42.0, rainfall: 12.0, temperature: 21.4, humidity: 72.0 },
];

export const HOURLY_STABILITY_SERIES = [
  { time: "00:00", tilt: 1.74, vibration: 0.026, threshold: 3.5 },
  { time: "02:00", tilt: 1.75, vibration: 0.027, threshold: 3.5 },
  { time: "04:00", tilt: 1.76, vibration: 0.029, threshold: 3.5 },
  { time: "06:00", tilt: 1.77, vibration: 0.031, threshold: 3.5 },
  { time: "08:00", tilt: 1.79, vibration: 0.033, threshold: 3.5 },
  { time: "10:00", tilt: 1.80, vibration: 0.032, threshold: 3.5 },
  { time: "12:00", tilt: 1.82, vibration: 0.035, threshold: 3.5 },
  { time: "14:00", tilt: 1.81, vibration: 0.032, threshold: 3.5 },
  { time: "16:00", tilt: 1.80, vibration: 0.030, threshold: 3.5 },
  { time: "18:00", tilt: 1.79, vibration: 0.029, threshold: 3.5 },
  { time: "20:00", tilt: 1.80, vibration: 0.031, threshold: 3.5 },
  { time: "22:00", tilt: 1.80, vibration: 0.029, threshold: 3.5 },
  { time: "Now",   tilt: 1.80, vibration: 0.030, threshold: 3.5 },
];

export const DASHBOARD_ALERTS = [
  {
    id: "ALT-01",
    title: "Heavy Rainfall Detected",
    node: "Node 05",
    sector: "Central Slope Sector",
    severity: "High Risk",
    timestamp: "8 minutes ago",
    details: "High rainfall intensity detected. Monitoring for potential slope instability.",
    action: "Increase monitoring frequency and review the affected node."
  },
  {
    id: "ALT-02",
    title: "Increased Soil Moisture",
    node: "Node 03",
    sector: "Lower Ridge",
    severity: "Warning",
    timestamp: "2 minutes ago",
    details: "Soil moisture above normal threshold after sustained rainfall.",
    action: "Inspect drainage gully runoff channels and confirm RF telemetry link stability."
  },
  {
    id: "ALT-03",
    title: "Vibration Spike",
    node: "Node 02",
    sector: "Hillside Road",
    severity: "Resolved",
    timestamp: "24 minutes ago",
    details: "Short-term vibration spike detected. No further abnormal activity observed.",
    action: "Routine confirmation logged."
  },
  {
    id: "ALT-04",
    title: "Tilt Variation",
    node: "Node 07",
    sector: "Upper Slope",
    severity: "Resolved",
    timestamp: "1 hour ago",
    details: "Minor tilt variation detected. Within safe limits.",
    action: "Sensor zero-offset verified."
  },
];

export const LORA_NETWORK_DATA = {
  gateway: "EDGE-GW-01",
  status: "Online",
  connectedNodes: "7 / 8",
  connectedCount: 7,
  totalNodes: 8,
  signal: "Good",
  packetsReceived: "12,301",
  packetsSent: "12,145",
  droppedPackets: "156",
  packetSuccess: "98.6%",
  avgRSSI: "-73 dBm",
  avgSNR: "8.4",
  frequency: "868.1 MHz",
  spreadingFactor: "SF7",
  bandwidth: "125 kHz",
  
  // 12-interval simulated trends matching the primary reference
  successTrend: [
    { time: "10:00", value: 96.8 },
    { time: "10:15", value: 96.2 },
    { time: "10:30", value: 97.0 },
    { time: "10:45", value: 98.2 },
    { time: "11:00", value: 97.4 },
    { time: "11:15", value: 98.5 },
    { time: "11:30", value: 98.6 },
    { time: "11:45", value: 98.9 },
    { time: "12:00", value: 98.2 },
    { time: "12:15", value: 99.0 },
    { time: "12:30", value: 98.9 },
    { time: "12:45", value: 99.1 },
  ],
  rssiTrend: [
    { time: "10:00", value: -74 },
    { time: "10:15", value: -78 },
    { time: "10:30", value: -77 },
    { time: "10:45", value: -72 },
    { time: "11:00", value: -78 },
    { time: "11:15", value: -71 },
    { time: "11:30", value: -76 },
    { time: "11:45", value: -79 },
    { time: "12:00", value: -71 },
    { time: "12:15", value: -73 },
    { time: "12:30", value: -74 },
    { time: "12:45", value: -73 },
  ],
  snrTrend: [
    { time: "10:00", value: 6.5 },
    { time: "10:15", value: 6.8 },
    { time: "10:30", value: 7.2 },
    { time: "10:45", value: 9.8 },
    { time: "11:00", value: 7.4 },
    { time: "11:15", value: 8.8 },
    { time: "11:30", value: 8.0 },
    { time: "11:45", value: 8.4 },
    { time: "12:00", value: 9.1 },
    { time: "12:15", value: 11.2 },
    { time: "12:30", value: 10.4 },
    { time: "12:45", value: 9.8 },
  ],
  // Legacy compatibility
  qualityTrend: [
    { time: "1", snr: 9.8, rate: 99.2 },
    { time: "2", snr: 9.6, rate: 98.8 },
    { time: "3", snr: 9.9, rate: 99.0 },
    { time: "4", snr: 9.4, rate: 98.4 },
    { time: "5", snr: 9.7, rate: 98.6 },
    { time: "6", snr: 9.8, rate: 98.6 },
  ]
};

export const WEATHER_CONDITIONS = {
  temperature: "21°C",
  condition: "Partly Cloudy",
  humidity: "72%",
  wind: "6 km/h",
  rainfall: "12 mm",
  pressure: "1012 hPa",
};

export const SYSTEM_HEALTH_SUBSYSTEMS = [
  { name: "Sensor Network", status: "Healthy", note: "7/8 Nodes transmitting" },
  { name: "LoRa Gateway", status: "Online", note: "EDGE-GW-01 868.1MHz active" },
  { name: "Data Collection", status: "Active", note: "3s telemetry cycle running" },
  { name: "Risk Analysis", status: "Active", note: "Random Forest + LSTM online" },
  { name: "Alert System", status: "Active", note: "Threshold auto-dispatch armed" },
];
