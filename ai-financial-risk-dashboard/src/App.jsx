import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider, ToastProvider } from '@poluru-labs/enterprise-design-system-react';
import { AppShell } from './components/layout/AppShell.jsx';
import OverviewPage from './pages/OverviewPage.jsx';
import FraudPage from './pages/FraudPage.jsx';
import CreditPage from './pages/CreditPage.jsx';
import PortfolioPage from './pages/PortfolioPage.jsx';
import ExplainPage from './pages/ExplainPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';

export default function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/risk/overview" replace />} />
            <Route path="/risk" element={<AppShell />}>
              <Route index element={<Navigate to="overview" replace />} />
              <Route path="overview" element={<OverviewPage />} />
              <Route path="fraud" element={<FraudPage />} />
              <Route path="credit" element={<CreditPage />} />
              <Route path="portfolio" element={<PortfolioPage />} />
              <Route path="explain" element={<ExplainPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/risk/overview" replace />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  );
}
