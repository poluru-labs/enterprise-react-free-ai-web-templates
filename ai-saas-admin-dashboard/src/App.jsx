import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { demoBasename } from './demoBasename.js';
import { ThemeProvider, ToastProvider } from '@poluru-labs/enterprise-design-system-react';
import { DashboardLayout } from './components/layout/DashboardLayout.jsx';
import OverviewPage from './pages/OverviewPage.jsx';
import TenantsPage from './pages/TenantsPage.jsx';
import TenantDetailPage from './pages/TenantDetailPage.jsx';
import UsersPage from './pages/UsersPage.jsx';
import PlansPage from './pages/PlansPage.jsx';
import UsagePage from './pages/UsagePage.jsx';
import BillingPage from './pages/BillingPage.jsx';
import FlagsPage from './pages/FlagsPage.jsx';
import AuditPage from './pages/AuditPage.jsx';
import SearchPage from './pages/SearchPage.jsx';
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
              <Route path="tenants" element={<TenantsPage />} />
              <Route path="tenants/:id" element={<TenantDetailPage />} />
              <Route path="users" element={<UsersPage />} />
              <Route path="plans" element={<PlansPage />} />
              <Route path="usage" element={<UsagePage />} />
              <Route path="billing" element={<BillingPage />} />
              <Route path="flags" element={<FlagsPage />} />
              <Route path="audit" element={<AuditPage />} />
              <Route path="search" element={<SearchPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
            <Route path="*" element={<Navigate to={`${BASE_PATH}/overview`} replace />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  );
}
