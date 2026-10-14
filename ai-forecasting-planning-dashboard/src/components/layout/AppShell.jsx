import { Outlet } from 'react-router-dom';
import { TopNavbar } from './TopNavbar.jsx';
import { SimpleSidebar } from './SimpleSidebar.jsx';
import { SiteFooter } from './SiteFooter.jsx';

export function AppShell() {
  return (
    <div className="fpl-shell">
      <TopNavbar />
      <div className="fpl-body">
        <SimpleSidebar />
        <main className="fpl-main">
          <Outlet />
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}
