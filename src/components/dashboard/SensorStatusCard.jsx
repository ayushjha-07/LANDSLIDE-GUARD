import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  RadioTower, 
  MapPin, 
  Shield, 
  Wifi, 
  RotateCcw, 
  ChevronDown, 
  CheckCircle2, 
  AlertTriangle, 
  AlertCircle, 
  HelpCircle, 
  Battery, 
  Signal, 
  Clock, 
  Database, 
  Activity, 
  Network,
  Radio,
  Server
} from 'lucide-react';
import { useSensorContext } from '../../context/SensorContext';
import { SYSTEM_INFO } from '../../data/mockSystemData';
import sensorStationFieldImg from '../../assets/sensor_station_field.jpg';
import heroHimalayasImg from '../../assets/hero_himalayas.jpg';

export const SensorStatusCard = ({ nodes: propNodes, system: propSystem }) => {
  const context = useSensorContext();
  const nodes = propNodes || context?.nodes || [];
  const system = propSystem || SYSTEM_INFO;

  // Filter states
  const [stationFilter, setStationFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Dropdown open states
  const [openDropdown, setOpenDropdown] = useState(null); // 'station' | 'risk' | 'status' | null
  const dropdownRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtered nodes logic
  const filteredNodes = useMemo(() => {
    return nodes.filter(node => {
      // Station filter
      if (stationFilter !== 'all') {
        if (node.id !== stationFilter && node.location?.name !== stationFilter) {
          return false;
        }
      }
      // Risk filter
      if (riskFilter !== 'all') {
        const nodeRisk = (node.risk?.level || node.riskLevel || '').toLowerCase();
        if (riskFilter === 'safe' && nodeRisk !== 'safe') return false;
        if (riskFilter === 'warning' && nodeRisk !== 'warning') return false;
        if (riskFilter === 'high-risk' && (nodeRisk !== 'high-risk' && nodeRisk !== 'high risk')) return false;
        if (riskFilter === 'unknown' && nodeRisk !== 'unknown') return false;
      }
      // Status filter
      if (statusFilter !== 'all') {
        if (node.status?.toLowerCase() !== statusFilter.toLowerCase()) return false;
      }
      return true;
    });
  }, [nodes, stationFilter, riskFilter, statusFilter]);

  const handleResetFilters = () => {
    setStationFilter('all');
    setRiskFilter('all');
    setStatusFilter('all');
    setOpenDropdown(null);
  };

  // Helper for signal quality
  const getSignalMeta = (rssi, status) => {
    if (status === 'offline' || rssi === null || rssi === undefined) {
      return { label: 'No Signal', color: 'text-slate-400 dark:text-slate-500', bars: 0 };
    }
    if (rssi >= -65) return { label: 'Excellent', color: 'text-emerald-600 dark:text-emerald-400', bars: 4 };
    if (rssi >= -72) return { label: 'Good', color: 'text-emerald-600 dark:text-emerald-400', bars: 3 };
    if (rssi >= -78) return { label: 'Fair', color: 'text-amber-500 dark:text-amber-400', bars: 2 };
    return { label: 'Poor', color: 'text-rose-500 dark:text-rose-400', bars: 1 };
  };

  // Helper for battery styling
  const getBatteryMeta = (level, status) => {
    if (status === 'offline' || level === null || level === undefined) {
      return { color: 'text-rose-500 dark:text-rose-400' };
    }
    if (level <= 35) return { color: 'text-rose-500 dark:text-rose-400' };
    if (level <= 60) return { color: 'text-amber-500 dark:text-amber-400' };
    return { color: 'text-emerald-600 dark:text-emerald-400' };
  };

  return (
    <div id="sensor-status-card" className="w-full bg-white/95 dark:bg-slate-900/90 rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs backdrop-blur-sm overflow-hidden p-4 sm:p-6 transition-colors">
      
      {/* ========================================================================= */}
      {/* 1. HEADER SECTION (With Himalayan Panorama & Badges on the right) */}
      {/* ========================================================================= */}
      <div className="relative rounded-2xl overflow-hidden mb-5 bg-gradient-to-r from-emerald-50/40 via-white to-sky-50/20 dark:from-slate-800/60 dark:via-slate-850 dark:to-slate-800/40 border border-slate-100 dark:border-slate-800">
        
        {/* Himalayan Mountain Panorama Backdrop (Top-Right fading into content) */}
        <div className="absolute right-0 top-0 bottom-0 w-full md:w-3/5 pointer-events-none overflow-hidden select-none">
          <img 
            src={heroHimalayasImg} 
            alt="Himalayan Mountain Range" 
            className="w-full h-full object-cover object-right opacity-35 dark:opacity-20 mix-blend-multiply dark:mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent dark:from-slate-900 dark:via-slate-900/80 dark:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent dark:from-slate-900/90 dark:via-transparent" />
        </div>

        <div className="relative z-10 px-4 py-4 sm:px-6 sm:py-5 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          
          {/* Left: Icon, Title, Live Badge, Subtitle & Slogan */}
          <div className="flex items-start gap-4">
            {/* Green Radio Tower Emblem */}
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200/80 dark:border-emerald-800/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 shadow-xs">
              <RadioTower className="w-8 h-8 stroke-[2.2]" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h2 className="text-xl sm:text-2xl font-bold font-heading text-slate-900 dark:text-white tracking-tight">
                  Sensor Status
                </h2>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  LIVE
                </span>
              </div>
              
              <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 mt-1">
                Real-time health and connectivity of monitoring nodes
              </p>

              <p className="text-[11px] sm:text-xs text-slate-400 dark:text-slate-500 mt-1">
                Monitoring mountain slopes <span className="mx-1 text-slate-300 dark:text-slate-700">|</span> Protecting communities <span className="mx-1 text-slate-300 dark:text-slate-700">|</span> Powered by LoRa IoT
              </p>
            </div>
          </div>

          {/* Right: Safer Mountains Slogan & Badges */}
          <div className="flex flex-col items-start lg:items-end gap-2.5">
            {/* Cursive Slogan over Mountains */}
            <div className="text-right pr-1">
              <span className="font-serif italic text-xs sm:text-sm font-semibold text-slate-700/90 dark:text-slate-200/90 tracking-wide drop-shadow-xs">
                Safer Mountains Stronger Communities
              </span>
            </div>

            {/* Badges Side-by-Side */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              {/* Badge 1: 8/8 Monitoring Nodes */}
              <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-xs border border-slate-200/80 dark:border-slate-700/80 rounded-xl px-3.5 py-2 flex items-center gap-2.5 shadow-2xs">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Network className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold font-mono text-slate-900 dark:text-white leading-tight">
                    {nodes.length ? `${nodes.length} / ${nodes.length}` : '8 / 8'}
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium leading-none mt-0.5">
                    Monitoring Nodes
                  </div>
                </div>
              </div>

              {/* Badge 2: LoRa Network */}
              <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-xs border border-slate-200/80 dark:border-slate-700/80 rounded-xl px-3.5 py-2 flex items-center gap-2.5 shadow-2xs">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Radio className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-tight">
                    LoRa Network
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium leading-none mt-0.5">
                    Long Range • Low Power
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. FILTER BAR & LIVE STATUS INFO */}
      {/* ========================================================================= */}
      <div ref={dropdownRef} className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-5">
        
        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Station Filter Dropdown */}
          <div className="relative">
            <button
              onClick={() => setOpenDropdown(openDropdown === 'station' ? null : 'station')}
              className={`px-3 py-1.5 rounded-xl border text-xs font-medium flex items-center gap-2 transition-all shadow-2xs cursor-pointer ${
                stationFilter !== 'all'
                  ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-300'
                  : 'bg-white dark:bg-slate-800/90 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              <span>
                {stationFilter === 'all' 
                  ? 'All Stations' 
                  : (nodes.find(n => n.id === stationFilter)?.location?.name || stationFilter)}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {openDropdown === 'station' && (
              <div className="absolute left-0 top-full mt-1.5 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 py-1.5 z-30 animate-in fade-in zoom-in-95 duration-100">
                <button
                  onClick={() => { setStationFilter('all'); setOpenDropdown(null); }}
                  className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer ${
                    stationFilter === 'all' ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : 'text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span>All Stations</span>
                  {stationFilter === 'all' && <CheckCircle2 className="w-3.5 h-3.5" />}
                </button>
                {nodes.map(node => (
                  <button
                    key={node.id}
                    onClick={() => { setStationFilter(node.id); setOpenDropdown(null); }}
                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer ${
                      stationFilter === node.id ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : 'text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span>{node.id} • {node.location?.name || node.name}</span>
                    {stationFilter === node.id && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Risk Level Filter Dropdown */}
          <div className="relative">
            <button
              onClick={() => setOpenDropdown(openDropdown === 'risk' ? null : 'risk')}
              className={`px-3 py-1.5 rounded-xl border text-xs font-medium flex items-center gap-2 transition-all shadow-2xs cursor-pointer ${
                riskFilter !== 'all'
                  ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-300'
                  : 'bg-white dark:bg-slate-800/90 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50'
              }`}
            >
              <Shield className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              <span>
                {riskFilter === 'all' && 'All Risk Levels'}
                {riskFilter === 'safe' && 'Safe'}
                {riskFilter === 'warning' && 'Warning'}
                {riskFilter === 'high-risk' && 'High Risk'}
                {riskFilter === 'unknown' && 'Unknown'}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {openDropdown === 'risk' && (
              <div className="absolute left-0 top-full mt-1.5 w-44 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 py-1.5 z-30 animate-in fade-in zoom-in-95 duration-100">
                {[
                  { key: 'all', label: 'All Risk Levels' },
                  { key: 'safe', label: 'Safe' },
                  { key: 'warning', label: 'Warning' },
                  { key: 'high-risk', label: 'High Risk' },
                  { key: 'unknown', label: 'Unknown' },
                ].map(opt => (
                  <button
                    key={opt.key}
                    onClick={() => { setRiskFilter(opt.key); setOpenDropdown(null); }}
                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer ${
                      riskFilter === opt.key ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : 'text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {riskFilter === opt.key && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Status Filter Dropdown */}
          <div className="relative">
            <button
              onClick={() => setOpenDropdown(openDropdown === 'status' ? null : 'status')}
              className={`px-3 py-1.5 rounded-xl border text-xs font-medium flex items-center gap-2 transition-all shadow-2xs cursor-pointer ${
                statusFilter !== 'all'
                  ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-300'
                  : 'bg-white dark:bg-slate-800/90 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50'
              }`}
            >
              <Wifi className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              <span>
                {statusFilter === 'all' ? 'All Status' : statusFilter === 'online' ? 'Online' : 'Offline'}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {openDropdown === 'status' && (
              <div className="absolute left-0 top-full mt-1.5 w-36 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 py-1.5 z-30 animate-in fade-in zoom-in-95 duration-100">
                {[
                  { key: 'all', label: 'All Status' },
                  { key: 'online', label: 'Online' },
                  { key: 'offline', label: 'Offline' },
                ].map(opt => (
                  <button
                    key={opt.key}
                    onClick={() => { setStatusFilter(opt.key); setOpenDropdown(null); }}
                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer ${
                      statusFilter === opt.key ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : 'text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {statusFilter === opt.key && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Reset View Button */}
          <button
            onClick={handleResetFilters}
            className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 text-xs font-medium flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer"
            title="Reset filters to default"
          >
            <RotateCcw className="w-3 h-3 text-slate-400" />
            <span>Reset View</span>
          </button>

        </div>

        {/* Right Label */}
        <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
          Real-time node status and connectivity
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 3. NODE GRID (4x2 on Desktop, 2x4 on Tablet, 1-col on Mobile) */}
      {/* ========================================================================= */}
      {filteredNodes.length === 0 ? (
        <div className="py-12 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
            No monitoring nodes match the selected filters.
          </p>
          <button
            onClick={handleResetFilters}
            className="mt-3 px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-medium hover:bg-emerald-700 transition-colors inline-flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredNodes.map((node) => {
            const isOnline = node.status === 'online';
            const riskLevel = (node.risk?.level || node.riskLevel || 'safe').toLowerCase();
            const batteryLevel = node.device?.battery?.value ?? node.battery ?? 85;
            const rssiVal = isOnline ? (node.device?.signal?.rssi ?? -70) : null;
            const signalMeta = getSignalMeta(rssiVal, node.status);
            const batteryMeta = getBatteryMeta(batteryLevel, node.status);

            // Card border & background styling according to risk
            let cardStyle = "border-emerald-200/80 dark:border-emerald-900/50 bg-emerald-50/20 dark:bg-emerald-950/10";
            if (!isOnline || riskLevel === 'unknown') {
              cardStyle = "border-slate-200/80 dark:border-slate-700/80 bg-slate-50/40 dark:bg-slate-800/30";
            } else if (riskLevel === 'warning') {
              cardStyle = "border-amber-200/80 dark:border-amber-900/50 bg-amber-50/20 dark:bg-amber-950/10";
            } else if (riskLevel === 'high-risk' || riskLevel === 'high risk') {
              cardStyle = "border-rose-200/80 dark:border-rose-900/50 bg-rose-50/20 dark:bg-rose-950/10";
            }

            return (
              <div 
                key={node.id} 
                className={`rounded-2xl border p-3.5 flex flex-col justify-between transition-all hover:shadow-xs hover:border-slate-300 dark:hover:border-slate-600 ${cardStyle}`}
              >
                {/* Top Row: Thumbnail, Title, Location, Online/Offline, Risk Badge */}
                <div>
                  <div className="flex items-start justify-between gap-2">
                    {/* Thumbnail + Details */}
                    <div className="flex items-center gap-2.5 min-w-0">
                      {/* Real Sensor Station Mountain Thumbnail */}
                      <div className="w-14 h-14 min-w-[56px] min-h-[56px] max-w-[56px] max-h-[56px] rounded-xl overflow-hidden shadow-2xs border border-slate-200/80 dark:border-slate-700/80 shrink-0 bg-slate-100 dark:bg-slate-800">
                        <img 
                          src={sensorStationFieldImg} 
                          alt={`${node.id} Field Station`}
                          className="w-full h-full object-cover object-top block"
                        />
                      </div>

                      {/* ID, Location & Status */}
                      <div className="min-w-0">
                        <div className="text-sm font-bold font-mono text-slate-900 dark:text-white leading-tight truncate">
                          {node.id}
                        </div>
                        <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium leading-tight mt-0.5 whitespace-nowrap">
                          {node.location?.name || node.name}
                        </div>
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                          <span className={`text-[11px] font-semibold ${isOnline ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                            {isOnline ? 'Online' : 'Offline'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Risk Badge */}
                    <div className="shrink-0 pt-0.5">
                      {riskLevel === 'safe' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100/90 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-200/70 dark:border-emerald-800/60">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                          Safe
                        </span>
                      )}
                      {riskLevel === 'warning' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100/90 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 border border-amber-200/70 dark:border-amber-800/60">
                          <AlertTriangle className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                          Warning
                        </span>
                      )}
                      {(riskLevel === 'high-risk' || riskLevel === 'high risk') && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-100/90 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300 border border-rose-200/70 dark:border-rose-800/60">
                          <AlertCircle className="w-3 h-3 text-rose-600 dark:text-rose-400" />
                          High Risk
                        </span>
                      )}
                      {riskLevel === 'unknown' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100/90 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200/70 dark:border-slate-700/60">
                          <HelpCircle className="w-3 h-3 text-slate-500 dark:text-slate-400" />
                          Unknown
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Middle Section: 3 Telemetry Metrics */}
                  <div className="grid grid-cols-3 gap-1 mt-2.5 pt-1 items-center text-center">
                    
                    {/* Battery */}
                    <div className="flex flex-col items-center">
                      <div className="flex items-center justify-center h-4 mb-0.5">
                        <Battery className={`w-4 h-4 ${batteryMeta.color}`} />
                      </div>
                      <span className="text-xs font-bold font-mono text-slate-800 dark:text-slate-200 leading-tight">
                        {batteryLevel}%
                      </span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                        Battery
                      </span>
                    </div>

                    {/* LoRa RSSI */}
                    <div className="flex flex-col items-center">
                      <div className="flex items-center justify-center h-4 mb-0.5">
                        <Signal className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
                      </div>
                      <span className="text-xs font-bold font-mono text-slate-800 dark:text-slate-200 leading-tight">
                        {rssiVal !== null ? `${rssiVal} dBm` : '--'}
                      </span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                        LoRa RSSI
                      </span>
                    </div>

                    {/* Signal Quality */}
                    <div className="flex flex-col items-center">
                      {/* Stepped bar visualization */}
                      <div className="flex items-end justify-center gap-0.5 h-4 mb-0.5">
                        {[1, 2, 3, 4].map(bar => (
                          <span
                            key={bar}
                            style={{ height: `${bar * 3.2}px` }}
                            className={`w-1 rounded-xs ${
                              bar <= signalMeta.bars 
                                ? (signalMeta.bars >= 3 ? 'bg-emerald-500' : signalMeta.bars === 2 ? 'bg-amber-500' : 'bg-rose-500') 
                                : 'bg-slate-200 dark:bg-slate-700'
                            }`}
                          />
                        ))}
                      </div>
                      <span className={`text-xs font-bold leading-tight ${signalMeta.color}`}>
                        {signalMeta.label}
                      </span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                        Signal Quality
                      </span>
                    </div>

                  </div>
                </div>

                {/* Bottom Row: Timestamp */}
                <div className="mt-2.5 pt-1 flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500">
                  <Clock className="w-3.5 h-3.5 shrink-0" />
                  <span>
                    {isOnline ? 'Last update: Just now' : (node.device?.lastSeen ? `Last seen: ${node.device.lastSeen.replace(/\s*minutes?\s*ago/i, 'm ago')}` : 'Last seen: 18m ago')}
                  </span>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. BOTTOM GATEWAY & NETWORK SUMMARY BAR */}
      {/* ========================================================================= */}
      <div className="mt-5 rounded-2xl px-4 py-3 bg-slate-50/90 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/70 flex flex-wrap items-center justify-between gap-4 text-xs">
        
        {/* Gateway Identifier & Status */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex items-center justify-center text-slate-700 dark:text-slate-200 shadow-2xs shrink-0">
            <Server className="w-4 h-4" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-500 dark:text-slate-400 font-medium">Gateway:</span>
            <span className="font-bold font-mono text-slate-800 dark:text-slate-200">
              {system.gateway?.id || 'EDGE-GW-01'}
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Online
            </span>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 font-medium">
          <MapPin className="w-3.5 h-3.5 text-slate-400" />
          <span>Base Station (Valley)</span>
        </div>

        {/* Packet Success */}
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-slate-400" />
          <div>
            <div className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider font-semibold leading-none">
              Packet Success
            </div>
            <div className="text-xs font-bold font-mono text-slate-800 dark:text-slate-200 mt-0.5">
              {system.network?.packetSuccessRate ?? 98.6}%
            </div>
          </div>
        </div>

        {/* Average RSSI */}
        <div className="flex items-center gap-2">
          <Signal className="w-4 h-4 text-emerald-500" />
          <div>
            <div className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider font-semibold leading-none">
              Average RSSI
            </div>
            <div className="text-xs font-bold font-mono text-slate-800 dark:text-slate-200 mt-0.5">
              {system.network?.averageRssi ?? -73} dBm
            </div>
          </div>
        </div>

        {/* Average SNR */}
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-sky-500" />
          <div>
            <div className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider font-semibold leading-none">
              Average SNR
            </div>
            <div className="text-xs font-bold font-mono text-slate-800 dark:text-slate-200 mt-0.5">
              {system.network?.averageSnr ?? 8.4}
            </div>
          </div>
        </div>

        {/* Last sync */}
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-slate-400" />
          <div>
            <div className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider font-semibold leading-none">
              Last sync
            </div>
            <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5">
              Just now
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default SensorStatusCard;
