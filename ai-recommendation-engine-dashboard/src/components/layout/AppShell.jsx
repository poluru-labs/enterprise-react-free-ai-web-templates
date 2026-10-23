import { Outlet } from 'react-router-dom';
import { TopNavbar } from './TopNavbar.jsx';
import { SimpleSidebar } from './SimpleSidebar.jsx';
import { SiteFooter } from './SiteFooter.jsx';

export function AppShell() {
  return (
    <div className="rec-shell">
      <TopNavbar />
      <div className="rec-body">
        <SimpleSidebar />
        <main className="rec-main">
          <Outlet />
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}
