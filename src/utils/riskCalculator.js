/**
 * Landslide Guard - Canonical Risk Calculation & Classification Utilities
 * Multi-sensor geotechnical telemetry hazard index (0 - 100).
 * Conforms to the mandatory 3-boundary configuration specification.
 *
 * Boundaries:
 * - Safe: 0 <= score <= safeMax (default 25)
 * - Warning: safeMax < score <= warningMax (default 50)
 * - High Risk: warningMax < score <= highRiskMax (default 75)
 * - Critical: highRiskMax < score <= 100 (default >75–100)
 * - Unknown: score === null
 */

import { 
  RISK_LEVELS, 
  RISK_LEVEL_CONFIG, 
  DEFAULT_RISK_CONFIG, 
  getActiveRiskConfig 
} from '../data/riskConfig.js';

/**
 * 1. getRiskLevel(score, riskConfig)
 * Evaluates score against the 3 configurable upper boundaries.
 * No gaps, no overlaps.
 */
export const getRiskLevel = (score, riskConfig = null) => {
  if (score === null || score === undefined) {
    return RISK_LEVELS.UNKNOWN;
  }

  const numScore = typeof score === 'number' ? score : parseFloat(score);
  if (isNaN(numScore) || numScore < 0 || numScore > 100) {
    return "invalid";
  }

  const config = riskConfig || getActiveRiskConfig();
  const thresholds = config.thresholds || config;

  // Extract boundaries, supporting both { safeMax, warningMax, highRiskMax } and legacy { safe: { max } }
  const safeMax = typeof thresholds.safeMax === 'number' 
    ? thresholds.safeMax 
    : (typeof thresholds.safe?.max === 'number' ? thresholds.safe.max : 25);

  const warningMax = typeof thresholds.warningMax === 'number' 
    ? thresholds.warningMax 
    : (typeof thresholds.warning?.max === 'number' ? thresholds.warning.max : 50);

  const highRiskMax = typeof thresholds.highRiskMax === 'number' 
    ? thresholds.highRiskMax 
    : (typeof thresholds.highRisk?.max === 'number' ? thresholds.highRisk.max : 75);

  if (numScore <= safeMax) {
    return RISK_LEVELS.SAFE;
  }
  if (numScore <= warningMax) {
    return RISK_LEVELS.WARNING;
  }
  if (numScore <= highRiskMax) {
    return RISK_LEVELS.HIGH_RISK;
  }
  return RISK_LEVELS.CRITICAL;
};

/**
 * Returns human-readable label: 'Safe' | 'Warning' | 'High Risk' | 'Critical' | 'Unknown'
 */
export const getRiskLevelLabel = (score, riskConfig = null) => {
  const level = getRiskLevel(score, riskConfig);
  if (level === 'invalid') return 'Invalid';
  if (level === RISK_LEVELS.UNKNOWN) return 'Unknown';
  return RISK_LEVEL_CONFIG[level]?.label || 'Unknown';
};

/**
 * 2. getRiskRange(level, riskConfig)
 * Formats unambiguous range string, e.g. "0–25", ">25–50", ">50–75", ">75–100"
 */
export const getRiskRange = (level, riskConfig = null) => {
  const config = riskConfig || getActiveRiskConfig();
  const thresholds = config.thresholds || config;

  const safeMax = typeof thresholds.safeMax === 'number' 
    ? thresholds.safeMax 
    : (typeof thresholds.safe?.max === 'number' ? thresholds.safe.max : 25);

  const warningMax = typeof thresholds.warningMax === 'number' 
    ? thresholds.warningMax 
    : (typeof thresholds.warning?.max === 'number' ? thresholds.warning.max : 50);

  const highRiskMax = typeof thresholds.highRiskMax === 'number' 
    ? thresholds.highRiskMax 
    : (typeof thresholds.highRisk?.max === 'number' ? thresholds.highRisk.max : 75);

  switch (String(level).toLowerCase()) {
    case 'safe':
      return `0–${safeMax}`;
    case 'warning':
      return `>${safeMax}–${warningMax}`;
    case 'high-risk':
    case 'high risk':
    case 'highrisk':
      return `>${warningMax}–${highRiskMax}`;
    case 'critical':
      return `>${highRiskMax}–100`;
    case 'unknown':
      return 'No score';
    default:
      return '—';
  }
};

/**
 * 3. validateRiskConfig(riskConfig)
 * Rule: 0 <= safeMax < warningMax < highRiskMax <= 100
 */
export const validateRiskConfig = (riskConfig) => {
  const result = (isValid, error = null) => ({ isValid, valid: isValid, error });

  if (!riskConfig) {
    return result(false, 'Configuration is missing.');
  }

  const thresholds = riskConfig.thresholds || riskConfig;
  const { safeMax, warningMax, highRiskMax } = thresholds;

  if (safeMax === undefined || safeMax === null || safeMax === '' || isNaN(Number(safeMax))) {
    return result(false, 'Safe maximum must be a valid number.');
  }
  if (warningMax === undefined || warningMax === null || warningMax === '' || isNaN(Number(warningMax))) {
    return result(false, 'Warning maximum must be a valid number.');
  }
  if (highRiskMax === undefined || highRiskMax === null || highRiskMax === '' || isNaN(Number(highRiskMax))) {
    return result(false, 'High Risk maximum must be a valid number.');
  }

  const s = Number(safeMax);
  const w = Number(warningMax);
  const h = Number(highRiskMax);

  if (s < 0) {
    return result(false, `Safe maximum (${s}) cannot be less than 0 (minimum is 0).`);
  }
  if (s > 100) {
    return result(false, `Safe maximum (${s}) cannot exceed 100.`);
  }
  if (w < 0 || w > 100) {
    return result(false, `Warning maximum (${w}) must be between 0 and 100.`);
  }
  if (h < 0 || h > 100) {
    return result(false, `High Risk maximum (${h}) must be between 0 and 100.`);
  }

  if (s >= w) {
    if (s === w) {
      return result(false, `Overlapping boundary: Safe maximum (${s}) cannot equal Warning maximum (${w}). Boundaries must satisfy safeMax < warningMax.`);
    }
    return result(false, `Reversed order: Safe maximum (${s}) cannot be greater than Warning maximum (${w}). Boundaries must satisfy safeMax < warningMax.`);
  }

  if (w >= h) {
    if (w === h) {
      return result(false, `Overlapping boundary: Warning maximum (${w}) cannot equal High Risk maximum (${h}). Boundaries must satisfy warningMax < highRiskMax.`);
    }
    return result(false, `Reversed order: Warning maximum (${w}) cannot be greater than High Risk maximum (${h}). Boundaries must satisfy warningMax < highRiskMax.`);
  }

  return result(true, null);
};

