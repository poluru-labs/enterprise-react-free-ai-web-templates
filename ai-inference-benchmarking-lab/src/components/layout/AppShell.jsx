import { Outlet } from 'react-router-dom';
import { TopNavbar } from './TopNavbar.jsx';
import { SimpleSidebar } from './SimpleSidebar.jsx';
import { SiteFooter } from './SiteFooter.jsx';

export function AppShell() {
  return (
    <div className="bench-shell">
      <TopNavbar />
      <div className="bench-body">
        <SimpleSidebar />
        <main className="bench-main">
          <Outlet />
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}
