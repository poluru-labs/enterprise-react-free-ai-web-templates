import { Outlet } from 'react-router-dom';
import { TopNavbar } from './TopNavbar.jsx';
import { SimpleSidebar } from './SimpleSidebar.jsx';
import { SiteFooter } from './SiteFooter.jsx';

export function AppShell() {
  return (
    <div className="hop-shell">
      <TopNavbar />
      <div className="hop-body">
        <SimpleSidebar />
        <main className="hop-main">
          <Outlet />
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}
