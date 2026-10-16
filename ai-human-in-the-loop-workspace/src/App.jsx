import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider, ToastProvider } from '@poluru-labs/enterprise-design-system-react';
import { AppShell } from './components/layout/AppShell.jsx';
import OverviewPage from './pages/OverviewPage.jsx';
import AnnotationPage from './pages/AnnotationPage.jsx';
import ConsensusPage from './pages/ConsensusPage.jsx';
import CalibrationPage from './pages/CalibrationPage.jsx';
import TasksPage from './pages/TasksPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';

export default function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/hitl/overview" replace />} />
            <Route path="/hitl" element={<AppShell />}>
              <Route index element={<Navigate to="overview" replace />} />
              <Route path="overview" element={<OverviewPage />} />
              <Route path="annotation" element={<AnnotationPage />} />
              <Route path="consensus" element={<ConsensusPage />} />
              <Route path="calibration" element={<CalibrationPage />} />
              <Route path="tasks" element={<TasksPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/hitl/overview" replace />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  );
}
