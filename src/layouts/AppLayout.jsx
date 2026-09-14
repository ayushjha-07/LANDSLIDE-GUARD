import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import { SYSTEM_INFO } from '../data/mockData';

export const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const isSensors = location.pathname === '/sensors';

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#F7FAFC] dark:bg-[#060e16] text-[#2D3748] dark:text-[#E2E8F0] flex flex-col transition-colors duration-200 box-border">
      {/* 3-Tier Responsive Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area: Offset adapts to Mobile (0), Tablet (80px / md:pl-20), and Desktop (256px / lg:pl-64) */}
      <div className="flex flex-col flex-1 min-h-screen w-full min-w-0 md:pl-20 lg:pl-64 transition-all duration-300">
        {/* Header: Hidden on /sensors to match exact reference image composition */}
        {!isSensors && <Header onOpenSidebar={() => setSidebarOpen(true)} />}

        {/* Dynamic Page Content with Responsive Padding and 1440px Max-width Constraint */}
        <main className={`flex-1 w-full max-w-[1440px] mx-auto min-w-0 box-border overflow-x-hidden ${
          isSensors ? 'p-3 sm:p-4 md:p-5 lg:p-6' : 'p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8'
        }`}>
          <Outlet context={{ onOpenSidebar: () => setSidebarOpen(true) }} />
        </main>

        {/* Global Responsive Footer: Hidden on /sensors */}
        {!isSensors && (
          <footer className="py-4 px-4 sm:px-6 border-t border-[#E2E8F0] dark:border-[#2D3748] bg-white/90 dark:bg-[#0E131F]/90 text-xs text-[#718096] dark:text-slate-400 w-full min-w-0">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 max-w-[1440px] mx-auto w-full min-w-0 text-center sm:text-left">
              <span className="truncate">
                <strong className="text-[#1A202C] dark:text-slate-200">Landslide Guard</strong> &bull; {SYSTEM_INFO.tagline}
              </span>
              <span className="text-[11px] text-[#718096] dark:text-slate-400 truncate">
                AI-Powered Landslide Early Warning System &bull; LoRa Telemetry Network
              </span>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
};

export default AppLayout;
