import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { demoBasename } from './demoBasename.js';
import { ThemeProvider, ToastProvider } from '@poluru-labs/enterprise-design-system-react';
import { DashboardLayout } from './components/layout/DashboardLayout.jsx';
import OverviewPage from './pages/OverviewPage.jsx';
import GeneratorStudioPage from './pages/GeneratorStudioPage.jsx';
import DatasetsPage from './pages/DatasetsPage.jsx';
import DatasetDetailPage from './pages/DatasetDetailPage.jsx';
import PrivacyGuardPage from './pages/PrivacyGuardPage.jsx';
import QualityEvalPage from './pages/QualityEvalPage.jsx';
import RulesPage from './pages/RulesPage.jsx';
import PipelinesPage from './pages/PipelinesPage.jsx';
import TeamPage from './pages/TeamPage.jsx';
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
              <Route path="generator" element={<GeneratorStudioPage />} />
              <Route path="datasets" element={<DatasetsPage />} />
              <Route path="datasets/:id" element={<DatasetDetailPage />} />
              <Route path="privacy-guard" element={<PrivacyGuardPage />} />
              <Route path="quality-eval" element={<QualityEvalPage />} />
              <Route path="rules" element={<RulesPage />} />
              <Route path="pipelines" element={<PipelinesPage />} />
              <Route path="team" element={<TeamPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
            <Route path="*" element={<Navigate to={`${BASE_PATH}/overview`} replace />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  );
}
