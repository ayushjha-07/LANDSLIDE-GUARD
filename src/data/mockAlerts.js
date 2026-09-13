/**
 * Landslide Guard - Canonical Alerts Data Store
 * Conforms to canonical alert model: references nodeId and maintains triggeredBy snapshots.
 */

export const INITIAL_ACTIVE_ALERTS = [
  {
    id: "ALERT-001",
    nodeId: "NODE-05",
    node: "Node 05",
    location: "Mountain Zone C",
    type: "heavy-rainfall",
    title: "Heavy Rainfall Detected",
    severity: "high-risk",
    status: "active",
    riskScore: 68,
    triggeredBy: {
      rainfall: 29.0,
      soilMoisture: 76.0,
      tilt: 4.8,
      vibration: 0.11
    },
    // Compatibility fields
    rainfall: 29.0,
    soil: 76.0,
    moisture: 76.0,
    tilt: 4.8,
    vibration: 0.11,
    battery: 73,
    signal: "-82 dBm",
    timestamp: "8 minutes ago",
    createdAt: Date.now() - 8 * 60 * 1000,
    details: "Cumulative precipitation exceeded 25 mm threshold with concurrent pore water pressure surge and slope creep displacement.",
    recommendedAction: "Increase monitoring frequency and review the affected node.",
    acknowledgedAt: null,
    resolvedAt: null
  },
  {
    id: "ALERT-002",
    nodeId: "NODE-03",
    node: "Node 03",
    location: "Mountain Zone B",
    type: "increased-moisture",
    title: "Increased Soil Moisture",
    severity: "warning",
    status: "active",
    riskScore: 46,
    triggeredBy: {
      rainfall: 21.0,
      soilMoisture: 68.0,
      tilt: 3.4,
      vibration: 0.07
    },
    // Compatibility fields
    rainfall: 21.0,
    soil: 68.0,
    moisture: 68.0,
    tilt: 3.4,
    vibration: 0.07,
    battery: 79,
    signal: "-75 dBm",
    timestamp: "2 minutes ago",
    createdAt: Date.now() - 2 * 60 * 1000,
    details: "Soil saturation reached 68% following rainfall runoff in drainage basin B. Accelerometer detects minor creep activity.",
    recommendedAction: "Inspect drainage gully runoff channels and confirm RF telemetry link stability.",
    acknowledgedAt: null,
    resolvedAt: null
  }
];

export const INITIAL_HISTORICAL_ALERTS = [
  {
    id: "ALERT-H01",
    nodeId: "NODE-02",
    node: "Node 02",
    location: "East Ridge",
    type: "vibration-spike",
    title: "Vibration Spike",
    severity: "warning",
    status: "resolved",
    riskScore: 36,
    triggeredBy: {
      rainfall: 16.0,
      soilMoisture: 48.0,
      tilt: 2.1,
      vibration: 0.088
    },
    rainfall: 16.0,
    soil: 48.0,
    moisture: 48.0,
    tilt: 2.1,
    vibration: 0.088,
    battery: 87,
    signal: "-68 dBm",
    timestamp: "24 minutes ago",
    createdAt: Date.now() - 24 * 60 * 1000,
    details: "Transient micro-seismic harmonic of 0.088g settled back to baseline 0.04g. No shear dislocation observed.",
    recommendedAction: "Routine confirmation logged. Accelerometer recalibration complete.",
    acknowledgedAt: "26 minutes ago",
    resolvedAt: "24 minutes ago"
  },
  {
    id: "ALERT-H02",
    nodeId: "NODE-07",
    node: "Node 07",
    location: "Central Slope",
    type: "tilt-variation",
    title: "Tilt Variation",
    severity: "warning",
    status: "resolved",
    riskScore: 31,
    triggeredBy: {
      rainfall: 14.0,
      soilMoisture: 44.0,
      tilt: 3.6,
      vibration: 0.03
    },
    rainfall: 14.0,
    soil: 44.0,
    moisture: 44.0,
    tilt: 3.6,
    vibration: 0.03,
    battery: 93,
    signal: "-70 dBm",
    timestamp: "1 hour ago",
    createdAt: Date.now() - 60 * 60 * 1000,
    details: "Minor thermal expansion shift of 0.18° normalized after diurnal temperature cycle peak.",
    recommendedAction: "Sensor zero-offset verified. Geotechnical baseline reset.",
    acknowledgedAt: "1 hour 5 minutes ago",
    resolvedAt: "1 hour ago"
  },
  {
    id: "ALERT-H03",
    nodeId: "NODE-03",
    node: "Node 03",
    location: "Mountain Zone B",
    type: "high-soil-moisture",
    title: "High Soil Moisture",
    severity: "warning",
    status: "resolved",
    riskScore: 42,
    triggeredBy: {
      rainfall: 18.0,
      soilMoisture: 62.0,
      tilt: 2.8,
      vibration: 0.05
    },
    rainfall: 18.0,
    soil: 62.0,
    moisture: 62.0,
    tilt: 2.8,
    vibration: 0.05,
    battery: 82,
    signal: "-73 dBm",
    timestamp: "2 hours ago",
    createdAt: Date.now() - 120 * 60 * 1000,
    details: "Runoff water accumulated temporarily along ditch line before normal gravity drainage cleared the sector.",
    recommendedAction: "Culvert cleared. Soil saturation returned to safe baseline.",
    acknowledgedAt: "2 hr 10 min ago",
    resolvedAt: "2 hr ago"
  }
];

