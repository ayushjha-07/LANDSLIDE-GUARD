export const SYSTEM_INFO = {
  appName: "Landslide Guard",
  tagline: "Safer Mountains, Stronger Communities",
  subtitle: "AI & Deep Learning Based IoT Landslide Early Warning System Using LoRa",
  version: "1.0.0-foundation",
  gatewayStatus: "Online",
  connectedNodes: 14,
  totalNodes: 16,
  loraFrequency: "868.1 MHz",
  aiModelActive: "LSTM-GRU Multi-Sensor Predictor v2.4",
  lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
};

export const MOCK_METRICS = [
  {
    id: "risk-index",
    label: "Landslide Hazard Level",
    value: "Moderate (38%)",
    status: "advisory", // normal | advisory | warning | critical
    subtext: "Random Forest + LSTM score",
    trend: "+3.2% (last 6h)",
    iconName: "ShieldAlert"
  },
  {
    id: "soil-moisture",
    label: "Average Soil Moisture",
    value: "42.8 %",
    status: "normal",
    subtext: "Saturation threshold: 65%",
    trend: "+1.1% post-rainfall",
    iconName: "Droplets"
  },
  {
    id: "slope-displacement",
    label: "Slope Incline Shift",
    value: "1.8 mm",
    status: "advisory",
    subtext: "Rate: 0.12 mm/h",
    trend: "Stable creeping rate",
    iconName: "TrendingUp"
  },
  {
    id: "pore-pressure",
    label: "Pore Water Pressure",
    value: "18.4 kPa",
    status: "normal",
    subtext: "Critical limit: 32 kPa",
    trend: "-0.4 kPa vs baseline",
    iconName: "Gauge"
  }
];

export const MOCK_SENSORS = [
  {
    id: "SN-01",
    name: "North Escarpment - Upper Borehole",
    type: "Soil Moisture & Pore Pressure",
    location: "Slope Sector Alpha (El. 1,420m)",
    nodeId: "LG-NODE-01",
    moisture: "48.2 %",
    pressure: "21.6 kPa",
    displacement: "2.1 mm",
    temperature: "16.4 °C",
    battery: "94 %",
    rssi: "-72 dBm",
    status: "online",
    hazardLevel: "Advisory"
  },
  {
    id: "SN-02",
    name: "Ridge Cut Highway Retaining Wall",
    type: "Biaxial Inclinometer & Tiltmeter",
    location: "Highway Corridor KM 42+300",
    nodeId: "LG-NODE-02",
    moisture: "38.5 %",
    pressure: "14.2 kPa",
    displacement: "0.8 mm",
    temperature: "18.1 °C",
    battery: "88 %",
    rssi: "-81 dBm",
    status: "online",
    hazardLevel: "Low"
  },
  {
    id: "SN-03",
    name: "South Debris Flow Channel",
    type: "Rainfall Gauge & Geophone",
    location: "Gully Gulch Catchment Basin",
    nodeId: "LG-NODE-03",
    moisture: "59.1 %",
    pressure: "28.3 kPa",
    displacement: "3.4 mm",
    temperature: "14.9 °C",
    battery: "76 %",
    rssi: "-89 dBm",
    status: "warning",
    hazardLevel: "High"
  },
  {
    id: "SN-04",
    name: "West Terrace Residential Buffer",
    type: "Acoustic Emission & Crackmeter",
    location: "Settlement Perimeter Fence",
    nodeId: "LG-NODE-04",
    moisture: "31.0 %",
    pressure: "11.5 kPa",
    displacement: "0.2 mm",
    temperature: "17.8 °C",
    battery: "98 %",
    rssi: "-68 dBm",
    status: "online",
    hazardLevel: "Low"
  }
];

export const MOCK_TELEMETRY_SERIES = [
  { time: "00:00", displacement: 1.2, moisture: 38, rainfall: 0.0, risk: 24 },
  { time: "04:00", displacement: 1.3, moisture: 39, rainfall: 1.2, risk: 28 },
  { time: "08:00", displacement: 1.4, moisture: 43, rainfall: 4.8, risk: 36 },
  { time: "12:00", displacement: 1.6, moisture: 47, rainfall: 8.5, risk: 44 },
  { time: "16:00", displacement: 1.7, moisture: 46, rainfall: 3.2, risk: 40 },
  { time: "20:00", displacement: 1.8, moisture: 44, rainfall: 0.8, risk: 38 },
  { time: "24:00", displacement: 1.8, moisture: 42, rainfall: 0.2, risk: 35 },
];

export const MOCK_ALERTS = [
  {
    id: "ALT-104",
    severity: "warning",
    title: "Accelerated Incline Creep Detected",
    sensor: "SN-03 (Debris Channel)",
    timestamp: "18 minutes ago",
    details: "Displacement rate exceeded 0.25 mm/h threshold following 8.5 mm rainfall pulse.",
    actionRequired: "Notify slope patrol unit and prepare secondary LoRa beacon."
  },
  {
    id: "ALT-103",
    severity: "advisory",
    title: "Pore Pressure Near 70% Limit",
    sensor: "SN-01 (North Escarpment)",
    timestamp: "1 hour ago",
    details: "Pore water pressure reached 21.6 kPa. Sub-surface drainage operational.",
    actionRequired: "Monitor telemetry trends over next 6 hours."
  },
  {
    id: "ALT-102",
    severity: "info",
    title: "LoRa Gateway Handshake Synchronized",
    sensor: "Gateway GW-868-ALPHA",
    timestamp: "3 hours ago",
    details: "All 14 active remote nodes acknowledged LoRaWAN Class A payload ping.",
    actionRequired: "Routine log confirmation."
  }
];

export const MOCK_DEVICES = [
  {
    id: "LG-NODE-01",
    model: "ESP32-S3 + Semtech SX1262 LoRa",
    status: "Active",
    batteryLevel: 94,
    rssi: -72,
    snr: "+9.4 dB",
    firmware: "v2.1.0-lg",
    lastHeartbeat: "42s ago"
  },
  {
    id: "LG-NODE-02",
    model: "ESP32-WROOM-32 + SX1276 LoRa",
    status: "Active",
    batteryLevel: 88,
    rssi: -81,
    snr: "+8.1 dB",
    firmware: "v2.0.8-lg",
    lastHeartbeat: "1m 15s ago"
  },
  {
    id: "LG-NODE-03",
    model: "ESP32-S3 + Solar Harvester",
    status: "Degraded Signal",
    batteryLevel: 76,
    rssi: -89,
    snr: "+4.2 dB",
    firmware: "v2.1.0-lg",
    lastHeartbeat: "2m 04s ago"
  },
  {
    id: "LG-NODE-04",
    model: "ESP32-C3 Ultra-Low Power",
    status: "Active",
    batteryLevel: 98,
    rssi: -68,
    snr: "+11.0 dB",
    firmware: "v2.1.2-lg",
    lastHeartbeat: "28s ago"
  }
];
