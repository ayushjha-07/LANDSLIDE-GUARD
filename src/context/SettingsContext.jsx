import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  RISK_THRESHOLDS, 
  STORAGE_KEY_RISK_CONFIG, 
  saveActiveRiskConfig,
  resetActiveRiskConfig,
  saveActiveRiskThresholds, 
  resetActiveRiskThresholds 
} from '../data/riskConfig';

export const STORAGE_KEY_SETTINGS = 'landslideGuard.settings';
export const STORAGE_KEY_SIMULATION = 'landslideGuard.simulation';

export const DEFAULT_SETTINGS = {
  general: {
    systemName: "Landslide Guard",
    tagline: "Monitor • Predict • Prevent",
    systemDescription: "AI-Powered Landslide Early Warning System",
    monitoringArea: "Mountain Slope Monitoring Zone",
    version: "v1.0 Prototype",
    timeFormat: "24 Hour", // "12 Hour" | "24 Hour"
    dateFormat: "DD/MM/YYYY" // "DD/MM/YYYY" | "MM/DD/YYYY" | "YYYY-MM-DD"
  },
  monitoring: {
    liveUpdates: true,
    updateInterval: 3000, // 1000, 3000, 5000, 10000, 30000 ms
    historicalWindow: "24 hours", // "6 hours", "12 hours", "24 hours", "7 days"
    autoRefresh: true,
    showPrototypeLabels: true
  },
  risk: {
    minScore: 0,
    maxScore: 100,
    thresholds: {
      safeMax: 25,
      warningMax: 50,
      highRiskMax: 75
    }
  },
  sensorThresholds: {
    moisture: { normalMax: 60, elevatedMax: 75, unit: "%" },
    rainfall: { normalMax: 20, elevatedMax: 40, unit: "mm" },
    tilt: { normalMax: 2.0, elevatedMax: 4.0, unit: "°" },
    vibration: { normalMax: 0.05, elevatedMax: 0.10, unit: "g" },
    temperature: { normalMin: 15, normalMax: 30, unit: "°C" },
    humidity: { normalMin: 40, normalMax: 85, unit: "%" }
  },
  alerts: {
    automaticGeneration: true,
    deduplication: true,
    cooldownMinutes: 5, // 1, 5, 10, 30
    autoResolve: true,
    requireAcknowledgement: true
  },
  notifications: {
    channels: {
      dashboard: true,
      visual: true,
      email: false,
      sms: false,
      buzzer: false
    },
    preferences: {
      warning: true,
      highRisk: true,
      critical: true,
      deviceOffline: true,
      weakSignal: true
    }
  },
  devices: {
    defaultDeviceType: "ESP32 + LoRa",
    communication: "LoRa",
    gateway: "EDGE-GW-01",
    gatewayStatus: "Online",
    expectedNodes: 8,
    minBatteryWarning: 30,
    weakSignalThreshold: -85,
    monitoringOptions: {
      monitorBattery: true,
      monitorSignal: true,
      monitorPacketLoss: true,
      monitorOfflineNodes: true,
      showDeviceAlerts: true
    }
  },
  simulation: {
    enabled: true,
    updateInterval: 3000,
    scenario: "normal" // "normal" | "increased_rainfall" | "high_soil_moisture" | "rising_ground_movement" | "high_risk" | "critical" | "network_degradation"
  },
  account: {
    name: "Ayush Jha",
    role: "Project Administrator",
    accountType: "Prototype",
    initials: "AJ"
  }
};

const SettingsContext = createContext(null);

