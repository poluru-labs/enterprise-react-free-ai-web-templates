import { Outlet } from 'react-router-dom';
import { TopNavbar } from './TopNavbar.jsx';
import { SimpleSidebar } from './SimpleSidebar.jsx';
import { SiteFooter } from './SiteFooter.jsx';

export function AppShell() {
  return (
    <div className="maint-shell">
      <TopNavbar />
      <div className="maint-body">
        <SimpleSidebar />
        <main className="maint-main">
          <Outlet />
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}
