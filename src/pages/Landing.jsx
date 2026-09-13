import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Activity,
  AlertCircle,
  ArrowRight, 
  Bell, 
  Building2,
  CheckCircle2, 
  ChevronDown,
  CloudRain,
  Compass,
  Cpu, 
  ExternalLink,
  FileText, 
  Flame,
  Layers, 
  Lock, 
  MapPin, 
  Menu,
  Mountain,
  Play,
  Radio, 
  RadioTower,
  Shield,
  ShieldCheck, 
  Smartphone,
  Sparkles, 
  Users, 
  Wifi,
  X,
  Zap
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import heroHimalayas from '../assets/hero_himalayas.jpg';

export const Landing = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // CTA navigation handler
  const handleCtaClick = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  // Smooth scroll handler
  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Demo play action
  const handleWatchDemo = (e) => {
    e.preventDefault();
    scrollToSection('features-section');
    toast.info('Scrolling to core architectural capabilities and prototype telemetry demo.', 'Watch Demo');
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#0A120D] text-stone-100 flex flex-col justify-between selection:bg-emerald-500 selection:text-black">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION WITH CINEMATIC HIMALAYAN MOUNTAIN PHOTOGRAPHY & IOT STATION */}
      {/* ========================================================================= */}
      <div 
        id="hero" 
        className="relative min-h-screen w-full flex flex-col justify-between bg-cover bg-center bg-no-repeat transition-all duration-300"
        style={{
          backgroundImage: `url(${heroHimalayas})`,
          backgroundAttachment: 'scroll'
        }}
      >
        {/* Subtle Atmospheric Gradient Overlay: ensures optimal text contrast while keeping peaks, valley & sensor station vivid */}
        <div 
          className="absolute inset-0 pointer-events-none bg-gradient-to-r from-stone-950/80 via-black/40 to-stone-950/70"
          aria-hidden="true"
        />
        <div 
          className="absolute inset-0 pointer-events-none bg-gradient-to-b from-stone-950/70 via-transparent to-stone-950/90"
          aria-hidden="true"
        />

        {/* ----------------------------------------------------------------------- */}
        {/* TRANSPARENT GLASS HEADER */}
        {/* ----------------------------------------------------------------------- */}
        <header className="sticky top-0 z-40 w-full bg-black/25 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 lg:px-12 py-3.5 transition-all">
          <div className="max-w-7xl mx-auto flex items-center justify-between min-w-0">
            
            {/* Left: Stylized 3-Peak Himalayan Mountain Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-8 flex-shrink-0">
                <svg className="w-full h-full" viewBox="0 0 64 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Left peak */}
                  <path d="M4 42L18 16L32 42H4Z" fill="#15803d" />
                  <path d="M18 16L12 28L18 26L24 28L18 16Z" fill="#ffffff" />
                  {/* Middle Main peak */}
                  <path d="M16 42L36 8L52 42H16Z" fill="#16a34a" />
                  <path d="M36 8L27 24L36 21L43 25L36 8Z" fill="#ffffff" />
                  {/* Right ridge */}
                  <path d="M34 42L48 20L60 42H34Z" fill="#22c55e" />
                  <path d="M48 20L42 29L48 27L54 30L48 20Z" fill="#ffffff" />
                  {/* Base baseline accent */}
                  <path d="M2 43H62" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
                </svg>
              </div>
              <div className="flex flex-col text-left">
                <span className="font-heading font-extrabold text-sm sm:text-base tracking-widest text-white leading-tight">
                  LANDSLIDE <span className="text-[#4ade80]">GUARD</span>
                </span>
                <span className="text-[10px] sm:text-[11px] font-medium text-stone-300/90 tracking-wide leading-tight mt-0.5 whitespace-nowrap">
                  Safer Mountains, Stronger Communities
                </span>
              </div>
            </Link>

            {/* Center: Navigation Links */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium">
              <button 
                type="button" 
                onClick={() => scrollToSection('hero')} 
                className="text-[#4ade80] border-b-2 border-[#4ade80] pb-1 font-semibold transition-colors"
              >
                Home
              </button>
              <button 
                type="button" 
                onClick={() => scrollToSection('about')} 
                className="text-stone-200 hover:text-white transition-colors"
              >
                About
              </button>
              <button 
                type="button" 
                onClick={() => scrollToSection('features-section')} 
                className="text-stone-200 hover:text-white transition-colors"
              >
                Features
              </button>
              <button 
                type="button" 
                onClick={() => scrollToSection('technology')} 
                className="text-stone-200 hover:text-white transition-colors"
              >
                Technology
              </button>
              <button 
                type="button" 
                onClick={() => scrollToSection('impact')} 
                className="text-stone-200 hover:text-white transition-colors"
              >
                Impact
              </button>
              <button 
                type="button" 
                onClick={() => scrollToSection('contact')} 
                className="text-stone-200 hover:text-white transition-colors"
              >
                Contact
              </button>
            </nav>

            {/* Right: Login Button & Mobile Menu Trigger */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="min-h-[42px] px-5 py-2 rounded-full bg-[#16a34a] hover:bg-[#15803d] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-emerald-600/30 transition-all flex items-center gap-2 cursor-pointer group"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-100" />
                <span>Login</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>

              {/* Mobile Hamburger */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-xl bg-black/40 text-stone-200 hover:text-white border border-white/15 backdrop-blur-md transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>

          {/* Mobile Navigation Drawer */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-3 pt-3 border-t border-white/10 flex flex-col gap-2.5 pb-2 text-sm">
              <button 
                type="button" 
                onClick={() => scrollToSection('hero')} 
                className="text-left py-2 px-3 rounded-lg text-[#4ade80] font-bold bg-white/5"
              >
                Home
              </button>
              <button 
                type="button" 
                onClick={() => scrollToSection('about')} 
                className="text-left py-2 px-3 rounded-lg text-stone-200 hover:text-white hover:bg-white/5"
              >
                About
              </button>
              <button 
                type="button" 
                onClick={() => scrollToSection('features-section')} 
                className="text-left py-2 px-3 rounded-lg text-stone-200 hover:text-white hover:bg-white/5"
              >
                Features
              </button>
              <button 
                type="button" 
                onClick={() => scrollToSection('technology')} 
                className="text-left py-2 px-3 rounded-lg text-stone-200 hover:text-white hover:bg-white/5"
              >
                Technology
              </button>
              <button 
                type="button" 
                onClick={() => scrollToSection('impact')} 
                className="text-left py-2 px-3 rounded-lg text-stone-200 hover:text-white hover:bg-white/5"
              >
                Impact
              </button>
              <button 
                type="button" 
                onClick={() => scrollToSection('contact')} 
                className="text-left py-2 px-3 rounded-lg text-stone-200 hover:text-white hover:bg-white/5"
              >
                Contact
              </button>
            </div>
          )}
        </header>

        {/* ----------------------------------------------------------------------- */}
        {/* HERO MAIN BODY */}
        {/* ----------------------------------------------------------------------- */}
        <div className="relative z-20 flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-12 flex flex-col justify-between pt-8 sm:pt-14 pb-8 min-w-0">
          
          {/* Top-Right Handwritten Quote (over mountain sky) */}
          <div className="absolute top-4 right-4 sm:right-8 lg:right-12 hidden md:flex flex-col items-end pointer-events-none select-none z-20">
            <p className="font-['Caveat',cursive] text-2xl sm:text-3xl lg:text-4xl text-stone-100/90 leading-tight text-right -rotate-2 drop-shadow-md">
              Mountains are beautiful.<br />
              Let&apos;s keep them safe.
            </p>
            <svg className="w-36 sm:w-44 h-4 mt-1 text-[#4ade80]" viewBox="0 0 160 16" fill="none">
              <path 
                d="M5 8C35 4 80 12 155 6" 
                stroke="currentColor" 
                strokeWidth="3.5" 
                strokeLinecap="round" 
                opacity="0.9" 
              />
            </svg>
          </div>

          {/* Left Hero Content: Headline, Description & CTAs */}
          <div className="max-w-2xl text-left z-20 mt-4 sm:mt-10 lg:mt-14">
            
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-emerald-500/35 text-emerald-300 text-xs sm:text-sm font-medium shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#4ade80]" />
              <span>AI + IoT for Safer Mountains</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.05] mt-4 font-heading drop-shadow-lg">
              Landslide <span className="text-[#4ade80]">Guard</span>
            </h1>

            {/* Subtitle */}
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-stone-100 tracking-tight mt-3 drop-shadow-sm">
              Early Warnings. Safer Communities.
            </h2>

            {/* Description */}
            <p className="text-stone-200 text-sm sm:text-base lg:text-lg max-w-xl leading-relaxed mt-4 drop-shadow-sm font-normal">
              An AI-powered IoT system that monitors mountain conditions, analyzes landslide risk, and provides real-time alerts to help protect lives, infrastructure, and communities.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mt-8">
              <button
                type="button"
                onClick={handleCtaClick}
                className="min-h-[50px] px-7 py-3.5 rounded-full bg-[#16a34a] hover:bg-[#15803d] active:scale-98 text-white font-bold text-sm shadow-xl shadow-emerald-950/60 hover:shadow-emerald-600/40 transition-all flex items-center gap-2.5 cursor-pointer group"
              >
                <Activity className="w-4 h-4 text-emerald-200 group-hover:animate-pulse" />
                <span>Go to Dashboard</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                onClick={handleWatchDemo}
                className="min-h-[50px] px-6 py-3.5 rounded-full bg-black/40 hover:bg-black/60 border border-white/25 hover:border-white/40 active:scale-98 text-white font-semibold text-sm backdrop-blur-md transition-all flex items-center gap-2.5 cursor-pointer shadow-md"
              >
                <Play className="w-4 h-4 fill-white text-white" />
                <span>Watch Demo</span>
              </button>
            </div>

          </div>

          {/* Lower-left IoT Field Station Pulsing Beacon (over physical station on rock) */}
          <div className="hidden lg:block absolute bottom-36 left-12 xl:left-24 z-20 group">
            <div className="relative flex items-center justify-center">
              <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-emerald-400 opacity-80" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#4ade80] border border-white shadow-sm" />
            </div>
            <div className="absolute left-6 -top-7 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap px-3 py-2 rounded-xl bg-black/90 backdrop-blur-md border border-emerald-500/40 text-[11px] text-stone-200 shadow-2xl z-30">
              <div className="font-bold text-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#4ade80]" />
                Outdoor Geotechnical Sensor Station
              </div>
              <div className="text-[10px] text-stone-400 font-mono mt-0.5">Solar Powered • Sub-GHz LoRa • Live Field Node</div>
            </div>
          </div>

          {/* Lower-Center Feature Cards & Bottom Navigation Bar */}
          <div className="w-full z-20 mt-12 sm:mt-16">
            
            {/* 4 Feature Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-2xl mx-auto w-full">
              
              {/* Card 1: Real-Time Monitoring */}
              <div 
                onClick={() => scrollToSection('features-section')}
                className="p-4 sm:p-5 rounded-2xl bg-[#0d2818]/75 hover:bg-[#0d2818]/90 border border-emerald-500/25 hover:border-emerald-400/50 backdrop-blur-md text-center flex flex-col items-center justify-center gap-2.5 shadow-xl shadow-black/50 hover:-translate-y-0.5 transition-all cursor-pointer group"
              >
                <Radio className="w-6 h-6 text-[#4ade80] group-hover:scale-110 transition-transform" />
                <span className="text-xs sm:text-sm font-bold text-white leading-tight">
                  Real-Time<br />Monitoring
                </span>
              </div>

              {/* Card 2: AI Risk Analysis */}
              <div 
                onClick={() => scrollToSection('technology')}
                className="p-4 sm:p-5 rounded-2xl bg-[#0d2818]/75 hover:bg-[#0d2818]/90 border border-emerald-500/25 hover:border-emerald-400/50 backdrop-blur-md text-center flex flex-col items-center justify-center gap-2.5 shadow-xl shadow-black/50 hover:-translate-y-0.5 transition-all cursor-pointer group"
              >
                <Cpu className="w-6 h-6 text-[#4ade80] group-hover:scale-110 transition-transform" />
                <span className="text-xs sm:text-sm font-bold text-white leading-tight">
                  AI Risk<br />Analysis
                </span>
              </div>

              {/* Card 3: Instant Alerts */}
              <div 
                onClick={() => scrollToSection('features-section')}
                className="p-4 sm:p-5 rounded-2xl bg-[#0d2818]/75 hover:bg-[#0d2818]/90 border border-emerald-500/25 hover:border-emerald-400/50 backdrop-blur-md text-center flex flex-col items-center justify-center gap-2.5 shadow-xl shadow-black/50 hover:-translate-y-0.5 transition-all cursor-pointer group"
              >
                <Bell className="w-6 h-6 text-[#4ade80] group-hover:scale-110 transition-transform" />
                <span className="text-xs sm:text-sm font-bold text-white leading-tight">
                  Instant<br />Alerts
                </span>
              </div>

              {/* Card 4: Safer Communities */}
              <div 
                onClick={() => scrollToSection('impact')}
                className="p-4 sm:p-5 rounded-2xl bg-[#0d2818]/75 hover:bg-[#0d2818]/90 border border-emerald-500/25 hover:border-emerald-400/50 backdrop-blur-md text-center flex flex-col items-center justify-center gap-2.5 shadow-xl shadow-black/50 hover:-translate-y-0.5 transition-all cursor-pointer group"
              >
                <Users className="w-6 h-6 text-[#4ade80] group-hover:scale-110 transition-transform" />
                <span className="text-xs sm:text-sm font-bold text-white leading-tight">
                  Safer<br />Communities
                </span>
              </div>

            </div>

            {/* Bottom Controls: Center Scroll Arrow & Right Location Tag */}
            <div className="relative flex items-center justify-between w-full pt-6 sm:pt-8 min-w-0">
              
              {/* Left Spacer for balance */}
              <div className="w-24 sm:w-40 hidden sm:block" />

              {/* Center Circular Scroll Down Button */}
              <div className="mx-auto flex justify-center">
                <button
                  type="button"
                  onClick={() => scrollToSection('about')}
                  className="w-10 h-10 rounded-full bg-black/45 hover:bg-black/70 border border-white/20 hover:border-emerald-400 text-stone-200 hover:text-white backdrop-blur-md flex items-center justify-center transition-all cursor-pointer shadow-lg animate-bounce"
                  aria-label="Scroll to next section"
                >
                  <ChevronDown className="w-5 h-5 text-emerald-300" />
                </button>
              </div>

              {/* Right: Location Tag */}
              <div className="w-auto sm:w-40 flex justify-end">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-white/15 text-xs font-medium text-stone-200 shadow-sm">
                  <MapPin className="w-3.5 h-3.5 text-[#4ade80]" />
                  <span>Himachal Pradesh, India</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* 2. ABOUT SECTION: WHY MOUNTAIN LANDSLIDE MONITORING MATTERS */}
      {/* ========================================================================= */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto w-full space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-xs font-mono text-emerald-400">
            <Mountain className="w-3.5 h-3.5" />
            <span>Himalayan Geological Vulnerability</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white tracking-tight">
            Protecting Mountain Corridors from Sudden Slope Failure
          </h2>
          <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
            Himachal Pradesh features steep, young tectonic topography prone to intense monsoon rainfall, cloudbursts, and seismic tremors. Landslide Guard replaces delayed manual observations with real-time autonomous IoT telemetry.
          </p>
        </div>

        {/* 3 Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-[#0c1a11] border border-emerald-900/40 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-800/50 flex items-center justify-center text-[#4ade80]">
              <CloudRain className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white font-heading">High Rainfall Saturation</h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Monsoon downpours rapidly increase soil pore-water pressure, reducing shear resistance and triggering devastating debris flows within minutes.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#0c1a11] border border-emerald-900/40 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-800/50 flex items-center justify-center text-[#4ade80]">
              <RadioTower className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white font-heading">Zero-Cellular Reliance</h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Deep mountain valleys frequently lose cellular reception during storms. Our Sub-GHz LoRa mesh protocol operates uninterrupted over miles of rugged ridges.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#0c1a11] border border-emerald-900/40 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-800/50 flex items-center justify-center text-[#4ade80]">
              <Clock className="w-6 h-6 text-[#4ade80]" />
            </div>
            <h3 className="text-lg font-bold text-white font-heading">Early Evacuation Window</h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Detecting millimeter-scale inclinometer creep and soil saturation gradients grants civil authorities up to 6 hours of crucial evacuation lead time.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. CORE ARCHITECTURAL CAPABILITIES */}
      {/* ========================================================================= */}
      <section id="features-section" className="py-20 px-4 sm:px-6 lg:px-12 bg-[#08120B] border-y border-emerald-950/80 w-full scroll-mt-20">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#4ade80] font-mono">
              Core Monitoring Capabilities
            </h2>
            <h3 className="text-3xl sm:text-4xl font-bold font-heading text-white">
              End-to-End Early Warning Architecture
            </h3>
            <p className="text-xs sm:text-sm text-stone-400">
              Engineered with rigorous threshold bands, persistent telemetry, and full edge-first evaluation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Capability 1 */}
            <div className="p-6 rounded-3xl bg-[#0c1f13] border border-emerald-900/50 shadow-lg space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-950 border border-emerald-800 flex items-center justify-center text-[#4ade80]">
                <Radio className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold font-heading text-white">
                Sub-GHz LoRa Mesh Nodes
              </h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                8 distributed telemetry stations transmitting volumetric soil saturation, tilt displacement, rainfall, and micro-vibrations across remote mountain valleys.
              </p>
            </div>

            {/* Capability 2 */}
            <div className="p-6 rounded-3xl bg-[#0c1f13] border border-emerald-900/50 shadow-lg space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-950 border border-emerald-800 flex items-center justify-center text-[#4ade80]">
                <Cpu className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold font-heading text-white">
                Deterministic Hazard Scoring
              </h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                Strict 4-tier risk classification (Safe 0–25, Warning &gt;25–50, High Risk &gt;50–75, Critical &gt;75–100) with weighted multi-sensor hazard fusion.
              </p>
            </div>

            {/* Capability 3 */}
            <div className="p-6 rounded-3xl bg-[#0c1f13] border border-emerald-900/50 shadow-lg space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-950 border border-emerald-800 flex items-center justify-center text-[#4ade80]">
                <MapPin className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold font-heading text-white">
                Geospatial Himalayan Mapping
              </h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                Interactive real-world Leaflet GIS interface with Topographic, Satellite, and Standard basemaps plotting GPS coordinates across Himachal Pradesh.
              </p>
            </div>

            {/* Capability 4 */}
            <div className="p-6 rounded-3xl bg-[#0c1f13] border border-emerald-900/50 shadow-lg space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-950 border border-emerald-800 flex items-center justify-center text-[#4ade80]">
                <Bell className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold font-heading text-white">
                Civil Defense Alert Matrix
              </h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                Automated alert escalation, multi-channel broadcast simulation (SMS, Audio Siren, Civil Push), and comprehensive incident resolution logs.
              </p>
            </div>

            {/* Capability 5 */}
            <div className="p-6 rounded-3xl bg-[#0c1f13] border border-emerald-900/50 shadow-lg space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-950 border border-emerald-800 flex items-center justify-center text-[#4ade80]">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold font-heading text-white">
                Analytics &amp; PDF Audits
              </h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                Historical telemetry charts, cross-node saturation trends, and instant formatted geotechnical audit reports exportable directly to PDF.
              </p>
            </div>

            {/* Capability 6 */}
            <div className="p-6 rounded-3xl bg-[#0c1f13] border border-emerald-900/50 shadow-lg space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-950 border border-emerald-800 flex items-center justify-center text-[#4ade80]">
                <Smartphone className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold font-heading text-white">
                Hardware Health Diagnostics
              </h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                Real-time tracking of packet delivery rates, RSSI &amp; SNR signal diagnostics, battery lifecycle, and LoRaWAN regional gateway health.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. TECHNOLOGY SECTION */}
      {/* ========================================================================= */}
      <section id="technology" className="py-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto w-full space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-xs font-mono text-emerald-400">
            <Cpu className="w-3.5 h-3.5" />
            <span>Multi-Parameter Sensing & AI</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white">
            Engineered for Extreme Mountain Environments
          </h2>
          <p className="text-stone-400 text-sm sm:text-base">
            Every station combines military-grade environmental resistance with low-power precision instrumentation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* Tech List */}
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-[#0d2015] border border-emerald-900/40 flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-emerald-950 text-[#4ade80] flex-shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Solar + Li-ion Autonomous Power</h4>
                <p className="text-xs text-stone-400 mt-1">High-efficiency mono-crystalline solar panel paired with MPPT charge controller and 18650 industrial lithium reserve for months of cloudy autonomy.</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#0d2015] border border-emerald-900/40 flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-emerald-950 text-[#4ade80] flex-shrink-0">
                <Wifi className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">868 MHz Sub-GHz LoRaWAN</h4>
                <p className="text-xs text-stone-400 mt-1">Long-range radio telemetry penetrating deep pine valleys and dense weather fronts where 4G/5G connections consistently drop.</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#0d2015] border border-emerald-900/40 flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-emerald-950 text-[#4ade80] flex-shrink-0">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Random Forest + LSTM Predictive Fusion</h4>
                <p className="text-xs text-stone-400 mt-1">Temporal deep learning model cross-referencing soil volumetric saturation with cumulative 72-hour rainfall vectors to forecast slip probability.</p>
              </div>
            </div>
          </div>

          {/* Telemetry Snapshot Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0c2415] to-[#07170d] border border-emerald-700/50 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-emerald-900/60">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#4ade80] animate-pulse" />
                <span className="font-mono text-xs text-stone-200 font-bold">NODE-05 • LIVE TELEMETRY</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-700/60 text-[10px] font-mono text-[#4ade80]">
                868.1 MHz
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                <div className="text-[10px] text-stone-400 uppercase">Soil Moisture</div>
                <div className="text-lg font-bold text-white font-mono mt-0.5">76.0%</div>
                <div className="text-[10px] text-amber-400 font-medium">Critical Saturation</div>
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                <div className="text-[10px] text-stone-400 uppercase">Inclinometer Tilt</div>
                <div className="text-lg font-bold text-white font-mono mt-0.5">4.8&deg;</div>
                <div className="text-[10px] text-amber-400 font-medium">Drift Detected</div>
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                <div className="text-[10px] text-stone-400 uppercase">Vibration Index</div>
                <div className="text-lg font-bold text-white font-mono mt-0.5">0.11 g</div>
                <div className="text-[10px] text-emerald-400 font-medium">Micro Tremor</div>
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                <div className="text-[10px] text-stone-400 uppercase">Hazard Index</div>
                <div className="text-lg font-bold text-amber-400 font-mono mt-0.5">68 / 100</div>
                <div className="text-[10px] text-amber-400 font-medium">High Risk (Orange)</div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleCtaClick}
                className="w-full py-2.5 rounded-xl bg-[#16a34a] hover:bg-[#15803d] text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <span>View Full Geospatial Map</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. IMPACT SECTION */}
      {/* ========================================================================= */}
      <section id="impact" className="py-20 px-4 sm:px-6 lg:px-12 bg-[#08120B] border-t border-emerald-950/80 w-full">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#4ade80] font-mono">
              Proven Geotechnical Safety
            </h2>
            <h3 className="text-3xl sm:text-4xl font-bold font-heading text-white">
              Securing Vital Himalayan Corridors
            </h3>
            <p className="text-stone-400 text-xs sm:text-sm">
              Connecting rural mountain settlements, arterial tourist transit routes, and civil defense headquarters.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-6 rounded-3xl bg-[#0c1f13] border border-emerald-900/50">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#4ade80] font-mono">08</div>
              <div className="text-xs font-semibold text-white mt-1">Telemetry Stations</div>
              <div className="text-[11px] text-stone-400 mt-0.5">Himachal Central Corridor</div>
            </div>

            <div className="p-6 rounded-3xl bg-[#0c1f13] border border-emerald-900/50">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#4ade80] font-mono">98.6%</div>
              <div className="text-xs font-semibold text-white mt-1">Packet Reliability</div>
              <div className="text-[11px] text-stone-400 mt-0.5">Sub-GHz LoRa mesh</div>
            </div>

            <div className="p-6 rounded-3xl bg-[#0c1f13] border border-emerald-900/50">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#4ade80] font-mono">&lt; 6 hrs</div>
              <div className="text-xs font-semibold text-white mt-1">Advance Warning</div>
              <div className="text-[11px] text-stone-400 mt-0.5">Predictive saturation window</div>
            </div>

            <div className="p-6 rounded-3xl bg-[#0c1f13] border border-emerald-900/50">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#4ade80] font-mono">100%</div>
              <div className="text-xs font-semibold text-white mt-1">Autonomous Failover</div>
              <div className="text-[11px] text-stone-400 mt-0.5">Zero cloud dependencies</div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. PROTOTYPE CREDENTIALS & DEMO ACCESS BANNER */}
      {/* ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto w-full">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#0c2817] via-[#081b0f] to-[#040f08] border border-emerald-600/40 text-center space-y-6 shadow-2xl">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-xs text-emerald-300 font-mono">
            <Sparkles className="w-3.5 h-3.5 text-[#4ade80]" />
            <span>Prototype System Access</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold font-heading text-white">
            Ready to Explore the Monitoring Dashboard?
          </h3>

          <p className="text-stone-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Experience the complete monitoring suite with preconfigured prototype credentials. Real interactive Leaflet map, live telemetry, and threshold triggers operate in real time.
          </p>

          {/* Credentials Box */}
          <div className="inline-flex items-center gap-6 p-4 rounded-2xl bg-black/60 border border-emerald-500/30 font-mono text-xs text-stone-200 shadow-inner">
            <div>
              <span className="text-emerald-400 block text-[10px] uppercase font-sans font-bold">Username</span>
              <span className="text-white font-bold text-sm">admin</span>
            </div>
            <div className="h-8 w-px bg-emerald-800/60" />
            <div>
              <span className="text-emerald-400 block text-[10px] uppercase font-sans font-bold">Password</span>
              <span className="text-white font-bold text-sm">admin123</span>
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={handleCtaClick}
              className="min-h-[48px] px-8 py-3.5 rounded-full bg-[#16a34a] hover:bg-[#15803d] text-white font-bold text-sm shadow-xl shadow-emerald-950/70 hover:shadow-emerald-600/40 transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Launch Prototype Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. CONTACT & INQUIRIES SECTION */}
      {/* ========================================================================= */}
      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto w-full border-t border-emerald-950/80">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="space-y-4 text-left">
            <span className="text-xs font-mono font-bold text-[#4ade80] uppercase tracking-wider">Civil Protection Inquiries</span>
            <h3 className="text-2xl sm:text-3xl font-bold font-heading text-white">Deploy Landslide Guard in Your Region</h3>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
              We collaborate with state disaster management authorities, geotechnical research institutes, and mountain municipalities across the Himalayan belt.
            </p>
            <div className="space-y-2 pt-2 text-xs text-stone-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#4ade80]" />
                <span>Regional Monitoring Center • Kullu-Manali Corridor, HP, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#4ade80]" />
                <span>Civil Defense Protocol Compliant • LoRa Sub-GHz Telemetry</span>
              </div>
            </div>
          </div>

          <form 
            onSubmit={(e) => {
              e.preventDefault();
              toast.success('Inquiry submitted. In this prototype, inquiries are logged for demonstration.', 'Inquiry Received');
            }} 
            className="p-6 rounded-3xl bg-[#0c1a11] border border-emerald-900/50 space-y-3"
          >
            <div>
              <label className="block text-xs font-medium text-stone-300 mb-1">Organization / Agency</label>
              <input 
                type="text" 
                placeholder="e.g. State Disaster Management Authority" 
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-emerald-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-stone-300 mb-1">Contact Email</label>
              <input 
                type="email" 
                placeholder="official@hp.gov.in" 
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-emerald-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#16a34a] hover:bg-[#15803d] text-white font-bold text-xs shadow-md transition-colors"
            >
              Submit Deployment Inquiry
            </button>
          </form>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. FOOTER */}
      {/* ========================================================================= */}
      <footer className="w-full border-t border-emerald-950/80 bg-[#050b07] py-8 px-4 sm:px-6 lg:px-12 text-xs text-stone-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#4ade80]" />
            <span className="font-bold text-white">Landslide Guard</span>
            <span>&bull; AI + IoT Geotechnical Early Warning System</span>
          </div>

          <div className="text-[11px] text-stone-400">
            Himachal Pradesh Central Telemetry Corridor &bull; Prototype Monitoring Build
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button type="button" onClick={() => scrollToSection('hero')} className="hover:text-white transition-colors">Back to Top</button>
            <span>&bull;</span>
            <Link to="/login" className="text-[#4ade80] hover:underline font-semibold">Admin Login</Link>
          </div>

        </div>
      </footer>

    </div>
  );
};

// Simple Clock Icon helper if needed
const Clock = ({ className = "w-6 h-6 text-[#4ade80]" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

export default Landing;

