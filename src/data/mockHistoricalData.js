/**
 * Landslide Guard - Centralized Simulated Historical Monitoring Dataset
 * Single source of truth for historical risk trends, environmental parameters,
 * ground stability metrics, alert timelines, and LoRa communication telemetry.
 *
 * NOTE: Prototype Demonstration Data. Values are deterministic and calibrated
 * to maintain strict consistency with live sensor nodes and active alerts.
 */

// 1. Historical Risk Time Series across 24 Hours, 7 Days, and 30 Days
export const HISTORICAL_RISK_SERIES_24H = [
  { time: '00:00', riskScore: 16, status: 'Safe', peakScore: 24, node05Risk: 28, node03Risk: 22 },
  { time: '02:00', riskScore: 17, status: 'Safe', peakScore: 25, node05Risk: 30, node03Risk: 24 },
  { time: '04:00', riskScore: 19, status: 'Safe', peakScore: 29, node05Risk: 35, node03Risk: 27 },
  { time: '06:00', riskScore: 21, status: 'Safe', peakScore: 34, node05Risk: 42, node03Risk: 31 },
  { time: '08:00', riskScore: 23, status: 'Safe', peakScore: 40, node05Risk: 49, node03Risk: 36 },
  { time: '10:00', riskScore: 25, status: 'Safe', peakScore: 48, node05Risk: 55, node03Risk: 41 },
  { time: '12:00', riskScore: 27, status: 'Warning', peakScore: 56, node05Risk: 61, node03Risk: 44 },
  { time: '14:00', riskScore: 26, status: 'Warning', peakScore: 58, node05Risk: 63, node03Risk: 45 },
  { time: '16:00', riskScore: 25, status: 'Safe', peakScore: 62, node05Risk: 66, node03Risk: 46 },
  { time: '18:00', riskScore: 24, status: 'Safe', peakScore: 65, node05Risk: 67, node03Risk: 46 },
  { time: '20:00', riskScore: 24, status: 'Safe', peakScore: 68, node05Risk: 68, node03Risk: 46 },
  { time: '22:00', riskScore: 24, status: 'Safe', peakScore: 68, node05Risk: 68, node03Risk: 46 },
  { time: 'Now',   riskScore: 24, status: 'Safe', peakScore: 68, node05Risk: 68, node03Risk: 46 }
];

export const HISTORICAL_RISK_SERIES_7D = [
  { time: '07 Sep', riskScore: 18, status: 'Safe', peakScore: 28, node05Risk: 32, node03Risk: 25 },
  { time: '08 Sep', riskScore: 19, status: 'Safe', peakScore: 31, node05Risk: 36, node03Risk: 28 },
  { time: '09 Sep', riskScore: 21, status: 'Safe', peakScore: 38, node05Risk: 44, node03Risk: 33 },
  { time: '10 Sep', riskScore: 25, status: 'Safe', peakScore: 47, node05Risk: 52, node03Risk: 39 },
  { time: '11 Sep', riskScore: 29, status: 'Warning', peakScore: 58, node05Risk: 61, node03Risk: 43 },
  { time: '12 Sep', riskScore: 26, status: 'Warning', peakScore: 65, node05Risk: 67, node03Risk: 45 },
  { time: 'Today',  riskScore: 24, status: 'Safe', peakScore: 68, node05Risk: 68, node03Risk: 46 }
];

export const HISTORICAL_RISK_SERIES_30D = [
  { time: 'Week 1', riskScore: 16, status: 'Safe', peakScore: 26, node05Risk: 30, node03Risk: 22 },
  { time: 'Week 2', riskScore: 19, status: 'Safe', peakScore: 35, node05Risk: 42, node03Risk: 31 },
  { time: 'Week 3', riskScore: 28, status: 'Warning', peakScore: 59, node05Risk: 64, node03Risk: 44 },
  { time: 'Week 4', riskScore: 24, status: 'Safe', peakScore: 68, node05Risk: 68, node03Risk: 46 }
];

