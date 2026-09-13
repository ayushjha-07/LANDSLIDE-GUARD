import React from 'react';
import { Link } from 'react-router-dom';

/**
 * BrandIcon: The official Landslide Guard Emblem.
 * Intelligently combines:
 * 1. Modern Engineered Protective Shield Silhouette
 * 2. Majestic Himalayan Mountain Summit with snow cap & ridge spine
 * 3. Landslide / Unstable Slope geological strata & fracture planes (Earth Brown #A85F20)
 * 4. Dynamic Valley Contours & Early Warning Trajectory (Safety Green #39B86A)
 * 5. IoT Environmental Monitoring Station (mast, solar panel, sensor enclosure)
 * 6. Telemetry wireless transmission waves ((( • )))
 * 7. AI Predictive Data Network (3-node connected telemetry vertices)
 * 8. Geotechnical Retaining / Gabion Mesh foundation
 */
export const BrandIcon = ({ 
  mode = "auto", // "auto" | "dark" | "light"
  className = "w-8 h-8",
  ariaLabel = "Landslide Guard Emblem"
}) => {
  const idPrefix = `lg_brand_${mode}_`;

  return (
    <svg 
      viewBox="0 0 200 230" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} flex-shrink-0 select-none`}
      aria-label={ariaLabel}
    >
      <defs>
        {/* Shield Interior Gradients */}
        <linearGradient id={`${idPrefix}shieldGrad`} x1="100" y1="10" x2="100" y2="225" gradientUnits="userSpaceOnUse">
          {mode === 'dark' ? (
            <>
              <stop offset="0%" stopColor="#0c2219" />
              <stop offset="100%" stopColor="#05110c" />
            </>
          ) : mode === 'light' ? (
            <>
              <stop offset="0%" stopColor="#f6faf8" />
              <stop offset="100%" stopColor="#e5eee9" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#0c2219" className="dark:stop-[#0c2219]" />
              <stop offset="100%" stopColor="#05110c" className="dark:stop-[#05110c]" />
            </>
          )}
        </linearGradient>

        {/* Safety Green Flow Sweep */}
        <linearGradient id={`${idPrefix}greenFlow`} x1="70" y1="90" x2="170" y2="140" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#39B86A" />
          <stop offset="100%" stopColor="#1B633A" />
        </linearGradient>

        {/* Earth Brown Slope Flow Sweep */}
        <linearGradient id={`${idPrefix}earthFlow`} x1="50" y1="50" x2="160" y2="110" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#CB7E3A" />
          <stop offset="100%" stopColor="#A85F20" />
        </linearGradient>

        {/* Clip path matching shield geometry */}
        <clipPath id={`${idPrefix}shieldClip`}>
          <path d="M 68 28 L 118 8 L 168 38 C 178 90 166 162 100 222 C 34 162 22 90 32 38 Z" />
        </clipPath>
      </defs>

      {/* 1. Outer Heavy-Duty Engineered Shield Frame */}
      <path 
        d="M 68 24 L 118 4 L 170 35 C 180 88 168 165 100 226 C 32 165 20 88 30 35 Z" 
        fill="#26343A" 
        stroke={mode === 'light' ? '#0B2F24' : '#39B86A'} 
        strokeWidth="3.5" 
        strokeLinejoin="round"
      />

      {/* Inner Shield Face with gradient */}
      <path 
        d="M 68 28 L 118 8 L 168 38 C 178 90 166 162 100 222 C 34 162 22 90 32 38 Z" 
        fill={mode === 'light' ? '#FFFFFF' : `url(#${idPrefix}shieldGrad)`} 
      />

      {/* Technical Inset Precision Border */}
      <path 
        d="M 70 34 L 118 14 L 162 43 C 171 90 160 155 100 214 C 40 155 29 90 38 43 Z" 
        stroke={mode === 'light' ? '#2F7D4A' : '#39B86A'} 
        strokeWidth="1.5" 
        strokeDasharray="5 2.5" 
        fill="none" 
        opacity="0.85"
      />

      {/* Internal Clipped Graphic Elements */}
      <g clipPath={`url(#${idPrefix}shieldClip)`}>

        {/* 2. Himalayan Mountain Peaks */}
        <polygon points="128,34 154,18 180,58 116,58" fill={mode === 'light' ? '#3d4d54' : '#141d22'} />
        <polygon points="154,18 144,30 154,28 164,34 168,26" fill="#F5F7F4" opacity="0.85" />

        {/* Primary Himalayan Pyramid Summit */}
        <polygon points="118,8 162,72 118,76" fill="#26343A" />
        <polygon points="118,8 118,76 76,70" fill="#0B2F24" />

        {/* Snow Cap of Main Peak */}
        <path 
          d="M 118 8 
             L 100 36 L 109 32 L 118 42 L 126 34 L 138 42 L 146 33 L 152 48 
             L 118 8 Z" 
          fill="#F5F7F4" 
          stroke={mode === 'light' ? '#FFFFFF' : '#081510'} 
          strokeWidth="1.2"
        />
        {/* Central Ridge Spine */}
        <line x1="118" y1="8" x2="118" y2="76" stroke={mode === 'light' ? '#FFFFFF' : '#26343A'} strokeWidth="2.5" />

        {/* 3. Landslide / Unstable Slope (Left Flank) */}
        <path 
          d="M 28 42 
             L 68 38 
             L 58 64 
             L 74 72 
             L 60 98 
             L 78 110 
             L 54 146 
             L 28 112 
             Z" 
          fill={`url(#${idPrefix}earthFlow)`} 
          stroke={mode === 'light' ? '#FFFFFF' : '#081510'} 
          strokeWidth="2.5" 
          strokeLinejoin="round"
        />

        {/* Geological fracture lines / fault slip planes */}
        <path d="M 36 52 L 60 50 L 52 66" stroke={mode === 'light' ? '#FFFFFF' : '#160d06'} strokeWidth="2" strokeLinecap="round" />
        <path d="M 44 76 L 70 74 L 58 92" stroke={mode === 'light' ? '#FFFFFF' : '#160d06'} strokeWidth="2" strokeLinecap="round" />
        <path d="M 38 104 L 72 104 L 60 126" stroke={mode === 'light' ? '#FFFFFF' : '#160d06'} strokeWidth="2" strokeLinecap="round" />

        {/* Displaced Rock Debris Fragments */}
        <polygon points="64,118 73,122 69,130 61,126" fill="#CB7E3A" stroke={mode === 'light' ? '#FFFFFF' : '#081510'} strokeWidth="1.2" />
        <polygon points="46,134 54,132 51,142 42,139" fill="#A85F20" stroke={mode === 'light' ? '#FFFFFF' : '#081510'} strokeWidth="1.2" />

        {/* 4. Dynamic Valley Contours & Early Warning Trajectory */}
        <path 
          d="M 72 72 
             C 102 66, 134 78, 176 98 
             L 178 114 
             C 128 90, 94 84, 62 90 
             Z" 
          fill="#A85F20" 
          stroke={mode === 'light' ? '#FFFFFF' : '#081510'} 
          strokeWidth="2"
        />

        <path 
          d="M 60 98 
             C 96 90, 126 104, 176 130 
             L 172 148 
             C 120 118, 88 110, 50 118 
             Z" 
          fill={`url(#${idPrefix}greenFlow)`} 
          stroke={mode === 'light' ? '#FFFFFF' : '#081510'} 
          strokeWidth="2"
        />

        {/* 5. IoT Telemetry Environmental Station */}
        <line x1="152" y1="46" x2="152" y2="104" stroke={mode === 'light' ? '#26343A' : '#FFFFFF'} strokeWidth="3.5" strokeLinecap="round" />
        <polygon points="142,46 162,40 159,51 140,56" fill="#39B86A" stroke={mode === 'light' ? '#FFFFFF' : '#081510'} strokeWidth="1.5" />
        <rect x="144" y="68" width="16" height="18" rx="3.5" fill="#182226" stroke={mode === 'light' ? '#FFFFFF' : '#39B86A'} strokeWidth="2" />
        <circle cx="152" cy="77" r="3" fill="#39B86A" />

        {/* Wireless Transmission Waves ((( • ))) */}
        <path d="M 162 62 C 168 66, 168 78, 162 82" stroke="#39B86A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M 167 56 C 176 64, 176 84, 167 92" stroke="#39B86A" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="2.5 2.5" fill="none" />

        {/* 6. AI Predictive Data Network */}
        <line x1="104" y1="102" x2="120" y2="88" stroke={mode === 'light' ? '#2F7D4A' : '#7ee787'} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="120" y1="88" x2="136" y2="94" stroke={mode === 'light' ? '#2F7D4A' : '#7ee787'} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="136" y1="94" x2="144" y2="77" stroke={mode === 'light' ? '#2F7D4A' : '#7ee787'} strokeWidth="2.5" strokeDasharray="2 2" strokeLinecap="round" />

        <circle cx="104" cy="102" r="4" fill="#39B86A" stroke={mode === 'light' ? '#FFFFFF' : '#081510'} strokeWidth="2" />
        <circle cx="120" cy="88" r="4.5" fill="#FFFFFF" stroke="#39B86A" strokeWidth="2" />
        <circle cx="136" cy="94" r="4" fill="#39B86A" stroke={mode === 'light' ? '#FFFFFF' : '#081510'} strokeWidth="2" />

        {/* 7. Geotechnical Retaining Foundation / Gabion Mesh */}
        <g transform="translate(68, 140)">
          <polygon points="32,0 62,15 32,28 2,13" fill={mode === 'light' ? '#B8D5C7' : '#1C4032'} stroke={mode === 'light' ? '#FFFFFF' : '#081510'} strokeWidth="1.5" />
          <polygon points="2,13 32,28 32,60 2,45" fill={mode === 'light' ? '#8CAE9E' : '#112920'} stroke={mode === 'light' ? '#FFFFFF' : '#081510'} strokeWidth="1.5" />
          <polygon points="32,28 62,15 62,47 32,60" fill={mode === 'light' ? '#6A8E7E' : '#0B1C15'} stroke={mode === 'light' ? '#FFFFFF' : '#081510'} strokeWidth="1.5" />
          
          <line x1="17" y1="6.5" x2="47" y2="21.5" stroke={mode === 'light' ? '#2F7D4A' : '#39B86A'} strokeWidth="1.2" opacity="0.9" />
          <line x1="17" y1="19.5" x2="47" y2="8.5" stroke={mode === 'light' ? '#2F7D4A' : '#39B86A'} strokeWidth="1.2" opacity="0.9" />
          
          <line x1="17" y1="20.5" x2="17" y2="52.5" stroke={mode === 'light' ? '#2F7D4A' : '#39B86A'} strokeWidth="1.2" opacity="0.9" />
          <line x1="2" y1="29" x2="32" y2="44" stroke={mode === 'light' ? '#2F7D4A' : '#39B86A'} strokeWidth="1.2" opacity="0.9" />

          <line x1="47" y1="21.5" x2="47" y2="53.5" stroke={mode === 'light' ? '#2F7D4A' : '#39B86A'} strokeWidth="1.2" opacity="0.9" />
          <line x1="32" y1="44" x2="62" y2="31" stroke={mode === 'light' ? '#2F7D4A' : '#39B86A'} strokeWidth="1.2" opacity="0.9" />
        </g>

      </g>

      {/* Apex Telemetry Beacon Jewel */}
      <circle cx="118" cy="8" r="3.5" fill="#39B86A" stroke={mode === 'light' ? '#0B2F24' : '#FFFFFF'} strokeWidth="1.5" />
    </svg>
  );
};

