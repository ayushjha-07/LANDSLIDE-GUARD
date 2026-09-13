import React from 'react';

export const RiskGauge = ({ 
  score = 18, 
  level = "LOW", 
  className = "" 
}) => {
  // Semi-circle radial arc geometry (radius 78, center at 100, 100)
  const radius = 78;
  const strokeWidth = 14;
  const circumference = Math.PI * radius; // Half-circle perimeter
  
  // Clamped percentage: 0 to 100
  const normalizedScore = Math.min(Math.max(score, 0), 100);
  const strokeDashoffset = circumference - (normalizedScore / 100) * circumference;

  // Color mapping based on score
  let activeColor = "#22c55e"; // Safe / Low
  if (normalizedScore > 75) {
    activeColor = "#ef4444"; // Critical
  } else if (normalizedScore > 50) {
    activeColor = "#f97316"; // High Risk
  } else if (normalizedScore > 25) {
    activeColor = "#eab308"; // Warning
  }

  return (
    <div className={`flex flex-col items-center justify-center relative ${className}`}>
      <div className="relative w-48 h-28 sm:w-56 sm:h-32 flex items-center justify-center overflow-hidden">
        <svg 
          viewBox="0 0 200 115" 
          className="w-full h-full transform transition-all duration-700"
        >
          {/* Segmented Background Arcs */}
          {/* Segment 1: Safe 0 - 25% */}
          <path
            d="M 22 100 A 78 78 0 0 1 54 45"
            fill="none"
            stroke="#22c55e"
            strokeWidth={strokeWidth}
            strokeOpacity="0.2"
            strokeLinecap="round"
          />
          {/* Segment 2: Warning 26 - 50% */}
          <path
            d="M 58 41 A 78 78 0 0 1 100 22"
            fill="none"
            stroke="#eab308"
            strokeWidth={strokeWidth}
            strokeOpacity="0.2"
          />
          {/* Segment 3: High Risk 51 - 75% */}
          <path
            d="M 100 22 A 78 78 0 0 1 142 41"
            fill="none"
            stroke="#f97316"
            strokeWidth={strokeWidth}
            strokeOpacity="0.2"
          />
          {/* Segment 4: Critical 76 - 100% */}
          <path
            d="M 146 45 A 78 78 0 0 1 178 100"
            fill="none"
            stroke="#ef4444"
            strokeWidth={strokeWidth}
            strokeOpacity="0.2"
            strokeLinecap="round"
          />

          {/* Active Progress Sweep Arc */}
          <path
            d="M 22 100 A 78 78 0 0 1 178 100"
            fill="none"
            stroke={activeColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-700 ease-out"
          />
        </svg>

        {/* Center Numerical Readout */}
        <div className="absolute bottom-1 flex flex-col items-center text-center">
          <span 
            className="text-2xl sm:text-3xl font-extrabold font-heading tracking-tight"
            style={{ color: activeColor }}
          >
            {level}
          </span>
          <span className="text-xs sm:text-sm font-bold font-mono text-stone-700 dark:text-stone-200 mt-0.5">
            {score} <span className="text-stone-400 font-normal text-[11px]">/ 100</span>
          </span>
        </div>
      </div>

      {/* Range Scale Legend Underneath */}
      <div className="flex items-center justify-between w-full max-w-[220px] text-[10px] text-stone-400 dark:text-stone-500 font-medium px-2 mt-1">
        <span className="text-nature-500 font-semibold">0 Safe</span>
        <span className="text-amber-500 font-semibold">25</span>
        <span className="text-orange-500 font-semibold">50</span>
        <span className="text-red-500 font-semibold">75 Crit</span>
      </div>
    </div>
  );
};

export default RiskGauge;
