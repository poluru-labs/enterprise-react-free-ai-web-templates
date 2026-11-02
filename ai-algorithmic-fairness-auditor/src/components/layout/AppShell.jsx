import { Outlet } from 'react-router-dom';
import { TopNavbar } from './TopNavbar.jsx';
import { SimpleSidebar } from './SimpleSidebar.jsx';
import { SiteFooter } from './SiteFooter.jsx';

export function AppShell() {
  return (
    <div className="fair-shell">
      <TopNavbar />
      <div className="fair-body">
        <SimpleSidebar />
        <main className="fair-main">
          <Outlet />
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}
