import { Outlet } from 'react-router-dom';
import { TopNavbar } from './TopNavbar.jsx';
import { SimpleSidebar } from './SimpleSidebar.jsx';
import { SiteFooter } from './SiteFooter.jsx';

export function AppShell() {
  return (
    <div className="rq-shell">
      <TopNavbar />
      <div className="rq-body">
        <SimpleSidebar />
        <main className="rq-main">
          <Outlet />
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}
