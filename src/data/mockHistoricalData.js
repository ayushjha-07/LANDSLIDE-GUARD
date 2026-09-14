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

// 2. Multi-Metric Environmental Historical Series (Detailed 24 Hours - 25 Hourly Points)
export const DETAILED_ENV_SERIES_24H = [
  { time: '00:00', moisture: 38.2, rainfall: 0.0, rainfallIntensity: 0.0, temperature: 18.2, humidity: 76.5, status: 'Normal' },
  { time: '01:00', moisture: 38.4, rainfall: 0.0, rainfallIntensity: 0.0, temperature: 17.9, humidity: 77.0, status: 'Normal' },
  { time: '02:00', moisture: 38.6, rainfall: 0.0, rainfallIntensity: 0.0, temperature: 17.5, humidity: 77.8, status: 'Normal' }, // Min Temp (17.5°C)
  { time: '03:00', moisture: 38.8, rainfall: 0.0, rainfallIntensity: 0.0, temperature: 17.6, humidity: 78.2, status: 'Normal' },
  { time: '04:00', moisture: 39.0, rainfall: 0.2, rainfallIntensity: 0.2, temperature: 17.8, humidity: 78.4, status: 'Normal' },
  { time: '05:00', moisture: 39.3, rainfall: 0.5, rainfallIntensity: 0.3, temperature: 18.1, humidity: 77.9, status: 'Normal' },
  { time: '06:00', moisture: 39.8, rainfall: 0.8, rainfallIntensity: 0.3, temperature: 18.5, humidity: 77.0, status: 'Normal' },
  { time: '07:00', moisture: 40.1, rainfall: 1.1, rainfallIntensity: 0.3, temperature: 19.1, humidity: 76.2, status: 'Normal' },
  { time: '08:00', moisture: 40.5, rainfall: 1.5, rainfallIntensity: 0.4, temperature: 19.8, humidity: 75.1, status: 'Normal' },
  { time: '09:00', moisture: 41.0, rainfall: 2.2, rainfallIntensity: 0.7, temperature: 20.4, humidity: 74.5, status: 'Normal' },
  { time: '10:00', moisture: 41.5, rainfall: 3.2, rainfallIntensity: 1.0, temperature: 21.0, humidity: 73.8, status: 'Normal' },
  { time: '11:00', moisture: 42.1, rainfall: 4.3, rainfallIntensity: 1.1, temperature: 21.8, humidity: 72.6, status: 'Normal' },
  { time: '12:00', moisture: 42.8, rainfall: 5.5, rainfallIntensity: 1.2, temperature: 22.5, humidity: 71.5, status: 'Normal' },
  { time: '13:00', moisture: 43.4, rainfall: 8.2, rainfallIntensity: 2.7, temperature: 22.7, humidity: 70.8, status: 'Normal' },
  { time: '14:00', moisture: 43.8, rainfall: 11.2, rainfallIntensity: 3.0, temperature: 22.8, humidity: 70.2, status: 'Normal' }, // Peak Temp (22.8°C)
  { time: '15:00', moisture: 43.6, rainfall: 12.4, rainfallIntensity: 1.2, temperature: 22.5, humidity: 71.0, status: 'Normal' },
  { time: '16:00', moisture: 43.2, rainfall: 13.0, rainfallIntensity: 0.6, temperature: 22.0, humidity: 71.9, status: 'Normal' },
  { time: '17:00', moisture: 43.0, rainfall: 13.8, rainfallIntensity: 0.8, temperature: 21.6, humidity: 72.8, status: 'Normal' },
  { time: '18:00', moisture: 42.9, rainfall: 14.5, rainfallIntensity: 0.7, temperature: 21.2, humidity: 73.6, status: 'Normal' },
  { time: '19:00', moisture: 42.8, rainfall: 14.5, rainfallIntensity: 0.0, temperature: 20.8, humidity: 74.5, status: 'Normal' },
  { time: '20:00', moisture: 42.7, rainfall: 14.5, rainfallIntensity: 0.0, temperature: 20.4, humidity: 75.2, status: 'Normal' },
  { time: '21:00', moisture: 42.6, rainfall: 14.5, rainfallIntensity: 0.0, temperature: 20.0, humidity: 75.8, status: 'Normal' },
  { time: '22:00', moisture: 42.5, rainfall: 14.5, rainfallIntensity: 0.0, temperature: 19.6, humidity: 76.4, status: 'Normal' },
  { time: '23:00', moisture: 42.4, rainfall: 13.5, rainfallIntensity: 0.0, temperature: 19.2, humidity: 76.9, status: 'Normal' },
  { time: 'Now',   moisture: 42.4, rainfall: 12.0, rainfallIntensity: 0.0, temperature: 21.6, humidity: 72.0, status: 'Normal' }
];

