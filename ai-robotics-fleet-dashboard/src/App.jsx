import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider, ToastProvider } from '@poluru-labs/enterprise-design-system-react';
import { AppShell } from './components/layout/AppShell.jsx';
import { BASE_PATH } from './constants/navigation.js';
import OverviewPage from './pages/OverviewPage.jsx';
import RobotsPage from './pages/RobotsPage.jsx';
import MissionsPage from './pages/MissionsPage.jsx';
import BatteryPage from './pages/BatteryPage.jsx';
import TelemetryPage from './pages/TelemetryPage.jsx';
import MaintenancePage from './pages/MaintenancePage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';

export default function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to={`${BASE_PATH}/overview`} replace />} />
            <Route path={BASE_PATH} element={<AppShell />}>
              <Route index element={<Navigate to="overview" replace />} />
              <Route path="overview" element={<OverviewPage />} />
              <Route path="robots" element={<RobotsPage />} />
              <Route path="missions" element={<MissionsPage />} />
              <Route path="battery" element={<BatteryPage />} />
              <Route path="telemetry" element={<TelemetryPage />} />
              <Route path="maintenance" element={<MaintenancePage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
            <Route path="*" element={<Navigate to={`${BASE_PATH}/overview`} replace />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  );
}
