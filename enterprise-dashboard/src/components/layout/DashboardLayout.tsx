import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { DashboardNavbar } from './DashboardNavbar';
import { DashboardSidebar } from './DashboardSidebar';
import './layout.scss';

export function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`dashboard ${collapsed ? 'dashboard--collapsed' : ''}`}>
      <DashboardSidebar collapsed={collapsed} onToggle={() => setCollapsed((value) => !value)} />
      <div className="dashboard__main">
        <DashboardNavbar />
        <main className="dashboard__content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
