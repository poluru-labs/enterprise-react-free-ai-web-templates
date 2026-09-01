import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider, ToastProvider } from '@poluru-labs/enterprise-design-system-react';
import { DashboardLayout } from './components/layout/DashboardLayout.jsx';
import OverviewPage from './pages/OverviewPage.jsx';
import RunsPage from './pages/RunsPage.jsx';
import RunDetailPage from './pages/RunDetailPage.jsx';
import ExperimentsPage from './pages/ExperimentsPage.jsx';
import DatasetsPage from './pages/DatasetsPage.jsx';
import ModelsPage from './pages/ModelsPage.jsx';
import ClustersPage from './pages/ClustersPage.jsx';
import CheckpointsPage from './pages/CheckpointsPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';

export default function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/ml-training/overview" replace />} />
            <Route path="/ml-training" element={<DashboardLayout />}>
              <Route index element={<Navigate to="overview" replace />} />
              <Route path="overview" element={<OverviewPage />} />
              <Route path="runs" element={<RunsPage />} />
              <Route path="runs/:id" element={<RunDetailPage />} />
              <Route path="experiments" element={<ExperimentsPage />} />
              <Route path="datasets" element={<DatasetsPage />} />
              <Route path="models" element={<ModelsPage />} />
              <Route path="clusters" element={<ClustersPage />} />
              <Route path="checkpoints" element={<CheckpointsPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/ml-training/overview" replace />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  );
}
