import { Outlet } from 'react-router-dom';
import { TopNavbar } from './TopNavbar.jsx';
import { SimpleSidebar } from './SimpleSidebar.jsx';
import { SiteFooter } from './SiteFooter.jsx';

export function AppShell() {
  return (
    <div className="acc-shell">
      <TopNavbar />
      <div className="acc-body">
        <SimpleSidebar />
        <main className="acc-main">
          <Outlet />
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}