export const SettingsProvider = ({ children }) => {
  // Load initial settings from localStorage or fallback to defaults
  const [settings, setSettings] = useState(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const stored = localStorage.getItem(STORAGE_KEY_SETTINGS);
        if (stored) {
          const parsed = JSON.parse(stored);
          const t = parsed.risk?.thresholds;
          const safeMax = typeof t?.safeMax === 'number' ? t.safeMax : (t?.safe?.max ?? 25);
          const warningMax = typeof t?.warningMax === 'number' ? t.warningMax : (t?.warning?.max ?? 50);
          const highRiskMax = typeof t?.highRiskMax === 'number' ? t.highRiskMax : (t?.highRisk?.max ?? 75);

          return {
            ...DEFAULT_SETTINGS,
            ...parsed,
            general: { ...DEFAULT_SETTINGS.general, ...parsed.general },
            monitoring: { ...DEFAULT_SETTINGS.monitoring, ...parsed.monitoring },
            risk: {
              minScore: 0,
              maxScore: 100,
              thresholds: { safeMax, warningMax, highRiskMax }
            },
            sensorThresholds: { ...DEFAULT_SETTINGS.sensorThresholds, ...parsed.sensorThresholds },
            alerts: { ...DEFAULT_SETTINGS.alerts, ...parsed.alerts },
            notifications: {
              ...DEFAULT_SETTINGS.notifications,
              channels: { ...DEFAULT_SETTINGS.notifications.channels, ...(parsed.notifications?.channels || {}) },
              preferences: { ...DEFAULT_SETTINGS.notifications.preferences, ...(parsed.notifications?.preferences || {}) }
            },
            devices: {
              ...DEFAULT_SETTINGS.devices,
              monitoringOptions: { ...DEFAULT_SETTINGS.devices.monitoringOptions, ...(parsed.devices?.monitoringOptions || {}) }
            },
            simulation: { ...DEFAULT_SETTINGS.simulation, ...parsed.simulation },
            account: { ...DEFAULT_SETTINGS.account, ...parsed.account }
          };
        }
      }
    } catch (e) {
      console.warn('Failed to load stored settings, using default:', e);
    }
    return DEFAULT_SETTINGS;
  });

  const [saveStatus, setSaveStatus] = useState('idle'); // 'idle' | 'saving' | 'saved' | 'error'
  const [validationError, setValidationError] = useState(null);

  // Validation function for 3-boundary configuration
  const validateRiskThresholds = useCallback((thresholds) => {
    const target = thresholds?.thresholds || thresholds;
    const { safeMax, warningMax, highRiskMax } = target || {};

    if (safeMax === undefined || safeMax === null || safeMax === '' || isNaN(Number(safeMax))) {
      return { isValid: false, error: 'Safe maximum must be a valid number.' };
    }
    if (warningMax === undefined || warningMax === null || warningMax === '' || isNaN(Number(warningMax))) {
      return { isValid: false, error: 'Warning maximum must be a valid number.' };
    }
    if (highRiskMax === undefined || highRiskMax === null || highRiskMax === '' || isNaN(Number(highRiskMax))) {
      return { isValid: false, error: 'High Risk maximum must be a valid number.' };
    }

    const s = Number(safeMax);
    const w = Number(warningMax);
    const h = Number(highRiskMax);

    if (s < 0) {
      return { isValid: false, error: `Safe maximum (${s}) cannot be less than 0 (minimum is 0).` };
    }
    if (s > 100) {
      return { isValid: false, error: `Safe maximum (${s}) cannot exceed 100.` };
    }
    if (w < 0 || w > 100) {
      return { isValid: false, error: `Warning maximum (${w}) must be between 0 and 100.` };
    }
    if (h < 0 || h > 100) {
      return { isValid: false, error: `High Risk maximum (${h}) must be between 0 and 100.` };
    }

    if (s >= w) {
      if (s === w) {
        return { 
          isValid: false, 
          error: `Overlapping boundary: Safe maximum (${s}) cannot equal Warning maximum (${w}). Boundaries must satisfy safeMax < warningMax.` 
        };
      }
      return { 
        isValid: false, 
        error: `Reversed order: Safe maximum (${s}) cannot be greater than Warning maximum (${w}). Boundaries must satisfy safeMax < warningMax.` 
      };
    }

    if (w >= h) {
      if (w === h) {
        return { 
          isValid: false, 
          error: `Overlapping boundary: Warning maximum (${w}) cannot equal High Risk maximum (${h}). Boundaries must satisfy warningMax < highRiskMax.` 
        };
      }
      return { 
        isValid: false, 
        error: `Reversed order: Warning maximum (${w}) cannot be greater than High Risk maximum (${h}). Boundaries must satisfy warningMax < highRiskMax.` 
      };
    }

    return { isValid: true, error: null };
  }, []);

  // Persist settings whenever changed
  const saveSettings = useCallback((newSettings) => {
    try {
      setSettings(newSettings);
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(newSettings));
        // Keep riskConfig synced in its separate dedicated key
        if (newSettings.risk?.thresholds) {
          saveActiveRiskConfig(newSettings.risk);
          saveActiveRiskThresholds(newSettings.risk.thresholds);
        }
        if (newSettings.simulation) {
          localStorage.setItem(STORAGE_KEY_SIMULATION, JSON.stringify(newSettings.simulation));
        }
      }
      return true;
    } catch (e) {
      console.error('Failed to save settings to localStorage:', e);
      return false;
    }
  }, []);

  // Update a single nested setting
  const updateSetting = useCallback((section, key, value) => {
    setSettings(prev => {
      const updated = {
        ...prev,
        [section]: {
          ...prev[section],
          [key]: value
        }
      };
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(updated));
      }
      return updated;
    });
  }, []);

  // Update an entire section
  const updateSection = useCallback((section, newValues) => {
    setSettings(prev => {
      const updated = {
        ...prev,
        [section]: {
          ...prev[section],
          ...newValues
        }
      };
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(updated));
        if (section === 'risk') {
          saveActiveRiskConfig(updated.risk);
          saveActiveRiskThresholds(newValues.thresholds || updated.risk.thresholds);
        }
      }
      return updated;
    });
  }, []);

  // Reset settings to default
  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(DEFAULT_SETTINGS));
      resetActiveRiskConfig();
      resetActiveRiskThresholds();
    }
  }, []);

  const value = {
    settings,
    updateSetting,
    updateSection,
    saveSettings,
    resetSettings,
    validateRiskThresholds
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

export default SettingsContext;
