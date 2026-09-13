import { useState, useMemo, useCallback } from 'react';
import { useAlertContext } from '../context/AlertContext';

export const useAlerts = () => {
  const context = useAlertContext();
  const {
    activeAlerts,
    historicalAlerts,
    allAlerts,
    selectedAlertForModal,
    setSelectedAlertForModal,
    acknowledgeAlert,
    resolveAlert
  } = context;

  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [nodeFilter, setNodeFilter] = useState('All');

  const resetFilters = useCallback(() => {
    setSearchQuery('');
    setSeverityFilter('All');
    setStatusFilter('All');
    setNodeFilter('All');
  }, []);

  const matchesFilters = useCallback((alert) => {
    // 1. Search Query (title, node, location, severity, status, details)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchTitle = alert.title?.toLowerCase().includes(q);
      const matchNode = alert.node?.toLowerCase().includes(q);
      const matchLoc = alert.location?.toLowerCase().includes(q);
      const matchSev = alert.severity?.toLowerCase().includes(q);
      const matchStat = alert.status?.toLowerCase().includes(q);
      const matchDet = alert.details?.toLowerCase().includes(q);

      if (!matchTitle && !matchNode && !matchLoc && !matchSev && !matchStat && !matchDet) {
        return false;
      }
    }

    // 2. Severity Filter
    if (severityFilter !== 'All') {
      const normSev = (alert.severity || '').toLowerCase().replace(/-/g, ' ');
      const normFilter = severityFilter.toLowerCase().replace(/-/g, ' ');
      if (normSev !== normFilter) {
        return false;
      }
    }

    // 3. Status Filter
    if (statusFilter !== 'All') {
      if (alert.status?.toLowerCase() !== statusFilter.toLowerCase()) {
        return false;
      }
    }

    // 4. Node Filter
    if (nodeFilter !== 'All') {
      const matchNodeId = alert.nodeId?.toLowerCase() === nodeFilter.toLowerCase();
      const matchNodeName = alert.node?.toLowerCase() === nodeFilter.toLowerCase();
      if (!matchNodeId && !matchNodeName) {
        return false;
      }
    }

    return true;
  }, [searchQuery, severityFilter, statusFilter, nodeFilter]);

  const filteredActiveAlerts = useMemo(() => {
    return activeAlerts.filter(matchesFilters);
  }, [activeAlerts, matchesFilters]);

  const filteredHistoricalAlerts = useMemo(() => {
    return historicalAlerts.filter(matchesFilters);
  }, [historicalAlerts, matchesFilters]);

  const filteredAllAlerts = useMemo(() => {
    return allAlerts.filter(matchesFilters);
  }, [allAlerts, matchesFilters]);

  const openAlertModal = useCallback((alert) => {
    setSelectedAlertForModal(alert);
  }, [setSelectedAlertForModal]);

  const closeAlertModal = useCallback(() => {
    setSelectedAlertForModal(null);
  }, [setSelectedAlertForModal]);

  return {
    ...context,
    searchQuery,
    setSearchQuery,
    severityFilter,
    setSeverityFilter,
    statusFilter,
    setStatusFilter,
    nodeFilter,
    setNodeFilter,
    resetFilters,
    filteredActiveAlerts,
    filteredHistoricalAlerts,
    filteredAllAlerts,
    selectedAlertForModal,
    openAlertModal,
    closeAlertModal,
    acknowledgeAlert,
    resolveAlert
  };
};

export default useAlerts;
