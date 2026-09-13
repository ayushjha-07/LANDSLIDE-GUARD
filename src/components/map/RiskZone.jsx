import React from 'react';
import { Circle, Tooltip } from 'react-leaflet';

/**
 * Renders transparent prototype risk influence zones centered on monitored slope sectors.
 * Uses low opacity so the underlying OpenStreetMap roads, rivers, and terrain features remain clearly visible.
 */
export const RiskZone = ({ node }) => {
  if (!node || node.status === 'offline' || !node.latitude || !node.longitude) {
    return null;
  }

  const riskLevel = node.risk?.level?.toLowerCase() || (typeof node.risk === 'string' ? node.risk.toLowerCase() : 'safe');

  let color = '#2d6a4f';
  let fillColor = '#52b788';
  let radius = 600; // meters radius of prototype slope sensor influence
  let fillOpacity = 0.12;

  if (riskLevel === 'critical') {
    color = '#dc2626';
    fillColor = '#ef4444';
    radius = 900;
    fillOpacity = 0.28;
  } else if (riskLevel === 'high-risk' || riskLevel === 'high risk') {
    color = '#ea580c';
    fillColor = '#f97316';
    radius = 800;
    fillOpacity = 0.22;
  } else if (riskLevel === 'warning') {
    color = '#d97706';
    fillColor = '#f59e0b';
    radius = 700;
    fillOpacity = 0.18;
  }

  return (
    <Circle
      center={[node.latitude, node.longitude]}
      radius={radius}
      pathOptions={{
        color,
        fillColor,
        fillOpacity,
        weight: 1.5,
        dashArray: riskLevel === 'safe' ? '4 4' : undefined
      }}
    >
      <Tooltip direction="top" offset={[0, -10]} opacity={0.9}>
        <div className="text-[11px] font-sans">
          <strong className="block text-stone-900 font-semibold">
            {node.id} &bull; Prototype Risk Influence Zone
          </strong>
          <span className="text-stone-600 block text-[10px]">
            Estimated buffer: ~{radius}m around {node.location?.name || 'Station'}
          </span>
          <span className="text-[9px] text-amber-700 italic block mt-0.5">
            Simulated prototype demonstration area &mdash; not an official landslide hazard boundary
          </span>
        </div>
      </Tooltip>
    </Circle>
  );
};

export default RiskZone;
