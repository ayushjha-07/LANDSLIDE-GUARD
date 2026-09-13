/**
 * Landslide Guard - State-Transition Alert Generator
 * 
 * Rules:
 * SAFE → SAFE: No alert
 * SAFE → WARNING: Create Warning alert
 * WARNING → WARNING: Do not create another alert
 * WARNING → HIGH RISK: Create High Risk alert
 * HIGH RISK → HIGH RISK: Do not create another alert
 * HIGH RISK → CRITICAL: Create Critical alert
 * CRITICAL → CRITICAL: Do not create another alert
 * WARNING → SAFE: Existing warning resolved
 * HIGH RISK → SAFE: Existing high-risk resolved
 * HIGH RISK → WARNING: Downgrade active alert
 * CRITICAL → HIGH RISK: Downgrade active alert
 */

export const getAlertTriggerInfo = (node, severity) => {
  const rain = node.rain ?? node.rainfall ?? node.readings?.rainfall?.value ?? 0;
  const soil = node.soil ?? node.moisture ?? node.readings?.soilMoisture?.value ?? 0;
  const tilt = node.tilt ?? node.readings?.tilt?.value ?? 0;
  const vib = node.vibration ?? node.readings?.vibration?.value ?? 0;
  const locName = node.location?.name || node.location || 'Slope Area';

  if (severity === 'Critical') {
    return {
      title: "Critical Landslide Risk Detected",
      details: `Critical hazard index reached ${node.riskScore ?? node.risk?.score}/100 in ${locName}. Immediate community siren dispatch threshold exceeded.`,
      action: "Initiate civil protection protocol, trigger community siren, and advise immediate slope evacuation."
    };
  }

  if (rain >= 25) {
    return {
      title: "Heavy Rainfall Detected",
      details: `Cumulative precipitation of ${rain.toFixed(1)} mm exceeds safety threshold in ${locName}.`,
      action: "Increase monitoring frequency and review the affected node."
    };
  }

  if (soil >= 65) {
    return {
      title: "Increased Soil Moisture",
      details: `Soil saturation reached ${soil.toFixed(1)}% following runoff infiltration in ${locName}.`,
      action: "Inspect drainage gully runoff channels and confirm RF telemetry link stability."
    };
  }

  if (tilt >= 3.5) {
    return {
      title: "Slope Incline Displacement",
      details: `Biaxial inclinometer measured tilt shift of ${tilt.toFixed(2)}° indicating active slope creep.`,
      action: "Deploy geotechnical field survey and verify structural retaining points."
    };
  }

  if (vib >= 0.08) {
    return {
      title: "Micro-Seismic Vibration Spike",
      details: `High-frequency harmonic resonance of ${vib.toFixed(3)}g recorded at station.`,
      action: "Check rockfall barrier mesh and cross-reference nearby seismic stations."
    };
  }

  return {
    title: "Geotechnical Parameter Drift",
    details: `Automated threshold warning triggered in ${locName}.`,
    action: "Continue passive monitoring and inspect station link."
  };
};

