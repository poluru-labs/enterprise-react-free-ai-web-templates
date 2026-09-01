import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider, ToastProvider } from '@poluru-labs/enterprise-design-system-react';
import { DashboardLayout } from './components/layout/DashboardLayout.jsx';
import OverviewPage from './pages/OverviewPage.jsx';
import LeaderboardPage from './pages/LeaderboardPage.jsx';
import SuitesPage from './pages/SuitesPage.jsx';
import SuiteDetailPage from './pages/SuiteDetailPage.jsx';
import RunsPage from './pages/RunsPage.jsx';
import RunDetailPage from './pages/RunDetailPage.jsx';
import ComparePage from './pages/ComparePage.jsx';
import ReviewPage from './pages/ReviewPage.jsx';
import DatasetsPage from './pages/DatasetsPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';

export default function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/model-eval/overview" replace />} />
            <Route path="/model-eval" element={<DashboardLayout />}>
              <Route index element={<Navigate to="overview" replace />} />
              <Route path="overview" element={<OverviewPage />} />
              <Route path="leaderboard" element={<LeaderboardPage />} />
              <Route path="suites" element={<SuitesPage />} />
              <Route path="suites/:id" element={<SuiteDetailPage />} />
              <Route path="runs" element={<RunsPage />} />
              <Route path="runs/:id" element={<RunDetailPage />} />
              <Route path="compare" element={<ComparePage />} />
              <Route path="review" element={<ReviewPage />} />
              <Route path="datasets" element={<DatasetsPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/model-eval/overview" replace />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  );
}
