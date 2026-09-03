import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { demoBasename } from './demoBasename.js';
import { ThemeProvider, ToastProvider } from '@poluru-labs/enterprise-design-system-react';
import { DashboardLayout } from './components/layout/DashboardLayout.jsx';
import OverviewPage from './pages/OverviewPage.jsx';
import CamerasPage from './pages/CamerasPage.jsx';
import ModelsPage from './pages/ModelsPage.jsx';
import DetectionsPage from './pages/DetectionsPage.jsx';
import DatasetsPage from './pages/DatasetsPage.jsx';
import AnnotationsPage from './pages/AnnotationsPage.jsx';
import IncidentsPage from './pages/IncidentsPage.jsx';
import QualityPage from './pages/QualityPage.jsx';
import SearchPage from './pages/SearchPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';

export default function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <ToastProvider>
        <BrowserRouter basename={demoBasename()}>
          <Routes>
            <Route path="/" element={<Navigate to="/computer-vision/overview" replace />} />
            <Route path="/computer-vision" element={<DashboardLayout />}>
              <Route index element={<Navigate to="overview" replace />} />
              <Route path="overview" element={<OverviewPage />} />
              <Route path="cameras" element={<CamerasPage />} />
              <Route path="models" element={<ModelsPage />} />
              <Route path="detections" element={<DetectionsPage />} />
              <Route path="datasets" element={<DatasetsPage />} />
              <Route path="annotations" element={<AnnotationsPage />} />
              <Route path="incidents" element={<IncidentsPage />} />
              <Route path="quality" element={<QualityPage />} />
              <Route path="search" element={<SearchPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/computer-vision/overview" replace />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  );
}
