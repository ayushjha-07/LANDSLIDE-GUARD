/**
 * Landslide Guard - Device & LoRa Network Mock Data
 * Hardware specifications, simulated gateway metrics, RF telemetry, and activity logs.
 */

export const GATEWAY_INFO = {
  id: "EDGE-GW-01",
  name: "Central Mountain Edge Gateway",
  status: "Online",
  location: "Central Monitoring Station",
  connectedNodes: "7 / 8",
  totalNodes: 8,
  onlineNodes: 7,
  offlineNodes: 1,
  signalQuality: "Good",
  uptime: "99.2%",
  lastCommunication: "Just now",
  frequency: "868.1 MHz",
  spreadingFactor: "SF7",
  bandwidth: "125 kHz",
  txPower: "+14 dBm",
  antennaGain: "+5.8 dBi",
  ipAddress: "192.168.10.1",
  macAddress: "B4:E6:2D:11:08:9C",
  firmware: "v3.1.2-edge"
};

export const COMMUNICATION_STATS = {
  packetsReceived: 12301,
  packetsSent: 12145,
  packetSuccess: 98.6,
  dropped: 156,
  avgRssi: -73,
  avgSnr: 8.4,
  label: "Simulated LoRa network statistics. Values represent automated telemetry exchange."
};

export const DEVICE_HEALTH_OVERVIEW = {
  score: 84,
  status: "Healthy",
  breakdown: {
    connectivity: 92,
    battery: 73,
    packetDelivery: 98,
    sensorAvailability: 100
  },
  label: "Simulated Device Health — Prototype Health Score"
};

export const SIGNAL_STRENGTH_SERIES = [
  { time: "06:00", rssi: -68, avg: -69, label: "Good" },
  { time: "08:00", rssi: -71, avg: -70, label: "Good" },
  { time: "10:00", rssi: -73, avg: -72, label: "Good" },
  { time: "12:00", rssi: -70, avg: -71, label: "Good" },
  { time: "14:00", rssi: -75, avg: -73, label: "Good" },
  { time: "16:00", rssi: -72, avg: -72, label: "Good" },
  { time: "18:00", rssi: -74, avg: -73, label: "Good" },
  { time: "20:00", rssi: -71, avg: -72, label: "Good" },
  { time: "22:00", rssi: -73, avg: -72, label: "Good" },
  { time: "Now",   rssi: -73, avg: -73, label: "Good" }
];

export const PACKET_DELIVERY_SERIES = [
  { time: "00:00", received: 512, sent: 508, dropped: 4 },
  { time: "03:00", received: 520, sent: 515, dropped: 5 },
  { time: "06:00", received: 510, sent: 503, dropped: 7 },
  { time: "09:00", received: 525, sent: 518, dropped: 7 },
  { time: "12:00", received: 518, sent: 512, dropped: 6 },
  { time: "15:00", received: 514, sent: 508, dropped: 6 },
  { time: "18:00", received: 522, sent: 515, dropped: 7 },
  { time: "21:00", received: 516, sent: 510, dropped: 6 }
];

export const RECENT_NETWORK_ACTIVITY = [
  {
    id: "act-1",
    timestamp: "Just now",
    node: "Node 03",
    location: "Mountain Zone B",
    event: "Packet received",
    detail: "Borehole & soil moisture telemetry packet received via SF7",
    type: "packet",
    status: "success"
  },
  {
    id: "act-2",
    timestamp: "1 min ago",
    node: "Node 05",
    location: "Mountain Zone C",
    event: "Packet received",
    detail: "Heavy rainfall telemetry packet received (RSSI: -82 dBm)",
    type: "packet",
    status: "warning"
  },
  {
    id: "act-3",
    timestamp: "2 min ago",
    node: "Node 01",
    location: "North Slope",
    event: "Heartbeat received",
    detail: "Routine health ping acknowledged, battery 91%",
    type: "heartbeat",
    status: "success"
  },
  {
    id: "act-4",
    timestamp: "3 min ago",
    node: "Node 07",
    location: "Central Slope",
    event: "Telemetry received",
    detail: "Dual-axis inclination and vibration packet confirmed",
    type: "packet",
    status: "success"
  },
  {
    id: "act-5",
    timestamp: "18 min ago",
    node: "Node 06",
    location: "West Ridge",
    event: "Connection lost",
    detail: "RF signal timeout on 868.1 MHz. Station packet heartbeat failed",
    type: "offline",
    status: "critical"
  }
];

export const DEVICE_ALERTS = [
  {
    id: "dev-alert-1",
    node: "Node 06",
    title: "Node 06 Offline",
    location: "West Ridge",
    severity: "System Warning",
    timestamp: "18 min ago",
    type: "Network Connectivity",
    detail: "RF signal timeout on 868.1 MHz. Communication lost. Does NOT indicate geotechnical landslide hazard.",
    action: "Check gateway antenna line-of-sight and station power supply."
  },
  {
    id: "dev-alert-2",
    node: "Node 05",
    title: "Node 05 Weak LoRa Signal",
    location: "Mountain Zone C",
    severity: "System Notice",
    timestamp: "Just now",
    type: "RF Attenuation",
    signal: "-82 dBm",
    detail: "LoRa signal strength attenuated to -82 dBm due to dense rain canopy and ridge deflection.",
    action: "Verify Fresnel zone clearance; signal remains within acceptable reception threshold."
  }
];

