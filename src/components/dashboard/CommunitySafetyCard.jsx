import React from 'react';
import { 
  UsersRound, 
  MapPin, 
  ShieldCheck, 
  Megaphone, 
  LifeBuoy, 
  Leaf, 
  BookOpen, 
  Heart, 
  House, 
  Route, 
  Radio, 
  CheckCircle2, 
  SunMedium, 
  Activity 
} from 'lucide-react';
import communityHimalayasImg from '../../assets/community_safety_himalayas.jpg';

/**
 * CommunitySafetyCard
 * Human-centered dashboard section representing the "Who are we protecting?" mission.
 * Features:
 * - Wide cinematic Himalayan landscape with natural morning light, mountain village & IoT monitoring station
 * - Deep forest green (#063B2E) & dark navy (#0B1420) overlay with seamless gradient transitions
 * - Real project data binding (8 active sensor stations & slope sectors)
 * - Preparedness principles, safety communication features, and warning channels
 * - Mobile responsive stack: Header -> Metrics -> Preparedness -> Safety Features -> Dedicated Scenic Image -> Bottom Action Capsule
 * - Floating "Together for Safer Himalayas" action bar (Educate, Prepare, Protect, Thrive)
 */
export const CommunitySafetyCard = ({ nodes = [], riskAssessment }) => {
  const nodeCount = nodes?.length || 8;
  const onlineCount = nodes?.filter(n => n.status !== 'offline').length || 7;

  return (
    <section 
      aria-label="Community Safety & Resilience"
      className="relative rounded-3xl overflow-hidden border border-emerald-900/50 dark:border-emerald-800/40 bg-[#06241b] text-white shadow-2xl transition-all duration-300 w-full min-w-0"
    >
      {/* 1. Large Realistic Himalayan Village Hero Background (Full container on desktop, right side focus) */}
      <div 
        className="hidden lg:block absolute inset-0 w-full h-full bg-cover pointer-events-none z-0 select-none opacity-85"
        style={{ 
          backgroundImage: `url(${communityHimalayasImg})`,
          backgroundPosition: 'right 20% top'
        }}
        aria-hidden="true"
      />

      {/* 2. Seamless Gradient Overlays for Desktop */}
      {/* Left-to-right gradient: deep forest green (#063B2E) / dark navy (#0B1420) on the left dissolving into clear landscape on the right */}
      <div 
        className="hidden lg:block absolute inset-0 pointer-events-none z-0 bg-gradient-to-r from-[#06241b] via-[#06241b]/95 via-[42%] to-transparent"
        aria-hidden="true"
      />
      {/* Top and bottom vignettes to ensure contrast */}
      <div 
        className="hidden lg:block absolute inset-0 pointer-events-none z-0 bg-gradient-to-b from-[#06241b]/80 via-transparent to-[#06241b]/80"
        aria-hidden="true"
      />

      {/* 3. Main Content Container */}
      <div className="relative z-10 p-4 sm:p-6 lg:p-8 flex flex-col justify-between space-y-6">
        
        {/* ==================================================
            TOP BAR: Header & Location / Brand Motto
            ================================================== */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          
          {/* Top Left: Icon & Typography */}
          <div className="flex items-start gap-3.5 sm:gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-[#34D399] shadow-lg shadow-emerald-950/50 flex-shrink-0 backdrop-blur-md">
              <UsersRound className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            
            <div className="min-w-0">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-heading text-white tracking-tight leading-tight">
                  Community <span className="text-[#34D399]">Safety</span>
                </h2>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 backdrop-blur-xs">
                  <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                  Live Sector
                </span>
              </div>
              <p className="text-xs sm:text-sm font-semibold tracking-wide text-emerald-200/90 mt-1">
                People • Preparedness • Resilience
              </p>
              <p className="text-xs sm:text-sm text-[#A8B5B0] mt-0.5 font-sans">
                Stronger Communities, Safer Mountains
              </p>
            </div>
          </div>

          {/* Top Right: Location Badge & Script Motto */}
          <div className="flex flex-row md:flex-col items-start md:items-end justify-between md:justify-start gap-2.5">
            {/* Contextual Location Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-emerald-500/30 backdrop-blur-md shadow-md text-xs">
              <MapPin className="w-4 h-4 text-[#34D399] flex-shrink-0" />
              <div className="text-left md:text-right">
                <span className="font-bold text-white">Himachal Pradesh</span>
                <span className="text-[#A8B5B0] ml-1.5">• Kullu Valley</span>
              </div>
            </div>

            {/* Script Cursive Brand Flourish */}
            <div className="hidden sm:flex flex-col items-end pt-1 select-none">
              <span className="font-serif italic text-base sm:text-lg font-bold tracking-wide text-emerald-100/95 -rotate-1 leading-tight">
                Safe Communities
              </span>
              <span className="font-serif italic text-base sm:text-lg font-bold tracking-wide text-[#34D399] -rotate-1 leading-tight">
                Resilient Tomorrow
              </span>
              <svg className="w-28 h-2 text-[#34D399] -mt-0.5" viewBox="0 0 100 8" fill="none" aria-hidden="true">
                <path d="M2 5 C30 1.5, 70 6.5, 98 2.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
              </svg>
            </div>
          </div>

        </div>

        {/* ==================================================
            4 COMMUNITY METRIC CARDS (Using real project data)
            ================================================== */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full">
          
          {/* Metric 1: Monitoring Area */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-[#0a231c]/80 hover:bg-[#0d2e24]/90 border border-emerald-500/25 hover:border-emerald-400/40 backdrop-blur-md shadow-lg transition-all duration-200">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 mb-2.5 shadow-inner">
              <UsersRound className="w-5 h-5" />
            </div>
            <div className="text-xl sm:text-2xl lg:text-3xl font-black font-mono text-white tracking-tight">
              {nodeCount} Nodes
            </div>
            <div className="text-xs font-semibold text-emerald-300/90 uppercase tracking-wider mt-0.5">
              Monitoring Area
            </div>
            <div className="text-[11px] text-[#A8B5B0] mt-0.5 leading-tight">
              Active Slope Coverage
            </div>
          </div>

          {/* Metric 2: Monitored Locations */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-[#0a231c]/80 hover:bg-[#0d2e24]/90 border border-cyan-500/25 hover:border-cyan-400/40 backdrop-blur-md shadow-lg transition-all duration-200">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300 mb-2.5 shadow-inner">
              <House className="w-5 h-5" />
            </div>
            <div className="text-xl sm:text-2xl lg:text-3xl font-black font-mono text-white tracking-tight">
              {nodeCount} Sectors
            </div>
            <div className="text-xs font-semibold text-cyan-300/90 uppercase tracking-wider mt-0.5">
              Monitored Locations
            </div>
            <div className="text-[11px] text-[#A8B5B0] mt-0.5 leading-tight">
              North Slope to Ridge
            </div>
          </div>

          {/* Metric 3: Emergency Support */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-[#0a231c]/80 hover:bg-[#0d2e24]/90 border border-amber-500/25 hover:border-amber-400/40 backdrop-blur-md shadow-lg transition-all duration-200">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300 mb-2.5 shadow-inner">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-xl sm:text-2xl lg:text-3xl font-black font-mono text-white tracking-tight">
              Enabled
            </div>
            <div className="text-xs font-semibold text-amber-300/90 uppercase tracking-wider mt-0.5">
              Early Warning
            </div>
            <div className="text-[11px] text-[#A8B5B0] mt-0.5 leading-tight">
              Auto Threshold Triggers
            </div>
          </div>

          {/* Metric 4: Risk Communication */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-[#0a231c]/80 hover:bg-[#0d2e24]/90 border border-purple-500/25 hover:border-purple-400/40 backdrop-blur-md shadow-lg transition-all duration-200">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300 mb-2.5 shadow-inner">
              <Route className="w-5 h-5" />
            </div>
            <div className="text-xl sm:text-2xl lg:text-3xl font-black font-mono text-white tracking-tight">
              Ready
            </div>
            <div className="text-xs font-semibold text-purple-300/90 uppercase tracking-wider mt-0.5">
              Risk Communication
            </div>
            <div className="text-[11px] text-[#A8B5B0] mt-0.5 leading-tight">
              Telemetry & Protocols
            </div>
          </div>

        </div>

        {/* ==================================================
            MAIN BODY: Split Layout
            Desktop: Left 42% (Preparedness & Features), Right 58% (Himalayan Village Scenic Window)
            ================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* LEFT COLUMN: Preparedness Card & Safety Features (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
            
            {/* Preparedness Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#06241b]/90 border border-emerald-500/30 backdrop-blur-md shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 border border-emerald-400/35 flex items-center justify-center text-[#34D399] flex-shrink-0 shadow-xs">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black font-heading text-white tracking-tight uppercase leading-tight">
                    Prepared Today
                  </h3>
                  <div className="text-sm sm:text-base font-bold text-[#34D399] uppercase tracking-wide leading-tight">
                    Protected Tomorrow
                  </div>
                </div>
              </div>

              {/* Accent Green Line */}
              <div className="w-full h-0.5 bg-gradient-to-r from-emerald-500/70 via-emerald-400/50 to-transparent my-3.5" />

              <p className="text-xs sm:text-[13px] text-slate-200 leading-relaxed font-sans">
                Landslide Guard combines risk information, early warnings and community-focused communication to support safer decisions.
              </p>
            </div>

            {/* 4 Community Safety Features */}
            <div className="space-y-2.5 p-4 sm:p-5 rounded-2xl bg-[#06241b]/80 border border-emerald-500/20 backdrop-blur-md shadow-lg">
              
              {/* Row 1: Early Warning Communication */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300 flex-shrink-0 mt-0.5">
                  <Megaphone className="w-4.5 h-4.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">
                    Early Warning Communication
                  </h4>
                  <p className="text-[11px] sm:text-xs text-[#A8B5B0] leading-snug mt-0.5">
                    Clear warnings can be communicated when risk conditions require attention.
                  </p>
                </div>
              </div>

              {/* Row 2: Community Awareness */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 flex-shrink-0 mt-0.5">
                  <UsersRound className="w-4.5 h-4.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">
                    Community Awareness
                  </h4>
                  <p className="text-[11px] sm:text-xs text-[#A8B5B0] leading-snug mt-0.5">
                    Promote awareness and preparedness around landslide hazards.
                  </p>
                </div>
              </div>

              {/* Row 3: Emergency Support */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300 flex-shrink-0 mt-0.5">
                  <LifeBuoy className="w-4.5 h-4.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">
                    Emergency Support
                  </h4>
                  <p className="text-[11px] sm:text-xs text-[#A8B5B0] leading-snug mt-0.5">
                    Support emergency planning and response coordination.
                  </p>
                </div>
              </div>

              {/* Row 4: Resilient Communities */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-[#34D399] flex-shrink-0 mt-0.5">
                  <Leaf className="w-4.5 h-4.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">
                    Resilient Communities
                  </h4>
                  <p className="text-[11px] sm:text-xs text-[#A8B5B0] leading-snug mt-0.5">
                    Build long-term preparedness and safer mountain communities.
                  </p>
                </div>
              </div>

            </div>

            {/* Early Warning Channels Strip */}
            <div className="p-3 sm:p-3.5 rounded-xl bg-[#061e16]/85 border border-emerald-500/20 backdrop-blur-md">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300/90 flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 text-emerald-400" />
                  Early Warning Channels
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {onlineCount}/{nodeCount} Channels Ready
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                <div className="px-2 py-1 rounded-lg bg-emerald-950/70 border border-emerald-500/40 text-[10.5px] font-medium text-emerald-200 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Web Portal</span>
                </div>
                <div className="px-2 py-1 rounded-lg bg-emerald-950/70 border border-emerald-500/40 text-[10.5px] font-medium text-emerald-200 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Alerts Feed</span>
                </div>
                <div className="px-2 py-1 rounded-lg bg-slate-900/60 border border-slate-700/50 text-[10.5px] font-medium text-slate-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80" />
                  <span>SMS — Planned</span>
                </div>
                <div className="px-2 py-1 rounded-lg bg-slate-900/60 border border-slate-700/50 text-[10.5px] font-medium text-slate-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                  <span>LoRa Siren — Planned</span>
                </div>
              </div>
            </div>

            {/* Community Preparedness Status Panel */}
            <div className="flex items-center justify-between gap-2 px-3.5 py-2 rounded-xl bg-[#041a13]/85 border border-emerald-500/20 text-[11px] flex-wrap">
              <div className="flex items-center gap-1.5 text-emerald-300 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Info Available</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-300 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Risk Active</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-300 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Alerts Ready</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-300 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Network Online</span>
              </div>
            </div>

          </div>

          {/* DEDICATED MOUNTAIN IMAGE (Rendered on mobile/tablet to fulfill section 16 stack order) */}
          <div className="block lg:hidden relative h-60 sm:h-72 rounded-2xl overflow-hidden border border-emerald-500/30 shadow-xl">
            <img 
              src={communityHimalayasImg} 
              alt="Himalayan Mountain Village & Monitoring Station"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
            
            {/* Field Station Tag on Mobile Image */}
            <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-900/80 border border-emerald-400/40 text-[10px] font-semibold text-emerald-300 backdrop-blur-xs flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Solar Weather Station</span>
            </div>

            {/* Wall Marker Sign on Mobile Image */}
            <div className="absolute bottom-3 right-3 bg-white/95 dark:bg-stone-900/90 text-stone-900 dark:text-white px-2.5 py-1.5 rounded-md border border-stone-700 shadow-md text-center max-w-[120px]">
              <div className="text-[9px] font-black uppercase leading-tight font-heading">
                Safer Mountains
              </div>
              <div className="text-[8px] font-bold text-emerald-700 dark:text-emerald-400 uppercase leading-tight">
                Stronger Communities
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Scenic Himalayan Window for Desktop (lg:col-span-7) */}
          <div className="hidden lg:flex lg:col-span-7 flex-col justify-between relative min-h-[480px]">
            
            {/* Top Right Context Badge: Solar Weather Station Marker */}
            <div className="self-end flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/75 border border-emerald-500/30 backdrop-blur-md shadow-lg text-[11px] text-slate-200">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Solar Weather Station — Alpine Sector</span>
            </div>

            {/* Realistic Road Retaining Wall Sign matching reference: "SAFER MOUNTAINS STRONGER COMMUNITIES" */}
            <div className="absolute right-6 bottom-24 bg-white/95 text-stone-900 px-3 py-2 rounded-md border-2 border-stone-800 shadow-2xl text-center max-w-[130px] select-none">
              <div className="flex justify-center mb-0.5 text-emerald-700">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="m3 20 6.5-11L14 16l3-5 4 9H3Z" />
                </svg>
              </div>
              <div className="text-[9px] font-black tracking-wider uppercase leading-tight font-heading">
                Safer Mountains
              </div>
              <div className="text-[8px] font-bold tracking-wider text-emerald-700 uppercase leading-tight">
                Stronger Communities
              </div>
            </div>

            <div className="flex-1" />

            {/* Floating Bottom Action Capsule: "Together for Safer Himalayas" */}
            <div className="w-full mt-auto backdrop-blur-md bg-slate-950/85 sm:bg-[#06241b]/90 border border-emerald-500/35 rounded-2xl p-3.5 sm:px-5 sm:py-3 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
              
              {/* Left Brand Badge */}
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#10B981] flex items-center justify-center text-slate-950 shadow-md shadow-emerald-500/30 flex-shrink-0">
                  <Leaf className="w-5 h-5 fill-slate-950" />
                </div>
                <div className="text-left">
                  <span className="text-xs sm:text-sm font-bold text-white tracking-tight block leading-tight">
                    Together for Safer Himalayas
                  </span>
                  <span className="text-[10px] text-emerald-300/80 block leading-tight font-sans">
                    Community-led slope resilience
                  </span>
                </div>
              </div>

              {/* 4 Pillars: Educate, Prepare, Protect, Thrive */}
              <div className="flex items-center justify-center gap-3 sm:gap-4 divide-x divide-emerald-500/20 text-xs w-full sm:w-auto">
                <div className="flex items-center gap-1.5 text-slate-200 hover:text-white transition-colors pl-0">
                  <BookOpen className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span className="font-semibold text-[11px] sm:text-xs">Educate</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-200 hover:text-white transition-colors pl-3 sm:pl-4">
                  <UsersRound className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span className="font-semibold text-[11px] sm:text-xs">Prepare</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-200 hover:text-white transition-colors pl-3 sm:pl-4">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span className="font-semibold text-[11px] sm:text-xs">Protect</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-200 hover:text-white transition-colors pl-3 sm:pl-4">
                  <Heart className="w-4 h-4 text-rose-400 flex-shrink-0" />
                  <span className="font-semibold text-[11px] sm:text-xs">Thrive</span>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Floating Bottom Action Capsule for Mobile (Rendered at bottom of stack on mobile) */}
        <div className="block lg:hidden w-full backdrop-blur-md bg-slate-950/85 border border-emerald-500/35 rounded-2xl p-3.5 shadow-2xl">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-full bg-[#10B981] flex items-center justify-center text-slate-950 shadow-md flex-shrink-0">
              <Leaf className="w-4.5 h-4.5 fill-slate-950" />
            </div>
            <div className="text-left">
              <span className="text-xs font-bold text-white tracking-tight block leading-tight">
                Together for Safer Himalayas
              </span>
              <span className="text-[10px] text-emerald-300/80 block leading-tight font-sans">
                Community-led slope resilience
              </span>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-1 text-center border-t border-emerald-500/20 pt-2.5">
            <div className="flex flex-col items-center gap-1 text-slate-200">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span className="font-semibold text-[10px]">Educate</span>
            </div>
            <div className="flex flex-col items-center gap-1 text-slate-200">
              <UsersRound className="w-4 h-4 text-emerald-400" />
              <span className="font-semibold text-[10px]">Prepare</span>
            </div>
            <div className="flex flex-col items-center gap-1 text-slate-200">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="font-semibold text-[10px]">Protect</span>
            </div>
            <div className="flex flex-col items-center gap-1 text-slate-200">
              <Heart className="w-4 h-4 text-rose-400" />
              <span className="font-semibold text-[10px]">Thrive</span>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
};

export default CommunitySafetyCard;
