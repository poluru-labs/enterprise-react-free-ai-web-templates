import { Outlet } from 'react-router-dom';
import { TopNavbar } from './TopNavbar.jsx';
import { SimpleSidebar } from './SimpleSidebar.jsx';
import { SiteFooter } from './SiteFooter.jsx';

export function AppShell() {
  return (
    <div className="per-shell">
      <TopNavbar />
      <div className="per-body">
        <SimpleSidebar />
        <main className="per-main">
          <Outlet />
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}
