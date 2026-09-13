import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  ArrowRight, 
  Radio, 
  Activity, 
  Cpu, 
  MapPin, 
  Bell, 
  FileText, 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink,
  ChevronDown,
  Lock,
  Smartphone
} from 'lucide-react';
import BrandLogo from '../components/common/BrandLogo';
import ThemeToggle from '../components/layout/ThemeToggle';
import { useAuth } from '../context/AuthContext';

export const Landing = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleCtaClick = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  const scrollToFeatures = () => {
    const el = document.getElementById('features-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#F4F6F4] dark:bg-[#0A120D] text-stone-800 dark:text-stone-100 flex flex-col justify-between transition-colors duration-200">
      
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-[#0A120D]/80 backdrop-blur-md border-b border-stone-200/80 dark:border-forest-900/60 px-4 sm:px-6 lg:px-8 py-3.5 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between min-w-0">
          
          {/* Logo & Prototype Status Badge */}
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <BrandLogo size="md" showTagline={true} />
            <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-forest-100/80 dark:bg-forest-900/60 border border-forest-300 dark:border-forest-700/60 text-[11px] font-mono font-bold text-forest-800 dark:text-nature-300 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-nature-500 animate-pulse" />
              Prototype Monitoring Environment
            </span>
          </div>

          {/* Right Controls: Sign In / Dashboard CTA & Single Theme Toggle */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleCtaClick}
              className="min-h-[40px] px-3 sm:px-4 py-2 rounded-xl bg-forest-600 hover:bg-forest-500 text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5"
            >
              <span>{isAuthenticated ? 'Open Dashboard' : 'Sign In'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <ThemeToggle />
          </div>

        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 space-y-16 sm:space-y-24">
        
        {/* HERO SECTION */}
        <section className="relative text-center max-w-4xl mx-auto pt-4 sm:pt-8 space-y-6">
          
          {/* Top pill badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-forest-100 dark:bg-forest-950/90 border border-forest-300 dark:border-forest-800 text-forest-800 dark:text-nature-300 text-xs font-semibold shadow-xs">
            <ShieldCheck className="w-4 h-4 text-forest-600 dark:text-nature-400" />
            <span>Autonomous Geotechnical Early Warning System</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading text-stone-900 dark:text-white leading-tight tracking-tight">
            Monitor &bull; Predict &bull; Prevent <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-forest-600 via-nature-500 to-emerald-600 dark:from-nature-400 dark:via-emerald-300 dark:to-nature-200">
              Slope Failures in Real Time
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Continuous environmental telemetry integrating Sub-GHz LoRa mesh nodes, real-time sensor fusion, and multi-factor hazard scoring to protect mountainous corridors and vulnerable infrastructure.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleCtaClick}
              className="min-h-[48px] w-full sm:w-auto px-6 py-3 rounded-2xl bg-forest-600 hover:bg-forest-500 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <span>Open Monitoring Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={scrollToFeatures}
              className="min-h-[48px] w-full sm:w-auto px-5 py-3 rounded-2xl bg-white dark:bg-[#121c16] hover:bg-stone-100 dark:hover:bg-forest-900/60 text-stone-700 dark:text-stone-200 border border-stone-200 dark:border-forest-800 font-semibold text-sm transition-colors flex items-center justify-center gap-2"
            >
              <span>Explore Architecture</span>
              <ChevronDown className="w-4 h-4 text-stone-400" />
            </button>
          </div>

          {/* Hero Live Telemetry Preview Card */}
          <div className="pt-8">
            <div className="p-4 sm:p-6 rounded-3xl bg-white dark:bg-[#121c16] border border-stone-200/90 dark:border-forest-900/70 shadow-lg text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-stone-100 dark:border-forest-900/60 gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-bold text-sm text-stone-900 dark:text-white font-heading">
                    Himalayan Telemetry Corridor &bull; Sector 04
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs font-mono text-stone-500 dark:text-stone-400">
                  <span>LoRa: 868.1 MHz</span>
                  <span>&bull;</span>
                  <span className="text-nature-600 dark:text-nature-400 font-bold">8 NODES ONLINE</span>
                </div>
              </div>

              {/* Metric previews */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-2xl bg-stone-50 dark:bg-forest-950/60 border border-stone-200/70 dark:border-forest-900/50">
                  <div className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider">Avg Soil Moisture</div>
                  <div className="text-lg font-bold font-heading text-stone-900 dark:text-white mt-0.5">38.4%</div>
                  <div className="text-[10px] text-nature-600 dark:text-nature-400 font-medium mt-0.5">Nominal Saturation</div>
                </div>

                <div className="p-3 rounded-2xl bg-stone-50 dark:bg-forest-950/60 border border-stone-200/70 dark:border-forest-900/50">
                  <div className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider">Max Tilt Angle</div>
                  <div className="text-lg font-bold font-heading text-stone-900 dark:text-white mt-0.5">14.2&deg;</div>
                  <div className="text-[10px] text-amber-600 dark:text-amber-400 font-medium mt-0.5">Mild Incline Drift</div>
                </div>

                <div className="p-3 rounded-2xl bg-stone-50 dark:bg-forest-950/60 border border-stone-200/70 dark:border-forest-900/50">
                  <div className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider">Seismic Vibration</div>
                  <div className="text-lg font-bold font-heading text-stone-900 dark:text-white mt-0.5">0.038 g</div>
                  <div className="text-[10px] text-nature-600 dark:text-nature-400 font-medium mt-0.5">Baseline Stable</div>
                </div>

                <div className="p-3 rounded-2xl bg-stone-50 dark:bg-forest-950/60 border border-stone-200/70 dark:border-forest-900/50">
                  <div className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider">Overall Hazard</div>
                  <div className="text-lg font-bold font-heading text-emerald-600 dark:text-emerald-400 mt-0.5">24.5 / 100</div>
                  <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">Safe (0–25)</div>
                </div>
              </div>
            </div>
          </div>

        </section>

        {/* SYSTEM PILLARS / ARCHITECTURE SECTION */}
        <section id="features-section" className="space-y-8 scroll-mt-24">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-forest-600 dark:text-nature-400 font-mono">
              Core Monitoring Capabilities
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold font-heading text-stone-900 dark:text-white">
              End-to-End Early Warning Architecture
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
              Engineered with rigorous threshold bands, persistent telemetry, and full offline-first evaluation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            
            {/* Feature 1 */}
            <div className="p-5 rounded-3xl bg-white dark:bg-[#121c16] border border-stone-200/80 dark:border-forest-900/60 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-forest-50 dark:bg-forest-950 border border-forest-200 dark:border-forest-800 flex items-center justify-center text-forest-600 dark:text-nature-400">
                <Radio className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold font-heading text-stone-900 dark:text-white">
                Sub-GHz LoRa Mesh Nodes
              </h4>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                8 distributed ESP32 telemetry stations transmitting soil saturation, tilt displacement, rainfall, and vibration over long-range Sub-GHz frequencies.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-5 rounded-3xl bg-white dark:bg-[#121c16] border border-stone-200/80 dark:border-forest-900/60 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-forest-50 dark:bg-forest-950 border border-forest-200 dark:border-forest-800 flex items-center justify-center text-forest-600 dark:text-nature-400">
                <Cpu className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold font-heading text-stone-900 dark:text-white">
                Deterministic Hazard Scoring
              </h4>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                Strict 4-tier risk classification (Safe 0–25, Warning &gt;25–50, High Risk &gt;50–75, Critical &gt;75–100) with weighted multi-sensor hazard fusion.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-5 rounded-3xl bg-white dark:bg-[#121c16] border border-stone-200/80 dark:border-forest-900/60 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-forest-50 dark:bg-forest-950 border border-forest-200 dark:border-forest-800 flex items-center justify-center text-forest-600 dark:text-nature-400">
                <MapPin className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold font-heading text-stone-900 dark:text-white">
                Geospatial Slope Mapping
              </h4>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                Interactive topographical layout plotting node positions, danger zones, historical slip planes, and real-time hazard color coding.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-5 rounded-3xl bg-white dark:bg-[#121c16] border border-stone-200/80 dark:border-forest-900/60 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-forest-50 dark:bg-forest-950 border border-forest-200 dark:border-forest-800 flex items-center justify-center text-forest-600 dark:text-nature-400">
                <Bell className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold font-heading text-stone-900 dark:text-white">
                Civil Defense Alert Matrix
              </h4>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                Automated alert escalation, multi-channel broadcast simulation (SMS, Audio Siren, Civil Push), and complete operational incident logs.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-5 rounded-3xl bg-white dark:bg-[#121c16] border border-stone-200/80 dark:border-forest-900/60 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-forest-50 dark:bg-forest-950 border border-forest-200 dark:border-forest-800 flex items-center justify-center text-forest-600 dark:text-nature-400">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold font-heading text-stone-900 dark:text-white">
                Analytics &amp; PDF Audits
              </h4>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                Historical telemetry charts, cross-node correlations, and instant prototype report generators exportable directly from the browser.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-5 rounded-3xl bg-white dark:bg-[#121c16] border border-stone-200/80 dark:border-forest-900/60 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-forest-50 dark:bg-forest-950 border border-forest-200 dark:border-forest-800 flex items-center justify-center text-forest-600 dark:text-nature-400">
                <Smartphone className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold font-heading text-stone-900 dark:text-white">
                Hardware Device Health
              </h4>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                Live monitoring of packet delivery ratios, RSSI and SNR signal diagnostics, battery lifecycle, and gateway connectivity.
              </p>
            </div>

          </div>
        </section>

        {/* DEMO ACCESS BANNER */}
        <section className="p-6 sm:p-8 md:p-10 rounded-3xl bg-gradient-to-br from-forest-900 via-forest-950 to-[#0c1811] text-white border border-forest-800/80 shadow-md">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-800/60 border border-forest-700/60 text-xs text-nature-300 font-mono">
              <Sparkles className="w-3.5 h-3.5 text-nature-400" />
              <span>Prototype Access Information</span>
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-bold font-heading text-white">
              Ready to Explore the Prototype?
            </h3>
            
            <p className="text-forest-200 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
              Experience the full monitoring suite with preconfigured demo credentials. All sensor data and alerts operate client-side in real-time.
            </p>

            <div className="inline-flex items-center gap-4 p-3 rounded-2xl bg-forest-900/80 border border-forest-700/60 font-mono text-xs text-stone-200">
              <div>
                <span className="text-forest-400 block text-[10px] uppercase font-sans font-bold">User</span>
                <span className="text-white font-bold">admin</span>
              </div>
              <div className="h-6 w-px bg-forest-700" />
              <div>
                <span className="text-forest-400 block text-[10px] uppercase font-sans font-bold">Password</span>
                <span className="text-white font-bold">admin123</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleCtaClick}
                className="min-h-[44px] px-6 py-3 rounded-xl bg-nature-500 hover:bg-nature-400 text-forest-950 font-bold text-xs sm:text-sm shadow-md transition-colors inline-flex items-center gap-2"
              >
                <span>Launch Prototype Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="w-full border-t border-stone-200/80 dark:border-forest-900/60 bg-white/60 dark:bg-[#0A120D]/60 py-6 px-4 sm:px-6 lg:px-8 text-xs text-stone-500 dark:text-stone-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <span className="font-bold text-stone-700 dark:text-stone-300">Landslide Guard</span> &bull; AI-Powered Landslide Early Warning System
          </div>
          <div className="text-[11px] text-stone-400">
            Frontend Prototype Build &bull; Telemetry &amp; Hazard Scoring Simulated for Demonstration
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Landing;
