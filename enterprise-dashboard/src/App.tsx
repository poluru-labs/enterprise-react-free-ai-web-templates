import { Navigate, Route, Routes } from 'react-router-dom';
import { DashboardLayout } from './layouts/DashboardLayout';
import { OverviewPage } from './pages/OverviewPage';
import { FacilitiesPage } from './pages/FacilitiesPage';
import { InfrastructurePage } from './pages/InfrastructurePage';
import { PowerPage } from './pages/PowerPage';
import { CapacityPage } from './pages/CapacityPage';
import { MaintenancePage } from './pages/MaintenancePage';
import { AlertsPage } from './pages/AlertsPage';
import { TicketsPage } from './pages/TicketsPage';
import { SettingsPage } from './pages/SettingsPage';

export default function App() {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<OverviewPage />} />
        <Route path="/facilities" element={<FacilitiesPage />} />
        <Route path="/infrastructure" element={<InfrastructurePage />} />
        <Route path="/power" element={<PowerPage />} />
        <Route path="/capacity" element={<CapacityPage />} />
        <Route path="/maintenance" element={<MaintenancePage />} />
        <Route path="/alerts" element={<AlertsPage />} />
        <Route path="/tickets" element={<TicketsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </DashboardLayout>
  );
}
