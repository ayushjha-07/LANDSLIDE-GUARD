import { useState, useMemo, useCallback } from 'react';
import { useSensorContext } from '../context/SensorContext';
import { 
  getOnlineNodes, 
  getOfflineNodes, 
  getRiskDistribution 
} from '../utils/dataSelectors';

export const useLiveSensorData = () => {
  const { 
    nodes, 
    system,
    lastUpdatedText, 
    lastUpdated,
    isRefreshing, 
    manualRefresh 
  } = useSensorContext();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');
  const [sortBy, setSortBy] = useState('id');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  // Derive the active selected node object from live nodes array
  const selectedNode = useMemo(() => {
    if (!selectedNodeId) return null;
    return nodes.find(n => n.id === selectedNodeId || n.name === selectedNodeId) || null;
  }, [nodes, selectedNodeId]);

  const openDetailModal = useCallback((node) => {
    setSelectedNodeId(node.id);
  }, []);

  const closeDetailModal = useCallback(() => {
    setSelectedNodeId(null);
  }, []);

  const resetFilters = useCallback(() => {
    setSearchQuery('');
    setStatusFilter('all');
    setRiskFilter('all');
    setSortBy('id');
  }, []);

  // Summary counts derived via canonical selectors
  const summaryCounts = useMemo(() => {
    const total = nodes.length;
    const online = getOnlineNodes(nodes).length;
    const offline = getOfflineNodes(nodes).length;
    const dist = getRiskDistribution(nodes);
    const warning = dist.warning;
    const highRisk = dist.highRisk;
    const networkHealth = `${system?.network?.packetSuccessRate || 98.6}%`;

    return { total, online, offline, warning, highRisk, networkHealth };
  }, [nodes, system]);

  // Filter and sort nodes
  const filteredNodes = useMemo(() => {
    return nodes
      .filter(node => {
        // Search filter: matches Node ID, Node Name, or Location Name
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchId = String(node.id).toLowerCase().includes(q);
          const matchName = String(node.name || '').toLowerCase().includes(q);
          const locName = String(node.location?.name || node.location || '').toLowerCase();
          const matchLoc = locName.includes(q);
          if (!matchId && !matchName && !matchLoc) return false;
        }

        // Status filter: All, Online, Offline
        if (statusFilter !== 'all') {
          if (node.status?.toLowerCase() !== statusFilter.toLowerCase()) {
            return false;
          }
        }

        // Risk filter: All, Safe, Warning, High Risk, Critical
        if (riskFilter !== 'all') {
          const nodeRiskLevel = node.risk?.level || node.riskLevel?.toLowerCase();
          const targetLevel = riskFilter.toLowerCase().replace(/\s+/g, '-');
          if (nodeRiskLevel !== targetLevel && node.riskLevel?.toLowerCase() !== riskFilter.toLowerCase()) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'risk': {
            const scoreA = a.riskScore ?? a.risk?.score ?? 0;
            const scoreB = b.riskScore ?? b.risk?.score ?? 0;
            return scoreB - scoreA;
          }
          case 'battery': {
            const batA = a.battery ?? a.device?.battery?.value ?? 0;
            const batB = b.battery ?? b.device?.battery?.value ?? 0;
            return batB - batA;
          }
          case 'signal': {
            const sigA = a.signalStrength ?? a.device?.signal?.rssi ?? -120;
            const sigB = b.signalStrength ?? b.device?.signal?.rssi ?? -120;
            return sigB - sigA;
          }
          case 'lastUpdate': {
            const lastA = a.lastUpdate ?? a.device?.lastSeen;
            const lastB = b.lastUpdate ?? b.device?.lastSeen;
            if (lastA === 'Just now' && lastB !== 'Just now') return -1;
            if (lastB === 'Just now' && lastA !== 'Just now') return 1;
            return String(a.id).localeCompare(String(b.id));
          }
          case 'id':
          default:
            return String(a.id).localeCompare(String(b.id));
        }
      });
  }, [nodes, searchQuery, statusFilter, riskFilter, sortBy]);

  return {
    nodes,
    system,
    filteredNodes,
    summaryCounts,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    riskFilter,
    setRiskFilter,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
    selectedNode,
    openDetailModal,
    closeDetailModal,
    resetFilters,
    lastUpdatedText,
    lastUpdated: lastUpdated || lastUpdatedText,
    isRefreshing,
    manualRefresh
  };
};

export default useLiveSensorData;
