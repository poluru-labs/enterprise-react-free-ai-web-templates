import { Outlet } from 'react-router-dom';
import { TopNavbar } from './TopNavbar.jsx';
import { SimpleSidebar } from './SimpleSidebar.jsx';
import { SiteFooter } from './SiteFooter.jsx';

export function AppShell() {
  return (
    <div className="hil-shell">
      <TopNavbar />
      <div className="hil-body">
        <SimpleSidebar />
        <main className="hil-main">
          <Outlet />
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}
