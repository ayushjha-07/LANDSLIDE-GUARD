import React, { useState } from 'react';
import { useSettings } from '../context/SettingsContext';
import { useSensorContext } from '../context/SensorContext';
import { useAlertContext } from '../context/AlertContext';
import SettingsHeader from '../components/settings/SettingsHeader';
import SettingsNav from '../components/settings/SettingsNav';
import ResetConfirmModal from '../components/settings/ResetConfirmModal';

import GeneralSection from '../components/settings/sections/GeneralSection';
import MonitoringSection from '../components/settings/sections/MonitoringSection';
import RiskThresholdsSection from '../components/settings/sections/RiskThresholdsSection';
import SensorThresholdsSection from '../components/settings/sections/SensorThresholdsSection';
import AlertSettingsSection from '../components/settings/sections/AlertSettingsSection';
import NotificationsSection from '../components/settings/sections/NotificationsSection';
import DeviceSettingsSection from '../components/settings/sections/DeviceSettingsSection';
import SimulationSection from '../components/settings/sections/SimulationSection';
import AccountSection from '../components/settings/sections/AccountSection';

export const Settings = () => {
  const [activeSection, setActiveSection] = useState('general');
  const [modalType, setModalType] = useState(null); // 'reset_settings' | 'reset_simulation' | 'reset_everything' | null

  const { resetSettings } = useSettings();
  const { resetSimulationState } = useSensorContext();
  const { resetAlertsState } = useAlertContext();

  // Reset confirmation executor
  const handleConfirmReset = (type) => {
    if (type === 'reset_settings') {
      resetSettings();
    } else if (type === 'reset_simulation') {
      resetSimulationState();
    } else if (type === 'reset_everything') {
      resetSettings();
      resetSimulationState();
      resetAlertsState();
    }
    setModalType(null);
  };

  return (
    <div className="space-y-6 w-full min-w-0 pb-10">
      {/* 1. Page Header */}
      <SettingsHeader
        onResetClick={(type) => setModalType(type || 'reset_settings')}
      />

      {/* 2. Main Responsive Grid: Nav on left, active section on right */}
      <div className="flex flex-col lg:flex-row gap-6 w-full min-w-0 items-start">
        {/* Navigation Sidebar / Dropdown */}
        <SettingsNav
          activeTab={activeSection}
          onTabChange={setActiveSection}
          activeSection={activeSection}
          onSelectSection={setActiveSection}
        />

        {/* Active Content Section */}
        <div className="flex-1 w-full min-w-0">
          {activeSection === 'general' && <GeneralSection />}
          {activeSection === 'monitoring' && <MonitoringSection />}
          {activeSection === 'risk' && <RiskThresholdsSection />}
          {activeSection === 'sensors' && <SensorThresholdsSection />}
          {activeSection === 'alerts' && <AlertSettingsSection />}
          {activeSection === 'notifications' && <NotificationsSection />}
          {activeSection === 'devices' && <DeviceSettingsSection />}
          {activeSection === 'simulation' && <SimulationSection />}
          {activeSection === 'account' && (
            <AccountSection onRequestResetModal={(type) => setModalType(type)} />
          )}
        </div>
      </div>

      {/* 3. Reset Confirmation Modal */}
      <ResetConfirmModal
        isOpen={Boolean(modalType)}
        type={modalType}
        onClose={() => setModalType(null)}
        onConfirm={handleConfirmReset}
      />
    </div>
  );
};

export default Settings;
