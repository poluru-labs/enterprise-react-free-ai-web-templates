import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider, ToastProvider } from '@poluru-labs/enterprise-design-system-react';
import { AppShell } from './components/layout/AppShell.jsx';
import { BASE_PATH } from './constants/navigation.js';
import OverviewPage from './pages/OverviewPage.jsx';
import MetricsPage from './pages/MetricsPage.jsx';
import ConsentPage from './pages/ConsentPage.jsx';
import AccessPage from './pages/AccessPage.jsx';
import ExportsPage from './pages/ExportsPage.jsx';
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
              <Route path="metrics" element={<MetricsPage />} />
              <Route path="consent" element={<ConsentPage />} />
              <Route path="access" element={<AccessPage />} />
              <Route path="exports" element={<ExportsPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
            <Route path="*" element={<Navigate to={`${BASE_PATH}/overview`} replace />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  );
}