export const ENVIRONMENTAL_HISTORY_24H = DETAILED_ENV_SERIES_24H;

// 3. Ground Stability Historical Series (Detailed 24 Hours - 25 Hourly Points)
export const DETAILED_STABILITY_SERIES_24H = [
  { time: '00:00', tilt: 1.10, vibration: 0.025, change: '0.00°', status: 'Normal', thresholdTilt: 3.5, thresholdVib: 0.05 },
  { time: '01:00', tilt: 1.12, vibration: 0.026, change: '+0.02°', status: 'Normal', thresholdTilt: 3.5, thresholdVib: 0.05 },
  { time: '02:00', tilt: 1.16, vibration: 0.027, change: '+0.06°', status: 'Normal', thresholdTilt: 3.5, thresholdVib: 0.05 },
  { time: '03:00', tilt: 1.12, vibration: 0.028, change: '+0.02°', status: 'Normal', thresholdTilt: 3.5, thresholdVib: 0.05 },
  { time: '04:00', tilt: 1.08, vibration: 0.029, change: '-0.02°', status: 'Normal', thresholdTilt: 3.5, thresholdVib: 0.05 }, // Min Tilt (1.08°)
  { time: '05:00', tilt: 1.15, vibration: 0.029, change: '+0.05°', status: 'Normal', thresholdTilt: 3.5, thresholdVib: 0.05 },
  { time: '06:00', tilt: 1.25, vibration: 0.030, change: '+0.15°', status: 'Normal', thresholdTilt: 3.5, thresholdVib: 0.05 },
  { time: '07:00', tilt: 1.42, vibration: 0.031, change: '+0.32°', status: 'Normal', thresholdTilt: 3.5, thresholdVib: 0.05 },
  { time: '08:00', tilt: 1.58, vibration: 0.033, change: '+0.48°', status: 'Normal', thresholdTilt: 3.5, thresholdVib: 0.05 },
  { time: '09:00', tilt: 1.66, vibration: 0.032, change: '+0.56°', status: 'Normal', thresholdTilt: 3.5, thresholdVib: 0.05 },
  { time: '10:00', tilt: 1.72, vibration: 0.033, change: '+0.62°', status: 'Normal', thresholdTilt: 3.5, thresholdVib: 0.05 },
  { time: '11:00', tilt: 1.70, vibration: 0.034, change: '+0.60°', status: 'Normal', thresholdTilt: 3.5, thresholdVib: 0.05 },
  { time: '12:00', tilt: 1.66, vibration: 0.035, change: '+0.56°', status: 'Normal', thresholdTilt: 3.5, thresholdVib: 0.05 },
  { time: '13:00', tilt: 1.78, vibration: 0.036, change: '+0.68°', status: 'Normal', thresholdTilt: 3.5, thresholdVib: 0.05 },
  { time: '14:00', tilt: 1.92, vibration: 0.038, change: '+0.82°', status: 'Normal', thresholdTilt: 3.5, thresholdVib: 0.05 }, // Peak Tilt (1.92°) & Peak Vib (0.038g)
  { time: '15:00', tilt: 1.82, vibration: 0.035, change: '+0.72°', status: 'Normal', thresholdTilt: 3.5, thresholdVib: 0.05 },
  { time: '16:00', tilt: 1.68, vibration: 0.030, change: '+0.58°', status: 'Normal', thresholdTilt: 3.5, thresholdVib: 0.05 },
  { time: '17:00', tilt: 1.55, vibration: 0.029, change: '+0.45°', status: 'Normal', thresholdTilt: 3.5, thresholdVib: 0.05 },
  { time: '18:00', tilt: 1.45, vibration: 0.028, change: '+0.35°', status: 'Normal', thresholdTilt: 3.5, thresholdVib: 0.05 },
  { time: '19:00', tilt: 1.52, vibration: 0.029, change: '+0.42°', status: 'Normal', thresholdTilt: 3.5, thresholdVib: 0.05 },
  { time: '20:00', tilt: 1.62, vibration: 0.031, change: '+0.52°', status: 'Normal', thresholdTilt: 3.5, thresholdVib: 0.05 },
  { time: '21:00', tilt: 1.66, vibration: 0.030, change: '+0.56°', status: 'Normal', thresholdTilt: 3.5, thresholdVib: 0.05 },
  { time: '22:00', tilt: 1.71, vibration: 0.029, change: '+0.61°', status: 'Normal', thresholdTilt: 3.5, thresholdVib: 0.05 },
  { time: '23:00', tilt: 1.74, vibration: 0.031, change: '+0.64°', status: 'Normal', thresholdTilt: 3.5, thresholdVib: 0.05 },
  { time: 'Now',   tilt: 1.77, vibration: 0.033, change: '+0.08°', status: 'Normal', thresholdTilt: 3.5, thresholdVib: 0.05 }
];

