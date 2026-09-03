import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { demoBasename } from './demoBasename.js';
import { ThemeProvider, ToastProvider } from '@poluru-labs/enterprise-design-system-react';
import { DashboardLayout } from './components/layout/DashboardLayout.jsx';
import OverviewPage from './pages/OverviewPage.jsx';
import QueuePage from './pages/QueuePage.jsx';
import ReviewsPage from './pages/ReviewsPage.jsx';
import PoliciesPage from './pages/PoliciesPage.jsx';
import AppealsPage from './pages/AppealsPage.jsx';
import AutomationPage from './pages/AutomationPage.jsx';
import ReportersPage from './pages/ReportersPage.jsx';
import AnalyticsPage from './pages/AnalyticsPage.jsx';
import SearchPage from './pages/SearchPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';

export default function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <ToastProvider>
        <BrowserRouter basename={demoBasename()}>
          <Routes>
            <Route path="/" element={<Navigate to="/content-moderation/overview" replace />} />
            <Route path="/content-moderation" element={<DashboardLayout />}>
              <Route index element={<Navigate to="overview" replace />} />
              <Route path="overview" element={<OverviewPage />} />
              <Route path="queue" element={<QueuePage />} />
              <Route path="reviews" element={<ReviewsPage />} />
              <Route path="policies" element={<PoliciesPage />} />
              <Route path="appeals" element={<AppealsPage />} />
              <Route path="automation" element={<AutomationPage />} />
              <Route path="reporters" element={<ReportersPage />} />
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="search" element={<SearchPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/content-moderation/overview" replace />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  );
}
