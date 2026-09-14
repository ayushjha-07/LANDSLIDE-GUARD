import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  Search, 
  Bell, 
  Menu, 
  ChevronDown, 
  AlertTriangle, 
  X, 
  Radio, 
  User, 
  MapPin,
  BrainCircuit,
  Settings
} from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import UserMenu from '../UserMenu';
import { useAlertContext } from '../../context/AlertContext';
import { MOCK_ALERTS } from '../../data/mockData';

const ROUTE_TITLES = {
  '/dashboard': { title: 'Dashboard', fullTitle: 'Operational Dashboard', subtitle: 'Real-time telemetry, risk analysis & system health' },
  '/sensors': { title: 'Live Sensors', fullTitle: 'Live Geotechnical Sensors', subtitle: 'Borehole pore pressure, soil moisture & displacement telemetry' },
  '/risk-analysis': { title: 'Risk Analysis', fullTitle: 'AI Risk Analysis', subtitle: 'Machine Learning driven landslide risk assessment for safer communities' },
  '/map': { title: 'Monitoring Map', fullTitle: 'Himachal Pradesh Monitoring Map', subtitle: 'Real geographic map with prototype landslide-monitoring nodes' },
  '/alerts': { title: 'Alerts', fullTitle: 'Early Warning Alerts', subtitle: 'Automated threshold dispatches & community hazard notifications' },
  '/reports': { title: 'Reports', fullTitle: 'Reports & Analytics', subtitle: 'Historical monitoring data, risk trends and system performance insights' },
  '/devices': { title: 'Devices', fullTitle: 'Hardware & LoRa Nodes', subtitle: 'ESP32 microcontroller telemetry, RSSI signal & battery metrics' },
  '/settings': { title: 'Settings', fullTitle: 'System Settings', subtitle: 'Sensor calibration, alert triggers & network frequency' },
  '/login': { title: 'Login', fullTitle: 'Operator Authentication', subtitle: 'Civil defense secure access portal' }
};

