import React from 'react';
import { getSeverityColor } from '../../utils/formatters';
import { formatRiskLevel } from '../../utils/dataSelectors';

export const StatusBadge = ({ status = "normal", label, className = "", pulse = false }) => {
  const statusString = typeof status === 'object' && status !== null 
    ? (status.level || 'normal') 
    : (status || 'normal');

  const colors = getSeverityColor(statusString);
  const displayLabel = label || (typeof status === 'object' && status !== null ? formatRiskLevel(status.level) : statusString);

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${colors.bg} ${colors.text} ${colors.border} ${className}`}>
      <span className="relative flex h-2 w-2">
        {pulse && (
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${colors.dot} opacity-75`} />
        )}
        <span className={`relative inline-flex rounded-full h-2 w-2 ${colors.dot}`} />
      </span>
      <span className="capitalize">{typeof displayLabel === 'string' ? displayLabel : String(displayLabel)}</span>
    </span>
  );
};

export default StatusBadge;

