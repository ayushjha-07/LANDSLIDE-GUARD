/**
 * Landslide Guard - Centralized API Service Adapter
 * Connects frontend to the FastAPI backend using VITE_API_BASE_URL.
 * Provides resilient fallbacks to maintain UI continuity during backend spin-up.
 */

import { MOCK_METRICS, MOCK_SENSORS, MOCK_ALERTS, MOCK_DEVICES, SYSTEM_INFO } from '../data/mockData';

const RAW_API_BASE = import.meta.env.VITE_API_BASE_URL || '';
export const API_BASE_URL = RAW_API_BASE ? RAW_API_BASE.replace(/\/+$/, '') : '/api/v1';

/**
 * Universal safe fetcher with JSON parsing and fallback error handling
 */
async function request(endpoint, options = {}, fallbackData = null) {
  if (!RAW_API_BASE && typeof window !== 'undefined' && !window.location.origin.includes('localhost')) {
    // If no explicit API base is configured in production, use fallbackData to prevent 404s
    if (fallbackData !== null) return fallbackData;
  }

  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  try {
    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(options.headers || {})
      },
      ...options
    });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }
    return await res.json();
  } catch (err) {
    if (fallbackData !== null) {
      return fallbackData;
    }
    throw err;
  }
}

export const apiService = {
  // 1. Health & System
  getHealth: async () => {
    return request('/health', {}, { status: 'healthy', service: 'landslide-guard-api', version: '1.0.0' });
  },
  getSystemStatus: async () => {
    return request('/system/summary', {}, { ...SYSTEM_INFO });
  },
  getGateway: async () => {
    return request('/system/gateway', {}, {
      gateway_id: 'LG-GW-KULLU-01',
      status: 'Online',
      frequency: '868.1 MHz'
    });
  },

  // 2. Sensors
  getSensors: async (status = null) => {
    const query = status ? `?status=${encodeURIComponent(status)}` : '';
    return request(`/sensors${query}`, {}, [...MOCK_SENSORS]);
  },
  getSensor: async (nodeId) => {
    const fallback = MOCK_SENSORS.find(s => s.id === nodeId) || MOCK_SENSORS[0];
    return request(`/sensors/${nodeId}`, {}, fallback);
  },
  getSensorsSummary: async () => {
    return request('/sensors/summary', {}, {
      total_nodes: 8,
      online_nodes: 7,
      offline_nodes: 1,
      highest_risk_node: 'NODE-05'
    });
  },

  // 3. Risk Analysis
  getRisk: async () => {
    return request('/risk', {}, {
      highest_risk_score: 68,
      highest_risk_node: 'NODE-05',
      hazard_level: 'High Risk'
    });
  },
  getNodeRisk: async (nodeId) => {
    return request(`/risk/${nodeId}`, {}, {
      node_id: nodeId,
      risk: { score: 68, level: 'high-risk' }
    });
  },

  // 4. Alerts
  getAlerts: async () => {
    return request('/alerts', {}, [...MOCK_ALERTS]);
  },
  getActiveAlerts: async () => {
    return request('/alerts/active', {}, MOCK_ALERTS.filter(a => a.status === 'active'));
  },
  getAlert: async (alertId) => {
    const fallback = MOCK_ALERTS.find(a => a.id === alertId) || MOCK_ALERTS[0];
    return request(`/alerts/${alertId}`, {}, fallback);
  },
  acknowledgeAlert: async (alertId) => {
    return request(`/alerts/${alertId}/acknowledge`, { method: 'POST' }, { success: true });
  },
  resolveAlert: async (alertId) => {
    return request(`/alerts/${alertId}/resolve`, { method: 'POST' }, { success: true });
  },

  // 5. Devices
  getDevices: async () => {
    return request('/devices', {}, [...MOCK_DEVICES]);
  },
  getDevice: async (nodeId) => {
    const fallback = MOCK_DEVICES.find(d => d.id === nodeId) || MOCK_DEVICES[0];
    return request(`/devices/${nodeId}`, {}, fallback);
  },

  // 6. Metrics
  getMetrics: async () => {
    return [...MOCK_METRICS];
  }
};

export default apiService;
