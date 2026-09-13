import { useState, useMemo } from 'react';
import { NODE_HARDWARE_SPECS } from '../data/mockDeviceData';

export const useDeviceFilters = (nodes = []) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [deviceFilter, setDeviceFilter] = useState('All');
  const [healthFilter, setHealthFilter] = useState('All');
  const [sortBy, setSortBy] = useState('nodeId');

  // Enrich each node with hardware specs & health classification
  const enrichedNodes = useMemo(() => {
    return nodes.map(node => {
      const hw = NODE_HARDWARE_SPECS[node.id] || NODE_HARDWARE_SPECS[node.name] || {
        controller: node.device?.controller || 'ESP32-WROOM-32',
        communication: node.device?.communication || 'LoRa (SX1276)',
        nodeType: 'Wireless Sensor Node',
        firmware: 'v2.4.1',
        snr: node.device?.snr ? `${node.device.snr} dB` : 'Unavailable',
        packetsReceived: node.device?.packets?.received || node.packets || 1480,
        packetSuccess: node.device?.packets?.successRate || node.packetSuccess || 98.5,
        sensors: ['Soil Moisture', 'Rain Gauge', 'MPU6050 Tilt', 'Vibration', 'Temp & Humidity']
      };

      // Device Health category (strictly independent from geotechnical landslide risk)
      let deviceHealth = 'Healthy';
      let healthBadge = 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-400';

      if (node.status?.toLowerCase() === 'offline') {
        deviceHealth = 'Critical';
        healthBadge = 'bg-red-500/10 border-red-500/30 text-red-700 dark:text-red-400';
      } else if (node.battery < 75 || (node.signalStrength && node.signalStrength <= -80)) {
        deviceHealth = 'Attention';
        healthBadge = 'bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-400';
      }

      return {
        ...node,
        ...hw,
        deviceHealth,
        healthBadge
      };
    });
  }, [nodes]);

  // Filter and sort
  const filteredDevices = useMemo(() => {
    let result = enrichedNodes.filter(device => {
      // 1. Search filter
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesId = device.id?.toLowerCase().includes(query) || device.name?.toLowerCase().includes(query);
        const locName = (device.location?.name || device.location || '').toLowerCase();
        const matchesLoc = locName.includes(query);
        const matchesCtrl = device.controller?.toLowerCase().includes(query);
        const matchesComm = device.communication?.toLowerCase().includes(query);
        if (!matchesId && !matchesLoc && !matchesCtrl && !matchesComm) {
          return false;
        }
      }

      // 2. Status filter
      if (statusFilter !== 'All') {
        if (device.status?.toLowerCase() !== statusFilter.toLowerCase()) {
          return false;
        }
      }

      // 3. Device filter
      if (deviceFilter !== 'All') {
        if (deviceFilter === 'ESP32' && !device.controller?.includes('ESP32')) return false;
        if (deviceFilter === 'LoRa' && !device.communication?.includes('LoRa')) return false;
      }

      // 4. Health filter
      if (healthFilter !== 'All') {
        if (device.deviceHealth?.toLowerCase() !== healthFilter.toLowerCase()) {
          return false;
        }
      }

      return true;
    });

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'battery':
          return (b.battery || 0) - (a.battery || 0);
        case 'signal': {
          const sigA = a.signalStrength != null ? a.signalStrength : -999;
          const sigB = b.signalStrength != null ? b.signalStrength : -999;
          return sigB - sigA;
        }
        case 'lastSeen':
          if (a.status === 'Offline') return 1;
          if (b.status === 'Offline') return -1;
          return 0;
        case 'health': {
          const healthOrder = { Critical: 0, Attention: 1, Healthy: 2 };
          return (healthOrder[a.deviceHealth] || 0) - (healthOrder[b.deviceHealth] || 0);
        }
        case 'nodeId':
        default:
          return a.id.localeCompare(b.id, undefined, { numeric: true });
      }
    });

    return result;
  }, [enrichedNodes, searchTerm, statusFilter, deviceFilter, healthFilter, sortBy]);

  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter('All');
    setDeviceFilter('All');
    setHealthFilter('All');
    setSortBy('nodeId');
  };

  return {
    devices: filteredDevices,
    rawNodes: enrichedNodes,
    totalCount: nodes.length,
    filteredCount: filteredDevices.length,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    deviceFilter,
    setDeviceFilter,
    healthFilter,
    setHealthFilter,
    sortBy,
    setSortBy,
    resetFilters
  };
};

export default useDeviceFilters;