// 2. Multi-Metric Environmental Historical Series (24 Hours)
export const ENVIRONMENTAL_HISTORY_24H = [
  { time: '00:00', moisture: 39.2, rainfall: 0.0, temperature: 18.4, humidity: 76.2 },
  { time: '02:00', moisture: 39.5, rainfall: 0.0, temperature: 18.0, humidity: 77.0 },
  { time: '04:00', moisture: 40.1, rainfall: 1.5, temperature: 17.6, humidity: 78.5 },
  { time: '06:00', moisture: 41.2, rainfall: 4.2, temperature: 18.2, humidity: 79.1 },
  { time: '08:00', moisture: 43.0, rainfall: 8.5, temperature: 19.4, humidity: 76.8 },
  { time: '10:00', moisture: 44.8, rainfall: 12.8, temperature: 20.6, humidity: 74.5 },
  { time: '12:00', moisture: 46.5, rainfall: 16.4, temperature: 21.9, humidity: 72.0 },
  { time: '14:00', moisture: 47.8, rainfall: 20.1, temperature: 22.8, humidity: 70.2 },
  { time: '16:00', moisture: 48.4, rainfall: 23.6, temperature: 22.2, humidity: 71.5 },
  { time: '18:00', moisture: 47.2, rainfall: 26.2, temperature: 21.5, humidity: 73.0 },
  { time: '20:00', moisture: 46.0, rainfall: 28.0, temperature: 20.8, humidity: 74.2 },
  { time: '22:00', moisture: 44.5, rainfall: 29.0, temperature: 20.1, humidity: 75.0 },
  { time: 'Now',   moisture: 42.0, rainfall: 29.0, temperature: 21.4, humidity: 72.0 }
];

// Aggregated stats for Environmental Trends tabs
export const ENVIRONMENTAL_METRIC_STATS = {
  moisture: {
    average: 46,
    min: 39,
    max: 76,
    current: 42,
    unit: '%',
    title: 'Soil Moisture'
  },
  rainfall: {
    average: 15.2,
    min: 0,
    max: 29,
    current: 12.0,
    unit: 'mm',
    title: 'Rainfall Accumulation'
  },
  temperature: {
    average: 20.4,
    min: 17.6,
    max: 23.5,
    current: 21.4,
    unit: '°C',
    title: 'Ambient Temperature'
  },
  humidity: {
    average: 74.2,
    min: 69.5,
    max: 82.0,
    current: 72.0,
    unit: '%',
    title: 'Relative Humidity'
  }
};

// 3. Ground Stability Historical Series (24 Hours)
export const STABILITY_HISTORY_24H = [
  { time: '00:00', tilt: 1.72, vibration: 0.025, thresholdTilt: 3.5, thresholdVib: 0.08 },
  { time: '02:00', tilt: 1.74, vibration: 0.026, thresholdTilt: 3.5, thresholdVib: 0.08 },
  { time: '04:00', tilt: 1.75, vibration: 0.028, thresholdTilt: 3.5, thresholdVib: 0.08 },
  { time: '06:00', tilt: 1.78, vibration: 0.030, thresholdTilt: 3.5, thresholdVib: 0.08 },
  { time: '08:00', tilt: 1.82, vibration: 0.032, thresholdTilt: 3.5, thresholdVib: 0.08 },
  { time: '10:00', tilt: 1.89, vibration: 0.035, thresholdTilt: 3.5, thresholdVib: 0.08 },
  { time: '12:00', tilt: 2.05, vibration: 0.042, thresholdTilt: 3.5, thresholdVib: 0.08 },
  { time: '14:00', tilt: 2.30, vibration: 0.055, thresholdTilt: 3.5, thresholdVib: 0.08 },
  { time: '16:00', tilt: 2.45, vibration: 0.062, thresholdTilt: 3.5, thresholdVib: 0.08 },
  { time: '18:00', tilt: 2.20, vibration: 0.048, thresholdTilt: 3.5, thresholdVib: 0.08 },
  { time: '20:00', tilt: 1.95, vibration: 0.036, thresholdTilt: 3.5, thresholdVib: 0.08 },
  { time: '22:00', tilt: 1.85, vibration: 0.032, thresholdTilt: 3.5, thresholdVib: 0.08 },
  { time: 'Now',   tilt: 1.80, vibration: 0.030, thresholdTilt: 3.5, thresholdVib: 0.08 }
];

export const STABILITY_METRIC_STATS = {
  tilt: {
    current: 1.8,
    average: 2.1,
    peak: 4.8,
    unit: '°',
    title: 'Ground Tilt Angle'
  },
  vibration: {
    current: 0.03,
    average: 0.04,
    peak: 0.11,
    unit: 'g',
    title: 'Ground Vibration (Peak Acceleration)'
  }
};

// 4. Alert Analytics Data
export const ALERT_ANALYTICS_DATA = {
  bySeverity: [
    { name: 'Warning', count: 3, color: '#D97706', bg: 'rgba(217, 119, 6, 0.1)' },
    { name: 'High Risk', count: 1, color: '#EA580C', bg: 'rgba(234, 88, 12, 0.1)' },
    { name: 'Critical', count: 0, color: '#DC2626', bg: 'rgba(220, 38, 38, 0.1)' },
    { name: 'System/Device', count: 1, color: '#4B5563', bg: 'rgba(75, 85, 99, 0.1)' }
  ],
  alertsOverTime: [
    { time: '00:00', alerts: 0, warnings: 0, highRisk: 0 },
    { time: '04:00', alerts: 0, warnings: 0, highRisk: 0 },
    { time: '08:00', alerts: 1, warnings: 1, highRisk: 0 },
    { time: '12:00', alerts: 1, warnings: 1, highRisk: 0 },
    { time: '16:00', alerts: 2, warnings: 1, highRisk: 1 },
    { time: '20:00', alerts: 1, warnings: 0, highRisk: 1 },
    { time: 'Now',   alerts: 2, warnings: 1, highRisk: 1 }
  ],
  resolution: {
    active: 2,
    acknowledged: 1,
    resolved: 3
  }
};

