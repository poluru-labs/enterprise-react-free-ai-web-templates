import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider, ToastProvider } from '@poluru-labs/enterprise-design-system-react';
import { AppShell } from './components/layout/AppShell.jsx';
import OverviewPage from './pages/OverviewPage.jsx';
import VariantsPage from './pages/VariantsPage.jsx';
import ExperimentsPage from './pages/ExperimentsPage.jsx';
import MetricsPage from './pages/MetricsPage.jsx';
import RolloutsPage from './pages/RolloutsPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';

export default function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/lab/overview" replace />} />
            <Route path="/lab" element={<AppShell />}>
              <Route index element={<Navigate to="overview" replace />} />
              <Route path="overview" element={<OverviewPage />} />
              <Route path="variants" element={<VariantsPage />} />
              <Route path="experiments" element={<ExperimentsPage />} />
              <Route path="metrics" element={<MetricsPage />} />
              <Route path="rollouts" element={<RolloutsPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/lab/overview" replace />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  );
}
