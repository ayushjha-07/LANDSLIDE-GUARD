import React from 'react';

export const BrandIcon = ({ className = "w-8 h-8" }) => (
  <svg 
    className={className} 
    viewBox="0 0 48 48" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Landslide Guard Icon"
  >
    {/* Shield contour */}
    <path 
      d="M24 4L7 11V22C7 32.5 14.2 41.5 24 44C33.8 41.5 41 32.5 41 22V11L24 4Z" 
      className="fill-forest-900/60 dark:fill-forest-950/80 stroke-forest-500 dark:stroke-nature-400" 
      strokeWidth="2" 
      strokeLinejoin="round"
    />
    
    {/* Mountain terrain ridges */}
    <path 
      d="M12 33L21 21L27 28L34 18L37 33H12Z" 
      className="fill-forest-600 dark:fill-forest-800 stroke-nature-500 dark:stroke-nature-400" 
      strokeWidth="1.5" 
      strokeLinejoin="round"
    />
    <path 
      d="M21 21L12 33H26L21 21Z" 
      className="fill-forest-700/80 dark:fill-forest-900/80" 
    />
    <path 
      d="M27 28L34 18L37 33H27V28Z" 
      className="fill-forest-500/80 dark:fill-forest-700/80" 
    />

    {/* LoRa / Sensor Radar broadcast waves */}
    <path 
      d="M19 14C22.3 12.8 25.7 12.8 29 14" 
      className="stroke-nature-400 dark:stroke-nature-300" 
      strokeWidth="1.75" 
      strokeLinecap="round"
    />
    <path 
      d="M16 11C21 9 27 9 32 11" 
      className="stroke-forest-400 dark:stroke-nature-400" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeDasharray="1.5 3"
    />

    {/* Warning signal radar dot */}
    <circle cx="24" cy="18" r="2.5" className="fill-hazard-amber" />
    <circle cx="24" cy="18" r="4.5" className="stroke-hazard-amber opacity-60" strokeWidth="1" />
  </svg>
);

export const BrandLogo = ({ 
  size = "md", 
  showTagline = true, 
  showSecondary = false,
  className = "" 
}) => {
  const iconSizes = {
    sm: "w-7 h-7",
    md: "w-9 h-9",
    lg: "w-11 h-11",
    xl: "w-14 h-14"
  };

  const titleSizes = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-xl",
    xl: "text-2xl"
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative flex-shrink-0 flex items-center justify-center p-1 rounded-xl bg-forest-50 dark:bg-forest-950/60 border border-forest-200/80 dark:border-forest-800/80 shadow-sm">
        <BrandIcon className={iconSizes[size] || iconSizes.md} />
      </div>
      <div className="flex flex-col min-w-0">
        <div className="flex items-center gap-2">
          <span className={`font-heading font-bold tracking-tight text-[#1A202C] dark:text-white ${titleSizes[size] || titleSizes.md}`}>
            Landslide <span className="text-forest-600 dark:text-nature-400">Guard</span>
          </span>
        </div>
        {showTagline && (
          <span className="text-[11px] font-medium tracking-wide text-forest-700 dark:text-slate-300 whitespace-nowrap">
            Monitor <span className="text-forest-400 dark:text-forest-500">•</span> Predict <span className="text-forest-400 dark:text-forest-500">•</span> Prevent
          </span>
        )}
        {showSecondary && (
          <span className="text-[10px] text-[#718096] dark:text-slate-400 mt-0.5">
            AI-Powered Landslide Early Warning System
          </span>
        )}
      </div>
    </div>
  );
};

export default BrandLogo;
