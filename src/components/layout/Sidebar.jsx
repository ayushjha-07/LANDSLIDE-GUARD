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
  Leaf, 
  CheckCircle2, 
  ShieldCheck, 
  Share2 
} from 'lucide-react';
import { BrandIcon, BrandLogo } from '../common/BrandLogo';
import { SYSTEM_INFO } from '../../data/mockData';
import sidebarHimalayanWaterfall from '../../assets/sidebar_himalayan_waterfall.jpg';
import heroHimalayasBannerImg from '../../assets/hero_himalayas_banner.jpg';

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
          className="fixed inset-0 z-40 bg-stone-950/70 backdrop-blur-sm lg:hidden transition-opacity duration-300"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* 2. Sidebar Component with 3-tier Breakpoints & Continuous Himalayan Composition */}
      <aside 
        className={`
          fixed top-0 bottom-0 left-0 z-50 
          bg-white dark:bg-[#061812] text-slate-800 dark:text-white
          border-r border-slate-200 dark:border-emerald-950/60
          transition-all duration-300 ease-in-out
          overflow-hidden select-none
          
          /* Mobile (<768px): 280px off-canvas drawer */
          w-[280px] ${isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}

          /* Tablet (768px - 1023px): Collapsed 80px sidebar (or expanded to 256px if toggled) */
          md:translate-x-0 ${isTabletExpanded ? 'md:w-64' : 'md:w-20'}

          /* Desktop (≥1024px): Full fixed 256px sidebar */
          lg:w-64 lg:translate-x-0
        `}
      >
        {/* ==================================================
            CONTINUOUS HIMALAYAN MOUNTAIN & WATERFALL BACKDROP
            Spans the full height of the sidebar from snow peaks to roaring river
            ================================================== */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover pointer-events-none z-0 select-none opacity-20 dark:opacity-85"
          style={{ 
            backgroundImage: `url(${sidebarHimalayanWaterfall})`,
            backgroundPosition: 'right 20% top'
          }}
          aria-hidden="true"
        />

        {/* Left-to-right gradient overlay: pure white wash in light mode, dark forest green in dark mode */}
        <div 
          className="absolute inset-0 pointer-events-none z-0 bg-gradient-to-r from-white via-white/95 via-[65%] to-white/40 dark:from-[#061812] dark:via-[#061812]/92 dark:via-[62%] dark:to-[#061812]/25"
          aria-hidden="true"
        />

        {/* Top and bottom subtle vignettes */}
        <div 
          className="absolute inset-0 pointer-events-none z-0 bg-gradient-to-b from-white/90 via-transparent to-white/90 dark:from-[#061812]/80 dark:via-transparent dark:to-[#061812]/90"
          aria-hidden="true"
        />

        {/* ==================================================
            SIDEBAR CONTENT: Single Scrollable Flow
            ================================================== */}
        <div className="relative z-10 flex flex-col justify-between h-full overflow-y-auto no-scrollbar">
          
          {/* TOP SECTION: Brand Header & Nav List */}
          <div className="flex flex-col min-w-0">
            
            {/* Brand Header */}
            <div className="h-16 px-4 border-b border-slate-100 dark:border-emerald-500/15 flex items-center justify-between min-w-0 backdrop-blur-xs">
              {/* Full Logo: Mobile, Desktop, or Expanded Tablet */}
              <div className={`min-w-0 ${!isTabletExpanded ? 'block md:hidden lg:block' : 'block'}`}>
                <BrandLogo size="md" showTagline={true} theme="auto" />
              </div>

              {/* Collapsed Icon-only Logo: Tablet default */}
              <div className={`w-full flex items-center justify-center ${!isTabletExpanded ? 'hidden md:flex lg:hidden' : 'hidden'}`}>
                <div className="p-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-500/40 shadow-xs" title="Landslide Guard">
                  <BrandIcon className="w-7 h-7" mode="auto" />
                </div>
              </div>

              {/* Close button for Mobile Drawer */}
              <button 
                type="button" 
                onClick={onClose}
                className="min-w-[40px] min-h-[40px] w-10 h-10 flex items-center justify-center rounded-xl text-slate-500 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-emerald-950/50 md:hidden"
                aria-label="Close navigation drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation List (All 8 Items) */}
            <div className="px-2.5 sm:px-3 pt-3.5 pb-2 space-y-1 min-w-0">
              <div className={`px-3 pb-1.5 text-[9.5px] font-bold uppercase tracking-wider text-slate-400 dark:text-emerald-300/80 ${!isTabletExpanded ? 'block md:hidden lg:block' : 'block'}`}>
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
                      min-h-[38px] flex items-center rounded-xl text-xs sm:text-[13px] font-medium transition-all duration-200 group
                      ${!isTabletExpanded ? 'justify-start md:justify-center lg:justify-between px-3 md:px-0 lg:px-3' : 'justify-between px-3'}
                      ${isActive 
                        ? 'bg-emerald-50 text-emerald-800 font-semibold border border-emerald-300/80 shadow-xs dark:bg-[#0e4a3b]/90 dark:text-white dark:border-emerald-500/30 backdrop-blur-xs' 
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-emerald-950/40 dark:hover:text-white'
                      }
                    `}
                  >
                    {({ isActive }) => (
                      <>
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Icon className={`w-4.5 h-4.5 flex-shrink-0 ${isActive ? 'text-emerald-600 dark:text-emerald-300' : 'text-slate-400 group-hover:text-slate-800 dark:group-hover:text-white'}`} />
                          <span className={`truncate ${!isTabletExpanded ? 'block md:hidden lg:block' : 'block'}`}>
                            {item.label}
                          </span>
                        </div>
                        {item.badge && (
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10.5px] font-bold flex-shrink-0 shadow-2xs ${!isTabletExpanded ? 'flex md:hidden lg:flex' : 'flex'} ${
                            isActive 
                              ? 'bg-rose-500 text-white dark:bg-white/20 dark:text-white' 
                              : 'bg-rose-500 text-white dark:bg-orange-500/25 dark:text-orange-300 dark:border dark:border-orange-500/30'
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

          </div>

          {/* Tablet Expand/Collapse Toggle Button (768px - 1023px) */}
          <div className="hidden md:flex lg:hidden px-3 py-1.5 justify-center">
            <button
              type="button"
              onClick={() => setIsTabletExpanded(prev => !prev)}
              className="min-h-[38px] min-w-[38px] w-full flex items-center justify-center gap-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-emerald-950/50 text-xs font-medium"
              title={isTabletExpanded ? "Collapse sidebar" : "Expand sidebar"}
            >
              {isTabletExpanded ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              {isTabletExpanded && <span>Collapse</span>}
            </button>
          </div>

          {/* ==================================================
              BOTTOM SECTION: Network Health & Continuous Himalayan Safety
          {/* ==================================================
              BOTTOM SECTION: LoRa Gateway & Himalayan Safety
              ================================================== */}
          <div className="p-2.5 sm:p-3 pt-2 space-y-2.5 min-w-0 flex flex-col justify-end">
            
            {/* 1. LoRa Gateway Card */}
            <div className={`min-w-0 ${!isTabletExpanded ? 'block md:hidden lg:block' : 'block'}`}>
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#07131d] border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-md space-y-1 transition-all">
                <div className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-semibold">LoRa Gateway</span>
                </div>
                <div className="text-sm font-bold text-emerald-500 dark:text-emerald-400">
                  Online
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  Nodes: <span className="font-semibold font-mono text-slate-800 dark:text-white">8/8 Online</span>
                </div>
              </div>
            </div>

            {/* Compact Indicators: Tablet default (collapsed 80px) */}
            <div className={`py-2 space-y-2 flex flex-col items-center ${!isTabletExpanded ? 'hidden md:flex lg:hidden' : 'hidden'}`}>
              <div 
                className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-[#091b15]/90 border border-slate-200 dark:border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 relative cursor-pointer hover:border-emerald-400" 
                title="LoRa Gateway: Online (8/8 Nodes)"
              >
                <Activity className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <div 
                className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-emerald-950/70 border border-slate-200 dark:border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-[#34D399] cursor-pointer hover:border-emerald-400" 
                title="Himalayan Safety: Safer Mountains, Stronger Communities"
              >
                <Leaf className="w-5 h-5" />
              </div>
            </div>

            {/* 2. Himalayan Safety Mountain Card */}
            <div className={`min-w-0 ${!isTabletExpanded ? 'block md:hidden lg:block' : 'block'}`}>
              <div className="relative rounded-2xl overflow-hidden p-3 border border-slate-200 dark:border-slate-800/90 shadow-sm dark:shadow-md group">
                <div 
                  className="absolute inset-0 bg-cover bg-[center_30%] pointer-events-none opacity-40 dark:opacity-75 transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${heroHimalayasBannerImg})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-white/40 dark:from-[#050b10] dark:via-[#050b10]/75 dark:to-[#050b10]/40" />
                <div className="relative z-10 flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                    <Leaf className="w-4 h-4" />
                  </div>
                  <div className="leading-tight">
                    <div className="text-xs font-bold text-slate-900 dark:text-white">
                      Himalayan Safety
                    </div>
                    <div className="text-[10px] text-slate-600 dark:text-emerald-300/90 font-medium">
                      Our Shared Responsibility
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </aside>
    </>
  );
};

export default Sidebar;
