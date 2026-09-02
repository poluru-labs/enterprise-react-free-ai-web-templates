import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider, ToastProvider } from '@poluru-labs/enterprise-design-system-react';
import { DashboardLayout } from './components/layout/DashboardLayout.jsx';
import OverviewPage from './pages/OverviewPage.jsx';
import InboxPage from './pages/InboxPage.jsx';
import TicketsPage from './pages/TicketsPage.jsx';
import TicketDetailPage from './pages/TicketDetailPage.jsx';
import CustomersPage from './pages/CustomersPage.jsx';
import MacrosPage from './pages/MacrosPage.jsx';
import KnowledgePage from './pages/KnowledgePage.jsx';
import SlaPage from './pages/SlaPage.jsx';
import AgentsPage from './pages/AgentsPage.jsx';
import AnalyticsPage from './pages/AnalyticsPage.jsx';
import SearchPage from './pages/SearchPage.jsx';
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
              <Route path="inbox" element={<InboxPage />} />
              <Route path="tickets" element={<TicketsPage />} />
              <Route path="tickets/:id" element={<TicketDetailPage />} />
              <Route path="customers" element={<CustomersPage />} />
              <Route path="macros" element={<MacrosPage />} />
              <Route path="knowledge" element={<KnowledgePage />} />
              <Route path="sla" element={<SlaPage />} />
              <Route path="agents" element={<AgentsPage />} />
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="search" element={<SearchPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
            <Route path="*" element={<Navigate to={`${BASE_PATH}/overview`} replace />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  );
}