export const processRiskTransitions = ({
  nodes = [],
  activeAlerts = [],
  prevRiskStates = {}
}) => {
  const newActiveAlerts = [...activeAlerts];
  const newResolvedAlerts = [];
  const timelineEvents = [];
  const toastNotifications = [];
  const updatedRiskStates = { ...prevRiskStates };

  const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  nodes.forEach(node => {
    const locName = node.location?.name || node.location || 'Slope Area';
    const nodeLabel = node.name || node.id;

    if (node.status?.toLowerCase() === 'offline') {
      updatedRiskStates[node.id] = 'Offline';
      return;
    }

    const currentRisk = node.riskLevel || (node.risk?.level === 'high-risk' ? 'High Risk' : node.risk?.level === 'warning' ? 'Warning' : 'Safe');
    const prevRisk = prevRiskStates[node.id] || currentRisk;

    // 2. If NO RISK LEVEL CHANGE: strictly do NOT generate alerts
    if (currentRisk === prevRisk) {
      updatedRiskStates[node.id] = currentRisk;
      return;
    }

    // 3. State transitions handling:
    if (currentRisk === 'Safe' && (prevRisk === 'Warning' || prevRisk === 'High Risk' || prevRisk === 'Critical')) {
      const activeIdx = newActiveAlerts.findIndex(a => a.nodeId === node.id || a.node === nodeLabel || a.node === node.id);
      if (activeIdx !== -1) {
        const removed = newActiveAlerts.splice(activeIdx, 1)[0];
        const resolvedRecord = {
          ...removed,
          status: 'resolved',
          resolvedAt: 'Resolved just now',
          timestamp: 'Resolved just now'
        };
        newResolvedAlerts.push(resolvedRecord);

        timelineEvents.push({
          time: timeStr,
          event: `${nodeLabel} returned to Safe baseline`,
          type: 'safe',
          details: `Geotechnical indicators normalized below warning thresholds in ${locName}.`
        });

        toastNotifications.push({
          type: 'success',
          title: 'Alert Resolved',
          message: `${nodeLabel} returned to Safe baseline.`
        });
      }
    } 
    else if (currentRisk === 'Warning' && prevRisk === 'Safe') {
      const triggerInfo = getAlertTriggerInfo(node, 'Warning');
      const newAlert = {
        id: `ALERT-${node.id.replace(/[^a-zA-Z0-9]/g, '')}-${Date.now().toString(36).toUpperCase()}`,
        nodeId: node.id,
        node: nodeLabel,
        location: locName,
        title: triggerInfo.title,
        severity: 'warning',
        status: 'active',
        riskScore: node.riskScore ?? node.risk?.score ?? 46,
        triggeredBy: {
          rainfall: node.rain ?? node.readings?.rainfall?.value ?? 0,
          soilMoisture: node.soil ?? node.readings?.soilMoisture?.value ?? 0,
          tilt: node.tilt ?? node.readings?.tilt?.value ?? 0,
          vibration: node.vibration ?? node.readings?.vibration?.value ?? 0
        },
        rainfall: node.rain ?? node.readings?.rainfall?.value ?? 0,
        soil: node.soil ?? node.readings?.soilMoisture?.value ?? 0,
        moisture: node.soil ?? node.readings?.soilMoisture?.value ?? 0,
        tilt: node.tilt ?? node.readings?.tilt?.value ?? 0,
        vibration: node.vibration ?? node.readings?.vibration?.value ?? 0,
        battery: node.battery ?? 80,
        signal: node.signal ?? "-75 dBm",
        timestamp: "Just now",
        createdAt: Date.now(),
        details: triggerInfo.details,
        recommendedAction: triggerInfo.action,
        acknowledgedAt: null,
        resolvedAt: null
      };

      newActiveAlerts.unshift(newAlert);

      timelineEvents.push({
        time: timeStr,
        event: `${nodeLabel} entered Warning threshold`,
        type: 'warning',
        details: triggerInfo.details
      });

      toastNotifications.push({
        type: 'warning',
        title: triggerInfo.title,
        message: `${nodeLabel} (${locName}): Warning threshold crossed.`
      });
    }
    else if (currentRisk === 'High Risk' && (prevRisk === 'Safe' || prevRisk === 'Warning')) {
      const triggerInfo = getAlertTriggerInfo(node, 'High Risk');
      const existingIdx = newActiveAlerts.findIndex(a => a.nodeId === node.id || a.node === nodeLabel || a.node === node.id);

      const alertPayload = {
        id: existingIdx !== -1 ? newActiveAlerts[existingIdx].id : `ALERT-${node.id.replace(/[^a-zA-Z0-9]/g, '')}-${Date.now().toString(36).toUpperCase()}`,
        nodeId: node.id,
        node: nodeLabel,
        location: locName,
        title: triggerInfo.title,
        severity: 'high-risk',
        status: 'active',
        riskScore: node.riskScore ?? node.risk?.score ?? 68,
        triggeredBy: {
          rainfall: node.rain ?? node.readings?.rainfall?.value ?? 0,
          soilMoisture: node.soil ?? node.readings?.soilMoisture?.value ?? 0,
          tilt: node.tilt ?? node.readings?.tilt?.value ?? 0,
          vibration: node.vibration ?? node.readings?.vibration?.value ?? 0
        },
        rainfall: node.rain ?? node.readings?.rainfall?.value ?? 0,
        soil: node.soil ?? node.readings?.soilMoisture?.value ?? 0,
        moisture: node.soil ?? node.readings?.soilMoisture?.value ?? 0,
        tilt: node.tilt ?? node.readings?.tilt?.value ?? 0,
        vibration: node.vibration ?? node.readings?.vibration?.value ?? 0,
        battery: node.battery ?? 73,
        signal: node.signal ?? "-82 dBm",
        timestamp: "Just now",
        createdAt: Date.now(),
        details: triggerInfo.details,
        recommendedAction: triggerInfo.action,
        acknowledgedAt: null,
        resolvedAt: null
      };

      if (existingIdx !== -1) {
        newActiveAlerts[existingIdx] = alertPayload;
      } else {
        newActiveAlerts.unshift(alertPayload);
      }

      timelineEvents.push({
        time: timeStr,
        event: `${nodeLabel} escalated to High Risk`,
        type: 'high',
        details: triggerInfo.details
      });

      toastNotifications.push({
        type: 'warning',
        title: triggerInfo.title,
        message: `${nodeLabel} escalated to High Risk in ${locName}!`
      });
    }
    else if (currentRisk === 'Critical' && prevRisk !== 'Critical') {
      const triggerInfo = getAlertTriggerInfo(node, 'Critical');
      const existingIdx = newActiveAlerts.findIndex(a => a.nodeId === node.id || a.node === nodeLabel || a.node === node.id);

      const alertPayload = {
        id: existingIdx !== -1 ? newActiveAlerts[existingIdx].id : `ALERT-${node.id.replace(/[^a-zA-Z0-9]/g, '')}-${Date.now().toString(36).toUpperCase()}`,
        nodeId: node.id,
        node: nodeLabel,
        location: locName,
        title: triggerInfo.title,
        severity: 'critical',
        status: 'active',
        riskScore: node.riskScore ?? node.risk?.score ?? 76,
        triggeredBy: {
          rainfall: node.rain ?? node.readings?.rainfall?.value ?? 0,
          soilMoisture: node.soil ?? node.readings?.soilMoisture?.value ?? 0,
          tilt: node.tilt ?? node.readings?.tilt?.value ?? 0,
          vibration: node.vibration ?? node.readings?.vibration?.value ?? 0
        },
        rainfall: node.rain ?? node.readings?.rainfall?.value ?? 0,
        soil: node.soil ?? node.readings?.soilMoisture?.value ?? 0,
        moisture: node.soil ?? node.readings?.soilMoisture?.value ?? 0,
        tilt: node.tilt ?? node.readings?.tilt?.value ?? 0,
        vibration: node.vibration ?? node.readings?.vibration?.value ?? 0,
        battery: node.battery ?? 70,
        signal: node.signal ?? "-88 dBm",
        timestamp: "Just now",
        createdAt: Date.now(),
        details: triggerInfo.details,
        recommendedAction: triggerInfo.action,
        acknowledgedAt: null,
        resolvedAt: null
      };

      if (existingIdx !== -1) {
        newActiveAlerts[existingIdx] = alertPayload;
      } else {
        newActiveAlerts.unshift(alertPayload);
      }

      timelineEvents.push({
        time: timeStr,
        event: `${nodeLabel} escalated to CRITICAL hazard`,
        type: 'critical',
        details: triggerInfo.details
      });

      toastNotifications.push({
        type: 'critical',
        title: triggerInfo.title,
        message: `${nodeLabel} crossed Critical boundary (${node.riskScore ?? node.risk?.score}/100) in ${locName}!`
      });
    }

    updatedRiskStates[node.id] = currentRisk;
  });

  return {
    newActiveAlerts,
    newResolvedAlerts,
    timelineEvents,
    toastNotifications,
    updatedRiskStates
  };
};
