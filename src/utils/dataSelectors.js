/**
 * Landslide Guard - Pure Application Data Selectors
 * Centralized selector functions to derive metrics, counts, and node states
 * directly from the canonical data model across all pages.
 */

import { RISK_THRESHOLDS, RISK_LEVELS } from '../data/riskConfig';

// 1. Node Lookup by ID or Name
export const getNodeById = (nodes = [], identifier = '') => {
  if (!identifier) return null;
  const cleanId = String(identifier).trim().toUpperCase();
  const normalizedSearch = cleanId.replace(/\s+/g, '-').replace('NODE-', 'NODE-');
  
  return nodes.find(n => {
    const nId = String(n.id).toUpperCase();
    const nName = String(n.name).toUpperCase();
    return nId === cleanId || nName === cleanId || nId.replace('-', ' ') === cleanId || nId === normalizedSearch;
  }) || null;
};

// 2. Online & Offline Node Selectors
export const getOnlineNodes = (nodes = []) => {
  return nodes.filter(n => n.status?.toLowerCase() === 'online');
};

export const getOfflineNodes = (nodes = []) => {
  return nodes.filter(n => n.status?.toLowerCase() === 'offline');
};

export const getOnlineNodeCount = (nodes = []) => {
  return getOnlineNodes(nodes).length;
};

export const getOfflineNodeCount = (nodes = []) => {
  return getOfflineNodes(nodes).length;
};

// 3. Risk-Based Node Filtering
export const getRiskNodes = (nodes = [], level = RISK_LEVELS.SAFE) => {
  return nodes.filter(n => n.risk?.level === level);
};

// 4. Canonical Risk Distribution
// Exactly matches: 5 Safe + 1 Warning + 1 High Risk + 1 Unknown/Offline = 8 nodes
export const getRiskDistribution = (nodes = []) => {
  const online = getOnlineNodes(nodes);
  const offline = getOfflineNodes(nodes);

  const safe = online.filter(n => n.risk?.level === 'safe').length;
  const warning = online.filter(n => n.risk?.level === 'warning').length;
  const highRisk = online.filter(n => n.risk?.level === 'high-risk').length;
  const critical = online.filter(n => n.risk?.level === 'critical').length;
  const unknown = offline.length + online.filter(n => n.risk?.level === 'unknown').length;

  return {
    safe,
    warning,
    highRisk,
    critical,
    unknown,
    offline: offline.length,
    total: nodes.length
  };
};

// 5. Highest Risk Node
export const getHighestRiskNode = (nodes = []) => {
  const online = getOnlineNodes(nodes);
  if (online.length === 0) return null;

  let highest = online[0];
  for (const node of online) {
    const currentScore = node.risk?.score ?? -1;
    const maxScore = highest.risk?.score ?? -1;
    if (currentScore > maxScore) {
      highest = node;
    }
  }
  return highest;
};

// 6. Average Risk Score across Online Nodes
export const getAverageRisk = (nodes = []) => {
  const online = getOnlineNodes(nodes).filter(n => typeof n.risk?.score === 'number');
  if (online.length === 0) return 0;
  const total = online.reduce((sum, n) => sum + n.risk.score, 0);
  return Math.round(total / online.length);
};

// 7. Average Sensor Value across Online Nodes
export const getAverageSensorValue = (nodes = [], sensorKey = 'soilMoisture') => {
  const online = getOnlineNodes(nodes);
  const valid = online
    .map(n => n.readings?.[sensorKey]?.value)
    .filter(v => typeof v === 'number');

  if (valid.length === 0) return 0;
  const total = valid.reduce((sum, v) => sum + v, 0);
  return Number((total / valid.length).toFixed(1));
};

// 8. Network Summary Derivation
export const getNetworkSummary = (system = {}, nodes = []) => {
  const onlineCount = getOnlineNodeCount(nodes);
  const offlineCount = getOfflineNodeCount(nodes);
  const totalCount = nodes.length;

  return {
    gatewayId: system.gateway?.id || 'EDGE-GW-01',
    gatewayStatus: system.gateway?.status || 'online',
    connectedRatio: `${onlineCount} / ${totalCount}`,
    packetSuccessRate: system.network?.packetSuccessRate || 98.6,
    avgRssi: system.network?.averageRssi || -73,
    avgSnr: system.network?.averageSnr || 8.4,
    droppedPackets: system.network?.droppedPackets || 156,
    healthStatus: system.network?.healthStatus || 'good'
  };
};

// 9. Alert Statistics Derivation
export const getAlertCounts = (alerts = []) => {
  const active = alerts.filter(a => a.status === 'active');
  const acknowledged = alerts.filter(a => a.status === 'acknowledged');
  const resolved = alerts.filter(a => a.status === 'resolved');

  const warnings = alerts.filter(a => a.severity === 'warning');
  const highRisk = alerts.filter(a => a.severity === 'high-risk');
  const critical = alerts.filter(a => a.severity === 'critical');
  const system = alerts.filter(a => a.severity === 'system-warning' || a.severity === 'system');

  return {
    total: alerts.length,
    activeCount: active.length,
    acknowledgedCount: acknowledged.length,
    resolvedCount: resolved.length,
    warningsCount: warnings.length,
    highRiskCount: highRisk.length,
    criticalCount: critical.length,
    systemCount: system.length
  };
};

// 10. Formatters for Display
export const formatRiskLevel = (level = 'safe') => {
  switch (String(level).toLowerCase()) {
    case 'critical':
      return 'Critical';
    case 'high-risk':
    case 'high risk':
    case 'high':
      return 'High Risk';
    case 'warning':
      return 'Warning';
    case 'unknown':
      return 'Unknown';
    case 'safe':
    default:
      return 'Safe';
  }
};

export const formatSensorReading = (reading) => {
  if (!reading || reading.value === null || reading.value === undefined) {
    return '—';
  }
  return `${reading.value} ${reading.unit || ''}`.trim();
};
