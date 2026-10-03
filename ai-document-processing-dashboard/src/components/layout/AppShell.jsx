import { Outlet } from 'react-router-dom';
import { TopNavbar } from './TopNavbar.jsx';
import { SimpleSidebar } from './SimpleSidebar.jsx';
import { SiteFooter } from './SiteFooter.jsx';

export function AppShell() {
  return (
    <div className="dpd-shell">
      <TopNavbar />
      <div className="dpd-body">
        <SimpleSidebar />
        <main className="dpd-main">
          <Outlet />
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}
