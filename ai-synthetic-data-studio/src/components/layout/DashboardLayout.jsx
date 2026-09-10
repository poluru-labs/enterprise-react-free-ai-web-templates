import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { DashboardSidebar } from './DashboardSidebar.jsx';
import { DashboardNavbar } from './DashboardNavbar.jsx';

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="syn-shell">
      <DashboardSidebar open={sidebarOpen} onNavigate={() => setSidebarOpen(false)} />
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(7, 23, 59, 0.45)',
            backdropFilter: 'blur(2px)',
            zIndex: 999,
          }}
          aria-hidden="true"
        />
      )}
      <div className="syn-main-wrapper">
        <DashboardNavbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="syn-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
