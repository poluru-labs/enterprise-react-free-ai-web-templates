import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider, ToastProvider } from '@poluru-labs/enterprise-design-system-react';
import { AppShell } from './components/layout/AppShell.jsx';
import OverviewPage from './pages/OverviewPage.jsx';
import UsagePage from './pages/UsagePage.jsx';
import CoolingPage from './pages/CoolingPage.jsx';
import CarbonPage from './pages/CarbonPage.jsx';
import SavingsPage from './pages/SavingsPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';

export default function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/energy/overview" replace />} />
            <Route path="/energy" element={<AppShell />}>
              <Route index element={<Navigate to="overview" replace />} />
              <Route path="overview" element={<OverviewPage />} />
              <Route path="usage" element={<UsagePage />} />
              <Route path="cooling" element={<CoolingPage />} />
              <Route path="carbon" element={<CarbonPage />} />
              <Route path="savings" element={<SavingsPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/energy/overview" replace />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  );
}
