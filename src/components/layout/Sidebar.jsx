import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Activity, 
  BrainCircuit, 
  Map, 
  AlertTriangle, 
  FileText, 
  Cpu, 
  Settings,
  X,
  ChevronLeft,
  ChevronRight,
  Radio
} from 'lucide-react';
import { BrandIcon, BrandLogo } from '../common/BrandLogo';
import { SYSTEM_INFO } from '../../data/mockData';

const NAV_ITEMS = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/sensors', label: 'Live Sensors', icon: Activity },
  { path: '/risk-analysis', label: 'Risk Analysis', icon: BrainCircuit },
  { path: '/map', label: 'Monitoring Map', icon: Map },
  { path: '/alerts', label: 'Alerts', icon: AlertTriangle, badge: '2' },
  { path: '/reports', label: 'Reports', icon: FileText },
  { path: '/devices', label: 'Devices', icon: Cpu },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export const Sidebar = ({ isOpen, onClose }) => {
  // isTabletExpanded manages expanding the tablet 80px sidebar to 256px on user interaction
  const [isTabletExpanded, setIsTabletExpanded] = useState(false);

  return (
    <>
      {/* 1. Mobile Backdrop (<1024px) */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-stone-950/60 backdrop-blur-sm lg:hidden transition-opacity duration-300"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* 2. Sidebar Component with 3-tier Breakpoints */}
      <aside 
        className={`
          fixed top-0 bottom-0 left-0 z-50 
          bg-white dark:bg-[#0E131F] 
          border-r border-[#E2E8F0] dark:border-[#2D3748]
          flex flex-col justify-between 
          transition-all duration-300 ease-in-out
          
          /* Mobile (<768px): 280px off-canvas drawer */
          w-[280px] ${isOpen ? 'translate-x-0' : '-translate-x-full'}

          /* Tablet (768px - 1023px): Collapsed 80px sidebar (or expanded to 256px if toggled) */
          md:translate-x-0 ${isTabletExpanded ? 'md:w-64' : 'md:w-20'}

          /* Desktop (≥1024px): Full fixed 256px sidebar */
          lg:w-64 lg:translate-x-0
        `}
      >
        {/* Brand Header */}
        <div className="h-16 px-4 border-b border-[#E2E8F0] dark:border-[#2D3748] flex items-center justify-between min-w-0">
          {/* Full Logo: Mobile, Desktop, or Expanded Tablet */}
          <div className={`min-w-0 ${!isTabletExpanded ? 'hidden md:hidden lg:block' : 'block'}`}>
            <BrandLogo size="md" showTagline={true} />
          </div>

          {/* Collapsed Icon-only Logo: Tablet default */}
          <div className={`w-full flex items-center justify-center ${!isTabletExpanded ? 'hidden md:flex lg:hidden' : 'hidden'}`}>
            <div className="p-1.5 rounded-xl bg-forest-50 dark:bg-forest-950/60 border border-forest-200/80 dark:border-forest-800/80 shadow-sm" title="Landslide Guard">
              <BrandIcon className="w-7 h-7" />
            </div>
          </div>

          {/* Close button for Mobile Drawer */}
          <button 
            type="button" 
            onClick={onClose}
            className="min-w-[44px] min-h-[44px] w-11 h-11 flex items-center justify-center rounded-xl text-[#718096] hover:text-[#1A202C] dark:text-slate-400 dark:hover:text-white md:hidden"
            aria-label="Close navigation drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-2 md:px-3 py-4 space-y-1.5 min-w-0">
          <div className={`px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-[#718096] dark:text-slate-400 ${!isTabletExpanded ? 'hidden md:hidden lg:block' : 'block'}`}>
            Telemetry Operations
          </div>
          
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => {
                  if (window.innerWidth < 768) {
                    onClose();
                  }
                }}
                title={item.label}
                className={({ isActive }) => `
                  min-h-[44px] flex items-center rounded-xl text-xs md:text-sm font-medium transition-all duration-200 group
                  ${!isTabletExpanded ? 'justify-start md:justify-center lg:justify-between px-3 md:px-0 lg:px-3.5' : 'justify-between px-3.5'}
                  ${isActive 
                    ? 'bg-forest-600 text-white dark:bg-forest-700 dark:text-white shadow-sm' 
                    : 'text-[#4A5568] dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-[#1A202C] dark:hover:text-white'
                  }
                `}
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3 min-w-0">
                      <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : 'text-[#718096] dark:text-slate-400 group-hover:text-[#1A202C] dark:group-hover:text-white'}`} />
                      <span className={`truncate ${!isTabletExpanded ? 'block md:hidden lg:block' : 'block'}`}>
                        {item.label}
                      </span>
                    </div>
                    {item.badge && (
                      <span className={`px-2 py-0.5 text-[10px] rounded-full font-bold flex-shrink-0 ${!isTabletExpanded ? 'block md:hidden lg:block' : 'block'} ${
                        isActive 
                          ? 'bg-white/20 text-white dark:bg-white/20 dark:text-white' 
                          : 'bg-orange-500/10 text-orange-600 dark:bg-orange-950/50 dark:text-orange-400'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Tablet Expand/Collapse Toggle Button (768px - 1023px) */}
        <div className="hidden md:flex lg:hidden px-3 py-2 border-t border-[#E2E8F0] dark:border-[#2D3748] justify-center">
          <button
            type="button"
            onClick={() => setIsTabletExpanded(prev => !prev)}
            className="min-h-[44px] min-w-[44px] w-full flex items-center justify-center gap-2 rounded-xl text-[#718096] hover:text-[#1A202C] dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium"
            title={isTabletExpanded ? "Collapse sidebar" : "Expand sidebar"}
          >
            {isTabletExpanded ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            {isTabletExpanded && <span>Collapse</span>}
          </button>
        </div>

        {/* System & LoRa Hardware Status Card */}
        <div className="p-3 lg:p-4 border-t border-[#E2E8F0] dark:border-[#2D3748] min-w-0">
          {/* Full status card: Mobile, Desktop, and Expanded Tablet */}
          <div className={`p-3.5 rounded-xl bg-[#F7FAFC] dark:bg-[#1A202C] border border-[#E2E8F0] dark:border-[#2D3748] space-y-2 min-w-0 ${!isTabletExpanded ? 'block md:hidden lg:block' : 'block'}`}>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-nature-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-nature-500" />
                </span>
                <span className="font-medium text-[#2D3748] dark:text-slate-200">LoRa Gateway</span>
              </div>
              <span className="text-[11px] font-mono font-medium text-forest-600 dark:text-nature-400 bg-forest-50 dark:bg-forest-950/60 px-1.5 py-0.5 rounded">
                868.1 MHz
              </span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-[#718096] dark:text-slate-400 pt-1 border-t border-[#E2E8F0] dark:border-[#2D3748]/60">
              <span>Nodes: <strong className="text-[#2D3748] dark:text-slate-200">14/16 Online</strong></span>
              <span className="text-forest-600 dark:text-nature-400 font-medium">Ready</span>
            </div>
          </div>

          {/* Compact Icon Indicator: Tablet default */}
          <div className={`flex justify-center ${!isTabletExpanded ? 'hidden md:flex lg:hidden' : 'hidden'}`} title="LoRa Gateway: 14/16 Online">
            <div className="w-10 h-10 rounded-xl bg-forest-50 dark:bg-forest-950/60 border border-forest-200 dark:border-forest-800 flex items-center justify-center text-forest-600 dark:text-nature-400 relative">
              <Radio className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-nature-500" />
            </div>
          </div>

          <div className={`mt-2 text-center ${!isTabletExpanded ? 'block md:hidden lg:block' : 'block'}`}>
            <p className="text-[11px] text-[#718096] dark:text-slate-400 truncate">
              Landslide Guard &bull; Civil Protection
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