export const STABILITY_HISTORY_24H = DETAILED_STABILITY_SERIES_24H;

export const ENVIRONMENTAL_METRIC_STATS = {
  moisture: {
    current: 41.2,
    average: 41.5,
    peak: 43.8,
    unit: '%',
    title: 'Soil Moisture'
  },
  rainfall: {
    current: 12.0,
    average: 8.5,
    peak: 14.5,
    unit: 'mm',
    title: 'Rainfall Accumulation'
  },
  temperature: {
    current: 21.6,
    average: 20.4,
    peak: 22.8,
    unit: '°C',
    title: 'Ambient Temperature'
  },
  humidity: {
    current: 76.5,
    average: 74.2,
    peak: 78.4,
    unit: '%',
    title: 'Relative Humidity'
  }
};

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

// 9. 24-Hour Overall Risk Score Trend Series (High-Density Zig-Zag Geotechnical Strain)
export const RISK_SCORE_HISTORY_24H = [
  { time: '00:00', score: 20, status: 'Safe' },
  { time: '00:40', score: 22, status: 'Safe' },
  { time: '01:20', score: 19, status: 'Safe' },
  { time: '02:00', score: 23, status: 'Safe' },
  { time: '02:40', score: 20, status: 'Safe' },
  { time: '03:20', score: 24, status: 'Safe' },
  { time: '04:00', score: 21, status: 'Safe' },
  { time: '04:40', score: 23, status: 'Safe' },
  { time: '05:20', score: 20, status: 'Safe' },
  { time: '06:00', score: 24, status: 'Safe' },
  { time: '06:40', score: 22, status: 'Safe' },
  { time: '07:20', score: 25, status: 'Safe' },
  { time: '08:00', score: 23, status: 'Safe' },
  { time: '08:40', score: 27, status: 'Safe' },
  { time: '09:20', score: 24, status: 'Safe' },
  { time: '10:00', score: 28, status: 'Safe' },
  { time: '10:40', score: 25, status: 'Safe' },
  { time: '11:20', score: 27, status: 'Safe' },
  { time: '12:00', score: 24, status: 'Safe' },
  { time: '12:40', score: 28, status: 'Safe' },
  { time: '13:20', score: 25, status: 'Safe' },
  { time: '14:00', score: 29, status: 'Safe' },
  { time: '14:40', score: 26, status: 'Safe' },
  { time: '15:20', score: 28, status: 'Safe' },
  { time: '16:00', score: 24, status: 'Safe' },
  { time: '16:40', score: 26, status: 'Safe' },
  { time: '17:20', score: 23, status: 'Safe' },
  { time: '18:00', score: 25, status: 'Safe' },
  { time: '18:40', score: 22, status: 'Safe' },
  { time: '19:20', score: 24, status: 'Safe' },
  { time: '20:00', score: 21, status: 'Safe' },
  { time: '20:40', score: 24, status: 'Safe' },
  { time: '21:20', score: 22, status: 'Safe' },
  { time: '22:00', score: 23, status: 'Safe' },
  { time: '22:40', score: 21, status: 'Safe' },
  { time: '23:20', score: 23, status: 'Safe' },
  { time: 'Now',   score: 22, status: 'Safe' }
];

