import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { DashboardNavbar } from './DashboardNavbar.jsx';
import { DashboardSidebar } from './DashboardSidebar.jsx';

export function DashboardLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [sidebarOpen]);

  return (
    <div className="llm-shell">
      <DashboardSidebar open={sidebarOpen} onNavigate={() => setSidebarOpen(false)} />
      {sidebarOpen ? (
        <button
          type="button"
          className="llm-backdrop"
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
        />
      ) : null}
      <div className="llm-main">
        <DashboardNavbar onMenuToggle={() => setSidebarOpen((open) => !open)} />
        <div className="llm-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
