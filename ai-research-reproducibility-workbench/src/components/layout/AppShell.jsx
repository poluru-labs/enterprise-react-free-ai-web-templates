import { Outlet } from 'react-router-dom';
import { TopNavbar } from './TopNavbar.jsx';
import { SimpleSidebar } from './SimpleSidebar.jsx';
import { SiteFooter } from './SiteFooter.jsx';

export function AppShell() {
  return (
    <div className="repro-shell">
      <TopNavbar />
      <div className="repro-body">
        <SimpleSidebar />
        <main className="repro-main">
          <Outlet />
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}
