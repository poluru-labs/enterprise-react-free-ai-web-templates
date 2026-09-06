import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { demoBasename } from './demoBasename.js';
import { ThemeProvider, ToastProvider } from '@poluru-labs/enterprise-design-system-react';
import { DashboardLayout } from './components/layout/DashboardLayout.jsx';
import OverviewPage from './pages/OverviewPage.jsx';
import InventoryPage from './pages/InventoryPage.jsx';
import InventoryDetailPage from './pages/InventoryDetailPage.jsx';
import RiskPage from './pages/RiskPage.jsx';
import PoliciesPage from './pages/PoliciesPage.jsx';
import ApprovalsPage from './pages/ApprovalsPage.jsx';
import AuditsPage from './pages/AuditsPage.jsx';
import ExceptionsPage from './pages/ExceptionsPage.jsx';
import ControlsPage from './pages/ControlsPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import { BASE_PATH } from './constants/navigation.js';

export default function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <ToastProvider>
        <BrowserRouter basename={demoBasename()}>
          <Routes>
            <Route path="/" element={<Navigate to={`${BASE_PATH}/overview`} replace />} />
            <Route path={BASE_PATH} element={<DashboardLayout />}>
              <Route index element={<Navigate to="overview" replace />} />
              <Route path="overview" element={<OverviewPage />} />
              <Route path="inventory" element={<InventoryPage />} />
              <Route path="inventory/:id" element={<InventoryDetailPage />} />
              <Route path="risk" element={<RiskPage />} />
              <Route path="policies" element={<PoliciesPage />} />
              <Route path="approvals" element={<ApprovalsPage />} />
              <Route path="audits" element={<AuditsPage />} />
              <Route path="exceptions" element={<ExceptionsPage />} />
              <Route path="controls" element={<ControlsPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
            <Route path="*" element={<Navigate to={`${BASE_PATH}/overview`} replace />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  );
}