// 10. Multi-Horizon Risk Prediction Series (Prototype 8H Horizon - Detailed Zig-Zag Projections)
export const RISK_PREDICTION_SERIES_8H = [
  { time: 'Now',   low: 19.0, moderate: 22.0, high: 25.0 },
  { time: '+20m',  low: 21.2, moderate: 24.8, high: 28.4 },
  { time: '+40m',  low: 19.8, moderate: 23.0, high: 26.6 },
  { time: '+1h',   low: 22.4, moderate: 26.2, high: 30.0 },
  { time: '+1h20', low: 20.6, moderate: 24.1, high: 27.8 },
  { time: '+1h40', low: 23.0, moderate: 27.0, high: 31.0 },
  { time: '+2h',   low: 21.4, moderate: 25.2, high: 29.2 },
  { time: '+2h20', low: 23.8, moderate: 27.8, high: 32.0 },
  { time: '+2h40', low: 22.0, moderate: 25.9, high: 30.2 },
  { time: '+3h',   low: 24.2, moderate: 28.5, high: 33.0 },
  { time: '+3h20', low: 22.5, moderate: 26.4, high: 30.8 },
  { time: '+3h40', low: 24.0, moderate: 27.9, high: 32.2 },
  { time: '+4h',   low: 22.2, moderate: 25.8, high: 29.8 },
  { time: '+4h20', low: 23.6, moderate: 27.2, high: 31.2 },
  { time: '+4h40', low: 21.8, moderate: 25.0, high: 28.6 },
  { time: '+5h',   low: 23.2, moderate: 26.5, high: 30.4 },
  { time: '+5h20', low: 21.4, moderate: 24.6, high: 28.2 },
  { time: '+5h40', low: 22.8, moderate: 25.8, high: 29.6 },
  { time: '+6h',   low: 20.8, moderate: 23.9, high: 27.4 },
  { time: '+6h20', low: 22.2, moderate: 25.1, high: 28.8 },
  { time: '+6h40', low: 20.2, moderate: 23.2, high: 26.8 },
  { time: '+7h',   low: 21.6, moderate: 24.5, high: 28.0 },
  { time: '+7h20', low: 19.8, moderate: 22.6, high: 26.0 },
  { time: '+7h40', low: 21.0, moderate: 23.8, high: 27.2 },
  { time: '+8h',   low: 19.2, moderate: 22.0, high: 25.5 }
];