/**
 * Custom Mountain Peak Chevron Letter 'A'
 */
export const MountainA = ({ fill = "currentColor", stroke = "#39B86A", className = "inline-block align-baseline" }) => (
  <span className={`inline-block relative ${className}`} style={{ width: '0.62em', height: '0.78em', margin: '0 0.01em' }}>
    <svg 
      viewBox="0 0 24 30" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <path d="M12 2L2 28H7L12 14L17 28H22L12 2Z" fill={fill} />
      <polygon points="12,12 8,22 16,22" fill="none" />
      <polyline points="8,22 12,17 16,22" stroke={stroke} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </span>
);

/**
 * BrandLogo: Primary Wordmark + Emblem System.
 * Supports:
 * - variant: 'horizontal' | 'stacked' | 'icon-only'
 * - theme: 'auto' | 'dark' | 'light'
 * - size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
 * - showTagline: boolean (default true)
 */
export const BrandLogo = ({ 
  variant = "horizontal",
  theme = "auto",
  size = "md", 
  showTagline = true, 
  customTagline = "SAFER MOUNTAINS, STRONGER COMMUNITIES",
  className = "",
  to = null
}) => {
  const iconSizeClasses = {
    xs: "w-6 h-7",
    sm: "w-8 h-9",
    md: "w-10 h-11",
    lg: "w-12 h-14",
    xl: "w-16 h-18"
  };

  const titleClasses = {
    xs: "text-xs tracking-wider",
    sm: "text-sm tracking-wider",
    md: "text-base tracking-wider",
    lg: "text-xl tracking-wider",
    xl: "text-2xl sm:text-3xl tracking-wide"
  };

  const taglineClasses = {
    xs: "text-[8px] tracking-widest",
    sm: "text-[9px] tracking-widest",
    md: "text-[10px] tracking-widest",
    lg: "text-xs tracking-widest",
    xl: "text-xs sm:text-sm tracking-widest"
  };

  const isDark = theme === "dark";
  const isLight = theme === "light";

  const landslideColor = isDark 
    ? "text-white" 
    : isLight 
    ? "text-[#26343A]" 
    : "text-[#26343A] dark:text-white";

  const guardColor = "text-[#39B86A]";

  const taglineColor = isDark 
    ? "text-stone-300" 
    : isLight 
    ? "text-[#0B2F24]" 
    : "text-[#0B2F24] dark:text-stone-300";

  // Icon only rendering
  if (variant === "icon-only") {
    const iconOnlyElem = (
      <div className={`inline-flex items-center justify-center ${className}`} title="Landslide Guard">
        <BrandIcon mode={theme} className={iconSizeClasses[size] || iconSizeClasses.md} />
      </div>
    );
    return to ? <Link to={to}>{iconOnlyElem}</Link> : iconOnlyElem;
  }

  // Stacked Logo rendering
  if (variant === "stacked") {
    const stackedContent = (
      <div className={`flex flex-col items-center text-center ${className}`}>
        <BrandIcon 
          mode={theme} 
          className={size === 'xl' ? 'w-20 h-24 mb-3' : size === 'lg' ? 'w-16 h-20 mb-2.5' : 'w-12 h-14 mb-2'} 
        />
        <div className="flex flex-col items-center">
          <div className={`font-heading font-black ${titleClasses[size] || titleClasses.md} select-none leading-none`}>
            <span className={landslideColor}>LANDSLIDE</span>{' '}
            <span className={guardColor}>GUARD</span>
          </div>
          {showTagline && (
            <div className={`font-sans font-bold uppercase mt-1.5 opacity-90 ${taglineClasses[size] || taglineClasses.md} ${taglineColor} select-none`}>
              {customTagline}
            </div>
          )}
        </div>
      </div>
    );
    return to ? <Link to={to} className="inline-block">{stackedContent}</Link> : stackedContent;
  }

  // Primary Horizontal Logo rendering (default)
  const horizontalContent = (
    <div className={`flex items-center gap-2.5 sm:gap-3 min-w-0 ${className}`}>
      <BrandIcon 
        mode={theme} 
        className={iconSizeClasses[size] || iconSizeClasses.md} 
      />
      <div className="flex flex-col min-w-0 justify-center">
        <div className={`font-heading font-black tracking-wider ${titleClasses[size] || titleClasses.md} select-none leading-none flex items-center`}>
          <span className={landslideColor}>LANDSLIDE</span>
          <span className="mx-1 text-transparent">&nbsp;</span>
          <span className={guardColor}>GUARD</span>
        </div>
        {showTagline && (
          <div className={`font-sans font-bold uppercase tracking-wider mt-0.5 opacity-90 leading-tight text-[8px] sm:text-[8.5px] ${taglineColor} select-none`}>
            <span>SAFER MOUNTAINS, STRONGER</span>
            <br />
            <span>COMMUNITIES</span>
          </div>
        )}
      </div>
    </div>
  );

  return to ? <Link to={to} className="inline-block min-w-0">{horizontalContent}</Link> : horizontalContent;
};

export default BrandLogo;