export const PROTOTYPE_HARDWARE_LIST = [
  {
    name: "ESP32-WROOM-32",
    category: "Microcontroller",
    role: "Sensor Controller & Edge Processing",
    specs: "Dual-core Xtensa 240MHz, 520KB SRAM, Ultra-Low-Power (ULP) co-processor for deep sleep cycles."
  },
  {
    name: "Semtech SX1276",
    category: "LoRa Module",
    role: "Long-Range Wireless Transceiver",
    specs: "868.1 MHz ISM band, +20 dBm PA output, up to 10 km range in mountain line-of-sight conditions."
  },
  {
    name: "Capacitive Soil Moisture",
    category: "Geotechnical Sensor",
    role: "Soil Moisture Saturation",
    specs: "Corrosion-resistant analog capacitive probe measuring dielectric permittivity of slope soil."
  },
  {
    name: "Tipping Bucket Rain Gauge",
    category: "Hydrological Sensor",
    role: "Rainfall Precipitation",
    specs: "0.2 mm resolution per tip, reed switch pulse counter for continuous 24-hour storm accumulation."
  },
  {
    name: "MPU6050 6-DoF IMU",
    category: "Geotechnical Sensor",
    role: "Ground Tilt & Slope Inclination",
    specs: "3-axis gyroscope and 3-axis accelerometer detecting angular creep deformation (>0.05° resolution)."
  },
  {
    name: "Piezoelectric Sensor",
    category: "Geophysical Sensor",
    role: "Micro-Seismic Ground Vibration",
    specs: "High-sensitivity vibration sensor detecting micro-fracturing acoustic emissions prior to slope shear."
  },
  {
    name: "DHT22 / SHT31",
    category: "Environmental Sensor",
    role: "Ambient Temperature & Humidity",
    specs: "Digital sensor for ambient atmospheric compensation and dew point calculation."
  }
];

export const NODE_HARDWARE_SPECS = {
  "Node 01": {
    controller: "ESP32-WROOM-32",
    communication: "LoRa (SX1276)",
    nodeType: "Wireless Geotechnical Station",
    firmware: "v2.4.1-build",
    snr: "8.4 dB",
    packetsReceived: 1482,
    packetSuccess: 99.1,
    sensors: ["Soil Moisture", "Rain Gauge", "MPU6050 Tilt", "Vibration", "Temp & Humidity"]
  },
  "Node 02": {
    controller: "ESP32-WROOM-32",
    communication: "LoRa (SX1276)",
    nodeType: "Wireless Geotechnical Station",
    firmware: "v2.4.1-build",
    snr: "8.8 dB",
    packetsReceived: 1478,
    packetSuccess: 98.8,
    sensors: ["Soil Moisture", "Rain Gauge", "MPU6050 Tilt", "Vibration", "Temp & Humidity"]
  },
  "Node 03": {
    controller: "ESP32-WROOM-32",
    communication: "LoRa (SX1276)",
    nodeType: "Wireless Geotechnical Station",
    firmware: "v2.4.1-build",
    snr: "7.9 dB",
    packetsReceived: 1482,
    packetSuccess: 98.4,
    sensors: ["Soil Moisture", "Rain Gauge", "MPU6050 Tilt", "Vibration", "Temp & Humidity"]
  },
  "Node 04": {
    controller: "ESP32-WROOM-32",
    communication: "LoRa (SX1276)",
    nodeType: "Wireless Geotechnical Station",
    firmware: "v2.4.1-build",
    snr: "9.1 dB",
    packetsReceived: 1489,
    packetSuccess: 99.5,
    sensors: ["Soil Moisture", "Rain Gauge", "MPU6050 Tilt", "Vibration", "Temp & Humidity"]
  },
  "Node 05": {
    controller: "ESP32-WROOM-32",
    communication: "LoRa (SX1276)",
    nodeType: "Wireless Geotechnical Station",
    firmware: "v2.4.1-build",
    snr: "6.2 dB",
    packetsReceived: 1823,
    packetSuccess: 97.8,
    sensors: ["Soil Moisture", "Rain Gauge", "MPU6050 Tilt", "Vibration", "Temp & Humidity"]
  },
  "Node 06": {
    controller: "ESP32-WROOM-32",
    communication: "LoRa (SX1276)",
    nodeType: "Wireless Geotechnical Station",
    firmware: "v2.3.9-legacy",
    snr: "Unavailable",
    packetsReceived: 980,
    packetSuccess: 82.0,
    sensors: ["Soil Moisture", "Rain Gauge", "MPU6050 Tilt", "Vibration", "Temp & Humidity"]
  },
  "Node 07": {
    controller: "ESP32-WROOM-32",
    communication: "LoRa (SX1276)",
    nodeType: "Wireless Geotechnical Station",
    firmware: "v2.4.1-build",
    snr: "8.5 dB",
    packetsReceived: 1475,
    packetSuccess: 98.7,
    sensors: ["Soil Moisture", "Rain Gauge", "MPU6050 Tilt", "Vibration", "Temp & Humidity"]
  },
  "Node 08": {
    controller: "ESP32-WROOM-32",
    communication: "LoRa (SX1276)",
    nodeType: "Wireless Geotechnical Station",
    firmware: "v2.4.1-build",
    snr: "9.4 dB",
    packetsReceived: 1492,
    packetSuccess: 99.6,
    sensors: ["Soil Moisture", "Rain Gauge", "MPU6050 Tilt", "Vibration", "Temp & Humidity"]
  }
};