// 11. Deterministic High-Frequency Sparklines for Key Measurements Cards (37 High-Detail Zig-Zag Points)
export const KEY_MEASUREMENTS_SPARKLINES_24H = [
  { time: '00:00', moisture: 39.2, rainBar: 0.2, tilt: 1.25, vibration: 0.021 },
  { time: '00:40', moisture: 40.8, rainBar: 0.9, tilt: 1.42, vibration: 0.034 },
  { time: '01:20', moisture: 39.5, rainBar: 0.1, tilt: 1.31, vibration: 0.019 },
  { time: '02:00', moisture: 41.2, rainBar: 1.8, tilt: 1.54, vibration: 0.038 },
  { time: '02:40', moisture: 40.0, rainBar: 0.4, tilt: 1.38, vibration: 0.022 },
  { time: '03:20', moisture: 41.8, rainBar: 2.6, tilt: 1.62, vibration: 0.044 },
  { time: '04:00', moisture: 40.5, rainBar: 0.8, tilt: 1.46, vibration: 0.025 },
  { time: '04:40', moisture: 42.4, rainBar: 3.9, tilt: 1.73, vibration: 0.049 },
  { time: '05:20', moisture: 41.1, rainBar: 1.4, tilt: 1.57, vibration: 0.024 },
  { time: '06:00', moisture: 42.9, rainBar: 5.2, tilt: 1.82, vibration: 0.046 },
  { time: '06:40', moisture: 41.6, rainBar: 2.1, tilt: 1.66, vibration: 0.027 },
  { time: '07:20', moisture: 43.5, rainBar: 7.8, tilt: 1.91, vibration: 0.052 },
  { time: '08:00', moisture: 42.1, rainBar: 3.4, tilt: 1.74, vibration: 0.028 },
  { time: '08:40', moisture: 44.0, rainBar: 9.6, tilt: 1.96, vibration: 0.047 },
  { time: '09:20', moisture: 42.7, rainBar: 4.2, tilt: 1.80, vibration: 0.023 },
  { time: '10:00', moisture: 44.4, rainBar: 8.1, tilt: 1.92, vibration: 0.043 },
  { time: '10:40', moisture: 43.1, rainBar: 3.5, tilt: 1.76, vibration: 0.025 },
  { time: '11:20', moisture: 43.9, rainBar: 6.4, tilt: 1.88, vibration: 0.039 },
  { time: '12:00', moisture: 42.5, rainBar: 2.0, tilt: 1.72, vibration: 0.021 },
  { time: '12:40', moisture: 43.4, rainBar: 4.5, tilt: 1.84, vibration: 0.037 },
  { time: '13:20', moisture: 42.0, rainBar: 1.1, tilt: 1.68, vibration: 0.024 },
  { time: '14:00', moisture: 43.1, rainBar: 3.2, tilt: 1.79, vibration: 0.036 },
  { time: '14:40', moisture: 41.7, rainBar: 0.6, tilt: 1.65, vibration: 0.022 },
  { time: '15:20', moisture: 42.8, rainBar: 2.0, tilt: 1.78, vibration: 0.035 },
  { time: '16:00', moisture: 41.5, rainBar: 0.2, tilt: 1.66, vibration: 0.024 },
  { time: '16:40', moisture: 42.6, rainBar: 1.4, tilt: 1.79, vibration: 0.038 },
  { time: '17:20', moisture: 41.2, rainBar: 0.0, tilt: 1.69, vibration: 0.025 },
  { time: '18:00', moisture: 42.5, rainBar: 0.8, tilt: 1.81, vibration: 0.036 },
  { time: '18:40', moisture: 41.4, rainBar: 0.1, tilt: 1.72, vibration: 0.023 },
  { time: '19:20', moisture: 42.6, rainBar: 0.5, tilt: 1.83, vibration: 0.034 },
  { time: '20:00', moisture: 41.8, rainBar: 0.0, tilt: 1.74, vibration: 0.024 },
  { time: '20:40', moisture: 42.4, rainBar: 0.3, tilt: 1.84, vibration: 0.033 },
  { time: '21:20', moisture: 41.6, rainBar: 0.0, tilt: 1.76, vibration: 0.025 },
  { time: '22:00', moisture: 42.5, rainBar: 0.1, tilt: 1.85, vibration: 0.034 },
  { time: '22:40', moisture: 41.9, rainBar: 0.0, tilt: 1.78, vibration: 0.026 },
  { time: '23:20', moisture: 42.3, rainBar: 0.0, tilt: 1.86, vibration: 0.033 },
  { time: 'Now',   moisture: 42.4, rainBar: 0.0, tilt: 1.86, vibration: 0.033 }
];


