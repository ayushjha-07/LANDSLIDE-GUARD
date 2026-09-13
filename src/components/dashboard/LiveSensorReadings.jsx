import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Droplets, 
  CloudRain, 
  Mountain, 
  Activity, 
  Thermometer, 
  Wind, 
  Clock, 
  ChevronDown, 
  ArrowRight, 
  ShieldCheck, 
  Leaf, 
  BarChart3, 
  Database, 
  RadioTower, 
  MapPin, 
  FileText, 
  Info, 
  Zap 
} from 'lucide-react';
import { useSensorContext } from '../../context/SensorContext';
import { useTheme } from '../../hooks/useTheme';
import heroHimalayasImg from '../../assets/hero_himalayas.jpg';

// Micro-wave SVG component with smooth gradient fill for the bottom-right of each card
const MicroTrendWave = ({ data, color, gradientId, isBars = false }) => {
  if (isBars) {
    const bars = [3, 5, 8, 4, 7, 10, 6, 9];
    return (
      <svg viewBox="0 0 54 24" className="w-12 sm:w-14 h-6 overflow-visible opacity-70">
        {bars.map((h, idx) => (
          <rect
            key={idx}
            x={idx * 7 + 1}
            y={24 - h * 2}
            width="3.2"
            height={h * 2}
            rx="1"
            fill={color}
            opacity={0.3 + (idx / bars.length) * 0.5}
          />
        ))}
      </svg>
    );
  }

  // Smooth mountain foothills wave
  return (
    <svg viewBox="0 0 80 32" preserveAspectRatio="none" className="w-18 sm:w-22 h-7 sm:h-8 overflow-hidden pointer-events-none">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.32" />
          <stop offset="100%" stopColor={color} stopOpacity="0.0" />
        </linearGradient>
      </defs>
      <path
        d="M 0,26 Q 16,12 32,20 T 60,8 T 80,14 L 80,32 L 0,32 Z"
        fill={`url(#${gradientId})`}
      />
      <path
        d="M 0,26 Q 16,12 32,20 T 60,8 T 80,14"
        fill="none"
        stroke={color}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeOpacity="0.75"
      />
    </svg>
  );
};

