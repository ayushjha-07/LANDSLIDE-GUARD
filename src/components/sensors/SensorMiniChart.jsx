import React, { useMemo } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

/**
 * Deterministically generates a 24-hour historical telemetry series
 * based on node ID and canonical geotechnical status.
 */
function generateDeterministicSeries(node) {
  const isOffline = node?.status?.toLowerCase() === 'offline';
  const riskLevel = node?.riskLevel?.toLowerCase() || (node?.risk?.level) || 'safe';
  
  // Hash node id for deterministic pseudo-seed
  let seed = 1;
  const idStr = String(node?.id || 'NODE-01');
  for (let i = 0; i < idStr.length; i++) {
    seed = (seed * 31 + idStr.charCodeAt(i)) % 1000;
  }

  const points = [];
  const hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];

  hours.forEach(h => {
    const timeLabel = h === 24 ? 'Now' : String(h).padStart(2, '0');
    let val;

    if (isOffline) {
      // Flat / diminished trace for offline station
      val = 14 + Math.sin(h * 0.4 + seed) * 1.5;
    } else if (riskLevel === 'critical' || riskLevel === 'high-risk' || riskLevel === 'high risk' || idStr === 'NODE-05') {
      // Elevated amplitude with sharp fluctuations climbing toward 68-72
      const baseline = 42 + (h / 24) * 24;
      const oscillation = Math.sin(h * 1.05 + seed) * 7.5 + Math.cos(h * 2.1 + seed * 0.5) * 4.2;
      val = Math.max(25, Math.min(88, baseline + oscillation));
    } else if (riskLevel === 'warning' || idStr === 'NODE-03') {
      // Moderate variation climbing toward 46-52
      const baseline = 32 + (h / 24) * 14;
      const oscillation = Math.sin(h * 0.85 + seed) * 5.2 + Math.cos(h * 1.7) * 2.8;
      val = Math.max(20, Math.min(65, baseline + oscillation));
    } else {
      // Safe stable telemetry between 15 and 24
      const baseline = 17 + (seed % 5);
      const oscillation = Math.sin(h * 0.65 + seed) * 3.2 + Math.cos(h * 1.3) * 1.8;
      val = Math.max(10, Math.min(32, baseline + oscillation));
    }

    // Ensure the terminal point lines up with active sensor readings if available
    if (h === 24 && !isOffline) {
      if (idStr === 'NODE-05') val = 68;
      else if (idStr === 'NODE-03') val = 46;
      else if (node?.riskScore) val = node.riskScore;
    }

    points.push({
      time: timeLabel,
      value: Number(val.toFixed(1))
    });
  });

  return points;
}

export const SensorMiniChart = ({ node }) => {
  const isOffline = node?.status?.toLowerCase() === 'offline';
  const riskLevel = node?.riskLevel?.toLowerCase() || (node?.risk?.level) || 'safe';
  const idStr = String(node?.id || 'NODE-01');

  // Determine color scheme based on master reference
  const theme = useMemo(() => {
    if (isOffline) {
      return {
        stroke: '#64748b',
        gradId: `grad-offline-${idStr}`,
        stopColor: '#64748b',
        opacity: 0.15,
        strokeDash: '3 3'
      };
    }
    if (riskLevel === 'critical' || riskLevel === 'high-risk' || riskLevel === 'high risk' || idStr === 'NODE-05') {
      return {
        stroke: '#ef4444',
        gradId: `grad-risk-${idStr}`,
        stopColor: '#ef4444',
        opacity: 0.35,
        strokeDash: undefined
      };
    }
    if (riskLevel === 'warning' || idStr === 'NODE-03') {
      return {
        stroke: '#f59e0b',
        gradId: `grad-warn-${idStr}`,
        stopColor: '#f59e0b',
        opacity: 0.30,
        strokeDash: undefined
      };
    }
    return {
      stroke: '#10b981',
      gradId: `grad-safe-${idStr}`,
      stopColor: '#10b981',
      opacity: 0.30,
      strokeDash: undefined
    };
  }, [isOffline, riskLevel, idStr]);

  const data = useMemo(() => generateDeterministicSeries(node), [node]);

  return (
    <div className="w-full h-[62px] sm:h-[66px] flex flex-col justify-end pt-1 select-none">
      <div className="w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart 
            data={data} 
            margin={{ top: 4, right: 4, left: 4, bottom: 0 }}
          >
            <defs>
              <linearGradient id={theme.gradId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={theme.stopColor} stopOpacity={theme.opacity} />
                <stop offset="100%" stopColor={theme.stopColor} stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <XAxis 
              dataKey="time" 
              axisLine={false} 
              tickLine={false} 
              ticks={['00', '04', '08', '12', '16', '20', 'Now']}
              interval="preserveStartEnd"
              tick={{ fill: '#64748b', fontSize: 8.5, fontFamily: 'monospace', fontWeight: 600 }}
              dy={3}
            />

            <YAxis hide domain={['auto', 'auto']} />

            <Tooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="px-2 py-1 rounded bg-slate-900/90 border border-slate-700 text-[10px] text-white font-mono shadow-md">
                      <span className="text-slate-400">{payload[0].payload.time}: </span>
                      <strong style={{ color: theme.stroke }}>{payload[0].value}</strong>
                    </div>
                  );
                }
                return null;
              }}
            />

            <Area 
              type="monotone" 
              dataKey="value" 
              stroke={theme.stroke} 
              strokeWidth={1.8} 
              strokeDasharray={theme.strokeDash}
              fill={`url(#${theme.gradId})`}
              isAnimationActive={false}
              dot={(props) => {
                // Highlight only the final active telemetry reading point
                if (props.index === data.length - 1 && !isOffline) {
                  return (
                    <circle 
                      key="active-terminal-dot"
                      cx={props.cx} 
                      cy={props.cy} 
                      r={3} 
                      fill={theme.stroke} 
                      stroke="#ffffff" 
                      strokeWidth={1.5}
                      className="drop-shadow-sm"
                    />
                  );
                }
                return <React.Fragment key={props.index} />;
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SensorMiniChart;
