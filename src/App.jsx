import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import Dashboard from './pages/Dashboard';
import Sensors from './pages/Sensors';
import RiskAnalysis from './pages/RiskAnalysis';
import MonitoringMap from './pages/MonitoringMap';
import Alerts from './pages/Alerts';
import Reports from './pages/Reports';
import Devices from './pages/Devices';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Landing from './pages/Landing';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { SettingsProvider } from './context/SettingsContext';
import { SensorProvider } from './context/SensorContext';
import { ToastProvider } from './context/ToastContext';
import { AlertProvider } from './context/AlertContext';

export const App = () => {
  return (
    <AuthProvider>
      <SettingsProvider>
        <SensorProvider>
          <ToastProvider>
            <AlertProvider>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />

                {/* Protected Prototype Application Routes */}
                <Route element={<ProtectedRoute />}>
                  <Route element={<AppLayout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/sensors" element={<Sensors />} />
                    <Route path="/risk-analysis" element={<RiskAnalysis />} />
                    <Route path="/map" element={<MonitoringMap />} />
                    <Route path="/alerts" element={<Alerts />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/devices" element={<Devices />} />
                    <Route path="/settings" element={<Settings />} />
                  </Route>
                </Route>

                {/* Catch-all 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AlertProvider>
          </ToastProvider>
        </SensorProvider>
      </SettingsProvider>
    </AuthProvider>
  );
};

export default App;
