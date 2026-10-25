import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider, ToastProvider } from '@poluru-labs/enterprise-design-system-react';
import { AppShell } from './components/layout/AppShell.jsx';
import { BASE_PATH } from './constants/navigation.js';
import OverviewPage from './pages/OverviewPage.jsx';
import DemandPage from './pages/DemandPage.jsx';
import ShipmentsPage from './pages/ShipmentsPage.jsx';
import SuppliersPage from './pages/SuppliersPage.jsx';
import InventoryPage from './pages/InventoryPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';

export default function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to={`${BASE_PATH}/overview`} replace />} />
            <Route path={BASE_PATH} element={<AppShell />}>
              <Route index element={<Navigate to="overview" replace />} />
              <Route path="overview" element={<OverviewPage />} />
              <Route path="demand" element={<DemandPage />} />
              <Route path="shipments" element={<ShipmentsPage />} />
              <Route path="suppliers" element={<SuppliersPage />} />
              <Route path="inventory" element={<InventoryPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
            <Route path="*" element={<Navigate to={`${BASE_PATH}/overview`} replace />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  );
}
