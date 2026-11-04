import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider, ToastProvider } from '@poluru-labs/enterprise-design-system-react';
import { AppShell } from './components/layout/AppShell.jsx';
import { BASE_PATH } from './constants/navigation.js';
import OverviewPage from './pages/OverviewPage.jsx';
import SchemasPage from './pages/SchemasPage.jsx';
import AnomaliesPage from './pages/AnomaliesPage.jsx';
import RulesPage from './pages/RulesPage.jsx';
import ReleasesPage from './pages/ReleasesPage.jsx';
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
              <Route path="schemas" element={<SchemasPage />} />
              <Route path="anomalies" element={<AnomaliesPage />} />
              <Route path="rules" element={<RulesPage />} />
              <Route path="releases" element={<ReleasesPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
            <Route path="*" element={<Navigate to={`${BASE_PATH}/overview`} replace />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  );
}