export const LiveSensorReadings = ({ 
  sensorValues: propSensorValues, 
  sparklines: propSparklines 
}) => {
  const context = useSensorContext();
  const { isDark } = useTheme();

  const sensorValues = propSensorValues || context.sensorValues;
  const sparklines = propSparklines || context.sparklines;
  const riskAssessment = context.riskAssessment;
  const rawUpdatedText = context.lastUpdatedText || 'Just now';

  const [selectedTimeRange, setSelectedTimeRange] = useState('Last 24 Hours');
  const [timeRangeOpen, setTimeRangeOpen] = useState(false);

  // Dynamic formatted timestamp
  const formattedTimestamp = useMemo(() => {
    const d = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const day = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    const pad = (n) => String(n).padStart(2, '0');
    return `${day} ${month} ${year}, ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  }, [sensorValues]);

  // Risk values
  const riskScore = typeof riskAssessment?.riskScore === 'number' ? Math.round(riskAssessment.riskScore) : 22;

  // Circular gauge calculations: clockwise from top (12 o'clock)
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const filledLength = (Math.min(100, Math.max(0, riskScore)) / 100) * circumference;

  // Gauge color based on centralized score
  const gaugeColor = useMemo(() => {
    if (riskScore <= 25) return '#10b981'; // green
    if (riskScore <= 50) return '#f59e0b'; // amber
    if (riskScore <= 75) return '#f97316'; // orange
    return '#ef4444'; // red
  }, [riskScore]);

  // 6 Primary Sensor Parameters Configuration
  const cards = [
    {
      id: 'moisture',
      title: 'Soil Moisture',
      icon: Droplets,
      iconBg: 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800/40',
      value: sensorValues?.moisture ?? 41.9,
      unit: '%',
      status: (sensorValues?.moisture ?? 41.9) > 65 ? 'Warning' : 'Normal',
      statusType: (sensorValues?.moisture ?? 41.9) > 65 ? 'warning' : 'normal',
      comparison: { text: '−1.2%', dir: 'down', label: 'vs last hour' },
      color: '#10b981',
      gradientId: 'grad-moisture',
      tint: 'hover:border-emerald-200 dark:hover:border-emerald-800/60',
      bgGlow: 'from-emerald-50/20 to-transparent'
    },
    {
      id: 'rainfall',
      title: 'Rainfall',
      icon: CloudRain,
      iconBg: 'bg-sky-50 dark:bg-sky-950/50 text-sky-500 dark:text-sky-400 border border-sky-100 dark:border-sky-800/40',
      value: sensorValues?.rainfall ?? 12,
      unit: 'mm',
      status: (sensorValues?.rainfall ?? 12) > 30 ? 'Warning' : 'Normal',
      statusType: (sensorValues?.rainfall ?? 12) > 30 ? 'warning' : 'normal',
      comparison: { text: '+2 mm', dir: 'up', label: 'vs last hour' },
      color: '#0ea5e9',
      gradientId: 'grad-rainfall',
      tint: 'hover:border-sky-200 dark:hover:border-sky-800/60',
      bgGlow: 'from-sky-50/20 to-transparent'
    },
    {
      id: 'tilt',
      title: 'Ground Tilt',
      icon: Mountain,
      iconBg: 'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 border border-amber-200/60 dark:border-amber-800/40',
      value: sensorValues?.tilt ?? 1.74,
      unit: '°',
      status: (sensorValues?.tilt ?? 1.74) > 3.0 ? 'Elevated' : 'Stable',
      statusType: (sensorValues?.tilt ?? 1.74) > 3.0 ? 'warning' : 'stable',
      comparison: { text: '+0.03°', dir: 'up', label: 'vs last hour' },
      color: '#d97706',
      gradientId: 'grad-tilt',
      tint: 'hover:border-amber-200 dark:hover:border-amber-800/60 ring-1 ring-amber-500/10',
      bgGlow: 'from-amber-50/30 to-transparent'
    },
    {
      id: 'vibration',
      title: 'Vibration',
      icon: Activity,
      iconBg: 'bg-amber-50 dark:bg-amber-950/50 text-amber-500 dark:text-amber-400 border border-amber-100 dark:border-amber-800/40',
      value: sensorValues?.vibration ?? 0.033,
      unit: 'g',
      status: (sensorValues?.vibration ?? 0.033) > 0.05 ? 'Warning' : 'Normal',
      statusType: (sensorValues?.vibration ?? 0.033) > 0.05 ? 'warning' : 'normal',
      comparison: { text: '+0.002 g', dir: 'up', label: 'vs last hour' },
      color: '#f59e0b',
      gradientId: 'grad-vibration',
      tint: 'hover:border-amber-200 dark:hover:border-amber-800/60',
      bgGlow: 'from-amber-50/20 to-transparent'
    },
    {
      id: 'temperature',
      title: 'Temperature',
      icon: Thermometer,
      iconBg: 'bg-rose-50 dark:bg-rose-950/50 text-rose-500 dark:text-rose-400 border border-rose-100 dark:border-rose-800/40',
      value: sensorValues?.temperature ?? 21.5,
      unit: '°C',
      status: 'Normal',
      statusType: 'normal',
      comparison: { text: '+0.4°C', dir: 'up', label: 'vs last hour' },
      color: '#f43f5e',
      gradientId: 'grad-temperature',
      tint: 'hover:border-rose-200 dark:hover:border-rose-800/60',
      bgGlow: 'from-rose-50/20 to-transparent'
    },
    {
      id: 'humidity',
      title: 'Humidity',
      icon: Wind,
      iconBg: 'bg-purple-50 dark:bg-purple-950/50 text-purple-500 dark:text-purple-400 border border-purple-100 dark:border-purple-800/40',
      value: sensorValues?.humidity ?? 72.5,
      unit: '%',
      status: (sensorValues?.humidity ?? 72.5) > 85 ? 'Elevated' : 'Normal',
      statusType: (sensorValues?.humidity ?? 72.5) > 85 ? 'warning' : 'normal',
      comparison: { text: '−1.1%', dir: 'down', label: 'vs last hour' },
      color: '#a855f7',
      gradientId: 'grad-humidity',
      tint: 'hover:border-purple-200 dark:hover:border-purple-800/60',
      bgGlow: 'from-purple-50/20 to-transparent'
    }
  ];

  return (
    <div className="relative rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm p-5 sm:p-6 sm:px-7 overflow-hidden transition-colors">
      
      {/* 1. Subtle Himalayan Mountain Backdrop Visual */}
      <div className="absolute top-0 right-0 h-40 sm:h-52 w-full max-w-2xl pointer-events-none select-none overflow-hidden">
        <img 
          src={heroHimalayasImg} 
          alt="Himalayan Mountain Range" 
          className="w-full h-full object-cover object-top opacity-30 dark:opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white dark:via-slate-900/60 dark:to-slate-900" />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/60 to-transparent dark:from-slate-900 dark:via-slate-900/60" />
      </div>

      {/* 2. Section Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-4 mb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-slate-900 dark:text-white tracking-tight">
              Live Sensor Readings
            </h2>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-400 border border-emerald-200/70 dark:border-emerald-800/50 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              LIVE
            </span>
          </div>
          
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-0.5">
            Synchronized 3-second geotechnical &amp; hydrological telemetry
          </p>

          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mt-1.5 text-[11px] text-slate-400 dark:text-slate-500 font-medium">
            <span>Updated Just now</span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span>8 Monitoring Nodes</span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span>LoRa Network</span>
          </div>
        </div>

        {/* Right Header: Brand Tagline + Compact Controls */}
        <div className="flex flex-col items-end gap-2 self-start md:self-auto">
          <div className="text-right hidden sm:block">
            <p className="text-[12px] font-medium italic text-slate-400 dark:text-slate-500 tracking-wide">
              Real-time data
            </p>
            <p className="text-[12px] font-medium italic text-slate-400 dark:text-slate-500 tracking-wide -mt-0.5">
              for safer mountains
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Time Range Selector */}
            <div className="relative">
              <button 
                type="button"
                onClick={() => setTimeRangeOpen(!timeRangeOpen)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-800/95 text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-2xs hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors"
              >
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{selectedTimeRange}</span>
                <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${timeRangeOpen ? 'rotate-180' : ''}`} />
              </button>

              {timeRangeOpen && (
                <div className="absolute right-0 mt-1.5 w-36 py-1 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 z-50 text-xs">
                  {['Last 1 Hour', 'Last 6 Hours', 'Last 24 Hours', 'Last 7 Days'].map((range) => (
                    <button
                      key={range}
                      type="button"
                      onClick={() => { setSelectedTimeRange(range); setTimeRangeOpen(false); }}
                      className={`w-full text-left px-3 py-1.5 transition-colors hover:bg-slate-100 dark:hover:bg-slate-700/60 ${selectedTimeRange === range ? 'font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/30' : 'text-slate-700 dark:text-slate-300'}`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Direct Link to Sensors Page */}
            <Link
              to="/sensors"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-800/95 text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-2xs hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors"
            >
              <Activity className="w-3.5 h-3.5 text-slate-400" />
              <span>All Sensors</span>
              <ArrowRight className="w-3 h-3 text-slate-400" />
            </Link>
          </div>
        </div>
      </div>

      {/* 3. Six Sensor Cards Grid (6 Columns on Desktop) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-2 sm:gap-2.5 w-full min-w-0">
        {cards.map((card) => {
          const Icon = card.icon;
          const isWarning = card.statusType === 'warning';
          const isStable = card.statusType === 'stable';

          return (
            <div 
              key={card.id}
              className={`relative flex flex-col justify-between rounded-2xl px-2.5 sm:px-3 py-3 sm:py-3.5 bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/70 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden ${card.tint}`}
            >
              {/* Background gradient hint */}
              <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl ${card.bgGlow} pointer-events-none rounded-tr-2xl`} />

              {/* Card Header: Icon + Title + Status Badge */}
              <div className="flex items-center justify-between gap-1 mb-2 relative z-10">
                <div className="flex items-center gap-1.5 min-w-0 flex-1">
                  <div className={`w-6.5 h-6.5 rounded-full flex items-center justify-center shrink-0 ${card.iconBg}`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[10px] sm:text-[10.5px] font-semibold text-slate-700 dark:text-slate-200 leading-tight">
                    {card.title}
                  </span>
                </div>

                {/* Status Pill */}
                <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[8.5px] font-semibold shrink-0 ${
                  isWarning 
                    ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200/60' 
                    : isStable
                    ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60'
                    : 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${isWarning ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                  {card.status}
                </span>
              </div>

              {/* Card Body: Numeric Value */}
              <div className="my-1 relative z-10">
                <div className="flex items-baseline font-mono tracking-tight text-slate-900 dark:text-white">
                  <span className="text-2xl sm:text-[27px] font-bold leading-tight">
                    {card.value}
                  </span>
                  <span className="text-xs font-medium text-slate-400 dark:text-slate-500 ml-1">
                    {card.unit}
                  </span>
                </div>
              </div>

              {/* Card Footer: Delta Comparison + Micro Waveform Visual */}
              <div className="flex items-end justify-between pt-1 relative z-10 mt-auto">
                <div className="text-[10.5px] leading-tight">
                  <span className={`font-semibold inline-flex items-center gap-0.5 whitespace-nowrap text-[10px] sm:text-[10.5px] ${
                    card.comparison.dir === 'down' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-300'
                  }`}>
                    {card.comparison.dir === 'down' ? '↓' : '↑'} {card.comparison.text}
                  </span>
                  <span className="block text-[9px] text-slate-400 dark:text-slate-500 whitespace-nowrap">
                    {card.comparison.label}
                  </span>
                </div>

                {/* Micro Trend Wave */}
                <div className="shrink-0 -mb-1 -mr-1">
                  <MicroTrendWave 
                    data={sparklines?.[card.id]} 
                    color={card.color} 
                    gradientId={card.gradientId}
                    isBars={card.id === 'rainfall'}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Compact Environmental Summary (Single Sleek Horizontal Card) */}
      <div className="mt-4 rounded-2xl p-4 bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/70 shadow-2xs">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center divide-y md:divide-y-0 md:divide-x divide-slate-200/70 dark:divide-slate-700/60">
          
          {/* LEFT SECTION: Current Environmental Condition (col-span-5) */}
          <div className="md:col-span-5 md:pr-4 flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-3.5 h-3.5" />
              </span>
              <span className="text-xs font-bold text-slate-800 dark:text-white">
                Current Environmental Condition
              </span>
            </div>

            <div className="flex items-baseline gap-2.5 my-1">
              <span className="text-2xl font-bold font-heading text-emerald-700 dark:text-emerald-400">
                STABLE
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                All monitored parameters are currently within their prototype normal ranges.
              </span>
            </div>

            {/* Small Horizontal Indicators */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-1.5 text-[11px] text-slate-600 dark:text-slate-300 font-medium">
              <span className="inline-flex items-center gap-1">
                Soil <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Normal
              </span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="inline-flex items-center gap-1">
                Rain <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Normal
              </span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="inline-flex items-center gap-1">
                Tilt <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Stable
              </span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="inline-flex items-center gap-1">
                Vibration <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Normal
              </span>
            </div>
          </div>

          {/* CENTER SECTION: Overall Risk Score (col-span-4) */}
          <div className="md:col-span-4 pt-3 md:pt-0 md:px-4 flex items-center justify-start gap-3.5">
            {/* Circular Ring */}
            <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
                <circle
                  cx="40"
                  cy="40"
                  r={radius}
                  className="stroke-slate-200 dark:stroke-slate-700"
                  strokeWidth="7"
                  fill="transparent"
                />
                <circle
                  cx="40"
                  cy="40"
                  r={radius}
                  stroke={gaugeColor}
                  strokeWidth="7"
                  strokeDasharray={`${filledLength} ${circumference}`}
                  strokeDashoffset={0}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-700 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-base font-bold font-mono text-slate-900 dark:text-white leading-none">
                  {riskScore}
                </span>
                <span className="text-[9px] text-slate-400 dark:text-slate-500 mt-0.5">
                  / 100
                </span>
              </div>
            </div>

            <div>
              <div className="text-xs font-bold text-slate-800 dark:text-white">
                Overall Risk Score
              </div>
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-400 mt-0.5 uppercase tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                SAFE
              </div>
              <div className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">
                Scale: 0–25 Safe • 26–50 Warning
              </div>
            </div>
          </div>

          {/* RIGHT SECTION: Last Updated & Data Information (col-span-3) */}
          <div className="md:col-span-3 pt-3 md:pt-0 md:pl-4 space-y-1.5 text-xs">
            <div className="flex items-center justify-between gap-2">
              <span className="text-slate-400 dark:text-slate-500 text-[11px]">Last Updated:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200 text-[11px]">Just now</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-slate-400 dark:text-slate-500 text-[11px]">Update Frequency:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200 text-[11px]">3 seconds</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-slate-400 dark:text-slate-500 text-[11px]">Data Source:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200 text-[11px]">IoT Sensors (LoRa)</span>
            </div>
          </div>

        </div>
      </div>

      {/* 5. Bottom Prototype Disclaimer & Landslide Guard Branding Strip */}
      <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs text-slate-500 dark:text-slate-400 bg-sky-50/50 dark:bg-sky-950/20 border border-sky-100/60 dark:border-sky-900/30 rounded-xl px-4 py-2.5">
        <div className="flex items-center gap-2 text-center sm:text-left">
          <Info className="w-4 h-4 text-sky-500 shrink-0" />
          <span className="text-[11px] leading-tight">
            Live sensor readings are prototype telemetry data. Continuous monitoring helps in early detection of potential landslide activity.
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0 font-medium text-[11px] text-slate-600 dark:text-slate-300">
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-md bg-forest-50 dark:bg-forest-950/60 text-forest-600 dark:text-nature-400 border border-forest-200/60 dark:border-forest-800/40">
            <Mountain className="w-3.5 h-3.5" />
          </span>
          <span>Landslide Guard</span>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <span className="text-slate-400 dark:text-slate-500">Safer Mountains, Stronger Communities</span>
        </div>
      </div>

    </div>
  );
};

export default LiveSensorReadings;