export const Header = ({ onOpenSidebar }) => {
  const location = useLocation();
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showAlertsDropdown, setShowAlertsDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const alertCtx = useAlertContext();
  const activeAlerts = alertCtx?.activeAlerts || [];

  const routeInfo = ROUTE_TITLES[location.pathname] || {
    title: 'Landslide Guard',
    fullTitle: 'Landslide Guard',
    subtitle: 'AI-Powered Landslide Early Warning System'
  };

  const isSensors = location.pathname === '/sensors';
  const isRisk = location.pathname === '/risk-analysis';
  const isSettings = location.pathname === '/settings';
  const isStyledPage = isSensors || isRisk || isSettings;

  return (
    <header className={`sticky top-0 z-30 flex items-center justify-between h-16 px-3 sm:px-4 md:px-6 lg:px-8 backdrop-blur-md transition-colors duration-200 box-border w-full min-w-0 ${
      isStyledPage 
        ? 'bg-white/80 dark:bg-[#070d18]/85 text-slate-900 dark:text-white border-b border-slate-200/80 dark:border-slate-800/80 shadow-xs dark:shadow-md' 
        : 'bg-white/95 dark:bg-[#0E131F]/95 text-[#2D3748] dark:text-[#E2E8F0] border-b border-[#E2E8F0] dark:border-[#2D3748]'
    }`}
    >
      {/* Left: Mobile/Tablet Hamburger + Dynamic Title / Regional Pill */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 mr-2">
        {/* Hamburger button visible on mobile & small tablet (<1024px) */}
        <button
          type="button"
          onClick={onOpenSidebar}
          className={`min-w-[44px] min-h-[44px] w-11 h-11 flex items-center justify-center rounded-xl border lg:hidden flex-shrink-0 transition-colors ${
            isStyledPage
              ? 'text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-white/80 dark:bg-slate-900/80 border-slate-200/80 dark:border-slate-700'
              : 'text-[#2D3748] hover:text-[#1A202C] dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border-[#E2E8F0] dark:border-[#2D3748]'
          }`}
          aria-label="Open navigation drawer"
        >
          <Menu className="w-5 h-5" />
        </button>

        {isRisk ? (
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <BrainCircuit className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="min-w-0">
                <h1 className="text-base sm:text-lg font-bold font-heading text-slate-900 dark:text-white truncate leading-tight">
                  AI Risk Analysis
                </h1>
                <p className="hidden md:block text-[11px] text-slate-500 dark:text-slate-400 truncate">
                  Machine Learning driven landslide risk assessment for safer communities
                </p>
              </div>
            </div>

            {/* Regional Location Pill strictly matching visual reference */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50/90 dark:bg-slate-900/85 border border-slate-200/80 dark:border-slate-800 shadow-2xs backdrop-blur-md text-slate-800 dark:text-white ml-2">
              <MapPin className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300 shrink-0" />
              <div className="text-left leading-tight">
                <div className="text-[11px] font-bold text-slate-900 dark:text-white">Kullu - Manali Region</div>
                <div className="text-[9.5px] text-slate-500 dark:text-slate-400">Himachal Pradesh</div>
              </div>
            </div>
          </div>
        ) : isSensors ? (
          <div className="flex items-center gap-2.5 min-w-0">
            {/* Regional Location Pill strictly matching visual reference */}
            <div className="px-3.5 py-1.5 rounded-xl bg-white/85 dark:bg-slate-900/85 border border-slate-200/80 dark:border-white/15 shadow-xs backdrop-blur-md flex items-center gap-2 text-slate-800 dark:text-white">
              <MapPin className="w-3.5 h-3.5 text-sky-500 dark:text-emerald-400 shrink-0" />
              <div className="text-left leading-tight">
                <div className="text-[11.5px] font-bold text-slate-900 dark:text-white">Himachal Pradesh</div>
                <div className="text-[9.5px] text-slate-500 dark:text-slate-400">Kullu - Manali Region</div>
              </div>
            </div>
          </div>
        ) : isSettings ? (
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <Settings className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="min-w-0">
                <h1 className="text-base sm:text-lg font-bold font-heading text-slate-900 dark:text-white truncate leading-tight">
                  System Settings
                </h1>
                <p className="hidden md:block text-[11px] text-slate-500 dark:text-slate-400 truncate">
                  Sensor calibration, alert triggers & network frequency
                </p>
              </div>
            </div>

            {/* Regional Location Pill strictly matching visual reference */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50/90 dark:bg-slate-900/85 border border-slate-200/80 dark:border-slate-800 shadow-2xs backdrop-blur-md text-slate-800 dark:text-white ml-2">
              <MapPin className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300 shrink-0" />
              <div className="text-left leading-tight">
                <div className="text-[11px] font-bold text-slate-900 dark:text-white">Kullu – Manali Region</div>
                <div className="text-[9.5px] text-slate-500 dark:text-slate-400">Himachal Pradesh</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="min-w-0 flex-1">
            <h1 className="text-base sm:text-lg md:text-xl font-bold font-heading text-[#1A202C] dark:text-white truncate leading-tight">
              <span className="sm:hidden">{routeInfo.title}</span>
              <span className="hidden sm:inline">{routeInfo.fullTitle}</span>
            </h1>
            <p className="hidden md:block text-xs text-[#718096] dark:text-slate-400 truncate">
              {routeInfo.subtitle}
            </p>
          </div>
        )}
      </div>

      {/* Right Controls: Search, Notification, ONE Theme Button, User Profile */}
      <div className="flex items-center gap-1.5 sm:gap-2 md:gap-2.5 flex-shrink-0">
        {/* Search button / trigger */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setShowSearchModal(prev => !prev);
              setShowAlertsDropdown(false);
              setShowUserDropdown(false);
            }}
            className={`min-w-[44px] min-h-[44px] px-2.5 sm:px-3 flex items-center justify-center gap-2 rounded-xl text-xs transition-colors ${
              isSensors
                ? 'text-slate-600 dark:text-slate-200 bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 shadow-xs'
                : 'text-[#2D3748] dark:text-slate-300 bg-slate-50 dark:bg-[#1A202C] border border-[#E2E8F0] dark:border-[#2D3748] hover:border-forest-500 dark:hover:border-forest-400'
            }`}
            aria-label="Search telemetry & sensors"
          >
            <Search className="w-4 h-4 text-slate-400" />
            <span className="hidden md:inline">Search nodes, parameters...</span>
            <kbd className={`hidden xl:inline-block px-1.5 py-0.5 text-[10px] font-mono rounded ${
              isSensors ? 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-300 border border-slate-200 dark:border-slate-700' : 'bg-slate-200 dark:bg-slate-800 text-[#4A5568] dark:text-slate-300'
            }`}>
              Ctrl K
            </kbd>
          </button>

          {/* Quick search modal: responsive positioning, width never overflows viewport */}
          {showSearchModal && (
            <>
              <div 
                className="fixed inset-0 z-40 bg-black/20 sm:hidden"
                onClick={() => setShowSearchModal(false)}
              />
              <div className="fixed sm:absolute right-4 sm:right-0 top-16 sm:top-auto sm:mt-2 w-[calc(100vw-32px)] sm:w-80 p-3 rounded-2xl bg-white dark:bg-[#1A202C] border border-[#E2E8F0] dark:border-[#2D3748] shadow-xl z-50">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E2E8F0] dark:border-[#2D3748]/60 sm:hidden">
                  <span className="text-xs font-semibold text-[#1A202C] dark:text-white">Search System</span>
                  <button 
                    onClick={() => setShowSearchModal(false)} 
                    className="p-1 text-slate-400 hover:text-slate-600 min-w-[32px] min-h-[32px] flex items-center justify-center"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#0E131F] border border-[#E2E8F0] dark:border-[#2D3748]">
                  <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <input 
                    type="text" 
                    placeholder="Filter sensors, LoRa nodes, sectors..." 
                    className="w-full bg-transparent text-xs text-[#1A202C] dark:text-white focus:outline-none placeholder:text-slate-400"
                    autoFocus
                  />
                </div>
                <div className="mt-2.5 px-1 text-[11px] text-[#718096] dark:text-slate-400">
                  Quick links: <span className="font-mono text-forest-600 dark:text-nature-400 cursor-pointer hover:underline">LG-NODE-01</span>, <span className="font-mono text-forest-600 dark:text-nature-400 cursor-pointer hover:underline">Inclinometer</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setShowAlertsDropdown(prev => !prev);
              setShowSearchModal(false);
              setShowUserDropdown(false);
            }}
            className={`relative min-w-[44px] min-h-[44px] w-11 h-11 flex items-center justify-center rounded-xl transition-colors ${
              isSensors
                ? 'text-slate-600 dark:text-slate-200 bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 shadow-xs'
                : 'text-[#2D3748] dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-[#E2E8F0] dark:border-[#2D3748]'
            }`}
            aria-label="Early Warning Notifications"
            title="System Alerts & Warnings"
          >
            <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="absolute top-2.5 right-2.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
            </span>
          </button>

          {/* Notifications dropdown with mobile viewport containment */}
          {showAlertsDropdown && (
            <>
              <div 
                className="fixed inset-0 z-40 bg-black/20 sm:hidden"
                onClick={() => setShowAlertsDropdown(false)}
              />
              <div className="fixed sm:absolute right-4 sm:right-0 top-16 sm:top-auto sm:mt-2 w-[calc(100vw-32px)] sm:w-80 md:w-96 rounded-2xl bg-white dark:bg-[#1A202C] border border-[#E2E8F0] dark:border-[#2D3748] shadow-xl z-50 overflow-hidden max-h-[80vh] flex flex-col">
                <div className="p-3.5 border-b border-[#E2E8F0] dark:border-[#2D3748]/60 flex items-center justify-between flex-shrink-0">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-orange-500" />
                    <span className="text-xs font-semibold font-heading text-[#1A202C] dark:text-white">Active Early Warnings</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 font-medium">
                    {activeAlerts.length} Pending
                  </span>
                </div>
                <div className="divide-y divide-[#E2E8F0] dark:divide-[#2D3748]/40 overflow-y-auto max-h-72">
                  {activeAlerts.length > 0 ? (
                    activeAlerts.map(alert => (
                      <div key={alert.id} className="p-3 hover:bg-slate-50 dark:hover:bg-[#0E131F]/40 text-left transition-colors">
                        <div className="flex items-center justify-between text-[11px] mb-1">
                          <span className="font-semibold text-[#1A202C] dark:text-white">{alert.title}</span>
                          <span className="text-slate-400 text-[10px] font-mono">{alert.timestamp}</span>
                        </div>
                        <p className="text-[11px] text-[#718096] dark:text-slate-300 leading-relaxed">
                          <strong className="font-mono text-forest-600 dark:text-nature-400">{alert.node}:</strong> {alert.details}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-xs text-[#718096] dark:text-slate-400">
                      No pending early warnings.
                    </div>
                  )}
                </div>
                <div className="p-2 border-t border-[#E2E8F0] dark:border-[#2D3748]/60 text-center bg-slate-50/50 dark:bg-[#0E131F]/30">
                  <Link 
                    to="/alerts" 
                    onClick={() => setShowAlertsDropdown(false)}
                    className="text-xs text-forest-600 dark:text-nature-400 font-semibold hover:underline"
                  >
                    Open Alert Center &rarr;
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>

        {/* EXACTLY ONE THEME BUTTON (44x44px touch target) */}
        <ThemeToggle />

        {/* User Profile Menu with Session Management */}
        <UserMenu />
      </div>
    </header>
  );
};

export default Header;
