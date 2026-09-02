import { Navigate, Route, Routes } from 'react-router-dom';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { OverviewPage } from './pages/OverviewPage';
import { FacilitiesPage } from './pages/FacilitiesPage';
import { FacilityDetailPage } from './pages/FacilityDetailPage';
import { InfrastructurePage } from './pages/InfrastructurePage';
import { PowerPage } from './pages/PowerPage';
import { CapacityPage } from './pages/CapacityPage';
import { MaintenancePage } from './pages/MaintenancePage';
import { AlertsPage } from './pages/AlertsPage';
import { TicketsPage } from './pages/TicketsPage';
import { SettingsPage } from './pages/SettingsPage';
import { SearchPage } from './pages/SearchPage';

export default function App() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<OverviewPage />} />
        <Route path="/facilities" element={<FacilitiesPage />} />
        <Route path="/facilities/:id" element={<FacilityDetailPage />} />
        <Route path="/infrastructure" element={<InfrastructurePage />} />
        <Route path="/power" element={<PowerPage />} />
        <Route path="/capacity" element={<CapacityPage />} />
        <Route path="/maintenance" element={<MaintenancePage />} />
        <Route path="/alerts" element={<AlertsPage />} />
        <Route path="/tickets" element={<TicketsPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
