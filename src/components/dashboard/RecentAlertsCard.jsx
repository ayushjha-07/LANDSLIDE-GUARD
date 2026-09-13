import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  CloudRain, 
  AlertTriangle, 
  Activity, 
  TrendingUp, 
  Droplets, 
  Compass, 
  Clock, 
  Flag, 
  Thermometer, 
  ArrowRight
} from 'lucide-react';
import MonitoringMap from '../map/MonitoringMap';
import AlertDetailModal from '../alerts/AlertDetailModal';
import { useAlertContext } from '../../context/AlertContext';
import { useSensorContext } from '../../context/SensorContext';

/**
 * Inline SVG Sparklines matching the primary visual reference:
 * - surge: rising red curve with soft red gradient fill
 * - elevated: rising undulating amber curve with soft amber gradient fill
 * - spike: transient green spike returning to baseline with soft green gradient fill
 * - settled: stabilizing slate curve with soft gray gradient fill
 */
const AlertSparkline = ({ variant = 'surge', color = '#ef4444' }) => {
  let pathD = "M 0 24 C 18 24, 30 20, 45 15 C 60 10, 68 4, 80 3";
  let fillD = "M 0 24 C 18 24, 30 20, 45 15 C 60 10, 68 4, 80 3 L 80 30 L 0 30 Z";

  if (variant === 'elevated') {
    pathD = "M 0 22 C 16 26, 32 20, 48 16 C 60 13, 70 8, 80 6";
    fillD = "M 0 22 C 16 26, 32 20, 48 16 C 60 13, 70 8, 80 6 L 80 30 L 0 30 Z";
  } else if (variant === 'spike') {
    pathD = "M 0 24 C 20 24, 30 22, 38 18 L 48 4 L 56 22 C 64 24, 72 24, 80 24";
    fillD = "M 0 24 C 20 24, 30 22, 38 18 L 48 4 L 56 22 C 64 24, 72 24, 80 24 L 80 30 L 0 30 Z";
  } else if (variant === 'settled') {
    pathD = "M 0 22 C 18 16, 32 15, 48 17 C 62 18, 72 19, 80 19";
    fillD = "M 0 22 C 18 16, 32 15, 48 17 C 62 18, 72 19, 80 19 L 80 30 L 0 30 Z";
  }

  const gradId = `sparkline-grad-${variant}`;

  return (
    <div className="w-16 sm:w-20 md:w-24 h-7 sm:h-8 flex-shrink-0 flex items-center justify-end select-none pointer-events-none">
      <svg viewBox="0 0 80 30" className="w-full h-full overflow-visible" preserveAspectRatio="none">
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.35" />
            <stop offset="100%" stopColor={color} stopOpacity="0.0" />
          </linearGradient>
        </defs>
        <path d={fillD} fill={`url(#${gradId})`} />
        <path d={pathD} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
};

export const RecentAlertsCard = ({ nodes: propNodes, className = "" }) => {
  const alertCtx = useAlertContext();
  const sensorCtx = useSensorContext();

  const activeNodes = useMemo(() => {
    return (propNodes && propNodes.length > 0) ? propNodes : (sensorCtx?.nodes || []);
  }, [propNodes, sensorCtx?.nodes]);

  // Selected node state for focusing map and highlighting card (default to high-risk Node 05)
  const [selectedNodeId, setSelectedNodeId] = useState('NODE-05');
  const [modalAlert, setModalAlert] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Canonical alert list strictly matching the reference
  const CANONICAL_ALERTS = useMemo(() => [
    {
      id: "ALERT-001",
      nodeId: "NODE-05",
      node: "Node 05",
      sector: "Central Slope Sector",
      title: "Heavy Rainfall Detected",
      severity: "High Risk",
      severityKey: "high-risk",
      riskScore: 68,
      timestamp: "8 minutes ago",
      status: "Active",
      description: "High rainfall intensity detected. Monitoring for potential slope instability.",
      icon: CloudRain,
      iconBg: "bg-red-500",
      badgeCls: "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20",
      nodeColorCls: "text-red-600 dark:text-red-400 font-bold",
      sparklineColor: "#ef4444",
      sparklineVariant: "surge",
      metrics: [
        { label: "Rainfall", value: "29 mm", icon: CloudRain, iconColor: "text-blue-500" },
        { label: "Soil Moisture", value: "76%", icon: Droplets, iconColor: "text-cyan-500" },
        { label: "Tilt", value: "4.8°", icon: Compass, iconColor: "text-amber-500" },
        { label: "Vibration", value: "0.11 g", icon: Activity, iconColor: "text-purple-500" },
      ]
    },
    {
      id: "ALERT-002",
      nodeId: "NODE-03",
      node: "Node 03",
      sector: "Lower Ridge",
      title: "Increased Soil Moisture",
      severity: "Warning",
      severityKey: "warning",
      riskScore: 46,
      timestamp: "2 minutes ago",
      status: "Active",
      description: "Soil moisture above normal threshold after sustained rainfall.",
      icon: AlertTriangle,
      iconBg: "bg-amber-500",
      badgeCls: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20",
      nodeColorCls: "text-amber-600 dark:text-amber-400 font-bold",
      sparklineColor: "#f59e0b",
      sparklineVariant: "elevated",
      metrics: [
        { label: "Rainfall", value: "21 mm", icon: CloudRain, iconColor: "text-blue-500" },
        { label: "Soil Moisture", value: "68%", icon: Droplets, iconColor: "text-cyan-500" },
        { label: "Tilt", value: "3.4°", icon: Compass, iconColor: "text-amber-500" },
        { label: "Vibration", value: "0.07 g", icon: Activity, iconColor: "text-purple-500" },
      ]
    },
    {
      id: "ALERT-H01",
      nodeId: "NODE-02",
      node: "Node 02",
      sector: "Hillside Road",
      title: "Vibration Spike",
      severity: "Resolved",
      severityKey: "safe",
      riskScore: 36,
      timestamp: "24 minutes ago",
      status: "Resolved",
      description: "Short-term vibration spike detected. No further abnormal activity observed.",
      icon: Activity,
      iconBg: "bg-emerald-600",
      badgeCls: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
      nodeColorCls: "text-emerald-600 dark:text-emerald-400 font-bold",
      sparklineColor: "#10b981",
      sparklineVariant: "spike",
      metrics: [
        { label: "Peak Vibration", value: "0.09 g", icon: Flag, iconColor: "text-emerald-500" },
        { label: "Duration", value: "12 s", icon: Clock, iconColor: "text-stone-400" },
        { label: "Soil Moisture", value: "52%", icon: Droplets, iconColor: "text-cyan-500" },
        { label: "Tilt", value: "2.1°", icon: Compass, iconColor: "text-amber-500" },
      ]
    },
    {
      id: "ALERT-H02",
      nodeId: "NODE-07",
      node: "Node 07",
      sector: "Upper Slope",
      title: "Tilt Variation",
      severity: "Resolved",
      severityKey: "safe",
      riskScore: 31,
      timestamp: "1 hour ago",
      status: "Resolved",
      description: "Minor tilt variation detected. Within safe limits.",
      icon: TrendingUp,
      iconBg: "bg-slate-500",
      badgeCls: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
      nodeColorCls: "text-slate-500 dark:text-slate-400 font-bold",
      sparklineColor: "#64748b",
      sparklineVariant: "settled",
      metrics: [
        { label: "Tilt Change", value: "1.8°", icon: Compass, iconColor: "text-amber-500" },
        { label: "Soil Moisture", value: "48%", icon: Droplets, iconColor: "text-cyan-500" },
        { label: "Vibration", value: "0.04 g", icon: Activity, iconColor: "text-purple-500" },
        { label: "Temperature", value: "17°C", icon: Thermometer, iconColor: "text-sky-500" },
      ]
    }
  ], []);

  // Find active node object corresponding to selectedNodeId
  const selectedNode = useMemo(() => {
    return activeNodes.find(n => n.id === selectedNodeId || n.name === selectedNodeId) || null;
  }, [activeNodes, selectedNodeId]);

  // Click handler for alert card: focus node on map and open alert details modal
  const handleAlertCardClick = (alert) => {
    setSelectedNodeId(alert.nodeId);

    // Sync with AlertContext active/historical alert if present, or construct canonical alert object
    const foundInContext = alertCtx?.allAlerts?.find(a => a.id === alert.id || a.nodeId === alert.nodeId);
    const enrichedAlert = foundInContext || {
      id: alert.id,
      nodeId: alert.nodeId,
      node: alert.node,
      location: alert.sector,
      title: alert.title,
      severity: alert.severityKey,
      status: alert.status.toLowerCase(),
      riskScore: alert.riskScore,
      timestamp: alert.timestamp,
      details: alert.description,
      rainfall: 29.0,
      soil: 76.0,
      tilt: 4.8,
      vibration: 0.11,
      recommendedAction: "Increase monitoring frequency and inspect drainage runoff channels."
    };

    setModalAlert(enrichedAlert);
    setIsModalOpen(true);
  };

  // Click handler when user selects marker on map: sync active node and highlight corresponding card
  const handleMapNodeSelect = (node) => {
    if (node && node.id) {
      setSelectedNodeId(node.id);
    }
  };

  // Modal actions wired to AlertContext
  const handleModalAcknowledge = (alertId) => {
    if (alertCtx?.acknowledgeAlert) {
      alertCtx.acknowledgeAlert(alertId);
    }
    setIsModalOpen(false);
  };

  const handleModalResolve = (alertId) => {
    if (alertCtx?.resolveAlert) {
      alertCtx.resolveAlert(alertId);
    }
    setIsModalOpen(false);
  };

  return (
    <div className={`w-full min-w-0 bg-white dark:bg-[#0f1713] rounded-2xl border border-stone-200/90 dark:border-stone-800/80 shadow-sm p-4 sm:p-6 transition-all ${className}`}>
      {/* 1. HEADER ROW */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 sm:mb-6">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-stone-900 dark:text-white tracking-tight">
              Recent Alerts
            </h2>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              LIVE MONITORING
            </span>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-0.5">
            Latest sensor events and risk indicators
          </p>
        </div>

        <Link
          to="/alerts"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-forest-600 dark:text-nature-400 hover:text-forest-700 dark:hover:text-nature-300 transition-colors group self-start sm:self-auto"
        >
          <span>View All Alerts</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* 2. TWO-COLUMN LAYOUT: GIS MAP (LEFT) & ALERT TIMELINE (RIGHT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 w-full min-w-0 items-stretch">
        
        {/* LEFT COLUMN: Himalayan GIS Terrain Map */}
        <div className="lg:col-span-5 w-full flex flex-col min-w-0">
          <div className="relative w-full h-[360px] sm:h-[440px] lg:h-full min-h-[360px] lg:min-h-[560px] rounded-2xl overflow-hidden border border-stone-800 bg-[#0c1310] shadow-md">
            <MonitoringMap
              variant="alerts"
              nodes={activeNodes}
              selectedNode={selectedNode}
              onSelectNode={handleMapNodeSelect}
              height="h-full min-h-[360px] sm:min-h-[440px] lg:min-h-[560px]"
              className="h-full"
            />
          </div>
        </div>

        {/* RIGHT COLUMN: Vertical Alert Timeline */}
        <div className="lg:col-span-7 w-full flex flex-col justify-between min-w-0">
          <div className="relative pl-6 sm:pl-8 space-y-3 sm:space-y-3.5">
            {/* Continuous Vertical Timeline Line */}
            <div 
              className="absolute left-[11px] sm:left-[15px] top-6 bottom-6 w-[2px] bg-stone-200 dark:bg-stone-700/80 -translate-x-1/2 pointer-events-none" 
              aria-hidden="true" 
            />

            {/* 4 Canonical Alert Cards */}
            {CANONICAL_ALERTS.map((alert) => {
              const isSelected = selectedNodeId === alert.nodeId;

              return (
                <div 
                  key={alert.id}
                  className="relative group cursor-pointer"
                  onClick={() => handleAlertCardClick(alert)}
                >
                  {/* Timeline Node Circle Icon */}
                  <div 
                    className={`absolute -left-6 sm:-left-8 top-3.5 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 -translate-x-1/2 rounded-full flex items-center justify-center text-white shadow-md border-2 border-white dark:border-[#0f1713] transition-transform duration-200 group-hover:scale-110 z-10 ${alert.iconBg}`}
                  >
                    <alert.icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.2]" />
                  </div>

                  {/* Alert Content Card */}
                  <div 
                    className={`p-3 sm:p-3.5 md:p-4 rounded-xl border transition-all duration-200 min-w-0 ${
                      isSelected 
                        ? 'border-forest-500/80 bg-forest-50/30 dark:bg-forest-950/40 ring-2 ring-forest-500/30 shadow-md' 
                        : 'border-stone-200/90 dark:border-stone-800 bg-stone-50/50 dark:bg-[#111915]/90 hover:border-stone-300 dark:hover:border-stone-700 hover:shadow-xs'
                    }`}
                  >
                    {/* Top Row: Title, Node & Sector, Time, Status */}
                    <div className="flex flex-col xs:flex-row xs:items-start justify-between gap-1.5 sm:gap-2">
                      <div className="min-w-0 flex-1">
                        <h3 className="text-xs sm:text-sm md:text-base font-bold text-stone-900 dark:text-stone-100 leading-snug break-words">
                          {alert.title}
                        </h3>
                        <div className="flex items-center gap-1.5 text-[11px] sm:text-xs mt-0.5 flex-wrap">
                          <span className={alert.nodeColorCls}>{alert.node}</span>
                          <span className="text-stone-300 dark:text-stone-600">&bull;</span>
                          <span className="text-stone-500 dark:text-stone-400 font-medium">{alert.sector}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0 self-start xs:self-auto">
                        <span className="text-[10px] sm:text-xs text-stone-400 dark:text-stone-500 whitespace-nowrap">
                          {alert.timestamp}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold tracking-tight whitespace-nowrap ${alert.badgeCls}`}>
                          {alert.severity}
                        </span>
                      </div>
                    </div>

                    {/* Middle Row: Description */}
                    <p className="text-[11px] sm:text-xs text-stone-600 dark:text-stone-300 mt-1.5 line-clamp-2 leading-relaxed">
                      {alert.description}
                    </p>

                    {/* Bottom Row: 4 Metric Snapshot Badges + Trend Sparkline */}
                    <div className="mt-2.5 pt-2 border-t border-stone-200/60 dark:border-stone-800/70 flex flex-wrap items-center justify-between gap-2 min-w-0">
                      {/* Metric Badges: Grid on narrow mobile, flex on wider screens */}
                      <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-1.5 sm:gap-2 flex-1 min-w-0">
                        {alert.metrics.map((metric, idx) => (
                          <div 
                            key={idx}
                            className="flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded-md bg-white dark:bg-stone-900/80 border border-stone-200/80 dark:border-stone-800 text-[10px] sm:text-[11px] shadow-2xs whitespace-nowrap"
                          >
                            <metric.icon className={`w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0 ${metric.iconColor}`} />
                            <span className="text-stone-400 text-[9px] sm:text-[10px]">{metric.label}:</span>
                            <span className="font-mono font-bold text-stone-800 dark:text-stone-200">{metric.value}</span>
                          </div>
                        ))}
                      </div>

                      {/* Mini SVG Trend Sparkline */}
                      <AlertSparkline 
                        variant={alert.sparklineVariant} 
                        color={alert.sparklineColor} 
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* 3. ALERT DETAIL MODAL (Wired to AlertContext for acknowledge/resolve) */}
      <AlertDetailModal
        alert={modalAlert}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAcknowledge={handleModalAcknowledge}
        onResolve={handleModalResolve}
      />
    </div>
  );
};

export default RecentAlertsCard;

