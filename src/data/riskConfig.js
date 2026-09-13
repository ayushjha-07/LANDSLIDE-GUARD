/**
 * Landslide Guard - Centralized Risk Configuration & Threshold Rules
 * Single Source of Truth for risk classification boundaries and level tokens.
 *
 * Rules:
 * - Inclusive range 0–100.
 * - Boundaries:
 *   Safe: 0 <= score <= safeMax (default 25) -> "0–25"
 *   Warning: safeMax < score <= warningMax (default 50) -> ">25–50"
 *   High Risk: warningMax < score <= highRiskMax (default 75) -> ">50–75"
 *   Critical: highRiskMax < score <= 100 -> ">75–100"
 *   Unknown: score === null
 */

export const RISK_LEVELS = {
  SAFE: "safe",
  WARNING: "warning",
  HIGH_RISK: "high-risk",
  CRITICAL: "critical",
  UNKNOWN: "unknown"
};

export const DEFAULT_RISK_CONFIG = {
  minScore: 0,
  maxScore: 100,
  thresholds: {
    safeMax: 25,
    warningMax: 50,
    highRiskMax: 75
  }
};

export const RISK_LEVEL_CONFIG = {
  safe: {
    level: "safe",
    label: "Safe",
    meaning: "Normal slope condition — standard baseline telemetry.",
    color: "text-[#38A169] dark:text-[#48BB78]",
    bgBadge: "bg-[#38A169]/10 border-[#38A169]/30 text-[#38A169] dark:text-[#48BB78]",
    bgBar: "bg-emerald-500",
    border: "border-emerald-500"
  },
  warning: {
    level: "warning",
    label: "Warning",
    meaning: "Conditions require closer monitoring and slope inspection.",
    color: "text-[#D97706] dark:text-[#FBBF24]",
    bgBadge: "bg-[#D97706]/10 border-[#D97706]/30 text-[#D97706] dark:text-[#FBBF24]",
    bgBar: "bg-amber-500",
    border: "border-amber-500"
  },
  "high-risk": {
    level: "high-risk",
    label: "High Risk",
    meaning: "Elevated conditions require immediate operator attention.",
    color: "text-[#EA580C] dark:text-[#F97316]",
    bgBadge: "bg-[#EA580C]/10 border-[#EA580C]/30 text-[#EA580C] dark:text-[#F97316]",
    bgBar: "bg-orange-500",
    border: "border-orange-500"
  },
  critical: {
    level: "critical",
    label: "Critical",
    meaning: "Critical warning condition — community siren standby.",
    color: "text-[#DC2626] dark:text-[#F87171]",
    bgBadge: "bg-[#DC2626]/10 border-[#DC2626]/30 text-[#DC2626] dark:text-[#F87171]",
    bgBar: "bg-red-500",
    border: "border-red-500"
  },
  unknown: {
    level: "unknown",
    label: "Unknown",
    meaning: "Sensor offline or telemetry link disconnected.",
    color: "text-stone-500 dark:text-stone-400",
    bgBadge: "bg-stone-500/10 border-stone-500/30 text-stone-600 dark:text-stone-400",
    bgBar: "bg-stone-400",
    border: "border-stone-400"
  }
};

export const STORAGE_KEY_RISK_CONFIG = 'landslideGuard.riskConfig';

/**
 * Returns active 3-boundary risk configuration from localStorage or defaults.
 */
export const getActiveRiskConfig = () => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const stored = localStorage.getItem(STORAGE_KEY_RISK_CONFIG);
      if (stored) {
        const parsed = JSON.parse(stored);
        const t = parsed.thresholds || parsed;
        if (typeof t.safeMax === 'number' && typeof t.warningMax === 'number' && typeof t.highRiskMax === 'number') {
          return {
            minScore: 0,
            maxScore: 100,
            thresholds: {
              safeMax: t.safeMax,
              warningMax: t.warningMax,
              highRiskMax: t.highRiskMax
            }
          };
        }
      }

      // Check landslideGuard.settings
      const settingsStored = localStorage.getItem('landslideGuard.settings');
      if (settingsStored) {
        const settings = JSON.parse(settingsStored);
        const t = settings.risk?.thresholds;
        if (t) {
          const safeMax = typeof t.safeMax === 'number' ? t.safeMax : (typeof t.safe?.max === 'number' ? t.safe.max : 25);
          const warningMax = typeof t.warningMax === 'number' ? t.warningMax : (typeof t.warning?.max === 'number' ? t.warning.max : 50);
          const highRiskMax = typeof t.highRiskMax === 'number' ? t.highRiskMax : (typeof t.highRisk?.max === 'number' ? t.highRisk.max : 75);
          return {
            minScore: 0,
            maxScore: 100,
            thresholds: { safeMax, warningMax, highRiskMax }
          };
        }
      }
    }
  } catch (e) {
    console.warn('Error reading stored risk config, using defaults:', e);
  }
  return DEFAULT_RISK_CONFIG;
};

export const saveActiveRiskConfig = (config) => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const payload = config.thresholds ? config : { minScore: 0, maxScore: 100, thresholds: config };
      localStorage.setItem(STORAGE_KEY_RISK_CONFIG, JSON.stringify(payload));
    }
  } catch (e) {
    console.warn('Error saving risk config:', e);
  }
};

export const resetActiveRiskConfig = () => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(STORAGE_KEY_RISK_CONFIG);
    }
  } catch (e) {
    console.warn('Error resetting risk config:', e);
  }
};

/**
 * Backwards compatibility helper returning threshold objects
 */
export const getActiveRiskThresholds = () => {
  const config = getActiveRiskConfig();
  const { safeMax, warningMax, highRiskMax } = config.thresholds;
  return {
    safeMax,
    warningMax,
    highRiskMax,
    safe: { min: 0, max: safeMax, ...RISK_LEVEL_CONFIG.safe },
    warning: { min: safeMax, max: warningMax, ...RISK_LEVEL_CONFIG.warning },
    highRisk: { min: warningMax, max: highRiskMax, ...RISK_LEVEL_CONFIG['high-risk'] },
    critical: { min: highRiskMax, max: 100, ...RISK_LEVEL_CONFIG.critical }
  };
};

export const saveActiveRiskThresholds = (thresholds) => {
  if (!thresholds) return;
  const safeMax = typeof thresholds.safeMax === 'number' ? thresholds.safeMax : thresholds.safe?.max;
  const warningMax = typeof thresholds.warningMax === 'number' ? thresholds.warningMax : thresholds.warning?.max;
  const highRiskMax = typeof thresholds.highRiskMax === 'number' ? thresholds.highRiskMax : thresholds.highRisk?.max;
  saveActiveRiskConfig({ minScore: 0, maxScore: 100, thresholds: { safeMax, warningMax, highRiskMax } });
};

export const resetActiveRiskThresholds = resetActiveRiskConfig;

export const RISK_THRESHOLDS = getActiveRiskThresholds();

export default DEFAULT_RISK_CONFIG;

