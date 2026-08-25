import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider, ToastProvider } from '@poluru-labs/enterprise-design-system-react';
import { DashboardLayout } from './components/layout/DashboardLayout.jsx';
import OverviewPage from './pages/OverviewPage.jsx';
import AgentsPage from './pages/AgentsPage.jsx';
import TasksPage from './pages/TasksPage.jsx';
import TracesPage from './pages/TracesPage.jsx';
import ToolCallsPage from './pages/ToolCallsPage.jsx';
import LoopsPage from './pages/LoopsPage.jsx';
import FailuresPage from './pages/FailuresPage.jsx';
import HandoffsPage from './pages/HandoffsPage.jsx';
import MemoryHealthPage from './pages/MemoryHealthPage.jsx';
import EvaluationsPage from './pages/EvaluationsPage.jsx';
import GuardrailsPage from './pages/GuardrailsPage.jsx';
import CostPage from './pages/CostPage.jsx';
import SearchPage from './pages/SearchPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';

export default function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/agent-monitoring/overview" replace />} />
            <Route path="/agent-monitoring" element={<DashboardLayout />}>
              <Route index element={<Navigate to="overview" replace />} />
              <Route path="overview" element={<OverviewPage />} />
              <Route path="agents" element={<AgentsPage />} />
              <Route path="tasks" element={<TasksPage />} />
              <Route path="traces" element={<TracesPage />} />
              <Route path="tool-calls" element={<ToolCallsPage />} />
              <Route path="loops" element={<LoopsPage />} />
              <Route path="failures" element={<FailuresPage />} />
              <Route path="handoffs" element={<HandoffsPage />} />
              <Route path="memory-health" element={<MemoryHealthPage />} />
              <Route path="evaluations" element={<EvaluationsPage />} />
              <Route path="guardrails" element={<GuardrailsPage />} />
              <Route path="cost" element={<CostPage />} />
              <Route path="search" element={<SearchPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/agent-monitoring/overview" replace />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  );
}
