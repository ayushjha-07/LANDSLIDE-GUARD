/**
 * Landslide Guard - Canonical System & Infrastructure Data Model
 * Single source of truth for central edge gateway, LoRa network metrics, and overall field system status.
 */

export const SYSTEM_INFO = {
  gateway: {
    id: "EDGE-GW-01",
    name: "Central Mountain Edge Gateway",
    status: "online",
    location: "Central Monitoring Station",
    uptime: 99.2,
    frequency: "868.1 MHz",
    spreadingFactor: "SF7",
    bandwidth: "125 kHz",
    txPower: "+14 dBm",
    antennaGain: "+5.8 dBi",
    ipAddress: "192.168.10.1",
    macAddress: "B4:E6:2D:11:08:9C",
    firmware: "v3.1.2-edge",
    lastCommunication: "Just now"
  },
  network: {
    packetSuccessRate: 98.6,
    packetsReceived: 12301,
    packetsSent: 12145,
    droppedPackets: 156,
    averageRssi: -73,
    averageSnr: 8.4,
    connectedNodesTotal: 8,
    connectedNodesOnline: 7,
    connectedNodesOffline: 1,
    healthStatus: "good"
  }
};

export default SYSTEM_INFO;
