import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider, ToastProvider } from '@poluru-labs/enterprise-design-system-react';
import { DashboardLayout } from './components/layout/DashboardLayout.jsx';
import OverviewPage from './pages/OverviewPage.jsx';
import LibraryPage from './pages/LibraryPage.jsx';
import PromptDetailPage from './pages/PromptDetailPage.jsx';
import VersionsPage from './pages/VersionsPage.jsx';
import PlaygroundPage from './pages/PlaygroundPage.jsx';
import ReleasesPage from './pages/ReleasesPage.jsx';
import EvaluationsPage from './pages/EvaluationsPage.jsx';
import ExperimentsPage from './pages/ExperimentsPage.jsx';
import SearchPage from './pages/SearchPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import { BASE_PATH } from './constants/navigation.js';

export default function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to={`${BASE_PATH}/overview`} replace />} />
            <Route path={BASE_PATH} element={<DashboardLayout />}>
              <Route index element={<Navigate to="overview" replace />} />
              <Route path="overview" element={<OverviewPage />} />
              <Route path="library" element={<LibraryPage />} />
              <Route path="library/:id" element={<PromptDetailPage />} />
              <Route path="versions" element={<VersionsPage />} />
              <Route path="playground" element={<PlaygroundPage />} />
              <Route path="releases" element={<ReleasesPage />} />
              <Route path="evaluations" element={<EvaluationsPage />} />
              <Route path="experiments" element={<ExperimentsPage />} />
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
