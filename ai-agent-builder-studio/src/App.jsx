import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider, ToastProvider } from '@poluru-labs/enterprise-design-system-react';
import { AppShell } from './components/layout/AppShell.jsx';
import OverviewPage from './pages/OverviewPage.jsx';
import ToolsPage from './pages/ToolsPage.jsx';
import WorkflowsPage from './pages/WorkflowsPage.jsx';
import MemoryPage from './pages/MemoryPage.jsx';
import TestsPage from './pages/TestsPage.jsx';
import DeploymentsPage from './pages/DeploymentsPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';

export default function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/studio/overview" replace />} />
            <Route path="/studio" element={<AppShell />}>
              <Route index element={<Navigate to="overview" replace />} />
              <Route path="overview" element={<OverviewPage />} />
              <Route path="tools" element={<ToolsPage />} />
              <Route path="workflows" element={<WorkflowsPage />} />
              <Route path="memory" element={<MemoryPage />} />
              <Route path="tests" element={<TestsPage />} />
              <Route path="deployments" element={<DeploymentsPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/studio/overview" replace />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  );
}