/**
 * 4. calculateLandslideRisk
 * Multi-sensor geotechnical telemetry hazard index (0 - 100).
 */
export const calculateLandslideRisk = ({
  soilMoisture,
  moisture = 42.0,      // %
  rainfall = 12.0,      // mm/24h
  tilt = 1.8,           // degrees
  vibration = 0.03      // g
}, customConfig = null) => {
  const currentMoisture = typeof soilMoisture === 'number' ? soilMoisture : moisture;

  // 1. Normalized sub-indices (0 to 1) calibrated for Himalayan slope terrain
  const moistureScore = Math.min(Math.max((currentMoisture - 25) / (85 - 25), 0), 1);
  const rainfallScore = Math.min(Math.max(rainfall / 45.8, 0), 1); // 45.8mm/24h high-hazard mountain deluge scale
  const tiltScore = Math.min(Math.max((tilt - 1.0) / (7.0 - 1.0), 0), 1);
  const vibrationScore = Math.min(Math.max(vibration / 0.25, 0), 1);

  // 2. Weighted risk formula
  // Soil moisture (35%) + Rainfall (30%) + Ground Tilt (20%) + Ground Vibration (15%)
  const rawWeightedScore = (
    moistureScore * 35 +
    rainfallScore * 30 +
    tiltScore * 20 +
    vibrationScore * 15
  );

  const score = Math.round(Math.min(Math.max(rawWeightedScore, 4), 98));

  // 3. Classification via centralized getRiskLevel
  const level = getRiskLevel(score, customConfig);
  const conf = RISK_LEVEL_CONFIG[level] || RISK_LEVEL_CONFIG.safe;

  const factorOfSafety = Number((1.8 - (score / 100) * 0.95).toFixed(2));
  const trend = score > 35 ? "increasing" : "stable";
  const predictionWindow = "6h";

  return {
    score,
    level,
    trend,
    predictionWindow,

    // Presentation helpers
    riskScore: score,
    riskLevel: conf.label.toUpperCase(),
    color: conf.color,
    bgBadge: conf.bgBadge,
    alertSeverity: level === 'critical' ? 'critical' : level === 'high-risk' ? 'high' : level === 'warning' ? 'advisory' : 'normal',
    factorOfSafety,
    isPrototype: true,
    timestamp: new Date().toISOString()
  };
};

/**
 * 5. getAlertThresholds(riskConfig)
 * Returns dynamic array of threshold definitions for UI reference tables
 */
export const getAlertThresholds = (riskConfig = null) => {
  const config = riskConfig || getActiveRiskConfig();
  const t = config.thresholds || config;

  const sMax = typeof t.safeMax === 'number' ? t.safeMax : (t.safe?.max ?? 25);
  const wMax = typeof t.warningMax === 'number' ? t.warningMax : (t.warning?.max ?? 50);
  const hMax = typeof t.highRiskMax === 'number' ? t.highRiskMax : (t.highRisk?.max ?? 75);

  return [
    {
      level: "Safe",
      key: "safe",
      score: `0–${sMax}`,
      rule: `0 <= score <= ${sMax}`,
      meaning: RISK_LEVEL_CONFIG.safe.meaning,
      color: RISK_LEVEL_CONFIG.safe.color,
      badge: RISK_LEVEL_CONFIG.safe.bgBadge
    },
    {
      level: "Warning",
      key: "warning",
      score: `>${sMax}–${wMax}`,
      rule: `${sMax} < score <= ${wMax}`,
      meaning: RISK_LEVEL_CONFIG.warning.meaning,
      color: RISK_LEVEL_CONFIG.warning.color,
      badge: RISK_LEVEL_CONFIG.warning.bgBadge
    },
    {
      level: "High Risk",
      key: "high-risk",
      score: `>${wMax}–${hMax}`,
      rule: `${wMax} < score <= ${hMax}`,
      meaning: RISK_LEVEL_CONFIG['high-risk'].meaning,
      color: RISK_LEVEL_CONFIG['high-risk'].color,
      badge: RISK_LEVEL_CONFIG['high-risk'].bgBadge
    },
    {
      level: "Critical",
      key: "critical",
      score: `>${hMax}–100`,
      rule: `${hMax} < score <= 100`,
      meaning: RISK_LEVEL_CONFIG.critical.meaning,
      color: RISK_LEVEL_CONFIG.critical.color,
      badge: RISK_LEVEL_CONFIG.critical.bgBadge
    }
  ];
};

export const ALERT_THRESHOLDS = getAlertThresholds();

export default calculateLandslideRisk;
