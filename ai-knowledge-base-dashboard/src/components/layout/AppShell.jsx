import { Outlet } from 'react-router-dom';
import { TopNavbar } from './TopNavbar.jsx';
import { SimpleSidebar } from './SimpleSidebar.jsx';
import { SiteFooter } from './SiteFooter.jsx';

export function AppShell() {
  return (
    <div className="knb-shell">
      <TopNavbar />
      <div className="knb-body">
        <SimpleSidebar />
        <main className="knb-main">
          <Outlet />
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}
