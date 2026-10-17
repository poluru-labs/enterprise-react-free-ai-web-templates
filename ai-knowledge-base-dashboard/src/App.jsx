import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider, ToastProvider } from '@poluru-labs/enterprise-design-system-react';
import { AppShell } from './components/layout/AppShell.jsx';
import OverviewPage from './pages/OverviewPage.jsx';
import ArticlesPage from './pages/ArticlesPage.jsx';
import SourcesPage from './pages/SourcesPage.jsx';
import CitationsPage from './pages/CitationsPage.jsx';
import FreshnessPage from './pages/FreshnessPage.jsx';
import GapsPage from './pages/GapsPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';

export default function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/kb/overview" replace />} />
            <Route path="/kb" element={<AppShell />}>
              <Route index element={<Navigate to="overview" replace />} />
              <Route path="overview" element={<OverviewPage />} />
              <Route path="articles" element={<ArticlesPage />} />
              <Route path="sources" element={<SourcesPage />} />
              <Route path="citations" element={<CitationsPage />} />
              <Route path="freshness" element={<FreshnessPage />} />
              <Route path="gaps" element={<GapsPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/kb/overview" replace />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  );
}
