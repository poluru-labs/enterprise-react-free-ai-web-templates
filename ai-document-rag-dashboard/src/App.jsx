import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider, ToastProvider } from '@poluru-labs/enterprise-design-system-react';
import { DashboardLayout } from './components/layout/DashboardLayout.jsx';
import OverviewPage from './pages/OverviewPage.jsx';
import KnowledgeBasePage from './pages/KnowledgeBasePage.jsx';
import SourcesPage from './pages/SourcesPage.jsx';
import CollectionsPage from './pages/CollectionsPage.jsx';
import SearchPage from './pages/SearchPage.jsx';
import ConversationsPage from './pages/ConversationsPage.jsx';
import EvaluationsPage from './pages/EvaluationsPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';

export default function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/document-rag/overview" replace />} />
            <Route path="/document-rag" element={<DashboardLayout />}>
              <Route index element={<Navigate to="overview" replace />} />
              <Route path="overview" element={<OverviewPage />} />
              <Route path="knowledge-base" element={<KnowledgeBasePage />} />
              <Route path="sources" element={<SourcesPage />} />
              <Route path="collections" element={<CollectionsPage />} />
              <Route path="search" element={<SearchPage />} />
              <Route path="conversations" element={<ConversationsPage />} />
              <Route path="evaluations" element={<EvaluationsPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/document-rag/overview" replace />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  );
}
