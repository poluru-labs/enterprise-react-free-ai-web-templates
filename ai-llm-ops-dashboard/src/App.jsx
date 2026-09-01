import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider, ToastProvider } from '@poluru-labs/enterprise-design-system-react';
import { DashboardLayout } from './components/layout/DashboardLayout.jsx';
import OverviewPage from './pages/OverviewPage.jsx';
import ModelsPage from './pages/ModelsPage.jsx';
import ModelDetailPage from './pages/ModelDetailPage.jsx';
import PromptsPage from './pages/PromptsPage.jsx';
import TracesPage from './pages/TracesPage.jsx';
import EvaluationsPage from './pages/EvaluationsPage.jsx';
import PlaygroundPage from './pages/PlaygroundPage.jsx';
import CostsPage from './pages/CostsPage.jsx';
import IncidentsPage from './pages/IncidentsPage.jsx';
import GuardrailsPage from './pages/GuardrailsPage.jsx';
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
              <Route path="models" element={<ModelsPage />} />
              <Route path="models/:id" element={<ModelDetailPage />} />
              <Route path="prompts" element={<PromptsPage />} />
              <Route path="traces" element={<TracesPage />} />
              <Route path="evaluations" element={<EvaluationsPage />} />
              <Route path="playground" element={<PlaygroundPage />} />
              <Route path="costs" element={<CostsPage />} />
              <Route path="incidents" element={<IncidentsPage />} />
              <Route path="guardrails" element={<GuardrailsPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
            <Route path="*" element={<Navigate to={`${BASE_PATH}/overview`} replace />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  );
}
