import React from 'react';
import Card from '../../common/Card';
import { useSettings } from '../../../context/SettingsContext';
import { useSensorContext } from '../../../context/SensorContext';
import { useAlertContext } from '../../../context/AlertContext';
import { useToast } from '../../../context/ToastContext';
import { Sparkles, RotateCcw, AlertTriangle, Play, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const DEMO_SCENARIOS = [
  { id: 'normal', name: 'Normal Conditions', desc: '5 Safe, 1 Warning (Node 03), 1 High Risk (Node 05), 1 Offline (Node 06)' },
  { id: 'increased_rainfall', name: 'Increased Rainfall', desc: 'Rainfall rises to 48mm in Zone C; risk climbs across rain-exposed stations' },
  { id: 'high_soil_moisture', name: 'High Soil Moisture', desc: 'Soil saturation reaches 86% on steep slope; elevates hazard scores' },
  { id: 'rising_ground_movement', name: 'Rising Ground Movement', desc: 'Inclinometer lateral drift to 5.8° and vibration spike to 0.18g' },
  { id: 'high_risk', name: 'High Risk', desc: 'Multiple slope sectors enter High Risk simultaneously' },
  { id: 'critical', name: 'Critical Condition', desc: 'Node 05 crosses 76+ threshold into CRITICAL; triggers immediate emergency alert' },
  { id: 'network_degradation', name: 'Network Degradation', desc: 'Simulated RF interference; packets drop to 81.4% without altering landslide risk' },
];

export const SimulationSection = () => {
  const { settings, updateSection } = useSettings();
  const { activeScenario, applyScenario, resetSimulationState } = useSensorContext();
  const { resetAlertsState } = useAlertContext();
  const { toast } = useToast();

  const sim = settings.simulation;

  const handleToggle = () => {
    const updated = { ...sim, enabled: !sim.enabled };
    updateSection('simulation', updated);
    toast.info(`Simulation mode ${updated.enabled ? 'Enabled' : 'Disabled'}`, 'Simulation Toggle');
  };

  const handleSelectScenario = (scenarioId) => {
    updateSection('simulation', { ...sim, scenario: scenarioId });
    applyScenario(scenarioId);
    toast.success(`Scenario activated: ${DEMO_SCENARIOS.find(s => s.id === scenarioId)?.name}`, 'Scenario Applied');
  };

  const handleResetDemoState = () => {
    resetSimulationState();
    resetAlertsState();
    updateSection('simulation', { ...sim, scenario: 'normal' });
    toast.success('Deterministic initial prototype state restored (5 Safe, 1 Warning, 1 High Risk, 1 Offline, 2 Active Alerts).', 'Demo State Reset');
  };

  return (
    <div className="space-y-4 text-xs">
      <Card 
        title="Simulation &amp; Demo Control Center" 
        subtitle="Controlled environmental scenarios for college presentation &amp; testing"
      >
        <div className="space-y-4">
          {/* Simulation Disclaimer */}
          <div className="p-3.5 rounded-xl bg-forest-500/10 border border-forest-500/20 text-forest-800 dark:text-nature-300 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-forest-600 dark:text-nature-400 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="block text-xs font-bold">Simulation mode is enabled.</strong>
              <p className="text-[11px] mt-0.5">
                Sensor, risk, device, and alert data are generated for demonstration. Real hardware integration will be connected in a later deployment phase.
              </p>
            </div>
          </div>

          {/* Controls: Mode & Interval */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-stone-50 dark:bg-forest-950/50 border border-stone-200/80 dark:border-forest-900/60">
              <div>
                <span className="font-bold text-stone-900 dark:text-white block text-sm">Simulation Mode</span>
                <span className="text-stone-500 text-[11px]">Use simulated IoT telemetry</span>
              </div>
              <button
                type="button"
                onClick={handleToggle}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  sim.enabled ? 'bg-emerald-500' : 'bg-stone-300 dark:bg-stone-700'
                }`}
                role="switch"
                aria-checked={sim.enabled}
                aria-label="Toggle simulation mode"
              >
                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                  sim.enabled ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-stone-50 dark:bg-forest-950/50 border border-stone-200/80 dark:border-forest-900/60">
              <div>
                <span className="font-bold text-stone-900 dark:text-white block text-sm">Update Interval</span>
                <span className="text-stone-500 text-[11px]">Telemetry heartbeat frequency</span>
              </div>
              <span className="font-mono font-bold text-forest-700 dark:text-nature-400 text-sm">
                3 seconds
              </span>
            </div>
          </div>

          {/* Scenario Selection Grid */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="scenario-select" className="font-bold text-stone-800 dark:text-stone-200">
                Active Demo Scenario:
              </label>
              <span className="text-[11px] font-mono text-stone-400">
                Currently: <strong className="text-forest-700 dark:text-nature-400 uppercase">{activeScenario}</strong>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {DEMO_SCENARIOS.map(sc => {
                const isSelected = activeScenario === sc.id;
                return (
                  <div
                    key={sc.id}
                    onClick={() => handleSelectScenario(sc.id)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                      isSelected
                        ? 'bg-forest-50/80 dark:bg-forest-950/80 border-forest-500 ring-1 ring-forest-500/30'
                        : 'bg-stone-50/70 dark:bg-stone-900/40 border-stone-200 dark:border-stone-800 hover:border-forest-300 dark:hover:border-forest-700'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center mt-0.5 flex-shrink-0 ${
                      isSelected ? 'border-forest-600 bg-forest-600 text-white' : 'border-stone-300 dark:border-stone-600'
                    }`}>
                      {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <div className="min-w-0">
                      <strong className={`block font-semibold ${isSelected ? 'text-forest-800 dark:text-nature-300' : 'text-stone-800 dark:text-stone-200'}`}>
                        {sc.name}
                      </strong>
                      <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5 leading-relaxed">
                        {sc.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reset Demo State Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-stone-100 dark:border-forest-900/60">
            <span className="text-[11px] text-stone-500 dark:text-stone-400">
              Restores standard initial distribution: 5 Safe, 1 Warning (Node 03), 1 High Risk (Node 05), 1 Offline (Node 06), 2 Active Alerts.
            </span>
            <button
              type="button"
              onClick={handleResetDemoState}
              className="min-h-[44px] w-full sm:w-auto px-5 py-2 rounded-xl bg-forest-600 hover:bg-forest-500 text-white font-semibold shadow-sm transition-colors flex items-center justify-center gap-1.5 flex-shrink-0"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset Demo State</span>
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SimulationSection;