export const OFFLINE_NODE_NOTICE = {
  id: "SYS-OFFLINE-06",
  nodeId: "NODE-06",
  node: "Node 06",
  location: "West Ridge",
  status: "Offline",
  lastCommunication: "18 min ago",
  severity: "system-warning",
  title: "Sensor Node Offline",
  details: "RF communication timeout on 868.1 MHz. Device/network packet loss, not a geotechnical landslide risk.",
  reason: "Battery voltage depleted or topographic RF obstruction along ridge terrain. Telemetry pipeline will auto-reconnect upon signal acquisition."
};

export const INITIAL_TIMELINE = [
  { time: "22:10", event: "Node 05 entered High Risk", type: "high", details: "Hazard score reached 68/100 following heavy localized rainfall" },
  { time: "22:05", event: "Rainfall increased", type: "advisory", details: "Zone C precipitation gauge registered 29 mm accumulation" },
  { time: "21:48", event: "Node 03 entered Warning", type: "warning", details: "Soil moisture climbed past 65% saturation threshold" },
  { time: "21:30", event: "Node 02 vibration returned to normal", type: "safe", details: "Micro-seismic harmonic stabilized back to 0.04g" },
];

export const NOTIFICATION_CHANNELS = [
  { name: "Dashboard", status: "Active", icon: "LayoutDashboard", badge: "Active", description: "Real-time in-app incident cards and status indicators" },
  { name: "Visual Alert", status: "Active", icon: "BellRing", badge: "Active", description: "Pulsing risk badges and top-level emergency banners" },
  { name: "Email", status: "Prototype", icon: "Mail", badge: "Prototype", description: "SMTP civil protection dispatch gateway (Configured in Settings)" },
  { name: "SMS", status: "Prototype", icon: "Smartphone", badge: "Prototype", description: "Cellular SMS emergency alert broadcast relay" },
  { name: "Buzzer / LED", status: "Hardware Integration Later", icon: "Volume2", badge: "Hardware Integration Later", description: "ESP32 GPIO physical siren relay and high-intensity strobe" },
];

export const DEMO_ALERT_STATISTICS = {
  alertsToday: 5,
  warnings: 3,
  highRisk: 1,
  critical: 0,
  resolved: 3,
  averageResponse: "4 min",
  averageResponseNote: "Demo statistic — based on simulated response cycles"
};

export const WORKFLOW_STEPS = [
  { step: 1, name: "Sensor Reading", desc: "IoT node acquires soil, rain, tilt & vibration", icon: "Radio" },
  { step: 2, name: "Condition Detection", desc: "Threshold evaluation on ESP32 & gateway", icon: "Cpu" },
  { step: 3, name: "Risk Analysis", desc: "Random Forest & LSTM hazard calculation", icon: "Activity" },
  { step: 4, name: "Risk Classification", desc: "Categorization into Safe, Warning, High, Critical", icon: "ShieldAlert" },
  { step: 5, name: "Alert Generation", desc: "De-duplicated incident snapshot created", icon: "Bell" },
  { step: 6, name: "Operator Notification", desc: "Dispatched to monitoring dashboard & siren", icon: "AlertTriangle" },
  { step: 7, name: "Acknowledge", desc: "Operator verifies incident and initiates review", icon: "CheckSquare" },
  { step: 8, name: "Resolve", desc: "Hazard remediated & archived to history", icon: "CheckCircle2" },
];
