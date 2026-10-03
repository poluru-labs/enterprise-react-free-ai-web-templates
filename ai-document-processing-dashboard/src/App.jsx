import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider, ToastProvider } from '@poluru-labs/enterprise-design-system-react';
import { AppShell } from './components/layout/AppShell.jsx';
import OverviewPage from './pages/OverviewPage.jsx';
import InboxPage from './pages/InboxPage.jsx';
import ClassifyPage from './pages/ClassifyPage.jsx';
import ExtractPage from './pages/ExtractPage.jsx';
import ValidatePage from './pages/ValidatePage.jsx';
import ExceptionsPage from './pages/ExceptionsPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';

export default function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/documents/overview" replace />} />
            <Route path="/documents" element={<AppShell />}>
              <Route index element={<Navigate to="overview" replace />} />
              <Route path="overview" element={<OverviewPage />} />
              <Route path="inbox" element={<InboxPage />} />
              <Route path="classify" element={<ClassifyPage />} />
              <Route path="extract" element={<ExtractPage />} />
              <Route path="validate" element={<ValidatePage />} />
              <Route path="exceptions" element={<ExceptionsPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/documents/overview" replace />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  );
}
