import { Outlet } from 'react-router-dom';
import { TopNavbar } from './TopNavbar.jsx';
import { SimpleSidebar } from './SimpleSidebar.jsx';
import { SiteFooter } from './SiteFooter.jsx';

export function AppShell() {
  return (
    <div className="flt-shell">
      <TopNavbar />
      <div className="flt-body">
        <SimpleSidebar />
        <main className="flt-main">
          <Outlet />
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}
