import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider, ToastProvider } from '@poluru-labs/enterprise-design-system-react';
import { DashboardLayout } from './components/layout/DashboardLayout.jsx';
import OverviewPage from './pages/OverviewPage.jsx';
import TasksPage from './pages/TasksPage.jsx';
import ToolCallsPage from './pages/ToolCallsPage.jsx';
import LoopsPage from './pages/LoopsPage.jsx';
import FailuresPage from './pages/FailuresPage.jsx';
import HandoffsPage from './pages/HandoffsPage.jsx';
import MemoryHealthPage from './pages/MemoryHealthPage.jsx';

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
              <Route path="tasks" element={<TasksPage />} />
              <Route path="tool-calls" element={<ToolCallsPage />} />
              <Route path="loops" element={<LoopsPage />} />
              <Route path="failures" element={<FailuresPage />} />
              <Route path="handoffs" element={<HandoffsPage />} />
              <Route path="memory-health" element={<MemoryHealthPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/agent-monitoring/overview" replace />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  );
}
