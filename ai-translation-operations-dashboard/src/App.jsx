import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider, ToastProvider } from '@poluru-labs/enterprise-design-system-react';
import { AppShell } from './components/layout/AppShell.jsx';
import { BASE_PATH } from './constants/navigation.js';
import OverviewPage from './pages/OverviewPage.jsx';
import TranslationsPage from './pages/TranslationsPage.jsx';
import CoveragePage from './pages/CoveragePage.jsx';
import TerminologyPage from './pages/TerminologyPage.jsx';
import ReviewsPage from './pages/ReviewsPage.jsx';
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
              <Route path="translations" element={<TranslationsPage />} />
              <Route path="coverage" element={<CoveragePage />} />
              <Route path="terminology" element={<TerminologyPage />} />
              <Route path="reviews" element={<ReviewsPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
            <Route path="*" element={<Navigate to={`${BASE_PATH}/overview`} replace />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  );
}
