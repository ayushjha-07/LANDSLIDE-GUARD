import React from 'react';

export const MiniSparkline = ({ 
  data = [10, 12, 11, 14, 13, 16, 15], 
  color = "#2d6a4f", 
  height = 28, 
  width = 72,
  className = "" 
}) => {
  if (!data || data.length === 0) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max === min ? 1 : max - min;
  const padding = 2;
  const usableHeight = height - padding * 2;
  const step = (width - padding * 2) / (data.length - 1);

  const points = data.map((val, i) => {
    const x = padding + i * step;
    const y = height - padding - ((val - min) / range) * usableHeight;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");

  return (
    <svg 
      width={width} 
      height={height} 
      viewBox={`0 0 ${width} ${height}`} 
      className={`overflow-visible ${className}`}
    >
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
      {/* Current point highlight */}
      {data.length > 0 && (
        <circle 
          cx={width - padding} 
          cy={height - padding - ((data[data.length - 1] - min) / range) * usableHeight} 
          r="2.5" 
          fill={color} 
        />
      )}
    </svg>
  );
};

export default MiniSparkline;
