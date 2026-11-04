import { Outlet } from 'react-router-dom';
import { TopNavbar } from './TopNavbar.jsx';
import { SimpleSidebar } from './SimpleSidebar.jsx';
import { SiteFooter } from './SiteFooter.jsx';

export function AppShell() {
  return (
    <div className="relief-shell">
      <TopNavbar />
      <div className="relief-body">
        <SimpleSidebar />
        <main className="relief-main">
          <Outlet />
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}
