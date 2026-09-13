/**
 * Landslide Guard - Map Filtering Utilities
 * Centralized filter logic applying combined node, risk, and status filters.
 *
 * Rules:
 * - Safe: 0 <= score <= 25
 * - Warning: >25–50 (25 < score <= 50)
 * - High Risk: >50–75 (50 < score <= 75)
 * - Critical: >75–100 (75 < score <= 100)
 * - Unknown: score === null or offline
 */

import { getRiskLevel } from './riskCalculator';

export const filterMapNodes = (
  nodes = [],
  {
    nodeFilter = 'all',
    riskFilter = 'all',
    statusFilter = 'all'
  } = {}
) => {
  if (!Array.isArray(nodes)) return [];

  return nodes.filter(node => {
    // 1. Node ID Filter
    if (nodeFilter && nodeFilter !== 'all') {
      if (node.id !== nodeFilter) {
        return false;
      }
    }

    // 2. Device Status Filter ('all', 'online', 'offline')
    if (statusFilter && statusFilter !== 'all') {
      const isOffline = node.status?.toLowerCase() === 'offline';
      if (statusFilter.toLowerCase() === 'online' && isOffline) return false;
      if (statusFilter.toLowerCase() === 'offline' && !isOffline) return false;
    }

    // 3. Geotechnical Risk Level Filter ('all', 'safe', 'warning', 'high-risk', 'critical', 'unknown')
    if (riskFilter && riskFilter !== 'all') {
      const isOffline = node.status?.toLowerCase() === 'offline';
      let nodeRiskLevel;

      if (isOffline) {
        nodeRiskLevel = 'unknown';
      } else {
        const score = node.risk?.score ?? node.riskScore ?? null;
        if (score === null || score === undefined) {
          nodeRiskLevel = 'unknown';
        } else {
          nodeRiskLevel = getRiskLevel(score);
        }
      }

      const normalizedFilter = riskFilter.toLowerCase().replace(/[\s_]+/g, '-');
      const normalizedLevel = String(nodeRiskLevel).toLowerCase().replace(/[\s_]+/g, '-');

      if (normalizedFilter !== normalizedLevel) {
        return false;
      }
    }

    return true;
  });
};
