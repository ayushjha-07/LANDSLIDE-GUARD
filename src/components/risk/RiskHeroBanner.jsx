import React, { useState, useEffect } from 'react';
import { Calendar, Sparkles } from 'lucide-react';
import heroHimalayas from '../../assets/hero_himalayas.jpg';

export const RiskHeroBanner = () => {
  const [timeStr, setTimeStr] = useState('07:24:52');
  const [dateStr, setDateStr] = useState('Mon, 14 Sep 2026');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const day = days[now.getDay()];
      const d = now.getDate();
      const m = months[now.getMonth()];
      const y = now.getFullYear();
      const hh = String(now.getHours()).padStart(2, '0');
      const mm = String(now.getMinutes()).padStart(2, '0');
      const ss = String(now.getSeconds()).padStart(2, '0');
      
      setDateStr(`${day}, ${d} ${m} ${y}`);
      setTimeStr(`${hh}:${mm}:${ss}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden shadow-sm border border-slate-200/80 dark:border-slate-800/80">
      {/* Background Himalayan Panorama */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroHimalayas})` }}
      />
      
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/75 backdrop-blur-[0.5px]" />

      {/* Content */}
      <div className="relative z-10 px-5 py-4 sm:px-6 sm:py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Left Side */}
        <div className="space-y-1 max-w-2xl">
          <div className="text-[11px] sm:text-xs font-bold tracking-widest text-emerald-400 uppercase flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-emerald-400" />
            AI-POWERED GEOHAZARD INTELLIGENCE
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center flex-wrap gap-2">
            <span>Landslide</span>
            <span className="text-emerald-400 font-bold">Risk Analysis</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-200/90 font-normal">
            From real-time data to early warnings — for safer mountains and stronger communities.
          </p>
        </div>

        {/* Right Side: Quote + Live Clock Pill */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3.5 self-stretch md:self-auto justify-between md:justify-end">
          {/* Slogan */}
          <div className="text-right hidden sm:block">
            <div className="italic text-xs sm:text-sm text-white/90 font-medium tracking-wide">
              &ldquo; Analyze Today <span className="mx-1 text-white/60">/</span> Prevent Tomorrow &rdquo;
            </div>
            <div className="w-8 h-0.5 bg-emerald-400 ml-auto mt-1 rounded-full opacity-80" />
          </div>

          {/* Clock Pill */}
          <div className="flex items-center gap-2.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-black/40 dark:bg-black/50 backdrop-blur-md border border-white/20 shadow-inner">
            <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
              <Calendar className="w-3.5 h-3.5 text-slate-200" />
            </div>
            <div className="text-left text-[11px] leading-tight font-sans">
              <div className="text-slate-300 font-medium">{dateStr}</div>
              <div className="font-mono text-white font-semibold text-[10.5px]">{timeStr}</div>
            </div>
            <div className="ml-1.5 pl-2 border-l border-white/20">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-emerald-500/25 border border-emerald-400/40 text-emerald-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                LIVE
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskHeroBanner;
