import React, { createContext, useContext, useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useSensorContext } from './SensorContext';
import { useToast } from './ToastContext';
import { useSettings } from './SettingsContext';
import { 
  INITIAL_ACTIVE_ALERTS, 
  INITIAL_HISTORICAL_ALERTS, 
  OFFLINE_NODE_NOTICE,
  INITIAL_TIMELINE,
  NOTIFICATION_CHANNELS,
  DEMO_ALERT_STATISTICS,
  WORKFLOW_STEPS
} from '../data/mockAlerts';
import { processRiskTransitions } from '../utils/alertGenerator';
import { 
  getRiskDistribution, 
  getHighestRiskNode, 
  getOnlineNodeCount, 
  getOfflineNodeCount 
} from '../utils/dataSelectors';

const AlertContext = createContext(null);

export const AlertProvider = ({ children }) => {
  const { nodes } = useSensorContext();
  const { toast } = useToast();
  const { settings } = useSettings();
  const autoGenerate = settings?.alerts?.automaticGeneration !== false;
  const autoResolve = settings?.alerts?.autoResolve !== false;

  // Exactly 2 deterministic initial active risk alerts
  const [activeAlerts, setActiveAlerts] = useState(INITIAL_ACTIVE_ALERTS);

  // Exactly 3 deterministic historical resolved alerts
  const [historicalAlerts, setHistoricalAlerts] = useState(INITIAL_HISTORICAL_ALERTS);

  const [timeline, setTimeline] = useState(INITIAL_TIMELINE);
  const [selectedAlertForModal, setSelectedAlertForModal] = useState(null);

  // Track previous risk state for each node to enforce state-transition logic
  const prevRiskStatesRef = useRef({
    'NODE-01': 'Safe', 'Node 01': 'Safe',
    'NODE-02': 'Safe', 'Node 02': 'Safe',
    'NODE-03': 'Warning', 'Node 03': 'Warning',
    'NODE-04': 'Safe', 'Node 04': 'Safe',
    'NODE-05': 'High Risk', 'Node 05': 'High Risk',
    'NODE-06': 'Offline', 'Node 06': 'Offline',
    'NODE-07': 'Safe', 'Node 07': 'Safe',
    'NODE-08': 'Safe', 'Node 08': 'Safe'
  });

  // State-transition evaluator: only triggers on true risk level changes
  useEffect(() => {
    if (!nodes || nodes.length === 0) return;
    if (!autoGenerate) return;

    const result = processRiskTransitions({
      nodes,
      activeAlerts,
      prevRiskStates: prevRiskStatesRef.current
    });

    prevRiskStatesRef.current = result.updatedRiskStates;

    const hasActiveDiff = 
      result.newActiveAlerts.length !== activeAlerts.length ||
      result.newActiveAlerts.some((a, idx) => a.severity !== activeAlerts[idx]?.severity);

    if (hasActiveDiff || (autoResolve && result.newResolvedAlerts.length > 0) || result.timelineEvents.length > 0) {
      if (hasActiveDiff) {
        setActiveAlerts(result.newActiveAlerts);
      }

      if (autoResolve && result.newResolvedAlerts.length > 0) {
        setHistoricalAlerts(prev => [...result.newResolvedAlerts, ...prev]);
      }

      if (result.timelineEvents.length > 0) {
        setTimeline(prev => [...result.timelineEvents, ...prev.slice(0, 20 - result.timelineEvents.length)]);
      }

      result.toastNotifications.forEach(t => {
        if (t.type === 'critical') toast.critical(t.message, t.title);
        else if (t.type === 'success') toast.success(t.message, t.title);
        else toast.warning(t.message, t.title);
      });
    }
  }, [nodes, activeAlerts, toast, autoGenerate, autoResolve]);

  // Acknowledge action: leaves alert active, marks Acknowledged
  const acknowledgeAlert = useCallback((alertId) => {
    setActiveAlerts(prev => prev.map(a => {
      if (a.id === alertId) {
        return {
          ...a,
          status: 'acknowledged',
          acknowledgedAt: 'Just now'
        };
      }
      return a;
    }));

    toast.info("The alert has been acknowledged.", "Alert Acknowledged");

    setSelectedAlertForModal(prev => (prev && prev.id === alertId ? { ...prev, status: 'acknowledged', acknowledgedAt: 'Just now' } : prev));
  }, [toast]);

  // Resolve action: moves alert from Active Alerts to Alert History
  const resolveAlert = useCallback((alertId) => {
    const targetAlert = activeAlerts.find(a => a.id === alertId);

    if (targetAlert) {
      const resolvedRecord = {
        ...targetAlert,
        status: 'resolved',
        resolvedAt: 'Resolved just now',
        timestamp: 'Resolved just now'
      };

      setActiveAlerts(prev => prev.filter(a => a.id !== alertId));
      setHistoricalAlerts(prev => [resolvedRecord, ...prev]);

      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setTimeline(prevTl => [
        {
          time: timeStr,
          event: `${targetAlert.node || targetAlert.nodeId} alert resolved by operator`,
          type: 'safe',
          details: `Incident marked as resolved: ${targetAlert.title}`
        },
        ...prevTl.slice(0, 19)
      ]);

      toast.success("The alert has been moved to history.", "Alert Resolved");
    }

    setSelectedAlertForModal(null);
  }, [activeAlerts, toast]);

  // Reset alerts back to initial deterministic demo state
  const resetAlertsState = useCallback(() => {
    setActiveAlerts(INITIAL_ACTIVE_ALERTS);
    setHistoricalAlerts(INITIAL_HISTORICAL_ALERTS);
    setTimeline(INITIAL_TIMELINE);
    setSelectedAlertForModal(null);
    prevRiskStatesRef.current = {
      'NODE-01': 'Safe', 'Node 01': 'Safe',
      'NODE-02': 'Safe', 'Node 02': 'Safe',
      'NODE-03': 'Warning', 'Node 03': 'Warning',
      'NODE-04': 'Safe', 'Node 04': 'Safe',
      'NODE-05': 'High Risk', 'Node 05': 'High Risk',
      'NODE-06': 'Offline', 'Node 06': 'Offline',
      'NODE-07': 'Safe', 'Node 07': 'Safe',
      'NODE-08': 'Safe', 'Node 08': 'Safe'
    };
  }, []);

  // Dynamic KPI computations derived via pure selectors
  const summary = useMemo(() => {
    const active = activeAlerts.length;
    const critical = activeAlerts.filter(a => a.severity === 'critical' || a.severity === 'Critical').length;
    const highRisk = activeAlerts.filter(a => a.severity === 'high-risk' || a.severity === 'High Risk').length;
    const warning = activeAlerts.filter(a => a.severity === 'warning' || a.severity === 'Warning').length;
    const resolvedToday = historicalAlerts.length;

    const highest = getHighestRiskNode(nodes) || { id: "NODE-05", name: "Node 05", location: { name: "Mountain Zone C" }, riskScore: 68 };
    const onlineNodes = getOnlineNodeCount(nodes);
    const offlineNodes = getOfflineNodeCount(nodes);
    const totalNodes = nodes.length;

    return {
      active,
      critical,
      highRisk,
      warning,
      resolvedToday,
      highestNode: highest,
      onlineNodes,
      offlineNodes,
      totalNodes
    };
  }, [activeAlerts, historicalAlerts, nodes]);

  // Dynamic canonical risk distribution: 5 Safe + 1 Warning + 1 High Risk + 1 Unknown/Offline
  const riskDistribution = useMemo(() => {
    return getRiskDistribution(nodes);
  }, [nodes]);

  const value = {
    activeAlerts,
    historicalAlerts,
    allAlerts: [...activeAlerts, ...historicalAlerts],
    timeline,
    offlineNotice: OFFLINE_NODE_NOTICE,
    notificationChannels: NOTIFICATION_CHANNELS,
    demoStatistics: DEMO_ALERT_STATISTICS,
    workflowSteps: WORKFLOW_STEPS,
    summary,
    riskDistribution,
    selectedAlertForModal,
    setSelectedAlertForModal,
    acknowledgeAlert,
    resolveAlert,
    resetAlertsState
  };

  return (
    <AlertContext.Provider value={value}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlertContext = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlertContext must be used within an AlertProvider');
  }
  return context;
};

export const useAlerts = useAlertContext;

export default AlertContext;