// 5. Sensor Availability Statistics (Illustrative Prototype Statistics)
export const SENSOR_AVAILABILITY_STATS = [
  { name: 'Soil Moisture', availability: 98, status: 'Nominal', icon: 'Droplets' },
  { name: 'Rainfall', availability: 97, status: 'Nominal', icon: 'CloudRain' },
  { name: 'Tilt', availability: 99, status: 'Optimal', icon: 'Compass' },
  { name: 'Vibration', availability: 98, status: 'Nominal', icon: 'Activity' },
  { name: 'Temperature', availability: 100, status: 'Optimal', icon: 'Thermometer' },
  { name: 'Humidity', availability: 100, status: 'Optimal', icon: 'Wind' }
];

// 6. LoRa Performance 24-Hour Telemetry Series
export const LORA_SIGNAL_QUALITY_24H = [
  { time: '00:00', rssi: -69, snr: 9.1, packets: 512, success: 99.2 },
  { time: '02:00', rssi: -70, snr: 8.9, packets: 515, success: 99.0 },
  { time: '04:00', rssi: -71, snr: 8.7, packets: 510, success: 98.8 },
  { time: '06:00', rssi: -68, snr: 9.2, packets: 520, success: 99.4 },
  { time: '08:00', rssi: -72, snr: 8.5, packets: 525, success: 98.6 },
  { time: '10:00', rssi: -74, snr: 8.2, packets: 518, success: 98.4 },
  { time: '12:00', rssi: -73, snr: 8.4, packets: 522, success: 98.5 },
  { time: '14:00', rssi: -75, snr: 8.0, packets: 514, success: 98.1 },
  { time: '16:00', rssi: -73, snr: 8.3, packets: 519, success: 98.5 },
  { time: '18:00', rssi: -74, snr: 8.2, packets: 521, success: 98.3 },
  { time: '20:00', rssi: -72, snr: 8.6, packets: 516, success: 98.7 },
  { time: '22:00', rssi: -73, snr: 8.4, packets: 517, success: 98.6 },
  { time: 'Now',   rssi: -73, snr: 8.4, packets: 518, success: 98.6 }
];

// 7. System Health Indicators
export const SYSTEM_HEALTH_STATUS = [
  { subsystem: 'Sensor Network', status: 'Healthy', level: 'good', detail: '7 of 8 nodes active & transmitting' },
  { subsystem: 'LoRa Gateway', status: 'Online', level: 'good', detail: 'EDGE-GW-01 receiving SF7 packets' },
  { subsystem: 'Data Collection', status: 'Active', level: 'good', detail: 'Real-time telemetry ingestion active' },
  { subsystem: 'Risk Analysis', status: 'Active', level: 'good', detail: 'Continuous hazard index calculation' },
  { subsystem: 'Alert System', status: 'Active', level: 'good', detail: 'De-duplicated notification triggers live' },
  { subsystem: 'Devices', status: '7 / 8 Online', level: 'warning', detail: 'Node 06 offline — West Ridge check required' }
];

// 8. Recent Pre-Generated Monitoring Reports
export const RECENT_REPORTS_ARCHIVE = [
  {
    id: 'REP-2026-09-13-D',
    title: 'Daily Monitoring Report',
    date: '13 Sep 2026',
    status: 'Generated',
    period: 'Last 24 Hours',
    size: '2.4 MB',
    type: 'Daily Telemetry & Risk Log',
    summary: 'System remains operational with one offline sensor node and two active risk alerts.'
  },
  {
    id: 'REP-2026-09-12-R',
    title: 'Risk Analysis Report',
    date: '12 Sep 2026',
    status: 'Generated',
    period: 'Last 7 Days',
    size: '4.8 MB',
    type: 'Incline Hazard Assessment',
    summary: 'Elevated pore pressure in Zone C following seasonal precipitation event.'
  },
  {
    id: 'REP-2026-09-07-W',
    title: 'Weekly System Report',
    date: '7 Sep 2026',
    status: 'Generated',
    period: 'Last 30 Days',
    size: '6.1 MB',
    type: 'Hardware & RF Network Audit',
    summary: 'Comprehensive 8-node stability and LoRa communication availability audit.'
  }
];
