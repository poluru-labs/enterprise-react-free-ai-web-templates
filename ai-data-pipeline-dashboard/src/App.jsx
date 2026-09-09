import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { demoBasename } from './demoBasename.js';
import { ThemeProvider, ToastProvider } from '@poluru-labs/enterprise-design-system-react';
import { DashboardLayout } from './components/layout/DashboardLayout.jsx';
import OverviewPage from './pages/OverviewPage.jsx';
import IngestionPage from './pages/IngestionPage.jsx';
import TransformationsPage from './pages/TransformationsPage.jsx';
import QualityPage from './pages/QualityPage.jsx';
import LineagePage from './pages/LineagePage.jsx';
import PipelinesPage from './pages/PipelinesPage.jsx';
import PipelineDetailPage from './pages/PipelineDetailPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import { BASE_PATH } from './constants/navigation.js';

export default function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <ToastProvider>
        <BrowserRouter basename={demoBasename()}>
          <Routes>
            <Route path="/" element={<Navigate to={`${BASE_PATH}/overview`} replace />} />
            <Route path={BASE_PATH} element={<DashboardLayout />}>
              <Route index element={<Navigate to="overview" replace />} />
              <Route path="overview" element={<OverviewPage />} />
              <Route path="ingestion" element={<IngestionPage />} />
              <Route path="transformations" element={<TransformationsPage />} />
              <Route path="quality" element={<QualityPage />} />
              <Route path="lineage" element={<LineagePage />} />
              <Route path="pipelines" element={<PipelinesPage />} />
              <Route path="pipelines/:id" element={<PipelineDetailPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
            <Route path="*" element={<Navigate to={`${BASE_PATH}/overview`} replace />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  );
}
