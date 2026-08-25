import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { NAV_ITEMS } from '../../constants/navigation.js';
import { DashboardNavbar } from './DashboardNavbar.jsx';
import { DashboardSidebar } from './DashboardSidebar.jsx';

export function DashboardLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const activeItem = NAV_ITEMS.find((item) => location.pathname.startsWith(item.to));

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
    <div className="amd-shell">
      <DashboardSidebar open={sidebarOpen} onNavigate={() => setSidebarOpen(false)} />
      {sidebarOpen ? (
        <button
          type="button"
          className="amd-backdrop"
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
        />
      ) : null}
      <div className="amd-main">
        <DashboardNavbar
          sectionLabel={activeItem?.label}
          onMenuToggle={() => setSidebarOpen((open) => !open)}
        />
        <div className="amd-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
