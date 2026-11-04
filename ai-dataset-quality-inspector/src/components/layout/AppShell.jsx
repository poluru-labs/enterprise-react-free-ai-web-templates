import { Outlet } from 'react-router-dom';
import { TopNavbar } from './TopNavbar.jsx';
import { SimpleSidebar } from './SimpleSidebar.jsx';
import { SiteFooter } from './SiteFooter.jsx';

export function AppShell() {
  return (
    <div className="qual-shell">
      <TopNavbar />
      <div className="qual-body">
        <SimpleSidebar />
        <main className="qual-main">
          <Outlet />
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}
