import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  MapPin, 
  Calendar, 
  CloudSun, 
  Droplets, 
  Gauge, 
  Wind,
  Menu
} from 'lucide-react';
import heroHimalayasBannerImg from '../../assets/hero_himalayas_banner.jpg';

export const HimalayanHeroHeader = ({ onOpenSidebar }) => {
  // Live ticking clock
  const [clockData, setClockData] = useState(() => {
    const now = new Date();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dayName = days[now.getDay()];
    const day = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const mins = String(now.getMinutes()).padStart(2, '0');
    const secs = String(now.getSeconds()).padStart(2, '0');
    return {
      date: `${dayName}, ${day} ${month} ${year}`,
      time: `${hours}:${mins}:${secs}`
    };
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const dayName = days[now.getDay()];
      const day = now.getDate();
      const month = months[now.getMonth()];
      const year = now.getFullYear();
      const hours = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      const secs = String(now.getSeconds()).padStart(2, '0');
      setClockData({
        date: `${dayName}, ${day} ${month} ${year}`,
        time: `${hours}:${mins}:${secs}`
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative rounded-3xl overflow-hidden bg-[#07131a] text-white shadow-2xl border border-slate-800/80 mb-4 select-none">
      {/* 1. REALISTIC HIMALAYAN MOUNTAIN BACKDROP */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
        <img 
          src={heroHimalayasBannerImg} 
          alt="Himalayan Mountain Range" 
          className="w-full h-full object-cover object-[center_28%] filter brightness-[1.08] contrast-[1.05]"
        />
        {/* Dark balanced overlays for typography readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#060e16]/90 via-[#060e16]/65 to-[#060e16]/85" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060e16] via-transparent to-[#060e16]/50" />
      </div>

      {/* 2. HERO CONTENT CONTAINER */}
      <div className="relative z-10 p-5 sm:p-6 lg:p-7 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        
        {/* Left: Pretitle, Title, Subtitle, Location Pill */}
        <div className="space-y-2 max-w-xl">
          {/* Pretitle Badge & Mobile Menu Button */}
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 text-emerald-400 text-[11px] font-mono font-bold tracking-widest uppercase">
              <Activity className="w-4 h-4 text-emerald-400 stroke-[2.4] animate-pulse" />
              <span>REAL-TIME MONITORING</span>
            </div>
            {onOpenSidebar && (
              <button
                type="button"
                onClick={onOpenSidebar}
                className="md:hidden p-2 rounded-xl bg-slate-900/80 border border-white/20 text-slate-200 hover:text-white"
                aria-label="Open navigation menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Large Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-black font-heading text-white tracking-tight leading-none drop-shadow-md">
            Live Sensors
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm text-slate-200/90 font-medium drop-shadow-sm">
            Continuous monitoring for a safer tomorrow
          </p>

          {/* Location Pill */}
          <div className="pt-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/75 border border-white/15 shadow-md backdrop-blur-md text-xs text-slate-200">
              <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              <span className="font-semibold tracking-wide">Kullu &ndash; Manali Region, Himachal Pradesh</span>
            </div>
          </div>
        </div>

        {/* Center-Right Italic Script */}
        <div className="hidden xl:flex flex-col items-center justify-center text-center font-serif italic text-slate-200/95 tracking-tight px-4 border-l border-white/10 select-none">
          <span className="text-base font-bold leading-tight">Mountains</span>
          <span className="text-sm font-semibold leading-tight text-emerald-300">Monitor Today</span>
          <span className="text-sm font-semibold leading-tight text-white/90">Protect Tomorrow</span>
        </div>

        {/* Right: Date/Time + Weather Cards */}
        <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-start sm:items-center lg:items-end xl:items-center gap-3 shrink-0">
          
          {/* Card A: Date/Time with LIVE badge */}
          <div className="p-3 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-white/15 shadow-xl flex items-center gap-3 min-w-[210px]">
            <div className="w-9 h-9 rounded-xl bg-emerald-950/70 border border-emerald-500/35 text-emerald-400 flex items-center justify-center shrink-0">
              <Calendar className="w-4.5 h-4.5" />
            </div>
            <div className="min-w-0 flex-1 leading-tight">
              <div className="text-[11px] text-slate-300 font-medium">
                {clockData.date}
              </div>
              <div className="text-sm font-mono font-black text-white mt-0.5 tracking-wider">
                {clockData.time}
              </div>
            </div>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-500 text-white shadow-xs shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              LIVE
            </span>
          </div>

          {/* Card B: Weather in Manali, HP */}
          <div className="p-3 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-white/15 shadow-xl flex items-center gap-3.5 min-w-[240px]">
            {/* Left Weather Summary */}
            <div className="flex items-center gap-2.5">
              <CloudSun className="w-8 h-8 text-amber-300 shrink-0" />
              <div className="leading-tight">
                <div className="text-xl font-black font-mono text-white leading-none">
                  12&deg;C
                </div>
                <div className="text-[11px] font-bold text-slate-200 mt-0.5">
                  Clear Skies
                </div>
                <div className="text-[9.5px] text-slate-400">
                  Manali, HP
                </div>
              </div>
            </div>

            {/* Weather Metrics Divider & Column */}
            <div className="border-l border-white/15 pl-3 space-y-1 text-[10px] text-slate-300">
              <div className="flex items-center gap-1.5">
                <Droplets className="w-3 h-3 text-sky-400 shrink-0" />
                <span className="font-semibold text-white">78%</span>
                <span className="text-slate-400">Humidity</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Gauge className="w-3 h-3 text-emerald-400 shrink-0" />
                <span className="font-semibold text-white">1016</span>
                <span className="text-slate-400">hPa</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Wind className="w-3 h-3 text-cyan-400 shrink-0" />
                <span className="font-semibold text-white">8 km/h</span>
                <span className="text-slate-400">Wind</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default HimalayanHeroHeader;
