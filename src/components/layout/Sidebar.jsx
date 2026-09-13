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
          bg-[#061812] dark:bg-[#08151c] text-white
          border-r border-emerald-950/60 dark:border-emerald-900/40
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
          className="absolute inset-0 w-full h-full bg-cover pointer-events-none z-0 select-none opacity-85 dark:opacity-90"
          style={{ 
            backgroundImage: `url(${sidebarHimalayanWaterfall})`,
            backgroundPosition: 'right 20% top'
          }}
          aria-hidden="true"
        />

        {/* Left-to-right dark forest green / deep navy gradient overlay */}
        <div 
          className="absolute inset-0 pointer-events-none z-0 bg-gradient-to-r from-[#061812] via-[#061812]/92 via-[62%] to-[#061812]/25 dark:from-[#08151c] dark:via-[#08151c]/94 dark:via-[62%] dark:to-[#08151c]/30"
          aria-hidden="true"
        />

        {/* Top and bottom subtle vignettes */}
        <div 
          className="absolute inset-0 pointer-events-none z-0 bg-gradient-to-b from-[#061812]/80 via-transparent to-[#061812]/90 dark:from-[#08151c]/80 dark:via-transparent dark:to-[#08151c]/90"
          aria-hidden="true"
        />

        {/* ==================================================
            SIDEBAR CONTENT: Single Scrollable Flow
            ================================================== */}
        <div className="relative z-10 flex flex-col justify-between h-full overflow-y-auto no-scrollbar">
          
          {/* TOP SECTION: Brand Header & Nav List */}
          <div className="flex flex-col min-w-0">
            
            {/* Brand Header */}
            <div className="h-16 px-4 border-b border-emerald-500/15 flex items-center justify-between min-w-0 backdrop-blur-xs">
              {/* Full Logo: Mobile, Desktop, or Expanded Tablet */}
              <div className={`min-w-0 ${!isTabletExpanded ? 'block md:hidden lg:block' : 'block'}`}>
                <BrandLogo size="md" showTagline={true} theme="dark" />
              </div>

              {/* Collapsed Icon-only Logo: Tablet default */}
              <div className={`w-full flex items-center justify-center ${!isTabletExpanded ? 'hidden md:flex lg:hidden' : 'hidden'}`}>
                <div className="p-1.5 rounded-xl bg-emerald-950/70 border border-emerald-500/40 shadow-sm" title="Landslide Guard">
                  <BrandIcon className="w-7 h-7" mode="dark" />
                </div>
              </div>

              {/* Close button for Mobile Drawer */}
              <button 
                type="button" 
                onClick={onClose}
                className="min-w-[40px] min-h-[40px] w-10 h-10 flex items-center justify-center rounded-xl text-slate-300 hover:text-white hover:bg-emerald-950/50 md:hidden"
                aria-label="Close navigation drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation List (All 8 Items) */}
            <div className="px-2.5 sm:px-3 pt-3.5 pb-2 space-y-1 min-w-0">
              <div className={`px-3 pb-1.5 text-[9.5px] font-bold uppercase tracking-wider text-emerald-300/80 ${!isTabletExpanded ? 'block md:hidden lg:block' : 'block'}`}>
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
                        ? 'bg-[#0e4a3b]/90 text-white shadow-md font-semibold border border-emerald-500/30 backdrop-blur-xs' 
                        : 'text-slate-300 hover:bg-emerald-950/40 hover:text-white'
                      }
                    `}
                  >
                    {({ isActive }) => (
                      <>
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Icon className={`w-4.5 h-4.5 flex-shrink-0 ${isActive ? 'text-emerald-300' : 'text-slate-400 group-hover:text-white'}`} />
                          <span className={`truncate ${!isTabletExpanded ? 'block md:hidden lg:block' : 'block'}`}>
                            {item.label}
                          </span>
                        </div>
                        {item.badge && (
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10.5px] font-bold flex-shrink-0 shadow-2xs ${!isTabletExpanded ? 'flex md:hidden lg:flex' : 'flex'} ${
                            isActive 
                              ? 'bg-white/20 text-white' 
                              : 'bg-orange-500/25 text-orange-300 border border-orange-500/30'
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
              className="min-h-[38px] min-w-[38px] w-full flex items-center justify-center gap-2 rounded-xl text-slate-300 hover:text-white hover:bg-emerald-950/50 text-xs font-medium"
              title={isTabletExpanded ? "Collapse sidebar" : "Expand sidebar"}
            >
              {isTabletExpanded ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              {isTabletExpanded && <span>Collapse</span>}
            </button>
          </div>

          {/* ==================================================
              BOTTOM SECTION: Network Health & Continuous Himalayan Safety
              ================================================== */}
          <div className="p-2.5 sm:p-3 pt-2 space-y-3 min-w-0 flex flex-col justify-end">
            
            {/* 1. NETWORK HEALTH CARD (Floating dark glassmorphism card) */}
            <div className={`min-w-0 ${!isTabletExpanded ? 'block md:hidden lg:block' : 'block'}`}>
              <div className="p-3 rounded-2xl bg-[#071913]/85 border border-emerald-500/25 backdrop-blur-md shadow-xl text-white space-y-2.5 transition-all hover:border-emerald-500/40">
                
                {/* Header: Title & Action */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-slate-100 font-heading text-[11px]">
                    <Activity className="w-3.5 h-3.5 text-[#34D399]" />
                    <span>Network Health</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </div>

                {/* Gateway Online Status & Mini LoRa Antenna Graphic */}
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                      </span>
                      <span>Gateway Online</span>
                    </div>
                    <div className="text-[10px] font-mono text-slate-400 pl-3.5 mt-0.5">
                      EDGE-GW-01
                    </div>
                  </div>

                  {/* Mini LoRa Gateway SVG graphic */}
                  <div className="relative w-11 h-9 flex-shrink-0 flex items-center justify-center">
                    <svg viewBox="0 0 44 36" fill="none" className="w-full h-full" aria-hidden="true">
                      <path d="M14 11 A10 10 0 0 1 30 11" stroke="#34D399" strokeWidth="1.6" strokeLinecap="round" opacity="0.9" />
                      <path d="M9 6 A16 16 0 0 1 35 6" stroke="#34D399" strokeWidth="1.4" strokeLinecap="round" opacity="0.55" />
                      <line x1="22" y1="13" x2="22" y2="25" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
                      <circle cx="22" cy="13" r="1.6" fill="#34D399" />
                      <rect x="16" y="25" width="12" height="8" rx="1.5" fill="#1e293b" stroke="#475569" strokeWidth="1" />
                      <circle cx="19" cy="29" r="0.8" fill="#10B981" />
                      <circle cx="22" cy="29" r="0.8" fill="#38bdf8" />
                    </svg>
                  </div>
                </div>

                {/* Canonical Project Stats: 14/16 Nodes Online & 98.6% Packet Success */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-emerald-500/15">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
                      <Share2 className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white font-mono leading-tight">
                        {SYSTEM_INFO?.connectedNodes || 14} / {SYSTEM_INFO?.totalNodes || 16}
                      </div>
                      <div className="text-[9.5px] text-slate-400 leading-tight">
                        Nodes Online
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white font-mono leading-tight">
                        98.6%
                      </div>
                      <div className="text-[9.5px] text-slate-400 leading-tight">
                        Packet Success
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Status Action Pill */}
                <div className="flex items-center justify-between px-2.5 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-500/25 text-[10.5px] text-emerald-300">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="font-semibold">Network Stable</span>
                  </div>
                  <ChevronRight className="w-3 h-3 text-emerald-400/80" />
                </div>

              </div>
            </div>

            {/* Compact Indicators: Tablet default (collapsed 80px) */}
            <div className={`py-2 space-y-2 flex flex-col items-center ${!isTabletExpanded ? 'hidden md:flex lg:hidden' : 'hidden'}`}>
              <div 
                className="w-11 h-11 rounded-xl bg-[#091b15]/90 border border-emerald-500/30 flex items-center justify-center text-emerald-400 relative cursor-pointer hover:border-emerald-400" 
                title="Network Health: 14/16 Nodes Online (98.6% Packet Success)"
              >
                <Activity className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <div 
                className="w-11 h-11 rounded-xl bg-emerald-950/70 border border-emerald-500/30 flex items-center justify-center text-[#34D399] cursor-pointer hover:border-emerald-400" 
                title="Himalayan Safety: Safer Mountains, Stronger Communities"
              >
                <Leaf className="w-5 h-5" />
              </div>
            </div>

            {/* 2. CONTINUOUS HIMALAYAN SAFETY FOOTER: Sits directly over the waterfall & river landscape */}
            <div className={`px-2 pt-1 pb-3 space-y-2 select-none ${!isTabletExpanded ? 'block md:hidden lg:block' : 'block'}`}>
              
              {/* Glowing Leaf Icon Badge */}
              <div className="w-9 h-9 rounded-2xl bg-emerald-500/20 border border-emerald-400/35 flex items-center justify-center text-[#34D399] shadow-lg backdrop-blur-xs">
                <Leaf className="w-5 h-5 fill-[#34D399]/30" />
              </div>

              {/* Title & Slogan */}
              <div>
                <h3 className="text-base font-black font-heading text-white tracking-tight leading-tight">
                  Himalayan <span className="text-[#34D399]">Safety</span>
                </h3>
                <p className="text-[11px] text-emerald-200/90 font-medium leading-tight mt-0.5">
                  Our Shared Responsibility
                </p>
              </div>

              <div className="w-10 h-0.5 bg-gradient-to-r from-[#34D399] to-transparent my-1.5" />

              <div className="text-[9px] font-black uppercase tracking-wider text-slate-300 font-heading leading-tight space-y-0.5">
                <div>Safer Mountains</div>
                <div className="text-emerald-300">Stronger Communities</div>
              </div>

              {/* Bottom Cursive Script Flourish over the waterfall / river */}
              <div className="pt-3 select-none">
                <div className="font-serif italic text-xs font-bold text-emerald-100/95 leading-tight drop-shadow-md">
                  Protect • Preserve
                </div>
                <div className="font-serif italic text-xs font-bold text-[#34D399] leading-tight drop-shadow-md">
                  Build Safer Tomorrows
                </div>
                <svg className="w-24 h-2 text-[#34D399] mt-0.5" viewBox="0 0 100 8" fill="none" aria-hidden="true">
                  <path d="M2 5 C30 1.5, 70 6.5, 98 2.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                </svg>
              </div>

            </div>

          </div>

        </div>

      </aside>
    </>
  );
};

export default Sidebar;
