import { MOCK_METRICS, MOCK_SENSORS, MOCK_ALERTS, MOCK_DEVICES, SYSTEM_INFO } from '../data/mockData';

export const apiService = {
  getSystemStatus: async () => {
    return { ...SYSTEM_INFO };
  },
  getMetrics: async () => {
    return [...MOCK_METRICS];
  },
  getSensors: async () => {
    return [...MOCK_SENSORS];
  },
  getAlerts: async () => {
    return [...MOCK_ALERTS];
  },
  getDevices: async () => {
    return [...MOCK_DEVICES];
  }
};

export default apiService;
